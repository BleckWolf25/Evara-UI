/**
 * @file AlertDialog.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for AlertDialog.
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
import { AlertDialog } from './AlertDialog'

// ---------- TESTS
describe('AlertDialog Component', () => {
  const defaultProps = {
    open: true,
    title: 'Are you sure?',
    description: 'This action cannot be undone.'
  }

  describe('Rendering', () => {
    it('renders title, description, and action buttons when open', () => {
      render(AlertDialog, { props: defaultProps })
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
      expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(AlertDialog, { props: { ...defaultProps, open: false } })
      expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls confirm and close when Confirm is clicked', async () => {
      const user = userEvent.setup()
      const handleConfirm = vi.fn()
      const handleClose = vi.fn()

      render(AlertDialog, {
        props: {
          ...defaultProps,
          onConfirm: handleConfirm,
          onClose: handleClose
        }
      })

      await user.click(screen.getByRole('button', { name: /confirm/i }))
      expect(handleConfirm).toHaveBeenCalledTimes(1)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('calls cancel and close when Cancel is clicked', async () => {
      const user = userEvent.setup()
      const handleCancel = vi.fn()
      const handleClose = vi.fn()

      render(AlertDialog, {
        props: {
          ...defaultProps,
          onCancel: handleCancel,
          onClose: handleClose
        }
      })

      await user.click(screen.getByRole('button', { name: /cancel/i }))
      expect(handleCancel).toHaveBeenCalledTimes(1)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has role="alertdialog"', () => {
      render(AlertDialog, { props: defaultProps })
      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })
  })
})
