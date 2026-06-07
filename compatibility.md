# Weft — compatibility & integration-liveness matrix

**Status:** **Authoritative** for *which pairwise integrations are live vs asterisked*. The **version** compatibility matrix (which released versions speak the `weft` HTTP generation) is a **post-1.0 published artifact** per the launch decision in [SHIPPING.md](./SHIPPING.md) (Decision 2) and is stubbed below — populate it at the coordinated Weft 1.0 launch.

This doc exists because a suite that ships as five independently-versioned products needs a published, tested-combination matrix instead of a monolithic release train. See [SHIPPING.md](./SHIPPING.md) for the go-to-market decisions; this is the technical face of decision 2.

## Integration liveness (authoritative now)

Each live cross-tool binding from [federation-map.md](./federation-map.md), with its current status. "Asterisked" = a documented axiom violation with a retirement condition ([asterisk-register.md](./asterisk-register.md)). "Planned" = designed in ADRs but adapter not built.

| Pair | Integration | Status | Reference |
|---|---|---|---|
| Loomweave ↔ Filigree | entity associations (drift via `issues_for`) | **live** | [contracts-index.md](./contracts-index.md) §1 |
| Loomweave → all | SEI identity resolution | **live; standard LOCKED 2026-06-05** (member backfills are conformance tasks under lock) | [sei-standard.md](./sei-standard.md); [conflict-register.md](./conflict-register.md) §B-2 |
| Wardline ↔ Loomweave | taint-fact store | **live** | [contracts-index.md](./contracts-index.md) §3 |
| Wardline → Loomweave | qualname reconciliation | **live** | [contracts-index.md](./contracts-index.md) §5 |
| Wardline → Filigree | findings intake | **asterisked (A-1, LIVE)** — routes through Loomweave's SARIF translator until Wardline's native emitter ships | [asterisk-register.md](./asterisk-register.md) |
| Loomweave ↔ Wardline | vocabulary descriptor (was registry import) | **live; asterisk A-2 RETIRED 2026-06-05** | [asterisk-register.md](./asterisk-register.md) |
| Legis ↔ Loomweave | SEI governance consumption + git-rename provider seam | **live** (provider seam operative-pending Loomweave committed rev-range) | [contracts-index.md](./contracts-index.md) §6 |
| Legis ↔ Filigree | SEI-keyed sign-off binding | **live** | [contracts-index.md](./contracts-index.md) §7 |
| Legis ↔ Wardline | findings routing through enforcement | **live** | [contracts-index.md](./contracts-index.md) §8 |
| Charter → Legis | preflight-fact envelope | **planned** (Charter adapter pending) | [contracts-index.md](./contracts-index.md) §9 |
| Charter ↔ Loomweave | SEI consumer (trace links) | **planned** (Charter adapter pending) | [contracts-index.md](./contracts-index.md) §10 |

## Version compatibility matrix (post-1.0 — to populate at launch)

Per [SHIPPING.md](./SHIPPING.md) decision 2, after the one-time coordinated **Weft 1.0** launch each tool versions independently and the "suite version" becomes a published tested-combination matrix. Populate this table at launch:

| Member | 1.0 launch version | Speaks `weft` HTTP generation | Notes |
|---|---|---|---|
| Loomweave | _tbd_ | yes (serves SEI + read API) | shipped (snapshot v1.3.0) |
| Filigree | _tbd_ | yes (publishes `classic` + `weft`) | shipped (snapshot v2.3.0); SEI standard locked — Filigree's locator→SEI backfill is a conformance task under the lock |
| Wardline | _tbd_ | consumer (SEI client) | **1.0 launch gate** (snapshot 1.0.0rc1) |
| Legis | _tbd_ | consumer | snapshot 1.0.0rc |
| Charter | _tbd_ | consumer (planned) | **non-gating; joins on own cadence** (snapshot 0.1.0 — core + read-only MCP shipped, adapters pending; see `~/charter`) — per [SHIPPING.md](./SHIPPING.md) Decision 2, [conflict-register.md](./conflict-register.md) §B-5 |

> Versions above are **snapshots, not authoritative** — each member's release truth lives in its repo. The coordinated 1.0 launch is **gated by Wardline (pre-1.0) + Legis (rc→1.0)**; **Charter is non-gating** (joins on its own cadence), per [SHIPPING.md](./SHIPPING.md) Decision 2 and [conflict-register.md](./conflict-register.md) §B-5. Release posture is owned by [SHIPPING.md](./SHIPPING.md); this table defers to it.
