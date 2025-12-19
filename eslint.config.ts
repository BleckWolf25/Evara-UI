/**
 * @file eslint.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @contributors
 * @license MIT
 *
 * @description
 * ESLint Flat Configuration for the project.
 * This file defines **code quality and correctness rules only**.
 * All formatting and stylistic concerns must be handled exclusively by Prettier.
 *
 * @since 2025-12-18
 * @updated 2025-12-18
 *
 * - {@link https://prettier.io/docs/en/configuration.html | Prettier Documentation}
 * - {@link https://eslint.org/docs/latest/use/configure/ | ESLint Flat Config Documentation}
 * - {@link https://www.npmjs.com/package/@eslint/js | @eslint/js}
 * - {@link https://typescript-eslint.io/ | typescript-eslint}
 * - {@link https://www.npmjs.com/package/globals | globals}
 * - {@link https://eslint.vuejs.org/ | eslint-plugin-vue}
 * - {@link https://www.npmjs.com/package/eslint-plugin-react | eslint-plugin-react}
 * - {@link https://www.npmjs.com/package/eslint-plugin-react-hooks | eslint-plugin-react-hooks}
 * - {@link https://www.npmjs.com/package/eslint-plugin-react-refresh | eslint-plugin-react-refresh}
 */
// ---------- IMPORTS
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import type { Config } from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import parserVue from 'vue-eslint-parser';

// ---------- CONFIGURATION
export default [
  // Global ignore patterns
  {
    ignores: ['dist', 'node_modules', '.output', '.nuxt', 'coverage'],
  },

  // ---------- JAVASCRIPT
  // Base JavaScript configuration
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },

  // ---------- TYPESCRIPT
  // TypeScript configuration
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  })),
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs', '*.cjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // ---------- VUE
  // Vue configuration
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },

  // ---------- REACT
  // React configuration
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // ---------- IGNORED PATHS
  // Additional ignored paths
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/.nyc_output/**',
      '**/public/**',
      '**/generated/**',
      '**/release/**',
    ],
  },

  // ---------- GENERAL RULES
  // General project-wide rules
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
    },
  },
  // TypeScript-specific rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    },
  },
] as Config[];
