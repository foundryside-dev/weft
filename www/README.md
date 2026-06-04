# Loom — front-door site

Static single-page front door for the Loom suite. Hand-rolled HTML/CSS/JS, no
build step, no dependencies. GitHub-Pages-deployable as-is.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire page (hero, principles, toolkit, compose, roadmap, footer). |
| `styles.css` | OKLCH design tokens, `light-dark()` theming, responsive layout. |
| `main.js`    | Progressive enhancement only: theme toggle + copy-to-clipboard. |
| `.nojekyll`  | Tells GitHub Pages to serve files verbatim (no Jekyll processing). |

## Preview locally

The clipboard API needs a secure context; `localhost` qualifies (a `file://`
open does not, though the `execCommand` fallback covers it). Use a static server:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## What is stubbed (pending the link freeze)

The project is mid-migration to a consolidated `loom` GitHub org, so the site
ships with **zero outbound hyperlinks**. Every place a real link will land is a
clearly-styled, accessible placeholder (`.is-placeholder`, labelled
"coming soon" / "not yet 1.0" / "no repo yet" with an `aria-label`):

- Hero **Get started** CTA
- Per-tool **Docs** affordances (filigree, clarion, wardline, legis)
- Roadmap **charter** / **shuttle** status affordances
- Footer **Source** / **Docs** entries

In-page anchor navigation (header nav, footer nav, hero links) is real and
works. Install-command code blocks are real commands (not links) and are wired
for copy-to-clipboard.

**To go live after the freeze lifts:** replace each `<span class="… is-placeholder">`
with an `<a href="…">`, drop the `is-placeholder` class, and add real `href`s to
the footer `Source`/`Docs` entries. Nothing else needs to change.

## Notes

- Dark/light theme follows the system preference by default and persists an
  explicit choice in `localStorage`. A blocking script in `<head>` prevents a
  flash of the wrong theme.
- Fully usable with JavaScript disabled: install commands are real DOM text,
  navigation is anchor links, theme falls back to the OS preference.
- Contrast verified WCAG AA in both light and dark modes (all text/background
  pairs ≥ 4.5:1).
