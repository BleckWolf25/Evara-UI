/**
 * @file vite.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vite bundler configuration file.
 *
 * @description
 * Configures plugins, dev server options, and build settings for showcase application.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@bleckwolf25/react/dist/index.css': resolve(__dirname, '../../packages/react/dist/index.css'),
      '@bleckwolf25/core': resolve(__dirname, '../../packages/core/src'),
      '@bleckwolf25/react': resolve(__dirname, '../../packages/react/src'),
    },
  },
})
