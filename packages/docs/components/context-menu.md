# Context Menu Component

The Context Menu component displays custom action menus upon right-clicking a target area.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `Array<{ label: string, onClick: () => void }>` | `[]` | List of menu items |

## Code Example

```tsx
<ContextMenu items={[{ label: 'Copy', onClick: () => {} }, { label: 'Paste', onClick: () => {} }]}>
  <div style={{ padding: '2rem', border: '1px dashed #ccc' }}>Right click inside this area</div>
</ContextMenu>
```
