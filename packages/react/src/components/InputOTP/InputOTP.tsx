/**
 * @file InputOTP.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React InputOTP one-time password pin entry component.
 *
 * @description
 * Renders multi-box digit PIN inputs with automatic focus forwarding, backspace erasing, arrow key navigation, and clipboard paste parsing.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useRef, useState, useEffect } from 'react'
import { InputOTPController } from '@evara-ui/core'
import type { InputOTPProps } from './InputOTP.types'
import './InputOTP.css'

// ---------- COMPONENTS

// ---------- REACT INPUT OTP COMPONENT
export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      length = 6,
      value: controlledValue,
      defaultValue = '',
      onChange,
      size = 'md',
      disabled = false,
      autoFocus = false,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- REACTIVE STATE INITIALIZATION
    const [value, setValue] = useState(defaultValue)
    const [focusedIndex, setFocusedIndex] = useState(0)
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])

    // ---------- HEADLESS INPUT OTP CONTROLLER INITIALIZATION
    const controller = new InputOTPController({
      length,
      value: controlledValue ?? value,
      onChange,
      size,
      disabled,
      autoFocus,
    })

    const currentValue = controlledValue ?? value

    // ---------- SIDE EFFECT: AUTOMATIC FIRST DIGIT FOCUS
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0]?.focus()
      }
    }, [autoFocus])

    // ---------- SINGLE DIGIT VALUE CHANGE HANDLER
    const handleChange = (index: number, newValue: string) => {
      const newValueArray = currentValue.split('')
      newValueArray[index] = newValue
      const newOTP = newValueArray.join('')

      if (controlledValue === undefined) {
        setValue(newOTP)
      }

      onChange?.(newOTP)

      // Auto-focus next input
      if (newValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    // ---------- KEYBOARD EVENT HANDLER
    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      controller.handleKeyDown(event.nativeEvent, index, currentValue)

      const key = event.key

      if (key === 'Backspace') {
        event.preventDefault()
        handleChange(index, '')
        if (index > 0) {
          inputRefs.current[index - 1]?.focus()
        }
      } else if (key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    // ---------- CLIPBOARD PASTE EVENT HANDLER
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      const pastedData = controller.handlePaste(event.nativeEvent, length)

      if (pastedData) {
        const newValueArray = currentValue.split('')
        for (let i = 0; i < pastedData.length; i++) {
          if (i < length) {
            newValueArray[i] = pastedData[i]
          }
        }
        const newOTP = newValueArray.join('')

        if (controlledValue === undefined) {
          setValue(newOTP)
        }

        onChange?.(newOTP)

        // Focus the next empty input or the last one
        const nextEmptyIndex = pastedData.length < length ? pastedData.length : length - 1
        inputRefs.current[nextEmptyIndex]?.focus()
      }
    }

    // ---------- INPUT FOCUS HANDLER
    const handleFocus = (index: number) => {
      setFocusedIndex(index)
    }

    return (
      <div
        ref={ref}
        className={`${controller.getContainerClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className={controller.getInputClasses(index)}
            value={currentValue[index] || ''}
            onChange={(e) => {
              const newValue = e.target.value
              if (newValue === '' || /^\d$/.test(newValue)) {
                handleChange(index, newValue)
              }
            }}
            onKeyDown={(e) => {
              handleKeyDown(index, e)
            }}
            onPaste={(e) => {
              handlePaste(e)
            }}
            onFocus={() => {
              handleFocus(index)
            }}
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            aria-label={`Digit ${(index + 1).toString()}`}
            aria-current={focusedIndex === index ? 'true' : undefined}
          />
        ))}
      </div>
    )
  }
)

InputOTP.displayName = 'InputOTP'
export type { InputOTPProps }
