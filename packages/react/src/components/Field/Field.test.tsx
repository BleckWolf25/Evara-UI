/**
 * @file Field.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Field.
 *
 * @description
 * Executes test assertions validating behavior, accessibility attributes, and props.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Field } from './Field'
import { Input } from '../Input/Input'

describe('Field Component', () => {
  describe('Rendering', () => {
    it('renders label correctly', () => {
      render(
        <Field label="Email">
          <Input />
        </Field>
      )
      expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('renders helper text correctly', () => {
      render(
        <Field label="Email" helperText="Enter your email address">
          <Input />
        </Field>
      )
      expect(screen.getByText('Enter your email address')).toBeInTheDocument()
    })

    it('renders error message correctly', () => {
      render(
        <Field label="Email" error="Invalid email">
          <Input />
        </Field>
      )
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
    })

    it('renders required indicator when required', () => {
      render(
        <Field label="Email" required>
          <Input />
        </Field>
      )
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('does not render required indicator when not required', () => {
      render(
        <Field label="Email">
          <Input />
        </Field>
      )
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('sets aria-invalid when error is present', () => {
      render(
        <Field label="Email" error="Invalid email">
          <Input />
        </Field>
      )
      expect(screen.getByText('Email').closest('div')).toHaveAttribute('aria-invalid', 'true')
    })

    it('sets aria-required when required', () => {
      render(
        <Field label="Email" required>
          <Input />
        </Field>
      )
      expect(screen.getByText('Email').closest('div')).toHaveAttribute('aria-required', 'true')
    })

    it('sets aria Disabled when disabled', () => {
      render(
        <Field label="Email" disabled>
          <Input />
        </Field>
      )
      expect(screen.getByText('Email').closest('div')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('CSS Classes', () => {
    it('applies error class when error is present', () => {
      render(
        <Field label="Email" error="Invalid email">
          <Input />
        </Field>
      )
      expect(screen.getByText('Email').closest('div')).toHaveClass('ui-field--error')
    })

    it('applies disabled class when disabled', () => {
      render(
        <Field label="Email" disabled>
          <Input />
        </Field>
      )
      expect(screen.getByText('Email').closest('div')).toHaveClass('ui-field--disabled')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Field label="Username"><input type="text" /></Field>)
      expect(container).toMatchSnapshot()
    })
  })
})
