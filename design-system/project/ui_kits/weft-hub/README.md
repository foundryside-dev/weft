# UI Kit — Weft Hub

A recreation of the **federation hub** (`~/weft`): the umbrella portfolio /
doctrine landing that presents Weft as one woven family of separable tools.
This is the brand-layer surface — it uses the Space Grotesk display face and the
full thread palette to show the roster as distinct strands.

`index.html` opens on the hero (federation axiom), an expandable member roster,
and the interactive composition-law toggle (Solo / Pair / Suite).

## Files
| File | What it is |
|------|------------|
| `index.html` | Mounts React + the design-system bundle + the components below |
| `HubData.jsx` | Federation roster data (`MEMBERS` / `SHUTTLE`); aliases the library `Mark` / `Tabs` / `Stat` onto window |
| `Hub.jsx` | The page: `HubHeader`, `Hero` (with a `Stat` strip), `Roster` → `MemberCard`, `CompositionLaw` (library `Tabs`), footer |

**This kit consumes the Weft component library** — the federation glyphs are the
library `Mark`, the composition-law switch is `Tabs` (pill), and the hero metrics
are `Stat` — all from `window.WeftDesignSystem_9a241d`.

## Components to reuse
- `<Mark name="weft|loomweave|filigree|wardline|legis|charter|shuttle" size color>` — the library glyph set, inherits `currentColor`.
- `<MemberCard m={…} />` — thread-ruled roster card with expand (kit-local).
- `MEMBERS` — the canonical roster array (name, thread, lang, domain, status, repo).

## Notes
- Tokens come from `../../colors_and_type.css`.
- This is a recreation of a **documentation hub**, not a marketing site — keep
  copy declarative and the chrome minimal. Weft is docs-only: "there is nothing
  called Weft to install or run."
