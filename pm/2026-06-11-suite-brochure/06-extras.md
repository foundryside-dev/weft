# The Extras

Two things travel with the federation that aren't members — and the suite is
more trustworthy *because* they aren't.

---

## Weft (the hub)

### The suite's constitution. Documentation only — and proudly so.

There is nothing called "Weft" to install or run. The hub is a repository of
pure documentation: the roster, the doctrine, the locked identity standard,
the glossary, the integration map, the contract index — the **interop layer**
of the federation, owned in exactly one place.

That sounds modest. It's actually the suite's sharpest design decision.

**The hub owns the seams, and only the seams.** Every fact about *how members
compose* — the composition law, the SEI standard, the cross-product contracts
— lives here, authoritatively. Every fact about a member's own surface — its
version, its commands, its routes — lives in that member's repo, and the hub
only *points*. This is the authority model that keeps five fast-moving
projects from drifting into five contradictory stories: nothing is stated
twice, so nothing can disagree.

**It publishes its own violations.** The **asterisk register** lists every
place the federation doesn't yet meet its own law — each with the failure mode
named and a written retirement condition. The **conflict register** records
every contradiction found and how it was ruled. A suite that documents where
it falls short of its own doctrine is a suite whose doctrine you can believe.

**It's the front door.** New to the federation? The doctrine tells you the
law, the map tells you how the threads compose, the member briefings tell you
where each authority lives, and the federation SDK tells you how to build a
member of your own. One afternoon of reading, and you know exactly what every
tool will and will not do — in writing, in one place.

The hub passes the suite's own test by construction: remove it and every
member keeps working. It is enrich-only documentation for the humans and
agents who want the whole story.

---

## Lacuna

### The deliberately broken codebase. The flaws are the product.

Every analysis tool demos beautifully on the codebase its authors chose. The
honest question is: *would it catch the flaw you didn't plant?* Lacuna inverts
the demo. It is a small, complete application whose defects are **intentional,
catalogued, and permanent** — trust-boundary violations for Wardline to catch,
dead code and circular imports for Loomweave to find, tracked work for
Filigree to carry.

And here is the part that tells you everything about this suite's character:
**fixing a planted flaw fails the build.** Lacuna's flaw manifest is baselined
into its own verification gate. The catalogued lacunae must stay; only *new*
violations fail. The specimen polices its own dishonesty.

Lacuna is where the federation's integration matrix stops being a diagram and
becomes something you can run: findings flowing from analysis into triage,
issues bound to durable entity identities, drift detected when the code under
a ticket moves. It is the thing a newcomer points the suite at to *watch it
work* — every claim in this brochure, demonstrated against a codebase that
was built to be caught.

Not a member. Not real work. The gap in the weave, kept open on purpose, so
you can see the threads.
