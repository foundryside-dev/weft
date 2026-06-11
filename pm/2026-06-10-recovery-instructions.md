# Weft — what happened, and how each of you fixes it

**One instruction for all four members (filigree, wardline, legis, loomweave). 2026-06-10.**
Read it whole. This is the single source. If anything you were told earlier — a ticket comment, an
earlier dispatch — conflicts with this, **this wins**: say so and it gets fixed here, not by a
side-channel correction. There are no "waves," no "gates," no sequence to wait on except the one rule below.

---

## What happened

1. **Your fixes are built but stranded.** The dogfood-2 fixes are mostly done and live in each
   *installed* build — but every member is on an **unmerged release branch**, main has diverged, and
   loomweave's compiled binary is behind even its own source. Nothing has cut over to main.

2. **The cross-member contracts can drift silently, and one already did.** Most wire contracts —
   the findings payload, entity-associations, qualnames, the suppression vocabulary, the rename-JSON —
   are **hand-copied on both sides with no shared test**. So a rename on one side passes its own tests,
   re-signs cleanly, and breaks the other side invisibly. It already happened: wardline emits `findings`,
   legis doesn't require that key before it checks the signature — so renaming it would route **zero
   findings under a green `verified` status**. This is the dangerous one.

3. **Findings aren't reaching the tracker right now.** The emit URL is being written **unscoped**
   (`…/api/weft/scan-results`) instead of project-scoped; the one server-mode daemon fail-closes
   unscoped writes with a 400 that reads like a successful POST. The unscoped write is coming from
   **loomweave's bindings/doctor**, not wardline.

4. **The coordination got fumbled — that's why you're inconsistent with each other.** This was
   sequenced as artificial "waves" and "gates," and that scheduling reached you unevenly: one project
   was asked to confirm a scope decision the others never saw, so you ended up disagreeing about what
   you're even meant to do. **That overhead is gone.** One rule, one flat list. Below.

## The one rule that's real

**filigree merges to main first**, because every sibling resolves against filigree — its
`.weft/filigree/` store, its token, its HTTP/MCP surface. **Everything else is independent: any order,
in parallel, whoever is free.** Do not wait on each other beyond this.

## Every contract fix ships with its test — this is not optional and not a later phase

When you fix a cross-member contract, add a **shared executable conformance test in the same change**:
one golden vector for that wire shape, loaded by the producer's CI **and** every consumer's CI.
Hand-transcribed contracts with no shared test are the root cause of #2 — **the test is how the fix is
real.** A contract fix without its vector just re-creates the drift. This is quality, not scheduling;
it is the single thing that stops this incident from recurring. Do not skip it, do not defer it.

## How each of you fixes it

### filigree — you merge first
- Merge `release/3.0.0` → main: schema v26, the full Loom→Weft rename, drop the legacy flat MCP tool names, **no aliases**.
- Stamp a **server-mode marker** on your store so a sibling can tell it's talking to the daemon and emit scoped. *(root cause of #3)*
- Keep `EntityAssociation` JSON stable / aliased so loomweave deserializes it across the rename — **ship the shared serde vector both sides load.**
- Decide the legis sign-off headers: verify the signed `X-Weft-*` headers, **or** declare the classic route transport-open and stop emitting dead signatures — **with a real-HTTP test of the bind + closure-gate.**

### wardline — the emitter; the config-write reference
- Emit the **scoped** URL `…/api/p/<member>/weft/scan-results`; your installer owns that value.
- Make `findings` and `dirty` **named shared constants** (not bare dict keys) — **+ golden vectors both sides load.**
- Strip `:setter`/`:deleter` off qualnames before the wire — **+ a parity fixture** (loomweave has no setter coverage today; add it so this can't regress unseen).
- Share the suppression-state vocabulary with filigree as one constant — **+ a cross-repo test.**
- Add the **SEI conformance oracle to your CI** (legis runs it; you don't — match it).
- Cut a real versioned `wardline install` off the editable checkout so the fixes survive the checkout.

### legis — already at 1.0 final
- Require `findings` and validate it **before** the signature — a missing/renamed key must fail loudly, never route zero findings under a green status. **+ the golden vector wardline ships.** *(this is the dangerous one)*
- Your half of the sign-off-header decision above, **with the real-HTTP bind/gate test.**

### loomweave — the laggard, and the source of the live break
- Fix your bindings/doctor to write wardline's emit URL **scoped** — this is what's making findings vanish right now. Never clobber wardline's value with the unscoped form.
- Read filigree's **server-mode marker** in your scope probe.
- **Deserialize `EntityAssociation`** to match filigree's emission (alias/default so the rename doesn't hard-fail serde) — **against the shared vector.**
- Run the **rename-JSON parser against the shared two-way vector**, not a one-way local test.
- Stop writing the dead `.weft/loomweave/config.json` stub nothing reads (you already did this for `wardline.yaml` — finish it).
- Push `cb49008` and **rebuild your binary** — it's running stale.
- The Rust line is **out of this launch** — leave it.

## The emit wiring, exact (the thing that is live-broken)

- **One transport:** filigree `--server-mode` on `:8749`. Everything else that listens — dashboards `:86xx`/`:8971`/`:9212`/`:9397`, loomweave's read-API — is **never** an emit target.
- **Every emit URL is path-scoped:** `http://127.0.0.1:8749/api/p/<project>/weft/scan-results`. Unscoped `…/api/weft/…` → the daemon returns **400** and the findings vanish behind a clean-looking POST.
- **The emitter is wardline** (Python only). filigree / wardline / legis / lacuna each run one. **loomweave has no emit URL — that's correct, it's Rust.** loomweave's only job here is to stop *writing* the wrong URL into `.mcp.json`.
- **Register each member** in the daemon: `filigree server register <dir>` (idempotent, live reload, no restart). An unregistered project returns 401, indistinguishable from auth failure.
- **Verify:** `for m in filigree wardline legis lacuna; do curl -sS -o /dev/null -w "$m %{http_code}\n" http://127.0.0.1:8749/api/p/$m/weft/scan-results; done` → none `401`. Then one real scan per member lands in *that* project and no sibling. **lacuna is the canary — keep it green.**

## Done means

All four on main (filigree first), reinstalled (loomweave rebuilt), one real scan per member lands in
the tracker, every contract fix carries its conformance vector in CI, and the dogfood is run once to
confirm. Then ship.

## Track it in your own repo

filigree CLI from your repo (`filigree start-work <id> --advance` to claim; `filigree close <id>` when
verified — the CLI is authoritative if MCP returns `SCHEMA_MISMATCH`). Verify against **source, not
docs** (the docs have drifted). If this note disagrees with what you find in source, **stop and flag
it** — don't paper over it.
