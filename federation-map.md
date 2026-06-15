# Weft — federation map

**Status:** **Authoritative** as the at-a-glance integration matrix. It names *which pairs compose and which contract carries each pair*, and points to [contracts-index.md](./contracts-index.md) for the contract detail and to the **owning project doc** as the schema authority. It restates no schema.

**Members (a current-roster snapshot — open-ended by design; the identity is the seam, not the count).** Loomweave, Filigree, Wardline, and Legis are the live core. Charter has a realized local core/read-only MCP surface but remains a planned Weft integration. Warpline is an admitted member (2026-06-14); its federation adapters are a fast-follow outside the launch cutover. Lacuna is the demo specimen, and Shuttle is a roadmap thought-bubble (no repo). The roster grows over time (weft-the-app + daughter members, [PDR-0024](./pm/product/decisions/0024-the-fleet-is-the-customer-two-planes.md)). See [doctrine.md](./doctrine.md) §1–2 and [members/](./members/).

**Reading the matrix:** each non-empty cell is a cross-tool binding. Per the federation axiom ([doctrine.md](./doctrine.md) §5) every binding is **enrich-only** — removing one side never breaks the other's core flow. Every binding keys on **[SEI](./sei-standard.md)**.

> **PDR-0023 (2026-06-15): these cells are the crown jewels.** The reframe ("the federation is the product; the glue is the value") locates the product's value in *these seams*, not in any single member. A dead cell is the **product** broken, not a peripheral bug — the day's deepest defect was a dead seam (loomweave→Filigree emit), silently carrying `findings:0` for weeks. Two consequences for this matrix: (1) every seam is now **hub-authored and hub-blessed** (members keep autonomy over their own jobs, not over the joins — [doctrine.md](./doctrine.md) PDR-0023 banner); enrich-only and hub-blessed are not in tension. (2) every cell owes the **honesty invariant** — an empty/partial/stale result across any binding carries `cause + reason_class + fix` ([contracts-index.md](./contracts-index.md) § the `weft-reason` contract) so a join-miss can never read as a true-negative. The seam-health surface that lets an agent ask *"is this join carrying value end-to-end?"* is PDR-0023's central feature ([pm/2026-06-15-seam-health-map.md](./pm/2026-06-15-seam-health-map.md)).

## Integration matrix

Rows = the producer/initiator; columns = the other side. Numbers in cells reference [contracts-index.md](./contracts-index.md) sections.

| ↓ / → | Loomweave | Filigree | Wardline | Legis | Charter |
|---|---|---|---|---|---|
| **Loomweave** | — | entity-assoc drift via `issues_for` (§1); identity authority for all (§2) | qualname reconciliation (§5); taint-fact store host (§3) | serves SEI `resolve`/`lineage`; consumes git-rename seam (§6) | serves SEI to Charter trace links (§10) |
| **Filigree** | stores opaque SEI on issues (§1) | — | receives findings (§4; native emitter shipped, A-1 pending Loomweave-absent proof) | hosts governed sign-off binding (§7) | (planned) requirement ↔ work links |
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
