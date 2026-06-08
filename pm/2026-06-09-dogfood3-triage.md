# Dogfood #3 — PM triage & verdict (2026-06-09)

Source: [`/home/john/lacuna/docs/dogfood-findings.md`](file:///home/john/lacuna/docs/dogfood-findings.md)
(lacuna @ `144fd10`, driver Opus 4.8 as the agent the suite is built for; bar =
"if the agent prefers grep, the tool failed"; findings = friction only).

## The meta-pattern (read this first)

**Dogfood-3 is a LIVE oracle; this PM's 2026-06-09 reconciliation verified SOURCE.**
Where they disagree, the live surface wins for severity. Every finding below was
re-checked against primary evidence — installed builds and lacuna's actual tracker
DB (`/home/john/lacuna/.weft/filigree/filigree.db`) — not taken from the report or
from source alone. Two things fell out:

1. **The report is already stale on its own headline detail.** FIL-1 ("0
   baselined / 106 actionable") was real *at report time* but has **self-healed**:
   the live banner now reads **73 actionable / 32 suppressed**. It was a clean-break
   transition artifact (rows stored under the old `suppressed` key while the count
   predicate reads only the new `suppression_state`); the dogfood's own re-scan
   rewrote 33 rows to the new key and the count corrected. The no-dual-read posture
   is working as the 2026-06-07 clean-break ruling intended — **do not add an
   old-key fallback.**
2. **Source-fixed ≠ live-fixed.** Several "fixed" items are correct in source but
   the agent hit an older installed build or transition-state data. This is the
   launch-runbook's merge→reinstall gap, now demonstrated by an outside agent.

## Verdict scoreboard

| # | Finding | Sev | Verdict (PM, evidence-checked) | Action |
|---|---|---|---|---|
| WL-1/X-3 | wardline fingerprint drift breaks baseline + mints federation duplicate | S1 | **REAL, NEW, untracked.** Live-confirmed: `fc1bc079` (unseen_in_latest) and `8f68f390` (open) coexist for the same defect (PY-WL-101 L84) | Filed **P1 `weft-4a9d0f863c`** → wardline |
| FIL-1/WL-2 | suppression count lies "0 baselined" | S1→ | **SELF-HEALED** (now 73/32). Transition artifact, not a current defect | Documented on N2; no new issue |
| FIL-2/X-5 | finding_list can't filter kind/suppressed | S2 | **REAL, untracked.** Producer (wardline `where`) has the grammar; consumer doesn't | Filed **P2 `weft-d7273d61e3`** → filigree |
| N2 (live) | baselined findings still `status:open` | S2 | **REAL, live-confirmed** (33 rows open). Already tracked | Updated **`weft-171fc22a50`** + linked FIL-2 |
| LW-1/LW-2 | discovery loses to grep (name-only find; semantic search off) | S2 | **REAL, untracked.** The "replace grep" promise fails at the entry point | Filed **P2 `weft-b7ce301e92`** → loomweave |
| LEG-1 | no policy/cell discovery; policy_explain answers fake policies | S2 | **REAL, untracked** (= gap-analysis net-new, never filed) | Filed **P2 `weft-2232c81366`** → legis |
| X-1/2/4/6 | cross-tool seam inconsistency (identity / id-dialects / vocab / bounding) | S2 | **REAL, untracked.** The "suite leaks at its seams" meta-finding | Filed **P2 `weft-560f243c95`** → hub |
| LEG-2 | closure-gate `CELL_NOT_ENABLED` terse | S2 | **PARTLY MISREAD.** `next_action` IS in `structuredContent` (N3 close holds); the MESSAGE is terse vs `INVALID_CELL_SPEC` | Folded into **`weft-a92805f4cf`** |
| LW-3/4/5, LEG-3, FIL-3 | papercuts (dead_list over-reports; scope_excludes footer; etc.) | S2/S3 | REAL, minor | Folded into friction tail **`weft-f506e5f845`** |
| WL-3 | wardline→filigree emit 401 | — | **FIXED** (memory correction; matches F1). lacuna now reaches `/api/p/lacuna/…` | none |
| DEMO-1 | `make verify` red — 6 LW lacunae unsurfaced + stale tour | S1 | **lacuna-SPECIMEN issue**, not a suite-tool bug (facets work; tour-harness/catalogue drift) | Route to lacuna repo (see below) |
| DEMO-2 | `make scan` red | S1 | = WL-1 | covered |
| FIL-4 | leftover promoted dogfood cruft (`lacuna-da37dd4107`) | S3 | lacuna-specimen hygiene; `issue_delete` is irreversible | **User's call** (see below) |

## The headline: WL-1/X-3 is the real result of this pass

The wardline fingerprint is the **cross-tool join key** into both `baseline.yaml`
and filigree findings. It folds in call-resolution state, so it drifted on
unchanged source — and when it drifts, the join silently breaks in two directions
at once: the baseline misses (defect surfaces ACTIVE, trips `--fail-on ERROR`,
reddens the demo) **and** filigree accrues a duplicate row. This is the deepest
kind of federation bug: the one identifier meant to be stable across the seam is
the one that moves. The *trigger* is left open as the report left it (version bump
vs resolution-context change vs hash instability) — fix differs per cause, so it
needs the wardline maintainer. **This is the P1 that should gate dogfood-ready.**

## What's genuinely agent-first (preserve — and clone)

Wardline's `agent_summary` is the gold standard the other three should copy:
active-first, pre-filled `next_tool_calls` with exact fingerprints, bounded-by-
default (≤25), honest truncation. Concretely the suite should converge on it:
- port wardline's `where` grammar → filigree `finding_list` (FIL-2/X-5)
- bounded-by-default everywhere (X-6)
- `next_action` in every error envelope's MESSAGE, not just `structuredContent`
  (LEG-2) — and not load-bearing in a doc
- SEI rename-stability is the right spine (legis + loomweave) — keep it; X-2/X-3
  are about the *edges* between dialects, not the spine.

## Decisions needed from you

1. **lacuna specimen is RED and that's a launch-readiness signal.** DEMO-1
   (`make verify`: 6 Loomweave-facet lacunae not surfaced + stale `docs/tour.md`)
   and DEMO-2 (= WL-1) mean `make ci` is red on 2 of 3 stages, contradicting the
   "repivot complete / make ci passes" state — and nothing caught it (no PR/check
   data in legis; the governance layer meant to catch this is itself unfed). These
   are **lacuna-repo** issues (tour-harness/catalogue drift, not the engine). Want
   me to file them in lacuna's own tracker, or treat lacuna as out-of-scope for the
   weft board?
2. **FIL-4 cruft** (`lacuna-da37dd4107`, a promoted "not a real defect" issue) sits
   in the demo's ready surface. `issue_delete` is irreversible and yours to call —
   delete, or leave for the lacuna re-init (launch-runbook Step 4)?
3. **Does WL-1 gate dogfood-ready?** It reddens the demo and pollutes the
   federation. I'd hold the dogfood gate (`weft-cd62a4da9b`) open on it. Confirm.

## Tracker changes made this pass

Filed: `weft-4a9d0f863c` (P1, WL-1/X-3), `weft-d7273d61e3` (FIL-2/X-5),
`weft-2232c81366` (LEG-1), `weft-b7ce301e92` (LW-1/LW-2), `weft-560f243c95`
(X-series). All labelled `dogfood3`, parented to `weft-cd62a4da9b`.
Updated: `weft-171fc22a50` (N2 live-confirmed + harm narrowed), `weft-a92805f4cf`
(LEG-2 folded), `weft-f506e5f845` (papercuts folded). Doc: `conventions.md`
filigree side-effect cell gained the N2/self-heal note.
