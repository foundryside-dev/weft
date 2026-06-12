# PDR-0016 — Formal admission requires standalone parity AND federation enhancement

- **Date:** 2026-06-13
- **Status:** accepted (owner ruling, verbatim authority)
- **Driver:** owner, stated to both the hub PM session and the codex/heddle stream

## Context

Heddle reached "working prototype" and began proposing itself as a member
candidate. Doctrine §7 had four *structural* tests (is it a product?) but no
*quality* bar — nothing stopped a structurally-valid but mediocre tool from
arguing for admission.

## Options

1. Structural tests only (status quo) — admission quality left to per-case owner judgment with no recorded standard.
2. **Two-part quality bar (chosen)** — (a) *standalone parity*: equally good vs peers outside the federation, you'd reach for ours as readily as any alternative; (b) *federation enhancement*: membership gives it real capability it lacks standalone, so having the federation installed is itself a reason to pick it. Both conjunctive, judged on **shipped behaviour, not aspiration**.
3. Single-axis bar (just "best-of-breed") — rejected implicitly: a best-of-breed tool that gains nothing from siblings doesn't need admission, and a federation-only tool is an adapter (§7-2).

## Call

Option 2. Recorded in `doctrine.md` §7 "The quality bar for formal admission"
(commit `3c1bd28`) and persistent memory. Admission itself stays owner-reserved;
the bar is what any go/no-go assessment measures against.

First application same day: heddle — fails both halves (PDR-0017).

## Reversal trigger

Owner restatement only — this is the owner's own ruling on an owner-reserved
gate; the PM does not reopen it. If two consecutive admission assessments find
the conjunctive bar unmeasurable in practice (no falsifiable parity test could
be constructed), surface that to the owner as evidence the bar needs an
operationalisation amendment, not removal.
