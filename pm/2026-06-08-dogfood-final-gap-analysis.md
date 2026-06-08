# Weft Dogfood Findings — First-Principles Gap Analysis (2026-06-08)

This is an **independent re-verification** of the 2026-06-07 dogfood findings report
against the *current* source of every weft member tool, as of today 2026-06-08 — one
day of fixes later. Each finding was triangulated against three sources: (a) current
tool source (cited as `repo file:line`), (b) the repo git log since 2026-06-07, and
(c) the filigree tracker snapshot. The report is the net state after **both** dogfood
passes (pass-1 plus the pass-2 update). The frame is **deconfliction-first, not
security**: every residual is re-derived as a functional / availability / correctness /
triage-honesty concern. Where a claim is behavioral and could not be re-fired live
(the MCP tools are scoped to weft, not the lacuna specimen), the verdict is marked
`static-only` and confidence is lowered — code-reading proves the *path* exists, not
that the behavior still *fires*.

## Verdict scoreboard

| Finding | Title | Current state | Basis | Already tracked? |
|---|---|---|---|---|
| F1 | Wardline→Filigree emit 401 (token value + project routing) | FIXED | code-confirmed | weft-23574069a1, weft-510bdd4b9e |
| F2 | Analyzer findings don't auto-surface; session_context must report N un-bridged | FIXED (ask b; ask a deferred) | code-confirmed | weft-1ce99ceda8 (closed) |
| F3 | start-next-work hands an agent a RELEASE/epic container as work | FIXED | code-confirmed | weft-5952553f5f |
| W1 | Default scan MCP output agent-hostile (~123KB one-line dump) | FIXED | mixed | weft-439d09fc8d |
| W2 | Default gate vacuously green (tripped:false reads clean = not-evaluated) | FIXED | code-confirmed | weft-b937e53854 |
| W3 | suppression field overload (a) + summary buckets don't reconcile (b) | FIXED | code-confirmed | weft-ef79348eb2, weft-f506e5f845 |
| L1 | No whole-project finding browser (count-without-list) | FIXED | code-confirmed | — |
| Le1/N3 | legis ships dark — governance inert by default, no enablement pointer | FIXED | mixed | weft-df8d2ef454 |
| N4 | governance unavailable on a dirty tree | MISDIAGNOSED | code-confirmed | weft-a7a92a40dd |
| N1 | Silent 2xx misroute: unscoped emit resolves to default project | FIXED | mixed | weft-7a399b8124, weft-eff938d3b6 |
| N2 | wardline suppression/baseline state doesn't survive emit into filigree | PARTIAL | mixed | weft-171fc22a50, weft-ef79348eb2 |
| N5 | worktree_dirty means source-only, not git-clean | FIXED | code-confirmed | — |
| N6 | promote/close link one-way; dismissed issue still reads as open work | FIXED | code-confirmed | weft-c815d5e77d (still triage) |
| C1 | Runtime DB tracked → dirties tree → legis refuses to sign | FIXED | code-confirmed | weft-d822a7de2d, weft-8e3d02f409 |
| C2 | Prefix-collision startup noise: idempotent re-register reads as ERROR | **STILL-PRESENT** | static-only | **—** |
| C3 | Write actor identity self-asserted (verified_author:null) | PARTIAL | code-confirmed | filigree-81d3971467, filigree-61127de02c |

**One finding is both STILL-PRESENT and untracked: C2.** Everything else is FIXED,
MISDIAGNOSED, or a tracked PARTIAL with a known residual.

## Per-finding detail

### Wardline — scan defaults (W1, W2)

**W1 — agent-hostile default scan output. Verdict: FIXED (mixed basis, high confidence).**
The net claim was that a bare scan returned an unbounded ~123KB single-line payload
because the bounded `agent_summary` was opt-in. The code now makes the *default* path
bounded: there is no longer a top-level `findings` array; finding bodies live only
inside the paginated `agent_summary` (`wardline src/wardline/mcp/server.py:265-306,
327-360`), and a bare call returns at most `_DEFAULT_MAX_FINDINGS = 25` bodies
(`server.py:737`). `agent_summary.to_dict()` builds one ordered union, slices a single
`offset:offset+max_findings` window, and emits a truncation block with
`findings_total / findings_returned / next_offset / findings_truncated`
(`core/agent_summary.py:88-185`); `explain` is independently capped at 10. 30 unit
tests exercise the windowing live. The 123KB→bounded *magnitude* is static-only (not
re-fired against lacuna) but the path is fully read and unit-exercised.
**Action:** none required. Optional P3: the cap is by finding *count*, not bytes — a
pathological small project with few but verbose findings still has no byte ceiling.

**W2 — vacuously-green default gate. Verdict: FIXED (code-confirmed, high).**
On a bare scan the gate now returns `verdict=NOT_EVALUATED` (never `PASSED`).
`GateDecision` gained a `verdict` field plus `would_trip_at`, with constructor
invariants enforcing `NOT_EVALUATED IFF fail_on is None` and `FAILED IFF tripped`
(`core/run.py:97-140`); a green-reading PASS is now unrepresentable.
`would_trip_at` is computed over the *same* unsuppressed population an actual
`--fail-on` would judge (`run.py:356-383`), so a baselined-only trip surfaces as
`would_trip_at:ERROR` and `_next_actions_for` steers the agent away from "rescan after
edits" (`agent_summary.py:281-330`). Threaded to both MCP (`server.py:345-354`) and
CLI (`cli/scan.py:397-400`) gate surfaces; tests green.
Note this changes the **signal** (honest not-evaluated), not the **policy** —
baselines are intentionally not honored by default since v1.0 (a deliberate
deconfliction-first default). Do not "fix" that by re-honoring baselines.

### Wardline — accounting (W3)

**W3a — per-finding suppression field overloaded "active". Verdict: FIXED
(code-confirmed, high).** The literal key `suppressed` (whose value `active` meant
NOT-suppressed, colliding in sense with `summary.active` = unsuppressed count) was
renamed to `suppression_state` across every producer surface: `to_jsonl`
(`finding.py:126`), the legis_artifact projection (`core/legis.py:172`), filigree
metadata (`finding.py:185`), and agent-summary entries (`agent_summary.py:259`).
SARIF uses the native suppressions channel. The consuming side reads the new key
(`legis src/legis/wardline/ingest.py:288`, with an explicit "W3 renamed the KEY…
VALUES unchanged" comment). The one remaining literal `suppressed` (decorator-coverage
count, `decorator_coverage.py:124`) is an unrelated count, not a W3 instance.

**W3b — summary buckets don't reconcile with total. Verdict: FIXED (code-confirmed,
high).** `ScanSummary` is now built with `total=len(findings)`; active/baselined/
waived/judged partition `defects` and `informational=len(findings)-len(defects)`, so
the five buckets sum to total as an arithmetic identity that cannot drift
(`core/run.py:310-317`, docstring pins the invariant at `55-68`). The display layer was
additionally partitioned (commit f22aaa5, "W3 residual") so pagination covers every
finding once (`agent_summary.py:103-129, 225-243`). `unanalyzed` is correctly an
overlay, never summed in.
**Action:** P3 — add a direct `active+baselined+waived+judged+informational==total`
unit assertion so a future non-partitioning state can't silently break the identity.

### Federation — emit & routing (F1, N1)

**F1 — Wardline→Filigree 401. Verdict: FIXED (code-confirmed, high).**
The 401 (legacy token value + project routing) is resolved by a single canonical
token converging from two mechanisms onto one *value*. Wardline's resolver is a 5-rung
chain with the legacy `WARDLINE_FILIGREE_TOKEN` demoted to rung 4
(`wardline src/wardline/filigree/config.py:76-93`); rung 3 reads filigree's
auto-minted `<root>/.weft/filigree/federation_token`. Filigree's inbound resolver
mints that same file (`filigree src/filigree/federation_token.py:44-152`),
`store_dir_for` resolves it from the canonical `.weft/filigree/` path
(`dashboard.py:533-555`), and a project-scoped request is validated against that
project's token, not the daemon home token (`dashboard_auth.py:104-130`). The 401
message now splits token-sent-but-wrong from no-token-sent and embeds the attempted
URL (`core/filigree_emit.py:174-208`).
**Residual (expected, documented):** a cross-host deploy with no shared filesystem
still requires `WEFT_FEDERATION_TOKEN` on both ends. P3 message-quality:
the 401 strings are CLI-framed and never mention the `.mcp.json` env block for a stdio
launch nor the zero-ceremony same-host auto-mint path.

**N1 — silent 2xx misroute. Verdict: FIXED (mixed basis, high confidence).**
The structural fail-closed path is code-confirmed: an unscoped *write* on a
loom-scoped path (including `/api/weft/scan-results`, the exact endpoint wardline
posts to) returns 400 VALIDATION with no fall-back to the default project
(`filigree dashboard.py:889-900`, `dashboard_auth.py:36-76`). Scoped responses echo
`X-Filigree-Project` and unscoped *reads* echo the default key (`dashboard.py:874-912`).
Wardline names its destination on the success line and in the MCP status block
(`wardline core/filigree_emit.py:84-111`, `cli/scan.py:343-360`). The live wire slice
("an unscoped emit is actually rejected, a scoped one lands right") is static-only, but
filigree acceptance tests assert zero rows land in either project on an unscoped write
(commit 22156fb).
**Residuals (both P2, both genuine):**
1. Wardline echoes the project it *pinned*, not the one filigree actually *resolved* —
   its `Response` dataclass has no headers field, so it never reads the
   `X-Filigree-Project` header filigree now emits (`filigree_emit.py:117-121`). The
   cross-check half of N1 is not performed client-side.
2. Classic-router and ADR-029 entity-association server-mode writes are outside the
   fail-closed loom set (`dashboard.py:894`) — same honest-seams class on a different
   surface. **Tracked: weft-eff938d3b6** (triage). Verified NOT cross-project
   contamination (prefix+random IDs, foreign-prefix 404s).

### Federation — fidelity (N2)

**N2 — suppression/baseline state doesn't survive the emit. Verdict: PARTIAL (mixed
basis, high confidence).** The worst harm is fixed; a triage-noise residual remains.

*Fixed:* The promote guard is the hard backstop — `promote_finding_to_issue` refuses a
suppressed finding by default, requiring explicit `force=true`
(`filigree db_files.py:2422-2440`), threaded through both MCP promote surfaces and the
HTTP routes. The read surface lifts `metadata.wardline.suppression_state` onto a
first-class `ScanFinding.suppression_state` field, surfaced in `finding_list`
(`db_files.py:272-301, 2245-2301`). So an agent can now distinguish baselined from
active and can no longer *silently* mint a false P1.

*Not fixed (residual):* A baselined wardline finding still *lands* as `status:open
severity:high` — `_upsert_finding` hardcodes `status='open'` and passes severity
through, with suppression only in the metadata column (`db_files.py:1238-1262`;
`finding.py:184-188`, `filigree_emit.py:48-52` keep suppression metadata-only at the
wire). A `finding_list` filtered `status=open severity=high` still returns the
baselined findings — now annotated, but neither filtered nor demoted.
**Tracked: weft-171fc22a50** (still at *triage* though both stated requirements are
implemented — re-scope or close it to the residual).
**Actions:**
- P2: add an `include_suppressed` flag (default-excluding suppressed) to
  `list_findings_global`, and/or bucket suppressed findings separately in
  session-context (reuse the json_extract predicate at `db_files.py:2639`).
- P2 (contract): pin `metadata.wardline.suppression_state` as a first-class carried
  finding field in `federation-sdk.md` / `contracts-index.md`. Today it rides the
  metadata namespace by *convention only* — `qualname` is pinned, suppression is not,
  so a non-wardline scan source has no obligation to populate it and filigree silently
  treats absence as "active". This closes C-10(b)'s "Reference: none yet" gap.
- P3 (docs): `conventions.md:332` still asserts "suppression/baseline truth dropped at
  the seam (N2)" and marks wardline pending — the code now carries it. The doc lags.
- **Adjacent break (out of N2 scope, tracked weft-ef79348eb2):** see N3 cluster — the
  rename left legis's signed ingest hop needing the new key. *Note: ingest.py:288 in
  current legis already reads `suppression_state`, so this appears already satisfied —
  verify and close.*

### Filigree — bridge & triage (F2, N6)

**F2 — analyzer findings don't auto-surface. Verdict: FIXED for ask (b); ask (a)
deferred by design (code-confirmed, high).** Session-context now emits "ANALYZER
FINDINGS: N not yet bridged… (M actionable, K baselined/suppressed)", honest-empty
when 0, on both MCP and CLI orientation surfaces (`filigree hooks.py:150-165`,
`db_files.py:2623-2649`, routed via `meta.py:880` + `admin.py:843`); tests green.
Ask (a) — a batch/auto promote-all — was *deliberately* deferred (Tier 2): the
tracker issue **weft-1ce99ceda8 is closed** with a close_reason citing the
enrich-only doctrine ("auto-creating issues may be load-bearing/noisy"). This is a
conservative default, not a defect.
**Action:** P3 — if the gap is to be closed, ship an opt-in
`finding promote-all --actionable-only` (suppressed-excluded, dry-run by default), not
silent auto-creation.

**N6 — promote/close link one-way. Verdict: FIXED (code-confirmed, high).**
Both halves shipped. *Visibility:* the scan-finding read path gains `issue_status`
and `issue_resolution` via a LEFT JOIN to issues, flowing to MCP and the weft
federation surface (`db_files.py:229-230, 261-302, 2156-2300`;
`mcp_tools/payloads.py:48-49`). *Memory:* a re-promote of a finding whose issue is
done returns the existing dismissed issue (`created=False`, no new bug,
`db_files.py:2388-2407`); a rescan routes to `_update_existing_finding` whose UPDATE
bumps `seen_count` but does **not** touch `issue_id` (`db_files.py:1196-1221,
1306-1354`), so the dismissal memory survives via the link. Tests green.
**Tracker note:** **weft-c815d5e77d is still in *triage*** despite the code landing in
0a99380 — status lag, not untracked. Close it.
**Action:** P3 — add a rescan-preservation regression test (the dismissal guarantee
rests on the UPDATE happening to omit `issue_id` — currently untested, so a future
edit could silently regress N6).

### Filigree — picker & identity (F3, C2, C3)

**F3 — container handed as a unit of work. Verdict: FIXED (code-confirmed, high).**
`startability()` short-circuits `if self.container: return False, "complete child
issues"` *before* the wip-target check — the single predicate behind both
`work_ready.startable` and `start_next_work`, so they cannot diverge
(`templates.py:244`). Container-ness is declarative (`container: bool` on the type
template, `templates.py:173`); epic/milestone/phase/release are marked
`container:True`, leaves stay False (`templates_data.py:155,236,267,1541`), so the
auto-seeded "Future" release is non-startable. The picker also skips containers
independently (`db_issues.py:2201`). Manual `start_work` on a named container is
unaffected. Tests cover it.
**Action:** P3 — when the queue is all-containers, surface "N container issues are
ready but not startable (complete their children)" instead of a generic no-work result.

**C2 — prefix-collision startup noise. Verdict: STILL-PRESENT (static-only, medium
confidence). THIS IS THE ONE STILL-PRESENT, UNTRACKED FINDING.**
The finding's literal proposed fix is already implemented and is a no-op: a
*same-exact-key* re-register is already a silent skip (`server.py:229-236`,
introduced 2026-02-22, predating the report). The actual root cause is that dedup is
exact-string equality on `project_key`; there is **no same-*project* dedup**. Two
distinct store-dir strings that resolve to the same logical project both persist and
collide on the shared prefix, surfacing at SessionStart as "Filigree server
registration failed: Prefix collision…" while every tool stays healthy (the daemon
retains prior good state on reload failure, `dashboard.py:321-355`,
`hooks.py:636-640`). The strongest-supported trigger: the active `.filigree`→`.weft/`
relocation (`core.py:712 migrate_store_to_weft`) adds a new key without calling
`unregister_project` on the old one, so a stranded second same-prefix entry accrues
each session. No commit since 2026-06-07 touched `register_project`.
This degrades the *deconfliction* story: an agent at SessionStart is trained to ignore
a real error class, camouflaging a genuinely-conflicting second project. Held at
medium confidence because the exact server.json key pair during the dogfood run could
not be confirmed (binary is SCHEMA_MISMATCH; not re-fireable here).
**Action:** **P2 — untracked.** Dedup registration by stable project identity:
resolve each existing entry's project root before the collision check and treat
same-root-different-key as an idempotent UPDATE (pop stale, write new); and/or call
`unregister_project(old_store_dir)` inside `migrate_store_to_weft` so server.json is
re-keyed atomically with the relocation. **Do not apply the finding's verbatim fix —
it is already shipped and is a no-op.**

**C3 — write actor self-asserted. Verdict: PARTIAL (code-confirmed, high).**
The net "always null" claim is FALSE for CLI/stdio and TRUE-by-design for HTTP.
ADR-012 added `resolve_os_actor()` (`actor_identity.py:16-29`); CLI and MCP-stdio
entrypoints stamp `verified_author` into the comments row
(`db_observations.py:843-845`, `cli_common.py:210`, `mcp_server.py:1196`). The HTTP
transport deliberately leaves it null — a *documented* posture in `mcp_status`
(`actor_verification.verified=False`, deferral filigree-81d3971467,
`dashboard.py:124-139`); the federation token gates access, not identity (C-8). Tests
exist across CLI/MCP.
**Do NOT re-propose the HTTP identity *hardening*** — it is deferred
(filigree-81d3971467) and, per the deconfliction-not-security ground rule, correctly
out of scope. Only an attribution-clarity message item is in scope.
**Action:** P3 — on a null `verified_author` HTTP write, include a short
`verified_author_reason` ("unverified transport — HTTP writes record a self-asserted
actor; see actor_verification in mcp_status") so an agent can tell "expected null" from
"bug". CLI/stdio responses unchanged.

### Legis — governance posture (N3/Le1, N4)

**N3/Le1 — legis ships dark. Verdict: FIXED on the asked-for axis (mixed basis,
high).** The ask was a discoverable enablement pointer, not auto-enablement. A new
`legis doctor` surface exists with report-only checks naming each enablement path:
`check_wardline_routing` names `LEGIS_WARDLINE_CELL`, `check_policy_cells` names
`policy/cells.toml` / `LEGIS_POLICY_CELLS` / `LEGIS_DEV_DEFAULT_CELLS`; both
presence-only, never rendering key values (`~/legis src/legis/doctor.py:344-410,
516-519`, CLI `cli.py:175-184`). The MCP `_recovery_for` now attaches actionable
`next_action` for both `INVALID_CELL_SPEC` and `CELL_NOT_ENABLED`, splitting the
keyless simple tier from the HMAC-key complex tier (`mcp.py:376-393`). Keyless
chill/coached reachability is pinned by test (7b15c11). The inert-by-default behavior
persists **by design** (commit f921562 is explicit: fail-closed, no auto-provisioning,
signing keys stay operator-held). **Do not propose auto-scaffolding cells.toml or
auto-setting env** — that cuts against C-8 capability-confinement. Ground-rule-4 check
confirms no cell-config scaffold is written into a fresh install (the repo-root
`policy/cells.toml` is legis's own dogfood config, not a shipped template).
**Residual (within-scope honesty gap), P2:** `check_hmac_key` short-circuits to "ok"
when no protected policies are configured (`doctor.py:344-356`), but `binding_ledger`
is None whenever `LEGIS_HMAC_KEY` is unset (`api/app.py:340`), so a fresh specimen
sees doctor all-green while the closure-gate still 404s "binding ledger not enabled".
Add a `check_binding_ledger` report-only check naming that enablement path. P3:
a derived rollup posture line ("governance posture: INERT — 0/3 surfaces wired").

**N4 — governance unavailable on a dirty tree. Verdict: MISDIAGNOSED (code-confirmed,
high).** The finding's core premise is false for the default case. In the **default
keyless posture a dirty dev artifact is GOVERNED**, never raised — just stamped
`artifact_status='dirty'` (`legis src/legis/wardline/ingest.py:204-207`).
`WardlineDirtyTreeError` fires **only** when an artifact key is configured (CI posture)
and `allow_dirty` is off (`ingest.py:209-216`) — which is the intended signed-tree
contract, not a bug. The verbatim quote in the finding ("refusing to sign… for a dirty
working tree") is **stale** — not present in current code; the current message is the
typed amber "unsigned dirty-tree dev artifact" path. f921562 added structured
`to_payload()` remediation naming both "commit" and `LEGIS_WARDLINE_ALLOW_DIRTY=1`.
**Do NOT add an agent-reachable `allow_dirty`/`dev_mode` scan_route param** — f921562
deliberately rejected this on C-8 grounds (an agent self-granting dirty-govern
authority); a C-8 guard test locks the schema. The genuine residuals are
documentation/discoverability:
- P2: the `scan_route` tool description leads with the CI-posture remedy and never
  states "in the default keyless posture a dirty tree governs and is stamped dirty" —
  the very misread the report author made. State it (`mcp.py:287-295`).
- P2 (contract): pin the wardline scan-artifact `dirty` boolean key in
  `contracts-index.md` (~line 59-61) — legis gates on `scan.get('dirty') is True`
  (`ingest.py:202`) but the key/type/producer is unpinned. **Tracked: weft-61d27fb808.**
  (Distinct from N5: legis does not read loomweave's `worktree_dirty` at all.)

### Loomweave (L1, N5)

**L1 — no whole-project finding browser. Verdict: FIXED (code-confirmed, high).**
A new MCP tool `project_finding_list` is registered and dispatched
(`loomweave crates/loomweave-mcp/src/lib.rs:676, 1421`), returning every finding
project-wide enriched with its anchoring entity, requiring no entity id
(`catalogue/inspection.rs:269-351`). The unfiltered total reconciles with
`project_status`'s count *by query identity* — both reduce to `SELECT COUNT(*) FROM
findings` (`snapshot.rs:258` vs the all-NULL predicate in `inspection.rs`).
`entity_wardline_list` also gained a `has_findings:true` filter
(`faceted.rs:139-176`, schema-declared at `lib.rs:777-782`). Single commit cb49008.
**Action:** P3 — cross-link `project_finding_list` from `project_status_get` output so
the count points an agent at the list tool.

**N5 — worktree_dirty means source-only. Verdict: FIXED (code-confirmed, high).**
The chosen disposition was document-the-scope over rename. A `WORKTREE_DIRTY_NOTE`
constant explicitly states the field reports un-indexed untracked source (ignore-aware
`git ls-files --others`), NOT git working-tree state; modified tracked files do not
set it; a freshness gate must key on `staleness==fresh`, not `worktree_dirty==false`
(`tools/status.rs:31-38`), and the note is emitted on every path (`status.rs:329-334`,
`snapshot.rs:347-358`). Verified by empty grep that **legis does not read
`worktree_dirty`** — keeping the name breaks no consumer, and it is not a pinned hub
contract.
**Actions (both P3, docs/contract):** `conventions.md:333` still lists N5 as "pending"
(stale — update to conforming, cite cb49008); optionally pin the `worktree_dirty`
source-only semantics in `contracts-index.md` to forestall a future legis coupling.

### Config / gitignore (C1)

**C1 — runtime DB tracked → dirties tree → legis refuses to sign. Verdict: FIXED
(code-confirmed, high).** Both members now keep their runtime DB from dirtying the
tree under the current `.weft/` layout, at the scaffold/tool level (the right place,
not per-project config). Loomweave's install scaffold writes
`.weft/loomweave/.gitignore` *excluding* `loomweave.db` + WAL/SHM/lock/etc., with a
header explicitly citing the C1/weft-d822a7de2d reversal of ADR-005
(`loomweave crates/loomweave-cli/src/install.rs:35-85, 464-466`); its doctor detects
an already-committed tracked db as a gate-failing problem and self-heals via
`git rm --cached` under `--fix` (`doctor.rs:356-394`, commits 8759d16/6057b69).
Filigree achieves the same C1 outcome by a different mechanism — `filigree.db` is
durable-by-design, the whole dot-dir is root-ignored so the db never dirties the tree,
with a nested gitignore as the un-ignore safety net (`install.py:368-463`,
`admin.py:312-381`). The member-wide convention C-1 exists (`conventions.md:62-79`).
**Residual is doc-only, P2:** the `conventions.md` C-1 cell (line 75) and LW-1 (line
384) still frame the exclusion of `loomweave.db` as a *defect* against ADR-005's
"tracked" mandate — but b7a1b30 deliberately *reversed* that mandate to fix C1, and
the cell still cites the legacy `.loomweave/` path. The filigree cell (line 76) still
says "pending/absent from installed rc3" though install.py ships it. A reader of the
convention would re-introduce the bug. Update both cells.
**Tracked: weft-d822a7de2d, weft-8e3d02f409.**

## Net-new opportunities (not in the 2026-06-07 report)

These are deduped discovery results. Each was checked against the 2026-06-07 findings
and the tracker; adjacent-but-distinct items are kept with the distinction stated,
overlapping items dropped.

### Filigree

- **[P2] `claim_issue`/`claim_next` MCP descriptions prescribe the exact racy two-step
  CLAUDE.md forbids.** Both descriptions say "Does NOT change status — use issue_update
  to advance after claiming" — the claim-then-update sequence CLAUDE.md calls out as
  racing other agents. An agent reads the MCP catalogue before CLAUDE.md, so the
  surface it hits first steers it into the race; neither description cross-references
  the atomic `start_work`/`start_next_work`. Correctness/coordination defect (lost
  transitions / double-claims), not security.
  *Change:* amend `mcp_tools/issues.py:508,693` (and CLI docstrings `cli_commands/issues.py:817,864`)
  to steer to the atomic verb. **Confidence high.**
- **[P3] Unknown-parameter VALIDATION error names the bad key but not the valid set**,
  though it has already computed `allowed` (`mcp_server.py:524-535,624`). Append the
  valid parameters (+ optional `difflib` "did you mean").
- **[P3] Unknown-tool error has no did-you-mean** (`mcp_server.py:939-943`); add a
  `difflib.get_close_matches` hint over ~120 handlers.
- **[P3, low confidence] Scanner subsystem undiscoverable on a fresh project** —
  session-context only mentions analyzers once findings exist
  (`hooks.py:155-165`, gated on `total>0`). Emit a zero-state "SCANNERS: 0 runs… N
  available" line. *Distinct from F2 (populated-state path) and N3 (legis, different
  tool).*

*Dropped from filigree discovery:* the three message-quality items overlap the
"residual papercuts" catch-all weft-f506e5f845 only partially — that issue's body
could not be queried from scope, so they are surfaced as distinct low-severity rather
than asserted clean-untracked; fold into weft-f506e5f845 if it already enumerates them.

### Wardline

- **[P2] tools/list advertises scan/explain_taint/dossier/attest/verify_attestation as
  read-only, but the policy denies them when their dynamic NETWORK/WRITE upgrade
  collides with a write/network-disabled server.** `scan` defaults to `{READ}`
  (`tooling.py:56`) and `_tools_list` emits that static set (`server.py:1290-1301`),
  but `_effective_tool_capabilities` upgrades it to NETWORK+WRITE when a Filigree/
  Loomweave URL is configured (`server.py:1319-1338`), then denies the call
  (`:1377-1379`). The agent cannot predict from the advertised contract which tools
  will be denied. Functional contract-honesty, not permission-hardening.
  *Change:* emit the maximal/possible capability set (or resolve effective caps at list
  time). **Confidence high.**
- **[P3] Two `suppression_state` vocabularies coexist in one scan response** when
  `legis_artifact` is attached: `agent_summary[*]` uses the 4-valued
  {active,baselined,waived,judged} (`agent_summary.py:259`) while
  `legis_artifact.findings[*]` uses the 3-valued {active,waived,suppressed}
  (`legis.py:72-77`) under the identical key. Benign only while the agent treats
  legis_artifact as an opaque blob — nothing labels it so. Add a one-line schema note
  that legis_artifact is a sealed verbatim-post projection. *Distinct from W3 (which
  concerns survival of the key into filigree/legis, not the dual vocabulary within one
  wardline payload).*
- **[P3, low] Bare scan response omits any signal the legis governance hop exists** —
  `_attach_legis_artifact` returns early with no status block when unconfigured
  (`server.py:403-405`), unlike filigree_emit/loomweave_write which self-advertise
  `configured:false` (`:73-103`). Emit a minimal `legis_artifact_status` block.
  *Adjacent to N3 but distinct: this is wardline's scan surface not advertising the
  capability, a different repo/path than legis's own dark posture.*

### Legis

- **[P2] No tool or endpoint enumerates valid policy names or the policy→cell map** —
  `policy_explain`/`override_submit` both require a `policy` string a cold-start agent
  cannot discover. `PolicyCellRegistry` holds the map but exposes only `cell_for`
  (`policy/cells.py:26-41`); no `cell_list` MCP tool, no `/policy/cells` route. Add a
  read-only `policy_cells_list` tool + `GET /policy/cells`. *Orthogonal to N3 (inert
  without a key) — this is "cannot discover the names even to try."* **Confidence high.**
- **[P2] `scan_route`/`policy_evaluate` advertise bare `{"type":"object"}` input
  schemas** for `scan`, `severity_map`, `target` (`mcp.py:238,282,296-302`) — the
  agent sees zero shape and must reverse-engineer the Wardline envelope. Tighten with
  patternProperties / properties stubs / descriptions. **Confidence high.**
- **[P3] `policy_explain` requires `entity` but the value is discarded** (`del entity`,
  `service/explain.py:71`) — the agent must fabricate a meaningless argument that
  implies entity-specific explanations exist (they don't, in v1). Make it optional.
- **[P3] `policy_evaluate` described as read-only but writes an `UNKNOWN_POLICY` event**
  to the audit chain on every unknown policy (`governance.py:343-351`). An agent
  exploring policy names silently grows the audit trail. Amend the description. (Not an
  N4 dirty-tree class — the governance DB is under gitignored `.weft/legis/`.)
- **[P3] structured-cell `ESCALATED_PENDING` gives a poll handle but no latency bound /
  give-up guidance** (`mcp.py:849-862`) — an agent can tight-loop `signoff_status_get`
  or block indefinitely on an out-of-band human. Add `human_async:true` + "surface to
  operator, proceed with other work" guidance.

### Loomweave

- **[P2] MCP id-accepting tools reject `loomweave:eid:` SEIs — the rename-stable handle
  404s on the agent-facing surface.** SEIs exist specifically to survive
  rename+reanalyze and are the ADR-029 blessed cross-tool handle, and every MCP tool
  now *emits* a `sei`; but the MCP input path resolves `id` only via `entity_by_id`
  (locator match, `query.rs:292`) — no MCP tool calls `resolve_sei`. An agent that
  stores a SEI in a Filigree entity_association, survives a rename, then feeds it back
  gets a bare "entity not found", even though HTTP `/api/v1/identity/resolve` resolves
  it (`http_read/identity.rs:178`). Tool descriptions actively invite the error
  ("Accepts any entity id", `lib.rs:379`). The MCP input side was never closed when the
  emit/HTTP sides were (bc8e615). *Change:* detect `is_reserved_sei(id)`
  (`sei.rs:65`) and route through `resolve_sei` before falling back to `entity_by_id`.
  **Confidence high.**
- **[P3] EntityNotFound errors name no recovery step** — bare "entity X was not found"
  across `graph.rs:153-347`, `orientation.rs:271-274`, with no `entity_find` pointer
  and no lineage on a renamed SEI. Append a next-step hint (same fix site as the SEI
  item).
- **[P3, medium] `entity_find` with an unknown/mis-cased `kind` returns empty with no
  signal the kind was the problem** ("unknown kinds match nothing", `graph.rs:100`).
  Return a missing-signal note naming `entity_kind_list`, mirroring the catalogue
  tools' existing pattern (`faceted.rs:42`).

## What's working well

Preserve these so fixes don't regress them.

- **Bounded-default scan + honest gate verdict (wardline).** Bare scan ≤25 bodies with
  pagination; `verdict=NOT_EVALUATED` is unrepresentable-as-PASSED via constructor
  invariants; `would_trip_at` + `_next_actions_for` name the exact `--fail-on X`.
- **Emit-failure discrimination + destination echo (wardline).** 401-no-token vs
  401-rejected vs 403 vs 5xx vs unreachable each yield a distinct actionable reason
  naming where it tried; the resolved project + `project_pinned` surface a misroute at
  the caller.
- **False-provenance guard (wardline).** A dirty tree is never signed; MCP attest
  inverts the default to `allow_dirty=False` so an agent cannot silently attest
  uncommitted changes — a deliberate agent-safety boundary on the irreversible path.
- **Session-context as orientation (filigree).** Honest-empty, READY_CAP truncation
  with a pointer, F2 un-bridged-findings line naming the bridging verbs, self-healing
  dashboard PID re-verify.
- **Irreversible-verb guards (filigree).** `delete_issue` enumerates three independent
  blockers, names `force=True` with its exact consequences, writes a tombstone for
  federation consumers. List pagination caps + structured VALIDATION; schema-walk names
  the exact failing path.
- **Atomic claim+transition (filigree).** `start_work`/`start_next_work` with an
  enriched INVALID_TRANSITION naming the intermediate status; F3 container-skip is
  declarative so picker and `startable` cannot diverge.
- **Fail-closed federation with honest seams (filigree).** Unscoped writes fail closed;
  `X-Filigree-Project` echo on scoped + unscoped-read paths.
- **`_recovery_for` + typed amber states (legis).** Every error_code maps to a named
  next_action + recoverable bool; `SKIPPED_DIRTY_TREE` is a typed payload naming the
  fix; protocolVersion negotiation is forward-compatible.
- **Honest-empty + cost-before-spend + bounded reads (loomweave).** Missing-signal
  notes and scope_excludes so an empty result is never a false true-negative;
  `project_status_get` returns data_version / sei_populated / db_size for drift
  detection without an LLM call; preview-cost before billing; SEI emitted on every
  entity; bounded truncation everywhere.

## Prioritized recommendations

Tagged `[NET-NEW]` or `[already-tracked weft-xxx]`. Leading item is the only
STILL-PRESENT *and* untracked finding.

**P1**

1. **[NET-NEW] C2 — dedup filigree registration by stable project identity / prune the
   stale key on `.filigree`→`.weft/` relocation.** STILL-PRESENT and **untracked**.
   The same logical project registers under two store-dir strings sharing a prefix
   (relocation adds a key without retiring the old one), firing a spurious "registration
   failed" at every SessionStart that trains agents to ignore a real error class.
   Resolve project root before the collision check; treat same-root-different-key as an
   idempotent UPDATE, and/or call `unregister_project` inside `migrate_store_to_weft`.
   File a tracker issue. Do NOT apply the finding's verbatim fix (already a no-op).
   *(static-only / medium confidence — verify the server.json key pair when re-fireable.)*

**P2**

2. **[NET-NEW] Filigree `claim_issue`/`claim_next` MCP descriptions** prescribe the
   racy two-step CLAUDE.md forbids; steer to the atomic `start_work`/`start_next_work`.
3. **[NET-NEW] Wardline tools/list capability advertisement** must reflect the dynamic
   NETWORK/WRITE upgrade so the catalog is an honest upper bound, not a misadvertised
   read-only that the policy then denies.
4. **[NET-NEW] Legis `policy_cells_list` enumeration** (MCP tool + `GET /policy/cells`)
   so a cold-start agent can discover policy names / the cell map.
5. **[NET-NEW] Legis bare-object input schemas** for `scan_route.scan/severity_map` and
   `policy_evaluate.target` — give shape so the agent isn't reverse-engineering the
   Wardline envelope.
6. **[NET-NEW] Loomweave MCP id path must accept `loomweave:eid:` SEIs** — route through
   `resolve_sei` before `entity_by_id` so the rename-stable handle doesn't 404 on the
   agent-facing surface (HTTP already does this).
7. **[already-tracked weft-171fc22a50] N2 residual — demote/bucket suppressed findings
   out of the default open/high view**, and **[weft-171fc22a50/weft-61d27fb808-adjacent]
   pin `metadata.wardline.suppression_state` as a first-class carried field** in the
   wire contract (closes C-10(b)'s "Reference: none yet").
8. **[NET-NEW] Legis N3 residual — `check_binding_ledger` doctor check** naming the
   closure-gate enablement path even with no protected policies (doctor reports green
   while the gate 404s).
9. **[already-tracked weft-61d27fb808] N4 residual — pin the wardline scan-artifact
   `dirty` boolean key** in `contracts-index.md`, and **fix the `scan_route` description**
   to state the default keyless posture governs a dirty tree (the misread N4 itself
   demonstrates).
10. **[already-tracked weft-eff938d3b6] N1 residual — extend fail-closed/echo to the
    classic-router + ADR-029 entity-association server-mode writes**; and **[NET-NEW]
    have wardline read the `X-Filigree-Project` header** to cross-check resolved vs
    pinned project.
11. **[already-tracked weft-d822a7de2d] C1 residual — rewrite the stale `conventions.md`
    C-1 / LW-1 cells** (ADR-005 reversed; `.weft/loomweave/` path; filigree "conforms
    rc7+"). A reader of the convention would otherwise re-introduce C1.

**P3**

12. **[already-tracked weft-ef79348eb2] Close/verify** — legis ingest already reads
    `suppression_state` (`ingest.py:288`); re-verify against a live artifact and close
    or downgrade to docs-sync.
13. **[already-tracked weft-171fc22a50] Re-scope or close N2** — both stated
    requirements are implemented; leaving it at triage drifts the tracker from reality.
14. **[already-tracked weft-c815d5e77d] Close N6** — code landed in 0a99380, issue still
    at triage; add the rescan-preservation regression test.
15. **[NET-NEW] Filigree error-message quality** — unknown-parameter names the valid
    set; unknown-tool did-you-mean; fresh-project scanner discoverability line. (Fold
    into weft-f506e5f845 if that catch-all already enumerates them.)
16. **[NET-NEW] Wardline** — disambiguate the dual `suppression_state` vocabulary
    (sealed-projection note); emit a `legis_artifact_status` block on a bare scan.
17. **[NET-NEW] Legis message-quality** — `policy_explain.entity` optional;
    `policy_evaluate` description discloses the `UNKNOWN_POLICY` audit write;
    `ESCALATED_PENDING` async/give-up guidance.
18. **[NET-NEW] Loomweave** — EntityNotFound names `entity_find` + SEI lineage;
    `entity_find` unknown-`kind` missing-signal note.
19. **[already-tracked weft-5952553f5f] F3** — surface "N containers ready but not
    startable" on an all-container queue.
20. **[deferred filigree-81d3971467] C3** — per-write `verified_author_reason` on HTTP
    nulls (attribution clarity only; the HTTP identity *hardening* stays deferred — do
    not re-propose it as a fix).
21. **Docs/contract sync** — `conventions.md:332` (N2), `:333` (N5), and the N5/L1
    cross-link + `worktree_dirty`/`dirty`-key pins so the hub narrative stops lagging
    the shipped code.

**Explicit non-actions (do not re-propose):** an agent-reachable `allow_dirty`/`dev_mode`
`scan_route` param (N4 — C-8 confinement); auto-scaffolding `cells.toml` or auto-setting
legis env (N3 — fail-closed by design); HTTP-transport identity hardening (C3 —
deferred, and out of scope per deconfliction-not-security); re-honoring baselines by
default (W2 — intentional default, the fix was the signal not the policy).
