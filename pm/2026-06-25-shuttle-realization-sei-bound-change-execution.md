# Shuttle — realization as a read-only, spine-bound plan-staging surface (shaped concept)

> **UPDATE 2026-06-26 ([PDR-0032](product/decisions/0032-tenter-change-operating-picture-triad-and-next-federation-bid.md)):**
> revived + **renamed Shuttle → Tenter** ("Shuttle" is taken) and lined up as the **next federation bid** under the
> triad framing (Filigree+Plainweave+Tenter = an *advisory operating picture of a change*, not an orchestrator;
> plan→Plainweave links are references/proposals, never mints). The "PARKED" status below is superseded **in part**:
> the *member* case is revived, gated on prove-the-need + §7 admission. This note is retained as the shaping record;
> PDR-0032 is the current ruling.

**Date:** 2026-06-25 · **Status:** **PARKED (2026-06-25)** — concluded a low-durability *feature*, not a
member. Shuttle stays the doctrine §2/§8 thought-bubble (named, unbuilt, displaceable); **no repo, no §7
admission.** This note is retained as the shaping record + the reasoning that parked it.

> **Why parked (owner, 2026-06-25):** "at the end of the day it would be a feature with a shelf-life
> anyway, when you can just spawn a subagent and say 'execute this substep'." Shuttle's value was
> **orchestration-scaffolding** (a durable plan-object that stages execution) — exactly the capability that
> improving subagent dispatch erodes. It fails the **shelf-life test**: *substrate survives, scaffolding
> has a shelf-life.* The suite's core passes that test (stateless subagents need a shared deconfliction
> substrate — SEI spine, race-free claims, durable trail — *more* as they multiply); Shuttle fails it
> (plan-execution is the subagent's own job). The thin durable residue — a deterministic resolve/drift
> check that moves symbol-existence off the LLM — is a **Loomweave batch-resolve CLI + a writing-plans
> convention** (~50 lines), NOT a member, and only if a real workflow asks for it. The sections below are
> the (now-superseded) shaping; the conclusion is: don't build it.

> **REFRAMED 2026-06-25 (same day): read-only, NO code execution.** An earlier framing in this note had
> Shuttle as a transactional *change executor* (apply edits, roll back). The owner ruled the suite does
> **not** want to own a code-writer (it would be the first member to mutate source — a categorical break
> from the read-only/advisory posture). Shuttle is repurposed to a **plan-staging / rendering / binding**
> surface that does **no** code editing. The change-execution gap returns to deliberately-unowned (agents
> edit directly via their own tools, by design).

## What it is

A system you **create and inject structured plans into**, which **renders them into a human UI** and
**binds them to the spine** (Filigree issues, Plainweave requirements, Loomweave SEIs) where appropriate.

- **Authoring surface (owner sketch):** `mcp_create_plan` → `mcp_set_plan_step  1, file.py, [impacted
  SEIs], [edits/changes described], explanation, review notes` → … An agent (or human) injects the plan;
  Shuttle stores + renders + binds it. Shuttle does **not** reason about the code or author the plan.
- **It does NO code editing.** The only non-DB filesystem write it performs is **"write out a plan as
  markdown"** (a render/export target). Source code is never touched.
- **Storage:** its own DB (the plans + their bindings). It does not write into siblings' stores.

So Shuttle owns one artifact: **the plan as a first-class, rendered, spine-bound object** — the staging
surface between *intent* (Plainweave), *work* (Filigree), *structure* (Loomweave), and the edits an agent
will make by hand.

## Why this is the right altitude

- Resolves the hardest §7 gate: the suite does **not** own a code-writer; everything stays read-only /
  advisory / enrich-only.
- It is the **purest expression of the founding insight** — plans currently live as dead markdown *off the
  spine*; this makes a plan human-legible *and* binds it to the SEI spine, so its symbols are resolvable and
  drift-checkable. (The thinner "anchor-manifest resolver" idea is this surface's pre-flight check, extracted.)

## The dependency-sink invariant — KEPT, reframed (owner ruling 2026-06-25; rationale updated same day)

> **No sibling may declare Shuttle a dependency of any feature — optional or not.** Edges point only *into*
> Shuttle (Shuttle reads the authorities to render/bind); never out of it. Shuttle is a **pure dependency
> sink**.

- **Original rationale (now moot):** "no perverse incentive to install the *code-writer* unless you want
  code-write." There is no code-writer anymore.
- **Reframed rationale (why the property still holds):** Shuttle is a **presentation / aggregation layer
  over the authorities.** A renderer that aggregates from the authorities must stay **trivially removable
  and never load-bearing** — the authorities must not grow a dependency on the viewer. Edges into the sink
  only.
- **Consequence:** Shuttle reaches the federation only by what it *renders/exports* (its UI, its markdown),
  never via a fact-API a sibling binds to. It **consumes** Filigree/Plainweave/Loomweave (reads them to
  bind); it is **never a producer** other members read.

## The live §7 question — member vs. Filigree feature (the crux, now that execution is gone)

Removing code-execution removed the sharpest line between Shuttle and Filigree's plans. This must be
decided deliberately, not waved through:

- **"It's a feature":** Filigree already has `plan_create` / `plan_step_add` + ADR-029 entity bindings.
  "Render plans + bind to siblings" can read as a Filigree UI feature reusing Plainweave's bindings.
  "Only useful because of the federation" leans adapter, not member.
- **"It's a member":** the *artifact* is genuinely different — a structured **implementation/change plan**
  (e.g. a 2,800-line plan review) is not a Filigree work-breakdown. And **no member owns "the plan as a
  rendered, spine-bound object"**: Filigree owns work-state, Plainweave owns intent, Loomweave owns
  structure — the plan that spans all three and is made human-legible is unowned.
- **Lean:** plausibly a member **iff** the bounded domain is framed as *"the change/implementation plan as
  a first-class, rendered, spine-bound artifact — the staging surface between intent and edits."* Needs
  **prove-the-need** (below) before admission.

## Boundaries / what it is NOT

- **Not Filigree's plans.** Filigree `plan_step_add` = *work decomposition* (issues/steps for
  coordination). A Shuttle plan = *the rendered implementation/change plan*. They link (a Shuttle plan
  binds to Filigree issues), they don't merge.
- **Not Plainweave.** Plainweave owns *intent* (code → requirement → goal). Shuttle owns the *plan
  artifact* and binds plan steps to Plainweave requirements where appropriate. Different objects.
- **Not a code-writer / not an executor.** No edits, no apply, no rollback. The agent does the edits with
  its own tools; Shuttle holds and renders the plan that guided them.

## Prove-the-need

Shuttle's value over "a markdown plan in a repo + a Filigree issue" is: a **rendered**, **spine-bound**,
**drift-checkable** plan (symbols resolve against Loomweave; bindings to issues/requirements are live).
Real, but must be **proven by live use**, not asserted. The baseline is in front of us: the per-task plan
review that motivated this (the elspeth 2,800-line plan, the symbol-existence checks) is the *manual*
version. Build the read-only staging surface, point it at a real plan, and see whether the workflow wants a
distinct tool or merely a Filigree view.

## Open questions / owner gates

- **§7 admission** (owner-reserved): is "rendered, spine-bound plan-staging" a bounded domain a member
  owns, or a Filigree feature? This note shapes the decision; it does not make it.
- **Keep the dependency-sink invariant under the reframed (aggregator/removability) rationale?** — confirm.
- **Name + repo:** "Shuttle" repurposed from change-execution → plan-staging; no `~/shuttle` until admitted.
  If admitted, the doctrine §2/§8 Shuttle definition (currently "change execution") must be rewritten, and
  the change-execution gap recorded as deliberately-unowned.
- **Build-first:** the read-only **anchor-manifest resolver** (Shuttle's pre-flight, extracted) is the
  cheapest first slice and proves the resolve substrate before any UI/DB.
