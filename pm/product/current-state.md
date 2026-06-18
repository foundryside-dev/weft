# Current State — Weft Federation        Checkpoint: 2026-06-18 (cutover SHIPPED; PDR-0029 continuity-discipline fix)

> **Workspace path:** `pm/product/` (NOT `docs/product/` — `docs/` is the gitignored mkdocs
> build dir). Resume with `/own-product pm/product`.

> **🔁 Reconciled against (RESUME must re-check these; if any moved, this brief is STALE —
> reconcile loudly, do NOT load as gospel — PDR-0029):**
> - tracker: cutover epic `weft-4b2f948f70` = **closed**; identity epic/thread = owner-gated (below)
> - git (member `main` HEADs at parity): filigree · wardline · legis · warpline all on `main`,
>   ahead-of-origin/main = 0. loomweave on `feat/loomweave-dogfood-fixes` (+11, post-launch work).
>   hub HEAD `4c4ee60`.
> - installed: **filigree 3.0.1 · wardline 1.0.1 (repo prepping 1.0.3) · legis 1.0.0 ·
>   loomweave 1.1.0 · warpline 1.0.0**

## The bet right now — the launch bet is DELIVERED; the next Now needs a DECIDE
**Ship a decent L1 — the FIVE-member clean-break cutover `weft-4b2f948f70` — SHIPPED 2026-06-17**
(epic closed 06-17 01:24Z). All five members (Filigree, Loomweave, Wardline, Legis, Warpline)
merged to `main` and published to PyPI; legis 1.0.0 was the final holdout (red mypy gate, fixed).
Framed by PDR-0023/0026/0027. **The launch bet is accepted/done — it is no longer the Now bet.**

**The next Now bet is NOT yet chosen (a DECIDE act, not for this checkpoint to crown).** The
contenders, all shaped, are below under "Proposed next bets." The one outward-facing tail is the
**public announcement, which remains owner-reserved** (the ship happened; the announcement has not
been cleared — see escalations).

## North-star — correctness essentially MAXED; thesis is shifting (metrics.md updated 06-18)
- **Dogfood pass rate (06-15): 16/17 MCP green · 4/4 federation joins green · 8/8 lacunae
  reachable.** "Does it work" is closed. Only residual: narrow Fix-B bug `lacuna-522ab56124`.
- **Thesis shift (candidate, PDR-0024 + 06-15 assessments):** with correctness maxed, the next
  frontier is **reach-for / beating the agent's own grep reflex** — proposed new north-star
  **first-reach share** (per-model, longitudinal) + defection-return rate. Re-aiming the dormant
  scoreboard `weft-6636667996` is the enabling work. *Decision pending (DECIDE).*

## Post-launch member work IN FLIGHT (informational — owner-reported 2026-06-18)
Several members shipped post-launch **patch/minor** releases (mostly bug fixes) — additive/patch,
ship solo per the post-launch change discipline (no lockstep):
- **filigree 3.0.0 → 3.0.1** (doctor route-resolution fix, PR #66, on `main`).
- **loomweave → 1.1.0**; `feat/loomweave-dogfood-fixes` (+11) — mostly an **internal dogfooding
  sprint on its own internal tools (no interface touched)** (owner, 06-18) → that part ships solo,
  no blast radius. **BUT it also surfaced TWO federation-touching changes, which are correctly
  PARKED IN TICKETS pending analysis** (discipline honored — *tracked* punting, not invisible
  "figure out later"). **TODO: confirm the two ticket IDs (likely loomweave's own member tracker,
  not hub — not found in hub search 06-18) + that each carries a dated analysis plan and a
  blast-radius map before any contract moves** (federation change discipline).
- **wardline 1.0.1 → prepping 1.0.3** on `feat/warpline-delta-scan` — **currently implementing a
  gap in the LEGIS seam:** `weft-af0787892c` *"legis: no per-SEI governance read transport —
  blocks include_federation's legis half + the seam-health probe legis layer"* (P2, open). This
  is a **cross-member contract change** → owes a federation blast-radius map + dated counterpart
  ticket(s) before its session ends (federation change discipline). **TODO next session: confirm
  the wardline side is tracked + counterparted, and classify the legis transport as additive
  (new read endpoint = ships solo) vs breaking.**

## Parallel thread — identity / Tabard (OWNER-GATED, uncommitted — unchanged)
PDR-0028 (proposed): the *who* coordinate gap-named; HOME provisional (member vs fold vs
convention+Seal). Identity model CAPTURED-not-decided (`pm/2026-06-16-background-ticket-change-debt-IDEA.md`).
**Doctrine §2/§6 + `registries/claims.md` + `registries/terminology.md` + `members/tabard.md`
edits remain UNCOMMITTED / owner-gated** (still in the working tree — this checkpoint did NOT
commit them). Readiness panel: `pm/2026-06-16-identity-north-star-readiness.md`. Does NOT gate
anything now that the cutover has shipped.

## Proposed next bets (contenders for the new Now — for DECIDE, not committed)
1. **Seam-health surface** `weft-b6effe30f9` (epic, P1) — interrogable federation joins; PDR-0023
   central feature, independently graded P0 by the cold-eval senior user (its *absence* is the
   credibility gap). Strong candidate for the new Now.
2. **L2 / fleet-OS coordination plane** — PDR-0024 (candidate) two-mode surface (bulletin +
   chat), built behind the cutover; gated to a dogfood/falsifier proof before Adopted.
3. **Make the loop honest — scoreboard + close-the-loop** `weft-6636667996` / `weft-ff30fd979f`
   (PDR-0013) — also the enabler for the first-reach-share north-star re-aim.
4. **Agent continuity & write-safety** (A/A′/B/C, PDR-0008) — signed off; build follows launch,
   now unblocked.
5. **Warpline "earns its place"** — cold-eval flagged it confident-empty on a stale snapshot;
   owes a fail-loud/recapture fix + a temporal-blast-radius value proof.

**Exploration (pre-shaping, owner-reported 2026-06-18):**
- **Interface-define-and-assure (wardline + legis)** — a proposed capability: **declare/"fix" an
  interface contract in JSON and have wardline + legis assure conformance.** For **internal use
  first** (dogfood the federation's own seams). Strategically apt — it mechanizes the
  "frozen contracts are inviolate" doctrine (PDR-0011/0027) with the suite's own tools, and is the
  natural home for the seam-assurance the cutover did by hand. **If it becomes a cross-member
  contract it is hub-blessed seam territory** (PDR: hub blesses every seam) — internal-first is the
  right prove-the-need posture. Watch as it shapes up; candidate to fold into seam-health (#1).

## Open questions / escalations (owner-reserved)
- **🚩 Public launch announcement** — the cutover SHIPPED + is on PyPI, but the announcement was
  owner-reserved and is NOT recorded as made. Has it gone out / should it? (outward-facing gate.)
- **🚩 Identity thread** — sober-read of the identity model; the *who*-HOME decision; then
  commit-or-revise the doctrine/registries/tabard canon (still uncommitted, owner-gated).
- **wardline→legis seam** `weft-af0787892c` — confirm tracked + counterparted per federation
  change discipline; classify additive vs breaking (see in-flight section).
- C-9 `weft-a2f4cf95c7` stale codex claim (release/reclaim).

## This checkpoint did (2026-06-18)
- **Reconciled the brief to reality** after `/own-product` loaded a stale picture: the 06-17
  cutover ship was in the tracker + auto-memory but never in this file (and the 06-16 reconcile +
  PDR-0024 Amendment 1 were written-but-never-committed). Recorded **PDR-0029** (checkpoint-on-ship
  + commit-the-checkpoint + resume-reconciles-against-tracker/git, with this brief's new
  machine-checkable `Reconciled against:` stamp).
- Updated metrics.md (06-15 north-star reading: 4/4 joins). Recorded post-launch member releases +
  the wardline→legis seam item.

## Next session, start here
1. **Pick the new Now bet** (DECIDE) from the contenders above — seam-health `weft-b6effe30f9` is
   the front-runner (owner-validated P0). Then `/write-prd` + route to `/axiom-program-management`.
2. **Confirm the wardline→legis seam** `weft-af0787892c` is counterparted + classified.
3. **Surface the announcement question** to the owner (escalation #1).
4. Identity gates (owner sober-read → home → commit-or-revise canon).
