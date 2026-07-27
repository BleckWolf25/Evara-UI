/**
 * @file Popover.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Popover.
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
import { Popover } from './Popover'

describe('Popover Component', () => {
  describe('Rendering', () => {
    it('renders trigger slot correctly', () => {
      render(Popover, {
        slots: {
          trigger: () => h('button', 'Open popover')
        }
      })
      expect(screen.getByRole('button', { name: 'Open popover' })).toBeInTheDocument()
    })

    it('renders popover content when open is true', () => {
      render(Popover, {
        props: { open: true },
        slots: {
          trigger: () => h('button', 'Open'),
          default: () => h(Popover.Content, {}, { default: () => 'Content info' })
        }
      })
      expect(screen.getByText('Content info')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('toggles popover content when trigger is clicked', async () => {
      const user = userEvent.setup()
      render(Popover, {
        slots: {
          trigger: () => h('button', 'Toggle'),
          default: () => h(Popover.Content, {}, { default: () => 'Content' })
        }
      })

      const trigger = screen.getByRole('button', { name: 'Toggle' })
      expect(screen.queryByText('Content')).not.toBeInTheDocument()

      await user.click(trigger)
      expect(screen.getByText('Content')).toBeInTheDocument()

      await user.click(trigger)
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
  })
})
