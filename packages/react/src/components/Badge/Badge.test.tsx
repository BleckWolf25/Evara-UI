/**
 * @file Badge.test.tsx
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
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>5</Badge>)
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies color class correctly', () => {
      render(<Badge color="success">5</Badge>)
      expect(screen.getByText('5').closest('.ui-badge')).toHaveClass('ui-badge--success')
    })

    it('applies size class correctly', () => {
      render(<Badge size="lg">5</Badge>)
      expect(screen.getByText('5').closest('.ui-badge')).toHaveClass('ui-badge--lg')
    })

    it('applies position class correctly', () => {
      render(<Badge position="top-right">5</Badge>)
      expect(screen.getByText('5').closest('.ui-badge')).toHaveClass('ui-badge--top-right')
    })
  })

  describe('Accessibility', () => {
    it('sets role="status"', () => {
      render(<Badge>5</Badge>)
      expect(screen.getByText('5').closest('.ui-badge')).toHaveAttribute('role', 'status')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Badge variant="primary">New</Badge>)
      expect(container).toMatchSnapshot()
    })
  })
})
