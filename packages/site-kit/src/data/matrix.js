// ============================================================
// Weft federation — MATRIX (the combination matrix).
//
// THE cross-link spine of the suite (IA §2.2): every member site
// renders only the rows that include it, and each pairing links
// cross-subdomain to the partner. The hub renders the full grid.
//
// Sourced from: federation-map.md (the authoritative integration
// matrix + asterisk-register) and IA §2.2. Status is honest and
// intrinsic to each row — a `partial`/`planned` pair is NEVER
// rendered as `live`.
//
// status vocabulary:
//   'live'    — composition shipped and exercised
//   'partial' — binding exists but still maturing (round-DOWN, never up)
//   'planned' — seam frozen / designed, implementation not shipped
// ============================================================

/** @typedef {'live'|'partial'|'planned'} PairingStatus */

/**
 * Each pairing names the two members (order is producer/initiator
 * first where federation-map.md implies one), a one-line capability
 * sentence, an honest status, and an optional `note` for asterisks.
 */
export const MATRIX = [
  {
    a: 'wardline',
    b: 'loomweave',
    capability: 'Structure + trust posture in one view — the dossier.',
    status: 'live',
  },
  {
    a: 'wardline',
    b: 'filigree',
    capability: 'Findings become tracked work.',
    status: 'live',
    note: 'A-1: native emitter shipped; asterisk stays live until the Loomweave-absent path is proven end-to-end (currently unit/server-wiring tier).',
  },
  {
    a: 'loomweave',
    b: 'filigree',
    capability: 'Issues bound to live code, surviving refactors.',
    status: 'partial',
    note: 'Drift-aware entity⇄issue binding still maturing.',
  },
  {
    a: 'wardline',
    b: 'legis',
    capability: 'Agent-defined policy enforced at the CI/git boundary.',
    status: 'live',
  },
  {
    a: 'loomweave',
    b: 'legis',
    capability: 'Governance attestations keyed to stable code identity.',
    status: 'live',
  },
  {
    a: 'filigree',
    b: 'legis',
    capability: 'Governed issue lifecycle — sign-offs, RTM, verification.',
    status: 'live',
  },
  {
    a: 'warpline',
    b: 'filigree',
    capability: 'The re-verification worklist becomes tracked work.',
    status: 'live',
    note: 'Filigree consumer (warpline_worklist_ingest) shipped in Filigree 3.0.0 — the EARNED inbound seam.',
  },
  {
    a: 'warpline',
    b: 'loomweave',
    capability: '"Now" + "over time" — change history keyed on the SEI spine.',
    status: 'planned',
    note: 'Seam frozen at the launch cutover; consumer implementation is an admitted fast-follow.',
  },
  {
    a: 'warpline',
    b: 'wardline',
    capability: 'Change-impact enriched with trust posture (risk-weighted blast radius).',
    status: 'planned',
    note: 'Seam frozen; implementation fast-follow.',
  },
  {
    a: 'warpline',
    b: 'legis',
    capability: 'Temporal change facts available to governance preflight.',
    status: 'planned',
    note: 'Seam frozen; implementation fast-follow.',
  },
];

/** All pairings that include `key`, for a member site's "How it composes" slice (IA §2.2). */
export function pairingsFor(key) {
  return MATRIX.filter((p) => p.a === key || p.b === key);
}

/**
 * Given a pairing and the "self" member key, return the partner key.
 * Used to render `MemberMark(self) + MemberMark(partner)` with the
 * partner as the cross-subdomain link.
 */
export function partnerOf(pairing, selfKey) {
  return pairing.a === selfKey ? pairing.b : pairing.a;
}
