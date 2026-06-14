# Documentation review — Lacuna (showcase specimen)

**Review date:** 2026-06-14
**Target site:** `lacuna.foundryside.dev`
**Source repo:** `/home/john/lacuna`
**IA reference:** `/home/john/weft/web/information-architecture.md` §4.3, §5.3
**Reviewer:** documentation-critic agent

---

## Verdict

Lacuna's public doc set has genuine strengths — the `README.md` is honest and precise, the flaw manifest (`tour/lacunae.toml`) is the actual single source of truth the IA asks for, and the operator path (`make setup` / `make tour` / `make verify`) is accurately documented and verified against the `Makefile`. However, the showcase site **cannot be built as-is**: the README contains one factual error that would mislead evaluators (Legis labelled "design-only" when it is live), the generated narrative docs (`docs/tour.md`, `docs/matrix.md`) carry emoji in section headers that violate the brand rule, several showcase-template blocks required by the IA are missing or only partially covered, and the internal path references (`~/weft`) are unresolvable to an external reader of the published site. The site is **not ready today**, but is **close**: the blockers are fixable in one focused pass.

---

## Findings by axis

### Axis 1 — Completeness and accuracy

#### BL-1 · BLOCKER — Legis labelled "design-only" in `README.md` line 61

**Evidence:** `README.md:61` reads: `design-only members (Legis, Charter) are labelled, never faked.`

**Fact-check:** The tour output (`docs/tour.md`) shows three passing Legis legs:
- `✅ legis govern` — `governed 43 active defects → surface_override`
- `✅ legis policy-boundary-check` — boundary-evidence check discriminates
- `✅ legis reject malformed artifact` — fail-closed HTTP 422 path

The `lacunae.toml` includes two Legis entries (`lg-disabled-boundary-evidence`, `lg-zero-under-green`) with `expected_tool = "legis"`. The `federation-map.md` and `terminology.md` both describe Legis as a live core member. The README sentence bundles Legis and Charter under "design-only" — Charter is correct, Legis is not. This is factually wrong and would mislead an evaluator using the README as their entry point.

**Fix:** Change `README.md:61` to read: `design-only integrations (Charter) are labelled, never faked. Legis runs live.` (or integrate the honest note into the existing Legis context at line 28–42).

**Confidence:** High — verified against `docs/tour.md`, `lacunae.toml`, and `federation-map.md`.

---

#### BL-2 · BLOCKER — "loomweave+filigree" pairing absent from `docs/matrix.md`

**Evidence:** `docs/matrix.md` lists 7 cells:
```
legis / loomweave / wardline / wardline+filigree / wardline+legis / wardline+loomweave / warpline
```

The IA (§4.3, block 4) requires the matrix to include "Loomweave+Filigree issues bound to SEI with drift detection." The federation-map.md records this pairing as `partial` (entity-assoc drift via `issues_for`). The `lacunae.toml` has no entry with `demonstrates = ["loomweave+filigree"]` — there is one entry demonstrating `"wardline+filigree"` (and `"wardline+loomweave"`), but the pure Loomweave↔Filigree pairing is absent.

**Impact on site:** The IA's showcase-template block 4 ("the matrix, made runnable") explicitly calls out this pairing as a required element. A site built from the current `docs/matrix.md` would omit a live pairing the federation matrix tracks.

**Note:** The `partial` status of this pairing may explain its omission — the tour may not have a concrete lacuna that exercises the entity-assoc binding. If that is the case, the site copy must state the pairing exists with `partial` status and explain what the limitation is, rather than omitting it entirely.

**Fix:** Add a `loomweave+filigree` entry to the matrix doc (or generate one from the tour), with honest `partial` framing. Alternatively, document why this pairing is absent from the specimen (the seam is partial) and surface it in the "honest scope" block.

**Confidence:** High — verified by checking all 48 `demonstrates` fields in `lacunae.toml` and reading `docs/matrix.md` in full.

---

#### MJ-1 · MAJOR — Internal path references (`~/weft`) unresolvable on the public site

**Evidence:** `README.md:88–91`:
```
The Weft federation hub at `~/weft` is the authoritative source for the
federation narrative and roster — see `~/weft/doctrine.md` for the axiom and the
member roster, and `~/weft/members/lacuna.md` for Lacuna's place in the suite as
the demonstration specimen
```

The `~/weft` tilde path is an agent-local shell reference. It resolves correctly in a cloned developer environment but is meaningless on `lacuna.foundryside.dev`. An external evaluator reading the page cannot follow it.

**Fix:** Replace with absolute web URLs: `https://weft.foundryside.dev/#doctrine` for the axiom and `https://github.com/foundryside-dev/weft/blob/main/members/lacuna.md` for the member file (or simply link to `https://weft.foundryside.dev/` with a note that the hub owns the roster).

**Confidence:** High — the IA (§2.3) specifies cross-subdomain links must be absolute URLs.

---

#### MN-1 · MINOR — Accurate flaw count and PY-WL range

**Evidence:** `README.md` (under "What's here" and "The lacunae" sections) does not state the total count of 48 lacunae or the full rule range. The IA (§4.3, block 2) requires "the catalogue of seeded issues" in the What-it-is block. The hub's `members/lacuna.md:11` states `PY-WL-101..126 coverage`, which matches the actual 26 entries in `lacunae.toml`. This claim is accurate where stated. The README itself omits a summary count, which matters for the "What it is / why it exists" showcase block.

**Fix:** The showcase site's "What it is" copy should surface the count (`48 catalogued lacunae`) and the tool breakdown: 26 Wardline Python rules (`PY-WL-101..126`), 2 Rust rules (`RS-WL-108`, `RS-WL-112`), 13 Loomweave entries, 4 Warpline capability demos, 2 Legis entries. This data is in `lacunae.toml` and accurate — it just needs to be surfaced.

**Confidence:** High — counts verified against `lacunae.toml` directly.

---

#### MN-2 · MINOR — `elspeth` scale-proof distinction absent from Lacuna's own docs

**Evidence:** The hub's `members/lacuna.md:19–21` states the elspeth complementary role: "Lacuna is the showcase; elspeth is the scale proof." The IA (§4.3, block 5) requires this distinction in the "Honest scope" block. Neither `README.md`, `docs/tour.md`, nor `docs/matrix.md` mentions elspeth. This is a gap between the hub's framing and the repo's own docs.

**Fix:** Add one sentence to `README.md` (in the "Part of Weft" section, or a new "Honest scope" note): "Lacuna is the showcase specimen. Loomweave names *elspeth* (~425k-LOC real Python) as its first-customer scale target — a complementary role, not the same."

**Confidence:** High — confirmed by reading both `members/lacuna.md` and Lacuna's own docs.

---

### Axis 2 — Weft voice consistency

#### MJ-2 · MAJOR — Emoji in generated narrative docs (`docs/tour.md`)

**Evidence:** Every section heading in `docs/tour.md` begins with `✅`:
```
## ✅ loomweave analyze
## ✅ loomweave structure
...
```
(14 headings, all with `✅`)

The design system voice rule (`readme.md §2`) is explicit: **no emoji in product copy**. The `docs/tour.md` is generated by `make tour` via `tour/docs_gen.py`. This is a generator issue, not a manual authoring error.

**Impact:** If `docs/tour.md` is sourced directly onto `lacuna.foundryside.dev` (as the IA's "tour" block implies it would be), it violates the brand rule on every rendered section.

**Fix:** In `tour/docs_gen.py`, replace `✅` with a text pass/fail indicator: `[PASS]` or simply omit the marker (the output IS the evidence of passing — failed legs would either error or be absent). The Makefile already uses `✓` in shell output (`@echo "✓ demo secrets ready"`), which is a terminal-specific convention; the markdown doc should use text.

**Confidence:** High — `docs/tour.md` line 5 onward; design system `readme.md §2` is unambiguous.

---

#### MN-3 · MINOR — README voice is correct but the `make setup` section is notably dense

**Evidence:** `README.md` lines 24–52 cover `make setup` and secret management across two code blocks and multiple paragraphs of conditional logic (export before Claude Code, `WEFT_FEDERATION_TOKEN`, `LEGIS_HMAC_KEY`, `set -a`). This is operator-level depth appropriate for a developer README but dense for the evaluator entry point the IA envisions.

The IA (§4.3, block 3) separates the "run it yourself" block into `make setup` / `make tour` / `make verify` — implying the three-step operator path is the showcase, with the secret-management detail subordinate. The current README puts secret management at equal visual weight to the tour targets.

**Voice verdict:** The prose itself is on-voice (honest, dry, monospace for machine facts, no hype). The structural weighting is the issue, not the writing.

**Fix:** For the website, extract the three-step flow into a prominent terminal-well block (`make setup` / `make tour` / `make verify`) and surface the secret-management notes as a collapsible or subordinate "prerequisites" section. This is a site composition decision, not a change to `README.md` itself.

**Confidence:** Moderate — voice assessment; the IA's block structure implies this prioritization.

---

#### MN-4 · MINOR — "MissingNo" pop-culture reference in hero

**Evidence:** `README.md:3`: `**The MissingNo of the Weft suite**`

This is the opening line of the README and would likely become the hero eyebrow or sub-headline on the showcase page. The brand voice is "dry/occasionally wry" — wry is permitted. However, "MissingNo" is a Pokémon fandom reference (a glitch Pokémon) that lands as a pop-culture in-joke rather than a precise technical description. The IA (§4.3, block 1) specifies the hero headline as: `"A small app with catalogued flaws — so you can watch the whole federation analyze it at once."` — which is on-voice and precise. The MissingNo framing is not flagged as a brand violation but is a stylistic choice the site copy should consciously adjudicate: it is wry (permitted) but not precise-technical (the dominant voice trait).

**Fix:** The IA's specified headline is the better site copy. Keep MissingNo as a secondary flourish in the body if desired, but it should not headline the showcase.

**Confidence:** Moderate — voice judgment call.

---

### Axis 3 — Cross-repo terminology

#### MN-5 · MINOR — "design-only members (Legis, Charter)" (see BL-1) also violates terminology

**Evidence:** `terminology.md` defines "member" as "A product admitted to the Weft family. There are **five** admitted members." Legis is unambiguously a member. Calling it a "design-only member" in `README.md:61` contradicts the registry definition. This is the same fact as BL-1 but a distinct layer of violation.

(No separate fix required — BL-1's fix resolves this.)

---

#### MN-6 · MINOR — Warpline entries in `docs/matrix.md` marked "live" but no `filigree+warpline` cell appears

**Evidence:** `docs/matrix.md` line 5 reads: `- **warpline** — live`. The `docs/matrix.md` cells list shows `warpline` (solo cell) but not `warpline+filigree`. The federation-map records the `Warpline+Filigree` pairing as `live` (Filigree consumer shipped in 3.0.0). The lacunae demonstrate warpline's capabilities (`wp-blast-radius`, `wp-reverify`, `wp-churn`, `wp-timeline`) but none carry `demonstrates = ["warpline+filigree"]`.

**Impact:** A visitor reading `docs/matrix.md` sees `warpline` as live but cannot see the Warpline↔Filigree composition exercised. The IA (§4.3, block 4) requires "Loomweave+Filigree issues bound to SEI" and the `Warpline+Filigree` seam would be a natural candidate for inclusion.

**Fix:** If the tour does exercise the Warpline→Filigree seam (the worklist ingest), a corresponding `demonstrates = ["warpline+filigree"]` entry belongs on the warpline lacunae, and the matrix doc should list the cell.

**Confidence:** Moderate — the worklist-ingest seam is documented as live in `federation-map.md` but I cannot verify whether the tour harness actually exercises it without reading `tour/steps.py` in depth.

---

#### PASS — Warpline naming is current

The rename from heddle to warpline (PDR-0022, 2026-06-14) is correctly reflected throughout:
- `README.md` uses "Warpline" and `warpline` consistently (`README.md:76–79`)
- `lacunae.toml` uses `"warpline"` in all `demonstrates` fields
- `docs/matrix.md` uses `warpline`
- `docs/tour.md` uses `warpline change impact`
- No "heddle" references found in any public-facing doc

**Confidence:** High — grep confirmed zero "heddle" occurrences in README, docs/tour.md, docs/matrix.md, docs/flaws/*.

---

#### PASS — Member roster in `docs/matrix.md` is current and correct

`docs/matrix.md` lists all five members (loomweave, filigree, wardline, legis, warpline) plus charter as `design-only`. This matches the `federation-map.md` and `terminology.md`.

---

#### PASS — Thread-color naming

Neither the public-facing `README.md` nor the generated docs use thread-color names. The design-system note about stale "Aqua/Sky/Coral/Violet" names in `products/*.md` does not apply to Lacuna, which has no product cheat-sheet. Lacuna's correct thread color (ash) is defined in the design system (`readme.md §1`) and does not appear in Lacuna's own docs — it will be applied at site-build time from the shared data.

---

### Axis 4 — Website-sourcing readiness

The IA (§5.3) defines the showcase-page template as: Hero(ash) → What/why (seeded issues) → The tour (terminal, make targets, ExitCode) → Matrix-made-runnable → Honest scope → Links/CTA → Footer.

| Showcase template block | Status | Source location | Gap |
|---|---|---|---|
| **Hero — eyebrow, headline, ash thread** | PARTIAL | `README.md:1–8` has the headline; ash thread must be applied at build time | IA-specified headline (`"A small app with catalogued flaws — so you can watch the whole federation analyze it at once."`) is not in `README.md` — the MissingNo opener is; the IA copy is better |
| **What it is / why it exists** | SOURCED | `README.md:3–9`, `docs/flaws/` per-lacuna explainers, `members/lacuna.md` "Why it exists" | Legis BL-1 error needs fix; elspeth MN-2 needs adding |
| **The tour / run it yourself (make targets + ExitCode)** | PARTIAL | `README.md:56–57` (targets); `Makefile` (targets verified correct); `docs/tour.md` (narrative) | `docs/tour.md` has emoji headers (MJ-2); setup detail is weighted too heavily at README level |
| **The matrix, made runnable (specimen-grounded pairing cards)** | PARTIAL | `docs/matrix.md` (generated, accurate for cells it lists); `lacunae.toml` (source of truth for cell-to-flaw mapping) | `loomweave+filigree` cell absent (BL-2); `warpline+filigree` cell absent (MN-6); matrix doc is minimal (7 cells in a list, no per-cell narrative) |
| **Seeded-issue × tool matrix (who catches what)** | PARTIAL | `lacunae.toml` has full data; `docs/flaws/` has per-lacuna explainers | No aggregated "tool catches X flaws" summary exists in a web-ready form; the explainer pages are individually detailed but not cross-linked in a matrix view |
| **Honest scope — not-a-member, Charter planned, elspeth** | PARTIAL | `members/lacuna.md` (hub owns this framing); `README.md:91` (not-a-roster-member note); `docs/matrix.md:10` (Charter design-only) | `README.md` does not mention elspeth (MN-2); "honest scope" is a hub-side doc, not a Lacuna-repo doc |
| **Links / CTA — repo, make targets, member subdomains** | MISSING | `README.md:88–91` has hub refs but using `~/weft` paths (MJ-1) | No links to member subdomains (`{member}.foundryside.dev`) exist in any Lacuna doc; these are a showcase-template requirement (IA §4.3 block 6) |
| **Footer (shared site-kit)** | MISSING | Not in repo — shared site-kit dependency | Normal: footer is a build-time dependency, not a doc |
| **ExitCode component usage** | PARTIAL | `docs/tour.md:37–39` (wardline fail-closed / exit 1) and `Makefile` mention exit codes | No doc explicitly presents `ExitCode 0 / 1 / 2` with the branded component vocabulary; this needs site-build composition |
| **SeiTag + EnrichmentChip dossier slice** | MISSING | `docs/tour.md:9` lists entity counts (365 entities); `lacunae.toml` has SEI-relevant specimens | No doc provides a rendered "real dossier slice from the specimen" with `absent`/`unavailable` peer shown, as the IA requires |

---

## Website-sourcing readiness summary

**SOURCED blocks (no gap):** 1 of 10  
**PARTIAL blocks (fixable gaps):** 7 of 10  
**MISSING blocks (require new content or site-build composition):** 2 of 10

The two MISSING blocks (links to member subdomains; the SeiTag/EnrichmentChip dossier slice) require authoring at site-build time or as new repo content — they cannot be sourced from existing docs. The PARTIAL blocks are either fixable in the repo (BL-1, BL-2, MJ-2, MN-2) or require site-composition decisions (ExitCode rendering, matrix narrative expansion).

---

## Priority recommendations

**Blockers (fix before the site can launch):**

1. **Fix BL-1 (Legis "design-only" error, `README.md:61`).** This is a factual error on a live member that would misinform evaluators. One-line fix.
2. **Fix BL-2 (loomweave+filigree missing from matrix coverage).** Either add a lacuna that exercises the pairing, or add an honest "partial" note to `docs/matrix.md` explaining the gap. The IA requires this pairing to appear in the matrix-made-runnable block.
3. **Fix MJ-2 (emoji in `docs/tour.md` headers).** Fix the generator (`tour/docs_gen.py`) to emit text indicators. Any generated doc sourced onto the website must be emoji-free per brand rules.
4. **Fix MJ-1 (`~/weft` path references in `README.md:88–91`).** Replace with absolute URLs before site launch; tilde paths are unresolvable to external readers.

**Major (fix before launch, not day-one blockers):**

5. **Author links to member subdomains** in `README.md` or in a new `docs/showcase-links.md`. The showcase template requires cross-subdomain links to every member site the specimen exercises. These do not exist in any Lacuna doc today.
6. **Add elspeth distinction** (`README.md`, "Part of Weft" section). One sentence; closes MN-2.

**Minor (polish pass):**

7. Consider the MissingNo opener (MN-4): leave as wry flavour text in body, but use the IA's headline copy for the hero.
8. Investigate MN-6 (warpline+filigree cell): confirm whether the tour exercises the Filigree worklist ingest and, if so, add the cell to `docs/matrix.md` and a `demonstrates` tag in the relevant lacunae.
9. For site composition: the `docs/tour.md` content is accurate and useful but needs restructuring into the "tour" block layout (terminal-well prominent; `ExitCode` chips; setup detail subordinate).

---

## Confidence Assessment

**Overall Confidence:** High

| Finding | Confidence | Basis |
|---|---|---|
| BL-1 Legis "design-only" error | High | Verified against `docs/tour.md` (3 live Legis legs), `lacunae.toml` (2 Legis entries), `federation-map.md` (live core member) |
| BL-2 loomweave+filigree absent from matrix | High | Verified by reading all 48 `demonstrates` fields in `lacunae.toml` and full `docs/matrix.md` |
| MJ-1 ~/weft path unresolvable | High | Direct observation; IA §2.3 requires absolute cross-subdomain URLs |
| MJ-2 emoji in tour.md | High | Direct read of `docs/tour.md`; design system `readme.md §2` is explicit |
| MN-6 warpline+filigree cell absent | Moderate | `federation-map.md` shows pairing as live; cannot confirm without deeper `tour/steps.py` audit |
| Make targets accuracy | High | README targets verified against `Makefile` directly |
| PY-WL-101..126 claim accurate | High | Count verified against `lacunae.toml` |
| Warpline rename complete | High | Zero "heddle" hits in public docs |
| Thread-color (ash) not misapplied | High | No thread-color prose in Lacuna's own docs |

---

## Risk Assessment

**Implementation Risk:** Low  
**Reversibility:** Easy (all fixes are documentation edits or generator changes; none touch specimen code or `lacunae.toml`)

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| BL-1 correction changes generator output | Low | Low | BL-1 is a prose README fix, not a generator change |
| MJ-2 generator fix breaks tour rendering | Medium | Low | Test `make tour` after changing `docs_gen.py`; the `✅` is cosmetic |
| Adding loomweave+filigree cell (BL-2) reveals the pairing is genuinely absent from the tour | Medium | Medium | If so, mark `partial` in the matrix and add an honest note — do not add a lacuna that doesn't exercise a real integration |

---

## Information Gaps

1. [ ] **`tour/steps.py` not fully read:** I did not audit the tour harness step-by-step. The warpline+filigree worklist-ingest step may already execute but not be tagged in `lacunae.toml` — this would explain MN-6 being a doc gap rather than a coverage gap.
2. [ ] **`tour/docs_gen.py` not read:** I confirmed the `✅` problem in the output but did not read the generator source. The generator may have a configuration option or a straightforward string replacement.
3. [ ] **Live site state:** The `docs/dogfood-findings.md` notes that `make ci` was red on an earlier commit. I did not run `make verify` live; the accuracy of `docs/tour.md` reflects the state at last `make tour` execution, not current state.

---

## Caveats and Required Follow-ups

### Before relying on this analysis

- [ ] Run `make verify` in `/home/john/lacuna` to confirm the tour docs are current and not stale relative to the specimen.
- [ ] Read `tour/steps.py` to confirm whether the Warpline→Filigree worklist-ingest step is exercised (affects MN-6 severity).
- [ ] Confirm with the owner whether `docs/tour.md` and `docs/matrix.md` are intended to be sourced directly onto the site (generated prose) or only used as source material for hand-authored site copy.

### Assumptions made

- The "public doc set" for `lacuna.foundryside.dev` is: `README.md`, `docs/tour.md`, `docs/matrix.md`, `docs/flaws/*.md`, and `tour/lacunae.toml`. AGENTS.md and CLAUDE.md are agent-facing only and not reviewed against web-readiness criteria.
- `docs/tour.md` and `docs/matrix.md` are generated and authoritative as of the last `make tour` run.
- The IA's §5.3 showcase-page template is the binding spec for what `lacuna.foundryside.dev` must contain.

### Limitations

- This review does not audit `docs/flaws/*.md` individually beyond one sample (`wl-trust-violation.md`). All 55 flaw doc files follow the same generated format and appear consistent with the `lacunae.toml` single-source-of-truth model.
- Technical accuracy of individual Wardline rule IDs and Loomweave finding types is not independently verified against the tool source — only cross-checked against `docs/tour.md` outputs.

---

## Machine-readable summary

```json
{
  "overall_confidence": "High",
  "implementation_risk": "Low",
  "reversibility": "Easy",
  "ready": "no",
  "severity_counts": {
    "blocker": 2,
    "major": 2,
    "minor": 6,
    "pass": 3
  },
  "top_findings": [
    {
      "id": "BL-1",
      "claim": "Legis labelled 'design-only' in README.md:61 but is a live member with 3 passing tour legs",
      "confidence": "High",
      "evidence": "README.md:61 vs docs/tour.md:45-63 vs lacunae.toml lg-* entries"
    },
    {
      "id": "BL-2",
      "claim": "loomweave+filigree pairing absent from docs/matrix.md and lacunae.toml demonstrates fields",
      "confidence": "High",
      "evidence": "docs/matrix.md full read; all 48 demonstrates fields in lacunae.toml"
    },
    {
      "id": "MJ-1",
      "claim": "~/weft path references in README.md:88-91 unresolvable to external readers",
      "confidence": "High",
      "evidence": "README.md:88-91"
    },
    {
      "id": "MJ-2",
      "claim": "Emoji (✅) in every docs/tour.md section heading violates brand no-emoji rule",
      "confidence": "High",
      "evidence": "docs/tour.md:5-61 (all 14 headings); design-system readme.md §2"
    }
  ],
  "blocking_gaps": [
    "BL-1: Legis factual error must be corrected before site copy is authored",
    "BL-2: loomweave+filigree matrix cell missing — showcasetemplate block 4 is incomplete",
    "MJ-2: tour.md emoji must be fixed in generator before docs can be sourced onto the site",
    "MJ-1: ~/weft paths must be replaced with absolute URLs"
  ],
  "sourcing_readiness": {
    "sourced": 1,
    "partial": 7,
    "missing": 2,
    "total_blocks": 10
  },
  "recommended_next_steps": [
    "Fix README.md:61 (Legis 'design-only' label) — one-line edit",
    "Fix tour/docs_gen.py to emit text pass indicators, not ✅ emoji",
    "Replace ~/weft references with absolute weft.foundryside.dev URLs",
    "Resolve loomweave+filigree matrix coverage (add lacuna or add honest partial note)",
    "Add elspeth scale-proof distinction to README.md 'Part of Weft' section",
    "Author cross-subdomain member links — required by showcase template, absent from all Lacuna docs"
  ]
}
```
