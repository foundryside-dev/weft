**ChangeFlash** — wraps an element (typically an `IssueCard` or a data row) and emits the brand's signature one-shot accent pulse whenever `flashKey` changes. It's the system's only non-cursor ambient motion: a brief box-shadow bloom that fades over 0.6s, never a loop. Skips the pulse under `prefers-reduced-motion` (content still updates).

```jsx
{/* pulses each time the issue's status/age changes */}
<ChangeFlash flashKey={`${issue.status}:${issue.ageH}`}>
  <IssueCard issue={issue} onOpen={open} />
</ChangeFlash>
```

Bump `flashKey` to whatever should trigger the cue (a version number, `updatedAt`, a JSON hash of the row). Pass `color` a thread var to flash in a member's color.
