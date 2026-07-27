/**
 * @file Radio.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Radio.
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
import { RadioGroup } from './RadioGroup'
import { Radio } from './Radio'

describe('Radio & RadioGroup Components', () => {
  describe('Rendering', () => {
    it('renders radio group and child options correctly', () => {
      render(
        <RadioGroup name="options" defaultValue="a">
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      )

      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
      expect(screen.getByLabelText('Option A')).toBeChecked()
      expect(screen.getByLabelText('Option B')).not.toBeChecked()
    })

    it('applies group disabled property to children', () => {
      render(
        <RadioGroup name="options" disabled>
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      )

      expect(screen.getByLabelText('Option A')).toBeDisabled()
      expect(screen.getByLabelText('Option B')).toBeDisabled()
    })
  })

  describe('Interactions', () => {
    it('handles selection change in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <RadioGroup name="options" defaultValue="a" onChange={handleChange}>
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      )

      const radioB = screen.getByLabelText('Option B')
      await user.click(radioB)

      expect(radioB).toBeChecked()
      expect(screen.getByLabelText('Option A')).not.toBeChecked()
      expect(handleChange).toHaveBeenCalledWith('b')
    })

    it('respects controlled mode value', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { rerender } = render(
        <RadioGroup name="options" value="a" onChange={handleChange}>
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      )

      const radioB = screen.getByLabelText('Option B')
      await user.click(radioB)

      // Value shouldn't change automatically in controlled mode
      expect(screen.getByLabelText('Option A')).toBeChecked()
      expect(radioB).not.toBeChecked()
      expect(handleChange).toHaveBeenCalledWith('b')

      // Rerender with new value
      rerender(
        <RadioGroup name="options" value="b" onChange={handleChange}>
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      )
      expect(radioB).toBeChecked()
      expect(screen.getByLabelText('Option A')).not.toBeChecked()
    })

    it('does not allow selection when option is disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <RadioGroup name="options" defaultValue="a" onChange={handleChange}>
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" disabled />
        </RadioGroup>
      )

      const radioB = screen.getByLabelText('Option B')
      await user.click(radioB)

      expect(radioB).not.toBeChecked()
      expect(screen.getByLabelText('Option A')).toBeChecked()
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('sets proper roles', () => {
      render(
        <RadioGroup name="options">
          <Radio value="a" label="Option A" />
        </RadioGroup>
      )

      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
      expect(screen.getByRole('radio')).toBeInTheDocument()
    })

    it('sets aria-checked', () => {
      render(
        <RadioGroup name="options" defaultValue="a">
          <Radio value="a" label="Option A" />
        </RadioGroup>
      )

      expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true')
    })

    it('sets aria-disabled when group is disabled', () => {
      render(
        <RadioGroup name="options" disabled>
          <Radio value="a" label="Option A" />
        </RadioGroup>
      )

      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true')
      expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true')
    })

    it('is keyboard focusable', async () => {
      const user = userEvent.setup()
      render(
        <RadioGroup name="options" defaultValue="a">
          <Radio value="a" label="Option A" />
          <Radio value="b" label="Option B" />
        </RadioGroup>
      )
      const radioA = screen.getByLabelText('Option A')

      await user.tab()
      expect(radioA).toHaveFocus()
    })
  })

  describe('SSR Safety', () => {
    it('renders to string in non-browser environment safely', async () => {
      const { renderToString } = await import('react-dom/server')
      expect(() => {
        const html = renderToString(
          <RadioGroup name="options" defaultValue="a">
            <Radio value="a" label="Option A" />
          </RadioGroup>
        )
        expect(html).toContain('Option A')
      }).not.toThrow()
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Radio value="option1" label="Option 1" />)
      expect(container).toMatchSnapshot()
    })
  })
})
