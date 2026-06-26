# Current State — Weft Federation        Checkpoint: 2026-06-26 eve (Website program SHIPPED-not-deployed PDR-0033; Tenter prove-the-need: full capability = member-shaped, GO/NO-GO DEFERRED on fabric stability — PDR-0034)

> **Workspace path:** `pm/product/` (NOT `docs/product/` — `docs/` is the gitignored mkdocs
> build dir). Resume with `/own-product pm/product`.

> **🔁 Reconciled against (RESUME must re-check these; if any moved, this brief is STALE —
> reconcile loudly, do NOT load as gospel — PDR-0029):**
> - tracker: cutover epic `weft-4b2f948f70` = **closed** (06-17); seam-health epic
>   `weft-b6effe30f9` = **open/P1** (front-runner Now bet); Plainweave §7 = **ADMITTED 06-24
>   (PDR-0030)**; Tabard §7 = owner-gated/held (below).
> - git member `main` HEADs (06-26): loomweave `2a0bb91` (Rust-plugin FFI fixes since the sweep) ·
>   filigree `f59e423` (**3.1.0**) · wardline `fcbd1ee9` · legis `15624c6` (**1.2.0**; CI release-test fixes) ·
>   warpline `02aa7f0` · plainweave `d0a7700` (**1.0.0 — commit now says "released to PyPI", see escalation 🚩**) ·
>   tabard `2108cf1` (static). Active feature branches: wardline `feat/weft-seam-conformance`, warpline
>   `plan/verification-freshness`, filigree `feat/weft-suppression-conformance`. *(loomweave/legis/plainweave
>   advanced AGAIN mid-checkpoint — federation ships ~daily; trailing commits read additive/fix/docs.)*
> - installed: **filigree 3.1.0 · loomweave 1.3.1 · wardline 1.0.7 · legis 1.1.1 (main is 1.2.0 — local
>   stale) · warpline 1.2.0 · plainweave 0.0.1 (CLI shim stale; repo/PyPI 1.0.0) · tabard (not installed)**
> - ⚠️ **CONCURRENCY:** a parallel session wrote the 06-25 sweep (this file + the stamp) without committing;
>   this checkpoint FOLDED its Tenter decision in rather than clobbering. Multiple live `claude` sessions touch
>   this workspace — consolidate if unintended.

## The bet right now — launch DELIVERED; the new Now still needs a DECIDE
**The FIVE-member clean-break cutover `weft-4b2f948f70` SHIPPED 2026-06-17** (epic closed
01:24Z); all five members on `main` + PyPI. Accepted/done — **no longer the Now bet.** The one
outward-facing tail, the **public announcement, remains owner-reserved** (not recorded as made —
escalation #1).

**The next Now bet is NOT yet chosen (a DECIDE act).** Front-runner: **seam-health surface**
`weft-b6effe30f9` (P1 epic, owner-validated as the credibility gap). Contenders below.

## Federation sweep 2026-06-25 — three live storylines (members moving fast; pace ~a release/day)
All movement is additive/patch-shaped (contracts-inviolate guardrail intact), but the cross-member
contract changes that SHIPPED need a hub blast-radius reconcile (flagged below).

**① Verification-freshness (Warpline "Rung 2") — the dominant cross-member thread.**
- **Warpline** `plan/verification-freshness` (~18 commits, in-flight): `v4 verification_events` table,
  `compose_verification_freshness`, new **`verify-record` verb (2nd mutating tool)**, advisory per-item
  verify + stale-first sort, GV-VF-1 vector. Plan-reviewed v1→v3 approved; not merged.
- **Filigree → SHIPPED 3.1.0**: per-issue **commit anchor** at claim/close (warpline seam, **schema v29**),
  **issue-lifecycle facts on the reverse-lookup** ("warpline b-ii"), atomic reverify ingest.
- **Legis → SHIPPED 1.2.0**: forge-proof per-SEI **`attestation_get`** (Task 8 ratified), advisory-boundary spine.
- **✓ Reconciled 2026-06-25:** `weft-7673e1fa79` retitled to the one remaining piece (**Wardline** resolved-
  finding read) + bumped P2, with Filigree/Legis halves recorded shipped. Legis advisory-preflight consumer
  `weft-13df44db31` **CLOSED** (shipped Legis 1.2.0, PDR-0002/0003).

**② Federation seam-conformance push (bottom-up from the members) — seam-health territory.**
- **Wardline** `feat/weft-seam-conformance` (~12 commits): **P0 enforceable weft seam registry + fail-closed
  gate**, multiple seams "reaching at_bar" (qualname parity, SEI loomweave→wardline, 3 consumer seams, MCP
  B1/B2, suppression-filter), single-sourced federation-status envelope + shared `WeftHttp` transport.
- **Filigree** `feat/weft-suppression-conformance`: consumer-side conformance oracle for the suppression seam.
- **✓ Tracked 2026-06-25:** new hub anchor `weft-b5dde278b9` (under the seam-health epic `weft-b6effe30f9`)
  captures the wardline + filigree seam-conformance program — it was untracked in the hub (0 search hits).

**③ Loomweave Rust plugin (ADR-054) — unblocks Plainweave.**
- Reachability-root tags, framework handlers, pub-method rooting, real-corpus dogfood (on `main`, **+6 unpushed**).
  **This is the upstream fix for Plainweave's north-star Rust-tagging blocker** — partly resolves that DECIDE.

**Quiet:** **tabard** static since 06-16 (gap-named, held). **plainweave** 1.0.0 local/no-remote (push gate, below).

## Tenter — prove-the-need RAN; full capability member-shaped; GO/NO-GO DEFERRED (PDR-0032 → PDR-0034)
**Renamed from Shuttle** (taken): the change as a rendered, spine-bound, **drift-checked plan object** (the *HOW*),
composing with Filigree (*WHAT*) + Plainweave (*WHY*) — Loomweave underneath — into an **advisory operating picture
of a change** (read-only, dependency-sink, NOT an orchestrator; teeth → Legis). Shaping/invariants: PDR-0032.
- **Scaffold stood up at `~/tenter`** (owner-directed "initiate tenter"; pre-alpha 0.0.1a0, mirrors the tabard
  gap-named pattern). Supersedes PDR-0032's "no `~/tenter` repo until admitted" line.
- **Two prove-the-need spikes (PDR-0034):** drift-check slice = a **Plainweave addon** (`plainweave plan-check`,
  reuses the adapter + ADR-029 drift; `~/plainweave` branch `spike/tenter-plan-check`). The **full quad operating
  picture = standalone member-shaped** — a read-only cross-member sink surfacing STALE-DONE / ORPHAN / UNTRACKED /
  DANGLING-REQ, demonstrated **live across two repos** (`~/tenter` branch `spike/operating-picture`).
- **🚩 GO/NO-GO DEFERRED (owner).** Owner leans toward the full capability but is reflecting: the **federation
  fabric is volatile** (Plainweave still maturing; "pieces land in different peers at different times"), so a
  four-member sink now risks more wobble. **PM owes the answer next session** (the headline item below).
- Grep-test refinement (owner): the "agents prefer it unprompted" bar is for instinctive substrate; a skill-gated
  manual tool (a planning aid) is judged "valuable when invoked," carried by a planning skill.

## Website — Plainweave site + Charter→Plainweave + suite-wide disclaimer SHIPPED (committed, NOT deployed) — PDR-0033
Built `~/plainweave/site` (Astro, green); swapped **Charter→Plainweave** in the shared `@weft/site-kit` registry
(PDR-0030 web tail); added a member-specific **deconfliction-not-security disclaimer to all 7 sites** (incl. hub).
Lacuna's stale Charter identity fixed; Tabard de-named from the Plainweave page (owner naming call). Committed across
8 repos, **none deployed**. 🚩 Deploy gated: publish Plainweave first; the new gated `plainweave.foundryside.dev`
links would ship broken; push weft first; **5 of 8 site commits are on non-`main` branches** (must reach main first).

## Plainweave fold-in — ADMITTED this session (reframed/renamed Charter)
**Plainweave = the code-grounded-intent / requirements member, reframed code-up ("permission for code to
exist") and renamed from Charter.** Reframe+rename owner-approved 06-18 (hub `16d81a0`); **§7 admission +
the canon rename RATIFIED 2026-06-24 (owner AskUserQuestion "Ratify Plainweave only" → [PDR-0030]
(decisions/0030-ratify-plainweave-code-grounded-intent.md)).** **Still owner-gated:** public remote /
PyPI publish + final name.
- Stood up at `~/plainweave` (`2bb8644`, main); pre-alpha; **not** in the cutover; **non-gating**.
- **Cross-member seam validated on LIVE peers (Lacuna, Loomweave)** — Plainweave PDR-008 — the
  intent graph (`SEI → requirement → goal`, orphan/trace/corpus) reproduces on real peer catalogs,
  not stubs. Read primitives shipped: `entity-intent-context` (goal_trail) + honest `intent-coverage`.
  This earned-in-shipped-behaviour seam is why admission rests on more than a reserved coordinate (vs Tabard).
- Plainweave-side active bet: scope the public-surface denominator + surface `coverage.complete` so the
  north-star is honestly computable (catalog public-surface tagging is per-repo).
- **Canon — member docs COMMITTED (`4c938b1`), doctrine/registries DEFERRED:** `members/plainweave.md`
  (supersedes charter.md → redirect stub) + the `members/warpline.md` snapshot are committed. The
  doctrine §1/§2/§5/§6/§7/§8/§9 + `registries/claims.md` (C-1/C-12/C-13 + new C-16) + `registries/terminology.md`
  Charter→Plainweave rename is **applied in the working tree but NOT yet committed** — those files co-carry the
  still-held Tabard edits and co-edit the member-count lines, so a clean *Plainweave-only* commit needs the ~3
  fused lines de-fused via `git apply --cached` (git-stash + `add -p` unavailable here). Do not commit Tabard as a side effect.

## Parallel thread — identity / Tabard (OWNER-GATED, canon edits still UNCOMMITTED)
Tabard (the *who* coordinate) progressed from idea to **scaffolded pre-alpha 0.0.1a0** (`2108cf1`, main):
federation spec drafted for hub review, name-reservation scaffold, CI/release workflow, and an intake
round (warpline is bidirectional — *gives* the `when` axis, *consumes* actor-resolution; PDR-0002/0003 in
Tabard's own tracker). **Hub canon edits remain UNCOMMITTED / owner-gated:** doctrine §2/§6/§7/§9 +
`registries/claims.md` (C-1, C-4, +C-15) + `registries/terminology.md` + untracked `members/tabard.md`
are all in the working tree, never committed. PDR-0028 (proposed). Does NOT gate anything now.

## Proposed next bets (contenders for the new Now — for DECIDE, not committed)
1. **Seam-health surface** `weft-b6effe30f9` (epic, P1) — interrogable federation joins; PDR-0023
   central feature; owner-validated as the credibility gap (its *absence* is the gap). **Front-runner.**
   Now has 11 children, incl. the wardline→legis seam item.
2. **L2 / fleet-OS coordination plane** — PDR-0024 two-mode surface (bulletin + chat), gated to a
   dogfood/falsifier proof before Adopted.
3. **Make the loop honest — scoreboard + close-the-loop** `weft-6636667996` / `weft-ff30fd979f` —
   re-triaged 06-21: re-aim the scoreboard from correctness/dogfood-pass-rate to **first-reach share +
   defection-return** (behavioural adoption, per-model/longitudinal). The north-star re-aim enabler.
4. **FD-1: Warpline observed/dynamic call edges → Loomweave upstream-caller fold-in** `weft-5a484165bd`
   (feature, P1, ACCEPTED 06-17) — a third enrich-only SEI-keyed fold (mirrors taint/issue folds);
   serves the beat-grep north-star AND operationalizes Warpline "earns its place." Cross-member.
5. **Agent continuity & write-safety** (A/A′/B/C, PDR-0008) — signed off; build follows launch, unblocked.

**Exploration (pre-shaping):** interface-define-and-assure (wardline + legis) — declare an interface
contract in JSON, have wardline + legis assure conformance; internal-first. Candidate to fold into
seam-health (#1).

## Warpline 5th-producer handover (2026-06-22) — triaged this session
Warpline delivered a handover (`~/warpline/docs/integration/2026-06-22-warpline-5th-producer-handover.md`):
wire it in as the **5th producer of the GS-7 conformance oracle** + a **glossary-freeze**, plus reciprocal
cross-member integration asks. OD-5 (fold into GS-7) is already resolved-direction (owner nod 06-13). All
triaged into the tracker (label `warpline-handover`); nothing punted invisibly:
- **`weft-13f84c77c5`** (P1) — GS-7 5th-producer wiring (mount 18 golden vectors + run executable, register
  producer `warpline`/`warpline.golden_vectors.v1`, gate on exit). **Gate-activation = owner runbook act**,
  sequenced behind the freeze ruling.
- **`weft-12410be4e2`** (P1, owner-gate) — the glossary-freeze ruling (escalation #2, below).
- **`weft-670ec2fe90`** Loomweave-temporal **bumped P3→P1** (beat-grep north-star); Wardline `weft-843fb82b57`
  + Legis `weft-13df44db31` → P2; Plainweave (ex-Charter) `weft-20b486b4e8` retitled, stays P3/future.
- **`weft-b7c23bfcae`** (P2, NEW) — Filigree consumes reverify worklists (the one untracked a-part).
- **`weft-7673e1fa79`** (P3, future-contingent) — the reciprocal Rung-2 "proven-good" enablers (Filigree
  `closed_at`, Wardline resolved-finding timestamp, Legis per-SEI attestation read); gated on Warpline
  actually building Rung 2 (prove-the-need).

## Open questions / escalations (owner-reserved)
- **🚩 Public launch announcement** — cutover SHIPPED + on PyPI, but the announcement is owner-reserved
  and NOT recorded as made. Has it gone out / should it? (outward-facing gate.)
- **✅ Warpline glossary-freeze ruling (escalation #2) — RESOLVED** `weft-12410be4e2` (closed; **PDR-0031**).
  Owner SIGNED the freeze attestation of the existing closed surface AND BLESSED `enrichment_reasons` as a
  v1-compatible additive top-level key (verified shipped in v1.2.0 under the v1 URIs); strict line reaffirmed
  (closed-vocab/error-code/reason-class changes still need v2). Residual: Warpline's 1.2.1 fixture patch
  (warpline-fc09bdeddd) must land before the GS-7 gate flips; gate-activation `weft-13f84c77c5` stays the
  owner's runbook act.
- **✅ Plainweave §7 admission — RESOLVED.** Owner ratified ("Ratify Plainweave only", PDR-0030); canon rename
  applied (member docs committed this checkpoint; doctrine/registries still held — see below). Residual owner
  gates: **publish / public remote / final name** (held).
- **🚩 Plainweave PyPI publish — CONFIRMED GATE EVENT (verified on PyPI 06-26).** **`plainweave` 1.0.0 IS LIVE
  on public PyPI** (`pypi.org/project/plainweave`, releases `['1.0.0']`) — verified, not just the `d0a7700`
  commit prose (plainweave PDR-012). The hub gate marks Plainweave **publish / public-remote owner-reserved**
  (vision grant + `members/plainweave.md`, which still reads "not published"). A member loop (or out-of-band
  action) crossed the owner gate. Outward-facing + already-done → **owner reconcile, NOT actioned from
  checkpoint:** ratify-after-the-fact (+ correct the canon) or yank. NB the public name "plainweave" now
  partly settles the held *final-name* gate by fait accompli.
- **🚩 Tabard canon still owner-gated** — the uncommitted doctrine §2/§6/§7/§9 + registries (C-1/C-4/C-15) +
  `members/tabard.md` edits remain held (PDR-0028 proposed). The owner chose Plainweave-only, so Tabard
  waits. NB: doctrine + registries now carry BOTH the (ratified) Plainweave edits and the (held) Tabard
  edits, co-editing the member-count lines — checkpoint must commit Plainweave WITHOUT committing Tabard.
- **wardline→legis seam** `weft-af0787892c` — **partially resolved:** now parented under seam-health
  `weft-b6effe30f9`, re-triaged 06-21. The "legis has no per-SEI read transport" premise is **stale**
  (legis 1.1.1 ships `override_list(entity=SEI)`); remaining gap = **Warpline wiring** (still passes
  `legis_client=None`). Additive (new read path) — ships solo. *No longer an open classify question.*
- **loomweave's two federation-touching changes** (parked in tickets, owner-reported 06-18) — still
  **TODO: confirm the two ticket IDs** (likely loomweave's own member tracker) carry a dated analysis
  plan + blast-radius map before any contract moves (federation change discipline).
- C-9 `weft-a2f4cf95c7` stale codex claim (release/reclaim).

## This checkpoint did (2026-06-26 eve)
- **Shipped the website program (PDR-0033):** built Plainweave's site, Charter→Plainweave across the shared
  site-kit, and the deconfliction-not-security disclaimer on all 7 sites + hub. Committed across 8 repos; **not
  deployed** (owner-gated). Caught + fixed a hub-disclaimer overclaim (claimed Legis "only records" — it can gate).
- **Initiated Tenter (`~/tenter` scaffold) + ran prove-the-need (PDR-0034):** drift-check = a Plainweave addon;
  the **full quad operating picture = standalone member-shaped** (live cross-repo demo, surfacing the change-gaps).
  Recorded the grep-test refinement (substrate→prefer-unprompted vs. skill-gated→valuable-when-invoked).
- **Recorded the owner's DEFERRAL** of the full-Tenter go/no-go — federation-fabric volatility is the gating
  concern — and teed the analysis up as next session's headline.
- The Plainweave doctrine/registries de-fusion + the held Tabard canon **remain held** (untouched this session).

## Next session, start here
1. **🚩 COME BACK TO THE OWNER on the headline question (PDR-0034):** *go for the full Tenter now, or stabilize the
   fabric (esp. Plainweave) first?* Owner leans yes on the full capability but flagged the fabric is wobbly —
   "pieces land in different peers at different times." **Bring an analysis + a concrete stability proxy** (e.g.
   "Plainweave's cross-member seams stop moving / its adapters reach shipped-not-folding-in") as the start-gate.
   This is the one the owner explicitly asked PM to answer.
2. **De-fuse + commit the Plainweave doctrine/registries rename** WITHOUT the held Tabard edits — member-count
   lines fuse both; rewrite the ~3 lines Plainweave-only via `git apply --cached`; verify
   `git diff --cached -- doctrine.md registries members/tabard.md | grep -i tabard` is empty.
3. **Owner escalations:** website **deploy** (publish Plainweave + get the 5 non-main site commits to main);
   Plainweave-PyPI (ratify/yank); public announcement; Tabard §7 admission (PDR-0028) + public naming.
4. **Pick the active Now bet** (DECIDE) — seam-health `weft-b6effe30f9` (front-runner; bottom-up build
   `weft-b5dde278b9`). Then `/write-prd` + `/axiom-program-management`.
5. **Confirm loomweave's two parked federation tickets** carry dated blast-radius maps; PDR-0030 propagation tail
   (federation-map.md, SHIPPING.md, conflict-register).
