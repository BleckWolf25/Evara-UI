/**
 * @file ProgressBar.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for ProgressBar.
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
import { ProgressBar } from './ProgressBar'

describe('ProgressBar Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<ProgressBar value={50} />)
      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toBeInTheDocument()
    })

    it('renders fill with correct width', () => {
      render(<ProgressBar value={75} />)
      const fill = screen.getByRole('progressbar').querySelector('.ui-progress-bar__fill')
      expect(fill).toHaveStyle({ width: '75%' })
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(<ProgressBar size="lg" value={50} />)
      expect(screen.getByRole('progressbar')).toHaveClass('ui-progress-bar--lg')
    })

    it('applies color class correctly', () => {
      render(<ProgressBar color="success" value={50} />)
      expect(screen.getByRole('progressbar')).toHaveClass('ui-progress-bar--success')
    })

    it('applies indeterminate class when indeterminate', () => {
      render(<ProgressBar indeterminate />)
      expect(screen.getByRole('progressbar')).toHaveClass('ui-progress-bar--indeterminate')
    })
  })

  describe('Accessibility', () => {
    it('sets role="progressbar"', () => {
      render(<ProgressBar value={50} />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('sets aria attributes correctly for determinate', () => {
      render(<ProgressBar value={75} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0')
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100')
    })

    it('sets aria attributes correctly for indeterminate', () => {
      render(<ProgressBar indeterminate />)
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', 'Loading...')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<ProgressBar value={60} />)
      expect(container).toMatchSnapshot()
    })
  })
})
