# Calendar Component

The Calendar component provides date visualization, month navigation, and date selection.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `Date` | `undefined` | Selected date |
| `onValueChange` | `(date: Date) => void` | `undefined` | Callback fired on date selection |

## Code Example

```tsx
<Calendar value={new Date()} onValueChange={(d) => console.log(d)} />
```
