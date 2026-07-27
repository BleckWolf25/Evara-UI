/**
 * @file Breadcrumb.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Breadcrumb component controller.
 *
 * @description
 * Defines BreadcrumbItem interface and BreadcrumbProps configuration interface for navigation breadcrumbs.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- BREADCRUMB ITEM INTERFACE
export interface BreadcrumbItem {
  label: string
  href?: string | undefined
  current?: boolean | undefined
}

// ---------- BREADCRUMB PROPS INTERFACE
export interface BreadcrumbProps extends BaseProps {
  items: BreadcrumbItem[]
  separator?: string | undefined
}
