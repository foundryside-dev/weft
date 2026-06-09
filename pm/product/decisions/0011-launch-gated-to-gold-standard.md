# PDR-0011 — The clean-break launch is gated to gold-standard, not minimum-shippable

Date: 2026-06-10   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes ("fuck it, let's do it properly… this isn't for a client so let's do it right")
Supersedes: —   Related: pm/2026-06-09-agent-continuity-write-safety-PROPOSAL.md, pm/2026-06-10-federation-interface-audit.md, weft-cd62a4da9b (launch gate), weft-1e053eac02 (oracle umbrella), weft-prelaunch-clean-break

## Context
The federation interface audit (2026-06-10) found 25 cross-member gaps. Its verdict: the interfaces
are sound as contract *designs* but not gold-standard, for two systemic reasons — (1) conformance is
hand-transcribed, not run (GS-7: no executable oracle), and (2) a critical contract defect (G1) plus
emit-topology drift (G5). Because the launch is a **clean break** (no cross-member backcompat,
`weft-prelaunch-clean-break`), the cross-member API contracts effectively *freeze at launch* — so a
contract defect frozen wrong is expensive or impossible to fix afterward. The owner ruled: this is
own-use tooling with no client deadline, so prioritise correctness over ship-speed.

## The call
**The launch is gated to GOLD-STANDARD.** Concretely the bar is:
1. **The contract-correctness class closed** — the wire-shape / silent-failure gaps the clean break
   freezes: **G1** (findings validation, `weft-37455bf407`, gating), **G13** (`dirty` key pin,
   `weft-61d27fb808`, gating), **G9** (qualname setter/deleter leak), **G11** (dead sign handshake),
   **G15** (entity-assoc serde alias/default), **G18** (suppression-vocab shared constant).
2. **The executable conformance oracle stood up (GS-7)** — umbrella `weft-1e053eac02`, gating; the
   enforcement that makes "we froze the contracts" credible. Closes G6/G12/G14/G15/G16.
3. **Emit-topology drift fixed (G5, `weft-7436c1959e`, gating)** — so correct contracts actually
   reach the tracker.

**Axis discipline:** *contract*-axis gaps gate launch (frozen by the clean break). *Deployment*-axis
gaps (G7, G8, G10, G19, G20, G21, G22, G23, G24, G25) are done as gold-standard polish but are
**re-fixable post-launch** (re-register, re-probe, re-doc), so they don't hard-gate unless cheap —
except G5, which is a live break and gates.

**Gate state (set 2026-06-10):** `weft-cd62a4da9b` now blocks on `weft-37455bf407` (G1),
`weft-7436c1959e` (G5), `weft-61d27fb808` (G13), `weft-1e053eac02` (oracle umbrella), and
`weft-eb3dee402f` (C-4). The contract cousins **G9/G11/G15/G18 are untracked and being filed into
member DBs by a parallel stream** — they need **hub counterparts** to be wired into the gate; that
coordination is pending (hub does not race the stream).

## Rationale
The clean break freezes the API; correctness-now strictly dominates speed when there is no external
deadline and post-launch contract change is constrained. The oracle is not gold-plating here — it is
the only thing that detects the drift you would otherwise be unable to fix. Deployment gaps are
genuinely deferrable because the deployment surface stays editable after launch.

## Reversal trigger
- **Gate creep / non-convergence:** if "gold-standard" expands without bound and the launch never
  converges, re-scope to a *defined* freeze set (the contract class + oracle for the load-bearing
  seams only) with the rest as fast-follow. The launch cutover remains **owner-reserved**; this PDR
  sets the bar, sequencing is `/axiom-program-management`'s.
- If a gated item proves genuinely post-launch-safe on inspection (re-fixable without a contract
  change), demote it from the gate to fast-follow.
