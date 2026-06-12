# Current State — Weft Federation        Checkpoint: 2026-06-12 (dogfood-4 triage + seam restoration; PDR-0015 pen-to-hub)

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

## Operating model (NEW — PDR-0015, owner ruling 2026-06-12)
**The pen is at the hub** until each member ships its next major: all member-repo changes are
decided and executed from the weft hub PM session; implementation issues file in the HUB tracker;
the hub↔member counterpart convention is suspended for new work. Member pens return per-member at
their next major release.

## The bet right now
**Now:** gold-standard clean-break launch (PDR-0011 + PDR-0014) — the cutover `weft-4b2f948f70`
now has THREE gates:
- **Dogfood gate** (`weft-cd62a4da9b`): contract-correctness class + conformance oracle — 7 open.
- **Rust gold** (`weft-7ee9bccbd7`, P1, PDR-0014).
- **Dogfood-4 seam restoration** (`weft-384c0a8772`, NEW 2026-06-12): the three cross-member seams
  are FIXED (A3/A4, A5, A6 all closed same-day); the gate now rests on the re-dogfood
  `weft-a05b53edcd` (READY — all blockers closed).
Metric: dogfood-pass rate — **first real reading landed** (joins 1/4 live pre-fix; target 4/4 at
re-dogfood; metrics.md 2026-06-12).

## In flight
- **Dogfood-4 wave (epic `weft-384c0a8772` + siblings), 2026-06-12:** 17 issues filed from the
  friction report (`~/lacuna/docs/dogfood/2026-06-12-weft-federation-friction-report.md`),
  **9 closed same-session** — A3/A4 `weft-d0df42c739` (wardline URL-dialect parser, rc5 be430be7 +
  hub contract in federation-topology.md 0596f73), A5 `weft-c7db813d9a` (loomweave minted-token
  rung, rc4 9fe2be2), A6 `weft-cca2ecbe12` (legis outputSchema type:object, rc5 8820ed3), A1
  `weft-6090d9f76d` (autofix root-resolve), A2 `weft-9784d0e654` (legis per-file degrade on hostile
  nesting), B6 `weft-74200b0acf` (summary_only artifact opt-in), B8 `weft-dc7b805dc4` (doctor
  effective-config provenance), B3/B4 `weft-ecc7c34255` (stats blocked parity; close-default ruled
  by-design), B5 `weft-ac8a276e28` (search matches labels).
  **All four tools reinstalled** (wardline/legis cache-busted, loomweave wheel rebuilt — BuildID
  verified, filigree package). **Filigree daemon at :8749 still serves OLD code until restarted.**
- **Dogfood-4 remaining open:** A7 rekey false-orphan `weft-dda1a6d8dd` · B1 freshness oracles
  `weft-4165f1ed71` · B2 dead-list `weft-3fb0f5dfc7` · B7 explain_taint `weft-0d24cf9152` · B9
  ADR-029 loop `weft-4a46553503` · B10 dedup `weft-7256739b31` · C-tail `weft-0b27444be7` ·
  conventions rec#2 `weft-76abb3553e` / rec#3 `weft-b181c75e39` · **re-dogfood `weft-a05b53edcd`
  (READY, runs in a FRESH session in ~/lacuna)**. Emit-liveness check `weft-c7511201ed` unblocked.
- **Dogfood gate `weft-cd62a4da9b` — 7 open blockers** (unchanged today): G13 `weft-61d27fb808` ·
  C-4 `weft-eb3dee402f` · oracle umbrella `weft-1e053eac02` · G9 `weft-94284025f5` / G11
  `weft-c7e3486246` / G15 `weft-045076e30f` / G18 `weft-eef2fa8bbb`.
- **Rust gold closeout `weft-7ee9bccbd7`** (P1, blocks cutover): verify `clarion-83870dc534` vs
  Amendment 9 (`f7f8a69`), then 3 remaining collision families. (Untouched today.)
- **Quarantine forensics** `weft-df29917f29` / `clarion-2c959a059e` — branch must not be deleted.
- **Board stale-in-done** — release-branch fixes held short of closed until cutover; merge/cutover
  choreography remains the biggest unscheduled item → `/axiom-program-management`.

## Open questions / blocked-on-owner
- **One-liner for owner:** open a fresh session in `~/lacuna` and confirm `mcp__legis__*` tools
  appear (the only A6 check a running session can't perform).
- **Filigree daemon restart** (:8749) needed to serve today's filigree fixes — owner timing; a
  restart drops live sessions' MCP connections.
- **wardline rc5 carries 7 pre-existing red taint tests** (observation `weft-obs-6a4d71ddcb`) —
  launch branch should not cut over red; triage to the taint work-stream.
- **Launch cutover is owner-reserved** (PDR-0011); **new-member admission owner-reserved**
  (doctrine §7); **ADR-049 escalation trigger** (PDR-0012) unchanged.
- **Stale weft-pm claims** (carried from 2026-06-11, still unreleased): `weft-ab0a6555f5`,
  `weft-384929d1ad`, Heddle `weft-e4589e6570` — release or reclaim.
- **Legis working tree**: pre-existing uncommitted `.agents/`/`.claude/` skill-file edits (left
  untouched today; my commits were scoped to src+tests).

## Last checkpoint did (2026-06-12)
- **PDR-0015** recorded + committed (`ac9aee1`): pen moves to hub until next majors (owner ruling).
- **Dogfood-4 report** committed in lacuna (`c9d407f`); triaged into 17 hub issues; cross-linked to
  the dogfood-3 X-series and bounded-by-default convention with evidence comments.
- **All three launch-gating seams fixed, tested, committed, and deployed same-day** (wardline rc5
  ×4 commits, loomweave rc4 ×1, legis rc5 ×2, filigree release/3.0.0 ×2); re-dogfood unblocked.
- **First instrumented north-star reading** (metrics.md): joins 1/4 live pre-fix; verdicts 3/4.
- Hub contract recorded: federation-topology.md "One value, every route" (--filigree-url
  derivation dialects).

## Next session, start here
1. **Re-dogfood `weft-a05b53edcd`** — fresh session in `~/lacuna` (picks up new MCP servers):
   verify legis tools surface, all four joins live, then re-run the full exercise per the task.
   Restart the filigree daemon first (owner ack).
2. **Release stale weft-pm claims** (`weft-ab0a6555f5`, `weft-384929d1ad`, `weft-e4589e6570`).
3. **Rust gold closeout coordination** (`weft-7ee9bccbd7`) — unchanged plan from 2026-06-11.
4. **Remaining dogfood-4 tail** — A7/B1/B2/B7/B9/B10 + conventions rec#2/rec#3 + C-tail; then the
   emit-liveness check `weft-c7511201ed` (now unblocked) lands the enforcement.
5. **Hand the gate + wave doc to `/axiom-program-management`** — now THREE cutover gates.
