# Weft — federation doctrine

**Audience**: anyone designing, extending, or evaluating whether a new product belongs in the Weft family
**Purpose**: establishes the strategic direction, composition law, and go/no-go test that govern Weft as a suite
**Status**: **Authoritative.** This is the single source of the Weft federation doctrine. It was promoted here from `~/clarion/docs/suite/weft.md` (2026-06-05); that file is now a pointer to this one. Member products mirror the cross-product field-name rule (§8) citing this doc as the suite-level authority.
**Companions**: [glossary.md](./glossary.md) (shared vocabulary), [federation-map.md](./federation-map.md) (integration matrix), [README.md](./README.md) (hub entry point)

---

## 1. What Weft is

Weft is a suite for enterprise-grade code governance on small teams. Its members are **Loomweave**, **Filigree**, **Wardline**, **Legis**, and **Charter** — each fully authoritative in its domain and fully usable on its own. **Shuttle** is a roadmap thought-bubble, not a committed member: it has no repo, and any better idea the suite lands (Charter was started 2026-06-04) takes priority over it and may displace it. When composed, the members enrich one another through narrow, additive protocols — but each remains independently load-bearing for the work it already does.

The metaphor is deliberate: distinct threads stay distinct but gain value by being woven together. Weft is a **family name** and a **composition doctrine** — not a platform, not a shared runtime, not a store, and not a broker. There is nothing called "Weft" to install, deploy, or keep running. What exists are the member products, a set of narrow interop contracts between them, and this hub (`~/weft`) which is documentation only — it holds no runtime, no store, and no code.

> **Roster note.** The canonical federation roster is **5 realized members** (Loomweave, Filigree, Wardline, Legis, Charter); Shuttle is a roadmap thought-bubble, not a sixth member. This roster was ruled by the hub on 2026-06-05. Legis and Charter shipped/were-designed after the founding doctrine was last written and post-date its three-member framing; the hub admits them here as the body that declares the roster. See [conflict-register.md](./conflict-register.md) §B-1 for the ruling and its evidence.

## 2. The products and their authoritative domains

Each Weft product is authoritative for exactly one bounded concern, and that authority lives in the product itself — not in any shared layer:

- **Loomweave** — structural truth about the codebase, and the **identity authority** for the suite. Answers "what is this codebase, where should I touch, and what is the durable identity of this entity?" Owns the entity catalog, the code graph, guidance sheets, and the [Stable Entity Identity](./sei-standard.md) (SEI) every cross-tool binding keys on.
- **Filigree** — work state and workflow lifecycle. Answers "what work exists, what state is it in, and what happened?" Owns issues, observations, and finding triage state.
- **Wardline** — trust policy and rule enforcement. Answers "what is allowed, and does this still satisfy the declared constraints?" Owns trust declarations, baselines, and policy findings. Notably, Wardline's "configuration" is the source code itself plus the adjacent declarations — it does not have a separate authoritative config store.
- **Legis** — git/CI governance and attestations. Answers "what is the change provenance, and is this change governed?" Owns governance verdicts, overrides, sign-offs, and the SEI-keyed attestation/audit lineage over change. A consumer of Loomweave's identity; never re-adjudicates trust (that stays Wardline's).
- **Charter** — requirements, traceability, baselines, and verification evidence. Answers "what must be true, how do we know it is true, what claims to satisfy it, and what is impacted by this change?" Owns obligations; a read-only consumer of its peers' surfaces.
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

## 8. Naming

Member products are named from weaving mechanics and adjacent registers — Loomweave, Filigree, Wardline, Legis, Charter, Shuttle — as distinct proper names rather than subdivisions. There is no "Weft Guard," "Weft Workflow," or "Weft Execute"; each product earns its own identity. The family name sits above the products without dominating them, and — per §3 and §6 — it does not name any component that gets installed or runs.

### Cross-product field names

Federation does not require uniform vocabulary, but it does require that the same word never silently means two things across siblings. The discipline:

- A single word should mean the same thing across products, OR be confined to one product, OR have an explicit mapping documented in an Accepted ADR.
- The suite-level catalogue of cross-product-visible terms lives in [`glossary.md`](./glossary.md). It is a read-only design-review artefact (per §5: nothing imports it, nothing runs from it, removing it changes no semantics) and is federation-safe by construction.
- Each product enforces the rule locally in its own ADR-acceptance process, citing this section as the suite-level authority. CI lint or cross-repo enforcement is explicitly out of bounds — that would convert a federation-safe doc into shared infrastructure.

## 9. Status

Per-member version and status are **snapshots, not authoritative here** — each member's authoritative status lives in its own repo. See [members/](./members/) for the current pointer-backed snapshot of each. In summary as of 2026-06-05: Loomweave, Filigree, Wardline, and Legis are built and in use; Charter is a designed-and-scaffolded member with federation adapters pending; Shuttle is a roadmap thought-bubble with no repo, lowest priority, displaceable by any better idea.

The keystone interop primitive, **Stable Entity Identity** ([sei-standard.md](./sei-standard.md)), is the suite's single identity track and is **LOCKED as of 2026-06-05** — the interface is frozen and post-lock changes require a versioned revision. Conformance stays oracle-gated; any member's locator→SEI backfill is a migration task under the locked standard, not a reopening of it. See the SEI standard and [conflict-register.md](./conflict-register.md) §B-2.

This charter is expected to outlive any single release and shape all subsequent product gates. Its load-bearing sentence is in §5: **enrichment, not load-bearing**. If that principle is ever compromised, the rest collapses.
