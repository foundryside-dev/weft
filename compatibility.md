# Weft — compatibility & integration-liveness matrix

**Status:** source of truth for which pairwise integrations are live, planned, or under migration. The version compatibility matrix (which released versions speak the `weft` HTTP generation) is a published artifact to maintain as the tools ship independently.

This doc exists because a suite that ships as independently-versioned products needs a published, tested-combination matrix instead of a monolithic release train.

## Integration liveness

Each live cross-tool binding from [federation-map.md](./federation-map.md), with its current status. "Migration" means a working integration is in transition to the preferred direct path. "Planned" means designed but not yet built.

| Pair | Integration | Status | Reference |
|---|---|---|---|
| Loomweave ↔ Filigree | entity associations (drift via `issues_for`) | **live** | [contracts-index.md](./contracts-index.md) §1 |
| Loomweave → all | SEI identity resolution | **live** | [sei-standard.md](./sei-standard.md); [conflict-register.md](./conflict-register.md) §B-2 |
| Wardline ↔ Loomweave | taint-fact store | **live** | [contracts-index.md](./contracts-index.md) §3 |
| Wardline → Loomweave | qualname reconciliation | **live** | [contracts-index.md](./contracts-index.md) §5 |
| Wardline → Filigree | findings intake | **live, migration in progress** — native emitter shipped; A-1 remains until Loomweave-absent composition is proven end to end | [asterisk-register.md](./asterisk-register.md); [contracts-index.md](./contracts-index.md) §4 |
| Loomweave ↔ Wardline | vocabulary descriptor | **live** | [asterisk-register.md](./asterisk-register.md) |
| Legis ↔ Loomweave | SEI governance consumption + git-rename provider seam | **live** | [contracts-index.md](./contracts-index.md) §6 |
| Legis ↔ Filigree | SEI-keyed sign-off binding | **live** | [contracts-index.md](./contracts-index.md) §7 |
| Legis ↔ Wardline | findings routing through enforcement | **live** | [contracts-index.md](./contracts-index.md) §8 |
| Charter → Legis | preflight-fact envelope | **planned** | [contracts-index.md](./contracts-index.md) §9 |
| Charter ↔ Loomweave | SEI consumer (trace links) | **planned** | [contracts-index.md](./contracts-index.md) §10 |

## Version compatibility matrix

Each tool versions independently. Use this table to record tested combinations.

| Member | 1.0 launch version | Speaks `weft` HTTP generation | Notes |
|---|---|---|---|
| Loomweave | _tbd_ | yes (serves SEI + read API) | shipped; current release line v1.1.0-rc4 |
| Filigree | _tbd_ | yes (publishes `classic` + `weft`) | shipped; current release line v3.0.0rc12 |
| Wardline | _tbd_ | consumer (SEI client) | live core tool; current release line v1.0.0rc4 |
| Legis | _tbd_ | consumer | shipped; current release v1.0.0 |
| Charter | _tbd_ | consumer (planned) | planned extension; current release line v0.1.0 with core + read-only MCP shipped |

> Each member's release truth lives in its repo. This table records the hub's tested-combination view and should be refreshed from the member repositories before publication.
