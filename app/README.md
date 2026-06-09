# Weft hub — site app (`app/`)

A full multi-page Vite + React site for the **Weft federation hub**: the
documentation-only front door to a federation of five sibling developer-tools.
This is an **integration** of the existing Weft design system — the tokens,
fonts, federation marks, the 17-component React library, and the three UI kits
all live in `../design-system/project/` and were vendored/ported here, not
redesigned.

> Weft is documentation only — there is nothing called "Weft" to install or run.
> This app is the hub's *site*, and it ships as a static bundle to match that
> no-runtime posture.

## Dev / build / preview

```bash
cd app
npm install
npm run dev       # vite dev server (HMR) — http://localhost:5173
npm run build     # static production build → app/dist/
npm run preview   # serve the built dist/ locally to verify the static output
```

A `verify.mjs` runtime smoke test is included (dev-only; `playwright` +
`@playwright/test` are devDependencies, not in the shipped bundle). With the
preview server running on `:4319` it loads every route in headless chromium and
asserts zero console errors, that each route mounts, and that the three
interactions (composition-law pill, kanban card → detail panel, `/build` copy
button) and Rust/Python syntax highlighting actually work:

```bash
npx vite preview --port 4319 &   # then:
node verify.mjs
```

`npm run build` emits a fully static `app/dist/` (HTML + hashed JS/CSS + the
verbatim `ds-assets/`) deployable to GitHub Pages with **no runtime and no
server**.

## The `base` path decision (GitHub Pages subpath)

- **`base: './'`** in `vite.config.js` makes every emitted asset URL *relative*,
  so the bundle deploys to **any** GH-Pages subpath (e.g. `/weft/app/`) with no
  edit and no rewrite.
- **Routing is `HashRouter`** (`src/main.jsx`), not `BrowserRouter`. On a static
  subpath host with no server to rewrite deep links, hash routing keeps the
  document path fixed at `…/index.html`, so the `./`-relative asset URLs resolve
  identically on **every** route — including deep links like
  `#/members/loomweave`. (`BrowserRouter` would need a `404.html` SPA-redirect
  hack and a hard-coded basename.)

## Assets vendored from `design-system/project/`

Everything below is **copied/ported, not reauthored**. On a design-system
update, **re-copy** these — do not hand-edit them here.

| Vendored asset | From | To | Notes |
|---|---|---|---|
| `colors_and_type.css` | `design-system/project/` | `public/ds-assets/colors_and_type.css` | **the token source of truth**, copied verbatim. Linked in `index.html`. |
| `styles.css` | `design-system/project/` | `public/ds-assets/styles.css` | shared styles (an `@import` of the tokens). |
| Fonts (3 variable TTFs + OFL) | `design-system/project/fonts/` | `public/ds-assets/fonts/` | JetBrains Mono (upright + italic) + Space Grotesk. Bundled locally, no CDN. |
| 17 React components | `design-system/project/components/**` | `src/ds/**` | copied **preserving the subdir tree** (`Dossier` imports `../marks/Mark.jsx`; a flat copy would break it). Re-exported by `src/ds/index.js`. |
| Federation glyphs | (the `Mark` component) | `src/ds/marks/Mark.jsx` | inline SVG so `currentColor` applies the thread color. |

### Why `public/ds-assets/` and not `import` in `main.jsx`

The tokens CSS requests its fonts with a **relative** `url('fonts/…')`. The task
requires both (a) copying that CSS **verbatim** and (b) a `<link rel="preload">`
of the two brand faces that actually prevents the documented font-flash. Those
two requirements **conflict** with `import`-ing the CSS through Vite: the bundler
would resolve and **hash** the font URLs (`fonts/JetBrainsMono…<hash>.ttf`), so a
static, byte-matching preload in `index.html` becomes impossible and the flash
(plus a double-download) returns.

The resolution: put `colors_and_type.css`, `styles.css`, and `fonts/` in
`public/ds-assets/` **preserving the verbatim relative `fonts/` layout**, link the
stylesheet, and preload the two variable faces with the same `./ds-assets/fonts/…`
paths the CSS requests. The preload `href` is byte-identical to the CSS `url()`,
so the faces are warm before first paint. (This is the deliberate deviation from
the task's "e.g. import in main.jsx" suggestion — it honors verbatim-copy **and**
a working preload.)

Vite prints two harmless notices at build time —
`./ds-assets/colors_and_type.css doesn't exist at build time, it will remain
unchanged to be resolved at runtime` — which is exactly the intended behavior:
those `public/` files are copied through and resolved at runtime.

## The kit → ESM porting

The three UI kits in `design-system/project/ui_kits/` are written for **in-browser
Babel**: a global `React`, library components pulled off `window` with no imports,
and a self-mount block. To run them in a Vite ESM build, each was ported:

1. `const { useState } = React;` → `import React, { useState } from 'react';`
2. `const { Mark, Tabs } = window.WeftDesignSystem_9a241d;` → real
   `import { Mark, Tabs } from '../../ds/index.js';`
3. removed the `document.getElementById('root')` self-mount block.
4. renamed each kit's top component (all three were named `App`, which would
   collide): `Landing` / `FiligreeDashboard` / `WeftCliTerminal`.
5. collapsed the glue files: the CLI's `CliData.jsx` (a pure window-alias)
   **disappears**; the dashboard's local `Marks.jsx` is dropped in favor of the
   library `Mark` (identical glyph set); `HubData.jsx` / `data.jsx` were converted
   from `Object.assign(window, …)` to ESM exports.

| Kit | Ported to | Notes |
|---|---|---|
| `weft-hub` | `src/routes/Landing.jsx` + `src/data/roster.js` | the landing; roster data became the app's single source of truth. |
| `filigree-dashboard` | `src/demos/dashboard/*` | the live kanban GUI. |
| `weft-cli` | `src/demos/cli/WeftCliTerminal.jsx` | the tabbed terminal; its `@keyframes blink` moved to `src/app.css` (reduced-motion guarded). |

### Adaptations made to the kits

- **Bounded demo frames.** The dashboard kit is authored as `height:100vh;
  overflow:hidden` and the CLI kit centers in `100vh` — they assume they own the
  viewport. In `/demos` they live inside site chrome, so the dashboard is sized
  to a bounded `560px` frame (its documented viewport) and the CLI sits centered
  in the page column.
- **The dashboard detail panel is `position: fixed`** in the vendored
  `Dialog variant="panel"` (a legitimate full-height slide-in — the product's
  real behavior). Inside `/demos` it therefore slides over the viewport rather
  than the demo frame. This was left as-is (do not redesign the vendored
  component); Esc and backdrop-click close it, and the `/demos` caption notes it.
- **The dashboard's own dark⇄light toggle** is preserved; the vendored tokens
  honor `[data-theme="light"]` on any element, so the in-demo flip is scoped to
  the demo frame, independent of the site-wide toggle in the header.

## Dependencies added (and why)

| Dependency | Why |
|---|---|
| `react`, `react-dom` (18) | the component library and kits are React. |
| `react-router-dom` (6) | multi-page routing (landing + 5 member pages + demos + build); `HashRouter` for static subpath deploy. |
| `vite`, `@vitejs/plugin-react` | the build tool the task specifies; static output. |
| **`prism-react-renderer`** (2) | syntax highlighting for the two `/build` plugin samples. Chosen over `shiki` to keep the bundle lean and the highlight **runtime** (no build-time grammar step); it ships a small Prism core. Themed with a token-driven custom theme (`src/components/CodeSample.jsx`) so samples sit in the Loom palette rather than importing a foreign Prism theme. |

No icon library was imported — icons are type (emoji + unicode glyphs) and the
federation `Mark` glyphs, per the design doctrine.

## Sitemap

```
/                       landing  (weft-hub kit → ESM): hero + 4-stat strip,
                        member roster, composition-law Solo/Pair/Suite tabs,
                        how-they-compose (SEI + weft transport + bindings),
                        the Lacuna strip, footer
/members/loomweave      ┐
/members/filigree       │  one thread-tinted page each: domain authority,
/members/wardline       │  what it owns, how it composes, and a snapshot-facts
/members/legis          │  block labeled "snapshot — not authoritative; see the
/members/charter        ┘  repo" (Charter states adapters are pending)
/demos                  live demos (tabbed): filigree-dashboard + weft-cli
/demos/dashboard        ┐  deep-linkable demo selection
/demos/cli              ┘
/build                  the member-builder: 3 conformance invariants + two
                        annotated, copy-able static samples (Rust Loomweave
                        plugin, Python Wardline rule)
```

## The hub audit invariant

The hub "contains no restated project-internal fact without a pointer." Member
pages state the stable hub-owned facts (domain authority, composition role) plainly,
but every version / count / status is rendered in a block labeled **"snapshot —
not authoritative; see the repo"** with the repo link. All such values come from
the facts pack (`../members/*.md`); none were invented. Repo URLs are under the
`foundryside-dev` org; `filigree` / `clarion` / `legis` / `charter` still 404
until they migrate (expected). Loomweave's repo is named `clarion` — the page
states the rename is display-only. External links carry `↗`, `target=_blank`,
`rel="noopener"`.

## Judgment calls (surfaced to the PM)

1. **Dashboard footer version string.** The vendored kit renders
   `filigree v2.0.1`; the facts pack snapshot is **v3.0.0rc2**. On the hub a bare
   restated version with no pointer brushes the audit invariant, so
   `src/demos/dashboard/data.js` sets `PROJECT.version` to the facts-pack value,
   and the `/demos` page frames itself as an illustrative recreation. Flagged for
   reversal if you'd rather keep the kit byte-faithful instead.
2. **`/build` sample fidelity.** Both samples are explicitly labeled
   "illustrative — see the contract" and kept schematic where an exact trait/base
   signature is uncertain (e.g. the Rust `Extractor` trait, the Python `Rule`
   base), pointing to the owning repo rather than fabricating an API — per the
   task's "do not fabricate APIs that contradict the briefings."
```
