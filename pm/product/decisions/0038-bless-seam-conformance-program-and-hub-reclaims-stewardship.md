# PDR-0038 — Bless the federation seam-conformance program (conditional) + hub reclaims seam stewardship

**Date:** 2026-06-28 · **Status:** **accepted** (conditional bless; PM hub-governance, within grant) · **Class:** seam blessing + governance reconciliation · **Tracking:** `weft-b5dde278b9` (program); `weft-dbaada5883` (reclaim stewardship); `weft-60a941bd19` (L3 roll-up).

## Context

A substantial **member-driven** seam-conformance program shipped bottom-up (wardline `feat/weft-seam-conformance` — a weft seam registry + "P0 fail-closed gate" + a reason-carrying federation-status envelope + shared `WeftHttp` transport; filigree `feat/weft-suppression-conformance` — 8 consumer-side oracles). It was untracked in the hub until 2026-06-25. Under "hub blesses every seam," it needs a hub ruling: bless + reconcile against the hub's own seam-health design (`pm/2026-06-15-seam-health-map.md`), or fork.

## Findings (adversarial recon, 2026-06-28)

- **The "fail-closed gate" is a CI/PR-suite conformance test, NOT a runtime gate** (`tests/conformance/test_seam_registry.py`; 0 refs in `src/`). It reddens the pipeline if the registry lies; it never blocks a member's request path. **No enrich-only violation.**
- **Converges** with the seam-health map: the PRD cites it as authoritative spec, adopts the L1/L2/L3 split, defers the **L3 roll-up to legis**, and forbids the lying self-reported status field (it round-trips real producer symbols, byte-pinned, non-circular).
- **Scope:** what shipped is the map's *honesty-invariant guardrail + CI conformance substrate* (roadmap #2–3). The **runtime probe surfaces — L1 `doctor --seams`, L2 sentinel round-trip, L3 legis roll-up — are PLANNED/UNBUILT** (2026-07-31 targets).
- **The one fork is governance-shaped:** wardline self-appointed "weft seam steward," keeps a federation-*wide* registry pending a hub seam-index that "doesn't exist" (it's *us*, `~/weft`), and **dispatched cross-sibling rulings** on legis.

## Decision

**CONDITIONAL BLESS.** The conformance **machinery** is blessed as the operational realization of the seam-health map's roadmap #2–3 (the CI registry + CI-only gate + the reason-carrying honesty envelope, killing the map-flagged hardwired `failed:[]`). **The substrate is blessed, not a runtime probe that isn't there** — seam-health *the feature* (`weft-b6effe30f9`) is **not done**; the L3 roll-up is owed to legis (`weft-60a941bd19`).

**Three reconciliation conditions** (filed as children of the seam-health epic):
1. **Re-home / ratify the canonical seam-index to the hub** (`weft-dbaada5883`) — wardline's federation-wide registry syncs *up* to a hub-owned index; the hub copy is canon, not the wardline-resident one.
2. **Dissolve the self-appointed "weft seam steward = wardline" role.** Wardline *runs* conformance + *surfaces* findings (excellent — keep); cross-sibling **rulings/dispatches** are hub blessings, no bilateral negotiation.
3. **The specific cross-sibling rulings:** "reverify ruled out → legis drops it" is **ratified in substance** (it matches the hub ruling PDR-0037) but recorded as a *hub* call; the wardline "false freeze" finding on legis preflight **appears already resolved by legis 1.3.0's `HttpWarplineClient→WarplineMcpClient` rewire** — verify in a legis-rooted session, do not re-open.

The `self_authored_producer` freezes (suppression/finding-identity/vocab/taint) are within wardline's legitimate producer ownership + bilaterally conformed by filigree oracles — additive/owner-owned, hub-unratified, low risk.

## What this does NOT do

It does not bless the runtime probe (unbuilt), does not ratify the steward role or the cross-repo dispatch (conditions 1–2 must close first), and does not itself perform the registry re-home or the wardline role-reframe (those are the tracked follow-through).

## Reversal / decision trigger

The bless is withdrawn if the CI gate ever moves into a member's **runtime** path (would break enrich-only), or if the wardline-resident registry becomes **de-facto federation canon** before the hub re-home closes (condition 1). Either trip reopens the fork.

## Provenance

PM hub-governance blessing, session 2026-06-28, grounded in adversarial recon against `pm/2026-06-15-seam-health-map.md` + the interface-lock §4A/GV-LG-3. Extends "hub blesses every seam" and PDR-0023 (seam-health is the central feature).
