# Current State — Weft Federation        Checkpoint: 2026-06-13 (dogfood-4 wave complete; heddle ruled not-ready; admission quality bar ratified)

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
second autonomous stream** (heddle, loomweave c475e90, website drift pass) — hub posture per
PDR-0018 is *accept via adversarial review + same-day remediation*, never blind, never auto-revert.

## The bet right now
**Now:** gold-standard clean-break launch (PDR-0011/0014). Cutover `weft-4b2f948f70` gates:
- **Dogfood gate** (`weft-cd62a4da9b`): 7 open blockers (unchanged).
- **Rust gold** (`weft-7ee9bccbd7`, P1, PDR-0014) — untouched for 2 days.
- **Seam restoration epic `weft-384c0a8772`: CLOSED 2026-06-13.** Dogfood-4: **15/17 closed** —
  every A-series and B-series defect fixed, tested, **deployed** (wardline rc5, loomweave 1.1.0-rc5
  BuildID 73a04671, filigree 3.0.0rc12+B9 with daemon bounced, legis rc5). Conventions C-12
  (one status oracle; loomweave = reference†) and C-13 (fail-degraded; loomweave R, legis+wardline ✓†)
  ratified with full member cells. Remaining: C-tail papercuts `weft-0b27444be7` (P2) + **re-dogfood
  `weft-a05b53edcd` (P1, fully unblocked — it is now the *measurement*, not the fix)**.
Metric: dogfood pass rate — joins were 1/4 pre-fix; 4/4 expected at re-dogfood (metrics.md 2026-06-13).

## Heddle (candidate stream, codex-driven)
- **Admission quality bar ratified (owner, PDR-0016, doctrine §7 + 3c1bd28):** standalone parity AND
  federation enhancement, both in shipped behaviour, conjunctive.
- **Ruled not-ready (PDR-0017,** evidence on `weft-e4589e6570` comments 192–193): real kernel, but
  parity/uplift claims are self-graded against a fake loomweave client; server fail-dead on bad
  rev_range; **pre-admission endorsement of its Interface Endorsement Package DECLINED** (no such
  mechanism; design input at admission time only). Four falsifiable next steps recorded on the issue.
  `members/heddle.md` corrected (33c1a7b).

## In flight / recently landed
- **PDR-0018**: codex's loomweave c475e90 accepted after 13-agent review (9 majors confirmed, 0
  refuted) + 11-item same-day remediation; **version bumped rc4→rc5** (stale-wheel trap disarmed);
  bootstrap exemption (gate-exempt config tools) accepted-and-documented.
- **PDR-0019**: B2 redaction collision — pinned stub-collapse non-disclosure invariant outranks the
  dogfood usability ask; dead-list excludes blocked entities + aggregate `withheld` marker. Process
  lesson recorded: dogfood complaints are observations, not specs; invariant collisions escalate to PM.
- **B9 follow-up parked** (`weft-4a46553503` comment 194): should wardline stamp loomweave entity ids
  into finding metadata at emit time? Would close the qualname gap with zero filigree changes.
- New observations: loomweave flaky coalescing test `weft-obs-270f2884af`; wardline 7 red taint tests
  `weft-obs-6a4d71ddcb` (pre-existing, rc5 should not cut over red).

## Open questions / blocked-on-owner
- **Re-dogfood is ready to run** — fresh session in `~/lacuna`; every defect it re-tests is live in
  the installed builds; daemon healthy (pid 3247762).
- **Heddle next steps**: does the owner want the four falsifiable steps dispatched (to codex or a hub
  wave), or does heddle pause until after launch?
- **Wardline rc5 red taint tests** (`weft-obs-6a4d71ddcb`) — triage before cutover.
- **Stale claim**: `weft-ab0a6555f5` (conventions verification campaign) open/unassigned; Heddle spike
  `weft-e4589e6570` stays open as the go/no-go record. `weft-384929d1ad` closed by codex (verified).
- Launch cutover owner-reserved (PDR-0011); admission owner-reserved (doctrine §7 + PDR-0016).

## Last checkpoint did (2026-06-13)
- PDRs 0016–0019 recorded (admission bar; heddle not-ready + endorsement declined; codex-commit
  acceptance posture; redaction-invariant ruling).
- Dogfood-4 wave closed out: 6 more issues closed (A7, B7, B1, B2, B10, B9) + rec#2/rec#3 + epic;
  C-12/C-13 cells committed (b0eee6e, d141d41, b60a8f5); doctrine §7 quality bar (3c1bd28).
- All four members redeployed + filigree daemon bounced; north-star + duplication-guardrail readings.

## Next session, start here
1. **Re-dogfood `weft-a05b53edcd`** — fresh session in `~/lacuna`, full exercise, write the follow-up
   report; this produces the 4/4-joins north-star measurement.
2. **Owner's heddle call** (above) — then dispatch or park.
3. **Rust gold closeout `weft-7ee9bccbd7`** + wardline red-taint triage — the two launch gates not
   touched this wave.
4. **C-tail batch `weft-0b27444be7`** + dogfood-gate blockers (7 open) as capacity allows.
5. Hand gate+wave state to `/axiom-program-management` for cutover choreography.
