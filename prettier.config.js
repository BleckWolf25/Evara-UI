/**
 * @file prettier.config.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Configures Prettier code formatting rules for the monorepo.
 *
 * @description
 * Defines monorepo formatting rules including print width, single quotes, semi-colons,
 * trailing commas, tab width, and framework overrides for Vue single file components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- CONFIGURATION
/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  arrowParens: 'always',
  bracketSpacing: true,

  // File overrides
  overrides: [
    {
      files: '*.vue',
      options: {
        singleAttributePerLine: true,
      },
    },
  ],
}
