/**
 * @file Select.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Select dropdown menu component.
 *
 * @description
 * Renders dropdown select pickers supporting single and multi-selection, searchable text filtering, keyboard listbox navigation, and click-outside popover dismissals.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState, useRef, useEffect } from 'react'
import { SelectController } from '@bleckwolf25/core'
import type { SelectOption } from '@bleckwolf25/core'
import type { SelectProps } from './Select.types'
import './Select.css'

// ---------- COMPONENTS

// ---------- REACT SELECT COMPONENT
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      multiple = false,
      searchable = false,
      disabled = false,
      placeholder = 'Select...',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS SELECT CONTROLLER INITIALIZATION
    const controller = new SelectController({
      options,
      value,
      defaultValue,
      onChange,
      multiple,
      searchable,
      disabled,
      placeholder,
      size,
    })

    // ---------- REACTIVE STATE AND REFS
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [searchQuery, setSearchQuery] = useState('')
    const selectRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const selectedValue = value ?? defaultValue
    const isControlled = value !== undefined

    // ---------- SEARCH QUERY FILTERING
    const filteredOptions = controller
      .getOptions()
      .filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))

    // ---------- TOGGLE DROPDOWN HANDLER
    const handleToggle = () => {
      // Guard clause for disabled select
      if (!controller.isDisabled()) {
        setIsOpen(!isOpen)
        setSearchQuery('')
      }
    }

    // ---------- OPTION SELECTION HANDLER
    const handleSelect = (option: SelectOption) => {
      // Early return guard clause for disabled options
      if (option.disabled) return

      let newValue: string | string[]

      if (controller.isMultiple()) {
        const currentValues = Array.isArray(selectedValue) ? selectedValue : []
        if (currentValues.includes(option.value)) {
          newValue = currentValues.filter((v) => v !== option.value)
        } else {
          newValue = [...currentValues, option.value]
        }
      } else {
        newValue = option.value
      }

      if (!isControlled) {
        onChange?.(newValue)
      } else {
        onChange?.(newValue)
      }

      if (!controller.isMultiple()) {
        setIsOpen(false)
      }
    }

    // ---------- KEYBOARD NAVIGATION HANDLER
    const handleKeyDown = (event: React.KeyboardEvent) => {
      // Early return guard clause for disabled select
      if (controller.isDisabled()) return

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (isOpen && highlightedIndex >= 0) {
            handleSelect(filteredOptions[highlightedIndex])
          } else {
            handleToggle()
          }
          break
        case 'Escape':
          setIsOpen(false)
          break
        case 'ArrowDown':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1))
          }
          break
        case 'ArrowUp':
          event.preventDefault()
          setHighlightedIndex((prev) => Math.max(prev - 1, 0))
          break
      }
    }

    // ---------- SIDE EFFECT: CLICK OUTSIDE DISMISSAL
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    // ---------- GET DISPLAY LABEL SUMMARY HELPER
    const getSelectedLabel = () => {
      if (!selectedValue) return placeholder

      if (controller.isMultiple()) {
        const values = Array.isArray(selectedValue) ? selectedValue : [selectedValue]
        const selectedOptions = controller.getOptions().filter((opt) => values.includes(opt.value))
        return selectedOptions.map((opt) => opt.label).join(', ')
      }

      const selectedOption = controller.getOptions().find((opt) => opt.value === selectedValue)
      return selectedOption?.label ?? placeholder
    }

    return (
      <div
        ref={(node) => {
          selectRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={`${controller.getSelectClasses()}${className ? ` ${className}` : ''}`}
        onKeyDown={handleKeyDown}
        {...controller.getAriaAttributes()}
        {...props}
      >
        <div
          className={controller.getTriggerClasses()}
          onClick={handleToggle}
          tabIndex={controller.isDisabled() ? -1 : 0}
        >
          <span>{getSelectedLabel()}</span>
          <span className="ui-select__arrow">▼</span>
        </div>

        {isOpen && (
          <div ref={dropdownRef} className={controller.getDropdownClasses()}>
            {controller.isSearchable() && (
              <input
                type="text"
                className={controller.getSearchInputClasses()}
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                autoFocus
              />
            )}
            {filteredOptions.map((option, index) => {
              const isSelected = controller.isMultiple()
                ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
                : selectedValue === option.value

              return (
                <div
                  key={option.value}
                  className={controller.getOptionClasses(option, isSelected, index === highlightedIndex)}
                  onClick={() => {
                    handleSelect(option)
                  }}
                  onMouseEnter={() => {
                    setHighlightedIndex(index)
                  }}
                >
                  {option.label}
                  {isSelected && <span className="ui-select__check">✓</span>}
                </div>
              )
            })}
            {filteredOptions.length === 0 && (
              <div className="ui-select__no-results">No results found</div>
            )}
          </div>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export type { SelectProps }
