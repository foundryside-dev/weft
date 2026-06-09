# Concept Capture — Agent Personalities & the Identity-Management Layer

> **PM conceptual capture — NOT a federation contract, NOT a committed component, NOT a spec.**
> This records a 2026-06-09 brainstorming thread (and the concrete CLAUDE.md changes
> that seeded it) before it evaporates. It is an *idea-bench conceptual note*, written
> at the explicit request to "write this all out conceptually — all options and
> everything." Nothing here is decided beyond the two small CLAUDE.md edits in Part A
> and the two design leanings logged in the decision log. Admission of any *member*
> runs through [`../doctrine.md`](../doctrine.md) §7, exactly as Legis and Charter did.
>
> **Date:** 2026-06-09 · **Method:** live collaborative brainstorm (Filigree session),
> interrupted before the design→spec gate. Captured verbatim-in-substance, not adjudicated.
>
> **Read this with its lower layer:**
> [`2026-06-06-agent-identity-component-plan.md`](./2026-06-06-agent-identity-component-plan.md)
> — the *cryptographic* agent-identity authority (enroll/certify/attest; the actor-analogue
> of SEI). **That plan is the identity primitive; THIS note is the personality/scope/continuity
> layer that consumes it.** They are different layers, not competitors. See §6.

---

## 0. TL;DR

The thread started as "add my agent identifier convention to CLAUDE.md" and walked,
by stages, into a coherent *future* shape:

> **An identity-management system where Filigree (or a Weft-federation layer) holds a
> curated menu of "personalities" an agent adopts on startup. A personality confers an
> identifier, a scope/lane, and areas of focus — plus continuity (its last session log
> and "what's next"). Scope is ADVISORY (a deconfliction hint, never a lock), because
> the long-game is to move from hard barriers to "agents negotiate and deconflict" as
> they get more capable. Collision-avoidance becomes a property of how the lanes are
> carved (partitioning), not a runtime mutex — which is the federation's
> deconfliction-first doctrine applied to agents.**

It is clearly **post-3.0.0** work. Most of its substrate is already tracked
(`filigree-c2009921cf` session envelope; the v24 `verified_actor` foundation; the
crypto identity-authority component plan). The thread was interrupted at the
"what do you want to do with this" gate — that question is **unanswered** (see §3).

---

## PART A — What actually landed (concrete, done this session)

Two edits to `/home/john/filigree/CLAUDE.md`, placed in a **new unmanaged section
*after* the last tool-managed block** (`<!-- /legis:instructions -->`), specifically
so no tool's `install` regenerator clobbers them. The convention spans all four Weft
tools, so it does not belong inside any single tool's managed block.

### A1. Weft suite actor-identity convention

> When using any Weft tool (filigree, wardline, loomweave, legis), the agent's actor
> identifier is **`claude-filigree`**, or **`claude-filigree-<worktree-name>`** when
> working in a worktree. Passed as `--actor` (CLI), the MCP launch-bound `--agent-id`,
> and `--assignee` on work-claim verbs. Rationale: consistent event attribution and a
> consistent SEI-keyed governance audit trail across the suite.

(Note: the user's standing memory bans worktrees, but the `-<worktree-name>` variant
was requested for completeness/future-proofing.)

### A2. Ownership / actor-mismatch diagnosis principle

> On a Weft owner/actor-mismatch warning (`ACTOR_MISMATCH`, a managed block owned by a
> sibling tool, an issue attributed to another actor), you MAY proceed — but only once
> you understand **why** the identity differs. The cause decides the action:
> - **Benign → proceed:** a previous agent set the wrong name; stale/historical attribution.
> - **Dangerous → STOP, surface it:** the mismatch means another agent is working the
>   **same ticket in parallel** (e.g. from a worktree). That is a real concurrency
>   conflict; proceeding races/overwrites their work.
>
> An ownership warning is a **signal, not a verdict.** Blind-proceed can clobber a live
> parallel agent; blind-halt wastes time on a stale-name false alarm. Diagnose root
> cause first.

Also saved as a durable feedback memory (`feedback_ownership_warning_diagnose_cause`).

**This A2 principle is the conceptual seed of everything in Part B** — "how should an
agent react when it discovers another identity is touching its work" generalises
directly into "how should a fleet of identified agents deconflict."

---

## PART B — The brainstorm: from file-locks to an identity-management system

### B1. The three original ideas (as posed)

The user floated three intertwined things, uncertain how they'd work in practice:

1. **File-level exclusivity leases** — an agent "tags out" the files it wants exclusive
   access to for a ~5-minute block, then must request another block to renew.
2. **Unique identifier per startup** — an agent gets a fresh unique ID each time it
   spins up.
3. **Role assignment (the "maybe we're doing this wrong" reframe)** — instead, agents
   are spun up and *assigned into roles*: *"you're claude-jim, here's claude-jim's
   last work logs (you don't need to read them unless something breaks), and here's
   what's next."*

Then, the keystone addition:

4. **Identity-management system / menu of personalities** — a system like Filigree
   *retains a menu of "personalities"* for an agent to take on; the personality confers
   its **identifier, scope, and areas of focus.**

### B2. Orientation finding — most of this is already designed

A 2026-05-07 "MCP agent-systems effectiveness review" (Filigree epic
`filigree-ed2ccaf10d`, plan `docs/plans/2026-05-07-mcp-agent-systems-review.md`)
independently arrived at almost exactly ideas 1–3. The mapping:

| Original idea | Where it already lives in Filigree | Status |
|---|---|---|
| "tag out files for a 5-min block, renew" | Lease/heartbeat (`work_claim` + `work_heartbeat` w/ `lease_hours` + `work_stale_list` + `work_reclaim`) | **Shipped — but at TICKET granularity, not file** |
| "unique identifier each startup" | `start_agent_session(...)` → durable session/run id (`filigree-c2009921cf`) | **Proposed, not built** |
| "you're claude-jim, here's last logs + what's next" | session *envelope* + `get_session_changes(session_id)` + evidence-bundle export (`filigree-6549e739de`) | **Proposed, not built** |

And critically: the **`verified_actor` work (schema v24) that just landed in 3.0.0** is
the foundation that makes a "claude-jim" identity *trustworthy* rather than a forgeable
string. (See the go/no-go assessment: v24 is additive/nullable; CLI + MCP-stdio stamp a
transport-verified OS identity today; the HTTP/cross-host half is deferred to
`filigree-81d3971467`.)

### B3. The reframe — identity is TWO layers, which dissolves the unique-id-vs-roles fork

The "roles" instinct (idea 3) and the "unique id" idea (idea 2) are **not** an
either/or. The clean resolution is two nested layers:

- **A stable seat / role** — `claude-jim` / `claude-filigree`. The unit of *continuity*
  (last logs, what's next, audit attribution). Bound to a real identity by the
  verified-actor work / the crypto identity authority.
- **A per-run session id** — unique *each startup*, nested under the seat. This is the
  "unique identifier each time it spins up." Answers "what did *this run* intend, touch,
  verify, and leave unfinished."

The **personality menu** (idea 4) is the object that *holds all of this together*:
a personality = `{ identifier, scope, focus areas, + continuity (last session, what's next) }`.
Adopting one on startup = verified identifier + a fresh session id under it. This is
exactly the `start_agent_session` envelope from `filigree-c2009921cf`, **promoted**:
the session is no longer free-floating; it's an instance of a *registered seat with a
defined lane.*

### B4. The key insight — scope deconflicts by PARTITIONING, not by LOCKING

If `claude-dashboard` owns the JS and `claude-core` owns `core.py`, **they don't
collide — because their lanes don't overlap.** Collision-avoidance becomes a property
of *how the menu is carved*, not a lock grabbed at runtime.

That is **literally the federation's own philosophy** — Weft is *deconfliction-first
by design*, not access-control-first (the user's standing guidance; cf. the
"don't over-egg security" doctrine). The personality/scope model is that principle
applied to agents: **partition the work so they don't contend, rather than gate them so
they can't.**

Consequence: idea 1 (file leases) and idea 4 (personalities) are not competitors —
the personality layer is primary and *largely removes the need* for the lease layer.
File-leasing **demotes to an exception handler**: it only fires where two lanes
legitimately must overlap (both genuinely need `core.py` this hour).

### B5. The "negotiate and deconflict" north star — what it does to the file-lease

The user chose **advisory scope** with this rationale (logged verbatim in §3):

> *"as agents get more capable we want to move from 'hard barriers' to 'negotiate and
> deconflict'."*

Under advisory scope + negotiation-as-resolution, a "file lease" stops being a **mutex**
(a lock that blocks you) and becomes an **announcement** on a shared board:
*"claude-core is in `core.py` for the next 30 min, FYI."* Another agent sees it and
routes around it — or pings to negotiate if it genuinely needs in. **That reconciles the
opening idea with the closing one:** the lease is the *advisory deconfliction signal*,
and the personality registry is what makes the signal legible (you know *who*
claude-core is and *why* it's in there).

Coherent one-line philosophy the thread converged on:

> **Filigree (or a Weft layer) as the shared coordination substrate where capable agents
> announce intent and negotiate overlap — advising, never policing — scaling from static
> lanes today toward live negotiation as agents improve.**

### B6. The emerging shape — three tiers

> **Registry** (curated menu of seats, each w/ advisory scope + focus)
> → **Adoption** (verified identifier + per-run session id)
> → **Continuity** (`get_session_changes` resume brief: "here's your last log, here's what's next")

---

## PART C — Decision log (the forks presented + the user's answers)

The brainstorm used explicit multiple-choice forks. Recorded for fidelity:

### C1. "What's the real concurrency shape — when do two agents actually collide?"
Options presented:
- **(a) Mostly serial, rare parallel** — collision feared is two agents on the *same*
  ticket; ticket-claims + the "same ticket = STOP" rule may already cover it; file
  leases would be YAGNI.
- **(b) Parallel, different tickets, shared files** — routine parallel agents on
  *different* tickets that touch *overlapping* files; the one case that genuinely needs
  a file-level lease layer.
- **(c) Standing fleet of named roles** — many persistent named seats working
  concurrently; identity/role + session envelope is the priority.
- **(d) Not sure yet — explore it.**

**→ ANSWER: (d) Not sure yet — explore it.** *(The concurrency operating model is
therefore still OPEN. This is a primary thing a future spike must pin down — it decides
whether the file-lease/announcement layer is needed at all.)*

### C2. "Is a personality's scope ADVISORY or ENFORCED?"
Options presented:
- **(a) Advisory / deconfliction hint** — tells you your lane, nothing physically stops
  you; matches deconfliction-first; cheapest; trusts the agents.
- **(b) Enforced / hard boundary** — the tool refuses out-of-lane writes/claims; an
  access-control system; heavier; cuts against deconfliction-first.
- **(c) Advisory now, enforce-able later** — ship advisory + audit out-of-lane acts,
  record enough to *could* turn on enforcement for specific seats later.

**→ ANSWER: (a) Advisory**, with the explicit rationale: *"precisely because as agents
get more capable we want to move from 'hard barriers' to 'negotiate and deconflict'."*
*(This is a load-bearing design commitment — it sets the whole character of the system.)*

### C3. "Given 3.0.0 is mid-cut, what do you want to do with this direction?"
Options presented: (a) capture as an epic + park; (b) keep designing now toward a spec;
(c) just resolve the registry-location call; (d) park entirely.

**→ NOT ANSWERED — the user interrupted to request this very capture document instead.**
The disposition of the concept (epic? spike? park?) remains **OPEN**.

---

## PART D — Open design tensions (unresolved; the real work)

1. **Where does the registry live? (the architecturally-loaded one.)** The actor-identity
   convention spans *all four* Weft tools, so a "registry of who-can-be-whom" may be a
   **federation-level** concern, not Filigree-only. Filigree owns work-state and now the
   verified-actor *field*; the *menu of seats* might sit higher — possibly inside the
   crypto identity-authority component (§6), possibly a thin Filigree surface, possibly
   the hub. **Hard to reverse; shapes everything.**
2. **Who curates the menu?** Human-defined seats up front, vs. capable agents
   *minting/proposing* new personalities as work demands. (User's word was "menu,"
   implying curation — but the "more capable agents" arc points toward emergence.)
3. **What is the unit of scope?** Loomweave **subsystems** (natural, already modelled —
   "you own the `mcp-agent-systems` subsystem") vs. labels/epics vs. file globs. Subsystems
   are the strongest candidate because they already exist and beat path-glob bookkeeping.
4. **What is the negotiation medium?** When lanes overlap, *how* do agents negotiate —
   Filigree comments on a shared "contested-scope" object? a new primitive? the
   advisory-announcement board from B5? This is the genuinely novel part with no existing
   analogue.
5. **Concurrency operating model (from C1, still open):** serial-mostly vs.
   parallel-shared-files vs. standing-fleet. Decides whether the announcement/lease layer
   is built at all.

---

## PART E — Full option menu surveyed (for the record)

Because the request was "all options and everything," the alternatives that were raised
or implied, each with its disposition:

**On identity granularity:**
- *Unique-id-per-startup only* → rejected as insufficient (traceability without continuity; every run a stranger).
- *Persistent-role only* → insufficient alone (no per-run envelope for audit/resume).
- *Two-layer: seat + session* → **adopted as the working model** (B3).

**On collision avoidance:**
- *Runtime file mutex (the literal opening idea)* → demoted; becomes an advisory announcement, not a lock (B4/B5).
- *Ticket-level claims (already shipped)* → retained; covers the dominant same-ticket case.
- *Scope partitioning via personalities* → **adopted as primary** (B4).
- *Hard-enforced scope boundaries* → **rejected** (C2) in favour of advisory.
- *Live negotiation between agents* → **adopted as the north-star resolution** (B5), to grow as agents get more capable.

**On where it lives:** Filigree-only / Weft-federation-level / inside the crypto
identity-authority component / hub — **OPEN** (D1).

**On curation:** human-curated menu / agent-minted personalities / hybrid — **OPEN** (D2).

**On scope unit:** Loomweave subsystems / labels / epics / file globs — **OPEN, subsystems favoured** (D3).

**On disposition:** epic+park / keep-designing / registry-call-only / park-entirely —
**OPEN** (C3, the interrupted question).

---

## PART F — Relationship to existing tracked work

- **`2026-06-06-agent-identity-component-plan.md` (the crypto identity authority).**
  THE LOWER LAYER. It mints a durable, opaque, *certified* agent principal
  (Ed25519, enroll/certify/attest, offline-verifiable, the actor-analogue of SEI). It
  answers *"is this actor who the credential says it is?"* and **owns nothing about what
  the agent does or which lane it's in** — that boundary is load-bearing for its go/no-go
  (the moment it stores a policy about what an actor *may do*, it becomes Legis and fails
  doctrine §7 #1). **The personality/scope system in THIS note is a CONSUMER of that
  principal**, exactly as the plan's §4 already imagines (`verified_actor` holds the
  resolved durable principal; `work_claim` binds to a verified principal). The personality
  layer must inherit that plan's **enrich-only / never-load-bearing** contract: scope and
  personality are *metadata that coordinates*, never a gate that blocks — which is already
  consistent with the C2 "advisory" decision.
- **`filigree-c2009921cf` (session/run checkpoints).** The personality system is this
  feature with identity + scope *promoted to a reusable registered seat*. Natural
  attachment point. Child `filigree-6549e739de` (session evidence bundle) is the
  continuity/export half.
- **`filigree-81d3971467` (transport-bound actor identity).** The v24 slice (schema +
  CLI/MCP-stdio verified-actor stamping) shipped in 3.0.0; the HTTP/cross-host half is
  deferred and **non-breaking** (additive nullable columns already in v24). The
  personality layer's cross-host trust depends on this half + the crypto identity authority.
- **Doctrine — deconfliction-first.** The whole B4/B5 philosophy is an application of the
  federation's existing "deconfliction-first, not access-control-first" stance. The
  enrich-only / never-block contract (identity plan §4) is the doctrinal guardrail that
  keeps the personality layer additive.

---

## PART G — Suggested next actions (NONE taken; awaiting the C3 decision)

If/when the user returns to this:

1. **Make the C3 disposition call** — epic+park / spike / keep-designing / park.
2. **If proceeding: resolve D1 (registry location) first** — it is the
   architecturally-loaded, hard-to-reverse decision, and it determines whether this is a
   Filigree feature, a consumer surface on the crypto identity-authority component, or a
   hub concern. Likely best run as a paired question with the identity-authority Phase-0
   spike, since the two layers share a principal.
3. **Pin C1 (concurrency operating model)** — decides whether the
   announcement/file-lease layer is built at all.
4. **If captured as tracked work:** hang a Filigree epic under `filigree-ed2ccaf10d`
   (agent-systems review), linked to `filigree-c2009921cf`, and/or promote a condensed
   version onto `../roadmap-ideas.md` via its go/no-go recipe **only if** it resolves to a
   *member*-shaped thing rather than a Filigree feature (most likely it is a feature on
   existing members + a consumer of the identity authority, NOT a new member).

---

*Captured by the Filigree working session, 2026-06-09, at the user's request to write the
thread out conceptually before proceeding. Not adjudicated; not a contract; not a decision
beyond Part A and the C1/C2 leanings. To advance, make the Part C3 call.*
