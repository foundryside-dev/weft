---
body class: thread-loomweave
---

# Loomweave — cheat-sheet

> Code structure **and the suite's identity authority**. Indigo thread.
> Authority: [`~/loomweave`](https://github.com/foundryside-dev/loomweave) ·
> briefing: [members/loomweave.md](../members/loomweave.md)

## What it does

Loomweave turns a codebase into a queryable, identity-stable **structural graph**
an agent reads instead of re-deriving by grep. It ingests the source, extracts
entities (functions, classes, modules) and their edges (`contains`, `calls`,
`references`), and serves that graph over a CLI, an MCP surface, and a loopback
HTTP read API.

Load-bearing for the rest of the federation: Loomweave **mints and resolves
[SEI](../sei-standard.md)** — the Stable Entity Identity every cross-tool binding
keys on, so a link survives a rename or move tomorrow. It is *"the federation's
map and its coordinate system."*

## Quick-start

```bash
loomweave install --path .   # one-step agent setup: initialises .weft/loomweave/
loomweave analyze            # extract the structural graph (no LLM needed)
loomweave serve              # expose the consult-mode MCP surface
```

`loomweave analyze` is the fastest way to populate the graph and works with no
LLM credentials; `loomweave guidance` regenerates the guidance sheets consult
agents read. An MCP-driven agent then orients with one composed call:

```text
entity_orientation_pack_get { sei | locator }
# one packet ≈ find + at + source + neighborhood + issues + freshness
```

## How it composes

Every binding is enrich-only — Loomweave builds its catalog whether any sibling
is present or not.

- **Identity spine.** Loomweave is the SEI authority; Filigree, Wardline, Legis,
  and Charter all key their cross-tool facts on SEI but treat it as opaque.
- **Wardline → Loomweave** — taint facts enrich the entity graph
  ([contracts-index.md §3](../contracts-index.md)).
- **Loomweave ↔ Filigree** — entity ⇄ issue, drift-aware
  ([contracts-index.md §1](../contracts-index.md)).
- **Charter → Loomweave** — SEI consumer for trace links (planned;
  [contracts-index.md §10](../contracts-index.md)).

Federation role and integrations in full: [members/loomweave.md](../members/loomweave.md)
and the [federation map](../federation-map.md).

## Most-used commands & MCP verbs

!!! note "See the repo for the full surface"
    A curated subset, not the full surface. The repo owns the
    complete CLI, the full MCP tool list, and route shapes.
    **See [`~/loomweave/README.md`](https://github.com/foundryside-dev/loomweave)
    and `~/loomweave/Cargo.toml`.**

| Surface | Verb | Does |
|---------|------|------|
| CLI | `loomweave install` | initialise `.weft/loomweave/`, wire the agent |
| CLI | `loomweave analyze` | extract / refresh the structural graph |
| CLI | `loomweave serve` | start the consult-mode MCP surface |
| CLI | `loomweave guidance` | (re)generate guidance sheets |
| CLI | `loomweave sarif import` | ingest external findings as SARIF |
| MCP | `entity_find` | locate entities by name / kind |
| MCP | `entity_at` | what entity is at this file:line |
| MCP | `entity_callers_list` | who calls this entity |
| MCP | `entity_orientation_pack_get` | one-shot orientation packet |
| HTTP | `GET /api/v1/identity/{resolve,sei,lineage}` | resolve a locator ⇄ SEI; lineage |

## Pointers

- **Repo / authority:** [`~/loomweave`](https://github.com/foundryside-dev/loomweave)
  (`README.md`, `Cargo.toml`)
- **Briefing (federation role):** [members/loomweave.md](../members/loomweave.md)
- **Identity and integration docs:** [sei-standard.md](../sei-standard.md) ·
  [contracts-index.md](../contracts-index.md)
