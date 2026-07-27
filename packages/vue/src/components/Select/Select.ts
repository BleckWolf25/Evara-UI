/**
 * @file Select.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Select dropdown menu picker component.
 *
 * @description
 * Renders select dropdowns supporting single and multi-selection modes, search input filters, keyboard listbox navigation, and click-outside popover dismissals.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, onMounted, onBeforeUnmount, type PropType } from 'vue'
import { SelectController, type SelectOption } from '@bleckwolf25/core'
import type { SelectProps } from './Select.types'
import './Select.css'

// ---------- COMPONENTS

// ---------- VUE SELECT COMPONENT
export const Select = defineComponent({
  name: 'Select',
  props: {
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    value: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    modelValue: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Select...',
    },
    size: {
      type: String as PropType<SelectProps['size']>,
      default: 'md',
    },
  },
  emits: ['update:modelValue', 'update:value', 'change'],
  setup(props, { emit, attrs }) {
    // ---------- REACTIVE STATE AND REFS
    const isOpen = ref(false)
    const highlightedIndex = ref(-1)
    const searchQuery = ref('')
    const internalValue = ref(props.defaultValue)
    const selectRef = ref<HTMLDivElement | null>(null)
    const dropdownRef = ref<HTMLDivElement | null>(null)

    // ---------- GET ACTIVE VALUE HELPER
    const getActiveValue = () => {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.value !== undefined) return props.value
      return internalValue.value
    }

    // ---------- TOGGLE DROPDOWN HANDLER
    const handleToggle = (controller: SelectController) => {
      // Early return guard clause for disabled select
      if (!controller.isDisabled()) {
        isOpen.value = !isOpen.value
        searchQuery.value = ''
      }
    }

    // ---------- OPTION SELECTION HANDLER
    const handleSelect = (option: SelectOption, controller: SelectController) => {
      // Early return guard clause for disabled option
      if (option.disabled) return

      let newValue: string | string[]
      const selectedValue = getActiveValue()

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

      if (props.modelValue === undefined && props.value === undefined) {
        internalValue.value = newValue
      }

      emit('update:modelValue', newValue)
      emit('update:value', newValue)
      emit('change', newValue)

      if (!controller.isMultiple()) {
        isOpen.value = false
      }
    }

    // ---------- CLICK OUTSIDE DISMISSAL HANDLER
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.value &&
        !selectRef.value.contains(event.target as Node) &&
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target as Node)
      ) {
        isOpen.value = false
      }
    }

    // ---------- LIFECYCLE MOUNT LISTENERS
    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside)
    })

    return () => {
      const selectedValue = getActiveValue()

      // ---------- HEADLESS SELECT CONTROLLER INITIALIZATION
      const controller = new SelectController({
        options: props.options,
        value: selectedValue,
        defaultValue: props.defaultValue,
        multiple: props.multiple,
        searchable: props.searchable,
        disabled: props.disabled,
        placeholder: props.placeholder,
        size: props.size,
      })

      const filteredOptions = controller
        .getOptions()
        .filter((option) => option.label.toLowerCase().includes(searchQuery.value.toLowerCase()))

      const getSelectedLabel = () => {
        if (!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0)) return props.placeholder

        if (controller.isMultiple()) {
          const values = Array.isArray(selectedValue) ? selectedValue : [selectedValue]
          const selectedOptions = controller.getOptions().filter((opt) => values.includes(opt.value))
          return selectedOptions.map((opt) => opt.label).join(', ')
        }

        const selectedOption = controller.getOptions().find((opt) => opt.value === selectedValue)
        return selectedOption?.label ?? props.placeholder
      }

      // ---------- KEYBOARD NAVIGATION HANDLER
      const handleKeyDown = (event: KeyboardEvent) => {
        // Early return guard clause for disabled select
        if (controller.isDisabled()) return

        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault()
            if (isOpen.value && highlightedIndex.value >= 0) {
              const opt = filteredOptions[highlightedIndex.value]
              handleSelect(opt, controller)
            } else {
              handleToggle(controller)
            }
            break
          case 'Escape':
            isOpen.value = false
            break
          case 'ArrowDown':
            event.preventDefault()
            if (!isOpen.value) {
              isOpen.value = true
            } else {
              highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredOptions.length - 1)
            }
            break
          case 'ArrowUp':
            event.preventDefault()
            highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
            break
        }
      }

      return h(
        'div',
        {
          ref: selectRef,
          class: [controller.getSelectClasses(), attrs.class],
          onKeydown: handleKeyDown,
          ...controller.getAriaAttributes(),
        },
        [
          h(
            'div',
            {
              class: controller.getTriggerClasses(),
              onClick: () => { handleToggle(controller); },
              tabindex: controller.isDisabled() ? -1 : 0,
            },
            [h('span', getSelectedLabel()), h('span', { class: 'ui-select__arrow' }, '▼')]
          ),
          isOpen.value
            ? h('div', { ref: dropdownRef, class: controller.getDropdownClasses() }, [
                controller.isSearchable()
                  ? h('input', {
                      type: 'text',
                      class: controller.getSearchInputClasses(),
                      placeholder: 'Search...',
                      value: searchQuery.value,
                      onInput: (e: Event) => {
                        searchQuery.value = (e.target as HTMLInputElement).value
                      },
                      onClick: (e: Event) => { e.stopPropagation(); },
                      autofocus: true,
                    })
                  : null,
                filteredOptions.map((option, index) => {
                  const isSelected = controller.isMultiple()
                    ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
                    : selectedValue === option.value

                  return h(
                    'div',
                    {
                      key: option.value,
                      class: controller.getOptionClasses(option, isSelected, index === highlightedIndex.value),
                      onClick: () => { handleSelect(option, controller); },
                      onMouseenter: () => {
                        highlightedIndex.value = index
                      },
                    },
                    [option.label, isSelected ? h('span', { class: 'ui-select__check' }, '✓') : null]
                  )
                }),
                filteredOptions.length === 0 ? h('div', { class: 'ui-select__no-results' }, 'No results found') : null,
              ])
            : null,
        ]
      )
    }
  },
})
