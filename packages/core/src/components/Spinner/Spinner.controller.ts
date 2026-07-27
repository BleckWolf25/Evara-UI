/**
 * @file Spinner.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Spinner loading indicator component.
 *
 * @description
 * Computes class names, sizing indicators, color variants, and status loading ARIA attributes for spinning activity indicators.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SpinnerProps } from './Spinner.types'

// ---------- CLASSES

// ---------- CLASS: SPINNER CONTROLLER
export class SpinnerController {
  // ---------- FIELDS AND CONSTANTS
  private props: SpinnerProps

  // ---------- CONSTRUCTOR
  constructor(props: SpinnerProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET SPINNER MAIN CONTAINER CLASSES
  getSpinnerClasses() {
    const { size = 'md', color = 'default' } = this.props

    return ['ui-spinner', `ui-spinner--${size}`, `ui-spinner--${color}`].filter(Boolean).join(' ')
  }

  // ---------- BUILD ACCESSIBILITY STATUS ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'status',
      'aria-label': 'Loading...',
    }
  }

  // ---------- GET SIZE TOKEN
  getSize() {
    return this.props.size
  }

  // ---------- GET COLOR TOKEN
  getColor() {
    return this.props.color
  }
}
