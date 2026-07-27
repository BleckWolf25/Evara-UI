/**
 * @file Radio.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Radio option UI component.
 *
 * @description
 * Renders individual radio button inputs with group context synchronization, label text wrappers, and ARIA radio role accessibility attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useContext } from 'react'
import { RadioController } from '@bleckwolf25/core'
import { RadioGroupContext } from './RadioGroupContext'
import type { RadioProps } from './Radio.types'
import './Radio.css'

// ---------- COMPONENTS

// ---------- REACT RADIO COMPONENT
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      checked,
      defaultChecked,
      disabled = false,
      required = false,
      label,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const context = useContext(RadioGroupContext)

    // Merge group properties from context if present
    const groupName = context?.name
    const isChecked = context ? context.value === value : (checked ?? defaultChecked ?? false)
    const isDisabled = context?.disabled === true || disabled
    const isRequired = context?.required === true || required

    const strValue = value

    // ---------- HEADLESS RADIO CONTROLLER INITIALIZATION
    const controller = new RadioController({
      value: strValue,
      checked: isChecked,
      disabled: isDisabled,
      required: isRequired,
      name: groupName,
    })

    // ---------- CHANGE EVENT HANDLER
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Guard clause for disabled radios
      if (isDisabled) {
        event.preventDefault()
        return
      }
      onChange?.(event)
      if (context) {
        context.onChange?.(strValue)
      }
    }

    // ---------- RADIO MARKUP COMPUTATION
    const radioMarkup = (
      <div className={`${controller.getClassNames()}${className ? ` ${className}` : ''}`}>
        <input
          ref={ref}
          type="radio"
          name={groupName}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          required={isRequired}
          className={controller.getInputClasses()}
          onChange={handleChange}
          {...controller.getAriaAttributes()}
          {...props}
        />
        <span className={controller.getIndicatorClasses()} />
      </div>
    )

    // ---------- CONDITIONAL LABEL WRAPPER RENDERING
    if (label) {
      return (
        <label
          className={`ui-radio-label-wrapper${
            isDisabled ? ' ui-radio-label-wrapper--disabled' : ''
          }`}
        >
          {radioMarkup}
          <span className="ui-radio-label-text">{label}</span>
        </label>
      )
    }

    return radioMarkup
  }
)

Radio.displayName = 'Radio'
export type { RadioProps }
