# Weft — public website information architecture

**Status:** design pass — IA and per-page content plan only. No code, no HTML, no
CSS, no Astro. This document is the buildable spec a maintainer (or a future
implementation agent) fills in.

**Locked decisions (do not relitigate — given as inputs to this pass):**

- **Site model:** ONE master site (`weft`) with the subordinate systems as
  **sections** under it. Single nav, one shared design, one suite narrative. Not
  hub-and-spoke; not independent per-tool sites.
- **Build target (future):** **Astro**, reusing the **Weft Design System**
  (the React primitives mount as Astro islands). Not built in this pass.
- **Pages in scope (7 standalone):** the Weft hub/landing + 5 member sites
  (Loomweave, Filigree, Wardline, Legis, Warpline) + Lacuna (the demo specimen).
- **Charter:** appears only as a 6th thread on the hub **roster** (to match the
  design system), with **no standalone site this pass** — its federation adapters
  are still planned. Tracked in §6 as deferred.

> **Hosting model — REVISED by the owner (this revision).** The original framing
> read as "one master site with subordinate sections." It is now resolved as
> **GitHub Pages with one subdomain per app under `foundryside.dev`, each
> deploying from its own repo**, unified by the **shared design system + a shared
> site-kit** rather than by being one codebase. "One suite, single nav, shared
> design" holds — it is delivered by shared *dependencies* across repos, not by a
> single deployment. §1 and §2 are rewritten accordingly; §6 records what this
> changes (notably: Warpline's site is now hard-blocked on a docs set).

**Brand source of truth:** the Weft Design System
(`weft-design-system/project/`). Its `readme.md` §2 (voice), §3 (visual
foundations), §4 (iconography), the `ui_kits/weft-federation` kit, the
`ui_kits/filigree-dashboard` kit, the `components/data/*` signature vocabulary,
and `tokens/colors.css` are load-bearing for everything below. **Voice rules are
non-negotiable** and all sample copy in this document is written in that voice
(honest to a fault, precise/technical/lowercase-comfortable, second-person to
humans *and* agents, dry, no hype, no emoji, machine facts in mono).

**Substance source of truth:** the hub repo (`~/weft`) — `README.md`,
`doctrine.md`, `federation-map.md`, `products/*.md` (authored cheat-sheet copy,
reused below), `members/*.md`. Per the hub's own authority model, **the website
points to each repo for that repo's surface facts** (versions, tool counts, rule
lists) and never restates a moving number without a pointer. The site owns the
interop layer (roster, axiom, matrix, SEI spine); it borrows everything else.

---

## 1 · Site model & routing

### 1.1 The shape

**Many sites, one suite.** This is *not* one deployment with subpaths. It is a
**subdomain per app under `foundryside.dev`**, each deploying from its OWN repo
via GitHub Pages. A hub subdomain carries the federation narrative; each member
(and the demo) is its own full site at its own subdomain. What makes them read as
**one suite is the shared design system** — not a shared codebase. Each repo
pulls the Weft Design System in as a dependency and the member-page template
(§5.1) as a shared spec, so seven independently-deployed sites look and behave as
one.

Each member subdomain is that member's **full site — landing *and* docs**, not a
thin landing that links out. The hub stays **orientation-only** (roster, matrix,
SEI spine, doctrine framing) and links out to the subdomains. A visitor
evaluating one tool lands on its subdomain and may never see the hub; a visitor
evaluating the suite reads the hub and fans out across subdomains.

### 1.2 Subdomain map (replaces the flat route tree)

```text
weft.foundryside.dev        hub — roster, combination matrix, SEI spine, doctrine
                            orientation. Deploys from the `weft` repo.
loomweave.foundryside.dev   Loomweave — Rust · indigo · structure + SEI authority.
                            From the loomweave repo.
filigree.foundryside.dev    Filigree — Python · brass · work-state (incl. the
                            dashboard feature). From the filigree repo.
wardline.foundryside.dev    Wardline — Python · madder · trust-boundary / taint.
                            From the wardline repo (its existing docs site MOVES
                            here / becomes this).
legis.foundryside.dev       Legis — Python · walnut · git/CI governance.
                            From the legis repo.
warpline.foundryside.dev    Warpline — Python · copper · temporal / change-impact.
                            From the warpline repo. BLOCKED on a docs set (§6).
lacuna.foundryside.dev      Lacuna showcase — the demo specimen (see-it-all-work).
                            From the lacuna repo.
```

Out of scope this pass (subdomain reserved, no site built):

```text
charter.foundryside.dev     DEFERRED — appears only as a roster thread on the hub;
                            federation adapters still planned (§6).
```

Each subdomain is its **own site root** (`/`). A member's internal pages — docs,
CLI/MCP reference, deep guides — live under *that subdomain's own paths*
(`wardline.foundryside.dev/reference`, etc.), owned by that member's repo. The
hub does not host member docs; it points. URLs read as product URLs
(`wardline.foundryside.dev`), which is the point.

### 1.3 Mapping to Astro — one project per repo, unified by shared packages

This is **not** one Astro project with content collections driving every member.
It is **one Astro project per repo**, each deploying to its own subdomain. The
design system and the member-page template are the shared dependencies that keep
seven independent builds visually one suite:

- **Per-repo Astro project.** The `weft` repo builds the hub; each member repo
  builds its own site. Astro config per repo: `site:
  'https://{member}.foundryside.dev'`, `base: '/'` (each is a domain root, so no
  base-path gymnastics — the subpath problem the old single-domain model created
  is gone).
- **Shared design system as a dependency.** Each repo pulls the Weft Design System
  in (a package / git submodule / pinned vendored copy — owner's call, §6) and
  links its `styles.css` + mounts the React primitives as Astro islands. This is
  the single source of visual truth across all seven sites.
- **Shared member-page template (your §5.1) as a reusable spec/package.** Rather
  than one `[member].astro` route in one project, the template becomes a shared
  Astro component package (e.g. `@weft/site-kit` — name TBD) each member repo
  imports and fills with its own data. That is what keeps Loomweave's site and
  Wardline's site structurally identical though they live in different repos and
  deploy independently.
- **Shared federation data must be replicated or published.** The roster, the
  matrix, the thread-color map, and the SEI-spine copy (§3) can no longer live in
  *one* `src/data/federation.ts` that every page imports — the sites are separate
  builds. Options: (a) publish it in the shared `@weft/site-kit` package so every
  repo gets the same `ROSTER`/`MATRIX`/`SEI_SPINE` data; (b) vendor a generated
  copy into each repo from the `weft` repo (the interop-layer owner) at build
  time. **Recommended (a)** — the matrix is interop-layer canon, and the design
  system already plays the "shared dependency" role; co-locating the federation
  data with the shared kit keeps "what the hub says about Wardline" and "what
  `wardline.foundryside.dev` says" from drifting. Flag in §6.

**Working assumption (confirm, not a blocker):** each member's website lives in
that member's *own* repo and deploys via GitHub Pages + a per-repo `CNAME` file;
the design system + site-kit are shared packages those repos depend on. If the
owner would rather build all seven sites from a monorepo and deploy each to its
subdomain, the per-page template and shared-data story are unchanged — only the
repo layout differs.

### 1.4 Hosting & deploy — RESOLVED

The domain question is resolved: **GitHub Pages, one subdomain per app under
`foundryside.dev`, each deploying from its own repo** (the map in §1.2). Deploy
shape:

- **Per-repo GitHub Pages.** Each repo (`weft`, `loomweave`, `filigree`,
  `wardline`, `legis`, `warpline`, `lacuna`) enables GitHub Pages and ships a
  `CNAME` file naming its subdomain (`weft.foundryside.dev`,
  `loomweave.foundryside.dev`, …).
- **DNS.** A `CNAME` DNS record per subdomain pointing at the GitHub Pages target
  (`foundryside-dev.github.io`), plus GitHub's per-subdomain custom-domain +
  HTTPS verification. (DNS lives wherever `foundryside.dev` is managed — owner's
  infra, §6.)
- **Astro per repo:** `site: 'https://{member}.foundryside.dev'`, `base: '/'`.
  No shared base path; internal links are root-relative within a subdomain,
  absolute cross-subdomain (§2).
- **Wardline's existing docs site moves here.** Wardline already ships
  `foundryside-dev.github.io/wardline/`; under this model that content **becomes**
  `wardline.foundryside.dev` (the member subdomain *is* the docs home — see §2.3,
  §5.1). It is no longer "a marketing page that links out to repo docs"; it is the
  full site, landing + docs, for that member. The earlier "orient + link out"
  recommendation is withdrawn for the member subdomains and now applies only to
  the **hub** (the hub orients and links out to the subdomains).

---

## 2 · Global navigation & cross-linking model

This section answers the core question directly: **how the pages link together.**

### 2.1 Top navigation (every page)

Sticky header, 60px, hairline bottom border, linen at 85% with an 8px backdrop
blur — exactly the `weft-federation` kit's `Nav`. Left to right:

- **Brand** — `weft-glyph.svg` (indigo) + the wordmark `weft` (Space Grotesk,
  lowercase, `-0.02em`). Links to the **hub** (`https://weft.foundryside.dev/`) —
  not to the local `/`, since each member site is its own root.
- **Primary nav** — a **Tools** affordance and three doc anchors:
  - `Tools ▾` — a dropdown listing the five members + Lacuna, each as a
    `MemberMark` (thread-color dot + mono name) linking to that member's
    **subdomain** (`https://{member}.foundryside.dev`). This is the suite
    switcher; it is how a visitor on `legis.foundryside.dev` jumps to
    `wardline.foundryside.dev`. (Each jump is a full cross-subdomain navigation —
    see §2.6 — fine for this content.)
  - `Doctrine` — links to the hub's doctrine/axiom block
    (`https://weft.foundryside.dev/#doctrine`).
  - `Matrix` — links to the combination matrix
    (`https://weft.foundryside.dev/#matrix`).
  - `Lacuna` — the "see it work" link → `https://lacuna.foundryside.dev`.
- **Right cluster** — `MIT · foundryside-dev` in faint mono, and a secondary
  `GitHub` button (Lucide `github`, links to that site's own repo).

The nav is identical across all seven sites because it ships in the shared
site-kit (§1.3), not because they share a deployment. The only per-site change is
the active-state: on a member subdomain, that member's `MemberMark` in the
`Tools` menu reads active (use `:has()`/`aria-current`, not JS). Cross-subdomain
nav targets are **absolute URLs**; the within-site anchors (the hub's own
`#doctrine`/`#matrix`) are root-relative on the hub and absolute when referenced
from a member site.

No theme toggle is specified by the design system (the brand is a single warm
linen light theme — "paper on a table"). Do **not** add a dark-mode toggle unless
the owner asks; it is not in the brand. (Terminal/well surfaces invert locally to
`--loom-950`; that is not a page theme.)

### 2.2 The cross-link spine: the combination matrix

**The combination matrix is the cross-link spine of the whole suite.** It is the
single most important structural decision here, and it does double duty now that
the suite is many sites rather than one: the matrix is what *binds the
subdomains together*. The federation's entire value proposition is "each pair
lights up a capability neither tool has alone" — so the pairings are not a
hub-only feature; **every member site surfaces its own pairings**, and each
pairing links **cross-subdomain** to the partner's site
(`https://{partner}.foundryside.dev`).

Concretely, from `federation-map.md` the live/partial pairings are:

| Pair | Capability | Status |
|---|---|---|
| Wardline + Loomweave | structure + trust posture in one view — the dossier | live |
| Wardline + Filigree | findings become tracked work | live (A-1 asterisk) |
| Loomweave + Filigree | issues bound to live code, surviving refactors | partial |
| Wardline + Legis | agent-defined policy enforced at the CI/git boundary | live |
| Loomweave + Legis | governance attestations keyed to stable code identity | live |
| Filigree + Legis | governed issue lifecycle — sign-offs, RTM, verification | live |
| Warpline + Loomweave | "now" + "over time" — change history keyed on the SEI spine | seam frozen, impl fast-follow |
| Warpline + Filigree | re-verification worklist becomes tracked work | live (Filigree consumer shipped) |

On a member site, the **"How it composes"** block renders only the rows that
include that member, as cards. Each card: `MemberMark(self) + MemberMark(partner)`,
a one-line capability, a `Badge` (live / partial / planned), and the partner's
`MemberMark` is an **absolute cross-subdomain link** to
`https://{partner}.foundryside.dev`. So:

- `wardline.foundryside.dev` shows its four pairings (Loomweave, Filigree, Legis,
  + the planned Warpline risk-enrichment seam), each linking to that partner's
  subdomain.
- `warpline.foundryside.dev` shows its pairings honestly: Filigree (live —
  consumer shipped in Filigree 3.0.0), Loomweave/Wardline/Legis (seam frozen,
  **implementation fast-follow** — labelled `planned`, never `live`).

This makes the matrix navigable from anywhere: a reader on any member site is one
click from each tool it works with, and the *status* of each link is honest on
its face (a `partial`/`planned` pairing never renders as `live`). The hub's
`/#matrix` is the full grid; the member sites are the per-member slices of it.
Because every site's matrix slice is generated from the same shared federation
data (§1.3), the slices and the hub's grid stay consistent across repos.

### 2.3 Hub ↔ member ↔ member link rules

All hub↔member and member↔member links are now **absolute cross-subdomain URLs**
(`https://{member}.foundryside.dev`); only links *within* a single subdomain are
root-relative.

- **Hub → member:** the roster (§3.1) — every thread is a card linking to its
  member **subdomain**. Charter's card is present (6th thread) but **not a link**
  (rendered with a `planned` badge, cursor-default; §6).
- **Member → hub:** breadcrumb / suite affordance (§2.4) returns to
  `https://weft.foundryside.dev/`; the SEI-spine block and the axiom line on each
  member site link to `https://weft.foundryside.dev/#spine` and `…/#doctrine` for
  the federation framing (members own usage + their own docs; the hub owns
  federation patterns — mirrors the repos' authority split).
- **Member → member:** *only* through the pairing cards (§2.2) and the `Tools`
  nav dropdown, each an absolute subdomain link. No free-floating "see also"
  lists — the matrix is the sanctioned cross-link channel, which keeps the link
  graph honest (you can only link to a tool you actually compose with) and
  prevents navigation chaos across the subdomains.
- **Member → Lacuna:** each member site's closing CTA includes "see it run
  against the specimen" → `https://lacuna.foundryside.dev` (the
  proof-of-composition path).
- **Lacuna → members:** the showcase site links to every member subdomain it
  exercises.
- **Everything → repo:** every site's "Pointers"/links block points to the
  authoritative repo (`github.com/foundryside-dev/<member>`) and the in-repo
  briefing/cheat-sheet. Cross-subdomain links and repo links alike open per their
  context; external/repo links carry `rel="noopener"`.

### 2.4 Breadcrumb / suite affordance

Member and showcase sites carry a lightweight breadcrumb under the nav:
`weft → wardline` where `weft` links the hub (`https://weft.foundryside.dev/`).
Rendered as mono with the running-stitch separator feel from the brand (a `·` or
`→` in faint ink). On the hub it is absent (you are home). This is the "you are on
one app within the Weft suite" signal — the cross-subdomain analogue of a
section breadcrumb; it is the affordance that tells a visitor on
`wardline.foundryside.dev` that there is a hub and a way back to it.

### 2.5 Footer (every site)

The `weft-federation` kit footer, verbatim pattern (shipped in the shared
site-kit so every subdomain renders it identically): glyph + `weft · enrich-only,
never load-bearing` on the left; `MIT © 2026 John Morrissey · documentation only`
on the right, faint mono. Add a compact link row above it: the six roster members
(MemberMarks, absolute subdomain links) + Lacuna + GitHub + Doctrine. The footer
is the secondary suite nav and the honesty signature in one ("documentation
only" — there is nothing called weft to install).

### 2.6 Cross-subdomain navigation note

Because the suite is now many origins rather than one SPA, every member↔member
and hub↔member jump is a **full cross-subdomain navigation** (a fresh document
load, not client-side routing). This is acceptable and even appropriate for this
content — these are orientation/landing/docs pages, not an app; there is no
shared client state to preserve, and a full load makes the "you have moved to a
different tool's site" boundary honest. Two practical consequences for the build:
(a) no assumption of in-memory SPA state surviving a jump; (b) the shared design
system + site-kit must be a dependency of *every* repo so the nav, footer, and
matrix cards render identically on both sides of every jump.

---

## 3 · Shared / cross-cutting elements (defined once, reused everywhere)

These are authored once (in the shared `@weft/site-kit` package + the design
system, §1.3) and composed into every site. They are the reason seven
independently-deployed subdomains read as one suite.

### 3.1 The roster (6 threads, incl. Charter)

**Source:** the shared `ROSTER` data (`@weft/site-kit`), mirroring the design
system's roster table and `tokens/colors.css --member-*`. Six threads, in this
order:

| Key | Name | Lang | Thread color (token) | Domain authority |
|---|---|---|---|---|
| `loomweave` | Loomweave | Rust | indigo (`--member-loomweave`) | code structure + identity authority (SEI) |
| `filigree` | Filigree | Python | brass (`--member-filigree`) | work state / issue lifecycle |
| `wardline` | Wardline | Python | madder (`--member-wardline`) | trust-boundary / taint analysis |
| `legis` | Legis | Python | walnut (`--member-legis`) | git/CI governance & attestations |
| `warpline` | Warpline | Python | copper (`--member-warpline`) | temporal / change-impact |
| `charter` | Charter | Python | woad (`--member-charter`) | requirements, traceability, verification **(planned)** |

Rendered as the kit's `Roster` section: a 3-column grid of flat paper cards, each
with a 4px thread-color top stripe, a `MemberMark`, a `Tag` (lang), a `Badge`
(domain), and one line of copy. Five cards link to their pages; Charter's carries
a `planned` badge and does not link.

> **Drift note for the implementer:** the authored product cheat-sheets
> (`products/*.md`) describe thread colors as "Aqua / Sky / Coral / Violet" in
> their eyebrow blockquotes. Those are **stale**. The design system
> (`tokens/colors.css`, brand source of truth) is **indigo / brass / madder /
> walnut / copper / woad**. Use the design-system colors. Flag the product-page
> eyebrows for correction in the repo (§6).

### 3.2 The combination matrix

**Source:** the shared `MATRIX` data (published in `@weft/site-kit`, §1.3; the
table in §2.2). The full grid renders on the hub at
`weft.foundryside.dev/#matrix` (the kit's `Matrix` section: a 2-column grid of
pairing cards + the higher-order `Banner`). Per-member slices render on each
member site. One definition, two presentations. Honest status (`live` /
`partial` / `planned`) is intrinsic to each row and never recolored to look
complete.

### 3.3 The SEI spine explainer

**Source:** the shared `SEI_SPINE` data (`@weft/site-kit`, §1.3) + the kit's
`Spine` section. The canonical "one durable identity; facts survive the rename"
block: an entity `SeiTag` (`loomweave:eid:…`) → arrow → a card of typed facts,
one `MemberMark` row per present peer. Full version on the hub at
`weft.foundryside.dev/#spine`; a condensed inline variant on each member site's
"identity" note (Loomweave's site owns the authoritative explanation since it
*mints* SEI; every other member's site states "keys its facts on SEI, treats it
as opaque, never mints it" and links to `weft.foundryside.dev/#spine`).

This is also where the brand's honesty mechanic lives visually: the
`EnrichmentChip` vocabulary — `present` (filled), `absent` (hollow dot),
`unavailable` (dashed), `stale` — so a dossier with a missing peer reads as
*explicitly missing*, never as a clean green state.

### 3.4 The dossier terminal (hero motif)

The kit's hero terminal (`weft dossier build_record` → a `SeiTag` + a row of
`EnrichmentChip`s) is the suite's signature visual. It appears full on the hub
hero and as a smaller, member-specific variant on each member hero (showing that
member's fact present and a sibling or two `present`/`absent`). It is the
one-glance proof of "typed facts from every present peer, freshness-honest."

### 3.5 Signature vocabulary components (where each is used)

These brand-defining components (`components/data/*`) are the visual vocabulary;
the content plan calls them by name so the build reuses them rather than
reinventing:

| Component | Renders | Used on |
|---|---|---|
| `SeiTag` | a `scheme:eid:` identity token, indigo mono chip | hub spine + hero; every member's identity note; Lacuna |
| `EnrichmentChip` | one enrichment slot (`present`/`absent`/`unavailable`/`stale`) | hub hero/spine; member dossier variants; Lacuna |
| `FreshnessMeter` | completeness bar + honest staleness line | Warpline (impact radius / churn), Loomweave (graph freshness), Lacuna |
| `ExitCode` | `0` clean / `1` gate tripped / `2` error chip | Wardline (its exit convention), Lacuna `make verify` block |
| `StateBadge` | Filigree workflow-state pill | Filigree page (its state machines); Lacuna tracked-work |
| `MemberMark` | thread-color dot + mono member name | everywhere — roster, matrix, pairings, nav, footer |

---

## 4 · Per-page content plan

Each page below gives: purpose, audience (primary/secondary), the ordered content
blocks, sample headline + key copy points **in the Weft voice**, and the
design-system component/kit pattern each block reuses. Copy is illustrative and
on-voice; the implementer should treat the *substance* as fixed (sourced from the
repo) and may tighten wording. **Machine facts are in mono; no emoji; no hype;
limits stated in the open; `absent` ≠ `present`.**

---

### 4.1 `/` — the Weft hub / landing

**Purpose:** tell the federation story and route to the members. The hub is
documentation that owns the interop layer; there is nothing called "weft" to
install, and the page says so plainly.
**Primary audience:** a dev team (or its coding agent) evaluating *the suite* —
"what is this collection and why is it one thing." **Secondary:** a member-builder
("I want to drop my own tool into this"), and an agent orienting.
**Kit:** `ui_kits/weft-federation/Site.jsx` — follow it section-for-section
(Nav → Hero → Roster → Spine → Matrix → Footer). This page *is* that kit, trued
to real copy.

Ordered blocks:

1. **Nav** (§2.1).
2. **Hero** — eyebrow `THE WEFT FEDERATION · DOCUMENTATION HUB` (UPPERCASE mono).
   Headline (kit verbatim, it is already on-voice):
   > **Small, sharp tools — woven on one identity.**
   Sub: "A federation of sibling developer tools, each authoritative for one
   domain, each useful standalone, each composable pairwise — and **enrich-only,
   never load-bearing** when composed." Two buttons: `Read the doctrine →`
   (`/#doctrine`), `Build a member →` (links to the repo's `federation-sdk.md`).
   The **dossier terminal** (§3.4) sits in the hero. *Honesty beat:* one chip is
   `absent` and one `unavailable` in the hero — the brand refuses to show an
   all-green dossier.
3. **Doctrine / axiom** (`#doctrine`) — a short block stating the one-sentence
   federation axiom verbatim and the "documentation only / nothing to install"
   fact. Copy point: "this hub owns the interop layer — the roster, the doctrine,
   the identity model, the matrix. It points to each repo for that repo's surface
   facts; it restates no moving number." `Banner tone="info"`.
4. **Roster** (§3.1) — eyebrow `THE ROSTER · SIX THREADS`. Headline: "Each member
   owns one domain, and one thread color." Six cards; five link out; Charter
   `planned`.
5. **Spine** (§3.3, `#spine`) — "One durable identity. Facts survive the rename."
   The SEI → typed-facts diagram. Copy point: "Loomweave mints a Stable Entity
   Identity for every function, class and module. Every other member keys its
   facts on that `SEI` — so a dossier stays correct when the code is refactored
   tomorrow."
6. **Matrix** (§3.2, `#matrix`) — eyebrow `THE COMBINATION MATRIX · VALUE IS THE
   WEAVE`. Headline: "Each pair lights up a capability neither tool has alone."
   Sub (on-voice, from the kit): "One non-conformant binding orphans every
   combination it participates in — so the matrix is also the conformance test."
   The full grid + the higher-order `Banner` ("all four closes the loop").
7. **Lacuna pointer** — a slim band before the footer: "Want to see it actually
   run? `make tour` against the **Lacuna** specimen →" linking
   `https://lacuna.foundryside.dev`.
8. **Footer** (§2.5).

> The hub's own `#doctrine` / `#spine` / `#matrix` anchors are *in-site* (the hub
> is one Astro site), so they stay root-relative on the hub; member sites
> reference them as absolute `weft.foundryside.dev/#…` URLs (§2.3).

---

### 4.2 Member-page template — applied to all five

All five member **sites** share **one template** (§5), shipped as the
`@weft/site-kit` page component and filled per repo. The five fills below give
each
page's specific copy and which blocks carry honest limits. Common block order:
**Hero → What it is → Key capabilities → Usage snapshot (CLI/MCP) → How it
composes (pairings) → Status & honest limits → Links/pointers → CTA.**

#### 4.2.1 `/loomweave` — Rust · indigo · structure + identity authority

**Purpose:** the structural-graph tool *and* the suite's identity authority — the
page that explains the SEI spine from the source.
**Primary audience:** an agent or dev who needs a queryable code graph instead of
grep; **secondary:** anyone wiring a cross-tool binding (this is where SEI is
minted).

- **Hero** — eyebrow `LOOMWEAVE · CODE STRUCTURE + IDENTITY AUTHORITY · RUST`.
  Headline: **"The federation's map — and its coordinate system."** Sub (from the
  cheat-sheet): "Turns a codebase into a queryable, identity-stable structural
  graph an agent reads instead of re-deriving by grep — and mints the `SEI` every
  other member keys on." Member dossier terminal showing a `loomweave:eid:` SeiTag
  `present`. `Tag` Rust, version snapshot (`v1.1.0-rc` — *snapshot; see repo*).
- **What it is** — entities (`functions`, `classes`, `modules`) + edges
  (`contains`, `calls`, `references`), served over CLI + MCP + a loopback HTTP
  read API. Deterministic, **no LLM needed**. Copy point: *"the now"* — Loomweave
  owns the current structural graph.
- **Key capabilities** — structural extraction; the one-shot
  `entity_orientation_pack_get` (≈ find + at + source + neighborhood + issues +
  freshness); SARIF import. A `FreshnessMeter` shows graph completeness/staleness
  honestly.
- **Usage snapshot** — the cheat-sheet's quick-start, in a terminal well:
  `loomweave install --path .` / `loomweave analyze` / `loomweave serve`, then the
  `entity_orientation_pack_get { sei | locator }` MCP call. Small command table
  (curated subset; "see the repo for the full surface").
- **How it composes** (§2.2 slice) — pairings with Filigree (entity⇄issue,
  drift-aware, `partial`), Wardline (taint facts enrich the graph, `live`), Legis
  (attestations keyed to SEI, `live`), Warpline ("now"+"over time", `planned`).
- **Status & honest limits** — **this page owns the authoritative SEI
  explanation** (§3.3). State plainly: SEI is **LOCKED** (interface frozen);
  remaining member backfills are conformance tasks. Loomweave↔Filigree is
  `partial` (drift-aware binding still maturing) — say so, don't round up.
- **Links/CTA** — repo, briefing, `sei-standard.md`; "see it on the specimen →
  `https://lacuna.foundryside.dev`".

#### 4.2.2 `/filigree` — Python · brass · work state · **the dashboard**

**Purpose:** the work-state tracker — and the **one member with a real web UI**,
which this page features.
**Primary audience:** agents coordinating work (race-free claims, ready queue) +
the human on the loop watching the board; **secondary:** anyone using the `weft`
HTTP transport generation.
**Special:** this site features the **Filigree dashboard** (`ui_kits/
filigree-dashboard`). It is the only member site with a product screenshot/embed.

- **Hero** — eyebrow `FILIGREE · WORK STATE / ISSUE LIFECYCLE · PYTHON`. Headline:
  **"Turns a swarm of stateless agents into a coordinated workforce."** Sub (from
  the cheat-sheet): "Owns issues, dependencies, and workflow state machines —
  giving an agent a **race-free claim**, a **dependency-aware ready queue**, and a
  **pre-computed orientation file**, so no two agents collide." Version snapshot
  `v3.0.0` (*shipped — see repo*).
- **What it is** — the federation's work-state surface; hosts the named `weft`
  HTTP generation siblings use as transport. `StateBadge` row shows the
  task/feature/bug state machines (`open` → `in_progress` → `reviewing` → `done`;
  the bug `verifying` hard-gate in brass).
- **The dashboard** (feature block, unique to this page) — a faithful crop of the
  `filigree-dashboard` kit: Kanban lanes (Ready / In progress / Review / Done),
  Graph v2 dependency view, Health, and the slide-in issue detail surfacing
  `SeiTag` + `EnrichmentChip` + `FreshnessMeter` + the bug hard-gate banner.
  Caption it honestly as the local-first dashboard on `localhost:8377`. Copy
  point: "the only Weft member with a GUI — everything else is CLI/MCP-first."
- **Key capabilities** — atomic `work_start` / `work_start_next`; the ready queue
  + critical path; `entity_association_add` (bind an issue to an opaque external
  entity id); ~118 MCP tools (*count is the repo's — pointer, not restated*).
- **Usage snapshot** — `filigree install` / `session-context` /
  `start-next-work --assignee me` / `close <id>`. Emphasize the atomic verbs and
  the anti-pattern note: "do not chain a separate `claim` with a status update —
  the two-step form races; the combined verb does not."
- **How it composes** (§2.2 slice) — Loomweave (`partial`), Wardline (findings →
  work, `live`, **A-1 asterisk** stated plainly), Legis (sign-offs, `live`),
  Warpline (worklist → work, `live` — consumer shipped in 3.0.0).
- **Status & honest limits** — A-1: the Wardline→Filigree native emitter has
  shipped, but the asterisk stays live until the Loomweave-absent path is proven
  end-to-end (currently only unit/server-wiring tier). Say this; don't imply the
  pair is fully proven.
- **Links/CTA** — repo (`docs/cli.md`, `docs/mcp.md`), briefing;
  `https://lacuna.foundryside.dev`.

#### 4.2.3 `/wardline` — Python · madder · trust-boundary / taint

**Purpose:** the static taint analyzer — and the page that teaches the brand's
honesty mechanic (silent until you decorate; `absent` ≠ clean).
**Primary audience:** a dev/agent hardening trust boundaries; **secondary:** a CI
owner wiring the gate.

- **Hero** — eyebrow `WARDLINE · TRUST-BOUNDARY ANALYSIS · PYTHON`. Headline:
  **"Is the data each trust-annotated function works with as trusted as it
  claims?"** Sub: "A semantic-tainting static analyzer with zero runtime
  dependencies. It propagates a taint lattice across the call graph and flags
  untrusted data reaching a trusted producer with no validation between."
  `ExitCode` chips in the hero: `0` clean · `1` gate tripped · `2` error.
  Version snapshot `v1.0.0rc`.
- **What it is** — silent until you decorate; configuration *is* the source plus
  the adjacent trust declarations. Copy point (on-voice honesty): "Wardline says
  nothing until you annotate a trust boundary. Silence is not a clean bill — it
  means you have not told it what to guard yet." Emitters: JSONL / SARIF / agent
  summaries / native Filigree / Legis artifacts.
- **Key capabilities** — the 8-state taint lattice (*states + decorator vocab +
  rule IDs `PY-WL-1xx` are Wardline's authority — pointer, not restated*);
  `scan` / `assure` (gate) / `attest` (signed bundle) / `dossier`.
- **Usage snapshot** — `wardline scan` / `assure` / `attest` / `dossier` in a
  terminal well; show the exit-code convention with `ExitCode`.
- **How it composes** (§2.2 slice) — Loomweave (taint facts enrich the graph,
  `live`), Filigree (findings → work, `live`/A-1), Legis (findings governed,
  `live`), Warpline risk-enrichment seam (`planned`).
- **Status & honest limits** — "exit 0 = clean, 1 = gate tripped, 2 = error" is a
  contract, state it. A-1 asterisk (its Filigree pairing). The
  deconfliction-not-security framing: Wardline analyses; it does not enforce —
  Legis governs. Do not let the page imply a security guarantee.
- **Note — Wardline's existing docs site MOVES here.** Wardline already ships
  `foundryside-dev.github.io/wardline/`. Under the resolved model (§1.4) that
  content **becomes `wardline.foundryside.dev`** — this is not a separate
  marketing page that links out to docs; this subdomain *is* the docs home. The
  deep CLI/MCP/rule reference lives under this subdomain's own paths
  (`wardline.foundryside.dev/reference`, …), owned by the wardline repo.
- **Links/CTA** — repo (`scanner/rules/`, `core/taints.py`);
  `https://lacuna.foundryside.dev` (Lacuna seeds `PY-WL-101..126` for exactly
  this).

#### 4.2.4 `/legis` — Python · walnut · git/CI governance

**Purpose:** the governance/attestation surface — and the page that states, in
the open, that it is a discipline, not a hardened security boundary.
**Primary audience:** an agent operating at the git/CI boundary + the human who
must answer for overrides; **secondary:** anyone needing tamper-evident,
SEI-keyed audit records.

- **Hero** — eyebrow `LEGIS · GIT/CI GOVERNANCE & ATTESTATIONS · PYTHON`.
  Headline: **"One attributable, tamper-evident record — instead of a silent
  pass."** Sub: "Every agent action at the git/CI boundary that breaks a policy
  produces exactly one identity-stable audit record — and Legis grades *who must
  answer* (self-record / LLM-judge / human sign-off) **server-side**, so the agent
  never chooses how cheaply it clears a gate." Version `v1.0.0`.
- **What it is** — verdicts `CLEAR` / `VIOLATION` / `UNKNOWN` with an honest
  `provenance_gap`; the 2×2 enforcement cells (`chill` / `coached` / `structured`
  / `protected`); HMAC-signed protected verdicts; the SEI-keyed sign-off ledger.
  Render the 2×2 as a small grid (walnut). *"The one judge."*
- **The honesty block (load-bearing for this page)** — a `Banner` quoting the
  brand's own line: **"a 'forced me to do the right thing' discipline, not a
  hardened security boundary."** This is the canonical example of the voice; it
  belongs prominently on Legis's page, not buried.
- **Key capabilities** — `policy_evaluate` / `policy_explain` / the unified
  `override_submit` (one verb routes all four cells; `NEED_INPUTS` returns as a
  guided non-error, not a failure) / `signoff_status_get` / `git_rename_feed_get`.
- **Usage snapshot** — `legis serve` / `legis mcp --agent-id <id>`, then the MCP
  verb block. Note Legis runs as a service; agents drive it over MCP/HTTP.
- **How it composes** (§2.2 slice) — Loomweave (consumes `resolve_sei`/`lineage`,
  supplies the git-rename seam, `live`), Filigree (SEI-keyed sign-offs, `live`),
  Wardline (findings governed, `live`), Charter preflight facts (`planned`).
- **Status & honest limits** — consumer of identity, **never** an authority; never
  re-adjudicates trust ("Wardline analyses, Legis governs"); a verdict resolves
  with `identity_stable: false` honestly flagged when a sibling is absent. The
  rename-seam is jointly gated on Loomweave driving a committed rev-range — say so.
- **Links/CTA** — repo (`src/legis/mcp.py`, `CHANGELOG.md`), briefing,
  `sei-standard.md`; `https://lacuna.foundryside.dev`.

#### 4.2.5 `/warpline` — Python · copper · temporal / change-impact

> **⛔ BLOCKED — `warpline.foundryside.dev` cannot be built yet (hard dependency,
> §6).** The warpline repo "was thrown together in a day" and lacks a real
> documentation set (no product/usage cheat-sheet, thin README, no published
> seam-contract or CLI/MCP reference). The content plan below is the **spec for
> the site once warpline has authored a docs set to parity with the other
> members** — not a green-light to build now. Until then, this subdomain is
> blocked, or ships as an honest stub (hero + "documentation in progress" +
> roster/matrix context only). See §6 for the concrete content gap.

**Purpose:** the temporal / change-impact authority — and the page that is most
scrupulously honest about *implementation status* (admitted member; consumers a
fast-follow).
**Primary audience:** an agent/dev asking "what changed, and what does this change
touch"; **secondary:** anyone building re-verification into a workflow.

- **Hero** — eyebrow `WARPLINE · TEMPORAL / CHANGE-IMPACT · PYTHON`. Headline:
  **"What changed, when — and what does this change touch."** Sub: "Per-entity
  change history keyed on the `SEI` spine, dated edge snapshots, downstream
  blast-radius, and the re-verification worklist. Loomweave owns the *now*;
  Warpline owns *over time*. Advisory only — it never gates." Version `v1.0.0`.
- **What it is** — owns `change_events`, dated edge snapshots, downstream-affected
  queries, the re-verify worklist. Six frozen federation tools
  (`warpline_change_list`, `warpline_entity_timeline_get`,
  `warpline_entity_churn_count_get`, `warpline_impact_radius_get`,
  `warpline_reverify_worklist_get`, and the only mutating one
  `warpline_edge_snapshot_capture`). *Consumes SEI, never mints it.*
- **Key capabilities** — blast-radius / impact-radius rendered with a
  `FreshnessMeter` (the impact radius carries completeness + staleness honestly —
  *the entire point of the component*); the re-verification worklist as the
  consumed `warpline.reverify_worklist.v1` contract.
- **Usage snapshot** — CLI `warpline init`/`backfill`/`changed`/`timeline`/
  `blast-radius`/`reverify`/`capture_snapshot` in a terminal well; the six MCP
  tools.
- **How it composes** (§2.2 slice) — Filigree (`live` — `warpline_worklist_ingest`
  shipped in Filigree 3.0.0, the EARNED inbound seam); Loomweave / Wardline /
  Legis seams **FROZEN but implementation fast-follow** → `planned`, never `live`.
- **Status & honest limits (the most important block on this page)** — state it
  flatly: Warpline is the **5th admitted member (2026-06-14, PDR-0022)**; its
  seam *contracts* froze at the launch cutover, but its consumer *implementations*
  (Loomweave / Wardline / Legis) are an **admitted fast-follow OUTSIDE the
  four-member launch cutover**. Only the Filigree consumer has shipped. The page
  must not present the unshipped seams as working. Advisory facts never gate —
  Warpline does not enforce.
- **Links/CTA** — repo (`README.md`, `pyproject.toml`, `CHANGELOG.md`), briefing,
  the interface-lock doc; `https://lacuna.foundryside.dev`. (The repo's own docs
  set is the blocker — see the callout above and §6.)

---

### 4.3 `/lacuna` — the "see it all work together" showcase

**Purpose:** the evaluator path — the page a newcomer runs to *see the suite
work* end-to-end against one deliberately-flawed specimen. Not a member; the
showcase.
**Primary audience:** an evaluator deciding whether to adopt the suite ("show me,
don't tell me"); **secondary:** a contributor validating the matrix.
**Thread:** ash (`--member-lacuna`) — the "absent / specimen" color. Visually
distinct from the five member threads on purpose.

Ordered blocks:

1. **Hero** — eyebrow `LACUNA · THE DEMONSTRATION SPECIMEN`. Headline:
   **"A small app with catalogued flaws — so you can watch the whole federation
   analyze it at once."** Sub: "Lacuna's issues are intentional and permanent,
   baselined so the demo stays repeatable: catalogued issues pass, genuinely new
   violations fail. Removing a seeded issue *fails* `make verify`." Ash thread.
2. **What it is / why it exists** — seeded trust-boundary violations
   (`PY-WL-101..126` + the fail-closed `WLN-ENGINE-PARSE-ERROR` specimen),
   seeded structural findings for Loomweave (dead entity, circular import,
   duplicate locator, too-complex), tracked work in Filigree, Legis governance
   routing. Copy point: "it exists to *be analyzed*, not to do real work."
3. **The tour (the centerpiece)** — a terminal well showing the operator path:
   `make setup` / `make tour` / `make verify`, with an `ExitCode` `0` on a clean
   verify and the honest note that `make verify` records the Legis signing state
   only on a clean tree. This is the "run it yourself" block.
4. **The matrix, made runnable** — restate the combination matrix (§3.2) but
   *grounded in the specimen*: Wardline+Loomweave dossier reads, Wardline→Filigree
   findings-as-work, Loomweave+Filigree issues bound to SEI with drift detection,
   Legis governance over the live-core path. Each card links **cross-subdomain** to
   the member's site (`https://{member}.foundryside.dev`). Use `SeiTag` +
   `EnrichmentChip` + `StateBadge` to show a real dossier slice from the specimen —
   including an `absent`/`unavailable` peer, honestly.
5. **Honest scope** — Lacuna is **not** in the roster; it is the showcase. Charter
   is labelled `planned` here too (its integrations are pending). Note the
   complementary `elspeth` scale target (Loomweave's ~425k-LOC first-customer
   proof) — "Lacuna is the showcase; elspeth is the scale proof."
6. **Links/CTA** — repo (`README.md`, `docs/tour.md`, `docs/matrix.md`); back to
   each member subdomain; "read the doctrine →" `https://weft.foundryside.dev/#doctrine`.

---

## 5 · Page-type templates (abstracted)

### 5.1 Member-page template (drives all 5, across 5 repos)

The template is no longer one `[member].astro` route in one project — it is a
**shared Astro page component published in `@weft/site-kit`** (§1.3) that each
member repo imports, fills with its own data, and deploys to its own subdomain.
That shared component + the shared design system are what make five
independently-built sites structurally and visually identical. Block contract,
in order:

| # | Block | Purpose | Reuses | Per-member data |
|---|---|---|---|---|
| 0 | Nav + breadcrumb | global nav + `weft → <member>` (breadcrumb `weft` → `https://weft.foundryside.dev/`) | shared site-kit layout (§2.1, §2.4) | `name` |
| 1 | Hero | one-line "what this is", member dossier terminal | kit `Hero` variant; `MemberMark`, `SeiTag`, `EnrichmentChip` (+ `ExitCode` for Wardline) | `name`, `lang`, `thread`, `tagline`, `version`+pointer |
| 2 | What it is | first-principles job in 1–2 sentences | prose + `Banner` | from cheat-sheet "What it does" |
| 3 | Key capabilities | the 3–5 things it gives you | card grid; member-specific signature component (`FreshnessMeter`/`StateBadge`/`ExitCode`) | capabilities list |
| 4 | Usage snapshot | curated CLI/MCP quick-start (not reference) | terminal well + small command table; deep reference lives under this subdomain's own paths | from cheat-sheet quick-start |
| 5 | How it composes | this member's slice of the matrix | pairing cards (§2.2); `MemberMark` pairs + `Badge` status; **absolute cross-subdomain links** | `pairings[]` filtered from the shared `MATRIX` |
| 6 | Status & honest limits | versions (as snapshots+pointers), asterisks, what it cannot do | `Banner`, honest status badges | `honest_limits[]`, `version` |
| 7 | Links / pointers | repo, briefing, identity/integration docs | link list, `rel="noopener"` | `repo`, `briefing`, `cheatsheet` |
| 8 | CTA | "see it on the specimen" + "read the doctrine" | buttons | static → `https://lacuna.foundryside.dev`, `https://weft.foundryside.dev/#doctrine` |
| 9 | Footer | global footer + roster link row (subdomain links) | shared site-kit layout (§2.5) | — |

**Template invariants (enforce in review):**
- Every moving number (version, tool count, rule count) is a **snapshot with a
  repo pointer**, never a bare restated fact. Mono.
- Every pairing renders its true status; a `partial`/`planned` pair is never
  styled as `live`. The honest-limits block is **mandatory and non-empty** — a
  member page with no stated limit fails the brand (`absent` ≠ clean).
- Hero dossier shows at least one non-`present` enrichment state.
- Voice: lowercase mono for CLI/schema/exit-code/SEI; no emoji; no hype adjective.

### 5.2 Hub-page template (singleton)

The `weft-federation` kit, trued to real copy, built in the `weft` repo and
deployed to `weft.foundryside.dev`: Nav → Hero(+dossier) → Doctrine/axiom →
Roster(6) → Spine(SEI) → Matrix(full grid + higher-order Banner) → Lacuna pointer
→ Footer. Roster + Matrix + Spine read from the shared `@weft/site-kit` data
(§1.3); since the hub is the interop-layer owner, the `weft` repo is the natural
home for that shared data even if it is published as a package the members
consume.

### 5.3 Showcase-page template (Lacuna; singleton, own template)

Hero(ash) → What/why (seeded issues) → The tour (terminal, `make` targets,
`ExitCode`) → Matrix-made-runnable (specimen-grounded pairing cards) → Honest
scope (not-a-member, Charter planned, elspeth) → Links/CTA → Footer. Distinct
from the member template because Lacuna is analyzed *by* the suite, not a member
*of* it — its "composes" block is the whole matrix grounded in one project.

---

## 6 · Open questions & caveats

**Hard blocking dependency — resolve before the Warpline site can be built:**

1. **🚫 Warpline lacks a documentation set (BLOCKS `warpline.foundryside.dev`).**
   The warpline repo "was thrown together in a day": it has a thin README and no
   real docs. Every other member has the source material a full site is built
   from — and warpline is missing all of it. Concretely, to reach parity the
   warpline repo must author:
   - **A product/usage cheat-sheet** — every other member has one
     (`products/loomweave.md`, `products/filigree.md`, `products/wardline.md`,
     `products/legis.md`); `products/warpline.md` **does not exist**
     (`products/index.md` itself says it is "pending"). This is the primary source
     for the site's "What it is / Key capabilities / Usage snapshot" blocks.
   - **README depth** to the standard of the others (the others carry a
     first-principles "what it does", a quick-start, a composition section, and a
     curated command/MCP table; warpline's is thin).
   - **Published federation-seam contracts** — the four seams (Loomweave / Filigree
     / Wardline / Legis) are frozen in the hub's interface-lock doc, but warpline's
     *own repo* does not document them to the standard the other members document
     their integrations.
   - **A CLI / MCP reference** for the deep pages that live under the subdomain
     (the seven CLI verbs + six frozen MCP tools), at parity with what
     `loomweave`/`filigree`/`wardline`/`legis` repos publish.

   Until that docs set exists in the warpline repo, `warpline.foundryside.dev` is
   **blocked** or ships as an **honest stub** (hero + a plain "documentation in
   progress" `Banner` + roster/matrix context only — never faked depth). The
   `/warpline` content plan in §4.2.5 is the spec to fill *once the docs land*,
   not a green-light to build from the thin README. **This is the gating item for
   a complete suite launch of the websites.**

**Resolved (was an open question, now decided by the owner):**

2. **Hosting / domain — RESOLVED (§1.2, §1.4).** GitHub Pages, **one subdomain per
   app under `foundryside.dev`**, each deploying from its own repo (CNAME per
   repo + DNS CNAME records to `foundryside-dev.github.io`). No single-domain
   subpath model; no Astro `base` gymnastics (every site is a domain root). The
   earlier "pick a domain / base path" question is closed.
3. **Existing per-repo docs sites — RESOLVED (§1.4, §4.2.3).** Wardline's existing
   `foundryside-dev.github.io/wardline/` **becomes `wardline.foundryside.dev`** —
   the member subdomain *is* the docs home (landing + docs), not a marketing page
   that links out. The "orient + link out" posture now applies **only to the hub**
   (`weft.foundryside.dev` orients and links out to the subdomains). Any other
   member with its own docs site folds in the same way.

**For the owner to confirm (working assumptions, not blockers):**

4. **Repo layout for the sites (§1.3).** Working assumption: each member's website
   lives in that member's own repo and deploys via GH Pages + a per-repo `CNAME`.
   Alternative: a monorepo building all seven and deploying each to its subdomain
   (template + shared-data story unchanged; only layout differs). Confirm.
5. **Shared design system + site-kit distribution (§1.3).** The design system and
   the member-page template/federation-data must be a shared dependency every repo
   pulls in (recommended: a published `@weft/site-kit` package + the design system
   package), so the nav/footer/matrix/roster render identically across subdomains
   and "what the hub says about Wardline" cannot drift from what
   `wardline.foundryside.dev` says. Confirm the distribution mechanism (published
   package vs git submodule vs build-time vendored copy).
6. **Charter deferral (locked, restated).** Charter appears as the **6th roster
   thread** on the hub (woad), with a `planned` badge and **no link / no site**
   this pass. `charter.foundryside.dev` is reserved. Revisit when its federation
   adapters ship (the substance — `members/charter.md`, `products/charter.md` —
   already exists, so the site is a fast add later).

**Design-system caveats to carry forward (from the DS `readme.md` §CAVEATS — the
whole visual identity is *proposed*, not sourced):**

5. **Logo & glyph are invented.** `assets/weft-glyph.svg` / `weft-logo.svg` are a
   geometric weave-mark *proposal*, not an approved logo. The site uses them as
   placeholders; swap on real assets.
6. **Fonts are CDN substitutes.** Space Grotesk + IBM Plex Sans + IBM Plex Mono
   via Google CDN. No real Weft webfaces were supplied. If the owner has real
   faces, self-host as `@font-face`.
7. **Palette is derived from the metaphor, not a sourced brand.** The
   indigo/madder/brass/woad/walnut/copper threads are a natural-dye reading. Easy
   to re-anchor if there is a real brand color.
8. **Icon set is a substitution.** Lucide via CDN; no house set. No emoji
   anywhere (brand rule, not just a default).
9. **The Filigree dashboard kit is recreated from the README, not the shipping
   UI.** Expect cosmetic divergence from the real `localhost:8377` dashboard.
   The `filigree.foundryside.dev` site should caption the embed as an
   *illustrative* recreation, or use a real screenshot if the owner can supply one
   (preferred — honesty).

**Drift found in the source material (flag for repo correction):**

10. **Thread-color names are stale in `products/*.md`.** The product cheat-sheet
    eyebrows say "Aqua / Sky / Coral / Violet thread"; the design system (brand
    source of truth) and `tokens/colors.css` are indigo / brass / madder / walnut
    / copper. The site uses the design-system colors. The product-page eyebrows
    should be corrected in the repo to match.

**Deferred / not designed this pass (intentionally):**

- Search (Pagefind) — not needed for the hub (orientation-only). The member
  subdomains now *are* docs homes (§1.1), so each may want its own per-subdomain
  Pagefind index when its docs tree grows — that is each member repo's call, not
  the hub's. No cross-subdomain federated search this pass.
- Versioned docs, changelog rendering, API reference generation — out of scope for
  the hub; they belong to each member subdomain (owned by that repo).
- Shuttle — a roadmap thought-bubble with no repo; not on the site at all (not
  even a roster thread), matching the design system and doctrine.
