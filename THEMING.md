# Weft Federation — Shared Theming & Layout Decision

**Status:** Decided (2026-06-05) · **Owner:** PM/UX · **Companion:** [SHIPPING.md](./SHIPPING.md), [design-system/](./design-system/)

How the five products present a consistent look without violating the federation
axiom. Captures the model + the first concrete moves; two mechanism/scope forks
are open for the maintainer to rule.

---

## Decision in one sentence

**Theming shares as artifacts — vendored token files copied into each repo;
layout shares as conventions — documented patterns each product implements
natively.** You can't vendor a layout across a Rust TUI, a web dashboard, and an
mkdocs site, but you can vendor a palette. That distinction organizes everything
below.

## The constraint (stated accurately)

The federation axiom forbids shared infrastructure that "would need to be
*running or present* for the suite to work." Two clarifications matter so we
choose for the right reasons:

- A **vendored token file** (copied in, no dependency) is trivially compliant.
- A **build-time-inlined token package** (a devDep bundled into each product's
  shipped CSS) is *also* technically compliant — the shipped artifact is
  standalone, no more load-bearing than a compiler. It does **not** violate the
  doctrine. What it reintroduces is **release-coordination coupling**: a breaking
  token bump forces every product to re-coordinate a release.

We choose vendoring not because a package is *illegal*, but because vendoring has
**zero coordination coupling** and is **literally what the design system already
prescribes** ("define new colors only from these anchors… re-copy it rather than
editing"). It aligns with the federation's values; a package merely fails to.

## Source of truth — the neutral artifact, *not* filigree

The design system names filigree's dashboard the "canonical origin" of the
palette. That is a historical fact, not an architectural one — and acting on it
literally is a trap: **if every product vendored from filigree, filigree would
become load-bearing for the entire suite's look** — exactly the federation smell
the axiom exists to prevent.

So the source of truth is the **neutral design-system artifact**
(`design-system/project/colors_and_type.css`), now landed durably in this hub —
the doctrinally-correct owner, since the hub is authoritative for the interop
layer and is documentation-only. **filigree vendors from it like everyone else**,
even though it was the origin.

## The three surface families → three vendored artifacts

| Surface family | Who has it today | Vendored artifact | Notes |
|---|---|---|---|
| **Web GUI** | filigree dashboard (loomweave `web/` is docs, not an app yet) | `colors_and_type.css` (or a slimmed `weft-tokens.css`) | The dashboard is the origin, so it round-trips; it inherits the file like any consumer. |
| **Docs sites (mkdocs Material)** | filigree, wardline, loomweave — each with its **own drifting** `docs/stylesheets/extra.css` | one shared `weft-mkdocs.css` palette override + a Material `palette:` snippet | Replaces the three divergent `extra.css` files with one vendored source. **legis + charter have no docs site or CSS yet** — seed them with it. |
| **CLI / terminal** | all five | a tiny per-language colour-constants module (Python dict / Rust `const`) of the semantic colours (status/severity/priority) | Small, hand-kept, derived from the same token values. |

## Layout = conventions, implemented natively

There is no shared component runtime (that would be a dependency). "Shared
layout" means the documented grammar in
[design-system/README.md → Visual Foundations](./design-system/README.md), which
each product implements in its own stack:

- centered ≤980px column (hub/docs) **or** fixed top-nav + bottom-stats footer
  with a scrolling middle (dashboard);
- the warm-espresso **surface ramp** for depth (no shadows-as-depth, no gradients);
- **state shown by a 4px left rule** (member thread or semantic colour), not fills;
- radii `3 / 6 / 8`, mono-forward dense type, JetBrains Mono in product / Space
  Grotesk for brand moments only;
- the per-member **thread colour** as the one identity accent.

**In scope (decided):** the design system carries **component recipes** —
reference HTML/CSS for a card, a status chip, an issue row, a dossier — that
products translate into their own stack as **copy-reference, never a shipped
library**. The handoff already seeds these (the `preview/` cards and the
`ui_kits/` are exactly this); the job is to curate them into a stable,
versioned recipe set products vendor alongside the tokens.

## Proportionality — don't over-build for one GUI

Today there is **one** real web GUI (filigree), **three** drifting docs sites,
and small CLI palettes. So:

- **No `tokens.json` → multi-target generator yet.** It's build infrastructure
  for ~1.5 surfaces, and an *executable* generator also strains the hub's
  "documentation only, no code" rule. Hand-maintained vendored files with a
  `/* derived from design-system/…/colors_and_type.css · vN · re-copy on update */`
  header + a version stamp is sufficient. Revisit a generator only if web
  surfaces multiply.
- The vendored token file should carry its **verified-contrast status** (the
  handoff verified ≥4.5:1 in both themes) so each product inherits the WCAG
  guarantee instead of re-checking.

## Governance / propagation

- One source of truth (`design-system/`). Products **vendor** the emitted files.
- Each vendored copy carries a **version stamp**; a lightweight `make
  check-theme-drift` (or a docs note) lets a product tell it's stale.
- Updates flow one way: edit the design system → bump the stamp → products
  re-copy on their own cadence (no forced coordinated release).

## Decisions locked (2026-06-05)

- **Mechanism: vendored copy.** Each repo copies the token + recipe files in,
  with a version stamp + `re-copy on update` header. Zero coordination coupling.
- **Scope: the fullest — tokens + layout conventions + component recipes.** The
  design system is the curated source for all three; products implement natively.
- **Source of truth:** the neutral `design-system/` artifact in this hub;
  filigree vendors from it like every other member.

## Rollout sequence (deferred — maintainer sequences execution)

Decision-doc only for now; no product repo has been touched. When ready, the
recommended order:

1. **Done:** land the design system durably (`design-system/`) so the SoT isn't a
   `/tmp` tarball.
2. **Curate the recipe set** + slim the token file into a vendorable
   `weft-tokens.css` with a version stamp and inherited contrast guarantee.
3. **Pilot on the one real GUI:** vendor into the filigree dashboard and confirm
   round-trip (it's the origin, so low-risk).
4. **De-drift the docs sites:** replace filigree/loomweave/wardline's three
   `extra.css` files with one vendored `weft-mkdocs.css` + shared palette.
5. **Seed legis + charter docs sites** with the vendored docs theme (none today).
6. **CLI palette modules** last (smallest surface, least drift risk).
