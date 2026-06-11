# The Potentials

## The idea bench — named gaps, honest odds.

Most roadmaps are promises. Weft's is a bench. Every idea below is
**speculative — not a member, not committed** — and stays that way until it
passes the same four-question go/no-go test that admitted every member: *one
bounded domain, useful alone, sensible with each sibling pairwise, additive
to the suite.* Most ideas die at question one, and the bench says so out
loud. That discipline — naming gaps without building shrines to them — is why
the roster you read about in the other pages stays small, sharp, and true.

Here's what's on the bench, with the odds stated plainly.

---

## Heddle — the temporal authority *(in active go/no-go spike)*

The loudest unanswered question in the federation: **"Given this change,
which entities changed, by whom, when — what is downstream-affected, and what
must be re-verified?"** Loomweave deliberately stores only the point-in-time
graph; no member owns history. Heddle would: per-entity change history keyed
on durable identity across runs, plus the downstream-propagation query over
the structural graph.

Every sibling lights up in its presence — Loomweave's churn questions get
real answers, Charter learns what to re-verify, Legis learns the scope of a
gate, Wardline learns what to re-scan. And every sibling keeps its
point-in-time view, unharmed, in its absence.

The honest risk, in our own words: naively framed, Heddle is a forbidden
aggregator — the central thing the doctrine exists to prevent. It joins the
roster only if the spike proves it can be a bounded *temporal-graph
authority* that owns the one unowned thing. The spike is running now. It is
allowed to come back with "no."

## Shuttle — the change executor *(named gap, prefix reserved)*

The oldest thought-bubble: a transactional change-execution authority.
*"Carry this approved change through the weave, under guard rails"* — bind a
scoped change intent to entities, order the edits, apply incrementally with
pre/post checks, roll back on failure — without planning, triaging, or
reasoning about the code. Those stay where they belong.

Shuttle has no repo, no design, and the lowest priority on the bench; its URI
prefix is reserved but inert, and the doctrine explicitly forbids building
anything that depends on it existing. It is named so the gap stays visible —
and the eventual change executor may not be called Shuttle at all.

## Selvage — the release & compatibility authority

Five independently versioned products with pairwise contracts eventually need
an owner for one truth: *which released combinations are verified
compatible?* Selvage would own the tested-combination matrix and what a
"Weft N.0" even means. Honest odds: medium — it must prove it's a product
with real version-resolution logic, not a doc with a CI job stapled on.

## Warp — the dependency & supply-chain provenance authority

Wardline analyses trust in *your* code; nobody owns the trust story of the
code you *pull in*. Warp would: dependency lineage, provenance of third-party
and secret material — a genuinely unowned, cleanly bounded axis. Honest odds:
promising, if it can hold the line at "provenance, not a vulnerability
scanner."

## The rest of the bench

Two more ideas sit explicitly in the "probably a feature, not a product"
column — test-evidence capture (likely Charter's job) and an agent skill-pack
registry (likely Legis/Filigree's) — and one, a rationale-graph authority, has
been formally **rejected** and is listed anyway, so the idea stays closed
rather than silently respawning.

---

That's the whole bench. No vaporware on the roster, no gaps swept under it.
When something here graduates, it will have earned the seat the way Legis and
Charter did — and you'll be able to read exactly how, in the doctrine, at the
hub.

*Authoritative source: [roadmap-ideas.md](../../roadmap-ideas.md) and
[doctrine.md](../../doctrine.md) §7. The roster in the doctrine is the only
member list.*
