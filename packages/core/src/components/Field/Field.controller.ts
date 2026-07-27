/**
 * @file Field.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Field form wrapper component.
 *
 * @description
 * Computes container class names, required label styles, helper/error text styling, and invalid/required ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FieldProps } from './Field.types'

// ---------- CLASSES

// ---------- CLASS: FIELD CONTROLLER
export class FieldController {
  // ---------- FIELDS AND CONSTANTS
  private props: FieldProps

  // ---------- CONSTRUCTOR
  constructor(props: FieldProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET CONTAINER CLASS NAMES STRING
  getContainerClasses() {
    const { disabled = false, error } = this.props

    return [
      'ui-field',
      error ? 'ui-field--error' : '',
      disabled ? 'ui-field--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET LABEL CLASS NAME WITH REQUIRED INDICATOR
  getLabelClasses() {
    const { required = false } = this.props

    return [
      'ui-field__label',
      required ? 'ui-field__label--required' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET HELPER TEXT CLASS NAME
  getHelperTextClasses() {
    return 'ui-field__helper-text'
  }

  // ---------- GET ERROR TEXT CLASS NAME
  getErrorTextClasses() {
    return 'ui-field__error-text'
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { error, required = false, disabled = false } = this.props

    return {
      'aria-invalid': error ? true : undefined,
      'aria-required': required ? true : undefined,
      'aria-disabled': disabled ? true : undefined,
    }
  }

  // ---------- CHECK ERROR MESSAGE PRESENCE
  hasError() {
    return !!this.props.error
  }

  // ---------- CHECK HELPER TEXT PRESENCE
  hasHelperText() {
    return !!this.props.helperText
  }
}
