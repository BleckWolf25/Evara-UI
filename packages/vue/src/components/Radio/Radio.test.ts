/**
 * @file Radio.test.ts
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
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { h } from 'vue'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'

describe('Radio and RadioGroup Components', () => {
  describe('Rendering', () => {
    it('renders radio button and label correctly', () => {
      render(Radio, {
        props: { label: 'Option A', value: 'a' }
      })
      expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument()
    })

    it('renders group with options correctly', () => {
      render(RadioGroup, {
        props: { defaultValue: 'b' },
        slots: {
          default: () => [
            h(Radio, { label: 'Option A', value: 'a' }),
            h(Radio, { label: 'Option B', value: 'b' })
          ]
        }
      })

      const radioA = screen.getByRole('radio', { name: 'Option A' })
      const radioB = screen.getByRole('radio', { name: 'Option B' })
      expect(radioA).not.toBeChecked()
      expect(radioB).toBeChecked()
    })
  })

  describe('Interactions', () => {
    it('changes selection when option is clicked', async () => {
      const user = userEvent.setup()
      const handleValueChange = vi.fn()
      render(RadioGroup, {
        props: { defaultValue: 'b', onValueChange: handleValueChange },
        slots: {
          default: () => [
            h(Radio, { label: 'Option A', value: 'a' }),
            h(Radio, { label: 'Option B', value: 'b' })
          ]
        }
      })

      const radioA = screen.getByRole('radio', { name: 'Option A' })
      await user.click(radioA)
      expect(handleValueChange).toHaveBeenCalledWith('a')
    })
  })
})
