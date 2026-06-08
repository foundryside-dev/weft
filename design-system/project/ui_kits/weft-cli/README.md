# UI Kit — Weft CLI

The agent-first **terminal surface**. Four Weft members have no GUI — Loomweave,
Wardline, Legis, and Charter live on the command line and a dependency-free
MCP-over-stdio server. This kit is a tabbed terminal showing a realistic session
for each, with output drawn from the tools' own READMEs.

`index.html` shows a terminal window; switch tabs to move between sessions:
- **wardline scan** — a tripped trust-boundary gate (`PY-WL-101`)
- **loomweave · MCP** — an entity orientation read, enriched with sibling facts
- **legis · governance** — a Coached-cell override `BLOCKED` by the judge
- **make tour → lacuna** — the suite driven against the Lacuna specimen, degrading honestly

## Files
| File | What it is |
|------|------------|
| `index.html` | Mounts React + the design-system bundle; defines the cursor `blink` keyframe |
| `CliData.jsx` | Aliases the library `Mark` / `Tabs` onto window for the page scripts |
| `Terminal.jsx` | `Terminal` window + `SESSIONS` content; `L` / `Prompt` / `Tag` line primitives |

**This kit consumes the Weft component library** — the tab icons are the library
`Mark`, and the session switcher is the library `Tabs` (underline), tinted live
by the active member's thread. The terminal line primitives (`L` / `Prompt` /
`Tag`) stay kit-local — they're a bespoke monospace renderer, not general UI.

## Reuse
- `SESSIONS` is a map of `{ member, label, render() }` — add a session by adding a key.
- `L`, `Prompt`, `Tag` are the kit-local terminal line primitives; colors come from the `K` map → tokens.
- The window chrome (traffic lights + tab bar) is a reusable terminal frame; the tab bar itself is the library `Tabs`.

## Notes
- **Lacuna** is not part of Weft — it's the **demo suite**: a separate sample
  codebase of deliberately-buggy code that the tools are run against and pick up.
  It appears only as the `make tour` target, never as a roster member.
- Design-only members (Legis, Charter) are **labelled, never faked**, mirroring
  the real tour harness.
