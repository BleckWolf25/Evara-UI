/**
 * @file Card.test.tsx
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
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      )
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('renders without subcomponents', () => {
      render(<Card>Content</Card>)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies variant class correctly', () => {
      render(<Card variant="elevated">Content</Card>)
      expect(screen.getByText('Content').closest('.ui-card')).toHaveClass('ui-card--elevated')
    })

    it('applies elevation class correctly', () => {
      render(<Card elevation="lg">Content</Card>)
      expect(screen.getByText('Content').closest('.ui-card')).toHaveClass('ui-card--elevation-lg')
    })
  })

  describe('Subcomponents', () => {
    it('Header renders with correct class', () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
        </Card>
      )
      expect(screen.getByText('Header')).toHaveClass('ui-card__header')
    })

    it('Body renders with correct class', () => {
      render(
        <Card>
          <Card.Body>Body</Card.Body>
        </Card>
      )
      expect(screen.getByText('Body')).toHaveClass('ui-card__body')
    })

    it('Footer renders with correct class', () => {
      render(
        <Card>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      )
      expect(screen.getByText('Footer')).toHaveClass('ui-card__footer')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Card><Card.Header>Header</Card.Header><Card.Body>Content</Card.Body><Card.Footer>Footer</Card.Footer></Card>)
      expect(container).toMatchSnapshot()
    })
  })
})
