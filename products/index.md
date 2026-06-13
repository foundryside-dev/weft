# Products

Curated cheat-sheets for the Weft live core tools plus Charter's planned
obligations surface. One page per surface: what it
does (from first principles), a short quick-start, how it composes with its
siblings, and a compact table of its most-used commands and MCP
verbs.

These pages are **usage cheat-sheets**, not reference. Each member's repo owns
its full command list, MCP tool set, route shapes, version, and counts. When the
cheat-sheet and the repo disagree, the repo wins.

!!! note "How to read these pages"
    The **federation role** of each member — which integrations it carries and
    how identity flows — lives in its
    [member briefing](../members/loomweave.md) and the
    [federation map](../federation-map.md), not here. These product pages cover
    *usage*; the briefings cover *federation patterns*. Each page cross-links to
    both rather than restating either.

## Product surfaces

| Surface | Domain authority | Language | Cheat-sheet |
|--------|------------------|----------|-------------|
| **Loomweave** | code structure **+ stable identity (SEI)** | Rust | [loomweave →](loomweave.md) |
| **Filigree** | work state / issue lifecycle | Python | [filigree →](filigree.md) |
| **Wardline** | trust-boundary analysis | Python | [wardline →](wardline.md) |
| **Legis** | git/CI governance & attestations | Python | [legis →](legis.md) |
| **Charter** | requirements, traceability, verification | Python | [charter →](charter.md) *(planned extension; Weft integrations pending)* |

Each member owns one domain, is useful on its own, and adds context when paired
with siblings. The federation axiom and the composition law are in the
[doctrine](../doctrine.md).

!!! info "Shuttle and Lacuna are not here"
    **Shuttle** is a future idea, not a realized member — there is no product
    page for it (see [doctrine §2](../doctrine.md)). **Warpline** is an admitted
    member; its usage cheat-sheet is pending its implementation fast-follow.
    **Lacuna** is the demo app the tools are
    pointed at, not a member.

## What a cheat-sheet covers

Every product page follows the same template:

1. **What it does** — the first-principles job, in one or two sentences.
2. **Quick-start** — a curated path from zero to a useful result, not an
   exhaustive flag reference.
3. **How it composes** — the integrations with its siblings, pointing at the
   briefing and the federation map for implementation detail.
4. **Most-used commands & MCP verbs** — a small, high-value table with pointers
   to the repo for the full surface.
5. **Pointers** — where the authority actually lives.

The deep, complete per-product reference (full CLI, every MCP tool, every route)
stays in the repos by design — this hub points, it does not restate.
