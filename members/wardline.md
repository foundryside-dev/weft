# Wardline (member)

**Domain authority:** trust policy & rule enforcement — trust declarations, baselines, policy findings. The federation's **trust-policy surface**.
**Repo:** `~/wardline` · **Language:** Python
**Current details:** v1.0.0rc4; semantic-tainting static analyzer; SARIF v2.1.0 output; an **8-state taint lattice** (not a "Tier 1–4" model), **3 canonical decorators** (`external_boundary`, `trust_boundary`, `trusted`), **~20 rules** (`PY-WL-101..120`). For the latest details, use `~/wardline/src/wardline/{_version.py,core/taints.py,decorators/__init__.py,scanner/rules/}` and `~/wardline/README.md`.

## What it owns (authoritative in Wardline)

The trust lattice and its states, the decorator/annotation vocabulary, the rule set and rule IDs, the scanner engine, the manifest system (`wardline.yaml`), the runtime descriptor enforcement, and the reference corpus used to validate the analyzer. **Rule counts, decorator names, and lattice states are Wardline's responsibility — this hub points to the owning repo** (the old hub restated them and was wrong: [conflict-register.md](../conflict-register.md) §A-5).

## Federation role (points to weft for patterns)

- **Filigree is enrich-only, not load-bearing.** Wardline uses Filigree for *work tracking only*; scanning/analysis run with all siblings absent (`core/filigree_emit.py` is fail-soft). The old hub's "load-bearing" label was wrong ([conflict-register.md](../conflict-register.md) §A-6).
- **Identity:** keys taint facts on **[SEI](../sei-standard.md)**, resolving locator→SEI via Loomweave; degrades gracefully when the `sei` capability is absent.
- **Integrations:** taint-fact store → Loomweave ([contracts-index.md](../contracts-index.md) §3), `metadata.wardline.qualname` reconciliation (§5), findings → Filigree (§4), findings governed by Legis (§8).
- **Asterisk A-1 (LIVE):** Wardline→Filigree findings route through Loomweave's SARIF translator until Wardline ships a native Filigree emitter ([asterisk-register.md](../asterisk-register.md)).

## Notes

- Wardline's README names "Weft / Loomweave / Filigree"; its federation framing now points to [doctrine.md](../doctrine.md).
- `~/wardline-watcher` and `~/wardline.old` are **out of the federation** (the heavier governance build that died); not members.
- Wardline's specs tree previously hosted the suite-wide SEI standard; that is now [sei-standard.md](../sei-standard.md) here, with the wardline copy reduced to a pointer.
