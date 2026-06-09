# Roadmap — Weft Federation            Updated: 2026-06-09 (PDR-0002)

> Sequencing, WSJF / cost-of-delay, and dated forecasts are produced by
> /axiom-program-management. This file records bets as INTENT, not a delivery
> schedule. Do not compute WSJF here; hand the committed bet over for sequencing.

## Now  (committed, in-flight)
- **Dogfood readiness + the coordinated clean-break launch** — the suite ships once
  every member passes its lacuna dogfood and `make ci` is green; the launch *is* the
  clean break (no cross-member backcompat). · tracker: `weft-cd62a4da9b` (dogfood
  gate) · gated on `weft-4a9d0f863c` + `weft-08124cad2c` (wardline fingerprint P1s)
  and `weft-eb3dee402f` (C-4 multi-owner block) · metric: dogfood-pass rate +
  enrich-only guardrail (metrics.md)

## Next (shaped, decreasing certainty)
- **Agent session continuity & the personality/identity-management layer** — the
  three-tier shape *registry of advisory seats → adoption (verified id + per-run
  session) → continuity (resume brief)*. Post-3.0.0. Substrate already tracked:
  `filigree-c2009921cf` (session/run object — the keystone), `filigree-6549e739de`
  (evidence bundle), `filigree-81d3971467` (cross-host verified-actor). Concept:
  `pm/2026-06-09-agent-personality-identity-management-concept.md`. Scope is
  **advisory, never enforced** (deconfliction-first). · metric: agent
  resumption/handoff fidelity (metrics.md) · NOT a new member; features on existing
  members + a consumer of the identity authority. Not yet sequenced — two open
  questions gate it (C1 concurrency shape, D1 registry location; see PDR-0002).

## Later (directional bets, no order, no dates)
- **Crypto agent-identity authority** ("Tabard/Seal" — the lower layer this Next bet
  consumes) — spike-then-decide; doctrine §2/§6 amendment required.
  `pm/2026-06-06-agent-identity-component-plan.md`.
- **Heddle** — temporal / change-impact authority go/no-go spike. `weft-e4589e6570`.
- **Shuttle** — change-execution (must follow attribution; you cannot safely execute
  a change without first attributing who authorized it).
- **Cross-host federation** — the HTTP/cross-host half of verified-actor + emit.
