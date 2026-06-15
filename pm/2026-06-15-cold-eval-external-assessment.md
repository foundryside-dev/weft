# External cold-eval assessment — value read (2026-06-15)

The 2026-06-15 cold-boot reviewer, after doing the onboarding job, volunteered an
unprompted **commercial/value assessment**. Captured here as the first external
value read. **Right-sizing caveat (PM):** one reviewer, one small (391-entity)
specimen, one session — *"what I saw," not a lab benchmark.* Treat as a strong
directional signal, not a valuation. Do not let it go to our heads.

## Verdict
**Net positive — but very unevenly.** "One excellent instrument (Wardline), one
strong one (Loomweave), two supporting players (Filigree, Legis), and one that
no-showed (Warpline)." Not five equal tools.

## Ranking by marginal value over a competent agent with grep/read/git
1. **Wardline — the crown jewel.** Source→sink taint across functions is the thing
   LLMs are unreliable at by hand; it caught 42 baselined dataflow defects
   (SQL/SSRF/SSTI/path-traversal/deser) the reviewer would miss eyeballing. The
   fail-closed gate (a PR can't silently suppress its own defect) read as correct
   security engineering. *"The tool I'd actually pay for."* The 72k-char context
   overflow is a real UX wart, but the analysis is the real deal.
2. **Loomweave — the workhorse.** `entity_find` concept→symbol and the call-graph
   queries beat grep decisively for "what calls X / blast surface." **Marginal
   value scales with repo size** — greppable on 391 entities, *transformative* on a
   50k-file monorepo. Knocks: staleness recurs; dead-code heuristic noisy
   (141 candidates, mostly false on a rootless library). *(Both addressed: rc10
   ships the dead-code lead-summary + low-confidence advisory.)*
3. **Filigree — solid infrastructure, not magic.** Competent tracker; many exist.
   Differentiator is the finding→issue bridge + SEI-keyed associations. The most
   replaceable individually.
4. **Legis — high latent value, unproven today.** `@policy_boundary` bound to a
   live-behaviour test fingerprint is genuinely novel, but every cell read
   `enabled:false` (no HMAC key) and `policy_boundary_check` gave a
   FINGERPRINT_MISMATCH that contradicted the planted-flaw doc — *machinery seen,
   payoff not.* Value is in governance/multi-agent scenarios a solo cold-eval can't
   exercise.
5. **Warpline — didn't earn its keep.** It owns the one question (change-impact) it
   failed: stale snapshot → `sei:absent` → clean-looking empty. Loomweave's one-hop
   neighborhood covered the same ground. Its real differentiator (temporal
   blast-radius across revisions) is legitimate but undelivered here.

## The thing more valuable than any single tool
**The SEI shared-identity federation** — one stable, rename-surviving code identity
that findings, issues, governance, and impact all key against. *"That's the actual
moat."* Incumbents (Sourcegraph, Semgrep, Snyk, Jira) each solve one column; none
share a common identity spine across code-intel + taint + tracking + governance.
Combined with MCP-first / agent-native + provenance honesty (vs. the incumbents'
human-UI-first) — *"that combination is the differentiated bet."*

## Monetary framing (scoring, not a quote)
Per-dev-seat-equivalent vs. what each displaces: **~$50–90/dev/mo at scale**
(team, agent-assisted dev, security + governance needs) — **front-loaded onto
Wardline + Loomweave + the integration.** **~$15–25 solo on a small repo** — "a
strong agent + ripgrep already covers a lot." Per-tool: Wardline $25–40, Loomweave
$15–30 (scaling with repo size), Filigree $5–10, Legis $5–25 (conditional on a
governance setting), Warpline $0–5 as-seen.

## The catch (bluntly, from the reviewer)
The "five instruments" pitch is overstated today. The premium depends on: **(a)**
fixing Warpline's freshness so it stops returning confident-looking nothing;
**(b)** Legis being exercised in a real governance loop; **(c)** the SEI federation
being the *headline* feature, not an implementation detail — "because that
integration is the part nobody else has."

## The one PO recommendation (the reviewer's, and we should heed it)
> The provenance-honesty discipline — *every empty result explains why it's empty*
> — is your most underrated asset. It's the reason I trusted the answers. Don't let
> it erode: it's worth more than any one analyzer, because it's what makes an agent
> willing to act on the output instead of re-verifying by hand.

This independently confirms the exit-interview **L3 (trust) thesis** from an
outside hand. It graduates provenance-honesty from "a nice property" to **a
protected invariant / the moat-guard.**

## What this re-weights (PM)
1. **Protect provenance-honesty as a named invariant** — it's the moat, and an
   outsider says so. Don't let any tool ship a silent empty. (Connects the
   lead-summary + bounded-by-default conventions under one banner: *no result
   without its provenance.*)
2. **Warpline is now a "does this member earn its place" question**, not just a
   bug. Its P1 (fail-loud / recruit on stale snapshot, + re-capture) is the
   minimum; the real test is whether temporal blast-radius delivers value loomweave
   doesn't. Until then it's a credibility liability ("confident-looking nothing").
3. **Loomweave's value is at scale** → prove it on **elspeth (~425k LOC)**, not
   lacuna. The cold-eval explicitly says the value is greppable-away on a small
   repo and transformative on a large one.
4. **Legis needs a governance-loop exercise** — a solo cold-eval structurally can't
   surface its payoff; design a scenario that does (HMAC keyed, a real
   block→override→attest cycle).
5. **SEI-as-headline** is a positioning decision for the owner — the moat should be
   the pitch, not buried.
6. **Wardline's 72k overflow** — fix the wart on the crown jewel (bounded-by-default
   + the lead summary it already mostly has). Real, but the reviewer half-owns it
   ("should have used summary_only").
