# Shuttle (SPECULATIVE roadmap thought-bubble — NOT a member)

**Status:** **Speculative. Not a federation member.** A roadmap thought-bubble with **no repo**, lowest priority, **displaceable by any better idea**. Charter (started 2026-06-04) is exactly the kind of better idea that takes priority over it. The `shuttle://` URI prefix is **reserved but inert** ([uri-scheme.md](../uri-scheme.md)). Do not build bindings, URIs, or contracts that depend on Shuttle existing. See also [roadmap-ideas.md](../roadmap-ideas.md) for other speculative sub-app candidates.

## The sketched idea (for context only)

Shuttle names an acknowledged gap: a future **change-execution authority** — "carry this approved change through the weave, under guard rails." The sketch: receive a scoped change intent, bind it to files/entities, order the edits, apply incrementally with pre/post checks, roll back on failure, and lint/commit/emit telemetry on success — **without** planning, triaging, or reasoning about the code (those stay Filigree/Loomweave's jobs).

It is named only so the change-execution gap is visible on the roadmap. The eventual product filling this gap may not be called "Shuttle" at all.

## What already references it (and why that's mostly stale)

- **Filigree** has `migrate-to-shuttle` tooling and `shuttle://` milestone-reference URIs from its planning-deprecation work — but there is nothing to migrate *to* or resolve *against* yet. See [uri-scheme.md](../uri-scheme.md) and [conflict-register.md](../conflict-register.md) §B-3.
- **Loomweave / Charter** explicitly out-scope change execution (Clarion NG-07; Charter ADR-001), correctly leaving the gap unfilled.

## If it ever becomes real

It must pass the go/no-go test ([doctrine.md](../doctrine.md) §7) with its own spec, design, and validating customer — and be admitted to the roster by the hub, exactly as Legis and Charter were. Until then it is a placeholder, not a plan.
