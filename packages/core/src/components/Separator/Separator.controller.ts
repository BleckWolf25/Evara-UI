/**
 * @file Separator.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Separator divider line component.
 *
 * @description
 * Computes class names for horizontal and vertical layout dividers, color themes, and separator ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SeparatorProps } from './Separator.types'

// ---------- CLASSES

// ---------- CLASS: SEPARATOR CONTROLLER
export class SeparatorController {
  // ---------- FIELDS AND CONSTANTS
  private props: SeparatorProps

  // ---------- CONSTRUCTOR
  constructor(props: SeparatorProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET SEPARATOR CLASS NAMES STRING
  getSeparatorClasses() {
    const { orientation = 'horizontal', color = 'default' } = this.props

    return ['ui-separator', `ui-separator--${orientation}`, `ui-separator--${color}`].filter(Boolean).join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { orientation = 'horizontal' } = this.props

    return {
      role: 'separator',
      'aria-orientation': orientation,
    }
  }
}
