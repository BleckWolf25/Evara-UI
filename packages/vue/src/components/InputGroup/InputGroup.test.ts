/**
 * @file InputGroup.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for InputGroup.
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
import { InputGroup } from './InputGroup'

describe('InputGroup Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(InputGroup, {
        slots: { default: 'Group Content' }
      })
      expect(screen.getByText('Group Content')).toBeInTheDocument()
    })

    it('applies disabled state classes correctly', () => {
      const { container } = render(InputGroup, {
        props: { disabled: true }
      })
      expect(container.firstChild).toHaveClass('ui-input-group--disabled')
    })
  })
})
