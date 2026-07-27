/**
 * @file unplugin.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit test suite for @bleckwolf25/unplugin resolvers and transform plugins.
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
describe('@bleckwolf25/unplugin Resolvers & Plugins', () => {
  // ---------- VUE RESOLVER DEFAULT MATCH TEST
  it('EvaraVueResolver resolves Vue component names to @bleckwolf25/vue', () => {
    const resolver = EvaraVueResolver()
    const result = resolver.resolve('Button')

    expect(result).toEqual({
      name: 'Button',
      from: '@bleckwolf25/vue',
    })
  })

  // ---------- VUE RESOLVER PREFIX MATCH TEST
  it('EvaraVueResolver handles custom prefixes correctly', () => {
    const resolver = EvaraVueResolver({ prefix: 'Evara' })
    const matched = resolver.resolve('EvaraCard')
    const unmatched = resolver.resolve('Card')

    expect(matched).toEqual({
      name: 'Card',
      from: '@bleckwolf25/vue',
    })
    expect(unmatched).toBeNull()
  })

  // ---------- AUTO-IMPORT COMPOSABLE LIST TEST
  it('EvaraAutoImportResolver returns composables list', () => {
    const vueImports = EvaraAutoImportResolver({ framework: 'vue' })
    expect(vueImports['@bleckwolf25/vue']).toContain('useForm')
    expect(vueImports['@bleckwolf25/vue']).toContain('useTheme')

    const reactImports = EvaraAutoImportResolver({ framework: 'react' })
    expect(reactImports['@bleckwolf25/react']).toContain('useForm')
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
    expect(transformResult.code).toContain("import { Button } from '@bleckwolf25/react';")
  })
})
