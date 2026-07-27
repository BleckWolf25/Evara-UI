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
import { createApp } from 'vue'
// @ts-expect-error -- Vue component import without type definition
import App from './App.vue'
import EvaraUI from '@evara-ui/vue'
import '@evara-ui/styles/dist/index.css'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)
app.use(EvaraUI)
app.mount('#app')
