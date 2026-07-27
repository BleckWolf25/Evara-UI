/**
 * @file main.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for main.js
 *
 * @description
 * Handles module responsibilities for main.js.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import './style.css'
import './components.js'
import { registerEvaraCustomElements } from '@evara-ui/core'

// Register all native Web Components (<evara-button>, <evara-card>, <evara-badge>, etc.)
registerEvaraCustomElements()

// Simple logs to verify component updates
const slider = document.querySelector('evara-slider')
const otpInput = document.querySelector('evara-otp-input')

if (slider) {
  slider.addEventListener('change', (e) => {
    // eslint-disable-next-line no-console
    console.log('evara-slider value changed:', e.detail.value)
  })
}

if (otpInput) {
  otpInput.addEventListener('change', (e) => {
    // eslint-disable-next-line no-console
    console.log('evara-otp-input value changed:', e.detail.value)
    if (e.detail.value.length === 6) {
      // eslint-disable-next-line no-console
      console.log('OTP Full Code Entered:', e.detail.value)
    }
  })
}
