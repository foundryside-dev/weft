# Loom — cross-product contract index

**Status:** **Authoritative as an index**, not as a schema. This lists every live cross-product contract and **points to the owning project's authoritative doc**. Route shapes / tool names are quick references for orientation; the owning doc is authoritative if they ever disagree. loom does not restate full schemas — that is how the old hub drifted.

**Identity is the spine.** Every binding below keys on **[SEI](./sei-standard.md)** (opaque, Clarion-minted). A binding still keyed on a `locator` is legacy to migrate.

---

## 1. Entity associations — Filigree ↔ Clarion (Filigree ADR-029)

Bind a Filigree issue to a Clarion entity. The `entity_associations` table lives **on Filigree's side**; the entity id is an **opaque string** (an SEI going forward) Filigree never parses; drift detection is the consumer's job via `content_hash_at_attach`.

- **Filigree HTTP (classic generation — note: `/api/issue/…`, *not* `/api/loom/…`):**
  `GET|POST /api/issue/{issue_id}/entity-associations`, `DELETE /api/issue/{issue_id}/entity-associations?entity_id=…`, `GET /api/entity-associations?entity_id=…` (reverse lookup).
- **Filigree MCP:** `entity_association_add`, `entity_association_remove`, `entity_association_list`, `entity_association_list_by_entity`.
- **Clarion side:** `issues_for(entity_id, include_contained)` / the `entity_issue_list` MCP tool returns bound issues with drift status.
- **Authoritative:** `~/filigree/docs/federation/contracts.md` + Filigree ADR-029; Clarion ADR-029 (`~/clarion/docs/clarion/adr/ADR-029-entity-associations-binding.md`). See [members/filigree.md](./members/filigree.md).

## 2. SEI identity resolution — Clarion (authority) → all consumers

Clarion's HTTP read API exposes identity resolution: `resolve(locator)`, `resolve_sei(sei)`, `lineage(sei)`, and `_capabilities` advertising `sei: {supported, version}`. Opaque on the wire; fail-closed on non-locator input (reserved `clarion:eid:` prefix).

- **Authoritative:** [sei-standard.md](./sei-standard.md) (the contract) + Clarion ADR-038 (token form) + `~/clarion/docs/federation/contracts.md`. Conformance fixtures at `~/clarion/docs/federation/fixtures/sei-conformance-oracle.json`.

## 3. Wardline taint-fact store — Wardline ↔ Clarion (Clarion ADR-036)

Wardline computes per-entity taint facts and persists them to Clarion; Clarion stores the `wardline_json` blob **opaque** (never parses it). Routes on Clarion: `POST /api/wardline/taint-facts` (write, disabled by default), `GET /api/wardline/taint-facts?qualname=`, `POST /api/wardline/taint-facts:batch-get`, `POST /api/wardline/taint-facts/by-sei`.

- **Authoritative:** `~/clarion/docs/federation/contracts.md` + Clarion ADR-036. Wire terms in [glossary.md](./glossary.md).

## 4. Wardline findings → Filigree (today via Clarion; native emitter pending)

Wardline findings reach Filigree's intake (`POST /api/v1/scan-results`). **Today** this routes through Clarion's `clarion sarif import` translator — this is **asterisk [A-1](./asterisk-register.md#a-1--wardline--filigree-findings-are-pipeline-coupled-through-clarion)**, retiring when Wardline ships a native Filigree emitter.

- **Authoritative:** Clarion ADR-015 Rev 2; `~/wardline/docs/integration/2026-05-29-wardline-loom-integration-brief.md`; Filigree scan-results intake in `~/filigree/docs/federation/contracts.md`.

## 5. Qualname normalization — Wardline → Clarion (Clarion ADR-018)

Wardline emits a pre-composed dotted qualname as `metadata.wardline.qualname = module_dotted_name(file_path) + "." + __qualname__`; Clarion reconciles it to entity IDs/SEIs (owning the catalog that makes qualnames meaningful — doctrine §6).

- **Authoritative:** `~/clarion/docs/federation/contracts.md` (§ qualname normalization) + Clarion ADR-018; Wardline integration brief.

## 6. Legis governance consumption + git-rename provider seam — Legis ↔ Clarion

Legis is a **pull-only** consumer of Clarion's SEI surface (`resolve` / `resolve_sei` / `lineage`) for SEI-keyed attestations and an audit spine; it re-establishes lineage integrity at its own boundary (SEI REQ-L-01, Option 3). Legis also **supplies** the git-rename signal via `GET /git/renames?rev_range=…`; Clarion consumes it through the typed `GitRenameSource` / `LegisGitRenameSource` seam (REQ-C-05). Operative enablement is jointly gated on Clarion driving a committed rev-range.

- **Authoritative:** `~/legis/docs/federation/sei-conformance.md` + `~/clarion/docs/federation/contracts.md` (§ legis governance consumption / WS9). See [members/legis.md](./members/legis.md).

## 7. Legis ↔ Filigree — SEI-keyed sign-off binding

Legis binds governed sign-offs to Filigree issues using the entity-association surface (§1) plus its own signoff endpoints (`POST /signoff/request`, `…/bind-issue`, `…/sign`). Filigree retains issue-lifecycle authority; Legis adds governance.

- **Authoritative:** Legis (`src/legis/filigree/client.py`, signoff binding) + `~/filigree/docs/federation/contracts.md`.

## 8. Legis ↔ Wardline — findings routing through enforcement

Legis routes Wardline findings (`POST /wardline/scan-results` on Legis) through its 2×2 enforcement cells (chill / coached / structured / protected). **Trust vocabulary passes through verbatim** — "Wardline analyses, Legis governs"; Legis never re-adjudicates trust.

- **Authoritative:** Legis (`src/legis/service/wardline.py`, `wardline/*`) + `~/clarion/docs/federation/contracts.md` (§ trust-vocabulary convergence).

## 9. Charter preflight-fact envelope — Charter → Legis (Charter ADR-006)

Charter exposes a versioned `loom.charter.preflight_facts.v1` envelope (requirement impact, verification freshness, baseline drift, traceability gaps). **Legis alone decides enforcement; Charter provides facts only.** *Designed, adapter pending* (Charter is scaffold-state).

- **Authoritative:** Charter ADR-006 (`~/charter/docs/architecture/decisions/ADR-006-legis-preflight-fact-envelope.md`). See [members/charter.md](./members/charter.md).

## 10. Charter SEI consumer contract — Charter ↔ Clarion (Charter ADR-005)

Charter stores SEI as an opaque peer identifier on trace links, never minting/parsing; marks links stale on lineage change; falls back to fragile file/symbol refs when Clarion is absent. *Designed, adapter pending.*

- **Authoritative:** Charter ADR-005 (`~/charter/docs/architecture/decisions/ADR-005-clarion-sei-consumer-contract.md`).

---

## Filigree HTTP generations (the federation transport)

Filigree publishes **named, pinnable HTTP generations**; siblings pin to a generation and evolution is by introducing a *new* generation, never mutating an existing one.

- `classic` — the pre-federation surface (mostly un-prefixed `/api/…`, with a `/api/v1/scan-results` outlier). Frozen; bug-fixes only. The entity-association routes (§1) live here.
- `loom` — `/api/loom/*`, the federation-era generation (unified `BatchResponse[T]`/`ListResponse[T]` envelopes, closed `ErrorCode` enum, composed verbs). Carries e.g. `GET /api/loom/changes`.
- **Loose cooperation** (Filigree ADR-002): every loom-generation endpoint must be fully functional with other federation components absent.
- **Authoritative:** `~/filigree/docs/federation/contracts.md` + Filigree ADR-002 (`~/filigree/docs/architecture/decisions/ADR-002-api-generations-and-federation-posture.md`).

> The `loom` generation is a transport/envelope naming discipline — it is **not** the closed `loom://` URI scheme (see [uri-scheme.md](./uri-scheme.md)). Same word, different things; both are catalogued so the collision is explicit.
