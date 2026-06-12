# Charter (planned extension)

**What it does:** requirements, traceability, baselines, and verification evidence — "what must be true, how do we know, what claims satisfy it, what is impacted by this change." The federation's **obligations surface**.
**Repo:** `~/charter` · **Language:** Python
**Current details:** v0.1.0, **core built + MCP read surface shipped**; domain core and a read-only MCP surface are in place. Write workflows, live integrations, impact analysis, durable gaps, import/export, and release-readiness verdicts are planned. For the latest details, use `~/charter/README.md`, `~/charter/docs/concept.md`, and `~/charter/docs/architecture/decisions/`.

## What it owns (authoritative in Charter)

Requirements/obligations, trace-link ontology and authority states, baselines, verification records, and impact analysis. Its requirement-identity model and trace ontology are Charter's authority (ADR-002/003).

## Federation role (points to weft for patterns)

- **Planned federation surface.** Charter has a working local core and read-only MCP surface. Its Weft integrations are planned. Distinct from Shuttle: Charter owns *obligations*; the sketched Shuttle owns *change execution*. They are not substitutes ([doctrine.md](../doctrine.md) §2).
- **Read-only consumer** of its peers; never assumes their authority. Loomweave (entity links via SEI), Filigree (requirement↔work links), Wardline (finding↔requirement links), Legis (preflight facts → governance).
- **Identity:** SEI consumer per Charter ADR-005 — stores SEI opaque on trace links, marks links stale on lineage change, falls back to file/symbol refs when Loomweave absent ([contracts-index.md](../contracts-index.md) §10).
- **Integrations it plans:** `weft.charter.preflight_facts.v1` envelope → Legis ([contracts-index.md](../contracts-index.md) §9, Charter ADR-006); SEI consumer path (§10, ADR-005). The domain core and read-only MCP surface ship; Weft integrations are not yet wired.

## Notes

- Charter's README describes the implemented local core; the hub website presents Charter as a planned extension because its Weft integrations are still pending.
- Some Charter source ADRs still carry legacy "Clarion"/"Loom" naming. The hub uses the current Weft/Loomweave terminology and treats those names as historical until Charter refreshes its own docs.
- Because adapters are deferred, Charter's matrix cells in [federation-map.md](../federation-map.md) are marked "planned."
