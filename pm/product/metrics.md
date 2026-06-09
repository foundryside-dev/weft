# Metrics — Weft Federation             Last read: 2026-06-09

> Targets below are falsifiable-by-shape PLACEHOLDERS (number + date) for the owner
> to set real values against — most baselines are not yet instrumented. A directional
> word is not a metric; reject it. Kill/keep logic: product-metrics-and-experimentation.md.

## North-star
| Metric | Target (falsifiable) | Current | Read on | Trend |
|--------|----------------------|---------|---------|-------|
| **Dogfood pass rate** — % of planted lacuna defects an agent surfaces *and* tracks **using the suite, not grep** ("if the agent prefers grep, the tool failed") | ≥ 90% by 2026-07-31 *(placeholder — owner to set)* | BASELINE — not yet measured; dogfood-3 found `make ci` red (2/3 stages) | 2026-06-09 | — |

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
| **Enrich-only invariant** — cross-member hard-blocks (a sibling's absence breaking another's core flow) | ceiling = 0 | 0 known load-bearing blocks (F4 closure-gate watched) | 2026-06-09 |
| **Tree cleanliness** — members dirtying the working tree at rest (blocks legis signing) | ceiling = 0 | 1 open: loomweave runtime DB under `.weft/` (`weft-d822a7de2d`) | 2026-06-09 |
| **Finding duplication** — duplicate finding rows from fingerprint drift | ceiling = 0 | breached: WL-1 mints duplicates on unchanged source (`weft-4a9d0f863c`) | 2026-06-09 |
