/**
 * @file Input.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Input.
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
import { Input } from './Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input correctly with default value', () => {
      render(Input, {
        props: { defaultValue: 'Hello' }
      })
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveValue('Hello')
    })

    it('renders prefix and suffix slots', () => {
      render(Input, {
        slots: {
          prefix: () => '$',
          suffix: () => 'USD'
        }
      })
      expect(screen.getByText('$')).toBeInTheDocument()
      expect(screen.getByText('USD')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('emits input events with string value when user types', async () => {
      const user = userEvent.setup()
      const handleValueChange = vi.fn()
      render(Input, {
        props: { onValueChange: handleValueChange }
      })

      const input = screen.getByRole('textbox')
      await user.type(input, 'a')
      expect(handleValueChange).toHaveBeenCalledWith('a')
    })
  })
})
