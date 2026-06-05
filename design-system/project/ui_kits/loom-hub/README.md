# UI Kit — Loom Hub

A recreation of the **federation hub** (`~/loom`): the umbrella portfolio /
doctrine landing that presents Loom as one woven family of separable tools.
This is the brand-layer surface — it uses the Space Grotesk display face and the
full thread palette to show the roster as distinct strands.

`index.html` opens on the hero (federation axiom), an expandable member roster,
and the interactive composition-law toggle (Solo / Pair / Suite).

## Files
| File | What it is |
|------|------------|
| `index.html` | Mounts React + the components below |
| `Marks.jsx` | Federation glyph set (`<Mark name="…">`) + `MEMBERS` / `SHUTTLE` data |
| `Hub.jsx` | The page: `HubHeader`, `Hero`, `Roster` → `MemberCard`, `CompositionLaw`, footer |

## Components to reuse
- `<Mark name="loom|clarion|filigree|wardline|legis|charter|shuttle" size color>` — the glyph set, inherits `currentColor`.
- `<MemberCard m={…} />` — thread-ruled roster card with expand.
- `MEMBERS` — the canonical roster array (name, thread, lang, domain, status, repo).

## Notes
- Tokens come from `../../colors_and_type.css`.
- This is a recreation of a **documentation hub**, not a marketing site — keep
  copy declarative and the chrome minimal. Loom is docs-only: "there is nothing
  called Loom to install or run."
