/**
 * @file auto-import.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Auto-import resolver for unplugin-auto-import.
 *
 * @description
 * Resolves Evara composables and hook functions across Vue, React, Svelte, and Core packages for unplugin-auto-import.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- INTERFACES AND TYPES

// ---------- AUTO-IMPORT RESOLVER OPTIONS INTERFACE
export interface EvaraAutoImportResolverOptions {
  /** Target package framework: 'vue' | 'react' | 'svelte' | 'core' */
  framework?: 'vue' | 'react' | 'svelte' | 'core'
}

// ---------- CONSTANTS

// ---------- AUTO-IMPORTED COMPOSABLE NAMES LIST
const EVARA_COMPOSABLES = [
  'useForm',
  'useTheme',
  'useDisclosure',
  'useControllableState',
  'useController',
  'useButtonController',
  'useDialogController',
  'useSliderController',
  'usePaginationController',
  'registerEvaraCustomElements',
]

// ---------- FUNCTIONS

// ---------- AUTO-IMPORT RESOLVER FACTORY
export function EvaraAutoImportResolver(options: EvaraAutoImportResolverOptions = {}) {
  // Resolve target package name based on selected framework option
  const pkg =
    options.framework === 'vue'
      ? '@evara-ui/vue'
      : options.framework === 'react'
        ? '@evara-ui/react'
        : options.framework === 'svelte'
          ? '@evara-ui/svelte'
          : '@evara-ui/core'

  return {
    [pkg]: EVARA_COMPOSABLES,
  }
}
