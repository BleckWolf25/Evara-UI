/**
 * @file react.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Build-time auto-import unplugin for React components and hooks.
 *
 * @description
 * Automatically detects un-imported Evara React components and hooks in JSX/TSX source code, prepending module import statements at build time.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'

// ---------- INTERFACES AND TYPES

// ---------- REACT PLUGIN OPTIONS INTERFACE
export interface EvaraReactPluginOptions {
  /** Import path override (default: '@bleckwolf25/react') */
  importPath?: string
  /** Include file extensions regex */
  include?: RegExp
}

// ---------- CONSTANTS

// ---------- REACT COMPONENTS AND HOOKS SET
const EVARA_REACT_COMPONENTS = new Set([
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
  'AlertDialog',
  'Popover',
  'DatePicker',
  'Calendar',
  'ContextMenu',
  'Carousel',
  'Resizable',
  'ThemeProvider',
  'useForm',
  'useTheme',
  'useDisclosure',
  'useControllableState',
  'useController',
])

// ---------- UNPLUGIN DEFINITIONS

// ---------- REACT UNPLUGIN FACTORY
export const EvaraReactUnplugin = createUnplugin((options: EvaraReactPluginOptions) => {
  const importPath = options.importPath ?? '@bleckwolf25/react'
  const filter = options.include ?? /\.[jt]sx?$/

  return {
    name: 'evara-react-auto-import',
    // ---------- TRANSFORM INCLUDE FILTER
    transformInclude(id: string) {
      return filter.test(id) && !id.includes('node_modules')
    },
    // ---------- CODE AST TRANSFORM ROUTINE
    transform(code: string) {
      const s = new MagicString(code)
      const usedComponents = new Set<string>()

      // Scan source code for un-imported components
      for (const component of EVARA_REACT_COMPONENTS) {
        const componentRegex = new RegExp(`\\b${component}\\b`)
        const existingImportRegex = new RegExp(`import\\s+.*\\b${component}\\b.*from`)

        if (componentRegex.test(code) && !existingImportRegex.test(code)) {
          usedComponents.add(component)
        }
      }

      // Prepend auto-generated import statement if un-imported symbols are detected
      if (usedComponents.size > 0) {
        const importStatement = `import { ${Array.from(usedComponents).join(', ')} } from '${importPath}';\n`
        s.prepend(importStatement)

        return {
          code: s.toString(),
          map: s.generateMap({ hires: true }),
        }
      }

      return null
    },
  }
})

// ---------- PLUGIN BINDINGS EXPORTS
export const evaraReactVitePlugin = EvaraReactUnplugin.vite
export const evaraReactWebpackPlugin = EvaraReactUnplugin.webpack
