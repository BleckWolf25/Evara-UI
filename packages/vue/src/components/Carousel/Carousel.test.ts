/**
 * @file Carousel.test.ts
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
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { Carousel } from './Carousel'

describe('Carousel Component', () => {
  const slides = () => [
    h('div', {}, 'Slide 1'),
    h('div', {}, 'Slide 2'),
    h('div', {}, 'Slide 3')
  ]

  describe('Rendering', () => {
    it('renders slides, control buttons, and dots indicators correctly', () => {
      render(Carousel, {
        slots: { default: slides }
      })
      expect(screen.getByText('Slide 1')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument()
      // Dots indicators
      expect(screen.getAllByRole('button', { name: /go to slide/i }).length).toBe(3)
    })
  })

  describe('Interactions', () => {
    it('navigates to the next slide when next button is clicked', async () => {
      const user = userEvent.setup()
      render(Carousel, {
        slots: { default: slides }
      })

      const nextBtn = screen.getByRole('button', { name: /next slide/i })
      await user.click(nextBtn)

      const dots = screen.getAllByRole('button', { name: /go to slide/i })
      expect(dots[1]).toHaveClass('ui-carousel__dot--active')
    })
  })
})
