# Alert Dialog Component

The Alert Dialog component interrupts the user with an important confirmation message requiring a direct action.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Controls open visibility |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback fired when open state changes |

## Code Example

```tsx
import { AlertDialog, Button } from '@evara-ui/react'

export default function Demo() {
  return (
    <AlertDialog open={true}>
      <AlertDialog.Header>Confirm Deletion</AlertDialog.Header>
      <AlertDialog.Body>Are you sure you want to delete this resource?</AlertDialog.Body>
      <AlertDialog.Footer>
        <Button variant="danger">Delete</Button>
      </AlertDialog.Footer>
    </AlertDialog>
  )
}
```
