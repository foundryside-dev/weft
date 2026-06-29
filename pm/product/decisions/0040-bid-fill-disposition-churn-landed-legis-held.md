# PDR-0040 — Bid-fill disposition: churn ACCEPTED+landed; legis preflight HELD (concurrent-ownership)

- **Date:** 2026-06-29
- **Status:** accepted (within grant — accept-against-criteria + dispatch)
- **Bet/Now:** fabric-first (PDR-0035) — the two first-fills from the 06-28 session

## Context
The 06-28 checkpoint left two Bid first-fills on un-merged member branches pending live
cross-member validation. RESUME reconciliation this session found both had been
live-validated (the tracker lagged): Bid-1 churn via loomweave `30549a3` (validated on
lacuna, 564 tests), Bid-2 preflight via the closed validation ticket `weft-a0d04046f5`.
Owner approved "resume both merges, then checkpoint."

## Call
- **Bid-1 (Loomweave churn consumer) — ACCEPTED + LANDED.** Verified `1d2b4fa` is an
  ancestor of loomweave origin/main (`a980ef2`, carried up by a concurrent push) → the
  consumer is federation-landed. Closed the three trailing tracker tickets with commit
  anchors: fill `weft-670ec2fe90`, validation `weft-6fc4a166dc`, deadlock bug
  `weft-e585382ff3`.
- **Bid-2 (Legis←Plainweave preflight consumer) — HELD, not merged** (deliberate deviation
  from "resume both," on new evidence). `git merge-base feat/plainweave-preflight-consumer
  refactor/decouple-layering-inversions` = `cee8526` (feat's tip): the fill is an **ANCESTOR
  of the active refactor branch** another session is building on. The fill is carried on that
  branch + the live working tree (`plainweave_preflight/client.py`, `service/preflight.py`).
  Recorded on `weft-46b2f002fa`; leave open until it lands on legis main via the refactor branch.

## Options considered (for the legis half)
- **A — fast-forward `feat`→main now.** Technically clean (feat is an ancestor of refactor).
  Rejected: steps on the active concurrent session that owns landing it; lands a version-truth
  wrinkle (changelog folds it "into 1.3.0" but legis main is already 1.3.0 without it — the
  exact bug class this audit flagged); forks the path-to-main.
- **B — hold + let it land via the refactor branch (chosen).** Conservative, reversible, no
  collision with the concurrent owner.

## Rationale / standing principle established
**Hub merges must check for concurrent member ownership before landing.** A "stranded validated
branch" may in fact be the foundation of active in-flight work by another session; merging it
independently creates merge debt and version-truth wrinkles. The audit surfaced that **I am not
the only actor** in these repos (4/7 on active branches; loomweave took a PR mid-audit). Default
to holding + recording when a member is concurrently reshaping the same area.

## Reversal trigger
- If the preflight consumer has **not** landed on legis main (via the refactor branch or
  otherwise) by the next checkpoint, escalate: either the refactor stalled (re-evaluate an
  independent ff-merge with a proper 1.3.1 bump) or coordinate with the concurrent session.
- If a concurrent member session is found to have **dropped** a validated fill, the hold was
  wrong — land it directly.
