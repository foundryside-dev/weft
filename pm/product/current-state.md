# Current State — Weft Federation        Checkpoint: 2026-06-09 (bootstrap)

> **Workspace path:** `pm/product/` (NOT the `docs/product/` default — `docs/` is
> gitignored here as the mkdocs build dir). Resume with `/own-product pm/product`.

## The bet right now
**Now:** dogfood readiness + the coordinated clean-break launch — drive the suite to
a green dogfood and ship the launch as the clean break. Metric: dogfood-pass rate +
the enrich-only / tree-cleanliness guardrails (metrics.md).

## In flight
- Dogfood readiness gate — `weft-cd62a4da9b` — blocked on wardline fingerprint P1s
  `weft-4a9d0f863c` (verifying) + `weft-08124cad2c` (confirmed) and C-4
  `weft-eb3dee402f` (triage).
- Hub↔member counterpart reconciliation — done this session: 19/27 hub tickets now
  carry `has-counterpart`; 15 new member issues filed; convention recorded in memory.
- Federation emit remediation — runbook drafted (`pm/2026-06-09-federation-emit-remediation.md`), **not applied**; sequenced into the launch cutover.
- lacuna specimen `make ci` red — filed `lacuna-0a7d5200a1` (DEMO-1).

## Open questions / blocked-on-owner
- **C1 — concurrency operating model (OPEN):** serial-mostly vs parallel-shared-files
  vs standing-fleet. Decides whether the Next bet's file-lease/announcement layer is
  built at all. Resolve via spike, not opinion.
- **D1 — seat-registry location (OPEN, hard-to-reverse):** Filigree surface vs
  consumer of the Tabard identity authority vs hub. Best paired with the Tabard
  Phase-0 spike.
- Nothing currently blocked awaiting owner sign-off (scope + grant confirmed; C3
  disposition resolved in PDR-0002).

## Last checkpoint did
- Bootstrapped the suite product workspace (PDR-0001); grant confirmed standard.
- Took PM custody of the agent personality/identity concept; resolved its C3 gate →
  top of **Next**, gated on C1/D1, advisory scope, not a new member (PDR-0002).
- Seeded metrics as falsifiable placeholders pending instrumentation.

## Next session, start here
The Next bet's first real investment is a **spike, not a feature**: pin **C1**
(measure the actual concurrency shape from real multi-agent runs) and **D1** (registry
location, paired with the Tabard Phase-0 spike). Only after C1 do we know if the
file-lease/announcement layer survives. When the bet promotes toward Now, the first
DISPATCH act is to hang a Filigree epic under `filigree-ed2ccaf10d`, linked to
`filigree-c2009921cf`, and route it to /axiom-planning. Until launch ships, the Now
bet (dogfood/launch) holds priority — do not pull the Next bet forward (PDR-0002
reversal trigger).
