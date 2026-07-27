# Date Picker Component

The Date Picker component allows selecting single dates or date ranges via a calendar popover.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `Date` | `undefined` | Selected date |
| `placeholder` | `string` | `'Select date...'` | Input placeholder |

## Code Example

```tsx
<DatePicker value={new Date()} onValueChange={(d) => console.log(d)} />
```
