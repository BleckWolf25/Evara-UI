/**
 * @file Breadcrumb.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Breadcrumb navigation links component.
 *
 * @description
 * Computes class names for breadcrumb containers, items, current links, separators, and navigation ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BreadcrumbProps } from './Breadcrumb.types'

// ---------- CLASSES

// ---------- CLASS: BREADCRUMB CONTROLLER
export class BreadcrumbController {
  // ---------- FIELDS AND CONSTANTS
  private props: BreadcrumbProps

  // ---------- CONSTRUCTOR
  constructor(props: BreadcrumbProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET BREADCRUMB CONTAINER CLASS NAME
  getBreadcrumbClasses() {
    return 'ui-breadcrumb'
  }

  // ---------- GET BREADCRUMB LIST CLASS NAME
  getListClasses() {
    return 'ui-breadcrumb__list'
  }

  // ---------- GET ITEM CLASS NAME WITH CURRENT STATE
  getItemClasses(isCurrent: boolean) {
    return ['ui-breadcrumb__item', isCurrent ? 'ui-breadcrumb__item--current' : ''].filter(Boolean).join(' ')
  }

  // ---------- GET LINK ELEMENT CLASS NAME
  getLinkClasses() {
    return 'ui-breadcrumb__link'
  }

  // ---------- GET CURRENT ITEM CLASS NAME
  getCurrentClasses() {
    return 'ui-breadcrumb__current'
  }

  // ---------- GET SEPARATOR SPAN CLASS NAME
  getSeparatorClasses() {
    return 'ui-breadcrumb__separator'
  }

  // ---------- BUILD ACCESSIBILITY NAVIGATION ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'navigation',
      'aria-label': 'Breadcrumb',
    }
  }

  // ---------- GET SEPARATOR CHARACTER WITH FALLBACK
  getSeparator() {
    return this.props.separator ?? '/'
  }

  // ---------- GET BREADCRUMB ITEMS ARRAY
  getItems() {
    return this.props.items
  }
}
