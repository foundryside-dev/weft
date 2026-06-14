# Warpline documentation review — website-readiness assessment

**Reviewed:** 2026-06-14
**Reviewer:** Documentation Critic (doc-critic agent)
**Scope:** Uncommitted doc set in `/home/john/warpline/` — `docs/index.md`,
`docs/getting-started.md`, `docs/concepts/` (index, temporal-vs-graph, sei,
blast-radius, advisory-not-gating, degrade), `docs/reference/cli.md`,
`docs/reference/mcp-tools.md`, `docs/federation.md`, `README.md`,
`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `mkdocs.yml`.

---

## Verdict

The freshly-authored doc set substantively clears the IA's hard blocker. The
four gaps the IA named — thin README, absent CLI/MCP reference, absent
federation-seam docs, absent usage cheat-sheet material — are all present and
credible in the new set. The **warpline repo itself** now has enough public
documentation to source `warpline.foundryside.dev`; the site can be built from
this material. Two residual items matter for website-sourcing readiness: the hub
still lacks `products/warpline.md` (the hub-side cheat-sheet the IA listed as
gap item 1), and `mkdocs.yml` has two concrete deployment errors (`site_url`
path and dark-first theme) that will break the generated site. Neither is a doc
quality problem — both are config defects that prevent the site from deploying
correctly. Subject to those fixes, the doc set is of high quality: factually
accurate, voice-consistent, structurally complete, and honest about all
unverifiable claims.

---

## Findings by axis

### Axis 1 — Completeness + accuracy

**Overall:** The factual claims are well-grounded. All six MCP tool names, all
six schema ids, the `change_kind` enum, the error codes, the enrichment
vocabulary, and the exit codes were independently traced to executable source
and match. The high-risk sections the author flagged (FULL/DELTA snapshot path)
are handled correctly by documenting what the degraded answer looks like —
appropriate given no live loomweave index was available.

---

**Finding A1-1 — Minor — Schema ids: six present and verified**

All six frozen schema ids documented in `docs/index.md`, `docs/reference/mcp-tools.md`,
and `README.md` match `src/warpline/commands.py` lines 24–29:

| Doc claim | Source constant | Match |
|---|---|---|
| `warpline.change_list.v1` | `SCHEMA_CHANGE_LIST` | yes |
| `warpline.entity_timeline.v1` | `SCHEMA_ENTITY_TIMELINE` | yes |
| `warpline.entity_churn_count.v1` | `SCHEMA_ENTITY_CHURN_COUNT` | yes |
| `warpline.impact_radius.v1` | `SCHEMA_IMPACT_RADIUS` | yes |
| `warpline.reverify_worklist.v1` | `SCHEMA_REVERIFY_WORKLIST` | yes |
| `warpline.edge_snapshot.v1` | `SCHEMA_EDGE_SNAPSHOT` | yes |

No action needed.

---

**Finding A1-2 — Minor — MCP tool names and shims: all verified**

`docs/reference/mcp-tools.md` lists six endorsed names and six shims.
Cross-checked against `src/warpline/mcp.py` `TOOL_SPECS` (lines 101–234):

| Endorsed | Shim (doc) | Shim (source) | Match |
|---|---|---|---|
| `warpline_change_list` | `changed` | `changed` | yes |
| `warpline_entity_timeline_get` | `timeline` | `timeline` | yes |
| `warpline_entity_churn_count_get` | `churn` | `churn` | yes |
| `warpline_impact_radius_get` | `blast_radius` | `blast_radius` | yes |
| `warpline_reverify_worklist_get` | `reverify` | `reverify` | yes |
| `warpline_edge_snapshot_capture` | `capture_snapshot` | `capture_snapshot` | yes |

No action needed.

---

**Finding A1-3 — Minor — `change_kind` enum: verified**

`docs/concepts/temporal-vs-graph.md` and `docs/reference/mcp-tools.md` document
`added | modified | removed | moved`. Source at `src/warpline/git.py` line 33:
`{"A": "added", "M": "modified", "D": "removed", "R": "moved"}`. Match is exact.

---

**Finding A1-4 — Minor — Error codes and retryability: verified**

`docs/reference/mcp-tools.md` error code table lists 11 codes with
`retryability` values. These match `src/warpline/errors.py` `ERROR_CODES`
frozenset (line 9–23) and the `retryability` attributes on each exception class.
All 11 codes present; all retryability values match.

---

**Finding A1-5 — Minor — Exit codes: verified**

`docs/reference/cli.md` exit code table verified against `src/warpline/cli.py`:

| Command | `0` | `1` | `2` | Source line |
|---|---|---|---|---|
| `install` | ok | errored | — | `return 0 if install_report.ok else 1` (line 207) |
| `doctor` | healthy | unhealthy | — | `return 0 if doctor_report.ok else 1` (line 217) |
| `dogfood-eval` | ready | — | not ready | `return 0 if payload["ready"] else 2` (line 288) |
| `mcp-smoke` | ok | — | not ok | `return 0 if payload["ok"] else 2` (line 292) |
| `productization-gate` | allowed | — | not allowed | `return 0 if decision.allowed else 2` (line 304) |

Match is exact.

---

**Finding A1-6 — Minor — Backfill JSON output shape: verified**

`docs/getting-started.md` shows `{"commits": 2, "sei": {"absent": 0,
"resolved": 0}}`. Source at `src/warpline/git.py` lines 114–133 returns exactly
that shape. Verified.

---

**Finding A1-7 — Major — FULL/DELTA snapshot path: appropriately hedged but
lightly signalled**

The author noted these paths could not be exercised live. The docs handle this
correctly: `docs/getting-started.md` step 5 shows `completeness: SKIPPED` and
`source_version: no_index` (the absent-loomweave case), then says *"with
loomweave present and indexed, the same call returns `completeness: FULL` (or
`DELTA` if some entities failed)"* with a pointer to `federation.md`. The
`docs/concepts/blast-radius.md` completeness table documents all four states.

However, the `DELTA` case — specifically the `failed_entities` field and its
structure — appears only in `docs/reference/mcp-tools.md` as
`"failed_entities": [{"locator": "...", "reason": "..."}]` (snapshot tool data
shape). The getting-started guide does not show a DELTA example or what
`failed_entities` looks like in a reverify answer. This is acceptable for an
authored-without-live-loomweave doc set, but a reader trying to handle `DELTA`
in a production integration has to assemble it from two separate sections.

**Fix:** Add a one-paragraph note in `docs/concepts/blast-radius.md` under the
`DELTA` row: *"A `DELTA` snapshot answer includes a `failed_entities` list naming
which entities were not captured and why — see the [MCP tool
reference](../reference/mcp-tools.md) for the `capture_snapshot` data shape."*
This turns a cross-reference hunt into a direct link. (Minor improvement; not a
blocker.)

---

**Finding A1-8 — Blocker — `mkdocs.yml` `site_url` has `/docs/` suffix**

`mkdocs.yml` line 3: `site_url: https://warpline.foundryside.dev/docs/`

The IA resolves `warpline.foundryside.dev` as a **domain root** (`/`) — not
`/docs/`. Each member's site deploys from its own repo with `base: /` and the
subdomain IS the docs home (IA §1.4: "Each member subdomain is that member's
full site — landing and docs"). A `site_url` with `/docs/` would generate all
internal links with that prefix and deploy the site under
`warpline.foundryside.dev/docs/`, leaving `warpline.foundryside.dev/` returning
404.

**Fix:** Change line 3 to `site_url: https://warpline.foundryside.dev/`. Also
requires a `CNAME` file containing `warpline.foundryside.dev` in the repo root
(and corresponding DNS record) before GH Pages deploys to this subdomain. A
docs deploy job is absent from `.github/workflows/`; CI only runs lint/tests.

---

**Finding A1-9 — Major — `mkdocs.yml` dark-first theme contradicts brand**

`mkdocs.yml` lines 11–19 configure `scheme: slate` (dark mode) as the default
by listing it first — the comment even says "Dark-first: slate is listed first,
so it is the default scheme." The IA is explicit (§2.1): *"No theme toggle is
specified by the design system (the brand is a single warm linen light theme —
'paper on a table'). Do NOT add a dark-mode toggle unless the owner asks."*

The MkDocs Material theme with a two-palette config always shows a toggle; the
dark slate palette is not the Weft brand palette at all. This is a config
mismatch with the brand — at minimum the default should be the `default` (light)
scheme, and the toggle should likely be removed pending the real Weft CSS.

**Fix:** If the interim MkDocs build is meant to be brand-approximate, remove
the palette block entirely (MkDocs Material light is closer to neutral) or at
minimum set `default` as the first (primary) scheme. Remove the dark-mode
toggle until the owner decides otherwise.

---

**Finding A1-10 — Minor — CLI command count vs. IA "seven CLI verbs"**

The IA §6 says the blocker requires *"the seven CLI verbs"*. The CLI reference
documents 16 subcommands, correctly categorised into four sections (lifecycle,
ingestion, query, engineering/gate). The seven user-facing verbs the IA
references are: `init`, `backfill`, `changed`, `timeline`, `blast-radius`,
`reverify`, `capture-snapshot` — all present in the docs. The additional
engineering commands (`dogfood-eval`, `mcp-smoke`, `productization-gate`,
`loomweave-probe`, `ingest-commit`, `session-context`, `install`, `doctor`) are
also documented, which is appropriate completeness. Not a gap — the CLI ref
exceeds the minimum.

---

**Finding A1-11 — Minor — No stale "heddle" naming found**

Searched all reviewed files for `heddle`. Zero occurrences. The rename (PDR-0022)
is clean in this doc set.

---

**Finding A1-12 — Minor — No stale hub path (`~/loom`) found**

No references to `~/loom` (old hub path). Hub is correctly referenced as weft
hub or not mentioned at all.

---

**Finding A1-13 — Minor — No `file:///` or `localhost` dead links**

All `warpline.foundryside.dev` URLs are live-pointing (no `file:///` or
`localhost` links in the public doc files). `CODE_OF_CONDUCT.md` references
`github.com/foundryside-dev/warpline/security/advisories/new` (the standard
Contributor Covenant enforcement URL) — this will be a live URL once the repo is
public; not a dead link today.

---

**Finding A1-14 — Minor — Hub still lacks `products/warpline.md`**

The IA §6 blocker item 1 specifically named `products/warpline.md` (in the **weft
hub**) as missing. The fresh doc set lives in the **warpline repo** (`docs/`),
which is correct and addresses the site-sourcing gap. However, `products/index.md`
in the weft hub still says *"Warpline is an admitted member; its usage cheat-sheet
is pending its implementation fast-follow"* (line 38). The hub-side cheat-sheet
gap is separate from the repo-side docs gap. The new repo docs clear the
website-sourcing blocker but do not author `products/warpline.md` in the hub.

This is not a defect in the reviewed doc set — but the hub index note becomes
stale once the warpline repo docs are committed. The hub's `products/index.md`
should be updated to point to the warpline repo docs once they ship.

---

### Axis 2 — Weft voice consistency

The doc set is voice-consistent. All CLI commands, schema IDs, env vars, and
paths are in monospace. No emoji in product copy. Second person throughout. Dry,
no hype adjectives. The advisory-only posture is stated early and often.

---

**Finding A2-1 — Minor — One passive-voice instance in `docs/getting-started.md`**

Line 10: *"Where a sibling (loomweave) would deepen the answer, the guide says
so and shows what the degraded answer looks like."*

This is not a strict passive-voice failure — it is the guide self-describing
itself in third person. It reads slightly distanced from the brand's direct
second-person style. The rest of the guide is consistently direct ("call it
first," "use the arguments `changed` handed back").

**Fix** (minor polish): *"Where loomweave would deepen the answer, you'll see
what the degraded output looks like."* Not blocking.

---

**Finding A2-2 — Pass — No overclaiming / no gate-language found**

Checked all seven concept pages and the federation doc for any slip into gate
language ("blocks", "enforces", "required", "must clear"). None found.
`advisory-not-gating.md` is the clearest expression of the posture in the
suite. The table contrasting "warpline does" vs "warpline does not" is
well-executed.

---

**Finding A2-3 — Pass — `absent` ≠ `unavailable` distinction consistently upheld**

All pages that discuss enrichment (`degrade.md`, `mcp-tools.md`, `blast-radius.md`,
`federation.md`) correctly distinguish the three values. The critical sentence in
`degrade.md` is exact: *"`absent` ≠ `unavailable`, and neither is ever a
transport error or an implied 'clean.'"* No conflation found.

---

**Finding A2-4 — Minor — `mkdocs.yml` uses dark/light mode toggle (brand violation)**

Already flagged in A1-9. Restated here: the brand says *"no emoji anywhere (brand
rule, not just a default)"* and *"no dark-mode toggle."* The MkDocs Material
toggle appears in the generated page; the `✓` and `!!` used in `install`/`doctor`
CLI output (shown in `docs/reference/cli.md`) are terminal output, not doc
decoration — those are acceptable.

---

**Finding A2-5 — Pass — No marketing hype found**

"Flagship," "game-changer," "powerful" — absent. The strongest positive claim is
"production-stable for its own surface, with caveats it states in the open" in
`docs/index.md` — honest framing, not hype.

---

### Axis 3 — Cross-repo terminology

---

**Finding A3-1 — Pass — SEI "consumed, never minted" framing: correct and consistent**

`docs/concepts/sei.md` is the authoritative statement. The framing
"warpline consumes SEI; it never mints it" appears in `docs/index.md`, `README.md`,
`docs/federation.md`, and `docs/concepts/sei.md`. Every instance is consistent and
correctly distinguishes warpline from Loomweave (the identity authority).
`warpline_entity_key_id` is correctly labelled "warpline-internal, not a federation
key" in both `sei.md` and `mcp-tools.md`.

---

**Finding A3-2 — Pass — `enrich-only / never load-bearing` framing: correct**

"enrich-only" appears in `README.md`, `docs/index.md`, and `docs/federation.md`.
No instance claims warpline is load-bearing for any sibling.

---

**Finding A3-3 — Pass — Thread color copper: correct**

No stale thread-color naming found. The design system assigns Warpline **copper**
(`--member-warpline`). No "Violet" or other stale color names appear anywhere in
the reviewed files. (The reviewed files do not contain thread-color styling — this
is a potential gap for the site build, but not a doc content error.)

---

**Finding A3-4 — Pass — Member names: consistent and current**

All five members referenced correctly as Loomweave, Filigree, Wardline, Legis,
and Warpline (Title Case in prose). No "heddle" residue. The filigree seam is
correctly described as "EARNED" (consumed by golden vectors, `warpline_worklist_ingest`
shipped in Filigree 3.0.0). Wardline and Legis seams correctly labelled
"RESERVED-SHAPE, non-binding."

---

**Finding A3-5 — Pass — `completeness`/`staleness` vocabulary: consistent**

`completeness: FULL | DELTA | NO_SNAPSHOT | SKIPPED` and `staleness.commits_behind`
appear consistently across `blast-radius.md`, `degrade.md`, `mcp-tools.md`,
and `getting-started.md`. The table in `blast-radius.md` is the clearest
rendition and uses the correct capitalization.

---

**Finding A3-6 — Minor — `docs/index.md` describes the Filigree seam as both "proven"
and "earned" without resolving the difference**

`docs/index.md` "Honest status" section, line ~144: *"The Loomweave inbound seam
is **proven and frozen** — real SEI resolution and edge capture against the live
sibling. The Filigree work-state read is **earned** (consumed by golden vectors)."*

The terms "proven" and "earned" are federation lifecycle vocabulary with distinct
meanings in the weft hub context ("PROVEN" = live-validated cross-member; "EARNED"
= golden-vector validated). The distinction is correct. However, the public docs
don't define these terms, so a reader unfamiliar with the federation lifecycle
vocabulary won't know what "proven" vs "earned" means here. `docs/federation.md`
does label the seams "PROVEN, FROZEN" and "EARNED" consistently.

This is acceptable — the distinction isn't critical for users to understand the
advisory posture. **No action required**, but if the docs grow a glossary, these
terms deserve entries.

---

### Axis 4 — Website-sourcing readiness

The IA blocker has been substantially cleared by the new doc set. Analysis
against the IA §5.1 member-page template blocks:

---

## Website-sourcing readiness table

| Template block (§5.1) | Status | Source in warpline repo |
|---|---|---|
| **0 — Nav + breadcrumb** | MISSING | Site-kit component (shared dep) — not a docs content gap |
| **1 — Hero** (one-line tagline, member dossier terminal, version snapshot) | SOURCED | `README.md` first sentence, `docs/index.md` lead; version `1.0.0` in `pyproject.toml` |
| **2 — What it is** (1–2 sentence job) | SOURCED | `docs/index.md` "What warpline is — and is not"; `README.md` opening para |
| **3 — Key capabilities** (3–5 items with signature component) | SOURCED | `README.md` Features section; `docs/reference/mcp-tools.md` tool table; `docs/concepts/blast-radius.md` for `FreshnessMeter` sourcing |
| **4 — Usage snapshot** (curated CLI/MCP quick-start) | SOURCED | `docs/getting-started.md` (full seven-step guide); `README.md` Quick start |
| **5 — How it composes** (pairings with status) | SOURCED | `docs/federation.md` authority split table + degrade table; `docs/index.md` federation section |
| **6 — Status + honest limits** | SOURCED | `docs/index.md` "Honest status" section; `docs/federation.md` seam labels (PROVEN/EARNED/RESERVED-SHAPE) |
| **7 — Links / pointers** | SOURCED | `README.md` Documentation table; `CONTRIBUTING.md`; `docs/federation/contracts.md` |
| **8 — CTA** ("see it on the specimen") | MISSING | No Lacuna reference in any reviewed doc. `lacuna.foundryside.dev` not linked. |
| **9 — Footer** | MISSING | Site-kit component (shared dep) — not a docs content gap |

---

**Finding A4-1 — Major — No Lacuna reference in any doc**

Template block 8 requires a CTA linking to `https://lacuna.foundryside.dev` ("see
it run against the specimen"). None of the reviewed docs reference Lacuna. The
site page can add this as static copy, but the warpline docs offer no supporting
prose about what running against Lacuna demonstrates. For a page that is
honest about implementation status (fast-follow consumers), this CTA matters —
it's where a reader can see the Filigree seam exercised.

**Fix:** Add one sentence to `docs/index.md` or `docs/federation.md` noting that
Lacuna (`lacuna.foundryside.dev`) demonstrates the Filigree consumer live.

---

**Finding A4-2 — Blocker — No docs deploy workflow; `mkdocs.yml` `site_url` wrong**

Already flagged in A1-8. The site cannot deploy correctly in its current state.
There is no GitHub Actions workflow in `.github/workflows/` that builds and
deploys the MkDocs site to GitHub Pages. `ci.yml` runs lint/typecheck/tests only;
`release.yml` runs CI + PyPI publish only. A `gh-pages` or similar deploy step is
absent. Combined with the `/docs/` `site_url` suffix error, the MkDocs site
cannot be published to `warpline.foundryside.dev/`.

**Fix:** Add a docs-deploy job to `ci.yml` (or a separate `docs.yml`) that runs
`mkdocs gh-deploy` (or MkDocs Material's GH Pages action) on push to `main`.
Correct `site_url`. Add a `CNAME` file at the repo root containing
`warpline.foundryside.dev`.

---

**Finding A4-3 — Minor — No shared `weft-mkdocs.css` / shared fonts**

No custom CSS, no `weft-mkdocs.css`, no IBM Plex Mono override in `mkdocs.yml`.
The IA and the author's own notes flag this as a parity gap (the site will look
like stock MkDocs Material rather than the Weft brand). This is acceptable as a
v1 ship — every member site is independently deployed and can pull in the shared
`@weft/site-kit` CSS when it exists. Not a blocker for content readiness.

---

**Finding A4-4 — Minor — No `SECURITY.md`**

`SECURITY.md` is absent. The `CODE_OF_CONDUCT.md` routes security reports to
`github.com/foundryside-dev/warpline/security/advisories/new` (GitHub's built-in
security advisory), which is functional even without a `SECURITY.md`. Given the
project's stated low-security posture (deconfliction-first, not security tooling),
this is a minor gap that follows GitHub conventions anyway. Not blocking for the
site.

---

**Finding A4-5 — Minor — No `.github/` issue templates**

No issue templates in `.github/ISSUE_TEMPLATE/`. The `CONTRIBUTING.md` documents
bug report fields in prose. For a launch-stage v1.0.0 project this is acceptable.
Not relevant to site sourcing.

---

**Finding A4-6 — Informational — Hub `products/warpline.md` still absent**

The hub-side usage cheat-sheet at `/home/john/weft/products/warpline.md` does not
exist. `products/index.md` still says "its usage cheat-sheet is pending its
implementation fast-follow." This is not a defect in the reviewed warpline repo
docs, but it means the hub's roster page for warpline is not yet authored and
the hub's `products/index.md` note will be stale once the warpline repo docs are
committed. The hub's note should be updated (and `products/warpline.md` authored)
after the warpline docs ship.

---

## Confidence Assessment

**Overall Confidence:** High

| Finding | Confidence | Basis |
|---|---|---|
| All 6 schema IDs correct | High | Verified against `commands.py` lines 24–29 |
| All 6 MCP tool names + shims correct | High | Verified against `mcp.py` TOOL_SPECS lines 101–234 |
| `change_kind` enum correct | High | Verified against `git.py` line 33 |
| Error codes correct (11 codes) | High | Verified against `errors.py` frozenset line 9–23 |
| Exit codes correct | High | Verified against `cli.py` return statements |
| Backfill output shape correct | High | Verified against `git.py` lines 114–133 |
| FULL/DELTA path — unexercised | Moderate | Docs handle degraded case correctly; live loomweave path untested by reviewer (consistent with author's note) |
| `site_url` is wrong | High | `mkdocs.yml` line 3 reads `https://warpline.foundryside.dev/docs/` |
| Dark-mode default contradicts brand | High | `mkdocs.yml` lines 11–15; IA §2.1 is explicit |
| Hub `products/warpline.md` absent | High | `ls /home/john/weft/products/` output; `products/index.md` line 38 |
| No Lacuna CTA anywhere | High | Full-text search across all reviewed docs |
| No docs deploy workflow | High | `.github/workflows/` contains only `ci.yml` and `release.yml` |

---

## Risk Assessment

**Implementation Risk:** Low-Medium
**Reversibility:** Easy

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| Site deploys to `/docs/` path, not root | High | Certain (config is wrong today) | Fix `site_url` to `https://warpline.foundryside.dev/` before first deploy |
| Default dark theme ships against brand | Medium | Certain | Remove palette block or set `default` scheme first |
| FULL/DELTA snapshot docs mislead users | Low | Low | Docs are hedged and honest; the risk is incompleteness, not incorrectness |
| Hub cheat-sheet note goes stale | Low | Certain after warpline docs commit | Update `products/index.md` and author `products/warpline.md` in hub |

---

## Information Gaps

The following would improve confidence in specific claims:

1. [ ] **FULL snapshot output shape live example** — the docs describe
   `completeness: FULL` and the `DELTA` case correctly, but no live output from a
   working loomweave integration was available to the reviewer (consistent with
   author's note). Validate once a loomweave index is wired.
2. [ ] **Downstream reverify output with `reason: downstream` entries** — the
   getting-started guide only shows a `NO_SNAPSHOT` reverify result. A live
   example with downstream entities and `via_edges` would strengthen the guide
   materially. Again consistent with author's note; validate with live loomweave.
3. [ ] **`WARPLINE_LOOMWEAVE_COMMAND` env var documented** — `README.md` and
   `docs/federation.md` mention the env var; `docs/reference/cli.md` mentions it
   in `capture-snapshot` and `backfill` flags. There is no single entry point
   that explains when to set it. Minor gap; no formal "environment variables"
   section exists.

---

## Caveats and required follow-ups

### Before deploying the site

You MUST:
- [ ] Fix `mkdocs.yml` `site_url` from `https://warpline.foundryside.dev/docs/`
  to `https://warpline.foundryside.dev/`
- [ ] Add a `CNAME` file to the repo root containing `warpline.foundryside.dev`
- [ ] Add a docs deploy workflow (e.g. `gh-pages` job) to `.github/workflows/`
- [ ] Remove or reconfigure the dark-first palette in `mkdocs.yml`

### Before calling the hub-side blocker fully cleared

- [ ] Author `products/warpline.md` in the weft hub and update
  `products/index.md` line 38

### Assumptions made

This review treated the new doc set as the complete authoring pass. It verified
all machine-checkable facts (tool names, schemas, error codes, exit codes, enum
values) against the executable source. The FULL/DELTA snapshot path was accepted
as correctly-hedged-but-unverifiable-live, consistent with the author's own note.

### Limitations

This review does not assess whether the MkDocs Material presentation is
brand-accurate to the Weft design system beyond the dark-mode finding — that is
a site-implementation concern, not a doc content concern. This review also does
not verify the `docs/federation/contracts.md` (excluded from the published nav in
`mkdocs.yml` `exclude_docs`) or the internal `docs/evidence/`, `docs/plans/`,
`docs/product/` directories.

---

## Priority recommendations

### Blocker (must fix before deploying site)

1. **`mkdocs.yml` `site_url`**: change to `https://warpline.foundryside.dev/`
   (`mkdocs.yml` line 3). Without this, all generated internal links and the GH
   Pages deploy target are wrong.
2. **Add docs deploy workflow**: `.github/workflows/` has no docs deploy job.
   Without this the site is never published.
3. **Add `CNAME` file**: required for GitHub Pages subdomain routing.

### Major (fix before launch)

4. **`mkdocs.yml` dark-mode default**: remove palette block or set light scheme
   first. Brand specifies no dark-mode toggle.
5. **Add Lacuna CTA**: add one sentence to `docs/index.md` or `docs/federation.md`
   referencing `lacuna.foundryside.dev` for the site's block 8 CTA.

### Minor (polish)

6. **Hub `products/warpline.md`**: author the hub-side cheat-sheet and update
   `products/index.md` note (weft hub, not warpline repo — out of scope for this
   doc set but the natural next step).
7. **`DELTA` case cross-reference**: add one sentence in `blast-radius.md` under
   the `DELTA` completeness row linking to the `capture_snapshot` data shape in
   `mcp-tools.md`.
8. **`WARPLINE_LOOMWEAVE_COMMAND` env var**: add a brief "environment variables"
   note to `docs/reference/cli.md` consolidating the env var's effect.
9. **`getting-started.md` passive-voice instance**: line 10, minor polish.

---

## Machine-readable summary

```json
{
  "overall_confidence": "High",
  "implementation_risk": "Medium",
  "reversibility": "Easy",
  "blocker_cleared": "yes_with_fixes",
  "ready": "with-fixes",
  "findings_by_severity": {
    "blocker": 2,
    "major": 3,
    "minor": 8
  },
  "blockers": [
    "mkdocs.yml site_url is /docs/ not root — deploy will be wrong",
    "No docs deploy GitHub Actions workflow — site cannot publish"
  ],
  "major_findings": [
    "mkdocs.yml dark-first palette contradicts brand (no dark-mode, light only)",
    "No Lacuna CTA in any doc (template block 8 unsourced)",
    "FULL/DELTA snapshot path unverifiable live — hedged correctly but thin"
  ],
  "factual_accuracy": "all_verified",
  "stale_naming": "none",
  "ia_blocker_cleared": "yes",
  "hub_cheatsheet_gap": "products/warpline.md still absent in weft hub"
}
```
