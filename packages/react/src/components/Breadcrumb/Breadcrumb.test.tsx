/**
 * @file Breadcrumb.test.tsx
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
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb Component', () => {
  describe('Rendering', () => {
    it('renders all items correctly', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details', current: true }
          ]}
        />
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('renders custom separator', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' }
          ]}
          separator=">"
        />
      )
      expect(screen.getByText('>')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies current class to last item', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Details', current: true }
          ]}
        />
      )
      expect(screen.getByText('Details').closest('.ui-breadcrumb__item')).toHaveClass('ui-breadcrumb__item--current')
    })
  })

  describe('Accessibility', () => {
    it('sets role="navigation"', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' }
          ]}
        />
      )
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('sets aria-label correctly', () => {
      render(
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' }
          ]}
        />
      )
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Library', href: '/lib' }]} />)
      expect(container).toMatchSnapshot()
    })
  })
})
