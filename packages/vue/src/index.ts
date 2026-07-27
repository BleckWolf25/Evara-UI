/**
 * @file index.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Main entry point for the @bleckwolf25/vue package.
 *
 * @description
 * Re-exports all Vue components, composables, ThemeProvider component, and the global Vue plugin object EvaraUI.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { EvaraUI } from './plugin'

// ---------- EXPORTS
export * from './components'
export * from './composables'
export * from './theme/ThemeProvider'
export * from './plugin'

// ---------- DEFAULT EXPORT
export default EvaraUI
