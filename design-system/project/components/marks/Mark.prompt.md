**Mark** — the Weft federation glyph set as one component. Stroke-based, `currentColor`, drawn on a 0 0 32 grid. Set the color on the element (or wrap with a `.thread-*` helper) so each mark renders in its thread color — never load a mark via `<img>`, it won't inherit.

```jsx
<Mark name="weft" size={28} style={{ color: 'var(--accent)' }} />
<Mark name="filigree" size={20} style={{ color: 'var(--thread-filigree)' }} />
<span className="thread-legis"><Mark name="legis" style={{ color: 'var(--thread)' }} /></span>
```

Names: `foundryside` (parent org — paint in `--text-primary`/`--accent`, never a thread) · `weft` (the woven umbrella) · `loomweave` · `filigree` · `wardline` · `legis` · `charter` · `shuttle` (roadmap, dim slate) · `lacuna` (the adjacent demo specimen — off-palette mauve, dashed). Each member's canonical thread color lives in `--thread-<name>`.
