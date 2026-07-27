/**
 * @file DatePicker.test.tsx
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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DatePicker } from './DatePicker'

describe('DatePicker Component', () => {
  describe('Rendering', () => {
    it('renders trigger with placeholder', () => {
      render(
        <DatePicker
          placeholder="Select date..."
        />
      )
      expect(screen.getByText('Select date...')).toBeInTheDocument()
    })

    it('renders calendar when opened', async () => {
      const user = userEvent.setup()
      render(
        <DatePicker />
      )

      await user.click(screen.getByText('Select date...'))
      expect(screen.getByText('Su')).toBeInTheDocument()
      expect(screen.getByText('Mo')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onChange when date is selected', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <DatePicker
          onChange={handleChange}
        />
      )

      await user.click(screen.getByText('Select date...'))
      const dateButton = screen.getByText('1')
      await user.click(dateButton)

      expect(handleChange).toHaveBeenCalled()
    })

    it('navigates months with navigation buttons', async () => {
      const user = userEvent.setup()
      render(
        <DatePicker />
      )

      await user.click(screen.getByText('Select date...'))
      const nextButton = screen.getAllByText('›')[0]
      await user.click(nextButton)

      expect(screen.getByText('Su')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(
        <DatePicker
          size="lg"
        />
      )
      expect(screen.getByText('Select date...').closest('.ui-date-picker')).toHaveClass('ui-date-picker--lg')
    })

    it('applies disabled class when disabled', () => {
      render(
        <DatePicker
          disabled
        />
      )
      expect(screen.getByText('Select date...').closest('.ui-date-picker')).toHaveClass('ui-date-picker--disabled')
    })
  })

  describe('Accessibility', () => {
    it('sets role="textbox"', () => {
      render(
        <DatePicker />
      )
      expect(screen.getByText('Select date...').closest('.ui-date-picker')).toHaveAttribute('role', 'textbox')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<DatePicker />)
      expect(container).toMatchSnapshot()
    })
  })
})
