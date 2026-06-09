# Agent Continuity & Write-Safety — Sign-off Proposal

**STATUS: DRAFT — for owner sign-off.** This consolidates the current, internally-consistent
state of the *Next* bet for a single approval decision. It is current-state only: the
decision trail, the dead-ends, and the reversals that produced this shape live in the
companion annex, `pm/2026-06-09-agent-continuity-write-safety-ANNEX-draft.md` ("How We Got
Here"). The seven decision records (PDR-0001…0007) and the discovery study are cross-referenced
there.

---

## TL;DR

Weft's *Next* bet is **agent continuity & write-safety**: four small, **identity-free,
path-keyed (or activity-keyed)** mechanisms that let a PM-role dispatch work to a swarm of
stateless agents and **trust it gets done safely without babysitting**. The payoff is
**delegation leverage** — removing the human as the live deconfliction backstop — not
catastrophe insurance (a stomp is recoverable now, and recovery is getting cheaper).

- **A — Reconciled handover** and **A′ — Actor-identifier**: a filigree feature. Cheap → **ship first, because they are nearly free** (no spike).
- **B — Pre-write compare-and-swap guard**: the mechanism that actually moves the metric. Lives at the Claude Code / harness layer, **likely outside weft**. → **design-spike now, build after.**
- **C — Pool activity register**: build when concurrent pools are real.

**This is a feature set, not a new product.** A/A′ modify filigree; B is a harness-layer
feature weft probably should not build itself. **One owner action is required to proceed:**
approving the outward-facing escalation to file B as an upstream Claude Code feature request.

---

## The problem

Three distinct problems sit under one bet. They are different in kind, and the design keeps
them separate on purpose.

**P1 — Cross-session staleness (a *cost*).** A stateless agent that resumes a line of work has
two truth-sources — spliced-in context and its own memory — and nothing reconciles them. When
they disagree, the agent must distrust a good memory or trust a stale one, with no signal
which. Today it pays the cost of brute-force re-deriving against `git` every time. This is a
recurring, universal *orientation cost*, not a failure.

**P2 — Live stomp (a correctness *bug*, and the operator's real pain).** One agent writes over
another agent's in-progress, uncommitted work. The stomping agent does not perceive that it is
stomping. Today the only thing standing between this and a mandatory rollback is the human
operator's reflex — the "oh-shit-ESC" event. That reflex fires **roughly weekly when the
operator is sober and diligent, every two-to-three days when impaired, and never zero.** The
residual is *structural* (it survives diligence), not mere sloppiness. Recovery is near-trivial
today, so the cost this imposes is **supervision load**, not lost work.

**P3 — Actor-identifier collision (an attribution *gap*).** filigree's coordination model rests
on attribution: every claim, comment, and close records an actor. Today that actor is a
free-text string, so concurrent agents collide — "everyone is `claude`." That collision
produced the `ACTOR_MISMATCH` confusion on the loomweave issues and made a real stomp hard to
attribute (the rogue agent and the worktree agent shared a name). filigree needs a
non-colliding identifier per booting agent.

### Why the bet matters: delegation leverage, not catastrophe insurance

The payoff is **delegation leverage**. The guardrails exist so the operator — or an autonomous
PM agent — can **dispatch work and trust it is being done safely without watching keystrokes**.
That is the force-multiplier for the orchestration role the whole suite is built to enable
("turn a swarm into a coordinated workforce").

This framing is deliberate and load-bearing. A stomp is *recoverable*, and agent capability is
rising, so cheap recovery is getting cheaper — the marginal value of *prevention* is not
disaster-avoidance. But cheap recovery still requires a human to be *watching* to trigger it,
and that watching is the scaling ceiling on delegation. The value that scales with the suite's
purpose is "the operator can stop watching," not "we avoided a rollback." Everything below
serves *removing the human from the deconfliction loop.*

---

## The design

### The mental model: two axes

The design rests on a two-axis picture — **continuity** and **concurrency** — that explains why
every mechanism is keyed on a path or an activity, never on a persona.

**Continuity axis — the desk and the daily hire.** A **desk** is a *line of effort* (Product
Management / program-management / web-dev) — stable, with a nameplate and a drawer of handover
notes. An **employee** is one agent session: hired for a day, never rehired. It boots fresh,
works the desk, and leaves. Each morning the new hire **reads the desk's handover folder**
instead of reconstructing everything — and because the folder is *dated* ("as of close of
business yesterday, against the office as it stood then"), the hire checks what moved overnight
rather than trusting a stale note. You never ask whether today's hire is *better* than
yesterday's; for one desk they are interchangeable. Different **desks** are the deconfliction
lanes. The failure mode the metaphor exposes is not the turnover — it is a **stale or empty
handover folder**, which is why the handover (A) must be reconciled against reality, not just
"yesterday's notes."

**Concurrency axis — the whiteboard and the pool.** A line of effort can be staffed by a *pool*
of interchangeable hires working at once. A pool has no personal desk; it shares a
**whiteboard** — which is just the path-keyed handover generalised, because a desk is a pool of
one. Among fungible concurrent peers, *who* you are carries no signal — only **what you just did
and what you are about to do**. So pool coordination is an **activity register** ("pool P · ran
X · about to touch Y"), keyed on activity, not identity.

**Identity altitudes.** Identity is legitimate at exactly one altitude and a non-signal at the
others:

| Altitude | What it is | Role |
|---|---|---|
| **Line of effort** | PM / program-mgmt / web-dev — coarse, partitioned by responsibility | **Real.** The stable handle A′ binds to; the operator's deconfliction mnemonic. |
| **Per-session run id** | One boot of one agent | The unit of event *attribution*; minted, unique, disposable. |
| **Within-role / within-pool** | One fungible agent among identical peers | Identity is a **non-signal.** Coordinate on *activity* ("what I did / am about to do"), never on character. |

This is the resolution of a recurring temptation: the urge to give agents personas or subroles
was reaching for *identity* to solve a *coordination* problem that is really about *activity*.
That is why it is the wrong tool everywhere except the coarse line-of-effort altitude.

### Four mechanisms

All four are identity-free and keyed on a path/area or on an activity stream.

**A — Reconciled handover (the cheap half).** A `git`-sha-stamped, **path/area-keyed** session
delta that carries **intent + verification-status** (the part `git` cannot show) plus a raw
`git diff <sha>..HEAD`, with a TTL and garbage-collection. It performs **no semantic-staleness
inference** — it is dumb-and-verifiable by design: an unfalsifiable "your note may be stale"
inference gets distrusted, re-derived, and wasted, and one wrong-but-confident call poisons
trust in the whole layer permanently. The anchor ("written against HEAD `abc123`") is the
product, not the assertion — it turns "is this stale?" from a judgment call into a one-command
diff. **Built as a filigree feature** on the existing session/run object (`filigree-c2009921cf`)
plus `get_session_changes` and `reconciliation_debt_list`.

**A′ — Actor-identifier (the attribution half of the same object).** filigree **mints a
per-session run id** on boot, which **replaces the free-text `--actor`** and guarantees a
non-colliding attribution unit. Claims and continuity bind to a **stable handle** — the *line of
effort* — supplied by spawn context (an operator-given label, the worktree, or a harness-passed
value), falling back to the bare run id for one-shot agents. Two layers are kept strictly
separate: **(1) *have* a non-colliding id** — this, cheap, part of A's substrate; and **(2)
*trust* the id is unforgeable** — a separable crypto layer (see "Later," below), explicitly out
of scope here. The handle names *who / which run*; it never carries area-ownership or imagined
quality.

**B — Pre-write compare-and-swap guard (the half that matters).** Hard-abort a write if the
target file moved (another actor wrote it) since the agent read it. This is **identity-free
optimistic concurrency** — a compare-and-swap on a sha, with no principals, permissions, or
lanes. It is deconfliction done *mechanically*, which is why it stays squarely inside
deconfliction-first doctrine and is **not** an access-control move. Requirements the design
already fixes:

- **Hunk-level**, not file-level (a file-level guard cries wolf and gets disabled).
- **Self-write-suppressed** — it must fire on *another* actor's write, not on the agent's own writes, formatters, or linters. (This is the genuinely hard, underspecified part — it cannot be purely sha-based.)
- On abort, deliver the delta and drop into an **assisted 3-way reconcile**, never just fail.
- **Transaction-aware** for multi-file operations — a 15-file refactor that aborts on file 14 must not leave a half-refactored repo (worse than the stomp).
- A **working-tree tripwire** for stomps that bypass the Write path entirely (`git reset --hard`, an install rewriting a lockfile, codegen, migrations) — a guard on unexpected working-tree/HEAD movement, not only on own-writes.

**B lives at the Edit/Write tool layer → likely a Claude Code / harness / git-hook feature,
outside the weft suite.** A naive B that false-fires would *add* supervision load and is worse
than nothing, which is exactly why it is spiked first and built after.

**C — Pool activity register / IPC (build when pools are real).** A shared, pool-scoped,
**activity-keyed** register — the "whiteboard." Peers post "pool P · ran X · about to touch path
Y"; any peer reads it and routes around, or flags a likely collision. It must be **hook-fed** —
auto-populated from real commands and edits, *not* voluntary announcements — because a register
that depends on agent discipline rots ("agents won't write or clear it"), and a stale register
is worse than none. C gives *predictive avoidance* (cheap); **B is the hard mechanical catch
when a peer overrides the advisory.** Register (anticipate) + guard (catch) is the pair.

### How B and C divide the motivating incident

An honest note on coverage: the live 2026-06-09 stomp — an agent rolling into a worktree where
another was mid-implementation and "fixing" its uncommitted work — was a **territory violation
across a worktree boundary, not a file-level race.** A per-file CAS (B) catches it *only if* the
other agent happens to write in the read→write window. The cleaner guard for *that* flavour is
**presence/avoidance (C)** plus scope discipline on the directive. **B catches mechanically; C
anticipates; the two compose.** B alone does not cleanly solve the motivating event — which is
why C is no longer pure-future and why **worktree-scope is an explicit open input to the B
spike** (see open questions).

### What this is not (current design boundaries)

- **Not behavioural personas / "character" within a role.** Manufacturing distinctions between functionally-identical agents doing the same work would invite dispatching on a fiction (vision anti-goal). Coordination keys on activity, never on imagined quality.
- **Not advisory ownership or declared lanes.** A stomping agent does not perceive it is stomping, and agents override advisories — so an advisory lane cannot catch the event that matters. The guard (B) is *hard and mechanical* precisely because advice is the wrong instrument here.
- **Not fine-grained per-area seats.** Per-file-area identities induce cross-cutting deference: a bug spanning two areas forces a seat to defer, or the partition is a fiction. The stable handle sits at the coarse *line-of-effort* altitude, where partitions actually hold.
- **Not dependent on a crypto identity authority.** The whole layer is identity-free; trust ("the id is unforgeable") is a separable, *Later* concern, not a dependency of this bet.

---

## Prioritisation (decided on purpose — cost ≠ importance)

| Mechanism | When | Why |
|---|---|---|
| **A + A′** | **First** | **Nearly free** — a thin filigree feature on an object already planned, no spike. Attacks P1 (universal daily cost) and P3 (attribution gap) additively, at low risk. First *because cheap*, not because it is the keystone. |
| **B** | **Spike now, build after** | The bet that matters (supervision-load reducer). Higher severity and higher risk: a false-firing B is worse than nothing. The spike resolves the hard parts; the build follows once the spike clears. |
| **C** | **When pools are real** | Composes with B for the concurrent-pool case. Moot if work stays single-occupant-per-desk in practice. |

**Sequencing against the launch.** The *Now* bet — dogfood readiness + the coordinated
clean-break launch — keeps priority for **build** capacity. B's spike is **design and
instrumentation work**, not build, so it runs in parallel without pulling launch engineering; if
it ever does, it yields. A/A′ slot in opportunistically. The A-vs-B *build* order is left soft;
the spike confirms it.

---

## Product-vs-feature

This is a **feature set on existing surfaces**, not a new product or federation member.

| Mechanism | Home | Build owner |
|---|---|---|
| **A + A′** | A modification of **filigree** (a feature on the existing session/run object) | weft |
| **B** | The **Edit/Write tool layer** → a **Claude Code / harness** feature | likely *not* weft — see escalation |
| **C** | filigree-hosted, a harness hook surface, or a thin shared file (spike decides) | weft or harness |

It is explicitly **not** the personality registry and **not** dependent on the crypto identity
authority.

---

## Success metrics

These are falsifiable-by-shape **placeholders** (number + date) pending instrumentation. A
directional word is not a metric. Full readings live in `pm/product/metrics.md`.

| Metric | Target | Note |
|---|---|---|
| **Supervision load** — how much the operator must *watch* per dispatched ticket | can dispatch in parallel **without babysitting** *(set a concrete proxy after baselining)* | **The outcome metric.** This is the value the bet buys. |
| **Stomp interventions** — the "oh-shit-ESC" event | **→ 0** (after B) | A **proxy/input** for supervision load. Baseline ~1/wk diligent, ~every 2–3 days impaired, never zero. |
| **Time-to-orient** — boot → actionable "what's next" | ≤ TARGET *(set after baselining)* | What A builds; not yet instrumented. |

**Kill/keep triggers (current):**
- If, after B ships, stomp interventions do **not** fall toward 0, B is mis-designed — reopen the spike.
- If A ships and agents still re-derive from `git` instead of reading it, A's payload is wrong — strip it further or kill A (it was only ever justified by being nearly free).
- If the B spike finds the self-write-suppression / transaction problem has no tractable identity-free solution, **do not ship B**; fall back to C and escalate the harness question.

---

## Owner escalation (B's home)

**B likely lives at the Claude Code / harness layer, outside weft.** Filing it as an upstream
feature request is **outward-facing — it touches an external party — so per the vision grant it
needs the owner's call.** I will **draft** the feature request; I will **not file** it. If the
owner declines, B has no home in weft, and the bet shrinks to A + A′ only, with B documented as
an upstream ask.

This is the single approval item in this proposal that requires owner action to *proceed*; the
rest are confirmations of direction.

---

## Open spike questions

For the B / actor-identifier design spike (design work, runs in parallel with the launch):

1. **Self-write suppression** — how to fire on another actor's write but not on own-writes, formatters, or linters (cannot be purely sha-based).
2. **Granularity** — hunk-level vs file-level confirmation behaviour.
3. **Multi-file transaction semantics** — abort/rollback for a partially-applied multi-file operation.
4. **Non-Write-path tripwire** — detecting `git reset` / install / codegen working-tree movement.
5. **Worktree scope** — the live 2026-06-09 stomp crossed a worktree boundary; what scope does the guard (and C's register) operate at — per worktree, per repo, per worktree-set?
6. **Actor-identifier binding** — does `work_claim` / `--assignee` bind to the *handle* (continuity) while events bind to the *run id* (attribution)? What is the exact spawn-context source for the handle (operator label vs worktree vs harness)?
7. **C's host** — filigree-hosted, a harness hook surface, or a thin shared file; the hook points that auto-feed it; the pool-scope boundary.

The single most important *non*-spike input is **C1, the real concurrency shape**, which **must
be answered by instrumentation** (mining filigree event logs / `git` for actual overlapping-write
and redundant-work signatures), not by asking agents — agents are blind to concurrent peers by
construction.

---

## Sign-off block

The owner is asked to approve the following. Check to confirm; annotate any you wish to change.

- [ ] **Direction.** The *Next* bet is **agent continuity & write-safety** — four identity-free, path/activity-keyed mechanisms (A / A′ / B / C), as scoped above.
- [ ] **Value framing.** The payoff is **delegation leverage / supervision-load reduction**, not catastrophe insurance.
- [ ] **A + A′ first.** Ship the filigree handover + minted actor-identifier first, **because they are nearly free** — not as the keystone.
- [ ] **B: spike now, build after.** Design-spike B in parallel with the launch (design work, not build); build only after the spike clears. Do not ship a naive, false-firing B.
- [ ] **C when pools are real.** Defer the activity register until instrumented concurrency shows real pool pain; build it hook-fed, never voluntary.
- [ ] **Scope boundaries.** No behavioural personas, no advisory lanes, no fine-grained per-area seats, no crypto-identity dependency.
- [ ] **Launch precedence.** The *Now* bet (dogfood/clean-break launch) keeps build priority; this bet does not pull launch engineering.
- [ ] **★ OWNER ACTION — escalation.** Approve drafting an upstream **Claude Code feature request** for B (outward-facing). *I draft; I do not file.* Owner decides whether to send. If declined, the bet shrinks to A + A′.

---

*Draft prepared 2026-06-09 by the Weft product-management line for owner sign-off. Decision trail
and rejected alternatives: `pm/2026-06-09-agent-continuity-write-safety-ANNEX-draft.md`. Source
decision records: `pm/product/decisions/0001…0007`.*
