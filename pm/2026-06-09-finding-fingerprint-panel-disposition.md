# PM disposition — finding-fingerprint move-stability panel

**Date:** 2026-06-09. **Inputs:** panel brief
`2026-06-09-finding-fingerprint-stability-panel-brief.md` + 7-lens synthesis (archived in
session). **Tracking:** `weft-4a9d0f863c` (WL-1, resolved/verifying), migration
`weft-e618c4118a`.

## Verdict accepted

The panel's convergent verdict stands and I'm adopting it:

- **Direction:** hybrid/tiered key (SARIF-`partialFingerprints`-style) — drop `line_start`
  from the join key; key on `(scheme_version, rule_id, path, qualname, discriminator)` with a
  source-derived, within-`qualname`-unique, move-stable discriminator. **Reject** SEI-as-base
  (not rename-stable, couples local-first), content-window hash (soundness + determinism +
  source-leak), and bare scope-ordinal as the *primary* key (rule-dependent denominator =
  reintroduces ruleset churn).
- **Genuine alternative to spike first:** scan-driven re-anchoring — re-pin baseline/waiver/judge
  verdicts each scan via an old→new remap. Sidesteps the collision-vs-stability tension entirely
  and may make a "perfect key" unnecessary. The design track starts with this spike, not by
  assuming the hybrid.

## Three buckets

### A. Do NOW — decision-independent (filed)
- **C-1 (P1, wardline):** PY-WL-114 present-tense collision (stacked identical decorators →
  identical fingerprint, one silently masks the other) — verified in source
  (`invalid_decorator_level.py:169-174`). Plus the root-cause fix: reclassify every rule by
  **cardinality** (can it emit >1 per `(rule_id,path,qualname)`?) not anchor-type, and add a
  scan-finalizer assertion that no two ACTIVE findings share a fingerprint (fail-loud, local).
  Same family as the chained-call bug; **not gated on the move-stability decision.**

### B. Free wins folded into the EXISTING WL-1 migration (`weft-e618c4118a`)
Independent of `line_start`, the panel hands us two upgrades to the migration *already in flight*:
- **Scan-driven remap preserves verdict proof.** WL-1-as-written ("re-run judge, re-waive
  resurfaced") **discards history**. The scan has both source and stored keys → emit `(old_fp,
  new_fp)`, carry verdicts where source is unchanged. Only genuinely-moved findings lose
  attachment. Adopt this as the migration mechanism.
- **Migration hardening:** persist an `old_fp→new_fp` journal + per-leg done-flags
  (`.weft/wardline/migration_journal.yaml`); **resume reads the journal, never re-scans**; leg
  order **YAML stores first (gate-critical), Filigree daemon last (reconciliation debt)**; a
  `--probe` consistency check; forward-only rollback from a pre-flight snapshot.

### C. The `line_start` design track — GATED (filed as the promoted issue)
The move-stability fix proper. Sequence (panel §5): spike scan-driven-vs-hybrid → if hybrid:
fix C-1 → extend the collision corpus to a **proof** (mutation-pair + NFKC/byte-column +
stacked-decorator fixtures, both interpreter legs) + a construction-shape lint → scheme-stamp
infra (`wlfp1:<hex>` value prefix + `fingerprint_scheme` headers + `SCHEME_MISMATCH`) → **decide
the discriminator** (relative-span vs group-ordinal) **gated on `ruff_python_ast` reproducing
CPython NFKC folding + sibling/document ordering** → migrate.

**The open decision inside the hybrid (the genuine fork):** relative-span (loud-on-engine-diff,
keeps reindent residual) vs group-ordinal (reindent-stable but *silent* mis-assign if engines
diverge). **Tie-breaker is technical, verifiable pre-cutover:** does the planned Rust core conform
to CPython byte-columns + sibling ordering? Conforms → ordinal; can't guarantee → relative-span
(stay loud). **Do not ship the ordinal without a cross-engine ordering golden on both legs.**

## The sequencing call (needs your nod)

**Recommendation: DECOUPLE — ship WL-1's migration on its own timeline; treat `line_start` as a
separate gated track.** The panel allows bundling *only if* the new scheme is design-locked +
corpus-gated **before** the fleet upgrades. It isn't, and it needs real pre-work (C-1, corpus,
scheme-stamp, ruff conformance, discriminator decision). WL-1's fix is *done and verified*.

The failure asymmetry decides it: `line_start` churn fails **loud and recoverable** (a finding
resurfaces); a bad move-stable key fails as a **silent false-negative** (one real finding masks
another). Rushing an unproven move-stable scheme into a one-shot clean-break migration to "save a
second migration" trades a loud, known cost for a silent, unknown one. **Two clean gated
migrations beat one rushed bundle.** So: WL-1 migrates now (with the B free-wins); `line_start`
migrates later once C gates pass.

*The single risk that flips the discriminator choice (panel §6):* if the Rust core can't reproduce
CPython NFKC + traversal order, `qualname` and any ordinal become silent cross-engine drift axes —
fall back to loud-on-diff relative-span and lean harder on the scan-driven re-anchoring (C's
spike) as the deliberate place to absorb drift.

## Filed
- `weft-08124cad2c` — PY-WL-114 collision + rule-cardinality reclassification + scan-finalizer assertion (P1, wardline). **Do now.**
- `weft-feea638ec0` — move-stable finding identity: spike scan-driven-vs-hybrid + hybrid scheme + discriminator gate (P2, wardline). **Gated.**
- `weft-e618c4118a` — updated with the scan-driven remap + migration hardening (B). **Ships now, decoupled from line_start.**
