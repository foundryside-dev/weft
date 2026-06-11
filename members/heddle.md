# Heddle (planned extension)

**Status:** **Early design for a future Weft extension.**
**Repo:** none yet · **Language:** TBD
**Current details:** no public repo yet; design validation tracked by `weft-e4589e6570`. For the latest details, use `~/heddle/README.md`, `~/heddle/spike/SPIKE-BRIEF.md`, and the Weft tracker.

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
