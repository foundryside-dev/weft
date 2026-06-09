# PDR-0012 — The Rust analyzer line is OUT of the launch envelope; ADR-049 is declared out-of-freeze

Date: 2026-06-10   Status: accepted   Author: claude-pm   Owner sign-off: yes ("yes please go ahead" to the 2026-06-10 resume-brief recommendations)
Supersedes: —   Related: PDR-0011 (gold-standard gate), pm/2026-06-10-in-flight-state-of-the-federation.md §3, weft-9823a04785 (Rust-line epic), weft-dfeb20c4fa (ADR-049 freeze posture, child of oracle umbrella weft-1e053eac02)

## Context
The 2026-06-10 in-flight deep-dive surfaced a major two-member line of effort with zero hub-board
representation: a full second-language (Rust) analyzer spanning wardline (`feat/rust-plugin`,
WP1–WP7, RustAnalyzer + `--lang rust`) and loomweave (`feat/rust-plugin-spec`, Rust qualname
dialect Phase 1a/1b/2, calls-edge MVP), coordinated via a shared ADR-049 dialect + conformance
corpus. The coordinated clean-break launch (PDR-0011) freezes cross-member contracts — and the
ADR-049 dialect IS a cross-member contract (loomweave ↔ wardline) — so launch scope had to be
decided before the freeze-set definition lands.

## The call
1. **The Rust analyzer is OUT of the launch envelope.** The launch ships the four-Python-member
   suite. Rust lands post-launch as a versioned feature adopted by both members together.
2. **ADR-049 is explicitly declared OUT-of-freeze** — the conformance oracle's freeze-set
   definition must enumerate it as out-of-freeze, versioned with the Rust feature
   (`weft-dfeb20c4fa`, filed as a child of the oracle umbrella so "what is frozen" and "what is
   explicitly not" are defined in the same artifact). Without the declaration, post-launch dialect
   evolution would be ambiguous against the clean-break rule.
3. **The Rust line gets board representation now** — hub epic `weft-9823a04785` (coordination
   only; member counterparts filed when the line is formally dispatched post-launch).

## Rationale
Pulling Rust into the launch would couple the largest unscheduled risk (the four-repo lockstep
cutover, ~252 unmerged commits) to a feature line that is still amending its own dialect
(amendment 3 landed this week). Excluding it costs nothing — both worktrees keep building — while
the explicit out-of-freeze declaration preserves the clean break's meaning: "frozen" stays a
checkable enumeration, not a vibe.

## Reversal trigger
- If the Rust line reaches conformance-corpus-green on both members *before* the launch cutover is
  scheduled, re-evaluate inclusion (it would then ride the same cutover rather than a second one).
- If the freeze-set declaration proves contentious in oracle review (i.e. launch artifacts turn out
  to embed dialect assumptions), escalate to the owner — that would make ADR-049 launch-gating.
