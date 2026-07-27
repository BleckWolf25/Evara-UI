/**
 * @file Field.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Field component.
 *
 * @description
 * Re-exports core FieldProps interface for Vue application form fields.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FieldProps as CoreFieldProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE FIELD PROPS INTERFACE
export interface FieldProps extends CoreFieldProps {}
