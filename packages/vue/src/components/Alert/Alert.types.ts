/**
 * @file Alert.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Alert component.
 *
 * @description
 * Extends core AlertProps interface with Vue onDismiss event listener prop.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import type { AlertProps as CoreAlertProps } from '@evara-ui/core'

// ---------- VUE ALERT PROPS INTERFACE
export interface AlertProps extends CoreAlertProps {
  onDismiss?: () => void
}
