# Avatar Component

The Avatar component displays user profile images, fallback initials, or status indicators.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | `undefined` | Profile image URL |
| `name` | `string` | `undefined` | User name used to generate fallback initials |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the avatar |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | `undefined` | Optional status indicator badge |

## Code Example

```tsx
<Avatar src="https://i.pravatar.cc/150" name="Jane Doe" size="lg" status="online" />
```
