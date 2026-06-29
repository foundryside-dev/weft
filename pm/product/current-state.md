# Current State — Weft Federation        Checkpoint: 2026-06-29 (Federation interface+gap audit DELIVERED — PDR-0039 two-axis verdict + 2 new seam REDs filed; Bid-1 churn LANDED, Bid-2 legis preflight HELD on concurrent-refactor ownership — PDR-0040)

> **Workspace path:** `pm/product/` (NOT `docs/product/` — `docs/` is the gitignored mkdocs
> build dir). Resume with `/own-product pm/product`.

> **🔁 Reconciled against (RESUME must re-check; if any moved, this brief is STALE — reconcile
> loudly, do NOT load as gospel — PDR-0029). NB: 4 of 7 members are on ACTIVE feature/release
> branches — `main` lags in-flight reshaping:**
> - tracker: seam-health epic `weft-b6effe30f9` = open/P1 (active-Now umbrella); 2 new RED bugs
>   filed under it (`weft-0678843f13`, `weft-d5091cba12`); churn fill + 2 trailing tickets CLOSED.
> - member `main` HEADs (06-29): loomweave `a980ef2` (**churn consumer LANDED — `1d2b4fa` is its
>   ancestor**) · filigree `f59e423` · wardline `bdd84eb2` · legis `395d7fc` · warpline `beea0f8` ·
>   plainweave `c1e125e` · tabard `2108cf1`.
> - **Active branches not on main (concurrent sessions):** filigree `feat/weft-suppression-conformance`;
>   **wardline `release/consolidation-2026-06-26` (carries the federation-wide `seam_registry.json` +
>   fail-closed seam-conformance gate — NOT on main)**; legis `refactor/decouple-layering-inversions`
>   (mid-refactor; **carries the Bid-2 preflight fill as its ancestor**); warpline `release/1.2.0`.
> - Hub working tree still carries the **held, owner-gated** Plainweave canon de-fuse + Tabard canon
>   (`doctrine.md`, `registries/*`, untracked `members/tabard.md`, `site/vendor/`) — untouched.

## The bet right now — FABRIC-FIRST (PDR-0035, unchanged)
**(1) fill the missed stitches + (2) stabilize Plainweave's landing in sibling APIs.** Full-Tenter
stays deferred (PDR-0034). · metric: enrich-only guardrail stays 0 (**06-29 audit confirmed 0
load-bearing deps across all 7 members**) + the FILL-NOW queue draws down.

## In flight (by ID)
- **Bid-1 churn → DONE/LANDED.** `weft-670ec2fe90` + validation `weft-6fc4a166dc` + deadlock bug
  `weft-e585382ff3` all CLOSED (loomweave `a980ef2`, live-validated on lacuna, 564 tests).
- **Bid-2 legis preflight → HELD (open `weft-46b2f002fa`).** NOT independently merged — it's the
  ancestor of the active `refactor/decouple-layering-inversions` branch; lands via that branch
  (whoever lands it bumps version 1.3.0→1.3.1 + closes). Rationale on the ticket.
- **2 new seam REDs (from the audit, under seam-health epic):** `weft-0678843f13` closure-gate drift
  (ownerless — legis+filigree neither compares current-code-vs-attach); `weft-d5091cba12` plainweave
  authority_boundary lie (advertises local_only, makes live loomweave HTTP call when endpoint set).
  Both P1, small fixes, functional/honesty (not security).
- **Bid-2 next:** `scan_manifest` contract `weft-9a35aa00e7` — audit found the RESOLUTION PATH: lift
  wardline's existing `scan_scope` (in the signed legis artifact) into a standalone manifest + alias
  the field names (covered_paths/ruleset_id). Hub-bless before plainweave builds the adapter.
- **FILL-NOW remainder (gates met, not started):** Warpline→Legis `governance_for_sei`
  `weft-af0787892c` (premise dissolved — likely just close); Wardline affected-scan tail
  `weft-843fb82b57`; legis-reverify DROP `weft-5cbe6bc11b` (PDR-0037, execute).
- **Seam-conformance (PDR-0038):** program `weft-b5dde278b9` + hub reclaims stewardship
  `weft-dbaada5883` — still PRE-MERGE (wardline program on `release/consolidation`, `seam_registry.json`
  NOT on main) → the "on merge, reconcile" trigger has NOT fired; reconciliation still preventable.

## This checkpoint did (2026-06-29)
- **Ran the 7-member federation interface+gap audit** (PDR-0039; `pm/2026-06-29-federation-interface-gap-map.md`
  + raw maps in scratchpad) — source-grounded, no-MCP, 2-at-a-time. Verdict: fabric structurally
  sound + **mostly-honest-now** (06-15 "can't say I don't know" epidemic mostly cured); **two seams
  still lie** (RED-1/RED-2, filed). Enrich-only confirmed 0.
- **Disposed both Bid fills** (PDR-0040): churn ACCEPTED+landed (+ 3 tickets closed); legis preflight
  HELD with rationale (concurrent-refactor ownership — established the principle: hub merges check for
  concurrent member ownership before landing).
- Filed RED-1 `weft-0678843f13` + RED-2 `weft-d5091cba12`; refreshed metrics (enrich-only 06-29) +
  roadmap (Now status).

## Open questions / escalations (owner-reserved — carried forward, none NEW this session)
- **🚩 Canon de-fuse + `members/plainweave.md` "not published" correction** — AUTHORIZED (PDR-0036)
  but HELD with the Tabard canon (doctrine/registries fuse both; de-fuse the ~3 member-count lines
  Plainweave-only via `git apply --cached`; verify `git diff --cached -- doctrine.md registries
  members/tabard.md | grep -i tabard` empty).
- **🚩 GS-7 gate flip** `weft-13f84c77c5` — owner runbook act; needs warpline's 1.2.1 fixture patch.
- **🚩 Tabard §7 admission** (PDR-0028 proposed) + public naming — held. (Audit: tabard is honest
  name-reservation pre-alpha, nothing wired, nothing depends on it.)
- **✅ announcement = DONE 06-28; website deploy = LIVE 06-28** (both closed; optional cosmetic
  index.astro lifts remain, cherry-pick-only).

## Next session, start here
1. **Drive down the two seam REDs** (`weft-0678843f13` closure-gate drift, `weft-d5091cba12`
   plainweave boundary) — small, within-grant member fixes; dispatch to legis/filigree + plainweave.
2. **Bless `scan_manifest`** `weft-9a35aa00e7` using the audit's resolution path (lift wardline
   `scan_scope`) → unblocks plainweave peer-facts.
3. **FILL-NOW remainder:** close `weft-af0787892c` (premise dissolved); `weft-843fb82b57`; execute
   legis-reverify DROP `weft-5cbe6bc11b`. Promote the latent `filigree.rs` framing bug (loomweave
   30549a3 follow-up) to a dated ticket.
4. **Confirm Bid-2 preflight landed** on legis main via the refactor branch; if not by next checkpoint,
   escalate (PDR-0040 reversal trigger).
5. **Re-run/refresh the audit** once wardline seam-conformance + the legis refactor land on main
   (snapshot was mid-flight). Owner escalations above (canon de-fuse; GS-7; Tabard §7).
