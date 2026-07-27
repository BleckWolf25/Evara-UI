# Plug and Play Zero-Import Architecture

Evara UI supports a zero-import developer experience across React, Vue, Nuxt, and Web Components. Once configured in your build setup or root entry point, all components (`<Button>`, `<Card>`, `<Dialog>`, `<Form>`) and composables (`useForm`, `useTheme`) are automatically available everywhere in your codebase without any manual `import` statements!

---

## 1. Vue 3 (Vite / Webpack)

### Option A: Global Vue Plugin (`app.use`)

Register Evara UI once in your `main.ts`:

```ts
import { createApp } from 'vue'
import { EvaraUI } from '@evara-ui/vue'
import '@evara-ui/styles/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(EvaraUI) // Registers <Button>, <Card>, <Dialog>, etc. globally
app.mount('#app')
```

Now use any component directly in your Vue SFC files without imports:

```vue
<!-- App.vue -->
<template>
  <Card>
    <Button variant="primary">Zero-Import Button</Button>
  </Card>
</template>
```

### Option B: Build-Time Resolver (`@evara-ui/unplugin`)

Add `EvaraVueResolver` to `unplugin-vue-components` in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { EvaraVueResolver } from '@evara-ui/unplugin'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [EvaraVueResolver()],
    }),
  ],
})
```

---

## 2. Nuxt 3 & 4

Add `@evara-ui/nuxt` to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@evara-ui/nuxt']
})
```

All 30+ components, compound subcomponents, and composables (`useForm`, `useTheme`, `useDisclosure`) are auto-imported across your Nuxt app with zero configuration!

---

## 3. React & Next.js

Add `evaraReactVitePlugin` (or Webpack plugin) to your `vite.config.ts` or `next.config.js`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { evaraReactVitePlugin } from '@evara-ui/unplugin'

export default defineConfig({
  plugins: [
    react(),
    evaraReactVitePlugin(),
  ],
})
```

Now use components directly in your TSX files without manually writing imports:

```tsx
export default function Dashboard() {
  return (
    <Card>
      <Button variant="primary">Auto-Imported Component</Button>
    </Card>
  )
}
```

---

## 4. HTML Custom Elements (Web Components)

Register native Custom Elements ONCE in your client entry point:

```ts
import { registerEvaraCustomElements } from '@evara-ui/core'
registerEvaraCustomElements()
```

Use `<evara-button>`, `<evara-card>`, `<evara-badge>`, etc. natively in standard HTML, Svelte, Angular, or PHP templates without any JS imports!
