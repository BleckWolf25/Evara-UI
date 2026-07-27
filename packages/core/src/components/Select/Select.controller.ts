/**
 * @file Select.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Select dropdown menu component.
 *
 * @description
 * Computes class names for select triggers, dropdown lists, search filters, multiselect states, and combobox ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SelectProps, SelectOption } from './Select.types'

// ---------- CLASSES

// ---------- CLASS: SELECT CONTROLLER
export class SelectController {
  // ---------- FIELDS AND CONSTANTS
  private props: SelectProps

  // ---------- CONSTRUCTOR
  constructor(props: SelectProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET SELECT MAIN CONTAINER CLASS NAME
  getSelectClasses() {
    const { size = 'md', disabled = false, multiple = false } = this.props

    return [
      'ui-select',
      `ui-select--${size}`,
      disabled ? 'ui-select--disabled' : '',
      multiple ? 'ui-select--multiple' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET TRIGGER BUTTON CLASS NAME
  getTriggerClasses() {
    return 'ui-select__trigger'
  }

  // ---------- GET DROPDOWN POPOVER CLASS NAME
  getDropdownClasses() {
    return 'ui-select__dropdown'
  }

  // ---------- GET OPTION ITEM CLASS NAMES
  getOptionClasses(option: SelectOption, isSelected: boolean, isHighlighted: boolean) {
    return [
      'ui-select__option',
      isSelected ? 'ui-select__option--selected' : '',
      isHighlighted ? 'ui-select__option--highlighted' : '',
      option.disabled ? 'ui-select__option--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET SEARCH INPUT CLASS NAME
  getSearchInputClasses() {
    return 'ui-select__search'
  }

  // ---------- BUILD ACCESSIBILITY COMBOBOX ARIA ATTRIBUTES
  getAriaAttributes() {
    const { multiple, disabled, placeholder } = this.props

    return {
      role: 'combobox' as const,
      'aria-expanded': false,
      'aria-haspopup': 'listbox' as const,
      'aria-disabled': disabled,
      'aria-placeholder': placeholder,
      'aria-multiselectable': multiple,
    }
  }

  // ---------- GET OPTIONS ARRAY
  getOptions() {
    return this.props.options
  }

  // ---------- CHECK MULTIPLE SELECTION FLAG
  isMultiple() {
    return this.props.multiple
  }

  // ---------- CHECK SEARCHABLE FILTER FLAG
  isSearchable() {
    return this.props.searchable
  }

  // ---------- CHECK DISABLED STATE
  isDisabled() {
    return this.props.disabled
  }

  // ---------- GET PLACEHOLDER TEXT
  getPlaceholder() {
    return this.props.placeholder
  }

  // ---------- GET CURRENT SELECTED VALUE
  getValue() {
    return this.props.value
  }

  // ---------- GET DEFAULT VALUE
  getDefaultValue() {
    return this.props.defaultValue
  }
}
