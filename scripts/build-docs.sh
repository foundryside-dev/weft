#!/usr/bin/env bash
# ============================================================================
# build-docs.sh — generate the mkdocs `docs/` tree WITHOUT touching the root
# authoritative markdown.
#
# WHY: the Weft hub keeps its source-of-truth markdown at the REPO ROOT
# (doctrine.md, members/*.md, ...), but mkdocs needs a `docs_dir`. Rather than
# move or duplicate the SoT into a committed `docs/`, this script MIRRORS the
# root markdown into a generated, gitignored `docs/` at build time. The mirror
# preserves layout (`members/`, `registries/`) so existing relative links like
# `./foo.md`, `../sei-standard.md`, and `./members/loomweave.md` resolve unchanged.
#
# The script is RE-RUNNABLE and IDEMPOTENT: it wipes and regenerates `docs/`
# every run. It never writes outside `docs/`. It never edits the root markdown.
#
# Generated-copy rewrites (allowed — these touch docs/, never the root):
#   - docs/README.md gets a `template: home.html` front-matter prepended, so the
#     site root index renders the custom landing (overrides/home.html). This also
#     avoids the README.md/index.md → index.html collision (we use README, not a
#     separate index.md).
#   - bare directory links `](./members/)` and `](./design-system/)` (not valid
#     page targets under `mkdocs build --strict`) are rewritten to GitHub URLs.
# ============================================================================
set -euo pipefail

# Resolve repo root from this script's location (scripts/ is one level down).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DOCS="${ROOT}/docs"
REPO_URL="https://github.com/foundryside-dev/weft"

cd "${ROOT}"

echo "build-docs: regenerating ${DOCS}/ (mirror of root markdown)"

# 1. Clean slate (idempotent).
rm -rf "${DOCS}"
mkdir -p "${DOCS}" "${DOCS}/members" "${DOCS}/registries" "${DOCS}/design-system"

# 2. Mirror root authoritative markdown (read-only sources; copied verbatim).
#    Root *.md (top-level only — not recursive).
for f in "${ROOT}"/*.md; do
  [ -e "$f" ] || continue
  cp "$f" "${DOCS}/$(basename "$f")"
done

#    members/*.md and registries/*.md — preserve subdir layout for relative links.
cp "${ROOT}"/members/*.md       "${DOCS}/members/"     2>/dev/null || true
cp "${ROOT}"/registries/*.md    "${DOCS}/registries/"  2>/dev/null || true

#    design-system/README.md is a link target (from THEMING.md). It has no
#    onward markdown links, so mirroring just the README is strict-safe.
cp "${ROOT}"/design-system/README.md "${DOCS}/design-system/README.md"

# 3. Home wiring: prepend the home template front-matter to the GENERATED
#    README copy. README.md → site root index.html; home.html renders the
#    landing; `./README.md` / `../README.md` links still resolve to the home.
README_GEN="${DOCS}/README.md"
tmp="$(mktemp)"
{
  printf -- '---\n'
  printf -- 'template: home.html\n'
  printf -- 'hide:\n'
  printf -- '  - navigation\n'
  printf -- '  - toc\n'
  printf -- '---\n'
  cat "${README_GEN}"
} > "${tmp}"
mv "${tmp}" "${README_GEN}"

# 4. Rewrite bare-directory links in the GENERATED copies only (these are not
#    valid mkdocs page targets and would warn under --strict). Point them at the
#    GitHub tree so the reference still resolves for a reader.
#    Targets:  ](./members/)        ->  GitHub tree/main/members
#              ](./design-system/)  ->  GitHub tree/main/design-system
#    Use a portable in-place sed across all generated markdown.
#    Also fix a known stale in-doc anchor: contracts-index.md links to the
#    asterisk-register A-1 heading with a double-dash slug (`#a-1--wardline--...`)
#    that predates the current toc slugifier (which emits single dashes:
#    `#a-1-wardline-...`). The root doc is owned/edited elsewhere; we correct the
#    anchor ONLY in the generated copy so the link resolves and --strict passes.
A1_BAD='a-1--wardline--filigree-findings-are-pipeline-coupled-through-loomweave'
A1_GOOD='a-1-wardline-filigree-findings-are-pipeline-coupled-through-loomweave'
find "${DOCS}" -name '*.md' -type f -print0 | while IFS= read -r -d '' md; do
  sed -i \
    -e "s#](\./members/)#](${REPO_URL}/tree/main/members)#g" \
    -e "s#](\./design-system/)#](${REPO_URL}/tree/main/design-system)#g" \
    -e "s#${A1_BAD}#${A1_GOOD}#g" \
    "$md"
done

# 5. Copy the landing assets as a UNIT into docs/_home/ so colors_and_type.css's
#    relative url('fonts/...') resolves. Marks are inline SVG in home.html, so we
#    only need styles.css, colors_and_type.css, main.js and fonts/.
mkdir -p "${DOCS}/_home"
cp "${ROOT}/www/styles.css"            "${DOCS}/_home/styles.css"
cp "${ROOT}/www/colors_and_type.css"   "${DOCS}/_home/colors_and_type.css"
cp "${ROOT}/www/main.js"               "${DOCS}/_home/main.js"
mkdir -p "${DOCS}/_home/fonts"
cp "${ROOT}/www/fonts/JetBrainsMono-Variable.ttf"        "${DOCS}/_home/fonts/"
cp "${ROOT}/www/fonts/JetBrainsMono-Italic-Variable.ttf" "${DOCS}/_home/fonts/"
cp "${ROOT}/www/fonts/SpaceGrotesk-Variable.ttf"         "${DOCS}/_home/fonts/"

# 6. Copy the committed theme (weft-mkdocs.css + its bundled fonts) into docs/
#    so mkdocs.yml's `extra_css: stylesheets/weft-mkdocs.css` resolves and the
#    @font-face url('fonts/...') paths (relative to the CSS) work.
mkdir -p "${DOCS}/stylesheets"
cp "${ROOT}/theme/weft-mkdocs.css" "${DOCS}/stylesheets/weft-mkdocs.css"
mkdir -p "${DOCS}/stylesheets/fonts"
cp "${ROOT}"/theme/fonts/*.ttf "${DOCS}/stylesheets/fonts/"

# 7. Disable Jekyll on the published artifact (GitHub Pages), harmless locally.
:> "${DOCS}/.nojekyll"

echo "build-docs: done. docs/ has $(find "${DOCS}" -name '*.md' | wc -l) markdown pages."
