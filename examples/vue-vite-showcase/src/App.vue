/**
 * @file App.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for App.vue
 *
 * @description
 * Handles module responsibilities for App.vue.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
<script setup lang="ts">
import { ref } from 'vue'
import {
  ThemeProvider,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useForm,
  Button,
  Card,
  Dialog,
  Slider,
  Badge,
  Alert,
  Pagination,
  Input,
  ProgressBar
} from '@bleckwolf25/vue'

const isDialogOpen = ref(false)
const sliderValue = ref(65)
const currentPage = ref(1)

const { form } = useForm({
  initialValues: { username: '', email: '' },
  validate: (values) => {
    const errors: Record<string, string> = {}
    if (!values.username) errors['username'] = 'Username is required'
    if (!values.email) errors['email'] = 'Email is required'
    return errors
  },
  onSubmit: (values) => {
    alert(`Form Submitted: ${JSON.stringify(values)}`)
  },
})
</script>

<template>
  <ThemeProvider default-theme="light">
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: system-ui, sans-serif;">
      <header style="margin-bottom: 2rem; border-bottom: 1px solid var(--ui-color-border, #e5e7eb); padding-bottom: 1rem;">
        <h1 style="display: flex; align-items: center; gap: 0.75rem;">
          Evara UI - Vue 3 Showcase
          <Badge color="success">
            v1.0.0
          </Badge>
        </h1>
        <p style="color: #6b7280;">
          High-performance, accessible Vue 3 design system components built on headless core controllers.
        </p>
      </header>

      <Alert
        variant="info"
        style="margin-bottom: 1.5rem;"
      >
        Welcome to the Vue 3 Vite showcase! All components below are reactive and fully integrated with Evara UI tokens.
      </Alert>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 1.5rem;">
        <!-- Accessible Form System -->
        <Card variant="outlined">
          <Card.Header>
            <h3 style="margin: 0;">
              Accessible Form System
            </h3>
          </Card.Header>
          <Card.Body>
            <Form :form="form">
              <FormField
                v-slot="{ value, onChange, onBlur }"
                name="username"
              >
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      :value="value"
                      placeholder="Enter username"
                      @input="e => onChange((e.target as HTMLInputElement).value)"
                      @blur="onBlur"
                    />
                  </FormControl>
                  <FormDescription>Your account handler.</FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField
                v-slot="{ value, onChange, onBlur }"
                name="email"
              >
                <FormItem style="margin-top: 1rem;">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      :value="value"
                      placeholder="john@example.com"
                      @input="e => onChange((e.target as HTMLInputElement).value)"
                      @blur="onBlur"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <Button
                type="submit"
                variant="primary"
                style="margin-top: 1rem;"
              >
                Submit Form
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <!-- Interactive Controls & Primitives -->
        <Card variant="outlined">
          <Card.Header>
            <h3 style="margin: 0;">
              Radix Compound Dialog & Controls
            </h3>
          </Card.Header>
          <Card.Body style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <Button
                variant="primary"
                @click="isDialogOpen = true"
              >
                Open Dialog
              </Button>
              <Button variant="secondary">
                Secondary
              </Button>
              <Button variant="ghost">
                Ghost
              </Button>
            </div>
            <div>
              <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Volume Level ({{ sliderValue }}%)</label>
              <Slider
                v-model="sliderValue"
                :min="0"
                :max="100"
              />
            </div>
            <div>
              <ProgressBar
                :value="sliderValue"
                color="success"
              />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div style="margin-top: 2rem; display: flex; justify-content: center;">
        <Pagination
          v-model:current-page="currentPage"
          :total-pages="5"
        />
      </div>

      <!-- Radix-Style Compound Dialog -->
      <Dialog.Root v-model:open="isDialogOpen">
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Evara UI Compound Dialog</Dialog.Title>
            <Dialog.Description>Stateful data-state animation enabled in Vue.</Dialog.Description>
            <Dialog.Close />
          </Dialog.Header>
          <Dialog.Body>
            <p>This is a compound primitive dialog matching Radix UI standards.</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button
              variant="secondary"
              @click="isDialogOpen = false"
            >
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  </ThemeProvider>
</template>
