/**
 * @file Separator.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Separator.
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
import { Separator } from './Separator'

describe('Separator Component', () => {
  describe('Rendering', () => {
    it('has role="separator"', () => {
      render(Separator)
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('sets correct accessibility orientation attribute', () => {
      render(Separator, {
        props: { orientation: 'vertical' }
      })
      const sep = screen.getByRole('separator')
      expect(sep).toHaveAttribute('aria-orientation', 'vertical')
      expect(sep).toHaveClass('ui-separator--vertical')
    })
  })
})
