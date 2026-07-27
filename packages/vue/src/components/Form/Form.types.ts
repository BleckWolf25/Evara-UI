/**
 * @file Form.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Form component.
 *
 * @description
 * Defines FormProps and FormFieldProps interfaces for Vue form integration.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FormController } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE FORM PROPS INTERFACE
export interface FormProps<T extends Record<string, unknown> = Record<string, unknown>> {
  form: FormController<T>
}

// ---------- VUE FORM FIELD PROPS INTERFACE
export interface FormFieldProps {
  name: string
}
