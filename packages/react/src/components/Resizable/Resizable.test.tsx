/**
 * @file Resizable.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Resizable.
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
import { Resizable } from './Resizable'

describe('Resizable Component', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(
        <Resizable width={300} height={200}>
          <div>Resizable content</div>
        </Resizable>
      )
      expect(screen.getByText('Resizable content')).toBeInTheDocument()
    })

    it('renders resize handles', () => {
      render(
        <Resizable width={300} height={200} handles={['se']}>
          <div>Content</div>
        </Resizable>
      )
      expect(screen.getByText('Content').closest('.ui-resizable')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies resizable class', () => {
      render(
        <Resizable width={300} height={200}>
          <div>Content</div>
        </Resizable>
      )
      expect(screen.getByText('Content').closest('.ui-resizable')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('sets role="region"', () => {
      render(
        <Resizable width={300} height={200}>
          <div>Content</div>
        </Resizable>
      )
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('sets aria-label', () => {
      render(
        <Resizable width={300} height={200}>
          <div>Content</div>
        </Resizable>
      )
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Resizable')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(
        <Resizable width={300} height={200} handles={['se']}>
          <div>Resizable content</div>
        </Resizable>
      )
      expect(container).toMatchSnapshot()
    })
  })
})
