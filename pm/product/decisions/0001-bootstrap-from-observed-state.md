# PDR-0001 — Bootstrap the product workspace from observed state

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes (scope + grant confirmed this session)
Supersedes: —   Related: vision.md, roadmap.md, metrics.md

## Context
No `docs/product/` workspace existed. The owner invoked `/own-product` and confirmed,
via the bootstrap questions, that the product is **the Weft federation suite** (not
filigree alone) and granted the **standard authority grant**. State had to be
constructed from observed reality (README/doctrine, the `pm/` design docs, the
filigree hub tracker, recent git history), not a remembered history.

## Options considered
1. Bootstrap the full five-artifact workspace now — pro: continuity substrate exists immediately; con: some metric baselines are not yet instrumented (placeholders).
2. Scope the workspace to filigree only — pro: tighter to the live agent-continuity work; con: discards the cross-member federation view the owner explicitly chose.
3. Defer the workspace, keep this a one-off evaluation — pro: zero new files; con: loses the continuity property the ownership loop exists for.

## The call
Option 1: bootstrap the suite-scoped workspace. Vision/anti-goals drawn from
`doctrine.md` + `README.md`; the Now bet (dogfood readiness + clean-break launch)
inferred from the live dogfood gate `weft-cd62a4da9b` and `launch-runbook.md`;
metrics seeded as falsifiable placeholders pending instrumentation. Grant written as
confirmed (standard), with member-admission (doctrine §7), the launch/clean-break
cutover, and `issue_delete`/store re-init named explicitly as escalations.

## Rationale
The owner is present and confirmed both forks, so the grant is authoritative (not
DRAFT). Suite scope matches the standing suite-PM role and the cross-member work
already in flight. Placeholder metrics are honest (marked owner-to-set) and still
falsifiable in shape, which beats either no scoreboard or invented numbers.

## Reversal trigger
Revisit if the owner narrows/widens the grant (itself a vision change → escalate), or
if suite scope proves wrong because the live work is overwhelmingly single-member —
in which case re-scope the workspace to filigree and record a superseding PDR.
