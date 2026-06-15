# Federation docs maturation plan (first pass + roadmap)

**Date:** 2026-06-15 · **Status:** Plan (steward first pass) · **Class:** docs
program / hub-stewardship · **Driver:** PDR-0023 reframed the suite from "a loose
wave of products" to **one product — a shared-identity, agent-native
code-intelligence federation**. That makes the federation-level docs the most
authoritative layer in the whole suite, and they must become trustworthy.

> This doc is the map for an *ongoing* effort. It records (1) the inventory +
> drift assessment of the hub's federation docs, (2) the target authoritative
> structure, (3) what was reconciled in this first pass, (4) the conflicts that
> need owner adjudication, and (5) the prioritized roadmap for the rest. The
> steward did the safe, high-value reconciliations and left the sweeping
> restructures for owner steer.

---

## 0. The reframe the docs must now carry (one paragraph)

Weft is **one product**: the SEI identity spine + the seams (the joins) + the
cross-cutting quality conventions (provenance-honesty, lead-summary,
bounded-by-default, SEI-keying). The five members are components/proof-points.
The seams are the crown jewels; a broken join is the *product* broken. Five
doctrines must be represented at the federation layer and verified against
source where they have a code surface:

1. **The honesty invariant** — no confident-empty; every empty/partial/stale/
   degraded result explains **cause + reason_class + fix**. The canonical
   vocabulary is the 11-class `weft-reason` contract
   (`pm/2026-06-15-weft-reason-contract-G1.md` + `contracts/weft-reason-vocab.json`),
   **BLESSED by owner gate 2026-06-15** — the *first hub-blessed contract*.
2. **Input affordances are promises** — never advertise an inputSchema field you
   do not consume+honor. Enforced in code by `assert_inputschema_consumed`
   (reference: **warpline** `src/warpline/mcp.py`).
3. **Speak SEI natively at every data-entry point** — data joins the spine *as it
   enters*. Reference: loomweave guidance-append; filigree `issue_create` now
   accepts an entity/SEI bind at creation (SEAM SEI-on-create, ADR-029).
4. **Hub blesses every seam** — members keep autonomy over their own jobs;
   **every cross-member interaction is hub-authored and hub-blessed** (owner
   ruling 2026-06-15). This narrows the older "bilateral version-skew" posture.
5. **Agent-first interface ergonomics** — lead-summary on count-returning tools,
   bounded-by-default, list-overflow-dump-to-file. Sub-clauses of the honesty
   banner ("no result without its provenance").

And the seam-health surface (PDR-0023's central feature): an agent must be able
to ask *"is this join carrying value end-to-end? does my output match the
contract on the other side?"* — a P0 gap today
(`pm/2026-06-15-seam-health-map.md`).

---

## 1. Inventory + drift assessment

Verdict legend: **OK** (accurate vs source) · **STALE** (lags source/decisions)
· **CONTRADICTED** (a claim conflicts with source — flagged for owner) ·
**GAP** (missing the new doctrine it should carry).

| Doc | Layer | Verdict | Notes (source checked) |
|---|---|---|---|
| `doctrine.md` | federation law (authoritative) | **GAP** | Structurally sound and still correct on the federation axiom (§3–7). But it pre-dates PDR-0023 and carries **none** of the five new doctrines. Its framing ("loose wave / five independent instruments, each authoritative") is the *exact* framing PDR-0023 reweights. Needs a PDR-0023 banner + an honesty-invariant section. **Reconciled this pass (banner added).** |
| `README.md` | entry point (derived view) | **GAP** | Accurate on roster/authority model. Missing the "federation is the product" headline and any pointer to the honesty contract or seam-health. **Reconciled this pass (reframe note + pointers).** |
| `conventions.md` | conventions register + conformance matrix | **STALE/GAP** | The richest cross-cutting doc. C-6 (honest-empty), C-10 (honest seams), C-12 (one oracle) are *proto-versions* of the honesty invariant but **do not reference** the now-blessed `weft-reason` 11-class vocab, and there is no convention for lead-summary, bounded-by-default, input-affordances-are-promises, or speak-SEI-at-entry. The per-member conformance cells are dated 2026-06-09/12 and predate today's strikes (esp. warpline). **Reconciled this pass (new C-15 honesty-invariant convention pointing at the blessed contract; warpline-strike staleness flagged inline).** |
| `glossary.md` | shared vocabulary (authoritative) | **GAP** | No entry for `reason_class`/`weft-reason`, `seam-health`, `lead-summary`, SEI-native-entry. These are now cross-product-visible terms. **Reconciled this pass (weft-reason + seam-health + honesty-invariant entries added).** |
| `federation-map.md` | integration matrix (authoritative) | **STALE** | Matrix of *logical* bindings is accurate. But "every binding is enrich-only / removing one side never breaks the other" is now in tension with the **"hub blesses every seam, members no longer have full independence"** ruling — the seams are now the product, not optional enrichment. Header says "five members... Charter planned" — accurate. Needs a PDR-0023 note that the cells *are the crown jewels*. **Reconciled this pass (PDR-0023 note).** |
| `contracts-index.md` | contract index (authoritative) | **STALE/GAP** | The 10 bindings are accurate vs source (verified §1 entity-assoc, §3 taint, §4 emit, §8 legis-wardline). Missing: the **`weft-reason` contract** is now a first-class hub-owned *cross-member contract* and belongs in this index as the first non-pairwise, federation-wide contract. **Reconciled this pass (new index entry for the weft-reason contract).** |
| `federation-sdk.md` | member-builder contract (authoritative) | **GAP** | Excellent on the 3 spine invariants (I-1 SEI, I-2 enrich-only, I-3 opaque+drift). Missing a 4th spine invariant for the honesty contract and an input-affordances-are-promises obligation — a new member must now emit `weft-reason` carriers and not advertise unconsumed inputSchema fields. **Roadmap (not reconciled this pass — needs owner steer on whether honesty becomes a hard I-4 admission gate).** |
| `federation-topology.md` | runtime emit wiring (authoritative) | **OK (dated)** | Accurate as the emit-path spec. The "current drift snapshot" is dated 2026-06-09 and is explicitly a snapshot. Low priority; the seam-health probe (roadmap) is the durable successor to its manual liveness check. No change this pass. |
| `compatibility.md` | integration-liveness matrix | **OK** | Liveness states match source (A-1 live, native emitter shipped). No change. |
| `asterisk-register.md` | axiom-violation register (authoritative) | **OK** | A-1 live / A-2 retired both verified accurate. No change. |
| `SHIPPING.md` | go-to-market (decided 2026-06-05) | **STALE (owner-reserved)** | "Five separately-installable products behind one brand" is now in tension with PDR-0023's "the headline is the spine, tools are proof-points" and the filigree-3.0.0-holds / four-soft-launched release posture. **Positioning + release posture are owner-reserved — flagged, not edited.** |
| `members/warpline.md` | member briefing | **STALE** | Describes warpline's six frozen tools and "consumer implementations are fast-follow." Today warpline shipped the seam-health P0 strike + G1 vocab conformance + G2 microaffordances + `include_federation` (see §4 conflicts). The briefing is now behind its own repo. **Flagged — member briefings are snapshots-that-point, lowest-priority to chase.** |
| `members/{filigree,loomweave,wardline,legis,charter}.md` | member briefings | **not re-audited** | Out of this pass's scope (federation-layer focus). Roadmap item: a member-briefing freshness sweep, but they are explicitly snapshots-that-point-to-repo, so low priority. |
| `sei-standard.md` | SEI identity contract (LOCKED) | **OK (not re-audited in full)** | SEI scheme `loomweave:eid:<blake3…>` confirmed in source (`~/loomweave/crates/loomweave-storage/src/sei.rs`). LOCKED; out of scope to touch. |

### Cross-cutting finding (the headline drift)

**The hub's authoritative cross-cutting docs encode the federation as it was
designed (loose, enrich-only, five co-equal instruments) and not as PDR-0023 and
the 2026-06-15 contracts now define it (one product, seams are the crown jewels,
honesty is a protected invariant, every seam hub-blessed).** The conventions
register *independently evolved* proto-honesty conventions (C-6/C-10/C-12) from
the dogfood throughline — but nothing connects them up to the now-blessed
`weft-reason` contract or to PDR-0023. Wiring that connection is the spine of the
maturation work.

---

## 2. Target authoritative structure (proposal — owner steer)

The hub already has good *domain-split* canon (doctrine = roster/law,
contracts-index = bindings, SHIPPING = release). The gap is a **federation
quality/contract layer**. Proposed target shape — *additive, not a restructure*:

1. **`doctrine.md` stays the federation law** — add a standing "§10 The honesty
   invariant" and a PDR-0023 framing banner (done, banner; §10 is roadmap).
2. **`contracts/` becomes the home of hub-blessed federation contracts** — the
   machine-readable `weft-reason-vocab.json` already lives there; it is the first
   of a family (G4 scheme-echo handshake will join it). `contracts-index.md`
   indexes them alongside the pairwise bindings.
3. **`conventions.md` carries the ergonomics conventions** (lead-summary,
   bounded-by-default, input-affordances) as numbered C-entries, each pointing at
   the blessed contract / PM artifact and citing per-member conformance.
4. **A new federation overview** that states "the federation is the product"
   plainly and routes: spine → seams → honesty → members-as-proof. **Candidate:
   promote a tightened version into `doctrine.md` §1, or a short
   `federation-overview.md`. Owner steer requested** (don't want two competing
   "what is weft" canons — README already partly plays this role).
5. **Seam-health** gets a doc home once it is built (the probe is roadmap, not
   shipped); for now `pm/2026-06-15-seam-health-map.md` is the spec.
6. **Member briefings** stay snapshots-that-point; no structural change.

**Explicitly NOT proposed unilaterally:** rewriting `doctrine.md`'s §3–7
federation-axiom prose, rewriting `SHIPPING.md` positioning, or collapsing
README/doctrine into one overview. Those are owner calls.

---

## 3. Reconciliations executed this pass

See §commits in the steward's report. In summary: PDR-0023 banners + honesty
pointers into `doctrine.md`, `README.md`, `federation-map.md`; a new
`contracts-index.md` entry for the blessed `weft-reason` contract; a new
`conventions.md` C-15 honesty-invariant convention; glossary entries for
`weft-reason`/`reason_class`, seam-health, honesty-invariant; and inline
staleness flags where 2026-06-09-dated conformance cells now lag today's
warpline strikes. All factual claims were verified against member source first.

---

## 4. Conflicts / staleness for owner adjudication

1. **"Enrich-only, never load-bearing" vs "hub blesses every seam, members no
   longer have full independence."** PDR-0023 + the weft-reason ruling say the
   seams *are the product* and members lose bilateral seam autonomy; doctrine §3
   and federation-map say every binding is optional enrichment and version-skew
   is handled bilaterally. These are not flatly contradictory (a seam can be
   hub-governed *and* enrich-only), but the emphasis has inverted and the docs
   should say so deliberately. **Needs an owner sentence on how to phrase the
   reconciled stance** — I added a flagged note rather than rewriting the axiom.

2. **Warpline briefing + seam-health map both lag warpline's own repo (today's
   strikes landed).** The seam-health map calls warpline "the worst posture / the
   quiet segfault" and lists its P0 as future work; warpline HEAD shows
   `281460e fix(impact): make the quiet segfault loud — staleness, miss-set,
   dead-input`, `a2c44e1 test(reason): lock weft-reason G1 vocabulary
   conformance`, `73f06e9 ... microaffordances (G2)`, `07bc3b4 ...
   include_federation`. So the P0 strike, G1 vocab conformance, and G2 are
   **already shipped in warpline source** — the PM artifacts describe a warpline
   that no longer exists. This is *expected* same-day drift, but the seam-health
   map should get a "status as of EOD 2026-06-15: warpline P0 + G1 + G2 landed"
   addendum so it isn't read as an open backlog. **I did not edit the seam-health
   map or member repos** (warpline is being actively edited by other automation —
   scope rule). Flagging for the owner / next steward.

   - **Sub-conflict (a real code-vs-doc conflict, not just staleness):** the
     sub-agent's first read of warpline reported the three `capture` inputSchema
     fields (`if_stale_after`/`max_entities`/`changed_refs`) as DEAD INPUT (the
     seam-health P0). Direct re-check of `~/warpline/src/warpline/mcp.py` shows
     they ARE now consumed (lines 385/409/429–431) and declared in
     `_HANDLER_CONSUMES`, with `assert_inputschema_consumed()` enforcing it at
     import (line 574). **Resolution: the doc (seam-health map) is the stale
     side; the code is fixed.** No code bug. Recorded here so the next reader
     doesn't re-file the closed P0.

3. **`weft-reason` carrier-shape adoption is partial in code (by design).** Ground
   truth: members emit a `reason_class` field on *status/failure/resolution*
   carriers (loomweave `analyze.rs`, wardline `filigree_emit.py` FailedFinding,
   legis `ingest.py`, warpline `listing.py`, filigree `issues.py` weft_reason on
   entity-resolution failure) but **per-finding records do not yet carry it**, and
   the full `{reason_class, cause, fix}` triple is not universal. This MATCHES the
   contract's stated rollout ("value vocab now, carrier shape converges with
   G3/3.0.0") — so it is *not* a drift to fix, but the docs should not overstate
   "every result carries the triple today." I phrased the new convention/glossary
   entries as the *contract/target*, citing the rollout staging, to avoid claiming
   shipped-everywhere.

4. **SHIPPING.md positioning is owner-reserved and now partly superseded.** Left
   untouched; flagged. The "five products behind one brand" pitch and the
   "SEI-as-headline" PDR-0023 consequence need an owner reconciliation pass.

---

## 5. Prioritized roadmap for the remaining work

> **Second-pass update (2026-06-15, owner ruled the four surfaced decisions).** The
> four rulings closed the P0 + both P1 items below. Status recorded inline; the
> remaining open items follow.

**P0 — wire the honesty invariant into the federation law. — DONE (owner ruling 1).**
- `doctrine.md §10 — The honesty invariant` written (three-part cause/reason_class/fix
  rule, the 11 classes, no-confident-empty, the moat-guard framing, honesty propagates
  through composition). ✅
- Honesty IS a hard admission gate (owner: YES): **federation-sdk.md I-4** added
  alongside I-1/I-2/I-3, with the §3 conformance gate and the §4 drop-in path updated;
  spine header now "four invariants." ✅

**P1 — ergonomics conventions as first-class C-entries. — DONE (owner ruling).**
- `conventions.md` now carries **C-16 lead-summary** (ref loomweave `entity_dead_list`),
  **C-17 bounded-by-default + list-overflow-dump-to-file** (`weft-801d21fa4d`, target /
  no member ref yet), **C-18 input-affordances-are-promises** (ref warpline
  `assert_inputschema_consumed`), and **C-19 speak-SEI-natively-at-entry** (refs loomweave
  guidance-append + filigree `issue_create` SEI-on-create). Consolidated matrix + reference
  paragraph updated. ✅

**P1 — refresh the C-15 conformance matrix. — DONE (owner inputs).**
- G1 value-vocab conformance LANDED federation-wide, all five members verified real with
  drift-failing tests: warpline@a2c44e1, loomweave@bac777c, filigree@3f3c3d0
  (release/3.0.0), wardline@282efd41 (validation_error→rejected, additive +
  reason_class/cause/fix on wire), legis@11b7dbdb (key_absent→disabled,
  dirty_dev_artifact→stale, signature_verified→clean, additive). Canonical SoT
  weft@fd92604. **PRIORITY 1 (the five gaps) is fully closed.** The C-15 table and the
  rollout bullet now record this; the full-carrier-triple limb stays the staged remainder
  (G3 / filigree 3.0.0). ✅ *(Note: the C-6/C-10/C-12 cells remain at their 2026-06-09/12
  dates — re-verifying those non-honesty cells against current member source is a
  still-open lower-priority sweep, below.)*

**P2 — README-vs-doctrine canon. — DONE (owner ruling 3).**
- README re-cast as the orientation / "what do you need to know" standard that explicitly
  points to doctrine.md as authoritative ("when they differ, doctrine.md wins") and stops
  claiming to be the source of truth. ✅

**P2 — the hub-blessed-seam governance phrasing. — DONE (owner ruling 2).**
- "Hub blesses every seam" is now the federation *headline framing*; "enrich-only" is
  reframed as a per-seam *property*, in the doctrine §1 banner, federation-map note, and
  README. ✅ *(Open: the seam-health probe itself is still unbuilt — when it ships it needs
  an authoritative doc home, successor to the topology doc's manual liveness check.)*

**P2/CANDIDATE — PDR-0024 fleet-OS frame folded in FLAGGED AS CANDIDATE (owner ruling 4).**
- `doctrine.md §11` records the two-planes fleet-OS frame gated explicitly to CANDIDATE
  status (referenceable, NOT authoritative, promotable on a falsifier-test); README carries
  a one-line candidate pointer. ✅ Do not present as adopted until a falsifier-test clears
  the per-plane falsifiers (coordination defection / low contention; sense-making
  greppable-away / registry-unused).

### Still open (next steward)

- **Full-carrier-triple convergence** — the `cause + fix` limb on every surface (not just
  the value vocab) lands with G3 (loomweave typed output) and inside filigree 3.0.0. Track
  the C-15 table from "vocab ✓†" to "full triple" as those ship.
- **C-17 reference** — no member yet earns bounded-by-default + dump-to-file; it is the
  target. Assign a reference when one lands.
- **Re-verify the non-honesty conformance cells** (C-6/C-10/C-12) against current member
  source — they predate today's strikes and several "pending" cells may now be "conforms"
  (esp. warpline post-strike, filigree 3.0.0). Lower priority than the honesty work, now done.
- **SHIPPING.md positioning** — owner-reserved; "five products behind one brand" vs
  "SEI-as-headline" (PDR-0023 consequence 5) still needs an owner reconciliation pass. Not
  touched.
- **Seam-health doc home** — when the probe is built.
- **Member-briefing freshness sweep** — lowest priority (snapshots-that-point); refresh
  `members/warpline.md` first (most stale post-strike).
- **PDR-0024 promotion** — when a falsifier-test/dogfood clears the planes, promote §11 from
  CANDIDATE to adopted canon and fold in the fleet-OS conventions (tag-out board contract,
  macro-clearing-house honesty-propagation rule).

**Ongoing — the audit invariant.**
- README's standing rule still holds: "weft contains no restated project-internal fact
  without a pointer." Every reconciliation keeps pointing at owning source, not re-restating
  it (that is how the hub drifted before).
