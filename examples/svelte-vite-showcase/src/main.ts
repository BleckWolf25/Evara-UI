/**
 * @file main.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for main.ts
 *
 * @description
 * Handles module responsibilities for main.ts.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import '@bleckwolf25/styles/dist/index.css'
import App from './App.svelte'

const target = document.getElementById('app')
if (!target) throw new Error('Target element not found')

const app = new App({
  target,
})

export default app
