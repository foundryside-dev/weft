---
name: loom-design
description: Use this skill to generate well-branded interfaces and assets for Loom — the agent-first federation of developer tools (Loomweave, Filigree, Wardline, Legis, Charter) — for production or throwaway prototypes/mocks. Contains the design doctrine, colors, type, fonts, federation marks, and high-fidelity UI kit components (the Filigree dashboard, the agent CLI, and the federation hub).
user-invocable: true
---

# Loom design skill

Read `README.md` in this skill first — it carries the full picture: the roster
and thread palette, content/voice rules, visual foundations, and iconography.
Then explore the other files as needed:

- `colors_and_type.css` — the token source of truth. Link it, or copy the values.
- `assets/marks/` — the seven federation glyphs (inline the SVG so `currentColor`
  applies; loading via `<img>` won't pick up the thread color).
- `preview/` — small specimen cards for every token and component.
- `ui_kits/<kit>/` — interactive recreations (loom-hub, filigree-dashboard,
  loom-cli), each with its own README and reusable JSX components.

## How to work

If you're making **visual artifacts** (slides, mocks, throwaway prototypes):
copy the assets you need out of this skill and build static HTML files the user
can open. Pull components from the UI kits rather than rebuilding chrome.

If you're working on **production code**: copy assets and absorb the rules here
to become an expert in designing with this brand.

## Hold the line on the aesthetic

- **Mono in product, display for brand.** JetBrains Mono for all UI/code/body;
  Space Grotesk only for the wordmark and big headlines.
- **Dark teal, flat.** No gradients, no illustration, no glass, no marketing
  imagery. Depth = the surface ramp + hairline borders.
- **Color is semantic.** Status / severity / member-thread only. Never decorative.
- **Icons are type.** Reuse the product's emoji + unicode glyphs and the
  federation marks. Don't import an icon library unless the surface genuinely
  needs one — and flag it if you do.
- **Voice is doctrine.** Lowercase, terminal-native, declarative, honest about
  status. No hype, no emoji in prose.

If the user invokes this skill with no other guidance, ask what they want to
build, ask a few focused questions, then act as an expert Loom designer who
outputs either HTML artifacts or production code, depending on the need.
