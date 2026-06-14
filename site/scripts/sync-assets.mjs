// Copy the site-kit brand assets into the hub's public path.
//
// The kit's Nav/Footer/Layout reference the brand glyph at
// /_site-kit/weft-glyph.svg (and the favicon), so every consuming site must
// copy packages/site-kit/assets/* into public/_site-kit/ before build/dev
// (README "Copy the assets"). This runs automatically via the pre{dev,build}
// npm hooks. Resolved from @weft/site-kit so it works whether the kit is the
// local file: dep in node_modules or a vendored copy.
import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(here, '..');

// Prefer the installed package; fall back to the in-repo source (works pre-install).
const candidates = [
  join(siteRoot, 'node_modules', '@weft', 'site-kit', 'assets'),
  join(siteRoot, '..', 'packages', 'site-kit', 'assets'),
];
const src = candidates.find((p) => existsSync(p));
if (!src) {
  console.error('[sync-assets] could not find @weft/site-kit/assets in any of:\n  ' + candidates.join('\n  '));
  process.exit(1);
}

const dest = join(siteRoot, 'public', '_site-kit');
await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });
console.log(`[sync-assets] copied ${src} -> ${dest}`);
