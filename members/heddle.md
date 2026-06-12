# Heddle (planned extension)

**Status:** **Working solo-mode prototype; NOT member-grade (assessed 2026-06-13).**
**Repo:** local repo `~/heddle` (under active development); no admitted/public product repo yet · **Language:** Python 3.12+, zero runtime deps, v0.1.0
**Current details:** a package, CLI (`init`/`backfill`/`changed`/`timeline`/`blast-radius`/`reverify`), and stdio MCP server now exist — the prior "design spike only" snapshot is stale and replaced by this one. The 2026-06-13 readiness review (recorded on `weft-e4589e6570`) found the solo temporal store works live, but the flagship blast-radius is not wired end-to-end (no production path captures snapshots or resolves SEIs; `changed` output cannot feed `blast_radius`), the MCP server dies on malformed input, and the store layout diverges from C-9 (XDG path-hash DBs, not `.weft/heddle/`). Against the doctrine §7 admission quality bar (standalone parity + federation enhancement) it currently fails both halves. Go/no-go remains tracked by `weft-e4589e6570`; admission is owner-reserved.

## Proposed authority

Heddle is a candidate **temporal / change-impact surface**. Its claim is the
one axis no live core tool owns today: per-entity change history across runs,
keyed on stable code identity, and downstream-affected queries over the code graph.

The proposed split is simple:

- **Loomweave owns now** — the current structural graph and stable entity identity.
- **Heddle would own over time** — what changed, when, by whom, and what downstream entities need re-verification.

## Federation role

- **Consumes SEI, never mints it.** Heddle would store Loomweave SEIs opaque and
  refuse to become a second identity authority.
- **Consumes graph facts, never mirrors the current graph.** It may store the
  temporal facts it owns, but it must not become a stale duplicate of
  Loomweave's live structural truth.
- **Feeds re-verification, not enforcement.** Heddle can tell Charter/Legis-style
  surfaces what changed and what is downstream-affected; it does not decide
  whether the change is allowed.

## Current constraints

- Zero changes to Filigree, Wardline, Legis, or Loomweave during design validation.
- Enrich-only, never load-bearing.
- Not an aggregator: stores only temporal/change-impact facts it owns.
- Joining the suite remains an owner decision after validation, not a consequence
  of this workspace existing.
