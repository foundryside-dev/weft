# PDR-0043 — Warpline glossary-freeze ATTESTED (v1); "wire the GS-7 gate" is distributed, not a flip

- **Date:** 2026-07-01
- **Status:** accepted (owner-authorized outward-facing acts: glossary-freeze + GS-7 wiring)
- **Bet/Now:** fabric-first (PDR-0035) — the seams are the product (PDR-0023)

## Context
Warpline delivered its FINALIZED 5th-producer conformance package at `main @ v1.3.0` (tag
`3768794`; 19 golden vectors green, 7 frozen tools, admitted-frozen inventory — source-verified
2026-07-01). It asked the hub owner for two owner-reserved acts: sign the glossary-freeze, and
wire warpline as the 5th GS-7 producer + turn the gate on. Owner authorized **"Freeze + wire &
flip"** (AskUserQuestion, 2026-07-01).

## Act 1 — Glossary-freeze: ATTESTED v1 (owner, 2026-07-01)
The warpline public contract surface (§4 of the handover) is **frozen at v1**; any change is a
new vN+1 URI, never a v1 mutation:
- **7 endorsed MCP names + 7 shims** (impact_radius_get/blast_radius, edge_snapshot_capture,
  change_list, entity_churn_count_get, reverify_worklist_get, entity_timeline_get,
  verification_record).
- **11 error codes + 3 retryability values** under `warpline.error.v1`.
- **Enrichment vocab CLOSED** — 6 keys (sei/work/risk/governance/requirements/edges) + value
  sets + the **11 reason classes**. (Verification-freshness deliberately rides as a
  reverify-item field, NOT a 7th key — the vocab is untouched.)
- **Schema URIs** — `warpline.golden_vectors.v1`, `warpline.mcp_tool_inventory.v1`,
  `warpline.error.v1`, `warpline.verification_record.v1`, and the 6 `warpline.<contract>.v1`.
Low-risk: the surface has been stable since admission (2026-06-13) through 1.3.0. Authoritative
record = this PDR + the note on `weft-13f84c77c5`; ticking warpline's §4 checkboxes is a
follow-up.

## Act 2 — "Wire the 5th producer + flip the gate": it's DISTRIBUTED, there is no central flip
Executing revealed the ground truth (the handover's own framing was hub-central; the reality is
per-member): **GS-7 is realized as each consumer's CI machine-loading/rechecking the sibling
producers it consumes.** The hub repo has NO conformance CI (only `deploy-site.yml`). So:
- **Producer half — DONE.** warpline's own CI runs its 19 golden vectors (via its pytest suite) →
  self-gated at v1.3.0, full parity with the four peers.
- **Consumer half — mostly DONE, two gaps filed.** legis rechecks warpline
  (`test_warpline_preflight_oracle.py` + `test_warpline_attestation_oracle.py`) ✅; wardline
  rechecks warpline (fail-closed `source-drift` checkout of warpline + `warpline_e2e`) ✅.
  **Gaps:** filigree consumes `reverify_worklist.v1` with no warpline oracle (`weft-87443311a0`);
  loomweave has `warpline_churn_consumer.rs` that needs confirm-or-harden to conformance-grade
  (`weft-7931a32599`). Both dated, additive/test-only, ship solo.
- **No gate to flip.** There is no single central GS-7 gate; the closest central registry
  (wardline `seam_registry.json`, PDR-0038) is a *different* mechanism still on wardline's
  unmerged `release/consolidation` branch. "Turning the gate on" = the per-consumer oracles
  above being green in each member's CI.

## Act 3 (hub sub-decision) — the 3 consumed-contract goldens stay warpline-local
Since there is no central GS-7 fixture tree to mount them into, warpline's mirrors of
legis/wardline/plainweave contracts **stay warpline-local**. The real drift-detection mechanism
in this distributed model is a **source-drift job** (the wardline pattern: check out the sibling
authority's source and byte-compare the mirror). Recommend warpline adopt one for its 3 mirrors;
noted on `weft-13f84c77c5`, foldable into the seam-conformance program (PDR-0038).

## Why this honors the authorization (not a reversal)
The owner's "wire & flip" stands; on the ground it decomposes into: freeze = done; warpline
self-gates = done/parity; consumer rechecks = legis/wardline done + filigree/loomweave dated
tickets; no central flip exists. Executing what's real and naming the precondition on what isn't
is the honesty discipline, applied to our own runbook.

## Reversal / follow-ups
- If a warpline v1 contract needs to change, it is a vN+1 URI — the freeze does not permit a v1
  mutation. A forced v1 change reopens this PDR.
- Close `weft-13f84c77c5` once the two consumer-oracle gaps land (then every warpline-consumer
  seam has a CI recheck — the true "gate on").
- Re-confirm at the next federation audit re-run.
