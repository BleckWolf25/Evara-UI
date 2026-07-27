/**
 * @file InputGroup.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React InputGroup component.
 *
 * @description
 * Extends core InputGroupProps with ReactNode children elements.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputGroupProps as CoreInputGroupProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT INPUT GROUP PROPS TYPE
export type InputGroupProps = CoreInputGroupProps & {
  children: React.ReactNode
}
