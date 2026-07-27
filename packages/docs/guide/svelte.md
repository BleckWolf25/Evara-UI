# Svelte Integration & Store Guide

Evara UI provides full Svelte 4 & 5 support through `@bleckwolf25/svelte`, offering reactive stores, component helpers, and compound primitives built on `@bleckwolf25/core`.

## Installation

```bash
pnpm add @bleckwolf25/svelte @bleckwolf25/styles
```

---

## 1. Theme Provider & Dark Mode Store

Use `createThemeStore` or `useTheme` for reactive light/dark theme switching:

```svelte
<script lang="ts">
  import { useTheme } from '@bleckwolf25/svelte'
  import '@bleckwolf25/styles/dist/index.css'

  const theme = useTheme({ defaultTheme: 'light' })
</script>

<button class="ui-button ui-button--outline" on:click={() => theme.toggleTheme()}>
  Current Mode: {$theme}
</button>
```

---

## 2. Form & Field Validation Store

`createFormStore` manages form values, validation schemas, touched fields, and submit state reactively:

```svelte
<script lang="ts">
  import { useForm } from '@bleckwolf25/svelte'

  const form = useForm({
    initialValues: { email: '' },
    validate: (values) => {
      const errors: any = {}
      if (!values.email) errors.email = 'Email is required'
      return errors
    },
  })

  async function handleSubmit() {
    const isValid = await form.validate()
    if (isValid) {
      alert(`Submitted: ${$form.values.email}`)
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="email"
    class="ui-input"
    value={$form.values.email}
    on:input={(e) => form.setValue('email', e.currentTarget.value)}
  />
  {#if $form.errors.email}
    <p style="color: red;">{$form.errors.email}</p>
  {/if}

  <button type="submit" class="ui-button ui-button--primary">Submit</button>
</form>
```

---

## 3. Zero-Import Resolver (`@bleckwolf25/unplugin`)

To enable zero-import component resolution in your Svelte Vite project, add `EvaraSvelteResolver` to `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Components from 'unplugin-vue-components/vite'
import { EvaraSvelteResolver } from '@bleckwolf25/unplugin'

export default defineConfig({
  plugins: [
    svelte(),
    Components({
      resolvers: [EvaraSvelteResolver()],
    }),
  ],
})
```
