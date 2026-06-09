# Roadmap — Weft Federation            Updated: 2026-06-09 (PDR-0003)

> Sequencing, WSJF / cost-of-delay, and dated forecasts are produced by
> /axiom-program-management. This file records bets as INTENT, not a delivery
> schedule. Do not compute WSJF here; hand the committed bet over for sequencing.

## Now  (committed, in-flight)
- **Dogfood readiness + the coordinated clean-break launch — gated to GOLD-STANDARD
  (PDR-0011).** The suite ships once every member passes its lacuna dogfood, `make ci` is
  green, *and* the federation interface audit's contract-correctness class + executable
  conformance oracle close — because the clean break (no backcompat) **freezes the
  cross-member API**, so contract defects must be right *before* launch. Correctness over
  ship-speed: own-use tooling, no client deadline. · tracker: `weft-cd62a4da9b` · **gated on**
  G1 `weft-37455bf407` + G5 `weft-7436c1959e` + G13 `weft-61d27fb808` + the oracle umbrella
  `weft-1e053eac02` + C-4 `weft-eb3dee402f` (contract cousins G9/G11/G15/G18 to be wired in via
  hub counterparts as the parallel stream files them) · metric: dogfood-pass rate + enrich-only
  guardrail (metrics.md). Audit: `pm/2026-06-10-federation-interface-audit.md`.

## Next (shaped, decreasing certainty)
- **Agent continuity & write-safety** — **SIGNED OFF 2026-06-09 (PDR-0008);** shape & sequence
  committed, build follows launch. Consolidated proposal:
  `pm/2026-06-09-agent-continuity-write-safety-PROPOSAL.md` (+ annex). Reshaped by agent
  user-research (PDR-0003; discovery in `pm/2026-06-09-agent-identity-discovery-interviews.md`).
  Identity-free, path/activity-keyed mechanisms; personas / advisory lanes / the Tabard
  dependency all **dropped**. **All four mechanisms are now weft features — B is built in-house as
  Claude Code hooks (PDR-0009), so the bet has NO external dependency and the upstream escalation
  is withdrawn.** *Authorised next (no further sign-off): the B/A′ design-spike brief and scoping
  A+A′ — design work parallel to launch.*
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
    pain. **Built in-house as Claude Code hooks** (PreToolUse on Edit/Write + Bash) with state in
    **filigree**; a two-tier **keep/forget classifier** (preset whitelist → lightweight-LLM
    fallback) does self-write-suppression + activity-filtering (PDR-0009). *No upstream
    dependency; the escalation is withdrawn.* Higher severity/risk → **design-spike NOW, in
    parallel**; build after. · metric: stomp interventions → 0 (metrics.md).
  - **C — entity presence for avoidance** (PDR-0007/0010): a **loomweave-entity-keyed** (file
    fallback, enrich-only) presence/intent marker — "someone's on `walk_calls`" — **hook-emitted
    from *keep* events** (can't rot, classifier-filtered so not spammy) for *predictive* avoidance;
    composes with B (anticipate cheaply / catch mechanically). **Advisory, NOT operator-cleared
    exclusive locks** (those rebuild the human backstop — PDR-0004 — and miss non-opt-in stomps);
    a deliberate hard-lock survives as a rare explicit opt-in. Build when pools are real.
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
- **Cross-project ticket coordination** — cascade a hub ticket's children into member trackers +
  safely *address* across per-project DBs (**federated**, NOT a shared hub store — doctrine §6).
  Builds on ADR-029 entity associations + the counterpart convention; intersects the in-flight
  project↔DB resolution fixes (`weft-a9ae398c5b`, `weft-eff938d3b6`). The shared-hub-DB variant is
  parked as doctrine-incompatible. Concept: `pm/2026-06-09-cross-project-ticket-coordination-concept.md`.
