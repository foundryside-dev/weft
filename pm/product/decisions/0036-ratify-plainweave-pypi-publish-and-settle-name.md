# PDR-0036 — Ratify Plainweave's PyPI 1.0.0 publish after-the-fact + settle the public name "plainweave"

**Date:** 2026-06-28 · **Status:** **accepted** (owner-ratified in-session) · **Class:** outward-facing release (publish/name) — owner-reserved, **owner signed off** · **Tracking:** `members/plainweave.md` canon correction (TODO, held with the de-fuse); website deploy now unblocked.

## Context

Plainweave was admitted 2026-06-24 (PDR-0030); **publish / public-remote / final-name stayed owner-reserved**. But `plainweave` 1.0.0 went **live on public PyPI out-of-band** (verified `pypi.org/project/plainweave`, releases `['1.0.0']`) — a member loop (or out-of-band action) crossed the owner gate. The hub carried it as an escalation: ratify-after-the-fact or yank. `members/plainweave.md` still reads "not published."

## Options

1. **Ratify the live publish + settle the name** — bless the 1.0.0 fait accompli, confirm `plainweave` as the final name, correct the canon to match reality. (Also unblocks the website deploy: the gated `plainweave.foundryside.dev` links resolve once Plainweave is published.)
2. **Keep publish/name held** — first-class = canon + seams only; PyPI stays an open ratify-or-yank; deploy stays blocked.
3. **Yank** — pull 1.0.0 from PyPI, keep Plainweave pre-publish.

## Decision

**Option 1 — owner ratified** (AskUserQuestion, this session). The live 1.0.0 publish is **blessed after-the-fact**; **`plainweave` is the final public name** (the fait accompli partly settled the held name gate anyway). PM to correct the canon (`members/plainweave.md` "not published" → published 1.0.0) — authorized, but **held with the doctrine/registries de-fuse** (still uncommitted to avoid co-committing the held Tabard edits).

## What this does NOT do

It does **not** make the **public launch announcement** (a separate outward-facing act, still owner-reserved, not made), and it does **not** deploy the websites (owner-gated; this merely *unblocks* the publish-Plainweave-first precondition). It does not ratify any other member's out-of-band gate-crossing.

## Reversal / decision trigger

A publish ratification is effectively one-way (the package is public). **Reversal** only if Plainweave must be renamed or withdrawn for a legal/naming conflict — in which case the yank (option 3) returns to the table as a deliberate owner act, not a default.

## Provenance

Owner ratification, PM session 2026-06-28. Resolves the standing Plainweave-PyPI escalation (verified live 2026-06-26, plainweave PDR-012). Successor context to PDR-0030 (admission); the held canon de-fuse remains the open propagation tail.
