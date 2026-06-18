# PDR-0029 — Checkpoint-on-ship, commit-the-checkpoint, and resume reconciles against tracker/git

**Date:** 2026-06-18 · **Status:** accepted (process/continuity discipline — within grant) ·
**Class:** continuity discipline · **Driver:** the cutover-ship resume failure (below).

## Context

The single biggest event in the program — the five-member clean-break cutover — **shipped
2026-06-17** (epic `weft-4b2f948f70` closed 06-17 01:24Z; all members merged to `main`,
published to PyPI). On the next `/own-product` resume (2026-06-18) the workspace produced a
**stale picture**: the bet still read "merge has NOT happened." Forensics on `git status`:

1. The 06-17 ship session **never checkpointed** — it updated the tracker and let the fact land
   in auto-memory (`MEMORY.md`), but wrote nothing to `current-state.md` and committed no PDR.
2. The *prior* 06-16 reconcile of `current-state.md` **and** PDR-0024 Amendment 1 were written
   to the working tree but **never committed** (anti-pattern: checkpoint-without-commit).
3. On resume the brief was trusted as source-of-truth; the ship was only caught incidentally
   (installed-version drift), not systematically — even though auto-memory already held it.

This is the *second consecutive* recurrence: `current-state.md`'s own header carries a
hand-written "resume-hygiene note" warning that the 06-16 rewrite existed to fix the *same*
stale-resume one event earlier. A lesson learned by hand and not institutionalized re-breaks.

Root cause is **not** the checkpoint skill's internal logic — it is that (a) nothing forces a
shipping session to checkpoint, (b) checkpoints get written but not committed, and (c) resume
has no machine-checkable staleness backstop, so a skipped/uncommitted checkpoint fails *silently*
instead of loudly.

## Options

1. **Discipline-only** — "remember to checkpoint." Rejected: this is exactly what failed twice.
2. **Staleness tripwire in the brief + checkpoint-on-ship rule + commit-is-mandatory** (chosen).
3. **Hook enforcement** (SessionStart/Stop hook that blocks on an un-checkpointed shipped epic).
   Deferred: heavier; revisit if (2) still leaks.

## Call

Three standing rules, effective now:

- **Checkpoint-on-ship.** Any session that closes a launch/epic-level tracker item, merges a
  member to `main`, or otherwise changes shipped reality **must** run `/product-checkpoint`
  before it ends — the checkpoint is part of shipping, not optional cleanup.
- **The checkpoint is not done until it is committed.** Writing `current-state.md`/PDRs to the
  working tree without committing them does not count (it is invisible to the next resume).
- **Resume reconciles against the tracker + git as authoritative, and the brief carries a
  machine-checkable stamp.** `current-state.md` now carries a `Reconciled against:` line
  recording the live anchors it was last synced to (key epic states + member `main` HEADs +
  installed versions). RESUME (`/own-product`) re-checks those anchors; **if they have moved,
  the brief is stale — reconcile loudly, do not load it as gospel.** The brief is a hint; the
  tracker owns status and git owns shipped reality.

## Rationale

The continuity guarantee cannot depend on a human/agent never skipping a step with no backstop.
The stamp converts a *silent* stale-resume into a *loud, mechanical* one: the next resume diffs
the stamp against reality and self-corrects. Auto-memory and the tracker already held the truth;
the gap was that the workspace's own source-of-truth file disagreed and nothing flagged it.

## Reversal trigger

If a future resume still loads a stale picture *despite* the stamp (the brief's anchors matched
reality but the picture was wrong), the stamp is insufficient — escalate to hook enforcement
(option 3). If checkpoint-on-ship proves too noisy (checkpointing trivial non-shipping sessions),
narrow the trigger to epic-close / merge-to-main only.
