/**
 * @file Input.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Input text box component.
 *
 * @description
 * Computes class names, sizing indicators, error/success variants, disabled/readonly states, and text input ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputProps } from './Input.types'

// ---------- CLASSES

// ---------- CLASS: INPUT CONTROLLER
export class InputController {
  // ---------- FIELDS AND CONSTANTS
  private props: InputProps

  // ---------- CONSTRUCTOR
  constructor(props: InputProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const {
      disabled = false,
      readOnly = false,
      required = false,
      variant = 'default',
    } = this.props

    return {
      'aria-disabled': disabled ? true : undefined,
      'aria-readonly': readOnly ? true : undefined,
      'aria-required': required ? true : undefined,
      'aria-invalid': variant === 'error' ? true : undefined,
    }
  }

  // ---------- GET CONTAINER CLASS NAMES STRING
  getContainerClasses() {
    const {
      variant = 'default',
      size = 'md',
      disabled = false,
      readOnly = false,
    } = this.props

    return [
      'ui-input-container',
      `ui-input-container--${variant}`,
      `ui-input-container--${size}`,
      disabled ? 'ui-input-container--disabled' : '',
      readOnly ? 'ui-input-container--readonly' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET INPUT ELEMENT CLASS NAMES STRING
  getInputClasses() {
    const { disabled = false, readOnly = false } = this.props

    return [
      'ui-input',
      disabled ? 'ui-input--disabled' : '',
      readOnly ? 'ui-input--readonly' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }
}
