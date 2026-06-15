# Weft — Go-to-Market Decision

**Status:** Decided (2026-06-05) · **Positioning headline updated 2026-06-15 (owner)** · **Owner:** PM · **Audience:** maintainers + the in-flight docs work

One-page record of *how Weft ships*. Captures four packaging decisions made
2026-06-05, with the **positioning headline recast 2026-06-15** (owner ruling — "one
seam supported by a suite of products"; see the headline section below). Supersedes the
membership/packaging assumptions in `README.md` and `federation-map.md` (both stale —
see "Corrections" below).

---

## Positioning headline (UPDATED — owner ruling 2026-06-15)

> **The positioning is "one seam supported by a suite of products."** The earlier
> "five separately-installable products behind one brand" framing is **DEAD** (owner,
> 2026-06-15). This executes PDR-0023 §5's reserved decision — *the headline is the
> spine.* The **seam** — the SEI identity spine + the honest, hub-blessed joins — is
> **the product / the hero**; the members are a **supporting, open-ended suite**.
> "Five" is a current-roster *snapshot*, never the identity: the suite is designed to
> grow (weft-the-app becomes a full-class member per [PDR-0024](./pm/product/decisions/0024-the-fleet-is-the-customer-two-planes.md);
> daughter members are coming — e.g. the wardline/loomweave custom-checks daughter —
> "at least two more"). The **packaging** decisions below (separate artifacts, one org,
> independent semver) are unchanged; only the *hero of the pitch* moved from the tools
> to the seam they share. See [doctrine.md](./doctrine.md) (PDR-0023 banner + §10/§11).

## Decision in one paragraph (packaging — unchanged)

The members ship as **separately-installable products** — not a monolith-with-plugins,
and not disconnected projects. Each tool stays its own repo + its own package (PyPI /
crates.io), installable and useful with zero siblings present. They are unified at the
*discovery and branding* layer (one GitHub org, one hub, one narrative, one
compatibility matrix) **and at the seam** (the shared SEI spine + the hub-blessed
joins), never as a shared *code* runtime. We make a **one-time coordinated Weft 1.0
launch**, then every tool versions independently from that point on. The positioning
hero is the **seam**; the separately-shippable tools are how that seam is delivered and
how the suite stays open-ended.

## Why — two axes, not one

The "single product vs separate products" question is two independent decisions:

- **Axis A — packaging/architecture: SETTLED by the federation axiom.** Each member is
  *solo-useful, enrich-only, never load-bearing*. A monolith-with-plugins would destroy
  that. Separate artifacts is a constraint, not a choice. **Not relitigated.** (Note: per
  PDR-0023, *enrich-only* is a per-seam **property** each binding must satisfy, not the
  positioning headline — the headline is the seam itself.)
- **Axis B — distribution/discovery/branding: the real question.** Today's failure mode
  is *fragmentation* (multiple repos, two orgs, no front door), not over-coupling. We
  unify the **front door and the seam**, not the code. The hero of that front door is the
  **one seam**; the supporting suite of separately-installable tools is open-ended and
  grows over time.

## The four decisions

| # | Decision | Choice | Consequence |
|---|----------|--------|-------------|
| 1 | **Org / brand** | **Consolidate into one `weft` GitHub org.** | Migrate `foundryside-dev/wardline` + the four `tachyon-beep/*` repos under one org. Set up redirects; update badges/CI/links. |
| 2 | **Suite version** | **One-time coordinated Weft 1.0 now → independent semver + compatibility matrix forever after.** | 1.0 = the **four-tool code-and-debug toolkit** (filigree, loomweave, wardline, legis), gated by **wardline (pre-1.0)** and legis (rc2→1.0). **Charter is not a 1.0 gate** — it joins on its own cadence. After 1.0, no monolithic release train; the "suite version" becomes a published tested-combination matrix. |
| 3 | **Hero front door** | **Per-tool PyPI / crates.io is primary; hub is a thin index.** | Invest in each tool's standalone install story (`pip install filigree`, `cargo install loomweave`, …). The hub narrates + routes; it is not the install path. |
| 4 | **Claude Code marketplace** | **Deferred, not dropped.** | A Weft plugin marketplace (mirroring the proven `~/skillpacks` `marketplace.json` pattern; filigree already ships a `filigree-workflow` skill) is a *post-1.0* distribution play, not a launch surface. |

## Members (authoritative — kill the stale lists)

**Weft 1.0 = a code-and-debug toolkit for agentic development** — the four tools
that form the build → debug → ship loop. Charter sits *upstream* of that loop
(it defines what must be true *before* code) and is forward-leaning, so it ships
on its own cadence and **does not gate 1.0**.

| Product | Lang | Owns | Launch state |
|---------|------|------|--------------|
| **filigree** | Python | Work state: issues, plans, observations, findings | 2.3 — shipped · *1.0 unit* |
| **loomweave** | Rust (+Py plugin) | Code identity + structural entity graph | 1.0 — shipped · *1.0 unit* |
| **wardline** | Python | Trust-boundary taint analysis → SARIF | pre-1.0 — **the 1.0 gate** · *1.0 unit* |
| **legis** | Python | Git/CI, governance, attestations | 1.0.0rc2 — *1.0 unit* |
| **charter** | Python | Requirements, traceability, verification evidence | early — **non-gating; joins on own cadence** |

**Current roster of record: see [doctrine.md](./doctrine.md)** (the suite *currently comprises* Loomweave, Filigree, Wardline, Legis, and Warpline; Charter is a planned integration). The roster is **open-ended by design** — a current-state snapshot, not the suite's identity (the seam is the identity). This section records the 2026-06-05 go-to-market decision.

**shuttle** = a **speculative roadmap thought-bubble** (transactional scoped change execution) — **no repo, displaceable by any better idea, not a committed member**, and not in scope for 1.0 (per [doctrine.md](./doctrine.md) roster canon; [conflict-register.md](./conflict-register.md) §B-7).

The forward roadmap (charter, then shuttle) extends Weft *up* into requirements
and *down* into change execution — bookending the code-and-debug core.

## Docs topology (steer for the in-flight doc work)

Follows directly from "separate packages, single front door":

- **One Weft hub** owns: the narrative, the *authoritative* member list (above),
  the federation/compatibility matrix, and the **pairwise composition recipes**.
- **Five per-tool doc sites** stay **solo-complete** — never assume a sibling is
  installed (mirrors enrich-only). filigree + wardline already have mkdocs sites.
- **One source of truth** for membership + contracts. Today three docs claim
  canon and disagree; collapse to one, vendor/transclude the rest.

## Corrections this doc makes to existing artifacts

- `README.md` / `federation-map.md` say "four products incl. **shuttle**."
  **Wrong.** The roster includes **legis + charter** (and, as of 2026-06-14,
  Warpline); shuttle is future. *(Count is a snapshot — the roster is open-ended;
  the identity is the seam, not a head-count.)*
- The three "canonical" docs (hub `README`, `federation-map`,
  `~/clarion/docs/suite/weft.md`) disagree on membership. **This is a
  go-to-market defect**, not a cosmetic one — a suite whose canon can't name its
  members can't be marketed as a suite. Fixing it is launch-blocking.

## Immediate next actions (launch-gating)

1. **Publish the authoritative member list** (above) and retire the shuttle-as-#4
   framing everywhere. *(Hand this section to the doc agent now to stop drift.)*
2. **Reconcile the three canon docs.** *Resolved 2026-06-06 ([conflict-register.md](./conflict-register.md) §B-6): canon is **split by domain** — doctrine.md owns roster/membership, SHIPPING.md owns release posture, contracts-index.md owns contracts; README / federation-map / compatibility become derived views that point to the domain owner. Not "one doc for everything" — that framing caused the fragmentation.*
3. **Drive wardline (and legis rc2) to 1.0** — these gate the coordinated launch. Charter is explicitly *not* on this path.
4. **Stand up the `weft` org** and migrate the five repos.
5. **Publish the v1.0 compatibility matrix** (which versions speak the `weft`
   HTTP generation, which pairwise integrations are live vs asterisked).

## Open risks

- **Coordinated-1.0 gate stalls the launch** if wardline slips. Mitigation: the
  launch is a *brand* moment over already-shipping tools; filigree/loomweave need
  not wait to keep releasing independently. Charter is descoped from the gate.
- **Org migration breaks inbound links / PyPI-to-repo URLs.** Mitigation: GitHub
  redirects + a badge/URL sweep before announcing.
- **Per-tool-first front door under-sells composition.** Mitigation: the hub's
  composition recipes carry the suite story the package pages won't.
