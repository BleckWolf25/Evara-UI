/**
 * @file App.svelte
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for App.svelte
 *
 * @description
 * Handles module responsibilities for App.svelte.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
<script lang="ts">
  import { useTheme, useForm, createButtonProps, createCardProps, createDialogProps } from '@evara-ui/svelte'

  const theme = useTheme({ defaultTheme: 'light' })

  const form = useForm<{ username: string; email: string }>({
    initialValues: { username: '', email: '' },
    validate: (values) => {
      const errors: any = {}
      if (!values.username) errors.username = 'Username is required'
      if (!values.email) errors.email = 'Email is required'
      return errors
    },
  })

  let dialogOpen = false
  const btnProps = createButtonProps({ variant: 'primary', size: 'md' })
  const cardProps = createCardProps({ variant: 'outlined', elevation: 'md' })

  const toggleDialog = () => {
    dialogOpen = !dialogOpen
  }

  const handleFormSubmit = async () => {
    const valid = await form.validate()
    if (valid) {
      alert(`Submitted: ${JSON.stringify($form.values)}`)
    }
  }
</script>

<main style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
  <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h1>Evara UI - Svelte 4/5 Showcase</h1>
    <button class="ui-button ui-button--outline" on:click={() => theme.toggleTheme()}>
      Theme: {$theme}
    </button>
  </header>

  <div class={cardProps.class} style="padding: 1.5rem; margin-bottom: 2rem;">
    <h2 style="margin-top: 0;">Interactive Components</h2>
    <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
      <button class={btnProps.class} on:click={toggleDialog}>
        Open Svelte Modal
      </button>
      <span class="ui-badge ui-badge--success">Active Svelte Store</span>
    </div>
  </div>

  {#if dialogOpen}
    <div class="ui-dialog__overlay" on:click={toggleDialog}>
      <div class="ui-dialog" style="max-width: 400px;" on:click|stopPropagation>
        <div class="ui-dialog__header">
          <h3 class="ui-dialog__title">Svelte Dialog Modal</h3>
          <button class="ui-dialog__close-button" on:click={toggleDialog}>✕</button>
        </div>
        <div class="ui-dialog__body">
          <p>This modal dialog is powered by @evara-ui/svelte and @evara-ui/core.</p>
        </div>
        <div class="ui-dialog__footer">
          <button class="ui-button ui-button--secondary" on:click={toggleDialog}>Close</button>
        </div>
      </div>
    </div>
  {/if}

  <div class={cardProps.class} style="padding: 1.5rem;">
    <h2 style="margin-top: 0;">Form Validation Demo</h2>
    <form on:submit|preventDefault={handleFormSubmit}>
      <div style="margin-bottom: 1rem;">
        <label for="username" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Username</label>
        <input
          id="username"
          type="text"
          class="ui-input"
          value={$form.values.username}
          on:input={(e) => form.setValue('username', e.currentTarget.value)}
        />
        {#if $form.errors.username}
          <span style="color: #ef4444; font-size: 0.875rem;">{$form.errors.username}</span>
        {/if}
      </div>

      <div style="margin-bottom: 1rem;">
        <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
        <input
          id="email"
          type="email"
          class="ui-input"
          value={$form.values.email}
          on:input={(e) => form.setValue('email', e.currentTarget.value)}
        />
        {#if $form.errors.email}
          <span style="color: #ef4444; font-size: 0.875rem;">{$form.errors.email}</span>
        {/if}
      </div>

      <button type="submit" class="ui-button ui-button--primary">Submit Form</button>
    </form>
  </div>
</main>
