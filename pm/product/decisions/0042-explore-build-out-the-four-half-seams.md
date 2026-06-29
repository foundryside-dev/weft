# PDR-0042 — Explore/build-out the 4 producer-with-no-consumer half-seams

- **Date:** 2026-06-29
- **Status:** accepted (owner directive — scope exploration into the fabric-first Now)
- **Bet/Now:** fabric-first (PDR-0035) — "fill the missed stitches"; this names four specific missed stitches

## Context
The 2026-06-29 federation audit (PDR-0039) surfaced four seams that are PRODUCED but have
no landed consumer — half-seams, one end only: (1) loomweave SEI lineage/rename feed,
(2) loomweave callers/callees, (3) plainweave `wardline_peer_facts.v1`, (4) plainweave
`requirements_enrichment.v1` → warpline reserved slot. On reviewing the gap inventory the owner
directed: "build out everything we can, so we will at least explore those 4."

## Call
Filed umbrella `weft-06ab23e656` + four exploration spikes under the seam-health epic:
`weft-88a9559a0f` (lineage), `weft-fa5b23e8c9` (callers/callees — cross-refs FD-1),
`weft-61c55deab9` (wardline_peer_facts), `weft-0718035e5e` (requirements_enrichment → warpline).

## Discipline (so "build out" ≠ "build because we can")
Each spike runs **prove-the-need** ([[weft-prove-the-need]]) and has three honest exits:
- **BUILD** the consumer — only on a real consumer flow / golden vector; hub-blesses the seam
  ([[weft-hub-blesses-every-seam]]); enrich-only (never-gates, never load-bearing); dated
  counterparts owed in affected member trackers at build-commit.
- **TERMINAL-BY-DESIGN** — a producer whose consumer is the *agent/harness*, not a sibling, is
  not a gap (likely answer for callers/callees → route to FD-1, and for wardline_peer_facts).
- **PARK** with a dated rationale; for #4, a third sub-option is **downgrade the advertisement**
  (remove the unratified "reserved slot" so neither end advertises a dead seam —
  [[weft-input-affordances-are-promises]]).

## Why this is in-Now, not scope-creep
Fabric-first is exactly "fill the missed stitches." These four are named missed stitches. The
guard is that exploration is cheap and the exits include "park" — we are not committing to build
all four, only to *decide* each deliberately instead of leaving them as silent half-seams.

## Reversal trigger
- If a spike can't find a real consumer need, the honest outcome is park/downgrade — do NOT
  build to "complete the seam." A producer with no proven consumer is reserved-shape, not a
  frozen obligation.
- If exploring these displaces the higher-value fabric-first work (scan_manifest bless, Bid-2
  preflight landing), de-prioritize the spikes — they are P2, those are the P1 path.

## Carried-forward (NOT actioned this session — keep visible, don't invisibly punt)
Two doc-only gaps from the audit were offered-to-file but not yet ticketed: **AMBER-3**
(wardline file artifacts carry a bare fingerprint → plainweave silent join-miss on a scheme bump)
and **AMBER-8** (filigree hard-blocks on loomweave registry for scan-ingest — the one
load-bearing-shaped seam; the enrich-only guardrail's open watch). File both if they survive the
next audit re-run after wardline seam-conformance lands.
