/**
 * @file Pagination.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Pagination page navigation component.
 *
 * @description
 * Computes pagination button class names, page ellipsis truncations, prev/next availability, and navigation ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { PaginationProps } from './Pagination.types'

// ---------- CLASSES

// ---------- CLASS: PAGINATION CONTROLLER
export class PaginationController {
  // ---------- FIELDS AND CONSTANTS
  private props: PaginationProps

  // ---------- CONSTRUCTOR
  constructor(props: PaginationProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET MAIN CONTAINER CLASS NAMES STRING
  getPaginationClasses() {
    const { size = 'md' } = this.props

    return ['ui-pagination', `ui-pagination--${size}`].filter(Boolean).join(' ')
  }

  // ---------- GET LIST CLASS NAME
  getListClasses() {
    return 'ui-pagination__list'
  }

  // ---------- GET ITEM CLASS NAME WITH ACTIVE AND DISABLED STATES
  getItemClasses(isActive: boolean, isDisabled: boolean) {
    return [
      'ui-pagination__item',
      isActive ? 'ui-pagination__item--active' : '',
      isDisabled ? 'ui-pagination__item--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET LINK CLASS NAME
  getLinkClasses() {
    return 'ui-pagination__link'
  }

  // ---------- GET INFO TEXT CLASS NAME
  getInfoClasses() {
    return 'ui-pagination__info'
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'navigation',
      'aria-label': 'Pagination',
    }
  }

  // ---------- GET CURRENT PAGE NUMBER
  getCurrentPage() {
    return this.props.currentPage
  }

  // ---------- GET TOTAL PAGES COUNT
  getTotalPages() {
    return this.props.totalPages
  }

  // ---------- GET ITEMS PER PAGE COUNT
  getItemsPerPage() {
    return this.props.itemsPerPage
  }

  // ---------- GET TOTAL ITEMS COUNT
  getTotalItems() {
    return this.props.totalItems
  }

  // ---------- CHECK PREVIOUS PAGE AVAILABILITY
  canGoToPrev() {
    return this.props.currentPage > 1
  }

  // ---------- CHECK NEXT PAGE AVAILABILITY
  canGoToNext() {
    return this.props.currentPage < this.props.totalPages
  }

  // ---------- COMPUTE VISIBLE PAGE NUMBERS WITH TRUNCATION ELLIPSES
  getVisiblePages() {
    const { currentPage, totalPages } = this.props
    const pages: number[] = []

    // ---------- SMALL PAGE COUNT BRANCH (NO ELLIPSIS)
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // ---------- EARLY PAGE RANGE BRANCH
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push(-1)
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        // ---------- LATE PAGE RANGE BRANCH
        pages.push(1)
        pages.push(-1)
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // ---------- MIDDLE PAGE RANGE BRANCH WITH DUAL ELLIPSES
        pages.push(1)
        pages.push(-1)
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push(-1)
        pages.push(totalPages)
      }
    }

    return pages
  }
}
