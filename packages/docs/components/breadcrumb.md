# Breadcrumb Component

The Breadcrumb component renders hierarchy navigation links indicating the current page location.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `separator` | `ReactNode` | `'/'` | Custom separator between breadcrumb items |

## Code Example

```tsx
<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
</Breadcrumb>
```
