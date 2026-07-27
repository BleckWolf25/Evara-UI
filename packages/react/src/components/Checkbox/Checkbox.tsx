/**
 * @file Checkbox.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Checkbox form control component.
 *
 * @description
 * Renders customizable form checkboxes with support for checked, unchecked, and indeterminate (mixed) states,
 * SVG icons, and outer label wrapper markup.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'
import { CheckboxController } from '@bleckwolf25/core'
import type { CheckboxProps } from './Checkbox.types'
import './Checkbox.css'

// ---------- COMPONENTS

// ---------- REACT CHECKBOX COMPONENT
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      required = false,
      label,
      className,
      onChange,
      onCheckedChange,
      name,
      value,
      ...props
    },
    ref
  ) => {
    // ---------- DOM REF HANDLING
    const inputRef = useRef<HTMLInputElement>(null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => inputRef.current!)

    // ---------- INTERNAL CHECKED STATE INITIALIZATION
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
    const isChecked = checked ?? internalChecked

    // ---------- SIDE EFFECT: SYNC CONTROLLED CHECKED PROP
    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked)
      }
    }, [checked])

    // ---------- SIDE EFFECT: SYNC INDETERMINATE PROPERTY ON INPUT ELEMENT
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    // ---------- HEADLESS CHECKBOX CONTROLLER INITIALIZATION
    const controller = new CheckboxController({
      checked: isChecked,
      defaultChecked,
      indeterminate,
      disabled,
      required,
    })

    // ---------- CHANGE EVENT HANDLER
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Guard clause for disabled checkboxes
      if (disabled) {
        event.preventDefault()
        return
      }
      const newChecked = event.target.checked
      setInternalChecked(newChecked)
      onCheckedChange?.(newChecked)
      onChange?.(event)
    }

    // ---------- CHECKBOX INPUT AND INDICATOR MARKUP COMPUTATION
    const checkboxMarkup = (
      <div className={`${controller.getClassNames()}${className ? ` ${className}` : ''}`}>
        <input
          ref={inputRef}
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          required={required}
          className={controller.getInputClasses()}
          onChange={handleChange}
          {...controller.getAriaAttributes()}
          {...props}
        />
        <span className={controller.getIndicatorClasses()}>
          {indeterminate && (
            <svg
              className="ui-checkbox-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
          {!indeterminate && isChecked && (
            <svg
              className="ui-checkbox-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </div>
    )

    // ---------- CONDITIONAL LABEL WRAPPER RENDERING
    if (label) {
      return (
        <label
          className={`ui-checkbox-label-wrapper${
            disabled ? ' ui-checkbox-label-wrapper--disabled' : ''
          }`}
        >
          {checkboxMarkup}
          <span className="ui-checkbox-label-text">{label}</span>
        </label>
      )
    }

    return checkboxMarkup
  }
)

Checkbox.displayName = 'Checkbox'
export type { CheckboxProps }
