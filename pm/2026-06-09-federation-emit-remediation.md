# Federation emit remediation — DRAFT (not applied) · 2026-06-09

Closes the live regression in [federation-topology.md](../federation-topology.md): three of
four members' wardline findings never reach the federated `:8749` daemon. Topology ratified
(PM, 2026-06-09): **shared `:8749` daemon for all Python members.** Nothing below has been
applied — these are diffs for review.

**Prerequisites verified 2026-06-09 (read-only probe):** `:8749` is the only `--server-mode`
process (PID 764117); `:8659/:8834/:8971/:9397` are local dashboards. All four Python projects
already have `<repo>/.weft/filigree/` + a `federation_token` (0600). So same-host auto-mint
will authenticate every member once registered+repointed — **no `.mcp.json` env block needed.**

---

## Change 1 — repoint the drifted `.mcp.json` emit URLs (2 files)

**`~/filigree/.mcp.json`** (wardline server, line 24):
```diff
-        "http://127.0.0.1:8834/api/weft/scan-results"
+        "http://127.0.0.1:8749/api/p/filigree/weft/scan-results"
```

**`~/wardline/.mcp.json`** (wardline server, line 24):
```diff
-        "http://127.0.0.1:8659/api/weft/scan-results"
+        "http://127.0.0.1:8749/api/p/wardline/weft/scan-results"
```

**`~/legis/.mcp.json`** — **no change.** Already `:8749/api/p/legis/weft/scan-results`
(correct URL; it was failing only for lack of registration — Change 2).

**`~/loomweave/.mcp.json`** — **no change.** No wardline server by design (Rust; not
wardline-scanned).

> The `--loomweave-url` values differ per repo (`:9577`, `:9728`, `:9620`) — those are each
> repo's local loomweave read-API and are **out of scope** here (this is the *filigree* emit
> path). Do not touch them.

## Change 2 — register the missing projects + re-key filigree (server.json)

Current `~/.config/filigree/server.json` registers only `filigree` (under the **legacy**
`.filigree` path) and `lacuna`. Target:

```json
{
  "port": 8749,
  "projects": {
    "/home/john/filigree/.weft/filigree": { "prefix": "filigree" },
    "/home/john/wardline/.weft/filigree": { "prefix": "wardline" },
    "/home/john/legis/.weft/filigree":    { "prefix": "legis" },
    "/home/john/lacuna/.weft/filigree":   { "prefix": "lacuna" }
  }
}
```

Three deltas: **add** `wardline` + `legis`; **re-key** `filigree` from
`/home/john/filigree/.filigree` → `/home/john/filigree/.weft/filigree` (drops the stale
legacy-path key — this is also the **C2** root cause).

**⚠️ Open question to confirm before applying — the registration mechanism.** Hand-editing
`server.json` then reloading the daemon is the brute-force path, but it **restarts the shared
daemon and momentarily affects lacuna**, and may race the daemon's own registry writes. Confirm
the canonical path first: does filigree expose a `register`/`unregister` verb, or does a project
auto-register when its session connects to `:8749`? If auto-register exists, the cleaner fix is
to repoint (Change 1) and let each member's next session register itself, then prune the stale
`filigree→.filigree` key. **Do not hand-edit + restart until this is settled.**

## Change 3 — verify (the liveness check, post-apply)

Per [federation-topology.md](../federation-topology.md) "per-member emit-liveness check":
```
for p in filigree wardline legis lacuna; do
  curl -sS -o /dev/null -w "$p %{http_code}\n" \
    http://127.0.0.1:8749/api/p/$p/weft/scan-results
done            # expect non-401/000; a bare GET may be 405/400, NOT 401-unregistered
```
Then one real wardline scan per member → confirm the finding lands in **that** project and no
sibling. lacuna is the canary (already green) — it must stay green through the change.

## Change 4 — clean up legacy dirs (after verify)

`~/filigree/.filigree` and `~/legis/.filigree` still exist (the stale-key source). Once the
canonical registration is confirmed working, remove them (mirrors launch-runbook Step 4 for
lacuna). `~/wardline` and `~/lacuna` are already clean.

---

## Sequencing & dependencies

- This dovetails with [launch-runbook.md](../launch-runbook.md): the emit topology is part of
  the cutover, not a separate track. Apply **after** Step 1 (filigree first / hub `filigree-mcp`
  reload) so the daemon is on the canonical store-dir + current schema.
- **C2** (`register_project` dedups by store-dir string, not project root) is the durable code
  fix behind the manual re-key here — without it, the next `.filigree`→`.weft` relocation
  re-strands a key. Track + fix in filigree; the manual re-key is the stopgap.
- Filed tracker issues: see the session that produced this doc (topology-drift P1, legis-unreg
  P2, filigree legacy-key/C2 P2, topology-doc P2).
