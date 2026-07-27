# Carousel Component

The Carousel component slides through multiple content items or images.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `autoPlay` | `boolean` | `false` | Enables automatic slide transitions |
| `interval` | `number` | `3000` | Auto-play slide duration in ms |

## Code Example

```tsx
<Carousel autoPlay interval={4000}>
  <Carousel.Item>Slide 1</Carousel.Item>
  <Carousel.Item>Slide 2</Carousel.Item>
</Carousel>
```
