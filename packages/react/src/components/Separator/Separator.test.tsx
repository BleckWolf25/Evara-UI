/**
 * @file Separator.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Separator.
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
import { Separator } from './Separator'

describe('Separator Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Separator />)
      const separator = screen.getByRole('separator')
      expect(separator).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies orientation class correctly', () => {
      render(<Separator orientation="vertical" />)
      expect(screen.getByRole('separator')).toHaveClass('ui-separator--vertical')
    })

    it('applies color class correctly', () => {
      render(<Separator color="primary" />)
      expect(screen.getByRole('separator')).toHaveClass('ui-separator--primary')
    })
  })

  describe('Accessibility', () => {
    it('sets role="separator"', () => {
      render(<Separator />)
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('sets aria-orientation correctly', () => {
      render(<Separator orientation="vertical" />)
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Separator orientation="horizontal" />)
      expect(container).toMatchSnapshot()
    })
  })
})
