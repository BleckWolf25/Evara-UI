/**
 * @file FieldGroup.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React FieldGroup component.
 *
 * @description
 * Extends core FieldGroupProps with ReactNode children elements.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FieldGroupProps as CoreFieldGroupProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT FIELD GROUP PROPS TYPE
export type FieldGroupProps = CoreFieldGroupProps & {
  children: React.ReactNode
}
