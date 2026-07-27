/**
 * @file Slider.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Slider range input UI component.
 *
 * @description
 * Renders interactive track sliders supporting single-thumb and dual-thumb range values, step precision math, drag interactions, and slider ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState, useRef, useCallback, useMemo } from 'react'
import { SliderController } from '@bleckwolf25/core'
import type { SliderProps } from './Slider.types'
import './Slider.css'

// ---------- COMPONENTS

// ---------- REACT SLIDER COMPONENT
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 50,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      range = false,
      disabled = false,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS SLIDER CONTROLLER MEMOIZATION
    const controller = useMemo(
      () =>
        new SliderController({
          value,
          defaultValue,
          onChange,
          min,
          max,
          step,
          range,
          disabled,
          size,
        }),
      [value, defaultValue, onChange, min, max, step, range, disabled, size],
    )

    // ---------- REACTIVE STATE AND REFS
    const [internalValue, setInternalValue] = useState<number | number[]>(defaultValue)
    const [isDragging, setIsDragging] = useState(false)
    const [activeThumb, setActiveThumb] = useState<number>(0)
    const sliderRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    const currentValue = value ?? internalValue
    const isControlled = value !== undefined

    // ---------- TRACK CLICK DIRECT VALUE JUMP HANDLER
    const handleTrackClick = useCallback(
      (e: React.MouseEvent) => {
        // Guard clause for disabled slider
        if (controller.isDisabled()) return

        const track = trackRef.current
        // Guard clause for missing track ref
        if (!track) return

        const rect = track.getBoundingClientRect()
        const percentage = ((e.clientX - rect.left) / rect.width) * 100
        const newValue = controller.getValueFromPercentage(percentage)

        if (controller.isRange()) {
          const currentValues = Array.isArray(currentValue)
            ? currentValue
            : [defaultValue as number, defaultValue as number]
          const newValues = [...currentValues]
          const thumbIndex = Math.abs(newValue - currentValues[0]) < Math.abs(newValue - currentValues[1]) ? 0 : 1
          newValues[thumbIndex] = newValue
          newValues.sort((a, b) => a - b)

          if (!isControlled) {
            setInternalValue(newValues)
          }
          onChange?.(newValues)
        } else {
          if (!isControlled) {
            setInternalValue(newValue)
          }
          onChange?.(newValue)
        }
      },
      [controller, currentValue, defaultValue, isControlled, onChange],
    )

    // ---------- THUMB MOUSE DOWN DRAG INITIATION HANDLER
    const handleThumbMouseDown = useCallback(
      (thumbIndex: number, e: React.MouseEvent) => {
        // Guard clause for disabled slider
        if (controller.isDisabled()) return

        e.preventDefault()
        e.stopPropagation()

        setIsDragging(true)
        setActiveThumb(thumbIndex)

        // ---------- MOUSE MOVE DRAG HANDLER
        const handleMouseMove = (moveEvent: MouseEvent) => {
          const track = trackRef.current
          // Guard clause for missing track ref
          if (!track) return

          const rect = track.getBoundingClientRect()
          const percentage = ((moveEvent.clientX - rect.left) / rect.width) * 100
          const newValue = controller.getValueFromPercentage(percentage)

          if (controller.isRange()) {
            const currentValues = Array.isArray(currentValue)
              ? currentValue
              : [defaultValue as number, defaultValue as number]
            const newValues = [...currentValues]
            newValues[thumbIndex] = newValue
            newValues.sort((a, b) => a - b)

            if (!isControlled) {
              setInternalValue(newValues)
            }
            onChange?.(newValues)
          } else {
            if (!isControlled) {
              setInternalValue(newValue)
            }
            onChange?.(newValue)
          }
        }

        // ---------- MOUSE UP DRAG END HANDLER
        const handleMouseUp = () => {
          setIsDragging(false)
          setActiveThumb(0)

          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      },
      [controller, currentValue, defaultValue, isControlled, onChange],
    )

    // ---------- RENDER SLIDER THUMBS HELPER
    const renderThumbs = () => {
      if (controller.isRange()) {
        const values = Array.isArray(currentValue)
          ? currentValue
          : [defaultValue as number, defaultValue as number]
        return values.map((val, index) => {
          const percentage = controller.getPercentage(val)
          return (
            <div
              key={index}
              className={controller.getThumbClasses(isDragging && activeThumb === index)}
              style={{ left: `${percentage.toString()}%` }}
              onMouseDown={(e) => {
                handleThumbMouseDown(index, e)
              }}
              tabIndex={controller.isDisabled() ? -1 : 0}
              role="slider"
              aria-valuenow={val}
              aria-valuemin={controller.getMin()}
              aria-valuemax={controller.getMax()}
              aria-disabled={controller.isDisabled()}
              aria-valuetext={val.toString()}
            />
          )
        })
      }

      const percentage = controller.getPercentage(currentValue as number)
      return (
        <div
          className={controller.getThumbClasses(isDragging)}
          style={{ left: `${percentage.toString()}%` }}
          onMouseDown={(e) => {
            handleThumbMouseDown(0, e)
          }}
          tabIndex={controller.isDisabled() ? -1 : 0}
          role="slider"
          aria-valuenow={currentValue as number}
          aria-valuemin={controller.getMin()}
          aria-valuemax={controller.getMax()}
          aria-disabled={controller.isDisabled()}
          aria-valuetext={currentValue.toString()}
        />
      )
    }

    // ---------- RENDER TRACK FILL HELPER
    const renderFill = () => {
      if (controller.isRange()) {
        const values = Array.isArray(currentValue)
          ? currentValue
          : [defaultValue as number, defaultValue as number]
        const startPercentage = controller.getPercentage(values[0])
        const endPercentage = controller.getPercentage(values[1])
        return (
          <div
            className={controller.getFillClasses()}
            style={{
              left: `${startPercentage.toString()}%`,
              width: `${(endPercentage - startPercentage).toString()}%`,
            }}
          />
        )
      }

      const percentage = controller.getPercentage(currentValue as number)
      return (
        <div
          className={controller.getFillClasses()}
          style={{ width: `${percentage.toString()}%` }}
        />
      )
    }

    return (
      <div
        ref={(node) => {
          sliderRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={`${controller.getSliderClasses()}${className ? ` ${className}` : ''}`}
        {...props}
      >
        <div ref={trackRef} className={controller.getTrackClasses()} onClick={handleTrackClick}>
          {renderFill()}
          {renderThumbs()}
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
export type { SliderProps }
