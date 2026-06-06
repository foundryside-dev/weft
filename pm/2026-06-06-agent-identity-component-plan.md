# Component Plan — Agent Identity authority (the actor-analogue of SEI)

> **PM working plan — NOT a federation contract, NOT an admitted roster member.**
> This is a candidate-component plan for the Weft idea bench. It does **not** add a
> member; admission runs through [`../doctrine.md`](../doctrine.md) §7 and the hub,
> exactly as Legis and Charter did. Lives in `pm/` deliberately (see
> [`../MANIFEST.md`](../MANIFEST.md)). Companion to
> [`2026-06-06-federation-product-analysis.md`](./2026-06-06-federation-product-analysis.md) §4.
>
> **Date:** 2026-06-06 · **Method:** two independent design framings (lean-spine /
> premise-challenger) + an adversarial go/no-go + doctrine + feasibility adjudicator.
> The recommendation below is the *adjudicated* result, not either designer's first pass.

## TL;DR — the recommendation

**Build it — but gate it behind a time-boxed design spike, do not start v1 cold.**
The gap is real, twice-deferred, and structurally unowned; the candidate passes
go/no-go on the strength of its Legis and Filigree pairings. But the spike must
clear **one decisive question** before this becomes a committed member, because the
two designs disagreed on the signing architecture and **one of them is
doctrine-incompatible**. Verdict: **`spike-then-decide`.**

Three things the design pass surfaced that change how you'd run this:

1. **The architecture is decided by doctrine, not preference.** The "lean" instinct
   — one authority holds a private key and signs every agent's credential — is
   *internally inconsistent* with doctrine §6: to sign for an agent on another host
   it must either ship the private key there (that host can now forge any identity —
   the entire value prop collapses) or expose a reachable signing service at mint
   time (shared running infrastructure — §6 forbidden). **The only feasible model is
   certification/enrollment** (CA / SPIFFE-SVID / Fulcio-style): the agent generates
   its own Ed25519 keypair on whatever host it runs, the authority *certifies* the
   `actor_id ↔ public_key` binding once at enrollment, and consumers verify
   signatures **offline** against the certified public key with **no call to the
   authority at verify time**. That offline-verify property is also what keeps the
   member off the §6 shared-running-infra list. Adopt this; reject sole-signer.

2. **Admission requires a hub doctrine amendment.** [`../doctrine.md`](../doctrine.md)
   §2/§6 literally call Loomweave *"the identity authority for the suite"* (singular).
   A second identity authority is a standing textual contradiction until that is
   amended to *"identity authority for **code/entities**"* (with this member as the
   *actor*-identity authority — two peer coordinate systems, neither nested). This is
   a precondition of admission, not an afterthought.

3. **It needs an explicit anti-load-bearing clause, or it repeats the F4 crack.**
   The federation's only existing enrich-only crack (the Legis closure-gate, F4 in
   the product analysis) is the exact failure mode this primitive invites: the moment
   a consumer *requires* a verified credential to clear a gate, an enrich-only
   authority becomes load-bearing-once-opted-in. The spec must mandate an
   **assurance-tier contract**: consumers record the tier as *metadata* and
   **never block on it**; credential-absence **always** degrades to free-text with
   `identity_stable:false`; **no consumer may make verification success a
   precondition for any operation.** Write this into the spec, do not assume it.

---

## 1. The gap (why this is unowned)

Weft has a locked, opaque, signed, stable identity for **code** (SEI, minted by
Loomweave) and **none** for the **agents** whose actions five tools record, claim,
sign off, and attest. The actor field is free-text everywhere, and two members
*independently deferred the same missing primitive*:

- **Filigree** — `actor` is an unauthenticated claim (ADR-012: *"the audit trail
  records claims, not proofs"*). Its v24 `verified_actor` binds only the **local OS
  user** on CLI/MCP-stdio and **explicitly defers cross-host** (`filigree-81d3971467`).
- **Legis** — binds `agent_id` at subprocess launch, which by its own honest scope
  *"defeats in-session spoofing but NOT a lying host."* Cross-host non-repudiation
  via a **signed launch token** is named-and-deferred (mcp-surface §4.2, deferred
  follow-up **C5**). Legis's entire value proposition — *attributable,
  non-repudiable governance* — rests on an actor identity **it cannot itself mint**,
  for the same structural reason it cannot mint SEI: *a consumer of identity is not
  an authority for it.*

Neither Filigree's `verified_actor` nor Legis's launch-bound `agent_id` is the
product. Both bind a **local fact** (the OS user; the launched subprocess), neither
can verify the other's, and **both explicitly defer the host boundary.** The unowned
thing is a **durable, portable, asymmetrically-certified actor principal** minted by
**one** authority that Legis and Filigree each verify **independently** and **neither
can forge.** That is the exact Loomweave-mints / consumers-treat-opaque split, in
cryptographic form (private key = the agent's; certified binding + verify = the
authority's). *SEI keys **what** changed; this keys **who** changed it.*

---

## 2. Go/no-go adjudication (doctrine §7)

| Criterion | Verdict | Notes |
|---|---|---|
| **#1 One bounded domain, no overlap** | **PASS — conditional on the spike** | The contested gate and the whole product. The "fold into Legis/Filigree" attack is defeated: a credential minted *inside* Legis forces Filigree to verify *through* Legis = §5 pipeline coupling. The line the spike must prove holds *in code*: **signing/certifying a credential is identity authority; adjudicating an action is governance.** The moment it stores a verdict about an action or a policy about what an actor may do, it *is* Legis and fails #1. |
| **#2 Solo-useful** | **PASS — narrowly (weakest)** | A durable, signed actor ledger for one dev running many agent sessions/hosts. Honest caveat: lead the solo story with **durable principal + in-session-spoof defeat**, *not* cross-host non-repudiation (see the anticipatory-demand note below). |
| **#3 Sensible pairwise** | **PASS** | **Strong** with Legis (the C5 seed) and Filigree (`verified_actor` cross-host deferral). **Orthogonal-clean** with Loomweave (entity axis vs actor axis — they compose: a record cites both an SEI and an agent principal). **Honestly thin** with Wardline/Charter (quiet attribution cells, real but minor). |
| **#4 Additive / never load-bearing** | **PASS — with a mandatory clause** | Absent → everyone falls back to free-text `agent_id`; nothing breaks. *Conditional on the assurance-tier-never-block contract (§4).* |

**Two non-fatal hazards that must close *in the spike*, not after:** the doctrine
§2/§6 singular-authority text (§0 item 2) and the agent-fleet principal-unit problem
(§5). **Anticipatory-demand caveat:** ADR-012 says all peers currently bind
loopback; the cross-host trigger has **not verifiably fired**. The cross-host
non-repudiation headline is a *future* trigger, not a present need — which is itself
the argument for **spike-now / build-when-triggered**, and for leading the value
story with the durable principal rather than cross-host.

---

## 3. Recommended bounded domain & v1 scope

**Bounded domain (one sentence):** authority for a durable, opaque, **certified**
agent principal and its identity-internal lineage — *enroll/certify* it, *resolve*
it, *attest* (verify a signature over a payload against the principal's certified
public key), and maintain its append-only lineage. It answers exactly one question:
*"is this actor who the credential says it is, and is that binding currently
valid?"* It owns the actor-identity binding store and the certification root, and
**nothing** about what the agent may do (Legis), what work it claims (Filigree), or
what it *is* as a skill-pack (the rejected Bobbin idea).

**v1 (MVP) — the cheapest thing that lets Legis stop attributing to free-text
`agent_id`:**
- **(a) Enroll/certify** — the agent generates its own Ed25519 keypair on its host; the authority certifies the `actor_id ↔ public_key` binding once, persisting a durable opaque principal with an append-only lineage seeded `enrolled`. The authority **never holds the agent's private key.**
- **(b) `resolve(actor_id)`** → `{key_id, public_key, status, alive}`.
- **(c) `attest(actor_id, payload, signature)`** → `valid / invalid / unknown-actor`, **fail-closed**, **verifiable offline** against the certified public key with **no call to the authority at attest time**.
- **(d) Append-only `lineage(principal)`** → `enrolled · key_rotated · session_promoted · revoked`. Revocation is a *lineage event*, not a subsystem; resolve checks it and fails closed.
- **(e) `_capabilities`** advert `{agent_identity:{supported, version}}` so consumers detect an authority-absent deployment and degrade to free-text.
- **(f) A shared conformance oracle** (fixtures), the direct analogue of the SEI §8 oracle — conformance *demonstrated*, never assumed; no grandfathering.

**Explicitly OUT of v1** (to keep #1 unimpeachable): any authorization/policy over
the actor (Legis); any work/claim state (Filigree); agent registry/profile/metadata
(would collide with Bobbin — that's provenance-of-*capability*, not identity);
session lifecycle / "who may launch a session" (the forbidden orchestrator line);
key-rotation ceremony / HSM-KMS / multi-tenant key hierarchies; OIDC/SSO bridge;
revocation **push**/event bus (pull-only, mirroring SEI lineage); hash-chained/Merkle
lineage (append-only in v1; consumers re-establish integrity at their own boundary,
exactly as Legis already does for SEI lineage per REQ-L-01).

---

## 4. Interface, identity model & the enrich-only contract

**Surface (follows the suite's emerging MCP conventions — PM analysis F2):**
- **HTTP:** `POST /api/v1/identity/agent/enroll`, `POST .../resolve`, `POST .../attest`, `GET .../lineage?principal=…`, `GET /api/v1/_capabilities`. Revocation appends a lineage event.
- **MCP tools:** `agent_identity_enroll`, `agent_identity_resolve`, `agent_identity_attest`, `agent_lineage_get` — schema-versioned envelope `{schema:"<member>.agent_identity.vN", producer, ok, data|error, warnings, meta}`, closed error-code enum (`SIGNATURE_INVALID`, `PRINCIPAL_REVOKED`, `PRINCIPAL_UNKNOWN`, `AUTHORITY_ABSENT`), per-tool side-effect metadata, `result_kind` tri-state. Charter/Loomweave are the reference envelopes.
- **Opacity rule:** the principal token is **opaque** (a surrogate, *not* derived from a parseable OS-user/hostname — those are mutable *address* attributes, captured in `launch_context`, never the identity). Consumers store-and-resolve, **never parse** — exactly as Filigree already stores `clarion_entity_id`/SEI opaque. A reserved namespace prefix (the SEI `loomweave:eid:` analogue, e.g. `…:agent:`) lets `attest` reject a non-credential input fail-closed (the SEI REQ-F-01/02 analogue, including rejecting an SEI-shaped string).

**Identity model:** Ed25519, asymmetric, **agent-held private key + authority-certified
public binding**, offline-verifiable. Three honestly-stated assurance tiers (the
ADR-012 discipline of stating scope plainly):
- **T0** free-text `agent_id` — today's baseline, in-session-spoofable.
- **T1** launch-bound (Legis today) — defeats in-session spoofing, *not* a lying host.
- **T2** signed-credential (this member) — a payload signed by the actor's private key
  is verifiable cross-host against the certified public key — defeats a lying host
  for any signed artifact. **The member owns the jump from T1 → T2; it never governs
  the action, only makes its authorship provable.**

**The enrich-only contract (mandatory — this is the F4-prevention clause):**
consumers record the **assurance tier as metadata** and **MUST NEVER block on it**;
credential-absence **ALWAYS** degrades to free-text with `identity_stable:false`;
**no consumer may make `attest()` success a precondition for any operation.** Encode
the authority-absent degrade as the first conformance fixture so enrich-only is
*proven, not asserted.*

**Integration stories (all enrich-only, all degrade to free-text when absent):**
- **Legis** — attribute every verdict/override/sign-off to the *verified* principal instead of free-text `agent_id`, closing C5. Absent → launch-bound free-text with `identity_stable:false`, exactly as it already degrades for absent SEI.
- **Filigree** — `verified_actor` holds the resolved durable principal alongside the OS user, giving the cross-host half of `filigree-81d3971467` a portable proof; `work_claim` binds to a verified principal so a reaper/second agent can trust who holds the claim across hosts. Absent → OS-user/NULL + free-text `actor`, record-both-warn-never-block preserved.
- **Audit trail** — any append-only line cites the verified principal + signature → non-repudiable rather than claim-only.
- **Loomweave** — composes orthogonally (who-as-principal alongside what-as-SEI); clean both ways absent.
- **Charter/Wardline** — honest soft pairings (baseline-acceptance / `attest`-bundle authorship); real but minor.

---

## 5. The hard problems the spike must answer

These are genuine, and the plan does **not** pretend they're solved:

1. **Signing architecture (decisive):** confirm the certification/enrollment model
   closes the lying-host gap with **offline** verification and **no reachable signer
   at issue time.** If the only way to defeat a lying host turns out to be a reachable
   signer or a distributed private key → cross-host non-repudiation collapses or it
   becomes §6 infra → **NO-GO.**
2. **Agent-fleet principal unit (unscoped in both designs):** humans are easy (an
   operator key — Legis already has `operator_id`). Agents scale **horizontally** —
   one persona on N runners. If the principal is **per-persona**, all N share a
   private key and any can forge as the persona — reintroducing the lying-host problem
   *inside* the persona. **Persona vs instance vs per-enrollment keypair must be
   decided in the spike** — it's the whole point.
3. **Key custody:** SEI was keyless (blake3); this introduces private keys. Where do
   agent keys live on a CI runner, how protected, who can read them? A naive store
   reintroduces shared running infra. Needs a threat-model / security-review pass.
4. **Enrollment trust root:** the *first* enrollment must be authorized by something
   (operator key? OS user at install? trust-on-first-use?). Classic
   identity-bootstrap — must be answered for an **agent** enrollee, not hand-waved.
5. **Revocation freshness:** offline verification (what keeps it enrich-only) means a
   revoked-but-cached cert verifies stale. Mitigation: short-lived session credentials
   + pull-on-attest for durable ones; document the staleness window honestly.
6. **Boundary erosion:** pressure *will* come to add "who may launch a session" or
   "what may this agent do." Both are OUT and must stay out (the asterisk-register
   discipline), or it becomes the forbidden orchestrator.

---

## 6. The decision gate (candidate → committed member)

**PRIMARY (the one question):** Does the certification/enrollment model close the
lying-host gap with **offline** verification and **no reachable signing service at
issue time**, given a specified **enrollment trust root for an agent actor** and a
specified **principal unit** (persona vs instance) that does **not** reintroduce
intra-fleet forgeability? → **Yes = GO.** No (defeating a lying host needs a reachable
signer or a distributed private key) → **NO-GO**; fold the local-only in-session piece
into Filigree `verified_actor` / Legis launch-binding as a *capability*, not a member.

**SECONDARY (the boundary proof):** a throwaway slice where Legis attaches **one**
signed credential to **one** governance record and verifies it, proving: (a) **no
governance logic leaked** into the identity authority (it signs/resolves/attests,
renders no verdict); (b) Legis **and** Filigree consume the **same** credential
without either re-minting; (c) the authority-absent path degrades **both** consumers
to free-text with no failure (the enrich-only proof, encoded as the SEI-§8-analogue
capability-absent fixture).

**Also gated on:** a **security review** of the key store, and a **hub amendment**
resolving the doctrine §2/§6 *"identity authority for the suite"* singular-authority
text.

---

## 7. Phased roadmap

- **Phase 0 — SPIKE (the go/no-go gate).** Build the throwaway mint→sign→Legis-verifies-independently slice + the authority-absent degrade path; answer the §5 hard questions; clear the §6 decision gate. Mirrors the product analysis's "spike + spec" call and the §7 path Legis/Charter took.
- **Phase 1 — v0.1 (lean spine).** The enroll/resolve/attest authority + signed session credential + Ed25519 certification + `_capabilities` + the shared conformance oracle. **Ship the authority-absent fixture FIRST** so enrich-only is proven. Lock the v0.1 interface (SEI lock discipline — post-lock changes need a versioned revision).
- **Phase 2 — consumer enrich-only adapters.** Legis attributes verdicts to the verified principal (closes C5); Filigree binds `work_claim`/`verified_actor` (closes the cross-host half of `filigree-81d3971467`). Each lands as an ADR in the *consumer* repo, oracle-gated, degrading gracefully — the SEI consumer-adoption pattern exactly.
- **Phase 3 — North Star (strictly additive).** Key rotation, per-event-signed lineage, Loomweave/Charter/Wardline opt-in attribution, MCP-over-HTTP cross-host flow. None reopens the v0.1 lock.

**Validating demo (Lacuna):** `make tour` enrolls a principal for the tour runner +
issues a signed session credential; the tour drives Legis/Filigree so their records
attribute to the **verified** principal (resolved + signature-checked), and
`make verify` asserts attribution is the verified principal, not the claim. Re-run
with the authority **disabled** to assert both consumers degrade to free-text with no
failure (reusing Lacuna's honest-degradation harness). A planted lacuna seeds a
**tampered/forged credential** the tour asserts is fail-closed-rejected — the
non-repudiation proof, analogous to a planted SEI-orphan flaw.

---

## 8. Naming (placeholders only — doctrine §8, not decisions)

Weaving/governance/heraldic register, chosen for the *signed-mark-of-authenticity*
sense: **Tabard** (a herald's coat bearing borne, attestable arms), **Seal** (the
signet that authenticates), **Hallmark** (a struck mark of proven authenticity),
**Cartouche** (an enclosing frame holding an opaque name), **Sigil** (a signed
identifying mark). The hub names on promotion.

---

## 9. How this sits against the existing bench

It is **not** on [`../roadmap-ideas.md`](../roadmap-ideas.md) and it **beats** the
live bench entries on go/no-go strength: it has the cleanest bounded domain (exact
SEI architectural precedent), two strong already-deferred consumer pairings, and it
unblocks the federation's attribution/non-repudiation story that Legis's whole value
rests on. It does **not** displace **Warp** (supply-chain — a different axis, keep on
the bench) and it **precedes Shuttle** (you cannot safely *execute* a change without
first being able to *attribute* who authorized it). It reaffirms the bench's
rejection of **Bobbin** (agent skill-pack metadata is provenance-of-capability, not
identity) and of any **central aggregator** (Charter's anti-signal).

**Next action:** if you want to proceed, the move is a **Phase-0 spike brief** + the
**doctrine §2/§6 amendment** as a paired hub change — I can draft both, and promote a
condensed version of this into `../roadmap-ideas.md` via its go/no-go recipe.

---

*Generated by the Weft virtual-PM new-component pass, 2026-06-06. Two design framings
+ adversarial go/no-go/doctrine/feasibility adjudication; synthesis by the PM. To
promote, route through `../doctrine.md` §7.*
