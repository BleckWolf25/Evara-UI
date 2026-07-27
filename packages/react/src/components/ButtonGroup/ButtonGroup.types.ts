/**
 * @file ButtonGroup.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React ButtonGroup component.
 *
 * @description
 * Extends core ButtonGroupProps with ReactNode children properties for button groups.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ButtonGroupProps as CoreButtonGroupProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT BUTTON GROUP PROPS TYPE
export type ButtonGroupProps = CoreButtonGroupProps & {
  children: React.ReactNode
}
