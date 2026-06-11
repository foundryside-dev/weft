# Filigree

## Work state for a workforce that forgets.

*Member · Python · authoritative for work state and workflow lifecycle*

An agent fleet without a tracker is a room full of brilliant contractors, no
foreman, and no whiteboard. Two agents grab the same task. A third closes
something half-done. A fourth spends an hour rediscovering a decision made
yesterday. Filigree is the whiteboard, the ledger, and the claim system —
an issue tracker designed from the first commit for agents as the primary
users, with humans as the inspectors.

## What it does

- **Issues with real lifecycles.** Typed work — tasks, bugs, features, epics —
  each with its own workflow state machine. A bug is *triaged, confirmed,
  fixed*; a feature is *built*. The tracker knows the difference, and refuses
  transitions that skip the truth.
- **Race-free claiming.** One atomic verb claims an issue *and* moves it into
  its working state. Two agents cannot start the same work, because "claim"
  and "begin" are not two steps that can interleave — they're one.
- **Dependencies and the critical path.** Not just "what's open" but *what
  unblocks the most downstream work* — the question a dispatcher actually asks.
- **Observations.** A fire-and-forget scratchpad for things noticed out of
  scope — the code smell next door, the stale TODO. Notes expire in 14 days
  unless promoted, so incidental noticing never silently becomes a graveyard
  backlog.
- **Findings intake.** Scanner output (Wardline's, or anyone's) lands as
  triageable findings with a real promotion path into work — analysis becomes
  action without a human copy-pasting between tools.
- **Attribution everywhere.** Every event carries an actor. When five agents
  share a tracker, "who did this, and when" is never archaeology.
- **A dashboard for the humans.** Agents write; you watch. The inspectable
  record is the product.

## Design decisions, and why

**Atomic verbs, because agents race.** Human trackers can afford "assign,
then update status" as two clicks. Agents fire both in the same millisecond
from different sessions. Filigree's claim-and-transition verbs exist because
the two-step version is a data race wearing a workflow costume.

**State machines over status fields.** A free-text status is a lie waiting to
happen. Typed workflows with enforced transitions mean an issue's state is a
fact you can build on — and when a transition is refused, the error tells the
agent what the workflow allows instead. Errors are structured and coded,
because agents switch on codes, not vibes.

**Expiring scratchpads.** Every tracker accumulates a sediment of "we should
probably…" notes that are stale within a month. Filigree makes the decay
explicit: observations expire unless someone decides they matter. Honesty by
default, even about your own clutter.

**Opaque identity, deliberate ignorance.** Filigree binds issues to code
entities via SEI — but it *never parses* the token. Identity is Loomweave's
authority; drift detection belongs to the consumer. Filigree stays expert in
work, and only work.

**Loose cooperation as policy.** Every federation endpoint functions with all
peers absent. You can file, work, and close issues with nothing else
installed; the suite makes tickets richer, never *meaningful*.

## Alone, and together

Solo, Filigree is a complete, local-first issue tracker with first-class
agent ergonomics — arguably the first tracker where the agent isn't an
afterthought bolted onto a human UI. Paired: Loomweave binds issues to durable
entities and flags drift; Wardline findings flow in as triageable work; Legis
binds sign-offs to governed changes; Charter links requirements to the work
that discharges them.

Fine threadwork, holding every loose end.
