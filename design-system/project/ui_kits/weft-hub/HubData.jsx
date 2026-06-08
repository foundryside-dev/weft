// HubData.jsx — federation roster data for the hub kit. The glyph set and all
// shared primitives now come from the Weft component library (the bundle):
// Mark, Tabs, and Stat are aliased onto window for the page scripts to use.
const { Mark, Tabs, Stat } = window.WeftDesignSystem_9a241d;

// Federation roster — single source for the hub.
const MEMBERS = [
  { id: "loomweave",  name: "Loomweave",  thread: "var(--thread-loomweave)",  lang: "Rust",   domain: "Code structure + identity authority (SEI)", answers: "what is this codebase, where do I touch, what is the durable identity?", status: "built · in use", repo: "~/loomweave" },
  { id: "filigree", name: "Filigree", thread: "var(--thread-filigree)", lang: "Python", domain: "Work state / issue lifecycle", answers: "what work exists, what state is it in, what happened?", status: "built · in use", repo: "~/filigree" },
  { id: "wardline", name: "Wardline", thread: "var(--thread-wardline)", lang: "Python", domain: "Trust-boundary analysis", answers: "what is allowed, and does this still satisfy the constraints?", status: "built · in use", repo: "~/wardline" },
  { id: "legis",    name: "Legis",    thread: "var(--thread-legis)",    lang: "Python", domain: "Git/CI governance & attestations", answers: "what changed, and is this change governed?", status: "1.0.0rc1", repo: "~/legis" },
  { id: "charter",  name: "Charter",  thread: "var(--thread-charter)",  lang: "Python", domain: "Requirements, traceability, verification", answers: "what must be true, and how do we know it is?", status: "scaffolded", repo: "~/charter" },
];

const SHUTTLE = { id: "shuttle", name: "Shuttle", thread: "var(--thread-shuttle)", lang: "—", domain: "Change execution (future)", answers: "carry this approved change through the weave, under guard rails.", status: "roadmap thought-bubble", repo: "no repo" };

Object.assign(window, { Mark, Tabs, Stat, MEMBERS, SHUTTLE });
