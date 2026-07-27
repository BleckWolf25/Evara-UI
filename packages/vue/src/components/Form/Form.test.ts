/**
 * @file Form.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Form.
 *
 * @description
 * Executes test assertions validating behavior, accessibility attributes, and props.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useForm } from './Form'
import { defineComponent, h } from 'vue'

const TestFormComponent = defineComponent({
  emits: ['submit'],
  setup(_, { emit }) {
    const { form } = useForm({
      initialValues: { username: '' },
      validate: (values) => {
        const errors: Record<string, string> = {}
        if (!values.username) errors.username = 'Username is required'
        return errors
      },
      onSubmit: (values) => { emit('submit', values); },
    })

    return () =>
      h(Form, { form }, () => [
        h(FormField, { name: 'username' }, {
          default: ({ value, onChange, onBlur }: { value: string, onChange: (val: string) => void, onBlur: () => void }) =>
            h(FormItem, null, () => [
              h(FormLabel, null, () => 'Username'),
              h(FormControl, null, () =>
                h('input', {
                  type: 'text',
                  value,
                  onInput: (e: Event) => { onChange((e.target as HTMLInputElement).value) },
                  onBlur,
                })
              ),
              h(FormDescription, null, () => 'Your public display name'),
              h(FormMessage),
            ]),
        }),
        h('button', { type: 'submit' }, 'Submit'),
      ])
  },
})

describe('Vue Form Component', () => {
  it('renders form elements and accessibility labels', () => {
    render(TestFormComponent)

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Your public display name')).toBeInTheDocument()
  })

  it('renders error message on invalid submit', async () => {
    render(TestFormComponent)

    await fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument()
    })
  })
})
