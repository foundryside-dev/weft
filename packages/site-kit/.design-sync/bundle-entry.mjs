// design-sync bundle entry (committed, durable).
// Why this exists: @weft/site-kit's token :root definitions live in
// src/tokens/*.css, reached only through src/tokens/styles.css's @import
// chain. The converter appends cfg.cssEntry RAW (it does not bundle @imports),
// and copyTokens only ships tokens from a SEPARATE tokensPkg — neither path
// inlines same-package token CSS. By importing the token entry here, esbuild
// follows its local @imports and inlines every token definition into
// _ds_bundle.css, so designs built with the kit get the tokens globally.
// (Component-specific CSS is injected at runtime by each component's useStyle,
//  and components.css is appended via cfg.cssEntry for static use.)
import '../src/tokens/styles.css';
export * from '../src/components/index.js';
