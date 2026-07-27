# Select Component

The Select component provides an accessible dropdown interface for single or multiple item selections.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `Array<{ label: string, value: string }>` | `[]` | Selectable options |
| `value` | `string \| string[]` | `undefined` | Selected value(s) |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `multiple` | `boolean` | `false` | Enables multi-selection mode |

## Code Example

```tsx
<Select
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
  value={selected}
  onChange={(val) => setSelected(val)}
/>
```
