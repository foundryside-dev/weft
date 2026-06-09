# PDR-0009 — B (write-guard) is built in-house as Claude Code hooks, not an upstream feature

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes (owner directed the implementation approach)
Supersedes: the B-home / escalation sub-decision of PDR-0003 (§Feature set, B) and the ★ escalation item of PDR-0008. The rest of both PDRs stands.
Related: pm/2026-06-09-claude-code-write-guard-feature-request-DRAFT.md (now repurposed), PDR-0007 (mechanism C), filigree-c2009921cf

## Context
PDR-0003/0008 concluded B "lives at the Claude Code harness layer, likely *outside* weft," and
reserved an owner escalation to file it as an upstream feature request. The owner corrected the
implementation approach: **B is buildable by us now, as a set of Claude Code hooks**, hosted in
filigree (or the continuity layer), with the decision logic routed to a cheap classifier. This
is demonstrably viable — the operator's own `git stash` block is a PreToolUse hook exiting
non-zero, which is exactly the intercept-and-block mechanism B needs.

## The call
**B is an in-house weft feature implemented via Claude Code hooks. The upstream escalation is
withdrawn — there is nothing to file.**

**Architecture.** Hooks are the sensors/actuators; filigree is the state store + decision:
- **Hooks (PreToolUse on Edit/Write and on Bash)** intercept tool events at the moment of action,
  can **block** a call (non-zero exit), and **emit** events. The Bash hook is what catches the
  non-Write-path stomps (`git reset --hard`, installs, codegen) — the spike's "biggest blind spot."
- **filigree** stores the last-read content hashes (per file, per actor, off the session/run object
  `filigree-c2009921cf`), runs the compare-and-swap, and hosts the activity register (C).

**The keep/forget classifier — the shared substrate.** Each intercepted event is classified
**keep vs forget** by a two-tier decision function:
- **Tier 1 — a preset whitelist** (fast, deterministic, the hot path): own writes, formatters,
  linters, reads, and operator-whitelisted commands → *forget* (don't log, don't block).
- **Tier 2 — a lightweight LLM** (only for the ambiguous middle): decides whether an event is a
  material foreign change → *keep*.
This single classifier resolves **two** things the spike flagged as hard at once:
- **B's self-write-suppression** ("must fire on *another* actor's write, not mine / formatters /
  lints — can't be purely sha-based"): *forget* = suppress; *keep* = a real foreign change to
  block/flag.
- **C/A's logging filter** ("what activity is worth recording"): *keep* enters the register/handover;
  *forget* is noise.

## Consequences
- **Product-vs-feature simplifies:** A/A′/B/C are now **all weft features.** No part of the bet
  depends on an external party. The "B outside weft" caveat is gone.
- **The ★ owner escalation (PDR-0008) is withdrawn** — no outward-facing action remains in the bet.
  The feature-request draft is **repurposed as the internal B design spec** (its Problem +
  Requirements are the build input).
- **B becomes buildable work, not a blocked-on-external item** — though the spike's hard questions
  remain (granularity, transaction semantics, worktree-scope, and now: classifier tiering + the
  whitelist's initial contents + where Tier-2 latency is acceptable).

## Rationale
Hooks are an existing, sufficient harness-integration surface we already use; routing the hard
classification to a whitelist-first / LLM-fallback function turns the spike's two underspecified
problems (self-write suppression, activity-filtering) into one tractable component. Building it
ourselves removes the only external dependency and the only reserved-gate action in the bet, and
keeps B on our timeline.

## Reversal trigger / open spike inputs
- **Latency:** a per-write Tier-2 LLM call adds edit latency — the whitelist (Tier 1) must carry the
  hot path; Tier 2 fires only on ambiguity. If Tier-1 can't cover most events cheaply, reconsider.
- **Distribution:** hooks live in Claude Code settings — so B ships as part of weft's install/setup
  (register the hooks). If that install burden proves unacceptable, revisit.
- **Classifier correctness:** a *forget* that should have been *keep* is a silent miss (a real stomp
  un-blocked); a *keep* that should have been *forget* is a false-fire (the wolf-crier B must avoid).
  The whitelist must be conservative; measure both error directions in the spike.
- If hooks turn out unable to reliably attribute *which actor* wrote (the core of suppression), fall
  back toward the upstream ask — but only then.
