# Loom — speculative sub-app ideas

**Status: SPECULATIVE. None of these are members, none are committed, none are evaluated-and-accepted.** This is an idea bench for *possible* future federation members, kept here so the change-execution gap (and others) stay visible without polluting the authoritative roster ([doctrine.md](./doctrine.md), [README.md](./README.md)). Anything here must pass the **go/no-go test** ([doctrine.md](./doctrine.md) §7) — one bounded domain, solo-useful, pairwise-sensible, additive — *before* it could ever join the roster, exactly as Legis and Charter did.

Names are weaving-/governance-register placeholders per the naming rule ([doctrine.md](./doctrine.md) §8); they are not decisions.

The bar is deliberately high. The fastest way an idea dies is **failing go/no-go test #1** — "is it authoritative for *one* bounded thing?" — because it overlaps an existing member. Each idea below carries a candid risk note; some are flagged as probably-a-feature, not a product.

---

## Already named (the acknowledged gap)

### Shuttle — transactional scoped change execution  ·  *speculative, prefix reserved*

The one pre-existing idea. Receives an approved scoped change, applies it incrementally with pre/post checks, rolls back on failure. See [members/shuttle.md](./members/shuttle.md). `shuttle://` is reserved-but-inert ([uri-scheme.md](./uri-scheme.md)). **Status:** roadmap thought-bubble; the eventual change-executor may not be "Shuttle" at all.

---

## Stronger candidates (real gap, plausibly one bounded domain)

### 1. "Selvage" — release & compatibility authority

- **Bounded domain:** the suite's *tested-combination* truth — which released member versions are verified-compatible, what the "Loom N.0" version means, and orchestration of the coordinated launch.
- **Gap it fills:** [SHIPPING.md](./SHIPPING.md) explicitly calls for this ("the suite version becomes a published tested-combination matrix") and [compatibility.md](./compatibility.md) is currently a hand-maintained stub. Five independently-versioned products with pairwise contracts genuinely need an owner for the compatibility matrix.
- **Pairwise stories:** reads each member's released version + capability advert (`_capabilities`); with Legis, a release gate becomes a governance attestation; with Charter, a baseline can pin "verified against Loom 1.2."
- **Go/no-go risk:** medium. Risk it's "a doc + a CI job," not a product. Counter: version-pin resolution + capability-skew detection across 5 repos is real logic. **Worth a design spike before deciding product-vs-feature.**

### 2. "Warp" — dependency & supply-chain provenance

- **Bounded domain:** third-party dependency trust and secret-material provenance — SBOM, dependency lineage, "what untrusted external code/credentials does this project pull in."
- **Gap it fills:** Wardline analyses *first-party* trust boundaries in your own AST; **nobody owns third-party/supply-chain trust.** Clarion's pre-ingest secret scanner was deferred. This is a distinct axis from Wardline's taint.
- **Pairwise stories:** with Clarion, dependencies become entities with SEI; with Wardline, complements (external-package risk vs in-code taint); with Legis, dependency risk becomes a governed gate; with Charter, a security requirement traces to a dependency finding.
- **Go/no-go risk:** low–medium. Cleanly bounded and clearly not owned today. Main risk is scope sprawl into general SCA tooling — would need a tight "provenance, not a vuln scanner" charter.

---

## Borderline (likely a feature of an existing member — flagged honestly)

### 3. "Reed" — test/verification execution & evidence capture

- **Idea:** run tests and capture structured pass/coverage/flake evidence keyed to SEI.
- **Overlap risk: HIGH.** Charter already owns *verification evidence* (the record + the requirement that it be fresh). This would own *execution + capture* feeding Charter. That split is thin — likely a **Charter capability or a Legis CI-fact**, not a separate authority. Fails go/no-go #1 unless a genuinely separate "evidence capture" bounded domain emerges. *Recommendation: keep as a Charter/Legis feature unless proven otherwise.*

### 4. "Bobbin" — agent capability / skill-pack registry

- **Idea:** own the agent skill/prompt-pack definitions and their provenance for the agent-first suite (the "agent-programmable extension plane").
- **Overlap risk: MEDIUM–HIGH.** Touches Legis (governance over what agents may do) and Filigree (already ships a `filigree-workflow` skill). On-theme for an agent-first suite, but the bounded domain is fuzzy. *Recommendation: revisit only if the extension plane grows enough to need a dedicated provenance owner; otherwise a Legis/Filigree concern.*

### 5. Decision / rationale-graph authority  ·  *rejected as a product*

- **Idea:** a queryable, SEI-keyed record of *why* code is the way it is (ADRs + rationale).
- **Verdict: REJECT (feature, not a product).** Clarion already owns guidance sheets and Charter owns obligations/traceability; the "why" lives across those two. A separate authority would fail go/no-go #1 and #3. Listed so the idea is explicitly closed, not silently dropped.

---

## How to use this bench

- These are prompts for design conversations, **not roadmap commitments**. The roster in [doctrine.md](./doctrine.md) is the only authoritative member list.
- To promote any idea: run it through [doctrine.md](./doctrine.md) §7, write its spec/design, find a validating use-case (Lacuna can demo it), then the hub admits it to the roster — the same path Legis and Charter took.
- Add new ideas here freely; keep each honest about its go/no-go risk, especially overlap with an existing member.
