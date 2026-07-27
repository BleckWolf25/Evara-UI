# Input Group Component

The Input Group component attaches buttons, icons, or dropdown addons to text inputs.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Disables grouped controls |

## Code Example

```tsx
<InputGroup>
  <InputGroup.Addon>$</InputGroup.Addon>
  <Input type="number" placeholder="0.00" />
  <Button variant="primary">Pay</Button>
</InputGroup>
```
