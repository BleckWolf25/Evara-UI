/**
 * @file Slider.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Slider.
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
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Slider } from './Slider'

describe('Slider Component', () => {
  describe('Rendering', () => {
    it('renders slider with track and thumb', () => {
      render(<Slider value={50} />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('renders range slider with two thumbs', () => {
      render(<Slider value={[30, 70]} range />)
      expect(screen.getAllByRole('slider')).toHaveLength(2)
    })
  })

  describe('Interactions', () => {
    it('calls onChange when value changes', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      const { container } = render(<Slider value={50} onChange={handleChange} />)

      const track = container.querySelector('.ui-slider__track')
      if (track) {
        await user.click(track)
      }

      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(<Slider value={50} size="lg" />)
      expect(screen.getByRole('slider').closest('.ui-slider')).toHaveClass('ui-slider--lg')
    })

    it('applies disabled class when disabled', () => {
      render(<Slider value={50} disabled />)
      expect(screen.getByRole('slider').closest('.ui-slider')).toHaveClass('ui-slider--disabled')
    })
  })

  describe('Accessibility', () => {
    it('sets role="slider"', () => {
      render(<Slider value={50} />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('sets aria-valuemin and aria-valuemax', () => {
      render(<Slider value={50} min={0} max={100} />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemin', '0')
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemax', '100')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Slider defaultValue={[50]} />)
      expect(container).toMatchSnapshot()
    })
  })
})
