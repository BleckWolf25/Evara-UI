/**
 * @file useController.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue 3 composable adapter for Evara core headless component controllers.
 *
 * @description
 * Provides reactive computed controller instantiation helpers for core controllers in Vue 3,
 * exposing specific composable factories for DialogController, SliderController, and PaginationController.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { computed, type ComputedRef } from 'vue'
import {
  DialogController,
  SliderController,
  PaginationController,
  type DialogProps,
  type SliderProps,
  type PaginationProps,
} from '@bleckwolf25/core'

// ---------- CONTROLLER CONSTRUCTOR INTERFACE
export type ControllerConstructor<T, P> = new (props: P) => T

// ---------- GENERIC CONTROLLER ADAPTER COMPOSABLE
export function useController<T, P>(ControllerClass: ControllerConstructor<T, P>, props: P | (() => P)): ComputedRef<T> {
  // Instantiate controller instance inside reactive computed ref wrapper
  return computed(() => {
    const resolvedProps = typeof props === 'function' ? (props as () => P)() : props
    return new ControllerClass(resolvedProps)
  })
}

// ---------- DIALOG CONTROLLER COMPOSABLE
export function useDialogController(props: DialogProps | (() => DialogProps)): ComputedRef<DialogController> {
  return useController(DialogController, props)
}

// ---------- SLIDER CONTROLLER COMPOSABLE
export function useSliderController(props: SliderProps | (() => SliderProps)): ComputedRef<SliderController> {
  return useController(SliderController, props)
}

// ---------- PAGINATION CONTROLLER COMPOSABLE
export function usePaginationController(props: PaginationProps | (() => PaginationProps)): ComputedRef<PaginationController> {
  return useController(PaginationController, props)
}
