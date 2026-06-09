# PDR-0013 — Post-launch priority stack + the new-tool discovery pipeline (agentic-first bar)

Date: 2026-06-10   Status: accepted   Author: claude-pm   Owner sign-off: yes ("yes please go ahead" to the 2026-06-10 resume-brief recommendations)
Supersedes: — (extends PDR-0003/0004/0008)   Related: weft-e4589e6570 (Heddle spike), weft-61c24f622e (propagation-ledger spike), weft-6636667996 (scoreboard), weft-ff30fd979f (close-the-loop), weft-df29917f29/clarion-2c959a059e (quarantine forensics), pm/2026-06-09-cross-project-ticket-coordination-concept.md

## Context
Owner asked for the federation evaluation, the post-1.0 priorities, and the new-tool pipeline,
explicitly framed by "agentic as first class, not coding tools with agentic support." The
evaluation (2026-06-10 resume brief) found: thesis proven, contracts sound-as-designs, and the
chronic weakness is the connective tissue — conformance (being fixed, gates launch),
self-observability (G5, Wave 0), and work-state hygiene (board stale in the done direction three
times in one week; Rust line board-invisible; source-fixed ≠ live-fixed bit for the third time).

## The call

**Post-launch priority stack (ordered; 1–3 make the existing loop honest and outrank new tools):**
1. **Build A → A′ → B** (continuity & write-safety, already signed off PDR-0008). B's design spike
   consumes the rogue-agent quarantine forensics (`weft-df29917f29` / `clarion-2c959a059e` — mine
   before disposition).
2. **Instrument the scoreboard** (`weft-6636667996`): dogfood pass rate lands *during* dogfood #2;
   stomp tally + time-to-orient baselines land before A/B ship so acceptance is measurable. A
   signed-off bet with no instrument can be neither accepted nor killed.
3. **Mechanize close-the-loop** (`weft-ff30fd979f`): hook-fed work-state advance on ship/merge
   events — the stale board is a product gap in filigree's own domain, not a process failure.
   Scope decision (fold into A vs stand alone) is deferred to A's scoping; do not build twice.
4. **Cross-project ticket coordination: promoted from the bench to Next** (intent). Evidence
   strengthened: the counterpart convention is sustained by hand (19/27 manually) and the Rust line
   proved real work spans members invisibly. Federated variant only (doctrine §6).

**New-tool discovery pipeline (ranked, spike-then-decide; admission stays owner-reserved §7):**
1. **Heddle** (`weft-e4589e6570`) — next discovery slot. "If I touch X, what breaks?" is every
   agent's every-session question, currently answered by grep-plus-hope or human blast-radius
   review (= supervision load, PDR-0004). Read-side complement to B's write guard.
2. **Propagation/live-state ledger** (`weft-61c24f622e`, NEW) — "what is actually built/installed/
   live where." Three independent bites of source-fixed ≠ live-fixed. Default hypothesis: a LEGIS
   feature, not a new member.
3. **Tabard** — stays Later; matters only when cross-host federation makes "trust the id" real.
4. **Shuttle** — stays Later with a standing doctrine flag: change-execution sits closest to the
   central-orchestrator anti-goal; when shaped, the burden of proof is on showing it is
   deconfliction substrate, not a controlling runtime.

**The agentic-first admission bar (standing discipline for any new tool/member):**
(a) evidence from dogfood pain, not roadmapping; (b) the grep test — agents *prefer* it unprompted
over the raw alternative, measured; (c) enrich-only composition; (d) doctrine fit (§6/§7);
(e) hook-fed over discipline-fed — anything depending on agents remembering to do it will rot
(the PDR-0009 principle, generalized). The federation's best discovery engine is its own dogfood;
keep that loop instrumented and cheap, and let it nominate the next member.

## Rationale
Every validated gap to date (continuity, write-safety, propagation, cross-project visibility) came
from watching agents actually use the suite. The stack therefore funds the evidence loop first
(instruments + close-the-loop), builds the already-validated bet (A/B), and runs cheap spikes on
the two highest-leverage candidate authorities rather than committing to either.

## Reversal trigger
- If the Heddle spike returns no-go AND the propagation spike returns "legis feature," the
  new-member pipeline empties — that is fine; do not manufacture a member to fill it.
- If post-launch dogfood shows supervision load is NOT dominated by orientation/collision (i.e.
  A/B ship and the operator still can't fire-and-forget), re-open the value model (PDR-0004)
  before funding more mechanisms.
- If close-the-loop mechanization (item 3) hasn't found a home by the time A's scoping completes,
  it becomes its own shaped bet rather than silently dying in A's backlog.
