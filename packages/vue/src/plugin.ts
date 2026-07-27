/**
 * @file plugin.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Evara UI Vue plugin factory and unplugin-vue-components resolver.
 *
 * @description
 * Implements createEvara plugin installer registering standard and prefixed Vue components globally,
 * compound sub-components, and exports the EvaraResolver function for build-time auto-importing.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import type { App, Component, Plugin } from 'vue'
import * as components from './components'

// ---------- EVARA PLUGIN OPTIONS INTERFACE
export interface EvaraPluginOptions {
  /** Optional prefix for global component registration (e.g., 'Evara' creates <EvaraButton>) */
  prefix?: string
}

// ---------- EVARA PLUGIN FACTORY FUNCTION
export function createEvara(options: EvaraPluginOptions = {}): Plugin {
  return {
    install(app: App) {
      const componentMap = components as unknown as Record<string, Component & Record<string, Component>>
      const userPrefix = options.prefix ?? ''

      // ---------- GLOBAL COMPONENT REGISTRATION LOOP
      for (const [name, component] of Object.entries(componentMap)) {
        // Early return guard clause for non-component exports
        const comp = component as unknown
        if (!comp || (typeof comp !== 'object' && typeof comp !== 'function')) {
          continue
        }

        // ---------- MAIN COMPONENT REGISTRATION
        if (userPrefix) {
          app.component(`${userPrefix}${name}`, component)
        } else {
          app.component(name, component)
          app.component(`Evara${name}`, component)
        }

        // ---------- COMPOUND SUB-COMPONENT REGISTRATION LOOP
        for (const [subName, subComponent] of Object.entries(component)) {
          if (
            subName !== 'name' &&
            subName !== 'setup' &&
            subName !== 'props' &&
            subName !== 'emits' &&
            subName !== 'displayName' &&
            typeof subComponent === 'object'
          ) {
            const registeredSubName = `${name}${subName}`
            if (userPrefix) {
              app.component(`${userPrefix}${registeredSubName}`, subComponent as Component)
            } else {
              app.component(registeredSubName, subComponent as Component)
              app.component(`Evara${registeredSubName}`, subComponent as Component)
            }
          }
        }
      }
    },
  }
}

// ---------- DEFAULT EVARA UI PLUGIN INSTANCE
export const EvaraUI: Plugin = createEvara()

// ---------- UNPLUGIN VUE COMPONENTS RESOLVER FUNCTION
export function EvaraResolver(options: { prefix?: string } = {}) {
  const prefix = options.prefix ?? ''
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      let componentName = name
      if (prefix && name.startsWith(prefix)) {
        componentName = name.slice(prefix.length)
      } else if (!prefix && name.startsWith('Evara')) {
        componentName = name.slice(5)
      }

      const knownComponents = Object.keys(components)
      if (knownComponents.includes(componentName)) {
        return {
          name: componentName,
          from: '@evara-ui/vue',
        }
      }
      return null
    },
  }
}
