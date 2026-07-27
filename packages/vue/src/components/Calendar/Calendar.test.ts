/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * @file Calendar.test.ts
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
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Calendar } from './Calendar'

// ---------- TESTS
describe('Calendar Component', () => {
  const defaultDate = new Date(2026, 6, 16) // July 16, 2026

  describe('Rendering', () => {
    it('renders the header and month grid', () => {
      render(Calendar, {
        props: { defaultValue: defaultDate }
      })
      expect(screen.getByText('July')).toBeInTheDocument()
      expect(screen.getByText('2026')).toBeInTheDocument()
      // Should show day numbers
      expect(screen.getByText('16')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('updates selection when a date cell is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(Calendar, {
        props: { defaultValue: defaultDate, onChange: handleChange }
      })

      // Click on day 20
      const cell = screen.getByText('20')
      await user.click(cell)
      expect(handleChange).toHaveBeenCalled()
      expect(handleChange.mock.calls[0][0].getDate()).toBe(20)
    })

    it('navigates months when clicking navigation buttons', async () => {
      const user = userEvent.setup()
      render(Calendar, {
        props: { defaultValue: defaultDate }
      })

      // Navigation buttons
      const prevButton = screen.getByRole('button', { name: /previous month/i })
      const nextButton = screen.getByRole('button', { name: /next month/i })

      await user.click(nextButton)
      expect(screen.getByText('August')).toBeInTheDocument()

      await user.click(prevButton)
      expect(screen.getByText('July')).toBeInTheDocument()
    })
  })
})
