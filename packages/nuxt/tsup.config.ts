/**
 * @file tsup.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Tsup bundling configuration for package build output.
 *
 * @description
 * Configures entry points, dts generation, target formats (ESM/CJS), and clean build settings.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/module.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2020',
  external: ['@nuxt/kit', 'nuxt', 'vue', '@evara-ui/vue', '@evara-ui/core', '@evara-ui/styles'],
})
