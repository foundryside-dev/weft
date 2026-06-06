# Weft — cross-product contract index

**Status:** **Authoritative as an index**, not as a schema. This lists every live cross-product contract and **points to the owning project's authoritative doc**. Route shapes / tool names are quick references for orientation; the owning doc is authoritative if they ever disagree. weft does not restate full schemas — that is how the old hub drifted.

**Identity is the spine.** Every binding below keys on **[SEI](./sei-standard.md)** (opaque, Loomweave-minted). A binding still keyed on a `locator` is legacy to migrate.

**Building a whole member, not one binding?** The [Federation SDK](./federation-sdk.md) is the member-builder's companion to this index — same surfaces, organized by the obligations a new tool must meet to drop in.

---

## 1. Entity associations — Filigree ↔ Loomweave (Filigree ADR-029)

Bind a Filigree issue to a Loomweave entity. The `entity_associations` table lives **on Filigree's side**; the entity id is an **opaque string** (an SEI going forward) Filigree never parses; drift detection is the consumer's job via `content_hash_at_attach`.

- **Filigree HTTP (classic generation — note: `/api/issue/…`, *not* `/api/weft/…`):**
  `GET|POST /api/issue/{issue_id}/entity-associations`, `DELETE /api/issue/{issue_id}/entity-associations?entity_id=…`, `GET /api/entity-associations?entity_id=…` (reverse lookup).
- **Filigree MCP:** `entity_association_add`, `entity_association_remove`, `entity_association_list`, `entity_association_list_by_entity`.
- **Loomweave side:** `issues_for(entity_id, include_contained)` / the `entity_issue_list` MCP tool returns bound issues with drift status.
- **Authoritative:** `~/filigree/docs/federation/contracts.md` + Filigree ADR-029; Loomweave ADR-029 (`~/loomweave/docs/loomweave/adr/ADR-029-entity-associations-binding.md`). See [members/filigree.md](./members/filigree.md).

## 2. SEI identity resolution — Loomweave (authority) → all consumers

Loomweave's HTTP read API exposes identity resolution: `resolve(locator)`, `resolve_sei(sei)`, `lineage(sei)`, and `_capabilities` advertising `sei: {supported, version}`. Opaque on the wire; fail-closed on non-locator input (reserved `loomweave:eid:` prefix).

- **Authoritative:** [sei-standard.md](./sei-standard.md) (the contract) + Loomweave ADR-038 (token form) + `~/loomweave/docs/federation/contracts.md`. Conformance fixtures at `~/loomweave/docs/federation/fixtures/sei-conformance-oracle.json`.

## 3. Wardline taint-fact store — Wardline ↔ Loomweave (Loomweave ADR-036)

Wardline computes per-entity taint facts and persists them to Loomweave; Loomweave stores the `wardline_json` blob **opaque** (never parses it). Routes on Loomweave: `POST /api/wardline/taint-facts` (write, disabled by default), `GET /api/wardline/taint-facts?qualname=`, `POST /api/wardline/taint-facts:batch-get`, `POST /api/wardline/taint-facts/by-sei`.

- **Authoritative:** `~/loomweave/docs/federation/contracts.md` + Loomweave ADR-036. Wire terms in [glossary.md](./glossary.md).

## 4. Wardline findings → Filigree (native emitter shipped; A-1 live pending composition test)

Wardline findings reach Filigree's scan-results intake. The legacy path routes through Loomweave's `loomweave sarif import` translator into the classic `POST /api/v1/scan-results` — this is **asterisk [A-1](./asterisk-register.md#a-1--wardline--filigree-findings-are-pipeline-coupled-through-loomweave)**. Wardline's **native Filigree emitter has now shipped** (`~/wardline/src/wardline/core/filigree_emit.py`), posting directly to the federation generation (`POST /api/weft/scan-results`); A-1 stays live until the Loomweave-absent Wardline+Filigree composition is demonstrated end-to-end (see the asterisk for the exact evidence level).

- **Authoritative:** Loomweave ADR-015 Rev 2; `~/wardline/docs/integration/2026-05-29-wardline-weft-integration-brief.md`; Filigree scan-results intake in `~/filigree/docs/federation/contracts.md`.

## 5. Qualname normalization — Wardline → Loomweave (Loomweave ADR-018)

Wardline emits a pre-composed dotted qualname as `metadata.wardline.qualname = module_dotted_name(file_path) + "." + __qualname__`; Loomweave reconciles it to entity IDs/SEIs (owning the catalog that makes qualnames meaningful — doctrine §6).

- **Authoritative:** `~/loomweave/docs/federation/contracts.md` (§ qualname normalization) + Loomweave ADR-018; Wardline integration brief.

## 6. Legis governance consumption + git-rename provider seam — Legis ↔ Loomweave

Legis is a **pull-only** consumer of Loomweave's SEI surface (`resolve` / `resolve_sei` / `lineage`) for SEI-keyed attestations and an audit spine; it re-establishes lineage integrity at its own boundary (SEI REQ-L-01, Option 3). Legis also **supplies** the git-rename signal via `GET /git/renames?rev_range=…`; Loomweave consumes it through the typed `GitRenameSource` / `LegisGitRenameSource` seam (REQ-C-05). Operative enablement is jointly gated on Loomweave driving a committed rev-range.

- **Authoritative:** `~/legis/docs/federation/sei-conformance.md` + `~/loomweave/docs/federation/contracts.md` (§ legis governance consumption / WS9). See [members/legis.md](./members/legis.md).

## 7. Legis ↔ Filigree — SEI-keyed sign-off binding

Legis binds governed sign-offs to Filigree issues using the entity-association surface (§1) plus its own signoff endpoints (`POST /signoff/request`, `…/bind-issue`, `…/sign`). Filigree retains issue-lifecycle authority; Legis adds governance.

- **Authoritative:** Legis (`src/legis/filigree/client.py`, signoff binding) + `~/filigree/docs/federation/contracts.md`.

## 8. Legis ↔ Wardline — findings routing through enforcement

Legis routes Wardline findings (`POST /wardline/scan-results` on Legis) through its 2×2 enforcement cells (chill / coached / structured / protected). **Trust vocabulary passes through verbatim** — "Wardline analyses, Legis governs"; Legis never re-adjudicates trust.

- **Authoritative:** Legis (`src/legis/service/wardline.py`, `wardline/*`) + `~/loomweave/docs/federation/contracts.md` (§ trust-vocabulary convergence).

## 9. Charter preflight-fact envelope — Charter → Legis (Charter ADR-006)

Charter exposes a versioned `weft.charter.preflight_facts.v1` envelope (requirement impact, verification freshness, baseline drift, traceability gaps). **Legis alone decides enforcement; Charter provides facts only.** *Designed, adapter pending* (Charter is scaffold-state).

- **Authoritative:** Charter ADR-006 (`~/charter/docs/architecture/decisions/ADR-006-legis-preflight-fact-envelope.md`). See [members/charter.md](./members/charter.md).

## 10. Charter SEI consumer contract — Charter ↔ Loomweave (Charter ADR-005)

Charter stores SEI as an opaque peer identifier on trace links, never minting/parsing; marks links stale on lineage change; falls back to fragile file/symbol refs when Loomweave is absent. *Designed, adapter pending.*

- **Authoritative:** Charter ADR-005 (`~/charter/docs/architecture/decisions/ADR-005-clarion-sei-consumer-contract.md`).

---

## Filigree HTTP generations (the federation transport)

Filigree publishes **named, pinnable HTTP generations**; siblings pin to a generation and evolution is by introducing a *new* generation, never mutating an existing one.

- `classic` — the pre-federation surface (mostly un-prefixed `/api/…`, with a `/api/v1/scan-results` outlier). Frozen; bug-fixes only. The entity-association routes (§1) live here.
- `weft` — `/api/weft/*`, the federation-era generation (unified `BatchResponse[T]`/`ListResponse[T]` envelopes, closed `ErrorCode` enum, composed verbs). Carries e.g. `GET /api/weft/changes`.
- **Loose cooperation** (Filigree ADR-002): every weft-generation endpoint must be fully functional with other federation components absent.
- **Authoritative:** `~/filigree/docs/federation/contracts.md` + Filigree ADR-002 (`~/filigree/docs/architecture/decisions/ADR-002-api-generations-and-federation-posture.md`).

> The `weft` generation is a transport/envelope naming discipline — it is **not** the closed `weft://` URI scheme (see [uri-scheme.md](./uri-scheme.md)). Same word, different things; both are catalogued so the collision is explicit.
