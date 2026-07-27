/**
 * @file controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless core controller instantiation helpers for Svelte applications.
 *
 * @description
 * Exposes helper functions for instantiating ButtonController, CardController, DialogController,
 * SliderController, and PaginationController in Svelte components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import {
  ButtonController,
  CardController,
  DialogController,
  SliderController,
  PaginationController,
  type ButtonProps,
  type CardProps,
  type DialogProps,
  type SliderProps,
  type PaginationProps,
} from '@bleckwolf25/core'

// ---------- FUNCTIONS

// ---------- BUTTON CONTROLLER CREATOR
export function useButtonController(props: ButtonProps) {
  return new ButtonController(props)
}

// ---------- CARD CONTROLLER CREATOR
export function useCardController(props: CardProps) {
  return new CardController(props)
}

// ---------- DIALOG CONTROLLER CREATOR
export function useDialogController(props: DialogProps) {
  return new DialogController(props)
}

// ---------- SLIDER CONTROLLER CREATOR
export function useSliderController(props: SliderProps) {
  return new SliderController(props)
}

// ---------- PAGINATION CONTROLLER CREATOR
export function usePaginationController(props: PaginationProps) {
  return new PaginationController(props)
}
