// ============================================================
// Weft federation — SEI_SPINE explainer content.
//
// The "one durable identity; facts survive the rename" story
// (IA §3.3). Authored copy in the Weft voice, sourced from
// sei-standard.md, federation-map.md ("the connective tissue"),
// doctrine.md, and products/loomweave.md.
//
// Loomweave's site owns the AUTHORITATIVE explanation (it mints
// SEI). Every other member states "keys its facts on SEI, treats
// it as opaque, never mints it" and links to weft.foundryside.dev/#spine.
// ============================================================

export const SEI_SPINE = {
  eyebrow: 'SEI · THE CONNECTIVE TISSUE',
  heading: 'One durable identity. Facts survive the rename.',

  /** The hub's full-length explainer. */
  body:
    'Loomweave mints a Stable Entity Identity (SEI) for every function, class and ' +
    'module. Every other member keys its facts on that SEI — so a dossier stays ' +
    'correct when the code is refactored tomorrow. SEI is LOCKED (2026-06-05): the ' +
    'interface is frozen; remaining member backfills are conformance tasks.',

  /** A condensed line for a member site that is NOT Loomweave (IA §3.3). */
  consumerNote:
    'Keys its facts on the SEI spine, treats it as opaque, and never mints it — ' +
    'Loomweave is the one identity authority.',

  /** The structural facts that hold the matrix together (federation-map.md). */
  facts: [
    'SEI is the connective tissue: every binding keys on it; a tool keying on a mutable locator silently orphans every combination it is in.',
    'There is no weft:// URI scheme and no federation registry/broker — identity is closed by SEI.',
  ],

  /** A sample entity token for the SeiTag in the spine diagram (illustrative). */
  sampleSei: 'loomweave:eid:7f3a9c2e1b4d',

  /**
   * The typed-facts side of the diagram: one row per present peer,
   * each an honest enrichment state. Demonstrates the brand's honesty
   * mechanic — at least one non-`present` state (IA §3.3, §5.1).
   */
  typedFacts: [
    { peer: 'loomweave', fact: 'callers · neighborhood', state: 'present' },
    { peer: 'wardline', fact: 'EXTERNAL_RAW taint', state: 'present' },
    { peer: 'filigree', fact: '2 open issues', state: 'present' },
    { peer: 'legis', fact: 'no attestation yet', state: 'absent' },
    { peer: 'warpline', fact: 'last change · 9d ago', state: 'stale' },
    { peer: 'plainweave', fact: 'peer unreachable', state: 'unavailable' },
  ],

  /**
   * The EnrichmentChip vocabulary explainer — the brand's honesty
   * mechanic made legible (IA §3.3). `absent` ≠ clean.
   */
  enrichmentVocab: [
    { state: 'present', meaning: 'peer present, fact attached' },
    { state: 'absent', meaning: 'peer present, no fact — explicitly missing, never "clean"' },
    { state: 'unavailable', meaning: 'peer unreachable' },
    { state: 'stale', meaning: 'fact attached but past its freshness window' },
  ],

  /** Anchor on the hub the member sites link to. */
  hubAnchor: 'https://weft.foundryside.dev/#spine',
};

/** The one-sentence federation axiom (doctrine.md §5) — used in the doctrine block. */
export const FEDERATION_AXIOM =
  'Each member is authoritative for one domain, solo-useful, meaningfully composable ' +
  'pairwise, and enrich-only — never load-bearing — when composed.';
