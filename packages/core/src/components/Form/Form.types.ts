/**
 * @file Form.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Form component controller.
 *
 * @description
 * Defines FormErrors, FormTouched, FormValidateFn types and FormControllerOptions interface for form validation.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- TYPES AND INTERFACES

// ---------- FORM ERRORS MAP TYPE
export type FormErrors<T extends Record<string, unknown> = Record<string, unknown>> = {
  [K in keyof T]?: string
}

// ---------- FORM TOUCHED MAP TYPE
export type FormTouched<T extends Record<string, unknown> = Record<string, unknown>> = {
  [K in keyof T]?: boolean
}

// ---------- FORM VALIDATE FUNCTION TYPE
export type FormValidateFn<T extends Record<string, unknown> = Record<string, unknown>> = (
  values: T,
) => FormErrors<T> | Promise<FormErrors<T>>

// ---------- FORM CONTROLLER OPTIONS INTERFACE
export interface FormControllerOptions<T extends Record<string, unknown> = Record<string, unknown>> {
  initialValues: T
  validate?: FormValidateFn<T>
  onSubmit?: (values: T) => void | Promise<void>
}

// ---------- FIELD CONTROLLER OPTIONS INTERFACE
export interface FieldControllerOptions {
  name: string
  itemId?: string | undefined
}
