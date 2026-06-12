# PDR-0015 — The pen moves to the hub until the next major releases

Date: 2026-06-12
Status: ACCEPTED (owner ruling, explicit — stated in-session 2026-06-12, on receipt of
the dogfood-4 federation friction report)

## Context

The 2026-06-12 full-surface dogfood (`~/lacuna/docs/dogfood/2026-06-12-weft-federation-friction-report.md`)
delivered a clean verdict split: **the individual tools are good; the joins are what's
broken.** Every cross-member seam except loomweave→filigree-issues failed in some
direction in one session — wardline→filigree 404s (endpoint-vs-base-URL split),
loomweave→filigree 401s (no bearer token), legis MCP healthy but absent from real
sessions. Per-tool verdicts on the "reach for it first" test: filigree yes-unreservedly,
loomweave yes-for-graphs, wardline yes-for-the-core, legis unreachable.

Seam defects are definitionally cross-member: each one spans a producer in one repo, a
consumer in another, and a contract owned by the hub. Per-member pens — each project
fixing "its half" on its own cadence — is the structure that produced the drift
(cf. the four-configs-three-ports emit drift, the conflict-register's Class B history).

## The call (owner)

> "I'm taking the pen away from the individual projects and bringing it here to weft.
> All changes until all projects release their next major version will come from
> here/your session."

**Enacted as:**

- All member-repo changes — seam fixes and member-internal fixes alike — are driven from
  the weft hub PM session until each member ships its next major release. Member repos
  remain where code lives and where commits land; the *decision and dispatch point* is
  the hub.
- Implementation issues for this period are filed in the **hub tracker** (`weft-*`).
  The hub↔member counterpart convention (`from-weft-hub`/`has-counterpart`) is
  **suspended for new work** during the pen-hold; existing counterparts stand.
- Dogfood-4 triage landed under seam-restoration epic `weft-384c0a8772` (P1, blocks
  launch cutover `weft-4b2f948f70`): A3/A4 `weft-d0df42c739`, A5 `weft-c7db813d9a`,
  A6 `weft-cca2ecbe12`, re-dogfood gate `weft-a05b53edcd`, plus 12 member-level
  bugs/tasks and 2 new convention cells (rec #2 one-status-oracle `weft-76abb3553e`,
  rec #3 fail-degraded `weft-b181c75e39`).

## Consequences

- Seam contracts get decided once, at the layer that owns them, and applied to both
  sides in one motion (e.g. the canonical `--filigree-url` form must change
  federation-topology.md, the wardline derivations, and lacuna's `.mcp.json` together).
- Hub tracker becomes the single work queue; member trackers go quiet for new work
  until their next majors.
- Risk accepted: hub session becomes a coordination bottleneck; mitigated by the fact
  that this is own-use tooling with no client deadline (PDR-0011) and the launch is
  already gated on cross-member correctness.

## Reversal trigger

A member ships its next major release ⇒ that member's pen returns. If the hub-session
bottleneck visibly stalls the launch-gate critical path (gate items idle >1 week purely
for want of session bandwidth), revisit with the owner — selective re-delegation of
member-internal (non-seam) fixes is the fallback.
