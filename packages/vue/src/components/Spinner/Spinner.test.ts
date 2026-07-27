/**
 * @file Spinner.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Spinner.
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
import { Spinner } from './Spinner'

describe('Spinner Component', () => {
  describe('Rendering', () => {
    it('sets correct accessibility attributes', () => {
      render(Spinner)
      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveAttribute('aria-label', 'Loading...')
    })

    it('applies color and size classes correctly', () => {
      const { container } = render(Spinner, {
        props: { color: 'success', size: 'lg' }
      })
      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('ui-spinner--success')
      expect(element).toHaveClass('ui-spinner--lg')
    })
  })
})
