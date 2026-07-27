/**
 * @file Resizable.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Resizable.
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
import { Resizable } from './Resizable'

describe('Resizable Component', () => {
  describe('Rendering', () => {
    it('renders with children slot content', () => {
      render(Resizable, {
        slots: { default: 'Resizable Content' }
      })
      expect(screen.getByText('Resizable Content')).toBeInTheDocument()
    })

    it('renders correct style properties based on width and height', () => {
      const { container } = render(Resizable, {
        props: { width: 400, height: 300 }
      })
      const element = container.firstChild as HTMLElement
      expect(element.style.width).toBe('400px')
      expect(element.style.height).toBe('300px')
    })
  })
})
