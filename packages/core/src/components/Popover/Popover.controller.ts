/**
 * @file Popover.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Popover overlay content component.
 *
 * @description
 * Computes class names, positioning alignment flags, click-outside policies, data attributes, and dialog ARIA attributes for popovers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { PopoverProps } from './Popover.types'

// ---------- CLASSES

// ---------- CLASS: POPOVER CONTROLLER
export class PopoverController {
  // ---------- FIELDS AND CONSTANTS
  private props: PopoverProps

  // ---------- CONSTRUCTOR
  constructor(props: PopoverProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET POPOVER CONTAINER CLASS NAME
  getPopoverClasses() {
    const { position = 'bottom' } = this.props

    return ['ui-popover', `ui-popover--${position}`].filter(Boolean).join(' ')
  }

  // ---------- GET CONTENT CONTAINER CLASS NAME
  getContentClasses() {
    return 'ui-popover__content'
  }

  // ---------- GET ARROW POINTER CLASS NAME
  getArrowClasses() {
    return 'ui-popover__arrow'
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'dialog',
      'aria-modal': false,
    }
  }

  // ---------- CHECK CLICK OUTSIDE DISMISSAL POLICY
  shouldCloseOnClickOutside() {
    return this.props.closeOnClickOutside !== false
  }

  // ---------- GET POSITION ALIGNMENT
  getPosition() {
    return this.props.position
  }

  // ---------- CHECK OPEN STATE FLAG
  isOpen() {
    return this.props.open
  }

  // ---------- GET DATA STATE ATTRIBUTES
  getDataAttributes() {
    return {
      'data-state': this.props.open ? 'open' : 'closed',
      'data-side': this.props.position ?? 'bottom',
    }
  }
}
