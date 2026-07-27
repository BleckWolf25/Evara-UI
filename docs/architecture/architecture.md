# Architecture Guide

This document describes the architectural decisions, structure, and dependency relationships in the Evara UI monorepo.

## Monorepo Philosophy

Evara UI is structured as a **modular monorepo** to achieve three goals:

1. **Code reuse**: Framework-agnostic logic lives once in `@evara/core`
2. **Multi-framework support**: Thin framework-specific wrappers for React, Vue, and Nuxt
3. **Independent packages**: Each package is independently versioned and publishable

## Package Architecture

```zsh
evara-ui/
├── packages/
│   ├── core/              # Framework-agnostic logic & types
│   │   ├── src/
│   │   │   ├── components/    # Headless component logic
│   │   │   ├── hooks/         # Framework-agnostic utilities
│   │   │   ├── types/         # Shared TypeScript types
│   │   │   └── utils/         # Pure functions (date, formatting, etc.)
│   │   ├── dist/              # Built outputs (ESM + CJS)
│   │   └── package.json
│   │
│   ├── react/             # React-specific components
│   │   ├── src/
│   │   │   ├── components/    # React components wrapping core logic
│   │   │   ├── hooks/         # React-specific hooks
│   │   │   ├── index.ts       # Public API exports
│   │   │   └── styles/        # Imported CSS from @evara/styles
│   │   └── package.json
│   │
│   ├── vue/               # Vue 3 components
│   │   ├── src/
│   │   │   ├── components/    # Vue components wrapping core logic
│   │   │   ├── composables/   # Vue composables (equivalent to hooks)
│   │   │   ├── index.ts       # Public API exports
│   │   │   └── styles/        # Imported CSS from @evara/styles
│   │   └── package.json
│   │
│   ├── nuxt/              # Nuxt.js integration & auto-imports
│   │   ├── src/
│   │   │   ├── components/    # Nuxt auto-imported components
│   │   │   └── module.ts      # Nuxt module configuration
│   │   └── package.json
│   │
│   ├── styles/            # Design tokens & component CSS
│   │   ├── src/
│   │   │   ├── base/          # Reset & global styles
│   │   │   ├── components/    # Component-specific CSS
│   │   │   ├── themes/        # Theme variants (modern, minimal, enterprise)
│   │   │   ├── tokens/        # CSS variables & design tokens
│   │   │   └── index.css      # Main entry point
│   │   └── package.json
│   │
│   └── docs/              # Documentation site (VitePress)
│       ├── src/
│       │   ├── components/    # Doc demo components
│       │   ├── pages/         # MDX documentation pages
│       │   └── .vitepress/    # VitePress config
│       └── package.json
│
├── examples/              # Demo applications
│   ├── react-demo/        # Next.js + React
│   ├── vue-demo/          # Vue 3 + Vite
│   ├── next-demo/         # Next.js specific features
│   └── nuxt-demo/         # Nuxt 3 full-stack demo
│
└── scripts/               # Build & utility scripts
    ├── generate-tokens.js
    ├── build-css.js
    └── validate-types.js
```

## Package Dependencies

### Dependency Graph

```zsh
┌─────────────────────────────────────────────────┐
│               Examples (Apps)                    │
│  (react-demo, vue-demo, next-demo, nuxt-demo)  │
└──────────────┬──────────────────────────────────┘
               │
     ┌─────────┼─────────┬──────────┐
     ▼         ▼         ▼          ▼
  ┌─────┐  ┌─────┐  ┌──────┐  ┌────────┐
  │React│  │Vue  │  │Nuxt  │  │  Docs  │
  └──┬──┘  └──┬──┘  └──┬───┘  └────┬───┘
     │        │       │           │
     └────────┼───────┼───────────┘
              │       │
          ┌───┴───┬───┴────┐
          ▼       ▼        ▼
       ┌──────┬────────┬─────────┐
       │Core  │Styles  │  Docs   │
       └──────┴────────┴─────────┘
```

### Package.json Dependencies

**@evara/core** (no dependencies)

```json
{
  "dependencies": {}
  // Pure TypeScript, no external deps
}
```

**@evara/styles** (no dependencies)

```json
{
  "dependencies": {}
  // Pure CSS, no build requirements
}
```

**@evara/react**

```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@evara/core": "workspace:*",
    "@evara/styles": "workspace:*"
  }
}
```

**@evara/vue**

```json
{
  "peerDependencies": {
    "vue": ">=3.3.0"
  },
  "dependencies": {
    "@evara/core": "workspace:*",
    "@evara/styles": "workspace:*"
  }
}
```

**@evara/nuxt**

```json
{
  "peerDependencies": {
    "nuxt": ">=3.0.0",
    "vue": ">=3.3.0"
  },
  "dependencies": {
    "@evara/vue": "workspace:*",
    "@evara/styles": "workspace:*"
  }
}
```

**examples/\*** (apps)

```json
{
  "dependencies": {
    "@evara/react": "workspace:*",
    "@evara/vue": "workspace:*",
    "@evara/nuxt": "workspace:*",
    "@evara/styles": "workspace:*"
  }
}
```

## Design Philosophy: Core + Wrappers

### Why This Architecture?

Building a multi-framework component library naively means duplicating logic:

```graph
❌ WRONG: Duplicated logic
Button.vue (Vue)      → State, validation, keyboard handling
Button.tsx (React)    → State, validation, keyboard handling (again!)
Button.tsx (Next.js)  → State, validation, keyboard handling (again!)
```

Solution: **Extract headless logic to core, create thin wrappers**:

```graph
✅ RIGHT: Logic once, wrapped many times
ButtonController (core) → State, validation, keyboard handling
  ├── Button.vue       → Wraps controller, uses Vue reactivity
  ├── Button.tsx       → Wraps controller, uses React hooks
  └── useButton.ts     → Composable for custom implementations
```

### Core Package Structure

The `@evara/core` package exports:

1. **Controllers** - State machines and logic

   ```typescript
   // packages/core/src/components/Button/Button.controller.ts
   export class ButtonController {
     constructor(props: ButtonProps) {}
     getAriaAttributes() {}
     getClassNames() {}
     handleClick(e: MouseEvent) {}
   }
   ```

2. **Types** - Shared interfaces

   ```typescript
   // packages/core/src/components/Button/Button.types.ts
   export interface ButtonProps {
     variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     loading?: boolean;
   }
   ```

3. **Utilities** - Pure functions

   ```typescript
   // packages/core/src/utils/classNames.ts
   export function classNames(...classes: (string | undefined)[]) {
     return classes.filter(Boolean).join(' ');
   }
   ```

### Framework Wrapper Pattern

Each framework wraps core logic minimally:

**React**:

```typescript
// packages/react/src/components/Button/Button.tsx
import { forwardRef } from 'react';
import { ButtonController } from '@evara/core';
import type { ButtonProps } from '@evara/core';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const controller = new ButtonController(props);

    return (
      <button
        ref={ref}
        className={controller.getClassNames()}
        {...controller.getAriaAttributes()}
        onClick={(e) => !props.disabled && props.onClick?.(e)}
      >
        {props.children}
      </button>
    );
  }
);
```

**Vue**:

```vue
<!-- packages/vue/src/components/Button/Button.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { ButtonController } from '@evara/core';
import type { ButtonProps } from '@evara/core';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
});

const controller = new ButtonController(props);
const ariaAttrs = computed(() => controller.getAriaAttributes());
const classes = computed(() => controller.getClassNames());
</script>

<template>
  <button :class="classes" v-bind="ariaAttrs" @click="$emit('click', $event)">
    <slot />
  </button>
</template>
```

## Turborepo Task Pipeline

### Task Execution Order

Turbo uses `dependsOn` to enforce build order:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {},
    "typecheck": {}
  }
}
```

**Reading the pipeline:**

- `build`: "Build dependencies first" (`^build` = build packages I depend on)
  - `@evara/core` builds first (no dependencies)
  - Then `@evara/react`, `@evara/vue`, `@evara/nuxt` (depend on core)
  - Then examples (depend on everything)

- `test`: "Build before testing" (ensures dist/ exists)
  - Unit tests run against compiled code, not source

- `lint`: No dependencies (runs in parallel)

- `typecheck`: No dependencies (runs in parallel)

### Running Tasks

```bash
# Build everything in dependency order
pnpm build

# Build only changed packages + their dependents
pnpm build --filter="[origin/main]"

# Build one package and its dependencies
pnpm --filter=@evara/react build

# Skip cache (force rebuild)
pnpm build --no-cache

# See task execution plan
pnpm build --dry-run
```

## Import Aliases

We use TypeScript path aliases for clean imports:

**tsconfig.base.json**:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@evara/core": ["packages/core/src"],
      "@evara/react": ["packages/react/src"],
      "@evara/vue": ["packages/vue/src"],
      "@evara/styles": ["packages/styles/src"],
      "@/*": ["src/*"]
    }
  }
}
```

This means you can import like:

```typescript
// ✅ Instead of relative imports
import { Button } from '@evara/react';
import type { ButtonProps } from '@evara/core';

// Instead of
import { Button } from '../../../../components/Button';
```

## Build Output Strategy

Each package produces optimized outputs:

### Core Package (`@evara/core`)

```zsh
packages/core/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── types/
│   └── index.ts          # Export public API
└── dist/
    ├── index.js          # ESM (treeshakeable)
    ├── index.cjs         # CommonJS (Node.js)
    ├── index.d.ts        # TypeScript declarations
    └── [chunk files]     # Code split for tree-shaking
```

**Build config** (tsup):

```typescript
// packages/core/tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true, // Generate .d.ts
  splitting: true, // Code splitting
  treeshake: true, // Remove dead code
  clean: true,
});
```

### Styles Package (`@evara/styles`)

```zsh
packages/styles/
├── src/
│   ├── base.css
│   ├── components.css
│   ├── themes.css
│   └── index.css
└── dist/
    └── index.css         # Bundled CSS
```

Import in React/Vue packages:

```typescript
// packages/react/src/index.ts
export * from './components';
import '@evara/styles';
```

## SSR Considerations

All packages must support Server-Side Rendering for Nuxt/Next.js:

### Core Rules

1. **No window/document access during import**

   ```typescript
   // ❌ WRONG
   const width = window.innerWidth; // Crashes on server

   // ✅ CORRECT
   if (typeof window !== 'undefined') {
     const width = window.innerWidth;
   }
   ```

2. **Deterministic IDs**

   ```typescript
   // ❌ WRONG
   const id = `btn-${Math.random()}`; // Different on server/client

   // ✅ CORRECT
   const id = useId(); // Deterministic, same on server & client
   ```

3. **Async during setup is fine**

   ```typescript
   // ✅ OK in hooks/composables
   onMounted(async () => {
     const data = await fetch('/api/data');
   });
   ```

### React SSR

Components must use `useId()` for deterministic IDs:

```typescript
import { useId } from 'react';

export function Button(props: ButtonProps) {
  const id = useId();
  return <button id={id}>{props.children}</button>;
}
```

### Vue SSR

Vue components automatically SSR-safe. Use `onMounted` for browser-only code:

```vue
<script setup>
import { onMounted, ref } from 'vue';

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
  // Browser-only code
});
</script>

<template>
  <div v-if="mounted">Content</div>
</template>
```

## Publishing Strategy

### Version Management

We use [Changesets](https://github.com/changesets/changesets) for semantic versioning:

```bash
# Add a changeset when fixing bugs or adding features
pnpm changeset

# Generates an entry describing the change
# Version bumps are automated in CI/CD
```

### NPM Publishing

Each package publishes independently:

```bash
# Published as
@evara/core          # Core logic
@evara/react         # React components
@evara/vue           # Vue components
@evara/nuxt          # Nuxt integration
@evara/styles        # CSS & design tokens
```

**package.json exports**:

```json
{
  "name": "@evara/react",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": ["dist"]
}
```

Users import like:

```typescript
import { Button } from '@evara/react';
import '@evara/react/styles';
```

## Workspace Commands

### Common Development Tasks

```bash
# Build everything (respects dependency order)
pnpm build

# Start all dev servers
pnpm dev

# Run all tests
pnpm test

# Lint + typecheck + format
pnpm lint && pnpm typecheck

# Work on specific package
pnpm --filter=@evara/vue dev

# Run in specific package's directory
pnpm --filter=@evara/core test --watch
```

### Filtering Syntax

```bash
# Single package
--filter=@evara/vue

# Multiple packages
--filter="@evara/{vue,react}"

# By directory
--filter="packages/*"

# Packages and their dependents
--filter=@evara/core...

# Packages and their dependencies
--filter=...@evara/core

# Changed since main branch
--filter="[origin/main]"
```

## Documentation Site

The `packages/docs` uses VitePress to showcase components with live interactive demos:

```zsh
packages/docs/
├── src/
│   ├── pages/          # MDX documentation
│   │   ├── button.md
│   │   ├── input.md
│   │   └── ...
│   ├── components/     # Demo components
│   └── .vitepress/     # VitePress config
└── package.json
```

Each component page includes:

- **Usage examples** (copy-paste ready)
- **Live demos** (interactive)
- **Props documentation** (generated from TypeScript)
- **Accessibility notes** (WCAG compliance)
- **Design patterns** (best practices)

## Circular Dependency Prevention

We enforce this hierarchy (no backward dependencies):

```graph
Core
  ↓
React, Vue, Nuxt (not → Core)
  ↓
Examples, Docs (not → Core/React/Vue)
```

This is validated in CI/CD and enforced via ESLint rules.

## Performance Optimization

### Tree-shaking

All builds use `treeshake: true` and `splitting: true` so users only bundle used code:

```typescript
// User's code
import { Button } from '@evara/react';

// Only Button + dependencies are bundled
// Unused components (Input, Modal, etc.) are excluded
```

### CSS Splitting

Styles are critical path optimized:

```css
/* Base styles (reset, fonts) */
@import url('./base.css');

/* Component styles (only what's used) */
@import url('./components/button.css');
@import url('./components/input.css');
```

Users can import globally or per-component:

```typescript
// Global (all styles)
import '@evara/styles';

// Or per-component
import '@evara/styles/components/button.css';
```

## Maintenance & Evolution

### Adding a New Component

1. Create types in `@evara/core`
2. Create controller in `@evara/core`
3. Wrap in `@evara/react`
4. Wrap in `@evara/vue`
5. Auto-import in `@evara/nuxt`
6. Document in `@evara/docs`
7. Demo in examples

### Updating Core Logic

Changes to `@evara/core` automatically cascade:

```bash
# Update core
# Rebuild React/Vue automatically (turbo dependency)
# Examples pick up changes
pnpm build
```

### Framework-Specific Changes

React-only feature? Update only `@evara/react`, no need to touch Vue.

## Dependency Updates

Strategy for keeping dependencies current:

```bash
# Check for updates
pnpm update --latest

# Update major versions
pnpm update --interactive

# Lock to specific versions
pnpm add -w <package>@<version>
```

Always test after major updates:

```bash
pnpm clean && pnpm install
pnpm build && pnpm test
```
