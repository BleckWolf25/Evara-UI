/**
 * @file Card.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Card.
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
import { h } from 'vue'
import { Card } from './Card'

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders header, body, and footer slots correctly', () => {
      render(Card, {
        slots: {
          default: () => [
            h(Card.Header, {}, { default: () => 'Header content' }),
            h(Card.Body, {}, { default: () => 'Body content' }),
            h(Card.Footer, {}, { default: () => 'Footer content' })
          ]
        }
      })

      expect(screen.getByText('Header content')).toBeInTheDocument()
      expect(screen.getByText('Body content')).toBeInTheDocument()
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('applies variant and elevation classes correctly', () => {
      const { container } = render(Card, {
        props: { variant: 'outlined', elevation: 'lg' }
      })
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('ui-card--outlined')
      expect(card).toHaveClass('ui-card--elevation-lg')
    })
  })
})
