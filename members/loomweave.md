# Loomweave (member)

**Domain authority:** structural truth about the codebase **and the suite's identity authority** — entity catalog, code graph, guidance sheets, and **[SEI](../sei-standard.md)**. The federation's **code-structure surface**.
**Repo:** `~/loomweave` · **Language:** Rust
**Surface facts (snapshot 2026-06-06 — NOT authoritative here; see the repo):** v1.0.0 (clean-break rename — what shipped as Clarion 1.3.0 is now Loomweave 1.0.0); ~39 consult-mode MCP tools; CLI + MCP (stdio) + loopback HTTP read API. First-customer target: elspeth (~425k LOC). Authoritative: `~/loomweave/Cargo.toml`, `~/loomweave/README.md`.

## What it owns (authoritative in Loomweave)

Entity extraction (3-segment **locator** `{plugin_id}:{kind}:{qualname}`), edges, subsystem clustering, briefings, guidance, the `content_hash` (BLAKE3 entity-body), and — load-bearing for the suite — **SEI minting/persistence/resolution/lineage**. Tool names, ADRs, and route shapes are Loomweave's authority.

## Federation role (points to weft for patterns)

- **Identity authority:** mints/persists/re-binds/resolves SEI; serves `resolve`/`resolve_sei`/`lineage`/`_capabilities`. The [SEI standard](../sei-standard.md) is the suite contract; Loomweave ADR-038 is the token form. The SEI standard is **LOCKED** (2026-06-05); Loomweave (authority) verifies member conformance under the lock ([conflict-register.md](../conflict-register.md) §B-2).
- **Contracts it carries:** SEI resolution ([contracts-index.md](../contracts-index.md) §2), entity-assoc drift `issues_for` (§1), Wardline taint-fact store host (§3), qualname reconciliation (§5), git-rename seam consumer (§6), Charter SEI consumer (§10).
- **Founding doctrine moved:** the federation doctrine/glossary that lived in `~/loomweave/docs/suite/` are **promoted into this hub** ([doctrine.md](../doctrine.md), [glossary.md](../glossary.md)); Loomweave's copies are pointers.

## Notes folded into the cutover

- The `{plugin}:{kind}:{qualname}` form is the **locator (address)**, demoted from identity by ADR-038; **SEI is identity** ([conflict-register.md](../conflict-register.md) §A-7).
- The asterisk for Loomweave's plugin importing `wardline.core.registry.REGISTRY` is **RETIRED 2026-06-05** ([asterisk-register.md](../asterisk-register.md) A-2).
