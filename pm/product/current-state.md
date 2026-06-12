# Current State — Weft Federation        Checkpoint: 2026-06-12 (docs sync + G1 verified)

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

## The bet right now
**Now:** gold-standard clean-break launch (PDR-0011 + PDR-0014) — two-gate structure:
- **Dogfood gate** (`weft-cd62a4da9b`): contract-correctness class + conformance oracle — 8 open
  items. Unblocks dogfood #2.
- **Cutover gate** (`weft-4b2f948f70`): additionally blocks on **Rust gold** (`weft-7ee9bccbd7`,
  P1, PDR-0014). Rust physically rides the release branches now; owner ruled gate-on-gold.
Wave-sequenced (`pm/2026-06-10-gold-standard-launch-sequencing.md`), **owner dispatching live.**
Metric: dogfood-pass rate + enrich-only / tree-cleanliness guardrails (metrics.md).

## In flight
- **Dogfood gate `weft-cd62a4da9b` — 7 open blockers (G5 CLOSED 2026-06-09, G1 CLOSED
  2026-06-12):** G13 `weft-61d27fb808` · C-4 `weft-eb3dee402f` · oracle umbrella
  `weft-1e053eac02` · G9
  `weft-94284025f5` / G11 `weft-c7e3486246` / G15 `weft-045076e30f` / G18 `weft-eef2fa8bbb`.
  Dispatch rule: every contract fix = producer + consumer + golden vector, per seam, never per repo.
- **Rust gold closeout `weft-7ee9bccbd7`** (P1, blocks cutover `weft-4b2f948f70` — NOT the dogfood
  gate). **PDR-0014 (2026-06-11) reversed PDR-0012's envelope call** — the frontier sprint (Fable 5
  + Opus 4.8) merged the Rust line into release branches (wardline rc5, loomweave rc4) before the
  checkpoint; owner ruled gate-on-gold. Done-means: 4 clarion collision families closed
  (`clarion-8ff7f233fa` / `clarion-fa8bcf8731` / `clarion-bdb1eccf48` / `clarion-83870dc534` — last
  likely closed by Amendment 9 `f7f8a69`, verify first), qualname_check oracle 0 across corpora,
  gold verdict re-issued, ADR-049 amendments in wardline lockstep.
- **ADR-049 freeze posture** — `weft-dfeb20c4fa` (child of the oracle umbrella): freeze-set must
  enumerate ADR-049 as out-of-freeze, versioned with the Rust feature (PDR-0012 posture STANDS).
- **Rust line epic `weft-9823a04785`** — gates the CUTOVER (PDR-0014), no longer post-launch.
- **Quarantine forensics** — `weft-df29917f29` (hub) / `clarion-2c959a059e` (loomweave): mine the
  rogue-agent branch for the B spike BEFORE salvage-or-discard. Branch must not be deleted first.
- **Board stale-in-done** — C-1/WL-1/FIL-2/LW-1/C-2/C-9/LEG-1/2/3 shipped on release branches, held
  short of closed until cutover (source-fixed ≠ live-fixed). ~252 truly-unmerged commits across four
  release branches; **the merge/cutover choreography is the biggest unscheduled item** → hand the
  gate + wave nomination to `/axiom-program-management` for the formal dependency model + forecast.

## Post-launch stack (PDR-0013 — committed order, Rust removed — now gates cutover per PDR-0014)
1. **Build A → A′ → B** (PDR-0008); B's design spike consumes the quarantine forensics.
2. **Instrument the scoreboard** `weft-6636667996` (dogfood pass rate lands DURING dogfood #2).
3. **Mechanize close-the-loop** `weft-ff30fd979f` (scope decided at A's scoping — fold-in vs alone).
4. **Cross-project ticket coordination** — promoted bench → Next.
Discovery queue: **Heddle spike `weft-e4589e6570` first**, then **propagation/live-state ledger
spike `weft-61c24f622e`** (default hypothesis: legis feature, not a new member). Standing admission
bar in roadmap.md (dogfood evidence + grep test + enrich-only + doctrine + hook-fed).

## Open questions / blocked-on-owner
- **Launch cutover is owner-reserved** (PDR-0011) — PM sets the bar and coordinates; owner pulls
  the trigger.
- **New-member admission is owner-reserved** (doctrine §7) — fires only if Heddle/propagation
  spikes return "go, and it's a member not a feature."
- **ADR-049 escalation trigger** (PDR-0012): if oracle review finds launch artifacts embedding
  dialect assumptions, ADR-049 becomes launch-gating → escalate.
- **Legis working tree** has uncommitted skill-file edits (`.agents/` + `.claude/` resync) — member
  housekeeping, flag to whoever works legis next.
- **B design-spike open inputs** (carried): self-write suppression, hunk-vs-file granularity,
  multi-file transactions, non-Write-path tripwire, worktree scope (the 2026-06-09 stomp crossed
  one; check whether the quarantine case did too), keep/forget classifier tiering + whitelist +
  Tier-2 latency budget, claim-binds-to-handle vs event-binds-to-run-id, spawn-context source.

## Last checkpoint did (2026-06-11)
- Resumed + reconciled 2026-06-10 (whole-federation evaluation; grant re-confirmed verbatim).
- **G5 (`weft-7436c1959e`) CLOSED + fully documented** — emit remediation APPLIED + end-to-end
  verified (commit `0a6dfc1`). Was "NOT applied" in prior brief; corrected.
- **PDR-0014 (2026-06-11)**: PDR-0012 reversal trigger fired — frontier sprint (Fable 5 + Opus
  4.8) merged Rust line into release branches; owner ruled gate-on-gold; `weft-7ee9bccbd7` filed
  (P1, blocks cutover `weft-4b2f948f70`). Rust is no longer post-launch.
- **G1 (`weft-37455bf407`) CLOSED 2026-06-12**: Wardline/Legis source contains the
  required `findings` key contract, and the current rc5 tips passed the cross-member
  vector checks: `uv run pytest tests/contract/weft/test_wardline_scan_artifact_contract.py
  tests/wardline/test_ingest.py -q` in `~/legis` (41 passed) and
  `uv run pytest tests/conformance/test_legis_scan_wire_golden.py
  tests/conformance/test_legis_intake_contract.py
  tests/conformance/test_legis_artifact_contract_freeze.py -q` in `~/wardline` (25 passed).
- **Stale claims** (weft-pm): `weft-ab0a6555f5` + `weft-384929d1ad` expired >48h; Heddle spike
  `weft-e4589e6570` expires tonight — release or reclaim.
- **conventions.md C-11** (config-write discipline) drafted from config-write audit — unstaged.
- **Prior PDR-0012/0013 filing** (2026-06-10): Rust epic `weft-9823a04785`, ADR-049
  `weft-dfeb20c4fa`, quarantine counterparts, propagation/scoreboard/close-the-loop spikes filed.

## Next session, start here
1. **Release stale weft-pm claims** — `weft-ab0a6555f5`, `weft-384929d1ad`, and evaluate
   `weft-e4589e6570` (Heddle, in_progress, expires tonight): release or reclaim with heartbeat.
2. **Rust gold closeout coordination (`weft-7ee9bccbd7`)** — first check whether
   `clarion-83870dc534` is already closed by Amendment 9 (`f7f8a69`, loomweave 2026-06-11 05:36);
   then track the other 3 collision families (`clarion-8ff7f233fa`, `clarion-fa8bcf8731`,
   `clarion-bdb1eccf48`) to closure. Coordinate with loomweave's live working stream (uncommitted
   qualname.rs/extract.rs edits in flight — do NOT work around it).
3. **Hand the gate + wave doc to `/axiom-program-management`** — formal dependency model +
   cutover choreography. Now has TWO gates (dogfood 7 open blockers + Rust gold), both needed.
4. **Commit conventions.md** (C-11 config-write discipline, unstaged) + uncommitted pm/ files.
5. **B design-spike brief** — quarantine forensics (clarion-2c959a059e) first.
6. Launch keeps *build* priority; 2–4 above are coordination/cleanup work and run in parallel.
