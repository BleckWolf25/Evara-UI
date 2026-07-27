/**
 * @file Slider.test.ts
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
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { Slider } from './Slider'

describe('Slider Component', () => {
  describe('Rendering', () => {
    it('renders slider thumbs and track correctly', () => {
      render(Slider, {
        props: { defaultValue: 30 }
      })
      // Thumbs should have slider role
      const thumbs = screen.getAllByRole('slider')
      expect(thumbs.length).toBe(1)
      expect(thumbs[0]).toHaveAttribute('aria-valuenow', '30')
    })

    it('renders multiple thumbs when range is true', () => {
      render(Slider, {
        props: { range: true, defaultValue: [20, 80] }
      })
      const thumbs = screen.getAllByRole('slider')
      expect(thumbs.length).toBe(2)
      expect(thumbs[0]).toHaveAttribute('aria-valuenow', '20')
      expect(thumbs[1]).toHaveAttribute('aria-valuenow', '80')
    })
  })
})
