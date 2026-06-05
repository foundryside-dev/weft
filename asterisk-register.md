# Loom — asterisk register

**Status:** **Authoritative.** This is the federation-wide register of named *asterisks* — documented, time-bound violations of the federation axiom's failure test ([doctrine.md](./doctrine.md) §5), each with a written retirement condition and the failure-test mode it temporarily violates. Promoted from the asterisk list in `~/clarion/docs/suite/loom.md` §5.

An asterisk is acceptable **only** with (a) a written retirement condition and (b) an honest statement of which failure-test mode it violates (semantic / initialization / pipeline coupling). **Do not add a new asterisk without both.** A "we'll fix it later" without a test-mode citation is not an asterisk; it is the stealth-monolith failure mode.

## Live asterisks

### A-1 — Wardline → Filigree findings are pipeline-coupled through Loomweave

- **Pair:** (Wardline, Filigree)
- **Failure-test mode violated:** pipeline coupling (doctrine §5, mode 3)
- **What it is:** Wardline's SARIF output reaches Filigree only via Loomweave's `clarion sarif import` translator. The (Wardline, Filigree) pair cannot exchange findings without Loomweave present.
- **Status:** **LIVE** as of 2026-06-05.
- **Retirement condition (mechanism updated 2026-05-29):** the generic Wardline rebuild ships a **native Filigree emitter** (Wardline-side), at which point the pair composes directly and Loomweave drops off the transport path. Loomweave's `clarion sarif import` stays as the general-purpose SARIF path for other tools; only its Wardline-bridge role retires. The asterisk is **kept live** until that emitter ships *and* (Wardline, Filigree) composition is verified with Loomweave absent — agreement to the direction is not retirement.
- **Authoritative sources:** Clarion ADR-015 Revision 2 (`~/clarion/docs/clarion/adr/ADR-015-wardline-filigree-emission.md`); Wardline integration brief (`~/wardline/docs/integration/2026-05-29-wardline-loom-integration-brief.md`). Tracked under Clarion `release:1.1`.

## Retired asterisks

### A-2 — Loomweave's Python plugin imported `wardline.core.registry.REGISTRY` at startup

- **Pair:** (Loomweave, Wardline)
- **Failure-test mode that was violated:** initialization coupling (doctrine §5, mode 2), scoped to the Wardline-aware plugin specifically, not Loomweave as a product.
- **Status:** **RETIRED 2026-06-05.**
- **How it retired (two parts):** Wardline shipped the NG-25 trust-vocabulary descriptor, and Loomweave's Python plugin now reads that descriptor (`.wardline/vocabulary.yaml` first, then the installed `wardline/core/vocabulary.yaml` data file) **without importing** `wardline`, `wardline.core`, or `wardline.core.registry`. Loomweave records only source-observed decorator metadata on its own entities; Wardline remains authoritative for vocabulary and policy semantics.
- **Authoritative source:** Clarion ADR-018 Revision 3 (`~/clarion/docs/clarion/adr/ADR-018-identity-reconciliation.md`); Clarion CHANGELOG (retirement landed in Clarion 1.3.0).
- **Note:** the entry is retained as historical record, not deleted (the register keeps retired asterisks for audit).

## How an asterisk moves through its lifecycle

1. **Named** — added here with pair, failure-test mode, and a written retirement condition.
2. **Live** — tracked against a release; surfaced in design review.
3. **Retired** — only when the retirement condition is *demonstrated* (not merely agreed), with the verifying evidence cited. Move it to the Retired section; do not delete.
