# In-flight state of the federation — deep dive (2026-06-10)

Ground-truth sweep of git history, branches, worktrees, working trees, and CHANGELOGs
across all four members + the hub. Captures **what's in flight, where it's at, and the
parallel lines of effort that are NOT on the weft board.**

## Headline (read first)

1. **The current release branches are genuinely unmerged into `origin/main`** (verified by
   `merge-base --is-ancestor` against the fetched remotes — none is an ancestor of
   `origin/main`). Truly-unmerged commit counts (`origin/main..origin/<branch>`): **filigree
   131, loomweave 60, wardline 39, legis 22.** `origin/main` itself is *actively maintained*
   (it carries prior merged PRs and is even 1 commit ahead of wardline's `rc4`) — so this is
   "the in-flight releases haven't cut over yet," not "main is abandoned." The
   launch-runbook's "filigree-first coordinated cutover" has not begun. **This is the single
   biggest unscheduled risk** — four simultaneous major/minor releases gated on a hard
   rebrand wire-break (filigree 3.0.0 schema v26) that all members must cut over to in
   lockstep. *(Earlier draft cited inflated counts measured against a stale local `main`;
   corrected here against `origin/main`.)*
2. **The `line_start` "gated decision" was overtaken by execution.** I filed
   `weft-feea638ec0` / `weft-e618c4118a` yesterday as *gated/decoupled*. Wardline has
   already **shipped the full wlfp2 rekey** (drop `line_start` + entity-relative
   move-stable discriminator + scan-driven `wardline rekey` migration) on `rc4`. My
   decouple/disposition doc is now stale.
3. **A second-language (Rust) analyzer is a major line of effort invisible to the weft
   board**, spanning BOTH wardline (`RustAnalyzer`, `--lang rust`) and loomweave (Rust
   qualname dialect, calls-edge MVP), coordinated via a shared ADR-049 dialect +
   conformance corpus. Scope beyond the 4-Python-member launch.
4. **A quarantined rogue-agent intrusion** sits on a loomweave branch awaiting disposition.
5. **Tracker stale in the "done" direction** (the chronic close-the-loop gap): C-1, WL-1,
   FIL-2, LW-1, C-2, C-9, LEG-1/2/3, W3 all have shipped fixes; several still show
   open/in-progress.
6. **Uncommitted artifacts at risk:** weft `app/` (an entire Vite+React hub site,
   untracked) and legis skill files (modified, uncommitted).

---

## Wardline — branch `rc4` (39 commits unmerged vs `origin/main`; `rc4` is 1 behind `origin/main`). Clean tree.

**Tracked / in-scope, DONE on rc4:**
- WL-1 taint-resolution drift fix — `705acfe` (`weft-4a9d0f863c`, still shows in-progress).
- **C-1 PY-WL-114 stacked-decorator collision — `e3e1e7a`** (`weft-08124cad2c`, still shows
  P1 ready). The workflow I launched (w410lr1oz) is no longer tracked; C-1 landed.
- Proactive fingerprint-collision guard on the real scan path — `0a551c4` + `4928fbd`.

**OVERTAKEN — the entire `line_start` rekey track I had GATED is BUILT on rc4:**
- P1 scheme-infra: self-describing fingerprint scheme (`wlfp1`) + loud-fail store loaders
  + `SCHEME_MISMATCH` — `5ff986f` / `30f55dc`.
- P3 value-rekey: **drop `line_start`, entity-relative move-stable discriminators (`wlfp2`)**
  + S3 discriminator-shape lint + `RuleMetadata.multi_emit` — `966cd9f` / `979f94d`.
- P4: scan-driven **`wardline rekey`** migration carrying verdicts `wlfp1→wlfp2` + 5-lens
  review fold — `7bfe81b` / `c3e3ce7`. Runlist marked **P1–P4 DONE**.
- ⇒ `weft-feea638ec0` (gated design track) and `weft-e618c4118a` (migration) are effectively
  delivered. The panel's gating question (does the planned Rust core reproduce CPython
  ordering?) is now being answered empirically in the Rust worktree, not deferred.

**Also landed:** pre-1.0 rule scrub (PY-WL-104/109/118 + 12 correctness fixes); F1
zero-ceremony Filigree auth (reads auto-minted federation token); emit-destination echo
(C-10a, no silent misroute); `doctor` filigree.auth check + repair; bounded scan default +
explicit gate verdict (no vacuous green); `.weft/wardline` relocation.

**Parallel line of effort — worktree `feat/rust-plugin` (15 commits, NOT on board):**
Full Rust language plugin WP1–WP7 — suffix-parameterized discovery, parse+index, ADR-049
qualname dialect, trust vocabulary + `@trusted`, builder-dataflow L2 for
`std::process::Command`, RS-WL-108/112 rules, `RustAnalyzer` wired into `run_scan` + CLI
`--lang rust`, coverage posture, preview guide. Multiple adversarial panels folded. A whole
second-language analyzer.

## Loomweave — branch `feat/mcp-seam-consistency-560f` (= `rc3` head; 60 commits unmerged vs `origin/main`). Clean tree.

**Tracked / in-scope, DONE on rc3:**
- LW-1/LW-2 `find_entity` (`weft-b7ce301e92`): `entity_find` content+substring recall
  "discovery beats grep" — `1015274` + skill doc.
- C-2 (`weft-8e3d02f409`): `loomweave db checkpoint` WAL-truncate verb — `1b1c258`.
- C-9 (`weft-a2f4cf95c7`): shared `weft.toml` key-layout draft — `234fe7f`.
- ADR-005 reversal (`weft-d822a7de2d`): gitignore `loomweave.db` — `b7a1b30`.
- `.weft/loomweave` store consolidation (ADR-046).

**`clarion-*` line (loomweave's OWN tracker, ~15 fixes, partially board-invisible):**
doctor self-heal + index-DB health + git-tracked-DB gate; C-4 foreign-fence managed-block
writer; analyze in-project import retention; `briefing_blocked` identity gating;
`weft.toml` cross-read sibling-endpoint reader; plugin/host validator split; `find_dead_code`
rooted on **Wardline trust boundaries**; content-keyed finding ids (ADR-047) + stale-finding
sweep (ADR-048).

**Parallel line — worktree `feat/rust-plugin-spec` (paired with wardline's Rust effort):**
Rust qualname dialect Phase 1a/1b/**2** — trait/impl SEI signatures, symbol-table resolver
(Resolved/Ambiguous/External), imports edges, **Phase 2 calls-edge MVP**, dialect amendment 3
(self-type generics, stacked-cfg fold, reserved-char escape). This is the **graph side** of
the same Rust analyzer wardline is building; shared ADR-049 dialect + conformance corpus.

**⚠️ `quarantine/rogue-agent-2026-06-09` branch (needs disposition):**
"rogue-agent intrusion (qualname/cli/dialect) entangled with calls MVP." A rogue agent's
output got entangled with the calls-MVP line and was quarantined onto a branch rather than
merged. Decide: salvage the legitimate calls-MVP commits vs discard the branch.

## Filigree — branch `release/3.0.0` (**131** commits unmerged vs `origin/main`). Clean tree (one trivial doc stash).

**This is a major BREAKING release in flight, not a fix branch:**
- ADR-016 Phase 2 — remove ~115 legacy flat MCP tool names (`get_issue`→`issue_get`, …).
- **Clarion→Loomweave / Loom→Weft rebrand as a hard wire-break (schema v26):**
  `/api/loom/*`→`/api/weft/*`, `clarion:eid:`→`loomweave:eid:`, `CLA-`→`LMWV-` rule ids,
  token env rename. **No compatibility aliases.** v26 migration rewrites stored SEI prefixes
  in place. *(Note: `loomweave:eid:` is the FROZEN scheme — this is the rename TO it.)*
- `TransitionMode` enum + `get_stats` alias removal (breaking). Breaking checklist lands
  incrementally on-branch; "do not pin to 3.0.0 until complete + consumer-migration window."

**Tracked / in-scope dogfood fixes landed here:**
- FIL-2/X-5 (`weft-d7273d61e3`): `finding_list` filter by kind/suppression/qualname/rule_id
  — `f983ebd`. `finding_list` now defaults **active-only** — `eb6e03d` (addresses N2 shape).
- F7 contract: finding-suppression surface asymmetry ratified. Plus N6 issue-status on
  findings, per-project token scoping, `.weft/filigree` store migration, B3 bearer-leak.

**Side branches:** `codex/loom-feedback-tickets` (ADR-029 entity-association polish +
close-on-fixed cascade), `docs/loom-federation-theme`/`-pointers` (site theme). WIP stash on
`feat/dashboard-modularization` = a docs list renumber (trivial).

## Legis — branch `rc4` (**22** commits unmerged vs `origin/main` — a clean fast-forward; strictly ahead).

- **1.0.0 FINAL cut** — `64208dd` "drop the rc". **First member to ship a final version.**
- Dogfood LEG-1/2/3 (`weft-2232c81366` + folded): policy discoverability, `scan_route` cell
  trap, envelope `next_action` — `f5f5a8b`. W3 `suppression_state` adoption
  (`weft-ef79348eb2`) — `fbdf949`.
- **Whole `legis doctor` subsystem built ground-up** (spec→plan→10 TDD tasks→install-wiring/
  config/store/governance-chain checks→`--fix`/repairability tagging).
- **Two adversarial security-audit passes closed:** JUDGE-1/3, GOV-1/2, AUD-1/3
  (delete-and-rechain forgery + fsync + head-anchor), AUTH-1, ID-3, POLICY-1/2, INSTALL-1,
  CRYPTO-THRESHOLD. Substantial governance-integrity hardening despite the suite's
  deconfliction-not-security posture (legis is the governance member; integrity ≠ security).

**Uncommitted (working tree):** `loomweave-workflow` skill files (`.fingerprint` + `SKILL.md`)
modified in BOTH `.agents/` and `.claude/` — a skill resync. Commit or revert.

## Weft hub — branch `main` (ahead of origin 14). Two parallel lines + at-risk artifacts.

1. **Product/PDR workstream** (`PDR-0003..0010`, `pm/product/vision.md` + `roadmap.md`,
   continuity proposal+annex): a strategic product line on agent identity / session-continuity
   / concurrency pool / delegation leverage / write-safety. "Next bet" reshaped via agent
   user-research; owner sign-off committed (PDR-0008). Running parallel to the launch grind.
2. **`app/` — an entire Vite+React multi-page hub site — UNTRACKED, not committed.** Vendors
   the design-system + 17-component library; has `dist/`, `node_modules/`, `verify.mjs`.
   Substantial artifact sitting only in the working tree.
3. Working tree also: modified `.gitignore`, `conventions.md`, `federation-emit-remediation.md`;
   3 fingerprint panel docs untracked (this PM's).

---

## What this changes for the PM

- **Reconcile the board** — close/advance the shipped-but-open: C-1 (`weft-08124cad2c`), WL-1
  (`weft-4a9d0f863c`), the line_start track (`weft-feea638ec0`/`weft-e618c4118a` — overtaken),
  FIL-2 (`weft-d7273d61e3`), LW-1 (`weft-b7ce301e92`), C-2 (`weft-8e3d02f409`), C-9
  (`weft-a2f4cf95c7`), LEG-1/2/3 (`weft-2232c81366`). **Caveat: all DONE on release branches,
  NOT main** — same source-fixed-≠-live-fixed gap dogfood-3 surfaced. "Done" = "merged + cut
  over," so reconcile to a *building/verified* state, not closed, until the cutover lands.
- **The merge-to-main / launch cutover is now the critical path**, not the individual fixes.
  Sequencing risk: filigree 3.0.0's hard rebrand wire-break must land first and every member
  re-point in lockstep (the launch-runbook's filigree-first order).
- **Decide on the Rust analyzer's scope** — is it in or out of the launch envelope? It's a
  large two-member effort with zero board representation.
- **Disposition the loomweave rogue-agent quarantine branch.**
- **De-risk the uncommitted weft `app/`** (and the legis skill files) before they're lost.
