// CliData.jsx — the CLI kit's glyphs and the session tab control now come from
// the Weft component library (the bundle). Mark and Tabs are aliased onto
// window for Terminal.jsx to use.
const { Mark, Tabs } = window.WeftDesignSystem_9a241d;
Object.assign(window, { Mark, Tabs });
