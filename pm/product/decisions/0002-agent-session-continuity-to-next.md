# PDR-0002 — Agent session continuity / personality layer → top of Next

Date: 2026-06-09   Status: superseded by PDR-0003 (the disposition holds — this IS the Next bet; the *form* was reshaped by agent user-research)   Author: claude-filigree (PM)   Owner sign-off: yes ("it's a lock for what's next"; owner handed custody to PM)
Supersedes: —   Related: roadmap.md (Next), pm/2026-06-09-agent-personality-identity-management-concept.md, pm/2026-06-06-agent-identity-component-plan.md, filigree-c2009921cf, filigree-6549e739de

## Context
A Filigree brainstorm (captured in the concept doc) walked file-locks → unique-id →
roles → a **personality/identity-management layer**: a registry of advisory "seats"
(identifier + scope + focus + continuity) an agent adopts on startup. It was
interrupted at the C3 "what do you want to do with this" gate. The owner has no strong
preference but judges it "a lock for what's next," and handed PM custody over. A
disposition call is needed so the concept neither calcifies undecided nor gets built
prematurely mid-3.0.0-cut.

## Options considered
1. **Promote to top of Next, gated, not built yet** — pro: honors the owner's signal, keeps it post-launch, leaves the two hard questions open to a spike; con: a Next item with unresolved gating questions.
2. Capture as a parked epic only — pro: zero roadmap commitment; con: under-reads the owner's "lock" signal; lets a coherent direction drift.
3. Keep designing now toward a spec — pro: momentum; con: violates "don't build mid-cut"; the riskiest assumption (concurrency shape) is unmeasured, so a spec now is speculation.
4. Park entirely — rejected; contradicts the owner's signal.

## The call
**Option 1.** Promote "Agent session continuity & the personality/identity layer" to
the **top of Next** as one themed bet. Firmly scoped: it is **NOT a new federation
member** — it is features on existing members (Filigree session/run object + evidence
bundle) plus a **consumer** of the future crypto identity-authority ("Tabard"), per
the concept doc §6. Internal sequence when it promotes toward Now: **(2) session/run
object is the keystone → (3) resume envelope/evidence bundle builds on it → (1)
file-lease, reborn as an *advisory announcement*, only if the concurrency shape proves
it's needed.** Scope is **advisory, never enforced** (C2 — a load-bearing
deconfliction-first commitment). Two gates must clear *before* any build, run as a
spike: **C1** — the real concurrency shape (serial-mostly vs parallel-shared-files vs
standing-fleet); and **D1** — where the seat registry lives (Filigree surface vs a
consumer of the identity authority vs hub), the architecturally hard-to-reverse one,
best run paired with the Tabard Phase-0 spike since they share a principal.

## Rationale
The owner's signal + the strong existing substrate (most of it already tracked) make
"park" wrong, but C1 is genuinely unmeasured and it's mid-cut, so "build/spec now" is
premature. Top-of-Next-but-gated captures the intent while making the riskiest
assumption (C1) the thing the next investment buys down — the smallest real bet is the
spike, not the feature. Keeping it advisory and a *consumer* of identity keeps it
enrich-only and off the doctrine §6 shared-infra / §7 new-member paths.

## Reversal trigger
- If the **C1 spike** finds collisions are rare/serial (concurrency option a), **drop
  the file-lease/announcement layer entirely** and shrink the bet to the session
  envelope (ideas 2+3) only.
- If **dogfood/launch (the Now bet) slips past 2026-08-31**, this bet does **not**
  promote Next→Now — the launch takes precedence.
- If it starts to acquire authorization/policy-over-actors scope, STOP: that is Legis
  / the forbidden orchestrator, not this layer.
