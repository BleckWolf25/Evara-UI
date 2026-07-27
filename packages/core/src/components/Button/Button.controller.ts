/**
 * @file Button.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Button component state and accessibility attributes.
 *
 * @description
 * Computes CSS class names, tab index values, and ARIA accessibility properties for framework-agnostic buttons.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ButtonProps } from './Button.types'

// ---------- CLASSES

// ---------- CLASS: BUTTON CONTROLLER
export class ButtonController {
  // ---------- FIELDS AND CONSTANTS
  private props: ButtonProps

  // ---------- CONSTRUCTOR
  constructor(props: ButtonProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'button',
      'aria-disabled': this.props.disabled || this.props.loading ? true : undefined,
      'aria-busy': this.props.loading ? true : undefined,
      tabIndex: this.props.disabled || this.props.loading ? -1 : 0,
    }
  }

  // ---------- BUILD BUTTON CLASS NAMES STRING
  getClassNames() {
    const { variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled = false } = this.props
    return [
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      fullWidth ? 'ui-button--full-width' : '',
      loading ? 'ui-button--loading' : '',
      disabled ? 'ui-button--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }
}
