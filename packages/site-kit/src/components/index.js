// ============================================================
// Weft site-kit — React component library (ES exports).
// Plain React reading CSS custom properties; mount as Astro
// islands (client:load / client:visible / client:idle).
// Link components.css + the token layer for SSR-rendered styling.
// ============================================================

// core
export { Button } from './core/Button.jsx';
export { Badge } from './core/Badge.jsx';
export { Tag } from './core/Tag.jsx';

// forms
export { Input } from './forms/Input.jsx';
export { Switch } from './forms/Switch.jsx';

// feedback
export { Banner } from './feedback/Banner.jsx';
export { Tabs } from './feedback/Tabs.jsx';

// data — the signature, brand-defining vocabulary
export { SeiTag } from './data/SeiTag.jsx';
export { EnrichmentChip } from './data/EnrichmentChip.jsx';
export { FreshnessMeter } from './data/FreshnessMeter.jsx';
export { ExitCode } from './data/ExitCode.jsx';
export { StateBadge } from './data/StateBadge.jsx';
export { MemberMark, WEFT_MEMBERS } from './data/MemberMark.jsx';
