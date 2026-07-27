/**
 * @file Carousel.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Carousel.
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
import { Carousel } from './Carousel'

describe('Carousel Component', () => {
  describe('Rendering', () => {
    it('renders children as slides', () => {
      render(
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel>
      )
      expect(screen.getByText('Slide 1')).toBeInTheDocument()
      expect(screen.getByText('Slide 2')).toBeInTheDocument()
      expect(screen.getByText('Slide 3')).toBeInTheDocument()
    })

    it('renders navigation arrows when showArrows is true', () => {
      render(
        <Carousel showArrows>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      )
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('renders dots when showDots is true', () => {
      render(
        <Carousel showDots>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      )
      expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies carousel class', () => {
      render(
        <Carousel>
          <div>Slide 1</div>
        </Carousel>
      )
      expect(screen.getByText('Slide 1').closest('.ui-carousel')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('sets role="region"', () => {
      render(
        <Carousel>
          <div>Slide 1</div>
        </Carousel>
      )
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('sets aria-label', () => {
      render(
        <Carousel>
          <div>Slide 1</div>
        </Carousel>
      )
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Carousel')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      )
      expect(container).toMatchSnapshot()
    })
  })
})
