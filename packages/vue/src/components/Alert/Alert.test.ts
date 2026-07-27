/**
 * @file Alert.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Alert.
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
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './Alert'

// ---------- TESTS
describe('Alert Component', () => {
  describe('Rendering', () => {
    it('renders default slot correctly', () => {
      render(Alert, {
        slots: { default: 'Alert message' }
      })
      expect(screen.getByText('Alert message')).toBeInTheDocument()
    })

    it('shows variant classes', () => {
      render(Alert, {
        props: { variant: 'success' },
        slots: { default: 'Success' }
      })
      expect(screen.getByText('Success').parentElement).toHaveClass('ui-alert--success')
    })

    it('displays icon when showIcon is true', () => {
      render(Alert, {
        props: { showIcon: true, variant: 'success' },
        slots: { default: 'Success' }
      })
      expect(screen.getByText('✓')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls dismiss and hides when close button is clicked', async () => {
      const user = userEvent.setup()
      const handleDismiss = vi.fn()
      render(Alert, {
        props: { dismissible: true, onDismiss: handleDismiss },
        slots: { default: 'Dismissible alert' }
      })

      const closeButton = screen.getByRole('button', { name: 'Close' })
      expect(closeButton).toBeInTheDocument()
      await user.click(closeButton)

      expect(handleDismiss).toHaveBeenCalledTimes(1)
      expect(screen.queryByText('Dismissible alert')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has role="alert"', () => {
      render(Alert, {
        slots: { default: 'Alert' }
      })
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
