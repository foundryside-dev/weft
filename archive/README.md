# archive/ — superseded web content

Frozen snapshot of the Weft hub's **old web content**, archived 2026-06-14 ahead
of a from-scratch website rebuild. Nothing here is built, deployed, or referenced
by the live repo any more. Paths mirror their original locations, so any item can
be restored with a single `git mv archive/<path> <path>`.

| Archived | Was at | What it was |
|---|---|---|
| `www/` | `www/` | Hand-rolled static HTML/CSS/JS landing site (no build step). Predated the Vite app. |
| `app/` | `app/` | Vite + React multi-page hub site (landing, member pages, `/demos`, `/build`). Source only — `node_modules/` and `dist/` were regenerable build output and were not archived. |
| `design-system/` | `design-system/` | Shared design source the two sites drew from: tokens, fonts, the 17-component React library, and the three UI kits. |
| `mkdocs.yml`, `overrides/`, `theme/` | repo root | MkDocs Material documentation-site config, custom landing override, and theme (CSS + bundled fonts). |
| `scripts/build-docs.sh` | `scripts/` | Build-time mirror that copied the root markdown into the MkDocs `docs/` tree. |
| `.github/workflows/docs.yml` | `.github/workflows/` | GitHub Pages build+deploy workflow for the MkDocs site. Moving it out of `.github/workflows/` disables it; the new site will ship its own deploy workflow. |

## What was deliberately **not** archived

- **Root authoritative markdown** (`doctrine.md`, `members/*.md`, `glossary.md`,
  …) — the federation source of truth. The MkDocs site only *mirrored* it; it
  stays at the repo root.
- **`products/*.md`** — authored product-page copy. The archived `mkdocs.yml`
  nav referenced it, but it is reusable content, not a built surface; left at the
  repo root for the new site to draw on.
- **`scripts/check-federation-emit-liveness.py`** — federation liveness gate,
  unrelated to web content.

## Stale references to expect

These tracked files still mention the moved paths in prose/config; they were left
as historical record and will be reconciled by the new-site work:

- `THEMING.md` — links to `design-system/` (now `archive/design-system/`).
- `SHIPPING.md`, `pm/**` — narrative references to the old surfaces.
- `.gitignore` — the old `app/dist/`, `/docs/`, `/site/` entries were updated for
  the archived layout.
