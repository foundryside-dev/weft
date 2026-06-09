import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes every emitted asset URL relative, so the static dist/ deploys
// to ANY GitHub-Pages subpath (e.g. /weft/app/) with no server and no rewrite.
// Routing is HashRouter (see src/main.jsx) so the document path never changes —
// `./`-relative asset URLs resolve identically on every route, including deep
// links like #/members/loomweave. See app/README.md "Static deploy".
export default defineConfig({
  base: './',
  plugins: [react()],
  // The design-system .jsx components are authored as plain JS with JSX; esbuild
  // needs to be told to parse JSX inside .jsx (default) — handled by the plugin.
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
