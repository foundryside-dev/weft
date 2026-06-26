## Weft site-kit — how to build with it

`@weft/site-kit` is the shared design language of the Weft federation: a warm
"natural dyes on unbleached cloth" light theme (there is **no dark theme and no
toggle**), indigo as the primary, and honesty-first status UI where absence is
always explicit. All 13 components are real, compiled, plain-React components.

### Setup — one stylesheet, no provider

There is **no theme provider and no wrapper to mount**. Each component injects
its own component CSS at runtime; you only need the token layer on the page.
Link the single stylesheet entry **once**, before your app renders:

```html
<link rel="stylesheet" href="styles.css">
```

`styles.css` pulls in the token definitions, the component styles
(`_ds_bundle.css`), and the IBM Plex font faces (loaded from the Google Fonts
host). If text renders in a fallback font, that stylesheet isn't linked.

### The styling idiom — CSS custom-property tokens

This is a **token system**, not a utility-class system and not a props-styling
system. Components are pre-styled from the tokens; you style your **own layout
glue** (page grid, spacing, section surfaces) by referencing the same
`var(--token)` names so it sits on-brand. Never invent hex values or hardcode
fonts — read a token. The families you will reach for most:

- **Type:** `var(--font-sans)` / `var(--font-display)` (both IBM Plex Sans),
  `var(--font-mono)` (IBM Plex Mono — first-class: CLI output, JSON, SEI tokens,
  tool names). Sizes `--text-2xs … --text-6xl`; weights `--fw-regular/medium/semibold/bold`;
  role shorthands `--type-display`, `--type-h1`/`--type-h2`/`--type-h3`,
  `--type-body`, `--type-label`, `--type-mono`.
- **Text color:** `--text-heading`, `--text-body`, `--text-strong`,
  `--text-muted`, `--text-faint`, `--text-on-accent`, `--link`.
- **Surfaces / borders:** `--bg-page`, `--surface-card`, `--bg-sunken`;
  `--border-hairline`, `--border-strong`, `--border-focus`, `--ring` (focus ring).
- **Neutral spine:** `--linen-50…300` (paper), `--ink-400…700` (text),
  `--loom-800…950` (headings / inverted). **Primary:** `--indigo-50…700`.
- **Status:** `--ok` / `--warn` / `--danger` / `--info` and their `*-tint`
  backgrounds. **Members:** `--member-loomweave`, `--member-filigree`,
  `--member-wardline`, `--member-legis`, `--member-plainweave`, `--member-warpline`,
  `--member-lacuna` (each a thread color).
- **Spacing / shape / motion:** `--space-1…`, `--radius-sm/md/pill`,
  `--shadow-sm…`, `--dur-fast/mid/slow`, `--ease-out`.

### Where the truth lives

Read `styles.css` and its imports for the full token set, and
`components/<group>/<Name>/<Name>.prompt.md` (usage) + `<Name>.d.ts` (props) for
each component. Components mostly accept `className` and `style`, so you can add
layout without fighting them.

### The signature components

Beyond the basics (`Button`, `Badge`, `Tag`, `Input`, `Switch`, `Banner`,
`Tabs`), the **data** group is the brand-defining vocabulary — use it instead of
generic equivalents: `SeiTag` (opaque SEI token chip), `EnrichmentChip`
(closed federation enrichment state — `present`/`absent`/`unavailable`/… each
visually distinct, never collapsed into "ok"), `StateBadge` (Filigree
workflow-state pill), `ExitCode` (process 0/1/2 chip), `FreshnessMeter`
(completeness + staleness), `MemberMark` (a member by thread color + name).

### One idiomatic build

```jsx
import { Banner, StateBadge, MemberMark, Button } from '@weft/site-kit';

function ReviewHeader() {
  return (
    <section style={{ display: 'grid', gap: 'var(--space-4)', font: 'var(--type-body)', color: 'var(--text-body)' }}>
      <h2 style={{ font: 'var(--type-h2)' }}>Cutover readiness</h2>
      <Banner tone="warn" title="Freshness degraded">
        The Loomweave SEI spine is 38% stale — re-resolve before trusting identity.
      </Banner>
      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
        <MemberMark member="filigree" /> <StateBadge state="building" />
      </div>
      <Button>Re-resolve</Button>
    </section>
  );
}
```
