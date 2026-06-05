# Charter (member)

**Domain authority:** requirements, traceability, baselines, and verification evidence — "what must be true, how do we know, what claims to satisfy it, what is impacted by this change." The federation's **obligations surface**.
**Repo:** `~/charter` · **Language:** Python
**Surface facts (snapshot 2026-06-05 — NOT authoritative here; see the repo):** v0.1.0, **scaffold/pre-alpha** — v0.1 product design + implementation plan approved (specs dated 2026-06-04/05); CLI is `--version`-only; **domain commands, MCP tools, and federation adapters are intentionally deferred** until v0.1 build. Authoritative: `~/charter/README.md`, `~/charter/docs/concept.md`, `~/charter/docs/architecture/decisions/`.

## What it owns (authoritative in Charter)

Requirements/obligations, trace-link ontology and authority states, baselines, verification records, and impact analysis. Its requirement-identity model and trace ontology are Charter's authority (ADR-002/003).

## Federation role (points to weft for patterns)

- **Newest realized member** (started 2026-06-04). Distinct from Shuttle: Charter owns *obligations*; the sketched Shuttle owns *change execution*. They are not substitutes — do not conflate ([doctrine.md](../doctrine.md) §2).
- **Read-only consumer** of its peers; never assumes their authority. Loomweave (entity links via SEI), Filigree (requirement↔work links), Wardline (finding↔requirement links), Legis (preflight facts → governance).
- **Identity:** SEI consumer per Charter ADR-005 — stores SEI opaque on trace links, marks links stale on lineage change, falls back to file/symbol refs when Loomweave absent ([contracts-index.md](../contracts-index.md) §10).
- **Contracts it carries:** `weft.charter.preflight_facts.v1` envelope → Legis ([contracts-index.md](../contracts-index.md) §9, Charter ADR-006); SEI consumer contract (§10, ADR-005). **Both designed; adapters pending** — Charter is scaffold-state.

## Notes

- Charter's README calls itself "the fifth Weft member"; that framing is now consistent with the canonical roster ([conflict-register.md](../conflict-register.md) §B-1) and points to [doctrine.md](../doctrine.md).
- Because adapters are deferred, Charter's matrix cells in [federation-map.md](../federation-map.md) are marked "planned."
