# @weft/site-kit

The shared Astro + React design kit every Weft suite website depends on. It is the
single source of visual and federation truth across the seven independently-deployed
subdomains (`weft`, `loomweave`, `filigree`, `wardline`, `legis`, `warpline`,
`lacuna`) — so seven separate builds read as one suite. See
[`web/information-architecture.md`](../../web/information-architecture.md) §1.3.

It ships four things:

1. **Tokens** — the light-theme CSS token layer (colours incl. all six member thread
   colours, type, spacing, elevation, the weave-grid motif, a base reset).
2. **Components** — the ported React primitives, ES-exported, including the signature
   `data/` vocabulary (`SeiTag`, `EnrichmentChip`, `FreshnessMeter`, `ExitCode`,
   `StateBadge`, `MemberMark`).
3. **Shared data** — `ROSTER`, `MATRIX`, `SEI_SPINE` (the "sites can't disagree"
   guarantee, IA §3). Author once, consume everywhere.
4. **Layout primitives** — `Layout.astro`, `Nav.astro`, `Footer.astro`, wired to the
   shared `ROSTER` so cross-subdomain links are generated, not hand-maintained.

> **Light theme only.** The brand is one warm linen light theme — "natural dyes on
> unbleached cloth". There is no dark theme and no toggle. (Terminal/well surfaces
> invert locally to `--loom-950`; that is not a page theme.)

---

## Install (git dependency)

Each member site lives in its own repo and pulls this kit in as a git dependency
(IA §1.3). The kit lives in the `weft` hub repo under `packages/site-kit`, so point
at that subdirectory:

```jsonc
// package.json of a consuming site (e.g. the loomweave repo)
{
  "dependencies": {
    "@weft/site-kit": "github:foundryside-dev/weft#main&path:/packages/site-kit"
  }
}
```

Exact git-dependency syntax depends on the package manager (npm/pnpm/yarn handle
subdirectory deps slightly differently); a vendored copy or a git submodule of
`packages/site-kit` works identically since the kit is self-contained. React 18+ and
`react-dom` are peer dependencies (Astro's React integration supplies them).

The kit ships **source** (`.jsx`, `.astro`, `.css`); the consuming Astro/Vite build
compiles it. Add the React integration to the consumer:

```bash
npx astro add react
```

### Copy the assets

The Nav/Footer/Layout reference the brand glyph at `/_site-kit/weft-glyph.svg`. Copy
the kit's `assets/` into your site's `public/_site-kit/` (a one-line build/copy step):

```bash
cp node_modules/@weft/site-kit/assets/* public/_site-kit/
```

---

## The 3-line version (what a consuming site actually writes)

```astro
---
import Layout from '@weft/site-kit/layouts/Layout.astro';      // 1 · layout (links tokens + component CSS)
import { SeiTag, EnrichmentChip } from '@weft/site-kit/components'; // 2 · components, as islands
import { ROSTER, MATRIX, pairingsFor } from '@weft/site-kit/data';  // 3 · shared federation data
---
<Layout title="Loomweave" member="loomweave" breadcrumb>
  <SeiTag client:visible value="loomweave:eid:7f3a9c2e1b4d" copyable />
  {pairingsFor('loomweave').map((p) => <EnrichmentChip client:visible state={p.status === 'live' ? 'present' : 'absent'} peer={p.b} />)}
</Layout>
```

`Layout.astro` already imports the token layer (`tokens/styles.css`) and the
component CSS (`components.css`) for you. Build the hub with no `member` prop; build a
member/showcase site with `member` + `breadcrumb`.

---

## Linking the tokens CSS directly

If you are not using `Layout.astro` (e.g. a bespoke page) link the CSS yourself.
Order matters — tokens first, then components:

```astro
---
import '@weft/site-kit/styles.css';      // tokens: fonts → colors → type → spacing → elevation → base
import '@weft/site-kit/components.css';   // component styles (for SSR-rendered island HTML)
---
```

Or from plain HTML/CSS: `@import '@weft/site-kit/tokens/styles.css';`.

Individual token files are reachable at `@weft/site-kit/tokens/colors.css`, etc.

### Why two CSS files?

The React components inject their own styles at runtime (id-guarded `<style>`), so
they work as bare React. But that injection only runs **client-side after
hydration** — link `components.css` so the components are also styled in Astro's
**server-rendered** island HTML (before/without hydration). Harmless if both are
present; the runtime injection is duplicate-guarded.

---

## Using the components as Astro islands

The components are plain React reading CSS custom properties — framework-light by
design. Mount them with a `client:*` directive:

```astro
import { Button, Banner, FreshnessMeter } from '@weft/site-kit/components';

<Button client:idle variant="primary">Read the doctrine →</Button>
<Banner client:load tone="info" title="documentation only">Nothing called weft to install.</Banner>
<FreshnessMeter client:visible completeness={0.82} staleness="3 commits behind" label="impact radius" />
```

Static content that never changes can be rendered as plain markup using the same
CSS classes (e.g. `class="wf-badge wf-badge--ok"`) — no island needed. Use islands
where the component has behaviour (`SeiTag copyable`, `Switch`, `Tabs`).

| Group | Components |
|---|---|
| `core` | `Button`, `Badge`, `Tag` |
| `forms` | `Input`, `Switch` |
| `feedback` | `Banner`, `Tabs` |
| `data` (signature) | `SeiTag`, `EnrichmentChip`, `FreshnessMeter`, `ExitCode`, `StateBadge`, `MemberMark` (+ `WEFT_MEMBERS`) |

---

## Reading the shared data

```js
import {
  ROSTER,        // the 6 members (Charter `planned`), roster order
  LACUNA,        // the showcase specimen — NOT in ROSTER
  ADMITTED,      // the 5 live-core members + Warpline
  MATRIX,        // the combination matrix (honest live/partial/planned)
  SEI_SPINE,     // the SEI-spine explainer content
  FEDERATION_AXIOM,
  pairingsFor,   // (key) → this member's matrix slice (IA §2.2)
  partnerOf,     // (pairing, selfKey) → the partner key for cross-links
  memberUrl,     // (key) → https://{key}.foundryside.dev
} from '@weft/site-kit/data';
```

Each `ROSTER` entry carries `name`, `lang`, `domain`, `tagline`, `thread`
(the `var(--member-*)` token, identical to `tokens/colors.css`), `threadHex`,
`url` (its subdomain), `status`, and pointers (`repo`, `briefing`, `cheatsheet`).
The roster is interop-layer canon: surface facts that move (versions, tool counts,
rule lists) are **not** stored here — point at each member's repo for those.

A member site renders only its matrix rows: `pairingsFor('wardline')` returns the
four Wardline pairings; render each as `MemberMark(self) + MemberMark(partner)`,
the capability sentence, a `Badge` of `pairing.status`, and the partner `MemberMark`
as an absolute link to `memberUrl(partnerOf(pairing, 'wardline'))`. A
`partial`/`planned` pairing is never styled as `live`.

---

## Component-usage map (IA §3.5)

Which signature component carries the brand on which page:

| Component | Renders | Used on |
|---|---|---|
| `SeiTag` | a `scheme:eid:` identity token (indigo mono chip) | hub spine + hero; every member's identity note; Lacuna |
| `EnrichmentChip` | one enrichment slot (`present`/`absent`/`unavailable`/`stale`) | hub hero/spine; member dossier variants; Lacuna |
| `FreshnessMeter` | completeness bar + honest staleness line | Warpline (impact radius / churn), Loomweave (graph freshness), Lacuna |
| `ExitCode` | `0` clean / `1` gate tripped / `2` error chip | Wardline (its exit convention), Lacuna `make verify` block |
| `StateBadge` | Filigree workflow-state pill | Filigree page (its state machines); Lacuna tracked-work |
| `MemberMark` | thread-colour dot + mono member name | everywhere — roster, matrix, pairings, nav, footer |

The page templates these fill are specified in IA §5.1 (member), §5.2 (hub),
§5.3 (Lacuna showcase). This kit is what makes those templates fillable per repo.

---

## What is ported vs. authored-new

- **Ported** (from `weft-design-system/project/`): all six token files + the
  `styles.css` entry; all 14 React components verbatim (ES exports already; only the
  UI-kit `window.WeftDesignSystem` global was dropped — that was a design-tool
  artifact, never in the components); the brand SVG assets; `components.css` is the
  components' own `useStyle` CSS consolidated into one linkable file.
- **Authored-new**: the `ROSTER` / `MATRIX` / `SEI_SPINE` data modules (sourced from
  `federation-map.md`, `products/*.md`, `doctrine.md`, `tokens/colors.css`); the
  three `.astro` layout primitives; the package wiring and this README.

## Caveats carried from the design system

The visual identity is a *proposal* authored from brand voice, not sourced assets:
the logo/glyph are invented, fonts are Google-CDN substitutes, the palette is a
natural-dye reading of the loom metaphor, and the icon set (Lucide, when used) is a
substitution. Swap on real assets. No emoji anywhere (a brand rule).
