# PDR-0031 — Warpline v1 glossary-freeze signed; `enrichment_reasons` blessed as a v1-compatible additive key

**Date:** 2026-06-24 · **Status:** Adopted (owner ruling, in-session AskUserQuestion) · **Class:**
hub-blessed seam contract / glossary-freeze (owner-reserved per the Warpline handover) · **Tracking:**
`weft-12410be4e2` (the ruling), `weft-13f84c77c5` (GS-7 wiring).

## Context

Warpline (5th member, PDR-0022/0026) delivered a 5th-producer conformance handover
(`~/warpline/docs/integration/2026-06-22-warpline-5th-producer-handover.md`). It asks the hub to (1) wire
Warpline into the GS-7 conformance oracle as a fifth producer and (2) **freeze** its contract surface. The
handover is explicit that **"GS-7 inclusion and the glossary freeze are the owner's act."**

A premise needed verification first. The owner-relayed guidance said v1.2.0's success envelope *gained* a
top-level `enrichment_reasons` key; the handover §1, however, listed the envelope **without** it and noted
the static fixtures don't carry it (a pending 1.2.1 patch). **Verified against executable source**
(`~/warpline/src/warpline/envelope.py:67/78/97`, `commands.py:317/424/510/1147`, and the executable golden
vectors `tests/contracts/test_golden_vectors.py:422–480`): `enrichment_reasons` **is shipped in v1.2.0**, a
new top-level success-envelope key (`{reason_class, cause, fix}` triples per enrichment dimension, sibling
of the closed `enrichment` vocab), emitted under the **existing `warpline.<contract>.v1` URIs** and asserted
by the executable oracle. Only the *static* `mcp-response-*.json` fixtures lag (Warpline issue
`warpline-fc09bdeddd`, a 1.2.1 patch). The handover §1 prose was stale; the code is authoritative.

## Decision (owner — AskUserQuestion, 2026-06-24)

1. **`enrichment_reasons` is blessed as a v1-compatible additive key.** It adds a sibling top-level
   envelope key, mutates no closed vocabulary or existing value, and subset-validating consumers are
   unaffected — and it carries the suite's honesty surface (the "no confident-empty" doctrine). The
   distinction is principled: a **new top-level key** is v1-compatible additive evolution; it is **not** the
   category Warpline's §4 reserves for v2.
2. **Reaffirmed strict line:** any change to the **closed enrichment vocab (6 keys), the 11 error codes
   + 3 retryability values, or the 11 reason classes** remains a **new `…v2` URI, never a v1 mutation.**
3. **The GS-7 glossary-freeze attestation is signed.** Frozen as inviolate (future change = a new vN+1 URI):
   - the 6 endorsed MCP names + 6 shims;
   - the 11 error codes + 3 retryability values (`warpline.error.v1`);
   - the 6-key enrichment vocab + the 11 reason classes;
   - the schema URIs (`warpline.golden_vectors.v1`, `.mcp_tool_inventory.v1`, `.error.v1`, + the 6
     `warpline.<contract>.v1` data schemas), **now understood to include the additive `enrichment_reasons`
     top-level key under v1.**
4. **Required before the GS-7 gate flips:** Warpline's **1.2.1 fixture patch (`warpline-fc09bdeddd`)** lands
   so the static `mcp-response-*.json` fixtures carry `enrichment_reasons` and match the executable. Until
   then the static and executable surfaces disagree; gating on disagreement is incoherent.

## What this does NOT change

- **GS-7 gate-activation stays the owner's runbook act.** This PDR clears the freeze *blocker* on the
  wiring ticket `weft-13f84c77c5`; it does not itself turn the producer gate on.
- **Warpline stays enrich-only / local-only** (`meta.local_only:true`, `peer_side_effects:[]`); it never
  gates. Admission was already settled (PDR-0022/0026); this is a contract freeze, not a re-admission.
- **No sibling is billed.** The reciprocal Rung-2 "proven-good" reads (`weft-7673e1fa79`) remain
  future-contingent (prove-the-need); this ruling is about Warpline's own contract surface.

## Reversal trigger

If a consumer is found that does **strict** (not subset) envelope validation and breaks on the additive
`enrichment_reasons` key, the v1-compatible classification is falsified — escalate to a `…v2` URI for the
affected contracts. None is known today (the federation convention is subset validation).

## Precedent (reusable)

**A new top-level envelope key, added without mutating any closed vocabulary/value, is v1-compatible
additive — it ships solo under the existing v1 URI.** Only mutations to a closed vocab / error-code set /
reason-class set require a `…v2` URI. This sharpens the post-launch change discipline's "additive ships
solo" rule along the v1-vs-v2-URI axis (a different axis than lockstep/gating).

## Propagation

`registries/claims.md` (new C-17), `members/warpline.md` (version snapshot + freeze note),
`pm/product/current-state.md` (escalation #2 resolved), tracker (`weft-12410be4e2` closed,
`weft-13f84c77c5` blocker cleared). **Flagged for follow-up:** the Warpline interface-lock + GS-7 oracle
fixture tree are warpline-repo / oracle-side artifacts (warpline owns its freeze doc).

## Provenance

Owner AskUserQuestion, PM session 2026-06-24 — "Bless as v1-compatible additive" + "Sign the freeze."
Premise verified against `~/warpline` source (not the handover prose). Related: Warpline handover
2026-06-22; interface-lock §8 (OD-5 → fold into GS-7); PDR-0027 (contracts inviolate); the post-launch
change discipline (additive/versioned/breaking release modes).
