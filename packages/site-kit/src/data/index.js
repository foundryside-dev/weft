// Shared federation data — the "sites can't disagree" guarantee (IA §1.3, §3).
export {
  ROSTER,
  LACUNA,
  ADMITTED,
  SUBDOMAIN_BASE,
  GITHUB_ORG,
  memberUrl,
  repoUrl,
  getMember,
} from './roster.js';
export { MATRIX, pairingsFor, partnerOf } from './matrix.js';
export { SEI_SPINE, FEDERATION_AXIOM } from './sei-spine.js';
