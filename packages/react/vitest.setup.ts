/**
 * @file vitest.setup.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for vitest.setup.ts
 *
 * @description
 * Handles module responsibilities for vitest.setup.ts.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-console
console.log('--- VITEST REACT SETUP RUNNING ---')

afterEach(() => {
  // eslint-disable-next-line no-console
  console.log('--- CLEANING UP ---')
  cleanup()
})
