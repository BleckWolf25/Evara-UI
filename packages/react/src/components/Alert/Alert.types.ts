/**
 * @file Alert.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Alert component.
 *
 * @description
 * Extends core AlertProps with React-specific children nodes and onDismiss callback handler interfaces.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { AlertProps as CoreAlertProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT ALERT PROPS TYPE
export type AlertProps = CoreAlertProps & {
  children: React.ReactNode
  onDismiss?: (() => void) | undefined
}
