# Discovery — Agent-identity layer: user interviews (the users are agents)

> **Product discovery, not a decision.** The primary user of the proposed
> agent-identity/personality layer is a *coding agent*, so the owner (correctly: "I'm
> not actually an agent; what I think is useful isn't") commissioned a panel of agent
> interviews. This is the discovery record feeding the Next bet (`pm/product/roadmap.md`)
> and PDR-0003. Companion: the concept (`2026-06-09-agent-personality-identity-management-concept.md`)
> and the C1/D1 spike brief (forthcoming).
>
> **Date:** 2026-06-09 · **n = 6** structured self-interviews (3 opus, 3 sonnet) across
> 3 scenarios, **+1 observed in-the-wild case** (see Seed).

## Method & neutrality controls
Each interviewee was a fresh `claude -p` instance — **not** an in-harness subagent —
specifically to strip contamination:
- **Neutral cwd** (`/tmp/panel`, no `CLAUDE.md`/`.claude/`), `--setting-sources ''`
  (no project/user settings, no SessionStart hooks → no superpowers/filigree injection),
  `--strict-mcp-config` + no MCP (no filigree tools), `--allowedTools ''`.
- **`--system-prompt-file`** = a neutral, representative persona (a fresh-booting
  coding/ops agent); the product framing lived entirely in the question prompt, described
  **neutrally, not as a pitch**, with explicit licence to say "I wouldn't use this."
- Anti-sycophancy protocol: a **grep test**, an adversarial "what makes you bypass/resent
  this?", and a forced verdict block. Scenarios (cold-resume / parallel-collision /
  standing-fleet) double as a probe of the C1 concurrency-shape question.

**Threats to validity (read before trusting this):** this is **self-report, not observed
behaviour** — agents predict their own workflow imperfectly and *cannot perceive
concurrent agents*, so any claim about collision frequency is suspect (see C1). Treat as a
strong **kill/keep** signal on *what to build first*, not as proof. The one non-self-report
data point (the Seed) is weighted higher.

---

## Seed — the one *observed* case (stronger than self-report)
An in-harness agent, unprompted, surfaced the sharpest finding with a receipt. During the
3.0.0 go/no-go, its memory said the dogfood-3 work was "UNCOMMITTED on release/3.0.0
pending review"; git said clean — already committed (`f983ebd`). It had to flag *"the prior
UNCOMMITTED risk is STALE/resolved,"* caught only by **brute-force re-deriving against git**.
Its framing:

> The failure is **a reconciliation gap with no provenance.** Memory records *outcomes*,
> not *which session produced them* or whether this run is a continuation or a fresh fork.
> Two truth-sources (spliced context + autonomous memory), nothing reconciles them; when
> they disagree you must distrust a good memory or trust a stale one, with no signal which.
> The fix: a **handover = a small, authoritative, reconciled delta with provenance**
> ("as of session N, against reality: X done, Y unfinished, verification = Z, baton here").
> It *feeds* the memory system instead of competing with it — which makes manual
> context-splicing actively **harmful** once it exists. Bones already in filigree:
> `checkpoint_session`/`get_session_changes` + `reconciliation_debt_list`.

Every one of the six blind interviews below independently re-derived this.

## Operator testimony — a SECOND observed case (corrects the interviews' "rare")
The owner (the human operator) corrected the panel's "collisions are rare" read from the
vantage the agents structurally lack:

> "Collisions are rare *is only as true as the skill and level of intoxication of your
> operator* — if he's doing a good job you won't directly clash, but that's **one sloppy
> command away from a disaster / mandatory rollback.**" And concretely: *"I've slammed escape
> to stop an agent I accidentally kicked off that was stomping over another change."*

This **resolves the interviews' own caveat.** The near-zero collision rate is **human-supplied
and fragile, not structural** — the deconfliction mechanism today *is the operator*, manually
serialising work and killing a stomping agent by reflex (ESC), invisibly upstream of the
agents. The agents read "mostly-serial" precisely *because* a skilled human is absorbing the
spatial-collision risk so they never see it. Degrade the human (scale to a fleet, fatigue, one
sloppy command) and the rate spikes to **catastrophic** (mandatory rollback). So real-time
spatial collision is **(a) real, (b) caught today only by a human reflex with zero tooling,
(c) high-cost when missed** — an availability/disaster-recovery problem in deconfliction-first
terms, not a niceties problem.

**Quantified (operator's lived rate):** the "oh-shit-escape" event — catching an agent
stomping a change — runs **~every 2–3 days when the operator is impaired, ~weekly when sober
and diligent, and never zero.** So the intervention rate is **sub-weekly at best**, and the
residual is *structural* (survives diligence), not just sloppiness. This is the empirical C1
datum the panel structurally could not provide: the deconfliction backstop fires multiple
times a week, and a human reflex (ESC) is the only thing between it and a mandatory rollback.

**Live confirmation (mid-discovery, 2026-06-09) — a THIRD observed case.** While this analysis
was running, a stomp happened in real time: the operator, "being sloppy," told an agent to *"fix
all the bugs"* — that broad, unscoped directive led it to **roll into a git worktree where another
agent was mid-implementation and start 'fixing' the other's uncommitted work.** This sharpens the
failure shape: the trigger is a **broad unscoped directive** (the agent expands scope to fill it)
crossing a **worktree boundary** into another agent's *live, uncommitted* work. Crucially it is a
**territory violation, not a TOCTOU file-race** — a per-file pre-write CAS (mechanism B) catches it
only if the other agent happens to write in the read→write window; the cleaner guard for *this*
flavor is **presence/avoidance (mechanism C)** ("an agent is live in this worktree") + scope
discipline on the directive. → nudges **C up from pure-v2** for the cross-worktree/broad-directive
case, and flags **worktree-scope** as an explicit input to the B design spike. (n=1 — don't
re-decide on one anecdote, but it is precisely the event the bet exists to kill, and it confirms the
operator-as-fragile-backstop finding *in real time*.)

---

## The verdicts (6/6)
| Model · scenario | Net stance | Keystone | Noise | Reconciliation gap real? | Concurrency read |
|---|---|---|---|---|---|
| opus · resume | DEPENDS (brief git-reconciled) | **#3** (via #2) | #1, #4, #5 | **yes** | mostly-serial |
| sonnet · resume | DEPENDS (brief stays fresh) | **#3** | #1, #4, #5 | **yes** | mostly-serial (self-spawned parallel only) |
| opus · collision | DEPENDS (stamp + board liveness) | **#3** (on #2) | #1, #4 | **yes** | mostly-serial + rare costly spikes |
| sonnet · collision | DEPENDS (brief accurate + board TTL) | **#3** | #4 alone; #2 only as infra | **yes** | mostly-serial + spikes |
| opus · fleet | DEPENDS (stamped vs prose) | **#3** (on #2) | #1, #4 | **yes** | can't-tell |
| sonnet · fleet | DEPENDS (SHA-stamped) | **#3** | #5, #4 | **yes** | parallel-shared-files (found at merge) |

Capability legend: **#1** seat/personality · **#2** per-run session id · **#3** resume brief
· **#4** advisory scope/lane · **#5** announcement board.

## What converged (unanimous unless noted)
1. **Keystone = #3 the resume brief — but ONLY git-reconciled / provenance-stamped.**
   6/6. A brief that *replays the agent's own prose* is **worse than nothing**: "a confident
   stale handover spends my trust then makes me re-verify anyway — I pay twice." The value is
   the **anchor** ("written against HEAD `abc123`"), not the assertion — it turns "is this
   stale?" from a judgment call into a one-command `git` diff.
2. **#2 (session id) is substrate, not product.** 6/6 — valuable only as the write-side
   carrier of the stamped handover.
3. **"#1" conflated three things — only one is noise** (owner disambiguation, post-panel):
   - **Personality *flavor*** ("jim") — **noise.** 6/6 called it "cosmetic / decoration /
     ceremony." Drop it.
   - **Standing per-area identity** (`claude-filigree-3` = test suite vs `filigree-1` = primary
     bug-fixer) — **NOT noise; rehabilitated.** It is the *addressable hook the keystone
     handover hangs on*: "claude-filigree-3's last checkpoint" is resolvable, "actor string
     claude at <time>" is not (the Seed's own argument). It doubles as the **partition** that
     makes lanes non-overlap *by construction* (deconfliction-first). The panel undervalued it
     only because they were asked about *persona*, not *area-scoped continuity* — a framing
     artifact, not a verdict on the idea.
   - **Functional role** (bug-fixer / tester / brainstormer / architect — a behavioural
     operating *mode*) — **a separate, UNTESTED axis.** The panel was never asked. It resembles
     a system-prompt / output-style persona (cf. the modifying-system-prompts doc) far more than
     a filigree registry, so it is likely a different and cheaper build. **Open question — a
     candidate for a follow-up probe, not covered by this discovery.**
4. **#4 (advisory scope/lane) is noise.** 6/6: derivable from the ticket; "advisory means I
   override it"; and an active **anti-feature** — risks making an agent *defer* on a
   legitimate cross-cutting fix ("not my lane").
5. **#5 (announcement board) is noise without liveness; conditional even with it.** Only the
   collision scenario lifted it, and only *with a heartbeat/TTL*. Write-side is the killer:
   "I can't predict my own duration and I'll forget to clear it" → a stale board makes agents
   "wait for a ghost," poisoning trust.
6. **Provenance + liveness are LOAD-BEARING, not polish.** The single biggest "it gets
   ignored" risk, named 6/6: one wrong-but-confident brief/board and agents distrust the whole
   layer permanently and fall back to `git`. Freshness is the product, not a feature of it.
7. **The grep test, passed honestly:** agents route *everything verifiable* to git/grep/tests;
   the layer only earns its keep for the one thing git can't answer — **intent + provenance**
   ("what was I doing, and what had reality looked like when I said it").

## C1 (concurrency shape) — the decisive methodological finding
The reads split (mostly-serial ×4, can't-tell ×1, parallel-shared-files ×1) **but all six
flagged the same caveat: they cannot perceive concurrent agents, so "collisions are rare" may
be pure observation bias.** The collision that's actually *observed* is **temporal** (past-me
vs present-me) and **merge-time** ("we both wrote incompatible things and nobody knew" —
redundant work is more common than simultaneous writes), **not** real-time same-file races.

**Therefore C1 cannot be answered by asking agents — they are blind to it by construction.
C1 must be answered by INSTRUMENTATION** (mine filigree event logs / git for actual
overlapping-write and redundant-work signatures), not another interview. This is the single
most important input to the spike design.

---

## Product implications (feed PDR-0003 + the spike)
- **Reshape the Next bet around the keystone the users actually named.** The bet is the
  **git-reconciled, provenance-stamped session handover** (ideas #2+#3 fused), built on
  filigree's existing `checkpoint_session`/`get_session_changes` + `reconciliation_debt_list`.
  The "personality/seat" framing (idea #4, the owner's original headline) is **demoted to a
  thin label on the handover**, not the centrepiece.
- **Make provenance-stamping + liveness a v1 acceptance criterion, not a later hardening.**
  Without "stamped against HEAD `<sha>`" + a TTL/heartbeat, the layer is a net-negative
  trust sink. This is the falsifiable bar a PRD must state.
- **Demote the file-lease / announcement board (ideas #1/#5) and gate it on instrumented C1.**
  Don't build it until the instrumentation shows real (not invisible) overlapping-write pain;
  if pain is merge-time/redundant-work, the *handover* addresses it better than a lock.
- **Advisory scope as an artifact = drop.** The partition-not-lock *philosophy* (C2) is sound;
  the declared-lane *object* is not what agents use.

## Raw verdict blocks
(Full transcripts were ephemeral `/tmp/panel` runs; the structured verdicts are preserved here.)

**opus·resume** — DEPENDS (brief git-reconciled, not prose-replay); keystone #3 powered by #2;
noise #1/#4/#5; "memory-says-X vs git-says-Y is my single most common orientation cost";
mostly-serial; conf med ("if a real fleet exists my dismissal of #4/#5 is wrong").
**sonnet·resume** — DEPENDS (brief stays fresh); keystone #3; risk: "one stale session and
agents re-orient from scratch forever"; mostly-serial + self-spawned parallel; conf med
("I'd never know a silent clobber happened").
**opus·collision** — DEPENDS (stamp + board heartbeat); keystone #3 on #2; board (#5) is the
dark horse *only with liveness*; "rare but high-cost, near-zero tooling today"; conf med
(observation bias).
**sonnet·collision** — DEPENDS (brief accurate + board TTL); keystone #3; "stale signals worse
than no signals — waiting for a ghost"; conf med ("can't observe what I miss").
**opus·fleet** — DEPENDS (stamped vs prose); keystone #3 on #2; "blindness to siblings is the
strongest argument for #5, and also why I can't size it"; can't-tell; conf med.
**sonnet·fleet** — DEPENDS (SHA-stamped); keystone #3, #2 as substrate; "collisions discovered
at merge time, not write time"; parallel-shared-files; conf med ("my 'rare' could be badly wrong").

---

## Round 2 — rebuttal panel (n=4: 2 opus, 2 sonnet)
The operator's counter (quantified ESC rate; "persona = continuity container") was put *back* to
a fresh panel, explicitly tasked with finding where the **operator** is wrong (anti-capitulation).
They conceded the problem, refused the forms:
- **Operator WON the problem.** "Rare" was observation bias; the human is the invisible backstop;
  a sub-weekly, diligence-surviving ESC rate is a real *structural* residual. (One opus sharpened
  it: the operator measures his *intervention* rate — an upper bound — not the counterfactual
  *rollback* rate; it overcounts and includes false kills.)
- **Operator LOST the forms — two blind spots, found independently:**
  1. **Advisory lanes/board would not have caught a single ESC event:** the stomping agent doesn't
     *perceive* it's stomping, and agents override advisories by their own admission. The ESC
     reflex works *because it is a hard, non-negotiable kill.* → his own evidence argues for a hard
     mechanical guard and **against** advisory deconfliction.
  2. **Standing per-area identity induces wrong deference on cross-cutting work** (a bug spanning
     tests+core forces the "test seat" to defer, or the partition is fiction; real fixes don't
     partition; the domain map goes stale faster than the identity map). The addressable owner the
     handover needs is a **path/area key, not a persona** — "persona = continuity container" mostly
     *renames* the handover.
- **Mechanism convergence:** the stomp is caught by **pre-write compare-and-swap** (read-sha vs
  write-sha, abort on change) — identity-free, registry-free, fires at the moment of harm.
  Advisory + handover both miss it (wrong timing / wrong problem).

## Round 3 — first-principles panel (n=2: 1 opus, 1 sonnet — thinner; treat A-vs-B sequence as SOFT)
Presented the *polished two-mechanism design* cold as a v1 (no mention of prior rounds) to test
generative, not critique, engagement. They validated the split and sharpened it:
- **Severity asymmetry (load-bearing):** P2 (stomp) is a correctness **bug** → the guard must be
  near-flawless or it's routed around; P1 (staleness) is a **cost** → the handover only has to beat
  re-deriving (low bar, low ceiling). *"If I ship one, ship the guard."*
- **Mechanism A — cut the inference.** Keep path-key + sha-stamp + the *irreplaceable* payload
  (**intent + verification-status**, which git can't show) + a raw `git diff <sha>..HEAD`. Cut the
  "your claim may be stale" semantic inference — unfalsifiable → distrusted → re-derived → wasted.
  Dumb-and-verifiable beats smart-and-unfalsifiable; trust is lost silently on the first wrong call.
  Add TTL/GC (notes go stale as a class).
- **Mechanism B — keep hard-abort, but:** hunk-level (file-level cries wolf → gets disabled);
  **self-write suppression** (must fire on *another* actor's write, not my own / formatters / lint —
  "can't be purely sha-based," the hard underspecified part); abort must deliver the delta + drop
  into an assisted 3-way reconcile; **transaction-aware** (a 15-file refactor aborting on file 14
  leaves a half-refactored repo — worse than the stomp).
- **Biggest blind spot:** B only guards the Edit/Write path — the *violent* stomps
  (`git reset --hard`, `npm install` rewriting a lockfile, codegen, migrations, `rm`) bypass it.
  Needs a tripwire on unexpected working-tree/HEAD movement, not just own-writes.
- **The cut they'd un-cut:** a dead-simple, identity-free **liveness/presence stamp** ("an actor is
  writing under tests/ since <sha>") for collision *avoidance* + abort-storm de-escalation (two
  agents both live in a path → CAS livelocks). The board reborn as *presence*, not advisory-ownership. v2.

## Bottom line (feeds PDR-0003)
Two orthogonal, identity-free, path-keyed mechanisms; persona / advisory-lanes / Tabard-dependency
all dropped:
- **A — reconciled handover** (sha-stamped, path-keyed, intent+verification payload, raw diff, TTL;
  *no* inference): a **filigree feature** on its existing session/run + `get_session_changes` +
  `reconciliation_debt_list`. Cheap, safe, additive → ships first **because it is nearly free**, not
  because it is the keystone.
- **B — pre-write compare-and-swap guard** (hunk-level, self-write-suppressed, delta-on-abort,
  transaction-aware, working-tree tripwire): the **correctness fix** and the operator's actual pain.
  Lives at the **Edit/Write tool layer** → likely a **Claude Code / harness / git-hook** concern,
  *outside* the weft suite. Higher severity, higher risk → **design-spike now**, build after. Doctrine:
  identity-free optimistic concurrency (no principals/permissions/lanes) = deconfliction done
  *mechanically*, not access-control; **reverses the C2 "advisory" leaning on evidence**; not an escalation.
- **C — liveness/presence stamp** (v2): identity-free avoidance + abort-storm de-escalation, gated on
  B's livelock actually appearing.
