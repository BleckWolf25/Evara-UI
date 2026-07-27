/**
 * @file Form.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Form component and subcomponents with Radix/shadcn compatibility.
 *
 * @description
 * Implements form state management hooks (useForm), context providers (FormContext, FormItemContext),
 * and compound primitives (FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage).
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type React from 'react';
import { createContext, useContext, useId, useState, useEffect, cloneElement, isValidElement } from 'react'
import { FormController, FormFieldController, type FormErrors } from '@evara-ui/core'
import type {
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
} from './Form.types'
import './Form.css'

// ---------- CONTEXT DEFINITIONS
const FormContext = createContext<{ form?: FormController | undefined } | null>(null)

const FormItemContext = createContext<{
  id: string
  name?: string | undefined
  error?: string | undefined
  isTouched?: boolean | undefined
} | null>(null)

// ---------- HOOKS

// ---------- USE FORM CONTEXT HOOK
// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  const ctx = useContext(FormContext)
  return ctx
}

// ---------- USE FORM ITEM CONTEXT HOOK
// eslint-disable-next-line react-refresh/only-export-components
export function useFormItemContext() {
  const ctx = useContext(FormItemContext)
  // Guard clause for usage outside FormItem
  if (!ctx) {
    throw new Error('Form subcomponents must be used within a <FormItem>')
  }
  return ctx
}

// ---------- USE FORM CUSTOM HOOK
// eslint-disable-next-line react-refresh/only-export-components
export function useForm<T extends Record<string, unknown>>(options: {
  initialValues: T
  validate?: (values: T) => FormErrors<T>
  onSubmit?: (values: T) => void | Promise<void>
}) {
  const [form] = useState(() => new FormController<T>(options))
  const [, setTick] = useState(0)

  useEffect(() => {
    return form.subscribe(() => { setTick((t) => t + 1); })
  }, [form])

  return form
}

// ---------- COMPONENTS

// ---------- MAIN FORM ROOT COMPONENT
export function Form<T extends Record<string, unknown>>({
  form,
  onSubmit,
  children,
  className = '',
  'aria-label': ariaLabel,
}: FormProps<T>) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    if (form) {
      e.preventDefault()
      if (onSubmit) {
        void form.handleSubmit().then(() => {
          ;(onSubmit as (values: Record<string, unknown>) => void)(form.getValues())
        })
      } else {
        void form.handleSubmit()
      }
    } else if (onSubmit) {
      ;(onSubmit as (e: React.SyntheticEvent<HTMLFormElement>) => void)(e)
    }
  }

  return (
    <FormContext.Provider value={{ form }}>
      <form onSubmit={handleSubmit} className={`ui-form ${className}`.trim()} aria-label={ariaLabel}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

// ---------- FORM FIELD RENDER-PROP COMPONENT
export function FormField<T extends Record<string, unknown>>({ name, children }: FormFieldProps<T>) {
  const ctx = useFormContext()
  const form = ctx?.form
  const value = form ? form.getValue(name) : undefined
  const error = form ? form.getFieldError(name) : undefined
  const isTouched = form ? form.isFieldTouched(name) : false

  const onChange = (val: unknown) => {
    const isEvent = val && typeof val === 'object' && 'target' in val;
    const rawVal = isEvent ? (val as React.ChangeEvent<HTMLInputElement>).target.value : val;
    if (form) {
      form.setFieldValue(name, rawVal)
    }
  }

  const onBlur = () => {
    if (form) {
      form.setFieldTouched(name, true)
    }
  }

  return (
    <FormItemContext.Provider value={{ id: name, name, error, isTouched }}>
      {children({ value, onChange, onBlur, error, isTouched })}
    </FormItemContext.Provider>
  )
}

// ---------- FORM ITEM CONTAINER COMPONENT
export function FormItem({ children, className = '' }: FormItemProps) {
  const reactId = useId()
  const id = `evara-form-item-${reactId.replace(/:/g, '')}`
  const existingItemContext = useContext(FormItemContext)

  const itemId = existingItemContext?.id ?? id

  return (
    <FormItemContext.Provider
      value={{
        id: itemId,
        name: existingItemContext?.name,
        error: existingItemContext?.error,
        isTouched: existingItemContext?.isTouched,
      }}
    >
      <div className={`ui-form-item ${className}`.trim()}>{children}</div>
    </FormItemContext.Provider>
  )
}

// ---------- FORM LABEL COMPONENT
export function FormLabel({ children, className = '' }: FormLabelProps) {
  const { id, error } = useFormItemContext()
  const fieldController = new FormFieldController({ name: id, itemId: id })
  const labelProps = fieldController.getLabelProps()

  return (
    <label
      htmlFor={labelProps.htmlFor}
      className={`ui-form-label ${error ? 'ui-form-label--error' : ''} ${className}`.trim()}
    >
      {children}
    </label>
  )
}

// ---------- FORM CONTROL COMPONENT
export function FormControl({ children, className = '' }: FormControlProps) {
  const { id, error } = useFormItemContext()
  const fieldController = new FormFieldController({ name: id, itemId: id })
  const ariaProps = fieldController.getControlAriaAttributes(Boolean(error), true)

  if (isValidElement(children)) {
    const childElement = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>
    return cloneElement(childElement, {
      id: ariaProps.id,
      'aria-invalid': ariaProps['aria-invalid'] as boolean | 'true' | 'false' | undefined,
      'aria-describedby': ariaProps['aria-describedby'],
      className: `${childElement.props.className || ''} ${className}`.trim(),
    })
  }

  return <div className={`ui-form-control ${className}`.trim()}>{children}</div>
}

// ---------- FORM DESCRIPTION HELPER TEXT COMPONENT
export function FormDescription({ children, className = '' }: FormDescriptionProps) {
  const { id } = useFormItemContext()
  const fieldController = new FormFieldController({ name: id, itemId: id })

  return (
    <p id={fieldController.getDescriptionId()} className={`ui-form-description ${className}`.trim()}>
      {children}
    </p>
  )
}

// ---------- FORM MESSAGE ERROR/STATUS ALERT COMPONENT
export function FormMessage({ children, className = '' }: FormMessageProps) {
  const { id, error } = useFormItemContext()
  const fieldController = new FormFieldController({ name: id, itemId: id })
  const message = children ?? error

  // Early return guard clause for missing messages
  if (!message) return null

  return (
    <p id={fieldController.getMessageId()} role="alert" className={`ui-form-message ${className}`.trim()}>
      {message}
    </p>
  )
}

// ---------- COMPOUND SUB-COMPONENT ASSIGNMENTS
Form.Field = FormField
Form.Item = FormItem
Form.Label = FormLabel
Form.Control = FormControl
Form.Description = FormDescription
Form.Message = FormMessage
