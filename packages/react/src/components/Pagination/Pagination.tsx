/**
 * @file Pagination.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Pagination navigation UI component.
 *
 * @description
 * Renders page navigation lists with prev/next buttons, ellipsis page bounds, items-per-page summaries, and ARIA current page roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { PaginationController } from '@bleckwolf25/core'
import type { PaginationProps } from './Pagination.types'
import './Pagination.css'

// ---------- COMPONENTS

// ---------- REACT PAGINATION COMPONENT
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
      onPageChange,
      onItemsPerPageChange,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS PAGINATION CONTROLLER INITIALIZATION
    const controller = new PaginationController({
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
      onPageChange,
      onItemsPerPageChange,
      size,
    })

    // ---------- PAGE CHANGE HANDLER WITH BOUNDS CHECKING
    const handlePageChange = (page: number) => {
      // Guard clause for out-of-bounds page index
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange?.(page)
      }
    }

    // ---------- PREVIOUS PAGE HANDLER
    const handlePrev = () => {
      if (controller.canGoToPrev()) {
        handlePageChange(currentPage - 1)
      }
    }

    // ---------- NEXT PAGE HANDLER
    const handleNext = () => {
      if (controller.canGoToNext()) {
        handlePageChange(currentPage + 1)
      }
    }

    return (
      <nav
        ref={ref}
        className={`${controller.getPaginationClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        <ul className={controller.getListClasses()}>
          <li className={controller.getItemClasses(false, !controller.canGoToPrev())}>
            <button
              type="button"
              className={controller.getLinkClasses()}
              onClick={handlePrev}
              disabled={!controller.canGoToPrev()}
              aria-label="Previous page"
            >
              ‹
            </button>
          </li>
          {controller.getVisiblePages().map((page, index) => {
            if (page === -1) {
              return (
                <li key={`ellipsis-${index.toString()}`} className={controller.getItemClasses(false, true)}>
                  <span className={controller.getLinkClasses()}>...</span>
                </li>
              )
            }

            return (
              <li key={page} className={controller.getItemClasses(page === currentPage, false)}>
                <button
                  type="button"
                  className={controller.getLinkClasses()}
                  onClick={() => {
                    handlePageChange(page)
                  }}
                  aria-label={`Page ${page.toString()}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              </li>
            )
          })}
          <li className={controller.getItemClasses(false, !controller.canGoToNext())}>
            <button
              type="button"
              className={controller.getLinkClasses()}
              onClick={handleNext}
              disabled={!controller.canGoToNext()}
              aria-label="Next page"
            >
              ›
            </button>
          </li>
        </ul>
        {totalItems && itemsPerPage && (
          <div className={controller.getInfoClasses()}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
            {totalItems} items
          </div>
        )}
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'
export type { PaginationProps }
