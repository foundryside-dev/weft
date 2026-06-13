# PDR-0021 — Heddle SEAM 4B rename feed: path-vs-locator ownership boundary

Date: 2026-06-13   Status: accepted   Author: PM (weft hub session)   Owner sign-off: yes (boundary resolution requested by owner)
Supersedes: n/a   Related: `weft-54192f9400` (heddle seam freeze), `weft-13df44db31` (preflight_impact v1.1.0), interface-lock §4B + §10/A1

## Context

The FROZEN heddle interface-lock (`pm/2026-06-13-heddle-interface-lock.md`) §4B
specified that legis's `git_rename_list` feed emits `[{old_locator, new_locator}]`
(matching loomweave's `GitRename`), so heddle's timelines stay stable across file
moves. Planning legis's side of the seam surfaced a contract-vs-reality gap, the
kind that only appears under adversarial real-sibling integration:

- legis structurally emits **path**-renames — `RenameEvidence{old_path, new_path,
  old_blob, new_blob}` (legis `surface.py:135-202`). Its own `models.py:35-37`
  disclaims symbol-level detection. legis is the git/CI/governance member, **not a
  code analyzer**.
- A *locator* (`python:function:file.py::fn`) requires qualname extraction. That
  derivation (`file_renames_to_locator_renames`, loomweave `sei_git.rs:47-52`)
  lives in loomweave-cli, off legis's charter.
- loomweave's rename sources (`ShellGitRenameSource`, `LegisGitRenameSource`,
  `sei_git.rs:75-294`) produce locator-renames ONLY as an analyze-time input to
  loomweave's own SEI minting; loomweave **emits no rename feed over MCP**.
- heddle's consumer (`siblings.py:122-162`) is a generic injectable with a raw-git
  fallback; there is no live heddle→legis wire. Proven-need is unmet.

## Options considered

- **B** — legis owns the qualname derivation and emits locator-renames per the
  contract as written. Off-charter; duplicates loomweave's analyzer; legis's own
  code disclaims the capability.
- **A** — legis emits its native path-renames; the path→locator derivation is owned
  downstream (loomweave). Keeps legis on-charter.
- **C** — legis is not heddle's rename supplier at all; loomweave (which already
  derives) is the source via a new MCP feed.

Resolved by an expert panel (api-architect → C, product-decision-critic → A) plus a
loomweave HX1 source-check. The split was only apparent: shipped code
(`LegisGitRenameSource`) already implements A's producer shape feeding loomweave's
derivation — A and C name the two halves of one arrangement.

## The call

1. **Derivation-ownership is settled.** legis owns the git **path**-rename interface
   (`{old_path, new_path}`); **loomweave** owns path→locator derivation (single
   locator authority). **Option B is rejected** — legis never grows a deriver.
2. **legis builds nothing.** Its path feed is correct, shipped, and already has a
   proven consumer (loomweave's `LegisGitRenameSource`, analyze-time). The
   interface-lock §4B/GV-LG-2/§6 shapes are corrected from locator to path
   (lock §10/A1).
3. **The heddle-facing mechanism stays RESERVED and OPEN** until heddle proves
   consumption (prove-the-need): **C′** (loomweave grows a new MCP rename feed) vs
   **A′** (heddle ports loomweave's derivation onto legis's path feed). Build
   nothing now.
4. **The legis→loomweave path-rename seam is proven and freeze-eligible** at the
   clean-break cutover; loomweave to confirm `parse_legis_rename_json` matches
   legis's exact `git_rename_list` shape and guard the documented silent-under-carry
   failure (`sei_git.rs:288-294`).

## Rationale

Putting locator derivation in legis would split ownership of code-entity identity
across two members and force a governance member to grow a code-analyzer organ it
explicitly disclaims — a member-mission-boundary violation. loomweave already owns
the entity catalogue, the SEI scheme, and the only derivation pipeline; it is the
single source of truth. Keeping legis as a pure path-supplier preserves its charter
and the matcher contract (REQ-C-05) identically across consumers. Holding the
heddle-facing feed reserved honors prove-the-need: heddle uses raw git today, so no
sibling obligation freezes on a claimed need.

## Reversal trigger

Revisit the C′/A′ choice only when heddle proves consumption with a golden vector
against a real supplier — and prefer C′ if heddle's own derivation measurably
diverges from loomweave's for the same rename (two consumers, two answers → make
loomweave the single rename source via a new MCP tool). Re-open the derivation-
ownership call only if legis ever gains on-charter locator derivation, which today's
source rules out.
