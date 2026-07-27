/**
 * @file Dialog.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Dialog modal window component.
 *
 * @description
 * Computes class names, focus trap policies, overlay dismiss flags, escape key listeners, and modal ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { DialogProps } from './Dialog.types'

// ---------- CLASSES

// ---------- CLASS: DIALOG CONTROLLER
export class DialogController {
  // ---------- FIELDS AND CONSTANTS
  private props: DialogProps

  // ---------- CONSTRUCTOR
  constructor(props: DialogProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET DIALOG CONTAINER CLASS NAME
  getDialogClasses() {
    return 'ui-dialog'
  }

  // ---------- GET OVERLAY BACKDROP CLASS NAME
  getOverlayClasses() {
    return 'ui-dialog__overlay'
  }

  // ---------- GET CONTENT CONTAINER CLASS NAME
  getContentClasses() {
    return 'ui-dialog__content'
  }

  // ---------- GET HEADER SECTION CLASS NAME
  getHeaderClasses() {
    return 'ui-dialog__header'
  }

  // ---------- GET BODY CONTAINER CLASS NAME
  getBodyClasses() {
    return 'ui-dialog__body'
  }

  // ---------- GET FOOTER CONTAINER CLASS NAME
  getFooterClasses() {
    return 'ui-dialog__footer'
  }

  // ---------- GET CLOSE BUTTON CLASS NAME
  getCloseButtonClasses() {
    return 'ui-dialog__close-button'
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { id, ariaLabelledBy, ariaDescribedBy } = this.props

    return {
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      id,
    }
  }

  // ---------- CHECK CLOSE ON ESCAPE POLICY
  shouldCloseOnEscape() {
    return this.props.closeOnEscape !== false
  }

  // ---------- CHECK CLOSE ON OVERLAY CLICK POLICY
  shouldCloseOnOverlayClick() {
    return this.props.closeOnOverlayClick !== false
  }

  // ---------- CHECK FOCUS TRAPPING POLICY
  shouldTrapFocus() {
    return this.props.trapFocus !== false
  }

  // ---------- CHECK OPEN STATE FLAG
  isOpen() {
    return this.props.open
  }

  // ---------- GET DATA STATE ATTRIBUTES
  getDataAttributes() {
    return {
      'data-state': this.props.open ? 'open' : 'closed',
    }
  }
}
