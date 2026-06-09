# Gold-standard launch — sequencing nomination (2026-06-10)

**Status:** PM nomination (urgent — owner is dispatching live). Pending `/axiom-program-management`
formalisation (WSJF / cost-of-delay / dependency model / forecast). Source: PDR-0011 + the federation
interface audit (`pm/2026-06-10-federation-interface-audit.md`).

## ⚠️ Three ways this dispatch goes wrong — check your in-flight work against these

1. **Dispatching a contract fix to ONE repo.** Every contract-axis fix is a **producer + consumer
   (+ golden vector)** unit, not a single-repo ticket. G1 = wardline (emit a *shared constant*) **and**
   legis (validate the key *before* signature) **and** a golden vector both sides load. A one-repo
   dispatch produces a half-fix that re-signs cleanly and still breaks silently. → *Is each contract
   ticket dispatched as a coordinated both-sides unit?*
2. **Ordering the oracle wrong.** Building the conformance oracle *before* a seam's wire shape is
   settled **codifies the current bug**; fixing a contract *without* adding its golden vector
   **re-creates the hand-transcription drift** the audit exists to kill. The atomic unit is
   **fix-and-lock together, per seam.** → *Are oracle vectors being written in the same stroke as the
   contract fix, not as a separate later phase?*
3. **Not doing G5 (emit) first.** If emit topology is still drifted, findings don't reach the tracker,
   so you **cannot dogfood-verify any other fix.** Emit is the observability prerequisite. → *If
   contract work is dispatched but emit isn't fixed, verification is flying blind.*

## Wave order (critical path)

| Wave | Work | Why here |
|---|---|---|
| **0 — unblock (now, parallel)** | **G5** emit-topology (`weft-7436c1959e`, per emit runbook) · **C-4** (`weft-eb3dee402f`) | G5 is the prerequisite to *verify* everything else via dogfood; C-4 is an independent pre-existing blocker. |
| **1 — critical seam, fix+lock (in progress)** | **G1 + G13** (seam S8 findings/dirty) — wardline producer + legis consumer + shared constants + golden vector | The one critical defect; same seam, do together. Already being worked (legis+wardline). |
| **2 — rest of contract class, fix+lock (per seam, parallel across seams)** | **G9** (S4 qualname: wardline+loomweave+fixture) · **G11** (S7 handshake: legis+filigree) · **G15** (S2 entity-assoc serde: filigree+loomweave+alias) · **G18** (S5 suppression vocab: filigree+wardline shared const) | Each is an independent seam (parallelisable) but internally a producer+consumer+vector triple. These need **hub counterparts** (untracked; parallel stream filing them). |
| **3 — oracle harness completion** | **G6/G12/G14/G16** (`weft-1e053eac02` umbrella): machine-load the canonical vectors, wire into each repo's CI | Comes *after* the per-seam shapes settle (Waves 1–2) — locking shapes that aren't settled churns. |
| **4 — verify + ship** | **Dogfood #2** against the fix branches → **clean-break launch** | Dogfood verifies the fixed+locked contracts end-to-end; needs Wave 0 (emit) + Waves 1–3 done. |
| **parallel / fast-follow (non-gating)** | deployment polish: G7, G8, G10, G19, G20–G25 | Re-fixable post-launch (no contract freeze) — must NOT compete with the contract/oracle critical path. |

## Dependency summary
- Wave 0 (emit) **before** Wave 4 (can't dogfood without it).
- Waves 1–2 **define** wire shapes → Wave 3 **locks** them → 3 cannot precede 1–2.
- Seams within Waves 1–2 are mutually independent (parallel), but each seam is internally coupled
  (both sides + vector) — dispatch per-seam, not per-repo.
- Wave 4 (dogfood→ship) after Waves 0–3.

## Hand-off
Recommend handing the committed gate (`weft-cd62a4da9b`) + this nomination to
`/axiom-program-management` for the formal dependency model + WSJF + dated forecast. This nomination
is the dependency-correct *order*; it does not compute cost-of-delay or dates.
