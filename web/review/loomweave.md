# Documentation review: Loomweave — website-readiness audit

**Date:** 2026-06-14
**Reviewer:** Documentation Critic Agent (doc-critic)
**Scope:** Public docs in `/home/john/loomweave/` for `loomweave.foundryside.dev`
**IA reference:** `/home/john/weft/web/information-architecture.md` §4.2.1, §5.1
**Voice reference:** `/tmp/design-extract/weft-design-system/project/readme.md` §2
**Terminology:** `/home/john/weft/registries/terminology.md`

---

## Verdict

Loomweave is the most documentation-ready member in the federation. It ships a
complete, deployed static site (`www/`) with five pages covering landing,
getting-started, concepts, an MCP tool reference, and a CLI reference — all in
HTML/CSS/JS, GitHub-Pages-ready, CNAME in place. The writing is largely on-voice
and technically grounded. **However, the site is not fully website-ready against
the IA's template as written.** The four headline gaps are: (1) the thread color
in `colors_and_type.css` is `aqua` (`#52C9B8`) — the pre-rename scheme — not the
canonical `indigo` (`--member-loomweave: var(--indigo-600)`) the IA and design
system now require; (2) all pages ship `data-theme="dark"` whereas the IA
mandates the suite's warm-linen **light** theme; (3) the install quick-start
references `TAG=v1.1.0` but that release does not exist yet (only `v1.0.0` is
tagged on GitHub, with `v1.1.0rc5` as the active RC); (4) the federation section
omits the Warpline pairing, which the IA requires stated as `planned`. One
structural issue crosses into the federation axiom: `index.html` uses the phrase
"load-bearing for the suite" for Loomweave's SEI role in a way that contradicts
the axiom ("enrich-only, never load-bearing") without qualifying that the phrase
is about SEI minting specifically, not about composition semantics.

---

## Axis 1 — Completeness + accuracy

### A1-1 · BLOCKER · Tool count inconsistency: `42+` (www) vs `46` (README)

`www/index.html` claims "42+ MCP tools" everywhere (eyebrow, hero stat, quick
start comment, product card, meta description, `www/tools.html` lede). The
README (line 70) says "a 46-tool MCP surface". The MCP surface audit
(`docs/implementation/2026-06-11-mcp-surface-audit.md` line 7) counts
"37 read tools + 5 write-gated" = 42 registered at the time of that audit.
`Cargo.toml` shows `version = "1.1.0-rc5"`, which is past the audit date.
The README's `46` cannot be verified against a live server count without
running `loomweave serve` + `tools/list`, but the README is newer than the
`42+` claim and both come from the same repo — they must be reconciled.

**Evidence:**
- `www/index.html` line 45: `"Rust core · 42+ MCP tools · local-first · v1.1.0"`
- `README.md` line 70: `"a 46-tool MCP surface"`
- Audit doc: `37 + 5 = 42` at audit time

**Fix:** Verify with `loomweave serve` + `tools/list` at `v1.1.0-rc5`. Update
the www to match. Qualify the count with "(see repo)" or use "~46 tools" with a
pointer — the IA template requires counts to be snapshots with repo pointers,
never bare restated facts (IA §5.1 template invariant 1).

---

### A1-2 · BLOCKER · Version in quick-start scripts references a non-existent release

Both `www/index.html` (line 144) and `www/getting-started.html` (line 56) use
`TAG=v1.1.0` in install instructions. `README.md` line 17 states: `"v1.0.0
remains the latest tagged GitHub Release"` and line 90 uses `TAG=v1.0.0`.
A user following the `www` install path will hit a 404 on the GitHub release asset.

**Evidence:**
- `www/index.html` lines 144-150: `TAG=v1.1.0`
- `www/getting-started.html` lines 56-63: `TAG=v1.1.0`
- `README.md` lines 17, 90: `v1.0.0 remains the latest tagged release`
- `Cargo.toml` line 22: `version = "1.1.0-rc5"` (RC, not tagged release)
- `www/README.md` line 74: explicitly notes "Version line normalised to 1.1.0"

**Fix:** Either (a) point to `v1.0.0` until `v1.1.0` is tagged, with a note that
`v1.1.0-rc5` can be built from source, or (b) display the version as a snapshot
with a repo pointer ("current release — see GitHub Releases"). `www/README.md`'s
stated rationale ("normalised to 1.1.0") is not sufficient justification when the
release does not exist.

---

### A1-3 · Major · "3 entity kinds" stat is misleading after Rust plugin addition

`www/index.html` hero stat (line 87-89) says "Entity kinds extracted: 3". The
`README.md` (lines 22-24) states the Rust plugin extracts modules, structs, enums,
traits, type aliases, consts, statics, macros, impls, and functions — far more
than 3. `www/concepts.html` (line 85) accurately explains the correct picture:
"Three kinds are extracted directly from source (function, class, module); subsystem
is a fourth derived kind." The stat block on the hero is ambiguous — it looks like
a total capability claim, not a Python-only or core-kind count. Given the Rust
plugin is now first-party and shipped, a reader evaluating the tool will be confused.

**Evidence:**
- `www/index.html` line 88: `<span class="stat-value">3</span>` with label "Entity kinds extracted"
- `README.md` lines 22-24: Rust plugin adds structs, enums, traits, type aliases, consts, statics, macros, impls, functions
- `www/concepts.html` line 85: explains 3 extracted + 1 derived (subsystem)

**Fix:** Remove or reframe the "3" stat. Alternatives: "3 core kinds + plugin-extended"
with a pointer to concepts, or replace this stat with a more durable fact (e.g.
"2 language plugins").

---

### A1-4 · Major · "load-bearing for the suite" language conflicts with the federation axiom

`www/index.html` contains two instances of the phrase "load-bearing for the suite"
applied to Loomweave (lines 66 and 105). The federation axiom — stated correctly
three lines later on line 188 — is "enrich-only, never load-bearing." The phrase
"Loomweave is the federation's identity authority" is accurate and does not
conflict; the problem is using the phrase "load-bearing" in an unqualified way. A
reader who sees "load-bearing for the suite" and then reads the axiom will be
confused about whether the axiom applies to Loomweave at all.

**Evidence:**
- `www/index.html` line 66: `<div class="t-label axiom-label">Why Loomweave is load-bearing for the suite</div>`
- `www/index.html` line 105: "Structural truth about the codebase — and, load-bearing for the whole suite, its identity authority."
- `www/index.html` line 188: "enrich-only — never load-bearing — when composed"

**Fix:** Replace "load-bearing for the suite" with phrasing that does not use the
forbidden term. The intended meaning is "identity-minting is Loomweave's exclusive
domain within the suite." A clear rewrite: "Why SEI minting is Loomweave's exclusive
domain" or simply "Why Loomweave is the suite's identity authority."

---

### A1-5 · Major · Warpline pairing absent from the federation section

`www/index.html` lists four federation bindings (Filigree, Wardline, Legis, Charter).
The Warpline+Loomweave pairing ("'now' + 'over time'") is omitted entirely. Per the IA
§4.2.1 and §2.2, this pairing is required on Loomweave's page, stated as `planned`
(seam frozen, impl fast-follow). Charter's pairing is listed as `planned · scaffold-state`
(present). Warpline's pairing is newer but is part of the live IA spec.

**Evidence:**
- `www/index.html` lines 206-211: lists four bindings; Warpline is absent
- IA §4.2.1: "pairings with ... Warpline ('now'+'over time', planned)"
- IA §2.2: "Warpline + Loomweave: 'now' + 'over time' — seam frozen, impl fast-follow"

**Fix:** Add the Warpline binding to the federation section, labelled `planned` and
with accurate status: seam contract frozen, consumer implementation fast-follow not
yet shipped.

---

### A1-6 · Minor · Concepts page doesn't document Rust-specific entity kinds

`www/concepts.html` documents the entity kinds table with four rows (function,
class, module, subsystem) but does not mention that the Rust plugin emits a
significantly richer kind set (struct, enum, trait, type alias, const, static,
macro, impl). The page notes Rust relation edges (`implements`/`derives`) but
does not tell an agent or developer what entity kinds to expect when analyzing
a Rust codebase. This is a documentation gap, not a factual error.

**Fix:** Add a note or collapsed row in the entity kinds table: "The Rust plugin
extends this set with `struct`, `enum`, `trait`, `type_alias`, `const`, `static`,
`macro`, `impl`. See `docs/operator/rust-known-limitations.md`."

---

## Axis 2 — Weft voice consistency

### A2-1 · BLOCKER · All pages use dark theme; IA mandates the light theme

Every HTML file in `www/` sets `data-theme="dark"`. The IA (§2.1, line 201-204)
is explicit: "the brand is a single warm linen **light** theme — 'paper on a
table'. Do **not** add a dark-mode toggle unless the owner asks; it is not in the
brand." The `www/README.md` justifies the dark theme as "Warm espresso is the
canonical 'Loom' theme" and treats it as a deliberate design decision — but this
directly contradicts the IA. The IA post-dates the www files and is the resolved
decision.

**Evidence:**
- `www/index.html` line 2: `<html lang="en" data-theme="dark">`
- Same on all four other pages
- `www/README.md` lines 57-59: documents dark-only as intentional
- IA §2.1 lines 201-204: "warm linen light theme... Do NOT add a dark-mode toggle"

**Fix:** Flip to `data-theme="light"` across all five pages and re-verify the
visual output. The design system's warm linen light theme is the required
surface. The "Loom" warm-espresso dark theme may be reconsidered by the owner,
but must not be shipped without their explicit sign-off against the IA.

---

### A2-2 · Major · Thread color is pre-rename `aqua`; canonical is now `indigo`

`www/colors_and_type.css` (line 92) defines `--thread-loomweave: #52C9B8` (aqua).
The `www/styles.css` (line 26) remaps `--accent` to this aqua value as the
Loomweave product thread. The `www/README.md` explicitly calls this "Aqua accent
remap." However, the design system's canonical `tokens/colors.css` (line 115)
sets `--member-loomweave: var(--indigo-600)`. The IA §3.1 roster table assigns
Loomweave **indigo**. The hub product page `products/loomweave.md` (line 7) says
"Aqua thread" — this is the known drift flagged in IA §3.1 drift note and §6 item 10.

This means the Loomweave site is currently using the pre-rename color scheme.
The `colors_and_type.css` in `www/` is an older version of the design system
that predates the rename from aqua/sky/coral/violet to indigo/brass/madder/walnut.
The file's own comment says it should be "copied VERBATIM from the design system"
— but it is not the current design system.

**Evidence:**
- `www/colors_and_type.css` line 92: `--thread-loomweave: #52C9B8; /* aqua */`
- Design system `tokens/colors.css` line 115: `--member-loomweave: var(--indigo-600);`
- IA §3.1 table: `loomweave | indigo (--member-loomweave)`
- IA §6 item 10: "Thread-color names are stale in `products/*.md`"
- `products/loomweave.md` line 7: "Aqua thread." (stale, per IA §6 note 10)

**Fix:** Re-copy `colors_and_type.css` from the current design system source.
Update `styles.css` to remap `--accent` from amber to indigo (not aqua). Update
`products/loomweave.md` line 7 to "Indigo thread." This is a known drift
item already logged in the IA.

---

### A2-3 · Minor · Nav links hub to GitHub repo, not `weft.foundryside.dev`

All pages link "Weft hub" to `https://github.com/foundryside-dev/weft`. The IA
resolves the hub to `weft.foundryside.dev`. The `www/README.md` notes "the hub
has no custom domain," which explains the current state. This is not a voice
error but a structural link that will need updating once the hub site ships. Flag
it as a pre-launch update item.

**Evidence:**
- `www/index.html` line 35: `href="https://github.com/foundryside-dev/weft"`
- IA §1.2: `weft.foundryside.dev` is the hub URL

**Fix:** Update to `https://weft.foundryside.dev/` after the hub site ships.
Leave as-is for now but note as a launch-gate update.

---

### A2-4 · Minor · Breadcrumb does not link back to hub

`www/getting-started.html`, `concepts.html`, `tools.html`, and `cli.html` all
show a breadcrumb of `Loomweave / <page>` where "Loomweave" links to `index.html`.
This is a within-site breadcrumb only. The IA §2.4 requires a **suite breadcrumb**
of `weft → loomweave` where `weft` links to `https://weft.foundryside.dev/`, so
a visitor knows they are in "one app within the Weft suite." The current breadcrumb
gives no signal that there is a hub.

**Evidence:**
- `www/getting-started.html` lines 40-42: breadcrumb links to `index.html` only
- IA §2.4: "Member... sites carry a lightweight breadcrumb under the nav: `weft → wardline` where `weft` links the hub"

**Fix:** Add a hub-linking first segment: `weft → loomweave → <page>` where the
`weft` segment links `https://weft.foundryside.dev/`. Deferred until hub site
ships; flag as a launch-gate update alongside A2-3.

---

## Axis 3 — Cross-repo terminology

### A3-1 · BLOCKER · `products/loomweave.md` thread color stale (Aqua, not Indigo)

Already captured in A2-2. The hub product cheat-sheet `products/loomweave.md`
line 7 reads "Aqua thread." The correct value per the design system and IA is
"Indigo thread." The IA §6 item 10 explicitly flags this drift. It affects how
the hub roster will render and what color the Loomweave site will use.

**Fix:** Update `products/loomweave.md` line 7 to "Indigo thread." (Hub repo,
not loomweave repo change.)

---

### A3-2 · Major · SEI and locator are correctly distinguished — verify one borderline case

The www docs correctly distinguish SEI (identity) from locator (address) throughout.
`www/concepts.html` (lines 90-104), `www/index.html` (lines 199-202), and
`www/concepts.html` (line 104) all get this right. One borderline case:
`www/index.html` line 112 reads "Functions, classes, modules — each addressed by
the 3-segment locator `{plugin_id}:{kind}:{qualname}`..." This is correct (uses
"addressed by"), not a violation.

**Verdict:** Terminology clean for SEI/locator distinction.

---

### A3-3 · Minor · Missing Warpline in member name list (concepts.html, line 104)

`www/concepts.html` line 104 states: "Loomweave is the authority/implementer —
Wardline, Filigree, Legis, and Charter are consumers that conform." Warpline is
a fifth member and an SEI consumer (its seam is frozen). It is absent from this
list, which names Charter (a planned non-member) but omits Warpline (an admitted
member). Per the terminology registry, Warpline is an admitted member; omitting
it here is incorrect.

**Evidence:**
- `www/concepts.html` line 104: lists Wardline, Filigree, Legis, Charter as SEI consumers
- Warpline admitted per PDR-0022 (2026-06-14); its Loomweave seam is frozen

**Fix:** Add Warpline to the consumer list with a qualifier: "Warpline (seam
frozen, implementation fast-follow)."

---

### A3-4 · Minor · "enrich-only" axiom labelled correctly in concepts but conflated in index

See A1-4. The voice/terminology audit here confirms: the word "load-bearing" is
a reserved term in the Weft vocabulary ("enrich-only / never load-bearing"). Using
it unqualifiedly for Loomweave in two places on the landing page is a terminology
violation regardless of the intent.

---

## Axis 4 — Website-sourcing readiness

The IA §5.1 member-page template defines 10 blocks (#0–#9). The table below maps
each block to what exists in the `www/` site today.

| # | Block | Status | Source or Gap |
|---|---|---|---|
| 0 | Nav + suite breadcrumb | PARTIAL | Nav exists and is well-structured (`www/index.html` lines 28-36). Breadcrumb on inner pages links within-site only; does not link to hub (IA §2.4 requirement unmet). |
| 1 | Hero (tagline, member dossier terminal, version snapshot) | PARTIAL | Hero exists (`www/index.html` lines 42-98). Tagline present. Version stated as `v1.1.0` but this release does not exist (A1-2). No `SeiTag` / `EnrichmentChip` component (IA §3.4, §3.5) — instead a plain `<span class="tag tag-ok">`. Dossier terminal not rendered. |
| 2 | What it is | SOURCED | `www/index.html` §owns (lines 101-135) covers entity extraction, edge graph, SEI minting, subsystem clustering, briefings, content_hash — clear and accurate. |
| 3 | Key capabilities | SOURCED | Concepts page (`www/concepts.html`) plus the owns-grid on the landing page provide thorough capability coverage. MCP tool families covered in `www/tools.html`. |
| 4 | Usage snapshot (CLI/MCP quick-start) | PARTIAL | Quick-start present on landing (`www/index.html` lines 139-175) and `www/getting-started.html`. Install instructions reference `TAG=v1.1.0` which is a non-existent release (A1-2). MCP call example present (`entity_neighborhood_get`). Otherwise content is complete. |
| 5 | How it composes (pairings) | PARTIAL | Federation section exists (`www/index.html` lines 178-213) with bindings for Filigree, Wardline, Legis, Charter. Warpline pairing absent (A1-5). No `MemberMark` / `Badge` components; uses prose and CSS classes. Pairing status not explicitly qualified as `live`/`partial`/`planned` — implied but not labelled. Loomweave+Filigree shown without the `partial` qualifier it requires per IA §4.2.1. |
| 6 | Status + honest limits | SOURCED | Known limitations from `README.md` are reflected in the README but are NOT reproduced in the `www/` pages. The `www/getting-started.html` has a troubleshooting table but does not surface Rust-analysis limits (parse-only, no macro expansion, narrow `references`) or the RC status. The honest-limits block is mandatory and non-empty per IA §5.1 template invariant 2 — this block is effectively missing from the www. |
| 7 | Links / pointers | SOURCED | Footer and nav link to GitHub, SEI standard, Weft hub. Adequate for current pre-hub-launch state. |
| 8 | CTA (Lacuna link) | MISSING | No link to `https://lacuna.foundryside.dev`. IA §5.1 block 8 requires "see it on the specimen" CTA. |
| 9 | Footer (global + roster row) | PARTIAL | Footer exists but does not include the roster link row (links to all five members + Lacuna) required by IA §2.5. Current footer links only to GitHub, Weft hub (GitHub), and SEI standard. |

---

## Specific improvements

### Issue A1-1: Tool count reconciliation

**Before** (`www/index.html` line 45):
```
Rust core · 42+ MCP tools · local-first · v1.1.0
```

**After**:
```
Rust core · ~46 MCP tools · local-first · v1.1.0-rc5 (see repo)
```

**Why:** README says 46; audit counted 42. Use the README's higher figure with a
tilde and a repo pointer (IA §5.1 template invariant 1). Verify against live
`tools/list` before finalizing.

---

### Issue A1-2: Version in install scripts

**Before** (`www/index.html` and `www/getting-started.html`):
```bash
TAG=v1.1.0
curl -L -o loomweave.tar.gz \
  "https://github.com/foundryside-dev/loomweave/releases/download/${TAG}/..."
```

**After**:
```bash
# Install from the current stable GitHub Release
TAG=v1.0.0
curl -L -o loomweave.tar.gz \
  "https://github.com/foundryside-dev/loomweave/releases/download/${TAG}/..."

# The v1.1 release candidate can be built from source — see README.
```

**Why:** `v1.1.0` is not tagged; the GitHub Releases API will 404. The README
correctly uses `v1.0.0`.

---

### Issue A1-4: "load-bearing for the suite" phrasing

**Before** (`www/index.html` line 66):
```html
<div class="t-label axiom-label">Why Loomweave is load-bearing for the suite</div>
```

**After**:
```html
<div class="t-label axiom-label">Why SEI minting is Loomweave's exclusive domain</div>
```

**Why:** "load-bearing" is the exact term the federation axiom forbids. The
intended meaning is expressible without the forbidden term.

---

### Issue A2-1: Dark theme correction

**Before** (all five HTML files):
```html
<html lang="en" data-theme="dark">
```

**After**:
```html
<html lang="en" data-theme="light">
```

**Why:** IA §2.1 is unambiguous: the brand is a warm linen light theme. The
`www/README.md`'s "dark-only" decision predates the IA and is superseded by it.

---

### Issue: Honest limits block (missing from www)

Add a "Known limits" section to `www/index.html` below the quick-start, or on a
dedicated status page. Minimum content (sourced from `README.md` lines 49-66):

```
- Rust analysis is parse-only. Macro expansions and external-crate edge targets
  are not resolved. Closures and nested functions fold into the nearest named item.
- Rust `references` has a narrow deferred envelope. Match/let patterns and
  enum-variant discriminant expressions not emitted yet.
- v1.1.0 is an active release candidate (rc5); v1.0.0 is the latest tagged release.
- Public registries (PyPI / crates.io) are not the release source yet. Tagged
  GitHub Releases remain canonical.
```

---

## Website-sourcing readiness table

| Member-template block | Status | Source location | Gap |
|---|---|---|---|
| Hero/positioning | PARTIAL | `www/index.html` lines 42-98 | Version incorrect (A1-2); no `SeiTag`/`EnrichmentChip` design-system components; "load-bearing" language violation (A1-4) |
| What it is | SOURCED | `www/index.html` #owns section | Accurate, complete |
| Key capabilities | SOURCED | `www/concepts.html`, `www/tools.html`, `www/cli.html` | Rust entity kinds understated on landing stat (A1-3) |
| CLI snapshot | SOURCED | `www/cli.html` | Accurate with `--help` pointer; minor: guidance subcommand not fully documented inline |
| MCP tool reference | SOURCED | `www/tools.html` | Tool count inconsistency 42 vs 46 (A1-1); `entity_resolve` not in navigation table (verify against live surface) |
| Composes/pairings | PARTIAL | `www/index.html` federation section | Warpline pairing missing (A1-5); Loomweave+Filigree not labelled `partial`; no `live`/`partial`/`planned` badges |
| Honest limits | MISSING | README.md lines 49-66 | Not reproduced in any www page; required by IA §5.1 template invariant 2 |
| Links/install | PARTIAL | Nav + footer | Install URL broken (A1-2); hub link points to GitHub not `weft.foundryside.dev` (pre-launch acceptable) |
| Lacuna CTA | MISSING | Nowhere in www/ | IA §5.1 block 8 requires this; none present |
| Footer roster row | MISSING | Nowhere in www/ | IA §2.5 requires links to all members + Lacuna; current footer has 3 links only |

---

## Priority recommendations

### Blockers (fix before publishing to `loomweave.foundryside.dev` as suite-integrated site)

1. **A2-1 · Dark theme.** Flip `data-theme` to `"light"` across all five HTML files. The IA decision is unambiguous.
2. **A1-2 · Version mismatch.** Change install scripts from `TAG=v1.1.0` to `TAG=v1.0.0` (current stable release). Add RC note.
3. **A2-2 / A3-1 · Thread color.** Re-copy `colors_and_type.css` from the current design system (which uses `--member-loomweave: var(--indigo-600)`, not aqua). Update `styles.css` accent remap to indigo. Fix `products/loomweave.md` line 7.

### Major (fix before IA-complete launch)

4. **A1-1 · Tool count.** Verify actual count at `v1.1.0-rc5`; align README and www; add repo pointer per IA template invariant.
5. **A1-4 · "Load-bearing" terminology violation.** Replace in two locations on `www/index.html`.
6. **A1-5 · Warpline pairing missing.** Add to federation bindings, labelled `planned`, with accurate status.
7. **Honest limits block.** Source from `README.md` §Known limitations; add to www landing page or a status section.
8. **Lacuna CTA (block 8).** Add "see it on the specimen → `https://lacuna.foundryside.dev`" to at least the landing page.
9. **Footer roster row.** Add member links per IA §2.5.

### Minor (polish)

10. **A1-3 · "3 entity kinds" stat.** Reframe to avoid misleading readers about Rust plugin's richer kind set.
11. **A1-6 · Rust entity kinds in concepts.** Add a note listing Rust-specific kinds.
12. **A2-3 / A2-4 · Hub URL + breadcrumb.** Update to `weft.foundryside.dev` when hub site ships; add suite-level breadcrumb segment then.
13. **A3-3 · Warpline in SEI consumer list.** Add to `www/concepts.html` line 104.

---

## Confidence assessment

**Overall confidence:** High

| Finding | Confidence | Basis |
|---|---|---|
| Dark theme vs IA mandate | High | IA §2.1 explicit; `data-theme="dark"` verified in all 5 files |
| Version mismatch (TAG=v1.1.0 vs v1.0.0 release) | High | Verified in `www/index.html`:144, `www/getting-started.html`:56, `README.md`:17,90, `Cargo.toml`:22 |
| Thread color (aqua vs indigo) | High | `www/colors_and_type.css`:92 (aqua), design system `tokens/colors.css`:115 (indigo), IA §3.1 (indigo) — three-source cross-check |
| Tool count mismatch (42 vs 46) | Moderate | `README.md`:70 says 46; audit says 42; www says 42+; cannot verify against live `tools/list` in this review |
| "Load-bearing" terminology violation | High | `www/index.html`:66,105 vs `www/index.html`:188 (axiom) — same file, direct contradiction |
| Warpline pairing missing | High | IA §4.2.1 requires it; `www/index.html` federation section verified absent |
| Honest limits block missing from www | High | README §Known limitations verified; searched all 5 www pages |
| Lacuna CTA missing | High | Searched all 5 www pages; IA §5.1 block 8 requires it |
| Footer roster row missing | High | Verified footer content in `www/index.html`:249-271 |

---

## Risk assessment

**Implementation risk:** Low
**Reversibility:** Easy (HTML/CSS changes; no data or schema migrations)

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| Broken install path from `TAG=v1.1.0` | High | Certain (release not tagged) | Fix immediately to `v1.0.0` |
| Dark theme contradicts IA design system | Medium | Certain (if IA is the spec) | Owner should confirm once before flip; it is a visual change |
| Thread color remap ripples to all member-colored elements | Low | Medium | Re-copy full `colors_and_type.css`; visual verify before publish |

---

## Information gaps

1. **Live tool count at v1.1.0-rc5.** Running `loomweave serve` + `tools/list` against the current binary would resolve the 42-vs-46 discrepancy definitively.
2. **Owner ruling on dark-vs-light theme.** The IA and the www README contradict each other; the IA post-dates the www files. This review treats the IA as authoritative, but the owner should confirm before a visual-destructive change.
3. **Technical accuracy of `entity_resolve`.** The navigation table in `www/tools.html` lists `entity_resolve` in the README family table but it does not appear in the www tools page. Whether this tool exists in the current surface requires a live `tools/list` check.

---

## Caveats and required follow-ups

### Before relying on this analysis

- [ ] Run `loomweave serve` + `tools/list` at `v1.1.0-rc5` to verify the actual tool count and confirm tool names match what `www/tools.html` documents.
- [ ] Owner confirmation on the light-vs-dark theme decision (IA says light; www was built dark-first).
- [ ] Verify `TAG=v1.1.0` is still not tagged on GitHub before publishing; if it ships before the site update, A1-2 becomes moot.

### Assumptions made

- The IA (`web/information-architecture.md`) is authoritative over the existing `www/README.md` where they conflict, because the IA post-dates the www build and is the per-subdomain IA spec.
- Technical facts were verified against executable source (`Cargo.toml`, `README.md`, `docs/implementation/2026-06-11-mcp-surface-audit.md`) rather than prose only.

### Limitations

- Technical accuracy of MCP tool parameter schemas was not verified against source code (would require reading `crates/loomweave-mcp/src/lib.rs`).
- The `guidance` CLI subcommand documentation in `www/cli.html` is thin (one paragraph, no flags table); this may be intentional for a deferred surface but was not verified against the Rust source.
- This review does not assess accessibility (WCAG compliance) or performance.

---

## Machine-readable summary

```json
{
  "document": "loomweave — www/ public site",
  "review_date": "2026-06-14",
  "overall_confidence": "High",
  "implementation_risk": "Low",
  "reversibility": "Easy",
  "severity_counts": {
    "blocker": 3,
    "major": 6,
    "minor": 5
  },
  "blockers": [
    "Dark theme: data-theme=dark contradicts IA §2.1 light-theme mandate",
    "Version mismatch: TAG=v1.1.0 in install scripts; release does not exist (v1.0.0 is latest tagged)",
    "Thread color: aqua (#52C9B8) in colors_and_type.css vs indigo (--member-loomweave) in design system and IA"
  ],
  "top_gaps_for_site_builder": [
    "Honest limits block: missing from all www pages; source README.md lines 49-66",
    "Lacuna CTA: no link to lacuna.foundryside.dev anywhere in www",
    "Footer roster row: no member links; IA §2.5 requires them",
    "Warpline pairing: missing from federation section; add as planned"
  ],
  "ready": "with-fixes"
}
```
