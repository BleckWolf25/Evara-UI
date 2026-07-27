/**
 * @file Pagination.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Pagination component controller.
 *
 * @description
 * Defines PaginationProps configuration interface including currentPage, totalPages, and page change callbacks.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- PAGINATION PROPS INTERFACE
export interface PaginationProps extends BaseProps {
  currentPage: number
  totalPages: number
  itemsPerPage?: number | undefined
  totalItems?: number | undefined
  onPageChange?: ((page: number) => void) | undefined
  onItemsPerPageChange?: ((itemsPerPage: number) => void) | undefined
  size?: Size | undefined
}
