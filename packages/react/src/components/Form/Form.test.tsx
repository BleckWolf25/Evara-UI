/**
 * @file Form.test.tsx
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
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useForm } from './Form'

function TestForm({ onSubmit }: { onSubmit: (values: Record<string, unknown>) => void }) {
  const form = useForm({
    initialValues: { email: '' },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.email) errors['email'] = 'Email is required'
      return errors
    },
    onSubmit,
  })

  return (
    <Form form={form}>
      <FormField name="email">
        {({ value, onChange, onBlur }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <input
                type="email"
                value={value as string}
                onChange={(e) => { onChange(e.target.value); }}
                onBlur={onBlur}
              />
            </FormControl>
            <FormDescription>We will never share your email.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      </FormField>
      <button type="submit">Submit</button>
    </Form>
  )
}

describe('React Form Component', () => {
  it('renders label, input, description, and accessibility attributes', () => {
    render(<TestForm onSubmit={vi.fn()} />)

    const label = screen.getByText('Email Address')
    const input = screen.getByRole('textbox')
    const description = screen.getByText('We will never share your email.')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(input).toHaveAttribute('id')
    expect(label).toHaveAttribute('for', input.getAttribute('id'))
  })

  it('displays error message on submit when invalid', async () => {
    const handleSubmit = vi.fn()
    render(<TestForm onSubmit={handleSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('submits form values when valid', async () => {
    const handleSubmit = vi.fn()
    render(<TestForm onSubmit={handleSubmit} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'user@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ email: 'user@example.com' })
    })
  })
})
