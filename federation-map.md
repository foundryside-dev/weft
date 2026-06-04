# Loom — federation map

**Status:** **Authoritative** as the at-a-glance integration matrix. It names *which pairs compose and which contract carries each pair*, and points to [contracts-index.md](./contracts-index.md) for the contract detail and to the **owning project doc** as the schema authority. It restates no schema.

**Members:** Clarion, Filigree, Wardline, Legis, Charter (5 realized) + Lacuna (demo specimen, not a member). Shuttle is a roadmap thought-bubble (no repo). See [doctrine.md](./doctrine.md) §1–2 and [members/](./members/).

**Reading the matrix:** each non-empty cell is a cross-tool binding. Per the federation axiom ([doctrine.md](./doctrine.md) §5) every binding is **enrich-only** — removing one side never breaks the other's core flow. Every binding keys on **[SEI](./sei-standard.md)**.

## Integration matrix

Rows = the producer/initiator; columns = the other side. Numbers in cells reference [contracts-index.md](./contracts-index.md) sections.

| ↓ / → | Clarion | Filigree | Wardline | Legis | Charter |
|---|---|---|---|---|---|
| **Clarion** | — | entity-assoc drift via `issues_for` (§1); identity authority for all (§2) | qualname reconciliation (§5); taint-fact store host (§3) | serves SEI `resolve`/`lineage`; consumes git-rename seam (§6) | serves SEI to Charter trace links (§10) |
| **Filigree** | stores opaque SEI on issues (§1) | — | receives findings (§4; today via Clarion translator — asterisk [A-1](./asterisk-register.md)) | hosts governed sign-off binding (§7) | (planned) requirement ↔ work links |
| **Wardline** | persists taint facts to Clarion (§3); emits `metadata.wardline.qualname` (§5) | findings → Filigree (§4) | — | findings routed through Legis enforcement (§8) | (planned) findings ↔ trust requirements |
| **Legis** | polls SEI/lineage; supplies git-rename signal (§6) | SEI-keyed sign-offs on issues (§7) | governs findings, trust vocab pass-through (§8) | — | consumes Charter preflight facts (§9) |
| **Charter** | SEI consumer for trace links (§10) | (planned) link requirements to issues | (planned) link findings to requirements | exposes `preflight_facts.v1` (§9) | — |

*(Charter cells marked "planned" are designed in ADRs but the federation adapters are deferred — Charter is scaffold-state. See [members/charter.md](./members/charter.md).)*

## The two structural facts that hold the matrix together

1. **SEI is the connective tissue.** Every cell binds on Clarion's [Stable Entity Identity](./sei-standard.md). A combination is only as strong as its weakest binding; a tool keying on a mutable `locator` silently orphans every combination it is in. SEI is canonical but **not yet locked** — Filigree's backfill is the remaining gate ([conflict-register.md](./conflict-register.md) §B-2).
2. **Filigree's `loom` HTTP generation is the federation transport.** Siblings pin to a named generation; evolution is additive (new generation, never mutate). See [contracts-index.md](./contracts-index.md) and Filigree ADR-002.

## Asterisks on the matrix

Two pairs do not yet pass the failure test cleanly; both are named with retirement conditions in the **[asterisk-register.md](./asterisk-register.md)**:

- **A-1 (LIVE):** Wardline→Filigree findings are pipeline-coupled through Clarion's SARIF translator. Retires on Wardline's native Filigree emitter.
- **A-2 (RETIRED 2026-06-05):** Clarion's plugin importing `wardline.core.registry.REGISTRY` — now reads an on-disk vocabulary descriptor instead.

## What is *not* on the matrix

- **Lacuna** is not a member — it is the deliberately-flawed demonstration specimen the whole matrix is *run against*. See [members/lacuna.md](./members/lacuna.md).
- **Shuttle** has no repo; its sketched change-execution cells are hypothetical. Do not build bindings to it.
- **There is no `loom://` URI scheme** and no federation registry/broker — closed by SEI ([uri-scheme.md](./uri-scheme.md)).
