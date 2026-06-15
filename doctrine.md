# Weft — federation doctrine

**Audience**: anyone designing, extending, or evaluating whether a new product belongs in the Weft family
**Purpose**: establishes the strategic direction, composition law, and go/no-go test that govern Weft as a suite
**Status**: **Authoritative.** This is the single source of the Weft federation doctrine. It was promoted here from `~/clarion/docs/suite/weft.md` (2026-06-05); that file is now a pointer to this one. Member products mirror the cross-product field-name rule (§8) citing this doc as the suite-level authority.
**Companions**: [glossary.md](./glossary.md) (shared vocabulary), [federation-map.md](./federation-map.md) (integration matrix), [README.md](./README.md) (hub entry point)

> **Reframe — PDR-0023 (2026-06-15): the federation is the product; the glue is the value.**
> Weft was scoped as a *loose wave of products* — five independent instruments that
> optionally interoperate. Under real agent use (the dogfood + the 2026-06-15 external
> cold-eval) the value came back unambiguously located in the **glue**: the SEI identity
> spine, the **seams** (the joins between members), and the cross-cutting quality
> conventions (provenance-honesty, lead-summary, bounded-by-default, SEI-keying). So the
> unit of value is now the **federation, not the member**; the members are
> components/proof-points. **The seams are the crown jewels** — a broken join is the
> *product* broken, not a peripheral bug. **Provenance-honesty is a protected invariant**
> (the moat-guard; see the honesty invariant below and
> [contracts-index.md](./contracts-index.md) § the `weft-reason` contract). This banner
> *re-weights* the doctrine below; it does not repeal the federation axiom (§3–7) — a seam
> can be both hub-governed and enrich-only. Full PDR:
> [pm/product/decisions/0023-federation-is-the-product-glue-is-the-value.md](./pm/product/decisions/0023-federation-is-the-product-glue-is-the-value.md).
>
> **The honesty invariant (the protected one).** No result ships without its provenance.
> Every empty / partial / stale / degraded cross-member result MUST explain
> **cause + reason_class + fix** (the three-part carrier), drawing `reason_class` from the
> canonical 11-class `weft-reason` vocabulary — **owner-blessed 2026-06-15, the first
> hub-blessed federation contract** ([contracts/weft-reason-vocab.json](./contracts/weft-reason-vocab.json),
> [pm/2026-06-15-weft-reason-contract-G1.md](./pm/2026-06-15-weft-reason-contract-G1.md)).
> A confident-empty — an `affected:[]` / `findings:0` / `allowed:true` that is
> byte-indistinguishable from a real true-negative but is actually a join-miss — is the
> federation's worst failure mode, because the lie becomes the premise of the next
> decision ([pm/2026-06-15-seam-health-map.md](./pm/2026-06-15-seam-health-map.md)).
>
> **Hub blesses every seam (the federation framing, owner ruling 2026-06-15).** This is the
> headline governance posture: **members keep autonomy over their own jobs, but every
> cross-member interaction — every seam — is hub-authored and hub-blessed**, so the joined
> flood stays coherent enough to synthesise over. The *alphabet* (cross-member contracts /
> seams) is hub-owned; members compose blessed primitives freely but do not mint new
> cross-member contracts. **"Enrich-only" is now a per-seam *property*, not the federation
> headline** — a real and required property of each binding (removing one side never breaks
> the other's core flow, §5), but it is *what a blessed seam must satisfy*, not the
> organizing principle of the suite. The organizing principle is the spine + the
> hub-blessed seams. This narrows the older "version-skew handled bilaterally" posture (§6):
> bilateral evolution of a cross-member contract is no longer a member's to decide.

---

## 1. What Weft is

Weft is **one product positioned as one seam supported by a suite of products** (owner ruling 2026-06-15, executing PDR-0023 §5). The seam — the **[SEI](./sei-standard.md) identity spine + the honest, hub-blessed joins** between members — is the hero; the members are a **supporting, open-ended suite**, each authoritative in its domain and usable on its own. The roster is a **current-state fact, not the identity**: the suite is *designed to grow* — weft-the-app becomes a full-class member ([PDR-0024](./pm/product/decisions/0024-the-fleet-is-the-customer-two-planes.md)), and daughter members are coming (e.g. the wardline/loomweave custom-checks daughter; "at least two more"). A head-count is never the thesis.

**The suite currently comprises** **Loomweave**, **Filigree**, **Wardline**, **Legis**, and **Warpline** (Warpline admitted 2026-06-14 per PDR-0022, against the §7 quality bar; this reversed the earlier PDR-0017 "not ready" ruling). The launch is a **five-member lockstep cutover** (Filigree, Loomweave, Wardline, Legis, and Warpline) — Warpline was pulled into the cutover per [PDR-0026](./pm/product/decisions/0026-warpline-joins-the-launch-cutover-as-fifth-member.md) (2026-06-16), reversing PDR-0022's fast-follow-*outside* posture; its build-out matures to launch-grade baseline in parallel ahead of a single coordinated lever-pull (the final whole-suite dogfood gates readiness). The clean-break freeze makes the cross-member **contracts inviolate** — a decent L1 may relax polish but never a contract ([PDR-0027](./pm/product/decisions/0027-decent-l1-gold-contracts-take-time-on-l2.md)). **Charter** has a realized local core and read-only MCP surface, but remains a planned Weft integration until its adapters ship. **Shuttle** is a roadmap thought-bubble, not a committed member: it has no repo, and any better idea the suite lands (Charter was started 2026-06-04) takes priority over it and may displace it. When composed, the members enrich one another through narrow, additive protocols — but each remains independently load-bearing for the work it already does, and **every cross-member join is hub-blessed** (the §10/§11 governance posture).

The metaphor is deliberate: distinct threads stay distinct but gain value by being woven together. Weft is a **family name** and a **composition doctrine** — not a platform, not a shared runtime, not a store, and not a broker. There is nothing called "Weft" to install, deploy, or keep running. What exists are the member products, a set of narrow interop contracts between them, and this hub (`~/weft`) which is documentation only — it holds no runtime, no store, and no code.

> **Roster note (a snapshot, not the identity).** The 2026-06-05 ruling admitted Legis and Charter into the Weft family and excluded Shuttle as a member. Current taxonomy as of 2026-06-15: the suite *currently comprises* Loomweave, Filigree, Wardline, Legis, and Warpline (Warpline admitted 2026-06-14, PDR-0022 / §7 quality bar; pulled into the five-member launch cutover per PDR-0026, 2026-06-16), Charter as a planned integration with local core/read-only MCP shipped, and Lacuna as the demo specimen. **This roster is open-ended** — it will grow (PDR-0024; daughter members) and the count is a current-state fact, never the suite's identity (the seam is). See [conflict-register.md](./conflict-register.md) §B-1 for the original ruling and its evidence.

## 2. The products and their authoritative domains

Each Weft product is authoritative for exactly one bounded concern, and that authority lives in the product itself — not in any shared layer:

- **Loomweave** — structural truth about the codebase, and the **identity authority** for the suite. Answers "what is this codebase, where should I touch, and what is the durable identity of this entity?" Owns the entity catalog, the code graph, guidance sheets, and the [Stable Entity Identity](./sei-standard.md) (SEI) every cross-tool binding keys on.
- **Filigree** — work state and workflow lifecycle. Answers "what work exists, what state is it in, and what happened?" Owns issues, observations, and finding triage state.
- **Wardline** — trust policy and rule enforcement. Answers "what is allowed, and does this still satisfy the declared constraints?" Owns trust declarations, baselines, and policy findings. Notably, Wardline's "configuration" is the source code itself plus the adjacent declarations — it does not have a separate authoritative config store.
- **Legis** — git/CI governance and attestations. Answers "what is the change provenance, and is this change governed?" Owns governance verdicts, overrides, sign-offs, and the SEI-keyed attestation/audit lineage over change. A consumer of Loomweave's identity; never re-adjudicates trust (that stays Wardline's).
- **Warpline** — temporal and change-impact authority. Answers "what changed, when, and what does this change touch?" Owns the change timeline, per-entity churn, impact radius, and the reverify worklist, keyed on Loomweave's SEI so its temporal facts survive rename and move.
- **Charter** *(planned Weft integration; local core/read-only MCP shipped)* — requirements, traceability, baselines, and verification evidence. Answers "what must be true, how do we know it is true, what claims to satisfy it, and what is impacted by this change?" Owns obligations; a read-only consumer of its peers' surfaces.
- **Shuttle** *(roadmap thought-bubble — not a committed member)* — the sketched idea is transactional scoped change execution: "carry this approved change through the weave, under guard rails," owning the execution record of applied changes and their rollback provenance. This is a placeholder for a *future* change-execution authority, not a designed product; it yields to any better idea.

The sketched Shuttle scope is deliberately narrow: receive a scoped change intent, bind it to files or entities, order the edits, apply them incrementally with pre/post checks, roll back on failure, and lint / commit / emit telemetry on success — without planning, triaging, or reasoning about the code. It is named only so the change-execution gap is acknowledged. Charter (requirements authority) is a *separate, realized* member and is not a substitute for it; do not conflate the two.

For each member's current version, status, and surface facts, see its briefing under [members/](./members/) — which points to the project's own authoritative source. The doctrine deliberately states no version numbers.

## 3. Federation, not monolith

**Weft is a federation, not a monolith. Each member product is authoritative in one bounded domain. Integration must be additive, not compulsory. No Weft product may require the full suite to justify its existence.**

This is the founding architectural law. There is no Weft runtime, no Weft config layer, and no Weft store. Weft is a family name, a composition doctrine, and a set of narrow interop contracts — nothing more. The rule protects against the stealth-monolith failure mode: a "lightweight glue layer" that quietly becomes the real system of record, reducing sibling products to thin clients and making solo mode dishonest. (This hub is documentation; per §6 it imports nothing and runs nothing, so it does not become that glue layer.)

## 4. The composition law

Any Weft product must satisfy all three modes:

- **Solo mode** — the product has a complete, respectable use-case by itself
- **Pair mode** — combined with any one sibling, it creates a meaningful capability, not a broken fragment
- **Suite mode** — all together form something richer, but suite mode must never be mandatory for basic usefulness

Pairwise composability is a hard rule, not an aspiration. A product that only works when all siblings are present is a feature of a monolith wearing modular clothing.

## 5. Enrichment, not load-bearing

**A sibling product may enrich another product's view, but it must never be required for that product's semantics to make sense.**

This is the rule that keeps integration additive. It has a concrete test and concrete consequences:

### The failure test

The principle has three failure modes. Any one of them means Weft has centralised too far:

1. **Semantic coupling** — if removing a sibling product changes the *meaning* of another product's own data. Sibling absence may reduce convenience or automation; it must not alter semantics. Less capability is acceptable; incoherent data is not.
2. **Initialization coupling** — if a product cannot start, self-test, or validate its own configuration without a sibling being present. The product may degrade its capabilities in the sibling's absence; it must not fail to boot.
3. **Pipeline coupling** — if a pair of sibling products (X, Z) cannot exchange data except through a third sibling (Y). Each pair's ability to compose must be independent of any uninvolved third product — pairwise composability (§4) is not satisfied if the pair silently routes through an absent mediator.

A "standalone mode" that works only because an invisible sibling is still imported, or a "pairwise mode" that actually routes through an absent mediator, is not federation.

### Concrete examples

- **Filigree** creates and closes tickets exactly the same way whether Loomweave is installed or not. Loomweave makes the tickets richer — entity context, file references, structural findings linked to issues — but doesn't change their meaning. You can file a bug, work it, and close it with Loomweave absent or broken.
- **Wardline** enforces trust policy whether Filigree is ingesting findings or not. Findings reach Wardline's own SARIF output regardless of whether a downstream triage system exists.
- **Loomweave** builds its catalog whether Wardline is present or not. Wardline's annotations *enrich* Loomweave's entity metadata with trust-tier and policy-semantic information, but Loomweave's structural truth is independent of Wardline's policy truth.
- **Legis** governs change provenance whether Loomweave, Wardline, or Filigree are present. Their facts enrich a verdict (which SEI? which finding? which issue sign-off?) but a governance decision still resolves, with `identity_stable: false` honestly flagged, when a sibling capability is absent.
- **Charter** states and tracks obligations whether peers are installed or not — with manual trace links and file/symbol refs in solo mode, and SEI-keyed links, work binding, and finding references when peers are present.
- **Shuttle**, if built, would execute changes whether any sibling is present. Sibling tools enrich its telemetry (which Filigree ticket? which Loomweave entity? which Wardline policy?) but are never required for a change to apply or roll back.

### Named asterisks

The suite does not pass the expanded failure test cleanly in every pair. Named, time-bound couplings — each with a written retirement condition and an honest statement of which failure-test mode it violates — are tracked in the **[asterisk-register.md](./asterisk-register.md)**, which is the authoritative register for the federation. As of 2026-06-05 one asterisk is live (Wardline→Filigree pipeline coupling) and one is retired (Loomweave's plugin importing Wardline's registry).

Asterisks are acceptable only with a written retirement condition and an honest statement of which failure-test mode is being temporarily violated. A "we'll fix it later" without a test-mode citation is not an asterisk; it is the stealth-monolith failure mode wearing different clothes. **Do not add a new asterisk without the same written retirement condition.**

### Why this matters

Enrichment is the shape of integration that preserves federation. Load-bearing integration collapses federation into monolith by another name. The moment one product *needs* another to make sense of its own data, the composition law becomes dishonest — "standalone mode" works only because the sibling is still running somewhere, and the illusion of modularity collapses the first time deployment doesn't match.

## 6. What Weft is NOT

Because the strongest pressure on this charter comes from "wouldn't it be easier if we just…" proposals, the disclaimer is explicit. Weft is **not**:

- **A shared runtime or daemon.** There is no `weftd`, no broker, no orchestrator. Member products do not phone home to a Weft process.
- **A shared configuration layer.** Each product configures its own integrations in its own config. Loomweave's config names Filigree's endpoint directly; there is no central registry that everyone consults.
- **A central store or database.** Each product owns its data locally. No shared SQLite/Postgres/object-store sits under the suite.
- **A system of record for any cross-product state.** Finding lifecycle lives in Filigree. Entity identity lives in Loomweave. Policy baselines live in Wardline. Governance attestations live in Legis. Requirements live in Charter. Execution provenance (if Shuttle ships) lives in Shuttle. Weft does not own or mirror these — and neither does this hub, which records only *which product is authoritative for what* and points there.
- **An identity reconciliation service.** When cross-scheme translation is needed — e.g. Wardline qualname → Loomweave entity ID — the product that *cares* does the translation, because that product is the one whose authority needs it. Loomweave translates qualnames because Loomweave owns the catalog that makes them meaningful. There is no neutral "Weft identity oracle." (Loomweave *is* the identity authority via SEI, but that authority lives in Loomweave, not in a shared layer.)
- **A capability negotiation bus.** Products probe each other directly via their own surfaces (HTTP endpoints, MCP tools, CLI flags). Version skew is handled bilaterally, not through a Weft-level registry.

The test for any proposed addition: if the proposal introduces something that would need to be *running* or *present* for the suite to work, it violates federation. Integration protocols, schemas, and narrow contracts are fine. Shared infrastructure that sibling products *depend on* is not.

## 7. The go/no-go test for future products

Before adopting any new product into Weft, it must pass all four:

1. **Is it authoritative for one narrowly bounded thing?** — if the scope is two or more things, it is two or more products.
2. **Is it useful by itself?** — if siblings are required for minimum utility, it is a feature or adapter, not a product.
3. **Does it form a sensible story with each existing product one-to-one?** — every pairing must yield a coherent workflow; no "this only matters when you also have X and Y" patterns.
4. **Is the full suite better because of it, without making the others incomplete in its absence?** — addition, not patching.

If the answer to any question is no, the candidate is a feature, a protocol, or an adapter — not a product. It may still belong in Weft's surface area, but not as a named member. Legis and Charter were admitted against this test (each authoritative for one bounded domain — governance and requirements respectively — solo-useful, pairwise-sensible, suite-enriching).

### The quality bar for formal admission (owner ruling, 2026-06-13)

The four structural tests decide whether a candidate is a *product*. Formal
admission additionally requires both halves of a quality standard:

1. **Standalone parity** — the candidate is *equally good compared to its peers*
   outside the federation: an agent or operator would reach for it **in preference
   to, or at least as readily as, any other tool in its category**.
2. **Federation enhancement** — membership *makes it better*: the federation gives
   it real capability it would not have standalone (SEI-keyed identity, sibling
   enrichment, shared deconfliction), so **having the federation installed is
   itself a reason to pick it** over the standalone peer.

Both must hold, in shipped behaviour, not aspiration. A tool that is best-of-breed
but gains nothing from siblings is a fine standalone product that doesn't need
admission; a tool that is only useful *because* of the federation is an adapter
(test 2 above). Admission remains owner-reserved; this bar is what any go/no-go
assessment measures against.

### The admission bar is the seam's growth-guard (owner ruling, 2026-06-15)

Because the positioning is **one seam supported by an open-ended suite** (§1), the
roster is *meant to grow* — weft-the-app joins as a full-class member
([PDR-0024](./pm/product/decisions/0024-the-fleet-is-the-customer-two-planes.md)),
and daughter members are coming (the wardline/loomweave custom-checks daughter; "at
least two more"). Growth is a feature, not a risk — **as long as it does not dilute
the seam.** The guard against dilution is this admission bar, now with a third,
non-negotiable limb:

- **Standalone parity** (above) and **federation enhancement** (above) still both hold;
  **plus**
- **Honesty conformance (the §10 invariant) — a hard gate.** A new member MUST conform
  to the canonical `weft-reason` vocabulary and ship **no confident-empty** surface
  ([federation-sdk.md](./federation-sdk.md) I-4). A member that returns confident-emptiness
  is *worse than a weak standalone tool*, because it breaks the glue's promise — the
  honesty contract that **is** the moat (PDR-0023 consequence 3). Capability cannot buy
  past it: a best-in-slot tool that lies about its own emptiness does not join.

So the suite scales by *adding honest members whose joins are hub-blessed*, never by
accreting capable-but-dishonest tools that erode the one thing the federation sells.
The seam stays the product as the roster grows.

## 8. Naming

Member products are named from weaving mechanics and adjacent registers — Loomweave, Filigree, Wardline, Legis, Warpline, Charter, Shuttle — as distinct proper names rather than subdivisions. There is no "Weft Guard," "Weft Workflow," or "Weft Execute"; each product earns its own identity. The family name sits above the products without dominating them, and — per §3 and §6 — it does not name any component that gets installed or runs.

### Cross-product field names

Federation does not require uniform vocabulary, but it does require that the same word never silently means two things across siblings. The discipline:

- A single word should mean the same thing across products, OR be confined to one product, OR have an explicit mapping documented in an Accepted ADR.
- The suite-level catalogue of cross-product-visible terms lives in [`glossary.md`](./glossary.md). It is a read-only design-review artefact (per §5: nothing imports it, nothing runs from it, removing it changes no semantics) and is federation-safe by construction.
- Each product enforces the rule locally in its own ADR-acceptance process, citing this section as the suite-level authority. CI lint or cross-repo enforcement is explicitly out of bounds — that would convert a federation-safe doc into shared infrastructure.

## 9. Status

Per-member version and status are **snapshots, not authoritative here** — each member's authoritative status lives in its own repo. See [members/](./members/) for the current pointer-backed snapshot of each. In summary as of 2026-06-16: Loomweave, Filigree, Wardline, Legis, and Warpline constitute the **five-member launch cutover** (Warpline pulled in per PDR-0026, 2026-06-16, reversing PDR-0022's fast-follow-outside posture; its build-out matures to launch-grade baseline in parallel). Loomweave, Filigree, Wardline, and Legis are built and in use; Charter is a designed-and-scaffolded member with federation adapters pending; Shuttle is a roadmap thought-bubble with no repo, lowest priority, displaceable by any better idea.

The keystone interop primitive, **Stable Entity Identity** ([sei-standard.md](./sei-standard.md)), is the suite's single identity track and is **LOCKED as of 2026-06-05** — the interface is frozen and post-lock changes require a versioned revision. Conformance stays oracle-gated; any member's locator→SEI backfill is a migration task under the locked standard, not a reopening of it. See the SEI standard and [conflict-register.md](./conflict-register.md) §B-2.

This charter is expected to outlive any single release and shape all subsequent product gates. Its load-bearing sentence is in §5: **enrichment, not load-bearing**. If that principle is ever compromised, the rest collapses.

## 10. The honesty invariant (the protected one)

Under PDR-0023 the federation is the product and the seams are its crown jewels; the
property that makes those seams *trustworthy* — and therefore reachable — is
**provenance-honesty**. The 2026-06-15 external cold-eval named it the suite's most
underrated asset ("the reason I trusted the answers … worth more than any one
analyzer"). The owner promoted it from a nice property to a **protected invariant — the
moat-guard.** It is non-negotiable, and it is now a hard admission gate
([federation-sdk.md](./federation-sdk.md) I-4).

**The rule.** *No result ships without its provenance.* Every cross-member result that is
**not** a clean, complete true-negative MUST carry a three-part honesty carrier:

- **`reason_class`** — the class a consumer switches on, drawn from a **closed canonical
  set of 11**: `clean`, `disabled`, `unresolved_input`, `rejected`, `dead_path`,
  `unreachable`, `misrouted`, `error`, `scheme_mismatch`, `stale`, `partial`.
- **`cause`** — what mechanically happened (machine + human readable).
- **`fix`** — the recruiting action that gets the caller what they wanted. **Mandatory on
  every non-`clean` result** — recruit, don't just confess.

A **`clean`** result carries `reason_class: "clean"` and omits `cause`/`fix` — the empty is
*earned and complete*. Explicit `clean` beats "no carrier," so a present-but-clean result is
never ambiguous with a forgotten one.

**The failure mode it kills: the confident-empty.** An `affected:[]` / `findings:0` /
`allowed:true` that is byte-indistinguishable from a legitimate true-negative but is actually
a join-miss, a stale snapshot, or a scheme drift. In a federation, a syscall that returns a
plausible wrong answer instead of `-ENOENT` is *worse than one that crashes* — every
downstream decision commits the corruption as fact and the lie becomes the premise of the
next decision (the dead loomweave→Filigree emit seam, silent for weeks, was this caught
once: [pm/2026-06-15-seam-health-map.md](./pm/2026-06-15-seam-health-map.md)). A member that
returns confident-emptiness is **worse than a weak standalone tool**, because it breaks the
glue's promise — the honesty contract that is the moat (PDR-0023 consequence 3).

**The contract (hub-blessed, no shared runtime dependency).** The canonical vocabulary is
the **first hub-blessed federation contract** — owner gate 2026-06-15
([contracts/weft-reason-vocab.json](./contracts/weft-reason-vocab.json) machine-readable +
[pm/2026-06-15-weft-reason-contract-G1.md](./pm/2026-06-15-weft-reason-contract-G1.md) the
doctrine; indexed at [contracts-index.md](./contracts-index.md) §0; convention
[conventions.md](./conventions.md) C-15). Members stay independent repos and conform by a
**per-member conformance test** asserting their reason surface against the canonical list —
no shared library, preserving the §6 no-shared-infrastructure posture. As of 2026-06-15 the
value vocabulary is conformed federation-wide across all five members (drift-failing tests
landed); the full carrier triple converges as members iterate (loomweave typed output / G3,
and for filigree inside the held `3.0.0`, additively).

**Honesty propagates through composition.** A macro or check built over the federation's
primitives is only as honest as its weakest sub-call: it MUST propagate the `weft-reason`
carrier and never swallow a sub-call's `unreachable` into a confident empty. This is the
honesty invariant applied one layer up — the precondition for the §11 sense-making plane.

## 11. The fleet-OS frame *(PDR-0024 — CANDIDATE, not yet authoritative canon)*

> **Status gate.** PDR-0024 is at **CANDIDATE** — referenceable but **not yet authoritative
> canon**, promotable to Adopted only on a first falsifier-test / dogfood proof. This section
> records the candidate direction so the rest of the canon can point at it; it does **not**
> bind any member, and nothing here is a frozen contract.
> ([pm/product/decisions/0024-the-fleet-is-the-customer-two-planes.md](./pm/product/decisions/0024-the-fleet-is-the-customer-two-planes.md).)

PDR-0023's "the federation is the product" raises a next question — *who is the glue for?* The
candidate answer (PDR-0024): **the federation's customer is a fleet of agents working the same
repos concurrently, not a single agent with a toolbox.** A fleet needs two planes, both resting
on the §10 honesty invariant (a coordination board whose stale tag reads as live, or a synthesis
engine fed a lying flood, fails the same confident-wrong way, at higher leverage):

- **Coordination plane** — agents don't silently collide: presence, advisory path reservation,
  escalation. The lockout-tagout (LOTO) **tag-out board**, hosted *additively* in filigree for
  now (reusing its claim/lease/heartbeat/reap engine; **additive-only — filigree's `3.0.0` users
  are not shocked twice**). Shaping:
  [pm/2026-06-15-fleet-coordination-tagout-shaping.md](./pm/2026-06-15-fleet-coordination-tagout-shaping.md).
- **Sense-making plane** — agents get wisdom from the honest, joined flood: the L2 **"strategic
  view" MCP** (the "so what" query) + an **agentic-macro clearing house** where agents compose
  and register their own synthesis macros and analysis checks over the blessed primitives.

Two invariants govern the platform if it is adopted: **honesty propagates through composition**
(§10) and **hub owns the alphabet, agents write the words** — agents freely compose blessed
primitives/seams (user-space, unlimited); they do **not** mint new cross-member contracts (those
stay hub-blessed, per the §1 seam-governance ruling). Composition is free; contract definition is
governed.

**Falsifiers (any kills or reshapes the bet):** agents *defect* from advisory tags under task
pressure; contention is too low for the board to matter; the synthesis is *greppable-away* (a
competent agent derives it from the honest tool outputs itself); or the macro/check registry is
never reused/shared (dead weight). Until a falsifier-test clears these, treat the fleet-OS frame
as a candidate direction, not doctrine.
