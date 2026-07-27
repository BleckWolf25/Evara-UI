/**
 * @file theme.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Svelte reactive theme store and useTheme factory.
 *
 * @description
 * Implements Svelte writable theme stores managing light/dark mode transitions, root CSS variable updates,
 * document element dark class toggling, and exports createThemeStore / useTheme functions.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { writable } from 'svelte/store'
import { generateCssVariables, type ThemeTokens } from '@evara-ui/core'

// ---------- INTERFACES AND TYPES

// ---------- THEME STORE OPTIONS INTERFACE
export interface ThemeStoreOptions {
  defaultTheme?: 'light' | 'dark'
  theme?: Partial<ThemeTokens>
}

// ---------- FUNCTIONS

// ---------- CREATE THEME STORE FACTORY
export function createThemeStore(options: ThemeStoreOptions = {}) {
  // ---------- SVELTE WRITABLE STORE INITIALIZATION
  const currentTheme = writable<'light' | 'dark'>(options.defaultTheme ?? 'light')

  // ---------- ROOT THEME DOM MUTATION METHOD
  const applyTheme = (mode: 'light' | 'dark', customTokens?: Partial<ThemeTokens>) => {
    // Guard clause for server-side rendering environments
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', mode)
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    if (customTokens) {
      const vars = generateCssVariables(customTokens)
      Object.entries(vars).forEach(([key, val]) => {
        root.style.setProperty(key, val)
      })
    }
  }

  return {
    subscribe: currentTheme.subscribe,
    // ---------- SET THEME STORE METHOD
    setTheme: (mode: 'light' | 'dark') => {
      currentTheme.set(mode)
      applyTheme(mode, options.theme)
    },
    // ---------- TOGGLE THEME STORE METHOD
    toggleTheme: () => {
      currentTheme.update((prev) => {
        const next = prev === 'light' ? 'dark' : 'light'
        applyTheme(next, options.theme)
        return next
      })
    },
  }
}

// ---------- USE THEME ALIAS EXPORT
export const useTheme = createThemeStore
