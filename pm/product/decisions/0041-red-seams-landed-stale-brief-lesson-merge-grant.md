# PDR-0041 — Two RED seams LANDED+CLOSED; stale-brief root cause; owner merge-grant

- **Date:** 2026-06-29
- **Status:** accepted (within grant — land green/verified member fixes + record a standing authority grant)
- **Bet/Now:** fabric-first (PDR-0035) — axis-2 honesty: drive the two confident-wrong seams to 0

## Context
The 2026-06-29 federation audit (PDR-0039) filed the suite's last two confident-wrong seams:
RED-1 `weft-0678843f13` (closure-gate drift — a governed issue could close `allowed:true`
against drifted code) and RED-2 `weft-d5091cba12` (plainweave advertises `local_only` but made
a live Loomweave call on read-enrich). RESUME reconciliation this session found **both already
fixed** on green, isolated PRs opened the same morning by a concurrent session — filigree #71
(`fix/red1-closure-gate-drift` @ bb51fa5) and plainweave #6 (`fix/red2-authority-boundary` @
fc94e6d). The 15:05 checkpoint had not seen them.

## Call — both LANDED + CLOSED (owner-approved merge)
- **RED-1 → filigree main `9b50143`.** Filigree owns current-code-vs-attach drift (hub ruling,
  ADR-029 Decision 3); governed close resolves each binding's current `content_hash` from
  Loomweave and STALE-gates on drift. CI green all Python versions.
- **RED-2 → plainweave main `9b5fc88`.** Read-path enrich switched `resolve_identity` →
  `resolve_identity_local`; honors the advertised boundary. `make ci` green.
- Both bugs walked their real lifecycle (confirmed→fixing→verifying→closed) with `root_cause`,
  `fix_verification`, and `close_commit` anchors. RED-1's three children stay OPEN as tracked
  follow-ups (legis comment **folds into 1.4.0**, not standalone; loomweave oracle additive;
  P3 hardening). **Axis-2 honesty: 2 confident-wrong seams → 0.**

## What gated the merge (the checks CI cannot self-certify)
Per the audit's own thesis ("a seam that lost the ability to say I-don't-know"), I verified
in-code, not from the PR prose:
- **RED-1 degrade path** (`governance.py::_evaluate_current_drift`): no-resolver /
  RegistryUnavailable / unresolvable-entity → discriminated **UNKNOWN** (logged, never
  silent-fresh, never hard-block); only `current!=attach` with both present → STALE; ordered
  before the `legis_known_down` short-circuit. Enrich-only preserved.
- **RED-2 non-vacuity**: `resolve_identity_local` returns real `content_hash` from sqlite, and
  the regression tests assert `content_hash=='hash-public-v1'` + `freshness=='current'` — not
  merely "no live call." No boundary-lie-for-vacuous-lie trade.
Both members' release workflows are tag-gated (`on: push: tags: ["v*"]`) → merge-to-main
publishes nothing. No file overlap with either member's concurrent in-flight branch (PDR-0040
concurrent-ownership check).

## Standing decision A — the brief was stale because checkpoints reconcile against main, not PRs
The 15:05 checkpoint reconciled against member **main HEADs**, so it missed two fixes that were
sitting in **open PRs**. **Resume + checkpoint reconciliation MUST survey open PRs across all
members (`gh pr list` per repo, non-dependabot), not just `main`.** With 4–7 members on active
branches, "is it done?" cannot be answered from main alone. (Captured to auto-memory.)

## Standing decision B — owner merge-grant (NOT a release-tag grant)
Owner, 2026-06-29: *"going forward, you can assume you have permission to merge but not
permission to tag a new release."* Merging a green/reviewed member PR is reversible internal
hub delivery ([[pen-moves-to-hub]]); cutting a release is a `v*` tag = PyPI publish, which stays
owner-reserved alongside announcement/canon. Merge gates still apply (CI green + clean + no
concurrent-owner conflict + degrade/non-vacuity eyeballed). **Settings encoding
(`Bash(gh pr merge:*)` allow) is owner-applied** — the harness blocks the agent from widening
its own permission rules; recorded to auto-memory and surfaced to the owner to apply.

## Reversal triggers
- If a closed RED reopens (a governed close waves through drift, or plainweave makes a live call
  on an advertised-local path) — the fix regressed; reopen + re-gate.
- If a merge under this grant lands a contract break or a version-truth wrinkle, tighten the
  grant back to per-merge approval.
- If the "survey PRs not main" rule is skipped and a checkpoint again ships a stale brief,
  encode it as a SessionStart/checkpoint hook, not just discipline.
