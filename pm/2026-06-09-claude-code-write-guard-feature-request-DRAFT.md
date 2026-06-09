# Feature request (DRAFT — for owner review; NOT filed)

> **Status:** draft prepared by the Weft PM line under PDR-0008 ★ authorisation. The owner
> decides whether, where, and in what form to send this to the Claude Code team. Do not file
> autonomously — sending is an outward-facing action reserved to the owner.
>
> **Suggested destination:** Claude Code feedback / GitHub issues. Trim the weft-specific framing
> before sending; the core ask is general.

---

## Title
Pre-write conflict guard: detect when a file changed under a coding agent between read and write (optimistic concurrency at the Edit/Write layer)

## Problem
When multiple Claude Code agents operate on one working tree (or across linked worktrees) —
increasingly common with parallel/background agents and multi-agent orchestration — one agent can
silently overwrite another agent's in-progress, uncommitted edits. The overwriting agent has no
signal that it is doing so: it read the file, did its work, and wrote, never observing that a
*different* actor changed the same file in between. Today the only thing preventing a costly
rollback is a human watching and hitting Escape. That human-as-backstop is the ceiling on how much
work can be safely delegated to agents at once.

This is a **correctness** problem (silent data loss), not a convenience one, and it cannot be solved
above the tool layer: by the time a conflict is visible in git, the clobber has already happened.

## Proposed feature
A **pre-write compare-and-swap guard** at the Edit/Write tool boundary: before applying a write,
compare the target's current content hash against the hash the agent last observed; if it changed
due to *another* actor, **abort the write** and hand the agent the conflicting delta so it can
reconcile rather than clobber. This is identity-free optimistic concurrency — no locks, no
ownership, no permissions — so it composes with any number of concurrent agents.

### Requirements that make it usable (not a wolf-crier)
1. **Hunk-level, not whole-file.** Abort only on *overlapping* regions; orthogonal edits to the same
   file must pass, or the guard gets disabled.
2. **Self-write suppression.** Fire on *another* actor's change, not on the agent's own prior writes,
   formatters, or linters. (This is the hard part and cannot be purely hash-based — it needs a notion
   of "who last wrote.")
3. **Deliver the delta on abort + assist reconciliation.** An abort should surface the conflicting
   change and drop into an assisted 3-way merge, never just fail — make the safe path the easy path.
4. **Transaction-aware for multi-file operations.** A multi-file edit that aborts partway must not
   leave the tree half-applied (worse than the original clobber) — support all-or-nothing or a clear
   partial-state report.
5. **A working-tree tripwire for non-Write-path changes.** The most destructive stomps bypass the
   Edit/Write tool entirely — `git reset --hard`/`checkout`, an install rewriting a lockfile, codegen,
   migrations. A guard that watches only its own writes misses these; detecting unexpected
   working-tree/HEAD movement between an agent's read and write would catch them.

### Why it belongs in the harness
The guard must observe the *moment of write* and distinguish *which actor* wrote — both only
available at the tool/runtime layer. An external tool can advise but cannot intercept the write or
reliably attribute it, so advisory approaches fail exactly when they matter (the offending agent
doesn't perceive the conflict and overrides advice). A hook surface (e.g. a PreToolUse-style gate on
Edit/Write with access to prior-read state) would let the ecosystem build this.

## Impact
Removes the human as the live deconfliction backstop for multi-agent work — the single biggest
enabler of safe fire-and-forget delegation. The motivating deployment (the Weft agent-tooling suite)
observes the human-intervention event roughly weekly under careful operation and more often under
load, never zero; each is one sloppy command from a mandatory rollback.

## Notes / alternatives considered
- **Advisory presence/announcement** (agents post "I'm editing X") helps agents *avoid* collisions
  but cannot *guarantee* safety — agents override advisories. Useful as a complement, not a
  replacement, for the hard guard.
- **File locks / leases** are the wrong instrument: the observed conflict is a read→write race and a
  cross-worktree territory violation, not sustained exclusive access; a lock adds livelock risk
  without solving the partial-write or non-Write-path cases.
