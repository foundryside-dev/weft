# Current State — Weft Federation        Checkpoint: 2026-06-13 08:13 AEST (PM resume; dogfood measurement ready; test-health scratchpad promoted)

> **Workspace path:** `pm/product/` (NOT the `docs/product/` default — `docs/` is
> gitignored here as the mkdocs build dir). Resume with `/own-product pm/product`.

## Mental model (the identity/continuity design in one image)
**The desk and the daily hire.** A **desk** is a *line of effort* (Product Manager / program-mgmt /
web-dev) — stable, with a nameplate and a drawer of handover notes (= A′ stable handle + mechanism A).
An **employee** is one agent session — *hired for a day, never rehired*: boots fresh, works the desk,
leaves (= the minted per-session run id). Each morning the new hire **reads the desk's handover folder**
instead of reconstructing everything (A) — and the folder is *dated*, so they check what moved overnight
rather than trust a stale note (provenance stamp; the `f983ebd` lesson). Different **desks** are the
deconfliction lanes; the **stomp** is one desk's hire rifling another desk's half-finished work (B/C).
**Second axis — the pool:** fungible concurrent peers share a **whiteboard** (A generalised); among them
*who you are* carries no signal — coordination is an **activity register** (mechanism C, hook-fed so it
can't rot). C anticipates; **B catches mechanically when a peer overrides the advisory.**

## Operating model (PDR-0015, owner ruling 2026-06-12)
**The pen is at the hub** until each member ships its next major. NEW since: **codex operates as a
second autonomous stream** (warpline, loomweave c475e90, website drift pass) — hub posture per
PDR-0018 is *accept via adversarial review + same-day remediation*, never blind, never auto-revert.
**PDR-0020 adds the launch-control boundary:** until ship, the program office may dispatch and
accept residual burn-down inside the four admitted subordinate projects — Filigree, Loomweave,
Wardline, and Legis. Warpline remains outside this launch-control set until a separate owner admission
decision changes its status.

## The bet right now
**Now:** gold-standard clean-break launch (PDR-0011/0014). Cutover `weft-4b2f948f70` gates:
- **Dogfood gate** (`weft-cd62a4da9b`): 7 open blockers (unchanged).
- **Rust gold** (`weft-7ee9bccbd7`, P1, PDR-0014) — untouched for 2 days.
- **Launch-branch test health:** Wardline red taint tests `weft-2787ded4e1` + Loomweave load-flaky
  coalescing test `weft-41a1142165` promoted from observations and added under cutover.
- **Seam restoration epic `weft-384c0a8772`: CLOSED 2026-06-13.** Dogfood-4: **15/17 closed** —
  every A-series and B-series defect fixed, tested, **deployed** (wardline rc5, loomweave 1.1.0-rc5
  BuildID 73a04671, filigree 3.0.0rc12+B9 with daemon bounced, legis rc5). Conventions C-12
  (one status oracle; loomweave = reference†) and C-13 (fail-degraded; loomweave R, legis+wardline ✓†)
  ratified with full member cells. Remaining: C-tail papercuts `weft-0b27444be7` (P2) + **re-dogfood
  `weft-a05b53edcd` (P1, fully unblocked — it is now the *measurement*, not the fix)**.
Metric: dogfood pass rate — joins were 1/4 pre-fix; 4/4 expected at re-dogfood (metrics.md 2026-06-13).

## Warpline (candidate stream, codex-driven)
- **Admission quality bar ratified (owner, PDR-0016, doctrine §7 + 3c1bd28):** standalone parity AND
  federation enhancement, both in shipped behaviour, conjunctive.
- **Ruled not-ready (PDR-0017,** evidence on `weft-e4589e6570` comments 192–193): real kernel, but
  parity/uplift claims are self-graded against a fake loomweave client; server fail-dead on bad
  rev_range; **pre-admission endorsement of its Interface Endorsement Package DECLINED** (no such
  mechanism; design input at admission time only). Four falsifiable next steps recorded on the issue.
  `members/warpline.md` corrected (33c1a7b).

## In flight / recently landed
- **Residual burn-down accepted (PDR-0020):** post-fix Lacuna re-dogfood closed
  `weft-a05b53edcd` with all four joins passing. Subagent waves closed Wardline no-emit
  `weft-b3a1828d6a`, Loomweave doctor/list fidelity `weft-bb156b36e3` / `weft-51a90daa79`,
  Filigree payload-cap contract `weft-303d5bb7ce`, Wardline advertised-limit consumption
  `weft-d49cbabb99`, Wardline pollable scan jobs `weft-fb47ab4a92`, and repo-scoped suite MCP
  attachment `weft-122a50829f`. Parents `weft-590555a273` and `weft-02df60cd79` are closed with
  verification evidence. The broader C-tail batch `weft-0b27444be7` remains open for its other
  dogfood papercuts.
- **PDR-0018**: codex's loomweave c475e90 accepted after 13-agent review (9 majors confirmed, 0
  refuted) + 11-item same-day remediation; **version bumped rc4→rc5** (stale-wheel trap disarmed);
  bootstrap exemption (gate-exempt config tools) accepted-and-documented.
- **PDR-0019**: B2 redaction collision — pinned stub-collapse non-disclosure invariant outranks the
  dogfood usability ask; dead-list excludes blocked entities + aggregate `withheld` marker. Process
  lesson recorded: dogfood complaints are observations, not specs; invariant collisions escalate to PM.
- **B9 follow-up parked** (`weft-4a46553503` comment 194): should wardline stamp loomweave entity ids
  into finding metadata at emit time? Would close the qualname gap with zero filigree changes.
- Scratchpad cleared 2026-06-13 PM resume: loomweave flaky coalescing test promoted to
  `weft-41a1142165`; wardline red taint tests promoted to `weft-2787ded4e1`. Both are P2 bugs,
  launch-gate labelled, and cutover children/dependencies.

## Open questions / blocked-on-owner
- **Critical path moved to G14** — G15 `weft-045076e30f` is closed; Filigree now reports
  `weft-8f1c6c512e` → GS-7 → Dogfood #2 → launch cutover.
- **Warpline next steps**: does the owner want the four falsifiable steps dispatched (to codex or a hub
  wave), or does warpline pause until after launch?
- **Launch-branch test-health triage** — Wardline `weft-2787ded4e1` + Loomweave
  `weft-41a1142165`; both block cutover until fixed or deliberately reclassified.
- **Stale claim**: `weft-ab0a6555f5` (conventions verification campaign) open/unassigned; Warpline spike
  `weft-e4589e6570` stays open as the go/no-go record. `weft-384929d1ad` closed by codex (verified).
- Launch cutover owner-reserved (PDR-0011); admission owner-reserved (doctrine §7 + PDR-0016).

## Last checkpoint did (2026-06-13)
- PM resume reconciled Filigree against this workspace: post-fix Lacuna re-dogfood
  `weft-a05b53edcd` closed with all four joins passing; the live critical path now starts at
  G14 `weft-8f1c6c512e` → GS-7 → Dogfood #2 → launch cutover.
- Residual burn-down wave accepted: G15 `weft-045076e30f`, payload-cap parent
  `weft-590555a273`, scanner-job umbrella `weft-02df60cd79`, and repo-scoped attachment
  `weft-122a50829f` closed after subagent implementation plus coordinator verification.
- Promoted the two pending observations into durable P2 launch-gate bugs and wired them under
  cutover: `weft-2787ded4e1`, `weft-41a1142165`. `filigree observation list` is now empty.
- PDRs 0016–0019 recorded (admission bar; warpline not-ready + endorsement declined; codex-commit
  acceptance posture; redaction-invariant ruling).
- Dogfood-4 wave closed out: 6 more issues closed (A7, B7, B1, B2, B10, B9) + rec#2/rec#3 + epic;
  C-12/C-13 cells committed (b0eee6e, d141d41, b60a8f5); doctrine §7 quality bar (3c1bd28).
- All four members redeployed + filigree daemon bounced; north-star + duplication-guardrail readings.

## Next session, start here
1. **G14 / GS-7 critical-path repair `weft-8f1c6c512e`** — the next Dogfood #2 → cutover blocker
   after G15 closure.
2. **P1 launch burn-down** — `weft-eb3dee402f` (multi-owner managed-block contract) and
   `weft-7ee9bccbd7` (Rust gold closeout) are startable P1s.
3. **Launch-branch test-health bugs**
   `weft-2787ded4e1` / `weft-41a1142165` — cutover gates not touched this wave.
4. **Owner's warpline call** (above) — then dispatch or park; do not include Warpline in launch-control
   residual burn-down until admission changes.
5. **C-tail batch `weft-0b27444be7`** + remaining dogfood-gate blockers as capacity allows.
6. Hand gate+wave state to `/axiom-program-management` for cutover choreography.
