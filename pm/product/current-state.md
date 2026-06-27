# Current State — Weft Federation        Checkpoint: 2026-06-28 (Fabric-first Now CHOSEN — PDR-0035: fill missed stitches + stabilize Plainweave landing; two first-fills on branches; legis-reverify DROP ruled PDR-0037; seam-conformance program BLESSED PDR-0038; Plainweave PyPI publish + name RATIFIED PDR-0036)

> **Workspace path:** `pm/product/` (NOT `docs/product/` — `docs/` is the gitignored mkdocs
> build dir). Resume with `/own-product pm/product`.

> **🔁 Reconciled against (RESUME must re-check these; if any moved, this brief is STALE —
> reconcile loudly, do NOT load as gospel — PDR-0029). Members ship ~daily; legis moved TWICE
> and plainweave ONCE *during* this session:**
> - tracker: cutover epic `weft-4b2f948f70` = **closed** (06-17); seam-health epic `weft-b6effe30f9`
>   = **open/P1** (the active-Now umbrella); seam-conformance program `weft-b5dde278b9` = **BLESSED**
>   (PDR-0038); Plainweave §7 ADMITTED (PDR-0030) + publish/name RATIFIED (PDR-0036).
> - member `main` HEADs (06-28): loomweave `edf8f65` · filigree `f59e423` · wardline `fcbd1ee9` ·
>   legis `395d7fc` (**moved 79b4008→6d6fa3c→395d7fc this session; 1.3.0 shipped**) · warpline `02aa7f0` ·
>   plainweave `de13416` (**moved from 92ec70a**) · tabard `2108cf1`.
> - **Two un-merged first-fill branches (for review, NOT pushed):** loomweave `feat/warpline-churn-consumer`
>   (`6a4f567`) · legis `feat/plainweave-preflight-consumer` (`ee043c9`).
> - Hub working tree still carries the **held** Plainweave doctrine/registries de-fuse + the **held** Tabard
>   canon edits (`doctrine.md`, `registries/*`, untracked `members/tabard.md`) — untouched; the de-fuse is owed.

## The bet right now — FABRIC-FIRST (PDR-0035)
The owner named today's Now: **(1) fill the missed stitches** (functionality *deferred* to ship the launch) **+
(2) stabilize Plainweave's landing in sibling APIs** (build *real* landings, not specs). This is the
**stabilize-the-fabric-first** branch of PDR-0034 — **full-Tenter stays deferred.** · metric: enrich-only
guardrail stays 0 + the FILL-NOW queue draws down (metrics.md).

## In flight (by ID)
- **Bid 1 first fill — DONE on a branch:** Loomweave churn/recency consumer `weft-670ec2fe90` (branch
  `feat/warpline-churn-consumer`, 1957 green, enrich-only/honest-degrade, **not merged**).
- **Bid 2 first fill — DONE on a branch:** Legis←Plainweave advisory-preflight consumer `weft-46b2f002fa`
  (branch `feat/plainweave-preflight-consumer`, all gates green incl. mypy, byte-identical-verdict proof,
  **not merged**) — Plainweave's first real landing beyond the Loomweave read.
- **Bid 1 FILL-NOW queue (gates met, not started):** Warpline→Legis `governance_for_sei` `weft-af0787892c`
  (premise dissolved); Wardline affected-scan completeness tail `weft-843fb82b57`; legis-reverify DROP
  `weft-5cbe6bc11b` (PDR-0037).
- **Bid 2 next:** define the Wardline `scan_manifest` contract `weft-9a35aa00e7` → unblocks peer-facts.
- **Seam-health reconciliation (from the bless, PDR-0038):** hub reclaims stewardship `weft-dbaada5883`;
  L3 legis roll-up `weft-60a941bd19` (the unbuilt seam-health *surface* — L1/L2/L3 still owed, 2026-07-31).

## This checkpoint did (2026-06-27 eve → 06-28)
- **Chose the Now (PDR-0035):** fabric-first; recorded that it resolves PDR-0034 toward stabilize-first.
- **Shipped both bids' first fills** to un-merged member branches (enrich-only, gate-green); filed all the
  follow-up debt dated (`weft-6fc4a166dc`, `weft-47d370b158`, `weft-a0d04046f5`) + a cross-member golden
  drift `weft-51fc82471d`.
- **Ruled the legis-reverify DROP** (PDR-0037) and **blessed the seam-conformance program** conditionally
  (PDR-0038) — CI-gate-not-runtime, converges with the seam-health map; hub reclaims stewardship.
- **Owner ratified** the Plainweave PyPI 1.0.0 publish + name `plainweave` (PDR-0036).
- Closed the duplicate website epic `weft-95808bebcd`; gave 2 untracked RESERVED reservations dated homes
  (`weft-84bb251e81`, `weft-42a2502e5f`) + the Plainweave peer-facts cross-member debt (`weft-9a35aa00e7`,
  `weft-25cbcc728e`). No invisible punting.

## Open questions / escalations (owner-reserved)
- **🚩 Public launch announcement** — cutover shipped + on PyPI, but the announcement is owner-reserved and
  **not recorded as made.** Has it / should it go out?
- **🚩 Merge gate on the two first-fills** — both implemented + contract-tested + gate-green, but **live
  cross-member validation is pending and can't be done from the hub** (MCP misroutes). Needs a loomweave-rooted
  + a legis-rooted session (`weft-6fc4a166dc`, `weft-a0d04046f5`). Merge now + live-validate fast-follow, or hold?
- **🚩 Website deploy** — committed not deployed; **now unblocked** by the publish ratification (publish-Plainweave-first
  precondition met). 5 of 8 site commits still on non-`main` branches.
- **🚩 Canon de-fuse + `members/plainweave.md` "not published" correction** — now AUTHORIZED (PDR-0036) but
  **held** with the Tabard canon (doctrine/registries fuse both; de-fuse the ~3 member-count lines Plainweave-only
  via `git apply --cached`; verify `git diff --cached -- doctrine.md registries members/tabard.md | grep -i tabard` empty).
- **🚩 GS-7 gate flip** `weft-13f84c77c5` — owner runbook act; needs warpline's 1.2.1 fixture patch first.
- **🚩 Tabard §7 admission** (PDR-0028 proposed) + public naming — held.

## Next session, start here
1. **Decide the merge gate** on the two first-fill branches (the live-validation escalation above) — they're the
   visible product of today's bid and shouldn't rot un-merged.
2. **Keep filling the FILL-NOW queue:** Warpline→Legis governance `weft-af0787892c` + Wardline affected-scan tail
   `weft-843fb82b57` + execute the legis-reverify DROP `weft-5cbe6bc11b`.
3. **Bid 2:** define the Wardline `scan_manifest` contract `weft-9a35aa00e7` (hub-bless before build) → peer-facts.
4. **Close the seam-conformance reconciliation:** re-home the seam-index + dissolve the wardline self-steward role
   `weft-dbaada5883`.
5. **Owner escalations** (above): announcement; website deploy; canon de-fuse; GS-7 flip; Tabard §7.
