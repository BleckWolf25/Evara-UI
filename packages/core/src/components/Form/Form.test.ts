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
import { describe, it, expect, vi } from 'vitest'
import { FormController } from './Form.controller'

describe('FormController', () => {
  it('initializes with initial values', () => {
    const form = new FormController({
      initialValues: { email: 'test@example.com', name: '' },
    })

    expect(form.getValues()).toEqual({ email: 'test@example.com', name: '' })
    expect(form.getValue('email')).toBe('test@example.com')
  })

  it('updates field value and notifies listeners', () => {
    const form = new FormController({
      initialValues: { name: '' },
    })

    const listener = vi.fn()
    form.subscribe(listener)

    form.setFieldValue('name', 'Alice', false)

    expect(form.getValue('name')).toBe('Alice')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('runs validation function and sets errors', async () => {
    const form = new FormController({
      initialValues: { email: '' },
      validate: (values) => {
        const errors: Record<string, string> = {}
        if (!values.email) errors['email'] = 'Email is required'
        return errors
      },
    })

    const errors = await form.validateForm()

    expect(errors.email).toBe('Email is required')
    expect(form.getFieldError('email')).toBe('Email is required')
  })

  it('handles form submission when valid', async () => {
    const onSubmit = vi.fn()
    const form = new FormController({
      initialValues: { username: 'john' },
      onSubmit,
    })

    await form.handleSubmit()

    expect(onSubmit).toHaveBeenCalledWith({ username: 'john' })
    expect(form.isFieldTouched('username')).toBe(true)
  })

  it('resets form to initial values', () => {
    const form = new FormController({
      initialValues: { count: 0 },
    })

    form.setFieldValue('count', 5, false)
    expect(form.getValue('count')).toBe(5)

    form.resetForm()
    expect(form.getValue('count')).toBe(0)
  })
})
