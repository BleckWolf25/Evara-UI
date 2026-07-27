# Resizable Component

The Resizable component provides dynamic container resizing via drag handles.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `undefined` | Width in pixels |
| `height` | `number` | `undefined` | Height in pixels |
| `onResize` | `(size: { width: number, height: number }) => void` | `undefined` | Callback fired during resizing |

## Code Example

```tsx
<Resizable width={300} height={200} onResize={(s) => console.log(s)}>
  <div>Resizable Content Area</div>
</Resizable>
```
