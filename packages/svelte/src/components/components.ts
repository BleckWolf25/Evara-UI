/**
 * @file components.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Svelte component prop builder functions wrapping Evara core controllers.
 *
 * @description
 * Implements prop factory helper functions for Svelte elements, computing CSS class names, ARIA attributes,
 * data attributes, and layout styles for Button, Card, Badge, Alert, ProgressBar, Spinner, Dialog, Popover, and FormField.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import {
  ButtonController,
  type ButtonProps,
  CardController,
  type CardProps,
  BadgeController,
  type BadgeProps,
  AlertController,
  type AlertProps,
  ProgressBarController,
  type ProgressBarProps,
  SpinnerController,
  type SpinnerProps,
  DialogController,
  type DialogProps,
  PopoverController,
  type PopoverProps,
  FormFieldController,
  type FieldControllerOptions,
} from '@bleckwolf25/core'

// ---------- FUNCTIONS

// ---------- BUTTON PROP BUILDER
export function createButtonProps(props: Partial<ButtonProps>) {
  const controller = new ButtonController({
    variant: props.variant ?? 'primary',
    size: props.size ?? 'md',
    fullWidth: props.fullWidth ?? false,
    disabled: props.disabled ?? false,
    loading: props.loading ?? false,
  })

  return {
    class: controller.getClassNames(),
    ...controller.getAriaAttributes(),
  }
}

// ---------- CARD PROP BUILDER
export function createCardProps(props: Partial<CardProps>) {
  const controller = new CardController({
    variant: props.variant ?? 'default',
    elevation: props.elevation ?? 'md',
  })

  return {
    class: controller.getCardClasses(),
  }
}

// ---------- BADGE PROP BUILDER
export function createBadgeProps(props: Partial<BadgeProps>) {
  const controller = new BadgeController({
    color: props.color ?? 'default',
    size: props.size ?? 'md',
  })

  return {
    class: controller.getBadgeClasses(),
    ...controller.getAriaAttributes(),
  }
}

// ---------- ALERT PROP BUILDER
export function createAlertProps(props: Partial<AlertProps>) {
  const controller = new AlertController({
    variant: props.variant ?? 'info',
  })

  return {
    class: controller.getAlertClasses(),
    ...controller.getAriaAttributes(),
  }
}

// ---------- PROGRESS BAR PROP BUILDER
export function createProgressBarProps(props: Partial<ProgressBarProps>) {
  const controller = new ProgressBarController({
    value: props.value ?? 0,
  })

  return {
    class: 'ui-progress-bar',
    aria: controller.getAriaAttributes(),
    fillStyle: controller.getFillStyle(),
  }
}

// ---------- SPINNER PROP BUILDER
export function createSpinnerProps(props: Partial<SpinnerProps>) {
  const controller = new SpinnerController({
    size: props.size ?? 'md',
  })

  return {
    class: 'ui-spinner',
    aria: controller.getAriaAttributes(),
  }
}

// ---------- DIALOG PROP BUILDER
export function createDialogProps(props: Partial<DialogProps>) {
  const controller = new DialogController({
    open: props.open ?? false,
    closeOnEscape: props.closeOnEscape ?? true,
    closeOnOverlayClick: props.closeOnOverlayClick ?? true,
    trapFocus: props.trapFocus ?? true,
  })

  return {
    overlayClass: controller.getOverlayClasses(),
    dialogClass: controller.getDialogClasses(),
    aria: controller.getAriaAttributes(),
    data: controller.getDataAttributes(),
  }
}

// ---------- POPOVER PROP BUILDER
export function createPopoverProps(props: Partial<PopoverProps>) {
  const controller = new PopoverController({
    open: props.open ?? false,
    position: props.position ?? 'bottom',
    closeOnClickOutside: props.closeOnClickOutside ?? true,
  })

  return {
    popoverClass: controller.getPopoverClasses(),
    aria: controller.getAriaAttributes(),
  }
}

// ---------- FORM FIELD PROP BUILDER
export function createFormFieldProps(props: FieldControllerOptions & { error?: string | boolean; description?: string }) {
  const controller = new FormFieldController({
    name: props.name,
    itemId: props.itemId,
  })

  return {
    itemId: controller.getItemId(),
    controlId: controller.getControlId(),
    descriptionId: controller.getDescriptionId(),
    messageId: controller.getMessageId(),
    aria: controller.getControlAriaAttributes(!!props.error, !!props.description),
  }
}
