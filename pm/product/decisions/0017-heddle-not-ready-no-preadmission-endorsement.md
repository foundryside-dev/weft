# PDR-0017 — Warpline: not member-grade; no pre-admission contract endorsement

- **Date:** 2026-06-13
- **Status:** accepted (PM, within grant; admission itself remains owner-reserved)

## Context

Codex iterated warpline from "design spike" to a working prototype in ~36h and
produced (a) a claim of "product-candidate ready" with "10/10 solo parity,
10/10 federation uplift", and (b) an **Interface Endorsement Package** asking
the hub to bless its MCP names/envelopes/payloads pre-admission. Two
independent hub reviews ran: a morning readiness review (live-verified) and an
evening PM scrub of the proposal (live-verified, against `main` @ `d16d0c4`).

## Findings (evidence on `weft-e4589e6570`, comments 192–193)

- Real progress: `.weft/warpline/` store, `changed→reverify` 2-call bridge,
  outputSchemas, undecodable-bytes degrade, 70 tests green.
- **"10/10 parity/uplift" is self-graded and circular**: ten copies of one
  synthetic 2-file case; the "federation" lane injects a hardcoded fake
  loomweave client containing the expected answer; the "baseline" is a string
  list never executed; `NO_SNAPSHOT` + empty worklist counts as "parity".
- **Server still fail-dead**: one bad `rev_range` kills the MCP server with a
  raw traceback (live-reproduced); `errors.py` contract raised nowhere;
  `initialize` spec-incomplete; no real-client test. C-1 nested `.gitignore`
  missing (live DB stages on `git add -A`).
- The endorsement package itself is **good contract design** (C-6-canonical
  envelope, `entity_ref`, `retryability` error vocab) — but it is a paper
  contract: the shipped surface implements none of it.

## Call

1. **Not ready** against the PDR-0016 bar — fails both halves in shipped behaviour.
2. **No pre-admission endorsement**: no such mechanism exists in doctrine; pinning
   names/shapes for a non-member is creeping admission and would re-create the
   docs-drift failure mode (blessing target-state ahead of implementation). The
   package is treated as design input the hub will review **at admission time**,
   with a conformance fixture, after implementation.
3. Falsifiable next steps recorded for warpline: server survivability with a real
   MCP client; real-loomweave dogfood lane (no injected client); executed
   real-repo parity benchmark with `NO_SNAPSHOT` dropped from the parity
   predicate; C-1 nested `.gitignore`.
4. Hub snapshot `members/warpline.md` corrected (was stale in *both* directions).

## Reversal trigger

Warpline re-presents with the four falsifiable steps done and a parity benchmark
an independent session can re-run. The endorsement-mechanism question reopens
only if the owner creates one (that is an owner-level doctrine change).
