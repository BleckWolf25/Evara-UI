/**
 * @file useController.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React hook adapter for Evara core headless component controllers.
 *
 * @description
 * Provides generic memoized instantiation helpers for headless core controllers, exposing specific hooks for
 * DialogController, SliderController, and PaginationController in React components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { useMemo } from 'react'
import {
  DialogController,
  SliderController,
  PaginationController,
  type DialogProps,
  type SliderProps,
  type PaginationProps,
} from '@evara-ui/core'

// ---------- INTERFACES AND TYPES

// ---------- CONTROLLER CONSTRUCTOR INTERFACE
export type ControllerConstructor<T, P> = new (props: P) => T

// ---------- HOOKS

// ---------- GENERIC CONTROLLER ADAPTER HOOK
export function useController<T, P>(ControllerClass: ControllerConstructor<T, P>, props: P, deps: unknown[] = []): T {
  /* eslint-disable */
  return useMemo(() => new ControllerClass(props), [ControllerClass, props, ...deps])
  /* eslint-enable */
}

// ---------- DIALOG CONTROLLER ADAPTER HOOK
export function useDialogController(props: DialogProps, deps: unknown[] = []): DialogController {
  return useController(DialogController, props, deps)
}

// ---------- SLIDER CONTROLLER ADAPTER HOOK
export function useSliderController(props: SliderProps, deps: unknown[] = []): SliderController {
  return useController(SliderController, props, deps)
}

// ---------- PAGINATION CONTROLLER ADAPTER HOOK
export function usePaginationController(props: PaginationProps, deps: unknown[] = []): PaginationController {
  return useController(PaginationController, props, deps)
}
