# Weft Federation — hub site

Static front door for the **Weft Federation** suite. A faithful recreation of the
`weft-hub` UI kit from the **Weft Design System** handoff — terminal-grade,
dark-teal canonical, JetBrains Mono as the product face with Space Grotesk
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
| `colors_and_type.css` | **Token source of truth, copied from the design system.** Surfaces, text, accent, the per-member thread palette, Lacuna scheme, radii, elevation, spacing, the mono/display type roles, and the documented light theme. (`--text-muted` was raised to `#638697` at the design-system source to clear WCAG AA contrast — see below.) |
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
- **Roster = the brand/doctrine layer:** 5 realized members (loomweave · filigree
  · wardline · legis · charter), **Shuttle** dimmed as a roadmap thought-bubble,
  and **Lacuna** set apart as the adjacent demonstration specimen (off-palette
  dusty magenta + dashed frame). Per the doctrine, member cards point to the
  **repo path** (`~/clarion`) — the hub is documentation only; install lives on
  each tool's own surface.
- **`legis` status shown as `1.0.0`** — the design said `1.0.0rc1` and the repo
  most recently snapshotted at `1.0.0rc3`; this site ships only once every member
  reaches its release milestone, so Legis is shown at its `1.0.0` release (the
  design's own rule marks status as a non-authoritative snapshot).
- **`--text-muted` raised to `#638697` for WCAG AA.** The prior `#5A7D8C` sat at
  ≈4.27:1 on `--surface-base` — below the 4.5:1 normal-text bar for the 11px
  metadata/labels it paints. The new value clears AA (≈4.85:1) and is changed at
  the design-system source (`design-system/project/`), not just this copy, so the
  token stays in sync.
- **Dark only.** Dark teal is the canonical theme and the hub kit ships no theme
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

**Caveat:** `filigree`, `clarion`, `legis`, and `charter` still live under
`tachyon-beep` today — those four repo links 404 until the repos migrate to
`foundryside-dev` (as intended). This site ships only once every member reaches
its release milestone, by which point all members are migrated and every member
link resolves; `weft`, `wardline`, and `lacuna` already do. (Loomweave's card
links to `foundryside-dev/clarion` and notes on-page that `clarion` is the repo
name — the Loomweave rename is display-only.) External links carry an `↗`
affordance and open in a new tab.

## Notes

- Content-complete with JavaScript disabled: the roster is built from native
  `<details>` elements, so every member card expands and every repo link works
  with JS off; the default (Pair) composition panel renders server-side. JS only
  upgrades the roster to single-open and adds keyboard navigation to the mode
  tablist.
- `colors_and_type.css` is the verbatim design-system token file — if the design
  system updates, re-copy it rather than editing tokens here.
