/**
 * @file Resizable.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Resizable component.
 *
 * @description
 * Re-exports core ResizableProps interface and ResizeHandle types.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

import type { ReactNode } from 'react'
import type { ResizableProps as CoreResizableProps, ResizeHandle } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT RESIZABLE PROPS TYPE
export interface ResizableProps extends Omit<CoreResizableProps, 'children'> {
  children?: ReactNode
}
export type { ResizeHandle }
