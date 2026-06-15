# PDR-0027 — Definition of done: a decent L1 on gold contracts, then take our time on L2

**Date:** 2026-06-16 · **Status:** Adopted (owner ruling, in-session) · **Class:**
strategy / definition-of-done · **Relationship:** moderates the *posture* of PDR-0011
(launch gated to gold-standard) and PDR-0014 — **does not** repeal PDR-0011's
contract-correctness gate. Extends the "prototype on a solid core" recalibration into a
done-definition.

## Context

The team was **crushing hard on the cutover because it believed L1 was *done* = the
finish line** — the implicit definition of done was "ship a *perfect* L1 so we can take a
month off." The L1→L2 reframe (PDR-0023 federation-is-the-product → PDR-0024 the fleet is
the customer, two planes) corrected the picture: **L1 is the foundation, not the
finish line. The ongoing product lives in L2** (the fleet-OS coordination + sense-making
planes). Perfecting L1 to a mirror sheen is effort spent in the wrong place.

## Decision (owner)

**The definition of done shifts: ship a *decent* L1, then take our time on L2.**

- **L1 = the five-member cutover suite + its frozen cross-member contracts (the "solid
  core").** Ship it at **decent**, not perfect. Stop gold-plating above the core.
- **The contract-correctness gate STANDS (gold) — contracts are ABSOLUTELY INVIOLATE.**
  The frozen cross-member contracts and the 5-member solid core must still be **right** at
  the clean-break cutover — because the freeze makes them expensive to fix later (PDR-0011's
  load-bearing rationale, unchanged). *That* is the floor "decent" must never breach, and it
  is not a soft floor: **the dogfooding lesson is that contracts are absolutely inviolate**
  (owner, 2026-06-16). A contract is the one thing "decent" may never trade away. (Owner,
  AskUserQuestion 2026-06-16: "Contracts stay gold; stop gold-plating the rest.")
- **L2 = the real, ongoing product**, taken at a **proper pace** — not rushed to fill the
  vacuum a "we're done" mindset created. PDR-0024's planes are where the deliberate
  investment goes after a decent L1 ships.

## Consequences (what this reorders)

1. **"Correctness over ship-speed, no deadline" (PDR-0011) is narrowed** to *contract
   correctness + solid core*, not *everything*. Polish, completeness-beyond-decent, and
   gold-plating above the core no longer gate the launch.
2. **Effort reallocation:** work that was going into perfecting L1 redirects to L2 once the
   core is gold and the suite is decent. Don't keep crushing L1.
3. **Launch is a milestone, not the terminus** — there is no "month off" after L1; L2 is
   the next, deliberately-paced body of work.
4. **Composes with PDR-0026:** Warpline joins the five-member cutover at *decent /
   launch-grade baseline* (matured, not perfected) — consistent with this bar.

## Reversal trigger

- If "decent" is read down far enough to ship a **broken frozen contract**, the gate has
  been breached — that is the failure this PDR explicitly guards against; treat a
  shipped-broken contract as a launch-blocking defect, not acceptable "decent."
- If L2 work starts **cannibalizing the decent-L1 ship** (polishing L2 before L1 is out the
  door), revisit — decent L1 ships first, then L2.

## Provenance

Owner reframe in the PM session, 2026-06-16 ("the L1→L2 framing basically changed our
definition of done … get out a decent L1 and then take our time on L2, instead of a perfect
L1 so we can take a month off"), plus the AskUserQuestion confirming the contract gate
stays gold. Related: PDR-0011 (gold-standard launch), PDR-0014 (Rust gold gates cutover),
PDR-0023/0024 (the L1→L2 / federation / fleet reframe), and the "prototype on a solid core"
posture recalibration (2026-06-15).
