# Current State — Weft Federation        Checkpoint: 2026-06-16 (PDR-0025 Warpline temporal-correlation contract sponsored; current-state re-synced to the PDR-0023/0024 reframe it had drifted behind)

> **Workspace path:** `pm/product/` (NOT the `docs/product/` default — `docs/` is
> gitignored here as the mkdocs build dir). Resume with `/own-product pm/product`.

## The reframe that now governs everything (PDR-0023 + PDR-0024, 2026-06-15)
**The federation IS the product; the glue is the value (PDR-0023, Adopted).** Weft is one
product — a shared-identity, agent-native code-intelligence **spine** (SEI + honest,
hub-blessed seams) — of which the five tools are components/proof-points. **The seams are
the crown jewels: a broken join is the *product* broken, not a peripheral bug.**
Provenance-honesty is the protected invariant (the moat-guard; `weft-reason` vocab is the
first hub-blessed contract). **The fleet is the customer (PDR-0024, CANDIDATE):** the
federation serves a *fleet* of agents via two planes on the honesty invariant — a
**coordination plane** (LOTO tag-out board, additive in filigree for now) and a
**sense-making plane** (L2 "strategic-view" MCP + agentic-macro clearing house). Hub owns
the alphabet; agents write the words; new cross-member contracts stay hub-blessed.

## Mental model (the identity/continuity design in one image)
**The desk and the daily hire.** A **desk** is a *line of effort* (PM / program-mgmt /
web-dev) — stable, with a nameplate and a drawer of handover notes (= A′ stable handle +
mechanism A). An **employee** is one agent session — *hired for a day, never rehired*:
boots fresh, reads the desk's dated handover folder (A) rather than reconstructing, leaves
(minted per-session run id). Different desks are deconfliction lanes; a **stomp** is one
desk's hire rifling another's half-finished work (B/C). **Second axis — the pool:** fungible
peers share a whiteboard; *who you are* carries no signal — coordination is an activity
register (mechanism C, hook-fed). C anticipates; **B catches mechanically** when a peer
overrides the advisory.

## Operating model (PDR-0015) + authority lanes
**The pen is at the hub** until each member ships its next major; **codex is a second
autonomous stream** (accept via adversarial review + same-day remediation, never blind —
PDR-0018). **PDR-0020 launch-control boundary:** the program office may dispatch + accept
residual burn-down inside the four admitted subordinate projects under launch control
(Filigree, Loomweave, Wardline, Legis). **Owner-reserved:** launch cutover (PDR-0011),
member admission + domain-authority grants (doctrine §7), vision/strategy. The owner
exercised the authority-split lane live this session (PDR-0025).

## The bet right now
**Now (build-priority): gold-standard clean-break launch — the four-member lockstep cutover
`weft-4b2f948f70`** (Filigree, Loomweave, Wardline, Legis). Under PDR-0023 this is now
framed as *getting the seams right before the clean break freezes them*. Gates:
- **Critical path:** G14 `weft-8f1c6c512e` → GS-7 → Dogfood #2 → cutover (G15 closed).
- **Rust gold `weft-7ee9bccbd7`** (P1, PDR-0014) — gates the cutover; reversal trigger if
  the 27 residual SEI collisions prove ADR-049-design-limit-shaped.
- **Launch-branch test health:** Wardline red taint tests `weft-2787ded4e1` + Loomweave
  load-flaky coalescing `weft-41a1142165` — both cutover gates, not yet touched.
- **Dogfood:** 15/17 dogfood-4 closed + deployed; post-fix re-dogfood `weft-a05b53edcd`
  closed with all four joins passing. C-tail papercuts `weft-0b27444be7` (P2) remain.
Metric: dogfood pass rate (1/4 joins pre-fix → 4/4 expected); successor scoreboard is the
seam-health/federation-value surface `weft-b6effe30f9` (PDR-0023 central feature).

## Warpline (5th member, admitted — impl OUTSIDE the cutover)
- **Admitted (PDR-0016/0022)** as the temporal/change-impact authority; live repo
  `~/warpline` v1.0.0, six frozen federation tool names, consumes
  `warpline.reverify_worklist.v1`. Implementation is a **fast-follow OUTSIDE the four-member
  cutover**. Admission+contract record: `weft-e4589e6570`.
- **NEW — temporal-correlation contract SPONSORED (PDR-0025, owner, 2026-06-16).** Warpline
  owns the temporal-episode axis (orthogonal to SEI); members stamp the originating
  `branch@sha` on emitted events as optional enrich-only metadata, joined read-time. The
  Rung-3 / sense-making-plane mechanism. **No-broker line owner-confirmed.** Authorized now:
  Warpline-local capture + reconstruction demo, **sequenced behind launch + base impl**. The
  cross-member stamp convention is hub-authored only after the demo proves out — **on the
  squash-merge case** (load-bearing: SHA-rewrite ≠ rename; candidate = a Legis merge-mapping).
  No sibling obligation freezes until then.

## Open questions / blocked-on-owner
- **Owner is relaying PDR-0025 approval to the Warpline session directly** (this session's
  hand-off; not dispatched by the hub).
- **Warpline temporal-correlation demo** must bite the squash-merge case + define the
  episode boundary (≈ work-session) before any cross-member convention is authored.
- **Launch-branch test-health triage** — `weft-2787ded4e1` + `weft-41a1142165` block cutover.
- **Critical path** sits at G14 `weft-8f1c6c512e`.
- Launch cutover + admission/authority grants remain owner-reserved.

## Last checkpoint did (2026-06-16)
- **Ruled on the Warpline "Temporal Correlation Spine" proposal:** owner sponsored the
  contract in full + confirmed the no-broker line → recorded **PDR-0025** (Adopted).
- Verified the proposal's doctrine claims against source (§5/§10, uri-scheme closure,
  PDR-0021 rename boundary); caught + recorded the **squash-merge ≠ rename** gap as the
  load-bearing demo condition, with a Legis merge-mapping candidate.
- **Re-synced this brief to PDR-0023/0024**, which it had drifted behind (the "always
  surprised" cause). Roadmap Warpline bet stamped with PDR-0025; tracker `weft-e4589e6570`
  retitled off the dead "Heddle" placeholder + commented with the ruling.

## Next session, start here
1. **Launch cutover critical path** — G14 `weft-8f1c6c512e` → GS-7 → Dogfood #2, plus the
   two launch-branch test-health gates `weft-2787ded4e1` / `weft-41a1142165` and Rust gold
   `weft-7ee9bccbd7`. This is still the Now build-priority.
2. **Seam-health/federation-value surface `weft-b6effe30f9`** — PDR-0023's central feature
   and the successor scoreboard; shape as launch dispatch settles.
3. **Warpline fast-follow** — base impl, then the PDR-0025 temporal-correlation demo
   (squash-merge gate). Behind the cutover.
4. **C-tail batch `weft-0b27444be7`** as capacity allows.
5. Hand gate+wave state to `/axiom-program-management` for cutover choreography.
