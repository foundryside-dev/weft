# PDR-0030 — Ratify Plainweave (code-grounded intent) as an admitted member; rename Charter → Plainweave in canon

**Date:** 2026-06-24 · **Status:** Adopted (owner ruling, in-session AskUserQuestion) · **Class:**
federation membership / doctrine §7 admission (owner-reserved) · **Builds on:** the Charter→Plainweave
**reframe + rename**, owner-approved section-by-section 2026-06-18 (hub `16d81a0`; design doc
[`pm/2026-06-18-charter-to-plainweave-permission-to-exist-design.md`](../../2026-06-18-charter-to-plainweave-permission-to-exist-design.md)).

## Context

Charter was the federation's requirements/obligations member — "realized local core + read-only MCP,
planned Weft integration, **not yet a full member**." On 2026-06-18 the owner approved its **reframe**
(requirements-down PM-overlay → **code-up** "permission for code to exist": every code SEI ladders up to
a requirement, every requirement to a goal; an unlinked node at any level is a reviewable *"why does this
exist?"*; hero value = a readable, consolidatable requirements corpus that moves the refactor lever up the
Meadows hierarchy) and **rename** to **Plainweave** (charter is taken on PyPI). The reframe was approved;
**§7 roster promotion, publish, and the final name were held owner gates** (hub `7503a44`).

Since standup at `~/plainweave`, Plainweave reached **beta-candidate**: the code-up intent graph
(`SEI → requirement → goal`, orphan/trace/corpus) is **validated cross-member on LIVE peers (Lacuna,
Loomweave), not stubs** (Plainweave PDR-008), with read primitives shipped (`entity-intent-context`
goal_trail + honest `intent-coverage`). The federation-enhancement half of the admission bar is being
earned in shipped behaviour, not asserted.

This session (RESUME) reconciled the hub member docs to that reality and surfaced the held §7 gate to the
owner. The owner ruled.

## Decision (owner — AskUserQuestion, 2026-06-24: "Ratify Plainweave only")

1. **Plainweave is admitted to the roster** as the **code-grounded-intent / requirements authority** —
   the reframed, renamed successor to Charter. Like Tabard it was seated by **gap-naming**; unlike Tabard
   it has a realized core and a **live-peer-validated** cross-member seam, so its admission rests on
   shipped behaviour, not a reserved coordinate alone.
2. **Charter → Plainweave is renamed across the canon** — doctrine §1/§2/§5/§6/§7/§8/§9, the member
   snapshot (`members/plainweave.md` supersedes `members/charter.md`, now a redirect stub), and
   `registries/claims.md` (C-1, C-12, C-13, new C-16) + `registries/terminology.md`. `~/charter` is
   preserved as the historical precursor.
3. **Plainweave is NOT in the five-member launch cutover** and is **non-gating.** Its launch-grade build
   matures in parallel; full implementation membership (standalone parity + federation enhancement +
   honesty conformance, all in shipped behaviour) is still being earned.

## What this does NOT change

- **Tabard stays owner-gated.** The owner chose "Plainweave only." Tabard's uncommitted doctrine/registry
  edits + `members/tabard.md` remain held in the working tree pending PDR-0028 ratification; this PDR does
  **not** admit Tabard or commit its canon.
- **The cutover set stays five** (Loomweave, Filigree, Wardline, Legis, Warpline). Plainweave's admission
  does not reopen the cutover or any **frozen seam contract** (inviolate, PDR-0027).
- **Publish + public remote + final name remain owner-gated.** Admission ratifies the roster seat + the
  canon rename; it does **not** authorize a PyPI publish, a public GitHub remote, or lock the final name.
- **Sibling obligations are not unilaterally filed.** The Loomweave catalog-tagging half of Plainweave's
  north-star is a sibling obligation surfaced to the owner, not a hub ticket Plainweave files itself.

## Reversal trigger

If Plainweave **fails standalone parity** (its core stops being useful without peers), its **live-peer
seam regresses** (PDR-008's cross-member validation stops reproducing on real peer catalogs), or it
**fails honesty conformance** (confident-empty / advertise-and-ignore), the owner revisits membership —
demote to a *documented gap* (named honestly as such per doctrine §7) rather than carry a hollow member.
A membership that never clears full implementation membership is a reserved seat, not a member tool.

## Propagation

**Edited to this ruling (this session):** doctrine.md (§1 membership para + roster note, §2 member bullet
+ Shuttle para, §5 enrich-only, §7 go/no-go, §8 naming, §9 status), `members/plainweave.md` (new),
`members/charter.md` (redirect stub), `registries/claims.md` (C-1, C-12, C-13, +C-16),
`registries/terminology.md` (member row), `pm/product/current-state.md`, `pm/product/metrics.md`.

**Held / not edited:** Tabard's uncommitted canon edits (owner-gated). **Flagged for follow-up:**
`federation-map.md` Plainweave cells (still "planned"), `SHIPPING.md` positioning, `web/` information
architecture, and a `conflict-register.md` entry.

**Commit mechanics (for `/product-checkpoint`):** doctrine.md + the two registry files now carry **both**
this PDR's Plainweave edits **and** the still-held Tabard edits — and they co-edit the member-count lines
(claims C-1, terminology "member"). A clean *Plainweave-only* commit therefore needs a selective commit
(or a HEAD-based worktree), since `git stash` is blocked in this repo. Resolve at checkpoint; do not commit
Tabard's prose as a side effect.

## Provenance

Owner AskUserQuestion in the PM session, 2026-06-24 — "Ratify Plainweave only" (apply the canon rename +
admit Plainweave; draft this PDR; leave Tabard gated). Reframe approval: hub `16d81a0` (2026-06-18).
Evidence of earned federation-enhancement: Plainweave PDR-008 (live-peer seam) + PDR-001 (code-up refocus).
Related: doctrine §7 (admission quality bar + two-stage gap-naming), PDR-0016 (admission quality bar),
PDR-0028 (Tabard gap-naming, the sibling gap-named member, still proposed/gated).
