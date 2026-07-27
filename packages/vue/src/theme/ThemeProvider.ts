/**
 * @file ThemeProvider.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue ThemeProvider component and useTheme composable.
 *
 * @description
 * Provides Vue context theme state management, CSS custom property application, light/dark mode toggling,
 * and exposes useTheme composable for injecting theme context in Vue 3 applications.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, ref, provide, inject, watch, onMounted, type PropType, type Ref } from 'vue'
import { generateCssVariables, lightThemeTokens, darkThemeTokens, type ThemeTokens } from '@bleckwolf25/core'

// ---------- INJECTION SYMBOL CONSTANT
const ThemeSymbol = Symbol('EvaraTheme')

// ---------- THEME CONTEXT VALUE INTERFACE
export interface ThemeContextValue {
  theme: Ref<string>
  tokens: Ref<Partial<ThemeTokens>>
  setTheme: (themeName: 'light' | 'dark' | (string & {})) => void
  toggleTheme: () => void
  setCustomTokens: (tokens: Partial<ThemeTokens>) => void
}

// ---------- USE THEME COMPOSABLE HOOK
export function useTheme() {
  const ctx = inject<ThemeContextValue | null>(ThemeSymbol, null)
  // Early return guard clause for usage outside ThemeProvider hierarchy
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return {
    theme: ctx.theme.value,
    tokens: ctx.tokens.value,
    setTheme: ctx.setTheme,
    toggleTheme: ctx.toggleTheme,
    setCustomTokens: ctx.setCustomTokens,
  }
}

// ---------- THEME PROVIDER VUE COMPONENT
export const ThemeProvider = defineComponent({
  name: 'ThemeProvider',
  props: {
    defaultTheme: {
      type: String as PropType<'light' | 'dark' | (string & {})>,
      default: 'light',
    },
    theme: {
      type: Object as PropType<Partial<ThemeTokens>>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    // ---------- RECTIVE STATE INITIALIZATION
    const currentTheme = ref(props.defaultTheme)
    const customTokens = ref<Partial<ThemeTokens>>(props.theme)

    // ---------- CSS CUSTOM PROPERTY APPLICATION METHOD
    const applyCssVariables = () => {
      // Guard clause for server-side rendering environments
      if (typeof document === 'undefined') return
      const baseTokens = currentTheme.value === 'dark' ? darkThemeTokens : lightThemeTokens
      const mergedTokens = { ...baseTokens, ...customTokens.value }
      const cssVars = generateCssVariables(mergedTokens)

      const root = document.documentElement
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })
    }

    // ---------- SET THEME METHOD
    const setTheme = (themeName: 'light' | 'dark' | (string & {})) => {
      currentTheme.value = themeName
      applyCssVariables()
    }

    // ---------- TOGGLE THEME METHOD
    const toggleTheme = () => {
      currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
      applyCssVariables()
    }

    // ---------- SET CUSTOM TOKENS METHOD
    const setCustomTokens = (tokens: Partial<ThemeTokens>) => {
      customTokens.value = tokens
      applyCssVariables()
    }

    // ---------- RECTIVE WATCHERS AND LIFECYCLE HOOKS
    watch([currentTheme, customTokens], () => {
      applyCssVariables()
    })

    onMounted(() => {
      applyCssVariables()
    })

    // ---------- CONTEXT PROVIDER INJECTION
    provide(ThemeSymbol, {
      theme: currentTheme,
      tokens: customTokens,
      setTheme,
      toggleTheme,
      setCustomTokens,
    })

    return () => (slots.default ? slots.default() : null)
  },
})
