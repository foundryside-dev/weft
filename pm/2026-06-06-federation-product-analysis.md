# Weft Federation — Product Analysis & Roadmap

> **PM working analysis — NOT part of the authoritative interop layer.**
> This document lives in `pm/` deliberately: it is product-management opinion,
> not a federation contract. Nothing here is authoritative for any member or for
> the hub's interop docs (see [`../MANIFEST.md`](../MANIFEST.md)). Where a claim
> contradicts a member repo, the repo wins. Ideas that earn promotion go through
> [`../roadmap-ideas.md`](../roadmap-ideas.md) and the go/no-go test
> ([`../doctrine.md`](../doctrine.md) §7) like Legis and Charter did.
>
> **Date:** 2026-06-06 · **Method:** first-principles per-member analysis by five
> parallel deep-read agents (one per repo), each followed by an adversarial
> red-team that challenged every "genuine-gap quick win" and checked doctrine
> compliance. Recommendations are provenance-tagged **genuine-gap** /
> **already-planned** / **deferred-on-purpose** against each repo's own roadmap.
> Where the red-team downgraded or rejected a finding, this doc carries the
> corrected verdict, not the analyst's first pass.

---

## 0. The one-paragraph version

The federation is in far better shape than its own front door admits. All five
members have shipped or are at release-candidate; the SEI identity spine is real,
locked, and CI-conformance-gated; the doctrine (enrich-only, SEI-keyed, additive
generations) is genuinely lived, not aspirational. **The dominant problem is not
capability — it is that the federation has out-run its own documentation, and a
few high-leverage interop surfaces are underbuilt.** For an agent-first suite,
stale docs *are* a broken interface: a sibling agent that follows the hub's
pointers today hits dead `~/clarion` paths. The highest-value PM work for the next
cycle is therefore **(1) stop the docs lying, (2) converge the five MCP surfaces
on one introspection convention, (3) finish the SEI consumer surface and Charter's
federation adapters, and (4) resolve one genuine doctrine crack — the Legis
closure-gate — before it becomes a pattern.** The single best *new* component to
spike is an **Agent Identity authority**: the actor-analogue of SEI, the one spine
primitive the suite is missing.

---

## 1. Executive summary — the six cross-cutting findings

These are the findings that only the *cross-member* view surfaces. They matter
more than any single member's backlog, and four of the six are cheap.

### F1 — The federation has out-run its documentation (severity: high, cost: low)
**Every** member's hub snapshot is stale, and one instance actively breaks agents:

| Member | Hub/README says | Reality in repo |
|---|---|---|
| Loomweave | "v1.3 / v1.1-pending surface" | **v1.0.0** (Clarion 1.3.0 rename); v1.1-deferred items already landed |
| Filigree | "v2.x / ~115 tools" | **3.0.0rc2** on `release/3.0.0` — a deliberate wire-break; do not pin yet |
| Wardline | "0.3.0 shipped / four policy rules" | **1.0.0rc1**, ~171 commits past tag, **~20 rules** |
| Legis | "1.0.0rc1 / MCP designed, in flight" | **1.0.0rc3**, MCP surface **shipped** (13 tools) |
| Charter | "scaffold / MCP deferred" | **v0.1.0 core fully implemented**, 10-tool MCP read surface live |

Worst instance (verified firsthand in this working tree, not analyst-reported):
the `clarion → loomweave` directory rename left the **hub's own docs pointing at
dead `~/clarion/...` paths**. The in-progress edits already in your working tree
(`M contracts-index.md`, `M sei-standard.md`, `M glossary.md`) did the **display**
rebrand (Clarion→Loomweave in prose, `clarion:eid:`→`loomweave:eid:`) but left
**every filesystem path untouched** — so the sweep is genuinely half-finished on
the layer that matters to an agent. The residue splits in two and must be handled
differently:

- **Live broken pointers — fix now.** A sibling agent following these hits a dead path *today*: `README.md` roster (`~/clarion`), `members/loomweave.md` (repo path + stale v1.3.0/39-tool snapshot), `contracts-index.md` (the `~/clarion/docs/federation/contracts.md`, ADR, and `sei-conformance-oracle.json` fixture citations across §1–§9), `asterisk-register.md` (the `clarion sarif import` command + `~/clarion/docs/clarion/adr/...` ADR paths), `sei-standard.md` (fixture paths at lines 74/179). Actual locations are `~/loomweave/...` and the command is `loomweave sarif import`.
- **Legitimately historical — leave it.** "Promoted from `~/clarion/docs/suite/weft.md`" provenance lines (`doctrine.md`, `glossary.md`, `MANIFEST.md`) and the dated sweep in `conflict-register.md` record where a doc *came from* at a point in time; your own "Preserve historical records in Loom→Weft rename" commit says keep these.

This path-layer sweep is the lowest-effort, highest-immediate-harm item in the
entire analysis. (Separately: `CLAUDE.md`/`AGENTS.md` still carry
`CLARION_REGISTRY_VERSION_MISMATCH` / `CLARION_OUT_OF_SYNC` error codes — these are
cross-product codes consumers switch on; reconcile whether they are frozen-for-compat
or should track the rename, but that is a suite-wide decision, not a hub-doc fix.)

### F2 — Five MCP surfaces, no shared convention; quality varies 3× (severity: high, cost: medium)
The suite is agent-first but each member reinvented its MCP envelope. There is a
clear quality ladder and a clear reference design hiding in plain sight:

- **Charter** has the best *envelope*: `{schema, ok, data|error, warnings, meta{producer, generated_at, project}}`, closed error-code enums, a self-describing `project_context` advertising capability + authority.
- **Loomweave** has the best *per-tool safety metadata* (`read_only / writes_local / writes_external / spawns_process / may_call_llm`) and the best *result semantics* (`result_kind` = matched/no_matches/unavailable, so an empty result is never misread as a true negative).
- **Legis** has the best *composed verbs* (designed from two real agent interviews — e.g. one `override_submit` routing all four cells, with `NEED_INPUTS` as a guided non-error).
- **Filigree** has the most *breadth* (~115 tools, ADR-016 namespacing applied on the wire, `[tier: core]` hints) but **lacks** per-tool side-effect metadata and schema-version ids — which now matters because its closure-gate can make `issue_close` a fail-closed network call an agent cannot see from the schema.
- **Wardline** is mature (composed `scan ... explain:true`, dry-run-by-default `scan_file_findings`) but has organic naming drift (`file_finding` vs `scan_file_findings`).

**The PM move is a hub-owned `Weft MCP Conventions` interop note** (docs only,
doctrine-safe): one envelope shape with `{schema: "<member>.<entity>.vN", producer}`,
per-tool `mutates/local_only/peer_side_effects` metadata, `result_kind`/honest-empty
discipline, and a capability-discovery tool. Charter + Loomweave are already the
reference; Filigree, Wardline, Legis converge **additively**. This makes every
agent that drives one member able to drive all five the same way.

### F3 — The SEI consumer surface is underbuilt — and it's the highest-leverage surface (severity: high, cost: medium)
SEI minting is excellent. SEI *consumption* — what the other four members actually
do all day — has three real gaps:

1. **No MCP identity tools.** `resolve` / `resolve_sei` / `lineage` are HTTP-only. An MCP-only consult agent literally cannot fetch the join key the whole federation binds on without shelling out to HTTP. (genuine-gap, H/M)
2. **No `SEI:batch` route.** The locator axis has `resolve:batch` (256); the SEI axis has none — so a sibling holding many bindings must fire N single GETs to do the *exact drift-detection job* ADR-029 defines (`content_hash_at_attach` vs current). (red-team-surfaced; higher real-world value than the analyst's own picks)
3. **No discrete capability flag for lineage evolution** — the contract already proved (with `taint_store.read_by_sei`) that staged route rollout needs a flag; the audit-spine `lineage` route has none to gate on.

This is the spine. Fixing the consumer ergonomics here pays off in all four
consumers at once.

### F4 — The "never load-bearing" invariant has its first crack (severity: high, cost: low to surface / strategic to resolve)
Filigree's **Legis closure-gate**: once `LEGIS_URL` is set, closing a governed
issue consults Legis and **fails closed (409) if Legis is unreachable**. The
default product stays solo-useful (invisible until opted in), so this isn't a
violation that slipped through — it's a **deliberate, scoped exception**. But the
honest characterization is *opt-in, yet load-bearing once opted-in*, and that is
precisely what enrich-only forbids. Two actions:
- **Now (S):** surface it loudly — distinct error code (not a generic 409), `peer_side_effects: ["legis"]` on close tools, docs stating governed closes require Legis liveness. An agent must never *discover* this via a surprise 409.
- **Strategic:** a hub ADR codifying "scoped load-bearing exceptions" — when an opt-in gate may fail-closed, what degraded-mode contract and disclosure it must carry — so the invariant erodes by *explicit decision*, never by accretion.

### F5 — The integration matrix has more "designed" cells than "live" cells; Charter is the bottleneck (severity: medium, cost: medium)
- **Asterisk A-1 is one test away from retirement.** Wardline's native Filigree emitter has **shipped** (verified: `~/wardline/src/wardline/core/filigree_emit.py` builds `POST /api/weft/scan-results`, all finding kinds) — findings no longer *require* the Loomweave SARIF translator. Per A-1's own written retirement condition (emitter ships **and** composition verified with Loomweave absent), the only remaining gate is Wardline's "Loomweave-absent (Wardline+Filigree) composition test." Land it, then update `federation-map.md` §4 + `asterisk-register.md`.
- **Charter is the weakest link** — not because it's immature (its *core* is built) but because every one of its cross-tool cells is "planned": the SEI consumer adapter, the `preflight_facts.v1` producer → Legis consumer, and the Charter↔Filigree binding all exist only in ADRs. **There is zero Charter↔Filigree binding in code today** — a genuine, doctrine-clean gap (requirement ⇄ work, via the change feed).

### F6 — The change-feed is the federation's missing transport primitive (severity: medium, cost: medium)
Every "mirror Filigree work-state" story (Charter marking a requirement satisfied
when its issue closes; any incremental sync) rides on Filigree's
`get_changes` / weft `/changes`. The red-team correctly downgraded this from
"quick win" to a **real project** (it rides the events table; `compact_events`
interacts). But it is the substrate the enrich-only-mirroring pattern depends on —
harden it into one ordered, resumable, VACUUM-stable, all-entity-kind cursor and
the whole "passive consumer pulls state" pattern lights up across the suite.

---

## 2. Prioritized roadmap

Effort: **S** ≈ hours–day · **M** ≈ days–week · **L** ≈ multi-week.
Value reflects the **red-teamed** verdict, not the analyst's first pass.

### NOW — stop the bleeding (all S, mostly docs/contract hygiene)
| # | Item | Owner | V/E |
|---|---|---|---|
| 1 | **Finish the hub path sweep** — the working-tree edits did the display rebrand but not the paths; fix the *live broken* `~/clarion/...` pointers (`README.md`, `members/loomweave.md`, `contracts-index.md`, `asterisk-register.md`'s `clarion sarif import`, `sei-standard.md` fixtures); leave historical-provenance lines | hub | H/S |
| 2 | **Correct every stale snapshot** — member briefings (5 versions) + Wardline README ("four rules→~20", "0.3.0→1.0.0rc1") + Legis README/CHANGELOG (rc1→rc3, MCP shipped) + Charter ("scaffold"→"core built") | hub + repos | H/S |
| 3 | **Retire asterisk A-1** — Wardline native emitter shipped; update `federation-map.md` §4 + `asterisk-register.md`; gate on Wardline's Loomweave-absent composition test | hub + Wardline | H/S |
| 4 | **Surface the closure-gate failure mode** — distinct error code + `peer_side_effects` metadata + docs on Filigree close surface (F4) | Filigree | H/S |
| 5 | **Legis: register in its own `.mcp.json` + declare MCP shipped at rc3** | Legis | H/S |

### NEXT — the interop layer (mostly M, high leverage)
| # | Item | Owner | V/E |
|---|---|---|---|
| 6 | **`Weft MCP Conventions` interop note** (F2) — envelope + schema-version ids + side-effect metadata + capability-discovery tool; Charter/Loomweave as reference | hub, then all | H/M |
| 7 | **SEI consumer surface** (F3) — Loomweave MCP `identity_resolve`/`entity_lineage_get` tools + `POST /api/v1/identity/sei:batch` + lineage capability flag | Loomweave | H/M |
| 8 | **Filigree adopts MCP introspection conventions** — per-tool `mutates/local_only/peer_side_effects` (paired with fixing the GET-that-mutates so `mutates:false` is truthful) + schema-versioned envelopes; land in the 3.0 window | Filigree | H/M |
| 9 | **Charter federation adapters** (F5) — build the SEI consumer adapter + `preflight_facts.v1` producer↔Legis consumer pair; establish the first Charter↔Filigree binding via the change feed | Charter + Legis | H/M |
| 10 | **Harden the change-feed/event-cursor** (F6) into a first-class resumable paginated all-entity-kind contract | Filigree | H/L |
| 11 | **Hub ADR: scoped load-bearing exceptions** (F4) — the degraded-mode + disclosure contract for opt-in fail-closed gates | hub | M/M |

### LATER — strategic bets & new components (see §4)
| # | Item | V/E |
|---|---|---|
| 12 | **Spike + spec an Agent Identity authority** (the recommended next member) | H/L |
| 13 | **Go/no-go design spike: Change-Impact / Code-History authority** (resolve aggregator-vs-bounded) | H/L |
| 14 | Loomweave: publish the L4 plugin protocol as a versioned external spec + conformance harness (unblocks the suite's non-Python reach) | M/L |
| 15 | Wardline → Charter: feed `assure` posture + signed `attest` bundle as verification evidence | M/L |

---

## 3. Per-member scorecards

### Loomweave — `~/loomweave` (Rust) · v1.0.0 · the map *and* the coordinate system
**First-principles job:** turn a codebase into a queryable, identity-stable
structural graph an agent reads instead of re-deriving by grep — and, load-bearing
for the suite, mint/resolve **SEI** so every cross-tool binding keys on a name that
survives rename/move. *"The federation's map and its coordinate system."*

**Maturity:** the most disciplined member — 44 ADRs, tiered design ladder,
CI-enforced SEI conformance oracle, closed error-code enum shared HTTP↔MCP.
Deliberately narrow (Python-only; multi-language is v2.0+). On
`feat/serve-no-index-chirp` with in-flight ADR-044 (ephemeral-port read API).

**MCP verdict:** strongest agent-driven surface in the suite — `noun_verb_list`
naming, `result_kind` tri-state, `scope_excludes`, honest-empty, and the
standout composed verb `entity_orientation_pack_get` (one packet replaces
find+at+source+neighborhood+issues+freshness).

**Top genuine gaps:** (1) **no MCP identity tools** — the authority's primary
agent surface can't reach the join key it owns [H/M]; (2) **no `SEI:batch`** drift
route [H/M, red-team pick]; (3) MCP capability-discovery tool [H/S].
**Quick wins (already-planned):** stale-`running`-row reaper; `analyze_start`
wall-clock timeout.
**Risk/debt:** it is the **hub's pointers to Loomweave** that are broken, not the
repo (repo is clean post-rename); identity is load-bearing yet MCP-unreachable.

### Filigree — `~/filigree` (Python) · 3.0.0rc2 · the workforce coordinator
**First-principles job:** turn a swarm of stateless agents into a coordinated
workforce — a race-free claim on a unit of work, a dependency-aware ready queue,
and a pre-computed orientation snapshot, so no two agents collide and none re-reads
history to know what to do next.

**Maturity:** 3.0 is a deliberate SemVer-major **wire-break** (ADR-016 MCP
namespacing on the wire; Loom→Weft hard rebrand, schema v26; transport-bound
`verified_*` actor identity; Legis closure-gate). **rc2 — not pin-safe yet**;
de-Clarionization checklist incomplete. ~100 open issues, overwhelmingly
hardening — a stabilization posture, not greenfield.

**MCP verdict:** most mature by breadth; the `filigree://context` resource +
`session_context_get` + `filigree-workflow` prompt are the best onboarding
ergonomics in the suite. Lags Charter on *introspectability*.

**Top genuine gaps:** (1) **per-tool side-effect metadata** — agents can't see
`issue_close` may make a fail-closed Legis call [H/M, #1 red-team pick]; (2)
schema-versioned envelope ids [M/M] — *bundle (1)+(2) as one "adopt Charter
conventions" item*; (3) harden the change-cursor [H/L].
**Headline risk:** the **closure-gate load-bearing crack** (F4). Also: SSRF/token
surface on the Loomweave bearer path (both audits flagged); the classic-alias auth
bypass is **already fixed on the branch** (red-team correction — don't re-fund it).

### Wardline — `~/wardline` (Python) · 1.0.0rc1 · the in-AST trust oracle
**First-principles job:** answer one question, statically and deterministically —
"is the data each trust-annotated function works with as trusted as it claims to
be?" Propagate an 8-tier taint lattice across the call graph; flag untrusted data
reaching a trusted producer with no validation between.

**Maturity:** ~171 commits past its last tag; since 0.3.0 it landed the **native
Filigree emitter** (retires A-1), `assure`/`attest`, dossier, decorator coverage.
Well-aligned: emits to the `weft` generation, treats SEI opaque, degrades when
siblings absent.

**MCP verdict:** mature composed verbs (`scan` with conjunctive `where` +
`explain:true`; dry-run-by-default `scan_file_findings`). Organic naming drift is
the main blemish.

**Top genuine gaps:** (1) **docs lie** — "four rules" (actually ~20), "0.3.0
shipped" (actually 1.0.0rc1) [H/S]; (2) a `rules` discoverability tool so agents
learn the rule set without docs [L/S]. **Already-planned, high-value:**
`confine_to_root=True` default (H1); ship the composition test to retire A-1.
**Next-component signal:** cleanly defines its own complement — **third-party /
supply-chain trust ("Warp") is structurally outside its charter.**

### Legis — `~/legis` (Python/FastAPI) · 1.0.0rc3 · the one judge
**First-principles job:** make every agent action at the git/CI boundary that
breaks a policy produce exactly one attributable, tamper-evident, identity-stable
audit record instead of a silent pass — and grade *who must answer*
(self-record / LLM-judge / human sign-off) **server-side**, so the agent never
chooses how cheaply it clears a gate.

**Maturity:** rc3 (docs say rc1); full MCP stdio surface **built** (WP-M1..M6,
13 tools). Disciplined SEI consumer (opaque, keyed-on-SEI, honest
`identity_stable:false` degrade, prefix-hash custody).

**MCP verdict:** **best-designed MCP surface in the federation** (built from agent
interviews) — unified `override_submit`, `NEED_INPUTS` as guided non-error,
discriminated `outcome` envelope with `isError` reserved for integrity faults.

**Top genuine gaps:** (1) declare MCP shipped + register own `.mcp.json` [H/S];
(2) **governance health read tools** — `governance_identity_gaps`,
`lineage_integrity_get`, aggregate `governance_context(entity)` [H/S–M]; the
service layer should become the single mandatory governance path (close 3-impl
drift).
**Next-component signal (the strongest in the suite):** Legis attributes records
to `agent_id` — **free-text, in-session-spoof-safe only**; cross-host
non-repudiation (signed launch token) is deferred. Legis *structurally cannot mint
agent identity*, same reason it can't mint SEI. → **Agent Identity authority** (§4).

### Charter — `~/charter` (Python) · v0.1.0 · the obligations system-of-record
**First-principles job:** record what must be true, keep accepted truth separate
from proposed/inferred/stale/imported guesses (never collapsing them), track how
each obligation is verified and when that evidence goes stale, and answer "what
obligations does this change touch?"

**Maturity:** **core fully implemented** (requirement lifecycle, immutable
versions, typed trace links with authority+freshness, locked baselines) — the
"scaffold" snapshot is wrong. **Federation adapters are the gap** (SEI consumer,
preflight envelope: designed, unbuilt).

**MCP verdict:** **best envelope/introspection in the suite** (the reference for
F2) — `{schema, ok, data|error, warnings, meta{producer...}}`, closed enums,
self-describing `project_context`. 10 tools, consistent `charter_<noun>_<verb>`.

**Top genuine gaps:** expose all six verification statuses over MCP (not just
unverified/stale) [H/S]; version/history retrieval (dossier is current-only)
[M/M]. **Strategic (deferred-on-purpose):** the **impact-analysis surface** —
Charter's own deferred headline value, and a key input to the Change-Impact
component (§4).
**Anti-signal (important):** do **not** promote contradiction-detection /
release-readiness / the filled dossier into a new aggregator member — doctrine
forbids the central orchestrator; these correctly live *inside* Charter.

---

## 4. The next major new component

The brief asked for "the next major new component." The existing bench
([`../roadmap-ideas.md`](../roadmap-ideas.md)) already reasoned about Selvage,
Warp, Reed, Bobbin, and a rejected decision-graph. The member analyses surfaced
**two candidates the bench missed**, both stronger than the bench's live entries.
A real PM answer engages the bench rather than inventing in a vacuum — so here is
the adjudication.

### The contest
| Candidate | Source signal | Go/no-go #1 (one bounded domain, no overlap) | Verdict |
|---|---|---|---|
| **Agent Identity authority** | Legis (strongest) | **Clean** — exact actor-analogue of SEI; Loomweave=code identity, this=actor identity; no overlap | **Recommend: spike + spec now** |
| **Change-Impact / Code-History authority** | Loomweave (loudest), Charter, Wardline | **Needs a spike** — risk it's a forbidden *aggregator*; survivable only if framed as a bounded *temporal-graph* authority | **Recommend: go/no-go design spike** |
| Selvage (release/compat matrix) | Wardline confirms gap | Medium risk it's "a doc + a CI job" | Defer until scale demands it |
| Warp (supply-chain provenance) | Wardline's complement | Clean but lower urgency than identity | Valid; later |
| Shuttle (change execution) | Charter, Wardline gesture at it | Premature — *impact* precedes *execution* | Hold |
| Governance-policy authority | Filigree (closure-gate leak) | Thin split vs Legis attestation | Fold into Legis unless the gate pattern multiplies |

### Recommendation #1 (lead): **Agent Identity authority** — the actor-analogue of SEI
The federation has a locked, opaque, signed, rename-stable identity for **code**
(SEI), and **nothing** for the **agents** whose actions five tools record, claim,
sign off, and attest. Today `agent_id` is free-text; Legis's entire value
proposition — *attributable, non-repudiable governance* — rests on an actor
identity it cannot itself mint.

- **Bounded domain:** mint/resolve an opaque, signed, durable agent credential. One thing. Exact architectural precedent in SEI — you have already built this shape once.
- **Solo-useful:** any multi-agent system needs durable actor identity independent of the rest of the suite.
- **Pairwise, enrich-only:** Legis attributes verdicts to it; Filigree binds `work_claim`/`verified_*` to it; the audit trail cites it. Absent → everyone falls back to today's free-text `agent_id`. Nothing breaks.
- **Seed already exists:** Legis's deferred *signed launch token* is the germ of it.
- **Why it's not a Legis feature:** Legis is a *consumer* of identity, not an authority (same reason it can't mint SEI); and Filigree needs the same credential, so it's genuinely cross-cutting and unowned.

This is the disciplined PM choice: a **cheap, foundational spine primitive** that
de-risks attribution/non-repudiation across the whole suite — the same role SEI
played for code. Low surface area, high leverage, exact precedent. *(Name per the
weaving/governance register rule, doctrine §8 — not decided here.)*

### Recommendation #2 (parallel spike): **Change-Impact / Code-History authority**
The loudest *functional* gap: *"given this diff/PR, which SEIs changed, what is
downstream-affected over the call graph, and what must be re-verified?"* All five
members touch it; none owns it. Loomweave has the graph + lineage but
**deliberately stores only the point-in-time graph** — `high_churn` and
`recently_changed` are dead no-ops *because no member stores per-entity history*.
Charter's deferred impact-analysis surface is the requirements-side slice.

**The risk is real:** naive framing makes this a forbidden aggregator (doctrine §6;
Charter's anti-signal). It survives go/no-go **only if** scoped as a bounded
**temporal-graph authority** — it owns *one* unowned thing: per-entity change
history keyed on SEI across runs, and the propagation query over the graph it
snapshots. It then *enriches* (Charter pulls "what to re-verify"; Legis pulls
gate scope) rather than orchestrating. That reframing is exactly what a design
spike must prove or kill. If it proves out, it's the richest product on the
roadmap and it lights up Loomweave's dead churn tools as a downstream consumer.

### Bench dispositions (explicit, so nothing is silently dropped)
- **Selvage** — defer; SHIPPING.md wants it but at 5 RC-stage products with no published version matrix yet, it's premature and risks being a CI job. Revisit at the first coordinated "Weft N.0" release.
- **Warp** — valid and clean (Wardline sharply defines the complement), but lower urgency than the identity spine. Keep on the bench.
- **Shuttle** — still premature; you cannot safely *execute* a scoped change without first *computing* its impact set, so Change-Impact precedes it.
- **Governance-policy authority** — do not spin up yet; the closure-gate is one data point. If a second fail-closed gate appears, the "where policy is evaluated" question becomes a real bounded domain.
- **Aggregator / release-readiness member** — **rejected** (reaffirming Charter's anti-signal and doctrine §6). Do not build it.

---

## 5. Appendix — corrected maturity table

*(Corrected from the repos by the analysis agents; verify against each repo before
amending the hub's own snapshots. Loomweave and A-1 below were additionally
confirmed firsthand.)*

| Member | Repo (current) | Version | State | MCP | Federation posture |
|---|---|---|---|---|---|
| Loomweave | `~/loomweave` | 1.0.0 | shipped; on `feat/serve-no-index-chirp` (ADR-044 in flight) | 39 tools, no identity verbs | identity authority; HTTP transport most complete; **hub pointers to it are stale** |
| Filigree | `~/filigree` | 3.0.0rc2 | RC on `release/3.0.0`; **not pin-safe** | ~115 tools, namespaced | work-state transport (`weft` gen); **closure-gate load-bearing crack** |
| Wardline | `~/wardline` | 1.0.0rc1 | ~171 commits past tag | ~14 tools, mature | native Filigree emitter shipped → **A-1 retireable** |
| Legis | `~/legis` | 1.0.0rc3 | RC; MCP shipped | 13 tools, **best designed** | best SEI-consumer discipline; **Agent Identity signal** |
| Charter | `~/charter` | 0.1.0 | core built; adapters pending | 10 tools, **best envelope** | matrix's weakest link (adapters); MCP reference design |

*Lacuna (`~/lacuna`) remains the demo specimen, not a member. Shuttle remains a
speculative thought-bubble. Neither is on the roster.*

---

*Generated by the Weft virtual-PM analysis pass, 2026-06-06. Five parallel
deep-read agents + adversarial red-team per member; synthesis and prioritization
by the PM. To act on any new-component idea, route it through `../doctrine.md` §7
and `../roadmap-ideas.md`.*
