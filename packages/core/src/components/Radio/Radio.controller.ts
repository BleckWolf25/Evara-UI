/**
 * @file Radio.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controllers for Radio and RadioGroup components.
 *
 * @description
 * Computes CSS class names, checked radio indicators, disabled state styles, and accessibility radiogroup/radio ARIA roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { RadioProps, RadioGroupProps } from './Radio.types'

// ---------- CLASSES

// ---------- CLASS: RADIO GROUP CONTROLLER
export class RadioGroupController {
  // ---------- FIELDS AND CONSTANTS
  private props: RadioGroupProps

  // ---------- CONSTRUCTOR
  constructor(props: RadioGroupProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- BUILD ACCESSIBILITY RADIOGROUP ARIA ATTRIBUTES
  getAriaAttributes() {
    const { disabled = false, required = false } = this.props
    return {
      role: 'radiogroup',
      'aria-disabled': disabled ? true : undefined,
      'aria-required': required ? true : undefined,
    }
  }

  // ---------- GET RADIO GROUP CONTAINER CLASS NAMES
  getClassNames() {
    const { disabled = false } = this.props
    return ['ui-radio-group', disabled ? 'ui-radio-group--disabled' : ''].filter(Boolean).join(' ')
  }
}

// ---------- CLASS: RADIO CONTROLLER
export class RadioController {
  // ---------- FIELDS AND CONSTANTS
  private props: RadioProps

  // ---------- CONSTRUCTOR
  constructor(props: RadioProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- BUILD ACCESSIBILITY RADIO ARIA ATTRIBUTES
  getAriaAttributes() {
    const { checked = false, disabled = false } = this.props
    return {
      role: 'radio',
      'aria-checked': checked,
      'aria-disabled': disabled ? true : undefined,
    }
  }

  // ---------- GET RADIO CONTAINER CLASS NAMES
  getClassNames() {
    const { checked = false, disabled = false } = this.props
    return [
      'ui-radio-container',
      checked ? 'ui-radio-container--checked' : '',
      disabled ? 'ui-radio-container--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET INPUT CLASS NAME
  getInputClasses() {
    return 'ui-radio-input'
  }

  // ---------- GET RADIO INDICATOR CLASS NAMES
  getIndicatorClasses() {
    const { checked = false } = this.props
    return ['ui-radio-indicator', checked ? 'ui-radio-indicator--checked' : ''].filter(Boolean).join(' ')
  }
}
