# Weft — federation emit topology (runtime wiring)

**Status:** **Authoritative** for the *runtime* wiring of the finding-emit path — which
process listens where, which projects emit to which endpoint, and how to verify a member
actually reaches the tracker. [federation-map.md](./federation-map.md) is authoritative for
the *logical* bindings (which pairs compose on which contract); this doc is its deployment
counterpart. Deconfliction-first: a misrouted emit is a *findings-don't-reach-the-tracker*
availability failure, not a security one.

> **Why this doc exists.** The 2026-06-08 dogfood reconciliation found that three of four
> members' scan findings never reached the federated tracker because their emit URLs had
> drifted to the wrong ports — and there was **no spec to validate the configs against**.
> A code review cannot catch this class of drift; only a live probe can. This doc is that
> spec, plus the probe.

## The model (one sentence)

There is **exactly one federation transport** — a single Filigree process running in
`--server-mode` — and **everything else that listens on a port is a local dashboard /
read-API, never an emit target.**

| Surface | What it is | Valid emit target? |
|---|---|---|
| `127.0.0.1:8749` Filigree `--server-mode` | **The** federation daemon. Multi-project, path-scoped, fail-closed on unscoped writes. | **YES** — the only one |
| `127.0.0.1:86xx / :8971 / :9397` Filigree `dashboard` | Per-project local dashboards (`--no-browser --port N`). | No |
| `127.0.0.1:9212` weft hub dashboard | The hub's own local dashboard. | No |
| loomweave `:9xxx` read-API | Loomweave's HTTP read surface. | No |

## Who emits, and where

The emitter is **wardline** (the Python static analyzer), configured as the
`--filigree-url` arg on the wardline MCP server inside **each scanned repo's** `.mcp.json`.
Wardline scans **Python**; therefore:

- **filigree, wardline, legis** (Python members) **and lacuna** (the Python specimen) each
  run a wardline server that POSTs findings to the daemon.
- **loomweave is Rust** — wardline does not analyze it, so loomweave's `.mcp.json` correctly
  has **no wardline server and no emit URL**. This is by design, not a gap.

Every emit URL must be **path-scoped to that project**:

```
http://127.0.0.1:8749/api/p/<project>/weft/scan-results
```

An **unscoped** URL (`/api/weft/scan-results`) is **fail-closed → 400** by design (N1): the
daemon refuses to guess the project rather than silently writing to the default one (the old
cross-project contamination vector).

### One value, every route (the derivation contract)

The scan-results endpoint above is the **single configured Filigree value** a member holds —
and other code paths in the same process (promote-by-fingerprint, the dossier/ADR-029
work-join) **derive their routes from it** rather than taking a second URL. The contract,
decided 2026-06-12 (dogfood-4 A3/A4, `weft-d0df42c739`), is:

- **Canonical configured form:** the project-scoped scan-results endpoint, exactly as above.
  The emit path POSTs to it **verbatim** — no derivation can misroute the write.
- **Derivation rule:** consumers normalize the value to the API base by truncating at the
  `/api` segment and re-appending the project scope: `…/api/p/<project>`. All sibling routes
  hang off that base (filigree dual-mounts every route under `/api/p/<key>/`).
- **Dialect tolerance:** derivers must also accept a bare origin, an `/api` base, the classic
  unscoped endpoint, and the `?project=<key>` query form. A pinned project is **always
  re-expressed as the path dialect** in derived URLs — filigree honors `?project=` only on
  weft-scoped paths, so the query form would silently lose the scope on classic routes
  (entity-associations).
- Reference implementation: wardline `core/filigree_emit.py::filigree_api_base_url`
  (single shared parser; `rc5` commit `be430be7`).

## Registration is mandatory and separate from the URL

Pointing at the right scoped URL is **not sufficient** — the project must also be registered
in the daemon's registry:

```
~/.config/filigree/server.json   →  { "port": 8749, "projects": { "<store_dir>": {"prefix": "<project>"} } }
```

…and registered under the **canonical** store dir `<repo>/.weft/filigree`, **not** the legacy
`<repo>/.filigree`.

> **Known trap — 401 is ambiguous.** Auth runs *before* project resolution, so a request to a
> correctly-scoped path for an **unregistered** project returns **401 — identical to a bad
> token**. Do not diagnose a 401 as "wrong token" without first checking the project is in
> `server.json`.

## Tokens (same-host = zero ceremony)

Each emitting project has an auto-minted `<repo>/.weft/filigree/federation_token` (0600).
Wardline resolves it via its token chain (`WEFT_FEDERATION_TOKEN` env → the repo's
`.weft/filigree/federation_token` → off), and the daemon validates a scoped request against
**that project's store-dir token**. When registration uses the canonical store dir, the two
are the same file — so **same-host emit needs no `.mcp.json` env block**. Only a cross-host
deploy (no shared filesystem) requires `WEFT_FEDERATION_TOKEN` set on both ends.

## Intended wiring (target end-state)

| Project | `.mcp.json` wardline `--filigree-url` | Registered in `server.json` (canonical store dir) |
|---|---|---|
| filigree | `:8749/api/p/filigree/weft/scan-results` | `/home/john/filigree/.weft/filigree` |
| wardline | `:8749/api/p/wardline/weft/scan-results` | `/home/john/wardline/.weft/filigree` |
| legis | `:8749/api/p/legis/weft/scan-results` | `/home/john/legis/.weft/filigree` |
| lacuna | `:8749/api/p/lacuna/weft/scan-results` | `/home/john/lacuna/.weft/filigree` |
| loomweave | *(none — Rust, not wardline-scanned)* | *(not registered)* |

## Per-member emit-liveness check (run after any cutover/reinstall)

Use the hub-owned preflight so this check is mechanical, not a checklist:

```bash
python3 scripts/check-federation-emit-liveness.py --live
```

For each emitting project:

1. Read its `.mcp.json` wardline `--filigree-url`; confirm host:port is `:8749` and the path
   is `/api/p/<project>/weft/scan-results` (scoped).
2. Confirm `<project>` is in `~/.config/filigree/server.json` under its `.weft/filigree` dir.
3. Probe with the member's `.weft/filigree/federation_token` and classify —
   `000`=dead port (wrong host), `401`=bad token **or unregistered project**, `400`=unscoped
   fail-closed, `404`=wrong path, `2xx`=reaches the daemon.
4. End-to-end (the truth test): trigger one wardline scan and confirm the finding row lands in
   **that** project's tracker and **no** sibling's.

A green `gate`/`reachable:true` in a scan response is **not** this check — wardline reports the
project it *pinned*, not the one the daemon *resolved* (open residual; see the gap analysis).

## Current drift snapshot (PROBED 2026-06-09)

| Project | Points at | Result | Status |
|---|---|---|---|
| lacuna | `:8749/api/p/lacuna/…` (scoped, registered) | 200, lands, isolated | ✅ correct |
| legis | `:8749/api/p/legis/…` (scoped) but **not registered** | 401 (looks like auth) | ❌ register it |
| filigree | `:8834/api/weft/…` (local dashboard, **unscoped**) | 401/400 | ❌ repoint + re-key registration off legacy `.filigree` |
| wardline | `:8659/api/weft/…` (local dashboard, **unscoped**) | 401/400 | ❌ repoint + register |
| loomweave | none | — | ✅ by design |

Remediation runbook: [pm/2026-06-09-federation-emit-remediation.md](./pm/2026-06-09-federation-emit-remediation.md).
