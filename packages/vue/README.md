# @bleckwolf25/vue

> Vue 3 component library and plugin for Evara UI design system.

`@bleckwolf25/vue` provides reactive, accessible Vue 3 components and composable state hooks powered by Evara headless controllers.

## 📦 Installation

```bash
npm install @bleckwolf25/vue @bleckwolf25/styles
# or
pnpm add @bleckwolf25/vue @bleckwolf25/styles
```

## 🚀 Getting Started

### Option 1: Vue Plugin Registration

```typescript
import { createApp } from 'vue'
import EvaraUI from '@bleckwolf25/vue'
import '@bleckwolf25/styles/dist/index.css'
import '@bleckwolf25/vue/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(EvaraUI)
app.mount('#app')
```

### Option 2: Individual Component Imports

```vue
<script setup>
import { Button, Card, Alert } from '@bleckwolf25/vue'
import '@bleckwolf25/styles/dist/index.css'
import '@bleckwolf25/vue/dist/index.css'
</script>

<template>
  <Card>
    <Alert variant="success">Operation completed successfully!</Alert>
    <Button variant="primary">Submit</Button>
  </Card>
</template>
```

## 📄 License

MIT License © BleckWolf25
