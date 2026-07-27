/**
 * @file AlertDialog.test.tsx
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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { AlertDialog } from './AlertDialog'

describe('AlertDialog Component', () => {
  describe('Rendering', () => {
    it('renders title and description when open', () => {
      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
        />
      )
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
      expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
    })

    it('renders confirm and cancel buttons', () => {
      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
        />
      )
      expect(screen.getByText('Confirm')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <AlertDialog
          open={false}
          title="Are you sure?"
          description="This action cannot be undone."
        />
      )
      expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onConfirm when confirm button is clicked', async () => {
      const user = userEvent.setup()
      const handleConfirm = vi.fn()

      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
          onConfirm={handleConfirm}
        />
      )

      await user.click(screen.getByText('Confirm'))
      expect(handleConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', async () => {
      const user = userEvent.setup()
      const handleCancel = vi.fn()

      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
          onCancel={handleCancel}
        />
      )

      await user.click(screen.getByText('Cancel'))
      expect(handleCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('sets role="alertdialog"', () => {
      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
        />
      )
      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })

    it('sets aria-modal="true"', () => {
      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
        />
      )
      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('sets aria-labelledby', () => {
      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
        />
      )
      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-labelledby', 'alert-dialog-title')
    })

    it('sets aria-describedby', () => {
      render(
        <AlertDialog
          open
          title="Are you sure?"
          description="This action cannot be undone."
        />
      )
      expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-describedby', 'alert-dialog-description')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<AlertDialog open title="Are you sure?" description="This cannot be undone." confirmLabel="Yes" cancelLabel="No" />)
      expect(container).toMatchSnapshot()
    })
  })
})
