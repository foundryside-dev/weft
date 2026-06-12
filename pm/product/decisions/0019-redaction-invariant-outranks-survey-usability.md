# PDR-0019 — Non-disclosure stub-collapse invariant outranks dead-list usability; exclusion + aggregate marker

- **Date:** 2026-06-13
- **Status:** accepted (PM, within grant)

## Context

Dogfood-4 B2 complained that `entity_dead_list`'s fully-redacted rows
(`briefing_blocked: secret_present`, id/name/path all null) are unactionable,
and asked to "redact the secret, not the row identity". The PM dispatch
repeated that ask verbatim. Mid-task, the fixer agent editing loomweave's
shared redaction choke point broke the deliberately pinned "Landmine #9" test
family (`clarion-307668e2be`): a secret-blocked entity must collapse to an
all-null stub on **every** projection surface so no reverse-map/candidate/row
can disclose it.

## Options

1. Keep row identity (the dogfood ask / original dispatch) — weakens the
   non-disclosure invariant suite-wide to fix one survey surface.
2. Keep the all-null rows (status quo) — honest but unactionable noise.
3. **Exclude blocked entities from the dead-list row set entirely; report one
   aggregate top-level `withheld: {count, reasons, recovery}` marker (chosen).**

## Call

Option 3. The invariant stays pinned; landmine tests pass byte-unmodified.
Neither unactionable null rows nor identity disclosure; aggregate-level
actionability via the recovery path. Also satisfies B2(4)'s hoist-the-repeated-
reason requirement. Note: weft is deconfliction-first, not security — but the
stub-collapse is a *member's own deliberate, test-pinned design*, and a fixer
task does not get to unpin a frozen invariant because an upstream brief was
sloppy. The brief was the defect; corrected via mid-task ruling, recorded in
loomweave commit `e4d9dc6`.

## Process lesson (operational, recorded for reuse)

Dogfood complaints are *observations*, not specs. When a dogfood ask collides
with a pinned member invariant, the collision escalates to the PM as a design
ruling — fixer agents must not resolve it by editing pinned tests or shared
choke points. Future dispatches that touch redaction/identity surfaces should
name the landmine suite as a hard acceptance criterion up front.

## Reversal trigger

If a future operator/owner ruling explicitly deprioritises the stub-collapse
invariant (e.g. decides secret-site identity is not worth protecting in an
own-use suite), option 1 reopens as a deliberate owner-level change — not as a
side effect of a usability fix.
