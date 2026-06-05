# UI Kit — Filigree Dashboard

A high-fidelity recreation of **Filigree's web dashboard** — the one real GUI in
the Loom suite. Lifted from the product's own `static/dashboard.html` +
`js/views/kanban.js`: the dark teal theme, JetBrains Mono throughout, the
3-column kanban, and the slide-in issue detail panel.

`index.html` is a working click-thru: switch views (Kanban / Ready / Graph /
Insights / Files), toggle status pills and the Ready filter, click any card to
open its detail panel, and flip the theme (dark ⇄ light).

## Files
| File | What it is |
|------|------------|
| `index.html` | Mounts React + the components below |
| `Marks.jsx` | Shared glyph set (the `◆` Filigree mark in the nav) |
| `data.jsx` | Fake project data + the canonical color/icon constants |
| `Kanban.jsx` | `Kanban`, `Column`, `Card` — faithful to `renderCard` |
| `DetailPanel.jsx` | Slide-in issue detail (status, deps, activity, actions) |
| `Dashboard.jsx` | Shell: top nav, filter bar, footer stats, view switching |

## Fidelity notes
- Card anatomy matches the product: left rule = type color (or emerald when
  **ready** / amber when **aging**), emoji type icon, P0–P1 shown as `P0`, P2+ as
  a colored dot, then id / type / status chips and `🔗 ⚡ 👤` badges.
- Type icons are **emoji** (`🐛 ✨ 📋 📊 🎯`) and status uses **unicode glyphs**
  exactly as the real dashboard does — no icon font.
- Graph / Insights / Files are stubbed with a placeholder (the real views use
  Cytoscape + dagre, out of scope for a cosmetic kit).
