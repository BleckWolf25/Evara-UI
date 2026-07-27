# Radio & Radio Group Components

The Radio component allows users to select a single option from a Radio Group.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `undefined` | Radio option value |
| `label` | `string` | `undefined` | Option label |

## Code Example

```tsx
<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="option1" label="Standard Plan" />
  <Radio value="option2" label="Pro Plan" />
</RadioGroup>
```
