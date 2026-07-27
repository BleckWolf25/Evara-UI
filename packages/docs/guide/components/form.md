# Form & Validation System

Evara UI provides an accessible, headless Form & Field validation system powered by `FormController` and `FormFieldController` in `@evara-ui/core`.

## Features

- **Headless State & Controller Architecture**: Pure TypeScript controllers managing form values, error state, touched flags, dirty state, and submitting states.
- **Automated Accessibility (ARIA) Linkage**: `<FormItem>` automatically generates unique IDs and links `htmlFor`, `id`, `aria-invalid`, and `aria-describedby` across subcomponents.
- **Zod & Schema Validation**: Native support for sync/async schema validation functions.
- **Compound Component Primitives**: `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormDescription>`, `<FormMessage>`.

---

## React Usage

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useForm, Button, Input } from '@evara-ui/react'

export function UserRegistrationForm() {
  const form = useForm({
    initialValues: { username: '', email: '' },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.username) errors.username = 'Username is required'
      if (!values.email) errors.email = 'Email is required'
      return errors
    },
    onSubmit: (values) => {
      console.log('Submitted values:', values)
    },
  })

  return (
    <Form form={form}>
      <FormField name="username">
        {({ value, onChange, onBlur }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input value={value} onValueChange={onChange} onBlur={onBlur} placeholder="johndoe" />
            </FormControl>
            <FormDescription>Your public display handle.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      </FormField>

      <Button type="submit" variant="primary">
        Register
      </Button>
    </Form>
  )
}
```

---

## Vue Usage

```vue
<template>
  <Form :form="form">
    <FormField name="username" v-slot="{ value, onChange, onBlur }">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <input :value="value" @input="e => onChange(e.target.value)" @blur="onBlur" />
        </FormControl>
        <FormDescription>Your public display handle.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <button type="submit">Submit</button>
  </Form>
</template>

<script setup>
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useForm } from '@evara-ui/vue'

const { form } = useForm({
  initialValues: { username: '' },
  validate: (values) => (!values.username ? { username: 'Required' } : {}),
  onSubmit: (values) => console.log(values),
})
</script>
```
