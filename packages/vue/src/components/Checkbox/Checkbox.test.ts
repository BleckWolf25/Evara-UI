/**
 * @file Checkbox.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Checkbox.
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
import { Checkbox } from './Checkbox'

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    it('renders label text correctly', () => {
      render(Checkbox, {
        props: { label: 'Accept terms' }
      })
      expect(screen.getByText('Accept terms')).toBeInTheDocument()
    })

    it('renders input with checkbox role', () => {
      render(Checkbox, {
        props: { label: 'Check me' }
      })
      expect(screen.getByRole('checkbox', { name: 'Check me' })).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('handles clicking to toggle state', async () => {
      const user = userEvent.setup()
      const handleCheckedChange = vi.fn()
      render(Checkbox, {
        props: { label: 'Toggle me', onCheckedChange: handleCheckedChange }
      })

      const checkbox = screen.getByRole('checkbox', { name: 'Toggle me' })
      expect(checkbox).not.toBeChecked()

      await user.click(checkbox)
      expect(handleCheckedChange).toHaveBeenCalledWith(true)
    })

    it('remains disabled when clicked if disabled is true', async () => {
      const user = userEvent.setup()
      const handleCheckedChange = vi.fn()
      render(Checkbox, {
        props: { label: 'Disabled', disabled: true, onCheckedChange: handleCheckedChange }
      })

      const checkbox = screen.getByRole('checkbox', { name: 'Disabled' })
      expect(checkbox).toBeDisabled()

      await user.click(checkbox)
      expect(handleCheckedChange).not.toHaveBeenCalled()
    })
  })
})
