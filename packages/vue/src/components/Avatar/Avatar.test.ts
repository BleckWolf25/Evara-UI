/**
 * @file Avatar.test.ts
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
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { Avatar } from './Avatar'

// ---------- TESTS
describe('Avatar Component', () => {
  describe('Rendering', () => {
    it('renders image when src is provided', () => {
      render(Avatar, {
        props: { src: 'https://example.com/avatar.jpg', alt: 'John Doe' }
      })
      const img = screen.getByRole('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
      expect(img).toHaveAttribute('alt', 'John Doe')
    })

    it('renders initials when src is not provided but initials are', () => {
      render(Avatar, {
        props: { initials: 'JD' }
      })
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('applies status classes correctly', () => {
      render(Avatar, {
        props: { initials: 'JD', status: 'online' }
      })
      expect(screen.getByText('JD').parentElement).toHaveClass('ui-avatar--status-online')
    })

    it('applies size classes correctly', () => {
      render(Avatar, {
        props: { initials: 'JD', size: 'lg' }
      })
      expect(screen.getByText('JD').parentElement).toHaveClass('ui-avatar--lg')
    })
  })
})
