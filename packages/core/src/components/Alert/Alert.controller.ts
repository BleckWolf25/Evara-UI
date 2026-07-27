/**
 * @file Alert.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for the Alert component state and accessibility attributes.
 *
 * @description
 * Manages class names, ARIA accessibility attributes, dismissibility flags, and icon rendering states
 * for the framework-agnostic Alert component.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { AlertProps } from './Alert.types'

// ---------- CLASSES

// ---------- CLASS: ALERT CONTROLLER
export class AlertController {
  // ---------- FIELDS AND CONSTANTS
  private props: AlertProps

  // ---------- CONSTRUCTOR
  constructor(props: AlertProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET ALERT CONTAINER CLASSES
  getAlertClasses() {
    const { variant = 'info' } = this.props

    return ['ui-alert', `ui-alert--${variant}`].filter(Boolean).join(' ')
  }

  // ---------- GET ICON SUB-ELEMENT CLASSES
  getIconClasses() {
    return 'ui-alert__icon'
  }

  // ---------- GET CONTENT SUB-ELEMENT CLASSES
  getContentClasses() {
    return 'ui-alert__content'
  }

  // ---------- GET CLOSE BUTTON SUB-ELEMENT CLASSES
  getCloseButtonClasses() {
    return 'ui-alert__close-button'
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'alert',
      'aria-live': 'polite' as const,
      'aria-atomic': true,
    }
  }

  // ---------- CHECK DISMISSIBILITY STATE
  isDismissible() {
    return this.props.dismissible
  }

  // ---------- CHECK ICON VISIBILITY STATE
  shouldShowIcon() {
    return this.props.showIcon
  }

  // ---------- GET CURRENT VARIANT
  getVariant() {
    return this.props.variant
  }
}
