/**
 * @file Checkbox.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Checkbox form input component.
 *
 * @description
 * Computes checked, unchecked, and indeterminate (mixed) state class names, indicator styles, and ARIA attributes for checkboxes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CheckboxProps } from './Checkbox.types'

// ---------- CLASSES

// ---------- CLASS: CHECKBOX CONTROLLER
export class CheckboxController {
  // ---------- FIELDS AND CONSTANTS
  private props: CheckboxProps

  // ---------- CONSTRUCTOR
  constructor(props: CheckboxProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const {
      disabled = false,
      required = false,
      indeterminate = false,
      checked = false,
    } = this.props

    return {
      role: 'checkbox',
      'aria-checked': indeterminate ? ('mixed' as const) : checked,
      'aria-disabled': disabled ? true : undefined,
      'aria-required': required ? true : undefined,
    }
  }

  // ---------- BUILD CHECKBOX CONTAINER CLASS NAMES STRING
  getClassNames() {
    const {
      checked = false,
      indeterminate = false,
      disabled = false,
    } = this.props

    return [
      'ui-checkbox-container',
      checked && !indeterminate ? 'ui-checkbox-container--checked' : '',
      indeterminate ? 'ui-checkbox-container--indeterminate' : '',
      disabled ? 'ui-checkbox-container--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET INPUT ELEMENT CLASS NAME
  getInputClasses() {
    return 'ui-checkbox-input'
  }

  // ---------- GET INDICATOR SUB-ELEMENT CLASS NAMES
  getIndicatorClasses() {
    const {
      checked = false,
      indeterminate = false,
    } = this.props

    return [
      'ui-checkbox-indicator',
      checked && !indeterminate ? 'ui-checkbox-indicator--checked' : '',
      indeterminate ? 'ui-checkbox-indicator--indeterminate' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }
}
