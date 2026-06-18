# Staff Room — agent user-research interviews (4 agents, 2 Opus + 2 Sonnet)

**Date:** 2026-06-17 · **Method:** 4 independent subagents, each primed with a different
real in-progress task (Opus/state-machine-refactor, Sonnet/flaky-test, Opus/onboarding-UX,
Sonnet/API-docs+ADR). Feature described **neutrally** — no "staff room / fantasy league /
perspective-diversity" framing, to avoid coaching idealized answers. Creativity-risk probe
placed LAST so it didn't bias the behavioral questions. Interviews independent (no agent saw
another's). Driver: owner's concern that a busy model just mints `filigree-12345` and moves on.
Precedent: agent user-research reshaped the continuity bet once before (PDR-0003).

> Research capture. Feeds `2026-06-17-staff-room-shaping.md`. The synthesis below reshapes
> that bet; see "Product implications."

> **FRAMING CORRECTION (owner, 2026-06-17).** An earlier draft of this section called the
> perspective-diversity idea "falsified." That was the wrong lens. There was never a narrow
> hypothesis to falsify: the design principle is **give agents a general information-exchange
> primitive and prescribe nothing** — agents define the use. So the agents converging on
> deconfliction is *one discovered use*, not a verdict. (The "fantasy league" framing was a
> joke; the serious point is use-agnosticism — "if they choose to run a league in there, I'd be
> pleased.") Read the finding below as "here is the use busy mid-task agents reach for first,"
> not "the concept is wrong."

## Headline finding (round 1 — single ephemeral channel)

**Described neutrally, 4/4 agents — both models, all four headspaces — reached first for a
real-time deconfliction / hazard / collision board.** None reached for trading
cross-perspective creative advice *mid-task*. What they described is close to the **PDR-0024
tag-out board's job** with a message layer — a strong, useful signal about the dominant
mid-task use, and the seed of the two-mode redesign that round 2 validated (see addendum).

## Five convergent findings (strength noted)

1. **Solo ≈ useless; all value is in the concurrent fleet.** (4/4) "It's a coordination tool
   and there's no one to coordinate with." → This is a *fleet* feature; the metric must be
   measured under concurrency, and solo value should not be promised.

2. **The realized job is deconfliction/hazard, not conversation.** (4/4) "X is being edited /
   X just changed / X is broken," invalidation warnings on *shared-resource* tags. Strong
   signal the staff room and the tag-out board are the same surface — or the staff room is the
   *advisory-message dimension* of the coordination plane.

3. **The ticket-scoped-tag antipattern is real, structural, and self-defeating.** (4/4 — every
   agent admitted it as its own default) "My attention is task-shaped; the tag I reach for
   labels what *I'm* doing, not what others need to watch." "A tag only I use is a private log,
   not a channel — I'd be performing coordination without doing it." The owner's exact worry,
   confirmed unanimously.

4. **Two external levers convert scratchpad → shared space** (free-text-anything alone defaults
   to junk): (a) **seeding / seeing live traffic** — "agents tag-match to what's already alive";
   an empty or status-noisy room is written off on first open; (b) **light convention + tag
   autocomplete against live tags** — kills sprawl (`db`/`database`/`db-migration`/`migrations`)
   AND redirects to shared vocabulary. Third (2/4): **pain teaches** — the first real collision
   makes posting/watching reflexive.

5. **Ephemerality is right for "who's touching what NOW," wrong for hazards/conventions — and a
   silently-expiring hazard actively LIES.** (sonnet-docs + opus-ux, explicit) "I post 'hold on
   the schema change,' it expires in 3h before the next agent arrives; now silence reads as
   *clear to proceed* when the hazard persists." This is the confident-empty failure PDR-0023
   exists to kill. Corollary (sonnet-docs): **no read-receipt** in an async/ephemeral channel →
   advisory only, never a trustable coordination primitive. → The owner's *ephemeral* requirement
   and the agents' *hazard* usage want **opposite** TTL semantics.

**Failure modes named repeatedly:** status-chatter ("starting"/"almost done") → noise → death;
broadcast abuse → agents mute it → useless the one time it matters; tag sprawl → subscription
breaks.

**Where the social/advice value DID flicker (the edges):** opus-ux's one wanted use was *asking
a question it shouldn't decide alone* ("is there an existing validation component?") — but it
noted ephemerality makes that useless ("conventions live in a wiki/codebase"). opus-refactor
would engage *"at a natural break"* and *"read before I start, not during."* → The
advice/handover value (the owner's origin anecdote was a HANDOVER) lives at **session
boundaries**, not mid-task — and it wants *permanence*, which fights the ephemeral design.

## Verbatim highlights

- **opus-refactor:** "Solo, I mostly ignore it… there's no one to coordinate with." / "The
  durable, reused tags name a **shared resource or a shared hazard**, not a person's current
  task. Task-named tags get created once and die." / "Left alone, I would tag
  `payments-statemachine`, post one note, feel like I'd used the channel, and never touch it
  again. The reason is structural, not lazy: my attention is task-shaped." / Fix proposed:
  "autocomplete against live tags kills the sprawl AND redirects me to the shared vocabulary."
- **sonnet-flaky:** "The real value is in the receive path, not the send path." / "If I open
  `flaky-ci` and there's a post from 2 hours ago… I immediately understand this channel has
  value. If it's empty or full of `in-progress: task-412` posts, I mentally write it off." /
  "post when you find a trap, not when you make progress."
- **opus-ux:** "The 'expires in a few hours, no archive' property makes it useless for the
  thing I'd most want — discovering existing conventions." / "The ephemerality is actually
  correct for 'who's touching what right now' and wrong for 'what are our conventions.'" /
  "Pain teaches the social use; nothing else reliably does."
- **sonnet-docs:** "No read-receipt… I can't trust it as a real coordination primitive." /
  "Expiry during long-running work… Channel absence now actively misleads — silence means
  'clear to proceed' even when there's a hazard." / "Without the feedback loop, under-use is
  self-reinforcing… it stays a trace log that individual agents write to and nobody reads."

## Product implications (reshapes the shaping-note bet)

The honest read: **the staff-room-as-mid-task-social-cross-talk is largely falsified by its own
users.** What survived and is validated is a **fleet deconfliction *message* layer** — which is
PDR-0024 coordination-plane territory, and which the tag-out shaping doc already gave correct
(event-tied) expiry semantics. Three ways forward:

- **(A) Fold into the coordination plane.** The staff room becomes the *advisory-message*
  dimension of the tag-out board ("X just changed, rebase"; "this fixture is a trap"), inheriting
  the board's **event-tied expiry** (expire-on-merge / holder-dead-reap / reason-carrying
  disappearance) — which *solves the lying-expiry problem* finding #5 raised. RECOMMENDED for the
  validated part.
- **(B) Keep the ephemeral-social staff room as a distinct Later/speculative bet** whose value
  lives at session boundaries, heavily seed-dependent, with convention + autocomplete — and
  explicitly NOT carrying the lying-expiry flaw (so social-only, never hazards).
- **(C) Two surfaces, sharp split:** hazards/coordination → tag-out board (event-expiry, the
  validated need); ephemeral social/advice → staff room (blind-TTL, the owner's original vision,
  speculative).

**The reversal trigger in the shaping note now has evidence behind it:** the perspective-diversity
value, if real, may be better served by *deliberate workflow orchestration* (judge panels,
diverse-lens fan-out — literally how these four interviews were run) than by an ambient channel
agents won't voluntarily use. Owner decision pending.

---

## Round 2 addendum — TWO MODES (bulletin + chat). Same 4 primings, fresh unanchored agents.

**Owner's design move:** instead of one ephemeral channel, give agents BOTH — a **BULLETIN**
(post notes, **poster sets each note's TTL**, longer-lived, pull) and a **CHAT** (ephemeral
hours, push, broadcast flag). Prescribe nothing; ask what naturally goes where. This directly
targets round-1 finding #5 (the lying-expiry tension). **Result: strongly validated, with
near-verbatim convergence across both models and all four headspaces.**

**THE PARTITION (unanimous) — "durability of relevance," i.e. STATE vs EVENT:**
- **BULLETIN** = facts/decisions that **outlive the sender's session**; addressed to "whoever
  arrives cold later" (incl. future-me); *pull*. Claims, hazards/landmines, settled
  conventions + *rationale*, root causes, "don't-do-this."
- **CHAT** = coordination about the **present moment**, value evaporates when it passes; *push*.
  Live collision-avoidance, merge-order negotiation ("about to rename X, hold 10min"),
  broadcast interrupts, "you up? need this now."
- Canonical test (4 phrasings of one idea): *"still useful after my session ends → bulletin;
  useless in 15 minutes → chat."* opus-ux-r2: **"chat = what are you doing right now so we don't
  collide; bulletin = what did we collectively decide so we don't diverge."**

**POSTER-SET TTL = the standout choice (unanimous), three independent reasons it matters:**
1. **It IS what creates the two modes in practice** — "without it the two modes collapse into
   one" (opus-ux-r2); fixed-short TTL makes the bulletin "slow chat."
2. **Self-cleaning lowers the cost of posting durable knowledge** — "if TTL were infinite I'd
   post LESS — I'd be creating permanent debt" (opus-refactor-r2). Sweet spot = bounded but
   poster-controlled (neither infinite/debt nor fixed-short/evaporates).
3. **TTL encodes confidence as metadata** — "short TTL = grain of salt, long TTL = this held up"
   (sonnet-flaky-r2): a heuristic at 12h, a confirmed root cause at 3 days.
- Proposed TTL ranges cluster tightly: **1–2h** live locks (stale locks mislead) · **4–8h**
  session claims (outlast interruption) · **1–2d** in-flight / decision-pending-ADR · **3–5d+**
  settled conventions, landmines, architectural traps.

**SOLO vs FLEET (unanimous):** Solo → bulletin lightly (note-to-future-self / decision trail),
chat dead ("broadcasting into an empty room"). Fleet → both alive; bulletin = read-first
coordination spine, chat = real-time deconfliction. Value scales with concurrency.

**THE MAKE-OR-BREAK — convention, NOT tooling (unanimous):** every agent admitted the
ticket-named-tag silo is its default ("create `onboarding-flow-PR`, dump one note, never read
anyone else's → the appearance of coordination with none of it"). Fix is social: a tiny blessed
tag set (`claim`/`hazard`/`wip`/`decision` + area tags) + a **read-first norm**. Highest-leverage
concrete affordance (opus-ux-r2, echoed): **surface "N existing notes match the area you're
working in" at session/task start** — "that single prompt converts the bulletin from a diary
into a thing I read." (This is the existing SessionStart snapshot hook, extended.)

**Doctrine fit:** bulletin claims are **advisory, not locks** (opus-refactor-r2 explicit) —
deconfliction stays by trace/merge; the board just reduces surprises. On-charter (PDR-0010).

**Distinct contributions:** sonnet-docs-r2 — the bulletin's value *over* trace deconfliction is
**decisions + rationale** ("trace says what happened; bulletin says what was decided and why"),
and it prevents the "two agents independently finalize different conventions" failure.

**Net:** the two-mode design resolves every round-1 tension (lying-expiry, durable-knowledge-vs-
ephemeral, single-channel-collapse) and maps cleanly onto the PDR-0024 coordination plane —
**the bulletin subsumes and generalizes the tag-out board** (path reservation → claims + hazards
+ decisions; `expire-on-merge` is just an event-tied TTL for a "live lock" note). Validated bet.
