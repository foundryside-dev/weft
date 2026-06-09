# PDR-0008 — Owner sign-off: agent continuity & write-safety is committed

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes ("that proposal is signed off from me")
Supersedes: —   Related: PDR-0001…0007, pm/2026-06-09-agent-continuity-write-safety-PROPOSAL.md (now adopted), pm/2026-06-09-agent-continuity-write-safety-ANNEX.md

## Context
The consolidated proposal (`…-PROPOSAL.md`) was put to the owner for sign-off with a checkbox
block whose one starred item was an outward-facing escalation. The owner gave **blanket sign-off**
("that proposal is signed off from me"), which approves every item in the block, including the ★.

## The call
**The *Next* bet — agent continuity & write-safety — is committed in the shape the proposal
defines.** Concretely, the owner's sign-off confirms:
- **Direction:** four identity-free, path/activity-keyed mechanisms — A (reconciled handover),
  A′ (minted actor-identifier, line-of-effort handle), B (pre-write CAS guard), C (pool activity
  register).
- **Value framing:** delegation leverage / supervision-load reduction, not catastrophe insurance.
- **Prioritisation:** A + A′ first *because nearly free*; **B spiked now** (design work, parallel
  to launch) and built after the spike clears; C when pools are real.
- **Scope boundaries:** no behavioural personas, no advisory lanes, no fine-grained per-area seats,
  no crypto-identity dependency.
- **Launch precedence:** the *Now* bet (dogfood / clean-break launch) keeps **build** capacity.
- **★ Escalation (the one owner action):** **approved — I may DRAFT the upstream Claude Code
  feature request for B. I do NOT file it; the owner decides whether to send.** The reserved gate
  (the *filing* of an outward-facing request) remains the owner's — sign-off authorised the draft,
  not the send.

The proposal and annex are promoted from DRAFT to **adopted** (STATUS banners flipped; filenames
de-`draft`ed).

## What this authorises next (no further sign-off needed)
1. **Draft the B / actor-identifier design-spike brief** — the hard parts: self-write suppression,
   hunk-vs-file granularity, multi-file transaction semantics, the non-Write-path tripwire,
   worktree-scope, and the actor-identifier handle/run-id binding.
2. **Draft the Claude Code feature request for B** (drafted for owner review; **not filed**).
3. Scope A + A′ as a filigree feature on `filigree-c2009921cf` + `get_session_changes` +
   `reconciliation_debt_list`.
All three run **in parallel with the launch as design work**; none pulls launch *build* capacity.

## Reversal trigger
The bet's own reversal triggers (PDR-0003/0004/0007 + metrics.md: supervision-load and
stomp-interventions → 0) remain in force. Sign-off commits the *shape and sequence*, not the
outcome; the metric gates still decide keep/kill after the spike and the first ships.
