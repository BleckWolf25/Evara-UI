# Button Group Component

The Button Group component groups multiple related buttons together in a single visual container.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Synchronized button size |

## Code Example

```tsx
<ButtonGroup orientation="horizontal" size="md">
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>
```
