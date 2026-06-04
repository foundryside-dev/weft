# Loom — cross-product addressing (URI scheme status)

**Status:** **Authoritative** for *which addressing scheme is canonical*. The short answer: **there is no live federation URI scheme.** Cross-tool binding is done by **[SEI](./sei-standard.md)** (opaque identity) plus the per-product association/contract surfaces in [contracts-index.md](./contracts-index.md) — not by a URI grammar.

## The `loom://` URI scheme is closed

A richer cross-tool addressing standard — the **Loom URI scheme** (`loom://…` + a component registry + `/api/loom/multi-fetch`) — was specified in `~/filigree/docs/plans/2026-05-17-loom-uri-spec.md` (per-component schemes like `shuttle://elspeth/plan/…`, with `loom://` reserved for future federation-level resources).

It was **never implemented** and was **formally closed** by the [SEI standard](./sei-standard.md) (§0, §0.2, §9): its registry / multi-fetch apparatus was over-built and never shipped; the *stable identity* it reached for is now delivered by SEI instead. SEI explicitly lists "the Loom-URI scheme, a federation registry, `/api/loom/multi-fetch`" as **out of scope, ever**.

> **Drift note.** The previous hub (`federation-map.md`, `shuttle.md`) described `shuttle://…` Loom URIs as "the federation's nascent cross-product addressing scheme." That framing is stale: the scheme it referred to is the closed one above. Recorded as a fixed drift item in [conflict-register.md](./conflict-register.md) §A-8.

## What about `shuttle://` milestone references?

Filigree's planning-deprecation work used `shuttle://…` URIs as a lightweight way for a milestone to reference a (future) Shuttle plan/step (`~/filigree/docs/plans/2026-05-17-loom-uri-spec.md`, `2026-05-17-filigree-planning-deprecation.md`). This is a *thin reference convenience*, distinct from the closed `loom://` registry/multi-fetch apparatus.

Its status is **unresolved and low-stakes**, because **Shuttle is a roadmap thought-bubble with no repo** (see [members/shuttle.md](./members/shuttle.md)) — there is nothing for a `shuttle://` URI to resolve to today. Whether a thin reference scheme survives if/when a change-execution authority is actually built is an open question, owned by Filigree + whoever designs that authority. Tracked in [conflict-register.md](./conflict-register.md) §B-3.

**Guidance for now:** do not build on `shuttle://`. Use SEI for entity identity and the documented association/contract surfaces for cross-tool bindings.
