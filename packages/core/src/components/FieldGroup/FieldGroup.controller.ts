/**
 * @file FieldGroup.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for FieldGroup form input grouping component.
 *
 * @description
 * Computes CSS class names, disabled states, required field group status, and group accessibility ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FieldGroupProps } from './FieldGroup.types'

// ---------- CLASSES

// ---------- CLASS: FIELD GROUP CONTROLLER
export class FieldGroupController {
  // ---------- FIELDS AND CONSTANTS
  private props: FieldGroupProps

  // ---------- CONSTRUCTOR
  constructor(props: FieldGroupProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET CONTAINER CLASS NAMES STRING
  getContainerClasses() {
    const { disabled = false } = this.props

    return ['ui-field-group', disabled ? 'ui-field-group--disabled' : ''].filter(Boolean).join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { required = false, disabled = false } = this.props

    return {
      'aria-disabled': disabled ? true : undefined,
      'aria-required': required ? true : undefined,
    }
  }

  // ---------- CHECK DISABLED STATE
  isDisabled() {
    return this.props.disabled
  }
}
