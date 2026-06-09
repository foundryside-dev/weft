# Annex — How We Got Here

**STATUS: ADOPTED — companion to the signed-off proposal (owner sign-off 2026-06-09, PDR-0008).** This is the journey behind
`pm/2026-06-09-agent-continuity-write-safety-PROPOSAL.md`. The work was exploratory; the
*path* matters, so nothing is dropped here. This annex preserves the original concept, the
discovery method and its findings, the operator inputs, the full PDR arc with its reversals, and
a consolidated record of everything rejected and why.

Navigational cross-references (read alongside this annex):

- Concept capture: `pm/2026-06-09-agent-personality-identity-management-concept.md`
- Discovery study: `pm/2026-06-09-agent-identity-discovery-interviews.md`
- Crypto identity authority ("Tabard"): `pm/2026-06-06-agent-identity-component-plan.md`
- Decision records: `pm/product/decisions/0001…0007`
- Live state: `pm/product/roadmap.md`, `pm/product/metrics.md`, `pm/product/current-state.md`

---

## 1. The original concept — where it started

The thread began as a request to add an agent-identifier convention to a CLAUDE.md and walked,
by stages, into a coherent future shape. The capture (concept doc, Parts A–G) records it before
adjudication. **None of §1's shape survived into the bet** — it is the starting position the
evidence moved off of — but it is the origin of every later idea, so it is preserved in full.

### The three original ideas (as posed)

1. **File-level exclusivity leases** — an agent "tags out" the files it wants for a ~5-minute block, then renews.
2. **Unique identifier per startup** — a fresh unique id each time an agent spins up.
3. **Role assignment** — the "maybe we're doing this wrong" reframe: spin agents up and *assign them into roles* ("you're claude-jim; here's claude-jim's last logs; here's what's next").

### The keystone addition — the personality menu

4. **An identity-management system / menu of personalities.** A system like filigree holds a curated **menu of "personalities"** an agent adopts on startup; a personality confers an **identifier, a scope/lane, and areas of focus**, plus **continuity** (its last session log and "what's next"). Scope was to be **advisory** — a deconfliction hint, never a lock — on the rationale that "as agents get more capable we want to move from hard barriers to negotiate-and-deconflict." Collision-avoidance would be a property of how the lanes were carved (partitioning), not a runtime mutex.

This was framed as **the keystone** — the object that held the other three together. The emerging
three-tier shape was: **Registry** (a curated menu of seats with advisory scope + focus) →
**Adoption** (verified identifier + per-run session id) → **Continuity** (a resume brief from
the last session log).

### The forks the brainstorm posed (C1 / C2 / C3)

The brainstorm used explicit multiple-choice forks, recorded for fidelity:

- **C1 — "What's the real concurrency shape?"** Options: (a) mostly serial, rare parallel; (b) parallel, different tickets, shared files; (c) standing fleet of named roles; (d) not sure — explore. **Answer: (d).** The concurrency model was left open — and flagged as the thing a spike must pin down, because it decides whether the lease/announcement layer is needed at all.
- **C2 — "Is a personality's scope ADVISORY or ENFORCED?"** Options: (a) advisory hint; (b) enforced hard boundary; (c) advisory-now/enforceable-later. **Answer: (a) advisory**, with the explicit "negotiate-and-deconflict north star" rationale. *This answer was later reversed on evidence — see §4, PDR-0003.*
- **C3 — "Given 3.0.0 is mid-cut, what do you want to do with this direction?"** Options: epic+park / keep designing / registry-call-only / park. **Not answered** — the owner interrupted to request the capture document instead. The disposition was left open, which is what PDR-0002 then resolved.

### Open tensions the concept itself flagged (all later dissolved or moot)

The concept's Part D listed the "real work" as five unresolved tensions: where the registry
lives (the architecturally-loaded one); who curates the menu (human vs agent-minted); the unit
of scope (loomweave subsystems vs labels vs file globs); the negotiation medium; and the
concurrency model (C1). **Most of these became moot** once the persona/registry framing was
dropped (§4): with everything path-keyed, there is no seat-registry to locate (the D1 question
is moot), no menu to curate, and no declared lane to negotiate over. C1 survived — reborn as the
instrumentation question the spike must answer.

---

## 2. The discovery method — and its neutrality controls

The owner made the methodologically decisive move: *"I'm not actually an agent; what I think is
useful isn't."* The primary user of an agent-identity layer is a coding agent, so the owner
commissioned **agent user-research** — a neutral panel — rather than trusting his own intuition.

### Neutrality controls (why the findings are credible)

Each interviewee was a fresh `claude -p` instance, **not** an in-harness subagent, specifically
to strip contamination:

- **Neutral cwd** (`/tmp/panel`, no `CLAUDE.md` / `.claude/`), `--setting-sources ''` (no project/user settings, no SessionStart hooks → no superpowers/filigree injection), `--strict-mcp-config` + no MCP (no filigree tools), `--allowedTools ''`.
- **`--system-prompt-file`** = a neutral, representative fresh-booting coding/ops agent; the product framing lived entirely in the question prompt, described **neutrally, not as a pitch**, with explicit licence to say "I wouldn't use this."
- **Anti-sycophancy protocol:** a grep test ("what would you route to grep/git instead?"), an adversarial "what makes you bypass or resent this?", and a forced verdict block. The three scenarios (cold-resume / parallel-collision / standing-fleet) doubled as a probe of the open C1 concurrency question.

### The methodological discipline worth highlighting

The owner refused to let his own compelling arguments through unchallenged. He sent **three
things** back to fresh panels to find their flaws: the original persona idea (Round 1), **his own
counter-framing** (Round 2, explicitly tasked with finding where *the operator* is wrong), and
the polished two-mechanism design (Round 3, presented cold as if it were someone else's v1). This
anti-capitulation discipline is why the reversals below are trustworthy rather than rationalised.

### Stated threats to validity

The study is **self-report, not observed behaviour.** Agents predict their own workflow
imperfectly and **cannot perceive concurrent agents**, so any claim about collision frequency is
suspect. The study was treated as a strong **kill/keep** signal on *what to build first*, not as
proof — and the one non-self-report data point (the observed Seed case) was weighted higher.

---

## 3. The three rounds — findings, the keystone inversion, and the redesign

### Round 1 — blind interviews (n=6: 3 opus, 3 sonnet, across 3 scenarios)

Every interviewee independently re-derived the same keystone, and it was **not** the one the
concept proposed.

- **Keystone = the resume brief (idea #3), but ONLY git-reconciled / provenance-stamped (6/6).** A brief that replays the agent's own prose is *worse than nothing*: "a confident stale handover spends my trust then makes me re-verify anyway — I pay twice." The value is the **anchor** ("written against HEAD `abc123`"), not the assertion.
- **The per-run session id (idea #2) is substrate, not product (6/6)** — valuable only as the write-side carrier of the stamped handover.
- **The personality *flavor* ("jim") is noise (6/6)** — "cosmetic / decoration / ceremony." Drop it.
- **Advisory scope/lane (idea #4-as-lane) is noise (6/6)** — derivable from the ticket; "advisory means I override it"; and an active **anti-feature** (risks making an agent defer on a legitimate cross-cutting fix — "not my lane").
- **The announcement board (idea #5) is noise without liveness** — only the collision scenario lifted it, and only *with a heartbeat/TTL*; the write-side is the killer ("I can't predict my own duration and I'll forget to clear it" → a stale board makes agents "wait for a ghost").
- **Provenance + liveness are LOAD-BEARING, not polish (6/6)** — one wrong-but-confident brief and agents distrust the whole layer permanently. **Freshness is the product, not a feature of it.**

**The keystone inversion:** the owner's headline (the personality menu) was demoted to "a thin
label on the handover," and the thing the concept treated as a supporting tier (the resume brief)
became the centre.

#### A within-source dead-end worth recording: the per-area "rehabilitation"

Round 1's post-panel disambiguation split idea "#1" into three things and, in doing so,
**briefly rehabilitated standing per-area identity** (`claude-filigree-3` = test suite vs
`filigree-1` = primary bug-fixer) as "the addressable hook the keystone handover hangs on" and
"the partition that makes lanes non-overlap by construction." **This rehabilitation did not
survive.** Round 2 refuted it directly (per-area identity induces cross-cutting deference), and
PDR-0006 settled the addressable hook at the *line-of-effort* altitude instead. The per-area seat
is recorded here as an explored-and-rejected branch — it is **not** in the bet.

(The Round 1 disambiguation also flagged a genuinely *untested* axis: a **functional role /
operating mode** — bug-fixer / tester / architect — which resembles a system-prompt / output-style
persona far more than a filigree registry. The panel was never asked about it. It is an open
candidate for a separate, cheaper follow-up probe, **not** part of this bet.)

### Round 2 — the rebuttal panel (n=4: 2 opus, 2 sonnet)

The operator's counter-framing (his quantified ESC rate; "persona = continuity container") was
put **back** to a fresh panel explicitly tasked with finding where *the operator* was wrong. The
panel conceded the problem and refused the forms:

- **Operator WON the problem.** "Rare" was observation bias; the human is the invisible backstop; a sub-weekly, diligence-surviving ESC rate is a real *structural* residual. (One opus sharpened it: the operator measures his *intervention* rate — an upper bound that overcounts and includes false kills — not the counterfactual *rollback* rate.)
- **Operator LOST the forms — two blind spots, found independently:**
  1. **Advisory lanes/board would not have caught a single ESC event** — the stomping agent does not *perceive* it is stomping, and agents override advisories. The ESC reflex works *because it is a hard, non-negotiable kill.* His own evidence argues *for* a hard mechanical guard and *against* advisory deconfliction.
  2. **Standing per-area identity induces wrong deference on cross-cutting work** — a bug spanning tests + core forces the "test seat" to defer, or the partition is fiction; the domain map goes stale faster than the identity map. The addressable owner the handover needs is a **path/area key, not a persona.** "Persona = continuity container" mostly *renames* the handover.
- **Mechanism convergence:** the stomp is caught by **pre-write compare-and-swap** (read-sha vs write-sha, abort on change) — identity-free, registry-free, firing at the moment of harm. Advisory and handover both miss it (wrong timing / wrong problem).

### Round 3 — the first-principles panel (n=2: 1 opus, 1 sonnet — thinner; A-vs-B sequence treated as SOFT)

The *polished two-mechanism design* was presented cold as a v1 (no mention of prior rounds) to
test generative engagement. The panel validated the split and sharpened it:

- **Severity asymmetry (load-bearing):** P2 (stomp) is a correctness **bug** → the guard must be near-flawless or it gets routed around; P1 (staleness) is a **cost** → the handover only has to beat re-deriving (low bar, low ceiling). *"If I ship one, ship the guard."*
- **Mechanism A — cut the inference.** Keep path-key + sha-stamp + the irreplaceable payload (**intent + verification-status**) + a raw `git diff <sha>..HEAD`. Cut the "your claim may be stale" semantic inference — unfalsifiable → distrusted → re-derived → wasted. Add TTL/GC.
- **Mechanism B — keep hard-abort, but:** hunk-level (file-level cries wolf → gets disabled); **self-write suppression** (must fire on *another* actor's write, not own / formatter / lint — "can't be purely sha-based," the hard underspecified part); deliver the delta + an assisted 3-way reconcile on abort; **transaction-aware** (a 15-file refactor aborting on file 14 leaves a half-refactored repo — worse than the stomp).
- **Biggest blind spot:** B only guards the Edit/Write path — the *violent* stomps (`git reset --hard`, `npm install` rewriting a lockfile, codegen, migrations, `rm`) bypass it. Needs a tripwire on unexpected working-tree/HEAD movement.
- **The cut they'd un-cut:** a dead-simple identity-free **liveness/presence stamp** ("an actor is writing under tests/ since <sha>") for collision *avoidance* + abort-storm de-escalation. The board reborn as *presence*, not advisory-ownership. (v2 at the time; later promoted — see §4, PDR-0007.)

### The decisive methodological finding — C1 cannot be answered by asking agents

The concurrency reads split (mostly-serial ×4, can't-tell ×1, parallel-shared-files ×1), **but
all six flagged the same caveat: they cannot perceive concurrent agents, so "collisions are rare"
may be pure observation bias.** The collision that *is* observed is temporal (past-me vs present-me)
and merge-time ("we both wrote incompatible things and nobody knew"), not real-time same-file
races. **Therefore C1 must be answered by INSTRUMENTATION** (mining filigree event logs / `git`
for overlapping-write and redundant-work signatures), not another interview. This is the single
most important input to the spike.

---

## 4. Operator inputs — the data agents structurally could not provide

Three observed cases (weighted above self-report) and the value reframe came from the operator.

### The Seed — the one observed cold-resume case (the `f983ebd` lesson)

During the 3.0.0 go/no-go, an in-harness agent's memory said the dogfood-3 work was "UNCOMMITTED
on release/3.0.0 pending review"; `git` said clean — already committed (`f983ebd`). It had to
flag *"the prior UNCOMMITTED risk is STALE/resolved,"* caught only by brute-force re-deriving
against `git`. Its own framing: the failure is **a reconciliation gap with no provenance** —
memory records *outcomes*, not which session produced them; two truth-sources, nothing
reconciles them. The fix it named is **a small, authoritative, reconciled delta with provenance**
that *feeds* the memory system instead of competing with it — and it noted the bones already
exist in filigree (`checkpoint_session` / `get_session_changes` + `reconciliation_debt_list`).
**Every one of the six blind interviews independently re-derived this.** This is mechanism A.

### The operator's correction — "rare" is human-supplied, not structural

The operator corrected the panel's "collisions are rare" read from the vantage agents lack:
*"collisions are rare is only as true as the skill and level of intoxication of your operator …
that's one sloppy command away from a mandatory rollback,"* and concretely, *"I've slammed escape
to stop an agent I accidentally kicked off that was stomping over another change."* The
deconfliction mechanism today **is the operator** — manually serialising work and killing a
stomping agent by reflex, invisibly upstream of the agents, who therefore read "mostly-serial"
*because* a skilled human is absorbing the collision risk.

**Quantified ESC rate:** the "oh-shit-escape" event runs **~every 2–3 days when the operator is
impaired, ~weekly when sober and diligent, and never zero** — sub-weekly at best, with a
*structural* residual that survives diligence.

### The live third case — and the value reframe

While the analysis was running, a stomp happened in real time: the operator, "being sloppy,"
told an agent to *"fix all the bugs,"* and that broad unscoped directive led it to **roll into a
git worktree where another agent was mid-implementation and start 'fixing' the other's
uncommitted work.** The failure shape: a **broad unscoped directive** crossing a **worktree
boundary** into another agent's *live, uncommitted* work. Crucially this is a **territory
violation, not a TOCTOU file-race** — a per-file pre-write CAS (B) catches it only if the other
agent happens to write in the read→write window; the cleaner guard for *this* flavour is
presence/avoidance (C) + scope discipline. This **nudged C up from pure-v2** and flagged
**worktree-scope** as an explicit input to the B spike. (n=1 — not re-decided on one anecdote, but
it is exactly the event the bet exists to kill.)

Immediately after, the operator **assessed and recovered the stomp as near-trivial** — "this
would have been near-catastrophic six months ago but is near-trivial now." That reframed *why* the
bet matters (see PDR-0004): the value is **delegation leverage / supervision-load reduction**, not
catastrophe insurance. Cheap recovery still requires the human to be *watching* to trigger it, and
that watching is the scaling ceiling.

### The metaphor's evolution: desk → daily hire → pool/whiteboard

The mental model crystallised across the session: a **desk** (a line of effort, with a nameplate
and a handover drawer) staffed by **daily hires** (one-day agent sessions, never rehired) who
read the *dated* handover folder rather than reconstruct everything → and then a second,
orthogonal axis, the **pool** of interchangeable hires sharing a **whiteboard** (the path-keyed
handover generalised — a desk is a pool of one). This is the picture the proposal carries; its
PDR provenance is PDR-0006 (desk/line-of-effort) and PDR-0007 (pool/whiteboard).

---

## 5. The PDR arc — 0001 → 0007, with its reversals

The decision trail is the heart of "how we got here." Two reversals matter most: the **form
reversal** (PDR-0002 → 0003) and the **persona round-trip** (dropped in 0003, re-admitted at a
different altitude in 0006). Read the PDRs themselves (`pm/product/decisions/`) for full text.

| PDR | Disposition | Relationship |
|---|---|---|
| **0001** | Bootstrap the suite-scoped product workspace from observed state. | Foundational. |
| **0002** | Promote "agent session continuity & the **personality/identity layer**" to top of *Next*; keyed on a personality/seat registry, **advisory scope (C2)**, and a *consumer*-relationship to Tabard. | **Superseded by 0003 (form only).** |
| **0003** | **Discovery reshapes the bet:** two identity-free, path-keyed mechanisms (A handover + B write-guard). **Drops** personas, advisory lanes, and the Tabard dependency. **Reverses 0002's C2 "advisory, never enforced"** on evidence. | Supersedes 0002's *form*; the disposition "this IS the Next bet" holds. |
| **0004** | **Value reframe:** the payoff is **delegation leverage / supervision-load reduction**, not catastrophe insurance. Success metric reframed to supervision load; stomp-rate demoted to a proxy. Feature set + A-first sequencing unchanged. | Refines 0003's *why*. |
| **0005** | **Closes the P3 actor-identifier gap (A′):** mint a per-session run id (replaces free-text `--actor`); claims bind to a stable handle from spawn context. *Have-a-non-colliding-id* (here) vs *trust-the-id* (Tabard, Later). Folds into A; does not change B/C. | Adds the third problem the discovery panel never addressed. |
| **0006** | **Identity lives at the line-of-effort altitude.** Sharpens the persona anti-goal: identity is *legitimate* at the coarse line-of-effort altitude, an *anti-goal* at the within-role altitude. A′'s handle = line of effort, not a per-area seat. | Re-admits "identity" at a different altitude than 0003 dropped it. Resolves 0005's open "what is the handle." |
| **0007** | **The pool axis:** concurrent coordination is keyed on **activity, not identity**. Mechanism C promoted from vague-v2 to a specified, hook-fed, activity-keyed register. C composes with B (anticipate + catch). | Extends the model along the concurrency axis; settles where the "subrole" urge belonged. |

### Reversal #1 — the form reversal (0002 → 0003)

PDR-0002 made personas the centrepiece, scope advisory, and Tabard a dependency. The discovery
evidence (the three rounds + the operator data) **refuted all three forms** while *confirming the
disposition* — this is still the *Next* bet. PDR-0003 therefore supersedes 0002's **form** but
not its **placement**. The most consequential single line: **C2's "advisory, never enforced" was
reversed** — the panel showed advisory deconfliction cannot catch a stomp the offending agent
does not perceive and would override, so the guard (B) must be *hard and mechanical*. Note this is
**not** an access-control move: B is identity-free optimistic concurrency (CAS on a sha), which is
deconfliction done mechanically and stays inside deconfliction-first doctrine.

### Reversal #2 — the persona round-trip (dropped in 0003, re-admitted at altitude in 0006)

PDR-0003 dropped personas. PDR-0006 then **re-admitted "identity" — but at a different altitude.**
This is not a contradiction; it is a sharpening. The original persona anti-goal (commit `68cc876`)
was *too broad* — it would have forbidden the legitimate, real line-of-effort identities the
program actually runs on (PM / program-mgmt / web-dev are distinct, separable lanes). PDR-0006
split by altitude: identity is **legitimate at the line-of-effort altitude** (coarse, separable,
the operator's deconfliction mnemonic, A′'s stable handle) and an **anti-goal at the within-role
altitude** (manufactured character among functionally-identical agents). PDR-0007 then went one
step further on the *pool* axis: among fungible concurrent peers, identity *itself* is a
non-signal — coordinate on activity. So the arc is: **persona-as-character dropped → identity
re-admitted only at the coarse line-of-effort altitude → identity demoted to a non-signal at the
fine/pool altitude.** The recurring "subrole" urge kept being wrong because it reached for
*identity* to solve a *coordination* problem that is really about *activity*.

---

## 6. What we rejected, and why (nothing lost)

A consolidated catalogue so no explored option disappears. Each was genuinely considered; each is
**not** in the bet.

| Rejected option | Where it lived | Why rejected | Disposition |
|---|---|---|---|
| **Personality flavor ("jim") / character** | Concept idea #4; PDR-0002 keystone | Cosmetic (6/6 panel); manufactures a reliability fiction → vision anti-goal. | **Dropped** (PDR-0003). |
| **Advisory scope / declared lanes / ownership** | Concept idea #4-as-lane; C2 answer (a) | Would not have caught a single ESC event — the stomping agent doesn't perceive it stomps and overrides advisories; also an anti-feature (defer-on-cross-cutting). | **Dropped; C2 reversed** (PDR-0003). |
| **Standing per-area seats** (`claude-filigree-3` = tests) | Concept; Round-1 "rehabilitation" | Induces cross-cutting deference; the domain map goes stale faster than the identity map; real fixes span areas. | **Dropped**; the addressable hook moved to **line-of-effort** (PDR-0006). |
| **File-level exclusivity leases / runtime mutex** | Concept idea #1 | The observed collision is temporal/merge-time, not a real-time same-file race; the handover addresses it better; a lock is the wrong instrument. | **Demoted** (the announcement form), then **superseded** by B (mechanical) + C (activity register). |
| **Announcement board (voluntary)** | Concept idea #5 | Stale without liveness ("wait for a ghost"); the write-side is the killer — agents forget to clear it. | **Reborn as C**, but **hook-fed, never voluntary** (PDR-0007). |
| **Semantic-staleness inference in the handover** | Round-3 design input | Unfalsifiable → distrusted → re-derived → wasted; dumb-and-verifiable beats smart-and-unfalsifiable. | **Cut from A** (PDR-0003). |
| **File-level (not hunk-level) write guard** | Round-3 design input | Cries wolf → gets disabled. | **Rejected** in favour of hunk-level B. |
| **Tabard as a *dependency*** | Concept §6; PDR-0002 | The continuity/write-safety layer is identity-free; pulling in a crypto authority takes a needless doctrine §2/§6 amendment for a problem that doesn't need it. | **Decoupled.** Tabard stands alone on its merits as a *Later* "trust-the-id" layer (PDR-0005). |
| **Build the persona layer now toward a spec** | C3 option (b) | The riskiest assumption (concurrency shape, C1) was unmeasured; a spec now is speculation; mid-3.0.0-cut. | **Rejected** (PDR-0002). |
| **Park the bet entirely / drop it** | C3 option (d); PDR-0003 option 3 | The underlying problems (P1 staleness cost, P2 stomp bug, P3 attribution gap) are all real and evidence-backed. | **Rejected.** |
| **Status-quo free-text `--actor`** | PDR-0005 option 1 | Collides across concurrent agents ("everyone is `claude`"); the observed `ACTOR_MISMATCH` pain. | **Rejected** in favour of a minted run id (A′). |
| **Per-session minted id *only*** (no stable handle) | PDR-0005 option 2 | Breaks cross-session claim continuity — every run a stranger; the handover loses a stable address. | **Rejected** for the two-level handle + run-id split. |

### The Tabard layer — preserved, not killed

The crypto identity authority ("Tabard," `pm/2026-06-06-agent-identity-component-plan.md`) is the
**separable "trust the id" layer**: it answers "is this actor who the credential says it is?" via
agent-held Ed25519 keys certified once at enrollment and verified offline. It was a *dependency*
of the original concept; the discovery showed the continuity/write-safety layer is **identity-free**,
so Tabard is **decoupled** and **deferred to *Later*** — a `spike-then-decide` candidate on its own
merits, not a precondition of this bet. A′'s two layers map cleanly onto it: *have a non-colliding
id* is here and cheap; *trust the id is unforgeable* is Tabard's job, out of scope.

---

*Prepared 2026-06-09 by the Weft product-management line, companion to
`pm/2026-06-09-agent-continuity-write-safety-PROPOSAL.md` (owner sign-off 2026-06-09, PDR-0008). Nothing in the source decision
trail has been discarded; superseded forms are preserved here by design.*
