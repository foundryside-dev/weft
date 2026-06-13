import React from 'react';

/**
 * Mark — the Weft federation glyph set. Stroke-based, drawn on a 0 0 32 grid,
 * and rendered in `currentColor` so each mark picks up its thread color from
 * the surrounding text/element. Always inline (this component does); loading a
 * mark via <img> will not inherit color.
 *
 * Names: foundryside (parent org) · weft (the woven umbrella) · loomweave ·
 * filigree · wardline · legis · charter · warpline (proposal) · shuttle
 * (future idea) · lacuna (the adjacent demo app — off-palette, dashed).
 */
const MARK_PATHS = {
  foundryside: (
    <>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 24 H27" /><path d="M11 24 V15" /><path d="M16 24 V10" /><path d="M21 24 V15" />
      </g>
      <g fill="currentColor">
        <circle cx="11" cy="15" r="2.1" /><circle cx="16" cy="10" r="2.3" /><circle cx="21" cy="15" r="2.1" />
      </g>
    </>
  ),
  weft: (
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M11 6 V18.8" /><path d="M11 23.2 V26" />
      <path d="M21 6 V8.8" /><path d="M21 13.2 V26" />
      <path d="M6 11 H8.8" /><path d="M13.2 11 H26" />
      <path d="M6 21 H18.8" /><path d="M23.2 21 H26" />
    </g>
  ),
  loomweave: (
    <>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5 V27" /><path d="M16 11 H24" /><path d="M16 21 H8" />
      </g>
      <g fill="currentColor">
        <circle cx="16" cy="5" r="2.4" /><circle cx="24" cy="11" r="2.4" />
        <circle cx="8" cy="21" r="2.4" /><circle cx="16" cy="27" r="2.4" />
      </g>
    </>
  ),
  filigree: (
    <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M16 4 L28 16 L16 28 L4 16 Z" />
      <path d="M16 11 L21 16 L16 21 L11 16 Z" fill="currentColor" stroke="none" />
    </g>
  ),
  wardline: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4 V28" /><path d="M6 10 H15" /><path d="M6 16 H15" /><path d="M6 22 H15" />
      <path d="M18 16 L26 11 V21 L18 16Z" fill="currentColor" />
    </g>
  ),
  legis: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 6 V25" /><path d="M9 25 H23" /><path d="M7 9 H25" />
      <path d="M7 9 L4 16 H10 L7 9Z" /><path d="M25 9 L22 16 H28 L25 9Z" />
    </g>
  ),
  charter: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5 H24 V27 H8 Z" /><path d="M12 11 H20" /><path d="M12 16 H17" />
      <path d="M11.5 21.5 L14 24 L20 17.5" />
    </g>
  ),
  warpline: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="10" />
      <path d="M16 9 V16 L21 19" />
      <path d="M7 22 H25" strokeDasharray="2.5 3" />
      <circle cx="7" cy="22" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="16" cy="22" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="25" cy="22" r="1.7" fill="currentColor" stroke="none" />
    </g>
  ),
  shuttle: (
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16 H28" strokeDasharray="3 3.5" />
      <path d="M11 16 C11 12, 21 12, 21 16 C21 20, 11 20, 11 16 Z" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
    </g>
  ),
  lacuna: (
    <>
      <path
        d="M19 6 H25 A1 1 0 0 1 26 7 V25 A1 1 0 0 1 25 26 H7 A1 1 0 0 1 6 25 V7 A1 1 0 0 1 7 6 H13"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2.6 3" fill="none"
      />
      <rect x="13.4" y="13.4" width="5.2" height="5.2" rx="1" fill="currentColor" />
    </>
  ),
};

export function Mark({ name, size = 24, style, className, title, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={style}
      role="img"
      aria-label={title || name}
      {...rest}
    >
      {MARK_PATHS[name] || null}
    </svg>
  );
}
