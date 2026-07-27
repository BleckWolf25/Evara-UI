/**
 * @file Form.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Form component.
 *
 * @description
 * Defines FormProps, FormFieldProps, FormItemProps, FormLabelProps, FormControlProps, FormDescriptionProps, and FormMessageProps.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ReactNode } from 'react'
import type { FormController } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- FORM PROPS INTERFACE
export interface FormProps<T extends Record<string, unknown> = Record<string, unknown>> {
  form?: FormController<T> | undefined
  onSubmit?: ((values: Record<string, unknown>) => void | Promise<void>) | ((e: React.SyntheticEvent<HTMLFormElement>) => void)
  children: ReactNode
  className?: string
  'aria-label'?: string
}

// ---------- FORM FIELD PROPS INTERFACE
export interface FormFieldProps<T extends Record<string, unknown> = Record<string, unknown>> {
  name: Extract<keyof T, string>
  children: (field: {
    value: unknown
    onChange: (value: unknown) => void
    onBlur: () => void
    error?: string | undefined
    isTouched: boolean
  }) => ReactNode
}

// ---------- FORM ITEM PROPS INTERFACE
export interface FormItemProps {
  children: ReactNode
  className?: string
}

// ---------- FORM LABEL PROPS INTERFACE
export interface FormLabelProps {
  children: ReactNode
  className?: string
}

// ---------- FORM CONTROL PROPS INTERFACE
export interface FormControlProps {
  children: ReactNode
  className?: string
}

// ---------- FORM DESCRIPTION PROPS INTERFACE
export interface FormDescriptionProps {
  children: ReactNode
  className?: string
}

// ---------- FORM MESSAGE PROPS INTERFACE
export interface FormMessageProps {
  children?: ReactNode
  className?: string
}
