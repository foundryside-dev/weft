# Weft

## Five tools. One loom. No machine in the middle.

Your coding agents are brilliant and amnesiac. Every session starts from
nothing: no memory of the codebase, no idea what work is claimed, no record of
what the last agent promised, touched, or left half-done. The usual answer is
a control plane — a broker, an orchestrator, a cloud dashboard that becomes
the real system and turns every tool around it into a thin client.

Weft is the other answer.

Weft is an agent-first family of small, local-first developer tools that turns
a swarm of stateless coding agents into a coordinated, self-documenting
workforce — **without a central orchestrator, a broker, or a cloud**. Each
member is fully authoritative for exactly one domain. Each is genuinely useful
alone. And when you compose them, they enrich one another through narrow,
additive contracts — never depend on one another to mean what they mean.

The name is the philosophy. In weaving, the weft is the thread that crosses
the warp and binds distinct strands into fabric. The threads stay distinct.
The fabric is the point.

## The cast

- **Loomweave** knows what the codebase *is* — its structure, its entities,
  and the durable identity of every one of them.
- **Filigree** knows what the work *is* — what exists, what state it's in,
  who claimed it, and what happened.
- **Wardline** knows what the code *claims about trust* — and whether it
  still honours those claims.
- **Legis** knows where a change *came from* — and whether it was governed.
- **Charter** knows what *must be true* — and whether you can prove it still is.

Five threads. Each one a complete tool you could adopt by itself and never
regret. Together, something more: an agent can orient in a strange codebase,
claim work race-free, leave a durable and attributable trail, and hand off to
the next agent — coordinating by **deconfliction, not control**.

## The philosophy

**Federation, not monolith.** There is nothing called "Weft" to install,
deploy, or keep running. No `weftd`. No shared store. No shared config layer.
No identity oracle sitting in the middle. Weft is a family name, a composition
doctrine, and a set of narrow interop contracts — nothing more. The doctrine
exists precisely to kill the "wouldn't it be easier if we just…" proposal
before it quietly becomes the real system of record.

**Enrich-only, never load-bearing.** This is the load-bearing sentence of the
whole suite (the irony is noted and enjoyed). A sibling may make another
member's view richer — entity context on a ticket, a trust annotation on a
catalog entry — but it must never be *required* for that member's own data to
make sense. File a bug with Loomweave absent: it means the same thing. Run a
trust scan with no tracker downstream: the findings still land. We even
publish a test for our own failure — semantic coupling, initialization
coupling, pipeline coupling — and a public **asterisk register** of the places
we don't yet pass it cleanly, each with a written retirement condition. Most
suites hide their couplings. We register ours.

**Identity is the spine.** One primitive makes federation across five
independent tools honest: **Stable Entity Identity (SEI)**. Loomweave mints a
durable identity for every function, class, and module; every other member
stores it as an opaque token. A ticket, a taint fact, a governance
attestation, and a requirement trace can all point at *the same function* —
across renames, across refactors, across time — without any tool parsing
another's internals. The standard is locked; conformance is oracle-gated.

**Deconfliction, not security.** Weft coordinates agents; it does not police
them. Color, scope, and identity exist so that two agents don't collide — they
coordinate, they never gate. If you're shopping for an access-control product,
we will cheerfully point you elsewhere.

**Local-first, and it stays that way.** Your code, your data, your machine.
Offline works. Nothing phones home.

**Honesty as a feature.** Verdicts that admit `UNKNOWN`. Drift that gets
flagged instead of papered over. A demo specimen whose flaws are planted on
purpose and *fail the build if you fix them*. A hub that refuses to restate
any fact it doesn't own. The suite is designed on the assumption that a tool
which can't say "I don't know" will eventually lie to you.

## Who it's for

The developer driving AI coding agents against a real codebase — one agent or
a fleet — and the operator who needs an inspectable, attributable record of
what each agent intended, touched, and left behind. If that's you, pick any
one thread and start. The fabric can come later.

> Each member is authoritative for one domain, solo-useful, meaningfully
> composable pairwise, and **enrich-only — never load-bearing — when
> composed.** That's the whole law. Everything else is commentary.
