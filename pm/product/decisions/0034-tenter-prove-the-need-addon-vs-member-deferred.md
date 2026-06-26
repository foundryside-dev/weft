# PDR-0034 — Tenter prove-the-need: drift-check = Plainweave addon · full quad = standalone member · full-capability GO/NO-GO DEFERRED

**Date:** 2026-06-26 · **Status:** Findings **accepted**; the full-Tenter go/no-go + §7 admission **DEFERRED (owner-reserved)** · **Class:** member shaping / prove-the-need (PDR-0032) · **Tracking:** `~/tenter` (`spike/operating-picture`), `~/plainweave` (`spike/tenter-plan-check`).

## Context

PDR-0032 lined up Tenter as the next federation bid, gated on prove-the-need + §7 admission. This session the owner directed: "initiate tenter" (scaffold stood up at `~/tenter` — superseding PDR-0032's "no `~/tenter` repo until admitted" line), then "rapid prototype to see if the idea has legs, possibly just a Plainweave addon."

## Findings (this session — two spikes, opposite signals by scope)

1. **Drift-check slice → Plainweave addon.** A `plainweave plan-check` subcommand (~200 lines reusing Plainweave's `LoomweaveAdapter` + the ADR-029 `content_hash` drift contract) classifies plan steps CURRENT/DRIFTED/MISSING. Clean addon-fit; intent-adjacent. **This part is a Plainweave feature, not a member.**
2. **Full quad operating picture → standalone Tenter (member-shaped).** A read-only sink resolves each plan step across **Loomweave** (code+drift) + **Plainweave** (requirement/why) + **Filigree** (issue/status) and surfaces cross-coordinate gaps no single tool shows — **STALE-DONE** (closed issue + drifted code), **ORPHAN** (no requirement), **UNTRACKED** (no issue), **DANGLING-REQ** (req → gone code). Demonstrated **live across two repos** (code+intent in the member repo, work in the hub tracker). It is un-housable in any one member (Plainweave is intent-only and must not reach into Filigree work-state), and it honored the invariants — read-only, bound nothing back, advisory (exit 0), a *picture* not a gate. **The full capability is the member case.**
3. **Grep-test refinement (owner doctrine).** PDR-0013's "agents prefer it unprompted" bar is for *instinctive substrate*; a *skill-gated manual* tool (a planning aid invoked by a planning skill) is judged by **"valuable when invoked,"** carried by the skill — not organic pull. This refines the admission heuristic.

## Decision

- **Findings accepted.** Prove-the-need is **substantially cleared on the architecture axis**: the full capability is real, valuable, and genuinely member-shaped; `~/tenter` is the justified home (no longer vestigial).
- **The full-Tenter GO/NO-GO is DEFERRED — owner-reserved.** The owner leans toward the full capability but is reflecting, because the **federation fabric is currently volatile**: Plainweave is still maturing (1.0.0/1.1.0, adapters maturing, publish-gated) and "the pieces land in different peers at different times" (the cross-tracker/cross-repo reality the spike surfaced), making the fabric wobbly. Standing up a *four-member-spanning* sink now risks compounding that wobble.

## What this does NOT do

- It does **not** admit Tenter (§7, owner-reserved) or commit to the full build. It does not touch hub doctrine §2/§8 (admission-gated). `~/tenter` stays a pre-alpha scaffold + two spike branches; nothing pushed/deployed.

## Reversal / decision trigger

The deferred decision resolves when the owner weighs full-Tenter value against fabric stability. **PM action (next session): come back with the answer** — an analysis of *full-Tenter-now vs. stabilize-the-fabric-first*, with a concrete stability proxy (e.g. "Plainweave's cross-member seams stop moving for N days / its adapters reach shipped, not folding-in") as the gate to start the full build. If the owner instead accepts the wobble, proceed to harden the sink + the planning skill and bring the §7 admission.
**Fallback if it never pulls:** ship only the drift-check as a Plainweave addon (finding 1) + re-park the rest to the ~50-line Loomweave-CLI + writing-plans convention.

## Provenance

Owner-directed spikes, PM session 2026-06-26. `~/tenter` `spike/operating-picture` (7a711da); `~/plainweave` `spike/tenter-plan-check` (ae1a868). Builds on PDR-0032 (triad ruling), the shelf-life test, and the discordance design-sense.
