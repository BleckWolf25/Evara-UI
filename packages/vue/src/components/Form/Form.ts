/**
 * @file Form.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Form container component with Field, Item, Label, Control, Description, and Message sub-components.
 *
 * @description
 * Manages form state validation, reactive submit handlers, error subscriptions, and accessible form control markup.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, provide, inject, ref, onUnmounted, type PropType, type Ref, type VNodeChild } from 'vue'
import { FormController, FormFieldController, type FormErrors } from '@evara-ui/core'
import './Form.css'

// ---------- TYPES AND SYMBOLS
const FormSymbol = Symbol('EvaraForm')
const FormItemSymbol = Symbol('EvaraFormItem')

export interface FormItemContext {
  id: string
  name?: string
  error?: Ref<string | undefined>
  isTouched?: Ref<boolean | undefined>
}

// ---------- FUNCTIONS

// ---------- USE FORM COMPOSABLE HOOK
export function useForm<T extends Record<string, unknown>>(options: {
  initialValues: T
  validate?: (values: T) => FormErrors<T>
  onSubmit?: (values: T) => void | Promise<void>
}) {
  const form = new FormController<T>(options)
  const state = ref({
    values: form.getValues(),
    errors: form.getErrors(),
    touched: form.getTouched(),
    isSubmitting: form.getIsSubmitting(),
  })

  // Subscribe to form state updates
  const unsubscribe = form.subscribe(() => {
    state.value = {
      values: { ...form.getValues() },
      errors: { ...form.getErrors() },
      touched: { ...form.getTouched() },
      isSubmitting: form.getIsSubmitting(),
    }
  })

  onUnmounted(() => { unsubscribe(); })

  return { form, state }
}

// ---------- COMPONENTS

// ---------- VUE FORM MAIN COMPONENT
export const FormComponent = defineComponent({
  name: 'Form',
  props: {
    form: {
      type: Object as PropType<FormController>,
      required: true,
    },
  },
  emits: ['submit'],
  setup(props, { slots, emit }) {
    provide(FormSymbol, props.form)

    // ---------- SUBMIT HANDLER
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      void props.form.handleSubmit().then(() => {
        emit('submit', props.form.getValues())
      })
    }

    return () =>
      h(
        'form',
        {
          class: 'ui-form',
          onSubmit: handleSubmit,
        },
        slots.default ? slots.default() : []
      )
  },
})

// ---------- VUE FORM FIELD SUB-COMPONENT
export const FormField = defineComponent({
  name: 'FormField',
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const form = inject<FormController>(FormSymbol)
    if (!form) throw new Error('Form context not found')
    const value = ref(form.getValue(props.name))
    const error = ref(form.getFieldError(props.name))
    const isTouched = ref(form.isFieldTouched(props.name))

    // Subscribe to field updates
    const unsubscribe = form.subscribe(() => {
      value.value = form.getValue(props.name) ?? undefined
      error.value = form.getFieldError(props.name)
      isTouched.value = form.isFieldTouched(props.name)
    })

    onUnmounted(() => { unsubscribe() })

    // ---------- VALUE CHANGE HANDLER
    const onChange = (val: unknown) => {
      const isEvent = val instanceof Event
      const rawVal = isEvent && val.target ? (val.target as HTMLInputElement).value : val
      form.setFieldValue(props.name, rawVal)
    }

    // ---------- BLUR HANDLER
    const onBlur = () => {
      form.setFieldTouched(props.name, true)
    }

    provide(FormItemSymbol, {
      id: props.name,
      name: props.name,
      error,
      isTouched,
    })

    return () =>
      slots.default
        ? slots.default({
            value: value.value,
            onChange,
            onBlur,
            error: error.value,
            isTouched: isTouched.value,
          })
        : []
  },
})

// ---------- VUE FORM ITEM SUB-COMPONENT
export const FormItem = defineComponent({
  name: 'FormItem',
  setup(_, { slots }) {
    const existing = inject<FormItemContext | null>(FormItemSymbol, null)
    const itemId = existing?.id ?? `evara-form-item-${Math.random().toString(36).substring(2, 9)}`

    provide(FormItemSymbol, existing ?? { id: itemId })

    return () => h('div', { class: 'ui-form-item' }, slots.default ? slots.default() : [])
  },
})

// ---------- VUE FORM LABEL SUB-COMPONENT
export const FormLabel = defineComponent({
  name: 'FormLabel',
  setup(_, { slots }) {
    const itemCtx = inject<FormItemContext | null>(FormItemSymbol, null)
    const fieldController = new FormFieldController({ name: itemCtx?.id ?? '', itemId: itemCtx?.id })
    const labelProps = fieldController.getLabelProps()

    return () =>
      h(
        'label',
        {
          for: labelProps.htmlFor,
          class: ['ui-form-label', itemCtx?.error?.value ? 'ui-form-label--error' : ''],
        },
        slots.default ? slots.default() : []
      )
  },
})

// ---------- VUE FORM CONTROL SUB-COMPONENT
export const FormControl = defineComponent({
  name: 'FormControl',
  setup(_, { slots }) {
    const itemCtx = inject<FormItemContext | null>(FormItemSymbol, null)
    const fieldController = new FormFieldController({ name: itemCtx?.id ?? '', itemId: itemCtx?.id })
    const ariaProps = fieldController.getControlAriaAttributes(Boolean(itemCtx?.error?.value), true)

    return () =>
      h(
        'div',
        {
          class: 'ui-form-control',
          id: ariaProps.id,
          'aria-invalid': ariaProps['aria-invalid'],
          'aria-describedby': ariaProps['aria-describedby'],
        },
        slots.default ? slots.default() : []
      )
  },
})

// ---------- VUE FORM DESCRIPTION SUB-COMPONENT
export const FormDescription = defineComponent({
  name: 'FormDescription',
  setup(_, { slots }) {
    const itemCtx = inject<FormItemContext | null>(FormItemSymbol, null)
    const fieldController = new FormFieldController({ name: itemCtx?.id ?? '', itemId: itemCtx?.id })

    return () =>
      h(
        'p',
        {
          id: fieldController.getDescriptionId(),
          class: 'ui-form-description',
        },
        slots.default ? slots.default() : []
      )
  },
})

// ---------- VUE FORM MESSAGE SUB-COMPONENT
export const FormMessage = defineComponent({
  name: 'FormMessage',
  setup(_, { slots }) {
    const itemCtx = inject<FormItemContext | null>(FormItemSymbol, null)
    const fieldController = new FormFieldController({ name: itemCtx?.id ?? '', itemId: itemCtx?.id })

    return () => {
      const msg = slots.default ? slots.default() : itemCtx?.error?.value
      // Early return guard clause when no error message is present
      if (!msg) return null

      return h(
        'p',
        {
          id: fieldController.getMessageId(),
          role: 'alert',
          class: 'ui-form-message',
        },
        msg as string | VNodeChild[]
      )
    }
  },
})

// ---------- COMPOUND FORM EXPORT
export const Form = Object.assign(FormComponent, {
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
})
