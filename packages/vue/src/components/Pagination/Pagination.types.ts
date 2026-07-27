/**
 * @file Pagination.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Pagination component.
 *
 * @description
 * Re-exports core PaginationProps interface for Vue application page navigation.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { PaginationProps as CorePaginationProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE PAGINATION PROPS INTERFACE
export interface PaginationProps extends CorePaginationProps {}
