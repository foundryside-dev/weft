# Plainweave (member)

**Domain authority:** code-grounded intent — the traceability graph that gives code its *reason to exist*. "Why does this entity exist, what requirement does it satisfy, and what goal does that requirement serve?" The federation's **obligations / permission-for-code-to-exist surface** (the reframed, renamed successor to **Charter**).
**Repo:** `~/plainweave` · **Language:** Python · **PyPI:** not published (owner gate held — no publish, no public remote).
**Current details:** *(snapshot — not authoritative; see repo)* pre-alpha; code-up intent graph (`SEI → requirement → goal`) with orphan/trace/corpus reads and an MCP surface (`entity-intent-context`, `intent-coverage`). For the latest, use `~/plainweave/README.md`, `~/plainweave/docs/product/`, and `~/plainweave/docs/product/decisions/`.

## Roster status — read this first

Plainweave is **an admitted member** (owner ruling 2026-06-24, [PDR-0030](../pm/product/decisions/0030-ratify-plainweave-code-grounded-intent.md)) — the **code-grounded-intent / requirements authority**, the reframed/renamed successor to Charter. Like Tabard it was seated by **gap-naming** ([doctrine.md](../doctrine.md) §7 stage 1); **unlike** Tabard it has a realized core and a **live-peer-validated** cross-member seam, so its admission rests on shipped behaviour, not a reserved coordinate alone. It is **not** in the five-member launch cutover, is **non-gating**, and full *implementation membership* (the shipped-behaviour quality bar) is still being earned in parallel.

> **STILL owner-gated (admission ratified, these held):** the **public remote / PyPI publish** and the **final name** remain owner-reserved (hub commit `7503a44`; Plainweave's README + `vision.md`). The Charter→Plainweave **reframe + rename** was owner-approved 2026-06-18 (hub `16d81a0`); **§7 admission + the canon rename were ratified 2026-06-24** (PDR-0030). Do not publish, push a public remote, or lock the name without an owner ruling.

This file **supersedes [members/charter.md](./charter.md)**: Plainweave is the reframed, renamed successor to the `~/charter` precursor (which is preserved as history). The reframe inverts Charter's requirements-down PM-overlay into a **code-up legitimacy** model.

## What it owns (authoritative in Plainweave)

The code-grounded intent graph and the local requirement corpus: strategic goals, requirements, and the bindings that ladder a code entity up to a requirement and a requirement up to a goal. A node with **no upward edge — at any level — is a reviewable question**:

- a public capability with no requirement → *"why does this code exist?"*
- a requirement with no goal → *"what am I doing here?"*

The point is **not** orphan-code detection (that is one query). The point is that binding code to requirements accretes a **living, readable requirements corpus** an agent or human can reason over and *consolidate* — *"why do we have three near-identical reporting requirements?"* — moving the refactor lever **up the Meadows leverage hierarchy** (from "rename this function" to "*does this submodule still serve a goal we hold?*"). It is **advisory by default**; it renders no release verdict.

## Federation role (points to weft for patterns)

- **Roster:** admitted member (PDR-0030, 2026-06-24), reframed/renamed successor to Charter; **not** in the five-member cutover and **non-gating**. Full implementation membership (shipped-behaviour quality bar) still being earned in parallel.
- **Thin member, clear authority split.** Plainweave owns *intent*; **Legis** owns the teeth + audit, **Loomweave** owns code identity + semantics, and binding reuse rides **ADR-029** entity-associations — Plainweave does not re-implement any of these.
- **Consumes SEI opaquely, never mints it.** Code-entity bindings key on Loomweave's **[SEI](../sei-standard.md)** via a loomweave-catalog adapter; falls back to file/symbol refs when Loomweave is absent.
- **Attributes, never gates.** It does **not** decide a requirement is satisfied merely because work closed, and it does **not** treat agent-authored bindings as accepted human truth. Re-derive any "compliance" shimmer as advisory intent-coverage, not authorization ([deconfliction-not-security](../doctrine.md)).
- **Enrich-only, never load-bearing.** Absence degrades consumers to a manual/local intent view; it never blocks a peer's core flow.
- **Hub-blessed seams (no forked dialect).** Any cross-member contract is hub-blessed territory (PDR: hub blesses every seam) — internal-first prove-the-need posture.

## Folding-in status (the seam, as of the resync — 2026-06-24)

- **Intent graph proven on itself and reproduced on two live sibling peers** (Lacuna, Loomweave) — the cross-member seam holds against **real peer catalogs**, not stubs (Plainweave PDR-008). This is the federation-enhancement half of the admission bar being earned in shipped behaviour.
- **Read primitives shipped:** `entity-intent-context` (goal_trail to the goal layer) and an honest `intent-coverage` read (counts only live requirements; covers pagination).
- **Active bet (Plainweave-side):** make the north-star honestly computable — scope the public-surface denominator and surface `coverage.complete` to any north-star computation (catalog public-surface tagging is per-repo: complete on Loomweave, degraded on Lacuna/Plainweave).
- **Owner-driven seam dependency:** the catalog-tagging half is a *sibling obligation* (Loomweave already ships complete coverage); Plainweave does **not** file a Loomweave hub ticket unilaterally — surfaced to owner.

## Notes

- Charter's legacy source ADRs still carry "Clarion"/"Loom" naming; the standup rerooted Plainweave to the permission-to-exist design and the current Weft/Loomweave terminology.
- Plainweave's cells in [federation-map.md](../federation-map.md) still read "planned/folding-in" pending a propagation pass (flagged in PDR-0030) — admission ratified the roster seat, but the live integration adapters are still maturing, so the matrix is not yet "shipped."
- The distinction from Shuttle is unchanged: Plainweave owns *obligations/intent*; the sketched Shuttle owns *change execution*. They are not substitutes ([doctrine.md](../doctrine.md) §2).
