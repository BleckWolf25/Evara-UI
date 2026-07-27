/**
 * @file Dialog.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Dialog.
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
import { h } from 'vue'
import { Dialog } from './Dialog'

describe('Dialog Component', () => {
  describe('Rendering', () => {
    it('renders header, body, footer, and close when open is true', () => {
      render(Dialog, {
        props: { open: true },
        slots: {
          default: () => [
            h(Dialog.Header, {}, { default: () => 'Modal Header' }),
            h(Dialog.Body, {}, { default: () => 'Modal Body' }),
            h(Dialog.Footer, {}, { default: () => 'Modal Footer' }),
            h(Dialog.Close, {}, { default: () => 'Dismiss' })
          ]
        }
      })

      expect(screen.getByText('Modal Header')).toBeInTheDocument()
      expect(screen.getByText('Modal Body')).toBeInTheDocument()
      expect(screen.getByText('Modal Footer')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })

    it('does not render content when open is false', () => {
      render(Dialog, {
        props: { open: false },
        slots: { default: 'Modal Body' }
      })
      expect(screen.queryByText('Modal Body')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      render(Dialog, {
        props: { open: true, onClose: handleClose },
        slots: {
          default: () => [
            h(Dialog.Close, {}, { default: () => 'Close' })
          ]
        }
      })

      const closeButton = screen.getByRole('button', { name: 'Close' })
      await user.click(closeButton)
      expect(handleClose).toHaveBeenCalled()
    })
  })
})
