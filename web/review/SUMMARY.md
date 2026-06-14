# Weft suite — website-readiness review synthesis

**Date:** 2026-06-14
**Scope:** Public-doc website-readiness of the 6 deployable apps (5 members + Lacuna)
for their `*.foundryside.dev` subdomains, reviewed against
`web/information-architecture.md` (the per-subdomain IA) and the Weft design-system
voice. Per-app detail: `web/review/<app>.md`.

The hub (`weft.foundryside.dev`) is documentation-only and is covered by the IA
itself, not reviewed as an app.

---

## Owner decisions (resolved 2026-06-14) — these reframe the findings

1. **Theme: LIGHT wins.** The single warm-linen light theme (design system + IA) is
   authoritative. The deliberately-dark Loomweave/Legis `www/` and the dark-first
   mkdocs defaults are superseded.
2. **Stack: ALL sites rebuild on Astro + shared `@weft/site-kit`.** The existing
   `www/` (Loomweave, Legis) and mkdocs sites (Wardline, Warpline) become **reference
   material, not the deploy artifact.**
3. **Legis org: already migrated.** `git remote` for `~/legis` is
   `github.com/foundryside-dev/legis` — the repo has moved. The "links 404" blocker
   is **resolved**; only a stale caveat in `legis/www/README.md` still claims
   `tachyon-beep` (1 file).

**Consequence — two classes of finding.** Because every site is rebuilt on Astro +
site-kit with the light theme, a class of findings is now **moot** (they describe the
soon-to-be-reference artifacts):
- Dark-theme defaults (Loomweave, Legis, Wardline, Warpline)
- mkdocs `site_url` `/docs/` subpath (Wardline, Warpline) and missing mkdocs deploy/CNAME
- Hand-rolled nav/footer, missing shared components in `www/`
- Thread color *in the `www/` CSS* (the new Astro sites pull color from site-kit)

What **carries into the rebuild** is the *content* — these are the findings that
matter, because the Astro sites source from them:
- Factual/roster drift (Charter-as-5th-member, Warpline pairings, Legis "design-only")
- Dead/dev paths (`~/loom`, `~/weft` tilde, `file:///`) in markdown docs
- Stale install/version facts (Loomweave `TAG=v1.1.0`)
- Missing reference docs (Wardline + Legis MCP refs; Legis CLI ref)
- Security overclaim (Wardline IRAP/SOC2)
- Thread color **in `products/*.md`** (the hub cheat-sheets, which the hub roster reads)
- Lacuna factual error + generated-tour emoji
- Missing Lacuna CTA (template-injected at build, but the decision is open)

The per-app reports below retain the full finding lists (including the now-moot ones,
which still apply if any existing site were published before the rebuild).

---

## Per-app verdict

| App | Ready? | Blockers | Major | Headline state |
|---|---|---|---|---|
| **Filigree** | with-fixes | 4 | 7 | Strongest doc set in the suite; all blockers are stale-reference/roster fixes, no authoring |
| **Wardline** | with-fixes | 1 | 5 | Most doc-mature; ships a real docs site; voice exemplary; 1 config blocker |
| **Loomweave** | with-fixes | 3 | 6 | Already ships 5 HTML pages + CNAME; needs retheme/retoken + honest-limits |
| **Warpline** | with-fixes (blocker cleared) | 2 | 3 | New doc set **clears the IA hard blocker**; remaining blockers are deploy config only |
| **Legis** | with-fixes¹ | 3→1 | 4 | Org migration **done** (was the main blocker); needs CLI/MCP refs + content fixes. ¹downgraded from "no" after remote check |
| **Lacuna** | **no** | 2 | 2 | Factual error (Legis "design-only" — it's live); emoji in generated tour |

"Ready: no" ≠ far off — both are fixable in one focused pass. Nothing here needs
re-architecting; every finding is an edit, a retoken, a config fix, or a short
authoring task.

---

## Cross-cutting patterns (fix once, centrally)

These recur across repos and are cheaper to fix as a sweep than per-app.

### 1. Thread-color drift — the pre-rename palette is still live in shipped surfaces
The rename to the design-system palette (indigo/brass/madder/walnut/copper/ash)
did not reach two shipped sites or the hub cheat-sheets.
- **Loomweave**: `www/colors_and_type.css` ships `--thread-loomweave: #52C9B8` (**aqua**); should be **indigo**. Also `products/loomweave.md` eyebrow says "Aqua thread."
- **Legis**: `www/` built **violet** (`--thread-legis: #B79BF2`) throughout; should be **walnut**. Also `products/legis.md` eyebrow says "Violet thread."
- **Correct already**: Wardline (madder), Warpline (copper), Lacuna (ash, n/a). Filigree carries no thread color in-repo (consumed from shared site-kit).
- **Fix**: retoken the two `www/` CSS files; correct the two `products/*.md` eyebrows. (This is the IA §6 / known-drift item, now confirmed concrete in two repos + the hub.)

### 2. Dark theme vs. the light brand — 4 of 6 ship dark
The design system is a single warm-linen **light** theme, no toggle. But:
- **Loomweave** `www/` — all 5 pages `data-theme="dark"` (README calls it canonical).
- **Legis** `www/` — `data-theme="dark"` default.
- **Wardline** `mkdocs.yml` — `scheme: slate` (dark) path.
- **Warpline** `mkdocs.yml` — dark-first palette.
- **This is an owner call** (see Decisions below): the existing dark sites were *deliberately* built "warm espresso" dark. The IA/design-system say light. Confirm before anyone flips them.

### 3. Federation docs lag the Warpline admission (PDR-0022)
Warpline is the 5th member but most repos predate it:
- **Filigree** `contracts.md` lists "Charter" as the 5th admitted member (wrong — it's Warpline) **and** omits the live `warpline_worklist_ingest` seam from `federation/index.md`.
- **Loomweave** `concepts.html` lists Charter not Warpline as an SEI consumer; federation section omits the Warpline pairing.
- **Legis** & **Wardline** `www`/docs omit the Warpline pairing card (correctly `planned`, but absent).
- **Fix**: every member's "how it composes" needs a Warpline pairing card with honest status (live for Filigree; planned/frozen-seam for the rest), and Charter must stop being listed as an admitted member.

### 4. Internal/dev paths that publish as dead links
- `~/loom` (old hub path) — Filigree `README.md`, `contracts.md`.
- `~/weft` tilde filesystem paths — Wardline `guides/weft.md`, Lacuna `README.md`.
- `file:///home/john/weft/doctrine.md` localhost URL — Filigree `contracts.md`.
- **Fix**: replace with `https://weft.foundryside.dev/#…` or GitHub blob URLs. The IA §2.3 rule (absolute cross-subdomain URLs) covers all of these.

### 5. Missing the Lacuna CTA — all 5 members
Not one member doc links `https://lacuna.foundryside.dev` ("see it on the
specimen"), an IA §5.1 block-8 requirement. Cheapest to inject from the shared
site-kit template rather than authoring per repo — but the decision (template-injected
vs. repo-sourced) is open (IA §6 item 4).

### 6. Missing public MCP-tool reference — Wardline (18 tools) & Legis (21 tools)
Both expose the tools in source and describe some in prose, but neither has a
machine-readable reference doc the site can link as its deep MCP page. Filigree
(118), Warpline (new), and Loomweave have theirs. **Authoring task** for two repos.

---

## App-specific blockers worth surfacing

- **Legis is hosted under the wrong org.** The repo lives under `tachyon-beep`, not `foundryside-dev`; every external link in its `www/` 404s today. This is an **external dependency** (repo migration) that gates the Legis site and may affect the foundryside-dev assumption baked into the whole subdomain plan. → escalation, see Decisions.
- **Loomweave install is broken.** `www/` install scripts use `TAG=v1.1.0`, which is not a tagged release (latest is `v1.0.0`, current build is `v1.1.0-rc5`) → 404 for anyone following the docs.
- **Wardline overclaims compliance.** `guides/assurance-posture.md` invokes "IRAP or SOC 2 assessor" — contradicts the suite's deconfliction-not-security posture. Strip it.
- **Lacuna states a falsehood.** `README.md:61` calls Legis "design-only"; Legis is live with 3 passing tour legs. Plus `✅` emoji on every `docs/tour.md` heading (generator issue in `tour/docs_gen.py`).
- **Two mkdocs sites have the `/docs/` subpath bug.** Wardline and Warpline both set `site_url: …/docs/`; the IA model is domain-root. Warpline additionally has no docs-deploy workflow and no `CNAME`.

---

## What's genuinely good (don't re-do)

- **Accuracy held up under verification.** Every reviewer traced machine facts (tool names, schema ids, exit codes, enum values, ports) to executable source. Almost no factual drift in the technical content — the drift is in *framing/metadata* (roster, thread color, paths), not in the tool docs.
- **Voice is strong suite-wide.** No emoji in product copy (except Lacuna's generated tour), no hype, honest-limits framing consistently upheld. Wardline's attestation threat-model and Legis's "not a hardened security boundary" are exemplars.
- **Warpline's new doc set is solid** — independently verified, clears the IA blocker. The remaining items are config, not content.
- **The rename is clean** — zero "heddle" leakage in any public doc.

---

## Recommended sequence

1. **Central sweep (cheap, high-leverage):** thread-color retoken (2 repos + 2 hub files); Warpline pairing cards + Charter-is-not-a-member fix across all members; dead-path replacement. Knocks out patterns 1, 3, 4 and several blockers at once.
2. **Per-repo blocker fixes:** Filigree (4 ref fixes), Loomweave (install tag, honest-limits, retoken), Wardline (mkdocs `site_url`, IRAP strip, MCP ref), Legis (await org migration, retoken, CLI+MCP refs), Lacuna (Legis-is-live fix, tour generator emoji), Warpline (mkdocs `site_url`, CNAME, deploy workflow).
3. **Authoring tasks:** Wardline + Legis MCP references; Legis CLI reference; hub `products/warpline.md`.
4. **Decisions below — resolve before build.**

---

## Decisions

**Resolved 2026-06-14** (see top of doc): theme = light; stack = all-Astro + site-kit;
Legis org = already migrated.

**Still open:**
1. **Lacuna CTA sourcing** — template-injected (shared site-kit) vs. repo-authored per member (IA §6 item 4). Leaning template-injected.
2. **Build the shared `@weft/site-kit` first.** The all-Astro decision makes the site-kit (nav, footer, `MemberMark`/`SeiTag`/`EnrichmentChip`/`ExitCode` components, shared ROSTER/MATRIX data, light-theme tokens) the critical-path dependency every site blocks on. Recommend building it as the first deliverable, validated by building the hub on it, before the 6 member/showcase sites.

## Recommended next deliverables (post-decision)
1. **Content-fix sweep** — the "carries into the rebuild" list above, as a tracked batch (mostly central: roster/Warpline/Charter, dead paths, two `products/*.md` thread colors, Lacuna's Legis-is-live + tour emoji, the stale `legis/www/README.md` tachyon-beep note).
2. **Authoring** — Wardline + Legis MCP references; Legis CLI reference; hub `products/warpline.md`.
3. **Build `@weft/site-kit`** (light-theme tokens + components + shared data), prove it on the hub, then the 6 sites.

All six per-app reports + the IA + this synthesis live in `web/`. The Warpline doc set
(uncommitted in `~/warpline`) and these review files are not yet committed.
