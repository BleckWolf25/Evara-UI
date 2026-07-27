/**
 * @file eslint.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary ESLint flat configuration for monorepo code quality and correctness rules.
 *
 * @description
 * Defines monorepo ESLint rules across JavaScript, TypeScript, Vue 3, and React,
 * configuring parser options, type-checking rules, global browser/node environments,
 * and framework plugins for code correctness while delegating formatting to Prettier.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import type { Config } from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import parserVue from 'vue-eslint-parser'

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ---------- CONFIGURATION
export default [
  // ---------- GLOBAL IGNORES
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.output/**',
      '**/.nuxt/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/.nyc_output/**',
      '**/public/**',
      '**/generated/**',
      '**/release/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
    ],
  },

  // ---------- JAVASCRIPT CONFIGURATION
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

  // ---------- TYPESCRIPT CONFIGURATION
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
        tsconfigRootDir: __dirname,
      },
    },
  },

  // ---------- VUE CONFIGURATION
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx', '**/*.js'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
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

  // ---------- REACT CONFIGURATION
  {
    files: ['packages/react/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}', 'examples/react-*/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...pluginReact.configs.flat['recommended'],
    ...pluginReact.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['packages/react/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}', 'examples/react-*/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // ---------- GENERAL RULES
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
    },
  },
  // ---------- TYPESCRIPT SPECIFIC RULES
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNullish: false,
        },
      ],
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
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
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

  // ---------- DISABLE TYPE-CHECKED RULES FOR CONFIG FILES
  {
    files: [
      '**/*.config.ts',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.cjs',
      '**/tsup.config.ts',
      '**/vitest.config.ts',
      '**/vite.config.ts',
      '**/vitest.setup.ts',
      'eslint.config.ts',
      'packages/docs/.vitepress/config.ts',
    ],
    ...tseslint.configs.disableTypeChecked,
  },
] as Config[]
