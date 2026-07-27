/**
 * @file vue.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue 3 component resolver for unplugin-vue-components.
 *
 * @description
 * Resolves Evara Vue 3 components and compound sub-components on demand for unplugin-vue-components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- INTERFACES AND TYPES

// ---------- VUE RESOLVER OPTIONS INTERFACE
export interface EvaraVueResolverOptions {
  /** Custom prefix for component names (e.g., 'Evara' -> <EvaraButton>) */
  prefix?: string
  /** Import path override (default: '@evara-ui/vue') */
  importPath?: string
}

// ---------- CONSTANTS

// ---------- VUE COMPONENTS SET
const EVARA_VUE_COMPONENTS = new Set([
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

// ---------- VUE RESOLVER FACTORY
export function EvaraVueResolver(options: EvaraVueResolverOptions = {}) {
  const prefix = options.prefix ?? ''
  const importPath = options.importPath ?? '@evara-ui/vue'

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

      if (EVARA_VUE_COMPONENTS.has(componentName)) {
        return {
          name: componentName,
          from: importPath,
        }
      }

      return null
    },
  }
}
