**Toast** — a small transient notification: surface card, tone-colored 3px left rule, soft popover shadow, optional leading glyph and × dismiss. Tone is semantic (ready / stale / accent / a member thread). The component is one slip — stack several in your own fixed corner container.

```jsx
<Toast tone="var(--ready)" icon="●" title="Issue advanced" onDismiss={dismiss}>
  fg-7f3a → building · context.md regenerated
</Toast>
<Toast tone="var(--stale)" icon="🔗" title="Blocked">fg-da8d is blocked by fg-9920aa</Toast>
```

For the in-place "a card's data changed" cue, use `ChangeFlash` instead — Toast is for out-of-band notifications.
