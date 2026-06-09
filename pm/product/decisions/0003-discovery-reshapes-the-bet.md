# PDR-0003 — Discovery reshapes the Next bet: handover + write-guard, not a personality layer

Date: 2026-06-09   Status: accepted   Author: claude-filigree (PM)   Owner sign-off: yes (owner: "I'll let you decide the way forward — feature set, prioritisation, and whether this is a new product or a modified one")
Supersedes: PDR-0002 (shape only — the disposition "this is the Next bet" holds; the *form* changes)
Related: pm/2026-06-09-agent-identity-discovery-interviews.md, pm/2026-06-09-agent-personality-identity-management-concept.md, roadmap.md (Next), metrics.md, filigree-c2009921cf, filigree-6549e739de

## Context
PDR-0002 promoted an "agent session continuity & personality/identity layer" to the top of Next,
keyed on a personality/seat registry, advisory scope, and a *consumer*-relationship to the future
Tabard crypto-identity authority. The owner — rightly noting "I'm not an agent; what I think is useful
isn't" — commissioned **agent user-research**: a neutral panel (fresh `claude -p`, no project context),
run as three rounds — blind interviews, an anti-capitulation rebuttal of the owner's counter-framing,
and a first-principles re-design (10 interviews, 3 rounds, + 2 *observed* operator cases incl. the
`f983ebd` stale-memory event and a quantified ESC-stomp rate). The evidence reshapes the bet enough to
supersede 0002's form.

## Options considered
1. **Ship the bet as PDR-0002 framed it** (personality/seat registry + advisory lanes, consuming Tabard) — pro: matches the owner's first intuition; con: **refuted by the users** — persona is cosmetic, advisory lanes wouldn't catch the very event that matters, and it needlessly takes a doctrine-§2/§6 (Tabard) dependency.
2. **Two identity-free, path-keyed mechanisms** (reconciled handover + pre-write CAS guard), persona/lanes/Tabard dropped — pro: what the panel converged on across all three rounds and what the operator's lived data supports; con: the load-bearing half (the guard) is harder and may live outside weft.
3. **Drop the bet** — rejected; the underlying problems (P1 staleness cost; P2 live-stomp correctness bug) are both real and evidence-backed.

## The call
**Option 2.** The Next bet is **"agent continuity & write-safety"** — two orthogonal, **identity-free,
path-keyed** mechanisms. **Drop** behavioural personas, advisory lanes/ownership, and the Tabard
dependency. Reverse PDR-0002's C2 "advisory, never enforced" leaning *on evidence* (see Doctrine).

**Feature set**
- **A — Reconciled handover (the cheap half).** A `git`-sha-stamped, **path/area-keyed** session delta
  carrying **intent + verification-status** (what git can't show) + a raw `git diff <sha>..HEAD`, with a
  TTL/GC. **No semantic-staleness inference** (unfalsifiable → distrusted → wasted). A **filigree
  feature**, built on its existing session/run object + `get_session_changes` + `reconciliation_debt_list`.
- **B — Pre-write compare-and-swap guard (the half that matters).** Hard-abort a write if the target
  moved (another actor wrote it) since read; **hunk-level**, **self-write-suppressed**, abort delivers the
  delta + an assisted 3-way reconcile, **transaction-aware** for multi-file ops, plus a tripwire on
  unexpected working-tree/HEAD movement (to catch `git reset`/install/codegen stomps that bypass the
  Write path). Lives at the **Edit/Write tool layer** → likely a **Claude Code / harness / git-hook**
  feature, *outside* the weft suite.
- **C — Liveness/presence stamp (v2).** Identity-free "an actor is writing under <path> since <sha>" for
  collision *avoidance* + abort-storm de-escalation. Build only if B's livelock actually appears.

**Prioritisation — decided on purpose (cost ≠ importance).**
- **A ships first because it is nearly free** (a convention + a thin filigree feature, no spike) — *not*
  because it is the keystone. It attacks the universal daily cost + the observed `f983ebd` gap, additively
  and at low risk.
- **B is the bet that matters** (the correctness bug; the operator's actual multiple-times-a-week pain).
  It gets a **design spike NOW, in parallel** — *not* deferred to "v1.5 someday." The spike resolves the
  genuinely hard, underspecified parts: self-write suppression, hunk vs file granularity, transaction
  semantics, and the non-Write-path tripwire. **B builds after the spike clears**; a naive B that
  false-fires gets disabled and is worse than nothing (same failure mode as a stale brief).
- **Sequencing vs launch:** the **Now bet (dogfood/launch) keeps priority for *build* capacity.** B's
  spike is design/instrumentation, not build, so it runs in parallel without pulling launch engineering;
  if it ever does, it yields. A can slot in opportunistically. (The A-vs-B *build* order is left SOFT —
  round 3 was n=2 — and the spike confirms it.)

**Product-vs-feature.** **Not a new product, not a new member, not the personality registry, not
Tabard-dependent.** It is: **A = a modification of filigree** (a feature on existing surfaces); **B = a
Claude Code harness / tool-layer feature**, which weft likely should not build itself. **ESCALATION
FLAGGED:** filing B as an upstream Claude Code feature request is outward-facing / touches an external
party → per the vision grant, **the owner makes that call**; I will draft it, not file it.

## Rationale
Three rounds converged: persona is cosmetic; advisory deconfliction cannot catch a stomp the offending
agent doesn't perceive and would override (so the operator's own ESC evidence argues for a *hard,
mechanical* guard); and the addressable owner the handover needs is a path key, not a persona (which also
avoids the cross-cutting-deference anti-feature). The severity asymmetry (B = correctness bug, A = cost)
sets the resourcing: ship the cheap thing because it's cheap, and *spike the important thing now* so it
doesn't quietly slip behind the easy one.

**Doctrine reconciliation.** B is **identity-free optimistic concurrency** (CAS on a sha — no principals,
no permissions, no lanes). That is deconfliction done *mechanically* rather than *by advice* — it stays
inside "deconfliction-first, not access-control," and is **not** an escalation-triggering access-control
move. PDR-0002's C2 "advisory, never enforced" leaning is reversed here on the panel evidence that advice
cannot catch the event that matters.

## Reversal trigger
- **Kill/keep on the operator metric (metrics.md):** stomp interventions BASELINE ~1/wk (sober) → TARGET
  **0**. If, after B ships, interventions don't fall toward 0, B is mis-designed — reopen the spike.
- If **A is shipped and agents still re-derive from `git` instead of reading it** (no behaviour change),
  A's payload is wrong — strip further or kill A (it was only ever justified by being nearly free).
- If the **B design spike** finds the self-write-suppression / transaction problem has no tractable
  identity-free solution, **do not ship B**; fall back to C (presence-for-avoidance) + escalate the
  harness-feature question.
- If the owner **declines the Claude Code feature-request escalation**, B has no home in weft → the bet
  shrinks to A only, and B becomes a documented upstream ask.
