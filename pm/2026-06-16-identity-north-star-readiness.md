# Identity North-Star — Federation Readiness Report

> Source: workflow wf_06decfc0-bfd (2026-06-16), 6 product-owner readiness assessments + hub-PM consolidation. CAPTURED-IDEA assessment — not a decision. Raw per-project assessments appended below the report.

This is a synthesis task — I have all six assessments in hand. No tools needed; I'll write the report directly.

# Identity North-Star — Federation Readiness Report

## Bottom line
The federation is **further along than the north-star assumes — and the design is sound in skeleton but wrong in three load-bearing places.** The WHAT (Loomweave) and WHEN (Warpline) coordinates are already built, shipped, and conformance-proven without touching a frozen contract; Filigree's assignment-as-principal (claim + lease + CAS + heartbeat) is in production. So the spine the design treats as aspirational is largely real. The biggest surprises are all *corrections* the members surfaced: (1) the design's flat "hooks never reject; the only hard stop is the collision guard" rail is already false in the suite three times over — Loomweave fail-closes identity minting, Legis ships a graded block-and-escalate 2x2, and Wardline IS a rejecting gate by design; (2) the triad is missing a fourth axis — Wardline's "identified but unproven" honesty gap and Warpline's false-precision failure mode show that having WHO+WHAT+WHEN present does not make an answer true; (3) the auto-bake/background-ticket rail (#4) is architecturally backwards, contradicts assignment-as-principal, and Tabard itself argues it manufactures a principal by fiat. The idea needs **rework, not rejection**: keep the three-coordinate skeleton, but demote the never-reject rail to a per-layer rule, add an orthogonal honesty axis, and seriously reconsider auto-bake. The one member that authors the actual gap the whole proposal exists to fill — Tabard, the WHO coordinate — has zero code and an unrun Phase-0 spike, so the north-star's named payoff remains entirely unproven.

## Readiness at a glance

| Project | Distance | Headline |
|---|---|---|
| Loomweave | close | Already IS the WHAT authority (minted SEIs, append-only lineage, SEI-keyed sibling contracts shipped + frozen); work is seam-fit, not build-out — but it fail-closes identity (honestly breaks continuity), carries its own change timeline overlapping WHEN, and owns the path→locator rename derivation WHEN quietly depends on. |
| Warpline | close | Closest fit — WHEN coordinate already built (anchor columns, COP frame resolution, honest squash-merge degradation) without a frozen-contract edit, owner-ratified (PDR-0025); remaining work is ratifying the episode boundary, frozen-surfacing branch_sha, the unsolved SHA-rewrite reconciliation, and the hub-authored stamping convention — all gated BEHIND launch. |
| Filigree | moderate | Most-ready Tabard host — assignment-as-principal already shipped, seam self-ratified (PDR-0004/PRD-0001) — but the three named deliverables (assurance-tier field, collision-guard board, Legis auto-bake) are unbuilt, `verified_actor` already means OS-user, and auto-bake points the wrong way against its outbound-only Legis seam and observe-only hooks. |
| Wardline | moderate | Already names the WHO-gap verbatim in its own attest source and proves WHAT+WHEN can be carried while WHO stays a hole — but it is a deliberately rejecting, zero-dependency gate, so it cannot host an Ed25519 SEAL in its base and clashes with the never-reject rail: the triad's best validator and its sharpest counterexample at once. |
| Legis | moderate | Already owns the SEI-keyed rename-surviving post-facto audit spine and a shipped graded-enforcement 2x2 — but commit-detection→auto-bake and the collision guard are unbuilt, doctrine §6 forbids the daemon, and the WHO coordinate it needs is contractually Tabard's (a sixth member with no code). |
| Tabard | far | Authored the WHO coordinate in spec but has zero code and an unrun open Phase-0 spike — a position, not an implementation. |

## Cross-cutting blockers

**Critical path: Tabard (WHO) is the gating unknown.** Tabard is a Phase-0 spike that may NO-GO, with no code, an unrun spike, owner-reserved key custody, an unfiled doctrine §2/§6 amendment, and a not-yet-hub-blessed canonical handle that three consumers (Filigree, Warpline, Wardline — also Legis) are waiting on. Every member that touches WHO correctly refuses to freeze a Tabard-binding seam until Tabard exists (prove-the-need). So the north-star's headline payoff — a *certified* WHO — is blocked on the one member with nothing built, and Filigree/Wardline/Legis are right to keep those seams RESERVED-shape, not frozen, through the cutover.

**The never-reject rail (#5) is already false in the suite — this is a doctrinal blocker, not a member gap.** Three members ship hard stops today: Loomweave fail-closes SEI minting on unproven match (correct for identity), Legis ships a graded 2x2 with block-and-escalate in structured/protected cells (operator-chosen, gold), and Wardline IS a rejecting trust-boundary gate (`--fail-on ERROR` → exit 1, its entire agent-loop value proposition). Filigree also has a fail-closed Legis closure gate on governed-issue close. The hub must rule whether "never reject" is scoped to **the identity-capture path only**, or it regresses three shipped capabilities. This is the single most pervasive correction across the six.

**Auto-bake-on-commit (#4) is architecturally backwards and doctrinally fraught — across four members.** It needs an inbound Legis→Filigree event path that *inverts* the only existing Legis seam (today Filigree calls Legis for closure gating; Legis's hooks are SessionStart-only). Doctrine §6 forbids a daemon, so detection must be hook-fed from a commit hook neither Legis nor Filigree installs. Loomweave warns the orchestration cannot live in it (enrich-only, won't aggregate) and there is no sanctioned assembler. Tabard argues auto-bake *contradicts* assignment-as-principal: "no ticket = anonymous Body; auto-baking manufactures a principal by fiat." This is the rail most in need of rework.

**Frozen-contract impacts (PDR-0027 — inviolate, high cost).** Three frozen surfaces are touched by the design as sketched:
- **Loomweave SEI envelope** (`loomweave:eid:` prefix, `api_version:1`, resolve/sei/lineage routes) — any hook-time mint or WHO field added to the identity envelope is high-cost; the additive escape is a new route, not a reshape.
- **Legis intake artifact** (golden-vector-pinned `hmac-sha256:v2` signed scan artifact, and the §7 Filigree sign-off binding + §8 Wardline ingest seams) — carrying a Tabard SEAL or BODY/TABARD/SEAL slots on the wire forces coordinated re-vectoring with Wardline. Wardline confirms: adding WHO to the legis intake artifact touches a frozen cross-member contract.
- **Filigree weft HTTP generations** (classic + weft) — new identity fields must be additive-only optional; any shape change forces a new generation.

The safe pattern everywhere: **additive optional fields / new URIs only.** Warpline demonstrates this is achievable (it built the whole WHEN coordinate in non-frozen internal storage). The hub-authored cross-member "stamp originating branch@sha" convention is the one new federation convention that touches *every* sibling's event shape additively — flag for hub authoring, not unilateral member edits.

## Seam-change matrix

**Group A — WHAT/WHEN coordinates (largely shipped, additive surfacing only):**
- Loomweave SEI resolution surface — *no change to participate*; the only candidate addition is a hook-time / provisional locator-only resolve so auto-bake can stamp WHAT before `analyze` runs. **Touches frozen** (api_version:1 envelope) — high cost.
- Warpline COP read surface — promote the interface-pending COP tool to a frozen `warpline.temporal_cop.v1` (NEW URI, **not frozen-mutating**) and surface `detected_branch`. The anchor columns themselves already ship in non-frozen storage.
- Committed git-rename provider — if WHEN consolidates under Warpline, Loomweave's `LegisGitRenameSource` may repoint from Legis to a Warpline-owned git surface. Provider-swap via the `GitRenameSource` trait (**not frozen**), but the contested SEAM-4 path→locator derivation ownership must be settled first.

**Group B — WHO coordinate (all RESERVED-shape until Tabard exists; mostly additive):**
- Filigree assurance-tier field — NEW namespaced field (e.g. `tabard_identity`/`assurance_tier`), **distinct from** the existing OS-user `verified_actor`. Additive optional. **Touches frozen** weft surface.
- Filigree claim payload — surface the project-qualified issue id as THE Tabard handle, carry enrich-only assurance tier. Additive. **Touches frozen.**
- Wardline attest bundle — add optional WHO block, fail-soft like existing SEI enrichment; new schema version `wardline-attest-2` (canonical bytes change). **Not frozen** (attest schema isn't in the freeze set).
- Wardline → Legis scan artifact — carry producing WHO alongside `scanner_identity`/`commit_sha`. **Touches frozen** — coordinated golden-vector re-pin with Legis.
- Legis audit records (OverrideRecord, posture records) — split the single self-asserted `agent_id` into BODY/TABARD/SEAL slots. **Touches frozen** (underlies §7/§8 emitted shapes).
- Loomweave Tabard-SEAL↔SEI binding — NEW join mirroring the legis-attestation-keys-on-SEI pattern. **Not frozen** — keep RESERVED until Tabard ships.
- Warpline Tabard credential on a change episode — reserve optional certified-WHO field augmenting the raw git-author string. **Not frozen**; depends on Tabard.

**Group C — Auto-bake / collision guard (net-new, contested direction):**
- NEW inbound Legis→Filigree commit-event path + auto-bake-from-commit ticket primitive — hook-fed (not daemon), inverts the current outbound Legis seam. **Not frozen** but adds a new federation direction. Hub-blessed, not bilateral.
- NEW Filigree broadcasts board (`db_broadcasts.py` + MCP/CLI + SessionStart block) — the collision guard, consuming the structured Body key by field-comparison. **Not frozen**, net-new; Body-key field-set must match hub-blessed dialect.
- NEW Legis collision/deconfliction guard over branch + worktree — the one permitted hard stop, on existing GitSurface data, self-disabling on false-fire. **Not frozen.** *(Note: Filigree and Legis both claim the collision-guard home — Filigree via the broadcast board / Body comparison, Legis via branch/worktree. The hub must pick one owner.)*
- Hub-authored "stamp originating branch@sha" convention — each sibling persists originating branch@sha as optional event metadata; Warpline joins at read time. Additive, **touches each sibling's shape** — hub-authored.
- NEW Legis merge-mapping feed {squashed SHAs}→{new mainline SHA} — to reconcile squash/rebase SHA-rewrite. **Not frozen**, RESERVED-shape until prove-the-need.

## What we forgot — the design's blind spots (MOST IMPORTANT)

Ranked by how much each *should* change the north-star design.

### Yes — materially changes the design

**1. The triad needs a fourth, orthogonal honesty axis: "identified but unproven." (Wardline; echoed by Warpline)**
Wardline's deepest concept is that coverage ≠ verdict — a boundary can have WHAT+WHO+WHEN all known and Wardline *still* cannot prove its trust (the three-valued clean/defect/UNKNOWN, never silent-clean). The triad is purely identity coordinates with no slot for "identified but unproven." A federation that records who/what/when and treats presence-of-coordinates as sufficient will manufacture false-green exactly the way a silent coverage cap does. **Implication: add a fourth axis (assurance/honesty) orthogonal to the three identity coordinates.** Warpline reinforces from the other end: its `branch_sha` frame degrades to an explicit unresolved-empty rather than reading whole-repo history as a confident partial — a *false-precise* output is as dishonest as a rejection. The honesty invariant must forbid confident-everything as well as confident-nothing; "post-facto never reject" doesn't cover false-precision.

**2. Never-reject is a per-layer rule, not a universal rail. (Loomweave, Legis, Wardline — three independent confirmations)**
- Loomweave fail-CLOSES identity minting: on unproven match it mints a NEW SEI and orphans the old. This is *correct* — silently re-pointing an SEI would transfer a Tabard SEAL or legis attestation to the wrong code. But it means **identity continuity sometimes legitimately BREAKS**, and the "all work has a ticket + a why by construction" claim is false at exactly the moment identity fractures: there will be orphaned attestations needing human reconciliation. The design must absorb "identity can honestly break, and that is a *surfaced gap*, not a by-construction success."
- Legis ships a graded 2x2 with record-only (chill/coached) AND block-and-escalate (structured/protected) as operator-set dials. The flat never-reject rail contradicts a gold-shipped capability.
- Wardline IS a rejecting gate by product definition. It is deconfliction-first in *philosophy* yet a genuine permission gate in *operation*.
**Implication: scope never-reject to the identity-capture path only; explicitly sanction the identity-fail-closed, the graded-governance, and the trust-boundary gates as bounded exceptions.**

**3. Auto-bake (#4) contradicts assignment-as-principal and manufactures a principal by fiat. (Tabard, Filigree, Legis, Loomweave)**
Tabard's sharpest point: if the principal *is* the claim/ticket, then "no ticket" means an anonymous Body — and auto-baking a ticket on commit *invents* a principal to answer an open edge by decree. Filigree confirms the seam points the wrong way (inbound Legis→Filigree inverts the only existing integration; no commit hook exists). Legis confirms §6 forbids the daemon. Loomweave confirms no member is allowed to host the orchestration. **Implication: reconsider auto-bake. Either accept that an unticketed edit is honestly an anonymous Body episode (surfaced, not papered over with a synthetic ticket), or redesign it as honest hook-fed glue with no central assembler. Do not let it silently mint principals.**

**4. The "verified_actor" name is already taken — by an unrelated OS-user identity model. (Filigree)**
The north-star reuses `verified_actor` for the Tabard credential, but in Filigree it already means the OS user (ADR-012, with an ACTOR_MISMATCH warning surface). Shipping the Tabard credential under that name would silently overload a near-frozen audit field and break the claimed-vs-OS-user mismatch semantics. **Implication: the Tabard slot must be a NEW namespaced field. The hub must not assume `verified_actor` is a free slot — it is occupied.**

**5. WHAT is two sub-axes, and there are two overlapping change-timelines. (Loomweave, Wardline)**
Loomweave enforces two-axis freshness as an invariant: identity axis (alive + lineage) vs content axis (content_hash), *never* inferred from each other — a rename keeps the SEI alive while the locator changes; a body edit changes content while identity is untouched. The north-star's flat "WHAT changed → Loomweave/SEI" collapses these, and "the entity moved" vs "the entity's body changed" are different *whats* with different *whys*. Worse, Loomweave's append-only lineage log IS a WHEN-of-identity-change timeline that overlaps the WHEN coordinate handed to Warpline. **Implication: the WHAT coordinate is two sub-axes; the triad must explicitly say which axis owns "when the identity changed" vs "when the bytes changed," or the two timelines drift.**

**6. The WHO-on-episode join already lives in Warpline; Tabard's job is to CERTIFY it, not introduce it. (Warpline)**
Warpline already records git author as `change_events.actor` and consumes Filigree claim_state/assignee onto changed entities. The WHO↔WHEN correlation the design assigns to a *future* Tabard+Warpline pairing is partially live today. **Implication: Tabard certifies the (currently weak, unverified) WHO that Warpline already correlates; it does not invent the correlation. Warpline is the natural home for the WHO-on-episode join.**

**7. SEI is unavailable at the exact post-commit moment auto-bake fires. (Loomweave)**
SEI minting is non-deterministic across runs (keyed on `mint_run_id`) and only exists for entities that have been through an `analyze` pass. At the post-commit instant auto-bake wants to stamp WHAT, a brand-new/just-edited entity has NO SEI yet. **Implication: auto-bake must tolerate a SEI-less (locator-only or no-WHAT) event, or Loomweave needs a hook-time mint path it doesn't have — and that touches the frozen envelope. Reinforces blind spot #3: the WHAT coordinate is not reliably available when the design wants it.**

**8. A maximally-adoptable member CANNOT hold an Ed25519 key — the SEAL can't be a universal primitive. (Wardline)**
Wardline's zero-dependency base *forbids* asymmetric crypto (HMAC is forced, not chosen); its WHO-gap is forced by design, not oversight. The north-star assumes every body holds its own Ed25519 key and produces offline-verifiable SEALs. **Implication: SEAL verification must be a *delegated* capability (Tabard verifies; members carry an opaque seal blob they never parse — exactly how they treat the SEI), not a primitive every member implements.**

**9. BODY identity must be launch-bound, not freely self-minted. (Legis; Filigree)**
Legis already learned that a freely self-asserted per-call actor is the spoof hole, and launch-binds `--agent-id`. The design treats BODY as freely self-minted broker-free. Filigree adds that there is no Body-key minting point at all — the actor on a write is an unauthenticated claim. **Implication: the BODY model should inherit launch-binding, or auto-baked attribution is spoofable; and someone must own the Body-key minting point and field-set (currently hub-reserved, unbuilt).**

**10. Reuse the proven infrastructure — don't re-specify it. (Filigree, Legis, Wardline)**
Multiple members have already *built* what the design treats as aspirational:
- Filigree: lease/heartbeat/stale-claim/reclaim machinery is shipped and surfaced at SessionStart — the "freshness signal + continuity-break detection" the design describes as future work. Also: entity_associations (ADR-029) + tolerate-unknown scan intake (F6) are the exact enrich-only/opaque-external-id/degrade-cleanly idiom the Tabard seam needs — design it as a *third instance of this proven pattern*, not a novel mechanism.
- Legis: SEI-keyed rename-surviving lineage-integrity prefix custody (build continuity-break detection on THIS); the posture-ratchet elevation-session (time-boxed window, every signature carries session_id) is a ready-made human-presence/SEAL/freshness mechanism — reuse it.
- Wardline: the fail-soft enrichment pattern (`_enrich_seis`, the unavailable-vs-empty distinction) is a test-pinned reference implementation of the enrich-only axiom; lift it, don't re-derive.

### Maybe — worth the owner's judgment, not clearly load-bearing

- **Continuity altitude is already ruled, not open. (Filigree)** PDR-0004 §2 set ONE principal grain (the claim), with the enclosing epic / `cluster:` label as a continuity *attribute*. The design debates assignment-as-principal without resolving the altitude question Filigree already settled.
- **WHEN has dirty/clean honesty that a bare SHA lacks. (Wardline)** A commit SHA is a lie when the tree is dirty; Wardline refuses to sign a dirty tree. Warpline already records `detected_context = clean/working_tree_dirty/detached_head`. Warpline-as-WHEN needs this honesty bit, or the WHEN coordinate is forgeable provenance — and Warpline already sees the pre-commit dirty-tree episode the commit-trigger auto-bake would *miss*.
- **Per-project isolation hard-partitions WHAT. (Loomweave)** SEIs are project-scoped and opaque; a body working across two repos has WHAT-coordinates from two unrelated namespaces with no shared root. The task-centric continuity model may not have reckoned that a single logical change spanning repos has no single WHAT.
- **Lineage is not tamper-evident in v1. (Loomweave)** The audit spine the "honest labelling survives rename" promise leans on ships with no hash-chain/signature; integrity is re-established per-consumer (Legis Option 3). If SEALs and auto-baked tickets are trusted as an audit spine, someone must own integrity over the lineage they join on. *(Legis already does this at its boundary — see blind spot #10.)*
- **Co-change/temporal-coupling is a richer WHEN the design ignores. (Warpline)** Warpline derives "these entities change together 84% of the time with no call edge" from history — emergent structure no per-event SHA stamp produces, and it doesn't need universal stamping. The stamping convention is the floor, not the ceiling.
- **Self-healing SEI re-resolution. (Warpline)** SEIs resolved during a Loomweave outage are stored null; Warpline re-keys them when Loomweave is reachable. Any SEI-keyed join inherits this fragility — SEI joinability is a *fraction*, not a guarantee, and Warpline is its custodian over time.
- **Fail-open vs fail-closed must stay on separate paths. (Legis)** The any-member-absent-still-works rail is fail-open; Legis's governance path is fail-closed. The identity-capture path may fail-open-to-anonymous but must not drag the governance path open with it.
- **Collision-by-comparison needs no crypto and may make the collision-guard subsystem unnecessary. (Tabard)** A self-describing handle gives contention detection for free by field-comparison — Tabard argues the collision guard is an "unneeded subsystem." This cuts against Filigree's and Legis's net-new collision-guard builds; the hub should resolve whether the guard is a subsystem or a free consequence of the handle.

## Recommended sequencing & open questions for the owner

**Sequencing:**
1. **Hub doctrine ruling FIRST (blocks everything):** scope never-reject to the identity-capture path only, and explicitly sanction the four existing hard stops (Loomweave identity fail-closed, Legis graded 2x2, Wardline trust-boundary gate, Filigree closure gate) as bounded exceptions. Until this lands, three members can't know whether to demote shipped behavior.
2. **Add the fourth (honesty/assurance) axis to the design** and the false-precision clause to the honesty invariant before any WHO seam freezes.
3. **Resolve auto-bake (#4)** — decide between honest-anonymous-Body-episode vs hook-fed glue; do NOT freeze a synthetic-principal mechanism. Settle the collision-guard owner (Filigree board vs Legis branch/worktree vs Tabard's "it's free") in the same ruling.
4. **Settle SEAM-4 path→locator rename ownership** (Loomweave derives it; Legis/Warpline emit paths) before the WHEN coordinate can be rename-correct.
5. **Keep all WHO/Tabard seams RESERVED-shape** through the cutover (prove-the-need); WHAT/WHEN surfacing (Warpline COP v1 URI, Loomweave provisional resolve) can proceed as additive-only.
6. **Warpline's WHEN role stays BEHIND the launch cutover** (PDR-0025 condition 3) — the north-star cannot pull it forward.

**Does this change Tabard's gap-naming admission or the Phase-0 spike scope? Yes — both should be re-examined:**
- **Gap-naming admission:** Wardline *already names the WHO-gap verbatim in shipped source*, and Tabard itself supplies the strongest design corrections (BODY/principal already split, collision-by-comparison is free, point-4 contradicts principal-as-claim) — all *doctrinal*, none requiring Tabard *code*. This strengthens the case that Tabard's value is currently as a **doctrinal position the hub could absorb**, and weakens the case for admitting a sixth member before the spike proves the SEAL is even buildable. Tabard's own "cheap no-go" note says a NO-GO folds WHO into Filigree or Legis with zero rework. The owner should weigh whether the WHO coordinate needs a *member* or just a *blessed field-set + delegated verifier*.
- **Phase-0 spike scope:** the spike as scoped tests SEAL feasibility and key custody. The members surfaced two scope additions it should also de-risk: (a) the **delegated-verification model** (Wardline proves a maximally-adoptable member can't hold a key — so the spike must prove members can carry an opaque seal blob they never parse, not that every member signs), and (b) the **launch-bound BODY constraint** (Legis proves self-minted per-call identity is the spoof hole). If the spike only tests "can an agent sign with Ed25519" it will pass while missing the two constraints that decide whether the design is adoptable.

**Open questions for the owner:**
- Does the principal stay the claim (Filigree's PDR-0004 §2 ruling) even when auto-bake wants to mint one on commit? These conflict directly.
- Who owns "when the identity changed" (Loomweave lineage) vs "when the bytes changed" (Warpline)? Two timelines exist today.
- Who owns lineage integrity for the audit spine — per-consumer (status quo) or a single hub-blessed owner — if SEALs/auto-baked tickets are to be trusted?
- Is the collision guard a subsystem (Filigree/Legis build) or a free consequence of a self-describing handle (Tabard's claim)?
- Does WHEN inherit Wardline's dirty/clean honesty bit, and does a single logical change spanning repos need a single cross-project WHAT (Loomweave isolation says it has none today)?

---

## Appendix — raw per-project assessments

### filigree

```json
{
  "project": "filigree",
  "distance": "moderate",
  "distance_rationale": "Filigree is the closest member to its north-star role \u2014 it has ALREADY done the hardest conceptual work and ratified it in its own product workspace (PDR-0004 \"Tabard identity seam: build for, not with\", 2026-06-16, and PRD-0001 the broadcast board). The Tabard *layer itself is shipped*: claim_issue() in src/filigree/db_issues.py mints assignee + claimed_at + last_heartbeat_at + claim_expires_at (the lease = the principal's lifespan), release_claim()/close doffs it, and an atomic CAS UPDATE prevents two agents claiming concurrently \u2014 this IS the north-star's \"donning the coat\" and \"assignment-as-principal,\" already in production. What is NOT built: the verified_actor *assurance-tier* field (the slot Tabard fills) does not exist \u2014 the field of that name today is something else (OS-user, ADR-012); the broadcast board / collision-by-comparison is PRD-only with no db_broadcasts.py; and the background-ticket / auto-bake-on-commit pipeline has zero code and runs against the grain of Filigree's existing hook and Legis-seam architecture. So: foundation done and self-aware, three named deliverables unbuilt, one architecturally backwards from what exists.",
  "gaps": [
    {
      "gap": "verified_actor name collision: the north-star's T0/T1/T2 assurance-tier credential field does NOT exist; the existing verified_actor is OS-user identity (ADR-012)",
      "severity": "major",
      "detail": "src/filigree/actor_identity.py:resolve_os_actor() derives verified_actor from pwd.getpwuid(os.geteuid()), set automatically per session in mcp_server.py:1176 and cli_common.py:231, stored as an events column (db_schema.py:66). The north-star (and PDR-0004 \u00a73) wants verified_actor to be an additive Tabard-fillable field with assurance-tier metadata (T0 free-text / T1 launch-bound / T2 signed seal). Reusing the name would conflate 'which OS user ran the process' with 'is this body certified to wear this tabard.' PDR-0004 flags it: it reframes filigree-81d3971467 to 'Filigree is the Tabard consumer adapter,' but the new field/tier is unbuilt. The hub must not assume verified_actor is a free slot \u2014 it is occupied."
    },
    {
      "gap": "The broadcast board / collision guard \u2014 the only thing the north-star calls a HARD STOP \u2014 is unbuilt (PRD-only)",
      "severity": "major",
      "detail": "No db_broadcasts.py exists; grep for 'broadcast'/'collision' in src finds only prefix-collision (server.py registration) and dashboard text. PRD-0001 specifies the whole thing \u2014 'mechanism C': same-ticket+different-body = contention \u2014 with tracker epic filigree-9927145adc and children T1-T5, status 'ready-for-planning,' i.e. not started. The north-star's single hard rail (the collision guard) thus has no implementation in its designated owner."
    },
    {
      "gap": "Background-ticket / change-debt / auto-bake-on-commit: no code, and the seam direction is backwards",
      "severity": "blocker",
      "detail": "grep for background/unplanned/auto_bake in src returns nothing. The north-star wants Legis to detect a commit -> Filigree auto-bakes a 'unplanned work, auto-captured' ticket. But Filigree's only hooks are SessionStart (hooks.py generate_session_context, observe/record at orientation); there is NO PostToolUse/commit hook. And the Legis seam runs the OTHER way: legis_client.py is a closure-GATE client where FILIGREE calls Legis (check_closure_gate), not an inbound consumer of Legis commit events. Auto-bake requires a new inbound ingestion path (Legis -> Filigree) plus a ticket-mint-from-commit primitive that does not exist."
    },
    {
      "gap": "No durable BODY identity primitive; principal is claim-only",
      "severity": "major",
      "detail": "PRD-0001's identity model consumes a structured Body key (model\u00b7ticket\u00b7hostname\u00b7pid\u00b7process_start_time\u00b7nonce) as comparable fields, but nothing in src mints or persists a Body key \u2014 no nonce-minting point (PRD flags this as the headline open question, routed to /axiom-solution-architect). The actor string on a write is an unauthenticated claim (actor_identity.py docstring). So 'the no-ticket state never truly exists / the BODY is the through-line' (\u00a74) has no carrier: an unclaimed agent is genuinely anonymous, with no Body record to accrue change-debt against."
    },
    {
      "gap": "Heartbeat is a freshness lease, not yet a 'stamped discontinuity event'",
      "severity": "minor",
      "detail": "last_heartbeat_at + claim_expires_at + get_stale_claims() (surfaced in hooks.py STALE CLAIMS block) give freshness signalling, matching \u00a73's 'timestamp/heartbeat is a freshness SIGNAL, not part of the name.' But the north-star's 'had to re-ask who I am = a stamped discontinuity event' is not modelled \u2014 a re-claim after lease expiry records a 'claimed' event but not a typed continuity-break/handover artifact. PDR-0004 \u00a72 points the continuity attribute at parent_issue_id / cluster: labels; the handover-note-rides-on-the-ticket mechanic is unbuilt (Next: filigree-c2009921cf)."
    }
  ],
  "blockers": [
    "DOCTRINAL/SEQUENCING: Tabard is a sixth member admitted 'by gap-naming,' a Phase-0 spike that may NO-GO. PDR-0004 builds 'for, not with': Filigree must ship enrich-only with degrade-to-free-text so a Tabard NO-GO costs nothing load-bearing \u2014 it cannot block on Tabard, and the north-star cannot assume a built Seal. The hub-ratified canonical handle field-set (weft-560f243c95), the doctrine \u00a72/\u00a76 amendment, and Tabard \u00a77 admission are owner/hub-reserved; Filigree must NOT lock a third handle dialect.",
    "DOCTRINAL (\u00a76 no-daemon): auto-bake-on-commit must be hook-fed, not daemon-watched. Filigree has no edit/commit hook today and the Legis seam is outbound (Filigree->Legis gate). Wiring 'Legis detects commit -> Filigree auto-bakes' needs an inbound event path that respects \u00a76 (hook-fed) and the post-facto-never-reject rail.",
    "DOCTRINAL (post-facto, never reject): the north-star bans rejecting hooks; Filigree's hooks already comply (SessionStart observe-only, best-effort, never block). But Filigree's ONE existing hard stop is Legis closure-gate enforcement (fail-closed for governed issues, legis_client.py) \u2014 a permission gate in tension with 'identity coordinates, never gates.' It is scoped to governed-issue close (not edits), so it doesn't break the edit rail, but the hub should reconcile 'the only hard stop is the collision guard' against this existing fail-closed gate.",
    "TECHNICAL: no Body-key minting point exists; the distinct-actor metric and collision-by-comparison both depend on a robust, hub-blessed Body handle that is unbuilt and whose field-set is hub-reserved.",
    "CONTRACTUAL (frozen): classic + weft HTTP generations are FROZEN (PDR-0027 holds contracts inviolate). New identity fields must be additive-only (the contract permits non-breaking optional additions); any shape change to an existing surface forces a new generation."
  ],
  "seam_changes": [
    {
      "seam": "verified_actor field on events/issues + GET /api/weft/issues + /api/weft/changes",
      "change": "Add an ADDITIVE assurance-tier identity field (the Tabard slot) distinct from the existing OS-user verified_actor \u2014 a new namespaced field (e.g. tabard_identity / assurance_tier) or versioned sub-object \u2014 so consumers read a certified-principal handle without colliding with ADR-012 OS-user semantics. Optional with safe default per the contract's non-breaking-addition rule.",
      "touches_frozen_contract": true
    },
    {
      "seam": "work_claim / work_start / work_heartbeat (MCP+CLI+/api/weft/.../claim)",
      "change": "Formalize the claim as the durable principal handle per PDR-0004 \u00a71: surface the project-qualified issue id as THE Tabard handle and carry an enrich-only assurance tier alongside assignee. claimed_at/last_heartbeat_at/claim_expires_at already ship as freshness signals; add a typed continuity-break/handover artifact on re-claim. Additive to the existing claim payload.",
      "touches_frozen_contract": true
    },
    {
      "seam": "NEW broadcasts surface (db_broadcasts.py + MCP broadcast_post/list + CLI + SessionStart hook block)",
      "change": "Build PRD-0001: a TTL board consuming the structured Body key by field-comparison (NOT hashed) so deconfliction falls out of comparison; this is the north-star's collision-guard mechanism. Net-new surface; the Body-key field-set must match the hub-blessed dialect (weft-560f243c95).",
      "touches_frozen_contract": false
    },
    {
      "seam": "NEW inbound Legis->Filigree commit-event path + auto-bake-from-commit ticket primitive",
      "change": "Add a hook-fed (not daemon) ingestion that, on a Legis-detected commit with no live claim, mints an honestly-labelled 'unplanned work, auto-captured' ticket attributed to the body. This INVERTS the current Legis seam (today Filigree calls Legis for closure gating) and needs a new ticket-from-commit core method. Net-new; does not mutate the frozen closure-gate contract but adds a new federation direction.",
      "touches_frozen_contract": false
    },
    {
      "seam": "warpline_consumer.py (WHEN authority correlation)",
      "change": "The north-star puts WHEN (branch@sha temporal correlation) on Warpline, not Filigree. Filigree already has warpline_consumer.py (ingest_reverify_worklist) \u2014 the existing seam is Filigree CONSUMING Warpline worklists, not correlating time. Keep Filigree out of the WHEN role; ensure auto-baked tickets carry the commit's branch@sha as a value Warpline owns, not a minted Filigree timestamp.",
      "touches_frozen_contract": false
    }
  ],
  "forgotten_functionality": [
    {
      "capability": "Filigree ALREADY has the lease/heartbeat/stale-claim machinery the north-star treats as a future 'freshness signal' \u2014 and surfaces it at orientation",
      "why_it_matters": "claim_expires_at + last_heartbeat_at + get_stale_claims() + work_reclaim already implement the freshness-signal-and-continuity-break detection the model describes as aspirational. hooks.py already prints a 'STALE CLAIMS (older than 48h or past lease expiry)' block at SessionStart. The north-star says 'a heartbeat on the claim is a freshness signal used to detect a continuity break' as if it must be designed; it is largely shipped. Build ON this, do not re-specify it.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "The 'verified_actor' name is already taken by an unrelated OS-user identity model (ADR-012 threat model)",
      "why_it_matters": "The hub reuses 'verified_actor' for the Tabard credential, but that field exists with a different meaning (the OS user, with an ACTOR_MISMATCH warning surface in actor_identity.py and mcp_server.py:952). Shipping the Tabard credential as 'verified_actor' would silently overload a frozen-ish audit field and break the existing claimed-vs-OS-user mismatch semantics. The north-star overlooked that Filigree has ALREADY shipped a verified-identity concept \u2014 and it is OS-transport, not task-assignment.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Filigree's hooks are observe-only by design, and the Legis seam is outbound (Filigree gates ON Legis), not inbound",
      "why_it_matters": "\u00a75 'hooks observe and record, never reject' is already Filigree's lived architecture (SessionStart, best-effort, never blocks). But \u00a74 'when Legis detects a commit, Filigree auto-bakes' assumes an inbound Legis->Filigree flow opposite to the only existing Legis integration (legis_client.check_closure_gate \u2014 Filigree calls Legis). The design overlooked that the auto-bake arrow is architecturally backwards and needs a brand-new seam direction plus a commit-observing hook Filigree doesn't install.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Filigree already has a non-identity hard stop: fail-closed Legis closure-gate enforcement on governed-issue close",
      "why_it_matters": "The north-star asserts 'the ONLY hard stop is the collision guard.' But Filigree ships a second hard stop today \u2014 3.0.0's fail-closed Legis closure gate refuses to close governed issues. It's scoped to close (not edits), so it doesn't break the edit rail, but the flat claim 'identity never gates / only the collision guard is a hard stop' is already false in the suite. The design should acknowledge and bound the existing governance gate rather than imply a clean slate.",
      "should_change_design": "maybe"
    },
    {
      "capability": "Filigree already has TWO other enrich-only, additive, degrade-cleanly cross-member patterns proven in production: entity_associations (ADR-029) and the tolerate-unknown scan-run intake (F6)",
      "why_it_matters": "The enrich-only / never-load-bearing / absent-member-still-works principle is not new to Filigree \u2014 it is the house style. entity_association_add binds opaque external SEIs (loomweave:eid:) with drift detection; F6 makes unknown scan_run_ids a permanent supported contract. The Tabard seam should be designed as a third instance of THIS proven pattern (opaque external id + enrich-only + degrade), reusing entity-association plumbing, not as a novel mechanism. The hub overlooked that Filigree already has the exact federation idiom the model needs.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Filigree's principal is claim-grain by ruling (PDR-0004 \u00a72); continuity/desk addressing already exists via parent_issue_id + cluster: labels",
      "why_it_matters": "The north-star debates assignment-as-principal but doesn't resolve the altitude question (one ticket vs a desk/continuity level). Filigree already ruled it: ONE principal grain (the claim), with the enclosing epic / cluster: label as a continuity *attribute*, never a second principal, using primitives that already exist. 'Continuity across sessions = re-claiming the same ticket' is correct but under-specified; Filigree has already picked the addressing scheme the hub left open.",
      "should_change_design": "maybe"
    },
    {
      "capability": "The honest-empty / best-effort / never-block-orientation discipline is already enforced as code in the SessionStart context builder",
      "why_it_matters": "hooks.py _build_context wraps every stats read (findings, observations, stale claims) in try/except that degrades silently \u2014 'a board error must never block session-context generation' (PRD-0001) is the SAME failure-handling the observation-stats block uses. The north-star's 'enrich-only, no member is a precondition' is already operationalized as concrete error-handling Filigree can copy verbatim for Tabard/board surfacing. The design treats degrade-cleanly as a principle; Filigree has it as code.",
      "should_change_design": "minor"
    }
  ],
  "headline": "Filigree is the suite's most-ready Tabard host \u2014 assignment-as-principal (claim+lease+CAS+heartbeat) is already shipped and it has self-ratified the seam in PDR-0004/PRD-0001 \u2014 but the three named deliverables (the assurance-tier verified_actor field, the collision-guard broadcast board, and Legis-triggered auto-bake) are unbuilt, the 'verified_actor' name already means OS-user, and the auto-bake seam points the wrong way against Filigree's outbound-only Legis integration and observe-only hooks."
}
```

### loomweave

```json
{
  "project": "loomweave",
  "distance": "close",
  "distance_rationale": "Loomweave's north-star role is the WHAT coordinate \u2014 a *minted* SEI identifier owned by exactly one authority \u2014 and that is already shipped and conformance-proven, not aspirational. `crates/loomweave-storage/src/sei.rs` mints `loomweave:eid:<blake3>` tokens (mint_sei), runs a deterministic fail-closed carry/mint matcher (rebind_or_mint), keeps an append-only `sei_lineage` log, and resolves over `POST /api/v1/identity/resolve`, `GET /api/v1/identity/sei/:sei`, `GET /api/v1/identity/lineage/:sei` (docs/federation/contracts.md \u00a7SEI). `_capabilities` already advertises `sei.supported`/`sei.version:1`, and three siblings (Filigree associations, Wardline taint facts, legis attestations) are contractually required to key on the SEI, never the locator. The triad's two *other* coordinates (WHO=Tabard, WHEN=Warpline) are owned elsewhere, so loomweave does not have to grow new authority \u2014 it has to (a) confirm the WHAT/WHEN boundary doesn't double-count git renames it already derives, and (b) reconcile its fail-CLOSED matcher doctrine with the north-star's never-reject/enrich-only rails. Both are seam-fit issues, not foundational rework. Hence: close.",
  "gaps": [
    {
      "gap": "SEI minting is non-deterministic across runs (keyed on mint_run_id), but the north-star wants identity attributable at commit/hook time BEFORE a re-analyze",
      "severity": "major",
      "detail": "sei.rs mint_sei hashes blake3(locator ++ 0x00 ++ mint_run_id) and the module docstring is explicit: 'two from-scratch runs with different run_ids mint different SEIs for a brand-new entity.' SEIs only exist for entities that have been through a `loomweave analyze` pass. The north-star's BACKGROUND-TICKET/auto-bake flow (rail 4) fires when LEGIS detects a *commit* and FILIGREE bakes a ticket attributed to the body \u2014 at that instant, a brand-new or just-edited entity has NO SEI yet (analyze hasn't run). So the WHAT coordinate is unavailable exactly at the post-commit moment the design wants to stamp it. Either the auto-bake must tolerate a SEI-less (locator-only, or no-WHAT) event, or loomweave needs a hook-time mint path it does not have today."
    },
    {
      "gap": "Loomweave has NO concept of WHO/body/agent \u2014 and the design's three-layer model assumes the WHAT authority never needs it, which is correct, but the SEAM that joins WHO-to-WHAT is unspecified",
      "severity": "minor",
      "detail": "Grepping contracts.md and sei.rs for agent/assignee/principal/credential/tabard/seal returns nothing in the identity surface (only x-filigree-actor on an *outbound enrichment* read). That is the correct division of labour (Tabard owns WHO). The gap is that the north-star never says how a Tabard SEAL/attestation binds to a SEI for a *code-change* event. legis attestations already key on SEI (contracts.md \u00a7WS9); Tabard seals presumably ride the same join, but no contract names it. Naming it now avoids a second bilateral seam later."
    },
    {
      "gap": "The lineage log is the suite's append-only identity audit spine, but it is NOT tamper-evident \u2014 the north-star's 'honest labelling / audit trail that survives rename' promise leans on it",
      "severity": "minor",
      "detail": "contracts.md \u00a7WS9 REQ-L-01: Loomweave ships 'no lineage hash-chain or signature in v1'; integrity is re-established at each consumer's governance boundary (legis Option 3 snapshot-hash). The north-star (rails 4-5) treats the recorded history as load-bearing for 'all work has a ticket + a why, true by construction' and for honest post-facto attribution. If Tabard SEALs and auto-baked tickets are to be trusted as an audit spine, someone must own integrity over the lineage they join on. Today no one in the triad does at the loomweave layer; it's deferred to each consumer."
    },
    {
      "gap": "SEI carry depends on git-rename signal whose ownership is contested (memory: SEAM 4 path-vs-locator)",
      "severity": "major",
      "detail": "The matcher consumes locator-level renames via GitRenameSource (sei.rs:157). The committed-window supplier is legis (`LegisGitRenameSource` reads legis `GET /git/renames`), but legis emits *path* renames and the *path\u2192locator derivation* lives in loomweave (`file_renames_to_locator_renames` in crates/loomweave-cli/src/sei_git.rs). The north-star puts WHEN (git branch@sha) under Warpline, not legis \u2014 but loomweave currently wires its committed-rename provider to LEGIS, not Warpline. If WHEN/temporal-correlation consolidates under Warpline, loomweave's `--legis-url` git-rename seam may need to repoint to a Warpline-owned git surface, and the unresolved path-vs-locator derivation ownership resurfaces."
    }
  ],
  "blockers": [
    "DOCTRINAL: the north-star's load-bearing rail is 'hooks OBSERVE and RECORD, NEVER reject' and 'enrich-only, never load-bearing'. Loomweave's identity matcher is deliberately fail-CLOSED (sei.rs docstring: 'When the matcher cannot PROVE sameness it mints a new SEI and marks the old binding orphaned'). Fail-closed minting is correct for *identity* (never silently carry an attestation across an unproven match) but it means a rename/move the matcher can't prove produces a NEW SEI \u2014 which from a consumer's view looks like the entity died and a stranger was born, breaking continuity. This is a genuine doctrinal tension: deconfliction-first 'never reject' (the agent flow) vs. identity 'fail-closed' (the attestation flow). The design must state that fail-closed mint is allowed for WHAT even though edits are never rejected \u2014 they are different layers \u2014 or the orphan-on-ambiguity behaviour will be read as a rejecting gate.",
    "CONTRACTUAL/FROZEN: the SEI wire surface (`loomweave:eid:` prefix, api_version:1, the resolve/sei/lineage routes, the conformance oracle) is a cutover contract that three siblings key on and PDR-0027 holds frozen contracts inviolate. Any north-star ask that changes SEI *shape*, adds a hook-time mint, or adds a WHO field to the identity envelope touches frozen ground and is high-cost.",
    "SEQUENCING: Tabard is a Phase-0 spike, NOT in the five-member cutover. Loomweave needs nothing from Tabard to keep playing the WHAT role today, so there is no blocker on loomweave's side \u2014 but any contract that binds a Tabard SEAL to a SEI cannot be frozen until Tabard exists, so that seam stays RESERVED-shape (prove-the-need), not frozen, through the cutover."
  ],
  "seam_changes": [
    {
      "seam": "SEI identity-resolution surface (POST /api/v1/identity/resolve, GET /sei/:sei, /lineage/:sei)",
      "change": "No change needed to participate as WHAT \u2014 already serves sei/content_hash/alive/lineage that legis, Filigree, Wardline consume. The only candidate addition is a hook-time / pre-analyze mint or a 'provisional locator-only' resolve so the auto-bake flow can stamp WHAT at commit time before analyze runs. That would be ADDITIVE (new route or new field), but adding it to the frozen api_version:1 envelope is high-cost.",
      "touches_frozen_contract": true
    },
    {
      "seam": "Committed git-rename provider seam (LegisGitRenameSource \u2192 legis GET /git/renames)",
      "change": "If WHEN/temporal-correlation consolidates under Warpline per the north-star, loomweave's committed-rename supplier may need to repoint from legis to a Warpline-owned git surface (or the hub blesses legis as the git-feed owner regardless). Either way the GitRenameSource trait abstracts it, so the change is provider-swap (capability-aware select_git_rename_source), not matcher change \u2014 but the path\u2192locator derivation ownership (SEAM 4) must be settled first.",
      "touches_frozen_contract": false
    },
    {
      "seam": "Tabard SEAL \u2194 SEI binding (new)",
      "change": "A new join contract: how a Tabard certified credential (WHO) attaches to a loomweave SEI (WHAT) for a code-change event. Should mirror the legis-attestation-keys-on-SEI pattern (contracts.md \u00a7WS9) \u2014 keep it RESERVED-shape until Tabard ships (prove-the-need), do NOT freeze it into the cutover.",
      "touches_frozen_contract": false
    },
    {
      "seam": "Consumed Filigree entity-associations route (GET /api/entity-associations?entity_id=SEI)",
      "change": "The auto-baked 'background ticket' (rail 4) would create Filigree associations keyed on a SEI. Loomweave already consumes this reverse-lookup by SEI (contracts.md \u00a7entity associations). For auto-bake to attach to brand-new code, the association may be created against a locator or a not-yet-minted entity \u2014 loomweave's by-SEI-only query (no per-row locator fallback once a SEI exists) means timing matters: an association written before the SEI is minted won't resolve until re-key. Design must handle the mint-lag ordering.",
      "touches_frozen_contract": false
    }
  ],
  "forgotten_functionality": [
    {
      "capability": "Loomweave already owns an append-only lineage log (born/locator_changed/moved/orphaned/superseded) that IS a WHEN-of-identity-change timeline, partially overlapping the WHEN coordinate the north-star hands to Warpline",
      "why_it_matters": "sei.rs LineageEvent + sei_lineage record, per SEI, the ordered events with a run_id and recorded_at. The north-star says WHEN = Warpline correlating branch@sha. But identity-change events (a rename, a move, an orphaning) already carry their own temporal/causal record inside loomweave, keyed to run_id and HEAD (runs.analyzed_at_commit). The design treats WHEN as a single git-correlation authority and overlooks that the WHAT authority *already emits a change timeline*. Two timelines that aren't reconciled (loomweave's identity-axis lineage vs. Warpline's commit correlation) is a future drift. The triad should explicitly say which axis owns 'when the identity changed' vs. 'when the bytes changed.'",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Two-axis freshness (identity axis vs. content axis) is already a shipped, named distinction loomweave enforces \u2014 the north-star's flat 'WHAT changed' coordinate collapses it",
      "why_it_matters": "contracts.md \u00a7Dossier: 'Two-axis freshness is explicit; neither axis is inferred from the other' \u2014 content axis = content_hash, identity axis = alive+lineage. A rename keeps the SEI alive while the locator changes; a body edit changes content_hash while identity is untouched. The north-star's 'WHAT changed -> Loomweave/SEI' lumps these together. But for honest attribution (rail 5), 'the entity moved' and 'the entity's body changed' are DIFFERENT whats with different whys \u2014 and loomweave already distinguishes them. The design's WHAT coordinate should be two sub-axes, matching what's built.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Fail-closed minting under ambiguity \u2014 loomweave will NOT carry an identity (and therefore not carry an attestation) across an unproven match",
      "why_it_matters": "This is the strongest adversarial point. The north-star's whole spine is 'never reject, post-facto, enrich-only, all work gets a ticket by construction.' Loomweave deliberately does the opposite for identity: on ambiguity it mints a NEW SEI and orphans the old (sei.rs \u00a7Fail-closed). That is the *right* call \u2014 silently re-pointing an SEI would silently transfer a Tabard SEAL or a legis attestation to the wrong code. So the design's 'never reject / by construction' optimism has an exception it didn't account for: identity continuity sometimes legitimately BREAKS, and when it does, the WHO/SEAL attached to the old SEI must NOT auto-follow. The 'all work has a ticket + a why by construction' claim is false at exactly the moment identity fractures \u2014 there will be orphaned attestations needing human reconciliation (legis already calls this a 'governance gap' on alive:false). The design must absorb 'identity can honestly break, and that is a surfaced gap, not a by-construction success.'",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Loomweave serves slices, never assembles/aggregates sibling data (the enrich-only composition law) \u2014 it explicitly refuses to be a proxy",
      "why_it_matters": "contracts.md \u00a7Dossier: 'Filigree associations are NOT a Loomweave surface... Routing Filigree data through Loomweave would violate the enrich-only axiom.' The north-star's auto-bake story (LEGIS detects commit -> FILIGREE bakes ticket, attributed to body, joined on SEI) implies an orchestration across legis+filigree+loomweave. Loomweave's hard stance is that it contributes ONLY the join key (the SEI) and will not aggregate. So the auto-bake choreography cannot live in loomweave and cannot treat loomweave as a hub \u2014 the design must place that orchestration in a member that is allowed to compose (the dossier assembler is Wardline today), or accept it's hook-fed glue with no central assembler. The 'no orchestrator/daemon' rail (\u00a76) reinforces this \u2014 there is nowhere for the auto-bake to 'live' except the hook itself.",
      "should_change_design": "maybe"
    },
    {
      "capability": "Per-project isolation: one `loomweave serve` = exactly one project; SEIs are project-scoped and opaque, with no cross-project identity",
      "why_it_matters": "contracts.md \u00a7Per-project isolation + \u00a7SEI ('SEIs are opaque on the wire \u2014 consumers MUST NOT parse them'). The north-star's BODY layer (model+PID+host) is cross-cutting and broker-free, and ASSIGNMENT-AS-PRINCIPAL uses 'the full project-qualified Filigree issue ID' as the durable handle. But loomweave's WHAT identity is per-project and carries no project qualifier on the wire (the project is implicit in which serve process answers). If a body works across two repos in one session, its WHAT-coordinates come from two unrelated SEI namespaces with no shared root. The design's continuity model is task-centric (re-claim the ticket) and may not have reckoned that the WHAT side is hard-partitioned by project \u2014 a single logical change spanning repos has no single WHAT.",
      "should_change_design": "maybe"
    },
    {
      "capability": "Loomweave's git-rename derivation already translates file/path renames into locator renames over the live locator set \u2014 the exact path\u2194logical-entity bridge the WHEN authority will need",
      "why_it_matters": "crates/loomweave-cli/src/sei_git.rs file_renames_to_locator_renames + path_to_module already do the file\u2192module\u2192locator translation, byte-hash-confirmed. The north-star gives Warpline the WHEN/git coordinate but Warpline (per suite memory) correlates branch@sha git *values*, it does not mint identity. The piece that turns a git path-rename into 'the same logical function moved' is non-trivial and ALREADY LIVES IN LOOMWEAVE. The design risks assuming Warpline can supply rename-aware WHEN on its own; in practice the path\u2192logical-entity reconciliation is loomweave's, and the contested SEAM-4 ownership (path-rename emitter vs. locator-rename derivation) must be resolved before the triad's WHEN coordinate can be rename-correct.",
      "should_change_design": "yes-materially"
    }
  ],
  "headline": "Loomweave already IS the north-star's WHAT authority \u2014 minted SEIs, append-only lineage, and SEI-keyed sibling contracts are shipped and frozen \u2014 so the work is seam-fit, not build-out; the design's blind spots are that loomweave's identity is fail-CLOSED (it honestly breaks continuity, contradicting the 'never-reject / by-construction' optimism), already carries its own two-axis change timeline that overlaps Warpline's WHEN, and owns the path\u2192locator rename derivation the WHEN coordinate quietly depends on."
}
```

### wardline

```json
{
  "project": "wardline",
  "distance": "moderate",
  "distance_rationale": "Wardline is the one member that has already STATED the north-star's central thesis in its own source: `core/attest.py:7-13` says the HMAC signature \"does not bind the bundle to a specific signer... Do not present a bundle as proof of *who* produced it.\" That is the WHO-gap the proposed Tabard sixth member exists to fill, named verbatim, today. So conceptually wardline is the closest validation the north-star has \u2014 its attest bundle already joins WHAT (boundaries[].sei, the Loomweave entity) and WHEN (payload.commit/dirty, the git correlation) and an analysis verdict, and explicitly leaves a WHO-shaped hole. But playing its ROLE is moderate-distance, not close, for three structural reasons. (1) Wardline's primary federation posture is a REJECTING gate (`--fail-on ERROR` -> exit 1, the documented pre-commit hook in docs/guides/agents.md:153, .pre-commit-hooks.yaml) \u2014 the exact opposite of north-star rail #5 \"hooks OBSERVE and RECORD; they NEVER reject an edit.\" Wardline-as-doctrine-enforcer must be reconciled with observe-only. (2) Wardline has NO agent/assignment identity anywhere in src (grep for agent_id/assignee/work_claim/tabard returns only the attest.py threat-model comment) and CANNOT mint asymmetric per-agent SEALs: the zero-dependency base forbids Ed25519 (attest.py:9-11), so the SEAL primitive the north-star assigns to agents is not buildable inside wardline's base. (3) The \"who+what+when demonstrator\" the role hint credits wardline with does not exist in source or CHANGELOG \u2014 the dossier (core/dossier.py) is a WHAT+WHEN+verdict joiner with an explicit two-axis freshness model but no WHO axis. So wardline VALIDATES the gap and could host the WHO coordinate as a new boundary field cheaply, but it does not today carry, verify, or even model WHO.",
  "gaps": [
    {
      "gap": "No WHO coordinate in any wardline artifact",
      "severity": "major",
      "detail": "attest.py payload has commit/dirty (WHEN), boundaries[].sei (WHAT), posture/verdict \u2014 but no field for the agent/task that produced the scan. legis.py:312 emits scanner_identity='wardline@<version>' which is TOOL version, not WHO. To carry the north-star triad, attest bundles and the legis artifact would each need a new WHO field (e.g. tabard/seal). Additive, but currently absent."
    },
    {
      "gap": "Zero-dependency base forbids the SEAL primitive",
      "severity": "blocker",
      "detail": "core/attest.py:9-11 and attest_key.py document that signing is HMAC-SHA256 with a single SHARED PROJECT key because 'Ed25519/RSA would need a non-stdlib dependency, which Wardline's zero-dependency base forbids \u2014 so HMAC is forced, not chosen.' The north-star SEAL is an offline-verifiable Ed25519 certification where the agent holds its own key. Wardline cannot produce or verify such a seal in its base; it would need an extra (like the existing scanner/loomweave/rust extras) or to delegate WHO-verification entirely to Tabard."
    },
    {
      "gap": "Rejecting gate contradicts observe-only rail",
      "severity": "major",
      "detail": "docs/guides/agents.md:131 and .pre-commit-hooks.yaml make wardline a commit-blocking gate (--fail-on ERROR -> exit 1). North-star rail #5: hooks NEVER reject; the only hard stop is the collision guard. Wardline's whole agent-loop value proposition ('the gate trips and the agent corrects itself') is a rejecting gate. Reconciling requires either exempting wardline from the observe-only rail (it is deconfliction-first AND a trust-boundary gate \u2014 arguably a legitimate exception) or demoting its gate to advisory in the federated edit loop."
    },
    {
      "gap": "Single shared project key cannot attribute to a body/agent",
      "severity": "major",
      "detail": "attest_key.py: one WARDLINE_ATTEST_KEY per project in .env; key_id is sha256(key)[:8], distinguishing KEYS not signers. The legis handoff (legis-handoff.md:119) uses a second shared secret WARDLINE_LEGIS_ARTIFACT_KEY symmetric between wardline and legis. Neither scheme can express the north-star BODY/TABARD/SEAL layering \u2014 both are 'a holder of the project key', the antithesis of per-body attribution."
    },
    {
      "gap": "No notion of background-ticket / change-debt attribution",
      "severity": "minor",
      "detail": "North-star item #4 wants every edit to accrue to a ticket (auto-baked by Filigree on a Legis-detected commit). Wardline emits findings to Filigree (filigree_emit.py, native --filigree-url) but the emission is finding-state lifecycle, not work-attribution; wardline has no concept that a scan/finding belongs to a who-did-this ticket. It would be a natural enrichment (a finding could carry the producing tabard) but is unbuilt."
    }
  ],
  "blockers": [
    "DOCTRINAL: zero-dependency base (README, attest.py:25-32) is a load-bearing identity of the product ('pip install wardline pulls nothing'). The SEAL's Ed25519 requirement cannot live in the base; any WHO-certification must be an opt-in extra or fully delegated to Tabard. This is a hard architectural constraint, not a preference.",
    "CONTRACTUAL/FROZEN: adding a WHO field to the attest payload changes the signed canonical bytes and the wardline-attest-1 schema (attest.py:62, _canonical_bytes). The attest schema is not in the frozen-cutover finding-identity contract, but the legis intake artifact IS pinned by a golden vector captured from the real legis signer (legis.py:14-15, tests/conformance/test_legis_intake_contract.py) \u2014 adding WHO to the legis wire touches a FROZEN cross-member contract and would require coordinated re-vectoring with legis.",
    "DOCTRINAL: PDR-0027 holds contracts ABSOLUTELY INVIOLATE as the one gold floor. The finding-identity frozen contract (ADR 2026-06-05) and the vocabulary descriptor (wardline-generic-2) are inviolate; the triad must be carried in NEW additive fields, never by reshaping fingerprint/qualname/span identity.",
    "DOCTRINAL/SEQUENCING: north-star rail #5 (never-reject) vs wardline's rejecting gate is unresolved at the doctrine level. Until the hub rules whether the trust-boundary gate is an exception to observe-only, wardline cannot know whether to demote its gate in the federated edit loop.",
    "SEQUENCING: Tabard is a Phase-0 spike, not built and explicitly NOT in the five-member launch cutover. Wardline cannot consume a WHO authority that does not exist; any WHO-keying it adds now would be speculative (violates the 'prove the need' doctrine) until Tabard ships a real seam."
  ],
  "seam_changes": [
    {
      "seam": "attest bundle (wardline-attest-1 schema, attest.py)",
      "change": "Add an optional WHO coordinate to the signed payload (e.g. a tabard/seal block per bundle or per boundary), enriched fail-soft like the existing SEI enrichment (_enrich_seis) \u2014 present only when a Tabard authority is reachable, 'unavailable' otherwise. New schema version (wardline-attest-2) since canonical bytes change.",
      "touches_frozen_contract": false
    },
    {
      "seam": "legis signed scan artifact (legis.py, wardline-legis-scan-scope-1, hmac-sha256:v2 signing)",
      "change": "Carry the producing WHO (tabard id) alongside scanner_identity/commit_sha/tree_sha. This is the natural home for the triad since legis already owns WHEN (commit_sha/tree_sha) at the governance boundary. Requires coordinated re-pinning of the golden vector with legis.",
      "touches_frozen_contract": true
    },
    {
      "seam": "native Filigree emission (filigree_emit.py, --filigree-url)",
      "change": "Optionally attribute an emitted finding to the producing tabard/ticket so Filigree's background-ticket auto-bake (north-star #4) can attach it. Additive metadata.wardline.* field; load-bearing-free per the enrich-only axiom (weft.md).",
      "touches_frozen_contract": false
    },
    {
      "seam": "Loomweave SEI enrichment (attest.py _enrich_seis, loomweave/identity.py)",
      "change": "No change needed \u2014 wardline ALREADY consumes Loomweave SEI as the WHAT coordinate exactly as the north-star prescribes (opaque, rename-stable, never parsed). This seam is the proof the triad's WHAT authority works; it is the model the WHO seam should copy.",
      "touches_frozen_contract": false
    }
  ],
  "forgotten_functionality": [
    {
      "capability": "Wardline already proves the triad's WHEN coordinate is a CORRELATION, not a minted identity \u2014 and proves WHEN alone is insufficient via dirty-tree honesty",
      "why_it_matters": "The north-star says Warpline 'correlates' a branch@sha rather than minting one. Wardline's attest.py already lives this: payload.commit is git rev-parse HEAD AND payload.dirty records whether the tree matches that commit (git_state, attest.py:67). A commit SHA by itself is a LIE when the tree is dirty \u2014 wardline refuses to sign a dirty tree by default (build_attestation:278, legis-handoff.md:67). The north-star's WHEN coordinate ('a branch@sha git value') silently inherits this trap: a sha does not pin content if the working tree drifted. Warpline-as-WHEN-authority needs wardline's dirty/clean honesty bit, or the triad's WHEN coordinate is forgeable provenance.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "The honesty gap: WHAT/WHO/WHEN can all be present and the answer still be 'unknown'",
      "why_it_matters": "Wardline's deepest concept (assurance posture + the three-valued verdict clean/defect/UNKNOWN, dossier.py UNKNOWN_TIERS, the coverage_pct honesty gap) is that coverage is NOT the same as a verdict \u2014 a boundary can be fully identified (WHAT+WHO+WHEN all known) and wardline still cannot prove its trust ('unknown', never silently 'clean'). The north-star triad is purely about IDENTITY coordinates; it has no slot for 'identified but unproven'. A federation that records who/what/when but treats presence-of-coordinates as sufficient will manufacture false-green exactly the way a silent coverage cap does. The triad needs a fourth, orthogonal honesty axis.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Two-axis freshness already separates 'same entity?' from 'has its code changed?' \u2014 the triad collapses these",
      "why_it_matters": "dossier.py:14-20 enforces TWO orthogonal axes that are NEVER collapsed: IdentityStatus (alive/orphaned/unavailable \u2014 is this the same entity?) and ContentStatus (fresh/stale/unknown \u2014 has its code changed?). The north-star maps WHAT->Loomweave (identity) and WHEN->Warpline (a git value), implicitly treating WHEN as the content-change axis. But wardline already learned that identity-freshness and content-freshness are independent: an SEI can be alive while content is stale, or content fresh while the binding orphaned. The triad's clean three-authority split risks collapsing a distinction wardline found load-bearing enough to encode as an invariant.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Wardline's WHO-gap is FORCED by zero-dep, not an oversight \u2014 so the north-star's 'agent holds its own Ed25519 key' may be unhostable in the most adoptable members",
      "why_it_matters": "attest.py:9-11 documents that asymmetric signing was REJECTED, not forgotten, because it breaks zero-dependency adoptability \u2014 the single most-marketed property of the product (README: 'pip install wardline pulls nothing'). The north-star assumes every body can hold an Ed25519 key and produce offline-verifiable SEALs. Wardline is the proof that a maximally-adoptable member CANNOT carry crypto in its base. If SEAL verification must work everywhere, it has to be a delegated capability (Tabard verifies; members only carry an opaque seal blob they never parse \u2014 exactly how wardline treats the SEI), not a primitive every member implements.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Wardline is a deliberately REJECTING gate \u2014 a counterexample to the universal observe-only rail",
      "why_it_matters": "Rail #5 says the ONLY hard stop is the collision guard. But wardline's entire reason to exist in the agent loop is a hard stop on a trust-boundary defect (--fail-on ERROR, agents.md:131; the self-correcting loop in agents.md:20). It is deconfliction-first in PHILOSOPHY (opt-in, silent until you declare a boundary) yet a genuine permission gate in OPERATION. The north-star's clean 'identity coordinates, never gates' rule has no category for a member whose product IS a gate. Either wardline is a sanctioned exception (the trust-boundary gate is not an identity gate) or the never-reject rail is too absolute.",
      "should_change_design": "maybe"
    },
    {
      "capability": "The fail-soft enrichment pattern is already the reference implementation for 'enrich-only / never load-bearing'",
      "why_it_matters": "_enrich_seis (attest.py:129-163), the Filigree outcome-split (weft.md:108: sibling-absent/outage -> warn and continue, never affect exit code), and the dossier's no-false-green honest-partial all ALREADY implement north-star rail #5's enrich-only axiom to the letter, with documented per-item AND whole-enrichment fail-soft. The north-star states the axiom as a fresh design principle; wardline has a battle-tested, test-pinned implementation the hub can lift directly rather than re-derive. The design overlooked that one member has already solved the hard part (partial-failure semantics, the unavailable-vs-empty distinction).",
      "should_change_design": "minor"
    }
  ],
  "headline": "Wardline already names the north-star's WHO-gap verbatim in its own attest source and is the suite's living proof that WHAT+WHEN can be carried while WHO stays a hole \u2014 but it is a deliberately rejecting, zero-dependency gate, so it cannot host the Ed25519 SEAL in its base and clashes with the never-reject rail, making it the triad's best validator and its sharpest doctrinal counterexample at once."
}
```

### legis

```json
{
  "project": "legis",
  "distance": "moderate",
  "gaps": [
    {
      "gap": "No commit-detection or event-capture trigger exists",
      "severity": "blocker",
      "detail": "Rail 4 (LEGIS detects a commit, FILIGREE auto-bakes) has no implementation. src/legis/hooks.py is SessionStart-only instruction refresh. GitSurface.commit/commits (git/surface.py:78,116) can READ a commit but nothing watches for one. Doctrine section 6 forbids a daemon (weft/doctrine.md:132). Detection must be a new post-commit/PostToolUse hook legis emits FROM, then signals Filigree."
    },
    {
      "gap": "No collision guard, the north-star's only hard stop is absent",
      "severity": "major",
      "detail": "Rail 5 names the collision guard (do not clobber a peer's in-flight work) as the single permitted hard stop. Grep of src found no clobber/in-flight/collision concept. Legis owns branch/worktree context (GitSurface.branches ahead/behind, working_tree_renames), the natural home, but it is unbuilt."
    },
    {
      "gap": "Actor identity is self-asserted and launch-bound, not a verified WHO",
      "severity": "major",
      "detail": "docs/design/legis-charter.md lines 38-66: every override/sign-off stores a self-asserted agent_id with verified_author null; safeguards are launch-bound --agent-id and HMAC tamper-evidence, not proof-true-at-write. The WHO coordinate (a certified credential) is exactly this gap and is assigned to Tabard, not legis."
    },
    {
      "gap": "agent_id conflates BODY, TABARD, and SEAL into one string",
      "severity": "major",
      "detail": "OverrideRecord.agent_id (records/override_record.py:22) is a single string. The three-layer model (BODY model+PID, TABARD project-qualified Filigree issue id, SEAL Ed25519 attestation) has no representation; WHO is one field with no slot for task-as-principal or per-body seal."
    },
    {
      "gap": "No assignment-as-principal or background change-debt ticket notion",
      "severity": "major",
      "detail": "Rails 3 and 4 make the TASK the durable principal and auto-bake a background ticket on commit. Legis records key on the governed subject SEI plus self-asserted actor; section 7 sign-off binding (filigree/client.py, governance/signoff_binding.py) is operator-initiated, not auto-derived from who held the ticket."
    },
    {
      "gap": "Posture-ratchet SEAL machinery is operator-scoped, not agent-body-scoped",
      "severity": "minor",
      "detail": "The 2026-06-16 posture-ratchet design mints ONE operator key, custody via keychain/age-file, elevation sessions with session_id attribution, the nearest analogue to a SEAL, but certifies the OPERATOR over a posture change. Its section 11 defers unifying keyed ops; per-agent Ed25519 seals are out of v1 scope."
    },
    {
      "gap": "WHEN-coordinate ownership now overlaps Warpline",
      "severity": "minor",
      "detail": "The design assigns WHEN to Warpline as a branch@sha value it correlates, but legis already owns and EMITS git/commit/branch context (CommitInfo.committed_at/sha, git/rename_feed.py). Design must say legis-emits and Warpline-correlates or WHEN has two authorities."
    }
  ],
  "blockers": [
    "Doctrine section 6 no-daemon law (weft/doctrine.md:132): commit-detection cannot be a watcher; it must be a hook-fed emit from a hook legis does not yet ship. Re-architecting around hooks is mandatory.",
    "Tabard does not exist as code (doctrine section 7 line 238: sixth member by gap-naming, no code yet, NOT in the five-member launch cutover). Legis's WHO story is blocked on a non-existent member.",
    "Frozen-contract cost (PDR-0027 holds cutover contracts inviolate): the Filigree sign-off binding seam (contracts-index section 7) and Wardline ingest seam (section 8) are in the launch freeze set. Carrying a Tabard SEAL or auto-baking tickets touches frozen wire contracts, high-cost or post-launch only.",
    "Sequencing: the auto-bake loop needs a new legis-to-Filigree signal. Every cross-member interaction is hub-blessed (hub blesses every seam ruling); it cannot be bilaterally negotiated.",
    "Self-asserted actor is acceptable by deliberate design for trust-local single-operator use (charter:59, deconfliction-first not security). Turning WHO into a hard verified gate would cross the deconfliction-not-security doctrine; identity-coordinates-never-gates is compatible, but enforcement drift is a doctrinal blocker."
  ],
  "seam_changes": [
    {
      "seam": "NEW Legis commit-detection to Filigree auto-bake background ticket",
      "change": "A post-commit/PostToolUse hook legis emits from; on commit-detect, signal Filigree to bake an auto-captured ticket attributed to the BODY. New pairwise seam, hub-blessed.",
      "touches_frozen_contract": false
    },
    {
      "seam": "Section 7 Legis-Filigree SEI-keyed sign-off binding",
      "change": "Carry a Tabard-issued actor credential alongside the SEI subject and derive the bound issue from which ticket the body held. Changes record/wire shape.",
      "touches_frozen_contract": true
    },
    {
      "seam": "Audit record schema (OverrideRecord, posture records)",
      "change": "Add slots for BODY, TABARD, SEAL instead of one self-asserted agent_id. Underlies section 7 and 8 emitted shapes.",
      "touches_frozen_contract": true
    },
    {
      "seam": "NEW collision/deconfliction guard over branch and worktree",
      "change": "The one permitted hard-stop rail on legis's existing GitSurface data, self-disabling on false-fire. New surface, orthogonal to frozen seams.",
      "touches_frozen_contract": false
    },
    {
      "seam": "Section 6 Legis git-rename provider WHEN vs Warpline",
      "change": "Clarify legis emits git branch and commit time and Warpline correlates it. Likely a contract-index clarification.",
      "touches_frozen_contract": true
    }
  ],
  "forgotten_functionality": [
    {
      "capability": "Lineage-integrity prefix custody makes governance survive rename/move (governance/gaps.py)",
      "why_it_matters": "Legis ALREADY re-establishes lineage integrity at its boundary (REQ-L-01 Option 3): snapshots lineage at decision time and verifies it is still a PREFIX of current lineage, treating rename/move as legitimate and a broken prefix as divergence. That is the survives-rename-detects-tamper property the identity spine needs, SEI-keyed and append-only today. Auto-bake and continuity-break detection should build on THIS, not invent fresh drift detection.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Graded 2x2 implements observe-and-record AND block-and-escalate as agent-set dials (policy/cells.py)",
      "why_it_matters": "The north-star asserts a flat hooks-never-reject rail with only the collision guard as a hard stop. Legis already ships chill/coached record-only AND structured/protected block-and-escalate by exception. The blanket never-reject rail contradicts a gold-shipped operator-chosen capability; the design must scope never-reject to the identity-capture path only, or it regresses structured/protected.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Posture-ratchet elevation-session accountability (time-boxed window, every signature carries session_id)",
      "why_it_matters": "Legis already designed a concrete human-presence primitive: a short-TTL session is the operator's countersignature on a burst of work, every record stamped with session_id, with a recoverable loudly-recorded rekey path. That is a ready-made freshness-signal and stamped-discontinuity mechanism (rail 3). Reuse it for the SEAL rather than designing anew.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Launch-bound --agent-id as an anti-spoof control (charter lines 51-57)",
      "why_it_matters": "The design treats BODY as freely self-minted broker-free. Legis already learned a freely self-asserted per-call actor is the spoof hole and LAUNCH-BINDS agent_id (fixed at process launch, never a call argument). The BODY model should inherit that constraint, launch-bound not per-edit self-minted, or auto-baked attribution is spoofable.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Capability-confinement: signing authority is out-of-band, never agent-reachable (charter C-8, posture-ratchet custody-is-the-real-control)",
      "why_it_matters": "The SEAL has the agent holding its own Ed25519 key. Legis's hard-won doctrine for authority keys is the opposite: never plaintext where the agent can read it, signing is operator-custody. The design must resolve whether the per-agent BODY seal is a distinct low-trust self-minted key class from governance keys; legis already drew that line and the design ignored it.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Legis already emits branch-sha, commit time, and native rename evidence (GitSurface, git/rename_feed.py)",
      "why_it_matters": "The design hands WHEN to Warpline as an existing branch-sha git value it correlates. That value is produced and structured by LEGIS today (CommitInfo.committed_at/sha/parents, RenameEvidence with old/new blob SHAs, the rename feed with base/head context). The design should name legis as the emitter of the temporal coordinate and Warpline as the correlator, or it implies Warpline sources git facts it does not own.",
      "should_change_design": "maybe"
    },
    {
      "capability": "Fail-closed-to-structured posture on absent/corrupt state (posture-ratchet section 4, gaps.py surfaces orphans)",
      "why_it_matters": "The north-star's any-member-absent-editing-works-anonymously is fail-open. Legis's governance path is fail-closed (absent ledger to structured not chill, orphan SEI surfaced as gap). The design assumes one posture; legis proves the suite runs both and they must stay on separate paths: the identity-capture path may fail-open-to-anonymous but must not drag the governance path open with it.",
      "should_change_design": "maybe"
    }
  ],
  "headline": "Legis already owns the SEI-keyed rename-surviving post-facto audit spine and a shipped graded-enforcement 2x2, but the north-star's commit-detection-to-auto-bake trigger and collision guard are unbuilt and doctrine section 6 forbids the daemon, while the WHO coordinate it needs is contractually Tabard's, a sixth member with no code.",
  "distance_rationale": "Legis already owns the spine the north-star needs: an append-only SEI-keyed seq-bound (v3 HMAC) audit store (store/audit_store.py), lineage-integrity custody surviving rename/move via prefix-checking (governance/gaps.py), a graded 2x2 that records-but-does-not-block in chill/coached (policy/cells.py), and a git surface reading commits and detecting renames natively (git/surface.py). Three north-star rails are therefore already true: post-facto recording, SEI-keyed audit surviving rename, identity-coordinates-without-gating. But the two coordinates the design asks legis to drive are unbuilt or out-of-charter: (1) LEGIS-detects-a-commit then FILIGREE-auto-bakes has no implementation (hooks.py is SessionStart-only, no PostToolUse observer, doctrine section 6 forbids the daemon you would reach for); (2) the WHO coordinate (verified actor) is an explicit known governance gap (charter verified_author null, launch-bound --agent-id) reassigned to a brand-new sixth member, Tabard, with no code. The 2026-06-16 posture-ratchet design builds the closest analogue to a SEAL (minted operator key, custody, elevation-session attribution) but for the OPERATOR, not the agent body. Solid core and real foundations, but the event-capture mechanism and actor-identity model are net-new and the WHO authority is contractually someone else's."
}
```

### warpline

```json
{
  "project": "warpline",
  "distance": "close",
  "distance_rationale": "Warpline is the closest member to its north-star role because it has already BUILT the WHEN coordinate, not merely proposed it. PDR-0025 (relayed in docs/product/decisions/0003) ratifies warpline as owner of the temporal-episode axis \"orthogonal to SEI, not a second identity authority\" \u2014 exactly the north-star's framing of Warpline as a temporal-correlation (not minting) authority. The v2 anchor columns (detected_branch / detected_head_sha / detected_at / detected_context) already exist in store.py (_migrate_v2_anchor_columns), are populated through the ingest path (git.py:_detect_anchor + ingest at git.py:254-257), and a working COP module (cop.py, 428 LOC) resolves a branch_sha frame with honest squash-merge degradation and an explicit episode-boundary reason. The frozen 6-tool contract is untouched by all of this (the spine lives in non-frozen internal storage + an interface-pending COP verb), so the build did not cost a frozen-contract edit. What remains is genuinely incremental: ratify the episode boundary, surface branch_sha on a frozen read path, and (hub-authored, not warpline's to do) the cross-member SHA-stamping convention. The north-star's \"Warpline correlates an existing branch@sha it does not mint\" is already literally true in code.",
  "gaps": [
    {
      "gap": "branch_sha episode resolution is not on a frozen read path; the COP tool is interface-pending, not one of the 6 frozen v1 tools",
      "severity": "major",
      "detail": "cop.py docstring states the public COP MCP/CLI surface 'is interface-pending (it is NOT one of the six frozen v1 tools)'. The north-star wants Warpline to answer 'WHEN it changed' as a federation coordinate; today branch_sha resolution (cop.py:256-325) falls back to a rev-range WITH a warning because 'detected_branch is not yet surfaced on a frozen read path and the work-session episode boundary is unratified'. The capability exists internally but has no frozen, federation-callable contract."
    },
    {
      "gap": "Episode boundary is defined-toward but UNRATIFIED",
      "severity": "major",
      "detail": "roadmap.md and decision 0003 resolve the episode boundary toward 'episode ~= work-session' with a dirty-tree/detached-HEAD fallback, but it is explicitly an open PM condition, not ratified. cop.py repeatedly degrades branch_sha frames citing 'the work-session episode boundary is unratified'. The north-star's claim that Warpline owns the WHEN coordinate depends on this boundary being a settled contract, not a TODO."
    },
    {
      "gap": "Squash-merge/rebase SHA-rewrite reconciliation is unsolved (the load-bearing PDR-0025 condition)",
      "severity": "major",
      "detail": "PDR-0025 condition 1 (decision 0003) makes squash-merge 'the headline failure, not an edge case' \u2014 squash/rebase rewrite SHAs and orphan every stamped branch@sha at merge. cop.py handles this only by HONEST degradation (reason_class on vanished SHAs), not by reconstruction. The candidate fix (a Legis merge-mapping {squashed SHAs}->{new mainline SHA}) is a future hub-blessed seam that does not yet exist. Until this is demonstrated, the north-star's WHEN-coordinate join silently loses every episode that merged via the default squash mode."
    },
    {
      "gap": "No demonstrated cross-member reconstruction (PDR-0025 step 2)",
      "severity": "minor",
      "detail": "Step 1 (local anchor capture) is shipped; step 2 (reconstruct a bundle from anchors warpline can see + sibling events that carry a commit) is authorized-but-not-evidenced. There is a non-frozen 'warpline cop' demo verb but docs/evidence/ shows no executed reconstruction-on-squash-fixture run. The north-star treats the bundle reconstruction as the payoff; it is unproven."
    },
    {
      "gap": "The WHO coordinate (Tabard) has no warpline seam, yet warpline already records a degenerate WHO",
      "severity": "minor",
      "detail": "git.py:199,252 record git author as change_events.actor, and siblings.py consumes Filigree assignee/claim_state. The north-star routes WHO to a NEW sixth member (Tabard) certifying task-assignment identity. Warpline's events will want to carry/correlate that certified WHO once Tabard exists, but no seam reserves space for a Tabard credential on a change episode \u2014 today WHO is just the unverified git author string."
    }
  ],
  "blockers": [
    "Sequencing fence (PDR-0025 condition 3 / decision 0003): the temporal-correlation spine is explicitly Rung-3/token-tier and MUST sit BEHIND the four/five-member launch cutover (weft-4b2f948f70) and warpline's base-impl fast-follow. The north-star cannot pull warpline's WHEN role forward without breaching this owner condition.",
    "Cross-member SHA-stamping is hub-authored, not warpline's to author (PDR-0023 / decision 0003): no sibling obligation (Filigree/Wardline/Legis/Loomweave to stamp originating branch@sha) freezes until the hub authors it against warpline's demonstrated reconstruction. Warpline is contractually barred from dictating the seam peer-to-peer, so the federation-wide WHEN join is gated on a hub action that has not happened.",
    "Tabard (the WHO authority) is a Phase-0 spike, NOT built and NOT in the launch cutover. Any north-star flow that pairs warpline's WHEN with a certified WHO is blocked on a member that does not exist yet.",
    "Squash-merge SHA-rewrite has no owned reconciliation signal. The candidate Legis merge-mapping seam is unbuilt and itself subject to prove-the-need; without it, the WHEN join breaks on default-mode merges (a doctrinal honesty problem, not just a feature gap)."
  ],
  "seam_changes": [
    {
      "seam": "COP / temporal frame read surface (branch_sha, time_window, sei, rev_range, edit frames)",
      "change": "Promote the interface-pending COP read tool to a frozen warpline.temporal_cop.v1 (or similar) contract so the WHEN coordinate is federation-callable, and surface detected_branch on it. This is a NEW v1 contract URI, so it does NOT mutate a frozen contract \u2014 additive, per the interface-lock 'a v2 is a new URI' rule.",
      "touches_frozen_contract": false
    },
    {
      "seam": "change_events working-context anchor (detected_branch/head_sha/at/context)",
      "change": "Already shipped in non-frozen internal storage (store.py v2 migration). To participate in the federation join it needs to appear on a frozen read path's output (see COP seam above); the storage itself needs no contract change.",
      "touches_frozen_contract": false
    },
    {
      "seam": "Hub-authored 'stamp originating branch@sha' convention on sibling events (Filigree issue/claim/close, Wardline finding/waiver, Legis attestation, Loomweave delta)",
      "change": "Each sibling persists the originating branch@sha as OPTIONAL event metadata; warpline performs the read-time join. Enrich-only and additive, but it is a NEW federation convention the hub must author. Touches each sibling's event/record shape additively \u2014 flag for hub authoring, not a warpline unilateral edit.",
      "touches_frozen_contract": true
    },
    {
      "seam": "Legis merge-mapping feed {squashed-away SHAs} -> {new mainline SHA}",
      "change": "A NEW Legis-owned, hub-blessed seam (distinct from the existing rename feed) that warpline would consume to reconcile squash/rebase SHA-rewrite. Reserved-shape until prove-the-need; warpline already degrades honestly without it.",
      "touches_frozen_contract": false
    },
    {
      "seam": "Tabard (WHO) credential correlation on a change episode",
      "change": "Reserve an optional certified-WHO field on warpline's temporal episode so a change episode can be correlated to the Tabard credential that was active, replacing/augmenting the raw git author string. New seam, depends on Tabard existing first.",
      "touches_frozen_contract": false
    }
  ],
  "forgotten_functionality": [
    {
      "capability": "Warpline already records detected_context = clean / working_tree_dirty / detached_head as an honest episode-quality signal (git.py:_detect_anchor)",
      "why_it_matters": "The north-star's BACKGROUND-TICKET / change-debt model assumes 'any editing without a ticket silently accrues to a background ticket, the BODY is the through-line.' Warpline already distinguishes a committed-clean episode from a dirty-tree or detached-HEAD episode \u2014 i.e. it can tell when work happened OUTSIDE a clean commit boundary, which is precisely the uncommitted/unticketed edit state the background-ticket idea wants to capture. The hub designed background-ticket capture around a Legis commit-detection trigger; warpline already sees the pre-commit dirty-tree episode the commit trigger would MISS.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Honest dark-sector coverage rendering: the COP always names who answered, who was unreachable, and how stale (cop.py compose_temporal_cop coverage.dark_sectors), never a confident-empty",
      "why_it_matters": "The north-star's POST-FACTO/enrich-only rails say 'an unmonitored source must never read as nothing changed.' Warpline has already BUILT and shipped this exact honesty surface for the cross-member picture. The hub design states the principle but assigns no owner for rendering coverage; warpline already owns the mechanism (weft-reason class per member, dark_sectors block). The design should name warpline's COP coverage block as the canonical implementation rather than re-inventing it.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Co-change / temporal-coupling graph (coupling.py + co_change_pairs table): 'these entities change together 84% of the time with NO call edge between them'",
      "why_it_matters": "The north-star frames WHEN purely as correlation plumbing (stamp a SHA, join at read time). It overlooks that warpline derives EMERGENT episode structure from history that no per-event stamp can produce: which SEIs habitually move together. This is a second, richer definition of 'what changed together' that does not depend on universal SHA stamping at all \u2014 it works on whoever's history warpline already has. The design's stamping convention is the floor, not the ceiling.",
      "should_change_design": "maybe"
    },
    {
      "capability": "Self-healing SEI re-resolution (reresolve.py): re-keys sei:null change-events whenever Loomweave is reachable",
      "why_it_matters": "The north-star says WHAT is owned by Loomweave/SEI and treats it as a stable given. Warpline already confronts the reality that SEIs resolved during a Loomweave outage are stored null and silently degrade every join to a fragile locator. Warpline owns a repair loop for the WHAT coordinate's gaps. Any federation join keyed on SEI inherits this fragility, and warpline is the only member that remembers across runs well enough to heal it \u2014 the design should acknowledge SEI joinability is a fraction, not a guarantee, and that warpline is its custodian over time.",
      "should_change_design": "maybe"
    },
    {
      "capability": "branch_sha frame degrades to an explicit unresolved-input empty when it cannot bound an episode, rather than reading the WHOLE repo history as a confident partial (cop.py:267-296)",
      "why_it_matters": "The north-star's load-bearing rail is 'never reject; observe and record; honest labelling.' Warpline has already discovered the dual failure: a false-PRECISE output (whole history dressed as a partial set) is as dishonest as a rejection. The design's 'post-facto never reject' framing does not address false-precision \u2014 warpline's experience shows the honesty invariant must forbid confident-everything as well as confident-nothing.",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Warpline records git author as change_events.actor and consumes Filigree claim_state/assignee/stale_claim (git.py:252, siblings.py:60-66)",
      "why_it_matters": "The north-star invents Tabard as a NEW sixth member to own WHO-by-assignment and points to Filigree's work_claim/assignee as the durable handle. Warpline ALREADY correlates the Filigree claim/assignee onto changed entities and already carries a (weak, unverified) git-author WHO per episode. The WHO<->WHEN correlation the design assigns to a future Tabard+Warpline pairing is partially live today through Warpline's existing Filigree seam \u2014 Tabard's job is to CERTIFY the WHO warpline already correlates, not to introduce the correlation. The design overlooked that warpline is the natural home for the WHO-on-episode join.",
      "should_change_design": "yes-materially"
    }
  ],
  "headline": "Warpline is the north-star's closest fit \u2014 it has already built the WHEN coordinate (anchor columns, COP frame resolution, honest squash-merge degradation) without touching a frozen contract, and the owner ratified it (PDR-0025) as temporal-episode owner; the remaining work is ratifying the episode boundary, frozen-surfacing branch_sha, the unsolved SHA-rewrite reconciliation, and the hub-authored cross-member stamping convention \u2014 all gated BEHIND the launch cutover."
}
```

### tabard

```json
{
  "project": "tabard",
  "distance": "far",
  "distance_rationale": "Authors the WHO coordinate in spec but zero code; spike unrun; a position not an implementation",
  "gaps": [
    {
      "gap": "No implementation",
      "severity": "blocker",
      "detail": "Version-only stub; no sign or verify code, no oracle"
    },
    {
      "gap": "Phase 0 may no-go",
      "severity": "blocker",
      "detail": "Four gates not run; Seal feasibility unproven"
    },
    {
      "gap": "Key-custody unmet",
      "severity": "major",
      "detail": "Custody on shared and CI hosts owner-reserved"
    },
    {
      "gap": "Doctrine 2 and 6 unfiled",
      "severity": "major",
      "detail": "PDR 0002 endorsed; hub lock-in pending"
    },
    {
      "gap": "Handle not hub-blessed",
      "severity": "major",
      "detail": "Three consumers await one canonical handle"
    },
    {
      "gap": "Tier schema unlocked",
      "severity": "minor",
      "detail": "Co-design is a v0.1 obligation"
    }
  ],
  "blockers": [
    "Unrun open Phase 0 spike",
    "Key-custody owner-reserved",
    "Doctrine amendment unfiled",
    "Handle not hub-blessed",
    "Outside the launch cutover",
    "Point 4 ticket absent from PDRs"
  ],
  "seam_changes": [
    {
      "seam": "doctrine 2 and 6",
      "change": "Re-scope Loomweave to SEI; add Tabard as peer actor authority",
      "touches_frozen_contract": false
    },
    {
      "seam": "Filigree verified actor tier",
      "change": "Co-design assurance-tier schema; never load-bearing",
      "touches_frozen_contract": true
    },
    {
      "seam": "handle Warpline Wardline Legis",
      "change": "One hub-blessed handle; sign over the stamp; attest spans artifacts plus ledger; Legis attributes verdicts",
      "touches_frozen_contract": false
    }
  ],
  "forgotten_functionality": [
    {
      "capability": "Body and principal are two objects already split",
      "why_it_matters": "Hub-note 3 bars hashing body into principal; north-star risks re-merging",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Collision-by-comparison lands now without crypto",
      "why_it_matters": "Self-describing handle gives contention for free; collision guard is an unneeded subsystem",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "Point 4 contradicts principal-equals-claim",
      "why_it_matters": "No ticket means anonymous Body; auto-baking manufactures a principal answering an open edge by fiat",
      "should_change_design": "yes-materially"
    },
    {
      "capability": "who-when interlock and cheap no-go",
      "why_it_matters": "Continuity needs WHEN as session frame; a no-go folds WHO into Filigree or Legis with zero rework",
      "should_change_design": "maybe"
    }
  ],
  "headline": "Tabard authored the WHO coordinate and is its closest doctrinal match but has zero code and an unrun open spike"
}
```