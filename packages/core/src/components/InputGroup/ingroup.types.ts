/**
 * @file ingroup.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the InputGroup component controller.
 *
 * @description
 * Defines InputGroupProps configuration interface including sizing tokens and disabled state flags.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- INPUT GROUP PROPS INTERFACE
export interface InputGroupProps extends BaseProps {
  size?: Size | undefined
  disabled?: boolean | undefined
}
