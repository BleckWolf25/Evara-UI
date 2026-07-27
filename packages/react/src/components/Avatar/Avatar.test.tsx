/**
 * @file Avatar.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Avatar.
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
import { Avatar } from './Avatar'

describe('Avatar Component', () => {
  describe('Rendering', () => {
    it('renders image when src is provided', () => {
      render(<Avatar src="/avatar.jpg" alt="Test" />)
      const img = screen.getByAltText('Test')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/avatar.jpg')
    })

    it('renders initials when no src is provided', () => {
      render(<Avatar initials="JD" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('renders status indicator when status is provided', () => {
      render(<Avatar initials="JD" status="online" />)
      const statusIndicator = screen.getByTitle('online')
      expect(statusIndicator).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(<Avatar initials="JD" size="lg" />)
      expect(screen.getByText('JD').closest('.ui-avatar')).toHaveClass('ui-avatar--lg')
    })

    it('applies status class correctly', () => {
      render(<Avatar initials="JD" status="online" />)
      expect(screen.getByText('JD').closest('.ui-avatar')).toHaveClass('ui-avatar--status-online')
    })
  })

  describe('Accessibility', () => {
    it('sets aria-label correctly', () => {
      render(<Avatar src="/avatar.jpg" alt="John Doe" />)
      expect(screen.getByAltText('John Doe').closest('.ui-avatar')).toHaveAttribute('aria-label', 'John Doe')
    })

    it('sets aria-label for status indicator', () => {
      render(<Avatar initials="JD" status="busy" />)
      const statusIndicator = screen.getByTitle('busy')
      expect(statusIndicator).toHaveAttribute('aria-label', 'Status: busy')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Avatar alt="User Avatar" />)
      expect(container).toMatchSnapshot()
    })
  })
})
