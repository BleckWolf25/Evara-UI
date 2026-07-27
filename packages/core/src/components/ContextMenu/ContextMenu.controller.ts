/**
 * @file ContextMenu.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for ContextMenu popup component.
 *
 * @description
 * Computes context menu positioning coordinates, menu item classes, disabled/divider state flags, and menu ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ContextMenuProps } from './ContextMenu.types'

// ---------- CLASSES

// ---------- CLASS: CONTEXT MENU CONTROLLER
export class ContextMenuController {
  // ---------- FIELDS AND CONSTANTS
  private props: ContextMenuProps

  // ---------- CONSTRUCTOR
  constructor(props: ContextMenuProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET MAIN CONTEXT MENU CLASS NAME
  getContextMenuClasses() {
    return 'ui-context-menu'
  }

  // ---------- GET ITEM CLASS NAME WITH STYLES
  getItemClasses(disabled: boolean, divider: boolean) {
    return [
      'ui-context-menu__item',
      disabled ? 'ui-context-menu__item--disabled' : '',
      divider ? 'ui-context-menu__item--divider' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD ACCESSIBILITY MENU ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'menu',
    }
  }

  // ---------- GET MENU ITEMS ARRAY
  getItems() {
    return this.props.items
  }

  // ---------- GET POPUP DISPLAY POSITION COORDINATES
  getPosition() {
    return {
      x: this.props.x ?? 0,
      y: this.props.y ?? 0,
    }
  }

  // ---------- CHECK OPEN STATE FLAG
  isOpen() {
    return this.props.open
  }
}
