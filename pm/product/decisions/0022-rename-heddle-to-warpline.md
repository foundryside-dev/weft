# PDR-0022 — Rename the 5th member: heddle → warpline (PyPI name collision)

Date: 2026-06-14   Status: accepted   Author: PM (weft hub session)   Owner sign-off: yes (owner directed the rename)
Supersedes: n/a   Related: weft-707b4f5326 (rename umbrella), PDR-0016/0017/0021 (heddle admission + seams), [[weft-rename-taxonomy]]

## Context

The newly-admitted 5th member "heddle" (PDR-0016 admission; seam-freeze
`weft-54192f9400`) hit a **PyPI distribution-name collision** on `heddle` — the
second such collision in the suite's history after Loom→Weft. The owner directed
a federation-wide rename to **warpline** (2026-06-14).

By the time the hub session picked it up, **codex (the second autonomous stream)
had already renamed and committed the member repo** (`/home/john/heddle`,
commits `1095ce8 rename: heddle -> warpline` + `08c73f3 chore: normalize
federation config to warpline`), **shipped `warpline 1.0.0` to PyPI**, and
installed `warpline` + `warpline-mcp` (the old `heddle`/`heddle-mcp` binaries are
gone). The member repo + distribution side of the rename was therefore DONE; the
hub session owned the **consumers and the hub**.

## The call

Adopt `warpline` as the member's name everywhere, applying one **pinned rename
spec** identically across repos (absolute spec, not deltas):

- **Renamed (case-preserving):** the name (`Heddle`→`Warpline`), package/CLI
  (`heddle`→`warpline`), MCP namespace (`mcp__heddle__`→`mcp__warpline__`),
  binaries (`heddle-mcp`→`warpline-mcp`), the 6 frozen tool names
  (`heddle_*`→`warpline_*`), schema ids (`heddle.<contract>.v1`→`warpline.…`),
  skill (`heddle-workflow`→`warpline-workflow`), state-dir refs
  (`.weft/heddle/`→`.weft/warpline/`), install markers, Python classes
  (`Heddle*`→`Warpline*`), and two hub files (`members/heddle.md`→`warpline.md`,
  `pm/2026-06-13-heddle-interface-lock.md`→`…-warpline-…`).
- **Frozen (NOT renamed):** the `loomweave:eid:` SEI scheme (warpline keys
  entities by loomweave SEIs); git history.
- **On-disk checkout path — MOVED (now done):** the live repo is now
  `/home/john/warpline` (HEAD `08c73f3`); `/home/john/heddle` is a stale husk
  (no `.git`, just a leftover `.venv`) safe to remove. The directory move that an
  earlier draft listed as deferred has effectively HAPPENED, so any remaining
  `~/heddle` / `/home/john/heddle` path token in the docs is stale and was
  corrected to `~/warpline` / `/home/john/warpline`.

### Scope executed this session
- **filigree** (consumer): `warpline_consumer.py`, `warpline_worklist_ingest`
  tool, `WarplineWorklistIngestArgs`, `warpline.reverify_worklist.v1`, producer
  labels — full suite green, 0 residual.
- **weft hub**: 19 files incl. the interface-lock doc (~184 refs), doctrine,
  roster, members doc, contracts-index, glossary, federation-sdk/topology,
  launch-runbook, and the React site (roster/routes/marks).
- **loomweave**: 6 doc-comment refs (loomweave:eid + locators preserved).
- **lacuna**: residual config (`.mcp.json` already repointed to `warpline-mcp`
  by the reinstall; trailing settings/report refs cleaned).
- **pm/product workspace**: active state (current-state, roadmap) + PDR bodies
  renamed; broken path refs fixed.
- **wardline, legis**: zero references — nothing to do (their warpline seams were
  held reserved/unbuilt, PDR-0019/0021).

## Provenance notes (so the rename does not falsify history)

- **Historical PDR filenames are kept** (`0016-…`, `0017-heddle-not-ready-…`,
  `0021-heddle-seam4b-…`): a PDR filename is a stable archival ID. Any "heddle"
  in a record dated before this PDR denotes **what is now warpline**. PDR bodies
  had their member-name references updated for readability; the filenames did not
  move.
- This is a **pure name swap** — no behaviour, contract semantics, or SEI keying
  changed. The frozen interface (6 tools, envelope, golden vectors) is identical
  under the new prefix.

## Follow-ups (not done here)

1. **Directory move** `/home/john/heddle` → `/home/john/warpline`: **DONE.** The
   live repo is now `/home/john/warpline` (HEAD `08c73f3`); `/home/john/heddle`
   is a stale husk (no `.git`, only a leftover `.venv`) safe to delete. With the
   move complete, all `~/heddle` / `/home/john/heddle` path tokens in the docs
   are stale and have been repointed to `~/warpline` / `/home/john/warpline`. Any
   downstream that still pins the old path (loomweave's stored absolute paths,
   the reinstall, codex's memory dir `-home-john-heddle`) should be reconciled to
   the new path.
2. **filigree consumer A/B correctness fork** (pre-existing, separate ticket):
   the work-client shells to non-existent CLI verbs; golden vectors are
   fixture-only. NOT addressed by the rename — downgrade-to-non-binding vs
   build-real-MCP-consumption is still open.

## Reversal trigger

A rename is a fact, not a bet — no metric reversal. Reopen only if `warpline`
itself collides on PyPI (then repeat the spec with the next name) or if the owner
reverses the 5th-member admission entirely.
