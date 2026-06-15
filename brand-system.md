# Weft Brand System

**Status:** Position, hero-emphasis, **glyph (A), font swap (all-Plex), and
headline/tagline** all **Decided** (2026-06-15, owner-confirmed this session).
Remaining open: render glyph A into `site-kit`; develop the **L2 brand layer**
(see Position → Horizon). · **Owner:** PM/Brand · **Companions:**
[doctrine.md](./doctrine.md) (position source), [THEMING.md](./THEMING.md)
(sharing *mechanism*), [packages/site-kit](./packages/site-kit) (implementation),
[web/information-architecture.md](./web/information-architecture.md) (site copy).

The bridge between *building* the brand and *managing* it. Read the **Invariants**
before approving any new surface; a live choice that contradicts one with no
overriding entry in **Decisions** is **drift**.

---

## Position

- **For:** developers and the agent fleets they run, working across many small,
  separately-installed tools.
- **Job:** turn a swarm of separate, stateless tools and agents into one
  coherent, identity-stable body of work — where the *joins* between tools are
  the value.
- **Feeling (the ONE thing):** **trustworthy coherence** — *"these separate
  things are actually one fabric, and it will not lie to me about where the seams
  are."*
- **Rejects:** the dark-mode-gloss, all-green-dashboard, "trust us, it passed"
  SaaS dev-tool aesthetic; the monolith-with-plugins; ad-hoc bilateral
  integration; hype adjectives. Not for anyone who wants a single big product
  that hides its seams.

**The hero is the weave, not the tools** (owner-confirmed 2026-06-15, tracing to
[PDR-0023](./pm/product/decisions/) "the federation is the product; the seams are
the crown jewels"). The tools are the threads; the cloth is the product. This
**supersedes** the founding 2026-06-05 framing ("five sharp tools behind one
brand"), which the original brand was authored against — see **Decision D1**.

The name already encodes the position: in weaving the **warp** is the fixed
threads held under tension (each tool, standing alone); the **weft** is the
single thread drawn *across* them that binds them into fabric (the seam / the
SEI spine / the glue). *Weft is the binding cross-thread.* The name is settled
and load-bearing.

### Horizon — the L2 environment (the position deepening, 2026-06-15)

The owner's framing: **L1** is the toolset (the members — the code-and-debug
tools). The realization that became **L2** is that *agents were never excited by
the tools themselves — they were excited by the **identity (SEI) pulling every
tool's output into one common operating picture***. Weft is the suite's shot at
the **L2 environment**: a surface where an agent fleet builds *its own* scripted
dashboards and reporting on the SEI spine + the toolset.

This **confirms the hero-flip past doubt** (the weave/identity, not the tools,
is what has pull) and adds one beat the suite-level brand above does not yet
carry: **generativity / agency.** L2 is not "we wove the cloth for you" — it is
"here is the loom; *you* weave your own view." The metaphor extends cleanly and
should be made explicit when the L2 layer is developed:

| Loom term | Weft meaning | Layer |
|---|---|---|
| **warp** (threads under tension) | the tools, each standing alone | L1 |
| **weft** (the binding cross-thread) | the SEI identity-join / the seam | the spine |
| **loom** (the apparatus you weave *on*) | the L2 environment the fleet builds on | L2 |
| **the cloth** | the **common operating picture** woven from SEI-keyed output | the product |

**"Common operating picture"** is a candidate hero phrase for L2 specifically.
The L2 brand layer (its own headline/tagline tier and whether the *loom*
surfaces as a named brand element) is **not yet derived** — see the open
question logged for the next session. The customer of L2 is the **fleet**
([PDR-0024](./pm/product/decisions/)).

---

## Invariants (the spine — almost never flex)

- **Personality / values:** honest, grounded, engineered-not-glossy, warm,
  precise. Shows what is *absent*, not just what is green — and **discloses the
  edges of what it knows** (what was excluded, withheld, unresolved). No hype, no
  emoji (a rule, not a default).
- **Anchor color + its role:** **indigo `#35487B`** is *"this is us"* — it is
  Loomweave's thread (identity/the spine) *and* the federation primary, because
  the spine is the hero. **Warm linen `#F5F0E5` + ink** is the ground. The brand
  is **one warm light theme — "natural dyes on unbleached cloth" — light-only,
  no dark mode, no toggle.** This is the single most distinctive, load-bearing
  decision in the brand (deliberate anti-convergence; see Decision D5).
- **Per-member thread color:** each member owns exactly one dye-pigment thread
  (indigo / brass / madder / walnut / woad / copper / ash for Lacuna). The
  federation *is* the palette. Threads are canon in
  [site-kit `tokens/colors.css`](./packages/site-kit/src/tokens/colors.css).
- **Logo DNA:** a **weave-mark** — light warp threads (the tools) crossed by one
  bold indigo **weft** thread (the seam, the hero), with the **over-under
  occlusion visible** (the join is inspectable — the honesty mechanic, drawn).
  See Decision D2.
- **Mono is first-class.** CLI output, JSON envelopes, SEI tokens and tool names
  render in mono; the brand speaks the medium its users live in.
- **The promise:** *every result carries its `cause + reason_class + fix`; the
  brand never shows you an all-green dashboard when it isn't — and it tells you
  the edges of what it can see.* (The honesty invariant —
  [doctrine.md §10](./doctrine.md), the `weft-reason` contract.)

  **Why it is a *hard* gate, not a nicety (the keystone):** in one fabric, every
  tool speaks on behalf of every other — so a single confident-wrong answer
  undermines the **whole weave at once.** Trust is *pooled*; one bad thread is
  visible across the entire cloth. That is why honesty is a **federation-level
  invariant and a hard admission gate** (not a per-tool virtue), and why the L2
  platform requires honesty to **propagate through composition**. *(The
  2026-06-15 Lacuna cold-eval — a confident-empty answer from one tool — is what
  prompted the lift to L2 and its honesty rules.)*

  Two field-validated sub-principles (2026-06-15 Lacuna cold-eval):
  - **The caveat is the headline, not a footnote.** A true-but-unqualified number
    ("141 dead") still misleads; the limit leads. This is *why* the lead-summary
    and bounded-by-default conventions are brand-load-bearing, not just ergonomic.
  - **An honest empty is loud, not clean.** A "nothing found" that could be a real
    nothing *or* a failed lookup must say which — never a clean-looking empty set a
    hurried reader mistakes for "all clear." Silent redaction/nulling is an honesty
    failure even when the intent (don't leak) is right.

## Expression (flexes per surface / sub-product)

- **Accent = the member's thread color.** A member site/CLI leans on its own
  pigment; the hub stays indigo. State is shown by a **4px left rule** (thread or
  semantic color), not fills.
- **Density / motion:** dense, mono-forward, flat. No shadows-as-depth, no
  gradients; depth is the warm surface ramp. Radii `3 / 6 / 8`.
- **Voice calibration:** plain, declarative, lowercase-mono for any technical
  token; honesty stated as a *limit*, not a boast. On-voice exemplars already in
  the wild — Wardline: *"silence is not a clean bill."* Legis: *"a discipline,
  not a hardened security boundary."* Federation-level lines: **"No all-green
  dashboards. The seams are inspectable."** · **"An honest empty is loud, not
  clean."** Field-validated — a 2026-06-15 cold-eval evaluator, unprompted:
  *"the honesty about what they can't see is the reason I trust what they do
  return."*

---

## Decisions

> Each names what was chosen, why (from position), and the reversal trigger.

- **D1 — Hero emphasis: the weave, not the tools.** *(Decided 2026-06-15.)*
  The brand leads with the seam/identity/glue; tools are proof-points. Supersedes
  the 2026-06-05 tools-led framing. **Reverse if** the federation ever ships as a
  single installable product (the "one big product" the position rejects) — at
  which point the tools-as-components framing would be a lie.

- **D2 — Logo: "the weft pass" (direction A).** *(Decided 2026-06-15.)*
  The shipped `weft-glyph.svg` is a uniform grid (fine under the old tools-led
  reading; it has no hero thread). Replaced by **direction A** — one bold indigo
  weft woven through light warp threads, occlusion visible — in
  [web/brand-proposals/glyph-A-weft-pass.svg](./web/brand-proposals/glyph-A-weft-pass.svg).
  **C "crossing"** is retained as the **compact/favicon lockup**. **Reverse if** A
  reads as a dash/plus below ~24px in real use — promote C to the small-size mark
  (already the plan). The live `site-kit` `weft-glyph.svg` is **not yet
  re-rendered** (pending this session's render step).

- **D3 — Tagline + headline: weave-led.** *(Decided 2026-06-15.)* Retired
  *"Small, sharp tools — woven on one identity"* (tools-led). Suite/hub headline:
  **"The tools are the threads. The weave is the product."** One-line tagline:
  **"One identity, woven through every tool."** Signature honesty line: **"No
  all-green dashboards. The seams are inspectable."** **Reverse if** D1 is
  reversed. *(An L2-specific headline tier is still to be derived — Horizon.)*

- **D4 — Typography: drop Space Grotesk; the working fonts are the brand fonts.**
  *(Decided 2026-06-15 — owner delegated the type call.)* Keep **IBM Plex Mono** (data/CLI/SEI — load-bearing,
  on-position) and **IBM Plex Sans** (text/UI — honest humanist engineering,
  same superfamily = coherence for free). **Retire Space Grotesk** for display:
  it is a heavily-used startup-geometric face (mild category convergence) and its
  cold geometry fights the warm natural-dye palette. Set headlines in Plex Sans
  at display weights. Distinctiveness is deliberately carried by **color + the
  weave-mark + the honesty-state UI**, not by a display face; type buys
  trust/legibility/coherence. **Reverse if** all-Plex headlines test as too
  utilitarian for brand moments — the warm-distinctive alternate is **Fraunces**
  (optical-size soft serif, matches the craft/dye story) used *only* at display.
  Wordmark: Plex Sans medium lowercase now; eventual custom-drawn `weft` whose
  `t`-crossbar is the weft thread (ties wordmark to glyph).

- **D5 — Keep the color anchor (the user is happy with it, and it is correct).**
  Warm linen + ink, light-only, one pigment per member. It already does the
  position's heaviest lifting (anti-convergence, federation-as-palette,
  honesty-as-flatness). **Do not flex.** **Reverse only if** the suite adopts a
  surface where a warm light theme is unusable (e.g. a required dark embed) — and
  then as a scoped local inversion, never a second page theme.

---

## L2 brand layer (PROPOSED — owner ruling pending)

> **Honesty constraint on this whole section.** [PDR-0024](./pm/product/decisions/0024-the-fleet-is-the-customer-two-planes.md)
> is **CANDIDATE**, gated to a falsifier-test / dogfood proof before promotion;
> public L2 positioning is **owner-reserved** ([PDR-0023 §5](./pm/product/decisions/0023-federation-is-the-product-glue-is-the-value.md)).
> A brand built on the honesty invariant must be honest about its own maturity —
> **so this copy stays horizon/forward-framed and is not shipped present-tense
> until PDR-0024 is Adopted.** These are derived candidates, not locked canon.

**Position (L2).** *For:* an agent **fleet** working the same repos concurrently
— not one agent with a toolbox (the unit the L1 brand still implies). *Job:* give
the fleet (a) one honest **common operating picture** of the joined flood and
(b) a **deconfliction** surface so agents don't collide — both *built-on-able*.
*The ONE thing:* **"we are one crew operating from one honest picture — and I can
build the view I need on it."** *Rejects:* per-agent silos; synthesis that's
*greppable-away* (adds nothing a competent agent couldn't derive); confident-wrong
synthesis fed by a lying flood.

**The metaphor extends — two planes at the loom** (the loom = the L2 environment,
per the Horizon map):

| Loom act | L2 plane | Weft meaning |
|---|---|---|
| **reading the cloth** | sense-making | the **common operating picture** — the "so what" query over the honest flood |
| **no two shuttles in one shed** | coordination | **deconfliction** — the tag-out board; "two agents never edit the same tree blind" |
| **the fleet weaves its own views** | generativity | agents author their own macros + checks over blessed primitives |

**Proposed copy (candidates, not locked):**

- **L2 hero noun — `common operating picture`.** *Recommend adopt.* A borrowed
  C2 term for the single shared, trusted, authoritative picture a crew operates
  from. It is the natural noun for the suite's deepest framing — Weft is
  **deconfliction-first, not security**, and a common operating picture is *the
  deconfliction artifact.* The phrase is canon-aligned, not bolted on.
- **Platform / generativity line — "The hub owns the alphabet. Your agents write
  the words."** *Recommend adopt (it is already the PDR-0024 platform invariant,
  verbatim).* Captures platform + governance guardrail + the build-your-own
  promise in one line.
- **L2 honesty differentiator (the answer to "why not just grep") —**
  *"Honesty propagates through composition: a macro is only as honest as its
  weakest call — and the reason rides all the way up."* This is the moat against
  the greppable-away falsifier: custom synthesis you can trust because the
  `weft-reason` carrier propagates.
- **Coordination line —** *"Two agents never edit the same tree blind."*
  (Deconfliction in its purest form — PDR-0024.)
- **L2 headline (candidate) —** *"One honest operating picture for the whole
  fleet."*

**L2-OPEN-1 (owner ruling) — is "the loom" a named brand element?**
*Recommendation: **no.*** Keep *the loom* as the lowercase explanatory metaphor
and **Weft** as the only brand name; lock **`common operating picture`** as the
L2 hero noun instead. The suite already carries many proper nouns (six members +
Lacuna + the SEI + the seams); minting *"the Loom"* risks "is it a member?"
confusion and over-claims a CANDIDATE bet with a separate product name. **Reverse
if** L2 ever ships as a distinct hosted surface that genuinely needs its own
handle. *(Logged for owner ruling — this is an invariant/lineage decision.)*

**L2-OPEN-2 (gates promotion of this entire layer) — "platform" collides with the
federation axiom.** [doctrine.md §1](./doctrine.md) (current canon, updated
2026-06-15) states Weft is *"not a platform, not a shared runtime... nothing
called 'Weft' to install, deploy, or keep running."* The L2 frame is
platform-shaped: the *loom you build on*, a hosted tag-out board (in filigree),
an L2 synthesis MCP. **So the brand must not call Weft a "platform" or
"environment" present-tense until this is reconciled** — and naming the collision
rather than papering over it *is* the honest move (it is the deepest reason
PDR-0024 is CANDIDATE). The reconciliation to watch: **L2-as-convention** ("hub
owns the alphabet, agents write the words" = blessed primitives + agent
composition, documentation-shaped → axiom-compatible) **vs. L2-as-runtime** (a
board/MCP that must be *running* → strains "nothing to keep running"). Which one
L2 becomes is an owner/strategy call, **not** a brand call — but the brand layer
above cannot promote past Candidate until it lands.
