# Slider Component

The Slider component allows users to select a single numeric value or a value range along a track.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number \| [number, number]` | `0` | Single value or range tuple |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Increment step |

## Code Example

```tsx
<Slider value={50} min={0} max={100} onChange={(v) => console.log(v)} />
```
