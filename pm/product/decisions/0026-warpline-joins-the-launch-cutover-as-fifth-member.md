# PDR-0026 — Warpline joins the launch cutover as the fifth member

**Date:** 2026-06-16 · **Status:** Adopted (owner ruling, in-session) · **Class:**
launch scope (owner-reserved, PDR-0011) · **Supersedes:** the *cutover-exclusion clause* of
PDR-0022 (Warpline "fast-follow OUTSIDE the four-member cutover"). PDR-0022's admission
ruling itself STANDS; only its launch-sequencing clause is superseded here.

## Context

PDR-0022 admitted Warpline as the 5th member but recorded its implementation as a
**fast-follow OUTSIDE** a **four-member lockstep cutover** (Filigree, Loomweave, Wardline,
Legis) — Warpline shipping after launch. That framing existed because Warpline had been
**rushed to fill a gap** and was not at the maturity of its siblings.

The owner now rules (2026-06-16, FYSA + explicit confirmation): **Warpline is committing to
its build-out now, in parallel with the others' launch-lock prep, and joins the coordinated
launch as the fifth member.** The "four-member cutover" becomes a **five-member cutover.**

## Decision (owner)

1. **The launch cutover is five-member: Filigree, Loomweave, Wardline, Legis, and
   Warpline.** The "four-member lockstep / Warpline-outside" framing is retired. "Live core"
   and "total membership" converge at five.
2. **Warpline's build-out happens NOW, in parallel** with everyone else's launch-lock prep —
   not sequenced behind launch.
3. **Framing — maturation, not feature-creep or deferral.** The build-out gives Warpline
   what it *would have had under regular circumstances* had it not been rushed to fill a
   gap. The suite is **not being deferred to add features to Warpline**; Warpline is being
   matured to its proper launch-grade baseline so it can ship *with* the suite. This
   includes its own side of the PDR-0025 temporal-correlation work (local capture +
   reconstruction).
4. **Launch sequence:** one final **whole-suite dogfood run** → **evaluate whether Warpline
   needs another day or two in the oven** → then the single coordinated **five-member
   lever-pull on the whole lot.** Launch timing may flex by ~1–2 days for Warpline
   readiness; the lever is held for the whole suite, not pulled around Warpline.

## What this does NOT change

- **PDR-0025's prove-the-need on the cross-member stamp convention STANDS.** Only Warpline's
  *own* maturation enters the launch envelope. The four other members do **not** take on the
  `branch@sha` stamp obligation for launch; that convention is still hub-authored only after
  Warpline's demonstration proves out (esp. the squash-merge case). The launch does not bill
  the siblings for the temporal-correlation spine.
- **Seam contracts remain frozen at the clean-break cutover.** Warpline joining the cutover
  is about *shipping together*, not reopening frozen seam contracts.
- **PDR-0011 launch ownership** (owner-reserved) is unchanged — this ruling *is* the owner
  exercising it.

## Reversal trigger

If the final whole-suite dogfood shows Warpline **cannot reach launch-grade within an
acceptable window**, the owner decides — hold the lever longer, or fall back to a
four-member cutover with Warpline as a fast-follow (the superseded PDR-0022 posture). The
fallback is a one-line revert of this decision; the day-or-two readiness check is the gate
that fires it. Because launch scope is owner-reserved (PDR-0011), the hold-vs-fallback call
is the owner's, not the program office's.

## Propagation (living docs corrected to this ruling; PDR-0026 cited)

doctrine.md (§1 membership para, roster note, §status summary), members/warpline.md,
registries/claims.md (C-1, C-14), registries/terminology.md, pm/product/current-state.md,
pm/product/roadmap.md, and the cutover epic title `weft-4b2f948f70`. **Not edited** (audit
trail / frozen): dated pm/ session notes and the frozen warpline interface-lock.
**Flagged for follow-up:** the gold-standard launch program plan
(`pm/2026-06-10-gold-standard-launch-program-plan.md` → `/axiom-program-management`),
web/information-architecture.md, and a conflict-register entry.

## Provenance

Owner FYSA + explicit confirmation in the PM session, 2026-06-16 ("the four-member cutover
will be five members with warpline as the fifth"; AskUserQuestion: "Warpline joins the
launch (5-member lever-pull)"). Related: PDR-0011 (launch gated to gold-standard), PDR-0022
(Warpline admission + the superseded cutover-exclusion clause), PDR-0025 (temporal-
correlation contract sponsorship), doctrine §7.
