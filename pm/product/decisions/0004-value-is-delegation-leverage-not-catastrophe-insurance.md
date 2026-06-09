# PDR-0004 — The bet's value is delegation leverage, not catastrophe insurance

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes (owner reframe, post-incident)
Supersedes: —   Related: PDR-0003, metrics.md, vision.md, pm/2026-06-09-agent-identity-discovery-interviews.md

## Context
Immediately after a live cross-worktree stomp (the third observed case, 2026-06-09), the
owner assessed and recovered it as **near-trivial** — "this would have been near-catastrophic
six months ago but is near-trivial now." That reframes *why* the Next bet (agent continuity &
write-safety, PDR-0003) matters, and PDR-0003 framed it wrong: as catastrophe-prevention.

## Options considered
1. **Keep PDR-0003's framing** (B = correctness fix preventing a costly stomp) — con: the stomp is
   *recoverable and getting cheaper to recover* as agents improve; "prevent disaster" overstates it
   and would mis-set urgency and the success metric.
2. **Reframe value as delegation leverage** (the guardrails remove the human-as-deconfliction-backstop,
   so a PM-role can fire-and-forget tickets and manage the *program* instead of supervising keystrokes)
   — matches the owner's lived experience and the suite vision ("turn a swarm into a coordinated
   workforce").
3. Drop the bet because recovery is cheap — rejected: cheap *recovery* still requires the human to be
   *watching* to trigger it; the cost is supervision load, which is exactly the scaling bottleneck.

## The call
**Option 2.** The value proposition of the continuity + write-safety bet is **delegation leverage /
supervision-load reduction**, not catastrophe insurance. The guardrails exist so the operator (or an
autonomous PM agent) can **dispatch work and trust it's getting fixed safely without babysitting** —
the force-multiplier for the orchestration role the whole suite is built to enable. Prevention (B) and
continuity (A) both serve *removing the human from the deconfliction loop*, not *avoiding a rare disaster*.

**What this changes (and doesn't):**
- **Feature set & A-first sequencing (PDR-0003): unchanged.**
- **Success metric reframed:** the outcome metric becomes **supervision load** — how much the operator
  must watch per dispatched ticket — with "stomp interventions → 0" demoted to a *proxy/input* for it.
  (metrics.md updated.)
- **B's urgency framing shifts** from "catastrophe-prevention (ship fast)" to "supervision-load reducer
  (enables scale)." This *supports* PDR-0003's "spike now, build after launch" pacing — recovery being
  cheap means a naive, false-firing B (which would *add* supervision load) is worse than waiting for a
  good one.

## Rationale
Two observed facts drive it: (a) recovery is now near-trivial and trending cheaper (agent capability is
rising), so the marginal value of *prevention* is not disaster-avoidance; (b) the human is still the
*detection/trigger* backstop, firing sub-weekly — and *that* is the scaling ceiling on delegation. Value
that scales with the suite's purpose is "the operator can stop watching," not "we avoided a rollback."

## Reversal trigger
- If a stomp ever causes **real unrecoverable loss** (history pollution, lost uncommitted work with no
  reflog/object recovery), B's framing snaps back to catastrophe-prevention and its build urgency jumps
  ahead of the supervision-load framing — reopen this PDR.
- If, after A/B ship, the operator's **supervision load per dispatched ticket does not fall**, the bet is
  not delivering its (reframed) value — revisit per PDR-0003's metric triggers.
