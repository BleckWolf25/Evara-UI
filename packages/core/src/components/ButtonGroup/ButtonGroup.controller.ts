/**
 * @file ButtonGroup.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for ButtonGroup layout component.
 *
 * @description
 * Computes CSS class names, orientation layout flags, size overrides, and group ARIA accessibility roles for button groups.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ButtonGroupProps } from './ButtonGroup.types'

// ---------- CLASSES

// ---------- CLASS: BUTTON GROUP CONTROLLER
export class ButtonGroupController {
  // ---------- FIELDS AND CONSTANTS
  private props: ButtonGroupProps

  // ---------- CONSTRUCTOR
  constructor(props: ButtonGroupProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET BUTTON GROUP CONTAINER CLASSES
  getButtonGroupClasses() {
    const { orientation = 'horizontal', size = 'md' } = this.props

    return [
      'ui-button-group',
      `ui-button-group--${orientation}`,
      `ui-button-group--${size}`,
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'group',
    }
  }

  // ---------- GET ORIENTATION
  getOrientation() {
    return this.props.orientation
  }

  // ---------- GET SIZE
  getSize() {
    return this.props.size
  }
}
