# Popover Component

The Popover component displays interactive floating panels relative to a trigger element.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Controls open state |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Popover positioning |

## Code Example

```tsx
<Popover trigger={<Button>Open Popover</Button>}>
  <div style={{ padding: '1rem' }}>Popover Content Body</div>
</Popover>
```
