/**
 * @file Breadcrumb.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Breadcrumb.
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
import { Breadcrumb } from './Breadcrumb'

// ---------- TESTS
describe('Breadcrumb Component', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Library', href: '/library' },
    { label: 'Data', current: true }
  ]

  describe('Rendering', () => {
    it('renders breadcrumb items correctly', () => {
      render(Breadcrumb, {
        props: { items }
      })
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Library' })).toBeInTheDocument()
      expect(screen.getByText('Data')).toBeInTheDocument()
    })

    it('renders separators between items', () => {
      const { container } = render(Breadcrumb, {
        props: { items, separator: '>' }
      })
      const separators = container.querySelectorAll('.ui-breadcrumb__separator')
      expect(separators.length).toBe(2)
      expect(separators[0].textContent).toBe('>')
    })
  })

  describe('Accessibility', () => {
    it('has navigation landmark and correct label', () => {
      render(Breadcrumb, {
        props: { items }
      })
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i })
      expect(nav).toBeInTheDocument()
    })
  })
})
