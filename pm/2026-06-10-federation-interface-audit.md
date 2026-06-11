# Weft federation interface audit — gap critique

**Date:** 2026-06-10
**Scope:** the cross-member interfaces among **wardline, filigree, legis, loomweave** (Charter excluded — scaffold-state, not one of the four).
**Method:** 10 seams × an 8-point first-principles gold-standard rubric. Each seam was critiqued against **executable source on both sides** (docs are untrustworthy/drifted — source is the authority), then an adversarial second pass killed phantom gaps and hunted missed ones; a synthesis pass deduplicated and ranked. 21 agents, ~1.66M tokens, run 2-at-a-time per the shared-quota rule.
**Framing (as steered):** this is a **critique to surface closeable gaps**, not a confirmation that the interfaces are gold-standard. Where a seam genuinely holds up, it is named so effort isn't wasted there.

Raw structured output: `/tmp/.../tasks/w4f8fivf9.output` (957 lines). Workflow script: `pm/_audit-federation-seams.workflow.js`.

---

## Verdict

**The interfaces are sound as contract *designs* — but not yet gold-standard, for two systemic reasons.**

1. **Conformance is proven by hand-transcription, not by an executable shared oracle.** The same wire contract is re-encoded independently in 2–3 repos/languages on nearly every seam (S1, S2, S4, S5, S6, S7, S9). Producer/consumer drift is therefore undetectable until production. On most seams this is latent risk; on **S8 it is already load-bearing** (gap G1, critical).

2. **The 2026-06-09 emit-topology drift (S10) leaves 3 of 4 Python members unregistered/misrouted** — so even correct contracts don't reach the tracker *today*.

The single critical contract defect (**G1**), the missing executable conformance oracle (G6/G12/G14/G15/G16), and the emit-topology drift (G5) must close before any of this is called gold-standard.

**Gap count:** 25 total — **1 critical, 4 high, 14 medium, 6 low.**
**Axis split:** ~20 **contract**, 5 **deployment**. The dominant contract theme is the missing executable oracle (GS-7). The deployment gaps are overwhelmingly the emit-topology/registration drift (G5, tracked) and its consequences.

---

## The rubric (gold-standard, from first principles)

| | Criterion |
|---|---|
| **GS-1** | **Contract symmetry** — producer emits byte-for-byte what consumer reads (field names, enums, envelope, key spelling). |
| **GS-2** | **Enrich-only / graceful degradation** — removing/outage of either side never breaks the other's core flow; writes off-by-default or additive. |
| **GS-3** | **Opacity / encapsulation** — holder of a foreign value stores it verbatim, never parses it; owner is sole schema authority. |
| **GS-4** | **Identity discipline** — durable bindings key on SEI (stable), not a mutable locator; identity vs content axes separate; drift detected on consumer read path. |
| **GS-5** | **Evolution safety** — surfaces versioned/named/pinnable; additive evolution; closed error enum switched on code not status. |
| **GS-6** | **Failure direction** — fail-closed where ambiguity is dangerous; fail-open where absence is benign. |
| **GS-7** | **Single source of truth + proven conformance** — schema owned once, not restated where it can drift; conformance *run*, not asserted. |
| **GS-8** | **Runtime reachability** — verifiable live; misroutes detectable. *Not verifiable from source — deferred to the live probe.* |

---

## Ranked gap register

Every gap is closeable: it carries a remediation and a tracking id (or **UNTRACKED**). Evidence is `producer-file:line` ↔ `consumer-file:line`.

### Critical

**G1 — `findings` key is unregistered & unvalidated; a silent producer rename routes ZERO findings under a green `verified` status** · seam S8 · *contract* · GS-1+GS-7 · **UNTRACKED → file P0**
Producer `wardline/core/legis.py:252` emits bare `"findings": findings` (no shared constant). Consumer `legis/wardline/ingest.py:360` reads `scan.get("findings", [])` with an empty default. `verify_wardline_artifact` (`ingest.py:160-241`) does **not** include `findings` in its required-field set (`ARTIFACT_PROVENANCE_FIELDS`, `:28-33` — only scanner_identity, rule_set_version, commit_sha, tree_sha). A rename to `findings_list` + re-sign **passes** HMAC (recomputed over the new dict; no key-set schema check), `active_defects` gets the empty default, and `route_wardline_scan` returns `RoutedScan(routed=[], artifact_status="verified")` (`service/wardline.py:238-240`). The entire Wardline→Legis defect flow breaks silently with green status.
→ **Fix:** register `findings` as a required key (shared constant both sides), validate presence in `verify_wardline_artifact` *before* signature verification (mirror `ingest.py:223-230`); add a cross-impl golden vector to `legis/tests/wardline/test_ingest.py`.

### High

**G3 — Filigree 503s and drops the whole findings batch when a configured Loomweave is unreachable** · seam S5 · *deployment* · GS-2 · **UNTRACKED**
`FiligreeDB.__init__` (`core.py:1670`) sets `allow_local_fallback` from config, **default False**. With Loomweave configured-but-down, `db_files.py:1192` raises `RegistryUnavailableError`, dashboard `files.py:670-671` returns 503, the POST fails, no finding reaches the tracker. Doctrine's "compose-absent" means resilient to *unavailable*, not merely never-configured.
→ **Fix:** make enrich-only the default — fall back to local registry on unreachability, or error at config-time if Loomweave is configured without fallback.

**G4 — `FindingsSummary` severity rollups count baselined/waived findings as open** · seam S5 · *contract* · GS-4 · `weft-171fc22a50`
Row-level data correctly separates status + suppression_state. But `get_*_findings_summary` / `get_global_findings_stats` (`db_files.py:2639-2687`) bucket severity using only `_OPEN_FINDINGS_FILTER` and **never consult suppression_state** — one active HIGH + one baselined HIGH returns `{'high': 2}`. Orthogonality holds at row level, breaks at rollup. *This is the real residual of `weft-171fc22a50`* (see reconciliation below — the promote path is correctly guarded; the rollup is the gap).
→ **Fix:** split the summary into suppressed buckets, or add an actionable-open API excluding baselined/waived.

**G5 — server.json emit topology drifted; 3/4 members unreachable at the canonical endpoint** · seam S10 · *deployment* · GS-8 · `weft-7436c1959e`
`server.json` lists only `filigree@…/.filigree` (legacy) and `lacuna@…/.weft/filigree`. Probe 2026-06-09: legis unregistered (401), wardline at `:8659` not `:8749`, filigree on legacy path/`:8834`. Code design is sound; pure wiring drift.
→ **Fix:** per `pm/2026-06-09-federation-emit-remediation.md` Changes 1–2 (repoint URLs, register stores, unregister legacy key, probe).

**G6 — Wardline does not run the shared SEI conformance oracle** · seam S1 · *contract* · GS-7 · `weft-560f243c95`
Legis runs `tests/conformance/test_sei_oracle.py` in CI (`.github/workflows/ci.yml:25`); wardline has no equivalent — it uses `FakeClient` mocks (`tests/unit/loomweave/test_sei_resolver.py:10-31`) and an env-gated, non-CI live test. The spine is uniform *in principle* but conformance proof diverges: legis proven, wardline unproven.
→ **Fix:** add `wardline/tests/conformance/test_sei_oracle.py` mirroring legis's, as a required CI check.

### Medium (G7–G17)

| ID | Gap | Seam | Axis | Crit | Track |
|---|---|---|---|---|---|
| **G2** | **No resolve-by-historical-locator surface** — legis SEI backfill resolves by the stored (pre-move) locator (`sei_backfill.py:83-84`); Loomweave's `resolve_locator` matches only `current_locator` on alive bindings (`sei.rs:209-212`, handler `identity.rs:139-151` → `not_found`). An entity moved *between* legacy-record creation and backfill gets no SEI. **Degrades gracefully** (marked unresolved, resumable — `sei_backfill.py:121-129`), not a crash; deliberate alive-only design. *Verified against source 2026-06-10 — real but narrower than the synthesis pass implied.* | S1 | contract | GS-4 | `weft-feea638ec0` |
| **G7** | Write-path 401 (HMAC/clock-skew) routes **loud** not fail-soft, aborting the scan before findings return (`wardline/loomweave/client.py:225-227` only softens 403; Loomweave 401 at `auth.rs:198-204`) — violates ADR-036 fail-soft | S3 | contract | GS-2 | UNTRACKED |
| **G8** | Legis governance `resolve_batch`/`resolve_sei` calls **unguarded** vs guarded `lineage` — outage breaks backfill resumability and **500s** `/governance/identity-gaps` (`sei_backfill.py:84`, `gaps.py:65` vs `:102`) | S6 | contract | GS-2 | UNTRACKED |
| **G9** | Property `:setter`/`:deleter` qualname suffix leaks onto the wire (`wardline/scanner/index.py:133-135`); Loomweave reconciler does exact byte-match (`wardline_reconcile.rs:54-55`) → never matches → `confidence=None` silently | S4 | contract | GS-1 | UNTRACKED |
| **G10** | Reverse-lookup entity-assoc endpoint is per-project scoped; multi-project consumer (`issues_for`) silently misses bindings in non-default projects (`filigree.rs:711-717` carries no project selector) | S2+S10 | deployment | GS-6 | UNTRACKED |
| **G11** | Bind-issue write provenance unverifiable — Legis **signs** X-Weft-* headers (`client.py:50-69`), Filigree's classic POST route **ignores** them (`entities.py:122-176`); dead signing handshake | S7 | contract | completeness | UNTRACKED |
| **G12** | No real-HTTP oracle for Legis↔Filigree bind + closure-gate — both sides tested only against mocks/stubs | S7 | contract | GS-7 | UNTRACKED |
| **G13** | `dirty` posture key bare-literal both sides, unsigned-only, no shared constant — silent rename loses dirty-tree observability (`wardline/core/legis.py:292` ↔ `legis/wardline/ingest.py:202`) | S8 | contract | GS-1+GS-5 | `weft-61d27fb808` |
| **G14** | SEI conformance oracle hand-transcribed in 3 repos/langs, never machine-loaded from the normative JSON | S1 | contract | GS-7 | UNTRACKED |
| **G15** | No oracle proving Loomweave `EntityAssociation` deserialization matches Filigree emission; `loomweave_entity_id` rename hard-fails serde with no `default`/`alias` (`filigree.rs:78`) | S2 | contract | GS-1/5/7 | UNTRACKED |
| **G16** | Legis↔Loomweave rename-JSON parser re-implemented per repo with a one-way conformance test (`sei_git.rs:292-311` ↔ `test_git_renames_contract.py:20-27`) | S6 | contract | GS-7 | UNTRACKED |
| **G17** | Wardline vocab-descriptor consumer fixture drifted (omits `schema` key) and consumer ignores the schema format-version gate (`loomweave wardline_descriptor.py:140-188`) | S9 | contract | GS-7+GS-5 | `clarion-6ab5668d82` (partial — file focused counterpart) |

### Low (G18–G25)

| ID | Gap | Seam | Track |
|---|---|---|---|
| **G18** | Filigree hardcodes suppression-filter vocab independent of Wardline's `SuppressionState` enum, no oracle (`db_files.py:97`) | S5 | UNTRACKED |
| **G19** | Wardline soft/loud HTTP routing keys on status code, not Loomweave's closed `ErrorCode` enum — future soft 4xx (429) misclassifies | S3 | UNTRACKED |
| **G20** | `migrate_store_to_weft` never unregisters the old key on relocation — legacy `.filigree` key lingers (`core.py:816-895`) | S10 | `weft-a9ae398c5b` |
| **G21** | `scan_route` tool description omits keyless-posture support — operator wrongly concludes dirty trees are rejected (`legis/mcp.py:303-310`) | S8+S10 | `weft-1e7eeec1b6` |
| **G22** | Unscoped classic **reads** silently resolve to default project; no consumer warning/docs (`dashboard.py:978-982`) | S10 | UNTRACKED |
| **G23** | ADR-002 documents stale `/api/loom` paths; code serves `/api/weft` | S10 | UNTRACKED |
| **G24** | `module_dotted_name` split-primitive divergence on non-normalized paths; "byte-for-byte" claim understates the normalized-relpath precondition | S4 | UNTRACKED |
| **G25** | Qualname parity fixtures asymmetric; Loomweave lacks property-setter coverage, so G9 is undetectable by current fixtures | S4 | UNTRACKED |

---

## Untracked gaps needing a ticket (the action list)

**Filed 2026-06-10:**
- **G1 → `weft-37455bf407`** (P1 bug) — `findings` key validation; the one that breaks the defect flow silently under a green status.
- **G3 → `weft-2f86803f0a`** (P2 bug) — Filigree 503 drops batch on Loomweave outage.

> G2 is real (verified) and tracked under the existing move-stability spike `weft-feea638ec0` — no new ticket; link the resolve-by-historical-locator gap into it.

**File at appropriate priority:** G7, G8, G9, G10, G11, G12, G14, G15, G16, G18, G19, G22, G23, G24, G25.
- **G14/G15/G16/G12 + G6** share a root: **stand up one executable cross-repo conformance harness** (canonical wire-shape fixtures loaded by producer and every consumer CI). Consider one umbrella ticket with per-seam children rather than 5 separate ones.

**Partial:** G17 is nominally under `clarion-6ab5668d82` (broad Task-B scope) — the conformance-fixture + schema-gate halves are effectively untracked; file a focused counterpart or expand that ticket's acceptance criteria.

> ⚠️ The audit's deepen pass invented two fake ticket slugs (`weft-pending-entity-assoc-scope`, `weft-classic-read-default-behavior-doc`). **These are not real ids** — the corresponding gaps (G10, G22) are genuinely UNTRACKED.

---

## Ticket reconciliation (what to close / rescope)

| Ticket | Verdict vs source | Action |
|---|---|---|
| `weft-171fc22a50` | **still real** but conflated — promote path is correctly fail-closed (`db_files.py:2510-2528`); the real gap is the **summary rollup** (G4) | Rescope to the rollup; note promote is working-as-intended |
| `weft-61d27fb808` | **still real** — `dirty` key unpinned, unsigned-only (G13) | Keep open; sequence behind C-9 (`weft-a2f4cf95c7`) |
| `weft-1e7eeec1b6` | **still real** — keyless-posture doc gap (G21) | Keep open |
| `weft-7436c1959e`, `weft-c7511201ed`, `weft-a9ae398c5b` | **still real** — emit drift + liveness + register dedup (G5, G20) | Keep open; G20 needs `migrate_store_to_weft` to call `unregister_project` |
| `weft-eff938d3b6` | **misscoped** — write routes self-scope via `_check_id_prefix` (`core.py:2104-2134`, raises 400). Real residual is the **read** endpoint not echoing `X-Filigree-Project` (G10/G22) | Rescope to the read-path/header issue |
| `weft-e618c4118a` | **misscoped** — fingerprint-rekey is future (P4) work; Filigree has zero `drifted_from` support | Reclassify as future, not a live gap |
| `weft-08124cad2c` | **fixed but not on main** — fixes are on rc4 branch (commits e3e1e7a, 0a551c4, 4928fbd), **not yet on `main`** | Propagation lag — confirm cutover before treating as closed (ties to `weft-71ce4f8253`) |
| `weft-4a9d0f863c` | **fixed in source** — join-key soundness gate present (`test_identity_parity.py:107-132`) | Confirm closed |
| `weft-ef79348eb2` | **fixed & verified sound** — `suppression_state` adopted both sides, lives in the *signed* array (rename breaks loudly — unlike `dirty`) | Confirm closed |
| `weft-2b71565563`, `weft-57899a1310`, `weft-a92805f4cf` | **not applicable to these seams** (path_glob is a query feature; the other two don't resolve against source — possible stale/mistyped ids) | Verify ids exist; descope from the federation story |

---

## Tickets filed (2026-06-10)

All gaps are now tracked. Hub parents carry label `federation-audit` + `has-counterpart`; member counterparts carry `federation-audit` + `from-weft-hub` with the hub id in prose (no cross-DB deps). Full gap→hub→member map: `pm/_audit-ticket-map.txt` (creation script: `pm/_create-audit-tickets.sh`).

- **17 hub tickets** created this session (16 gap tickets + 1 oracle umbrella `weft-43e8fcda0c`); **8 existing** hub tickets relabeled into the audit set; **35 member counterparts** across filigree (10) / legis (8) / wardline (10) / loomweave-`clarion` (7).
- **Oracle umbrella `weft-43e8fcda0c`** parents the GS-7 cluster: G6 (`weft-560f243c95`), G12 (`weft-513aa35a08`), G14 (`weft-8f1c6c512e`), G15 (`weft-045076e30f`), G16 (`weft-06b5fa64dd`).
- **Critical/high hub ids:** G1 `weft-37455bf407`, G2 `weft-feea638ec0`, G3 `weft-2f86803f0a`, G4 `weft-171fc22a50`, G5 `weft-7436c1959e`, G6 `weft-560f243c95`.
- **G5** (emit-topology drift) is hub-only by design — no member-code counterpart; remediation is the ops runbook.
- Two existing tickets to **rescope** (noted in counterpart prose): `weft-171fc22a50` → the summary rollup (G4; promote path is correctly guarded), and the loomweave-side `clarion-6ab5668d82` → the schema-gate + fixture-from-producer-bytes halves (G17).

## Strongest seams (don't waste effort here)

- **S3 — Wardline→Loomweave taint-store (ADR-036):** symmetry, opacity, fail-direction all hold. Only residuals are the 401-loud edge (G7) and enum-vs-status routing (G19) — small hardening, not design flaws.
- **S7 — Legis↔Filigree sign-off + gate:** byte-for-byte field agreement on both bind and gate directions (409/200/500/404). Real gaps are proof completeness (G12) and the dead signing handshake (G11), **not the contract shape**.
- **S1 — SEI identity spine (contract layer):** field names match, opacity holds, graceful degrade works. The spine *design* is uniform — but its conformance proof (G6, G14) and move-recovery (G2) are not done. Don't re-litigate the shape; do close the proof + recovery.

---

## Audit caveats & confidence

- **Confidence: high** on contract-symmetry findings (read from source both sides with file:line). **G1 and G2 were re-verified against source directly on 2026-06-10** after an audit-internal provenance flaw: the synthesis pass (which cannot read source) had revived G2 after the only source-reading pass killed it. G1 confirmed critical; G2 confirmed real but downgraded high→medium and reframed (graceful degrade, design limitation). Other findings carry the agents' cited file:line but were not all independently re-read — treat medium/low items as leads to confirm at fix time. **Deferred** on all GS-8 runtime claims — these rest on the 2026-06-09 probe, not source; **re-probe before trusting current wiring state** (and note propagation tickets `weft-677779a3d0/46f866cb85/71ce4f8253` mean installed builds may lag the source audited here).
- **Deconfliction-first lens held:** G1, G11 were re-derived from security-shaped surfaces into functional/availability terms (a misrouted/unvalidated emit = findings-don't-reach-the-tracker, not a breach).
- This audit critiques **contracts and code**, not running deployments. The contract axis is the durable signal; the deployment axis is mostly the known, tracked emit drift.
