# Input Component

The Input component renders text inputs with variant styling and prefix/suffix slot support.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Validation visual state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size scale |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |

## Code Example

```tsx
<Input variant="default" size="md" placeholder="Enter text..." />
```
