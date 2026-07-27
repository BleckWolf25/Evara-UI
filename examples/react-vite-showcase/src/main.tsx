/**
 * @file main.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for main.tsx
 *
 * @description
 * Handles module responsibilities for main.tsx.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@bleckwolf25/react/dist/index.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
