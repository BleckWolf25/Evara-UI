# Card Component

The Card component organizes related content, actions, and media in a structured container.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'default' \| 'outline' \| 'elevated'` | `'default'` | Visual style variant |
| `elevation` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Shadow depth |

## Code Example

```tsx
<Card variant="outline">
  <Card.Header>Card Header</Card.Header>
  <Card.Body>Card Content Body</Card.Body>
  <Card.Footer>Card Footer Actions</Card.Footer>
</Card>
```
