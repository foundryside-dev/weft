# PDR-0033 — Website program: Plainweave's site, the Charter→Plainweave web rename, and a deconfliction-not-security disclaimer on every site

**Date:** 2026-06-26 · **Status:** Accepted (owner-directed; built + committed, **not deployed**) · **Class:** website / brand convention + PDR-0030 web-propagation tail · **Tracking:** website epics `weft-95808bebcd` / `weft-22d98ff8ab`.

## Context

Plainweave had no member website — the owner named it "the last blocker for release." The suite runs 7+ Astro sites on the shared `@weft/site-kit`; Charter was still the 6th member in the shared registry and hardcoded across sibling pages. The owner directed: build Plainweave's site from the existing pattern, **and** ensure every site (members + hub) carries filigree's "not-for-X" deconfliction-not-security disclaimer concept (member-specific wording).

## Decision (owner-directed; executed via a throttled ultracode workflow, 13 agents)

1. **Built `~/plainweave/site`** — an Astro spoke site on `@weft/site-kit` (woad thread), `astro build` green. Honest dossier (no faked-live states), intent-coverage-as-floor beat, mandatory honest-limits, its own "Not a compliance or sign-off system" disclaimer.
2. **Charter→Plainweave across the shared `@weft/site-kit` registry** (roster, matrix, sei-spine, MemberMark, Nav, colors — woad kept; one historical breadcrumb). This **completes the `web/` propagation tail of PDR-0030**.
3. **Standing convention:** every site (filigree, loomweave, wardline, legis, warpline + the weft hub) carries a **member-specific deconfliction-not-security "not-for-X" disclaimer** (a `Banner`, filigree's pattern). The deconfliction-not-security posture is now explicit on every public surface.
4. Fixed Lacuna's stale "Charter still planned" identity (→ Plainweave, admitted/live-in-tour). De-named owner-gated **Tabard** from the Plainweave page (it pre-empted the announcement gate).

Committed across **8 repos** (weft site-kit + hub; plainweave; the 5 members; lacuna); **none deployed**.

## What this does NOT do

- **It deploys/publishes nothing.** Plainweave's public remote / PyPI / final name stay owner-reserved. The registry change added gated `plainweave.foundryside.dev` links to every site, so **no site may deploy until Plainweave is published** or the links ship broken. Push `weft` first (members vendor the kit from its `main`).
- It does not name Tabard publicly (held pending an owner call).

## Reversal trigger

The disclaimer convention reverses only if the suite's **deconfliction-not-security posture** changes — a vision-level change, owner-reserved. Per-site: if any member's disclaimer is found to overclaim, fix the wording (already caught + corrected the hub's "Legis only records and attests" overstatement — Legis *does* gate on graded policy).

## Escalations (owner-reserved)

- **Deploy gating** (above): publish Plainweave first; push weft first; **5 of 8 site commits landed on non-`main` branches** (plainweave `release/1.1.0`, wardline `release/consolidation`, filigree/warpline/lacuna feature branches) and must reach `main` before each deploys.
- **Tabard public naming** — restore on the Plainweave page, or keep de-named?

## Provenance

Owner-directed, PM session 2026-06-26. Throttled workflow (≤2 concurrent, per the shared-quota outage lesson). The content-honesty review agent silently failed (returned a placeholder) → compensated by a manual read of the Plainweave page + a hub-disclaimer accuracy fix. Builds on PDR-0030 (Plainweave admission), the deconfliction-not-security doctrine, and "the weave is the product" positioning.
