# PDR-0006 — Identity lives at the line-of-effort altitude (sharpens the persona anti-goal)

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes (owner clarification)
Supersedes: —   Related: PDR-0003 (deference hazard), PDR-0005 (A′ stable handle), vision.md anti-goals

## Context
The persona anti-goal recorded earlier today (commit `68cc876`) was **too broad** — as written it
would forbid the legitimate role identities the program actually runs on. The owner clarified:
persona ≈ **line of effort**. This repo hosts several in parallel — **product management** (this PM
agent-chain; "the whole project is that line's"), a sibling **project/program-management** line, and
**web dev** (the repo owns the website). Those are real, distinct identities.

## Options considered
1. **Keep the broad "no personas" anti-goal** — con: forbids the useful, real line-of-effort identities
   and contradicts how the program is actually organised.
2. **Reinstate per-area seats** — con: that's the fine-grained altitude the panel showed induces
   cross-cutting deference (a bug spanning areas forces the seat to defer or the partition is fiction).
3. **Split by altitude** — identity is legitimate at the *line-of-effort* altitude, an anti-goal at the
   *within-role* altitude.

## The call
**Option 3.** Identity is **legitimate and intended at the line-of-effort altitude** (coarse; partitioned
by domain/responsibility — PM vs program-mgmt vs web-dev) and an **anti-goal at the within-role altitude**
(manufactured character/reliability among functionally-identical agents doing the *same* work). Therefore:
- **A′'s stable handle = the line of effort**, not a fine-grained per-file-area seat. This is both the
  operator's real deconfliction mnemonic and the handover's (A) stable continuity key.
- It **dodges the PDR-0003 cross-cutting-deference hazard**: lines of effort are genuinely separable (a PM
  decision and a web-dev change rarely need the same agent crossing lanes), unlike per-area seats inside one
  codebase where real fixes span areas.
- The within-role anti-goal (commit `68cc876`) **stands, sharpened**: no per-agent reliability/character
  *within* a line; the line-of-effort handle carries scope/responsibility, never imagined quality.

## Rationale
The deference hazard and the "false-distinction" bias are both real but altitude-specific — they bite at
the fine grain (seats inside a codebase, identical agents in one role), not at the coarse grain (separable
lines of effort). Coarse line-of-effort identity is exactly the partition-not-lock philosophy applied at the
altitude where partitions actually hold and where the human needs to deconflict. This resolves PDR-0005's
open "what is the stable handle" question: it's the line of effort, supplied by spawn context.

## Reversal trigger
- If lines of effort start routinely needing the *same* agent to cross them (deference reappears at this
  altitude), the partition is wrong — revisit the altitude.
- If a line-of-effort handle starts accreting reliability/character/quality semantics (drifting toward the
  within-role anti-goal), strip it back to scope-only.
