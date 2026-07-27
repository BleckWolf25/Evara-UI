/**
 * @file Input.test.tsx
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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input element correctly', () => {
      render(<Input placeholder="Enter username" />)
      expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
    })

    it('applies variant classes correctly to container', () => {
      const { container } = render(<Input variant="success" />)
      expect(container.firstChild).toHaveClass('ui-input-container--success')
    })

    it('applies size classes correctly to container', () => {
      const { container, rerender } = render(<Input size="sm" />)
      expect(container.firstChild).toHaveClass('ui-input-container--sm')

      rerender(<Input size="lg" />)
      expect(container.firstChild).toHaveClass('ui-input-container--lg')
    })

    it('renders prefix and suffix adornments', () => {
      render(<Input prefix={<span data-testid="prefix">Pre</span>} suffix={<span data-testid="suffix">Post</span>} />)
      expect(screen.getByTestId('prefix')).toBeInTheDocument()
      expect(screen.getByTestId('suffix')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('handles user typing and triggers onChange', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} placeholder="Type here" />)
      const input = screen.getByPlaceholderText('Type here')

      await user.type(input, 'Hello')
      expect(input).toHaveValue('Hello')
      expect(handleChange).toHaveBeenCalledTimes(5)
    })

    it('respects disabled state', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input disabled onChange={handleChange} placeholder="Disabled" />)
      const input = screen.getByPlaceholderText('Disabled')

      expect(input).toBeDisabled()
      await user.click(input)
      await user.type(input, 'Hello')
      expect(input).toHaveValue('')
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('respects readOnly state', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input readOnly onChange={handleChange} placeholder="ReadOnly" />)
      const input = screen.getByPlaceholderText('ReadOnly')

      expect(input).toHaveAttribute('readonly')
      await user.type(input, 'Hello')
      expect(input).toHaveValue('')
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('sets aria-disabled when disabled', () => {
      render(<Input disabled placeholder="Accessibility" />)
      expect(screen.getByPlaceholderText('Accessibility')).toHaveAttribute('aria-disabled', 'true')
    })

    it('sets aria-readonly when readOnly', () => {
      render(<Input readOnly placeholder="Accessibility" />)
      expect(screen.getByPlaceholderText('Accessibility')).toHaveAttribute('aria-readonly', 'true')
    })

    it('sets aria-required when required', () => {
      render(<Input required placeholder="Accessibility" />)
      expect(screen.getByPlaceholderText('Accessibility')).toHaveAttribute('aria-required', 'true')
    })

    it('sets aria-invalid when variant is error', () => {
      render(<Input variant="error" placeholder="Accessibility" />)
      expect(screen.getByPlaceholderText('Accessibility')).toHaveAttribute('aria-invalid', 'true')
    })

    it('is keyboard focusable', async () => {
      const user = userEvent.setup()
      render(<Input placeholder="Focusable" />)
      const input = screen.getByPlaceholderText('Focusable')

      await user.tab()
      expect(input).toHaveFocus()
    })
  })

  describe('SSR Safety', () => {
    it('renders to string in non-browser environment safely', async () => {
      const { renderToString } = await import('react-dom/server')
      expect(() => {
        const html = renderToString(<Input placeholder="SSR" />)
        expect(html).toContain('placeholder="SSR"')
      }).not.toThrow()
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Input placeholder="Enter text..." />)
      expect(container).toMatchSnapshot()
    })
  })
})
