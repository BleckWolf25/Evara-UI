/**
 * @file ButtonGroup.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for ButtonGroup.
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
import { ButtonGroup } from './ButtonGroup'
import { Button } from '../Button/Button'

// ---------- TESTS
describe('ButtonGroup Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(ButtonGroup, {
        slots: { default: () => [h(Button, {}, { default: () => 'Btn 1' }), h(Button, {}, { default: () => 'Btn 2' })] }
      })
      expect(screen.getByRole('button', { name: 'Btn 1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Btn 2' })).toBeInTheDocument()
    })

    it('applies orientation class correctly', () => {
      const { container } = render(ButtonGroup, {
        props: { orientation: 'vertical' },
        slots: { default: 'Content' }
      })
      expect(container.firstChild).toHaveClass('ui-button-group--vertical')
    })
  })

  describe('Accessibility', () => {
    it('sets role="group"', () => {
      render(ButtonGroup, {
        slots: { default: 'Content' }
      })
      expect(screen.getByRole('group')).toBeInTheDocument()
    })
  })
})
