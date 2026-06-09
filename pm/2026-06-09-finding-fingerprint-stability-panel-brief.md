# Panel brief — stable finding identity for the Wardline fingerprint

**Convened:** 2026-06-09. **Status:** design risk-assessment, pre-decision.
**Tracking:** residual of `weft-4a9d0f863c` (WL-1, resolved); migration `weft-e618c4118a`.

You are one of a panel of independent experts. Read the background, then — **through
your own discipline's lens** — identify the issues, risks, failure modes, and
trade-offs you see. We want the *risk surface*, not a single blessed answer. Disagree
with the framing if the framing is wrong.

---

## Background: the system

**Wardline** is a Python static analyzer in the **Weft** suite (Wardline, Filigree
issue-tracker, Loomweave code-graph, Legis governance). Design axioms that constrain
any solution:

- **Deconfliction-first, not security.** The suite coordinates agents working a shared
  codebase; it is low-security by design. Re-frame any "security" finding as a
  functional / availability / correctness / trust-of-the-record concern.
- **Local-first.** Everything runs same-host with zero external dependencies (local
  SQLite stores, auto-minted tokens, no cloud accounts). A solution requiring a hosted
  service or network call is a category violation.
- **Clean-break, no dual-read.** The suite is pre-launch; there is no released
  cross-member backcompat to preserve. Migrations are one-shot, not dual-path.
- **Agentic-first.** The consumer is an LLM agent. "If the agent prefers `grep`, the
  tool failed." Identity churn that manufactures duplicate work is a first-order defect.

## The artifact under review: the finding fingerprint

Every Wardline finding carries a **fingerprint**:

```
fingerprint = sha256(rule_id, path, line_start, qualname, taint_path)
```

This fingerprint is the **cross-tool join key** into **four** stores:

1. `baseline.yaml` — accepted/known findings (suppression).
2. the **waiver** store — explicitly waived findings (with proof).
3. the **judge** store — agent/human triage verdicts.
4. the **Filigree tracker** — the federated finding/issue rows other tools and agents read.

When the fingerprint moves for a *byte-identical defect*, all four joins silently break:
the baseline misses (the finding resurfaces ACTIVE and trips the `--fail-on ERROR`
gate), the waiver/judge memory is lost, and Filigree accrues a **duplicate** row. There
is no released consumer to renegotiate with — a drifted key is an availability/
correctness failure, detectable only by a live probe.

## What just happened (the fix already shipped — context, not the question)

A baselined finding escaped its baseline across builds on unchanged source. Root cause,
empirically confirmed: `taint_path` folded **engine-resolution outputs** (the resolved
return-trust tier, e.g. `UNKNOWN_RAW->ASSURED` drifting to `EXTERNAL_RAW->ASSURED` for
the same `cur.fetchall()` as the rule suite was extended) into the key. As Wardline's
own ruleset grew — its *success* — the join key moved under every consumer.

The fix (shipped, frozen in ADR §8, guarded by a collision gate + an invariance test):
strip all resolved-tier / resolution-derived components from `taint_path`. Def-anchored
rules now pass `taint_path=None`; call-site rules keep a **source-only discriminator**:
the sink/callee spelling + the call's **full lexical span** (`col_offset:end_col_offset`).
A review panel caught a real soundness regression in an interim design — a
`col_offset`-only form collided on **chained calls** (`cur.execute(a).execute(b)` share
a start column) — fixed by using the full span. **Take that as the soundness bar any
identity scheme must clear: two distinct findings must never share a key.**

## The residual — and the actual question for this panel

The fingerprint is now invariant to **ruleset/resolution** churn. It is **not** invariant
to **code-movement** churn: `line_start` is still a key component, so inserting a line
above a finding (any refactor) changes its fingerprint — re-breaking all four joins.

For the **specimen** repo this barely matters (it rarely moves). For **live member
repos** — where code moves on every commit — it is the *same drift class* we just
killed, recurring on every refactor.

> **Design question:** What is the right **move-stable finding identity** — one that
> survives code movement (line shifts, refactors) **and** ruleset/resolution change,
> while still uniquely disambiguating distinct findings, computable **locally and
> deterministically**, at an acceptable one-time migration cost?

This is the same problem Loomweave already solved for *entities* with rename/move-stable
**SEIs** (`loomweave:eid:…`, a frozen identity scheme). The open question is whether
Wardline should adopt an SEI-class structural anchor for *findings*, or something else.

## The central tension

**Stability vs. uniqueness.** Less positional information → more stable across movement,
but higher collision risk (two findings collapse to one key; one silently masks the
other — a *soundness* failure). More positional information → unique, but drifts on
movement. `line_start` sits at the fragile end. The job is to find an anchor that is
**both** move-stable **and** collision-free, or to reason explicitly about where to trade.

## Candidate directions (react to these; you are not limited to them)

1. **Structural/scope-ordinal anchor** — replace `line_start` with `qualname` +
   *ordinal of this finding within its enclosing scope* (the N-th matching sink in
   function F). Move-stable under whole-block movement; question: behavior under
   reordering, duplication, or edits *within* the scope.
2. **Content-window hash** — hash a normalized slice of the source around the finding
   (the statement/expression text) instead of its line. Move-stable; question:
   collisions on genuinely-identical code, and re-introducing *content* drift.
3. **Hybrid / tiered** — a stable primary key + a positional secondary used only to
   disambiguate collisions (and explicitly excluded from the join).
4. **SARIF-style partial fingerprints** — adopt the SARIF `partialFingerprints` /
   logical-location precedent (the industry has fought this exact "stable across runs"
   battle); question: what maps cleanly to a local, deterministic, single-tool world.
5. **SEI-class structural identity** — borrow Loomweave's move-stable anchor approach
   wholesale; question: coupling Wardline finding identity to Loomweave's entity graph.

## What we want from you (per your lens)

- **Failure modes & risks** specific to your discipline, with likelihood × impact.
- **Collisions / soundness**: where could a proposed anchor map two distinct findings to
  one key? Adversarial inputs (chained calls, decorators, comprehensions, generated
  code, duplicated blocks, macros/metaprogramming).
- **Determinism**: any input that varies by platform, parse order, Python version,
  locale, or analyzer build — anything that would re-break stability the way
  resolved-tier did.
- **Migration & operations**: each key change is a one-time lockstep migration across
  four stores (regenerate baseline → re-judge → re-waive → reconcile orphaned Filigree
  rows). Is the proposed change worth *another* migration? Can `line_start` be bundled
  with the (pending) WL-1 migration so members migrate **once, not twice**? Rollback,
  detection, idempotency, partial-failure.
- **Contract & versioning**: the fingerprint is a frozen federation contract (ADR §8).
  How should the scheme itself be versioned so a future change is survivable? Should the
  key carry a scheme-version prefix?
- **Secret-safety**: fingerprint inputs must not leak withheld source (cf. Loomweave
  `briefing_blocked`). Does a content-window anchor create an exposure?
- **Blind spots**: what is the framing above missing entirely?

## Deliverable

A findings list: each item = {issue/risk, your-lens, severity, evidence/example,
recommendation}. Plus, if you have a view: which candidate direction you'd back and the
single risk that would change your mind. Flag explicitly anything you believe is
**out of scope / not worth fixing** — "leave `line_start`, accept move-churn for live
repos" is a legitimate position if you can defend it against the live-consumer cost.

## Suggested panel composition (one expert per lens)

Static-analysis / finding-identity (SARIF prior art) · AST/compiler (what structural
anchors are actually stable) · formal soundness / collision analysis · determinism &
reproducibility · distributed data migration / four-store join · cross-tool API &
contract versioning · operations/SRE (migration blast radius) · security / secret-safety.
