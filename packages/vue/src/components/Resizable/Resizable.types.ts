/**
 * @file Resizable.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Resizable component.
 *
 * @description
 * Re-exports core ResizableProps interface and ResizeHandle types.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ResizableProps as CoreResizableProps, ResizeHandle } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE RESIZABLE PROPS INTERFACE
export interface ResizableProps extends CoreResizableProps {}
export type { ResizeHandle }
