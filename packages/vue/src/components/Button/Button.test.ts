/**
 * @file Button.test.ts
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
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

// ---------- TESTS
describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(Button, {
        slots: { default: 'Click me' }
      })
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('applies classes correctly based on props', () => {
      render(Button, {
        props: { variant: 'primary', size: 'lg' }
      })
      const button = screen.getByRole('button')
      expect(button).toHaveClass('ui-button--primary')
      expect(button).toHaveClass('ui-button--lg')
    })

    it('applies fullWidth class', () => {
      render(Button, {
        props: { fullWidth: true }
      })
      expect(screen.getByRole('button')).toHaveClass('ui-button--full-width')
    })

    it('renders spinner when loading', () => {
      render(Button, {
        props: { loading: true }
      })
      expect(screen.getByRole('button').querySelector('.ui-button__spinner')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(Button, {
        props: { onClick: handleClick },
        slots: { default: 'Clickable' }
      })

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(Button, {
        props: { disabled: true, onClick: handleClick },
        slots: { default: 'Disabled' }
      })

      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has role="button"', () => {
      render(Button, {
        slots: { default: 'Accessibility' }
      })
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('sets aria-disabled when disabled', () => {
      render(Button, {
        props: { disabled: true }
      })
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })

    it('sets aria-busy and aria-disabled when loading', () => {
      render(Button, {
        props: { loading: true }
      })
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })
  })
})
