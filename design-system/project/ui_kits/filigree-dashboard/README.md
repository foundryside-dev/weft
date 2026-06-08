# UI Kit — Filigree Dashboard

A high-fidelity recreation of **Filigree's web dashboard** — the one real GUI in
the Weft suite. Lifted from the product's own `static/dashboard.html` +
`js/views/kanban.js`: the warm espresso ("Loom") theme, JetBrains Mono
throughout, the 3-column kanban, and the slide-in issue detail panel.

**This kit consumes the Weft component library** rather than re-implementing
chrome: `index.html` loads `_ds_bundle.js`, and the surfaces compose
`Tabs` (the view nav), `IssueCard` (board cards), `Dialog` (the slide-in detail
panel), `Toast` (action notifications), plus `Tag`/`Button` — all from
`window.WeftDesignSystem_9a241d`.

`index.html` is a working click-thru: switch views (Kanban / Ready / Graph /
Insights / Files), toggle status pills and the Ready filter, click any card to
open its detail panel, and flip the theme (dark ⇄ light).

## Files
| File | What it is |
|------|------------|
| `index.html` | Mounts React + the design-system bundle + the components below |
| `Marks.jsx` | Shared glyph set (the `◆` Filigree mark in the nav) |
| `data.jsx` | Fake project data + the canonical color/icon constants |
| `Kanban.jsx` | `Kanban` + `Column` — column layout; cards are the library `IssueCard` |
| `DetailPanel.jsx` | Issue detail content hosted in the library `Dialog` (panel) |
| `Dashboard.jsx` | Shell: top nav (`Tabs`), filter bar, footer stats, `Toast` |

## Fidelity notes
- Card anatomy matches the product: left rule = type color (or emerald when
  **ready** / amber when **aging**), emoji type icon, P0–P1 shown as `P0`, P2+ as
  a colored dot, then id / type / status chips and `🔗 ⚡ 👤` badges.
- Type icons are **emoji** (`🐛 ✨ 📋 📊 🎯`) and status uses **unicode glyphs**
  exactly as the real dashboard does — no icon font.
- Graph / Insights / Files are stubbed with a placeholder (the real views use
  Cytoscape + dagre, out of scope for a cosmetic kit).
