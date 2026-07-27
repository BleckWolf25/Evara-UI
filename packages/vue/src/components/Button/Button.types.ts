/**
 * @file Button.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Button component.
 *
 * @description
 * Extends core ButtonProps interface with Vue HTML button type attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ButtonProps as CoreButtonProps } from '@bleckwolf25/core'
import type { ButtonHTMLAttributes } from 'vue'

// ---------- VUE BUTTON PROPS INTERFACE
export interface ButtonProps extends CoreButtonProps {
  type?: ButtonHTMLAttributes['type']
}
