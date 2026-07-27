/**
 * @file InputOTP.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for InputOTP digit code component.
 *
 * @description
 * Computes class names, digit focus indices, arrow/backspace keyboard navigation, paste extraction, and group ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputOTPProps } from './InputOTP.types'

// ---------- CLASSES

// ---------- CLASS: INPUT OTP CONTROLLER
export class InputOTPController {
  // ---------- FIELDS AND CONSTANTS
  private props: InputOTPProps
  private currentIndex = 0

  // ---------- CONSTRUCTOR
  constructor(props: InputOTPProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET MAIN CONTAINER CLASS NAMES STRING
  getContainerClasses() {
    const { size = 'md', disabled = false } = this.props

    return ['ui-input-otp', `ui-input-otp--${size}`, disabled ? 'ui-input-otp--disabled' : ''].filter(Boolean).join(' ')
  }

  // ---------- GET SINGLE DIGIT INPUT CLASS NAMES
  getInputClasses(index: number) {
    const { disabled = false } = this.props

    return [
      'ui-input-otp__input',
      `ui-input-otp__input--${index.toString()}`,
      disabled ? 'ui-input-otp__input--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { disabled = false, length = 6 } = this.props

    return {
      role: 'group',
      'aria-disabled': disabled ? true : undefined,
      'aria-label': `One-time password, ${length.toString()} digits`,
    }
  }

  // ---------- KEYBOARD NAVIGATION AND BACKSPACE EVENT HANDLER
  handleKeyDown(event: KeyboardEvent, index: number, value: string) {
    const { length = 6, disabled = false } = this.props

    // Early return guard clause for disabled input
    if (disabled) return

    const key = event.key

    // ---------- BACKSPACE BRANCH
    if (key === 'Backspace') {
      if (!value[index]) {
        this.currentIndex = Math.max(0, index - 1)
      } else {
        this.currentIndex = index
      }
      return
    }

    // ---------- ARROW LEFT BRANCH
    if (key === 'ArrowLeft') {
      this.currentIndex = Math.max(0, index - 1)
      return
    }

    // ---------- ARROW RIGHT BRANCH
    if (key === 'ArrowRight') {
      this.currentIndex = Math.min(length - 1, index + 1)
      return
    }

    // ---------- DIGIT INPUT BRANCH
    if (/^\d$/.test(key)) {
      this.currentIndex = Math.min(length - 1, index + 1)
    }
  }

  // ---------- CLIPBOARD PASTE DATA EXTRACTION HANDLER
  handlePaste(event: ClipboardEvent, length: number): string | null {
    const { disabled = false } = this.props

    // Early return guard clause for disabled state
    if (disabled) return null

    const pastedData = event.clipboardData?.getData('text') ?? ''
    const digits = pastedData.replace(/\D/g, '').slice(0, length)

    return digits || null
  }

  // ---------- GET CURRENT ACTIVE FOCUSED INDEX
  getCurrentIndex() {
    return this.currentIndex
  }

  // ---------- SET CURRENT ACTIVE FOCUSED INDEX
  setCurrentIndex(index: number) {
    this.currentIndex = index
  }

  // ---------- CHECK DISABLED STATE
  isDisabled() {
    return this.props.disabled
  }

  // ---------- GET DIGIT COUNT LENGTH
  getLength() {
    return this.props.length ?? 6
  }
}
