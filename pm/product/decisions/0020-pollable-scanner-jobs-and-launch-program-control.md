# PDR-0020 — Pollable scanner jobs and launch program control

Date: 2026-06-13   Status: accepted   Author: codex   Owner sign-off: yes
Supersedes: n/a   Related: `weft-02df60cd79`, `weft-b3a1828d6a`, `weft-590555a273`, `weft-303d5bb7ce`

## Context

The post-fix Lacuna re-dogfood found the four federation joins live enough to proceed, but it also exposed residual agent-experience failures. The strongest external confirmation came from the esper-lite Wardline run: the scanner ran silently for minutes, then failed at the upload stage when Filigree rejected an over-limit payload. The operator stated the product principle explicitly: long-running scanners should run as jobs that can be polled for meaningful progress/status.

The same launch window also needs coordinated residual burn-down across the four existing member projects. The hub/program office has temporary launch authority over Filigree, Loomweave, Wardline, and Legis until ship. Warpline remains outside that authority and is not part of the launch-control set.

## Options considered

1. Treat the esper-lite failure as only a Wardline bug — fast, but it leaves Loomweave analyze and any future scanner path free to repeat the same silent foreground pattern.
2. Define a cross-suite job contract now and let each member adopt it where long-running scanner/analyze paths exist — slightly broader, but preserves one agent-facing expectation.
3. Defer until after launch — least disruption, but keeps a known dogfood failure in the release candidate path.

## The call

Adopt option 2. Long-running scanner/analyze operations in the controlled launch members must expose a job-oriented path: start returns a stable job handle; status polling returns meaningful progress/state and a final artifact pointer; failures distinguish analysis/gate failure from enrichment/upload failure.

During the launch burn-down, the program office may dispatch and accept work in Filigree, Loomweave, Wardline, and Legis to satisfy this contract and related residuals. Warpline is explicitly excluded until a separate owner admission decision changes its status.

## Rationale

This is not just a performance nicety. Agent operators need to distinguish "still scanning", "analysis failed", "gate failed", and "enrichment upload failed" without waiting on a silent foreground command. The job contract also protects the enrich-only doctrine: a scanner can complete its primary gate and report upload failure as degraded status instead of collapsing the entire run.

Recording the launch-control boundary prevents the hub from accidentally treating Warpline as an admitted fifth member while still allowing the program office to burn down release blockers across the four subordinate projects that are already in the suite.

## Reversal trigger

Reopen if a launch dogfood run can complete all required scanner/analyze paths with bounded foreground latency and meaningful streaming progress without a job abstraction, or if Warpline is admitted by a separate owner-signed PDR before launch.
