# Dogfood #2 — Reconciliation Pass (code as of 2026-06-08 PM)

_Authored 2026-06-08 (`dogfood-reconciler`). This **builds on**, and does not replace,
[`2026-06-08-dogfood-findings-gap-analysis.md`](2026-06-08-dogfood-findings-gap-analysis.md)
(the prior 5-agent code-grounded pass) and the original
[2026-06-07 dogfood report](../../weft-dogfood-findings-2026-06-07.md)._

**Why a second pass.** The member repos moved *after* the gap-analysis doc was written:
filigree → rc9 (`b6cfc29`), wardline `f22aaa5`, legis `18c3a11`, loomweave `8759d16`/`6057b69`/`1b1c258`.
Several of the gap-analysis doc's own "new opportunities" carry commits **claiming** to close them.
This pass verifies each claim against the doc's **specific residual text and its test** — a commit
subject that says "fixes opp #N" is a claim to verify, not a fact (the exact failure mode the
original report kept hitting). Method: 10-agent workflow (5 area reconcilers → 5 adversarial
verifiers that try to *refute* every "resolved" and "new-gap" claim against code + tests).
**Result: 0 claims overturned, 2 adjusted (W3, legis opp#6 — fix present but the doc's exact residual
not covered / not tested), all 11 new gaps confirmed.** Framing stays deconfliction-first, not security.

---

## Headline: one genuine regression, several real advances, one stale tracker

**🔴 The F1 symptom has resurfaced for the filigree + wardline repos (NEW, untracked, P2).** The
2026-06-07 report's headline was "an agent's findings never reach the tracker." It was declared fixed.
For the filigree and wardline repos' *own* dogfood scans it is **live again** — their `.mcp.json`
emit URLs don't reach the federation daemon, so their findings never reach the **federated** tracker
(local scan records still exist; only the federated emit fails).

**Verified federation topology** (`ss -ltnp` + the single `~/.config/filigree/server.json`): there is
**one shared server-mode federation daemon on `:8749`** (`"port": 8749`, registers projects `filigree`
+ `lacuna`, enforces the N1 path-scoping/fail-closed). The other listeners — `:8659`, `:9212`
(this session's weft dashboard), loomweave's `:9730` — are **per-project local dashboards/read-APIs,
not federation emit endpoints.** `:8834` is **down** (no listener at all).

| member `.mcp.json` emit | points at | reality | result |
|---|---|---|---|
| filigree → `:8834/api/weft/scan-results` | a port with **no process** | `curl` → 000 | `reachable:false` — federated emit drops |
| wardline → `:8659/api/weft/scan-results` | a *local* filigree dashboard (pid 616532), **not** the federation daemon | **401** | federated emit drops |
| legis → `:8749/api/p/legis/weft/scan-results` | shared federation daemon ✓ path-scoped | but `legis` **not in `server.json`** | would 401/404 until registered |
| lacuna → `:8749/api/p/lacuna/weft/scan-results` | shared federation daemon ✓ path-scoped + registered | works | ✓ |

So the gap-analysis doc's **opp #2 is materially wrong** and must be re-scoped: it is **not** "all four
members unscoped → path-scope all four." Only **lacuna is fully correct.** legis is correctly *pointed*
but not *registered*; filigree and wardline point at a dead port and a local dashboard respectively.

**The fix is not a one-line URL edit, and the intended topology is undocumented.** The hub docs
(`conventions.md`, `launch-runbook.md`, `federation-map.md`) **never state** the daemon-port model —
which is why these four configs drifted with no way to validate them. Before repointing anything, the
**intended topology must be settled and written down**: are filigree/wardline/legis *meant* to have
federation projects on the shared `:8749` daemon (in which case they must be **registered in
`server.json`** *and* repointed **path-scoped** — unscoped would re-trip the N1 fail-closed 400 and,
pre-N1, was the contamination vector), or are some members meant to keep findings in their own local
tracker (in which case `:8834`/`:8659` are local-dashboard targets and the bug is operational — daemon
down / wrong token — not a repoint)? The evidence (server.json registers filigree on `:8749`; legis +
lacuna already point there scoped) favors **the shared-daemon reading for at least filigree + legis** —
under which filigree's `:8834` and wardline's `:8659` are stale/wrong and the correct fix is
**register-in-`server.json` + repoint path-scoped to `:8749/api/p/<member>/`**. _Evidence:
`filigree/.mcp.json:24`, `wardline/.mcp.json:24`, `~/.config/filigree/server.json`, `ss -ltnp` live probes._

**🟢 Real advances since the doc** (verified, with tests): loomweave's C1 doctor self-heal, the
filigree suppression_state field (opp #3), legis's scan_route posture echo (opp #6), the loomweave
WAL-checkpoint verb (C-2 half), content-keyed finding ids, and the SCHEMA_MISMATCH P1 is cleared
(27==27, rc9). Details below.

**🟡 One stale tracker item:** **N6** (`weft-c815d5e77d`) is still in `triage` though its fix is
committed (`0a99380`), tested, and rc9-bumped (`7223a25`). Close it.

---

## (a) What moved since the gap-analysis doc — delta scorecard

Only items whose status **changed** (or whose change-claim needed verifying) are listed. Items the
prior doc already settled and that regression-check clean (W1, W2, F3, N1, N5, LG-1, C-4-foreign,
C3-legis) are omitted — they remain fixed.

| ID | Gap-analysis doc said | Verified status NOW | Commit | Verdict |
|---|---|---|---|---|
| **opp #2** (.mcp.json scoping) | all four unscoped → fail-closed 400 → silent NON-emit | **misdiagnosed / re-scope** — legis+lacuna scoped; filigree+wardline point at dead/wrong ports (soft-drop, not 400) | — | doc claim falsified on 3 counts |
| **C1 / opp #4** (loomweave doctor self-heal) | PARTIAL — no git-tracked detection, warn-only | **resolved (the doc residual)**, but a **new** residual inside it | `8759d16` `6057b69` | adjusted → still_partial (new scope) |
| **opp #3** (filigree suppression_state top-level field) | residual of N2 | **resolved** end-to-end, tested | `b6cfc29` | confirmed |
| **opp #6** (legis scan_route posture echo) | scan_route has no posture field | **resolved in code**; DIRTY/VERIFIED root echo **untested** | `18c3a11` | adjusted → still_partial (under-tested) |
| **N6** (linked-issue status on finding) | complete | **confirmed complete**; tracker stuck in `triage` | `0a99380` `7223a25` | confirmed; close ticket |
| **C-2 WAL** (loomweave half) | open | **resolved** (`loomweave db checkpoint`, busy-handled, tested) | `1b1c258` | confirmed; filigree half still open |
| **f506e5f845 item 3** (loomweave findings accumulate on re-run) | untracked | **resolved** (content-keyed ids, regression test) | `b66c58d` | confirmed |
| **W3 / opp #8** (wardline summary buckets) | PARTIAL — trio under-sums | **pagination half fixed; the doc's actual summary-block residual still open** | `f22aaa5` | adjusted → still_partial |
| **SCHEMA_MISMATCH** (hub filigree-mcp v26 vs DB v27) | P1 blocker | **resolved** (27==27, CLI rc9) | — | confirmed; close WS-0 |
| **C-9** (shared weft.toml) | no weft.toml exists anywhere | **proposal now drafted** (loomweave `234fe7f`, 204 lines) — but **in loomweave's repo, hub not blessed** | `234fe7f` | progress; still open |
| **C3 / opp #1** (filigree verified_author on HTTP) | CONFIRMED-PRESENT | **still open** — `b6cfc29` made the NULL *discoverable* (posture surface) + deferred to `filigree-81d3971467`; the write is still unstamped | `b6cfc29` | confirmed still open |
| **N2** (suppression → first-class status) | PARTIAL | **still partial** — field shipped (opp #3) but ingest still hardcodes `status='open'`; `acknowledged` status not taken | `b6cfc29` | confirmed; re-scope to status half |
| **opp #5** (legis hints → `legis doctor`) | enhancement | **not implemented** (zero `doctor` mention in `mcp.py`) | — | still open |
| **opp #7** (loomweave reinstall gitignore refresh) | open | **still open**, now coupled to the new doctor `--fix` gap | — | confirmed |
| **F1 doc-lag** (`conventions.md:142`) | wardline row reads as future | **still stale** (reworded but still describes pre-rename token order) | — | confirmed |
| **N4 re-scope** | re-scope tracker framing | code confirms misdiagnosis; **tracker title still mis-framed** | — | confirmed; rename ticket |
| **N2-dirty wire contract** | CONFIRMED-PRESENT (bare literal both ends) | **unchanged** — still bare literal, unpinned, no fixture | — | confirmed; behind C-9 |

---

## (b) Still-open / partial set — what's actually left (verified, with the precise residual)

1. **C1 self-heal has a hole that defeats its own purpose (P2, loomweave, NEW).** `doctor --fix`
   runs `git rm --cached` for the runtime db (`doctor.rs:379`) but **never writes/refreshes the
   corrected `.gitignore`**. For C1's exact target population — pre-ADR-005 checkouts whose gitignore
   never listed `loomweave.db` — the db is untracked, doctor reports "fixed" with a green exit, and
   the dirty tree **silently returns on the next `git add -A`**. The fix and the residual are the same
   missing capability seen from `doctor --fix` and from idempotent reinstall (opp #7) — fix once
   (ensure gitignore alongside the untrack). _Verified end-to-end; `doctor.rs:379-397`, no gitignore
   write logic anywhere in `doctor.rs`._

2. **filigree `finding_list` can't filter to suppressed/baselined (P2).** The N2 residual, sharpened
   by opp #3: `suppression_state` is now a top-level field (good — an agent reading every row can see
   it), but ingest still hardcodes `status='open'` (`db_files.py:1238-1242`), so an agent that triages
   by `finding_list status:open` (the natural first call) **still gets baselined defects mixed into
   "open work."** Decide: map `suppression_state` → `acknowledged` at ingest, OR add a
   `suppression_state` filter to the status query. _The cheaper field-half (opp #3) is done; only the
   status-mapping decision (weft-171fc22a50) remains._

3. **filigree HTTP writes still record `verified_author: NULL` (P3, C3/opp #1).** `b6cfc29` did **not**
   close this — it added an honest *posture* surface (`mcp_status_get` + `/api/health` actor_verification)
   that makes the drop **discoverable**, and explicitly defers real transport-bound verification to
   `filigree-81d3971467`. The per-request db is set at `mcp_server.py:1118` with no `set_verified_actor`;
   only the stdio db is stamped. _This is now a referenced deferral, not an untracked gap — confirm
   `filigree-81d3971467` exists in the tracker._

4. **wardline `agent_summary` summary-block still doesn't reconcile (P2, W3/opp #8).** `f22aaa5`
   fixed a *real but different* bug — the **display-array** pagination drop (leaked non-defect findings
   had no display slot, so a paginating agent silently missed them; now well-tested). But the doc's
   actual opp #8 residual was the **summary-block count trio** (`summary.active_defects +
   suppressed_findings + engine_facts`), which still under-sums vs `total_findings` and still mixes a
   partition with overlapping sub-counts (`engine_facts ⊂ informational`; `baselined/waived/judged ⊂
   suppressed_findings`) with no in-band label and **no test asserting the summary block reconciles**.
   Re-scope opp #8: the pagination half is done; file the summary-block half as a distinct wardline
   issue. _`agent_summary.py:132-148`._

5. **legis opp#6 root posture echo is under-tested (P3).** `18c3a11` correctly echoes `artifact_status`
   at the scan_route root on both transports, single-sourced from `verify_wardline_artifact`. But the
   root-echo test (`test_server.py:926`) covers **only** the `unverified` posture; the doc's exact edge
   — distinguish dev-grade **DIRTY** from CI-grade **VERIFIED** at the response root — is asserted only
   at the per-record provenance level. A refactor dropping `result.artifact_status` for those postures
   would pass CI. Add direct root-echo assertions for DIRTY + VERIFIED, and one HTTP-root test.

6. **legis hints never name `legis doctor` (P3, opp #5).** The per-key recovery hints are good
   (`mcp.py:376-393`), but on `INVALID_CELL_SPEC`/`CELL_NOT_ENABLED` an agent learns only the single
   key it hit; the full unconfigured-cell inventory exists CLI-only (`doctor.py:358,390`). One added
   line ("run `legis doctor` for the full inventory") collapses N single-key discoveries into one call.

7. **C-9 shared `weft.toml` still un-blessed (P2).** Progress: loomweave drafted a 204-line proposal
   (`234fe7f`) — but it lives in **loomweave's** repo, unpulled into the hub; §A-14 and `conventions.md`
   both still say PENDING. The member-private form is pinned; the **shared layer** (section naming,
   sibling-endpoint home, precedence) is not. This is the parent of the N2-dirty pin.

8. **N2-dirty wire contract unpinned (P2).** `wardline/core/legis.py:288` `scan['dirty']=True` →
   `legis/wardline/ingest.py:202` `scan.get('dirty')` — bare literal both ends, no shared constant,
   in no hub doc/glossary/fixture. A wardline rename silently breaks legis's dirty-tree gate. Sequenced
   behind C-9.

9. **Doc/tracker reconciliations not yet applied:** `conventions.md:142` (F1 token row still describes
   pre-rename order); N4 tracker title still carries the misdiagnosed "governance unreachable on a
   dirty tree" framing (code proves default posture governs-and-marks-DIRTY).

---

## (c) Genuinely NEW gaps this pass found (all adversarially verified; deduped vs the doc's 8)

1. **[P2 · config-surface] filigree + wardline `.mcp.json` emit don't reach the federation daemon → F1
   resurfaced.** The headline above. filigree→`:8834` (dead), wardline→`:8659` (a local dashboard, 401).
   Their findings never reach the **federated** tracker. **Fix has a prerequisite, not a one-liner:**
   first settle + document the intended topology (new gap c.3a); then, under the shared-daemon reading,
   **register each member project in `:8749`'s `server.json`** (currently only filigree + lacuna — see #4)
   **and** repoint **path-scoped** to `:8749/api/p/<member>/weft/scan-results` (path-scoped, never
   unscoped — unscoped re-trips the N1 400 / was the contamination vector). _Untracked._

2. **[P2 · message-quality] Cross-member 400 contract mismatch.** filigree's N1 fail-closed 400 means
   *"scope your write (config fix)"* but wardline treats **every** 400 as *"I built a bad payload"* and
   **hard-fails the whole scan** (`FiligreeEmitError` → CLI exit 2 / MCP `isError`), blaming itself —
   the opposite of filigree's actionable hint, and it kills the scan, not just the emit. wardline should
   special-case the ambiguous-write 400 as a soft, actionable "scope your emit URL." _filigree
   `dashboard.py:895-899` vs wardline `filigree_emit.py:268-271`. (Note: this *corrects* the doc's opp #2
   "silent NON-emit" — a 400 is loud; but no current member actually reaches it, they hit the dead-port/401
   soft-drops of #1 instead.)_

3. **[P2 · product-gap] `launch-runbook.md` omits the federation emit topology and is one rc stale.**
   The runbook's "Current deployment state" covers install order, token, and schema, but never the
   scan-results emit URLs, the `:8749` server-mode vs `:8659`/`:8834` split, or which member points
   where — so an operator/agent cutting the suite over has **no check** that each member's emit URL is
   live (and would not have caught #1). Also says "installed rc8"; installed is rc9. _`launch-runbook.md:18-48`._

3a. **[P2 · product-gap] The federation daemon-port topology is undocumented.** No hub doc
   (`conventions.md`, `launch-runbook.md`, `federation-map.md`) states the one-shared-`:8749`-daemon vs
   per-member-dashboard model, which member emits where, or which projects must be registered. This is
   the **root cause** of #1 and c.4 — four `.mcp.json` emit URLs drifted to three different ports with no
   spec to validate against. Document it (the operative model: `:8749` server-mode = federation transport,
   members emit path-scoped + registered; `:86xx`/`:92xx`/`:9730` = local UIs) **before** repointing configs.

4. **[P3 · accounting] `:8749` daemon's `server.json` registers only filigree + lacuna, under legacy
   `.filigree` paths.** legis and wardline are absent, so even a correctly path-scoped emit to
   `/api/p/legis/...` would fail — and because auth runs **before** project resolution, an unregistered
   scoped path is **indistinguishable from an auth failure** (both 401). Couples to #1's fix: repointing
   isn't enough; the projects must be registered (and the stale legacy-path registration is the C2 root).

5. **[P2 · accounting] wardline summary-block recomputes counts with no cross-layer agreement check.**
   `agent_summary.py:91-93` recomputes `active/suppressed/facts` locally while `total/informational`
   pass through from `ScanSummary` — nothing asserts the two layers agree on the agent's **first** read
   surface. (The W3/opp #8 residual, root-caused.)

6. **[P3 · message-quality] filigree `scan_trigger.file_summary` is a pre-scan posture that can read as
   a fresh-scan green.** Computed at trigger time before the scanner POSTs back (`scanners.py:980`); an
   agent could relay "triggered, 0 findings" as a result. Disclosed in the docstring, but an in-band
   `as_of: pre-scan` marker would prevent the misread.

7. **[P3 · bug] loomweave `db_tracked_state` detects `loomweave.db` only, not WAL/SHM sidecars.**
   `git_untrack_db` unstages all three but only the db is *detected* (`doctor.rs:356-368`). Narrow edge
   (a checkout with tracked WAL but untracked db is implausible), but the detect/remediate scopes should match.

8. **[P3 · enhancement] legis `SKIPPED_DIRTY_TREE` amber-skip root lacks `artifact_status`** while the
   ROUTED path now carries it (opp #6) — asymmetric root surface. Likely intentional (the skip payload
   is *more* informative: posture+cause+remediation), but an agent branching on a single root key must
   switch shapes. Low priority / possibly no-action.

---

## (d) Recommended tracker actions

**Close (code complete + verified):**
- `weft-c815d5e77d` (N6) — committed `0a99380`, tested, rc9. Stuck in `triage`. _Caveat: this closes the
  **filigree read-side** half (surface linked-issue status; don't re-mint work against a dismissed issue).
  The report's wardline-side half — `seen_count` climbing on rescan — is a wardline emit-lifecycle concern
  (per the prior doc, out of filigree scope); confirm it's tracked or explicitly out-of-scope before closing._
- `weft-df8d2ef454` (N3) — recovery hints name config keys; keyless reachability pinned (`7b15c11`).
- `weft-a7a92a40dd` (N4) — **and rename**: drop "governance unreachable on a dirty tree"; the default
  keyless posture governs-and-marks-DIRTY. Retain only "signing is clean-tree-only."

**Advance / re-scope:**
- `weft-ef79348eb2` (W3 suppression_state, legis) — adoption complete + fail-safe; move out of `in_progress`.
- `weft-d822a7de2d` (C1) — out of `triage`; doctor self-heal shipped. **Split out the residual:** doctor
  `--fix` must also ensure the `.gitignore` (new gap c.1) — same fix closes opp #7.
- `weft-f506e5f845` (residual tail) — out of `triage`; L1, N5, and loomweave finding-accumulation landed.
- `weft-171fc22a50` (N2) — narrow to the **status-mapping decision only**; the top-level-field half (opp #3)
  shipped in `b6cfc29`.
- `weft-8e3d02f409` (C-2) — loomweave half done (`1b1c258`); keep open for the filigree WAL half.
- `weft-a2f4cf95c7` (C-9) — advance to in-review; loomweave's proposal (`234fe7f`) delivered the "drafts"
  half; remaining work is the **hub bless** (pull the proposal into the hub, ratify the shared layer).
- `weft-61d27fb808` (N2-dirty) — keep open, correctly sequenced behind C-9.
- `weft-677779a3d0` (Propagation: filigree) — SCHEMA_MISMATCH sub-blocker resolved (27==27, rc9); remaining
  is merge/push, not a functional gate.

**File (new, untracked):**
- **P2** — document the federation daemon-port topology (new gap c.3a) — **prerequisite** for the next item.
- **P2** — filigree+wardline `.mcp.json` emit don't reach the federation daemon (new gap c.1); requires
  registering each member in `:8749`'s `server.json` (new gap c.4) + path-scoped repoint.
- **P2** — wardline: special-case the ambiguous-write 400 as a soft, actionable "scope your emit URL" (c.2).
- **P2** — launch-runbook: add the emit-endpoint topology + per-member emit-URL liveness check; bump rc8→rc9 (c.3).
- **P2** — wardline: make the `agent_summary` summary-block a true labeled partition with a reconciliation
  test (W3/opp #8 summary-block half, c.5).
- **P3** — filigree `finding_list` suppression filter / `acknowledged` status mapping (b.2).
- **P3** — legis: opp#6 root-echo DIRTY/VERIFIED + HTTP tests (b.5); MCP hints → `legis doctor` (opp #5, b.6).
- **P3** — filigree `scan_trigger.file_summary` pre-scan marker (c.6); loomweave WAL/SHM detect scope (c.7).
- **Verify exists** — `filigree-81d3971467` (the C3/verified_author deferral now referenced in code).

---

## (e) Method & confidence

10-agent workflow: 5 area reconcilers (wardline / filigree / loomweave / legis / federation+hub-docs) →
5 adversarial verifiers, each re-opening cited code + tests to **refute** every "resolved" and "new-gap"
claim, defaulting to "not closed" on any mismatch with the doc's specific residual text. **0 reconciler
claims overturned; 2 adjusted** (W3 and legis opp#6 — fixes present but not covering the doc's exact
residual / not tested at the root). All 11 new gaps confirmed against current code; the F1-resurfaced
ports (c.1), the cross-member 400 (c.2), the dead-port probes, and the N1 live-400 were **directly probed**,
not inferred. Confidence **high** on the open/partial set and the new gaps; **medium** only on C-4-empty
(unchanged — still not root-causable from a source read; keep `weft-eb3dee402f` open per the prior doc).
Items not re-examined here (still per the gap-analysis doc): C-4-empty root cause, C-8 PM ruling hold.
