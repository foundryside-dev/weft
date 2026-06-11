# Weft Federation — hub site

Static front door for the **Weft Federation** suite. A faithful recreation of the
`weft-hub` UI kit from the **Weft Design System** handoff — terminal-grade,
warm-espresso canonical, JetBrains Mono as the product face with Space Grotesk
reserved for brand moments (the wordmark + hero). Hand-rolled HTML/CSS/JS, no
build step, no runtime dependencies. GitHub-Pages-deployable as-is.

> The handoff prototype was React + in-browser Babel; per its README ("recreate
> in whatever technology makes sense… don't copy the prototype's internal
> structure") this is recreated as dependency-light static HTML with vanilla-JS
> enhancement.

## Files

| File | Purpose |
|---|---|
| `index.html` | The page: header, hero (federation axiom), member roster (native `<details>` cards that expand to repo links), composition-law toggle, **how-they-compose** (SEI + `weft` transport + representative bindings, grounded in `federation-map.md`), Lacuna strip, footer. Content-complete server-side. |
| `colors_and_type.css` | **Token source of truth, copied verbatim from the design system.** Surfaces, text, accent, the per-member thread palette, Lacuna scheme, radii, elevation, spacing, the mono/display type roles, the documented light theme, and the `ddMenuIn` popover-entrance keyframe (carried for parity; no popover on this page uses it). The palette is the warm-espresso "Loom" theme — `--text-muted` is `#7F6F58`. |
| `styles.css` | Hub layout + components, layered on the tokens. |
| `main.js` | Progressive enhancement only: upgrades the roster to single-open + adds keyboard support to the Solo/Pair/Suite tablist. |
| `fonts/` | JetBrains Mono (upright + italic) and Space Grotesk variable TTFs + their OFL licenses. Bundled locally — fully offline, no CDN. |
| `assets/marks/` | The federation glyph set as standalone SVGs (also inlined in `index.html` so they inherit their thread colour via `currentColor`). |
| `.nojekyll` | Serve files verbatim on GitHub Pages (no Jekyll processing). |

## Preview locally

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Use `localhost` (not `file://`) so the
preloaded fonts resolve under a normal origin.

## Design fidelity & deliberate decisions

- **Verbatim copy.** The roster (member names, domains, the italic "answers"
  quotes, statuses) and the composition-law text are lifted from the design's
  `Marks.jsx` / `Hub.jsx`.
- **Roster = the brand/doctrine layer:** the current app splits the suite into
  four live core tools (loomweave · filigree · wardline · legis), planned
  extensions (charter · heddle), **Shuttle** as a future idea, and **Lacuna** as
  the demo app.
- **`legis` status shown as `1.0.0`** — the current app presents Legis as a live
  core tool at its `1.0.0` release.
- **Hero metric strip + pill tabs (the refactored hub kit).** The hero closes on
  a 4-metric `Stat` strip (realized members · pairwise combos · runtime/brokers ·
  on the roadmap — 5/10/0/1) recreated from the design system's `Stat` display
  variant; it replaces the old qualitative chip row, whose counts it now states
  directly. The Solo/Pair/Suite switch is the system's `Tabs variant="pill"` — a
  quiet `--surface-overlay` fill on the active tab (not the amber accent), with
  only the text colour transitioning so the active fill can't stick mid-animation.
- **Tokens copied verbatim.** `colors_and_type.css` is the unedited design-system
  token file (warm-espresso "Loom" palette); re-copy it on a design-system update
  rather than editing tokens here.
- **Dark only.** Warm espresso is the canonical theme and the hub kit ships no theme
  toggle, so none is added here (the tokens *do* define a full light theme under
  `[data-theme="light"]` if one is wanted later).
- **No theme-flash / font-flash.** Both brand faces are `<link rel="preload">`-ed
  before first paint (the design's recurring "missing brand fonts" fix).

## Links — wired to `foundryside-dev`

The link freeze is lifted: the suite is consolidating under the
**`foundryside-dev`** GitHub org (the hub already lives at
`foundryside-dev/weft`), so the site points there throughout:

- **Member cards** expand to a real repo link — `github.com/foundryside-dev/<member>`.
- **Lacuna** links to `foundryside-dev/lacuna`; **Shuttle** stays link-free (no repo).
- **Nav + footer** link to the hub's own docs on GitHub (doctrine, SEI, glossary,
  federation-map, compatibility, asterisk-register) and the source repo.
- In-page nav (Members → roster, Compose → the weave section) are real anchors.

**Caveat:** this static `www/` prototype predates the Vite app and may lag the
current hub taxonomy. Current app links use `foundryside-dev/loomweave` for
Loomweave and split live core, planned-extension, and demo surfaces explicitly.
External links carry an `↗` affordance and open in a new tab.

## Notes

- Content-complete with JavaScript disabled: the roster is built from native
  `<details>` elements, so every member card expands and every repo link works
  with JS off; the default (Pair) composition panel renders server-side. JS only
  upgrades the roster to single-open and adds keyboard navigation to the mode
  tablist.
