/**
 * @file Field.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Field component.
 *
 * @description
 * Extends core FieldProps with ReactNode children elements.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FieldProps as CoreFieldProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT FIELD PROPS TYPE
export type FieldProps = CoreFieldProps & {
  children: React.ReactNode
}
