# Button Component

The `Button` component triggers an action, event, or navigation. Supports polymorphic element rendering (`as` prop), loading spinners, and full accessibility semantics.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `as` | `ElementType \| string \| Component` | `'button'` | Polymorphic element to render (e.g. `'a'`, `Link`, `NavLink`) |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `disabled` | `boolean` | `false` | Disables button and prevents click handlers |
| `loading` | `boolean` | `false` | Shows a loading spinner and sets `aria-busy="true"` |
| `fullWidth` | `boolean` | `false` | Expands button to 100% container width |

---

## Polymorphic `as` Prop Example

```tsx
import { Button } from '@evara-ui/react'

// Rendered as native HTML anchor element
<Button as="a" href="/dashboard" variant="outline">
  Go to Dashboard
</Button>

// Rendered with React Router Link
<Button as={Link} to="/settings" variant="primary">
  Settings
</Button>
```
