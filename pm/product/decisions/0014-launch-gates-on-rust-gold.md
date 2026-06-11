# PDR-0014 — Launch gates on Rust gold (PDR-0012 reversal trigger fired)

Date: 2026-06-11
Status: ACCEPTED (owner ruling, explicit — AskUserQuestion 2026-06-11)
Supersedes: the launch-envelope call in PDR-0012 (the ADR-049 out-of-freeze posture in
PDR-0012 / `weft-dfeb20c4fa` STANDS unchanged).

## Context

PDR-0012 (2026-06-10) put the Rust analyzer line OUT of the launch envelope, with the
recorded reversal trigger: *"corpus-green before cutover ⇒ re-evaluate inclusion."*

In the ~24h after that checkpoint, an unplanned frontier-model sprint (primarily Claude
Fable 5 — owner describes it as an Anthropic Mythos variant with cybersecurity/biological
guardrails — with Claude Opus 4.8 1M-context in support; owner-sanctioned opportunistic
deviation) drove the Rust line to near-completion and **merged it into the launch release
branches**:

- wardline: `feat/rust-gold` → rc5 (`5016cf37`) — full ADR-049 producer surface, RS-WL-*
  identity graduated to baseline-eligible, wlfp2 move-stable fingerprints, 35-row vendored
  corpus byte-pinned upstream. Corpus-green.
- loomweave: Sprint 3 (scale QA) + Sprint 4 (gold closeout) → rc4 (`b0bb578`, `92ebf64`),
  ADR-049 Amendments 4/5/9. Sprint-4 QA verdict: **NOT GOLD** — 27 residual SEI collisions
  across 4 families (`docs/implementation/qa/2026-06-11-rust-plugin-gold-qa.md`).

The trigger fired: the work is corpus-green on the wardline side and physically entangled
with the branches the clean-break cutover will merge. "Out of the envelope" stopped being
a paper decision and became a branch-surgery proposal.

## Options put to the owner

1. Ships not-gold, named as known limitation (PM recommendation).
2. **Gate launch on Rust gold** — collision families join the launch gate.
3. Carve Rust out of rc5/rc4 before cutover.

## The call (owner)

**Option 2 — the launch cutover gates on the Rust line reaching gold.** Consistent with
PDR-0011 ("do it right" — own-use tooling, no client deadline): a launch that freezes the
cross-member API should not ship a flagship line under a written not-gold verdict.

Enacted as hub gate ticket `weft-7ee9bccbd7` (P1, blocks `weft-4b2f948f70` launch cutover;
child of Rust epic `weft-9823a04785`). Done-means: 4 clarion collision-family tickets
closed (`clarion-8ff7f233fa`, `clarion-fa8bcf8731`, `clarion-bdb1eccf48`,
`clarion-83870dc534` — the last likely already closed by Amendment 9 `f7f8a69`, verify),
qualname_check oracle 0 across pinned corpora, gold verdict re-issued, ADR-049 amendments
in wardline lockstep.

Scope note: this gates the **cutover** (`weft-4b2f948f70`), not the dogfood-#2 gate
(`weft-cd62a4da9b`), which stays contract-correctness-scoped per PDR-0011.

## Reversal trigger

If the residual families prove deep (an ADR-049 *design* limit rather than fix-shaped —
e.g. anonymous-item identity is unsolvable without a dialect break) OR the gold tail
exceeds the patience of the rest of the gate (everything else green and waiting on Rust
alone), re-open the envelope question with the owner: ship-dark-versioned (option 1)
becomes the fallback, not silent slippage of the gate.
