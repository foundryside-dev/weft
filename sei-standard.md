# Weft — Stable Entity Identity (SEI) conformance standard

**Date:** 2026-06-01 (promoted into the Weft hub 2026-06-05)
**Status:** **LOCKED — 2026-06-05** (owner declaration). SEI is the canonical, frozen federation identity interface. The shape is no longer open for per-subsystem input; **post-lock changes require a versioned revision** of this standard. Conformance remains oracle-gated and ungrandfathered (§0.1): a subsystem is conformant only when it passes the §8 oracle. Any member whose locator→SEI backfill has not yet run is a *conformance/migration* task **under** the locked standard — not a reason the standard is unlocked.
**Authority:** **Authoritative here.** This is the suite-wide SEI standard. It previously lived in the Wardline specs tree with an instruction to "propagate the normative sections into clarion/filigree"; it is now promoted into the Weft hub as its canonical home, and the member repos point here. Loomweave is the identity **authority/implementer**; Wardline, Filigree, Legis, and Charter are **consumers** that conform.
**Companions:** [doctrine.md](./doctrine.md) (the federation axiom SEI serves), [glossary.md](./glossary.md) (`SEI` / `locator` terms), Loomweave ADR-038 (`~/loomweave/docs/loomweave/adr/ADR-038-sei-token-and-signature.md`, Loomweave's token form).

**SEI is the gold standard for the suite.** All conforming subsystems **must** conform to it — **no matter how close any of them feels to it today.** Conformance is **demonstrated** via the §8 oracle, never **assumed** from apparent compatibility, and no subsystem is grandfathered (§0.1).

**Scope:** Give Weft a **refactor-stable entity identity** so a function's cross-tool bindings (Wardline taint facts, Filigree issue associations, Legis governance attestations, Charter trace links) survive renames and moves instead of being silently orphaned. This is the keystone primitive the whole suite hangs off.

---

## 0. Why this exists

Verified against `clarion`/`filigree` source on 2026-06-01:

- Loomweave's pre-SEI entity id is `{plugin_id}:{kind}:{canonical_qualified_name}`, **derived from the name + module path** and upserted on that key. A **rename or cross-module move changes the id** — and every binding keyed on the old id is **orphaned**. There was no rename detection, no lineage, no surrogate id (ADR-003 explicitly **deferred** an `EntityAlias` mechanism).
- Filigree stores the id as an **opaque string** and computes no drift — the consumer does.
- The suite once specified a richer cross-tool standard, the **Weft URI** scheme (`weft://…` + a registry + `/api/weft/multi-fetch`); it was **never implemented** and was superseded by the simpler entity-associations (Filigree ADR-029). Its registry / multi-fetch apparatus was over-built and never shipped — but the **stable identity** it reached for is exactly what was still missing. SEI is the deliberate, product-grade form of that idea — learning from the Weft-URI's failure, not salvaging it. (See [uri-scheme.md](./uri-scheme.md) for the URI scheme's status.)

The bug, precisely: Weft **conflated identity with address**. The qualname is a fine *address* and a terrible *identity*, because the operations developers do most — rename, move — change it. This standard separates the two.

## 0.1 Conformance is proven, not assumed (no grandfathering)

Every conforming subsystem is held to the same proven bar — including ones that feel done (Filigree), the authority itself (Loomweave), and ones admitted later (Legis, Charter). Two rules follow:

- **Demonstrated, not asserted.** A subsystem is conformant only when it **passes the §8 conformance oracle**, not because it "looks compatible."
- **Structural compatibility is necessary, not sufficient.** The clearest trap is Filigree: it stores an *opaque* id, so it needs no code change (§5) — but that makes it *able* to conform, not *conformant*. It is conformant only once it actually stores SEIs, the one-time locator→SEI backfill (§7) has run, and it passes the oracle.

Treat any binding still keyed on a locator as legacy to migrate, regardless of which subsystem produced it.

## 0.2 Canonical status — this supersedes prior federation identity agreements

The subsystems were running on **divergent versions of "the federation spec."** This document ends that on the identity question. SEI is the **single, canonical, non-negotiable federation identity interface.** Where any prior agreement — pairwise or documented — defines or assumes a different entity-identity model, **this supersedes it.**

**Superseded (on identity only):**
- Clarion ADR-003's "the derived `{plugin}:{kind}:{qualname}` *is* the identity" — that string is now the **locator** (address), never the identity.
- Clarion ADR-018's qualname-reconciliation heuristics *as an identity mechanism* — subsumed by the §3 matcher + lineage.
- The abandoned **Weft-URI** addressing scheme — formally closed; SEI is the product-grade successor to the idea it reached for (not a revival of it).
- Any per-tool federation-contract clause that keys a cross-tool binding on a locator.

**Not superseded (these stand, but now carry an SEI):** the entity-association API shape (ADR-029), the Wardline taint-fact store routes, and Filigree's frozen surface keep their transports and payloads unchanged — only the **identity value** they carry becomes an SEI.

**What is closed vs open:** the *track* is closed — that there is one canonical identity interface, that it is SEI, and that it supersedes the divergent prior specs. The *precise shape* of SEI is **open until lock** (§0.3).

## 0.3 Status: LOCKED (2026-06-05)

SEI is **locked.** The single canonical identity interface is SEI (the §0.2 supersession is permanent), all conforming subsystems reported and recorded their requirements, the §8 oracle encodes them, and the owner — who controls every member's release cycle (§7.1) — has declared the lock. The §1 decisions and the wire/lineage/matcher specifics below are now **frozen baseline**, not a proposal.

**Post-lock rule:** §0.1 (oracle-gated, no grandfathering) and §0.2 (supersession) apply in full. Any change to the interface shape requires a **versioned revision** of this standard, not an ad-hoc edit. A subsystem may no longer contest a detail by "emerging requirement"; it brings a revision proposal.

**Conformance vs lock (do not conflate):** locking freezes the *interface*. A member still owes *conformance* — passing the §8 oracle, including its locator→SEI backfill (§7). Filigree's backfill is such a conformance task carried out **under** the locked standard; it does not reopen the lock.

## 0.4 What SEI unlocks — interoperability across the suite

**SEI is the connective tissue of Weft's interoperability.** Weft's value is the *matrix* of its tools' combinations — not their sum — and **every cell in that matrix is a cross-tool binding** that needs a shared, durable identity to bind on:

| Combination | The binding it depends on | Without SEI |
|---|---|---|
| **Wardline + Loomweave** (taint over a mapped codebase — the dossier) | taint facts keyed to the entity | facts orphan on rename/move |
| **Wardline + Filigree** (findings become tracked work) | issue ↔ entity association | association orphans |
| **Loomweave + Filigree** (issues bound to live code) | association keyed to the entity | orphans without SEI |
| **Wardline + Legis** (agent-defined policy enforced at CI) | policy + attestation keyed to the entity | attestation orphans |
| **Loomweave + Legis** (attestations bound to code) | attestation ↔ entity | attestation orphans |
| **Filigree + Legis** (governed issue lifecycle) | governed association | orphans |
| **Loomweave + Charter** (requirements traced to live code) | trace link keyed to the entity | trace orphans on refactor |

**A combination is only as strong as its weakest binding.** A single tool keying on a fragile (rename-mutable) locator silently orphans *every* combination it participates in. SEI makes every binding survive the refactors developers actually perform, so the matrix **composes** instead of quietly decaying. This is why conformance is neither optional nor grandfathered (§0.1).

## 0.5 Pre-lock requirements intake (point-in-time log, 2026-06-02)

> This is a historical intake snapshot kept for provenance; current per-subsystem status lives in each member's repo. As of 2026-06-02 all then-conforming subsystems had reported and Loomweave's open items (REQ-C-01/02) were resolved in ADR-038. The standard is substantially **built**:
> - The shared **§8 conformance oracle EXISTS** (`~/loomweave/docs/federation/fixtures/sei-conformance-oracle.json`).
> - **Loomweave** (authority) shipped SEI end-to-end (migrations `0004_sei_prior_index` + `0005_sei`, `loomweave-storage/src/sei.rs`, a passing `sei_conformance_oracle.rs`, the git-rename signal, the HTTP callers/callees linkages). **ADR-038 is Accepted.**
> - **Legis** is implemented through Sprint 6 and **passes the oracle as a consumer** (`legis/tests/conformance/test_sei_oracle.py`).
> - **Wardline** shipped its SEI-client and the dossier (incl. a live `clarion_e2e` round-trip).
> - **Charter** declared its SEI-consumer contract (ADR-005) as design; its adapter is part of Charter's deferred federation-adapter work.
> - **The real remaining lock gate is FILIGREE** — still `release/2.3.0` with **no SEI in source**: its locator→SEI backfill + oracle pass have not happened.
>
> **Lock achieved 2026-06-05.** The standard is locked by owner declaration (§0.3). Filigree's locator→SEI backfill, where still outstanding, is now a *conformance/migration* task carried out under the locked standard (oracle-gated, §0.1) — it is no longer a lock blocker. See [conflict-register.md](./conflict-register.md) §B-2 (resolved).

---

## 1. Fixed design decisions (proposed baseline — see §0.3)

1. **Surrogate identity.** Introduce a durable, opaque **SEI** as the sole key for cross-tool bindings. The existing qualname id is demoted to a mutable, resolvable **locator**.
2. **Fail-closed re-binding.** When the matcher cannot *confidently* decide that a changed entity is the same one, it **mints a new SEI and records the old as orphaned** — it never silently carries an identity (and therefore never silently carries a governance attestation) across an unproven match.
3. **Deterministic matcher in v1.** SEI is carried only on high-certainty signals (unchanged locator; git-rename + identical body; identical body+signature at a new module). Edit-tolerant fuzzy matching is North Star (§9).
4. **Loomweave is the authority.** Identity is minted, persisted, re-bound, and resolved in one place. Consumers never derive or parse it.
5. **No Weft-URI revival.** No registry, no multi-fetch, no URI grammar. Just identity.

## 2. The model: three separated concepts

| Concept | What it is | Mutability | Role |
|---|---|---|---|
| **SEI** | opaque durable token, `loomweave:eid:<blake3(locator ++ 0x00 ++ mint_run_id)[:32 hex]>` | minted once, then **stable** across rename/move/edit | the **identity** — the only key cross-tool bindings use |
| **Locator** | `{plugin_id}:{kind}:{qualname}` (the pre-SEI id) | **mutable** (changes on rename / module move) | the **address** — human-readable, resolvable to current SEI |
| **content_hash** | the per-entity content hash Loomweave computes (`entities.content_hash`, the entity body) | changes on edit | the **freshness** signal |

SEI is **opaque**: consumers MUST NOT parse it. Its internal form is Loomweave's business (REQ-C-02, ADR-038): collision-free under locator reuse, with no time/RNG component. The SEI *value* is reproduced from Loomweave's persisted binding store, not re-derived; consumers never parse it regardless.

> **Hash-granularity note (pre-existing, not introduced here):** Filigree's `content_hash_at_attach` snapshots the *entity body* hash; Wardline's taint-fact freshness gate uses the *whole-file* hash. Harmonising the two freshness granularities suite-wide is adjacent work, out of scope here; flagged so it is not silently inherited.

### 2.1 Two orthogonal status axes

| | content FRESH | content STALE |
|---|---|---|
| **SEI alive** | ✅ current | ⚠️ same entity, code changed — re-verify |
| **SEI orphaned** | 🔶 needs human re-bind | 🔶 needs human re-bind |

- *Identity axis* (SEI alive / orphaned) answers **"is this the same entity?"**
- *Content axis* (content_hash fresh / stale) answers **"has its code changed?"**

Both are always surfaced; neither is inferred from the other.

### 2.2 Lineage

Loomweave keeps an **append-only lineage log** of SEI events: `born`, `locator_changed`, `moved`, `orphaned`, `superseded`. Lineage lets a consumer distinguish ORPHAN from STALE, lets a human reconcile an orphaned binding, and gives Legis a ready-made audit trail.

**Tamper-evidence (v1) — [REQ-L-01].** In v1 Loomweave serves `lineage` from an append-only store and does **not** attach a hash-chain or signature. A consumer that needs integrity (Legis's protected mode) **re-establishes it at its own governance boundary** — e.g. snapshot-hashing the lineage at each decision and detecting divergence on re-read. A Loomweave-side signed / hash-chained lineage is North Star (§9), not v1. Legis accepted this disposition (Option 3) and implements prefix-hash custody.

## 3. The re-binding matcher (Loomweave, on re-index)

Deterministic and fail-closed. For each entity in a new scan, decide its SEI:

1. **Locator still present in the prior index** → carry the same SEI. If `content_hash` changed, the content axis carries the change.
2. **Locator vanished** → match against *vanished* prior entities using **high-certainty signals only**: a git-detected rename + byte-identical body hash → carry the SEI (`locator_changed`); identical body hash + identical signature at a new module → carry the SEI (`moved`).
3. **No confident match** → **fail closed**: mint a new SEI (`born`), mark the vanished prior entity `orphaned`. Bindings on the old SEI now read ORPHAN; they are never silently re-pointed.

### 3.1 Required Loomweave capability: prior-index state

The matcher diffs against the previous index. So a load-bearing v1 obligation on Loomweave is to **retain the prior SEI↔locator + body-hash + signature map** across re-index runs (a lightweight keyed side table, REQ-C-03). Its **durability is the real protection against cold-rebuild orphaning** — a `--force` that loses it re-mints every SEI regardless of token scheme.

## 4. Wire contract (Loomweave's conformance surface)

Identity resolution over the HTTP read API (consumers are HTTP clients):

- `resolve(locator)` → `{ sei, current_locator, content_hash, alive: true }`, or `{ alive: false }`.
- `resolve_sei(sei)` → `{ current_locator, content_hash, alive: true }`, or `{ alive: false, lineage: [...] }` when orphaned/superseded.
- `lineage(sei)` → the ordered event list.
- `_capabilities` advertises `sei: { supported: true, version: N }` so a consumer can detect a pre-SEI Loomweave and **degrade** rather than guess.
- **Input validation (fail-closed) — [REQ-F-01/02].** `resolve(locator)` **MUST reject** a non-locator input — including an already-migrated, SEI-shaped string — with a documented error, never a silent mis-resolution. The SEI prefix `loomweave:eid:` is a **reserved prefix** a locator can never take; a structural colon-count check is insufficient.
- **No binding keyed on a locator, on any surface — [REQ-C-04].** No cross-tool binding may be keyed on a locator. Every Loomweave surface returning an entity identity for use as a binding key — HTTP **and** MCP — MUST carry the **SEI**; a locator may also appear, but only explicitly labelled as the mutable address.

SEI is opaque on the wire. Batch variants mirror the existing `…:batch-get` shape.

## 5. Conformance obligations (set across the suite)

| Tool | Obligation |
|---|---|
| **Loomweave** (authority) | mint + persist SEI; retain prior-index state (§3.1); run the deterministic matcher; fail-closed mint+lineage on ambiguity; serve `resolve` / `resolve_sei` / `lineage`; advertise the `sei` capability + version; carry SEI (never a bare locator as a binding key) on **every** identity-bearing surface — HTTP **and** MCP (§4, REQ-C-04) |
| **Wardline** | key taint facts (and dossier reads) on **SEI**, resolving locator→SEI via Loomweave; treat SEI opaque; degrade gracefully when the `sei` capability is absent |
| **Filigree** (frozen) | **no code change, but not auto-conformant** (§0.1) — it already stores an opaque `loomweave_entity_id`, so the standard only makes that stored value an SEI going forward, but conformance still requires the locator→SEI backfill (§7) and an oracle pass. Its `content_hash_at_attach` drift check now cleanly means the **content axis** (STALE); the identity axis (ORPHAN) lives in Loomweave's `resolve_sei` |
| **Legis** | governance attestations keyed on **SEI**; consume `lineage` as the audit trail; as the suite's git-interface owner, may *supply* the git-rename signal the matcher consumes (§6). Implemented through Sprint 6; passes the oracle as a consumer |
| **Charter** | requirement trace links keyed on **SEI**; store SEI opaque, never mint/parse; mark links stale on lineage change; fall back to fragile file/symbol refs when Loomweave absent. Declared in Charter ADR-005; adapter pending |

The headline result: **Filigree conforms without being unfrozen.** Treating the id as opaque is exactly what lets it adopt a new identity model with zero API change.

## 6. Relationship to Legis and the dossier

- **Legis** is both an SEI *consumer* (attestations key on SEI; lineage is its audit spine) and a *potential provider* of the git-rename signal the §3 matcher needs. v1 sources git-rename detection inside Loomweave, but **behind a typed `git-rename signal` interface** (REQ-C-05) so it does not calcify as Loomweave-internal. Loomweave shipped the typed `GitRenameSource` trait + a `LegisGitRenameSource` consumer; Legis's provider half is contract-locked. Operative enablement is jointly gated on Loomweave driving a committed rev-range.
- **The dossier** (Wardline) keys its sections on SEI and uses the §2.1 two-axis model.

## 7. Migration (one-time)

When Loomweave first runs SEI-aware, it mints an SEI for every current entity. A backfill resolves every existing Filigree association and Wardline fact from its stored locator to the corresponding SEI and re-keys it. Locators that no longer resolve are **flagged ORPHAN for human review — never silently dropped**.

### 7.1 Migration protocol — a single hard cutover

**Resolution — single hard cutover [REQ-F-01, decided].** One author controls the release cycle of all subsystems, so the migration is a **coordinated release**, not a long-lived migration window. There is deliberately **no** mixed-format tolerance and **no** declared migration window.

- **Hard cutover.** Loomweave mints SEIs and the per-producer backfills run as one coordinated release step. Every federation feed emits **only locators before the cutover and only SEIs after it** — never a mix.
- **Idempotent, resumable backfill [REQ-F-02].** The backfill rewrites ids in place and may be re-run; `resolve(locator)` MUST reject an already-migrated SEI (§4) rather than mis-resolve it; each producer owns its own progress cursor.
- **Orphans surfaced, never dropped.**

## 8. Conformance oracle (shared test suite)

A shared, fixtures-based conformance suite every tool runs against a reference Loomweave (`~/loomweave/docs/federation/fixtures/sei-conformance-oracle.json`):

- **identity round-trip + opacity:** mint → `resolve` both directions → consumer treats SEI opaque
- **rename fixture:** rename with unchanged body → SEI carried, `locator_changed` event
- **move fixture:** move to a new module, body+sig unchanged → SEI carried, `moved` event
- **ambiguous fixture:** rename *with* a body edit → **fail closed**: new SEI, old `orphaned`
- **delete fixture:** entity removed → `orphaned`, `resolve_sei` returns `alive: false` + lineage
- **capability-absent fixture:** Loomweave without the `sei` capability → consumers degrade honestly

## 9. Out of scope (v1) / North Star

| Capability | v1 | North Star |
|---|---|---|
| Matcher | deterministic (locator / git-rename+identical-body / identical-body+sig move) | **edit-tolerant fuzzy** matching above a high similarity threshold, still fail-closed below it |
| Lineage | `born`/`locator_changed`/`moved`/`orphaned`/`superseded` | richer **split/merge** lineage |
| Git signal | sourced in Loomweave (behind a typed interface) | sourced via Legis's git interface |
| Lineage integrity | append-only store; consumer re-establishes integrity at its own boundary | Loomweave-side **signed / hash-chained** lineage |
| Lineage delivery | **pull-only** polling on `lineage(sei)` | push / event surface |

Explicitly **not** in scope, ever, as part of this standard: the Weft-URI scheme, a federation registry, `/api/weft/multi-fetch`, or cross-language identity unification. The standard is *identity*, kept minimal on purpose.

## 10. Result

Weft gets the primitive every cross-tool binding silently assumed but never had: an identity that survives the refactors developers actually perform. Bindings gain a clean two-axis truth (same-entity? / code-changed?), governance gets an audit-grade lineage spine, and — because Filigree treats the id as opaque — the standard is adoptable across the whole suite, including a frozen member, without reviving the over-built machinery that sank the first attempt.
