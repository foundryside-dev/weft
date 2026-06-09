# Cross-project ticket coordination — concept

**STATUS: idea-bench (Later). Not a committed bet.** Captured 2026-06-09.

**Origin.** Fell out of hand-reconciling the hub↔member counterpart convention (19/27 hub
tickets, by hand, label-linked, no cross-DB deps). The pain: coordinating one logical unit of
work across the weft hub tracker + N member trackers is entirely manual today.

**Related.** ADR-029 (`entity_association_*` cross-product bindings, opaque external ids); the
counterpart convention (`from-weft-hub` / `has-counterpart` labels); the in-flight `.weft`
relocation; `weft-a9ae398c5b` and `weft-eff938d3b6` (project↔DB resolution bugs); `vision.md`
anti-goal (no central shared store — doctrine §6).

## The idea (owner)
Create a ticket at the weft hub and **cascade children** into member trackers (filigree,
wardline, …) with a couple more MCP calls; and **reach into** member DBs from the hub. Two
implementation variants the owner sketched:
- **V1 — federated.** Keep per-project DBs; relax the project↔DB *resolution* so one agent can
  address/cascade across them. "Half way there just by toning down [the matching]."
- **V2 — consolidated.** One filigree DB at the weft level; members become subfolders
  (`weft/{filigree,loomweave,…}/`); partition by project-prefix in the ticket id
  (`filigree-x12345`); agents loaded at a member subfolder engage the hub-level DB scoped to
  their partition.

## Evaluation (PM)
1. **"Security" is the wrong frame — it is project *resolution* / isolation** (weft is
   deconfliction-first, not security). The project↔DB binding is a correctness mechanism;
   relaxing it risks **silent wrong-project writes**, not a breach. That failure mode is
   *already live*: `weft-eff938d3b6` (server-mode writes silently resolve to the default
   project) and `weft-a9ae398c5b` (register_project dedups by store-dir string → relocation
   strands a stale key). The cheap "half-way" win is real, but the cheap path runs *through*
   fixing resolution, or it amplifies an open hazard.
2. **V2 (shared hub DB) collides with doctrine §6 + the vision anti-goal** ("no central shared
   store; coordination is substrate, not a controller; members stay solo-useful"). A single hub
   store that members write to centralises the store and makes a member non-solo-useful — exactly
   what the federation refuses to be, and the same shape the continuity bet spent its whole life
   avoiding. **Park V2 as doctrine-incompatible** unless the clean-break launch *deliberately*
   reopens "where does the store live" (adjacent to the in-flight `.weft` relocation).
3. **V1 (federated) stays inside doctrine** and likely builds on what exists: ADR-029
   `entity_association_*` + the counterpart label convention + a *safe* relaxation of cross-DB
   **addressing** (cross-reference and addressed cascade, per-project stores intact — *not* a
   shared writable store). This is the doctrine-compatible "cascade + reach."
4. **Real value for the coordinator role** — automates the manual counterpart reconciliation, and
   it is the natural cross-**line-of-effort** surface for the PM / program-management lines (ties
   to the continuity bet's identity model). But it is a **new bet**; the Now bet (launch) holds
   build priority.

## Disposition
**Later / idea-bench.** Probe **V1 first** (doctrine-safe; cheap; builds on ADR-029 + the
resolution fixes already in flight). Treat **V2 as parked** pending a deliberate store-location
decision. Cheapest first step: fold "safe cross-project *addressing*" into the resolution-bug
fixes (`weft-a9ae398c5b` / `weft-eff938d3b6`) opportunistically, rather than as a standalone build.
Revisit after launch.
