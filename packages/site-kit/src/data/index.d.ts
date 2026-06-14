export type MemberKey =
  | 'loomweave'
  | 'filigree'
  | 'wardline'
  | 'legis'
  | 'warpline'
  | 'charter'
  | 'lacuna';

export type MemberStatus = 'admitted' | 'planned' | 'showcase';

export interface RosterMember {
  key: MemberKey;
  name: string;
  lang: string;
  /** CSS custom property, identical to tokens/colors.css --member-*. */
  thread: string;
  /** Resolved hex for contexts that can't read a custom property. */
  threadHex: string;
  /** Human pigment name (indigo / brass / madder / walnut / copper / woad / ash). */
  threadName: string;
  /** Absolute subdomain URL (https://{key}.foundryside.dev). */
  url: string;
  domain: string;
  tagline: string;
  status: MemberStatus;
  repo: string;
  briefing: string;
  cheatsheet?: string;
}

export const SUBDOMAIN_BASE: string;
export const GITHUB_ORG: string;
export function memberUrl(key: MemberKey): string;
export function repoUrl(key: MemberKey): string;

/** The six federation members, in roster order (Charter is `planned`). */
export const ROSTER: RosterMember[];
/** The demonstration specimen — NOT a roster member (`showcase`). */
export const LACUNA: RosterMember;
/** The five live-core members + Warpline (everything `status === 'admitted'`). */
export const ADMITTED: RosterMember[];
export function getMember(key: MemberKey): RosterMember | null;

export type PairingStatus = 'live' | 'partial' | 'planned';

export interface Pairing {
  a: MemberKey;
  b: MemberKey;
  capability: string;
  status: PairingStatus;
  note?: string;
}

/** The combination matrix — the cross-link spine of the suite. */
export const MATRIX: Pairing[];
export function pairingsFor(key: MemberKey): Pairing[];
export function partnerOf(pairing: Pairing, selfKey: MemberKey): MemberKey;

export interface EnrichmentSlot {
  peer: MemberKey;
  fact: string;
  state: 'present' | 'absent' | 'unavailable' | 'stale' | 'partial' | 'skipped';
}

export interface SeiSpineContent {
  eyebrow: string;
  heading: string;
  body: string;
  consumerNote: string;
  facts: string[];
  sampleSei: string;
  typedFacts: EnrichmentSlot[];
  enrichmentVocab: { state: string; meaning: string }[];
  hubAnchor: string;
}

export const SEI_SPINE: SeiSpineContent;
export const FEDERATION_AXIOM: string;
