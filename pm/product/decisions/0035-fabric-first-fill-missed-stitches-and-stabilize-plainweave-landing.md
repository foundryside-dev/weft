# PDR-0035 — Fabric-first: today's bid = fill the missed stitches + stabilize Plainweave's landing in sibling APIs (resolves PDR-0034 toward stabilize-first)

**Date:** 2026-06-28 (bid given 2026-06-27 eve) · **Status:** **accepted** (owner-directed) · **Class:** Now-bet selection / fabric stabilization · **Tracking:** seam-health epic `weft-b6effe30f9`; the FILL-NOW queue below.

## Context

The launch cutover shipped 2026-06-17; the active Now bet was un-chosen (a pending DECIDE). PDR-0034 had **deferred** the full-Tenter go/no-go on *federation-fabric volatility* ("pieces land in different peers at different times"), with PM owing an analysis of *full-Tenter-now vs. stabilize-the-fabric-first*. This session the owner answered by naming the day's bid directly.

## Decision

**The owner named two bids for the session, refined to his words:**
1. **Fill the missed stitches** — functionality *deferred* to ship the clean-break launch (the fast-follow consumer impls, `RESERVED-SHAPE` seams, proven-need-pending items). Not generic "smooth the seams" — specifically the deferred-only set.
2. **Stabilize Plainweave's landing in everyone else's APIs** — make Plainweave's cross-member seams real, not spec-only. On the follow-up fork ("build real landings vs harden-only"), the owner chose **build real landings**.

**This implicitly resolves PDR-0034 toward STABILIZE-THE-FABRIC-FIRST.** Choosing to fill deferred functionality + stabilize Plainweave *is* the start-gate condition PDR-0034 named; the **full-Tenter build stays deferred** this session (not reopened). The fabric wobble is real and observed live: **legis `main` moved twice mid-session** (`79b4008→6d6fa3c→395d7fc`) and **plainweave `main` moved** (`92ec70a→de13416`) — the daily-ship reality is the thing being stabilized.

## What shipped against the bid (this session)

- **Bid 1 first fill:** Loomweave churn/recency consumer (`weft-670ec2fe90`) — branch `~/loomweave feat/warpline-churn-consumer`, 1957 tests green, enrich-only/honest-degrade, **not merged** (live-validation gates merge).
- **Bid 2 first fill:** Legis←Plainweave advisory-preflight consumer (`weft-46b2f002fa`) — branch `~/legis feat/plainweave-preflight-consumer`, all gates green, exercises Plainweave's one built producer end-to-end; **not merged**.
- The legis-reverify DROP ruling (PDR-0037) and the seam-conformance blessing (PDR-0038).
- Discipline: ~17 tracker items filed/updated; the dup website epic closed; every deferred stitch + every Plainweave cross-member debt now has a dated home (no invisible punting).

## What this does NOT do

It does **not** admit Tenter or start the full build (PDR-0034 deferral stands), does **not** merge the two member-branch fills (live cross-member validation in member-rooted sessions gates merge), and does **not** touch the held doctrine/registries canon de-fuse.

## Reversal / decision trigger

The fabric-first posture holds until **the deferred-stitch FILL-NOW queue is worked down AND Plainweave's seams stop moving / reach shipped-not-folding-in** (the PDR-0034 stability proxy). When the fabric reads stable, reopen the full-Tenter go/no-go. **Reversal:** if a member's daily ship *breaks* a frozen cross-member contract (enrich-only guardrail trips, metrics.md ceiling=0 → >0), fabric-first escalates from "fill stitches" to "freeze + repair."

## Provenance

Owner-directed bid, PM session 2026-06-27 eve → 06-28. Built on PDR-0034 (the deferral this resolves), PDR-0027 (decent-L1/inviolate-contracts), and the seam-health frame (PDR-0023).
