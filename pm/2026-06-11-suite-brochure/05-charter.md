# Charter

## What must be true — and can you still prove it?

*Member · Python · authoritative for requirements, traceability, and verification evidence*

Code says what the system *does*. Nothing in the repo says what it *must do* —
or whether anyone has checked lately. Requirements live in a doc that drifted,
a ticket that closed, a conversation that scrolled away. Then an agent
refactors the module that three obligations silently depended on, every test
stays green, and nobody knows anything changed.

Charter is the federation's obligations surface. It owns four questions:
*what must be true, how do we know it's true, what claims to satisfy it, and
what is impacted by this change?*

## What it does

- **Obligations as first-class records.** Requirements with real identity and
  lifecycle — not prose in a wiki, but objects you can trace, baseline, and
  verify against.
- **A trace-link ontology with authority states.** Links from obligation to
  code, to work, to findings, to evidence — each link knowing how authoritative
  it is, so "traced" never quietly means "someone once pasted a path."
- **Baselines.** A named, frozen set of obligations to verify against — the
  difference between "we meet our requirements" and "we met them, once, in
  March."
- **Verification evidence with freshness.** Charter records not just that an
  obligation was verified, but *against what* — and marks the trace **stale**
  when the code it points at has moved on. Evidence that can expire is
  evidence you can trust.
- **Impact analysis.** Given a change, which obligations are touched and what
  must be re-verified — the requirements-side answer to "is it safe to merge?"

## Design decisions, and why

**Read-only consumer, by constitution.** Charter reads its peers' surfaces
and writes none of them. It never assumes another member's authority — it
*cites* them. A requirements tool that starts editing trackers and catalogs
is an orchestrator with a thesaurus; Charter stays a witness, and that's what
makes its testimony valuable.

**Staleness over silence.** When Loomweave reports that an entity's lineage
changed, Charter doesn't quietly keep the old link or noisily break it — it
marks the trace stale and tells you re-verification is owed. The failure mode
of every traceability matrix is rot that looks like rigor. Charter's whole
design is rot made visible.

**Graceful descent.** With siblings present, traces are SEI-keyed,
drift-aware, and bound to live work and findings. With siblings absent,
Charter falls back to manual trace links and file/symbol references — less
automation, identical meaning. Solo mode is honest, not a brochure claim.

**Obligations, not execution.** Charter knows what must be re-verified; it
doesn't run your tests, apply your changes, or manage your pipeline. One
bounded domain, held completely — that's the membership bar, and Charter
passed it the same way every member did.

## Alone, and together

Solo, Charter is a local-first requirements and traceability tool with
verification evidence and impact analysis — the lightweight RTM for teams who
need provable obligations without an enterprise suite. Paired: Loomweave gives
traces durable identity and drift detection; Filigree links obligations to the
work that discharges them; Wardline findings attach to the requirements they
threaten; Legis consumes Charter's preflight facts so the governance gate
knows what's owed.

The newest thread on the loom — and the one that remembers why the fabric
exists.
