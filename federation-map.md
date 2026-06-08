# Weft — federation map

**Status:** **Authoritative** as the at-a-glance integration matrix. It names *which pairs compose and which contract carries each pair*, and points to [contracts-index.md](./contracts-index.md) for the contract detail and to the **owning project doc** as the schema authority. It restates no schema.

**Members:** Loomweave, Filigree, Wardline, Legis, Charter (5 realized) + Lacuna (demo specimen, not a member). Shuttle is a roadmap thought-bubble (no repo). See [doctrine.md](./doctrine.md) §1–2 and [members/](./members/).

**Reading the matrix:** each non-empty cell is a cross-tool binding. Per the federation axiom ([doctrine.md](./doctrine.md) §5) every binding is **enrich-only** — removing one side never breaks the other's core flow. Every binding keys on **[SEI](./sei-standard.md)**.

## Integration matrix

Rows = the producer/initiator; columns = the other side. Numbers in cells reference [contracts-index.md](./contracts-index.md) sections.

| ↓ / → | Loomweave | Filigree | Wardline | Legis | Charter |
|---|---|---|---|---|---|
| **Loomweave** | — | entity-assoc drift via `issues_for` (§1); identity authority for all (§2) | qualname reconciliation (§5); taint-fact store host (§3) | serves SEI `resolve`/`lineage`; consumes git-rename seam (§6) | serves SEI to Charter trace links (§10) |
| **Filigree** | stores opaque SEI on issues (§1) | — | receives findings (§4; today via Loomweave translator — asterisk [A-1](./asterisk-register.md)) | hosts governed sign-off binding (§7) | (planned) requirement ↔ work links |
| **Wardline** | persists taint facts to Loomweave (§3); emits `metadata.wardline.qualname` (§5) | findings → Filigree (§4) | — | findings routed through Legis enforcement (§8) | (planned) findings ↔ trust requirements |
| **Legis** | polls SEI/lineage; supplies git-rename signal (§6) | SEI-keyed sign-offs on issues (§7) | governs findings, trust vocab pass-through (§8) | — | consumes Charter preflight facts (§9) |
| **Charter** | SEI consumer for trace links (§10) | (planned) link requirements to issues | (planned) link findings to requirements | exposes `preflight_facts.v1` (§9) | — |

*(Charter cells marked "planned" are designed in ADRs but the federation adapters are deferred — Charter is scaffold-state. See [members/charter.md](./members/charter.md).)*

> **Building your own tool to drop into this matrix?** See the
> [Federation SDK](./federation-sdk.md) — the member-builder's view of these same
> bindings, with the conformance spine and the oracle gate.

## The two structural facts that hold the matrix together

1. **SEI is the connective tissue.** Every cell binds on Loomweave's [Stable Entity Identity](./sei-standard.md). A combination is only as strong as its weakest binding; a tool keying on a mutable `locator` silently orphans every combination it is in. SEI is **LOCKED** (2026-06-05) — the interface is frozen; remaining member backfills are conformance tasks under the locked standard ([conflict-register.md](./conflict-register.md) §B-2).
2. **Filigree's `weft` HTTP generation is the federation transport.** Siblings pin to a named generation; evolution is additive (new generation, never mutate). See [contracts-index.md](./contracts-index.md) and Filigree ADR-002. For the *runtime* wiring of this transport — which process listens where, which member emits to which endpoint, and how to verify a member actually reaches the tracker — see [federation-topology.md](./federation-topology.md).

## Asterisks on the matrix

Two pairs do not yet pass the failure test cleanly; both are named with retirement conditions in the **[asterisk-register.md](./asterisk-register.md)**:

- **A-1 (LIVE):** Wardline→Filigree findings are pipeline-coupled through Loomweave's SARIF translator. Wardline's native Filigree emitter has **shipped** (`~/wardline/src/wardline/core/filigree_emit.py`); the asterisk stays live until (Wardline, Filigree) composition with Loomweave absent is demonstrated end-to-end (currently exercised only at the unit/server-wiring tier — see [asterisk-register.md](./asterisk-register.md) A-1).
- **A-2 (RETIRED 2026-06-05):** Loomweave's plugin importing `wardline.core.registry.REGISTRY` — now reads an on-disk vocabulary descriptor instead.

## What is *not* on the matrix

- **Lacuna** is not a member — it is the deliberately-flawed demonstration specimen the whole matrix is *run against*. See [members/lacuna.md](./members/lacuna.md).
- **Shuttle** has no repo; its sketched change-execution cells are hypothetical. Do not build bindings to it.
- **There is no `weft://` URI scheme** and no federation registry/broker — closed by SEI ([uri-scheme.md](./uri-scheme.md)).
