**Dialog** — the Weft overlay, in two flavors: a centered `modal` (confirmations, forms) and a right-edge `panel` (the dashboard's issue-detail slide-in). Flat dim backdrop (no glass), fast 0.2s ease transition; Esc and backdrop-click both call `onClose`. Stays mounted while closed so the transition runs.

```jsx
const [open, setOpen] = React.useState(false);

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Close all done issues?"
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={confirm}>Close all</Button>
  </>}
>
  This archives 3 done issues. context.md will regenerate.
</Dialog>

<Dialog variant="panel" open={!!sel} onClose={() => setSel(null)} title={sel?.id} width={460}>
  …detail fields…
</Dialog>
```

Compose `Button` in the `footer`. For a full issue-detail panel, the `filigree-dashboard` UI kit's DetailPanel is the reference layout.
