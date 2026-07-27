/**
 * @file Card.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Card component styling and accessibility attributes.
 *
 * @description
 * Computes container class names, elevation levels, and ARIA disabled attributes for framework-agnostic cards.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CardProps } from './Card.types'

// ---------- CLASSES

// ---------- CLASS: CARD CONTROLLER
export class CardController {
  // ---------- FIELDS AND CONSTANTS
  private props: CardProps

  // ---------- CONSTRUCTOR
  constructor(props: CardProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- BUILD CARD CLASS NAMES STRING
  getCardClasses() {
    const { variant = 'default', elevation = 'md' } = this.props

    return ['ui-card', `ui-card--${variant}`, `ui-card--elevation-${elevation}`]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { disabled } = this.props

    return {
      'aria-disabled': disabled ? true : undefined,
    }
  }
}
