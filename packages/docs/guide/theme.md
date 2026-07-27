# Theme Provider & Dynamic Tokens

Evara UI includes a theme engine that dynamically generates and updates root CSS custom variables (`--ui-color-*`, `--ui-radius-*`).

## Theme Provider

Wrap your application root with `<ThemeProvider>` to enable theme switching and token customization.

```tsx
import { ThemeProvider, useTheme, Button } from '@evara-ui/react'

function ModeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button onClick={toggleTheme}>
      Current Mode: {theme}
    </Button>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ModeSwitcher />
    </ThemeProvider>
  )
}
```

## Custom Theme Tokens

Pass custom color palettes and border radii directly to `<ThemeProvider>`:

```tsx
const customPalette = {
  primary: '#8b5cf6', // Violet
  bgPrimary: '#0f172a',
  textPrimary: '#f8fafc',
  radius: '8px',
}

<ThemeProvider theme={customPalette}>
  <App />
</ThemeProvider>
```
