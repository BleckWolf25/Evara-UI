/**
 * @file Field.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless FormFieldController logic for field identification and ARIA binding metadata.
 *
 * @description
 * Manages form field element IDs, label associations, error indicator IDs, and control ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { FieldControllerOptions } from './Form.types'

// ---------- CLASSES

// ---------- CLASS: FORM FIELD CONTROLLER
export class FormFieldController {
  // ---------- FIELDS & CONSTANTS
  private name: string
  private itemId: string

  // ---------- CONSTRUCTOR
  constructor(options: FieldControllerOptions) {
    this.name = options.name
    this.itemId = options.itemId ?? `evara-form-item-${Math.random().toString(36).substring(2, 9)}`
  }

  // ---------- GETTERS & METRIC COMPUTATIONS

  // ---------- GET FIELD NAME
  public getName(): string {
    return this.name
  }

  // ---------- GET ITEM ID
  public getItemId(): string {
    return this.itemId
  }

  // ---------- GET CONTROL ID
  public getControlId(): string {
    return `${this.itemId}-control`
  }

  // ---------- GET DESCRIPTION ID
  public getDescriptionId(): string {
    return `${this.itemId}-description`
  }

  // ---------- GET MESSAGE ID
  public getMessageId(): string {
    return `${this.itemId}-message`
  }

  // ---------- GET CONTROL ARIA ATTRIBUTES
  public getControlAriaAttributes(hasError: boolean, hasDescription: boolean) {
    const describedByParts: string[] = []
    if (hasDescription) describedByParts.push(this.getDescriptionId())
    if (hasError) describedByParts.push(this.getMessageId())

    return {
      id: this.getControlId(),
      'aria-invalid': hasError ? 'true' : undefined,
      'aria-describedby': describedByParts.length > 0 ? describedByParts.join(' ') : undefined,
    }
  }

  // ---------- GET LABEL PROPS
  public getLabelProps() {
    return {
      htmlFor: this.getControlId(),
    }
  }
}
