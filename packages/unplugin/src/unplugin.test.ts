/**
 * @file unplugin.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit test suite for @evara-ui/unplugin resolvers and transform plugins.
 *
 * @description
 * Validates EvaraVueResolver name matching, prefix handling, EvaraAutoImportResolver framework outputs,
 * and EvaraReactUnplugin JSX code transformation auto-imports.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import { EvaraVueResolver, EvaraAutoImportResolver, EvaraReactUnplugin } from './index'

// ---------- TEST SUITES

// ---------- UNPLUGIN RESOLVERS TEST SUITE
describe('@evara-ui/unplugin Resolvers & Plugins', () => {
  // ---------- VUE RESOLVER DEFAULT MATCH TEST
  it('EvaraVueResolver resolves Vue component names to @evara-ui/vue', () => {
    const resolver = EvaraVueResolver()
    const result = resolver.resolve('Button')

    expect(result).toEqual({
      name: 'Button',
      from: '@evara-ui/vue',
    })
  })

  // ---------- VUE RESOLVER PREFIX MATCH TEST
  it('EvaraVueResolver handles custom prefixes correctly', () => {
    const resolver = EvaraVueResolver({ prefix: 'Evara' })
    const matched = resolver.resolve('EvaraCard')
    const unmatched = resolver.resolve('Card')

    expect(matched).toEqual({
      name: 'Card',
      from: '@evara-ui/vue',
    })
    expect(unmatched).toBeNull()
  })

  // ---------- AUTO-IMPORT COMPOSABLE LIST TEST
  it('EvaraAutoImportResolver returns composables list', () => {
    const vueImports = EvaraAutoImportResolver({ framework: 'vue' })
    expect(vueImports['@evara-ui/vue']).toContain('useForm')
    expect(vueImports['@evara-ui/vue']).toContain('useTheme')

    const reactImports = EvaraAutoImportResolver({ framework: 'react' })
    expect(reactImports['@evara-ui/react']).toContain('useForm')
  })

  // ---------- REACT UNPLUGIN AST TRANSFORM TEST
  it('EvaraReactUnplugin transforms JSX code to auto-inject missing imports', () => {
    const rawPlugin = EvaraReactUnplugin.raw({}, { framework: 'vite' })
    const pluginObj = (Array.isArray(rawPlugin) ? rawPlugin[0] : rawPlugin) as { transform: (code: string, id: string) => { code: string } }
    const code = `
      export function App() {
        return <Button variant="primary">Click</Button>
      }
    `
    const transformResult = pluginObj.transform(code, 'App.tsx')
    expect(transformResult.code).toContain("import { Button } from '@evara-ui/react';")
  })
})
