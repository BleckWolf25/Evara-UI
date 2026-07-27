/**
 * @file form.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Svelte form store adapter wrapping Evara FormController.
 *
 * @description
 * Wraps FormController with Svelte writable and derived stores, exposing values, errors, touched,
 * isSubmitting, isValid, setValue, validate, and reset capabilities.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { writable, derived } from 'svelte/store'
import { FormController, type FormControllerOptions, type FormErrors, type FormTouched } from '@evara-ui/core'

// ---------- FUNCTIONS

// ---------- CREATE FORM STORE FACTORY
export function createFormStore<T extends Record<string, unknown>>(options: FormControllerOptions<T>) {
  // ---------- HEADLESS FORM CONTROLLER INITIALIZATION
  const controller = new FormController(options)

  // ---------- SVELTE RECTIVE STORES INITIALIZATION
  const values = writable<T>({ ...controller.getValues() })
  const errors = writable<FormErrors<T>>({ ...controller.getErrors() })
  const touched = writable<FormTouched<T>>({ ...controller.getTouched() })
  const isSubmitting = writable<boolean>(controller.getIsSubmitting())

  // ---------- DERIVED FORM VALIDITY STORE
  const isValid = derived(errors, ($errors) => Object.keys($errors).length === 0)

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    // ---------- SET FIELD VALUE METHOD
    setValue: <K extends keyof T>(field: K, value: T[K]) => {
      controller.setFieldValue(field, value)
      values.set({ ...controller.getValues() })
      errors.set({ ...controller.getErrors() })
    },
    // ---------- SET FIELD TOUCHED METHOD
    setTouched: (field: keyof T, isTouched = true) => {
      controller.setFieldTouched(field, isTouched)
      touched.set({ ...controller.getTouched() })
    },
    // ---------- ASYNC FORM VALIDATION METHOD
    validate: async () => {
      const errs = await controller.validateForm()
      errors.set({ ...controller.getErrors() })
      return Object.keys(errs).length === 0
    },
    // ---------- RESET FORM METHOD
    reset: (nextValues?: T) => {
      controller.resetForm(nextValues)
      values.set({ ...controller.getValues() })
      errors.set({ ...controller.getErrors() })
      touched.set({ ...controller.getTouched() })
      isSubmitting.set(false)
    },
  }
}

// ---------- USE FORM ALIAS EXPORT
export const useForm = createFormStore
