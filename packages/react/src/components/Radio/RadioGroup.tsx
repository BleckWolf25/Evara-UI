/**
 * @file RadioGroup.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React RadioGroup container UI component.
 *
 * @description
 * Groups multiple child radio inputs with unified context provider, value synchronization, and radiogroup ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState } from 'react'
import { RadioGroupController } from '@bleckwolf25/core'
import { RadioGroupContext } from './RadioGroupContext'
import type { RadioGroupProps } from './Radio.types'
import './Radio.css'

// ---------- COMPONENTS

// ---------- REACT RADIO GROUP COMPONENT
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      disabled = false,
      required = false,
      name,
      onChange,
      onValueChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine controlled vs uncontrolled state
    const isControlled = value !== undefined
    const [localValue, setLocalValue] = useState(defaultValue)
    const activeValue = isControlled ? value : localValue

    // ---------- VALUE CHANGE EVENT HANDLER
    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setLocalValue(newValue)
      }
      onValueChange?.(newValue)
      onChange?.(newValue)
    }

    // ---------- HEADLESS RADIO GROUP CONTROLLER INITIALIZATION
    const controller = new RadioGroupController({
      disabled,
      required,
      name,
    })

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value: activeValue,
          disabled,
          required,
          onChange: handleValueChange,
        }}
      >
        <div
          ref={ref}
          className={`${controller.getClassNames()}${className ? ` ${className}` : ''}`}
          {...controller.getAriaAttributes()}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
