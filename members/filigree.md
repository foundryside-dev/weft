# Filigree (member)

**Domain authority:** work state & workflow lifecycle — issues, observations, finding triage state. The federation's **work-state surface**.
**Repo:** `~/filigree` · **Language:** Python
**Surface facts (snapshot 2026-06-06 — NOT authoritative here; see the repo):** v3.0.0rc2 (release candidate, branch `release/3.0.0`); 116 MCP tools; HTTP `classic` + `weft` generations; web dashboard. Authoritative: `~/filigree/README.md`, `~/filigree/pyproject.toml`, `~/filigree/docs/mcp.md`.

## What it owns (authoritative in Filigree)

Issues & workflow state machines, dependencies/critical-path, observations (14-day TTL), files & scan-findings, the `entity_associations` table (opaque entity ids), and the **named HTTP generations** (`classic` `/api/*`, `weft` `/api/weft/*`). Route shapes, tool lists, and workflow packs are Filigree's authority — this hub does not restate them.

## Federation role (points to weft for patterns)

- **Federation axiom & roster:** [doctrine.md](../doctrine.md).
- **Identity:** stores **[SEI](../sei-standard.md)** as the opaque value on entity associations; Filigree never parses it; drift detection is the consumer's job via `content_hash_at_attach`. The SEI standard is **LOCKED** (2026-06-05); Filigree's locator→SEI backfill is now a conformance/migration task under the lock ([conflict-register.md](../conflict-register.md) §B-2).
- **Contracts it carries:** entity associations ([contracts-index.md](../contracts-index.md) §1), governed sign-off binding (§7), Wardline findings intake (§4), the `weft` transport generation.
- **Loose cooperation** (Filigree ADR-002): every weft-generation endpoint is functional with peers absent.

## Notes / corrections folded into the cutover

- Entity-association routes are **classic `/api/issue/…` + `/api/entity-associations`**, *not* `/api/weft/…` (old hub error — [conflict-register.md](../conflict-register.md) §A-8).
- The planning pack → "Shuttle stages" migration (`migrate-to-shuttle`, `shuttle://` URIs) targets a change-execution authority that **does not yet exist** (Shuttle is a thought-bubble). See [uri-scheme.md](../uri-scheme.md), [members/shuttle.md](./shuttle.md).
