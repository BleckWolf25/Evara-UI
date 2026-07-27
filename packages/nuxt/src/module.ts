/**
 * @file module.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Nuxt 3 module definition for automatic component and composable registration.
 *
 * @description
 * Implements defineNuxtModule for Nuxt 3, auto-injecting CSS stylesheet assets, registering 52 Vue components,
 * and auto-importing composables (useDisclosure, useForm, useTheme, useControllableState, useController).
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineNuxtModule, addComponent, addImports } from '@nuxt/kit'

// ---------- NUXT MODULE OPTIONS INTERFACE
export interface ModuleOptions {
  /** Inject Evara UI global CSS variables and base styles automatically */
  injectStyles?: boolean
  /** Prefix for auto-imported components */
  prefix?: string
}

// ---------- NUXT MODULE FACTORY
const module = defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@evara-ui/nuxt',
    configKey: 'evaraUi',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    injectStyles: true,
    prefix: '',
  },
  setup(options, nuxt) {
    // ---------- CSS STYLE INJECTION
    if (options.injectStyles) {
      nuxt.options.css.push('@evara-ui/styles')
    }

    // ---------- AUTO-IMPORTED COMPONENT REGISTRATION
    const components = [
      'Alert',
      'AlertDialog',
      'Avatar',
      'Badge',
      'Breadcrumb',
      'Button',
      'ButtonGroup',
      'Calendar',
      'Card',
      'Carousel',
      'Checkbox',
      'ContextMenu',
      'DatePicker',
      'Dialog',
      'DialogRoot',
      'DialogTrigger',
      'DialogContent',
      'DialogOverlay',
      'DialogHeader',
      'DialogBody',
      'DialogFooter',
      'DialogTitle',
      'DialogDescription',
      'DialogClose',
      'Field',
      'FieldGroup',
      'Form',
      'FormField',
      'FormItem',
      'FormLabel',
      'FormControl',
      'FormDescription',
      'FormMessage',
      'Input',
      'InputGroup',
      'InputOTP',
      'Pagination',
      'Popover',
      'PopoverRoot',
      'PopoverTrigger',
      'PopoverContent',
      'PopoverClose',
      'ProgressBar',
      'Radio',
      'RadioGroup',
      'Resizable',
      'Select',
      'Separator',
      'Skeleton',
      'Slider',
      'Spinner',
      'ThemeProvider',
    ]

    for (const name of components) {
      addComponent({
        name: `${options.prefix ?? ''}${name}`,
        export: name,
        filePath: '@evara-ui/vue',
      })
    }

    // ---------- AUTO-IMPORTED COMPOSABLE REGISTRATION
    const composables = ['useDisclosure', 'useControllableState', 'useController', 'useTheme', 'useForm']

    for (const name of composables) {
      addImports({
        name,
        as: name,
        from: '@evara-ui/vue',
      })
    }
  },
})

// ---------- DEFAULT MODULE EXPORT
export default module as unknown
