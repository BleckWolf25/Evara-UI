# Checkbox Component

The Checkbox component allows users to select one or more items from a set.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `label` | `string` | `undefined` | Checkbox label text |

## Code Example

```tsx
<Checkbox checked={true} label="Accept Terms & Conditions" onChange={(e) => console.log(e.target.checked)} />
```
