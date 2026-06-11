# Wardline

## Your code makes trust claims. Wardline checks it keeps them.

*Member · Python · authoritative for trust-boundary analysis*

Every codebase has trust boundaries — the line where user input enters, where
the external API's response stops being your problem and starts being your
fault. Mostly those boundaries live in comments, conventions, and the memory
of whoever wrote the parser. Agents can't read team memory. So the boundaries
erode, one well-meaning refactor at a time.

Wardline makes the boundaries *part of the code* — declared where they live,
analysed as semantics, enforced as a gate that stays honest over time.

## What it does

- **Declarations in the source.** A small, canonical decorator vocabulary
  marks where data enters untrusted, where it crosses a boundary, where it has
  earned trust. The declarations sit in the code they describe — readable by
  humans, agents, and the analyser alike.
- **Semantic taint analysis.** Not a grep with opinions: a static analyser
  that flows trust through your program over a true taint lattice, catching
  the path where untrusted data sneaks into a trusted sink three calls later.
- **A curated rule set** with stable rule IDs, each grounded in a corpus of
  ground-truth specimens — rules that were *proven against known-flawed code*
  before they were ever pointed at yours.
- **Baselines that keep gates honest.** Known, accepted findings are
  baselined; the gate fails only on *new* violations. You can adopt Wardline
  on a messy codebase today and ratchet, instead of drowning in day-one noise.
- **Standard output.** SARIF out of the box — consumable by anything, not
  just by siblings.

## Design decisions, and why

**The source code *is* the configuration.** Wardline keeps no separate
authoritative config store. The trust declarations live in the code, next to
what they govern, versioned with it, refactored with it. A trust model in a
YAML file three directories away is a trust model nobody updates; a decorator
on the function is one nobody can miss — least of all an agent reading the
file.

**A lattice, not a checkbox.** Trust isn't binary, and pretending it is
produces tools that cry wolf. Wardline's taint states form a real lattice, so
"externally sourced," "validated," and "trusted" are distinct, flowable facts
— and the findings are precise enough to act on.

**Analysis, not adjudication.** Wardline tells you *what the code does
against its declared constraints*. It does not decide whether your change
ships — that's governance, and governance belongs to Legis. One member
analyses; one member governs; no member does both. (And to be plain: this is
coordination tooling for you and your agents, not a security product. The
boundary it defends is *coherence*, and what it catches are functional
defects-in-waiting.)

**Proven on planted flaws.** Wardline's rules cut their teeth on Lacuna, the
suite's deliberately-flawed specimen, where every violation is catalogued in
advance. A rule that can't find a flaw we *planted* doesn't ship.

**Fail-soft federation.** Findings flow downstream to a tracker when one is
listening; analysis runs identically when nothing is. Scanning never depends
on anyone consuming the results.

## Alone, and together

Solo, Wardline is a self-contained trust-boundary analyser: declare,
scan, baseline, gate — useful on day one of any project where data crosses a
line. Paired: Loomweave keys taint facts to durable entity identities and
enriches its catalog with trust semantics; Filigree turns findings into
triageable work; Legis takes Wardline's verdicts as facts to govern with —
verbatim, never re-judged.

The ward line, drawn where everyone can see it.
