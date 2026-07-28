# @bleckwolf25/svelte

> Svelte (4 & 5) component helpers and reactive stores for Evara UI design system.

`@bleckwolf25/svelte` provides lightweight Svelte stores, prop builders, and state controller helpers.

## 📦 Installation

```bash
npm install @bleckwolf25/svelte @bleckwolf25/styles
# or
pnpm add @bleckwolf25/svelte @bleckwolf25/styles
```

## 🚀 Getting Started

```svelte
<script>
  import '@bleckwolf25/styles/dist/index.css'
  import { createButtonProps, createFormStore } from '@bleckwolf25/svelte'

  const buttonProps = createButtonProps({ variant: 'primary', size: 'md' })
  const form = createFormStore({ initialValues: { email: '' } })
</script>

<button {...buttonProps}>
  Submit
</button>
```

## 📄 License

MIT License © BleckWolf25
