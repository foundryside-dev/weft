# Warpline (member)

**Domain authority:** temporal / change-impact — per-entity change history across runs, dated edge snapshots, downstream blast-radius, and the re-verification worklist. "What changed, when, and what does this change touch." The federation's **temporal / change-impact surface**.
**Repo:** `~/warpline` · **Language:** Python (3.12+)
**Current details:** *(snapshot — not authoritative; see repo)* v1.0.0; stdio MCP server exposing six frozen federation tools; CLI (`init`/`backfill`/`changed`/`timeline`/`blast-radius`/`reverify`/`capture_snapshot`). For the latest details, use `~/warpline/README.md`, `~/warpline/pyproject.toml`, and `~/warpline/CHANGELOG.md`.

## What it owns (authoritative in Warpline)

Temporal change facts (`change_events`), dated edge snapshots, downstream-affected queries over the code graph, and the re-verification worklist. The frozen tool names and schemas are Warpline's authority — this hub does not restate them. Its six frozen federation tools (`src/warpline/mcp.py`): `warpline_change_list`, `warpline_entity_timeline_get`, `warpline_entity_churn_count_get`, `warpline_impact_radius_get`, `warpline_reverify_worklist_get`, and the only mutating tool `warpline_edge_snapshot_capture`. State lives in `.weft/warpline/`.

The authority split is simple:

- **Loomweave owns now** — the current structural graph and stable entity identity.
- **Warpline owns over time** — what changed, when, by whom, and what downstream entities need re-verification.

## Federation role (points to weft for patterns)

- **Roster:** Warpline is the **5th admitted member** (admitted 2026-06-14, PDR-0022, against the doctrine §7 admission quality bar — reversing the earlier PDR-0017 "not ready" ruling). See [doctrine.md](../doctrine.md), [conflict-register.md](../conflict-register.md).
- **Consumes SEI, never mints it.** Warpline stores Loomweave **[SEI](../sei-standard.md)** values opaquely (keys entities by `loomweave:eid:` SEIs) and refuses to become a second identity authority.
- **Consumes graph facts, never mirrors the current graph.** It stores only the temporal facts it owns; it never becomes a stale duplicate of Loomweave's live structural truth.
- **Feeds re-verification, not enforcement.** Warpline tells Charter/Legis-style surfaces what changed and what is downstream-affected; it never decides whether a change is allowed. Advisory facts never gate ([deconfliction-not-security](../doctrine.md)).
- **Enrich-only, never load-bearing.** Every Warpline-outbound consumption is an enhancement a member can omit; every Warpline-inbound read degrades to a coherent partial answer.
- **Integrations:** seam contracts are FROZEN at the clean-break cutover ([pm/2026-06-13-warpline-interface-lock.md](../pm/2026-06-13-warpline-interface-lock.md)) — Loomweave edge/SEI reads (SEAM 1), Filigree work-state read via `entity_association_list_by_entity` (SEAM 2), Wardline risk enrichment (SEAM 3), Legis provenance/rename feed (SEAM 4). The consumed worklist contract is `warpline.reverify_worklist.v1`.

## Notes

- **Launch cutover is four-member lockstep** (Filigree, Loomweave, Wardline, Legis); Warpline's consumer *implementations* are an admitted **fast-follow OUTSIDE the four-member launch cutover**. The seam *contracts* freeze at the cutover; implementations land post-launch without a contract renegotiation.
- The Filigree consumer (`warpline_worklist_ingest`) shipped in Filigree 3.0.0 (EARNED inbound seam); the Loomweave / Wardline / Legis consumers remain fast-follow. See the interface-lock §6.
