/**
 * @file InputOTP.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for InputOTP.
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
import { InputOTP } from './InputOTP'

describe('InputOTP Component', () => {
  describe('Rendering', () => {
    it('renders correct number of inputs based on length', () => {
      render(<InputOTP length={6} />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(6)
    })

    it('renders with default length of 6', () => {
      render(<InputOTP />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(6)
    })

    it('applies size class correctly', () => {
      render(<InputOTP size="lg" />)
      expect(screen.getByRole('group')).toHaveClass('ui-input-otp--lg')
    })
  })

  describe('Interactions', () => {
    it('updates value when typing digits', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<InputOTP length={4} onChange={handleChange} />)

      const inputs = screen.getAllByRole('textbox')
      await user.type(inputs[0], '1')

      expect(handleChange).toHaveBeenCalledWith('1')
    })

    it('auto-focuses next input after typing', async () => {
      const user = userEvent.setup()
      render(<InputOTP length={4} />)

      const inputs = screen.getAllByRole('textbox')
      await user.type(inputs[0], '1')

      expect(inputs[1]).toHaveFocus()
    })

    it('handles paste event correctly', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<InputOTP length={4} onChange={handleChange} />)

      const inputs = screen.getAllByRole('textbox')
      await user.click(inputs[0])
      await user.paste('1234')

      expect(handleChange).toHaveBeenCalledWith('1234')
    })

    it('handles backspace correctly', async () => {
      const user = userEvent.setup()
      render(<InputOTP length={4} defaultValue="1234" />)

      const inputs = screen.getAllByRole('textbox')
      await user.click(inputs[3])
      await user.keyboard('{Backspace}')

      expect(inputs[2]).toHaveFocus()
    })

    it('handles arrow key navigation', async () => {
      const user = userEvent.setup()
      render(<InputOTP length={4} />)

      const inputs = screen.getAllByRole('textbox')
      await user.click(inputs[1])
      await user.keyboard('{ArrowLeft}')

      expect(inputs[0]).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(inputs[1]).toHaveFocus()
    })
  })

  describe('Accessibility', () => {
    it('sets aria-disabled when disabled', () => {
      render(<InputOTP disabled />)
      expect(screen.getByRole('group')).toHaveAttribute('aria-disabled', 'true')
    })

    it('sets aria-label for each input', () => {
      render(<InputOTP length={4} />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs[0]).toHaveAttribute('aria-label', 'Digit 1')
      expect(inputs[1]).toHaveAttribute('aria-label', 'Digit 2')
    })

    it('sets aria-current for focused input', async () => {
      const user = userEvent.setup()
      render(<InputOTP length={4} />)

      const inputs = screen.getAllByRole('textbox')
      await user.click(inputs[1])

      expect(inputs[1]).toHaveAttribute('aria-current', 'true')
    })
  })

  describe('CSS Classes', () => {
    it('applies disabled class when disabled', () => {
      render(<InputOTP disabled />)
      expect(screen.getByRole('group')).toHaveClass('ui-input-otp--disabled')
    })

    it('applies input classes correctly', () => {
      render(<InputOTP length={4} />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs[0]).toHaveClass('ui-input-otp__input')
      expect(inputs[0]).toHaveClass('ui-input-otp__input--0')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<InputOTP length={4} />)
      expect(container).toMatchSnapshot()
    })
  })
})
