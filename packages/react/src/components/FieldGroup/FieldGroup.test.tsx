/**
 * @file FieldGroup.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for FieldGroup.
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
import { FieldGroup } from './FieldGroup'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'

describe('FieldGroup Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <FieldGroup>
          <Field label="First Name">
            <Input />
          </Field>
          <Field label="Last Name">
            <Input />
          </Field>
        </FieldGroup>
      )
      expect(screen.getByText('First Name')).toBeInTheDocument()
      expect(screen.getByText('Last Name')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('sets aria-required when required', () => {
      render(
        <FieldGroup required>
          <Field label="Email">
            <Input />
          </Field>
        </FieldGroup>
      )
      expect(screen.getByText('Email').closest('.ui-field-group')).toHaveAttribute('aria-required', 'true')
    })

    it('sets aria-disabled when disabled', () => {
      render(
        <FieldGroup disabled>
          <Field label="Email">
            <Input />
          </Field>
        </FieldGroup>
      )
      expect(screen.getByText('Email').closest('.ui-field-group')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('CSS Classes', () => {
    it('applies disabled class when disabled', () => {
      render(
        <FieldGroup disabled>
          <Field label="Email">
            <Input />
          </Field>
        </FieldGroup>
      )
      expect(screen.getByText('Email').closest('.ui-field-group')).toHaveClass('ui-field-group--disabled')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<FieldGroup><Field label="First Name"><input /></Field></FieldGroup>)
      expect(container).toMatchSnapshot()
    })
  })
})
