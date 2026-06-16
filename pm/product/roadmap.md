# Roadmap — Weft Federation            Updated: 2026-06-16 (PDR-0025 temporal-correlation contract; PDR-0026 Warpline joins the cutover; PDR-0027 decent-L1-on-gold-contracts; PDR-0028 Tabard *who*-coordinate — gap-named, home provisional)

> Sequencing, WSJF / cost-of-delay, and dated forecasts are produced by
> /axiom-program-management. This file records bets as INTENT, not a delivery
> schedule. Do not compute WSJF here; hand the committed bet over for sequencing.

## Now  (committed, in-flight)
- **Ship a decent L1 — the coordinated FIVE-member clean-break launch (PDR-0026/0027).**
  L1 is the foundation, not the finish line: ship it *decent*, not perfect, then take our
  time on L2 (PDR-0027). **The one gold, inviolate floor is contract correctness.** The
  suite ships once every member passes its lacuna dogfood, `make ci` is green, *and* the
  federation interface audit's contract-correctness class + executable conformance oracle
  close — because the clean break (no backcompat) **freezes the cross-member API** and the
  dogfooding lesson is that frozen contracts are *absolutely inviolate* (PDR-0011/0027). A
  shipped-broken contract is a launch-blocker; everything *above* the solid core ships at
  decent — stop gold-plating. The cutover is **five-member** (Filigree, Loomweave, Wardline,
  Legis, Warpline — PDR-0026). · tracker: `weft-cd62a4da9b` · **gated on**
  G1 `weft-37455bf407` + G5 `weft-7436c1959e` + G13 `weft-61d27fb808` + the oracle umbrella
  `weft-1e053eac02` + C-4 `weft-eb3dee402f` + the contract cousins **G9 `weft-94284025f5` /
  G11 `weft-c7e3486246` / G15 `weft-045076e30f` / G18 `weft-eef2fa8bbb` (wired 2026-06-10, all
  P2)** · metric: dogfood-pass rate + enrich-only guardrail (metrics.md). Audit:
  `pm/2026-06-10-federation-interface-audit.md`. Wave order:
  `pm/2026-06-10-gold-standard-launch-sequencing.md` (dispatch live; contract fixes are
  producer+consumer+golden-vector units per seam). **Rust gold closeout `weft-7ee9bccbd7` (P1)
  now gates the CUTOVER `weft-4b2f948f70` — PDR-0014 (2026-06-11) reversed PDR-0012's
  out-of-envelope call** (frontier sprint merged Rust into release branches; owner: gate-on-gold).
  ADR-049 dialect declared out-of-freeze via `weft-dfeb20c4fa`; the out-of-freeze posture STANDS.
  G5 `weft-7436c1959e` **CLOSED** (emit topology applied + verified, commit `0a6dfc1`).
- **Warpline build-out — now IN the five-member cutover (PDR-0026).** Warpline is an
  **admitted federation member** (5th member, 2026-06-14, PDR-0022, reversing PDR-0017), the
  suite's **temporal / change-impact authority** ("what changed, when, and what does this change
  touch") and the read-side complement to mechanism B ("if I touch X, what breaks?" — today
  answered by grep-plus-hope or human blast-radius review = supervision load). Renamed
  heddle → warpline; live repo `~/warpline`, six frozen federation tool names, consumes
  `warpline.reverify_worklist.v1`. Per PDR-0026 (2026-06-16) Warpline is **pulled into the
  five-member cutover** (reversing the fast-follow-outside posture); its build-out matures to
  launch-grade baseline **now, in parallel** with launch-lock prep — maturation to its proper
  baseline, NOT feature-creep or deferring the suite — gated by the final whole-suite
  dogfood. · admission record: `weft-e4589e6570`.
  - **Temporal-correlation contract — SPONSORED (PDR-0025, owner, 2026-06-16).** Warpline
    owns the temporal-episode axis (anchor semantics, granularity, reconstruction); members
    stamp the originating `branch@sha` on emitted events as optional enrich-only metadata,
    joined read-time. The mechanism behind Warpline Rung 3 (empirical blast radius) and a
    concrete instance of PDR-0024's sense-making plane. No-broker line owner-confirmed.
    Warpline's own side (local capture + reconstruction demo) is part of the **parallel
    build-out now** (PDR-0026); the cross-member stamp convention stays prove-the-need —
    hub-authored only after the demo proves out **on the squash-merge case** (load-bearing
    gate — SHA-rewrite ≠ rename; PDR-0021/PDR-0025). No sibling obligation freezes until then.

## Next (shaped, decreasing certainty)
- **Agent continuity & write-safety** — **SIGNED OFF 2026-06-09 (PDR-0008);** shape & sequence
  committed, build follows launch. Consolidated proposal:
  `pm/2026-06-09-agent-continuity-write-safety-PROPOSAL.md` (+ annex). Reshaped by agent
  user-research (PDR-0003; discovery in `pm/2026-06-09-agent-identity-discovery-interviews.md`).
  Identity-free, path/activity-keyed mechanisms; personas / advisory lanes / the Tabard
  dependency all **dropped**. **All four mechanisms are now weft features — B is built in-house as
  Claude Code hooks (PDR-0009), so the bet has NO external dependency and the upstream escalation
  is withdrawn.** *Authorised next (no further sign-off): the B/A′ design-spike brief and scoping
  A+A′ — design work parallel to launch.*
  - **A — reconciled handover** (sha-stamped, path-keyed, intent + verification-status +
    raw diff, TTL; *no* staleness inference): a **filigree feature** on `filigree-c2009921cf`
    (session/run) + `get_session_changes` + `reconciliation_debt_list`. Cheap → ships
    first *because it's nearly free*. · metric: time-to-orient (metrics.md).
  - **A′ — actor-identifier assignment (P3, PDR-0005)** — the *assignment side* of the same
    `filigree-c2009921cf` object: filigree **mints a per-session run id** (replaces free-text
    `--actor`, kills the "everyone is `claude`" collision); claims/continuity bind to a stable
    handle from **spawn context** (operator label / worktree / harness). *Have-a-non-colliding-id*
    (cheap, here); *trust-the-id* = Tabard (Later). Ships with A.
  - **B — pre-write compare-and-swap guard** (hunk-level, self-write-suppressed,
    transaction-aware, working-tree tripwire): the correctness fix + the operator's actual
    pain. **Built in-house as Claude Code hooks** (PreToolUse on Edit/Write + Bash) with state in
    **filigree**; a two-tier **keep/forget classifier** (preset whitelist → lightweight-LLM
    fallback) does self-write-suppression + activity-filtering (PDR-0009). *No upstream
    dependency; the escalation is withdrawn.* Higher severity/risk → **design-spike NOW, in
    parallel**; build after. · metric: stomp interventions → 0 (metrics.md).
  - **C — entity presence for avoidance** (PDR-0007/0010): a **loomweave-entity-keyed** (file
    fallback, enrich-only) presence/intent marker — "someone's on `walk_calls`" — **hook-emitted
    from *keep* events** (can't rot, classifier-filtered so not spammy) for *predictive* avoidance;
    composes with B (anticipate cheaply / catch mechanically). **Advisory, NOT operator-cleared
    exclusive locks** (those rebuild the human backstop — PDR-0004 — and miss non-opt-in stomps);
    a deliberate hard-lock survives as a rare explicit opt-in. Build when pools are real.
  Now-bet (launch) keeps *build* priority; B's spike is design work and runs parallel.
- **Make the loop honest — scoreboard + close-the-loop (PDR-0013, post-launch items 2–3).**
  Instrument the product scoreboard (`weft-6636667996`: dogfood pass rate lands *during* dogfood
  #2; stomp tally + time-to-orient baselines before A/B ship) and mechanize close-the-loop
  (`weft-ff30fd979f`: hook-fed work-state advance on ship/merge — the stale-board problem is a
  product gap in filigree's domain, not a process failure; scope decided at A's scoping). These
  outrank any new tool. · metric: every metrics.md row gets a dated instrumented reading.
- **Rust analyzer line — NOW GATES THE CUTOVER (PDR-0014, not post-launch)** — frontier sprint
  merged into release branches (wardline rc4, loomweave rc5); 27 residual SEI collisions across 4
  families block gold (`weft-7ee9bccbd7`, P1, hub). Hub epic `weft-9823a04785`. Done-means: 4
  clarion tickets closed, qualname_check oracle 0 across pinned corpora, gold verdict re-issued,
  ADR-049 amendments in wardline lockstep. Reversal trigger in PDR-0014: if families prove
  ADR-049-design-limit-shaped, reopen the ship-dark option with the owner.
- **Cross-project ticket coordination — promoted from the bench (PDR-0013).** Cascade a hub
  ticket's children into member trackers + safe cross-DB addressing (**federated**, NOT a shared
  hub store — doctrine §6). Evidence: counterpart convention sustained by hand (19/27 manual);
  the Rust line proved real work spans members invisibly. Builds on ADR-029 entity associations +
  the counterpart convention. Concept: `pm/2026-06-09-cross-project-ticket-coordination-concept.md`.
  · metric: counterpart filing becomes mechanical (0 manual sweeps).

## Later (directional bets, no order, no dates)
- **Tabard — the actor-identity authority (the *who* coordinate)** — *advanced 2026-06-16;
  still Later/provisional.* Project stood up at `~/tabard`; owner ruled it the sixth member
  **by gap-naming** (the *who* coordinate is named; the implementation is a Phase-0 spike, not
  built — hub **PDR-0028, proposed**). Identity model designed but **CAPTURED, not decided**
  (sober read pending — `pm/2026-06-16-background-ticket-change-debt-IDEA.md`): body/tabard/seal,
  assignment-as-principal, and the hierarchical **session-prefix identifier**
  (`model+body+time`±ticket) that made attribution always-available and **retired the fragile
  auto-bake/daemon machinery**. **HOME is OPEN/provisional** — separate member vs fold the Seal
  into Loomweave/Legis vs mostly-a-convention+small-Seal; the spike + key-custody review decide.
  Readiness panel (6 members): `pm/2026-06-16-identity-north-star-readiness.md`. Gates the
  doctrine §2/§6 filing (owner-gated, uncommitted). Origin:
  `pm/2026-06-06-agent-identity-component-plan.md`.
- **Propagation/live-state ledger** — "what is actually built/installed/live where" (PDR-0013 #2,
  spike `weft-61c24f622e`). Three independent source-fixed ≠ live-fixed incidents. Default
  hypothesis: a **legis feature**, not a new member; hook-fed, enrich-only, grep-test gated.
- **Shuttle** — change-execution (must follow attribution; you cannot safely execute
  a change without first attributing who authorized it). **Standing doctrine flag (PDR-0013):**
  closest of all candidates to the central-orchestrator anti-goal — when shaped, the burden of
  proof is on showing it is deconfliction substrate, not a controlling runtime.
- **Cross-host federation** — the HTTP/cross-host half of verified-actor + emit.

> **Admission bar for any new tool/member (PDR-0013, standing):** dogfood-pain evidence; the grep
> test (agents *prefer* it unprompted, measured); enrich-only; doctrine fit (§6/§7 — admission
> itself is owner-reserved); hook-fed over discipline-fed. The suite's own dogfood nominates the
> next member.
