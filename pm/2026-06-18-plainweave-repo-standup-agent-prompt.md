# Agent handoff prompt — initiate the Plainweave repo (the reframed Charter)

**Date:** 2026-06-18 · **Purpose:** a self-contained prompt to hand to an agent that will
stand up `~/plainweave` as the going-forward successor to `~/charter`, reframed per the
design spec and renamed (`charter` is taken on PyPI). **Scope = repo standup, not the
feature build** (the build comes from a separate implementation plan).

**Companion docs:** the design spec
[`pm/2026-06-18-charter-to-plainweave-permission-to-exist-design.md`](./2026-06-18-charter-to-plainweave-permission-to-exist-design.md);
gap-naming precedent PDR-0028 + `members/tabard.md`; rename precedent PDR-0022 (heddle→warpline).

**Owner-gated (deliberately NOT in this task):** PyPI publish, public GitHub remote, doctrine
roster / vision / roadmap promotion to "member", any frozen sibling obligation. Those wait on
the owner + the proposed PDR.

---

```
ROLE & MISSION
You are standing up a new Weft federation member, **Plainweave**, as the going-forward
successor to the existing precursor repo `~/charter`. Plainweave is Charter, reconceived
("permission for code to exist") and renamed (the name `charter` is taken on PyPI). Your
job is to INITIATE the repo: a clean, building, correctly-branded, design-aligned
foundation — NOT the full feature build (that comes from a separate implementation plan).

READ FIRST (do not skip — orient before touching anything)
1. The design spec — the source of truth for what Plainweave IS:
   /home/john/weft/pm/2026-06-18-charter-to-plainweave-permission-to-exist-design.md
2. The precursor you are seeding from: ~/charter (note its README/CLAUDE.md are STALE,
   pre-rebrand — they say "Loom", "Clarion", "fifth member"; do not trust them as canon).
3. Weft doctrine, esp. §7 (admission/quality bar) and the member conventions / anti-goals:
   /home/john/weft/doctrine.md
4. The gap-naming precedent (Plainweave is seated the same way): PDR-0028 and
   /home/john/weft/members/tabard.md
5. The rename precedent (what a member rename touches): the heddle→warpline move
   (PDR-0022) — repo + PyPI name + consumer/hub scrub + frozen SEI scheme.

WHAT PLAINWEAVE IS (condensed from the spec — read the spec for full detail)
- Inverts Charter from requirements-DOWN (a PM overlay) to code-UP: every code entity
  (a Loomweave SEI — modules + public surfaces) must trace to a requirement; requirements
  ladder to strategic goals. An unlinked node at ANY level is a reviewable
  "why does this exist?".
- The hero value is a READABLE, code-grounded requirements corpus an agent can curate
  ("why do we have 3 requirements for reporting that are all the same?") — it moves the
  refactor lever up the Meadows leverage hierarchy (intent/goals, not just code).
- Model: a traceability graph (goal → requirement → code SEI). Requirements are trivially
  mintable (shells welcome); value is the corpus being visible/queryable, then consolidated.
- It is a THIN member: ADVISORY by default; Legis owns all teeth + audit + git/CI boundary
  surfacing; Loomweave owns identity, the rename feed, and the semantic-search engine;
  bindings reuse the ADR-029 entity-association contract (SEI-keyed, drift-detected).
- Three read primitives: orphans(level), trace(node), corpus(). Authoring-time binding is
  the write path ("speak SEI at entry", extended to intent). Enrich-only: absence breaks
  no sibling.

SCOPE OF THIS TASK (initiate, don't build the features)
Deliverable = a repo at ~/plainweave that:
  a) preserves the charter precursor's git history,
  b) is fully renamed charter→plainweave (no stray "charter" except history/attribution),
  c) carries correct Weft terminology and the reframed identity,
  d) builds green (lint/type/test/wardline) with a clean tree,
  e) has a clear architecture map + implementation backlog aligned to the design,
  f) publishes/pushes NOTHING and leaves all owner-gated moves for the owner.

STEPS
1. Create the repo preserving history:
     git clone ~/charter ~/plainweave
   Keep ~/charter in place as the historical precursor (do not delete it).
   Then do all work in a session rooted at ~/plainweave (so MCP wiring is correct).

2. Full rename charter → plainweave:
   - package + paths: src/charter → src/plainweave (git mv to keep history); all imports.
   - pyproject.toml: name "plainweave"; scripts plainweave = "plainweave.cli:main" and
     plainweave-mcp = "plainweave.mcp_server:main"; version path src/plainweave/_version.py;
     Homepage/Repository/Issues → github.com/foundryside-dev/plainweave; reset version to a
     0.x pre-release (this is a new package identity, not a continuation of charter's number).
   - .filigree.conf, .mcp.json, Makefile, CLAUDE.md, AGENTS.md, pre-commit, CLI help/usage,
     and any schema strings / brand display strings.

3. Fix stale terminology everywhere (the precursor predates the rebrand):
   - "Loom" → "Weft"; "Clarion" → "Loomweave"; drop "fifth member" framing.
   - Plainweave is a GAP-NAMED position (like Tabard), NOT in the launch cutover — say so
     accurately; do not claim membership it hasn't been granted.

4. Re-root the identity to the design (README + docs):
   - Rewrite README to the permission-to-exist reframe: the code→requirement→goal
     traceability graph, advisory-by-default, the thin-member division (Legis owns teeth,
     Loomweave owns identity+semantics), and the Meadows "raise the refactor lever"
     positioning.
   - Copy the design spec into docs/ (or link it) as the architecture reference.
   - Audit the existing core: document what carries forward to the new model (the
     requirements store, traceability links, MCP read surface) vs what must be reshaped
     (code-up orphan reads; SEI-keyed ADR-029 bindings; the corpus() read; authoring-time
     write path). Produce a MODULE MAP of current → target.

5. Skeleton, not half-built features: stub the target interfaces (orphans/trace/corpus;
   the requirement↔SEI binding model) with clear docstrings citing the spec and explicit
   "implementation pending — see backlog" markers. Do not ship half-working federation
   adapters.

6. Verify (evidence before claiming done):
   uv sync; run the Makefile's lint/type/test targets (ruff, mypy, pytest) to green;
   wardline scan . --fail-on ERROR clean; working tree clean (legis-signable).

7. Backlog: file the implementation work as issues in Plainweave's own .filigree tracker
   (and note hub counterparts are owner-driven). Cover: ADR-029 binding schema, Loomweave
   catalog read (public-surface + module enumeration), the three read primitives, the
   authoring-time write surface, the Legis advisory boundary cell, and the optional
   Loomweave-semantic-backed similarity hint. Mark cross-member seams as additive +
   hub-blessed + prove-the-need (golden-vector/live-consumption gated), never pre-frozen.

BOUNDARIES — DO NOT (these are owner-reserved / out of scope)
- Do NOT publish to PyPI and do NOT create or push to a public GitHub remote. Keep it local.
  (Release/announcement is owner-reserved.)
- Do NOT edit the hub repo (~/weft) doctrine roster, vision.md, roadmap.md, or registries
  to promote Plainweave to "member" — that admission is owner-gated, pending a PDR. You may
  REFERENCE the gap-named position; you may not rewrite the roster.
- Do NOT impose obligations on sibling members or freeze any cross-member contract. Seams
  are additive adapters on Plainweave's side, hub-blessed, prove-the-need.
- The loomweave:eid: SEI scheme is FROZEN — consume it, never redefine it.

REPORT BACK
A concise summary: what carried forward vs was reshaped (the module map), the verification
evidence (lint/type/test/wardline/clean-tree), the filed backlog, the chosen 0.x version,
and any decisions that need the owner (especially: confirm the name "Plainweave", and the
admission/roster/publish gates you deliberately left untouched).

NAME NOTE: proceed with "Plainweave" as the working name. If the owner later finalizes a
different name, it is a mechanical find/replace from this clean baseline.
```
