/**
 * @file Checkbox.test.tsx
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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    it('renders checkbox correctly', () => {
      render(<Checkbox data-testid="checkbox" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders with label correctly', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
      expect(screen.getByText('Accept terms')).toBeInTheDocument()
    })

    it('applies checked classes and indicator when checked', () => {
      const { container } = render(<Checkbox checked onChange={vi.fn()} />)
      expect(container.firstChild).toHaveClass('ui-checkbox-container--checked')
      expect(container.querySelector('.ui-checkbox-icon')).toBeInTheDocument()
    })

    it('applies indeterminate classes and indicator when indeterminate', () => {
      const { container } = render(<Checkbox indeterminate onChange={vi.fn()} />)
      expect(container.firstChild).toHaveClass('ui-checkbox-container--indeterminate')
      expect(container.querySelector('.ui-checkbox-icon')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} label="Click me" />)
      const checkbox = screen.getByRole('checkbox')

      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(checkbox).toBeChecked()
    })

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox disabled onChange={handleChange} label="Disabled" />)
      const checkbox = screen.getByRole('checkbox')

      expect(checkbox).toBeDisabled()
      await user.click(checkbox)
      expect(handleChange).not.toHaveBeenCalled()
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('Accessibility', () => {
    it('sets role="checkbox"', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('sets aria-checked="mixed" when indeterminate', () => {
      render(<Checkbox indeterminate onChange={vi.fn()} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed')
    })

    it('sets aria-checked="true" when checked', () => {
      render(<Checkbox checked onChange={vi.fn()} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
    })

    it('sets aria-disabled when disabled', () => {
      render(<Checkbox disabled />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true')
    })

    it('sets aria-required when required', () => {
      render(<Checkbox required />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-required', 'true')
    })

    it('is keyboard focusable', async () => {
      const user = userEvent.setup()
      render(<Checkbox />)
      const checkbox = screen.getByRole('checkbox')

      await user.tab()
      expect(checkbox).toHaveFocus()
    })
  })

  describe('SSR Safety', () => {
    it('renders to string in non-browser environment safely', async () => {
      const { renderToString } = await import('react-dom/server')
      expect(() => {
        const html = renderToString(<Checkbox label="SSR" />)
        expect(html).toContain('SSR')
      }).not.toThrow()
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Checkbox label="Accept Terms" />)
      expect(container).toMatchSnapshot()
    })
  })
})
