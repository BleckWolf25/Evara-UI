/**
 * @file DatePicker.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for DatePicker.
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
import { DatePicker } from './DatePicker'

describe('DatePicker Component', () => {
  const defaultDate = new Date(2026, 6, 16) // July 16, 2026

  describe('Rendering', () => {
    it('renders placeholder trigger initially', () => {
      const { container } = render(DatePicker, {
        props: { placeholder: 'Pick a day' }
      })
      expect(container.querySelector('.ui-date-picker__trigger')).toBeInTheDocument()
      expect(screen.getByText('Pick a day')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('opens calendar popover when trigger is clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(DatePicker, {
        props: { defaultValue: defaultDate }
      })

      const trigger = container.querySelector('.ui-date-picker__trigger')
      if (!trigger) throw new Error('Trigger not found')
      await user.click(trigger)

      // Calendar month header should show up
      expect(screen.getByText('July')).toBeInTheDocument()
    })
  })
})
