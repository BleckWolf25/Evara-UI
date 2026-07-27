# Dialog Component

The `Dialog` component displays accessible modal dialog windows over the main viewport with focus trapping, `Escape` key listeners, `data-state="open|closed"` keyframe animations, and full compound component composition.

## Subcomponents & Primitives

- `Dialog.Root`: Root state container.
- `Dialog.Trigger`: Button trigger opening the dialog.
- `Dialog.Overlay`: Backdrop overlay with fade animations.
- `Dialog.Content`: Dialog modal container.
- `Dialog.Header`: Header section container.
- `Dialog.Title`: Accessible modal heading (`h2`).
- `Dialog.Description`: Subtitle description text (`p`).
- `Dialog.Body`: Main content area.
- `Dialog.Footer`: Action button section.
- `Dialog.Close`: Dismiss button.

---

## Radix-Style Compound Composition

```tsx
import { Dialog, Button } from '@bleckwolf25/react'

export function ModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Open Modal</Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Confirm Action</Dialog.Title>
          <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          <p>This action cannot be undone.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
          <Button variant="danger" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

---

## Single-Tag Shorthand Example

```tsx
<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
  <Dialog.Header>Modal Title</Dialog.Header>
  <Dialog.Body>Modal Content</Dialog.Body>
  <Dialog.Footer>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </Dialog.Footer>
</Dialog>
```
