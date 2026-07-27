# Getting Started with Evara UI

Evara UI is an open-source, multi-framework design system providing modular, accessible UI components across React, Vue 3, Nuxt 4, Svelte, and Web Components.

## Installation

Install the package corresponding to your framework:

::: code-group

```bash [React]
pnpm add @bleckwolf25/react @bleckwolf25/styles
```

```bash [Vue 3]
pnpm add @bleckwolf25/vue @bleckwolf25/styles
```

```bash [Nuxt 3 & 4]
pnpm add @bleckwolf25/nuxt
```

```bash [Svelte 4 & 5]
pnpm add @bleckwolf25/svelte @bleckwolf25/styles
```

```bash [Web Components / HTML]
pnpm add @bleckwolf25/core @bleckwolf25/styles
```

:::

## Usage

### React

```tsx
import { ThemeProvider, Button, Card } from '@bleckwolf25/react'
import '@bleckwolf25/styles/dist/index.css'

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Card>
        <Button variant="primary">Go to Dashboard</Button>
      </Card>
    </ThemeProvider>
  )
}
```

### Vue 3

```ts
import { createApp } from 'vue'
import { EvaraUI } from '@bleckwolf25/vue'
import '@bleckwolf25/styles/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(EvaraUI)
app.mount('#app')
```

### Svelte 4 & 5

```svelte
<script lang="ts">
  import { useTheme, createButtonProps, createCardProps } from '@bleckwolf25/svelte'
  import '@bleckwolf25/styles/dist/index.css'

  const theme = useTheme({ defaultTheme: 'light' })
  const btn = createButtonProps({ variant: 'primary' })
  const card = createCardProps({ variant: 'outlined' })
</script>

<div class={card.class}>
  <button class={btn.class} on:click={() => theme.toggleTheme()}>
    Theme: {$theme}
  </button>
</div>
```

### Nuxt 3 & 4

```ts
export default defineNuxtConfig({
  modules: ['@bleckwolf25/nuxt']
})
```

### Web Components

```ts
import { registerEvaraCustomElements } from '@bleckwolf25/core'
registerEvaraCustomElements()
```

```html
<evara-card variant="outlined">
  <evara-button variant="primary">Native Web Component</evara-button>
</evara-card>
```
