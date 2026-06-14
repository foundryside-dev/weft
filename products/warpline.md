---
body class: thread-warpline
---

# Warpline — cheat-sheet

> Temporal / change-impact analysis. Copper thread.
> Authority: [`~/warpline`](https://github.com/foundryside-dev/warpline) ·
> briefing: [members/warpline.md](../members/warpline.md)

## What it does

Warpline owns the one thing no other federation member stores: **per-entity
change history across runs, keyed on Loomweave [SEI](../sei-standard.md)**, plus
the downstream-propagation query over it. It answers, every session, the question
an agent should ask before claiming a change is done: *given this diff — which
entities changed, by whom, when; what is downstream-affected over the call graph;
and what must I re-verify?*

The authority split is deliberate: **Loomweave owns "now"** (the point-in-time
structural graph and SEI minting); **Warpline owns "over time"** (dated change
facts and dated edge snapshots). Warpline is **advisory only** — it records
temporal facts and computes blast-radius and a re-verification worklist; it
**never gates a change, never enforces a policy, and never decides whether a
change is allowed**. A Warpline answer is an enhancement you can act on or ignore,
never a verdict you must clear. This is deconfliction tooling, not security.

Warpline **consumes SEI, it never mints it** — it stores the `loomweave:eid:...`
value opaquely and refuses to become a second identity authority. It is
enrich-only and local-first: it boots, ingests, and answers with no sibling
installed, all state under `.weft/warpline/` (git-ignored).

## Quick-start

```bash
uv tool install warpline                       # warpline + warpline-mcp on PATH
warpline backfill --repo .                     # record change events from git history
warpline changed   --repo . --rev-range HEAD~1..HEAD   # what changed (call this first)
warpline reverify  --repo . --changed-entity-key-id 1  # the worklist to recheck
```

`warpline changed` is the entry point — it returns ready-to-call `next_actions`
that hand back the exact arguments for `reverify` and `blast-radius`. Blast-radius
and reverify need a dated edge snapshot (`warpline capture-snapshot`, which reads
Loomweave); with no snapshot they report `completeness: NO_SNAPSHOT` — "changed
set only," never "nothing affected."

```text
warpline_change_list { repo, rev_range }   # changed entities + next_actions (call first)
# follow next_actions straight into:
warpline_reverify_worklist_get { repo, changed_entity_key_ids, depth }
```

## How it composes

Warpline composes pairwise and **enrich-only** — it boots, ingests, and answers
with every sibling absent, and each absent sibling is reported in machine-readable
form (`unavailable`/`absent`), never as an implied clean or allowed state. It is
never load-bearing for anyone, and no one is load-bearing for it.

- **Loomweave → Warpline** — SEI resolution + dated structural edges. The only
  **proven, frozen** inbound seam (real consumption against the live sibling);
  Loomweave absent → `sei: unavailable`, snapshots `SKIPPED`/`no_index`.
- **Filigree → Warpline** — work-state links via `entity_association_list_by_entity`
  (keyed on SEI) enrich the worklist's `priority`. **Earned** (consumed by golden
  vectors); read-only — Warpline files, closes, and claims nothing. The Filigree
  consumer (`warpline_worklist_ingest`) shipped in Filigree 3.0.0.
- **Wardline → Warpline** — risk as a worklist *ordering* signal, never a verdict.
  **Reserved-shape, non-binding** (not yet driven by a real sibling).
- **Legis → Warpline** — a typed locator-rename feed stitches a timeline across
  renames. **Reserved-shape**; with no feed, Warpline falls back to raw git.

Federation role, the seam-lock detail, and the degrade-when-absent table:
[members/warpline.md](../members/warpline.md) and the
[federation map](../federation-map.md).

## Most-used commands & MCP verbs

!!! note "See the repo for the full surface"
    A curated subset, not the full surface. The frozen tool names, schema ids, the
    full CLI, and the success/error envelopes live in **Warpline** — this page
    does not restate them. **See
    [`~/warpline/docs/reference/cli.md`](https://github.com/foundryside-dev/warpline),
    `~/warpline/docs/reference/mcp-tools.md`, and `~/warpline/pyproject.toml`.**

Each MCP tool is registered under an endorsed name and a short shim alias (e.g.
`warpline_change_list` / `changed`) that return identical schema and data — six
frozen tools, twelve registered names.

| Surface | Verb | Does |
|---------|------|------|
| CLI | `warpline backfill` | record change events from git history |
| CLI | `warpline changed` | changed entities for a rev range (call first) |
| CLI | `warpline reverify` | the worklist to recheck before claiming done |
| CLI | `warpline capture-snapshot` | capture Loomweave dated edges (the only mutating verb) |
| MCP | `warpline_change_list` (`changed`) | changed entities + ready-to-call `next_actions` |
| MCP | `warpline_entity_timeline_get` (`timeline`) | ordered change history for one entity |
| MCP | `warpline_impact_radius_get` (`blast_radius`) | downstream affected set + `completeness`/`staleness` |
| MCP | `warpline_reverify_worklist_get` (`reverify`) | the re-verification worklist |
| MCP | `warpline_edge_snapshot_capture` (`capture_snapshot`) | capture dated edges (only mutating tool) |

## Pointers

- **Repo / authority:** [`~/warpline`](https://github.com/foundryside-dev/warpline)
  (`docs/reference/cli.md`, `docs/reference/mcp-tools.md`, `pyproject.toml`)
- **Briefing (federation role):** [members/warpline.md](../members/warpline.md)
- **Identity / integration docs:** [sei-standard.md](../sei-standard.md) ·
  [federation-map.md](../federation-map.md)
