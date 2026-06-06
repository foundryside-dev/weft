# Products

Curated cheat-sheets for the five Weft members. One page per member: what it
does (from first principles), a short quick-start, how it composes with its
siblings, and a **snapshot-marked** table of its most-used commands and MCP
verbs.

These pages are **usage cheat-sheets**, not reference. Each member's repo is the
authority for its full command list, MCP tool set, route shapes, version, and
counts. Every surface fact here is a dated snapshot with a pointer back to the
owning repo — when the cheat-sheet and the repo disagree, the repo wins.

!!! note "How to read these pages"
    The **federation role** of each member — which contracts it carries, which
    asterisks apply, how identity flows — lives in its
    [member briefing](../members/loomweave.md) and the
    [federation map](../federation-map.md), not here. These product pages cover
    *usage*; the briefings cover *federation patterns*. Each page cross-links to
    both rather than restating either.

## The five members

| Member | Domain authority | Language | Cheat-sheet |
|--------|------------------|----------|-------------|
| **Loomweave** | code structure **+ identity authority (SEI)** | Rust | [loomweave →](loomweave.md) |
| **Filigree** | work state / issue lifecycle | Python | [filigree →](filigree.md) |
| **Wardline** | trust-boundary analysis | Python | [wardline →](wardline.md) |
| **Legis** | git/CI governance & attestations | Python | [legis →](legis.md) |
| **Charter** | requirements, traceability, verification | Python | [charter →](charter.md) |

Each member is authoritative for one domain, useful on its own, and
**enrich-only — never load-bearing** when composed. The federation axiom and the
composition law are in the [doctrine](../doctrine.md).

!!! info "Shuttle and Lacuna are not here"
    **Shuttle** is a roadmap thought-bubble, not a realized member — there is no
    product page for it (see [doctrine §2](../doctrine.md)). **Lacuna** is the
    demo specimen the tools are pointed at, not a member. Neither is on the
    roster.

## What a cheat-sheet covers

Every product page follows the same template:

1. **What it does** — the first-principles job, in one or two sentences.
2. **Quick-start** — a curated path from zero to a useful result, not an
   exhaustive flag reference.
3. **How it composes** — the enrich-only bindings to its siblings, pointing at
   the briefing and the federation map for the contract detail.
4. **Snapshot — most-used commands & MCP verbs** — a small, high-value table,
   marked *not authoritative* and pointed at the repo for the full surface.
5. **Pointers** — where the authority actually lives.

The deep, complete per-product reference (full CLI, every MCP tool, every route)
stays in the repos by design — this hub points, it does not restate.
