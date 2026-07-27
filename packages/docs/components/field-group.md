# Field Group Component

The Field Group component groups multiple related form fields together under a single ARIA fieldset.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Disables all child fields |
| `required` | `boolean` | `false` | Fieldset required indicator |

## Code Example

```tsx
<FieldGroup legend="Personal Information">
  <Field label="First Name"><Input /></Field>
  <Field label="Last Name"><Input /></Field>
</FieldGroup>
```
