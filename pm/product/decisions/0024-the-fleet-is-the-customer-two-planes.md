# PDR-0024 — The fleet is the customer: the coordination + sense-making planes

**Date:** 2026-06-15 · **Status:** CANDIDATE (owner — "ready for candidate status at
least"; promotable to Adopted on a first falsifier-test / dogfood proof) · **Class:**
vision / strategy bet · **Driver:** the 2026-06-15 L2/fleet thread; successor-sibling to
PDR-0023.

## Context

PDR-0023 ruled the federation is the product (the glue is the value). The 2026-06-15
session, building on the seam-health work, surfaced a convergent set of directions — an
L2 "strategic view" synthesis MCP, a fleet-coordination tag-out board, an agentic-macro
clearing house, and an analysis-layer custom-checks daughter. They are **not separate
features** — they are facets of one realization: **the federation's customer is a FLEET of
agents, not a single agent with a toolbox.** A fleet needs two planes.

## Decision (candidate)

Adopt, as a CANDIDATE direction (not yet authoritative canon), the **fleet-OS frame**: the
federation serves a fleet via two planes, both resting on the honesty invariant (today's
seam work is their precondition):

- **Coordination plane** — agents don't collide. The LOTO **tag-out board** (presence +
  advisory path reservation + escalation), hosted **additively in filigree for now** (reuse
  its claim/lease/reap engine; extract to protoweft later), additive-only so 3.0.0's users
  aren't shocked twice. Detailed shaping:
  `pm/2026-06-15-fleet-coordination-tagout-shaping.md`.
- **Sense-making plane** — agents get wisdom from the honest flood. The L2 **"strategic
  view" MCP** (the "so what" query) + the **agentic-macro clearing house** (agents author
  their own synthesis macros AND analysis checks over the honest primitives; the
  custom-checks daughter, `weft-ce44beffd5`, is the analysis-layer instance).

Two invariants govern the platform: **honesty propagates through composition** (a
macro/check is only as honest as its weakest sub-call; it MUST propagate the `weft-reason`
carrier), and **hub owns the alphabet, agents write the words** (agents compose blessed
primitives/seams freely; new cross-member contracts stay hub-blessed).

## What's already real (the bet is partly proven)

- The honesty invariant + `weft-reason` vocab — enforced federation-wide (2026-06-15), the
  precondition.
- The wired read-surface microaffordances (G2) — the composable primitives.
- `include_federation` (warpline) — the FIRST working L2 cross-member synthesis, with honest
  per-member reasons (a real transport failure surfaces as `unreachable`, not a confident
  empty).
- The Workflow/orchestration pattern — a working prototype of an agentic macro.

## Falsifiers (per plane)

- **Coordination:** agents DEFECT from advisory tags under task pressure, or contention is
  too low for the board to matter (value scales with fleet concurrency on a shared tree).
- **Sense-making:** the synthesis is greppable-away — a competent agent derives it from the
  honest tool outputs itself, so the spine adds nothing; OR the macro/check registry is
  never reused/shared (dead weight).

## Reversal trigger

At scale (elspeth, or a real governance/fleet loop): if the planes add nothing agents
couldn't get from the members standalone — the glue is inert. (Inherits PDR-0023's
falsifier, one layer up.)

## Status

CANDIDATE — referenceable but NOT yet authoritative canon; gated to a falsifier-test /
dogfood proof before promotion to Adopted. The detailed shaping (tag model, v1 sentinel
spec, hosting, L2-as-platform) lives in `pm/2026-06-15-fleet-coordination-tagout-shaping.md`
and remains the working surface.

---

## Amendment 1 (2026-06-17) — the coordination plane is a TWO-MODE surface; the "staff room" folds in here

**Owner ruling, 2026-06-17:** a fresh "staff room / project chat" exploration was found to be
*"just reinventing 0024 with a new hat — let's do 0024 with an appropriately festive hat."* So
it is **not** a separate bet; it refines this PDR's **coordination plane**. Provenance +
8-agent user-research: `pm/2026-06-17-staff-room-shaping.md` and
`pm/2026-06-17-staff-room-agent-interviews.md`.

**Governing principle (new, owner):** **prescribe nothing.** Hand agents a general
information-exchange primitive with agent-coined free-text tags and let them define the use.
The hub does not define what channels/tags are *for* (consistent with "hub owns the alphabet,
agents write the words" — these ephemeral chatter/claim tags are below the contract layer, so
free coinage is correct).

**The coordination plane is now TWO modes (validated, near-unanimous across both models, four
headspaces, two rounds):**
- **BULLETIN** — notes with **poster-set TTL** (hours→days); *state* (claims, hazards,
  settled decisions + rationale, root causes); *pull*, read-first. **Subsumes and generalizes
  the tag-out board** — path reservation is one kind of claim; `expire-on-merge` is just an
  event-tied TTL on a live-lock note.
- **CHAT** — ephemeral (hours), *event* (live collision-avoidance, merge-order, "hold 10min"),
  *push*, `broadcast` flag.
- **Partition:** *state vs event* — "still useful after my session ends → bulletin; useless in
  15 minutes → chat."

**Keystone design choice:** **poster-controlled TTL.** It is what (1) makes the two modes
distinct (fixed-short collapses bulletin into slow-chat), (2) lowers the cost of posting durable
knowledge by self-cleaning (infinite TTL = permanent debt → agents post *less*), (3) encodes
confidence (short = grain-of-salt, long = held up). It also resolves the lying-expiry failure a
single blind-TTL channel would have (a hazard outliving its note reads as a false all-clear).

**Make-or-break (NOT tooling — convention):** the ticket-named-tag silo is every agent's
default failure ("a tag only I use is a private log"). Required mitigations: **(a)** a small
blessed tag set (`claim`/`hazard`/`wip`/`decision` + area tags); **(b)** the highest-leverage
affordance — **surface "N existing notes match your work area" at session start** (extend the
existing SessionStart snapshot hook). Bulletin claims remain **advisory, not locks**
(deconfliction stays trace/merge — PDR-0010).

**Consequence for build:** build **one** two-mode coordination surface, **not** a separate
tag-out board and staff room. Hosting/placement unchanged from the 2026-06-15 ruling
(Filigree-hosted, additive, reuses claim/lease/**reap**; Tabard certifies *who* per PDR-0028).
Still gated to a dogfood proof before Adopted; build held behind the five-member cutover.

## Status

CANDIDATE (refined by Amendment 1). The two-mode coordination surface is the current shape;
promote to Adopted on a dogfood/falsifier proof. Working surfaces:
`pm/2026-06-15-fleet-coordination-tagout-shaping.md` (tag model, v1 sentinel, hosting,
L2-as-platform) + `pm/2026-06-17-staff-room-shaping.md` (the two-mode refinement).
