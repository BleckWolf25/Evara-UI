/**
 * @file FieldGroup.test.ts
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
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { FieldGroup } from './FieldGroup'

describe('FieldGroup Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(FieldGroup, {
        slots: { default: 'Group Content' }
      })
      expect(screen.getByText('Group Content')).toBeInTheDocument()
    })

    it('applies aria-disabled when disabled is true', () => {
      const { container } = render(FieldGroup, {
        props: { disabled: true }
      })
      expect(container.firstChild).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
