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
| `index.html` | Mounts React; defines the cursor `blink` keyframe |
| `Marks.jsx` | Shared glyph set (tab icons in thread colors) |
| `Terminal.jsx` | `Terminal` window + `SESSIONS` content; `L` / `Prompt` / `Tag` line primitives |

## Reuse
- `SESSIONS` is a map of `{ member, label, render() }` — add a session by adding a key.
- `L`, `Prompt`, `Tag` are the terminal line primitives; colors come from the `K` map → tokens.
- The window chrome (traffic lights + tab bar) is a reusable terminal frame.

## Notes
- **Lacuna** is the deliberately-flawed *demonstration specimen* the suite is run
  against — not a roster member. It appears only as the `make tour` target.
- Design-only members (Legis, Charter) are **labelled, never faked**, mirroring
  the real tour harness.
