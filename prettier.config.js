/**
 * @file prettier.config.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @contributors
 * @license MIT
 *
 * @description
 * Prettier configuration for monorepo project.
 * Define rules and integrates plugins for code consistency, readability
 * and compatibility with ESLint, TypeScript and.
 *
 * @since 2025-12-18
 * @updated 2025-12-18
 *
 * @see {@link https://prettier.io/docs/en/configuration.html | Prettier configuration }
 */
// ---------- CONFIGURATION
/**
 * @type {import("prettier").Config}
 */
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
  overrides: [
    {
      files: '*.vue',
      options: {
        singleAttributePerLine: true,
      },
    },
  ],
};
