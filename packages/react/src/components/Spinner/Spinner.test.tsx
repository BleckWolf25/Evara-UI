/**
 * @file Spinner.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Spinner.
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
import { Spinner } from './Spinner'

describe('Spinner Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Spinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(<Spinner size="lg" />)
      expect(screen.getByRole('status')).toHaveClass('ui-spinner--lg')
    })

    it('applies color class correctly', () => {
      render(<Spinner color="success" />)
      expect(screen.getByRole('status')).toHaveClass('ui-spinner--success')
    })
  })

  describe('Accessibility', () => {
    it('sets role="status"', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('sets aria-label correctly', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Spinner size="md" />)
      expect(container).toMatchSnapshot()
    })
  })
})
