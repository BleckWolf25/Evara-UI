/**
 * @file Theme.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Core theme tokens and CSS custom property generator engine.
 *
 * @description
 * Defines theme token interface schemas, default light/dark mode color palettes,
 * theme mode union types, and dynamic CSS variable dictionary generator functions.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- TYPE DECLARATIONS

// ---------- THEME TOKENS INTERFACE
export interface ThemeTokens {
  primary: string
  primaryHover: string
  bgPrimary: string
  bgSecondary: string
  bgCard: string
  textPrimary: string
  textSecondary: string
  borderPrimary: string
  radius: string
}

// ---------- THEME MODE UNION TYPE
export type ThemeMode = 'light' | 'dark' | 'system'

// ---------- CONSTANTS

// ---------- DEFAULT LIGHT THEME TOKENS
export const lightThemeTokens: ThemeTokens = {
  primary: '#10b981',
  primaryHover: '#059669',
  bgPrimary: '#ffffff',
  bgSecondary: '#f9fafb',
  bgCard: '#ffffff',
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  borderPrimary: '#e5e7eb',
  radius: '0.375rem',
}

// ---------- DEFAULT DARK THEME TOKENS
export const darkThemeTokens: ThemeTokens = {
  primary: '#10b981',
  primaryHover: '#34d399',
  bgPrimary: '#111827',
  bgSecondary: '#1f2937',
  bgCard: '#1f2937',
  textPrimary: '#f9fafb',
  textSecondary: '#9ca3af',
  borderPrimary: '#374151',
  radius: '0.375rem',
}

// ---------- FUNCTIONS

// ---------- CSS VARIABLE DICTIONARY GENERATOR
export function generateCssVariables(tokens: Partial<ThemeTokens>): Record<string, string> {
  const vars: Record<string, string> = {}

  // ---------- CSS VARIABLE MAPPING
  if (tokens.primary) vars['--ui-color-primary'] = tokens.primary
  if (tokens.primaryHover) vars['--ui-color-primary-hover'] = tokens.primaryHover
  if (tokens.bgPrimary) vars['--ui-color-bg-primary'] = tokens.bgPrimary
  if (tokens.bgSecondary) vars['--ui-color-bg-secondary'] = tokens.bgSecondary
  if (tokens.bgCard) vars['--ui-color-bg-card'] = tokens.bgCard
  if (tokens.textPrimary) vars['--ui-color-text-primary'] = tokens.textPrimary
  if (tokens.textSecondary) vars['--ui-color-text-secondary'] = tokens.textSecondary
  if (tokens.borderPrimary) vars['--ui-color-border-primary'] = tokens.borderPrimary
  if (tokens.radius) vars['--ui-radius'] = tokens.radius

  return vars
}
