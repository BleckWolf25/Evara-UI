/**
 * @file Alert.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Alert component.
 *
 * @description
 * Defines variant union types and AlertProps configuration interface for core alert controllers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- ALERT VARIANT TYPE
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

// ---------- ALERT PROPS INTERFACE
export interface AlertProps extends BaseProps {
  variant?: AlertVariant | undefined
  dismissible?: boolean | undefined
  showIcon?: boolean | undefined
}
