# PDR-0045 — Hub reclaims the seam-index canon + dissolves the wardline steward role

- **Date:** 2026-07-01
- **Status:** **accepted** (PM hub-governance, within grant — closes conditions PDR-0038 named; zero owner-reserved acts)
- **Class:** governance reconciliation (seam stewardship re-home)
- **Bet/Now:** fabric-first (PDR-0035) — the seams are the product (PDR-0023)
- **Tracking:** `weft-dbaada5883` (reclaim; conditions 1–2), `weft-b5dde278b9` (the blessed program). Closes PDR-0038 condition **3** outright; conditions **1–2** are done **hub-half** (canon + role dissolution recorded here) with the **wardline-half tracked** (`weft-83c25d96e3`). **[LANDED 2026-07-01 — PR #86 merged (`f7fb89e6`); `weft-dbaada5883` CLOSED; see the Update section at the end.]**

## Context

PDR-0038 conditionally blessed wardline's excellent federation-wide seam-conformance
**machinery** but left two governance conditions open: **(1)** re-home the canonical
seam-index to the hub, and **(2)** dissolve the self-appointed *"weft seam steward =
wardline"* role, moving cross-sibling **rulings** to hub blessings. This PDR closes them.

The urgency is real and now measurable. Wardline's 775-line federation-wide
`tests/conformance/seam_registry.json` — which grades ~21 seams wardline is **not a
party to** and bakes in cross-sibling rulings — **is on wardline `origin/main`**
(verified `git ls-tree origin/main`; e541ff09-era, since advanced). That is precisely
PDR-0038's reversal-trigger condition ("*withdrawn if the wardline-resident registry
becomes de-facto federation canon before the hub re-home closes*"). **Closing the
re-home is what keeps PDR-0038's bless intact** — not a withdrawal of it. The hub has
been *holding* seam canon in PDR prose (0037/0043/0044) for lack of a home; it is
*holding, not ceding*. This PDR builds the home.

## Decision

**The smallest real reclaim: a governance/provenance move, NOT new machinery.** Three parts.

### 1 — Declare the hub-owned canon (condition 1)
The canonical seam-index is hub-owned at **`contracts/seam-index.json`** — a
machine-readable **CATALOG + BLESSING registry** (seam id · contract URI ·
producer/consumer · hub blessing PDR · catalog status), the second member of the
`contracts/` family the maturation-plan §2.2 opened with `weft-reason-vocab.json`.
Wardline's `seam_registry.json` is hereby a **producer-contributed conformance
MIRROR**, not federation canon. The index is **NOT a live verdict store**: conformance
verdicts (`at_bar`/`gap`/`peer_conformant`) stay **distributed in each member's own
CI** (the hub cannot mechanically verify a legis↔loomweave seam — PDR-0043: GS-7 is
distributed). Its first two rows are the two blesses that were previously homeless in
PDR prose — **scan_manifest (PDR-0044)** and the **warpline glossary-freeze
(PDR-0043)** — which is the payoff: the index *is* the home those blesses lacked.

### 2 — Dissolve the steward role (condition 2)
The self-appointed *"weft seam steward = wardline"* role is retired. Wardline **runs**
conformance and **surfaces** findings — excellent, and **kept**; its legitimate
`self_authored_producer` / `self_authored_restatement` freezes of its **own** wire
(taint-fact, finding-identity, suppression vocabulary, vocabulary-descriptor,
federation-token) stay wardline-authored (PDR-0038 already blessed those; this PDR does
not touch them). What moves to the hub is the **cross-sibling RULINGS + the dispatch
role**: under "*hub blesses every seam — no bilateral negotiation*," a verdict wardline
issues on a seam it is not party to, or an obligation it dispatches onto a sibling, is a
hub blessing recorded here — not a wardline steward decision.

### 3 — Re-home the three cross-sibling rulings, reconciled (condition 2 + 3)
The `seam_registry.json` line-528 block (the legis↔warpline preflight row) carried three
distinct assertions. Reconciled against current reality (not transcribed verbatim, which
would launder possibly-stale verdicts as fresh hub doctrine):

1. **"reverify RULED OUT → legis drops it"** — already a **hub** ruling in **PDR-0037**;
   cited, not re-decided. (Code drop tracked: `weft-5cbe6bc11b`.)
2. **"legis conforms DOWN to warpline's frozen `warpline.preflight_impact.v1` envelope"
   (consume `data.affected`, verify `meta.local_only` per GV-LG-3)** — a ruling with
   **no hub PDR before now** (the gap this session's adversarial review caught and the
   original brief missed). **Ratified here as a hub call**, lock-grounded (interface-lock
   §4A / GV-LG-3). The hub owns it now the steward role is dissolved, independent of
   legis's code state.
3. **"STILL GAP / FALSE FREEZE"** (legis's consumer oracle once pinned a flat shape
   warpline never serves) — a **VERDICT**, not a ruling, and **verified RESOLVED**
   (2026-07-01): legis 1.4.0 ships `WarplineMcpClient` (`src/legis/warpline_preflight/
   client.py:35`, wired `mcp.py:224`); **`HttpWarplineClient` is gone from legis src**
   on `origin/main` (3055d2c). Recorded **RESOLVED (verified)** — this closes PDR-0038
   **condition 3**. The residual legis consumer-oracle *re-freeze* is a distributed
   legis-CI task (tracked), not an open hub obligation.

## Verified against source (not trusting the review synthesis)

- **Gate is CI-only and the reword is gate-NEUTRAL.** `tests/conformance/
  test_seam_registry.py` asserts only structural keys (`_REQUIRED_STR_KEYS = seam,
  authority, consumer_or_second_producer, wire, wire_change`; `bar_verdict` enum; for
  `peer_conformant` rows: `authority != "wardline"` + non-empty `peer_conformance`). It
  **never parses "steward"/"ruling"/"conforms down."** 0 refs in `src/` (sole hit
  `_live_oracle.py:17` is a comment). So rewording the steward prose reds nothing —
  guardrails: keep fields non-empty; keep the legis↔warpline row at `bar_verdict:gap`
  (don't flip toward `at_bar`); don't touch its absolute `evidence_paths`; the
  `authority` field is a *producer-of-the-wire* fact, not the steward role.
- **legis false-freeze RESOLVED** — `git grep` on legis `origin/main` (above).
- **Home = `contracts/`** — `contracts/weft-reason-vocab.json` exists; maturation-plan
  §2.2 names `contracts/` "the home of hub-blessed federation contracts… the first of a
  family." `registries/` was rejected (human-prose + held owner-gated diffs on
  `claims.md`/`terminology.md`); `doctrine.md` rejected (held Plainweave/Tabard de-fuse).
- **PDR-0037 scope** — reverify-drop only; it does *not* cover "conforms down" (confirming
  the need for ruling #2's fresh ratification).

## Why the ticket's stated mechanism is CUT

`weft-dbaada5883` says wardline's registry "syncs UP to a hub-owned index (sync-lint
planned P0-W2/P8-W2)." **That is backwards and it is deleted.** Ownership is a
*provenance* fact (who authors/blesses), not a *sync-direction* fact. Populating the hub
index *from* wardline leaves wardline the author and the hub a downstream mirror — the
exact inversion of condition 1. Worse, *any* sync-lint makes one repo's CI read the
other's registry — a **new cross-member CI coupling** into a hub that has **no
conformance CI**. The sync-lint was **never built** (verified: 0 implementation across
all repos; `~/loom` never created), so there is nothing to migrate — the correct
relationship is written from scratch: the **wardline mirror cites this index as canon**
(pull-down); any drift-check is a **wardline-side source-drift job** (the PDR-0043/0044
distributed pattern), never a hub-side lint.

## Execution — three-bucket action split (keeps within authority)

**Hub, within grant — DONE this session:**
- Authored `contracts/seam-index.json` (canon) + this PDR + the `contracts-index.md`
  pointer; corrected the stale `current-state.md` "pre-merge / trigger not fired" lines.

**Member-repo, under the merge grant — dated ticket, ready to execute (NOT yet done):**
- **Wardline PR** (`weft-83c25d96e3`): reword the three steward-role sites in
  `seam_registry.json` (rows ~509/512/528) from *"per steward decision 2026-06-26 (weft
  seam steward = wardline)"* → *"per hub ruling PDR-0037 / PDR-0045"*; add a
  mirror-provenance note (`tests/conformance/README.md` or the gate module docstring:
  "canonical seam-index is hub-owned at `weft/contracts/seam-index.json`; this file is a
  producer-contributed conformance mirror, not federation canon"); drop the backwards
  P0-W2/P8-W2 sync-lint direction in the program plan. Additive/docs-only → ships solo,
  gate-neutral, **no `v*` tag** (the gate is test-only, not in the wheel). Hub reviews +
  merges under the grant.
- **legis consumer-oracle re-freeze** (`weft-51699a641c`): re-freeze legis's warpline
  preflight consumer oracle against warpline's *real* `warpline_impact_radius_get`
  envelope over a shared vendored golden (distributed legis-CI task; the code is already
  resolved, so this is hardening, not a fix).

**Owner-reserved:** none entailed. (The only outward tripwire — a wardline release tag —
is unnecessary and forbidden; it is fenced, not scheduled.)

**Migration ordering (hub-canon-first, gate-safe):** hub canon (this PDR + index) leads
so nothing ever cites a not-yet-existing PDR → wardline PR cites the now-existing
PDR-0045 → merge. No step reds the CI gate; no new federation-wide rows are added to the
wardline mirror before the hub home exists.

## Accept criteria (falsifiable — `weft-dbaada5883` closes only when both pass)

- **Condition 1:** `contracts/seam-index.json` exists, declared canon by this PDR, and
  the wardline mirror declares itself a mirror. **(hub half DONE; wardline half in the PR)**
- **Condition 2:** `git grep -i steward` on wardline `main` returns **0** self-appointments
  (only "per hub PDR" citations), and all three rulings have hub provenance (PDR-0037 +
  PDR-0045). **(pending the wardline PR)**

## Reversal trigger

Reopens if the CI conformance gate ever moves into a member's **runtime** path (breaks
enrich-only), or if a future member parks a federation-**wide** catalog outside this hub
index (re-creates the steward capture). Neither is present today.

## Provenance

PM hub-governance, 2026-07-01. Direction pressure-tested with the advisor; developed via
a constrained-design → adversarial-refutation workflow (product-decision-critic +
solution-design-reviewer + reality-verifier — which independently converged on this
governance-move-not-machinery shape and caught ruling #2's missing PDR). The design
agent stalled mid-run; the convergent triple-refutation plus **direct source
verification** (this session, above) substituted for it. Extends "hub blesses every
seam" (PDR-0015 pen-moves-to-hub) and PDR-0038.

## Update (2026-07-01 — LANDED, reclaim complete)

Both conditions now fully met. wardline **PR #86 merged** to `origin/main` (`f7fb89e6`)
under the merge grant — `git grep -i steward` == 0 on wardline main; the three rulings
cite PDR-0037 / PDR-0045; CI green (lint / tests 3.12+3.13 / mypy / dogfood);
independently adversarially verified before merge. **`weft-dbaada5883` is CLOSED.** The
tracking line's "stays in_progress until it lands" and the accept-criteria parentheticals
("wardline half in the PR" / "pending the wardline PR") are superseded by this update.
Residual: legis oracle re-freeze `weft-51699a641c` (07-15) re-parented to the seam-health
epic (distributed hardening; legis 1.4.0 already shipped the code fix).
