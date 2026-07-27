# Theming & Customization System

Evara UI features a dynamic theme engine powered by CSS custom properties (`--ui-color-*`, `--ui-radius-*`) and the `<ThemeProvider>` context provider.

## Theme Provider Component

Use `<ThemeProvider>` in React and Vue to manage theme state (`light`, `dark`, or custom palette overrides) dynamically at runtime.

### React

```tsx
import { ThemeProvider, useTheme, Button } from '@bleckwolf25/react'

function ModeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button onClick={toggleTheme} variant="outline">
      Toggle Mode (Current: {theme})
    </Button>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ModeToggle />
    </ThemeProvider>
  )
}
```

### Vue 3 / Nuxt

```vue
<script setup>
import { ThemeProvider, useTheme, Button } from '@bleckwolf25/vue'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <ThemeProvider default-theme="light">
    <Button @click="toggleTheme">Toggle Theme (Current: {{ theme }})</Button>
  </ThemeProvider>
</template>
```

---

## Custom Palette Overrides

You can pass custom color tokens directly to `<ThemeProvider>`:

```tsx
const customTheme = {
  primary: '#8b5cf6', // Violet
  bgPrimary: '#0f172a',
  textPrimary: '#f8fafc',
  radius: '8px',
}

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

---

## Semantic Token Reference

| Variable | Description | Default Light | Default Dark |
| :--- | :--- | :--- | :--- |
| `--ui-color-primary` | Primary action & brand color | `#10b981` | `#10b981` |
| `--ui-color-secondary` | Secondary action color | `#6b7280` | `#9ca3af` |
| `--ui-color-success` | Success status color | `#10b981` | `#10b981` |
| `--ui-color-danger` | Error and destructive color | `#ef4444` | `#f87171` |
| `--ui-color-warning` | Warning status color | `#f59e0b` | `#fbbf24` |
| `--ui-color-info` | Information status color | `#3b82f6` | `#60a5fa` |

---

## Motion Sensitivity (`prefers-reduced-motion`)

Evara UI automatically respects user system motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
