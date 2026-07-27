/**
 * @file AlertDialog.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for AlertDialog modal dialog component.
 *
 * @description
 * Manages class names, accessibility ARIA attributes, modal state flags, and button label accessors for alert dialogs.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { AlertDialogProps } from './AlertDialog.types'

// ---------- CLASSES

// ---------- CLASS: ALERT DIALOG CONTROLLER
export class AlertDialogController {
  // ---------- FIELDS AND CONSTANTS
  private props: AlertDialogProps

  // ---------- CONSTRUCTOR
  constructor(props: AlertDialogProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET MAIN CONTAINER CLASS NAME
  getAlertDialogClasses() {
    return 'ui-alert-dialog'
  }

  // ---------- GET OVERLAY BACKDROP CLASS NAME
  getOverlayClasses() {
    return 'ui-alert-dialog__overlay'
  }

  // ---------- GET CONTENT CONTAINER CLASS NAME
  getContentClasses() {
    return 'ui-alert-dialog__content'
  }

  // ---------- GET HEADER SECTION CLASS NAME
  getHeaderClasses() {
    return 'ui-alert-dialog__header'
  }

  // ---------- GET TITLE TEXT CLASS NAME
  getTitleClasses() {
    return 'ui-alert-dialog__title'
  }

  // ---------- GET BODY CONTAINER CLASS NAME
  getBodyClasses() {
    return 'ui-alert-dialog__body'
  }

  // ---------- GET DESCRIPTION TEXT CLASS NAME
  getDescriptionClasses() {
    return 'ui-alert-dialog__description'
  }

  // ---------- GET FOOTER CONTAINER CLASS NAME
  getFooterClasses() {
    return 'ui-alert-dialog__footer'
  }

  // ---------- GET CONFIRM BUTTON CLASS NAME
  getConfirmButtonClasses() {
    return 'ui-alert-dialog__confirm-button'
  }

  // ---------- GET CANCEL BUTTON CLASS NAME
  getCancelButtonClasses() {
    return 'ui-alert-dialog__cancel-button'
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { title, description } = this.props

    return {
      role: 'alertdialog',
      'aria-modal': true,
      'aria-labelledby': title ? 'alert-dialog-title' : undefined,
      'aria-describedby': description ? 'alert-dialog-description' : undefined,
    }
  }

  // ---------- GET DIALOG TITLE
  getTitle() {
    return this.props.title
  }

  // ---------- GET DIALOG DESCRIPTION
  getDescription() {
    return this.props.description
  }

  // ---------- GET CONFIRM BUTTON LABEL WITH FALLBACK
  getConfirmLabel() {
    return this.props.confirmLabel ?? 'Confirm'
  }

  // ---------- GET CANCEL BUTTON LABEL WITH FALLBACK
  getCancelLabel() {
    return this.props.cancelLabel ?? 'Cancel'
  }

  // ---------- CHECK OPEN STATE FLAG
  isOpen() {
    return this.props.open
  }
}
