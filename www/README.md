# Loom Federation — hub site

Static front door for the **Loom Federation** suite. A faithful recreation of the
`loom-hub` UI kit from the **Loom Design System** handoff — terminal-grade,
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
| `index.html` | The page: header, hero (federation axiom), member roster, composition-law toggle, Lacuna strip, footer. Content-complete server-side. |
| `colors_and_type.css` | **Token source of truth, copied verbatim from the design system.** Surfaces, text, accent, the per-member thread palette, Lacuna scheme, radii, elevation, spacing, the mono/display type roles, and the documented light theme. |
| `styles.css` | Hub layout + components, layered on the tokens. |
| `main.js` | Progressive enhancement only: single-open roster accordion + Solo/Pair/Suite toggle. |
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
- **Roster = the brand/doctrine layer:** 5 realized members (clarion · filigree
  · wardline · legis · charter), **Shuttle** dimmed as a roadmap thought-bubble,
  and **Lacuna** set apart as the adjacent demonstration specimen (off-palette
  dusty magenta + dashed frame). Per the doctrine, member cards point to the
  **repo path** (`~/clarion`) — the hub is documentation only; install lives on
  each tool's own surface.
- **`legis` status shown as `1.0.0rc2`** — the design said `1.0.0rc1`; bumped to
  match the repo (the design's own rule marks status as a non-authoritative
  snapshot).
- **Dark only.** Dark teal is the canonical theme and the hub kit ships no theme
  toggle, so none is added here (the tokens *do* define a full light theme under
  `[data-theme="light"]` if one is wanted later).
- **No theme-flash / font-flash.** Both brand faces are `<link rel="preload">`-ed
  before first paint (the design's recurring "missing brand fonts" fix).

## No outbound links (pending the org migration)

The suite is mid-migration to a consolidated GitHub org, so the site ships with
**zero outbound hyperlinks**. The design naturally suits this: repo references
are plain filesystem paths (`~/clarion`, `~/lacuna`), and nav items either point
to real on-page sections (Doctrine/Federation → composition law, Members →
roster) or are inert `role="note"` placeholders (SEI, Glossary) until those docs
land.

**To go live after the freeze lifts:** wire the inert nav placeholders and any
repo references to real `href`s. Nothing else needs to change.

## Notes

- Content-complete with JavaScript disabled: every member card and the default
  (Pair) composition panel render server-side; JS only adds the accordion and
  the mode toggle.
- `colors_and_type.css` is the verbatim design-system token file — if the design
  system updates, re-copy it rather than editing tokens here.
