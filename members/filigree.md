# Filigree (member)

**Domain authority:** work state & workflow lifecycle — issues, observations, finding triage state. The federation's **work-state surface**.
**Repo:** `~/filigree` · **Language:** Python
**Current details:** v3.0.0; 116 MCP tools; HTTP `classic` + `weft` generations; web dashboard. For the latest details, use `~/filigree/README.md`, `~/filigree/pyproject.toml`, and `~/filigree/docs/mcp.md`.

## What it owns (authoritative in Filigree)

Issues & workflow state machines, dependencies/critical-path, observations (14-day TTL), files & scan-findings, the `entity_associations` table (opaque entity ids), and the **named HTTP generations** (`classic` `/api/*`, `weft` `/api/weft/*`). Route shapes, tool lists, and workflow packs are Filigree's authority — this hub does not restate them.

## Federation role (points to weft for patterns)

- **Federation axiom & roster:** [doctrine.md](../doctrine.md).
- **Identity:** stores **[SEI](../sei-standard.md)** as the opaque value on entity associations; Filigree never parses it. This keeps issues attached to code entities while letting Loomweave own identity resolution ([conflict-register.md](../conflict-register.md) §B-2).
- **Integrations:** entity associations ([contracts-index.md](../contracts-index.md) §1), governed sign-off binding (§7), Wardline findings intake (§4), the `weft` transport generation.
- **Loose cooperation** (Filigree ADR-002): every weft-generation endpoint is functional with peers absent.

## Notes / corrections folded into the cutover

- Entity-association routes are **classic `/api/issue/…` + `/api/entity-associations`**, *not* `/api/weft/…` (old hub error — [conflict-register.md](../conflict-register.md) §A-8).
- The planning pack → "Shuttle stages" migration (`migrate-to-shuttle`, `shuttle://` URIs) targets a change-execution authority that **does not yet exist** (Shuttle is a thought-bubble). See [uri-scheme.md](../uri-scheme.md), [members/shuttle.md](./shuttle.md).
