/**
 * @file index.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Main entry point for @bleckwolf25/unplugin build resolvers.
 *
 * @description
 * Re-exports build-time component and composable resolvers for Vue (EvaraVueResolver),
 * Svelte (EvaraSvelteResolver), AutoImport (EvaraAutoImportResolver), and React (evaraReactVitePlugin).
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- EXPORTS
export { EvaraVueResolver } from './resolvers/vue'
export type { EvaraVueResolverOptions } from './resolvers/vue'

export { EvaraSvelteResolver } from './resolvers/svelte'
export type { EvaraSvelteResolverOptions } from './resolvers/svelte'

export { EvaraAutoImportResolver } from './resolvers/auto-import'
export type { EvaraAutoImportResolverOptions } from './resolvers/auto-import'

export { EvaraReactUnplugin, evaraReactVitePlugin, evaraReactWebpackPlugin } from './resolvers/react'
export type { EvaraReactPluginOptions } from './resolvers/react'
