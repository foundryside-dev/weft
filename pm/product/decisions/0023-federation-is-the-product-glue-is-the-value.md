# PDR-0023 — The federation is the product; the glue is the value

**Date:** 2026-06-15 · **Status:** Adopted (owner) · **Class:** vision / strategy
reframe · **Driver:** convergent agent (user) feedback

## Context

Weft was scoped as a **loose wave of products** — five independent instruments
(Loomweave, Wardline, Filigree, Legis, Warpline) that could each stand alone and
optionally interoperate. The dogfood and the 2026-06-15 external cold-eval put
that framing under real use by the actual user (an agent), and the signal came
back unambiguous and convergent:

- The cold-eval reviewer, unprompted: *"the SEI shared-identity federation … is
  the actual moat,"* and ranked the suite "one excellent tool, one strong one, two
  supporting, one no-show" — i.e. **not five equal products.**
- The day's deepest defect was a **dead seam** (loomweave→Filigree emit), not a
  broken tool — the *integration* was where value silently failed.
- The single most-valued property was **provenance-honesty**, a *cross-cutting*
  discipline, not any one analyzer.

When every agent that uses the thing reports that the value is the glue, the
product has revealed its own center of gravity — different from the design intent.

## Decision

**The unit of value is the federation, not the member.** Weft is one product —
a **shared-identity, agent-native code-intelligence spine** — of which the five
tools are components. We stop positioning and prioritising as "five instruments"
and start treating the **glue** as the product:

- the **SEI identity spine** (one rename-surviving identity across code-intel,
  taint, tracking, governance);
- the **seams** (the joins: wardline→filigree emit, SEI keying, entity
  associations, governance binding) — these are the product *surface*;
- the **cross-cutting quality conventions** (provenance-honesty, lead-summary,
  bounded-by-default, SEI-keying) — these are the glue's *standards*, and they
  are the differentiation.

## Consequences (what this reorders)

1. **The seams are the crown jewels.** A broken join is the *product* broken, not
   a peripheral bug. → The **seam-health / contract-conformance surface** (the
   exit-interview P0: an agent must be able to ask *"is this join carrying value
   end-to-end? does my output match the contract on the other side?"*) moves from
   nice-to-have to **central product feature.**
2. **Provenance-honesty becomes a protected invariant** — the moat-guard. *No
   result ships without its provenance.* The lead-summary and bounded-by-default
   conventions are sub-clauses of this one banner.
3. **Member role is integration-first.** A member earns its place by how well it
   *strengthens the spine and seams*, not by standalone capability. A member that
   returns confident-emptiness (Warpline, as-seen) is worse than a weak standalone
   tool, because it **breaks the glue's promise** — the honesty contract that is
   the moat. This sharpens "does Warpline earn its place" into a federation
   question, not a bug.
4. **The success metric shifts** from "does each tool work" (≈maxed) to **"does
   the federation deliver value as a whole"** — joins green, reach-for across the
   spine, trust held. (Successor to the dogfood-pass-rate scoreboard,
   `weft-6636667996`.)
5. **Positioning:** the **headline is the spine** (SEI + MCP-native + honesty); the
   tools are proof-points. The reviewer said it; the owner affirms it. Surfacing
   the federation as the pitch — not an implementation detail — is the marketing
   consequence (owner-reserved execution).
6. **The reach-for thesis is federation-level.** The exit interview's question
   ("does the agent reach for the suite or grep") is really *"is the federation the
   agent's default substrate."* The battle is for the spine, not per-tool.

## Reversal trigger

If, at scale (elspeth) or in a real governance loop, the integration value fails to
materialise — i.e. agents reach for individual tools but the *spine* adds nothing
they couldn't get from the tools standalone — revisit. The bet is that the glue is
the moat; the falsifier is "the glue is inert and the tools carry all the value
alone."

## Provenance

Owner reframe, 2026-06-15, articulated directly ("it was always meant to be a loose
wave of products but every agent is saying no, it's the glue that actually
matters"), corroborated by the external cold-eval assessment
(`pm/2026-06-15-cold-eval-external-assessment.md`) and the day's dead-seam finding.
Vision-level; vision.md update and any external positioning remain owner-reserved.
