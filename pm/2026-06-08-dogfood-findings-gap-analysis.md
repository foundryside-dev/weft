# Dogfood #2 — Code-Grounded Gap Analysis

_Authored 2026-06-08 (`dogfood-analyst`). Synthesizes five deep-dive agent verdicts
(wardline, filigree, loomweave, legis, federation) against the
2026-06-07 dogfood findings report (archival source; not present in the current
repo snapshot). Every
finding below carries an adversarial verification; where a verifier found
`evidence_holds=false`, the **corrected** status is reported, not the original._

**Framing.** Weft is agentic-first and **deconfliction-first, not security**. Every
finding that the report surfaced in a security shape (verified-identity, token "auth",
fail-closed gates) is re-derived here as a **correctness / availability / audit-honesty**
matter. No finding below is a confidentiality control.

---

## (a) Executive summary + scorecard

**Tally** (the three cross-cutting findings F1/N1/N2 are each merged into one verdict; C3 and C-4
each split into two repo-scoped verdicts). Each line's count matches its list:

- **Fixed / shipped (in the analyzed branch; install-vs-tree caveats noted per-finding):** 11 —
  F1, N1, F3, L1, N5, Le1/N3, LG-1, C-4-foreign, C3(legis-charter), N6, F2(visibility half) / N2(wiring+guard half)
- **Partial (shipped half + a real residual):** 5 — F2(auto-bridge absent), N2(no first-class status),
  C1(greenfield-only), W3(agent_summary trio), C-4-empty(symptom guarded, root cause open)
- **Confirmed-present (live defect, mostly config/operational):** 4 — C2, C3(filigree), N2-dirty-contract, C-9
- **Misdiagnosed (report wrong vs code):** 2 — N4 (governance is NOT blocked on a dirty tree;
  default posture governs-and-marks-DIRTY), DOC-DRIFT-1 (stale build mirror, not a divergent fork)
- **Blocked on PM ruling (code deliberately withheld):** 1 — N4-residual / C-8 (agent-reachable dev mode)
- **Verification overturned the agent's own status (`evidence_holds=false`):** 1 — **N6** only
  (filigree agent rated `partial` on an "uncommitted/mid-edit" basis; its verifier found the tree
  CLEAN and the work COMMITTED in `0a99380`, corrected to `complete`). No other finding carried an
  `evidence_holds=false`; "misdiagnosed" (N4, DOC-DRIFT-1) is the *agent's own* status that the
  verifier **agreed** with — not an override.

> Note: F1 / F2 / N2 are genuinely two-part findings. F1 and N1 are fixed end-to-end (one residual
> each is documentary/operational). F2 and N2 each have a shipped half and a real code residual, so
> they appear on both the "fixed" and "partial" lines — counted once per half.

### Scorecard

| ID | Report claim (short) | Code status (verified) | Tracker | What to do |
|---|---|---|---|---|
| **W1** | Bare `mcp__wardline__scan` returns ~123KB → overflows agent context | **fixed** (default bounded to 25 bodies; explain capped at 10) | weft-439d09fc8d (CLOSED) | None — live editable install tracks rc4 (verified 2026-06-08) |
| **W2** | Default gate vacuously green; `--fail-on ERROR` trips on baselined defects | **fixed** (explicit `NOT_EVALUATED` verdict + `would_trip_at` + migration_hint) | weft-b937e53854 (CLOSED) | None — fix live; baseline-not-honored is intentional + now legible |
| **W3** | `active` overloaded (opposite senses) + `summary.total` ≠ buckets | **partial** (rename + ScanSummary invariant shipped; `agent_summary` trio still doesn't reconcile) | weft-f506e5f845 (residual tail) + weft-ef79348eb2 | File the `agent_summary` trio as a distinct wardline issue (NEW opp #8) |
| **F1** | No single federation-token source of truth → wardline 401s | **fixed (code); doc-lag residual** | weft-23574069a1 (CLOSED) | Update `conventions.md:142` wardline row; §A-15 is DECIDED, not pending |
| **N1** | Unscoped `/api/weft/*` silently defaults project; misroute reads as success | **fixed** (fail-closed 400 confirmed LIVE on :8749) | weft-7a399b8124, weft-eff938d3b6 (CLOSED) | Path-scope ALL members' `.mcp.json` URLs (all 4 unscoped) else they silently NON-emit |
| **F2** | Analyzer findings don't surface as work; no "N unbridged" line | **partial** (visibility fixed; auto-bridge absent) | weft-1ce99ceda8 | Close visibility half; optional `finding_batch_promote` |
| **F3** | `start-next-work` offers a `[release]` container as startable | **fixed** | (residual tail weft-f506e5f845) | Close — declarative `container` flag shipped |
| **N2** | Baselined wardline findings arrive `status:open severity:high`; promote → false P1 | **partial** (guard+contract shipped rc8; no first-class status) | weft-171fc22a50, weft-ef79348eb2 | Decide: auto-map suppression → `acknowledged` status |
| **N6** | Closing a promoted issue `not_a_bug` not reflected on the finding | **complete** (committed `0a99380`, rc9 bump `7223a25`; tree CLEAN) | weft-c815d5e77d | Close; verification overturned "partial" — the "uncommitted" basis is now false |
| **C2** | False "Prefix collision / registration failed" on a healthy server | **confirmed-present** | (residual tail weft-f506e5f845) | Key registry by canonical project root; migrate live server.json |
| **C3 (filigree)** | Server-mode HTTP writes record `verified_author:null` | **confirmed-present** | **none — untracked** | File it; stamp per-request db at the db-acquisition seam |
| **C3 (legis)** | Same observation, governance-story note | **fixed** (charter documents it) | weft-f506e5f845 | Done — legis-side is doc only |
| **L1** | `project_status` reports `findings:N` but no way to list them | **fixed** | weft-f506e5f845 (still triage — drift) | Advance the L1 portion; fix landed in cb49008 |
| **C1** | `.weft/loomweave/loomweave.db` tracked → dirties tree, blocks signing | **partial** (greenfield template fixed; no untrack self-heal) | weft-d822a7de2d (still triage — drift) | Add doctor `git rm --cached` check; advance ticket |
| **N5** | `worktree_dirty:false` misread as git-clean; gates signing | **fixed** (always-on scope note) | weft-f506e5f845 (drift) | Close; ensure legis gate keys on `staleness==fresh` |
| **Le1/N3** | Governance ships dark; recovery hint names no config key | **fixed** | weft-df8d2ef454 | Close discoverability half |
| **N4** | legis refuses to govern on a dirty tree | **misdiagnosed** | weft-a7a92a40dd | Re-scope: signing is clean-tree-only; default posture governs-and-marks-DIRTY |
| **LG-1** | legis has no `--version` | **fixed** | weft-9da517a67e (CLOSED) | Done |
| **C-4-foreign** | Bounded foreign-fence scan claimed fixed | **fixed** | weft-eb3dee402f | Confirm foreign-deletion half resolved |
| **C-4-empty** | 0-byte managed-block emptying root cause claimed open | **partial** (symptom GUARDED; root cause OPEN, **cannot-verify-from-code**) | weft-eb3dee402f | Keep OPEN; commission repro-driven investigation |
| **N2-dirty** | wardline `dirty` key feeds legis N4 gate, unpinned | **confirmed-present** | weft-61d27fb808 | Register key in hub C-9 layout + shared fixture |
| **C-9** | No canonical shared `weft.toml` key layout | **confirmed-present** (no weft.toml exists anywhere) | weft-a2f4cf95c7 | Drive to blessed schema; parent of N2-dirty pin |
| **DOC-DRIFT-1** | Two divergent copies of every hub doc | **misdiagnosed** (stale gitignored build mirror) | none | Re-run `scripts/build-docs.sh`; add CI freshness check |

---

## (b) Findings in detail

### W1 — Default MCP scan overflows the agent's context — FIXED

- `mcp/server.py:737` — `_DEFAULT_MAX_FINDINGS = 25`; a bare scan returns at most 25 finding bodies.
- `mcp/server.py:284-291` — effective page size: `full=true` → uncapped; explicit `max_findings` →
  that; else the bounded default, with `truncation.next_offset` for pagination.
- `mcp/server.py:267-270` — the default scan returns ONLY `agent_summary` (no separate top-level
  `findings` array), so a first natural call cannot overflow the agent's context.
- `mcp/server.py:308-325` — `explain=true` inlines provenance only up to `_EXPLAIN_DEFAULT_CAP=10`
  and announces `explanations_truncated` — closes the 56KB-on-one-line explain blowup.

Resolved on rc4 (fix `eea17d5`, post-dating the 2026-06-07 report). **Install verified LIVE
(2026-06-08, PM spot-check):** the editable install's `.pth`
(`~/.local/share/uv/tools/wardline/lib/python3.13/site-packages/_editable_impl_wardline.pth`)
points at `~/wardline/src`, which **exists and is on the clean rc4 tree**; the tool venv imports it
cleanly (`OK ~/wardline/src/wardline/__init__.py`) and `wardline --version` → `1.0.0rc4`. So the
running MCP binary **does** track the verified rc4 source — the W1 fix is live, **no reinstall
needed**. _(The original synthesis claimed the `.pth` pointed at a dead worktree and that
`import wardline` fails; that was a verification overreach — the failing import was system-python,
not the tool venv. Corrected here.)_

**Re-derived framing:** functional/availability (the default scan no longer blows the agent's
context), not security.

**Action:** None — fix is live on the running editable install.

---

### W2 — Default gate vacuously green; baselined defects trip `--fail-on` — FIXED

- `core/run.py:372-383` — the `fail_on is None` branch now returns `verdict="NOT_EVALUATED"` with
  `would_trip_at` and a reason ("NOT a clean pass — the gate never ran"); the misleading vacuous
  `{tripped:false, fail_on:null, evaluated:null}` shape is gone.
- `core/run.py:333-343` — `_would_trip_at` computes the highest severity at which the gate WOULD
  trip over the same population a real `--fail-on` would judge, even on a bare scan.
- `core/run.py:117-140` — `GateDecision.__post_init__` enforces `verdict==NOT_EVALUATED iff
  fail_on is None` and `FAILED iff tripped`, so no constructor can serialize a tripped gate as a pass.
- `mcp/server.py:345-354` — the MCP gate block carries `verdict / would_trip_at / reason /
  evaluated / migration_hint`.
- `core/run.py:363-371` — the secure-by-default gate ignores repo baseline/waiver/judged (the "17
  re-enter" behavior) but now surfaces it via the `evaluated` string + `would_trip_at` +
  `migration_hint` rather than a silent green. This is **intentional** (a repo-controlled baseline
  cannot silently clear the gate) and now legible.

**Re-derived framing:** gate-output honesty / functional correctness of the verdict surface, not a
security control.

**Action:** None — the running wardline editable install tracks the rc4 tree (verified live
2026-06-08), so agents already see `verdict`/`would_trip_at` instead of the old vacuous gate.
_(Tracker close could not be independently
confirmed — filigree MCP `SCHEMA_MISMATCH` + CLI unavailable in the verifier's environment; this is
a tooling limitation, not counter-evidence.)_

---

### W3 — Suppression accounting: `active` overloaded + buckets don't reconcile — PARTIAL

The two main asks are **done**; one residual survives on the agent's primary summary surface.

- **Rename (DONE on every emit surface):** `agent_summary.py:209` per-finding entry emits
  `suppression_state` (the overloaded bare `suppressed` key is gone); `legis.py:172`,
  `finding.py:126,184-185` all emit `suppression_state` consistently. The same-word-opposite-sense
  collision is resolved.
- **Buckets reconcile (DONE on `ScanSummary`):** `run.py:310-318` adds an `informational` bucket so
  `active+baselined+waived+judged+informational == total`, enforced by
  `test_run.py:572-579` (`test_summary_buckets_sum_to_total`).
- **RESIDUAL (the reason status is partial):** the `agent_summary` "summary" block
  (`agent_summary.py:117-124`) displays a *different* trio — `active_defects + suppressed_findings +
  engine_facts` — where `engine_facts` (`agent_summary.py:189-191`) counts ONLY `Kind.FACT` with
  `rule_id` starting `WLN-ENGINE-`. Non-ENGINE FACTs (`scanner/analyzer.py:618,636`) and `WLN-L3-*`
  METRICs (`scanner/diagnostics.py:55-57`) count into `informational` but NOT `engine_facts`, so the
  displayed trio under-sums vs `total_findings` whenever they exist — the report's original
  "total ≠ buckets" complaint surviving on the agent's first read surface. The block also lists
  `baselined/waived/judged` (which re-sum to `suppressed_findings`) next to `informational`, mixing a
  partition with overlapping sub-counts. This is **not cleanly tracked** (the residual-tail issue
  weft-f506e5f845 covers unrelated C-7/F3/C2 items).

**Re-derived framing:** reconciliation-accounting / output-honesty. For an agent, "the numbers
don't add up" is the single most corrosive signal for a tool whose value-prop is honest accounting.

**Action:** Make the `agent_summary` trio a true partition of `total_findings` (rename
`engine_facts → informational` to count ALL non-defects, OR add an explicit `other` bucket and drop
the redundant `baselined/waived/judged` duplicates). File as a distinct wardline issue, not folded
into the unrelated residual-tail batch. (NEW opp #8.)

---

### F1 — Federation token source-of-truth — RECONCILED (member ⇄ federation)

**Both takes rated F1 `fixed` in code; they disagree only on the STATUS of the cross-member
ruling.** The filigree agent rated the daemon side **fixed** but flagged a *remaining cross-member
ruling* — "whether wardline reuses filigree's client bearer or keeps a parallel
`WEFT_FEDERATION_TOKEN`, the §A-15 token-authority DIRECTION" — as an open *decision gate* it could
not resolve from filigree code. The federation agent rated F1 **fixed** AND resolved that gate by
checking the **primary source**.

**Adjudication — the federation take resolves the gate the filigree agent left open.**
`conflict-register.md:206-236` is headed **"DECIDED — implementing"** with an explicit **"Ruling
(PM, 2026-06-07)"** body (env-authority-over-mint); the §A-15 Reference line enumerates three
required artifacts (3-tier resolver, install literal swap, doctor `--fix` host-drift) and **all
three are present in code**. The closeout-plan WS-1 — which claims the authority is "backwards" — is
**stale doc-lag**: the federation verifier rebutted it directly against `doctor.py:624-646`, which
validates the embedded `.mcp.json` literal against the operator env-pin OR the project's own scoped
token and **never re-localizes to the daemon home token** (the feared "break the one client that
works"). So the ruling is DECIDED, the code implements the decided direction, and F1 is **not**
blocked on a pending ruling.

**Merged verdict: FIXED in code; the only residual is doc-lag.**
- `federation_token.py:1-29` — 3-tier resolution: tier-1 canonical `WEFT_FEDERATION_TOKEN`
  (only tier that works cross-host), tier-2 `<store_dir>/federation_token` auto-minted at
  daemon boot, tier-3 off. This is the "single source resolvable by every member."
- `federation_token.py:110-134` — `mint_token_file()` idempotent auto-mint (§A-15), 0600.
- `federation_token.py:137-152` — `resolve_federation_token`: env (tier 1) overrides
  per-store mint (tier 2) — env-authority-over-mint, matching the A-15 ruling direction.
- `wardline/src/wardline/filigree/config.py:31-92` — 5-rung resolver, `WEFT_FEDERATION_TOKEN`
  is rung 1; legacy `WARDLINE_FILIGREE_TOKEN` demoted to fallback. Wardline can authenticate
  with **zero `.mcp.json` env-block ceremony** via the auto-mint file read.
- **Residual (doc-lag):** `conventions.md:142` C-3 wardline row still reads as
  future/undecided ("wardline to adopt…"), though `config.py` already made it rung 1.
- **Citation correction:** the filigree agent's evidence #3 cited `install.py:127,307`
  (markdown-fence logic, wrong); the correct support is
  `integrations.py:283,311` (filigree writes only its own `mcpServers["filigree"]` key,
  never a sibling). Conclusion ("wardline's missing env block is wardline-owned") holds.

**Re-derived framing:** the token is loopback deconfliction plumbing, not an authority
key. The payoff is an agent no longer going blind on its tracker, not a confidentiality
control.

**Action:** Update `conventions.md:142`; amend closeout WS-1 to record §A-15 DECIDED and
F1/R1 CLOSED. Treat residual as installed-build propagation, not a code/decision gap.

---

### N1 — Scope `/api/weft/*` + fail-closed on unscoped writes — RECONCILED — FIXED

Both the filigree agent and the federation agent rated this **fixed**; they agree. The
report (2026-06-07) predates the fix (filigree commits `dfdc737`, `22156fb` on
`release/3.0.0`). The federation verifier confirmed it is not branch-only: a live POST to
`http://127.0.0.1:8749/api/weft/scan-results` returns the exact 400 body, so the fix is
**deployed and active** on the running daemon.

- `dashboard.py:878-884` — `ProjectMiddleware` fail-closes an unscoped federation WRITE:
  400 `VALIDATION` "Ambiguous federation write in server mode: scope to a project". No
  silent default-project fallback.
- `dashboard.py:868-869` — scoped requests echo `X-Filigree-Project` so a misroute cannot
  read as success.
- `dashboard.py:886-895` — C-10(a): unscoped READ still resolves to default but echoes the
  resolved project (never silent).
- `dashboard_auth.py:33,55` — `CLASSIC_FEDERATION_ALIASES` includes `v1/scan-results`, so
  the classic write goes through the same gate (covers the N1 cousin weft-eff938d3b6).
- `wardline/src/wardline/core/filigree_emit.py:106-111` — wardline echoes its emit
  destination `{url, project, project_pinned}`.

**Two operational caveats (not code):**
1. `server.json` registers both projects under **legacy `.filigree` paths** (pre-relocation
   registry). Confirm the running daemon matches the dogfooded build (weft-677779a3d0). _(The fail-
   closed write IS live, per the 400 probe above; the stale registry is a separate C2 concern.)_
2. **Corrected from the original evidence (an inverted detail the federation verifier caught):** the
   original wardline-side N1 evidence claimed lacuna's `.mcp.json` used the **path-scoped**
   `/api/p/lacuna/weft/scan-results`. It does **not** — `lacuna/.mcp.json:35-36` points at the
   **unscoped** `/api/weft/scan-results`, identical to the filigree/wardline/legis member configs
   (loomweave has none). So **all four** wardline servers are unscoped, and after the N1 fix each now
   hits the fail-closed 400 → a member-repo scan **hard-refuses to emit** until path-scoped. This
   *strengthens* the residual: the fix that prevents silent misroute becomes a silent NON-emit for
   every un-migrated config. (See NEW opp #2.)

**Re-derived framing:** functional/deconfliction correctness (prevents a wrong-project
write — the contamination vector), not a security control.

**Action:** Path-scope every member's `--filigree-url`; complete the live :8749 flip.

---

### F2 — session-context reports N unbridged findings — PARTIAL

The minimum ask (surface the blind spot) is **fully implemented**; the auto/batch bridge
is **genuinely absent**.

- `hooks.py:155-163` — `_build_context` emits "ANALYZER FINDINGS: N not yet bridged… (M
  actionable, K baselined/suppressed) — review with `finding_list`, bridge with
  `finding_promote`". Exactly the report's ask.
- `meta.py:880-883` — MCP `session_context_get` also carries the line (not CLI-only).
- `db_files.py:2586-2612` — `unbridged_finding_stats()` splits actionable vs suppressed via
  `metadata.wardline.suppression_state`, so a baselined defect doesn't read as work.
- `observations.py:509` — `batch_promote` exists **only** for observations; no
  `finding_batch_promote`; ingest `create_observations` defaults False → findings don't
  auto-fan-out.

**Enhancement:** Add `finding_batch_promote` keyed by a filter (severity≥high,
`suppression_state IS NULL`), mirroring `observation_batch_promote`; keep suppressed excluded.

---

### F3 — Aggregate/container types never startable — FIXED

- `templates.py:244-245` — `if self.container: return False, "complete child issues"` —
  single declarative predicate.
- `templates_data.py:1536-1541` — `release` carries `container:True` (also epic:155, 236/267).
- `db_planning.py:369-381` + `mcp_tools/planning.py:416` — `work_ready` startable flag
  delegates to the predicate.
- `db_issues.py:2201-2204` — `start_next_work` skips containers via the same flag, so picker
  and `work_ready` cannot diverge.

A container still appears in the `work_ready` LIST but with `startable:false` and
`next_action:"complete child issues"`, and is never auto-handed-out — exactly the ask.

**Action:** Close. No code change needed.

---

### N2 — Wardline suppression fidelity — RECONCILED (filigree ⇄ federation) — PARTIAL

**Both the filigree and federation agents rated this PARTIAL and AGREE on the substance.** Both
verifiers returned `evidence_holds=true` — there is no `evidence_holds=false` override here (the
"uncommitted/mid-edit" override belonged to **N6**, a different finding; do not conflate). The
agreed split:

- **Shipped half:** the suppression wiring + per-finding key rename + promote-guard +
  unbridged-stats split are all in place on the analyzed branches.
- **Residual half:** suppression is **not** mapped to a first-class finding status, so a bare
  `finding_list` (the most natural first triage call) still shows baselined findings as
  `status:open severity:high`. **This holds.**

**Merged verdict: the wiring+guard contract is COMPLETE on the analyzed branch; one real residual
remains (no first-class status).**

- `wardline/src/wardline/core/finding.py:184-185` — `to_filigree_metadata` writes
  `metadata.wardline.suppression_state` (renamed from the overloaded bare `suppressed` key)
  whenever the finding is not ACTIVE; `finding.py:126` (`to_dict`) emits it consistently.
- `filigree db_files.py:1232-1234` — ingest hardcodes `status='open'` in the INSERT regardless of
  suppression → the report's core complaint holds at the data layer.
- `filigree db_files.py:2414-2432` — `promote_finding_to_issue` REFUSES a suppressed finding by
  default (`ValueError`, "an accepted/suppressed defect, not active work; pass force=true"), with a
  type-guard for off-contract non-dict `wardline` metadata and a `force` escape-hatch that records a
  warning — the "refuse/flag promotion" option is implemented.
- `filigree types/core.py:78` — `FindingStatus` includes `acknowledged`, but ingest never sets it
  from `suppression_state` — the **first-class-status option was NOT taken**.

**Residual:** an agent triaging the raw `finding_list` (the most natural first call, before
session-context) still sees baselined defects as live high-severity work.

**Enhancement (closes the full ask):** at scan-results intake, set finding
`status='acknowledged'` when `suppression_state` is present, OR surface `suppression_state`
as a top-level field in `finding_list` / `scan_finding_to_weft` output so the raw list is
self-describing.

**Re-derived framing:** functional/false-work-suppression accuracy, not security.

---

### N6 — Linked-issue status surfaced on the finding — COMPLETE (verification overturned "partial")

**This is the one finding where a verifier returned `evidence_holds=false`.** The filigree agent
rated N6 **partial**, and its *sole* basis was an "(uncommitted, mid-edit)" qualifier — the read
side was real but supposedly still in the working tree. The verifier checked the analyzed branch
(`release/3.0.0` = `3.0.0rc9`) and found that basis **now false**: the working tree is **clean**,
N6 was **committed** as `0a99380` ("feat(findings): surface linked issue status/resolution on scan
findings (N6)"), and the branch was bumped to rc9 (`7223a25`). Corrected status: **complete.**

- `db_files.py:229-230` — `_FINDING_ISSUE_JOIN` = `FROM scan_findings sf LEFT JOIN issues i ON
  sf.issue_id = i.id`; `_FINDING_SELECT_COLS` exposes `i.status AS issue_status` and
  `json_extract(i.fields,'$.close_reason') AS issue_resolution`, wired into all three finding read
  paths (list 2149, get 2209, global 2288) and mapped in `_row_to_finding` (291-292).
- `db_files.py:2387-2399` — promote of a finding whose linked issue resolves to the `done` category
  returns the existing (dismissed) issue with a warning ("its prior triage stands") and
  `created=False`, instead of minting new work.
- `types/core.py:215-216`, `models.py:217-218/253-254`, `generations/weft/types.py:254-255` — all
  gain `issue_status` + `issue_resolution` (str|None); `adapters.py:196-197` maps them into the weft
  generation.
- Direct tests pass: `test_finding_triage.py:45-75` (unlinked→null, linked→status, not_a_bug→
  resolution) and `test_finding_issue_cascade.py:349` (re-promote of dismissed → existing+warning);
  60 tests green in the cascade suite.

**Scope boundary (why this is complete, not partial):** the filigree READ-side obligation — surface
the linked issue's status/resolution on the finding and stop promote from minting work against an
already-dismissed issue — is fully implemented, committed, and tested. The "seen_count keeps
climbing on rescan" half is a **wardline emit-lifecycle** concern (filigree records what wardline
re-sends); it is outside the filigree codebase and does not drag this status back to partial.

**Re-derived framing:** data-consistency / correctness, not security.

**Action:** Close. The work is shipped on the analyzed branch.

---

### C2 — `register_project` idempotency is store-dir-string-exact — CONFIRMED-PRESENT

- `server.py:226` — `project_key = str(filigree_dir)` (resolved STORE dir, not project root).
- `server.py:229-236` — collision skipped only when `existing_path == project_key` exact
  string; otherwise `ValueError "Prefix collision: {prefix} already registered"`.
- `hooks.py:636-640` — SessionStart catches it and returns "registration failed" — an
  idempotent re-register reads as a hard failure.
- **Live trigger:** the store dir moved `.filigree → .weft/filigree` (commit `4311dca`), but
  the live `~/.config/filigree/server.json` still holds both projects under **legacy
  `.filigree` paths**. A session registering under the canonical store dir misses the exact-
  string check and collides on prefix against the stale entry.

Partly a migration-transient (clears once the registry migrates), but the **durable bug** is
that an idempotent-ish re-register surfaces as a hard "registration failed" on a healthy server.

**Re-derived framing:** functional/availability (false failure), not security.

**Fix (two parts):** (1) dedup by canonical PROJECT ROOT — `server.py:68`
`_project_root_from_store_dir` exists but is unused for dedup; (2) downgrade a same-project
re-register to info/no-op in the hook. Also migrate the live `server.json`.

---

### C3 — Server-mode HTTP writes record `verified_author:null` — RECONCILED (filigree ⇄ legis)

**The two repos own different halves and do NOT conflict.**
- **filigree side: CONFIRMED-PRESENT (live code gap).** The ADR-012 stamping mechanism covers
  only the stdio module-level db; the server-mode per-request db (the live :8749 path) is never
  stamped, so every HTTP write records `verified_author=NULL` even on Linux where
  `resolve_os_actor()` would succeed.
  - `db_meta.py:59-62` — `add_comment` writes `self._verified_actor`.
  - `mcp_server.py:1178` — `set_verified_actor(resolve_os_actor())` only on the stdio db.
  - `mcp_server.py:1100-1101` — server-mode `_request_db` set from `db_resolver()`, never
    stamped. `dashboard.py:354` — `ProjectStore.get_db` opens with no stamp.
  - Repo-wide grep: only two `set_verified_actor` call sites (CLI, stdio); none on an HTTP
    resolver. **Genuinely untracked.**
- **legis side: FIXED (doc).** The legis-side action was explicitly "a note for the governance
  story, not a code fix" — now recorded in `docs/design/legis-charter.md:59-66`, which frames it
  honestly: "the records do not falsely claim verification — the field is plainly agent_id."

**Re-derived framing:** audit-trail / deconfliction-attribution completeness — the federated
HTTP write loop stamps a claimed-only author, asymmetric with stdio/CLI. **Not** a security leak.

**Action:** filigree — stamp the per-request db at the one db-acquisition seam (best-effort,
None on failure per ADR-012). File it (untracked). legis — done.

---

### L1 — Whole-project finding browser — FIXED

- `inspection.rs:269` — `tool_project_findings` / `project_finding_list`: whole-project, no
  entity id; total counted off the bare `findings` table so it reconciles with
  `project_status_get` by construction; entity JOIN only enriches rows; honest-empty.
- `faceted.rs:139` — `find_by_wardline` reads `has_findings:bool`, restricting to entities in
  `SELECT DISTINCT entity_id FROM findings`.
- **Citation correction:** the schema declaration is at `lib.rs:779-785` (`lib.rs:782`), not
  `faceted.rs:782` (that file is only 309 lines). Content claim holds.
- `lib.rs:1421` — dispatch wired; tool surface 39→40; tests pass.

Landed in `cb49008` (2026-06-08, post-report), in rc3 ancestry and installed (1.1.0-rc3).

**Drift:** weft-f506e5f845 (covers L1) still in `triage` despite the fix. Advance it.

---

### C1 — loomweave runtime DB dirties tree — PARTIAL (greenfield-only self-heal)

- `install.rs:49` — `GITIGNORE_CONTENTS` now lists `loomweave.db` (comment cites C1 /
  weft-d822a7de2d); `install.rs:464` — written on fresh init. **Greenfield installs self-heal.**
- `doctor.rs:221` — checks db presence/schema only; **no** git-tracked detection, **no**
  `git rm --cached` remediation. Grep for `rm --cached`/`ls-files`/`untrack` across non-test
  crates returns nothing in install/doctor paths.

A template change does not untrack an **already-committed** db. `install --force` is a filesystem
wipe, not a git op. Existing checkouts stay tracked and keep dirtying the tree until someone runs
`git rm --cached`. The already-tracked retrofit is split into a separate lacuna-specific issue
(weft-3c9bae6a40), reading as a data retrofit rather than a general self-heal.

**Federation cross-check (C1-DRIFT):** in lacuna's current tree the db is *now* ignored via a
broad `.weft/` rule — so the report's "still not ignored" is stale **for lacuna's specimen**.
Caveat (medium confidence): the broad `.weft/` rule over-ignores; verify no member intends to
track anything under `.weft/`. This only proves the specimen, not the member-repo source.

**Re-derived framing:** functional/availability (dirty tree blocks the analyze→govern→sign loop).

**Fix:** add a doctor check that runs `git ls-files .weft/loomweave/loomweave.db` and, if tracked,
emits the one-line `git rm --cached` remedy. Advance weft-d822a7de2d for the template portion.

---

### N5 — `worktree_dirty` scope disclosure — FIXED

- `status.rs:334` — `worktree_dirty_note` emitted **unconditionally** (true/false/null path).
- `status.rs:31` — the note states the field measures un-indexed UNTRACKED source (ignore-aware
  `git ls-files --others`), NOT git working-tree state; a false/null does NOT mean git clean;
  "a freshness or signing gate must require `staleness == fresh`, not `worktree_dirty == false`."
- Implementation corroborates: `snapshot.rs:347` → `list_untracked_files` runs `git ls-files
  --others --exclude-standard`. The note is accurate, not aspirational.

Maintainer chose "note-the-scope" over rename (rename would dangle the legis gate keyed on the
field name) — both PM options were on the table; this one is documented with rationale.

Minor: the report mischaracterized the mechanism as "indexed source changed"; it is actually
un-indexed UNTRACKED source (modified-tracked surfaces via staleness). Does not undercut the fix.

**Action:** Close. Ensure legis's signing gate keys on `staleness==fresh` (cross-member).

---

### Le1/N3 — legis ships dark; recovery hints now name the config path — FIXED

- `mcp.py:376-393` — `_recovery_for` maps `INVALID_CELL_SPEC` and `CELL_NOT_ENABLED` to hints
  naming `policy/cells.toml`, `LEGIS_POLICY_CELLS`, `LEGIS_DEV_DEFAULT_CELLS=1`,
  `LEGIS_WARDLINE_CELL[_BY_SEVERITY]`, `LEGIS_HMAC_KEY` and the relaunch path — no longer the
  generic sentence the report quoted.
- `governance.py:238,271,302,326` — raise sites name WHICH cell; the MCP hint supplies the HOW.
- `doctor.py:358-410` — `check_policy_cells` / `check_wardline_routing` list unconfigured cells
  with enablement keys; `cli.py` wires `legis doctor [--repair]`.

Two intentional-design caveats: (1) `legis doctor` is operator/CLI-only by design — the agent's
primary discovery is the MCP error hint (sufficient); (2) ships-dark/inert-by-default is
intentional fail-closed design, decision-gated, not a defect.

**Action:** Close the discoverability portion.

---

### N4 — "legis refuses to govern on a dirty tree" — MISDIAGNOSED

The report's core claim is **wrong for the default (keyless) posture.**

- `ingest.py:204-207` — keyless dev posture (the default): `artifact_status=DIRTY; return` — it
  does NOT raise; **governance proceeds with the dirty marker recorded honestly.**
- `ingest.py:209-216` — `WardlineDirtyTreeError`/`SKIPPED_DIRTY_TREE` is raised **only** in CI
  posture (`artifact_key` configured) AND `allow_dirty` off. The report's `SKIPPED_DIRTY_TREE`
  was inferred, not observed (the coverage log shows `scan_route` returned the unconfigured
  `INVALID_CELL_SPEC`).
- `mcp.py:216-221` — `wardline_artifact_key` defaults None → default posture is the
  govern-but-mark-DIRTY branch.

The real, narrower fact: legis **SIGNING** is clean-tree-only (an unsigned dirty artifact can be
governed but never reads as "verified") — intentional, with typed amber messaging and full
remediation (`ingest.py:85-146`). The remaining ask (an agent-reachable non-env-var dev mode) is
deliberately refused per capability confinement (the **C-8** ruling) — a decision, not a code gap.

**Action:** Re-scope N4 in the tracker: drop "governance unavailable on dirty tree"; retain only
"signing is clean-tree-only" and "dev governance proceeds-but-marks-DIRTY."

---

### LG-1 — `legis --version` — FIXED

- `cli.py:39-42` — `--version` action; live-verified → `legis 1.0.0rc4`. Close (already closed).

---

### C-4-foreign — bounded foreign-fence scan — FIXED

- `install.py:51-62` — `_first_foreign_fence_pos` absorbs own-namespace (legis) fences, bounding
  the rewrite at a foreign fence so a co-resident sibling block is never deleted.
- `install.py:65-89` — `_first_own_open_fence_pos` declines to claim a legis marker quoted inside
  an unclosed sibling block (falls back to append, deletes nothing).
- `install.py:284-317` — "Monotonic safety: bound ≤ the old code's cut point" — can only preserve
  bytes the old code deleted, never delete bytes it kept.

The foreign-deletion vector (deleting a sibling's managed block in a shared CLAUDE.md/AGENTS.md)
is closed. This is the FIXED half of weft-eb3dee402f.

---

### C-4-empty — 0-byte managed-block emptying — PARTIAL (symptom GUARDED; root cause OPEN — cannot-verify-from-code)

**Three statuses must not be collapsed.** (a) foreign-deletion = FIXED (above); (b) empty-WRITE
symptom = **GUARDED**; (c) the underlying ROOT CAUSE of how a block came to be emptied = **STILL
OPEN and NOT root-causable from the current source.**

- `install.py:224-231` — `_atomic_write_text` refuse-to-empty guard: `if not content.strip():
  raise ValueError("refusing to write empty content")` — every write path goes through it, so an
  empty payload is rejected loudly instead of truncating a populated file.
- `install.py:321-325` — `inject_instructions` treats an existing empty file as a create; the
  writer never intentionally produces an empty managed block.

The guard mitigates the symptom but explains nothing about the originating logic path. **I cannot
force a root cause from a source read** — this needs a dedicated reproduction harness across the
historical block shapes. Confidence: **medium** on the split itself; the root cause is explicitly
**unresolved**.

**Action:** Keep weft-eb3dee402f OPEN for the root cause. Record that the symptom is now guarded
(fails loud). Commission a repro-driven investigation; **do not close on the strength of the
guard** ("holding ≠ root-caused").

---

### N2-dirty-contract — wardline `dirty` key feeds legis N4 gate, unpinned — CONFIRMED-PRESENT

- `wardline/src/wardline/core/legis.py:288` — `scan["dirty"] = True` on the unsigned dev-artifact
  path (a bare literal key).
- `legis/src/legis/wardline/ingest.py:202` — `is_dirty_dev_artifact = scan.get("dirty") is True
  and not signature_present` — a bare literal string, NOT a shared constant. (`ingest.py:61`
  defines `DIRTY="dirty"` but that's the OUTPUT enum value, not the INPUT wire key.)
- Hub registration: grep for `dirty` as a cross-member key in `conflict-register.md` /
  `glossary.md` returns nothing. No shared fixture (legis tests use a local `_artifact()` helper;
  the only golden vector is signed signature bytes, not the `dirty` key).

Unlike `suppression_state` (whose rename landed in lockstep over a shared golden vector on the
SIGNED bytes), `dirty` lives on the UNSIGNED dev path, is co-owned by no fixture, and is in no hub
layout. A wardline-side rename silently breaks legis's dirty-tree governance gate.

**Action:** Register the key in the hub C-9/glossary layout (depends on weft-a2f4cf95c7) + add a
SHARED schema/fixture (NOT a golden signature — `dirty` is never in signed bytes). Sequence with
C-9 (its parent).

---

### C-9 — No canonical shared `weft.toml` key layout — CONFIRMED-PRESENT

- No `weft.toml` file exists in **any** of the five repos (or the hub). Citation correction:
  lacuna's is **absent**, not "0-byte empty." So "is each member inventing keys" is currently
  moot (no member writes shared keys yet), but the FORWARD risk is real.
- weft-a2f4cf95c7 (OPEN, P2): member-private form is pinned now (`.weft/<member>/`,
  `[<member>].store_dir`, malformed=fallback); the SHARED cross-member layout — section naming,
  sibling-endpoint home, precedence rule — is NOT pinned.
- `conflict-register.md:200-204` (§A-14): "filigree / loomweave / wardline pending. Shared-key
  layout pending loomweave's proposal." Code corroborates: each member reads only its own
  member-private table.

This is the **parent dependency** for pinning the N2-dirty wire contract. Correctly tracked OPEN;
NOT a dogfood-#2 gate blocker per the issue.

**Action:** Drive weft-a2f4cf95c7 to a blessed schema, then register the floating cross-member
keys (the wardline→legis `dirty` key, sibling endpoints).

---

### DOC-DRIFT-1 — "two divergent copies of every hub doc" — MISDIAGNOSED (verification overturned)

The agent rated this "divergent canonical fork" and recommended **deleting `docs/`**. Its verifier
found `evidence_holds=false` and corrected to **stale gitignored build artifact**.

- The three literal facts reproduce (`diff -q` differs; `git log -- docs/conventions.md` empty;
  MANIFEST links the top-level set). **But** `mkdocs.yml:4-6` states `docs_dir` is a **build-time
  mirror** generated by `scripts/build-docs.sh`; `docs/` and `site/` are **gitignored** (verified
  via `git check-ignore`). The empty git log is correct-by-design, not a fork symptom.
- Only 4 of 6 named standards actually differ (conventions, conflict-register, glossary,
  contracts-index); sei-standard and federation-sdk are **byte-identical** — exactly what a stale
  regenerable mirror predicts. The mirror was last built 2026-06-07 18:21; root last edited
  2026-06-08 11:04 (~17h staleness because the build wasn't re-run).

**Do NOT carry the "delete the fork" recommendation.** Remediation is re-running the build.

**Re-derived framing:** transient, local, low-severity functional staleness — a build output not
regenerated since the last source edit.

**Action:** Re-run `scripts/build-docs.sh`; add a CI/pre-commit check that fails if
`docs/<x>.md` diverges from `<x>.md` (or that `docs/` is absent in the committed tree).

---

## (c) Genuinely NEW opportunities (untracked, deduped against the 17 tracker issues)

These are not covered by any existing tracker issue. (SCHEMA_MISMATCH and the live-daemon flip are
**already tracked** under weft-677779a3d0 / closeout WS-0 — listed under drift/operational below,
NOT here.)

1. **[P3 → file it] Server-mode HTTP MCP writes silently drop `verified_author`.** The concrete
   code reason behind C3 (filigree side). Only the stdio db is stamped; the per-request HTTP db
   (the live daemon path agents use) is never stamped → `verified_author=NULL` on every write.
   _Evidence:_ `mcp_server.py:1100-1101` vs `:1178`; `dashboard.py:354`. _Rationale:_ a reviewer
   auditing an agent's writes through the daemon cannot distinguish a transport-verified actor from
   a self-asserted one — the attribution signal the suite advertises is silently absent on the
   federated path. **Genuinely untracked.**

2. **[P2] ALL member `.mcp.json` files use UNSCOPED `/api/weft/scan-results` and now hit the
   fail-closed 400.** After the N1 fix, **none** of filigree/wardline/legis/lacuna is path-scoped
   (the original claim that lacuna was migrated was inverted — see N1) → every member-repo scan now
   hard-refuses to emit instead of emitting. The fix that prevents silent misroute turns into a
   silent NON-emit for un-updated configs. _Evidence:_ `lacuna/.mcp.json:35-36` + member `.mcp.json`
   vs `dashboard.py:879-884`. **Untracked as a config-propagation item.** Fix is a one-line URL edit
   per member; consider a wardline startup warning when `project_pinned:false`.

3. **[P2] `finding_list` / weft finding surface doesn't expose `suppression_state` as a
   first-class field.** The N2 residual. Baselined defects show `status:open severity:high` with
   suppression buried in nested metadata; the raw list (the first call an agent makes) can't
   distinguish active from baselined without parsing JSON. _Evidence:_ `db_files.py:1234,1252`;
   `scan_finding_to_weft` has no passthrough. _(Adjacent to weft-171fc22a50 but that ticket is the
   status-mapping decision; the top-level field is a distinct, cheaper win.)_

4. **[P2] loomweave `doctor` should detect a git-tracked runtime DB and emit `git rm --cached`.**
   The C1 self-heal for existing checkouts. Neither `install` (filesystem wipe) nor `doctor`
   (presence/schema only) detects a tracked db. _Evidence:_ `doctor.rs:221`; `install.rs:464`.
   Turns an invisible analyze→sign blocker into a one-command fix.

5. **[P3] legis MCP governance error hints don't point the agent at `legis doctor`.** The
   unconfigured-cell inventory exists CLI-side (`doctor.py:358-410`) but the MCP hints
   (`mcp.py:376-393`) name only the single key for the error hit, never the one command that
   answers "what else is unconfigured?" Adding "run `legis doctor` for the full inventory" turns N
   single-key discoveries into one diagnostic call.

6. **[P3] `scan_route` gives no top-level posture echo (keyless/unsigned-DIRTY vs CI-signed).** In
   the default keyless posture, `scan_route` governs a dirty tree and marks DIRTY but returns
   `{outcome: ROUTED, routed:[...]}` with no `artifact_status`/posture field. An agent relaying
   "governance passed" can't distinguish a dev-grade unsigned pass from a CI-grade verified pass.
   _Evidence:_ `mcp.py:983`; `ingest.py:204-207`. Same fidelity gap as W2's vacuous-green.

7. **[P3] Stale nested `.weft/loomweave/.gitignore` not refreshed by idempotent reinstall.** A bare
   `loomweave install` over an existing dir skips init, so the corrected template only lands on a
   destructive `--force` (which also wipes the summary cache). No light-touch refresh path.
   _Evidence:_ `install.rs:456` (populate only on init), docstring "init is skipped".

8. **[P2] wardline `agent_summary` "summary" block buckets don't reconcile to `total_findings`.**
   The W3 residual on the agent's PRIMARY read surface. The MCP top-level `ScanSummary` satisfies the
   buckets-sum-to-total invariant, but the `agent_summary` block presents a non-reconciling trio
   (`active_defects + suppressed_findings + engine_facts`) where `engine_facts` counts only
   `WLN-ENGINE-` FACTs; non-ENGINE FACTs and `WLN-L3-*` METRICs land in `informational` but not the
   trio, so it under-sums. _Evidence:_ `agent_summary.py:117-124` + `:189-191` vs `run.py:316`;
   `scanner/analyzer.py:618,636`, `scanner/diagnostics.py:55-57`. _Rationale:_ an agent reconciling
   the displayed buckets to decide "have I seen everything?" computes a shortfall and either
   mistrusts the summary or re-fetches the full payload (defeating the W1 bounding). **Not tracked by
   the residual-tail issue** (which covers unrelated C-7/F3/C2). File as a distinct wardline issue.

---

## (d) Blocked on PM ruling

**Correction to the brief's premise.** The brief named "§A-15 token-authority direction gating
F1/N1" as the PM-ruling callout. **That premise is stale.** Primary source
(`conflict-register.md:206-236`, headed **"DECIDED — implementing"** with a "Ruling (PM,
2026-06-07)" body) shows §A-15 is **DECIDED**, the code implements the decided direction
(env-authority-over-mint), and F1/R1 are **CLOSED-fixed**. The filigree agent's "blocked on ruling"
came from the stale closeout plan WS-1 (which the federation agent flagged as lagging) plus a C-8
design-stance comment — it never opened the ruling doc. **F1/N1 are NOT blocked on a pending ruling.**

**The genuine remaining PM-ruling gate is C-8 (capability confinement)** — and it gates a
*different* feature, not F1/N1:

- **C-8 — agent-reachable, non-env-var dev governance mode (legis N4 residual).** The proposed
  "govern this uncommitted change (dev/unsigned)" mode that is NOT an env var is deliberately
  refused per capability confinement: `ingest.py:135-137` states the `SKIPPED_DIRTY_TREE` payload
  "adds no call argument and grants no authority"; the `allow_dirty` opt-in is operator/env-only by
  design. **This is a decision, not a code gap.** Hold for the C-8 ruling before any code change.

No other finding is decision-gated. (Ships-dark/fail-closed defaults — Le1/N3 — are settled
intentional design, not pending.)

---

## (e) Report / plan / tracker drift

Where the 2026-06-07 report, the closeout plan, and the tracker disagreed with the code:

| Source | Said | Code says | Resolution |
|---|---|---|---|
| Closeout WS-1 | F1/R1 "blocked on a canon ruling" | §A-15 DECIDED; F1/R1 CLOSED-fixed | Amend WS-1; the gate was passed |
| `conventions.md:142` | wardline "to adopt `WEFT_FEDERATION_TOKEN`" (future) | `config.py:31` already made it rung 1 | Update the C-3 wardline row |
| Report N4 | legis refuses to govern on a dirty tree | default posture governs-and-marks-DIRTY; only signing is clean-tree-only | Re-scope the tracker framing |
| Report C1 (line 159) | `.weft/loomweave/loomweave.db` still not gitignored | lacuna tree now ignores it via broad `.weft/` | Correct report; confirm member-repo source |
| weft-f506e5f845 (L1) | `triage` | fix landed in `cb49008`, installed | Advance the L1 portion |
| weft-d822a7de2d (C1) | `triage` | template fix landed in `b7a1b30`, installed | Advance for the template portion |
| Report (suppression) | truth buried in `metadata.wardline.suppressed` | renamed to `.suppression_state` | Stale key name |
| filigree N6 agent | linked-issue status "(uncommitted, mid-edit)" → partial | committed `0a99380`, rc9 bump `7223a25`, tree CLEAN → complete | **Verification override (`evidence_holds=false`)** — the only one; close N6 |
| Original N1 evidence | lacuna `.mcp.json` is path-scoped (migrated exemplar) | lacuna `.mcp.json:35-36` is UNSCOPED, same as all members | Inverted detail; all four configs need path-scoping |
| Report/plan vs §A-15 | three-way (report=open, plan=blocked, tracker=closed, register=DECIDED) | DECIDED; WS-1's "authority backwards" rebutted by `doctor.py:624-646` | Reconcile plan+report to the register |

---

## (f) Prioritized action list (P1 first)

**P1 — operational / availability (do first):**
1. **Reload the hub `filigree-mcp` daemon** (v26 vs DB v27 SCHEMA_MISMATCH). Blocks ALL filigree
   MCP tools in the hub; forces CLI fallback that then warns ACTOR_MISMATCH on every call. _Tracked:
   weft-677779a3d0 / closeout WS-0._
2. **Path-scope every member's `.mcp.json` `--filigree-url`** (all four — filigree/wardline/legis/
   lacuna — are currently unscoped) so member-repo scans don't hit the new N1 fail-closed 400 and
   silently NON-emit. (NEW opp #2.) _The N1 fail-closed write is confirmed LIVE on :8749 (400
   probe); migrate the stale `server.json` legacy-path registration alongside (C2)._
3. **C1 — add a loomweave doctor `git rm --cached` self-heal** so existing checkouts stop dirtying
   the tree and blocking the analyze→govern→sign loop. _(P1 because it blocks signing; the
   greenfield template fix already shipped.)_

**P2 — correctness / propagation:**
4. **C2 — dedup `register_project` by canonical project root + downgrade same-project re-register**
   to info/no-op; migrate the live `server.json` to `.weft/filigree` keys. Every session currently
   opens with a false "registration failed." Fleet-wide: fires for EVERY project consolidated to
   `.weft/filigree` (commit `4311dca`), not just lacuna.
5. **N2 — surface `suppression_state` as a top-level `finding_list` field** (NEW opp #3) AND decide
   whether to auto-map suppression → `acknowledged` status (weft-171fc22a50).
6. **W3 — make the `agent_summary` trio a true partition of `total_findings`** (NEW opp #8); file as
   a distinct wardline issue, separate from the residual-tail bundle.
7. **C-9 — drive weft-a2f4cf95c7 to a blessed shared `weft.toml` layout**, then register the
   wardline→legis `dirty` key + a shared fixture (weft-61d27fb808).
8. **DOC-DRIFT-1 — re-run `scripts/build-docs.sh`; add a CI freshness check.** (Do NOT delete docs/.)
9. **Reconcile plan/report/tracker drift** (section e): amend closeout WS-1, update
    `conventions.md:142`, re-scope N4, advance weft-f506e5f845 (L1) and weft-d822a7de2d (C1) out of triage.

**P3 — fidelity / completeness:**
10. **C3 (filigree) — stamp the per-request db with `set_verified_actor`** at the db-acquisition seam.
    File it (untracked, NEW opp #1).
11. **N6 — close** (committed `0a99380`, tree clean, tested) on the analyzed branch; nothing further.
12. **F2 — add `finding_batch_promote`** (keyed by severity≥high, `suppression_state IS NULL`).
13. **legis MCP hints point at `legis doctor`** (NEW opp #5); **`scan_route` top-level posture echo**
    (NEW opp #6); **loomweave light-touch gitignore refresh** (NEW opp #7).

**Hold (PM ruling):**
14. **C-8 — agent-reachable non-env-var dev governance mode (legis N4 residual).** Do not write code
    until the capability-confinement ruling lands.

**Investigate (cannot-verify-from-code):**
15. **C-4-empty — commission a repro-driven investigation** of the 0-byte managed-block emptying
    root cause. The symptom is guarded (fails loud); the originating logic path is NOT root-causable
    from a source read. Keep weft-eb3dee402f OPEN; do not close on the guard.

---

## (g) Close / no-action

Fixed and confirmed; close or already-closed: **W1, W2, F3, N5, Le1/N3, LG-1, C-4-foreign,
C3(legis), F1(code), N1(code), L1, N6, F2(visibility half), N2(wiring+guard).** A few "fixed"
verdicts in repos other than wardline may carry an **install-vs-tree caveat** (the fix is on the
analyzed branch but the deployed binary could lag until reinstalled) — verify per-member if in
doubt. **wardline specifically is confirmed live** (editable install tracks the clean rc4 tree,
spot-checked 2026-06-08), so its W-series fixes need no reinstall.

Verification-overturned (the ONLY `evidence_holds=false` correction): **N6** (partial→complete;
committed `0a99380`, tree clean). N4 and DOC-DRIFT-1 are *agent-assigned* "misdiagnosed" statuses
the verifiers **agreed** with — not overrides.

Misdiagnosed in the report (correct the framing, don't "fix" a non-bug): **N4** (governance is not
blocked on a dirty tree), **DOC-DRIFT-1** (no divergent fork).
