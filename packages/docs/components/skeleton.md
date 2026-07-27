# Skeleton Component

The Skeleton component renders placeholder shapes while data is loading.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `shape` | `'text' \| 'circular' \| 'rectangular'` | `'text'` | Visual placeholder shape |
| `animate` | `boolean` | `true` | Pulse animation state |

## Code Example

```tsx
<Skeleton shape="rectangular" style={{ width: '100%', height: '120px' }} />
```
