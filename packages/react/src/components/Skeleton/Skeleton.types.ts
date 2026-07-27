/**
 * @file Skeleton.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Skeleton component.
 *
 * @description
 * Extends core SkeletonProps interface with HTMLAttributes<HTMLDivElement>.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SkeletonProps as CoreSkeletonProps } from '@evara-ui/core'
import type { HTMLAttributes } from 'react'

// ---------- TYPES AND INTERFACES

// ---------- REACT SKELETON PROPS INTERFACE
export interface SkeletonProps extends CoreSkeletonProps, HTMLAttributes<HTMLDivElement> {}
