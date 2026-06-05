// Marks.jsx — Loom federation glyph set as React components.
// Stroke-based, inherit `color` via currentColor. Shared across UI kits.
const { createElement: h } = React;

const MARK_PATHS = {
  loom: (
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M11 6 V18.8"/><path d="M11 23.2 V26"/>
      <path d="M21 6 V8.8"/><path d="M21 13.2 V26"/>
      <path d="M6 11 H8.8"/><path d="M13.2 11 H26"/>
      <path d="M6 21 H18.8"/><path d="M23.2 21 H26"/>
    </g>
  ),
  clarion: (
    <>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5 V27"/><path d="M16 11 H24"/><path d="M16 21 H8"/>
      </g>
      <g fill="currentColor">
        <circle cx="16" cy="5" r="2.4"/><circle cx="24" cy="11" r="2.4"/>
        <circle cx="8" cy="21" r="2.4"/><circle cx="16" cy="27" r="2.4"/>
      </g>
    </>
  ),
  filigree: (
    <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M16 4 L28 16 L16 28 L4 16 Z"/>
      <path d="M16 11 L21 16 L16 21 L11 16 Z" fill="currentColor" stroke="none"/>
    </g>
  ),
  wardline: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4 V28"/><path d="M6 10 H15"/><path d="M6 16 H15"/><path d="M6 22 H15"/>
      <path d="M18 16 L26 11 V21 L18 16Z" fill="currentColor"/>
    </g>
  ),
  legis: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 6 V25"/><path d="M9 25 H23"/><path d="M7 9 H25"/>
      <path d="M7 9 L4 16 H10 L7 9Z"/><path d="M25 9 L22 16 H28 L25 9Z"/>
    </g>
  ),
  charter: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5 H24 V27 H8 Z"/><path d="M12 11 H20"/><path d="M12 16 H17"/>
      <path d="M11.5 21.5 L14 24 L20 17.5"/>
    </g>
  ),
  shuttle: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16 H28" strokeDasharray="3 3.5"/>
      <path d="M11 16 C11 12, 21 12, 21 16 C21 20, 11 20, 11 16 Z"/>
      <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none"/>
    </g>
  ),
  lacuna: (
    <>
      <path d="M19 6 H25 A1 1 0 0 1 26 7 V25 A1 1 0 0 1 25 26 H7 A1 1 0 0 1 6 25 V7 A1 1 0 0 1 7 6 H13"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2.6 3" fill="none"/>
      <rect x="13.4" y="13.4" width="5.2" height="5.2" rx="1" fill="currentColor"/>
    </>
  ),
};

function Mark({ name, size = 24, style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
         className={className} style={style} aria-label={name} role="img">
      {MARK_PATHS[name]}
    </svg>
  );
}

// Federation roster — single source for kits.
const MEMBERS = [
  { id: "clarion",  name: "Clarion",  thread: "var(--thread-clarion)",  lang: "Rust",   domain: "Code structure + identity authority (SEI)", answers: "what is this codebase, where do I touch, what is the durable identity?", status: "built · in use", repo: "~/clarion" },
  { id: "filigree", name: "Filigree", thread: "var(--thread-filigree)", lang: "Python", domain: "Work state / issue lifecycle", answers: "what work exists, what state is it in, what happened?", status: "built · in use", repo: "~/filigree" },
  { id: "wardline", name: "Wardline", thread: "var(--thread-wardline)", lang: "Python", domain: "Trust-boundary analysis", answers: "what is allowed, and does this still satisfy the constraints?", status: "built · in use", repo: "~/wardline" },
  { id: "legis",    name: "Legis",    thread: "var(--thread-legis)",    lang: "Python", domain: "Git/CI governance & attestations", answers: "what changed, and is this change governed?", status: "1.0.0rc1", repo: "~/legis" },
  { id: "charter",  name: "Charter",  thread: "var(--thread-charter)",  lang: "Python", domain: "Requirements, traceability, verification", answers: "what must be true, and how do we know it is?", status: "scaffolded", repo: "~/charter" },
];

const SHUTTLE = { id: "shuttle", name: "Shuttle", thread: "var(--thread-shuttle)", lang: "—", domain: "Change execution (future)", answers: "carry this approved change through the weave, under guard rails.", status: "roadmap thought-bubble", repo: "no repo" };

Object.assign(window, { Mark, MEMBERS, SHUTTLE });
