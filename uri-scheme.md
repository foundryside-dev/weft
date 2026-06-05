# Weft — cross-product addressing (URI scheme status)

**Status:** **Authoritative** for *which addressing scheme is canonical*. The short answer: **there is no live federation URI scheme.** Cross-tool binding is done by **[SEI](./sei-standard.md)** (opaque identity) plus the per-product association/contract surfaces in [contracts-index.md](./contracts-index.md) — not by a URI grammar.

## The `weft://` URI scheme is closed

A richer cross-tool addressing standard — the **Weft URI scheme** (`weft://…` + a component registry + `/api/weft/multi-fetch`) — was specified in `~/filigree/docs/plans/2026-05-17-weft-uri-spec.md` (per-component schemes like `shuttle://elspeth/plan/…`, with `weft://` reserved for future federation-level resources).

It was **never implemented** and was **formally closed** by the [SEI standard](./sei-standard.md) (§0, §0.2, §9): its registry / multi-fetch apparatus was over-built and never shipped; the *stable identity* it reached for is now delivered by SEI instead. SEI explicitly lists "the Weft-URI scheme, a federation registry, `/api/weft/multi-fetch`" as **out of scope, ever**.

> **Drift note.** The previous hub (`federation-map.md`, `shuttle.md`) described `shuttle://…` Weft URIs as "the federation's nascent cross-product addressing scheme." That framing is stale: the scheme it referred to is the closed one above. Recorded as a fixed drift item in [conflict-register.md](./conflict-register.md) §A-8.

## `shuttle://` is RESERVED (not active)

Filigree's planning-deprecation work used `shuttle://…` URIs as a lightweight way for a milestone to reference a (future) Shuttle plan/step (`~/filigree/docs/plans/2026-05-17-weft-uri-spec.md`, `2026-05-17-filigree-planning-deprecation.md`). This is a *thin reference convenience*, distinct from the closed `weft://` registry/multi-fetch apparatus.

**Status: RESERVED.** The `shuttle://` prefix is **reserved** for a future change-execution authority and is **not an active scheme** — **Shuttle is a speculative roadmap thought-bubble with no repo** (see [members/shuttle.md](./members/shuttle.md)), so there is nothing for a `shuttle://` URI to resolve to today. Reserving it keeps the prefix from being reused for something else; it confers no live behaviour. Whether a thin reference scheme is actually adopted is decided **if/when** a change-execution authority is built (which may not be called "Shuttle"). Owned by Filigree + whoever designs that authority. Tracked in [conflict-register.md](./conflict-register.md) §B-3.

**Guidance for now:** treat `shuttle://` as reserved-but-inert; do not build on it. Use SEI for entity identity and the documented association/contract surfaces for cross-tool bindings.
