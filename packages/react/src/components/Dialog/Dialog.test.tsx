/**
 * @file Dialog.test.tsx
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
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Dialog } from './Dialog'

describe('Dialog Component', () => {
  describe('Rendering', () => {
    it('renders children when open', () => {
      render(
        <Dialog open>
          <Dialog.Header>Title</Dialog.Header>
          <Dialog.Body>Content</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>
        </Dialog>
      )
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <Dialog open={false}>
          <Dialog.Header>Title</Dialog.Header>
        </Dialog>
      )
      expect(screen.queryByText('Title')).not.toBeInTheDocument()
    })
  })

  describe('Subcomponents', () => {
    it('Header renders with correct class', () => {
      render(
        <Dialog open>
          <Dialog.Header>Header</Dialog.Header>
        </Dialog>
      )
      expect(screen.getByText('Header')).toHaveClass('ui-dialog__header')
    })

    it('Body renders with correct class', () => {
      render(
        <Dialog open>
          <Dialog.Body>Body</Dialog.Body>
        </Dialog>
      )
      expect(screen.getByText('Body')).toHaveClass('ui-dialog__body')
    })

    it('Footer renders with correct class', () => {
      render(
        <Dialog open>
          <Dialog.Footer>Footer</Dialog.Footer>
        </Dialog>
      )
      expect(screen.getByText('Footer')).toHaveClass('ui-dialog__footer')
    })
  })

  describe('Accessibility', () => {
    it('sets role="dialog"', () => {
      render(
        <Dialog open>
          <Dialog.Header>Title</Dialog.Header>
        </Dialog>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('sets aria-modal="true"', () => {
      render(
        <Dialog open>
          <Dialog.Header>Title</Dialog.Header>
        </Dialog>
      )
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Dialog open><Dialog.Header>Title</Dialog.Header><Dialog.Body>Body</Dialog.Body></Dialog>)
      expect(container).toMatchSnapshot()
    })
  })
})
