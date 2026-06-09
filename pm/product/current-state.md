# Current State — Weft Federation        Checkpoint: 2026-06-10 (federation evaluation + post-launch stack)

> **Workspace path:** `pm/product/` (NOT the `docs/product/` default — `docs/` is
> gitignored here as the mkdocs build dir). Resume with `/own-product pm/product`.

## Mental model (the identity/continuity design in one image)
**The desk and the daily hire.** A **desk** is a *line of effort* (Product Manager / program-mgmt /
web-dev) — stable, with a nameplate and a drawer of handover notes (= A′ stable handle + mechanism A).
An **employee** is one agent session — *hired for a day, never rehired*: boots fresh, works the desk,
leaves (= the minted per-session run id). Each morning the new hire **reads the desk's handover folder**
instead of reconstructing everything (A) — and the folder is *dated*, so they check what moved overnight
rather than trust a stale note (provenance stamp; the `f983ebd` lesson). Different **desks** are the
deconfliction lanes; the **stomp** is one desk's hire rifling another desk's half-finished work (B/C).
**Second axis — the pool:** fungible concurrent peers share a **whiteboard** (A generalised); among them
*who you are* carries no signal — coordination is an **activity register** (mechanism C, hook-fed so it
can't rot). C anticipates; **B catches mechanically when a peer overrides the advisory.**

## The bet right now
**Now:** gold-standard clean-break launch (PDR-0011) — contract-correctness class + conformance
oracle + emit fix close before the cutover, because the clean break freezes the cross-member API.
Wave-sequenced (`pm/2026-06-10-gold-standard-launch-sequencing.md`), **owner dispatching live.**
Metric: dogfood-pass rate + enrich-only / tree-cleanliness guardrails (metrics.md).

## In flight
- **Launch gate `weft-cd62a4da9b` — now blocks on all NINE PDR-0011 items:** G1 `weft-37455bf407`
  (being worked, legis+wardline) · G5 `weft-7436c1959e` (emit runbook drafted, NOT applied — Wave 0)
  · G13 `weft-61d27fb808` · C-4 `weft-eb3dee402f` · oracle umbrella `weft-1e053eac02` · **contract
  cousins G9 `weft-94284025f5` / G11 `weft-c7e3486246` / G15 `weft-045076e30f` / G18
  `weft-eef2fa8bbb` (wired + bumped P2 this session — the PDR-0011 pending coordination is CLOSED).**
  Dispatch rule: every contract fix = producer + consumer + golden vector, per seam, never per repo.
- **ADR-049 freeze posture** — `weft-dfeb20c4fa` (child of the oracle umbrella): the freeze-set must
  enumerate ADR-049 as out-of-freeze, versioned with the Rust feature (PDR-0012).
- **Rust line epic `weft-9823a04785`** — board-visible now; OUT of the launch envelope (PDR-0012).
- **Quarantine forensics** — `weft-df29917f29` (hub) / `clarion-2c959a059e` (loomweave): mine the
  rogue-agent branch for the B spike BEFORE salvage-or-discard. Branch must not be deleted first.
- **Board stale-in-done** — C-1/WL-1/FIL-2/LW-1/C-2/C-9/LEG-1/2/3 shipped on release branches, held
  short of closed until cutover (source-fixed ≠ live-fixed). ~252 truly-unmerged commits across four
  release branches; **the merge/cutover choreography is the biggest unscheduled item** → hand the
  gate + wave nomination to `/axiom-program-management` for the formal dependency model + forecast.

## Post-launch stack (PDR-0013 — committed order)
1. **Build A → A′ → B** (PDR-0008); B's design spike consumes the quarantine forensics.
2. **Instrument the scoreboard** `weft-6636667996` (dogfood pass rate lands DURING dogfood #2).
3. **Mechanize close-the-loop** `weft-ff30fd979f` (scope decided at A's scoping — fold-in vs alone).
4. **Cross-project ticket coordination** — promoted bench → Next.
Discovery queue: **Heddle spike `weft-e4589e6570` first**, then **propagation/live-state ledger
spike `weft-61c24f622e`** (default hypothesis: legis feature, not a new member). Standing admission
bar in roadmap.md (dogfood evidence + grep test + enrich-only + doctrine + hook-fed).

## Open questions / blocked-on-owner
- **Launch cutover is owner-reserved** (PDR-0011) — PM sets the bar and coordinates; owner pulls
  the trigger.
- **New-member admission is owner-reserved** (doctrine §7) — fires only if Heddle/propagation
  spikes return "go, and it's a member not a feature."
- **ADR-049 escalation trigger** (PDR-0012): if oracle review finds launch artifacts embedding
  dialect assumptions, ADR-049 becomes launch-gating → escalate.
- **Legis working tree** has uncommitted skill-file edits (`.agents/` + `.claude/` resync) — member
  housekeeping, flag to whoever works legis next.
- **B design-spike open inputs** (carried): self-write suppression, hunk-vs-file granularity,
  multi-file transactions, non-Write-path tripwire, worktree scope (the 2026-06-09 stomp crossed
  one; check whether the quarantine case did too), keep/forget classifier tiering + whitelist +
  Tier-2 latency budget, claim-binds-to-handle vs event-binds-to-run-id, spawn-context source.

## Last checkpoint did (2026-06-10)
- Resumed + reconciled; ran the whole-federation evaluation (resume brief in session; grounded in
  the interface audit + in-flight deep-dive). Grant re-confirmed verbatim by owner.
- **Wired G9/G11/G15/G18 into the gate at P2** — gate now matches PDR-0011 exactly.
- **PDR-0012**: Rust analyzer out of launch envelope; ADR-049 declared out-of-freeze; Rust line
  epic filed. **PDR-0013**: post-launch priority stack + new-tool discovery pipeline + standing
  agentic-first admission bar.
- Filed: `weft-9823a04785` (Rust epic), `weft-dfeb20c4fa` (ADR-049), `weft-df29917f29` +
  `clarion-2c959a059e` (quarantine, counterparted), `weft-61c24f622e` (propagation spike),
  `weft-6636667996` (scoreboard), `weft-ff30fd979f` (close-the-loop). Heddle promoted (comment on
  `weft-e4589e6570`). Roadmap updated (PDR-0012/0013 stamps).

## Next session, start here
1. **Hand the gate + `pm/2026-06-10-gold-standard-launch-sequencing.md` to
   `/axiom-program-management`** — formal dependency model + cutover choreography (the biggest
   unscheduled risk). Don't race the member dispatch streams; coordinate via the gate comments.
2. **B design-spike brief** — now including the quarantine-branch forensics (clarion-2c959a059e).
3. **Scope A on `filigree-c2009921cf`** (+ `get_session_changes` + `reconciliation_debt_list`) and
   make the close-the-loop fold-in call (`weft-ff30fd979f`) there.
4. Launch keeps *build* priority; everything above is design/coordination work in parallel.
