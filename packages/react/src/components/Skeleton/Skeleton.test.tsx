/**
 * @file Skeleton.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Skeleton.
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
import { Skeleton } from './Skeleton'

describe('Skeleton Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Skeleton />)
      const skeleton = screen.getByRole('status')
      expect(skeleton).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies shape class correctly', () => {
      render(<Skeleton shape="circle" />)
      expect(screen.getByRole('status')).toHaveClass('ui-skeleton--circle')
    })

    it('applies animated class when animated', () => {
      render(<Skeleton animated />)
      expect(screen.getByRole('status')).toHaveClass('ui-skeleton--animated')
    })

    it('does not apply animated class when not animated', () => {
      render(<Skeleton animated={false} />)
      expect(screen.getByRole('status')).not.toHaveClass('ui-skeleton--animated')
    })
  })

  describe('Accessibility', () => {
    it('sets role="status"', () => {
      render(<Skeleton />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('sets aria-label correctly', () => {
      render(<Skeleton />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Skeleton style={{ width: 100, height: 20 }} />)
      expect(container).toMatchSnapshot()
    })
  })
})
