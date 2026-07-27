/**
 * @file Select.test.tsx
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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Select } from './Select'

describe('Select Component', () => {
  describe('Rendering', () => {
    it('renders trigger with placeholder', () => {
      render(
        <Select
          options={[{ value: '1', label: 'Option 1' }]}
          placeholder="Select..."
        />
      )
      expect(screen.getByText('Select...')).toBeInTheDocument()
    })

    it('renders dropdown when opened', async () => {
      const user = userEvent.setup()
      render(
        <Select
          options={[{ value: '1', label: 'Option 1' }]}
        />
      )

      await user.click(screen.getByText('Select...'))
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onChange when option is selected', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Select
          options={[{ value: '1', label: 'Option 1' }]}
          onChange={handleChange}
        />
      )

      await user.click(screen.getByText('Select...'))
      await user.click(screen.getByText('Option 1'))

      expect(handleChange).toHaveBeenCalledWith('1')
    })

    it('filters options when searchable', async () => {
      const user = userEvent.setup()
      render(
        <Select
          options={[
            { value: '1', label: 'Apple' },
            { value: '2', label: 'Banana' }
          ]}
          searchable
        />
      )

      await user.click(screen.getByText('Select...'))
      const searchInput = screen.getByPlaceholderText('Search...')
      await user.type(searchInput, 'App')

      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(
        <Select
          options={[{ value: '1', label: 'Option 1' }]}
          size="lg"
        />
      )
      expect(screen.getByText('Select...').closest('.ui-select')).toHaveClass('ui-select--lg')
    })

    it('applies disabled class when disabled', () => {
      render(
        <Select
          options={[{ value: '1', label: 'Option 1' }]}
          disabled
        />
      )
      expect(screen.getByText('Select...').closest('.ui-select')).toHaveClass('ui-select--disabled')
    })
  })

  describe('Accessibility', () => {
    it('sets role="combobox"', () => {
      render(
        <Select
          options={[{ value: '1', label: 'Option 1' }]}
        />
      )
      expect(screen.getByText('Select...').closest('.ui-select')).toHaveAttribute('role', 'combobox')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Select options={[{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }]} value="apple" onChange={() => { /* noop */ }} />)
      expect(container).toMatchSnapshot()
    })
  })
})
