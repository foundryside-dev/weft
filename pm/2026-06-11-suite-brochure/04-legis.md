# Legis

## Where did this change come from — and was it governed?

*Member · Python · authoritative for git/CI governance and attestations*

When one developer ships their own code, provenance is a memory. When a fleet
of agents ships dozens of changes a day, provenance is the only thing standing
between you and a repository you no longer understand. Legis is the
federation's governance surface: it watches the git and CI reality — branches,
commits, PRs, pipeline state — and renders **verdicts** about change
provenance that are honest enough to build on and durable enough to audit.

## What it does

- **Governance verdicts.** Is this change governed? Legis answers `CLEAR`,
  `VIOLATION`, or — crucially — `UNKNOWN`, with the **provenance gap** named.
- **Graduated enforcement.** A 2×2 model of enforcement postures — from
  *chill* through *coached* and *structured* up to *protected* — so governance
  scales with the stakes of the change instead of applying courtroom procedure
  to a typo fix.
- **Tamper-evident where it counts.** Protected verdicts are HMAC-signed,
  with signing keys held by the operator — the human stays the root of trust.
- **Attestations and the sign-off ledger.** Sign-offs, overrides, and
  governance decisions are recorded, keyed to durable entity identity (SEI),
  building an audit lineage over change that outlives any one branch.
- **Provenance surfaces.** The git/CI facts themselves — queryable by agents
  and siblings, including the rename signal that helps Loomweave keep identity
  stable across file moves.

## Design decisions, and why

**`UNKNOWN` is a first-class verdict.** Most gates round missing evidence up
to "pass" or down to "fail" — both are lies. Legis names the gap. When a
sibling capability is absent, a verdict still resolves, with
`identity_stable: false` honestly flagged rather than silently assumed. A
governance tool that bluffs is worse than no governance tool: you'd trust it.

**One judge, not two.** Legis governs; it never re-adjudicates trust.
Wardline's analysis passes through verbatim — "Wardline analyses, Legis
governs" is a design law, not a slogan. The moment two members rule on the
same question, every disagreement between them becomes your problem.

**Overrides are features, not failures.** Real teams override gates. Legis
makes the override a recorded, attributed, attestable event instead of a
workaround — governance that bends visibly is governance that doesn't get
routed around invisibly.

**Deliberately lightweight.** Legis is governance for *coordination and
provenance*, scaled for small teams running agent fleets — not an enterprise
compliance machine, and proudly not pretending to be one. It answers "where
did this come from and was it governed," and it stops there, on purpose.

**Consumer of identity, never owner.** Legis treats SEI as opaque, consumes
Loomweave's resolution and lineage pull-only, and re-establishes integrity at
its own boundary. Even the governance member doesn't get to mint truth in
someone else's domain.

## Alone, and together

Solo, Legis is a provenance ledger and governance gate for any git/CI
workflow — verdicts, sign-offs, and overrides with an audit trail, no siblings
required. Paired: Loomweave gives its attestations durable identity and
rename-awareness; Wardline gives it analysis facts worth governing on;
Filigree binds sign-offs to the work they authorize; Charter hands it
preflight facts so obligations inform the gate.

The law of the loom — written down, signed, and honest about what it doesn't know.
