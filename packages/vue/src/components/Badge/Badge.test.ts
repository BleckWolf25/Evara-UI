/**
 * @file Badge.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Badge.
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
import { Badge } from './Badge'

// ---------- TESTS
describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(Badge, {
        slots: { default: 'New' }
      })
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('applies color classes correctly', () => {
      render(Badge, {
        props: { color: 'success' },
        slots: { default: 'Success' }
      })
      expect(screen.getByText('Success')).toHaveClass('ui-badge--success')
    })

    it('applies size classes correctly', () => {
      render(Badge, {
        props: { size: 'lg' },
        slots: { default: 'Large' }
      })
      expect(screen.getByText('Large')).toHaveClass('ui-badge--lg')
    })

    it('applies position classes correctly', () => {
      render(Badge, {
        props: { position: 'top-right' },
        slots: { default: 'Notification' }
      })
      expect(screen.getByText('Notification')).toHaveClass('ui-badge--top-right')
    })
  })

  describe('Accessibility', () => {
    it('sets role="status"', () => {
      render(Badge, {
        slots: { default: 'Status' }
      })
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })
})
