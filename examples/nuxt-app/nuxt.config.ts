/**
 * @file nuxt.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Nuxt 3 application configuration options.
 *
 * @description
 * Defines Nuxt modules, SSR options, and framework settings.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-24',
  modules: ['@bleckwolf25/nuxt'],
  devtools: { enabled: false }
})
