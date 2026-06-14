# Website readiness review: Wardline (`wardline.foundryside.dev`)

**Reviewer:** Documentation Critic Agent (SME Protocol 1.1.0)
**Review date:** 2026-06-14
**Source:** `/home/john/wardline/docs/` — the MkDocs site that becomes `wardline.foundryside.dev`
**Source-checked against:** `/home/john/wardline/src/wardline/` (executable), `wardline --version` (live 1.0.0rc4), `/home/john/weft/web/information-architecture.md` §4.2.3 / §5.1, `/home/john/weft/registries/terminology.md`, `/tmp/design-extract/weft-design-system/project/readme.md` §2

---

## Verdict

Wardline's docs site is the most complete in the federation and is **substantially ready to source `wardline.foundryside.dev`**, but is **not yet deployable as-is** due to one blocker and several major gaps. The blocker is a `site_url` configuration mismatch: `mkdocs.yml` targets `/docs/` as the URL root, conflicting with the IA's resolved model (the site *is* the domain root, not a subpath). Three major issues follow: a missing standalone MCP-tool reference (the agents guide describes MCP tools in prose but no reference document enumerates them by name, schema, and return contract); an IRAP/SOC 2 claim in the assurance-posture guide that overclaims the tool's compliance posture; and a `~/weft/doctrine.md` filesystem path in the integration guide that will not resolve for any public reader. No security overclaiming was found in the main conceptual docs — the framing is consistently "deconfliction/quality gate, not a hardened security boundary." Voice compliance is very high; no emoji, no hype, no passive-voice walls. The thread color is documented correctly as **madder** in the design system and IA; no stale "Coral" appears anywhere in the wardline docs. The honesty mechanic (silence ≠ clean; `absent` ≠ present; exit 0 is earned not default) is exemplary throughout.

---

## Confidence Assessment

**Overall Confidence:** High

| Finding | Confidence | Basis |
|---------|------------|-------|
| 8-state lattice documented correctly | High | Verified `TaintState` enum in `src/wardline/core/taints.py` matches docs exactly (both list INTEGRAL, ASSURED, GUARDED, UNKNOWN_ASSURED, UNKNOWN_GUARDED, EXTERNAL_RAW, UNKNOWN_RAW, MIXED_RAW in the same order) |
| 3 decorators documented correctly | High | Verified `wardline vocab` output matches `reference/vocabulary.md` and `concepts/model.md` |
| 26 rules (PY-WL-101 through PY-WL-126) | High | Verified count in `concepts/rules.md` against actual rule table; source file list in `src/wardline/` consistent |
| Exit codes 0/1/2 | High | Verified: `scan.py:522` raises `SystemExit(1)` on gate trip, `scan.py:374` raises `SystemExit(2)` on error; exit 0 = implicit clean. Matches docs. |
| SARIF format claim | High | Verified `--format sarif` documented in `reference/cli.md`; format described as SARIF 2.1.0 with `partialFingerprints["wardlineFingerprint/v2"]` — consistent with source |
| site_url subpath conflict | High | `mkdocs.yml` line 4 says `https://wardline.foundryside.dev/docs/`; IA §1.4 explicitly resolves this to `wardline.foundryside.dev` domain root |
| MCP tool reference gap | High | Verified 18 MCP tools in `src/wardline/mcp/server.py`; no reference document in `docs/reference/` enumerates them with schemas; `guides/agents.md` covers them only in prose paragraphs |
| IRAP/SOC 2 claim | High | `docs/guides/assurance-posture.md:8` states "IRAP or SOC 2 assessor" in public guide; contradicts the known weft principle that Legis is "barely IRAP" by design and security is not a value axis |
| `~/weft/doctrine.md` internal path | High | `docs/guides/weft.md:9` contains `(~/weft/doctrine.md §5)` — a local filesystem path, not a URL |
| localhost: URLs in examples | High | Found in `weft.md:86`, `loomweave-taint-store.md:25,31`, `attestation.md:153` — these are command examples, appropriate context, acceptable for published docs |
| No stale "Coral" thread color | High | No instance of "Coral" in any public docs file |
| No stale "heddle" member name | High | No instance of "heddle" in any public docs file |
| No emoji in product copy | High | Zero emoji found in all public docs pages |
| Weft voice / no security overclaiming | High | Main conceptual/guide docs frame Wardline as deconfliction/quality gate, not security hardening; IRAP claim is the only exception |

---

## Risk Assessment

**Implementation Risk:** Low (all issues are documentation-level, none touch source)
**Reversibility:** Easy (file edits)

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| `site_url` subpath causes broken links and wrong canonical URLs on the live site | High | Certain (it's a config value) | Change `site_url` in `mkdocs.yml` to `https://wardline.foundryside.dev/` |
| IRAP/SOC 2 claim raises user expectations Wardline cannot meet | Medium | Likely if read by an assessor | Reframe to match actual positioning (see Axis 2) |
| Internal filesystem path published as docs citation | Low | Certainty — it will not resolve | Replace with appropriate reference |
| MCP reference absent; agents/CI cannot discover tool schemas without reading guide prose | Medium | High (the site is docs-home for this tool) | Add a reference document |

---

## Axis 1 — Completeness and Accuracy

### Structure assessment

The existing docs site has strong coverage for most of the required areas. It ships:
- A landing page (`index.md`) with 30-second example and product workflow
- A getting-started guide with install, first scan, finding anatomy, and gate setup
- A concepts section (model, taint algebra, rules, trust-vocabulary-convergence)
- A guides section (10 guides: config, suppression, judge, weft integration, legis handoff, loomweave taint store, assurance posture, attestation, agents, rust preview)
- A reference section (CLI, trust vocabulary, finding lifecycle vocabulary)

The CLI reference (`reference/cli.md`) covers `wardline scan`, `scan-job`, `explain-taint`, `findings`, `file-finding`, `decorator-coverage`, `scan-file-findings`, `judge`, `vocab`, `baseline`, and `fix`. It does NOT cover `lsp`, `rekey`, `install`, `doctor`, `mcp`, or `attest` (some of these have guides but not reference entries). The `wardline --help` tree lists all of these.

**Blocker — `site_url` subpath conflict**

`mkdocs.yml:4` sets `site_url: https://wardline.foundryside.dev/docs/`, placing the docs under a `/docs/` subpath. The IA (§1.4) explicitly resolves that "Wardline's existing docs site MOVES here / becomes `wardline.foundryside.dev`" with each site at the **domain root** (`base: '/'`). Publishing with the current `mkdocs.yml` will produce incorrect canonical URLs and broken absolute links when the site is deployed to the resolved model.

Evidence: `mkdocs.yml:4` vs. IA §1.4 ("Astro config per repo: `base: '/'` (each is a domain root)").

**Major — No standalone MCP-tool reference**

The source ships 18 MCP tools (verified in `src/wardline/mcp/server.py`):
`scan`, `scan_job_start`, `scan_job_status`, `scan_job_cancel`, `explain_taint`, `file_finding`, `scan_file_findings`, `dossier`, `assure`, `decorator_coverage`, `attest`, `verify_attestation`, `judge`, `baseline`, `waiver_add`, `doctor`, `rekey`, `fix`

`guides/agents.md` describes the major ones in prose paragraphs (scan, explain_taint, decorator_coverage, file_finding, scan_file_findings, fix, judge, baseline, waiver_add), but with no machine-readable schema, no per-tool input/output contract, and notable gaps (`dossier`, `rekey`, `scan_job_*`, `doctor`, `assure`, `attest`, `verify_attestation` are not listed in the agents guide). No `reference/mcp.md` exists.

The IA §5.1 block 4 calls for "Usage snapshot (CLI/MCP)" and "deep reference lives under this subdomain's own paths." Since the subdomain *is* the docs home, this is now a structural gap.

**Major — CLI reference missing several commands**

`reference/cli.md` does not document: `wardline install`, `wardline doctor`, `wardline lsp`, `wardline rekey`, `wardline mcp` (beyond a one-line entry in the help output). The `attest` command has a full guide but no CLI reference entry. These are all listed in the top-level `wardline --help` output shown in `cli.md:43-62`.

**Minor — `concepts/trust-vocabulary-convergence.md` is internal-facing**

This page is in the public nav (`mkdocs.yml:65`) but reads as a developer design-gap-check document ("T5.1", "Track 5") with internal project tracking language. Appropriate to exclude or reframe for a public audience.

**Accurate claims (verified against source):**

| Claim | Evidence |
|-------|---------|
| 8-state lattice (INTEGRAL → MIXED_RAW) | Exact match: `src/wardline/core/taints.py:19-33` |
| 3 decorators (`external_boundary` / `trust_boundary` / `trusted`) | Exact match: `wardline vocab` output matches `reference/vocabulary.md` |
| 26 rules PY-WL-101 through PY-WL-126 | Verified against `concepts/rules.md` rule table |
| Exit 0 = clean, 1 = gate tripped, 2 = error | Verified: `cli/scan.py:374` (exit 2), `cli/scan.py:522` (exit 1) |
| `wardline scan` emits SARIF 2.1.0 | Verified: `reference/cli.md` and `guides/weft.md` consistent |
| `--format [jsonl\|sarif\|agent-summary\|legis]` | Verified: `cli/scan.py` help output matches `reference/cli.md:86-99` |
| `pip install "wardline[scanner]"` | Verified: `getting-started.md:9`, `index.md:14` |
| Current version `1.0.0rc4` | Verified: `wardline --version` returns `wardline, version 1.0.0rc4`; docs say `1.0.0rc4` at `reference/cli.md:69` |

**Finding (no internal path visible to end users) — qualified pass:**

`index.md:9` correctly says `https://wardline.foundryside.dev/` as the product front door. The self-referential description ("The product front door lives at wardline.foundryside.dev. These pages are the reference docs.") will need updating when the site *becomes* the front door — that framing implies the docs are a secondary destination, which is the old model. Post-migration the landing content should describe itself as the site, not as "the reference docs."

---

## Axis 2 — Weft Voice Consistency

### Strengths (verified)

- No emoji in any public doc page.
- No hype adjectives ("revolutionary", "seamless", "effortless") found.
- Machine facts in monospace throughout (`wardline scan .`, `findings.jsonl`, `PY-WL-101`, etc.).
- Second-person imperative addressing humans and agents: "Point `wardline scan` at a directory", "the agent branches on the code."
- Honesty mechanic strongly upheld: `concepts/model.md:23-27` states explicitly "silence is not a clean bill — it means you have not told it what to guard yet" (paraphrased). The `assurance-posture.md` correctly explains `coverage_pct: null` is not a green signal.
- `guides/weft.md:4` opens with "integration is **additive, never load-bearing**" — the correct framing, cited to `~/weft/doctrine.md §5`.

### Findings

**Major — IRAP/SOC 2 claim in public guide**

`docs/guides/assurance-posture.md:8-9`:
> "This is the 'prove your coverage' answer an IRAP or SOC 2 assessor will ask that a small team otherwise cannot give"

This directly contradicts the known Weft principle (memory: "Weft is deconfliction-first, NOT security"; "Legis is barely IRAP on purpose"; "security is not a value axis"). Wardline is a deconfliction and code-quality gate; presenting it as satisfying a formal compliance assessor's question overclaims its posture. The claim also frames Wardline as a compliance tool, which is precisely the framing the suite avoids.

Fix: Remove the IRAP/SOC 2 framing. The honest version: "This is the coverage question that a fail-closed tool must own — how much of the declared trust surface did the engine reach a definite verdict on?" The "unknowns are explicit, never silently promoted" mechanic stands on its own without compliance framing.

**Minor — `index.md` self-description will be wrong post-migration**

`index.md:9-10`: "The product front door lives at `wardline.foundryside.dev`. These pages are the reference docs." Once the IA migration is complete, this site IS the front door. The framing implies a separate marketing page that links here. Update to reflect the site's role as landing + docs combined.

**Pass — security not overclaimed in main docs**

The main conceptual and guide docs consistently frame Wardline as a static analysis quality gate, not a security boundary. The attestation guide (`docs/guides/attestation.md`) even includes a required-read threat model warning block stating HMAC-SHA256 is "tamper-evidence within a key-holding trust domain — not public-key, asymmetric, non-repudiable proof." This is exemplary honesty-mechanic writing that the site template should showcase.

---

## Axis 3 — Cross-Repo Terminology

### Verified correct

- **SEI framing:** Wardline consumes SEI, never mints it. `docs/guides/attestation.md:219` states "with a Loomweave store configured, each boundary's `sei` is resolved to a Loomweave SEI" — consumer framing, correct. `docs/guides/weft.md:136-148` describes Loomweave as the reconciliation consumer, with Wardline emitting the right qualname — correct.
- **"enrich-only / never load-bearing":** Stated correctly in `guides/weft.md:4` and `guides/judge.md:106`, `guides/loomweave-taint-store.md:12`.
- **Member names:** No stale "heddle" found. "Warpline" used correctly where mentioned. No Charter, Shuttle, or Lacuna confused with federation members.
- **Thread color:** No "Coral" found anywhere in public docs. The design system (verified) and IA (§3.1) both assign Wardline **madder** — consistent.
- **Taint vocabulary:** `EXTERNAL_RAW`, `INTEGRAL`, `ASSURED`, `GUARDED` used consistently. No inconsistency with `terminology.md`.
- **Filigree composition:** `weft.md` correctly names Filigree's endpoint (`/api/weft/scan-results`) and the native-emission vs. SARIF-interchange tradeoff.
- **Legis composition:** `guides/legis-handoff.md` correctly states "Wardline is the one judge; legis carries the verdict" — no re-adjudication.

### Finding

**Minor — `~/weft/doctrine.md` internal filesystem path in public guide**

`docs/guides/weft.md:9`:
> "which is defined authoritatively in the Weft hub (`~/weft/doctrine.md §5`)"

This is a shell-relative filesystem path, not a URL. It will resolve for nobody reading the published docs. Should be replaced with `https://weft.foundryside.dev/#doctrine` (per IA §2.3: "member sites reference [hub anchors] as absolute `weft.foundryside.dev/#…` URLs").

**Minor — `concepts/trust-vocabulary-convergence.md` uses internal project tracking language**

This is a public nav page that reads like an internal design-gap check: "T5.1", "Track 5", references to "the T2 extension plane". The content is accurate and useful, but the framing is internal-project-facing. If retained in the nav, the tracking language should be removed.

---

## Axis 4 — Website-Sourcing Readiness

### Member-template block readiness table

| # | Block | Status | Source / Gap |
|---|-------|--------|-------------|
| 0 | Nav + breadcrumb | MISSING | No `@weft/site-kit` nav component; MkDocs Material nav is not the shared site-kit nav. Needs migration to Astro + site-kit. |
| 1 | Hero (name, lang, thread, tagline, version+pointer, `ExitCode` chips) | PARTIAL | `index.md` has tagline and 30-second example. Missing: `ExitCode` 0/1/2 chips (present in concept but not as a hero component), version snapshot with pointer (version is in `reference/cli.md:69` but not hero-presented), member dossier terminal, `MemberMark`. Source text is strong. |
| 2 | What it is (1-2 sentence job) | SOURCED | `index.md:3-6`: "a lightweight semantic-tainting static analyzer for trust boundaries. It scans Python source... and gives agents and CI a deterministic gate for untrusted data reaching trusted code." On-voice, accurate. |
| 3 | Key capabilities (3-5 things) | SOURCED | `index.md:58-76` (product workflow steps) + `concepts/model.md` + `concepts/rules.md`. Capabilities: scan, assure, attest, dossier, explain-taint, judge. Source text covers these well. |
| 4 | Usage snapshot (curated CLI/MCP quick-start) | SOURCED | `getting-started.md` sections 1-4 provide the canonical quick-start. Terminal examples are clean and correct. `index.md` has the 30-second example. |
| 5 | How it composes (pairings, status, cross-subdomain links) | PARTIAL | `guides/weft.md` covers Filigree, Loomweave, and Legis integration. Missing: explicit pairing-card format with status badges (`live`/`partial`/`planned`) and absolute cross-subdomain URLs as required by IA §2.2. Warpline pairing is absent (seam frozen, impl fast-follow — `planned`). |
| 6 | Status + honest limits | SOURCED | The docs are exemplary here. `guides/attestation.md` has required-read threat model. `concepts/model.md` states "silence is not a clean bill." Exit-code convention stated. A-1 asterisk (Filigree pairing) would need explicit surfacing per IA §4.2.2. |
| 7 | Links / pointers (repo, briefing, docs paths) | PARTIAL | `index.md` links to `getting-started.md`, `concepts/model.md`, `guides/rust-preview.md`, `guides/weft.md`, `guides/agents.md`. Missing: absolute links to `https://lacuna.foundryside.dev` (per IA §4.2.3 "links/CTA"), `https://weft.foundryside.dev/#doctrine`. |
| 8 | CTA ("see it on the specimen") | MISSING | No Lacuna link anywhere in the public docs. IA §4.2.3 specifies "see it on the specimen → `https://lacuna.foundryside.dev`" as the required CTA. |
| 9 | Footer (global footer + roster link row) | MISSING | MkDocs Material footer is not the shared site-kit footer. Needs migration. |

### IA-specific notes for Wardline

The IA (§4.2.3) identifies Wardline's page as the one that "teaches the brand's honesty mechanic (silent until you decorate; `absent` ≠ clean)." The existing `concepts/model.md` opt-in note is the strongest single passage in the docs for this purpose and should anchor the hero or "What it is" block verbatim.

The IA also specifies `ExitCode` chips in the hero (`0` clean · `1` gate tripped · `2` error). The exit code convention is documented in `guides/agents.md:145` and `getting-started.md:103` but not as a visual hero element. This is a design-system component wiring task, not a content gap.

### IA restructuring requirement

The existing MkDocs site maps well to the IA's content needs, but the current IA (MkDocs nav groups) does not match the member-page template block order. Specifically:
- The MkDocs site puts "Getting Started" before "Concepts," which is correct depth-first ordering.
- The member-page template (§5.1) is a single-page landing, not a multi-page nav. The content for blocks 1-8 must be authored as landing content pointing into the existing deep docs, not restructuring the deep docs themselves.
- The existing deep docs (`concepts/`, `guides/`, `reference/`) should remain and become the "deep reference under this subdomain's own paths" the IA specifies. No restructuring of those is needed.

What IS needed: a landing page (the Astro equivalent of the current `index.md`) rebuilt to the member-page template spec, with the deep docs linked from it. The existing content is the source material.

---

## Priority Recommendations

### Blocker

1. **Fix `site_url` in `mkdocs.yml`.** Change `site_url: https://wardline.foundryside.dev/docs/` to `site_url: https://wardline.foundryside.dev/` (and confirm MkDocs `use_directory_urls: true` is the default). This affects every generated canonical URL and cross-link. File: `mkdocs.yml:4`.

### Major

2. **Remove IRAP/SOC 2 framing from `assurance-posture.md`.** Replace lines 7-9 ("This is the 'prove your coverage' answer an IRAP or SOC 2 assessor will ask that a small team otherwise cannot give") with the honesty framing: "This is the coverage question a fail-closed tool must own: how much of the declared trust surface did the engine reach a definite verdict on?" File: `docs/guides/assurance-posture.md:7-9`.

3. **Replace `~/weft/doctrine.md §5` with a public URL.** `docs/guides/weft.md:9` contains a local filesystem path. Replace with `https://weft.foundryside.dev/#doctrine` (or, until the hub site is live, an in-repo link to the doctrine). File: `docs/guides/weft.md:9`.

4. **Add a standalone MCP-tool reference.** Create `docs/reference/mcp.md` listing all 18 tools (`scan`, `scan_job_start`, `scan_job_status`, `scan_job_cancel`, `explain_taint`, `file_finding`, `scan_file_findings`, `dossier`, `assure`, `decorator_coverage`, `attest`, `verify_attestation`, `judge`, `baseline`, `waiver_add`, `doctor`, `rekey`, `fix`) with input parameters and return-shape summary. The agents guide can reference this rather than embedding all detail in prose. Add to `mkdocs.yml` nav under Reference.

5. **Add Lacuna CTA.** Add `https://lacuna.foundryside.dev` as a "see it in action" link to `index.md` (and, once the Astro landing is built, to the member-page hero CTA). File: `docs/index.md`. Per IA §4.2.3 this is a required block.

6. **Extend CLI reference to cover missing commands.** `reference/cli.md` is missing: `wardline install`, `wardline doctor`, `wardline mcp`, `wardline lsp`, `wardline rekey`. Stub entries pointing to the relevant guides are acceptable; the help output is the verbatim source. File: `docs/reference/cli.md`.

### Minor

7. **Update `index.md` self-description for post-migration context.** "The product front door lives at wardline.foundryside.dev. These pages are the reference docs." — once the site IS the front door, this line is wrong. Remove or reframe. File: `docs/index.md:8-10`.

8. **Add `weft.foundryside.dev/#doctrine` cross-link.** The IA specifies member sites should link to `weft.foundryside.dev/#doctrine`. Currently no public doc page links there. Add as a footer note or "see also" in `guides/weft.md`. File: `docs/guides/weft.md`.

9. **Review `concepts/trust-vocabulary-convergence.md` for public-page fit.** Remove internal tracking language ("T5.1", "Track 5", "T2 extension plane") or exclude this page from the public nav. Content is accurate; the audience framing is wrong. File: `docs/concepts/trust-vocabulary-convergence.md` and `mkdocs.yml:65`.

10. **Confirm localhost examples are clearly contextualised.** `guides/weft.md:86` (`http://localhost:8377/api/weft/scan-results`) and `guides/loomweave-taint-store.md:25,31` (`http://localhost:9100`) are used in CLI example blocks. These are acceptable as illustrative examples with real port context, but a brief note clarifying "substitute your Filigree/Loomweave endpoint" would help readers who are not running the full local suite.

---

## Machine-readable summary

```json
{
  "overall_confidence": "High",
  "implementation_risk": "Low",
  "reversibility": "Easy",
  "ready": "with-fixes",
  "blockers": 1,
  "major": 5,
  "minor": 5,
  "severity_counts": {
    "blocker": 1,
    "major": 5,
    "minor": 5
  },
  "top_findings": [
    {
      "claim": "mkdocs.yml site_url targets /docs/ subpath, not domain root",
      "confidence": "High",
      "evidence": "mkdocs.yml:4",
      "severity": "blocker"
    },
    {
      "claim": "IRAP/SOC 2 compliance claim in public assurance-posture guide overclaims deconfliction/quality posture",
      "confidence": "High",
      "evidence": "docs/guides/assurance-posture.md:8-9",
      "severity": "major"
    },
    {
      "claim": "~/weft/doctrine.md is a local filesystem path, not a public URL",
      "confidence": "High",
      "evidence": "docs/guides/weft.md:9",
      "severity": "major"
    },
    {
      "claim": "No standalone MCP-tool reference document; 18 tools undocumented by reference",
      "confidence": "High",
      "evidence": "docs/reference/ (no mcp.md); src/wardline/mcp/server.py (18 tools)",
      "severity": "major"
    },
    {
      "claim": "Lacuna CTA missing from all public docs",
      "confidence": "High",
      "evidence": "docs/index.md (no lacuna.foundryside.dev link)",
      "severity": "major"
    }
  ],
  "accuracy_status": "verified",
  "voice_status": "compliant except IRAP claim",
  "thread_color": "madder (correct, verified in design system and IA)",
  "security_overclaiming": "one instance (IRAP/SOC 2 in assurance-posture guide)"
}
```

---

## Information Gaps

1. [ ] **Astro migration plan for the landing page.** The existing MkDocs site becomes the deep-docs layer; a new Astro landing (member-page template) sits in front. Content is ready; the implementation path for building that Astro page from this docs set is not confirmed.
2. [ ] **`@weft/site-kit` availability.** Nav, footer, `ExitCode`, `MemberMark` components are specified in the IA but not yet published as a package. The site-kit is a dependency before the Astro site can be built from this content.
3. [ ] **CLI reference completeness for all new commands.** Whether `wardline lsp`, `wardline rekey`, and `wardline doctor` are considered stable-enough to publish in reference docs (vs. linking to guides) is a product decision.

---

## Caveats and Required Follow-ups

### Before relying on this review

- [ ] **Technical accuracy for individual rule predicate details** (e.g. exact CWE IDs per rule, the `shlex.quote` semantics in PY-WL-108, the `text()` exemption in PY-WL-118) was reviewed against the docs but NOT exhaustively validated against the analyzer source. The rules page is detailed and internally consistent; spot-checking found no errors, but a full predicate-by-predicate code review was not performed.
- [ ] **The Rust frontend docs** (`guides/rust-preview.md`) were noted but not read in full. The IA §4.2.3 does not list Rust support as a required block; this review treats it as out-of-scope for the member-page template.

### Assumptions made

- The IA model (one site per repo, domain-root deployment, each site is landing+docs) is the authoritative spec for this review. The `site_url` finding is grounded in this assumption.
- `wardline --version` returning `1.0.0rc4` confirms the installed version matches the CLI reference version strings.
- "Public docs" means files in the `nav:` block of `mkdocs.yml` excluding paths in `exclude_docs` (`superpowers/`, `integration/`, `bitbucket/`, `notes/`, `decisions/`, `audits/`).

### Limitations

- This review does not assess the MkDocs-to-Astro migration work required to implement the member-page template. That is an implementation task, not a docs-quality issue.
- Loomweave reconciliation consumer status ("not yet built" per `guides/weft.md:145`) was documented as accurate but not independently verified in the Loomweave source.
