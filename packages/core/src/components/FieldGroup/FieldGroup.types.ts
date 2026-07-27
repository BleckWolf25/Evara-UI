/**
 * @file FieldGroup.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the FieldGroup component controller.
 *
 * @description
 * Defines FieldGroupProps configuration interface including disabled and required state flags.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- FIELD GROUP PROPS INTERFACE
export interface FieldGroupProps extends BaseProps {
  disabled?: boolean | undefined
  required?: boolean | undefined
}
