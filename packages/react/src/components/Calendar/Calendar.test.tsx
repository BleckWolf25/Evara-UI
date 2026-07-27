/**
 * @file Calendar.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Calendar.
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
import { Calendar } from './Calendar'

describe('Calendar Component', () => {
  describe('Rendering', () => {
    it('renders calendar with day headers', () => {
      render(<Calendar />)
      expect(screen.getByText('Su')).toBeInTheDocument()
      expect(screen.getByText('Mo')).toBeInTheDocument()
    })

    it('renders dates for current month', () => {
      render(<Calendar />)
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onChange when date is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Calendar onChange={handleChange} />)

      const dateButton = screen.getByText('1')
      await user.click(dateButton)

      expect(handleChange).toHaveBeenCalled()
    })

    it('navigates months with navigation buttons', async () => {
      const user = userEvent.setup()
      render(<Calendar />)

      const nextButton = screen.getByLabelText('Next month')
      await user.click(nextButton)

      expect(screen.getByText('Su')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies selected class to selected date', () => {
      const today = new Date()
      render(<Calendar value={today} />)

      const dateButton = screen.getByText(today.getDate())
      expect(dateButton).toHaveClass('ui-calendar__date--selected')
    })

    it('applies today class to current date', () => {
      render(<Calendar />)

      const today = new Date().getDate()
      const dateButton = screen.getByText(today)
      expect(dateButton).toHaveClass('ui-calendar__date--today')
    })
  })

  describe('Accessibility', () => {
    it('sets role="grid"', () => {
      render(<Calendar />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('sets aria-label on calendar', () => {
      render(<Calendar />)
      expect(screen.getByRole('grid')).toHaveAttribute('aria-label', 'Calendar')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Calendar />)
      expect(container).toMatchSnapshot()
    })
  })
})
