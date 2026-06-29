# Federation interface + gap map — 2026-06-29

**Frame:** seam-health epic `weft-b6effe30f9` (PDR-0023 — the federation is the product; the
seams are the crown jewels). **Refreshes** the 2026-06-15 seam-health map ~2 weeks + a lot of
shipping later, and extends it to the newer members (plainweave, tabard) and seams (churn,
preflight, suppression-conformance).

**Method:** 7 subagents, one per member, each reading a **clean detached `main` worktree** —
**executable source, not docs** (the docs have drifted suite-wide) — with **no MCP exercised**
(a hub-rooted agent misroutes MCP; verdicts would be artifacts). Every finding is `file:line`-cited.
Per-member raw maps: `scratchpad/raw-maps.md` (appendix). Batched 2-at-a-time per the standing
concurrency limit.

**Snapshot HEADs (main):** loomweave `a980ef2` · filigree `f59e423` (schema v29) · wardline
`bdd84eb2` (1.0.7) · legis `395d7fc` (1.3.0) · warpline `beea0f8` (1.2.0) · plainweave `c1e125e`
(src=1.1.0) · tabard `2108cf1` (0.0.1a0).

> **Snapshot caveats (the audit's own thesis applied to itself):**
> 1. **4 of 7 members are on active branches right now**, not main — filigree
>    `feat/weft-suppression-conformance`, **wardline `release/consolidation` (carries the
>    federation-wide `seam_registry.json` + fail-closed seam-conformance gate — NOT on main yet)**,
>    legis mid-refactor `refactor/decouple-layering-inversions`, warpline `release/1.2.0`. This is a
>    snapshot of `main` while significant seam reshaping is in flight.
> 2. loomweave was read at `a980ef2`, which includes the just-merged Warpline churn consumer
>    (`1d2b4fa`, now confirmed on origin/main) **and** a concurrent PR #79 — i.e. another session
>    was committing in loomweave *during* this audit.

---

## THE VERDICT — "is it complete?" on two axes

You asked the right question the wrong way: "complete" has two independent axes, and the fabric
sits very differently on each.

### Axis 1 — WIRED (are the intended seams present?) → **mostly, with 4 known holes**
The core spine is wired and real. The holes are all **known and named**, not surprises:
- **Two consumer fills in flight** — Warpline churn → Loomweave (**now landed on origin/main**) and
  Plainweave preflight → Legis (**still on a legis branch, not main**). From `main`, warpline's
  churn producer and plainweave's preflight producer each had **no landed consumer** at audit time.
- **`scan_manifest` does not exist** — Plainweave wants a wardline scope/ruleset identity; wardline
  emits that data **only embedded in the signed Legis artifact** (`scan_scope`), not standalone
  (`weft-9a35aa00e7`).
- **Warpline v4 `verification_events` is landed-but-dark** — table created + migration shipped, but
  **no write path, no read path, no tool surfaces it** (warpline's own Rung-2 Track-B, not yet built).

### Axis 2 — CORRECT / HONEST (do the wired seams tell the truth?) → **mostly yes now — this is the real story**
The 2026-06-15 thesis was *"every seam has lost its ability to say 'I don't know'"* — confident-empty
results indistinguishable from true negatives. **That has been substantially remediated.** Since 06-15:
- wardline's hardwired `failed:[]` emit → **fixed** (real per-finding failure tracking, PDR-0023).
- fingerprint scheme-drift → **nameable on the Filigree wire** (`fingerprint_scheme` carried; mismatch
  refuses the unseen-sweep + emits `scheme_mismatch`, no silent cascade-close).
- legis governance reads → **uniformly discriminated** (`checked` vs `unavailable`/`diverged`); empty
  never reads as all-clear; attestation/governance_read fail **closed**.
- warpline → every non-clean empty carries an 11-class `weft_reason` triple.
- **dropped/forged sign-off no longer silently closes** (legis fails *closed* on bad/missing HMAC) —
  the 06-15 finding was half-right; only *content drift* still slips (see RED-1).

**Two genuine correctness holes remain** (the two REDs below). Both are *functional/honesty*
failures, not security (deconfliction-not-security): a wrong-but-confident answer that becomes the
premise of the next decision.

**Bottom line:** the fabric is **structurally sound and—newly—mostly honest about its own
emptiness.** It is **not yet complete**: two consumer fills are mid-landing, one needed contract
(`scan_manifest`) doesn't exist, and **two seams still lie** (closure-gate drift; plainweave's
boundary claim). It is **not a mess so much as a fabric mid-weave with two frayed threads and a lot
of honest, in-flight branch work** that hasn't reached `main`.

---

## Seam inventory (producer → consumer), with health

Health: 🟢 healthy/honest · 🟡 works-but-degraded-or-unlanded · 🔴 lies.
"Landed" = present on both ends' `main`.

| Producer | Contract | Consumer(s) | Transport | Join dialect | Health | Landed |
|---|---|---|---|---|---|---|
| **loomweave** | SEI spine `loomweave:eid:` + `/api/v1/identity/resolve` | legis, filigree, wardline, plainweave, warpline | HTTP (HMAC) / SQLite-ro | SEI ⇢ path-locator (degraded) | 🟢 | ✅ |
| loomweave | lineage/rename feed `/api/v1/identity/lineage/:sei` | NONE-KNOWN landed | HTTP | SEI→locator events | 🟡 unconsumed | ✅ producer |
| loomweave | callers/callees `/api/v1/entities/:id/...` | NONE-KNOWN | HTTP | entity_id | 🟡 unconsumed | ✅ producer |
| loomweave | taint-store `/api/wardline/*` (loomweave *hosts*, wardline *writes*) | wardline | HTTP (HMAC) | qualname / SEI | 🟢 | ✅ |
| **warpline** | `entity_churn_count.v1` | loomweave | MCP stdio **newline** JSON-RPC | SEI/locator | 🟢 | ✅ **(just landed)** |
| warpline | `impact_radius.v1` + `reverify_worklist.v1` | legis (advisory preflight) | MCP stdio newline | rev_range git refs | 🟡 | ❌ consumer on legis branch |
| warpline | `reverify_worklist.v1` | filigree (`warpline_worklist_ingest`) | **in-process dict** (agent hands it) | entity.sei | 🟢 passive | ✅ |
| warpline | `project_status.v1`, `change_list`, `timeline`, `edge_snapshot` | (lacuna harness / local) | MCP stdio newline | SEI/locator | 🟢 | ✅ producer |
| warpline | `verification_events` (v4 store) | — | — | — | 🟡 **dark** (no read/write path) | ❌ |
| **legis** | git **rename-feed** (PATH renames + blob SHAs) | loomweave (derives locator itself) | HTTP | **path** (not locator) | 🟡 stale-blind + dialect-inverted | ✅ |
| legis | `filigree_closure_gate_get` | filigree / agents | MCP / HTTP | issue_id **only** | 🔴 **drift-blind** | ✅ |
| legis | `governance_read.v1`, `attestation_get` | warpline (skip-reverify) | MCP | SEI + content_hash | 🟢 | ✅ |
| legis | `scan_route` (+ wardline artifact ingest) | agents / wardline | MCP / in-band | qualname→SEI | 🟢 (read-side silent-default 🟡) | ✅ |
| **wardline** | `findings.jsonl` (file) | plainweave (peer-facts) | **direct file read** | fingerprint/path/qualname (**bare**, no scheme) | 🟡 scheme invisible in file | ✅ |
| wardline | scan-results (wire) | filigree | HTTP | `wlfp2:` fingerprint | 🟢 | ✅ |
| wardline | legis artifact `scan.legis.json` (carries `scan_scope`) | legis | file + POST | bare fp + commit/tree | 🟢 (no `key_id` on wire 🟡) | ✅ |
| wardline | taint-facts | loomweave (writes into taint-store) | HTTP (HMAC) | qualname | 🟢 | ✅ |
| **filigree** | entity-association ADR-029 (+governance fields) | loomweave, warpline | HTTP / MCP | opaque SEI + content_hash | 🟢 emit correct | ✅ |
| filigree | `/api/weft/*` (issues/findings/changes/observations/files) | loomweave + siblings | HTTP | SEI / fingerprint | 🟢 | ✅ |
| **plainweave** | `preflight_facts.v1` | legis (advisory) | MCP | rev_range / SEI | 🟡 | ❌ consumer on legis branch |
| plainweave | `requirements_enrichment.v1` | warpline (reserved slot) | MCP / CLI | entity_ref | 🟡 self-declared PROPOSED | ❌ unratified |
| plainweave | `wardline_peer_facts.v1` | NONE-KNOWN | MCP / CLI | fingerprint/path | 🟡 unconsumed | ✅ producer |
| **tabard** | — (identity is SPEC-ONLY) | — | — | — | ⬜ name-reservation | — |

---

## Ranked gap register

Each: severity · finding · evidence · **since-0615** (NEW / FIXED / STILL-OPEN) · **ticket**.

### 🔴 RED — a wired seam returns a confident wrong answer (moat-integrity)

- **RED-1 · Closure-gate drift is OWNERLESS.** A *governed* issue closes `allowed:true` against
  **drifted content** — neither side compares current-code-vs-attach. Legis receives only `issue_id`
  (`legis_client.py:159`), its gate joins issue_id and never `content_hash` (`filigree_gate.py:14`,
  inputSchema has no content_hash `mcp.py:866`). Filigree compares only the *sign-off snapshot*
  locally (`signed_content_hash` vs `content_hash_at_attach`, `governance.py:94-107`) — current code
  vs attach gates no close. Legis's own comment says "drift comparison stays legis's job" yet legis
  doesn't do it. **Cross-confirmed by both members.** *since-0615:* **STILL-OPEN** (was a P1).
  *ticket:* seam-health epic `weft-b6effe30f9` (no dedicated ticket — candidate to file).
- **RED-2 · Plainweave's `authority_boundary` lies (conditional).** Read tools advertise
  `local_only:True` / `live_peer_calls:False` (`mcp_surface.py:47-99`), but the trace-enrich path
  `_enrich_loomweave_trace` (`service.py:2483`) calls the **HTTP-capable** `resolve_identity`
  (`loomweave_adapter.py:232`: `if self.http_url is not None: …_http`), **not** the
  `resolve_identity_local` ("never a live peer call") that sits unused right beside it (`:237`).
  When a loomweave endpoint is configured (`WEFT_LOOMWEAVE_URL`/ephemeral.port), preflight/trace/
  dossier/enrichment make a live peer call while advertising they don't — and the code self-contradicts
  with a dossier note "endpoint configured but was not called." Honesty-invariant violation (the
  suite's flagship doctrine). **Conditional** (boundary holds when no endpoint set); **not
  load-bearing**. *since-0615:* **NEW** (plainweave is newly admitted). *ticket:* **none — file.**

### 🟡 AMBER — works but degraded, unlanded, or fragile

- **AMBER-1 · Two consumer fills not both-ends-on-main.** Warpline churn→loomweave **landed**
  (origin/main `a980ef2`); Plainweave preflight→legis **on a legis branch**. *ticket:* `weft-670ec2fe90`
  (churn, closeable), `weft-46b2f002fa` (preflight).
- **AMBER-2 · `scan_manifest` doesn't exist.** Plainweave wants `covered_paths`+`ruleset_id`; wardline
  emits `scan_scope` (`scanned_paths`/`resolved_source_roots`/`rule_set_version`) **only inside the
  signed legis artifact** (`core/legis.py:245-260`); whole-repo grep `scan_manifest`/`covered_paths`=0.
  PW degrades to a path-set heuristic (`wardline_scan_identity_absent`); its scan_manifest fixtures are
  its **own tests**. *Resolution path: lift `scan_scope` into a standalone manifest + alias the field
  names.* *since-0615:* NEW seam. *ticket:* **`weft-9a35aa00e7`** (tracked).
- **AMBER-3 · Fingerprint scheme invisible in wardline's *file* artifacts.** `findings.jsonl`/SARIF/
  agent-summary carry a **bare** fingerprint (no `wlfp2` prefix) — only the Filigree *wire* carries
  `fingerprint_scheme`. Plainweave reads the **file**, so a `wlfp2→wlfp3` bump → silent join-miss for
  PW. *since-0615:* partially FIXED (wire), STILL-OPEN (file path PW uses). *ticket:* relates to the
  G4/PDR-0023 scheme-echo handshake (seam-health epic).
- **AMBER-4 · Identifier-dialect fragmentation.** The fabric joins on **four** keys: SEI (loomweave
  spine), bare **qualname** (wardline↔loomweave, warpline resolve), **path-locator** (legis rename
  feed), **fingerprint** (findings). Wardline peer-facts + findings are fingerprint/path/qualname-keyed,
  **not SEI** → can't join the SEI spine directly. *ticket:* residuals tracked `weft-560f243c95`.
- **AMBER-5 · Rename-feed is path-keyed + stale-blind, dialect-inverted.** Legis emits **path** renames
  (`git/models.py:31-45`); loomweave's SEI lineage needs **locator** renames and derives them itself
  (`sei_git.rs:182,257`) — off-charter vs frozen lock **§4B** (which assigns locator-rename emission to
  legis). No freshness/cursor → empty `committed:[]` is ambiguous (clean vs stale). **Producer truth
  matches loomweave's report** (not a discrepancy). *since-0615:* STILL-OPEN. *ticket:* memory
  `seam4-rename-path-vs-locator` / seam-health epic.
- **AMBER-6 · No produced-side wire-version discriminator (esp. legis).** Legis **enforces** `schema`
  version on what it consumes from warpline (`client.py:54-55`) but stamps **none** on what it produces
  (`governance_read.v1` lives only in the tool description, not the payload). A consumer can't detect a
  legis contract bump from the wire. *since-0615:* NEW observation. *ticket:* none — note in epic.
- **AMBER-7 · `failed:[]` hardwired on filigree's *ingest response*.** Wardline fixed its *emit* side;
  filigree's scan-ingest **response** still hardwires `failed:[]` and `succeeded`=new-only (drops
  UPDATED) (`adapters.py:355-360`). Not active data loss (ingest is all-or-nothing) but a consumer
  can't tell "0 failed" from "not tracked." *since-0615:* the emit half FIXED, the response half OPEN.
- **AMBER-8 · One fail-closed/load-bearing-shaped seam.** Filigree **hard-blocks** on loomweave's
  registry for scan-ingest (briefing_blocked→403, version-mismatch→no fallback, `db_files.py:1224-1236`).
  The closest thing to a load-bearing dependency in the suite. **Confirm it's scoped to the federation
  *feature* (scan-ingest), not core issue-tracking** (issue create/claim/close don't depend on loomweave)
  — if so, enrich-only holds. *since-0615:* NEW observation.
- **AMBER-9 · `LEGIS_ALLOW_INSECURE_REMOTE_HTTP=1` voids the response-integrity seal** for loomweave/
  filigree reads (`loomweave_client.py:143-159`). Dev/loopback-gated + logged; prod fail-open if set.
  Re-derived as functional-integrity (not security). *ticket:* none.

### ⬜ NOTE — hygiene, provisional, dead paths

- **NOTE-1 · loomweave's orphaned `wardline.yaml` read is a dead consume path** — wardline no longer
  authors `wardline.yaml` (operative config is `weft.toml`); loomweave reads a file that doesn't exist
  (`integration_bindings.rs:18-20`). RESOLVED mystery; harmless dangling read. *ticket:* clarion-7c9336163e.
- **NOTE-2 · SEI is non-deterministic across a from-scratch re-index** (run_id-keyed mint, `sei.rs:10-22`)
  — a sibling caching an SEI across a non-carry rebuild sees a new value. Known design property.
- **NOTE-3 · doctor coverage gaps** — legis has no warpline-wiring check; wardline doctor has no
  loomweave-reachability or attest/legis-key presence check → absent signing keys never surface as amber.
- **NOTE-4 · Governed-binding wedge (availability footgun)** — filigree's `entity-associations` POST is
  on the open classic surface; a fabricated sign-off grants no privilege but can flip a binding to
  governed/non-removable and **wedge an issue close** (`db_entity_associations.py:378-388`). Anticipated
  (ADR-012), deconfliction-not-security posture.
- **NOTE-5 · entity_timeline advertises `required:[repo]` but the handler hard-requires `entity_ref`**
  (warpline `mcp.py:143` vs `:312`) — advertised ≠ enforced (input-affordance violation).
- **NOTE-6 · Governance-field attribution corrected** — filigree DOES emit signature/signoff_seq/
  signed_content_hash on both surfaces; the 06-15 "governed-stale reads as plain row" is a **legis
  consumer** defect, not filigree's emit.
- **NOTE-7 · tabard is name-reservation pre-alpha** — 2 code files (a version string), 14 docs, no
  tool/HTTP/CLI registration; produces nothing real, nothing depends on it. Its `__init__.py` honestly
  declares "the implementation does not exist yet." On-doctrine (refuses confident-empty). Not §7-wired.

---

## Transport & dialect legibility (the "mess" made legible)

The single biggest source of fragility is **transport heterogeneity** — three wire conventions + two
file conventions coexist, and a mismatch is exactly what produced the churn deadlock:

| Transport | Used by | Note |
|---|---|---|
| MCP stdio **newline**-delimited JSON-RPC | warpline-mcp, filigree-mcp, **loomweave-as-client→warpline** | The federation MCP convention |
| MCP stdio **Content-Length** framing (ADR-002) | loomweave's *own* language plugins | **The bug class:** a Content-Length copy hung against warpline's newline reader (the churn NO-GO, now fixed) |
| HTTP (HMAC or bearer or open-loopback) | loomweave read-API, filigree API, legis | Auth varies per seam (G11: filigree binding is transport-open) |
| **Direct file read** | plainweave → wardline `.wardline/*-findings.jsonl` | No MCP/HTTP — and the file omits the scheme prefix (AMBER-3) |
| **Direct SQLite-ro** | plainweave → loomweave `.weft/loomweave/loomweave.db` | Plus HTTP when an endpoint is set (→ RED-2) |

**Dialect spine:** SEI is the intended cross-member key, but the fabric actually joins on **four**
dialects (SEI / qualname / path-locator / fingerprint). The SEI spine is clean where used (loomweave,
legis, filigree associations, warpline refs); it is **absent** on the wardline-findings and
rename-feed seams, which is where the silent join-misses concentrate (AMBER-3/4/5).

**Cross-member consumption is mostly via on-disk artifacts/DBs + HTTP, not via each other's MCP
surfaces** — only loomweave→warpline-mcp and legis→warpline-mcp use a sibling's stdio MCP. Plainweave
consumes *nobody's* MCP surface (files + SQLite + HTTP only).

---

## Structural inversions & surprises (worth knowing)

- **The rename feed is inverted.** Loomweave *produces* the SEI lineage feed but *consumes* legis's
  **path**-rename feed and derives locators itself — off-charter per §4B (AMBER-5).
- **Wardline is inverted.** It *writes into* loomweave's taint-store and *reads* via loomweave resolve,
  but its **findings** reach loomweave only indirectly via Filigree Flow-B (no direct read path).
- **Two producers ship ahead of their consumers** (warpline churn — now caught up; plainweave preflight
  — not). The fabric was *built producer-first*, and the fabric-first Now (PDR-0035) is exactly the
  catch-up.

---

## What changed since the 2026-06-15 seam-health map

| 06-15 finding | 2026-06-29 status |
|---|---|
| wardline `failed:[]` hardwired (P1) | **FIXED** (emit side; real failure tracking, PDR-0023) |
| fingerprint scheme-drift invisible end-to-end (P1) | **FIXED on the Filigree wire**; STILL-OPEN in file artifacts (AMBER-3) |
| dropped-signature → silent ungated close (P1) | **FIXED** (legis fails closed on bad/missing HMAC) |
| closure-gate joins issue_id only, drift-blind (P1) | **STILL-OPEN** (RED-1) |
| warpline DEAD INPUT `capture` (P0) / fails-open-quiet | warpline now runs `assert_inputschema_consumed`; weft_reason triples on every empty. (entity_timeline residual NOTE-5) |
| SEI rename feed fails into a warn (P1) | **STILL-OPEN** path-vs-locator + stale-blind (AMBER-5) |
| filigree forward-freshness structurally "unknown" | confirmed by-design (drift = consumer's job, ADR-029 Decision 3) |
| governed-stale binding reads as plain row | re-attributed: filigree emits fields; **legis consumer** drops them (NOTE-6) |

**Net:** the "can't say I don't know" epidemic is **mostly cured**; two confident-wrong seams remain
(RED-1, RED-2), plus the file-artifact scheme gap.

---

## Action list (NEW vs already-tracked) — for the owner to choose, not yet executed

**Already tracked — no new ticket:**
- `scan_manifest` (AMBER-2) → `weft-9a35aa00e7` (with a clear resolution path now: lift `scan_scope`).
- churn / preflight fills (AMBER-1) → `weft-670ec2fe90` (closeable — landed) / `weft-46b2f002fa`.
- rename-feed §4B, SEI determinism, dialect residuals → seam-health epic / `weft-560f243c95`.

**Genuinely NEW — candidates to file (would otherwise live only in this doc):**
1. **RED-2 plainweave authority_boundary lie** — highest-value new finding; honesty-invariant; small
   fix (route trace-enrich through `resolve_identity_local`, or correct the advertised boundary).
2. **RED-1 closure-gate drift ownership** — assign current-code-vs-attach comparison to one side; today
   it's nobody's.
3. **AMBER-3 scheme prefix in file artifacts** — emit `wlfp2:` (or a header) in `findings.jsonl` so the
   Plainweave file-reader can detect scheme drift.

> This doc is the durable record — these gaps will not evaporate even if no ticket is filed. Filing is
> the owner's call; recommend at least RED-1 + RED-2 get dated tickets in the seam-health epic.

---

## Appendix
Per-member raw maps with full `file:line` citations: `scratchpad/raw-maps.md` (loomweave, warpline,
legis, plainweave, wardline, filigree, tabard).
