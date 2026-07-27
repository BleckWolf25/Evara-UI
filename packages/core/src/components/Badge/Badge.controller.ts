/**
 * @file Badge.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Badge component styling and accessibility status roles.
 *
 * @description
 * Computes class names, color tokens, sizing indicators, positioning classes, and ARIA status roles for badges.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BadgeProps } from './Badge.types'

// ---------- CLASSES

// ---------- CLASS: BADGE CONTROLLER
export class BadgeController {
  // ---------- FIELDS AND CONSTANTS
  private props: BadgeProps

  // ---------- CONSTRUCTOR
  constructor(props: BadgeProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- BUILD BADGE CLASS NAMES STRING
  getBadgeClasses() {
    const { color = 'default', size = 'sm', position } = this.props

    return [
      'ui-badge',
      `ui-badge--${color}`,
      `ui-badge--${size}`,
      position ? `ui-badge--${position}` : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'status',
    }
  }

  // ---------- GET BADGE POSITION
  getPosition() {
    return this.props.position
  }
}
