// ============================================================
// Weft federation — ROSTER (the shared "sites can't disagree"
// source of truth for the six member threads + the showcase).
//
// Sourced from: tokens/colors.css (--member-* thread colors),
// federation-map.md, products/*.md, doctrine.md §7.
//
// Authority model (IA §3.1, federation-map.md): the website owns
// the interop layer (roster, axiom, matrix, spine). Surface facts
// that move (versions, tool counts, rule lists) are NOT restated
// here — each member's repo owns them. `repo`/`briefing`/`cheatsheet`
// are the pointers to those authorities.
// ============================================================

/** @typedef {'loomweave'|'filigree'|'wardline'|'legis'|'warpline'|'charter'|'lacuna'} MemberKey */

/** Subdomain base for every member site (IA §1.2, §2.2). */
export const SUBDOMAIN_BASE = 'foundryside.dev';

/** Build a member's absolute site URL — the only sanctioned cross-link form (IA §2.2, §2.6). */
export function memberUrl(key) {
  return `https://${key}.${SUBDOMAIN_BASE}`;
}

/** GitHub org that owns every member repo. */
export const GITHUB_ORG = 'foundryside-dev';

/** Build a member's repo URL. */
export function repoUrl(key) {
  return `https://github.com/${GITHUB_ORG}/${key}`;
}

/**
 * The six federation members, in roster order, plus Lacuna (the
 * showcase specimen — NOT a member, flagged `showcase`).
 *
 * `thread` is the CSS custom property (kept identical to
 * tokens/colors.css --member-*); `threadHex` is the resolved value
 * for contexts that can't read a custom property.
 * `status`: 'admitted' (live core / 5th member) | 'planned' (Charter) |
 *           'showcase' (Lacuna).
 */
export const ROSTER = [
  {
    key: 'loomweave',
    name: 'Loomweave',
    lang: 'Rust',
    thread: 'var(--member-loomweave)',
    threadHex: '#35487B', // indigo-600
    threadName: 'indigo',
    url: 'https://loomweave.foundryside.dev',
    domain: 'code structure + identity authority (SEI)',
    tagline: 'Turns a codebase into a queryable, identity-stable structural graph — and mints the SEI every other member keys on.',
    status: 'admitted',
    repo: 'https://github.com/foundryside-dev/loomweave',
    briefing: 'members/loomweave.md',
    cheatsheet: 'products/loomweave.md',
  },
  {
    key: 'filigree',
    name: 'Filigree',
    lang: 'Python',
    thread: 'var(--member-filigree)',
    threadHex: '#AC8222', // brass-500
    threadName: 'brass',
    url: 'https://filigree.foundryside.dev',
    domain: 'work state / issue lifecycle',
    tagline: 'Turns a swarm of stateless agents into a coordinated workforce — race-free claims, a dependency-aware ready queue, the one member with a web dashboard.',
    status: 'admitted',
    repo: 'https://github.com/foundryside-dev/filigree',
    briefing: 'members/filigree.md',
    cheatsheet: 'products/filigree.md',
  },
  {
    key: 'wardline',
    name: 'Wardline',
    lang: 'Python',
    thread: 'var(--member-wardline)',
    threadHex: '#993C26', // madder-600
    threadName: 'madder',
    url: 'https://wardline.foundryside.dev',
    domain: 'trust-boundary / taint analysis',
    tagline: 'A semantic-tainting static analyzer with zero runtime dependencies. Silent until you decorate — silence is not a clean bill.',
    status: 'admitted',
    repo: 'https://github.com/foundryside-dev/wardline',
    briefing: 'members/wardline.md',
    cheatsheet: 'products/wardline.md',
  },
  {
    key: 'legis',
    name: 'Legis',
    lang: 'Python',
    thread: 'var(--member-legis)',
    threadHex: '#7C5A38', // walnut-500
    threadName: 'walnut',
    url: 'https://legis.foundryside.dev',
    domain: 'git/CI governance & attestations',
    tagline: 'One attributable, tamper-evident record instead of a silent pass — a discipline, not a hardened security boundary.',
    status: 'admitted',
    repo: 'https://github.com/foundryside-dev/legis',
    briefing: 'members/legis.md',
    cheatsheet: 'products/legis.md',
  },
  {
    key: 'warpline',
    name: 'Warpline',
    lang: 'Python',
    thread: 'var(--member-warpline)',
    threadHex: '#A55C2C', // copper-500
    threadName: 'copper',
    url: 'https://warpline.foundryside.dev',
    domain: 'temporal / change-impact',
    tagline: 'Per-entity change history keyed on the SEI spine — what changed, when, and what does this change touch. Advisory only; it never gates.',
    status: 'admitted', // 5th admitted member (2026-06-14, PDR-0022)
    repo: 'https://github.com/foundryside-dev/warpline',
    briefing: 'members/warpline.md',
    cheatsheet: 'products/warpline.md',
  },
  {
    key: 'charter',
    name: 'Charter',
    lang: 'Python',
    thread: 'var(--member-charter)',
    threadHex: '#235E4D', // woad-600
    threadName: 'woad',
    url: 'https://charter.foundryside.dev', // reserved; no site this pass
    domain: 'requirements, traceability, verification',
    tagline: 'The federation’s obligations system-of-record: what must be true, kept separate from proposed / inferred / stale guesses.',
    status: 'planned', // roster thread only; federation adapters pending (IA §6)
    repo: 'https://github.com/foundryside-dev/charter',
    briefing: 'members/charter.md',
    cheatsheet: 'products/charter.md',
  },
];

/**
 * Lacuna — the demonstration specimen. NOT a roster member; the
 * suite is run *against* it. Ash thread (the "absent / specimen"
 * color). Kept separate from ROSTER on purpose (IA §4.3).
 */
export const LACUNA = {
  key: 'lacuna',
  name: 'Lacuna',
  lang: 'Python',
  thread: 'var(--member-lacuna)',
  threadHex: '#837D6E', // ash-500
  threadName: 'ash',
  url: 'https://lacuna.foundryside.dev',
  domain: 'the demonstration specimen',
  tagline: 'A small app with catalogued flaws — so you can watch the whole federation analyze it at once.',
  status: 'showcase',
  repo: 'https://github.com/foundryside-dev/lacuna',
  briefing: 'members/lacuna.md',
};

/** The five admitted members + Warpline (5th) — everything except Charter (planned) and Lacuna. */
export const ADMITTED = ROSTER.filter((m) => m.status === 'admitted');

/** Lookup a roster member (or Lacuna) by key. */
export function getMember(key) {
  if (key === 'lacuna') return LACUNA;
  return ROSTER.find((m) => m.key === key) || null;
}
