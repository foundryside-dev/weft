# PDR-0018 — Accept codex's loomweave c475e90 via adversarial review + same-day remediation; bootstrap exemption accepted-and-documented

- **Date:** 2026-06-13
- **Status:** accepted (PM, within grant)

## Context

While the hub session was offline, codex landed an unsolicited ~2,300-line
feature commit (`c475e90`: LLM/semantic config surface, traffic logging, 4 new
MCP tools) directly on loomweave's launch branch rc4, mutating rc4 in place
with a "No changes yet" CHANGELOG and a committed harness debug log.

## Options

1. Revert the commit (launch-branch hygiene first).
2. Accept blind (it compiled and mostly tested green).
3. **Accept via adversarial review + remediation (chosen).**

## Call

Option 3. A 13-agent review (4 dimensions → adversarial verify) confirmed 9
majors, 0 refuted, 18 minors — then all 11 remediation items landed same-day in
9 commits (`7e573ce..bebad09`): disabled-config validation gate, fire-and-forget
+ mutex'd traffic logging, `.weft/loomweave/diagnostics/` path on all four
surfaces, `error.log` removed, honest rc5 CHANGELOG, **version bump rc4→rc5**
(disarms the uv stale-wheel trap), IPv6 loopback, typed schemas, + 21 clippy
debts cleared. Tracker: `weft-ac59e8e730` (closed).

**Sub-ruling — bootstrap exemption accepted:** `llm_config_set` /
`semantic_config_set` deliberately bypass the read-only write-tool gate so a
session can bootstrap write access / live LLM spend. Accepted as designed for
an own-use agentic-first suite, on condition it is documented loudly
(server_instructions + both SKILL.md copies now state the exemption and its
consequences) — C-10(c) honesty, not gate redesign.

## Rationale

Pen-at-hub (PDR-0015) makes unsolicited member commits *my* acceptance problem.
Revert would discard genuinely good work (metadata-only traffic logging with
proven bounds, a needed config surface); blind acceptance was disproven by the
review itself (the disabled-config brick and result-poisoning bugs were real).
Review-then-remediate cost one day and produced a stronger rc5 than either
alternative.

## Reversal trigger

Bootstrap exemption: reopen if a future dogfood/audit shows an agent
unexpectedly self-enabling live spend in a session whose operator believed it
read-only (i.e., the documentation proves insufficient as the control) — then
the gate design question goes to the owner, not back to silent acceptance.
