# Lacuna (demonstration specimen — NOT a member)

**Status:** **Not a federation member.** Lacuna is the federation's **canonical demonstrator** — "the MissingNo of the Weft suite," a deliberately-flawed reference application the suite is run against and regression-demonstrated with.
**Repo:** `~/lacuna` · **Language:** Python
**Surface facts (snapshot 2026-06-05 — NOT authoritative here; see the repo):** in build (re-keyed from the old `testo` sandbox); specimen + planted-flaw manifest (`tour/lacunae.toml`) complete; the tour harness + positioning docs in flight. Authoritative: `~/lacuna/README.md`, `~/lacuna/docs/superpowers/specs/2026-06-05-lacuna-repivot-design.md`.

## Why "Potemkin"

Lacuna's flaws are **intentional and permanent** — catalogued in `tour/lacunae.toml`, baselined in `wardline.yaml` so the gate stays honest (catalogued flaws pass; genuinely new violations fail). Removing a planted lacuna *fails* `make verify`. It exists to *be analyzed*, not to do real work:

- Planted trust-boundary violations for **Wardline** to catch (e.g. PY-WL-101/102/103/104 in `specimen/trust_flow.py`, `exception_flow.py`).
- Planted structural findings for **Loomweave** (dead entity, circular import in `specimen/dead_code.py`, `cycle_a.py`/`cycle_b.py`).
- Tracked work in **Filigree** (`.filigree/`), Loomweave analysis (`.clarion/`), Wardline baseline (`.wardline/`). Legis/Charter wiring is design-only so far.

## What it demonstrates (the matrix, end to end)

Lacuna is where the [federation-map](../federation-map.md) becomes runnable: Wardline+Loomweave dossier reads, Wardline→Filigree findings-as-work, Loomweave+Filigree issues bound to SEI with drift detection, and (where live) the Legis/Charter cells. It is the thing a newcomer runs to *see the suite work*.

## Relationship to "elspeth"

Loomweave names **elspeth** (~425k LOC real Python) as its first-customer scale target. Lacuna is the *small, deliberately-flawed* demo specimen — complementary, not the same role. Lacuna is the showcase; elspeth is the scale proof.

> Lacuna is documented here because the hub is the federation's front door and the demo is part of the federation story. It is **not** counted in the roster ([doctrine.md](../doctrine.md), [conflict-register.md](../conflict-register.md) §A-2).
