/**
 * @file svelte.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Svelte component resolver for build tools.
 *
 * @description
 * Implements build-time component name resolution for Svelte applications, dynamically resolving Evara components and store helpers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- INTERFACES AND TYPES

// ---------- SVELTE RESOLVER OPTIONS INTERFACE
export interface EvaraSvelteResolverOptions {
  /** Custom prefix for component names (e.g., 'Evara' -> <EvaraButton>) */
  prefix?: string
  /** Import path override (default: '@bleckwolf25/svelte') */
  importPath?: string
}

// ---------- CONSTANTS

// ---------- SVELTE COMPONENTS SET
const EVARA_SVELTE_COMPONENTS = new Set([
  'Button',
  'ButtonGroup',
  'Input',
  'Checkbox',
  'Radio',
  'Select',
  'Slider',
  'Field',
  'FieldGroup',
  'InputGroup',
  'InputOTP',
  'Form',
  'FormField',
  'FormItem',
  'FormLabel',
  'FormControl',
  'FormDescription',
  'FormMessage',
  'Card',
  'Separator',
  'Avatar',
  'Badge',
  'Alert',
  'ProgressBar',
  'Skeleton',
  'Spinner',
  'Breadcrumb',
  'Pagination',
  'Dialog',
  'DialogRoot',
  'DialogTrigger',
  'DialogOverlay',
  'DialogContent',
  'DialogHeader',
  'DialogBody',
  'DialogFooter',
  'DialogTitle',
  'DialogDescription',
  'DialogClose',
  'AlertDialog',
  'Popover',
  'PopoverRoot',
  'PopoverTrigger',
  'PopoverContent',
  'PopoverClose',
  'DatePicker',
  'Calendar',
  'ContextMenu',
  'Carousel',
  'Resizable',
  'ThemeProvider',
])

// ---------- FUNCTIONS

// ---------- SVELTE RESOLVER FACTORY
export function EvaraSvelteResolver(options: EvaraSvelteResolverOptions = {}) {
  const prefix = options.prefix ?? ''
  const importPath = options.importPath ?? '@bleckwolf25/svelte'

  return {
    type: 'component' as const,
    // ---------- COMPONENT RESOLUTION METHOD
    resolve: (name: string) => {
      let componentName = name

      // Early return guard clause for unmatched prefix names
      if (prefix) {
        if (!name.startsWith(prefix)) return null
        componentName = name.slice(prefix.length)
      }

      if (EVARA_SVELTE_COMPONENTS.has(componentName)) {
        return {
          name: componentName,
          from: importPath,
        }
      }

      return null
    },
  }
}
