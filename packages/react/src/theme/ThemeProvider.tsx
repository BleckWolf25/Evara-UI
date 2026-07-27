/**
 * @file ThemeProvider.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React ThemeProvider context component and useTheme hook.
 *
 * @description
 * Manages global theme mode state (light, dark, system), dynamically applies root CSS custom properties,
 * toggles root dark class names, and exposes context access hook useTheme for React applications.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { createContext, useContext, useEffect, useState, useMemo, type ReactNode } from 'react'
import {
  type ThemeMode,
  type ThemeTokens,
  lightThemeTokens,
  darkThemeTokens,
  generateCssVariables,
} from '@bleckwolf25/core'

// ---------- INTERFACES AND TYPES

// ---------- THEME CONTEXT STATE INTERFACE
interface ThemeContextState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  tokens: ThemeTokens
}

// ---------- THEME PROVIDER PROPS INTERFACE
export interface ThemeProviderProps {
  mode?: ThemeMode
  customTokens?: Partial<ThemeTokens>
  children?: ReactNode
}

// ---------- CONSTANTS

// ---------- DEFAULT THEME CONTEXT INITIALIZER
const ThemeContext = createContext<ThemeContextState>({
  theme: 'light',
  setTheme: () => { /* noop */ },
  tokens: lightThemeTokens,
})

// ---------- COMPONENTS

// ---------- THEME PROVIDER COMPONENT
export function ThemeProvider({
  mode = 'light',
  customTokens,
  children,
}: ThemeProviderProps) {
  // ---------- STATE INITIALIZATION
  const [theme, setTheme] = useState<ThemeMode>(mode)

  // ---------- ACTIVE TOKENS COMPUTATION
  const activeTokens = useMemo<ThemeTokens>(() => ({
    ...(theme === 'dark' ? darkThemeTokens : lightThemeTokens),
    ...customTokens,
  }), [theme, customTokens])

  // ---------- SIDE EFFECT: CSS CUSTOM PROPERTY AND ROOT CLASS UPDATE
  useEffect(() => {
    const root = document.documentElement
    const vars = generateCssVariables(activeTokens)

    // Apply generated CSS custom property key-value pairs
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value)
    }

    // Toggle document element dark class indicator
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme, activeTokens])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, tokens: activeTokens }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ---------- HOOKS

// ---------- USE THEME CONTEXT HOOK
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)
  return context
}
