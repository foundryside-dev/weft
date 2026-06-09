# Roadmap — Weft Federation            Updated: 2026-06-09 (PDR-0003)

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
- **Agent continuity & write-safety** — reshaped by agent user-research (PDR-0003;
  discovery in `pm/2026-06-09-agent-identity-discovery-interviews.md`). Two orthogonal,
  **identity-free, path-keyed** mechanisms; personas / advisory lanes / the Tabard
  dependency all **dropped**.
  - **A — reconciled handover** (sha-stamped, path-keyed, intent + verification-status +
    raw diff, TTL; *no* staleness inference): a **filigree feature** on `filigree-c2009921cf`
    (session/run) + `get_session_changes` + `reconciliation_debt_list`. Cheap → ships
    first *because it's nearly free*. · metric: time-to-orient (metrics.md).
  - **A′ — actor-identifier assignment (P3, PDR-0005)** — the *assignment side* of the same
    `filigree-c2009921cf` object: filigree **mints a per-session run id** (replaces free-text
    `--actor`, kills the "everyone is `claude`" collision); claims/continuity bind to a stable
    handle from **spawn context** (operator label / worktree / harness). *Have-a-non-colliding-id*
    (cheap, here); *trust-the-id* = Tabard (Later). Ships with A.
  - **B — pre-write compare-and-swap guard** (hunk-level, self-write-suppressed,
    transaction-aware, working-tree tripwire): the correctness fix + the operator's actual
    pain. Lives at the **Edit/Write tool layer → likely a Claude Code / harness feature,
    outside weft** (filing that is an owner escalation). Higher severity/risk → **design-spike
    NOW, in parallel**; build after. · metric: stomp interventions → 0 (metrics.md).
  - **C — pool activity register / IPC** (PDR-0007): a shared, **hook-fed**, **activity-keyed**
    (not identity) register — "pool P · ran X · about to touch Y" — for *predictive* collision
    avoidance among concurrent fungible peers; composes with B (anticipate cheaply / catch
    mechanically). Activity, not subroles. Build when pools are real; moot if work stays
    single-occupant-per-desk.
  Now-bet (launch) keeps *build* priority; B's spike is design work and runs parallel.

## Later (directional bets, no order, no dates)
- **Crypto agent-identity authority** ("Tabard/Seal") — spike-then-decide; doctrine §2/§6
  amendment required. **No longer a dependency of the Next bet** (discovery showed the
  continuity/write-safety layer is identity-free); stands on its own merits.
  `pm/2026-06-06-agent-identity-component-plan.md`.
- **Heddle** — temporal / change-impact authority go/no-go spike. `weft-e4589e6570`.
- **Shuttle** — change-execution (must follow attribution; you cannot safely execute
  a change without first attributing who authorized it).
- **Cross-host federation** — the HTTP/cross-host half of verified-actor + emit.
