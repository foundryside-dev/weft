# PDR-0007 — The pool axis: concurrent coordination is an activity register (IPC), not identity

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes (owner extension of the model)
Supersedes: —   Related: PDR-0003 (mechanism C), PDR-0005/0006 (identity altitude), the "desk & daily hire" mental model (current-state.md)

## Context
The desk/daily-hire model (PDR-0006) covers the *single-occupant, per-line-of-effort continuity* case.
The owner extended it along a **second, orthogonal axis — concurrency**: a **pool** of interchangeable
daily hires in one line of effort working at once (a pool of coders/typists/etc.). A pool has no personal
desk; it shares a **whiteboard**. This resolves where the recurring "subrole" intuition actually belongs.

## The call
**At the pool / concurrent altitude, coordination is keyed on ACTIVITY, not identity.** Among
interchangeable concurrent peers, *who* you are carries no coordination signal; *what you just did* and
*what you're about to do* is the entire signal. Concretely:
- **Kill the subrole idea here.** Distinguishing `pool-member-1` from `pool-member-2` is pointless — they
  are fungible. (This is *stronger* than the PDR-0006 within-role anti-goal: at the pool altitude, per-agent
  **identity itself** is a non-signal, not merely per-agent *character*.)
- **Mechanism C is promoted from vague-v2 to a specified IPC layer: a shared, pool-scoped, ACTIVITY-keyed
  register (the "whiteboard").** Peers post — ideally **hook-fed** (auto-populated from real commands/edits,
  *not* voluntary announcements) — "pool P · ran X · about to touch path Y"; any peer reads it and routes
  around, or flags "that'll cause problems." Identity-free; advisory-for-avoidance.
- **C composes with B, does not replace it.** The register gives *predictive avoidance* (cheap), but peers
  can override an advisory (panel finding); the **hard catch when avoidance fails is the CAS guard (B)**.
  Register (anticipate) + guard (catch mechanically) is the pair.
- **Coherence with A:** the *path/area-keyed* handover (A) **is** the whiteboard for continuity — a single
  desk is a pool of one, and **path-keying (not persona-keying) is exactly what generalizes A to a
  concurrent pool.** Retro-validates the panel's insistence on path keys.

## Rationale
The subrole urge recurred all session because the owner was reaching for *identity* to solve a
*coordination* problem that is actually about *activity*. Identity is the right tool at the line-of-effort
altitude (distinct lanes, continuity) and the wrong tool at the pool altitude (fungible peers, where the
action stream is the signal). **Hook-feeding** the register removes the voluntary-write dependency that was
the panel's fatal objection to advisory boards ("agents won't write or clear them") — instrumentation
posts the activity, not agent discipline.

## Reversal trigger
- If the register (C), once built, is read/heeded so rarely that it doesn't reduce stomps beyond what B
  alone catches, it isn't earning its build — fall back to B-only.
- If hook-feeding proves infeasible and the register reverts to **voluntary** writes, expect it to rot
  (panel finding) — do **not** ship a voluntary version; a stale register is worse than none.
- If pools turn out not to exist in practice (work is single-occupant-per-desk almost always), C is moot
  and the bet stays A + A′ + B.

## What this leaves for the spike
Whether the activity register is filigree-hosted, a harness hook surface, or a thin shared file; the
hook points (command exec, Edit/Write) that auto-feed it; and the pool-scope boundary (per line-of-effort?
per repo? per worktree-set?).
