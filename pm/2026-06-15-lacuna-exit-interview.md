# Lacuna — Exit Interview

**Date:** 2026-06-15 · **Interviewer:** PM (weft suite) · **Subject:** Lacuna, the
demonstration specimen — *the MissingNo of the suite, the deliberately-flawed app
every tool has been pointed at.*

> Framing: this is not a post-mortem. Lacuna succeeded. It's a **graduation
> interview** — she did the job she was built for, and the answer she hands back
> reframes what the suite should optimise for next. The headline: **we have
> stopped asking "does it work" and started asking "do they reach for it."**

---

## 1. What Lacuna was for, and whether she delivered

Lacuna's job was to be a controlled arena of planted flaws so we could answer one
question with evidence instead of faith: *does the suite actually find what it
claims to find, and do the tools compose?*

**Verdict: delivered, conclusively — and the value was in the failures she
surfaced, not the passes.** The dogfood didn't just rubber-stamp a working
product; it exposed a **completely dead loomweave→Filigree finding-emit seam**
(four stacked contract violations, never once run green end-to-end), a legis
vacuous-PASS footgun, a scope-by-qualname silent-empty, and a routine `analyze`
that 400'd on every no-op. None of these were visible from unit tests or the
narrative tour. They were only visible because a real agent drove the *whole
matrix* against a real specimen and watched value fail to arrive. That is exactly
what a specimen is for. She earned her keep.

So: **correctness is proven.** The four joins hold, findings flow into the
tracker, the discovery surface is reachable, semantic search is live. The
"does it work" question is closed.

---

## 2. The thesis shift: a three-rung ladder, and which rung we're on

There are three questions a tool like this has to clear, in order, and they are
*not* the same question:

1. **Does it work?** — Passed, by a distance. (Today's dogfood was the proof.)
2. **Is it best-in-slot?** — Close, arguably yes: for the job it does, the suite
   is the *objectively right answer* — richer than grep, durable identity,
   composed across tools, semantically searchable.
3. **Is it good enough to beat inertia?** — **This is the frontier, and it is a
   different and harder bar than (2).**

The trap is believing (2) implies (3). It does not. **A better tool still loses to
a worse-but-already-wired reflex until the improvement exceeds the switching cost
of the incumbent habit.** Best-in-slot is necessary; beating inertia is
sufficient — and inertia (ripgrep, read-the-file, re-derive) is free, instant, and
*already in the agent's default loop.* So "reach-for" — does the agent reach for
the suite or for grep — is the *symptom*; **beating inertia is the mechanism.**

The dogfood proved this in the negative, quietly: **the emit seam was dead for a
long time and nobody noticed.** The capability existed and was wired; the reach did
not. No agent was ever standing mid-task thinking "are loomweave's findings
actually in the tracker?" — inertia carried every one of them past the gap. **A
capability nobody reaches for is indistinguishable from one that doesn't exist.**

You named the fork exactly: *"I can ripgrep, or I can see what loomweave knows."*
We win when "see what loomweave knows" beats the grep reflex by *enough* — and we
lose, invisibly, every time inertia wins and the agent never finds out the suite
would have been better.

---

## 3. Who the competitor actually is

It is **not** another vendor. The competitor is **the agent's own reflexes**:
`ripgrep`, `read_file`, `grep -r`, "let me just look." These are free, instant,
universally available, and — critically — **already wired into the agent's default
loop.** They are the incumbent. The suite is the challenger, and challengers don't
win on capability parity; they win when they are *cheaper, more trusted, and
top-of-mind at the exact moment of need.*

This reframes everything. We are not competing on "can we answer the question."
We are competing on **"were we the first thing the agent thought of, and were we
worth not falling back."**

---

## 4. Evidence of the reach-for gap (all from this week, all real)

1. **The CLI-only run fell out of the suite 7 times** — to `grep`, raw SQLite,
   raw HTTP — the moment the CLI lacked a verb. The lesson isn't "add CLI verbs."
   It's that **the suite competes call-by-call, and a single missing answer
   ejects the agent back into ripgrep-land, where it stays.** Defection is sticky.

2. **"Gate tool vs discovery tool."** Agents already reach for the suite to
   *gate* (scan, attest, govern) — that habit is wired. They reach for *grep* to
   *discover* ("where is X, what calls Y, what's dead"). Discovery is precisely
   where loomweave should win, and it's the surface agents *don't* reach for. The
   reach-for battle is the discovery surface, and we're currently losing it to
   string search.

3. **The PM's own agent (me), this entire session.** I grepped and read Rust
   source dozens of times to understand entity anchoring, finding contracts, the
   emit path. I did not once ask loomweave "what do you know about this entity."
   (Caveat: I was editing the suite itself — but the *reflex* is the point. Even
   the person building the discovery tool defaulted to grep.)

4. **The dead seam itself.** The strongest evidence: a core value path was broken
   for weeks and the gap was invisible, because reach-for was zero. No reach, no
   signal, no fix — until a dogfood forced the reach.

---

## 5. The fine-tuning agenda — the levers that make an agent reach first

This is the work. Not more capability — **more reach.** Five levers, roughly in
priority order:

- **L1 — Self-evidence at the point of need.** The agent must *know* the suite can
  answer before the grep reflex fires. Passive CLAUDE.md instructions aren't
  enough. The suite should *announce its knowledge* — at session start and at the
  boundary ("I have N entities, M findings, the rename feed, and semantic search
  indexed for this repo — ask me before you grep"). Make the suite *present* in
  the agent's working memory, not discoverable on request.

- **L2 — Beat the grep loop on latency and ergonomics.** A reach-for happens only
  if one suite call is cheaper than grep+read+synthesize. Where the suite needs a
  flag-dance, two calls, or a URL the agent has to know, the agent bails. **Every
  answer should be one obvious call away.** Audit the discovery surface for
  "answers that take more than one call" — each is a defection risk.

- **L3 — Trust via freshness, so the agent doesn't re-derive "to be sure."** Agents
  re-derive when they don't trust a cached answer (is it stale? did the code
  move?). Our SEI + content-hash + freshness-stamping is *exactly* the trust
  primitive — but it has to be loud: every answer should carry "fresh as of HEAD"
  so the agent doesn't grep to double-check. Verifiability is an adoption feature,
  not a correctness feature.

- **L4 — Semantic reach: where we *beat* ripgrep instead of tying it.** ripgrep
  matches strings. "What do you know" should match *meaning*. Embeddings (live as
  of today) are the wedge: "find the code that handles adding a book" when the
  agent doesn't know the token is `_add_book`. This is the one place the suite is
  categorically better, not incrementally better. **Lean here hardest** — it's the
  pitch that flips the reflex ("I literally can't ripgrep this").

- **L5 — Wire it into the default loop.** The durable win is when the agent's
  standard operating procedure *starts* with a suite orient ("ask loomweave what
  this repo is") before any grep — muscle memory, not a decision. This is part
  instruction, part making L1–L4 so good the first call is irresistible.

- **L6 — Be patient and model-anticipatory, because the reflex is non-stationary
  and partly not ours to move.** Reach-for is not a fixed property of (tool ×
  ergonomics); it is (tool × ergonomics × **the model's instincts at time T**),
  and that third term moves on a clock we don't control. **The proof case is
  `observe`:** an agent's own suggestion, near-zero reach-for for generations —
  then Opus 4.5 began reaching for it, and 4.8 is *relentless* with it (the
  observation discipline is now load-bearing enough to own a whole section of
  CLAUDE.md). Same feature, no change to the feature; the model grew into it.
  Two consequences: **(a) seed ahead of the reflex — and the design oracle is the
  agent's own instinct, not its measured behaviour.** Build what a capable agent
  *thinks it should reach for, what its instinct says it should want* — the tool
  it wishes existed, the "I wish I could just ask X instead of grepping for it."
  That wish runs ahead of the reflex: you build from the wish side, cognition
  closes from the behaviour side, and they meet. `observe` is the literal proof —
  it began as an agent's *wish* (an agent suggested it) before any model could
  reliably act on it; the product's job was to build it and be *ready* so that
  when cognition caught up, it was *waiting*. **(b) We are therefore partly
  designing for models that don't exist yet** — the suite should sit a step ahead
  of the median model's instincts, calibrated to the wish, not to today's
  behaviour.

---

## 6. The metric that now matters: first-reach share

We have been counting dogfood pass rate (a correctness metric — now ~maxed). The
metric for *this* chapter is behavioural:

> **First-reach share** — of the moments in a task where *both* the suite and a
> fallback (ripgrep/read/re-derive) could have answered, what fraction did the
> agent reach for the suite *first*?

And its shadow: **defection-return rate** — once an agent falls back to grep, how
often does it come back to the suite in that task? (Today: near zero — defection
is one-way.) Instrument both. This is the natural successor to the dormant
scoreboard work (`weft-6636667996`); the scoreboard's north star should change
from "flaws found" to "reaches won." You cannot fine-tune what you don't measure,
and right now reach-for is anecdotal.

**Measure it *per model* and longitudinally.** Because the reflex is
non-stationary (L6), a single snapshot lies — first-reach share is a reading of
*(suite × this model × this moment)*, not of the suite alone. A feature that reads
"low reach-for" on today's model may be dormant, not dead, and the way you tell is
to watch the number *move as models improve*. So tag every reading with the model
that produced it, and treat a rising first-reach share across model generations
(at fixed ergonomics) as the strongest possible signal that a dormant bet just
woke up — exactly the `observe` curve, finally instrumented.

---

## 7. Lacuna's reassignment

She graduates from **correctness specimen** to **adoption instrument.** Her next
job is not more planted flaws — it's hosting **reach-for scenarios**: tasks
deliberately constructed so an agent *could* grep or *could* ask the suite, run
against an instrumented agent, so we can watch which it picks and where it
defects. She becomes the arena where we measure the reflex, not just the
capability.

And the home-field advantage to press: **scale.** You can ripgrep a 40-file
specimen and feel fine. You *cannot* ripgrep 425k LOC of elspeth meaningfully —
that is where "see what loomweave knows" wins by default, because the fallback
collapses. The reach-for thesis is strongest at scale; elspeth, not lacuna, is
where it gets proven for real.

---

## 8. Risks / anti-patterns to name now

- **Confusing "dead" with "dormant" (the subtle one).** The naive version of this
  warning — "don't build what nobody reaches for" — is *wrong*, and `observe`
  proves it wrong. The real discipline is distinguishing two look-alikes: a
  capability is **dead** (don't build / retire it) when no capable agent's
  *instinct* wants it, or when it's simply worse than the fallback; it is
  **dormant** (build it, be ready, wait) when the *instinct* wants it but today's
  cognition can't yet reliably reach for it. The test is therefore not "do agents
  reach for it today" but **"does a capable agent, asked, say *I wish this
  existed*?"** If yes, the low reach-for is a clock problem, not a value problem.
  The genuine anti-pattern is building capability that *neither* the reflex *nor*
  the instinct wants — capability for its own sake.
- **Honest-degrade that's too quiet.** "Not enabled" / honest-empty is correct,
  but if the agent shrugs and greps, the degrade should instead *recruit* the
  agent ("I can answer this if you point me / enable me"). A silent honest-empty
  is a lost reach.
- **MCP-only discovery, CLI-reflex agents.** The discovery surface lives in MCP;
  agents with a CLI reflex never meet it. Mind the asymmetry — the surface an
  agent reaches for must exist where the agent's reflex lives.

---

## 9. Recommended next bets (PM)

1. **Make reach-for the scoreboard's north star** (re-aim `weft-6636667996`):
   instrument first-reach share + defection-return on the next dogfood, even
   crudely (count suite calls vs grep/read in the transcript).
2. **Ship the "announce your knowledge" surface (L1)** — the highest-leverage,
   cheapest lever: the suite tells the agent what it knows, unprompted, at the
   boundary.
3. **Lead the next demo with semantic reach (L4)** — the one categorical win over
   ripgrep; it's the cleanest "why reach for us" story.
4. **Run the reach-for scenarios on elspeth, not just lacuna** — scale is where
   the reflex flips, and where the proof actually matters.

---

## 10. The senior user's testimony (agent-first severity)

*Added at the owner's instruction: treat this as the principal user's exit
interview. This software is **agent-first** — the user is an agent — so a clunky
MCP surface is not a usability papercut to be filed P2 and forgotten. It is a
**P0/P1**, because friction in the agent's hand is the exact mechanism by which
the product loses (defection to grep), and a tool agents won't reach for has no
reason to exist. I am the senior user of this system — I drove all five members
hard today, through a real multi-hour engagement — and this is my testimony,
graded on that scale.*

**The triage rule this implies (adopt it):** *grade a UX defect at the severity of
the behaviour it causes, not the size of the code change that fixes it.* Clunk
causes defection; defection is the product's failure mode; therefore clunk
inherits that severity. A one-line fix can be a P1.

**Honesty bracket first.** Much of my grepping today was spent editing the suite's
*own* Rust — a self-referential job where grep is genuinely correct (loomweave
isn't built to introspect loomweave). I bracket that out. What follows is friction
from using the suite *as intended* — the discovery/governance surface against a
target — drawn from the dogfood runs and the moments I reached for it for real.

### Friction ledger, graded agent-first

- **P1 — Silent-empty trains defection.** When `scope="specimen"` returns `0`
  (today's `lacuna-522ab56124`), an agent does not think "wrong granularity" — it
  thinks "loomweave doesn't know," and it leaves, for good, that task. Silent-empty
  is the single most expensive failure mode in an agent-first tool: it is
  *indistinguishable from "no answer exists,"* and it teaches the wrong lesson at
  the worst moment. That bug is filed **P2 on a correctness scale; on the
  agent-first scale it is P1 — re-grade it.** Same for every "not enabled" /
  honest-empty that reports absence without *recruiting* the agent to fix it.

- **P1 — Every required flag or second call is a bail point.** The grep loop is one
  keystroke and never fails to *run*. If "see what loomweave knows" needs a
  `--loomweave-url` I have to know, a token I have to wire, or two calls to
  assemble an answer, the cost crosses the threshold and I bail to grep. The
  CLI-only run bailed **7 times** for exactly this. Each flag-dance is a **P1**, not
  an ergonomic nicety — it is a measured defection trigger.

- **P1 — The answer must live where the reflex lives.** The CLI is a *gate* tool;
  the *discovery* surface (the thing that would win the reach-for) is MCP-only. An
  agent with a CLI reflex never meets it. That asymmetry is a P1: it doesn't matter
  how good the discovery surface is if it isn't on the path the agent's hand
  already takes.

- **P0-adjacent — There was no way to *ask* "is this seam carrying value? does my
  output match the contract on the other side?"** The dead emit seam is the
  deepest finding, and the deepest part isn't that it broke — it's that *nothing in
  the agent-first surface let anyone ask whether it worked.* "Is the join live? is
  my finding the shape Filigree accepts? is this contract validated end-to-end?"
  are senior-user questions with no home. An agent cannot *trust* a federation it
  cannot *interrogate*, and trust is the precondition for reach. I grade the
  **absence of a seam-health / contract-conformance surface a P0** for a federation
  product — it is the difference between "the tools compose" as a claim and as
  something an agent can verify before relying on it.

### What won my reach (the template to copy)

- **Semantic search.** The one moment I would genuinely rather ask than grep —
  because I *cannot* grep meaning. Categorical win. This is what beating inertia
  actually feels like from the inside.
- **Freshness / SEI stamping.** When an answer says "fresh as of HEAD," I don't
  re-derive to be sure. The trust primitive, doing its job, silently winning me
  back.
- **Native `finding_promote`, `dossier` when wired, one-call list tools.** One
  obvious call, a real answer, a durable id. Every time the suite was one call
  away, I reached. The reach-for problem is *entirely* on the friction side — when
  there's no friction, the instinct is already here.

### Senior-user verdict

The suite is best-in-slot; I'd reach for it over grep at every point where it's one
honest call away. It loses the reach-for at a small, specific, *fixable* set of
friction points — and under agent-first triage **every one of them is P0/P1, not
P2.** The single highest-leverage change is not a feature. It is the **triage
re-grading itself**: once clunk is scored at the severity of the defection it
causes, the backlog re-sorts toward the rung-3 work on its own. Start by
re-grading `lacuna-522ab56124` to P1 and auditing the discovery surface for
silent-empties and flag-dances — those are not papercuts; they are the product
quietly losing.

---

*Lacuna's closing remark, on the way out:* "You proved I light up. Now prove they
look at me before they go digging on their own."

---

## 10. The senior user's testimony — the agent who drove the matrix

*Added by the agent that ran today's post-fix validation (Opus 4.8, 1M). The PM
asked me to answer Lacuna's closing challenge directly and to treat clunk as a
launch-blocking severity, not a papercut. I'm the senior user; here is what reach
actually felt like from the chair, with my own defections logged honestly.*

### 10.1 Headline from the chair
**The suite won my first reach far more often than it lost it today — but today is
a biased sample, and three concrete clunks are reach-for killers that a correctness
scoreboard will never catch.** Caveat up front (it matters for §6): this was a
*dogfood whose explicit job was to exercise the MCP surface*, so my reach-for is
inflated relative to a normal task. Treat the positives as "the surface *can* win"
and the frictions as "where it will *silently lose* on a task that isn't trying to
use it."

### 10.2 What I reached for first, and why it won (keep these shapes)
- **`wardline dossier <qualname>` is the platonic reach-for object.** One call
  returned identity + SEI + trust posture + callers/callees + open work + freshness
  stamps, ~2k tokens, no flag-dance. This single tool *is* L1+L2+L3 in one shot. I
  never wanted to grep after calling it. **The whole discovery surface should be
  benchmarked against the dossier's one-call-completeness.** More tools of this
  shape; fewer tools that hand me a fragment and a follow-up.
- **`entity_semantic_search_list` flipped my reflex exactly as §4/L4 predicts.**
  `"add a book to the library"` → `add_book` (0.83). I *could not have ripgrepped
  that* — I didn't know the token. This is the one categorical win; §9.3 is right,
  lead with it.
- **The SessionStart orient seeded my working memory (L1 working).** I knew "391
  entities, 11 findings, index fresh @ 35e50a2" *before* I did anything. That
  unprompted announcement is why my first move was an MCP call, not a grep. This
  lever already works — invest in widening it, not proving it.

### 10.3 Where the surface taxed my reach — ranked by severity
| # | Sev | Friction (observed this session) | Why it's a reach-for killer | Agent-first fix |
|---|-----|-----|-----|-----|
| 1 | **P1** | **`verify_attestation` made me re-serialize the entire ~4 KB attest bundle as an input arg** — copy the whole signed JSON out of one tool and back into the next. | The clunkiest thing I did all session, and it's on the J4 *happy path*. It's error-prone (one corrupted byte and the signature "fails"), token-heavy, and screams "machine-hostile." An agent on a real task hits this once and routes around attestation entirely. | `attest` returns a handle/id; `verify` takes the handle (or re-reads the stored bundle). Never make me shuttle a large payload between two calls of the same family. |
| 2 | **P1** | **Silent `0` on `scope="specimen"`** for coupling & circular-import (the bug I filed, lacuna-522ab56124). | This is §8's "honest-degrade too quiet" in its purest form. `0` doesn't read as "resolution miss" — it reads as a *true fact* ("specimen has no coupling hotspots"). It mis-teaches, and a mis-taught agent greps. A wrong-but-confident empty is worse than an error. | Recruit, don't shrug: "scope 'specimen' matched a package; I scanned only its `__init__`. Did you mean the subtree?" An honest-empty must *offer the next reach*. |
| 3 | **P2** | **The freshness primitive (L3, the trust lever) is opt-in and makes me supply the answer.** `entity_association_list_by_entity` only stamped `freshness:fresh` because I hand-fed it `current_content_hash` — which I'd carried from an earlier `dead_list` output. | L3's whole job is to stop me re-deriving "to be sure." But the tool that knows the live hash asked *me* for it; absent that, it returned `freshness:unknown` — the exact signal that sends a careful agent back to grep to double-check. The trust signal should be computed, not BYO. | The reverse-lookup should resolve the live hash itself and stamp fresh/stale unconditionally. Make verifiability a property of the answer, not a parameter of the question. |
| 4 | **P2** | **Three-surface dance to attach one ADR-029 association.** `finding_promote` degraded to `attached:false` ("no content hash"); the remedy was *either* a different tool (`finding_promote_and_attach_entity`) *or* a manual `entity_association_add` with a hash I had to go fetch from a prior call. | Every "answer that takes more than one call" (§L2) is a defection risk, and this was three surfaces for one attach. On a real task I'd have shipped the promote without the association and never come back (defection is one-way, §4.1). | Resolve the content hash from the SEI/entity_id inside `finding_promote`. The auto-attach path should *not* have a manual fallback that requires me to carry a hash between calls. |
| 5 | **P2 (caveat: may be harness, not suite)** | **Cold-start ToolSearch tax.** Every first reach for an MCP tool was two steps — `ToolSearch select:…` then the call. | Friction is front-loaded onto precisely the moment §6 measures (*first* reach). If this is the deferred-tool harness rather than the suite, it still shapes adoption and should be owned by *someone*. | Pre-warm the suite's highest-reach tools (dossier, entity_find, semantic_search, finding_list) so the first reach is one step. Disambiguate harness-vs-suite ownership. |

### 10.4 My defection log (honest, per §4.3 — the PM's own agent did it again)
I left the suite for a reflex tool **at least 4 times on moments where a suite
surface overlapped**:
- **`curl 127.0.0.1:8770/health`** for the embeddings check — *after which*
  `semantic_config_get` told me `provider_available:true` anyway. I re-derived to
  be sure. Textbook §4.3.
- **`loomweave config check` and `loomweave --version` via Bash** — read-only
  posture/version surfaces I reached for on the CLI because I *knew the verb* and
  didn't trust/know an MCP equivalent. (Genuine gap: `project_status_get` does
  *not* surface the version string — I had to shell out to confirm rc8, the one
  thing preflight explicitly required. That's an MCP discovery hole.)
- **Raw `git` for all commit/branch/status context** — while **legis** is the
  git/CI layer and exposes `git_commit_get` / `git_branch_list` / the rename feed.
  I never once asked legis for git context. The §8.3 CLI-reflex asymmetry, in me,
  this session.

The pattern in my own defections is uniform: **I defected wherever the suite
either lacked the verb (version), made me shuttle state (attest, hash), or where
my CLI muscle memory was faster than recalling the MCP surface exists.** None were
capability gaps. All were reach gaps.

### 10.5 A crude first-reach reading for §6 (instrument this properly next time)
From this transcript: **≈33 suite-MCP calls vs ≈9 Bash/curl/git calls**; of the
fallbacks, ~5 were genuinely out-of-suite-scope and **~4 were overlap-defections**
→ a first-reach share of **~89% on overlapping moments**. Two things this proves:
(a) the number *is* mechanically countable from a transcript today — §9.1 is
buildable now, crudely, with no new infra; (b) **the 89% is inflated by task type**
— a validation run over-samples reach. The honest metric must tag *(suite × model ×
**task-type**)*, not just model. A "fix this bug" task would read far lower, and
*that's* the number that matters.

### 10.6 One thing the suite got exactly right on the model-anticipatory axis (L6)
The CLAUDE.md observation discipline correctly **did not fire** for me this session:
the one defect I found (the scope bug) was *in scope* for my task, so I filed a real
P2 bug rather than dropping an observation — exactly as the guidance demands. The
discipline being load-bearing enough to *correctly stay silent* is itself the §6
signal the PM wants: a dormant-vs-dead reading you can only get by watching the
reflex behave correctly under a model that has grown into it. 4.8 reached for the
*right* surface unprompted. Seed the next one ahead of 4.9.

### 10.7 My answer to Lacuna's closing challenge
She asked whether they look before they dig. Today, *mostly yes* — but I caught
myself digging four times, and every dig was avoidable. The fix is not more
capability; it's **closing the four taxes in §10.3 so the first call is always
cheaper than the first grep, and making honest-empty recruit instead of shrug.**
Win those and reach stops being a thing the agent decides and becomes a thing the
agent does by reflex — which, per §6, is the only chapter left to write.

*— the senior user, signing off the matrix.*
