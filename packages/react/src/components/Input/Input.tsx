/**
 * @file Input.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Input text box component.
 *
 * @description
 * Renders HTML text inputs with support for prefix/suffix icon slots, sizing variants, error validation highlights, and disabled/readonly states.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { InputController } from '@bleckwolf25/core'
import type { InputProps } from './Input.types'
import './Input.css'

// ---------- COMPONENTS

// ---------- REACT INPUT COMPONENT
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      disabled = false,
      readOnly = false,
      required = false,
      prefix,
      suffix,
      className,
      type = 'text',
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS INPUT CONTROLLER INITIALIZATION
    const controller = new InputController({
      variant,
      size,
      disabled,
      readOnly,
      required,
    })

    // ---------- CHANGE EVENT HANDLER
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.target.value)
      onChange?.(event)
    }

    return (
      <div className={`${controller.getContainerClasses()}${className ? ` ${className}` : ''}`}>
        {prefix && <span className="ui-input__prefix">{prefix}</span>}
        <input
          ref={ref}
          type={type}
          className={controller.getInputClasses()}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={handleChange}
          {...controller.getAriaAttributes()}
          {...props}
        />
        {suffix && <span className="ui-input__suffix">{suffix}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export type { InputProps }
