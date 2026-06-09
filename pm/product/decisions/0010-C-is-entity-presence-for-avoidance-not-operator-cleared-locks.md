# PDR-0010 — Mechanism C: loomweave-entity presence for avoidance, not operator-cleared exclusive locks

Date: 2026-06-10   Status: accepted (one point flagged for owner overrule — see Caveat)   Author: claude-filigree (PM)   Owner sign-off: partial — owner proposed the idea; PM reshaped the enforcement, flagged the contested point
Supersedes: refines mechanism C of PDR-0007 / PDR-0009. Related: PDR-0004 (value framing), PDR-0003/0006 (deference hazard), the weft enrich-only doctrine.

## Context
The owner proposed reshaping C from a "spammy log" into **task/intent-based area locks**: agents
**tag out areas for exclusive access**, keyed on **loomweave entities** (SEIs) when loomweave is
available and **files** otherwise; if a second agent tries to tag a held area it is told "in use,"
and **the operator is paged to clear the lock.** Three parts of this are improvements; one
(exclusive-lock + operator-clear-as-default) conflicts with evidence and a signed-off decision.

## What is adopted (owner's improvements — kept)
1. **Intent/material-events, not a keystroke log.** C surfaces only *keep* events (the PDR-0009
   classifier already filters noise) — addressing the "spammy log" critique.
2. **Loomweave-entity granularity** (file fallback). Semantic markers (e.g. "on `walk_calls`")
   beat file/worktree/hunk: stable across refactors, no file-level false-fire. This also informs
   B's granularity question.
3. **Enrich-only fallback** — loomweave *enriches* the marker's granularity; the file fallback keeps
   it solo-useful (doctrine-clean). It is **not** a worktree duplicate: worktrees isolate the
   filesystem; C marks *semantic intent* within and across trees.

## What is rejected, and why (the enforcement model)
**Exclusive locks whose collision path pages the operator to clear them.** Rejected because:
1. **It reinstalls the human as the live deconfliction backstop — directly contradicting PDR-0004,**
   which the owner signed off. The bet exists to *remove* that backstop; "page the operator to clear
   the lock" is fire-and-**babysit**, and drives the supervision-load metric the wrong way.
2. **Opt-in locks only catch *polite* agents and miss the motivating event.** A lock protects only
   against an agent that pauses to acquire it. Today's stomp ("fix all the bugs" → rolled into a
   worktree → started editing) never checked a lock. So a lock catches the careful collisions (least
   damaging) and misses the broad-directive stomp (the ESC-causing ones). It therefore **cannot be
   the safety layer** — B must exist regardless — so the lock is additive nicety, not core.
3. **Exclusive ownership reintroduces the cross-cutting-deference/deadlock hazard** (PDR-0003/0006):
   a fix spanning entities E and F, where a peer holds F, deadlocks or forces deference.

## The call
**C is a loomweave-entity (file-fallback) presence/intent marker for *avoidance*, hook-emitted and
classifier-filtered, advisory — not an exclusive lock with operator-clear as the default.**
- **Hook-emitted** from *keep* events (PDR-0009) → can't rot (no agent discipline), isn't spammy
  (filtered). Optionally an agent may *declare* intent ahead; presence is also inferred from the
  first keep-event on an entity.
- **Advisory-for-avoidance:** peers route around a marked entity, and the system avoids spinning two
  agents onto the same entity (saves 2× wasted work).
- **B (mechanical CAS hook) remains the hard backstop** for everything C didn't prevent — including
  violent, non-opt-in stomps. Avoidance (C) + catch (B) is the pair (PDR-0007).
- **Contention resolves automatically-first** (route around / B's CAS reconcile). **Operator paging
  is the rare genuine-deadlock exception, not the contention default.**
- **The owner's exclusive hard-lock survives as a deliberate, rare, opt-in tool** ("hands off
  `walk_calls` — surgery in progress"), set explicitly by an agent or the operator — *not* the
  automatic per-task default.

## Rationale
Keep every part of the proposal that improves coordination (entity granularity, intent-over-spam,
avoidance, enrich-only) and drop only the enforcement model that rebuilds the human backstop and
mis-targets the dangerous collisions. The result is strictly the avoidance layer the panel endorsed,
now with better (semantic) granularity, sitting on top of the mandatory mechanical guard.

## Caveat — flagged for owner overrule
The contested point is **operator-clear-as-default vs exception.** If the owner judges that genuine
contention is rare enough that paging on it is *cheap* and *wanted*, the exclusive-lock-with-clear can
be promoted from "rare opt-in tool" to default — but note it still misses non-opt-in stomps (so B
stays mandatory) and still tensions PDR-0004. Overrule in a word and this PDR flips that one choice.
