# Current State — Weft Federation        Checkpoint: 2026-06-09 (discovery + bet reshape)

> **Workspace path:** `pm/product/` (NOT the `docs/product/` default — `docs/` is
> gitignored here as the mkdocs build dir). Resume with `/own-product pm/product`.

## Mental model (the identity/continuity design in one image)
**The desk and the daily hire.** A **desk** is a *line of effort* (Product Manager / program-mgmt /
web-dev) — stable, with a nameplate and a drawer of handover notes (= A′ stable handle + mechanism A).
An **employee** is one agent session — *hired for a day, never rehired*: boots fresh, works the desk,
leaves (= the minted per-session run id). Each morning the new hire **reads the desk's handover folder**
instead of reconstructing everything (A) — and the folder is *dated* ("as of close-of-business
yesterday, against the office as it stood then"), so they check what moved overnight rather than trust a
stale note (provenance stamp; the `f983ebd` lesson). You never ask *"is today's PM better than
yesterday's"* — interchangeable daily hires for one desk (within-role anti-goal). Different **desks** are
the deconfliction lanes; the **stomp** is one desk's hire rifling another desk's half-finished work (B/C).
The real failure mode the metaphor exposes: not the turnover, but a **stale/empty handover folder** — why
A must be reconciled-against-reality, not just "yesterday's notes."

**Second axis — the pool (concurrency).** A line of effort can be staffed by a *pool* of interchangeable
daily hires working at once. A pool has no personal desk — it shares a **whiteboard** (which is just A's
path-keyed handover generalised: a desk is a pool of one). Among fungible concurrent peers, *who* you are
carries no signal — only **what you just did + what you're about to do**. So pool coordination is an
**activity register / IPC** (mechanism C, **hook-fed** so it can't rot): "pool P · ran X · about to touch
Y" — peers route around or flag "that'll collide." Activity-keyed, **not** identity (this is where the
"subrole" urge belonged, and why it was wrong — PDR-0007). C anticipates; **B catches mechanically when a
peer overrides the advisory.**

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
- **C1 — concurrency shape: largely ANSWERED** by operator data (PDR-0003): the
  stomp event is sub-weekly, structural (never zero), human-suppressed. C1 is no
  longer "ask agents" (they're blind to it) — residual is *magnitude*, for the B spike.
- **B's home — OWNER ESCALATION PENDING:** the write-guard (B) likely lives at the
  Claude Code harness layer, *outside* weft. Filing it as an upstream feature request
  is outward-facing → **needs the owner's call** (I'll draft, not file).
- **B design spike — open inputs:** self-write suppression, hunk-vs-file granularity,
  multi-file transaction semantics, non-Write-path tripwire, worktree-scope (the live
  2026-06-09 stomp crossed a worktree boundary).
- **P3 / actor-identifier (PDR-0005, PDR-0006) — open design input for the spike:** the stable
  handle = the **line of effort** (PM / program-mgmt / web-dev — this repo runs these in parallel),
  supplied by spawn context; the minted per-session run id is the event-attribution unit. Decided:
  mint a per-session id, replace free-text `--actor`, handle = line-of-effort (coarse, dodges the
  per-area deference hazard), trust deferred to Tabard. Open for the spike: claim-binds-to-handle
  vs event-binds-to-run-id split, and the exact spawn-context source.
- D1 (seat-registry location) is **moot** — persona/registry dropped; everything is path-keyed.

## Last checkpoint did
- Bootstrapped the suite product workspace (PDR-0001); standard grant confirmed.
- Ran agent **user-research** (3 rounds, 12 neutral `claude -p` interviews + 3 observed
  operator cases incl. one live stomp) on the Next bet — discovery in
  `pm/2026-06-09-agent-identity-discovery-interviews.md`.
- **Reshaped the Next bet (PDR-0003, supersedes PDR-0002):** dropped personas /
  advisory lanes / the Tabard dependency; the bet is now two identity-free, path-keyed
  mechanisms — **A: reconciled handover** (filigree feature, cheap, ships first) +
  **B: pre-write compare-and-swap guard** (the correctness fix + operator's real pain;
  harness-layer; design-spike now). C (presence/avoidance) is v2.
- Added the operator-supplied **stomp-intervention metric** (BASELINE ~1/wk → 0).
- **Value reframe (PDR-0004):** the bet's payoff is **delegation leverage / supervision-load
  reduction**, NOT catastrophe insurance — recovery is near-trivial now and getting cheaper, so
  the win is "the operator stops being the live deconfliction backstop and can fire-and-forget."
  Success metric reframed to supervision load; stomp-rate demoted to a proxy. Feature set + A-first
  sequencing unchanged.

## Next session, start here
1. **Draft the B design-spike brief** (self-write suppression, granularity, multi-file
   transactions, non-Write-path + worktree tripwire) — and **draft the Claude Code
   feature-request escalation** for B's home, for the owner to send (don't send it).
2. **A is nearly free** — scope the filigree handover feature (sha-stamp + path-key +
   intent/verification payload + raw diff + TTL; NO staleness inference) on
   `filigree-c2009921cf` + `get_session_changes` + `reconciliation_debt_list`.
3. Now-bet (dogfood/launch, `weft-cd62a4da9b`) keeps **build** priority; B's spike is
   design work and runs parallel (PDR-0003). Don't pull A/B *build* ahead of launch.
