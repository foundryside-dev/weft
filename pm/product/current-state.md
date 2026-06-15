# Current State — Weft Federation        Checkpoint: 2026-06-16 (PDR-0025 temporal-correlation contract; PDR-0026 Warpline joins the cutover as 5th member; PDR-0027 decent-L1-on-gold-contracts definition of done)

> **Workspace path:** `pm/product/` (NOT the `docs/product/` default — `docs/` is
> gitignored here as the mkdocs build dir). Resume with `/own-product pm/product`.

## The reframe that now governs everything (PDR-0023/0024/0027)
**The federation IS the product; the glue is the value (PDR-0023).** Weft is one product —
a shared-identity, agent-native code-intelligence **spine** (SEI + honest, hub-blessed
seams); the members are components/proof-points. **The seams are the crown jewels.**
Provenance-honesty is the protected invariant (`weft-reason` = first hub-blessed contract).
**The fleet is the customer (PDR-0024):** two planes on the honesty invariant —
**coordination** (LOTO tag-out board, additive in filigree) + **sense-making** (L2
strategic-view MCP + agentic-macro clearing house).
**Definition of done (PDR-0027, NEW 2026-06-16):** **L1 is the foundation, not the finish
line.** Ship a **decent L1** (the five-member cutover suite + its frozen contracts), then
**take our time on L2** (the real ongoing product). Stop gold-plating L1. **The one
inviolate floor: the frozen cross-member contracts must be GOLD** — the dogfooding lesson is
that contracts are *absolutely inviolate*; a shipped-broken contract is a launch-blocker,
never acceptable "decent." There is no "month off" after L1; L2 is the next deliberately-
paced work.

## Mental model (the identity/continuity design in one image)
**The desk and the daily hire.** A **desk** is a *line of effort* (PM / program-mgmt /
web-dev) — stable, with dated handover notes (A′ stable handle + mechanism A). An
**employee** is one agent session — hired for a day, boots fresh, reads the desk's dated
handover folder (A), leaves. Different desks = deconfliction lanes; a **stomp** = one desk's
hire rifling another's half-finished work (B/C). **Pool axis:** fungible peers share a
whiteboard; coordination is an activity register (mechanism C, hook-fed); C anticipates, **B
catches mechanically** when a peer overrides the advisory.

## Operating model (PDR-0015) + authority lanes
**The pen is at the hub** until each member ships its next major; **codex is a second
autonomous stream** (accept via adversarial review + same-day remediation — PDR-0018).
**PDR-0020 launch-control boundary:** the program office may dispatch + accept residual
burn-down inside the admitted subordinate projects under launch control. **Owner-reserved:**
launch cutover scope/timing (PDR-0011 — exercised live this session via PDR-0026), member
admission + domain-authority grants (doctrine §7 — exercised via PDR-0025), vision/strategy
(PDR-0027 done-definition).

## The bet right now
**Now (build-priority): ship a decent L1 — the FIVE-member clean-break cutover
`weft-4b2f948f70`** (Filigree, Loomweave, Wardline, Legis, **Warpline** — pulled in per
PDR-0026). Framed by PDR-0023 (get the seams right) + PDR-0027 (decent, not perfect; **gold,
inviolate contracts**). Gates:
- **Critical path:** G14 `weft-8f1c6c512e` → GS-7 → Dogfood #2 → cutover (G15 closed).
- **Contract correctness = the gold floor** (PDR-0027) — the clean-break freeze makes the
  frozen cross-member contracts the one thing "decent" may never trade away.
- **Rust gold `weft-7ee9bccbd7`** (P1, PDR-0014) — gates the cutover.
- **Launch-branch test health:** Wardline `weft-2787ded4e1` + Loomweave `weft-41a1142165`
  (both cutover children, not yet touched).
- **Final whole-suite dogfood** is the readiness gate for the single coordinated five-member
  lever-pull; it evaluates whether Warpline needs another day or two (PDR-0026).
- Dogfood-4: 15/17 closed + deployed; re-dogfood `weft-a05b53edcd` closed (4/4 joins).
  C-tail papercuts `weft-0b27444be7` (P2) remain.
Metric: dogfood pass rate → successor seam-health/federation-value surface `weft-b6effe30f9`.

## Warpline (5th member — now IN the five-member cutover, PDR-0026)
- **Pulled INTO the cutover (PDR-0026, owner, 2026-06-16)** — reverses PDR-0022's
  fast-follow-outside posture. Live repo `~/warpline` v1.0.0; six frozen federation tool
  names; consumes `warpline.reverify_worklist.v1`. **Build-out matures to launch-grade
  baseline NOW, in parallel** with everyone's launch-lock prep — framed as *maturation to
  the baseline it would've had under regular circumstances*, NOT feature-creep or deferring
  the suite. Admission+contract record: `weft-e4589e6570`.
- **Temporal-correlation contract SPONSORED (PDR-0025, owner).** Warpline owns the
  temporal-episode axis (orthogonal to SEI); members stamp originating `branch@sha` as
  optional enrich-only metadata, joined read-time. No-broker line owner-confirmed.
  **Warpline's own side (local capture + reconstruction demo) is part of the parallel
  build-out now.** The cross-member stamp convention stays prove-the-need: hub-authored only
  after the demo proves out **on the squash-merge case** (load-bearing: SHA-rewrite ≠
  rename; candidate = a Legis merge-mapping). No sibling obligation freezes until then.

## Open questions / blocked-on-owner
- **Owner is relaying PDR-0025 approval to the Warpline session directly** (this session's
  hand-off; not dispatched by the hub).
- **Final whole-suite dogfood + Warpline readiness eval** (PDR-0026) — gates the lever-pull;
  if Warpline can't reach launch-grade in an acceptable window, owner decides
  hold-vs-revert-to-four+fast-follow (owner-reserved).
- **Warpline temporal-correlation demo** must bite the squash-merge case + define the
  episode boundary (≈ work-session) before any cross-member convention is authored.
- **Launch-branch test-health** — `weft-2787ded4e1` + `weft-41a1142165` block cutover.
- Launch cutover scope/timing + admission/authority grants remain owner-reserved.

## Last checkpoint did (2026-06-16)
- **Three owner rulings recorded:** PDR-0025 (sponsor Warpline temporal-correlation
  contract; no-broker confirmed; squash-merge demo condition + Legis merge-mapping
  candidate), **PDR-0026 (Warpline joins the cutover as the 5th member; five-member
  lever-pull, maturation-not-feature-creep)**, **PDR-0027 (decent L1 on gold/inviolate
  contracts; take time on L2 — the L1→L2 done-definition shift)**.
- **Propagated the five-member cutover into living canon:** doctrine.md (§1/roster/§status),
  members/warpline.md, registries/claims.md (C-1/C-14), registries/terminology.md, the
  cutover epic title `weft-4b2f948f70` (codex override) + a scope-change comment. Frozen
  interface-lock + dated session notes left untouched (audit trail).
- **Re-synced this brief** off the 06-14 snapshot that had drifted behind PDR-0023/0024.

## Next session, start here
1. **Decent-L1 five-member cutover** — critical path G14 `weft-8f1c6c512e` → GS-7 →
   Dogfood #2; Rust gold `weft-7ee9bccbd7`; test-health gates `weft-2787ded4e1` /
   `weft-41a1142165`. Hold the **contract gold floor**; stop gold-plating above it.
2. **Final whole-suite dogfood** as the five-member readiness gate (Warpline +1-2 days?).
3. **Seam-health/federation-value surface `weft-b6effe30f9`** — PDR-0023 central feature /
   successor scoreboard.
4. **Warpline parallel build-out** incl. the PDR-0025 temporal-correlation local capture +
   demo (squash-merge gate).
5. **L2 (post-decent-L1):** PDR-0024 coordination + sense-making planes — the deliberately-
   paced next body of work, NOT to cannibalize the L1 ship.
6. Hand gate+wave state to `/axiom-program-management` for cutover choreography.
