/**
 * @file InputGroup.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for InputGroup container component.
 *
 * @description
 * Computes class names, sizing indicators, disabled states, and ARIA group accessibility attributes for input groups.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputGroupProps } from './ingroup.types'

// ---------- CLASSES

// ---------- CLASS: INPUT GROUP CONTROLLER
export class InputGroupController {
  // ---------- FIELDS AND CONSTANTS
  private props: InputGroupProps

  // ---------- CONSTRUCTOR
  constructor(props: InputGroupProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET CONTAINER CLASS NAMES STRING
  getContainerClasses() {
    const { size = 'md', disabled = false } = this.props

    return [
      'ui-input-group',
      `ui-input-group--${size}`,
      disabled ? 'ui-input-group--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { disabled = false } = this.props

    return {
      'aria-disabled': disabled ? true : undefined,
    }
  }

  // ---------- CHECK DISABLED STATE
  isDisabled() {
    return this.props.disabled
  }
}
