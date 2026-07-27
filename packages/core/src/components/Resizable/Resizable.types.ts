/**
 * @file Resizable.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Resizable component controller.
 *
 * @description
 * Defines ResizeHandle direction union type and ResizableProps configuration interface for resize panels.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- RESIZE HANDLE DIRECTION UNION TYPE
export type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

// ---------- RESIZABLE PROPS INTERFACE
export interface ResizableProps extends BaseProps {
  children?: unknown
  width?: number | undefined
  height?: number | undefined
  minWidth?: number | undefined
  maxWidth?: number | undefined
  minHeight?: number | undefined
  maxHeight?: number | undefined
  handles?: ResizeHandle[] | undefined
  onResize?: ((size: { width: number; height: number }) => void) | undefined
  onResizeStart?: (() => void) | undefined
  onResizeEnd?: (() => void) | undefined
}
