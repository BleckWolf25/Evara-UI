# Progress Bar Component

The Progress Bar component communicates operation progress or status load states.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `0` | Completion percentage (0 to 100) |
| `indeterminate` | `boolean` | `false` | Shows continuous animation loop |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Progress bar color |

## Code Example

```tsx
<ProgressBar value={75} color="primary" />
```
