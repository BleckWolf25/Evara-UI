/**
 * @file Alert.test.tsx
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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Alert>Alert message</Alert>)
      expect(screen.getByText('Alert message')).toBeInTheDocument()
    })

    it('renders icon when showIcon is true', () => {
      render(<Alert showIcon>Alert message</Alert>)
      expect(screen.getByText('ℹ️')).toBeInTheDocument()
    })

    it('renders close button when dismissible is true', () => {
      render(<Alert dismissible>Alert message</Alert>)
      expect(screen.getByLabelText('Close')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onDismiss when close button is clicked', async () => {
      const user = userEvent.setup()
      const handleDismiss = vi.fn()

      render(<Alert dismissible onDismiss={handleDismiss}>Alert message</Alert>)

      await user.click(screen.getByLabelText('Close'))
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('hides alert after dismissal', async () => {
      const user = userEvent.setup()

      render(<Alert dismissible>Alert message</Alert>)

      expect(screen.getByText('Alert message')).toBeInTheDocument()

      await user.click(screen.getByLabelText('Close'))

      expect(screen.queryByText('Alert message')).not.toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies variant class correctly', () => {
      render(<Alert variant="success">Alert message</Alert>)
      expect(screen.getByText('Alert message').closest('.ui-alert')).toHaveClass('ui-alert--success')
    })
  })

  describe('Accessibility', () => {
    it('sets role="alert"', () => {
      render(<Alert>Alert message</Alert>)
      expect(screen.getByText('Alert message').closest('.ui-alert')).toHaveAttribute('role', 'alert')
    })

    it('sets aria-live="polite"', () => {
      render(<Alert>Alert message</Alert>)
      expect(screen.getByText('Alert message').closest('.ui-alert')).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Alert variant="info">Alert message</Alert>)
      expect(container).toMatchSnapshot()
    })
  })
})
