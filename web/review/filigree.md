# Documentation Review: Filigree — website-readiness for `filigree.foundryside.dev`

**Review date:** 2026-06-14
**Reviewer:** doc-critic (SME Agent Protocol)
**Sources read:** `README.md`, `docs/getting-started.md`, `docs/cli.md`, `docs/mcp.md`,
`docs/agent-integration.md`, `docs/workflows.md`, `docs/federation/index.md`,
`docs/federation/contracts.md`, `src/filigree/dashboard.py`, `src/filigree/core.py`,
`src/filigree/types/api.py`, `src/filigree/warpline_consumer.py`;
cross-referenced against `/home/john/weft/web/information-architecture.md` §4.2.2 and §5.1,
`/home/john/weft/registries/terminology.md`,
`/tmp/design-extract/weft-design-system/project/readme.md` §2.

---

## Verdict

Filigree's public doc set is **the strongest in the suite** and is approximately
website-ready for the hero, what-it-is, capabilities, CLI/MCP snapshot, and
SEI/federation composition blocks. The core technical content is sound: tool count
(`118`), dashboard port (`8377`), error codes, workflow state machines, and the
SEI consume-not-mint framing are all confirmed against executable source. Three
gaps block a clean launch without editorial intervention. First, **stale
provenance** in two files: `README.md` and `docs/federation/contracts.md` both point to
`~/loom` (the old hub path, now `~/weft`), and `contracts.md` lists the wrong
five members (`Charter` instead of `Warpline`). Second, **the Warpline↔Filigree
seam is implemented and documented in `docs/mcp.md` but is entirely absent from
`docs/federation/index.md`** — the federation composition doc Filigree would draw
on for the "How it composes" site block is missing this live binding entirely.
Third, `docs/agent-integration.md` still self-describes as covering "filigree 2.0"
throughout, while the shipped version is 3.0.0. None of these block the whole
site, but all three must be corrected before going live: the stale provenance
creates broken internal links, the Warpline absence misrepresents the pairing
status the IA requires be rendered honestly, and the version mismatch misleads
agent consumers reading the doc.

---

## Axis 1 — Completeness and accuracy

### Summary

| Section | Status |
|---|---|
| Landing / positioning copy | PRESENT — `README.md` §What Is Filigree |
| Getting-started | PRESENT — `docs/getting-started.md` |
| Concept docs (workflow, federation) | PRESENT — `docs/workflows.md`, `docs/federation/index.md` |
| CLI reference | PRESENT — `docs/cli.md` |
| MCP tool reference (~118 tools) | PRESENT — `docs/mcp.md` (confirmed 118 tools; source: `docs/mcp.md` line 3) |
| Agent integration doc | PRESENT but stale version header — `docs/agent-integration.md` |
| Federation / composition doc | PARTIAL — `docs/federation/index.md` missing Warpline binding |
| Web dashboard coverage | PARTIAL — mentioned in README and getting-started, no dedicated page |

---

**Finding A1 — blocker**

**Stale hub path `~/loom` appears in two public docs.**

`README.md` line 18: "The authoritative federation roster, axiom, and composition
doctrine live at the Weft hub (`~/loom`, see `~/loom/doctrine.md`)"

`docs/federation/contracts.md` line 23: `[the Weft federation](file:///home/john/weft/doctrine.md)` —
this is a `file:///` localhost URL, which would be a dead link on any published site.

The hub is now `~/weft`, not `~/loom`. Both references must be updated to
`https://github.com/foundryside-dev/weft` or equivalent public URL before the
doc can source a website.

**Fix:** In `README.md` line 18, replace both `~/loom` instances with
`~/weft`. In `docs/federation/contracts.md` line 23, replace the
`file:///home/john/weft/doctrine.md` href with
`https://github.com/foundryside-dev/weft/blob/main/doctrine.md`.

---

**Finding A2 — blocker**

**`docs/federation/contracts.md` names the wrong five members.**

`docs/federation/contracts.md` line 10: "5 realized members — Loomweave,
Filigree, Wardline, Legis, Charter"

Per the terminology registry and PDR-0022 (2026-06-14), the five admitted members
are: Loomweave, Filigree, Wardline, Legis, and **Warpline**. Charter is a planned
integration with federation adapters pending — not an admitted member. This
conflation misstates who is in the federation and misrepresents Charter's status.

**Fix:** Update the authority note in `docs/federation/contracts.md` line 10 to
"5 realized members — Loomweave, Filigree, Wardline, Legis, Warpline; Charter is
a planned Weft integration (adapters pending, not yet an admitted member); Shuttle
is a roadmap thought-bubble."

---

**Finding A3 — blocker**

**`docs/federation/index.md` has no Warpline↔Filigree binding section.**

The federation composition doc enumerates bindings for Loomweave, Wardline, Legis,
and Charter — but the **Warpline→Filigree seam (Seam 2A) is entirely absent**
despite being a live, shipped binding. The `warpline_worklist_ingest` MCP tool is
implemented (`src/filigree/warpline_consumer.py` confirmed) and documented in
`docs/mcp.md` lines 856–880. The IA at §4.2.2 requires the "How it composes"
block to show the Warpline pairing as `live`.

Without this section, any site block generated from `docs/federation/index.md`
would omit Filigree's only fully-live seam with the newest member.

**Fix:** Add a `### Warpline → Filigree — reverify worklist becomes tracked work`
section to `docs/federation/index.md` documenting Seam 2A: `warpline_worklist_ingest`,
the `warpline.reverify_worklist.v1` contract, the `apply=true` preview/apply
pattern, and the producer-label + entity-association loop. Status: `live` (consumer
shipped in Filigree 3.0.0). No asterisk currently noted — confirm with hub
asterisk-register before publishing.

---

**Finding A4 — major**

**`docs/agent-integration.md` self-describes as "filigree 2.0" throughout.**

The document title line 3: "This guide covers how foreground agents, background
subagents, and multi-agent teams interact with filigree 2.0." Lines 25, 29, 38,
42, 48, 158 all repeat "2.0" as the current version. The shipped version is 3.0.0
(confirmed `README.md` §3.0 Migration Snapshot; `pyproject.toml`).

This is the primary agent integration reference — every agent reading it gets told
they are on 2.0.

**Fix:** Update the document header and all "filigree 2.0" self-references to
reflect 3.0.0. The response envelope section and atomic-verb section content
appears otherwise current; the issue is purely the version label.

---

**Finding A5 — major**

**`docs/agent-integration.md` omits `LOOMWEAVE_OUT_OF_SYNC` from the error code list.**

Line 46 lists the error codes: `VALIDATION`, `NOT_FOUND`, `CONFLICT`,
`INVALID_TRANSITION`, `PERMISSION`, `NOT_INITIALIZED`, `IO`, `INVALID_API_URL`,
`FILE_REGISTRY_DISPLACED`, `REGISTRY_UNAVAILABLE`, `LOOMWEAVE_REGISTRY_VERSION_MISMATCH`,
`BRIEFING_BLOCKED`, `STOP_FAILED`, `SCHEMA_MISMATCH`, `INTERNAL`.

Source `src/filigree/types/api.py` line 481 confirms `LOOMWEAVE_OUT_OF_SYNC` is a
live `ErrorCode` enum member. It is also documented in the bundled skill
(`src/filigree/skills/filigree-workflow/SKILL.md` line 199) and in
`src/filigree/data/instructions.md` line 103. The public-facing `agent-integration.md`
is the one doc that omits it.

**Fix:** Add `LOOMWEAVE_OUT_OF_SYNC` to the error code list in
`docs/agent-integration.md` line 46, between
`LOOMWEAVE_REGISTRY_VERSION_MISMATCH` and `BRIEFING_BLOCKED`. Supply a note: "the
installed loomweave registry is present but out of sync; remediation is
`loomweave analyze`."

---

**Finding A6 — major**

**`docs/getting-started.md` shows stale `.filigree/` paths as the init output.**

Lines 42–48: the tutorial shows `Created .filigree/config.json` and
`Created .filigree/filigree.db` as the output of `filigree init`, and describes
the created directory as `.filigree/`. Per `src/filigree/core.py` line 326 and
`README.md` line 16, the canonical store since 3.0.0 is `.weft/filigree/`.
Legacy `.filigree/` stores are supported but the new default path is `.weft/filigree/`.
A new user following the getting-started tutorial will not see the shown output.

**Fix:** Update the tutorial output in `docs/getting-started.md` lines 42–48 to
show `.weft/filigree/config.json` and `.weft/filigree/filigree.db`. Add a brief
note that legacy `.filigree/` stores are auto-migrated on `filigree init`.

---

**Finding A7 — major**

**`docs/agent-integration.md` gives the stale path `.filigree/context.md`.**

Line 147: "Filigree generates a `context.md` file on every mutation, stored at
`.filigree/context.md`." The canonical path since 3.0.0 is `.weft/filigree/context.md`
(confirmed `src/filigree/core.py` lines 128, 135, 326).

**Fix:** Update line 147 to `.weft/filigree/context.md`. Note legacy path for
existing projects migrating.

---

**Finding A8 — minor**

**`docs/federation/contracts.md` contains a `file:///` localhost href visible to readers.**

Line 23: `[the Weft federation](file:///home/john/weft/doctrine.md)`. This is an
absolute localhost filesystem URL that will not resolve for any reader outside the
author's machine. It will appear as a broken link on the published docs site.

**Fix:** Replace with `https://github.com/foundryside-dev/weft/blob/main/doctrine.md`
(already the pattern used for other cross-repo links in the same file).

---

**Finding A9 — minor**

**`docs/mcp.md` intro (line 3) is not updated to show the 3.0.0 context.**

The intro states "The server provides 118 tools, 1 resource, and 1 prompt." The
tool count is confirmed in source and consistent across README and getting-started.
The 3.0.0 tool name namespacing change is noted in an `!!! note` box (lines 5–11).
No blocker, but that version callout box is specific enough to be of its note's
wording — "3.0.0 **removed** the legacy flat aliases" — that it would be worth
clarifying that this applies to anyone upgrading from 2.x. First-time readers on
3.0.0 do not need this note.

**Fix:** Add a brief "new in 3.0.0" label to the upgrade note so it is clearly
for upgraders and does not confuse new readers.

---

**Accuracy spot-check results (verified against source):**

| Claim | Source checked | Result |
|---|---|---|
| 118 MCP tools | `docs/mcp.md` line 3; `docs/getting-started.md` line 127 | Confirmed |
| Dashboard port `8377` | `src/filigree/dashboard.py` line 64 `DEFAULT_PORT = 8377` | Confirmed |
| Store path `.weft/filigree/` | `src/filigree/core.py` lines 131–135, 326 | Confirmed (new canonical); `.filigree/` is legacy |
| Task state machine `open → in_progress → closed` | `docs/workflows.md` | Confirmed |
| Bug hard-gate `verifying → closed` requires `fix_verification` | `docs/workflows.md` stateDiagram | Confirmed |
| Error codes list in `agent-integration.md` | `src/filigree/types/api.py` | Gap: missing `LOOMWEAVE_OUT_OF_SYNC` (Finding A5) |
| `LOOMWEAVE_OUT_OF_SYNC` exists in source | `src/filigree/types/api.py` line 481 | Confirmed present, not in docs |
| SEI "Filigree consumes, never mints" | `docs/federation/index.md` lines 64–65 | Confirmed correct framing |
| `warpline_worklist_ingest` tool name | `docs/mcp.md` line 864; `src/filigree/warpline_consumer.py` line 44 | Confirmed (renamed from `heddle_worklist_ingest` per PDR-0022) |
| Hub path reference `~/loom` | `README.md` line 18 | STALE — should be `~/weft` |
| Member count "5 including Charter" | `docs/federation/contracts.md` line 10 | WRONG — 5th member is Warpline, not Charter |

---

## Axis 2 — Weft voice consistency

**Finding V1 — minor**

**`README.md` uses "Why Filigree?" as a section heading.** This is a mild hype-question
format, but the section content that follows is forthright about fit ("It is not a
replacement for GitHub Issues or Jira"), honest about limits, and includes a
"When NOT to Use Filigree" section that is exactly on-voice. The heading phrasing
is the only voice-adjacent concern in the README.

**Fix (optional):** Reframe as "Is Filigree suitable for my project?" (which the
README already uses as the first sentence of that section) or simply remove the
"Why Filigree?" heading in favor of proceeding directly to the fit question.

---

**Finding V2 — minor**

**`README.md` "Filigree flips this" is on-voice; the surrounding prose holds the register well.**

Confirmed: no emoji in product copy across any reviewed doc. No hype adjectives
("revolutionary", "seamless", "powerful") found. The comparison table ("Filigree |
GitHub Issues | Jira") is precise and states "No" entries honestly. Voice is
consistently lowercase-comfortable for CLI verbs and mono for machine facts.

No voice blockers found beyond Finding V1.

---

**Finding V3 — minor**

**`docs/agent-integration.md` uses the phrase "2.0 envelopes" for a 3.0.0-era doc.**

This is partly a version-label issue (see Finding A4) but also a voice concern:
the voice rule is that status must be qualified with completeness and staleness.
Calling the current envelopes "2.0 envelopes" throughout signals an outdated
document. Agent-first readers calibrate accuracy by version signals.

**Fix:** Update version references as per Finding A4.

---

## Axis 3 — Cross-repo terminology

### Summary

| Term | Status |
|---|---|
| SEI framing (consume, never mint) | CORRECT — `docs/federation/index.md` lines 64–65 |
| "enrich-only / never load-bearing" | CORRECT — `docs/federation/index.md` line 11 |
| Member names (Loomweave, Wardline, Legis, Warpline) | PARTIAL — Warpline absent from `federation/index.md`; Charter listed as admitted in `contracts.md` (Finding A2) |
| Thread color: Filigree = **brass** | NOT FOUND — no thread-color naming in any public doc reviewed |
| `warpline_worklist_ingest` tool name | CORRECT — PDR-0022 rename reflected in `docs/mcp.md` |
| `heddle_worklist_ingest` stale name | NOT FOUND in public docs (only in rename map) — no drift here |
| `~/loom` hub path | STALE in `README.md` and `contracts.md` (Finding A1) |
| `generation` vocabulary | CORRECT — `docs/federation/index.md` uses "weft generation" correctly |
| `enrich-only` wording | CORRECT — confirmed in `docs/federation/index.md` |
| Warpline as admitted 5th member | MISSING from `federation/index.md`; wrong in `contracts.md` (Findings A2, A3) |

---

**Finding T1 — blocker (aligned with A2)**

**`docs/federation/contracts.md` lists Charter as the 5th admitted member.**

Per the terminology registry: "There are five admitted members: Loomweave,
Filigree, Wardline, Legis, and Warpline." Charter is "a planned Weft integration
(local core + read-only MCP shipped; federation adapters pending), not yet a full
member." The contracts doc says "5 realized members — Loomweave, Filigree,
Wardline, Legis, Charter" — placing Charter in the admitted roster and omitting
Warpline entirely. This is a direct registry violation.

**Fix:** see Finding A2.

---

**Finding T2 — minor**

**Thread-color naming for Filigree (`brass`) is not present in any public doc.**

The IA (§1.2, §3.1) specifies Filigree's thread color as **brass** and flags that
the `products/*.md` eyebrows use stale color names ("Aqua / Sky / Coral / Violet").
The Filigree repo docs do not currently name the thread color at all, so there is
no stale color name to correct in the Filigree repo itself. However, if the site
template requires a `thread` data field from the repo's own docs, this field is
missing from the public surface.

**Fix:** No immediate correction needed in the Filigree repo docs. The thread
color is consumed from the shared `@weft/site-kit` `ROSTER` data (IA §1.3, §3.1),
not from per-repo prose. The correction is a hub-side registry data task, not a
Filigree repo task.

---

**Finding T3 — major**

**`docs/federation/index.md` calls the Wardline→Filigree binding "shipping, asterisk live"
but does not link to the asterisk register with the A-1 identifier.**

The `!!! warning "Caveat — asterisk A-1 (LIVE)"` block at line 125–139 is
correctly honest about the asterisk status. The link at the end of the callout
(`asterisk-register.md A-1`) uses a relative path that will resolve within the
Weft hub but may not resolve when the doc is rendered on `filigree.foundryside.dev`.

**Fix:** Update the link to the full public URL:
`https://github.com/foundryside-dev/weft/blob/main/asterisk-register.md`.

---

## Axis 4 — Website-sourcing readiness

Reference: IA §4.2.2 (`/filigree` — Python · brass · work state · the dashboard)
and §5.1 (member-page template block contract).

| # | Template block | Status | Source in repo | Gap |
|---|---|---|---|---|
| 0 | Nav + breadcrumb | SOURCED | Shared site-kit (not in repo) | None — consumed from `@weft/site-kit` |
| 1 | Hero (tagline, version, member dossier terminal) | SOURCED | `README.md` first para + §Key Features; version `v3.0.0` | Version must be marked as snapshot+pointer per IA §5.1 invariant |
| 2 | What it is (job in 1–2 sentences) | SOURCED | `README.md` §What Is Filigree first 2 sentences | Strong source |
| 3 | Key capabilities (3–5 things) | SOURCED | `README.md` §Key Features bullet list | All 5 IA-required capabilities (atomic claiming, ready queue, MCP surface, entity-association, dashboard) are present |
| 4 | Usage snapshot (curated CLI/MCP quick-start) | SOURCED | `README.md` §Quick Start + `docs/getting-started.md`; note stale `.filigree/` path (Finding A6) | Fix A6 before sourcing the init output |
| 5 | How it composes (pairing cards) | PARTIAL | `docs/federation/index.md` covers Loomweave, Wardline, Legis; Warpline binding absent (Finding A3) | Warpline `live` pairing missing — blocks accurate "How it composes" block |
| 6 | Status and honest limits | SOURCED | `docs/federation/index.md` §anti-claims; asterisk A-1 callout; `docs/agent-integration.md` §Schema-Mismatch; `README.md` §Security boundary | Strong and on-voice; Wardline A-1 caveat is well-documented |
| 7 | Links / pointers | SOURCED | `README.md` §Documentation table; `docs/federation/index.md` §Further reading | `~/loom` stale path in README (Finding A1) and `file:///` URL in contracts (Finding A8) must be fixed |
| 8 | CTA ("see it on the specimen") | MISSING | No reference to `lacuna.foundryside.dev` or `https://lacuna.foundryside.dev` in any public doc | The Lacuna pointer for the CTA block has no source material in the repo; must be added or generated by the site template |
| 9 | Footer | SOURCED | Shared site-kit | None |
| — | **Dashboard feature block** (unique to Filigree per IA §4.2.2) | PARTIAL | `README.md` line 35 bullet + §How It Works mermaid diagram references `localhost:8377`; no standalone dashboard doc page | No dedicated dashboard doc page; no screenshot available in repo; the IA notes "caption as illustrative recreation" — site must supply its own screenshot or embed |

---

**Finding W1 — major**

**No dedicated dashboard documentation page exists.**

The IA at §4.2.2 identifies the dashboard as the unique feature block for Filigree's
site: "The dashboard (feature block, unique to this page) — a faithful crop of the
`filigree-dashboard` kit." The only dashboard documentation in the public docs is:
- `README.md` line 35: one bullet listing the dashboard as a Key Feature
- `docs/getting-started.md` lines 129–135: a 3-line "Optional Extras" subsection
  showing `filigree dashboard --port=8377`

There is no dedicated `docs/dashboard.md` page covering the Kanban / Graph v2 /
Files / Health views, the drag-and-drop behavior, server mode, or the multi-project
switcher. The IA §6 caveat 9 notes "the Filigree dashboard kit is recreated from
the README, not the shipping UI" — meaning the site's `filigree-dashboard` kit
visual is already an approximation.

**Fix:** Either (a) author a `docs/dashboard.md` page that the site can draw on
for the feature block, or (b) supply a real screenshot of `localhost:8377` for the
site to use. The site template can caption the kit recreation as "illustrative" if
no screenshot is available, but the textual sourcing for the feature block is thin.

---

**Finding W2 — major**

**No Lacuna CTA pointer in any public doc.**

The IA §5.1 block 8 requires: "see it on the specimen" → `https://lacuna.foundryside.dev`.
No mention of Lacuna exists in the Filigree repo's public docs. The site template
can inject this as a static CTA without sourcing it from the repo, but if a future
`context.md`-style auto-generation reads from doc content, the pointer is absent.

**Fix:** The site template should supply this CTA statically from the shared
`@weft/site-kit` template; no doc change needed unless the member template
requires the member repo to supply the CTA text.

---

**Finding W3 — minor**

**`README.md` hero tagline in IA vs repo.**

The IA §4.2.2 hero specifies: "Turns a swarm of stateless agents into a
coordinated workforce." The README opening line is: "Local-first issue tracker
designed for AI coding agents — SQLite, MCP tools, no cloud, no accounts." The
IA tagline is better-suited for the hero; the README line works as a subtitle.
The site does not need to copy the README line verbatim — the template is the
authoritative source for hero copy per IA §4.2.2.

**No fix required** in the repo. Site author should use the IA-specified tagline.

---

## Confidence Assessment

**Overall Confidence:** High

| Finding | Confidence | Basis |
|---|---|---|
| A1: stale `~/loom` path | High | Verified `README.md` line 18; `src/filigree/core.py` confirms `~/weft` is canonical |
| A2: wrong 5-member list in contracts.md | High | `docs/federation/contracts.md` line 10 read; terminology registry confirmed |
| A3: Warpline absent from federation/index.md | High | `docs/federation/index.md` fully read; `src/filigree/warpline_consumer.py` confirms live implementation |
| A4: "filigree 2.0" version labels in agent-integration | High | `docs/agent-integration.md` read; `README.md` confirms v3.0.0 is shipped |
| A5: LOOMWEAVE_OUT_OF_SYNC missing from error code list | High | `src/filigree/types/api.py` line 481 confirmed; `docs/agent-integration.md` line 46 confirmed absence |
| A6: stale `.filigree/` path in getting-started | High | `src/filigree/core.py` lines 131–135 confirm `.weft/filigree/` is current canonical |
| A7: stale `.filigree/context.md` in agent-integration | High | `src/filigree/core.py` line 128 `SUMMARY_FILENAME = "context.md"` in `.weft/filigree/` |
| A8: `file:///` localhost URL in contracts.md | High | Read directly from `docs/federation/contracts.md` line 23 |
| T3: asterisk-register link relative path | Moderate | Link is relative; whether it resolves depends on site rendering config |
| W1: no dedicated dashboard doc page | High | `find /home/john/filigree/docs -name "dashboard*"` returns nothing |
| W2: no Lacuna CTA pointer | High | No Lacuna mention found across all reviewed public docs |
| Dashboard port 8377 | High | `src/filigree/dashboard.py` line 64 `DEFAULT_PORT = 8377` |
| 118 MCP tools count | High | `docs/mcp.md` line 3; consistent with README |
| SEI consume-not-mint framing | High | `docs/federation/index.md` lines 64–65 explicit |

---

## Risk Assessment

**Implementation Risk:** Medium — most findings are editorial corrections to prose;
no behavioral or API changes required. Risk is that stale content ships unrevised.

**Reversibility:** Easy — all findings are prose corrections in markdown files;
no schema changes, no tooling changes, no breaking changes to consumers.

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| Stale `~/loom` path becomes a published dead link | High | Certain if unrevised | Fix A1 before any site build |
| Wrong member roster misleads federation consumers | High | Certain if unrevised | Fix A2 before any site build |
| Warpline pairing rendered as missing/planned when it is live | Medium | Certain if federation/index.md is used unrevised | Fix A3 |
| `file:///` URL published as-is | Medium | High | Fix A8 before any site build |
| Agent consumers reading 2.0 integration guide on 3.0.0 system | Medium | Moderate | Fix A4 |

---

## Information Gaps

1. **No MCP live tool count re-check against running server.** The 118 count is
   confirmed in docs and consistent across files but was not verified by running
   `filigree-mcp` and listing tool schemas. If tools have been added or removed
   since the last doc update, the count would be off. Confidence: High the count
   is current (multiple sources agree), but cannot be 100% verified statically.

2. **Lacuna CTA sourcing decision.** Whether the site template should inject the
   Lacuna pointer statically or whether each member repo must supply it is an
   open IA implementation question (IA §6 item 4). This review cannot resolve it.

3. **Dashboard screenshot availability.** The IA notes the dashboard kit is a
   recreation. Whether a real screenshot from `localhost:8377` is available for
   the site is an operational question the repo maintainer must answer.

4. **Asterisk A-1 retirement status.** The `docs/federation/index.md` callout
   correctly labels A-1 as LIVE, but the review did not re-verify the weft hub's
   `asterisk-register.md` to confirm it is still LIVE as of 2026-06-14. Treat
   as LIVE until confirmed retired.

---

## Caveats and Required Follow-ups

### Before using this doc set to build the site

You MUST:

- [ ] Fix `README.md` line 18: `~/loom` → `~/weft` (two occurrences)
- [ ] Fix `docs/federation/contracts.md` lines 10 and 23: correct member roster;
      replace `file:///` URL with public GitHub URL
- [ ] Add Warpline binding section to `docs/federation/index.md`
- [ ] Update `docs/agent-integration.md`: version labels from "2.0" to "3.0.0";
      add `LOOMWEAVE_OUT_OF_SYNC` to error code list; fix `.filigree/context.md` path
- [ ] Fix `docs/getting-started.md` init output to show `.weft/filigree/` paths

### Assumptions made

- The IA's §5.1 template treats the site author as supplying the hero copy and
  CTA from the IA spec itself, not strictly sourcing from the repo's README — so
  the mismatch between the README tagline and the IA's hero tagline (Finding W3)
  is not a blocker.
- The thread color `brass` is consumed from the shared `@weft/site-kit` ROSTER
  data, not from the per-repo docs — so no thread-color correction is needed in
  the Filigree repo.

### Limitations

- This review did not run the MCP server live to enumerate tools; tool count is
  cross-verified via docs only.
- `docs/architecture/` and `docs/plans/` were not reviewed as they are internal
  (not public-facing docs). Stale references within those paths are out of scope
  for this review.
- The `docs/cli.md` was verified for structure and first 80 lines; the full
  command set was not exhaustively audited against `filigree --help` output.

---

## Priority Recommendations

**Blockers (fix before any site build):**

1. `README.md` line 18: replace both `~/loom` references with `~/weft` (Finding A1)
2. `docs/federation/contracts.md` line 10: correct member roster — Charter → Warpline (Finding A2/T1)
3. `docs/federation/contracts.md` line 23: replace `file:///home/john/weft/doctrine.md` with public GitHub URL (Finding A8)
4. `docs/federation/index.md`: add Warpline→Filigree seam section (Finding A3)

**Major (fix before publishing):**

5. `docs/agent-integration.md`: update all "filigree 2.0" self-references to 3.0.0 (Finding A4)
6. `docs/agent-integration.md`: add `LOOMWEAVE_OUT_OF_SYNC` to error code list (Finding A5)
7. `docs/getting-started.md`: update init output to `.weft/filigree/` paths (Finding A6)
8. `docs/agent-integration.md` line 147: update `.filigree/context.md` → `.weft/filigree/context.md` (Finding A7)
9. Author or source a `docs/dashboard.md` page, or supply a dashboard screenshot (Finding W1)
10. Fix asterisk-register link in `docs/federation/index.md` to public GitHub URL (Finding T3)

**Minor (polish when time permits):**

11. `README.md` §Why Filigree: reframe heading (Finding V1)
12. `docs/mcp.md` 3.0.0 upgrade note: label for upgraders vs. new readers (Finding A9)

---

## Machine-readable summary

```json
{
  "overall_confidence": "High",
  "implementation_risk": "Medium",
  "reversibility": "Easy",
  "ready": "with-fixes",
  "findings_by_severity": {
    "blocker": 4,
    "major": 7,
    "minor": 4
  },
  "blocker_findings": ["A1", "A2", "A3", "A8"],
  "major_findings": ["A4", "A5", "A6", "A7", "T3", "W1", "W2"],
  "minor_findings": ["V1", "V2", "V3", "A9"],
  "verified_facts": {
    "mcp_tool_count": 118,
    "dashboard_port": 8377,
    "canonical_store_path": ".weft/filigree/",
    "sei_framing": "consume-never-mint",
    "warpline_seam_status": "live"
  },
  "blocking_gaps": [
    "Stale ~/loom hub path in README.md and contracts.md",
    "Wrong 5-member list in contracts.md (Charter instead of Warpline)",
    "Warpline binding absent from federation/index.md",
    "file:/// localhost URL in contracts.md line 23"
  ],
  "recommended_next_steps": [
    "Apply 4 blocker fixes before any site build",
    "Apply 7 major fixes before publishing the site",
    "Author docs/dashboard.md or supply a dashboard screenshot",
    "Verify asterisk A-1 still LIVE against weft hub asterisk-register.md"
  ]
}
```
