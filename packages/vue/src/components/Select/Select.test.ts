/**
 * @file Select.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Select.
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
import { Select } from './Select'

describe('Select Component', () => {
  const options = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' }
  ]

  describe('Rendering', () => {
    it('renders select trigger with placeholder initially', () => {
      render(Select, {
        props: { options, placeholder: 'Choose color' }
      })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeInTheDocument()
      expect(screen.getByText('Choose color')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('toggles options list when trigger is clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(Select, {
        props: { options }
      })

      const trigger = container.querySelector('.ui-select__trigger')
      if (!trigger) throw new Error('Trigger not found')
      expect(container.querySelector('.ui-select__dropdown')).not.toBeInTheDocument()

      await user.click(trigger)
      expect(container.querySelector('.ui-select__dropdown')).toBeInTheDocument()
      expect(screen.getByText('Red')).toBeInTheDocument()
    })

    it('emits change when option is selected', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(Select, {
        props: { options, onChange: handleChange }
      })

      const trigger = container.querySelector('.ui-select__trigger')
      if (!trigger) throw new Error('Trigger not found')
      await user.click(trigger)

      const optionRed = screen.getByText('Red')
      await user.click(optionRed)

      expect(handleChange).toHaveBeenCalledWith('red')
    })
  })
})
