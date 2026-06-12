# Weft — Federation SDK

**Status:** **Authoritative as an integration contract**, not as a schema. This
is the one-stop surface for building your own tool and **dropping it into the
Weft federation** as a member. It states the *obligations* a member must satisfy
and the *interface surfaces* it implements or consumes — and points to each
owning repo for the exact, authoritative schema. Like the rest of the hub it
**points, it does not restate**: every signature below is a **dated snapshot**,
and the owning repo wins on any disagreement ([README](./README.md) §authority
model).

!!! info "What this SDK is — and is not"
    - **It is** the federation-level interface contract: the invariants every
      member obeys, the surfaces it can implement or call, and a conformance
      checklist. You write your own code against it.
    - **It is not** a shipped library, client stubs, generated types, or copied
      schemas. There is nothing to `pip install`. Restating schemas as code is
      exactly the drift the hub was rebuilt to end ([README](./README.md) §authority
      model) — so the SDK gives you the *interface*, and the owning repo gives you
      the *bytes*.
    - **It is enrich-only.** Joining the federation never makes you load-bearing
      for a peer, and a peer is never load-bearing for you ([doctrine.md](./doctrine.md) §5).

A member is any tool that is **authoritative for one domain, useful standalone,
and enrich-only when composed** ([doctrine.md](./doctrine.md) §1–2, §5). You do
not register with a broker and there is no `weft://` URI scheme — joining is
*conforming to the interfaces below*, nothing more ([uri-scheme.md](./uri-scheme.md)).

---

## 1. The conformance spine — three invariants

Every member satisfies these three, regardless of which peers it touches. They
fall straight out of the doctrine and the locked identity standard; the rest of
the SDK is opt-in on top of them.

### I-1 — Key every cross-tool binding on SEI

Identity is the connective tissue. Any durable reference your member holds to
another member's code entity **must key on the [Stable Entity Identity
(SEI)](./sei-standard.md)** — the opaque, Loomweave-minted token that survives
the renames and moves developers actually perform. A binding keyed on a mutable
`locator` silently orphans on the first refactor ([sei-standard.md](./sei-standard.md) §0.4).

- **Consume** Loomweave's identity surface to resolve and track SEIs (§2,
  Loomweave).
- **Store SEI opaque** — never parse, never mint, never derive it. Its internal
  form is Loomweave's business ([sei-standard.md](./sei-standard.md) §2, decision 4).
- **Degrade honestly** when the `sei` capability is absent — fall back to fragile
  refs and *say so*; do not guess ([sei-standard.md](./sei-standard.md) §4).
- Conformance here is **proven by the oracle, never assumed** (§3).

### I-2 — Stay enrich-only / loosely cooperating

Every surface your member exposes must be **fully functional with every peer
absent**, and removing your member must never break a peer's core flow
([doctrine.md](./doctrine.md) §5; Filigree ADR-002 *loose cooperation*). Concretely:

- Federation writes you accept are **off by default or additive** — a peer that
  never calls you behaves identically (e.g. Loomweave's taint-fact write path
  ships disabled).
- You compute your own domain result first; a peer's enrichment is layered on,
  never required to produce it.

### I-3 — Treat peer identifiers and blobs as opaque; own your drift check

Across the matrix, the holder of a foreign value never interprets it:

- Filigree stores the entity id **opaque** and computes no drift — the consumer
  does ([sei-standard.md](./sei-standard.md) §0; [contracts-index.md](./contracts-index.md) §1).
- Loomweave stores Wardline's `wardline_json` taint blob **opaque** — it never
  parses it ([contracts-index.md](./contracts-index.md) §3).
- Charter stores SEI **opaque** on trace links, never minting or parsing
  ([contracts-index.md](./contracts-index.md) §10).

So: **store what a peer hands you verbatim, and detect drift on your own read
path** by snapshotting the peer's content hash at attach time (Filigree's
`content_hash_at_attach`) and comparing on read. The identity axis (alive /
orphaned) and the content axis (fresh / stale) are **separate signals — neither
is inferred from the other** ([sei-standard.md](./sei-standard.md) §2.1).

---

## 2. The interface surfaces

Implement or consume only the surfaces you actually compose with — each is an
independent, enrich-only binding. Surfaces are grouped by their **owning
member** (the member that is authoritative for the contract and for the bytes).

!!! warning "snapshot 2026-06-06 — signatures are NOT authoritative here"
    Every route, verb, envelope, and token form below is a curated orientation
    snapshot. The **owning repo's `docs/federation/contracts.md` is
    authoritative** and wins on any disagreement. Pin against the owning repo's
    fixtures, not against this table.

### 2.1 Loomweave — identity authority & taint-fact host

Authoritative: [`sei-standard.md`](./sei-standard.md) (the identity contract) +
`~/loomweave/docs/federation/contracts.md` (the wire routes) + Loomweave ADR-038
(token form). Conformance oracle:
`~/loomweave/docs/federation/fixtures/sei-conformance-oracle.json`.

**SEI token form** (opaque to you — shown only so you can recognise one, never
parse it):

```text
loomweave:eid:<blake3(locator ++ 0x00 ++ mint_run_id)[:32 hex]>
```

The prefix `loomweave:eid:` is **reserved** — a `locator` can never take it, and
resolution is **fail-closed** on a non-locator input ([sei-standard.md](./sei-standard.md) §4).

| Surface | Signature (snapshot) | Role / obligation |
|---|---|---|
| Identity resolve (locator→SEI + content axis) | `POST /api/v1/identity/resolve` → `{ sei, current_locator, content_hash, alive }` | Resolve a locator to its current SEI; `alive:false` if gone. Batch: `POST /api/v1/identity/resolve:batch`. |
| Identity by SEI (identity axis) | `GET /api/v1/identity/sei/:sei` → `{ current_locator, content_hash, alive }` or `{ alive:false, lineage:[…] }` | Is this the same entity? Orphaned/superseded carries lineage. |
| Lineage (audit spine) | `GET /api/v1/identity/lineage/:sei` → ordered `{ event, old_locator, new_locator, run_id, recorded_at }` | `born`/`locator_changed`/`moved`/`orphaned`/`superseded`. Pull-only in v1. |
| Capability probe | `GET /api/v1/_capabilities` → `{ sei: { supported, version }, … }` | Always unauthenticated. Detect a pre-SEI Loomweave and **degrade** (I-1). |
| File identity | `GET /api/v1/files?path=&language=` → `{ entity_id, content_hash, canonical_path, language }` | Resolve a path to a file entity. Batch: `POST /api/v1/files/batch` (≤256), `POST /api/v1/files:resolve` (≤1000). |
| Taint-fact store (write) | `POST /api/wardline/taint-facts` — **disabled by default** | Persist a per-entity taint blob; stored **opaque** (I-3). |
| Taint-fact store (read) | `GET /api/wardline/taint-facts?project=&qualname=` · `POST /api/wardline/taint-facts:batch-get` · `POST /api/wardline/taint-facts/by-sei` | Read facts back by qualname or SEI. |

Auth on the protected `/api/v1/files`-family and taint routes: an
`X-Weft-Component`/`X-Weft-Timestamp`/`X-Weft-Nonce` HMAC-SHA256 envelope, or a
bearer token; `_capabilities` is always open. The error `code` enum is **closed**
— switch on `code`, not HTTP status (the same code can carry different statuses
per endpoint). See `~/loomweave/docs/federation/contracts.md`.

### 2.2 Filigree — work-state surface & the `weft` transport generation

Authoritative: `~/filigree/docs/federation/contracts.md` + Filigree ADR-002.
Briefing: [members/filigree.md](./members/filigree.md) · cheat-sheet:
[products/filigree.md](./products/filigree.md).

Filigree hosts the **federation transport**: named, **pinnable HTTP
generations**. Evolution is by introducing a *new* generation, never mutating an
existing one — so a member that pins a generation is wire-stable across Filigree
releases.

!!! note "Generation name"
    Filigree now names the federation generation **`weft`** in source and fixtures
    (`/api/weft/*`, `tests/fixtures/contracts/weft/`). Older `loom` references are
    historical rebrand residue; pin to the named generation and path the installed
    Filigree build publishes.

| Surface | Signature (snapshot) | Role / obligation |
|---|---|---|
| Transport generation | `/api/weft/*` (the federation-era generation) | Pin to it. Unified `BatchResponse[T]` / `ListResponse[T]` envelopes, closed `ErrorCode`, composed verbs. |
| Generation discipline | `classic` (frozen, `/api/…`) vs `weft` (`/api/weft/…`) | Pin a *named* generation; the un-prefixed living surface is non-stable across versions. |
| Scan-results intake | `POST /api/weft/scan-results` (alias `POST /api/scan-results`) | Findings → tracked work. Unknown `scan_run_id` is **tolerated permanently** — mint your own and POST enrich-only. |
| Entity associations (bind) | `POST\|GET /api/issue/{issue_id}/entity-associations` · `DELETE …?entity_id=` | Bind an issue to your opaque entity id (an SEI). Lives on the **classic** `/api/issue/…` surface. MCP: `entity_association_add/remove/list`. |
| Entity associations (reverse) | `GET /api/entity-associations?entity_id=…` | Given an entity id, every issue bound to it. MCP: `entity_association_list_by_entity`. |
| Reconciliation feed | `GET /api/weft/changes` | Incremental cursor. Carries `issue_deleted` tombstones + `affected_entities` — on delete, purge your mirrored bindings (I-3). |

Auth: the `/api/weft/*` surface resolves a bearer token in three tiers:
`WEFT_FEDERATION_TOKEN` (with deprecated `FILIGREE_API_TOKEN` /
`FILIGREE_FEDERATION_API_TOKEN` aliases during transition), then the auto-minted
`<store_dir>/federation_token` file used by daemon/install/doctor paths, then
absent/off. Do not assume "unset env" means unauthenticated loopback trust; check
the resolved token state.

### 2.3 Wardline — trust-boundary findings & qualname producer

Authoritative: `~/wardline/docs/integration/` + `~/wardline/src/wardline/core/`.
Briefing: [members/wardline.md](./members/wardline.md).

| Surface | Signature (snapshot) | Role / obligation |
|---|---|---|
| Findings emitter | `POST /api/weft/scan-results` (Filigree generation) — `~/wardline/src/wardline/core/filigree_emit.py` | Native emitter posts findings straight to the weft transport. (See asterisk **[A-1](./asterisk-register.md)** for the legacy Loomweave-translator path.) |
| Suppression provenance | `metadata.wardline.suppression_state` (+ `metadata.wardline.suppression_reason`) | Carries the finding's suppression signal across the seam — exactly one of `baselined` \| `waived` \| `judged`, **carried only when the state is not active** (absent ⇒ active; never emitted as the literal `active`); `suppression_reason` rides only alongside a non-active state. Filigree reads this so `finding_promote` refuses/warns on a baselined finding instead of minting a fresh P1 bug. |
| Qualname producer | `metadata.wardline.qualname = f"{module_dotted_name(path)}.{__qualname__}"` | Pre-composed dotted qualname Loomweave reconciles to an SEI ([contracts-index.md](./contracts-index.md) §5). `module_dotted_name` is byte-for-byte with Loomweave's extractor — the shared corpus pins both halves. |
| Taint-fact producer | writes to Loomweave `POST /api/wardline/taint-facts` (§2.1) | Computes per-entity taint, persists it opaque to the identity host. |

### 2.4 Legis — governance, sign-off, and the git-rename provider

Authoritative: `~/legis/docs/federation/sei-conformance.md` +
`~/legis/src/legis/api/app.py`. Briefing: [members/legis.md](./members/legis.md).

Legis is a **pull-only consumer** of Loomweave's SEI surface for attestations and
its audit spine, and re-establishes lineage integrity at its own boundary
(prefix-hash custody, [sei-standard.md](./sei-standard.md) §2.2). It governs;
it never re-adjudicates trust ("Wardline analyses, Legis governs").

| Surface | Signature (snapshot) | Role / obligation |
|---|---|---|
| Sign-off request | `POST /signoff/request` | Open a governed sign-off. |
| Sign-off ↔ issue bind | `POST /signoff/{request_seq}/bind-issue` · `GET /signoff/{request_seq}/binding` | Bind a sign-off to a Filigree issue via the entity-association surface (§2.2). Filigree keeps issue-lifecycle authority. |
| Sign-off sign | `POST /signoff/{request_seq}/sign` | Record the SEI-keyed attestation. |
| Findings enforcement intake | `POST /wardline/scan-results` | Route Wardline findings through the 2×2 enforcement cells; requires the signed artifact's `findings` key (present empty list = clean, absent key = malformed); **trust vocabulary passes through verbatim** ([contracts-index.md](./contracts-index.md) §8). |
| Governance reads | `GET /governance/identity-gaps` · `GET /governance/lineage-integrity` | Orphan-as-governance-gap; lineage-divergence detection at the boundary. |
| Git-rename provider | `GET /git/renames?rev_range=…` | Supplies the rename signal Loomweave's matcher consumes through the typed `GitRenameSource` seam ([contracts-index.md](./contracts-index.md) §6). |

### 2.5 Charter — preflight facts & SEI trace links *(designed, adapter pending)*

!!! note "Charter is local-core state"
    Charter's local domain core and read-only MCP surface have shipped, but its
    federation adapters are **designed in ADRs and not yet live**
    ([members/charter.md](./members/charter.md)). The interfaces below are the
    *designed* Weft integration contract; treat them as forward-looking until the
    adapter lands.

Authoritative: Charter ADR-006 (preflight facts) + ADR-005 (SEI consumer),
`~/charter/docs/architecture/decisions/`.

| Surface | Signature (snapshot) | Role / obligation |
|---|---|---|
| Preflight-fact envelope | `weft.charter.preflight_facts.v1` — `{ producer{tool,version,project}, facts[], freshness, summary }` | Versioned facts for Legis: `requirement_touched`, `requirement_nearby`, `requirement_verification_stale`, `requirement_verification_missing`, `baseline_drift`. **Facts only — Legis alone decides enforcement.** |
| SEI trace-link consumer | stores SEI **opaque** on trace links; marks links stale on lineage change | Never mints/parses SEI; falls back to fragile file/symbol refs when Loomweave is absent (I-1, I-3). |

!!! note "Envelope name"
    Charter source has moved to the `weft.charter.*` namespace, while some ADR text
    still carries legacy `loom`/`clarion` names. The hub indexes the intended Weft
    wire identifier; verify against `~/charter` before implementing an adapter.

---

## 3. Conformance — proven, not assumed

Membership is **oracle-gated and ungrandfathered**: a tool is conformant only
when it *passes the shared conformance oracle*, never because it "looks
compatible" ([sei-standard.md](./sei-standard.md) §0.1). The machine-checkable
definition is one file:

> `~/loomweave/docs/federation/fixtures/sei-conformance-oracle.json`

Run your member against a reference Loomweave through these oracle fixtures
([sei-standard.md](./sei-standard.md) §8):

- [ ] **identity round-trip + opacity** — mint → resolve both directions → you
      treat the SEI opaque.
- [ ] **rename** — body unchanged → SEI carried, `locator_changed` event.
- [ ] **move** — new module, body+signature unchanged → SEI carried, `moved`.
- [ ] **ambiguous** — rename *with* a body edit → **fail closed**: new SEI, old
      `orphaned`.
- [ ] **delete** — entity gone → `orphaned`, `resolve_sei` returns
      `alive:false` + lineage.
- [ ] **capability-absent** — Loomweave without the `sei` capability → you
      **degrade honestly** rather than guess.

And the three spine invariants (§1), restated as gates:

- [ ] Every cross-tool binding keys on **SEI**, never a bare locator (I-1).
- [ ] Every surface you expose is **functional with every peer absent** (I-2).
- [ ] You store peer identifiers/blobs **opaque** and own your **content-hash
      drift check** (I-3).

---

## 4. Dropping in your own member — the path

No code ships here; this is the order of operations.

1. **Be solo-useful first.** Build your domain tool so it produces its result
   with no peer present. That is the price of admission ([doctrine.md](./doctrine.md) §5).
2. **Consume identity.** Resolve your code references to SEIs via Loomweave's
   identity surface (§2.1) and store them opaque. Probe `_capabilities` and
   degrade when SEI is absent.
3. **Opt into the surfaces you compose with.** Pick from §2 — bind issues
   (Filigree), emit findings (Wardline/Filigree), persist taint (Loomweave),
   request sign-offs (Legis), contribute preflight facts (Charter). Implement
   only what your composition needs; each binding is independent and enrich-only.
4. **Expose your own enrich-only surface** (optional). If peers should read
   *your* domain facts, publish them additively — off-by-default writes, a
   capability probe, a closed error enum, pinnable shape — mirroring §2.
5. **Pass the oracle** (§3). Conformance is demonstrated, not asserted.

---

## 5. Pointers — where the authority lives

| Surface | Owning member | Authoritative source |
|---|---|---|
| SEI identity contract | Loomweave | [sei-standard.md](./sei-standard.md) + Loomweave ADR-038; oracle `~/loomweave/docs/federation/fixtures/sei-conformance-oracle.json` |
| Identity / file / taint routes | Loomweave | `~/loomweave/docs/federation/contracts.md` (+ ADR-036 taint store) |
| `weft` generation, entity-assoc, intake, changes feed | Filigree | `~/filigree/docs/federation/contracts.md` + Filigree ADR-002 / ADR-029 |
| Findings emitter, qualname producer | Wardline | `~/wardline/docs/integration/` + `~/wardline/src/wardline/core/` |
| Sign-off, enforcement, git-rename, governance reads | Legis | `~/legis/docs/federation/sei-conformance.md` + `~/legis/src/legis/api/app.py` |
| Preflight-fact envelope, SEI trace links | Charter | Charter ADR-006 / ADR-005 (`~/charter/docs/architecture/decisions/`) |
| The integration matrix (which pairs compose) | weft hub | [federation-map.md](./federation-map.md) |
| The contract index (every live binding) | weft hub | [contracts-index.md](./contracts-index.md) |
| The federation law | weft hub | [doctrine.md](./doctrine.md) |

> Building a *specific* cross-tool integration rather than a whole member? Start
> at [contracts-index.md](./contracts-index.md) — it indexes each of the ten live
> bindings and points to the owning schema. This SDK is the **member-builder's**
> view of the same surfaces.
