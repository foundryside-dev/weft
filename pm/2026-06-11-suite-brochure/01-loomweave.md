# Loomweave

## The codebase, made legible. The identity, made durable.

*Member · Rust · authoritative for code structure and entity identity*

Every agent session against an unfamiliar codebase begins with the same
expensive ritual: grep, read, guess, repeat. Loomweave ends the ritual. It
reads your codebase once, deeply, and builds the thing agents actually need:
a **structural truth** — every entity catalogued, every edge mapped, the
subsystems clustered, the briefings written — served fast enough to consult
mid-thought.

Ask it the questions that matter before you touch anything: *What is this
codebase? Where should I touch? What depends on what I'm about to change?
What is the durable identity of this thing I'm holding?*

## What it does

- **The entity catalog.** Functions, classes, modules — extracted, addressed,
  and content-hashed, so "this function" is a precise claim, not a hope.
- **The code graph.** Edges and subsystem clustering that turn half a million
  lines into a map with regions, not a wall of files.
- **Briefings and guidance.** Orientation documents an agent can read in
  seconds instead of an hour of exploratory grepping — including the tribal
  knowledge ("guidance sheets") that codebases usually keep in people's heads.
- **Consult-mode tooling.** A rich MCP surface, a CLI, and a loopback HTTP
  read API — built for the way agents actually ask questions.

## The crown jewel: SEI

Loomweave is the federation's **identity authority**. Paths change. Names
change. Line numbers are a joke. So Loomweave mints a **Stable Entity
Identity** for every entity and maintains its **lineage** across renames and
refactors. An address tells you where something is *today*; an SEI tells you
*which thing it is*, forever.

This is the keystone the whole suite stands on. When Filigree binds an issue
to a function, when Wardline keys a taint fact, when Legis signs an
attestation, when Charter traces a requirement — they all hold the same opaque
token, and Loomweave alone resolves it. The standard is **locked** and
conformance is verified against an oracle, because an identity scheme you can
casually change isn't an identity scheme.

## Design decisions, and why

**Address is not identity.** The locator (`plugin:kind:qualname`) is demoted,
on purpose, to a mere address. Identity survives the rename; the address
doesn't have to. Most tools conflate the two and silently lose history at
every refactor. Loomweave refuses to.

**Point-in-time truth, told honestly.** Loomweave stores the current graph,
not a history — and rather than fake temporal answers, it leaves that question
visibly unanswered (see [the potentials](07-potentials.md)). A tool that knows
the boundaries of its own authority is a tool you can trust inside them.

**Built in Rust, built for scale.** The catalog has a real-codebase scale
target measured in hundreds of thousands of lines, because a structure tool
that only works on toy repos is a demo, not a member.

**Enrich-only, both directions.** Loomweave builds its catalog with every
sibling absent. Siblings make it richer — trust annotations on entities,
issues bound to functions — but structural truth bows to no one.

## Alone, and together

Solo, Loomweave is the orientation layer your agents are missing — the
difference between an agent that explores and an agent that *knows*. Paired:
Filigree issues gain entity context and drift detection; Wardline findings
resolve to durable identities; Legis gains a rename-aware lineage to govern
against; Charter traces obligations to the actual code that satisfies them.

The loom on which the rest is woven.
