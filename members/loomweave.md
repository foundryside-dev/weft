# Loomweave (member)

**What it does:** maps code structure and provides stable code identity — entity catalog, code graph, guidance sheets, and **[SEI](../sei-standard.md)**. The federation's **code-structure surface**.
**Repo:** `~/loomweave` · **Language:** Rust
**Current details:** v1.1.0-rc4; ~42 consult-mode MCP tools; CLI + MCP (stdio) + loopback HTTP read API. First-customer scale target: elspeth (~425k LOC). For the latest details, use `~/loomweave/Cargo.toml`, `~/loomweave/README.md`, `~/loomweave/docs/loomweave/1.0/`, and `~/loomweave/docs/loomweave/adr/`.

## Responsibilities

Entity extraction, edges, subsystem clustering, briefings, guidance, the entity body content hash, and stable identity minting, persistence, resolution, and lineage.

## Works with

- **Stable identity:** mints, persists, re-binds, and resolves SEI values so sibling tools can keep links attached through common refactors.
- **Integrations:** SEI resolution ([contracts-index.md](../contracts-index.md) §2), entity-assoc drift `issues_for` (§1), Wardline taint-fact store host (§3), qualname reconciliation (§5), git-rename signal consumer (§6), Charter SEI consumer (§10).
- **Founding doctrine moved:** the federation doctrine/glossary that lived in `~/loomweave/docs/suite/` are **promoted into this hub** ([doctrine.md](../doctrine.md), [glossary.md](../glossary.md)); Loomweave's copies are pointers.

## Notes folded into the cutover

- The `{plugin}:{kind}:{qualname}` form is the **locator (address)**, demoted from identity by ADR-038; **SEI is identity** ([conflict-register.md](../conflict-register.md) §A-7).
- The old direct registry import between Loomweave and Wardline has been retired in favor of the current vocabulary descriptor path ([asterisk-register.md](../asterisk-register.md) A-2).
