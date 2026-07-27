/**
 * @file Button.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Button.
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
import { Button } from './Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders children text correctly', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('applies variant classes correctly', () => {
      const { rerender } = render(<Button variant="primary">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('ui-button--primary')

      rerender(<Button variant="danger">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('ui-button--danger')

      rerender(<Button variant="ghost">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('ui-button--ghost')
    })

    it('applies size classes correctly', () => {
      const { rerender } = render(<Button size="sm">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('ui-button--sm')

      rerender(<Button size="lg">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('ui-button--lg')
    })

    it('applies fullWidth class', () => {
      render(<Button fullWidth>Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('ui-button--full-width')
    })

    it('renders a spinner when loading', () => {
      render(<Button loading>Button</Button>)
      expect(screen.getByRole('button').querySelector('.ui-button__spinner')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Clickable</Button>)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)

      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button loading onClick={handleClick}>Loading</Button>)

      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has role="button"', () => {
      render(<Button>Accessibility</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })

    it('sets aria-busy and aria-disabled when loading', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('is keyboard focusable', async () => {
      const user = userEvent.setup()
      render(<Button>Focusable</Button>)
      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()
    })

    it('triggers click on Space key press', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Keyboard</Button>)
      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('triggers click on Enter key press', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Keyboard</Button>)
      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('SSR Safety', () => {
    it('renders to string in non-browser environment safely', async () => {
      const { renderToString } = await import('react-dom/server')
      expect(() => {
        const html = renderToString(<Button>SSR</Button>)
        expect(html).toContain('SSR')
      }).not.toThrow()
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Button variant="primary">Click me</Button>)
      expect(container).toMatchSnapshot()
    })
  })
})
