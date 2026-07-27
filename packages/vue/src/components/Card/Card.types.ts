/**
 * @file Card.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Card component.
 *
 * @description
 * Re-exports core CardProps interface for Vue application content card containers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CardProps as CoreCardProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE CARD PROPS INTERFACE
export interface CardProps extends CoreCardProps {}
