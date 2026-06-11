export const meta = {
  name: 'federation-seam-gap-audit',
  description: 'Critique the 10 cross-member interfaces (wardline/filigree/legis/loomweave) against a first-principles gold-standard rubric; surface every closeable gap. Batches of 2 (shared-quota outage rule).',
  phases: [
    { title: 'Critique', detail: 'per-seam gap-finder reads BOTH sides source + confirms/refutes mapped tickets' },
    { title: 'Deepen', detail: 'adversarial completeness critic finds missed gaps + kills phantom gaps' },
    { title: 'Synthesize', detail: 'rank gaps, map to tickets, flag untracked' },
  ],
}

// ---------------------------------------------------------------------------
// First-principles gold-standard rubric. NOT "is it documented"; "does the
// EXECUTABLE SOURCE on BOTH sides meet the bar a federated, deconfliction-first,
// enrich-only interface ought to meet." Hub/member docs have drifted — verify
// against source, never against the doc that claims the contract.
// ---------------------------------------------------------------------------
const RUBRIC = `
GS-1 CONTRACT SYMMETRY — the producer's code emits byte-for-byte what the consumer's code reads. Field names, enum values, envelope shape, key spelling all match across the seam. (The #1 drift killer: an unpinned key rename = silent runtime break.)
GS-2 ENRICH-ONLY / GRACEFUL DEGRADATION — removing either side never breaks the other's core flow. Federation writes are off-by-default or additive. Verify the consumer's code actually falls back / no-ops when the peer is absent (no hard import, no required call, no crash).
GS-3 OPACITY / ENCAPSULATION — the holder of a foreign value stores it verbatim and never parses it; the owner is the sole schema authority (entity_id, wardline_json blob, SEI, trust vocabulary).
GS-4 IDENTITY DISCIPLINE — durable cross-tool bindings key on SEI (stable), not a mutable locator; the identity axis (alive/orphaned) and content axis (fresh/stale) are SEPARATE signals; drift detection runs on the CONSUMER's read path.
GS-5 EVOLUTION SAFETY — surfaces are versioned/named/pinnable; evolution is additive (new generation/version, never mutate an existing one); error enum is closed and switched on code, not HTTP status.
GS-6 FAILURE DIRECTION — fail-CLOSED where ambiguity is dangerous (unscoped project write, ambiguous rename, non-locator resolve); fail-OPEN where absence is benign (loose cooperation, unknown scan_run_id). The right direction PER seam.
GS-7 SINGLE SOURCE OF TRUTH + PROVEN CONFORMANCE — schema owned by exactly one side, not restated/duplicated where it can drift; conformance is PROVEN by a shared oracle that someone actually RUNS, not asserted because it "looks compatible."
GS-8 RUNTIME REACHABILITY / OBSERVABILITY — the binding is verifiable live (liveness probe, capability probe), misroutes detectable. *** YOU CANNOT VERIFY THIS AXIS FROM SOURCE. *** A code review cannot catch wiring/registration/port drift — only a live probe can. Mark GS-8 "unverifiable-from-source; defer to live probe" and cite the runtime evidence you were given; do NOT mark it sound from reading code.
`

const POSTURE = `
WEFT DOCTRINE (the design intent you critique against):
- Deconfliction-first, NOT security. Re-derive any security-shaped gap as a functional/availability gap (a misrouted emit = findings-don't-reach-the-tracker, not a breach).
- Enrich-only federation axiom: every binding is additive; the failure test is "does removing one side break the other's core flow."
- SEI (loomweave:eid:<...>) is the LOCKED identity spine; opaque to everyone but Loomweave; the prefix is reserved; resolution fail-closed on non-locator.
- Docs (hub AND member) are UNTRUSTWORTHY — they have drifted. Cite executable SOURCE (file:line), never a doc that merely claims the contract. A claim that matches a doc but not the code IS a gap.
`

const MISSION = `
YOUR JOB IS TO CRITIQUE, NOT TO CONFIRM. Do not rubber-stamp. The user (the suite PM) explicitly wants the GAPS surfaced so they can be CLOSED. A seam that looks fine deserves a harder look, not a pass. Where a seam genuinely meets the bar, say so in one line and move on — spend your effort finding what FALLS SHORT.

For the seam below:
1. Read the EXECUTABLE SOURCE on BOTH sides (paths given). Read the MAIN tree only — IGNORE anything under '.claude/worktrees/'.
2. For each rubric criterion that APPLIES, decide gold / caveat / falls-short / n-a, and HUNT for the shortfall. A "caveat" or "falls-short" must cite the exact file:line on the producer side AND the consumer side that disagree (for GS-1) or the missing fallback / parse / unpinned key.
3. CONFIRM OR REFUTE each mapped ticket against the source as it stands NOW. State plainly: does the open ticket still describe a real gap, is it already fixed in source (propagation lag?), or is it mis-scoped?
4. SEPARATE THE TWO AXES: contract soundness (the design/code) vs deployment correctness (is it wired right at runtime). Config drift that is already ticketed does NOT make the contract unsound — label each gap CONTRACT or DEPLOYMENT.
5. Every gap you report MUST be CLOSEABLE: state the concrete remediation (pin the key / add the fallback / run the oracle / repoint the URL) and whether a tracker ticket already covers it (give the weft-id) or it is UNTRACKED (needs one).

Return ONLY the structured object. Evidence = real file:line you actually opened. No gap without a citation.
`

const GAP_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['seam_id', 'one_line_health', 'criteria', 'gaps', 'ticket_reconciliation'],
  properties: {
    seam_id: { type: 'string' },
    one_line_health: { type: 'string', description: 'One sentence: is the CONTRACT sound, and what is the headline gap.' },
    criteria: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['criterion', 'verdict', 'evidence'],
        properties: {
          criterion: { type: 'string', description: 'GS-1 .. GS-8' },
          verdict: { type: 'string', enum: ['gold', 'caveat', 'falls_short', 'na', 'unverifiable_from_source'] },
          evidence: { type: 'string', description: 'file:line on BOTH sides where relevant; what you actually read.' },
        },
      },
    },
    gaps: {
      type: 'array',
      description: 'Closeable shortfalls. Empty only if the seam genuinely meets the bar on every applicable criterion.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'axis', 'severity', 'criterion', 'evidence', 'remediation', 'tracking'],
        properties: {
          title: { type: 'string' },
          axis: { type: 'string', enum: ['contract', 'deployment'] },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          criterion: { type: 'string', description: 'Which GS rubric line this violates.' },
          evidence: { type: 'string', description: 'producer-side file:line AND consumer-side file:line.' },
          remediation: { type: 'string', description: 'The concrete fix that closes it.' },
          tracking: { type: 'string', description: 'weft-<id> if already tracked, or "UNTRACKED".' },
        },
      },
    },
    ticket_reconciliation: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['ticket', 'status_vs_source'],
        properties: {
          ticket: { type: 'string' },
          status_vs_source: { type: 'string', enum: ['still_real', 'fixed_in_source', 'misscoped', 'not_applicable'] },
          note: { type: 'string' },
        },
      },
    },
  },
}

const DEEPEN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['seam_id', 'verdict', 'phantom_gaps', 'missed_gaps', 'severity_adjustments'],
  properties: {
    seam_id: { type: 'string' },
    verdict: { type: 'string', enum: ['critique_complete', 'critique_shallow'], description: 'shallow if you found material missed gaps.' },
    phantom_gaps: {
      type: 'array',
      description: 'Reviewer gaps that are NOT real (already fixed in source, or no actual asymmetry). Each MUST cite the file:line that disproves it.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'why_not_real'],
        properties: { title: { type: 'string' }, why_not_real: { type: 'string' } },
      },
    },
    missed_gaps: {
      type: 'array',
      description: 'Real shortfalls the reviewer missed. Same shape + evidence bar as a reviewer gap.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'axis', 'severity', 'criterion', 'evidence', 'remediation', 'tracking'],
        properties: {
          title: { type: 'string' },
          axis: { type: 'string', enum: ['contract', 'deployment'] },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          criterion: { type: 'string' },
          evidence: { type: 'string' },
          remediation: { type: 'string' },
          tracking: { type: 'string' },
        },
      },
    },
    severity_adjustments: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['gap_title', 'from', 'to', 'why'],
        properties: {
          gap_title: { type: 'string' },
          from: { type: 'string' },
          to: { type: 'string' },
          why: { type: 'string' },
        },
      },
    },
  },
}

// ---------------------------------------------------------------------------
// The 10 seams. Source paths point at the MAIN tree on both sides.
// ---------------------------------------------------------------------------
const SEAMS = [
  {
    id: 'S1-sei-identity-spine',
    title: 'SEI identity spine — Loomweave (authority) → all consumers',
    summary: 'resolve(locator)->SEI, resolve_sei, lineage, _capabilities, files. The LOCKED connective tissue every other seam keys on. Critique especially GS-4 (do consumers store SEI opaque & key on it?) and GS-7 (does ANYONE actually RUN the conformance oracle, or is membership asserted?).',
    sources: [
      'loomweave (authority): /home/john/loomweave/crates/loomweave-cli/src/http_read/identity.rs ; /home/john/loomweave/crates/loomweave-storage/src/sei.rs ; oracle harness /home/john/loomweave/crates/loomweave-storage/tests/sei_conformance_oracle.rs ; oracle fixtures /home/john/loomweave/docs/federation/fixtures/sei-conformance-oracle.json',
      'consumers: wardline /home/john/wardline/src/wardline/loomweave/identity.py ; legis /home/john/legis/src/legis/identity/loomweave_client.py + /home/john/legis/src/legis/governance/sei_backfill.py',
      'standard: /home/john/weft/sei-standard.md (claim only — verify against code)',
    ],
    tickets: ['weft-560f243c95 (identity model / identifier dialects differ per sibling — is the spine actually uniform?)', 'weft-feea638ec0 (move-stable finding identity)'],
  },
  {
    id: 'S2-filigree-loomweave-entity-assoc',
    title: 'Filigree ↔ Loomweave — entity associations (ADR-029)',
    summary: 'Bind a Filigree issue to a Loomweave entity. entity_associations table on Filigree side; entity_id stored OPAQUE; drift detection is the CONSUMER job via content_hash_at_attach; issues_for reverse lookup. Critique GS-3 (does Filigree ever parse entity_id?) and GS-4 (identity vs content axes separate?).',
    sources: [
      'filigree (host): /home/john/filigree/src/filigree/db_entity_associations.py ; /home/john/filigree/docs/architecture/decisions/ADR-029-entity-association-opacity.md ; classic HTTP route handlers (grep entity-associations under /home/john/filigree/src/filigree/)',
      'loomweave (consumer/drift side): grep issues_for / entity_issue_list under /home/john/loomweave/crates/',
    ],
    tickets: ['weft-eff938d3b6 (classic-router writes silently resolve to default project — these routes live on the classic /api/issue surface)'],
  },
  {
    id: 'S3-wardline-loomweave-taint-store',
    title: 'Wardline → Loomweave — taint-fact store (ADR-036)',
    summary: 'Wardline computes per-entity taint, persists wardline_json to Loomweave; Loomweave stores it OPAQUE (never parses), write path DISABLED BY DEFAULT. Critique GS-2 (off-by-default actually honored?), GS-3 (opaque on Loomweave side?), GS-1 (read-back routes match write shape?).',
    sources: [
      'wardline (producer): /home/john/wardline/src/wardline/loomweave/write.py ; .../loomweave/facts.py ; .../loomweave/client.py ; .../loomweave/_hmac.py',
      'loomweave (store): /home/john/loomweave/crates/loomweave-storage/src/wardline_taint.rs ; /home/john/loomweave/crates/loomweave-cli/src/http_read/wardline.rs',
    ],
    tickets: [],
  },
  {
    id: 'S4-wardline-loomweave-qualname',
    title: 'Wardline → Loomweave — qualname normalization (ADR-018)',
    summary: 'Wardline emits metadata.wardline.qualname = module_dotted_name(path)+"."+__qualname__; Loomweave reconciles to SEI. The hub CLAIMS module_dotted_name is "byte-for-byte with Loomweave\'s extractor". CRITIQUE THAT CLAIM HARD (GS-1): read both implementations and check they actually agree on edge cases (nested classes, __init__, namespace packages, decorators).',
    sources: [
      'wardline (producer): /home/john/wardline/src/wardline/core/qualname.py ; emit at /home/john/wardline/src/wardline/core/emit.py',
      'loomweave (reconciler): /home/john/loomweave/crates/loomweave-mcp/src/wardline_reconcile.rs ; grep the extractor that builds dotted module names under /home/john/loomweave/crates/',
    ],
    tickets: ['weft-feea638ec0', 'weft-2b71565563 (path_glob/qualname glob)', 'weft-08124cad2c (CLOSED — stacked-decorator fingerprint collision; verify it stayed closed)'],
  },
  {
    id: 'S5-wardline-filigree-findings-emit',
    title: 'Wardline → Filigree — findings emit + suppression provenance (asterisk A-1 LIVE)',
    summary: 'Native emitter POSTs findings to /api/weft/scan-results. Suppression provenance pinned: metadata.wardline.suppression_state in {baselined|waived|judged}, carried ONLY when non-active (absent => active, never literal "active"). KNOWN GAP (weft-171fc22a50): Filigree honors suppression_state on WRITE but baselined findings still land status:open severity:high — i.e. NOT honored on the READ/promote path. Confirm exactly where the read path drops the signal. Also GS-2: does (Wardline,Filigree) compose with Loomweave ABSENT (A-1 retirement clause)?',
    sources: [
      'wardline (producer): /home/john/wardline/src/wardline/core/filigree_emit.py ; .../core/suppression.py ; .../core/filigree_issue.py',
      'filigree (consumer): /home/john/filigree/src/filigree/generations/weft/types.py ; .../generations/weft/adapters.py ; scan-results intake + finding ingest/promote (grep suppression_state and finding_promote under /home/john/filigree/src/filigree/)',
    ],
    tickets: ['weft-171fc22a50 (baselined findings land open/high — read-path gap; STILL OPEN)', 'weft-4a9d0f863c (CLOSED — fingerprint instability minted a federation dup)', 'weft-e618c4118a (fingerprint-rekey reconciliation)', 'weft-57899a1310 (rescan-preservation regression test)'],
  },
  {
    id: 'S6-legis-loomweave-governance-rename',
    title: 'Legis ↔ Loomweave — SEI governance consumption + git-rename provider seam',
    summary: 'Legis is PULL-ONLY consumer of resolve/resolve_sei/lineage for attestations + audit spine, re-establishing lineage integrity at its own boundary (prefix-hash custody). Legis SUPPLIES git-rename signal via GET /git/renames?rev_range=; Loomweave consumes through typed GitRenameSource/LegisGitRenameSource. Critique GS-1 (rename payload shape match), GS-2 (Legis works with Loomweave absent — fragile-ref fallback?), GS-4 (lineage re-establishment correct?).',
    sources: [
      'legis: /home/john/legis/src/legis/git/rename_feed.py ; /home/john/legis/src/legis/identity/loomweave_client.py ; /home/john/legis/src/legis/governance/sei_backfill.py ; /home/john/legis/src/legis/governance/gaps.py ; /home/john/legis/docs/federation/sei-conformance.md',
      'loomweave: /home/john/loomweave/crates/loomweave-cli/src/sei_git.rs ; grep GitRenameSource / LegisGitRenameSource under /home/john/loomweave/crates/',
    ],
    tickets: [],
  },
  {
    id: 'S7-legis-filigree-signoff',
    title: 'Legis ↔ Filigree — SEI-keyed sign-off binding + governance gate',
    summary: 'Legis binds governed sign-offs to Filigree issues via the entity-association surface (signoff/request, bind-issue, sign) AND gates on Filigree issue state (filigree_gate.py). Filigree retains issue-lifecycle authority; Legis adds governance. Critique GS-2 (Filigree fully functional with Legis absent? Legis degrade with Filigree absent?), GS-3/GS-4 (binding keys on SEI via the opaque entity-assoc surface, not a locator?).',
    sources: [
      'legis: /home/john/legis/src/legis/filigree/client.py ; /home/john/legis/src/legis/governance/signoff_binding.py ; /home/john/legis/src/legis/governance/binding_ledger.py ; /home/john/legis/src/legis/governance/filigree_gate.py ; /home/john/legis/src/legis/enforcement/signoff.py',
      'filigree: entity-association surface (S2 sources) + issue lifecycle (grep where entity-associations bind under /home/john/filigree/src/filigree/)',
    ],
    tickets: [],
  },
  {
    id: 'S8-legis-wardline-enforcement',
    title: 'Legis ↔ Wardline — findings routing through enforcement + scan-artifact contract',
    summary: 'Legis routes Wardline findings (POST /wardline/scan-results on Legis) through 2x2 enforcement cells; trust vocabulary passes through VERBATIM ("Wardline analyses, Legis governs" — Legis never re-adjudicates). KNOWN GAP (weft-61d27fb808): the Wardline scan-artifact `dirty` key that feeds the legis N4 gate is UNPINNED — a rename is a silent runtime break (GS-1 violation). Also check suppression_state adoption (weft-ef79348eb2 W3, closed) and the N4 keyless-posture description (weft-1e7eeec1b6).',
    sources: [
      'legis (consumer/governor): /home/john/legis/src/legis/wardline/governor.py ; .../wardline/policy.py ; .../wardline/ingest.py ; /home/john/legis/src/legis/service/wardline.py',
      'wardline (producer): scan-artifact emit /home/john/wardline/src/wardline/core/emit.py ; .../core/filigree_issue.py ; grep the `dirty` key and suppression_state under /home/john/wardline/src/wardline/',
    ],
    tickets: ['weft-61d27fb808 (`dirty` key UNPINNED, rename=silent break; STILL OPEN)', 'weft-ef79348eb2 (CLOSED — legis adopted suppression_state W3; verify)', 'weft-1e7eeec1b6 (N4 keyless posture doc gap)', 'weft-a92805f4cf (N3 check_hmac_key honesty)'],
  },
  {
    id: 'S9-wardline-loomweave-vocab-descriptor',
    title: 'Wardline → Loomweave — trust-vocabulary descriptor (retired-A-2 mechanism)',
    summary: 'Loomweave\'s plugin once IMPORTED wardline.core.registry.REGISTRY at startup (init-coupling, asterisk A-2 RETIRED 2026-06-05). It now reads an ON-DISK vocabulary descriptor (.wardline/vocabulary.yaml first, then the installed wardline/core/vocabulary.yaml data file) WITHOUT importing wardline. Critique GS-2 (truly no import-time coupling now?), GS-1 (descriptor schema match), GS-3 (Loomweave records only source-observed metadata; Wardline stays authoritative for vocab semantics). Verify A-2 genuinely stayed retired in current source.',
    sources: [
      'wardline (producer/authority): grep vocabulary.yaml + the registry under /home/john/wardline/src/wardline/core/ (vocabulary.yaml data file, core/registry)',
      'loomweave (reader): grep vocabulary descriptor read + ANY `use wardline`/import of wardline under /home/john/loomweave/crates/ (esp. the python/rust plugin); /home/john/loomweave/crates/loomweave-cli/src/wardline_guidance.rs',
    ],
    tickets: [],
  },
  {
    id: 'S10-filigree-transport-and-topology',
    title: 'Filigree HTTP generations (ADR-002) + runtime emit topology',
    summary: 'TWO things, keep them separate. (a) CONTRACT: named pinnable generations — classic (frozen) vs weft/`loom` (/api/weft/*), additive evolution, unified BatchResponse/ListResponse envelopes, CLOSED ErrorCode enum, loose cooperation (every weft endpoint functional with peers absent). (b) DEPLOYMENT/RUNTIME (GS-8 — NOT verifiable from source): path-scoped emit (/api/p/<project>/weft/scan-results), mandatory separate registration in server.json, token chain, unscoped-write fail-closed=400, 401-ambiguity trap. The 2026-06-09 live probe found 3/4 members drifted (filigree+wardline at local dashboards unscoped, legis unregistered, only lacuna correct). DO NOT mark runtime sound from source — cite that probe; the contract axis you CAN read.',
    sources: [
      'filigree (contract): /home/john/filigree/src/filigree/generations/__init__.py ; .../generations/weft/{types,adapters}.py ; .../generations/classic/adapters.py ; /home/john/filigree/docs/architecture/decisions/ADR-002-api-generations-and-federation-posture.md ; /home/john/filigree/src/filigree/federation_token.py',
      'runtime evidence (do not re-derive from source): /home/john/weft/federation-topology.md "Current drift snapshot PROBED 2026-06-09"; ~/.config/filigree/server.json',
    ],
    tickets: ['weft-7436c1959e (emit drift — DEPLOYMENT)', 'weft-eff938d3b6 (classic-router silent default-project — CONTRACT)', 'weft-a9ae398c5b (register dedup strands stale .filigree key — DEPLOYMENT/CONTRACT)', 'weft-c7511201ed (per-member emit-liveness check — DEPLOYMENT, BLOCKED on weft-7436c1959e)', 'weft-1e7eeec1b6 (scan_route keyless-posture doc)'],
  },
]

function chunk(arr, n) {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

function critiquePrompt(s) {
  return `${POSTURE}\n${MISSION}\n\nRUBRIC:\n${RUBRIC}\n\n=== SEAM: ${s.id} ===\n${s.title}\n\n${s.summary}\n\nSOURCE TO READ (main tree only; ignore .claude/worktrees):\n${s.sources.map(x => '  - ' + x).join('\n')}\n\nMAPPED OPEN/CLOSED TICKETS to confirm-or-refute against current source:\n${s.tickets.length ? s.tickets.map(x => '  - ' + x).join('\n') : '  - (none mapped — still hunt for UNTRACKED gaps)'}\n\nSet seam_id="${s.id}".`
}

function deepenPrompt(s, critique) {
  return `${POSTURE}\n\nYou are an ADVERSARIAL completeness critic for one federation seam. A first reviewer critiqued it; your job is to (a) KILL any phantom gap they invented (a "gap" that current source disproves — cite the file:line that disproves it), and (b) find REAL gaps they MISSED. Default assumption: the first pass was too shallow and there ARE missed gaps — prove yourself wrong by actually reading the source, don't just agree. Hold the same evidence bar: no gap without producer-side AND consumer-side file:line. Re-read the MAIN tree (ignore .claude/worktrees).\n\n=== SEAM: ${s.id} ===\n${s.title}\n${s.summary}\n\nSOURCE:\n${s.sources.map(x => '  - ' + x).join('\n')}\n\nFIRST REVIEWER'S CRITIQUE (JSON):\n${JSON.stringify(critique, null, 2)}\n\nSet seam_id="${s.id}".`
}

// review-then-verify, SEQUENTIAL within the unit so only 2 agents are ever live.
async function critiqueThenDeepen(s) {
  const critique = await agent(critiquePrompt(s), { label: `critique:${s.id}`, phase: 'Critique', schema: GAP_SCHEMA, agentType: 'Explore' })
  if (!critique) return null
  const deepen = await agent(deepenPrompt(s, critique), { label: `deepen:${s.id}`, phase: 'Deepen', schema: DEEPEN_SCHEMA, agentType: 'Explore' })
  return { seam: s, critique, deepen }
}

phase('Critique')
const results = []
for (const pair of chunk(SEAMS, 2)) {
  log(`Batch: ${pair.map(p => p.id).join(' + ')}`)
  const batch = await parallel(pair.map(s => () => critiqueThenDeepen(s)))
  results.push(...batch.filter(Boolean))
}

// ---------------------------------------------------------------------------
// Synthesis: merge critique + deepen into a single ranked gap register per seam.
// One agent, runs alone (well within the cap).
// ---------------------------------------------------------------------------
phase('Synthesize')
const merged = results.map(r => {
  const phantomTitles = new Set((r.deepen?.phantom_gaps || []).map(p => p.title))
  const sevAdj = new Map((r.deepen?.severity_adjustments || []).map(a => [a.gap_title, a.to]))
  const survived = (r.critique?.gaps || [])
    .filter(g => !phantomTitles.has(g.title))
    .map(g => ({ ...g, severity: sevAdj.get(g.title) || g.severity, source: 'critique' }))
  const added = (r.deepen?.missed_gaps || []).map(g => ({ ...g, source: 'deepen' }))
  return {
    seam_id: r.seam.id,
    seam_title: r.seam.title,
    one_line_health: r.critique?.one_line_health,
    deepen_verdict: r.deepen?.verdict,
    phantom_killed: [...phantomTitles],
    ticket_reconciliation: r.critique?.ticket_reconciliation || [],
    gaps: [...survived, ...added],
  }
})

const synthPrompt = `${POSTURE}\n\nYou are synthesizing a federation-interface GAP AUDIT for the suite PM. Below is the per-seam merged output (first-pass critique with phantom gaps removed and severities adjusted by an adversarial second pass). Produce a synthesis that the PM can act on directly.\n\nProduce:\n1. headline — 2-3 sentences: overall, are the cross-member interfaces sound as a CONTRACT, and what are the load-bearing gaps that must close before they could be called gold-standard. Be honest, not rosy.\n2. ranked_gaps — EVERY gap across all seams, deduplicated (same root gap surfacing on two seams = one entry naming both), ranked by severity then blast radius (a gap on the SEI spine or the transport touches everything). For each: id (G1..), title, seams, axis, severity, criterion, evidence, remediation, tracking (weft-id or UNTRACKED — flag untracked loudly).\n3. untracked_gaps — the subset with tracking=UNTRACKED that need a ticket filed.\n4. axis_split — count and one-line summary of CONTRACT gaps vs DEPLOYMENT gaps (deployment = config/wiring drift, mostly the 2026-06-09 emit-topology drift).\n5. strongest_seams — which seams genuinely meet the bar (so the PM does not waste effort there), one line each.\n\nMERGED PER-SEAM DATA:\n${JSON.stringify(merged, null, 2)}`

const SYNTH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['headline', 'ranked_gaps', 'untracked_gaps', 'axis_split', 'strongest_seams'],
  properties: {
    headline: { type: 'string' },
    ranked_gaps: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'title', 'seams', 'axis', 'severity', 'criterion', 'evidence', 'remediation', 'tracking'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          seams: { type: 'array', items: { type: 'string' } },
          axis: { type: 'string', enum: ['contract', 'deployment'] },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          criterion: { type: 'string' },
          evidence: { type: 'string' },
          remediation: { type: 'string' },
          tracking: { type: 'string' },
        },
      },
    },
    untracked_gaps: { type: 'array', items: { type: 'string' } },
    axis_split: { type: 'string' },
    strongest_seams: { type: 'array', items: { type: 'string' } },
  },
}

const synthesis = await agent(synthPrompt, { label: 'synthesize', phase: 'Synthesize', schema: SYNTH_SCHEMA })

return { synthesis, perSeam: merged }
