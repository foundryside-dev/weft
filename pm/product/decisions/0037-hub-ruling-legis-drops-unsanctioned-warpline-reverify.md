# PDR-0037 — Hub seam ruling: Legis drops the unsanctioned Warpline reverify_worklist consumption (keep impact_radius)

**Date:** 2026-06-27 · **Status:** **accepted** (PM hub seam call, within grant) · **Class:** seam ruling (hub blesses every seam) · **Tracking:** `weft-5cbe6bc11b`.

## Context

Legis's advisory preflight (`legis/src/legis/service/preflight.py`) calls **both** `warpline_impact_radius_get` **and** `warpline_reverify_worklist_get`. The frozen interface-lock §4A sanctions Legis as a consumer of `impact_radius` **only**; §2A names **Filigree** — not Legis — as the `warpline.reverify_worklist.v1` consumer. So Legis reading reverify is **unsanctioned**. Legis deliberately built the client so the reverify half is independently keep-or-drop, pending a ruling. The wardline-steward dispatch posed the crux: *"what does `data.items` (worklist) give Legis that `data.affected` (impact set) doesn't?"*

## Options

(a) **Bless** legis-consumes-reverify as a new proven-need seam (add a §4 entry, name the need + GV obligations).
(b) **Drop** the reverify half — Legis relies on `impact_radius` alone; remove the call + the client method (a clean, isolated removal already designed for).

## Decision

**(b) DROP.** Per **prove-the-need** doctrine, the burden is on Legis to name a concrete need for the worklist over the impact set on a purely-advisory path that **never reaches a governance verdict** — and Legis named none. Under a **smooth-the-seams / fill-missed-stitches** bid (PDR-0035), blessing a *new unsanctioned consumer of a frozen contract* **adds** seam surface; dropping the unproven half **reduces** wobble. Keep the sanctioned `impact_radius` read (GV-LG-3 conformant). Doctrine and the bid point the same way.

**Independent corroboration:** the wardline seam-conformance program reached the *same* answer unprompted ("reverify RULED OUT → legis drops it"). The substance is now doubly-grounded; this PDR records it as the **hub** ruling (the wardline *dispatch* of it is the stewardship overreach corrected in PDR-0038).

## What this does NOT do

It does not touch `impact_radius` (sanctioned, conformant), does not freeze any new sibling obligation, and does not by itself remove the code — the clean removal (`preflight.py` reverify call + `WarplineMcpClient.reverify_worklist`) is the tracked follow-through (`weft-5cbe6bc11b`).

## Reversal / decision trigger

Reopen as a **bless** (option a) only if Legis later demonstrates a concrete advisory-preflight need that `data.affected` cannot serve — at which point it freezes hub-side first (a new §4 entry + golden vector), never bilaterally.

## Provenance

PM hub seam ruling, session 2026-06-27. Grounded in the interface-lock §4A/§2A + the prove-the-need / reserve-shape-for-speculative doctrine. Filed as `weft-5cbe6bc11b`.
