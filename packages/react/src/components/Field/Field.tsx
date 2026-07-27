/**
 * @file Field.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Field form wrapper UI component.
 *
 * @description
 * Wraps form controls with associated field labels, required indicators, helper text messages, and validation error messages.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { FieldController } from '@bleckwolf25/core'
import type { FieldProps } from './Field.types'
import './Field.css'

// ---------- COMPONENTS

// ---------- REACT FIELD COMPONENT
export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS FIELD CONTROLLER INITIALIZATION
    const controller = new FieldController({
      label,
      helperText,
      error,
      required,
      disabled,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getContainerClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {label && (
          <label className={controller.getLabelClasses()}>
            {label}
            {required && (
              <span className="ui-field__required-indicator" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {children}
        {error && <p className={controller.getErrorTextClasses()}>{error}</p>}
        {!error && helperText && <p className={controller.getHelperTextClasses()}>{helperText}</p>}
      </div>
    )
  }
)

Field.displayName = 'Field'
export type { FieldProps }
