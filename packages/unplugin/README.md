# @bleckwolf25/unplugin

> Zero-import automatic component & composable resolver for Evara UI across Vite, Webpack, Rspack, Vue, React, Next.js, and Nuxt.

`@bleckwolf25/unplugin` automates auto-importing Evara UI components and hooks for Vite, Webpack, Rspack, and Rollup bundlers.

## 📦 Installation

```bash
npm install @bleckwolf25/unplugin -D
# or
pnpm add @bleckwolf25/unplugin -D
```

## 🚀 Usage

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import EvaraResolver from '@bleckwolf25/unplugin/vite'

export default defineConfig({
  plugins: [
    EvaraResolver({
      target: 'react' // or 'vue' | 'svelte'
    })
  ]
})
```

## 📄 License

MIT License © BleckWolf25
