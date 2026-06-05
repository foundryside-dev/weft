# Weft Design System

A design system for **Weft** — an agent-first federation of small, local-first
developer tools. Weft is not a product you install; it's a **family name and a
composition doctrine**. Five sibling tools, each authoritative for one domain,
each useful alone, each *enrich-only — never load-bearing* when composed.

> **The federation axiom:** Each member is authoritative for one domain,
> solo-useful, meaningfully composable pairwise, and enrich-only when composed.

This system captures both layers of the brand:
1. **The umbrella** — Weft as a woven portfolio of distinct, separable strands
   (the wordmark, the thread palette, the federation hub).
2. **The product reality** — a dark, terminal-grade, all-monospace aesthetic
   lifted verbatim from the one real GUI in the suite (Filigree's dashboard) and
   the CLI/MCP surfaces of the rest.

The visual language is intentionally **developer-grade, not marketing-grade**:
near-black teal surfaces, JetBrains Mono everywhere in product, a single sky
accent, semantic status colors, and one display face (Space Grotesk) reserved
for brand moments.

---

## The roster

| Member | Thread | Lang | Domain authority | Status |
|--------|--------|------|------------------|--------|
| **Loomweave** | aqua `#4ECDC4` | Rust | Code structure **+ identity authority (SEI)** | built · in use |
| **Filigree** | sky `#38BDF8` | Python | Work state / issue lifecycle | built · in use |
| **Wardline** | coral `#F4845F` | Python | Trust-boundary analysis | built · in use |
| **Legis** | violet `#A78BFA` | Python | Git/CI governance & attestations | 1.0.0rc1 |
| **Charter** | gold `#E3B341` | Python | Requirements, traceability, verification | scaffolded |
| *Shuttle* | slate `#6B7C8C` | — | *Change execution (roadmap thought-bubble)* | no repo |

**SEI** (Stable Entity Identity) is the spine: one durable id per code entity
that every cross-tool fact keys on, so a binding survives a rename tomorrow.

### Lacuna — the adjacent specimen

**Lacuna** is the deliberately-flawed *demonstration specimen* the suite is run
against — explicitly **not a roster member**. It gets its own scheme so it can be
linked from the Weft hub (and the member tools) and read as *similar, but
pointedly not woven in*. The rule:

- **Same world.** It inherits the entire Weft system — surfaces, type, spacing —
  so it's unmistakably the same environment.
- **Not part of.** Three deliberate departures set it apart: an **off-palette
  dusty magenta** (`--lacuna-accent #CE7AAE`) that appears in no member thread (a
  nod to it being "the MissingNo of the suite"); a **warm-neutral "specimen"
  surface** (`--lacuna-surface #1A1822`, noticeably less teal); and a **dashed /
  ticketed border** treatment instead of Weft's solid left-rules.
- Planted flaws (*lacunae*) reuse the stale red (`--lacuna-flaw`) and are
  permanent — "do not fix."

The Lacuna mark (`assets/marks/lacuna.svg`) is a broken specimen frame (the *gap*
= the lacuna) with a planted flaw inside.

---

## Sources

This system was built by reading the members' real repositories. The reader is
encouraged to explore them further to design with higher fidelity — the
Filigree dashboard source in particular is the canonical origin of this palette
and type system.

| Repo | URL | Used for |
|------|-----|----------|
| Loomweave | https://github.com/tachyon-beep/clarion | Domain, MCP surface, SEI, copy/tone |
| Filigree | https://github.com/tachyon-beep/filigree | **Canonical theme** (`src/filigree/static/dashboard.html`, `js/state.js`, `js/views/kanban.js`), dashboard UI |
| Wardline | https://github.com/foundryside-dev/wardline | Trust model, CLI scan output, agent-first framing |
| Legis | https://github.com/tachyon-beep/legis | Governance 2×2, combination matrix, operating model |
| Charter | https://github.com/tachyon-beep/charter | Requirements domain, scaffold status |

No Figma, decks, or other binary assets were provided. The **Weft hub doctrine**
and **Lacuna README** were provided as pasted text and are reflected throughout.
There were no existing Weft brand assets — the wordmark, the woven mark, and the
six member glyphs in `assets/marks/` were designed for this system.

---

## Content fundamentals

How Weft writes. The voice is **precise, declarative, and quietly opinionated** —
an engineer explaining a system they've thought hard about, not a marketer
selling it.

- **Lowercase, terminal-native.** Commands, tool names in running prose, paths
  (`~/weft`, `.filigree/`), and ids (`PY-WL-101`, `fg-da8d50`, `clarion:sei:7f3a…b1`)
  are written as they appear in a shell. Sentence case for prose; never Title
  Case headings-as-marketing.
- **Doctrine voice.** Big claims are stated as law, often as a single bolded
  sentence: *"enrichment, not load-bearing."* *"Weft is a federation, not a
  monolith."* Rules come with a **failure test** and **named consequences**, not
  vibes.
- **Honest about status.** Copy distinguishes *built · in use* from *scaffolded*
  from *roadmap thought-bubble*, and marks any restated version as
  *"snapshot — not authoritative; see the repo."* Tools "degrade honestly";
  design-only members are "labelled, never faked."
- **You/it, rarely I.** Addresses the reader/agent as *you*; refers to tools by
  name. First person is essentially absent. Agents are first-class subjects
  ("the agent operates and extends; the human supervises").
- **Em-dashes and asides.** Dense, parenthetical, footnote-loving. The doctrine
  literally maintains an *asterisk register* of documented axiom violations.
- **No hype, no emoji in prose.** Emoji appear **only** as functional issue-type
  icons inside the product UI (`🐛 ✨ 📋 📊 🎯`), never in headings or marketing.
  No exclamation marks. No "revolutionary," no "seamless."
- **Metaphor, used sparingly and on-theme.** Weaving (threads, warp/weft, the
  shuttle, filigree, the weft) — always in service of the composition idea,
  never decorative.

Representative lines:
> *"A product that only works when all siblings are present is a feature of a monolith wearing modular clothing."*
> *"Fix findings at the boundary (validate before returning), not at the sink."*
> *"Humans on the loop, not in the loop."*

---

## Visual foundations

**Overall vibe.** A terminal at rest. Near-black teal, monospaced, dense, calm.
Color is rationed and always *semantic* — it means a status, a severity, or a
member, never decoration. The system reads as one continuous developer tool.

- **Color.** A single dark teal surface ramp (`#0B1215` → `#243A45`), one sky
  accent (`#38BDF8`), and a tight semantic set: open/wip/done, ready (emerald) /
  aging (amber) / stale (red), a P0→P4 priority ramp, and finding severities. On
  top sits the **thread palette** — one hue per member — used for identity
  (glyph color, a 3–4px left rule, a tab underline, a dossier row). A documented
  **light theme** mirrors every token. Define new colors only in `oklch` from
  these anchors; don't invent.
- **Type.** Two faces, one voice. **JetBrains Mono** is the product face — all
  UI, code, body, data, at deliberately small/dense sizes (dashboard chrome runs
  at 11–12px). **Space Grotesk** is the brand face — wordmark, hub headlines,
  slide titles only. Tight tracking on display (`-0.02em`); generous line-height
  on body (1.6). Uppercase labels carry `0.12em` tracking.
- **Backgrounds.** Flat. No gradients, no hero images, no illustration, no
  texture. The darkest surface (`#070C0E`) is reserved for terminal bodies.
  Depth comes from the surface ramp and hairline borders, not light.
- **Borders & cards.** Cards are `--surface-raised` with a 1px `--border-default`
  hairline and a 6px radius. State is shown by a **4px left rule** (type or
  semantic color), not by fills. Chips use a 3px radius; popovers/modals 8px.
- **Elevation.** Minimal and dark. Dropdowns/popovers get a soft `0 10 25 /.45`
  shadow; modals `0 20 50 /.55`. The only "glow" is a brief accent box-shadow
  pulse when a card's data changes. No colored ambient shadows.
- **Radii.** `3 / 6 / 8 / full`. Pills and status dots are fully round; nothing
  else is heavily rounded. No pill-shaped buttons.
- **Hover / press.** Hover lightens the surface one step (`raised → hover`) or,
  on text, `secondary → primary`; accent buttons darken (`#38BDF8 → #0EA5E9`).
  Presses don't scale or bounce. Focus is a 2px accent outline.
- **Motion.** Functional and fast. `0.15s` for hover/button states, `0.2s` for
  the detail-panel slide and theme swap, both on `cubic-bezier(.4,0,.2,1)`. A
  blinking terminal cursor and a one-shot change-flash are the only ambient
  motion. No looping decoration; respect `prefers-reduced-motion`.
- **Transparency & blur.** Sparse. Status/severity chips use a `…33` alpha of
  their hue on the dark surface; `accent-subtle` tints drag targets. No glass /
  backdrop-blur.
- **Imagery.** There is none, by design. The "imagery" of this brand is its own
  output — terminal sessions, kanban cards, dossier rows. If a photo is ever
  needed, treat it cool and low-key; never warm marketing gloss.
- **Layout.** Fixed top nav + bottom stats footer with a scrolling middle, or a
  centered single column (hub, max ~980px). Flex/grid with `gap`; dense but
  never cramped. Right-side slide-in panels for detail.

See the **Design System** tab for swatches, specimens, and component cards.

---

## Iconography

Weft's iconography is **deliberately spartan and non-illustrative** — it matches
the terminal voice.

- **In product, icons are type, not assets.** The real Filigree dashboard ships
  **no icon font and no SVG sprite**. It uses **emoji** for issue types
  (`🐛` bug, `✨` feature, `📋` task, `📊` epic, `🎯` milestone) and **unicode
  geometric glyphs** for everything else: `◆` Filigree mark, `◇ ★ ⬢ ⬡` graph
  node shapes, `🔗` blocked, `⚡` blocks-downstream, `👤` assignee, `⚙` settings,
  `☀` theme, `▸ ▾ ▴` disclosure, `⚖` governance. Reuse these rather than
  importing an icon library — it keeps the kits faithful.
- **Federation marks (designed for this system).** Each member has a custom,
  stroke-based geometric **mark** in `assets/marks/` (`weft`, `loomweave`,
  `filigree`, `wardline`, `legis`, `charter`, `shuttle`). They riff on
  weaving/structure (a woven knot, a branching spine, a nested diamond, a warded
  boundary, a balance, a ruled charter, a shuttle on a dashed thread). All are
  `currentColor` on a `0 0 32` grid — **inline the SVG** (or use `<Mark>` in the
  kits) so they pick up their thread color; loading via `<img>` will not inherit
  color. There is no Weft logo in the wild — these are originals.
- **No raster icons. No drawn illustration.** Don't generate or hand-draw
  scene/illustrative art. If you need a richer line-icon set for a new surface
  the product never had, **Lucide** (thin, geometric, ~1.5–2px stroke) is the
  closest match — link it from CDN and **flag the substitution**; it is not part
  of the shipped products.

---

## Index — what's in this folder

**Root**
- `README.md` — this file (overview, sources, content + visual foundations, iconography, index)
- `SKILL.md` — Agent-Skill front-matter so this system is usable from Claude Code
- `colors_and_type.css` — the token source of truth (colors, type roles, radii, shadows, spacing, thread palette, light theme)

**`assets/marks/`** — the seven federation glyphs + the adjacent specimen, as standalone SVGs
- `weft.svg` · `loomweave.svg` · `filigree.svg` · `wardline.svg` · `legis.svg` · `charter.svg` · `shuttle.svg`
- `lacuna.svg` — the adjacent demonstration specimen (off-palette, dashed)

**`preview/`** — the Design System tab cards (Brand, Type, Colors, Spacing, Components)
- brand: `brand-logo`, `brand-members`, `brand-lacuna`
- type: `type-brandfont`, `type-pairing`, `type-display`, `type-body`, `type-mono`
- colors: `colors-surfaces`, `colors-text`, `colors-accent`, `colors-threads`, `colors-status`, `colors-priority`
- spacing: `spacing-radii`, `spacing-elevation`, `spacing-scale`
- components: `comp-buttons`, `comp-badges`, `comp-issuecard`, `comp-inputs`, `comp-dossier`

**`ui_kits/`** — high-fidelity, interactive recreations (each with its own README)
- `weft-hub/` — the federation portfolio / doctrine landing (brand layer)
- `filigree-dashboard/` — the one real GUI: kanban board + issue detail click-thru
- `weft-cli/` — the agent-first terminal: scan, MCP dossier, governance verdict, the Lacuna tour

**Fonts:** JetBrains Mono and Space Grotesk are **bundled locally** in `fonts/`
as variable TTFs (with their `OFL.txt` licenses) and wired via `@font-face` in
`colors_and_type.css`, so the whole system renders offline. Both are
OFL / open-source, imported from `google/fonts`.
