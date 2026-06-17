# design-sync notes — @weft/site-kit

Repo-specific gotchas for future syncs. Read this first.

## This package's shape

- **Source-only, no build.** `package.json` `exports` point at `./src/...`
  directly — there is no `dist/`. The converter bundles from a source entry.
- **`--entry ./.design-sync/bundle-entry.mjs`** (committed). This entry exists
  because the kit's token `:root` definitions live in `src/tokens/*.css`,
  reachable only through `src/tokens/styles.css`'s `@import` chain. The
  converter appends `cfg.cssEntry` RAW (it does not bundle `@import`s) and
  `copyTokens` only ships tokens from a *separate* `tokensPkg` — neither path
  inlines same-package token CSS. The entry `import`s the token stylesheet so
  esbuild inlines all 166 token defs into `_ds_bundle.css`. **Do not drop this
  entry** or designs render with undefined `var(--*)` colors. Keep
  `--entry .design-sync/bundle-entry.mjs` on every build/driver run.
- **`cfg.componentSrcMap` pins all 13 components.** Discovery returned
  `[ZERO_MATCH]` because the package declares its types only under
  `exports['.'].types` (`./src/components/index.d.ts`) — the converter's
  `findTypesRoot`/`projectFor` read top-level `pkg.types`/`typings` only, which
  is absent, so `getSourceFile(entry)` found nothing. **If a component is added
  to the kit, add it to `componentSrcMap`** (the map enumerates everything; it
  won't auto-discover). A cleaner permanent fix would be adding a top-level
  `"types": "./src/components/index.d.ts"` to the package's `package.json` —
  not done here to avoid mutating committed package source during a sync.
- **`cfg.dtsPropsFor` for Tabs + StateBadge.** `Tabs` referenced `TabItem`
  without inlining it (dangling type → incomplete contract); `StateBadge`'s
  `WorkflowState | string` collapsed to `string` (correct TS, but dropped the
  canonical vocabulary). Both bodies are hand-written to be self-contained.

## Toolchain

- **node_modules in the package dir.** The dts parser (ts-morph) walks UP from
  the package dir for `node_modules/@types/react`, ignoring `--node-modules`.
  So `react` + `react-dom` + `@types/react` must be in
  `packages/site-kit/node_modules` (installed `--no-save --no-package-lock`).
  `--node-modules` points at `packages/site-kit/node_modules` (it also has
  `react` for the esbuild bundle).
- **playwright 1.60.0** pins chromium-1223, which is in `~/.cache/ms-playwright`
  (no download needed). The repo has no playwright pin of its own.
- **typescript** is installed in `.ds-sync/node_modules` to enable validate's
  `.d.ts` parse check.

## Styling / fonts

- Components self-inject their component CSS at runtime via a `useStyle` hook —
  **no provider / no wrapper needed**, just link `styles.css`.
- **Fonts are a remote Google Fonts `@import`** (IBM Plex Sans + IBM Plex Mono).
  `[FONT_REMOTE]` is expected and correct — nothing to ship in `fonts/`.
- `src/tokens/fonts.css`'s comment block still names **Space Grotesk**, but
  typography.css D4 (2026-06-15) RETIRED it — `--font-display` is now IBM Plex
  Sans, and the actual `@import` only loads the two Plex families. The comment
  is stale prose, harmless. No font gap.
- `tokens/`, `fonts/`, `guidelines/` come out empty (tokens are inlined into
  `_ds_bundle.css`; fonts are remote) — expected.

## Known render warns

- None. Render check is 13/13 clean.
- AVOID emoji glyphs in preview `icon=` props. A `⚠` emoji in a Banner preview
  tripped a harness-only caught pageerror (`[RENDER_ERRORS]`, flagged `bad`)
  that did NOT reproduce on direct load and rendered fine — replaced with a
  plain `!` text node. Use plain text / inline SVG for icon nodes in previews.

## Re-sync risks (watch-list)

- **Component adds won't be discovered** — they must be added to
  `componentSrcMap` (and a preview authored, else they ship the floor card).
  This is the single most likely silent gap on re-sync.
- **`bundle-entry.mjs` is tied to the source layout** — if `src/tokens/` or
  `src/components/index.js` move, update the entry's relative imports.
- **`dtsPropsFor` bodies are hand-written** against the current Tabs/StateBadge
  source — if those component APIs change, the pinned bodies go stale (re-check
  them against `src/components/.../*.d.ts`).
- **Remote fonts** load at runtime from the Google Fonts host — an offline /
  CSP-restricted render environment would fall back. The bundle ships no font
  files by design.
- **conventions.md** enumerates token names verbatim — re-run its validation
  (grep names against `_ds_bundle.css`) on any token-layer change.
