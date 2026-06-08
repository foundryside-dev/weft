**Checkbox** — a controlled box + label for filter toggles ("Ready only", "Show released"). Checked fills with amber and shows an ink check; the whole label is the hit target.

```jsx
<Checkbox checked={readyOnly} onChange={e => setReadyOnly(e.target.checked)}>Ready only</Checkbox>
<Checkbox checked={false}>Show released</Checkbox>
```
