# Vision — Weft Federation

## Purpose
Weft turns a swarm of stateless coding agents into a coordinated, self-documenting
workforce against a real codebase — without a central orchestrator, a broker, or a
cloud. It is an agent-first family of small, local-first developer tools, each
authoritative for exactly one domain (Loomweave = code structure + SEI identity,
Filigree = work state, Wardline = trust-boundary analysis, Legis = git/CI
governance, Charter = requirements/traceability). Each member is useful alone,
meaningfully composable pairwise, and **enrich-only — never load-bearing — when
composed.** The change in the world: an agent (or a fleet) can orient, claim work
race-free, leave a durable trail, and hand off — coordinating by *deconfliction*,
not by a controlling runtime.

## Who it serves
- **Primary:** AI coding agents working a real codebase — and the solo developer
  driving them — who need orientation, race-free work-claims, and continuity that a
  stateless agent cannot hold in its own head.
- **Secondary:** the human operator/PM coordinating multi-agent work, who needs an
  inspectable, attributable record of what each agent intended, touched, and left.
- **Explicitly not:** enterprise security/compliance buyers (Weft is
  deconfliction-first, not a security product — even Legis is "barely IRAP" on
  purpose); teams wanting a hosted SaaS control plane; human-first, GUI-driven
  project management.

## Anti-goals (what it refuses to be)
- **A central orchestrator / runtime / broker / shared store.** Doctrine §6 forbids
  shared running infrastructure; coordination is substrate, not a controller.
- **A system that manufactures false distinctions between functionally-identical
  agents.** No "personalities," per-agent reliability scores, or character that would
  invite the operator to perceive one agent as "better" and dispatch on a fiction
  (owner-stated, 2026-06-09). Actor handles are *bare labels for attribution/
  deconfliction*, never a character; the mnemonic need is met by a spawn-context label
  (A′), not a persona layer. (See PDR-0005; reinforces the cross-cutting-deference
  hazard in PDR-0003.)
- **A security / access-control product.** Color, scope, and identity *coordinate*;
  they never gate. Re-derive any "security" shimmer as availability/functional.
- **A monolith.** Members stay solo-useful and enrich-only; absence of any sibling
  never breaks another's core flow.
- **A cloud service.** Local-first, offline, no telemetry-home.

## Authority grant
Granted by: john (john@foundryside.dev)     Last reviewed: 2026-06-09
Review cadence: monthly, or on any vision change

Autonomous within strategy — the agent MAY, without asking:
  prioritize the backlog, write PRDs, dispatch delivery, accept against criteria,
  reprioritize, kill a failing bet per metrics.md. (Standing context: the Weft tools
  are the PM's to use freely; tracker writes across hub + member trackers are in
  scope.)

Escalate BEFORE acting — the agent MUST get owner sign-off for:
  changing this vision/strategy/grant, public release or announcement (incl. the
  coordinated launch / clean-break cutover), deprecating a feature users depend on,
  pricing/commercial change, data deletion (incl. `issue_delete` / store re-init),
  admitting a new federation member (doctrine §7), or anything touching an external
  party.
  (Taxonomy + rationale: product-ownership-operating-model.md.)
