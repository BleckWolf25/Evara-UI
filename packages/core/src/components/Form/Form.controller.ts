/**
 * @file Form.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Form state management, validation, and submission processing.
 *
 * @description
 * Manages form field values, validation callbacks, touched flags, submit listeners, error maps, and reset actions.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FormControllerOptions, FormErrors, FormTouched, FormValidateFn } from './Form.types'

// ---------- CLASSES

// ---------- CLASS: FORM CONTROLLER
export class FormController<T extends Record<string, unknown> = Record<string, unknown>> {
  // ---------- FIELDS AND CONSTANTS
  private values: T
  private initialValues: T
  private errors: FormErrors<T> = {}
  private touched: FormTouched<T> = {}
  private isSubmitting = false
  private validateFn?: FormValidateFn<T> | undefined
  private onSubmitFn?: ((values: T) => void | Promise<void>) | undefined
  private listeners = new Set<() => void>()

  // ---------- CONSTRUCTOR
  constructor(options: FormControllerOptions<T>) {
    this.initialValues = { ...options.initialValues }
    this.values = { ...options.initialValues }
    this.validateFn = options.validate
    this.onSubmitFn = options.onSubmit
  }

  // ---------- METHODS

  // ---------- LISTENERS SUBSCRIPTION MANAGEMENT
  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  // ---------- PRIVATE HELPER: NOTIFY ALL SUBSCRIBERS
  private notify(): void {
    this.listeners.forEach((listener) => { listener(); })
  }

  // ---------- GET ALL FORM FIELD VALUES
  public getValues(): T {
    return this.values
  }

  // ---------- GET SINGLE FIELD VALUE
  public getValue<K extends keyof T>(name: K): T[K] {
    return this.values[name]
  }

  // ---------- SET FIELD VALUE WITH OPTIONAL VALIDATION
  public setFieldValue<K extends keyof T>(name: K, value: T[K], shouldValidate = true): void {
    this.values = { ...this.values, [name]: value }

    // Validation branch check
    if (shouldValidate && this.validateFn) {
      void this.validateForm()
    } else {
      this.notify()
    }
  }

  // ---------- GET ALL FORM ERRORS MAP
  public getErrors(): FormErrors<T> {
    return this.errors
  }

  // ---------- GET SINGLE FIELD ERROR
  public getFieldError(name: keyof T): string | undefined {
    return this.errors[name]
  }

  // ---------- SET SINGLE FIELD ERROR
  public setFieldError(name: keyof T, error?: string): void {
    this.errors = { ...this.errors, [name]: error }
    this.notify()
  }

  // ---------- GET ALL TOUCHED FIELDS MAP
  public getTouched(): FormTouched<T> {
    return this.touched
  }

  // ---------- CHECK SINGLE FIELD TOUCHED STATUS
  public isFieldTouched(name: keyof T): boolean {
    return !!this.touched[name]
  }

  // ---------- SET FIELD TOUCHED STATUS WITH OPTIONAL VALIDATION
  public setFieldTouched(name: keyof T, isTouched = true, shouldValidate = true): void {
    this.touched = { ...this.touched, [name]: isTouched }

    // Validation branch check
    if (shouldValidate && this.validateFn) {
      void this.validateForm()
    } else {
      this.notify()
    }
  }

  // ---------- GET SUBMITTING STATE FLAG
  public getIsSubmitting(): boolean {
    return this.isSubmitting
  }

  // ---------- ASYNCHRONOUS FORM VALIDATION EXECUTOR
  public async validateForm(): Promise<FormErrors<T>> {
    // Early return guard clause for forms without validation function
    if (!this.validateFn) {
      this.errors = {}
      this.notify()
      return {}
    }

    try {
      const res = await this.validateFn(this.values)
      this.errors = res
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'errors' in err) {
        this.errors = (err as { errors: FormErrors<T> }).errors
      }
    }

    this.notify()
    return this.errors
  }

  // ---------- FORM SUBMIT EVENT HANDLER
  public async handleSubmit(e?: { preventDefault?: () => void }): Promise<void> {
    if (e?.preventDefault) {
      e.preventDefault()
    }

    this.isSubmitting = true
    const allTouched: FormTouched<T> = {}
    Object.keys(this.values).forEach((key) => {
      allTouched[key as keyof T] = true
    })
    this.touched = allTouched

    const validationErrors = await this.validateForm()
    const hasErrors = Object.values(validationErrors).some((err) => Boolean(err))

    if (!hasErrors && this.onSubmitFn) {
      try {
        await this.onSubmitFn(this.values)
      } finally {
        this.isSubmitting = false
        this.notify()
      }
    } else {
      this.isSubmitting = false
      this.notify()
    }
  }

  // ---------- FORM RESET HANDLER
  public resetForm(nextValues?: T): void {
    const resetTo = nextValues ? { ...nextValues } : { ...this.initialValues }
    this.values = resetTo
    this.errors = {}
    this.touched = {}
    this.isSubmitting = false
    this.notify()
  }
}
