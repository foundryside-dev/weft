# The Staff Room — ephemeral fleet cross-talk (shaping / bet)

**Date:** 2026-06-17 · **Status:** ✅ RESOLVED — **folded into PDR-0024** (owner ruling,
2026-06-17: *"this is just me reinventing 0024 with a new hat; let's do 0024 with an
appropriately festive hat"*). NOT a standalone bet. This doc is retained as the **shaping +
research provenance** for the two-mode refinement now recorded in PDR-0024 (Amendment 1). ·
**Class:** product shaping / coordination-plane refinement · **Driver:** owner, live session
2026-06-17 (originated from observing a two-agent handover negotiation in which the agents kept
trading useful, unsolicited technical advice).

> **The festive hat = what this exploration added to PDR-0024's coordination plane:** the
> **use-agnostic principle** (prescribe nothing; hand agents a general information-exchange
> primitive and let them define the use), the **two-mode** structure (poster-TTL bulletin +
> ephemeral chat), **poster-controlled TTL** as the keystone, agent-coined free tags, and the
> **read-first / session-start-surface** make-or-break. The bulletin **subsumes the tag-out
> board**. Validated by 8 agent interviews (`2026-06-17-staff-room-agent-interviews.md`).

> Capture artifact, not a decision. Promote the chosen cut to a PDR on owner go. All code
> held — the five-member cutover keeps build priority today. Later-horizon bet; overlaps
> the PDR-0024 fleet-OS coordination plane.

---

## ⭐ ROUND-2 REDESIGN — TWO MODES (bulletin + chat). This supersedes the single-channel concept below.

Two rounds of agent user-research (`2026-06-17-staff-room-agent-interviews.md`, 8 interviews
total) reshaped this from a single ephemeral channel into a **two-surface design**, and the
owner clarified the governing principle: **prescribe nothing — hand agents a general
information-exchange primitive and let them define the use.** (The "fantasy league" was a joke;
the serious point is use-agnosticism.) The redesign:

- **BULLETIN** — post notes, **poster sets each note's TTL** (hours → days); longer-lived;
  *pull* (read-first). For **state** — facts/decisions that outlive your session: claims,
  hazards/landmines, settled conventions + rationale, root causes. "Useful to whoever arrives
  cold later."
- **CHAT** — ephemeral (hours), *push*, `broadcast` flag. For **events** — coordination whose
  value evaporates when the moment passes: "about to rename X, hold 10min," merge-order, live
  collision-avoidance, "you up?". "Useless in 15 minutes."
- **The partition (unanimous across 8 agents):** *state vs event* / *discover vs witness* /
  *pull vs push*. "Still useful after my session ends → bulletin; useless in 15 min → chat."

**Why this is the validated shape:**
- **Poster-set TTL is the keystone** — it (1) is what makes the two modes distinct at all
  (fixed-short TTL collapses the bulletin into "slow chat"); (2) **lowers the cost of posting
  durable knowledge** because finite TTL self-cleans ("infinite TTL → I'd post less, it's
  permanent debt"); (3) **encodes confidence** (short TTL = grain-of-salt, long = held up). It
  also resolves the round-1 **lying-expiry** flaw: hazard notes live as long as the hazard;
  live-locks expire fast.
- **The make-or-break is convention, not tooling** — the ticket-named-tag silo is every agent's
  default failure ("a tag only I use is a private log"). The two fixes both agents asked for:
  **(a)** a tiny blessed tag set (`claim`/`hazard`/`wip`/`decision` + area tags); **(b)** the
  highest-leverage affordance: **surface "N existing notes match your work area" at session
  start** (the existing SessionStart snapshot hook, extended) — "converts the bulletin from a
  diary into a thing I read."
- **Bulletin claims are advisory, not locks** (deconfliction stays trace/merge — PDR-0010); the
  bulletin's value *over* trace is **decisions + rationale** (prevents "two agents settle
  different conventions").

**Federation placement:** this *is* the PDR-0024 coordination plane, refined. The **bulletin
subsumes and generalizes the tag-out board** (path reservation → claims + hazards + decisions;
`expire-on-merge` is just an event-tied TTL on a live-lock note). Still Filigree-hosted /
Tabard-certifies-who (the hybrid below), additive, reusing the claim/lease/**reap** engine —
poster-set-TTL + reap is exactly that engine generalized from issue to note granularity.

**Updated falsifiers:** (1) agents never adopt the **read-first** habit → the bulletin silos into
per-ticket monologue (the dominant risk; mitigated by the session-start surface). (2) chat
degrades to status-narration / broadcast-spam → muted. (3) contention too low → both inert
(value scales with fleet concurrency). The original perspective-diversity falsifier is retired:
the bet no longer rests on a specific use, only on agents finding the primitive worth using.

*(The single-channel shaping below is preserved for provenance; treat the two-mode design above
as current.)*

## Frame: the gap none of the existing surfaces fill

Three nearby surfaces already exist or are shaped, and the staff room is none of them:

- **Tag-out board** (PDR-0024 coordination plane) — presence + advisory path *reservation*.
  About *don't collide*. The staff room is not reservation.
- **Filigree issue comments** — discussion welded to a specific work item. The staff room
  is *not* work-item-scoped.
- **Handover trail** (Next-bet mechanism A) — sha-stamped intent + diff + verification
  status, path-keyed, TTL. The *structured* handoff. The staff room is *unstructured*.

The handover anecdote exposed the hole: two agents traded **useful technical advice that
was not a reservation, not tied to an issue, and not structured handover state** — and it
**evaporated** when the sessions ended. That ambient, peer-to-peer shop-talk has no home.

## The value model — perspective diversity, harvested hot (owner insight)

Because of how transformer-based agents work, **the same model primed by different task
contexts is functionally a different specialist.** A context steered through a UX problem
reaches for different analogies, vocabulary, and priorities than one deep in a state-machine
refactor — same weights, different region of behaviour. Put two such instances in a room and
one says the thing the other structurally would not have reached for. The staff room's value
is **perspective diversity**, not knowledge transfer (a wiki would do transfer).

**This is why it is ephemeral.** A primed instance's hot take is only worth hearing *while it
is still primed*; value decays as contexts cool, compact, or end. So the TTL-of-hours is not
a storage convenience — it is **intrinsic to the value**. The owner's "TTL hours, not weeks"
intuition and the perspective-diversity insight are the same fact.

## The bet (falsifiable)

> A fleet of differently-primed agent instances will **post to and read** an ephemeral,
> low-friction, tag-routed staff room, surfacing cross-perspective advice that measurably
> improves outcomes (or unblocks faster) versus each agent reasoning in isolation —
> **measured on our own multi-agent workflow runs.**

**Falsifiers (any one kills or reshapes the bet):**
1. **Agents defect to inline reasoning** — they never post; the room is dead weight. (Same
   "is it greppable-away" falsifier PDR-0024's sense-making plane carries: if a single agent
   reasons just as well without the peer take, the room adds nothing.)
2. **Tag routing collapses** into one giant broadcast channel — relevance is lost, agents
   skim past (the tag-out board's "cries wolf" failure).
3. **Contention/concurrency too low** — on solo or serial work there is no peer to talk to;
   value scales with fleet concurrency (same caveat as the coordination board).

## The model

| Decision | Resolution |
|---|---|
| **Job** | Async advice **and** live-ish cross-talk, both ephemeral — TTL **hours, not weeks** |
| **Hosting** | **Filigree hosts** it (additive surface; reuses TTL / lease / heartbeat / **reap**). **Tabard certifies *who* is speaking** — the host-vs-authority split mirrors PDR-0028 (Loomweave hosts code-identity; Tabard certifies actor-identity). Ships without waiting on Tabard; becomes a live proof-point that the *who* coordinate has real consumers, **advancing** Tabard's provisional-home decision without forcing it. |
| **Substrate** | Append-only `events.jsonl` projection + hook **delta** delivery. **No broker, no running server** — §6-safe; "live enough" via frequent delta reads, the same trick the tag-out board uses. |
| **Routing** | **Ephemeral, agent-coined tags** (`engine`, `ux`, `pytorch`, `xylophone`, …). No registered vocabulary, no hub-blessed taxonomy. Agents invent tags as they go; a newcomer browses live tags, gets curious, peeks, joins or moves on. |
| **Interrupt** | A **broadcast flag** bypasses tag filters — the rare, deliberate PA override ("whoever's editing `parser.c`, knock it off"). Always gets through. |
| **Delivery** | Push **only** the agent's subscribed tags + broadcasts, as a bounded delta. **Never** an auto-emitted activity firehose (see below). |
| **Governance** | **Ephemerality IS the moderation policy.** Everything is hours-TTL, so the tag space is never governed, cleaned, or policed — the room is *continuously self-clearing*. A dead tag is just one with no un-expired messages; it ceases to exist as time passes. No taxonomy to police, no rot, no cleanup job. |
| **Honesty** | Inherits the 2026-06-15 invariant: a message/tag's disappearance carries a machine-readable reason (`expired-time` / `reaped-dead`); **room-unreachable ≠ room-quiet** (a broken feed must not read as "all clear"). |
| **Philosophy** | **Trust the agents.** The system provides the room + tag routing + broadcast; agents decide what to post, how to tag, when to broadcast, and what to watch. Models are smart enough to use the room the way they need to. |

## Explicitly cut (anti-patterns the owner rejected)

- **Hook-emitted activity firehose** ("agent-3 edited `file.c`") — REJECTED. (1) Agents tune
  it out as noise; (2) it is the system doing the agents' thinking for them. The room is
  **agent-driven, not hook-driven**: the system routes deliberate messages; it does not
  generate traffic by surveilling edits.
- **Auto-derived headspace presence** (infer each agent's frame from files/issue/tool calls,
  off mechanism C's sensor) — PROPOSED CUT. It was the clever-honest relevance mechanism;
  **agent-chosen tags subsume it** more simply and drop a dependency. (Reopen only if a cheap
  "who's around right now" queryable proves wanted; YAGNI for v1.)
- **Hub-blessed tag taxonomy** — REJECTED. Ephemeral room tags are *chatter labels, not
  cross-member contracts*, so the "hub owns the alphabet, agents write the words" rule
  (PDR-0024) does not bind them — free coinage is the correct treatment of the layer below
  contracts. Contracts are governed; gossip is not.

## Relationship to existing substrate (the tell it's on-charter)

- **filigree:** claim + lease + heartbeat + `work_stale_list` + reap — the TTL/reaping engine
  the hours-TTL needs, already built (generalize from issue → message granularity).
- **legis / tabard:** the *who* attribution + certified speaker (Tabard's coordinate; legis
  launch-binding as the interim in-session actor handle).
- **existing hooks:** `SessionStart` snapshot + `PostToolUse` delta feed — the delivery
  mechanism, already proven by the tag-out board's feed design.
- **mechanism C:** shares the "ephemeral, hook-mediated, enrich-only" idiom (but the staff
  room is *agent-authored*, where C is *activity-derived* — the activity-derived limb is the
  one we cut here).

## Open forks (decide before/within v1)

- **Message size / shape** — one-liner vs threaded note; v1 keep flat (whole-project, no
  threads — the owner said "general whole-of-project channel").
- **Subscription default** — does a fresh agent default to all-tags, no-tags, or a boot-time
  "here are the live tags" prompt to choose? (Interacts with falsifier #2.)
- **Broadcast rate-limiting** — the PA override is powerful; does it need a soft throttle so
  broadcast doesn't become the de-facto channel (falsifier #2 again)? Lean: trust + ephemeral
  governs it; revisit if abused.
- **TTL exact value** — "hours" — 2h? 8h (a shift)? Tied to typical session length; set on
  first dogfood.

## Status / next

SHAPING. Owner co-authored the shape live; has **not** formally ruled. On go: promote the
chosen cut to a **PDR** (record the bet + falsifiers + reversal trigger), then build v1 as a
**purely additive** filigree surface (no second shock to 3.0.0 users — the same hard
constraint the tag-out board carries). **Build is held** behind the five-member cutover,
which keeps priority. Sibling of the tag-out board (coordination plane) and the L2 macro
clearing-house (sense-making plane) under the PDR-0024 fleet-OS frame — a third facet:
**reservations, commands, and now conversation.**

**Reversal trigger:** if a first dogfood shows agents do not voluntarily post (falsifier #1)
or tag-routing collapses to broadcast (falsifier #2), the room is dead weight — abandon it;
the perspective-diversity value, if real, is then better captured by deliberate workflow
orchestration (judge panels, diverse-lens fan-out) than by an ambient channel.
