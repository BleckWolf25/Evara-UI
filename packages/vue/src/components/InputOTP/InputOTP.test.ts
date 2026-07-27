/**
 * @file InputOTP.test.ts
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
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { InputOTP } from './InputOTP'

describe('InputOTP Component', () => {
  describe('Rendering', () => {
    it('renders the correct number of inputs', () => {
      render(InputOTP, {
        props: { length: 4 }
      })
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBe(4)
    })
  })

  describe('Interactions', () => {
    it('shifts focus forward when typing digits', async () => {
      const user = userEvent.setup()
      render(InputOTP, {
        props: { length: 4 }
      })

      const inputs = screen.getAllByRole('textbox')
      await user.click(inputs[0])
      expect(inputs[0]).toHaveFocus()

      await user.keyboard('1')
      expect(inputs[1]).toHaveFocus()
    })
  })
})
