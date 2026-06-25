# PDR-0032 — Tenter (renamed Shuttle): the change-operating-picture triad; advisory composition, lined up as the next federation bid

**Date:** 2026-06-26 · **Status:** Accepted (owner-directed, in-session) for the rename + scope ruling + bid lineup. **§7 admission and any build remain owner-reserved / prove-the-need.** · **Class:** member shaping + roster-bid intent (doctrine §2/§6/§7/§8); partially reverses the 2026-06-25 parking · **Tracking:** roadmap *Next* (federation-bid track); no `~/tenter` repo until admitted.

## Context

Shuttle was **parked 2026-06-25** (`pm/2026-06-25-shuttle-realization-sei-bound-change-execution.md`): concluded a low-durability *feature*, not a member — orchestration-scaffolding that the shelf-life test fails (improving subagent dispatch erodes a "plan-stager"). Same day it had already been reframed from a transactional **code-executor** to a **read-only plan-staging/binding** surface (the suite does not own a code-writer).

The owner revisited it under (1) a **rename** — "Shuttle" is taken, so the concept becomes **Tenter** — and (2) a **triad framing**: ideally Filigree + Plainweave + Tenter form a "light change management system," with plans linking to Plainweave. The shaping question put to PM: *how much of Tenter belongs in Plainweave (the requirements hub) instead of a distinct member?*

## Decision

1. **Rename Shuttle → Tenter.** Name collision retires "Shuttle." The *tenter* (a frame whose hooks hold woven cloth **taut, to-true, so it does not distort**) fits the read-only, **drift-checked** reframe far better than "change execution" — the rename and the reframe are coherent.
2. **Tenter stays a DISTINCT member candidate — it does not fold into Plainweave.** It owns one artifact: **the implementation/change plan as a first-class, rendered, spine-bound, drift-checked object** (the *HOW*). Plainweave owns *intent* (the *WHY*); hosting the plan artifact in Plainweave would breach its one-domain rule and is rejected.
3. **The triad is an advisory *operating picture of a change*, NOT an orchestrator.** Filigree (*WHAT* / work + commit-anchor) + Plainweave (*WHY* / requirement) + Tenter (*HOW* / plan) compose, read-time, into one legible picture of a change — a concrete instance of "the weave is the product." **"Light change management" means advisory composition: no approval gate, no "can't-merge-without-a-plan," no workflow engine, no execution.** This is the load-bearing line that keeps the triad on the safe side of the §6 central-orchestrator anti-goal — the very anti-goal Shuttle sat closest to. If teeth are ever wanted they are **Legis's**, a separate deliberate decision, never Tenter's.
4. **Plan → Plainweave link rule: Tenter *references* or *proposes* requirements; it never *mints* them.** A plan-step binds to an existing Plainweave requirement (ADR-029 entity-association), or surfaces "this change has no requirement — propose one," which **Plainweave records**. The durable Plainweave-shaped slice is **prospective intent-coverage** ("what requirements does this *planned* change serve / disturb") — a Plainweave *read*, not a reason to host the plan.
5. **Invariants carried forward (from the 06-25 realization doc):** Tenter is a **pure dependency sink** (edges point only *into* it; no sibling may make itself load-bearing on Tenter) and **enrich-only** (absence degrades to plan-as-markdown + issues; no peer's core flow breaks).
6. **Tenter is lined up as the next *federation bid*** (roadmap *Next*, federation/roster track — distinct from each member's own product bids). The triad framing **revives the member case** the 06-25 parking set aside: a plan-as-join-object ages better against the shelf-life test than a "plan-stager," because making a change legible across intent+work+structure is substrate (a common operating picture), not scaffolding.

## What this does NOT change / do

- **It does NOT admit Tenter.** §7 admission stays owner-reserved and **gated on prove-the-need** — point a read-only staging surface at one real change (baseline: the elspeth 2,800-line plan + its manual symbol-existence checks) and confirm the workflow *prefers* a distinct plan object over a Filigree view + Plainweave bindings (the grep test). No `~/tenter` repo, no build, until that clears.
- **It does NOT make Tenter a code-writer / executor** (reaffirmed read-only; agents still edit with their own tools).
- **It does NOT rewrite doctrine §2/§8** (the Shuttle definition + recording change-execution as deliberately-unowned) — that propagation is gated on admission, not on this lineup.
- **Plainweave's domain is unchanged** — it owns intent and gains, at most, a prospective intent-coverage read; it does not host the plan artifact.

## Reversal trigger

Re-park Tenter (back to a Loomweave batch-resolve CLI + a writing-plans convention, ~50 lines) if the prove-the-need dogfood shows the workflow is satisfied by a Filigree view + Plainweave bindings (no distinct plan object preferred), **or** if improving subagent dispatch visibly erodes the staging value (the original 06-25 shelf-life failure) — measured by the grep test: agents must *prefer* the staged plan over markdown-plan-in-repo + issue, unprompted.

## Precedent (reusable)

**A "system" framed as an *advisory operating picture* — a composed view assembled at a dependency-sink, read-only and enrich-only — is on-spine; the same capability framed as a workflow/approval/execution engine trips the §6 central-orchestrator anti-goal.** The owner's design-sense test for which one you have: a wrong shape keeps producing *discord* — the recurring "hang on, that's not what we do" (here: "it writes code / it gates merges"). The right shape is *concordant* — the friction stops. Discord is the falsifier; concordance is the signal to lock in.

## Propagation

`roadmap.md` (Shuttle *Later* → Tenter *Next*, as the next federation bid; renamed); `current-state.md` (active-Now vs federation-bid tracks; escalations); `pm/2026-06-25-shuttle-realization-sei-bound-change-execution.md` (status pointer → revived under this PDR). **Flagged follow-up, gated on §7 admission:** doctrine §2/§8 Shuttle→Tenter rewrite + record change-execution as deliberately-unowned; stand up a tracker epic for the Tenter bid when prove-the-need is scheduled.

## Provenance

PM session 2026-06-25/26; owner directed the rename, the triad framing, and the bid lineup. The "discordance test" heuristic is the owner's, articulated this session ("you can tell when it's right because it's not as discordant"). Related: 06-25 realization/parking doc; doctrine §2 (Shuttle distinct from Charter/Plainweave), §6 (no central orchestrator), §7 (admission owner-reserved), §8 (thought-bubbles); the admission bar (PDR-0013); "the weave is the product" positioning.
