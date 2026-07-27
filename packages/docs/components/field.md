# Field Component

The Field component wraps form inputs with accessible labels, helper text, and error indicators.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Field label |
| `helperText` | `string` | `undefined` | Additional help message |
| `error` | `string` | `undefined` | Validation error message |
| `required` | `boolean` | `false` | Shows required asterisk indicator |

## Code Example

```tsx
<Field label="Email Address" helperText="We will never share your email." required>
  <Input type="email" placeholder="you@example.com" />
</Field>
```
