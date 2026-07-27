/**
 * @file vite.config.js
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
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@bleckwolf25/core': resolve(__dirname, '../../packages/core/src'),
    },
  },
})
