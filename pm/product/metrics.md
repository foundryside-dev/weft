# Metrics — Weft Federation             Last read: 2026-06-26

> Targets below are falsifiable-by-shape PLACEHOLDERS (number + date) for the owner
> to set real values against — most baselines are not yet instrumented. A directional
> word is not a metric; reject it. Kill/keep logic: product-metrics-and-experimentation.md.

## North-star
| Metric | Target (falsifiable) | Current | Read on | Trend |
|--------|----------------------|---------|---------|-------|
| **Dogfood pass rate** — % of planted lacuna defects an agent surfaces *and* tracks **using the suite, not grep** ("if the agent prefers grep, the tool failed") | ≥ 90% by 2026-07-31 *(placeholder — owner to set)* | **post-fix validation (2026-06-15): 16/17 MCP-surface green · 4/4 federation joins green · 8/8 structural lacunae reachable** (`~/lacuna/docs/dogfood/2026-06-15-postfix-validation-report.md`). Only residual: narrow Fix-B package-name-recursion bug `lacuna-522ab56124` (blocks no join). Correctness north-star is **essentially maxed.** | 2026-06-15 | 1/4 → **4/4 joins** (pre-fix → post-fix) |

## Input metrics (the levers that move the north-star)
| Metric | Target | Current | Read on |
|--------|--------|---------|---------|
| Time-to-orient for a resuming agent (boot → actionable "what's next") | ≤ TARGET *(set after baselining)* | not instrumented (Next-bet mechanism A builds this) | 2026-06-09 |
| **Supervision load** — how much the operator must *watch* per dispatched ticket (the real outcome the Next bet buys: fire-and-forget delegation; PDR-0004) | can dispatch in parallel **without babysitting** *(set a concrete proxy after baselining)* | BASELINE — operator is today the live deconfliction backstop; cannot fire-and-forget | 2026-06-09 |
| **Stomp interventions** (proxy/input for supervision load) — operator catching an agent stomping another's in-progress work (the "oh-shit-ESC" event) | **→ 0** (after Next-bet mechanism B) | **BASELINE ~1/wk diligent · ~every 2–3 days impaired · never zero** (operator-reported; 3 observed cases incl. one live mid-discovery 2026-06-09; recovery now near-trivial — value is supervision-load, not catastrophe, per PDR-0004) | 2026-06-09 |
| Finding round-trip fidelity (wardline emit → filigree, suppression/baseline state preserved) | 100% of baselined findings carry provenance + are filterable | partial — N2 residual: 33 baselined findings still land `status:open` (`weft-171fc22a50`) | 2026-06-09 |

## Guardrails (must NOT degrade)
| Metric | Floor / ceiling | Current | Read on |
|--------|-----------------|---------|---------|
| **Enrich-only invariant** — cross-member hard-blocks (a sibling's absence breaking another's core flow) | ceiling = 0 | 0 known load-bearing blocks (F4 closure-gate watched). **06-24:** post-launch ships (loomweave 1.3.1, wardline 1.0.6, legis 1.1.1, warpline 1.2.0) all **additive/patch** — no breaking cross-member contract; wardline now **fail-soft on Loomweave emit errors** (strengthens enrich-only). No reversal trigger fired. **06-26:** members continue shipping additive/patch (filigree 3.1.0 — warpline reverse-lookup + per-issue commit-anchor, schema v29; legis 1.2.0-prep — per-SEI attestation classifier; plainweave 1.0.0; loomweave Rust-plugin fixes; wardline 1.0.7). No breaking cross-member contract; guardrail still 0 (filigree v29 + commit-anchor flagged for a blast-radius confirmation pass). | 2026-06-26 |
| **Tree cleanliness** — members dirtying the working tree at rest (blocks legis signing) | ceiling = 0 | 1 open: loomweave runtime DB under `.weft/` (`weft-d822a7de2d`) | 2026-06-09 |
| **Finding duplication** — duplicate finding rows from fingerprint drift | ceiling = 0 | wardline WL-1 breach (`weft-4a9d0f863c`) still open; **loomweave's instance FIXED 2026-06-13** (B10 `weft-7256739b31`: site-keyed secret-finding identity + incremental sweep, self-heals existing dupes on next analyze) | 2026-06-13 |
