# Current State — Weft Federation        Checkpoint: 2026-06-16 (PDR-0028 — Tabard *who*-coordinate gap-named, home PROVISIONAL; identity-model design CAPTURED, not decided)

> **Workspace path:** `pm/product/` (NOT `docs/product/` — `docs/` is the gitignored mkdocs
> build dir). Resume with `/own-product pm/product`.

## The bet right now (UNCHANGED — build priority)
**Ship a decent L1 — the FIVE-member clean-break cutover `weft-4b2f948f70`** (Filigree,
Loomweave, Wardline, Legis, Warpline). Framed by PDR-0023 (get the seams right) + PDR-0027
(decent L1; gold, **inviolate** contracts). Critical path: G14 `weft-8f1c6c512e` → GS-7 →
Dogfood #2 → cutover; Rust gold `weft-7ee9bccbd7`; test-health `weft-2787ded4e1` /
`weft-41a1142165`. Metric: dogfood pass rate → seam-health surface `weft-b6effe30f9`.
**This session did NOT touch the cutover — it was an identity-design detour (below); the
cutover keeps build priority.**

## This session — the identity thread (Tabard + the *who* coordinate)
- **Stood up the Tabard project** at `~/tabard` (own repo + product workspace; a *separate*
  PM session owns it; uncommitted in that repo).
- **Owner ruled Tabard the sixth member by GAP-NAMING** — the *who* coordinate (actor-identity
  authority) is named/seated; the **implementation does not exist** (Phase-0 spike, NOT in the
  cutover). Recorded as **hub PDR-0028 (proposed)** + a new doctrine §7 two-stage admission rule.
- **Identity model designed but CAPTURED, NOT DECIDED** (owner explicit: sober read pending —
  `pm/2026-06-16-background-ticket-change-debt-IDEA.md`): body/tabard/seal; assignment-as-
  principal; the hierarchical **session-prefix identifier** (`model+body+time`±ticket) that makes
  attribution always-available, bundling a free prefix-query, and **retired the fragile
  auto-bake/daemon machinery**. Design lesson: a structural convention beat a system.
- **6-member readiness panel** (workflow): `pm/2026-06-16-identity-north-star-readiness.md`.
  Verdict: spine more real than assumed; **rework, not rejection**; 3 corrections (never-reject
  already false 3×; missing honesty axis; auto-bake backwards — last one resolved by the
  session-prefix reframe).

## Open questions / blocked-on-owner (ESCALATIONS)
- **🚩 Hub constitution edited but UNCOMMITTED — awaiting owner filing.** `doctrine.md`
  (§2/§6 re-scope: Loomweave = identity for code/entities, Tabard = peer actor-identity,
  Warpline = temporal-correlation; §7 two-stage "gap-naming" admission; §9 roster 6-vs-5),
  `registries/{claims,terminology}.md`, `members/tabard.md` — all carry provisional callouts.
  This is the "owner-filed / hub-blessed" federation lock-in. **NOT committed; do not enact as
  canon until owner confirms (sober) + the home decision lands.**
- **🚩 The HOME of the *who* coordinate is PROVISIONAL** — separate sixth member vs fold the
  Seal into Loomweave/Legis vs mostly-a-convention+small-Seal (owner reopened it:
  "doesn't have to be its own component"). The Phase-0 spike + key-custody review decide.
  PDR-0028 is `proposed` accordingly.
- **Identity model is CAPTURED, not decided** — needs the owner's sober read to confirm:
  (a) "available, not persistent"; (b) auto-bake demoted to optional; (c) the session-prefix id.
- **Readiness #1 — a hub "never-reject scope" ruling:** scope it to the identity-capture path
  only, or it regresses 3 shipped hard-stops (Loomweave identity fail-close, Legis graded 2×2,
  Wardline trust gate). Hub/owner ruling needed.
- **Stale codex claims (unchanged from session start):** cutover epic `weft-4b2f948f70` + C-9
  `weft-a2f4cf95c7` past lease — reclaim/release before cutover choreography.
- Launch cutover scope/timing + member admission/authority grants remain owner-reserved.

## What this checkpoint did
- Recorded **PDR-0028 (proposed)** — ratify the *who* coordinate by gap-naming; who/what/when
  triad; §2/§6 re-scope; **home provisional**.
- Committed the two captured PM notes (identity readiness report + the change-debt/identifier
  IDEA) and refreshed `roadmap.md` (Tabard Later entry advanced) + this brief.
- **Did NOT commit** the `doctrine.md` / registries / `members/tabard.md` canon edits — flagged
  as the owner-gated federation lock-in (provisional). Metrics unchanged (no readings this session).

## Next session, start here
1. **Owner sober-read** of the identity model (`…background-ticket-change-debt-IDEA.md`) →
   confirm/adjust (available-not-persistent; auto-bake optional; session-prefix id).
2. **Decide the *who*-coordinate HOME** (member vs fold vs convention+Seal) — gates the doctrine
   §2/§6 filing.
3. **Hub "never-reject scope" ruling** (readiness panel #1).
4. Then **commit-or-revise** the doctrine/registries/members canon edits.
5. Back to the **decent-L1 cutover** build priority (G14 → GS-7 → Dogfood #2; Rust gold;
   test-health gates) — it kept priority throughout; the identity thread is design, not cutover.
