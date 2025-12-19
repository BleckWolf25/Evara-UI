# Code Style Guide

This document defines the code quality standards and style conventions for the Evara UI monorepo. All code must adhere to these guidelines to maintain consistency, readability, and long-term maintainability.

## Philosophy

We use a **clear separation of concerns**:

- **ESLint**: Enforces code quality, correctness, and type safety
- **Prettier**: Handles all formatting and stylistic concerns exclusively

This means ESLint checks for bugs and mistakes, while Prettier handles how code looks. Never disable Prettier rules—adjust formatting preferences instead.

## TypeScript Configuration

### Strict Mode Enforcement

All TypeScript files are compiled in strict mode with type checking enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### Type Import Preferences

All type imports must use the `type` keyword with inline style:

```typescript
// ✅ CORRECT
import type { ButtonProps, ButtonState } from './button.types';

// ❌ WRONG
import { ButtonProps, ButtonState } from './button.types';
```

**Rationale**: This prevents accidentally bundling types as runtime code and clearly distinguishes type-level from value-level imports.

### Type Definitions

Always use `interface` for object type definitions, not `type`:

```typescript
// ✅ CORRECT
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

// ❌ ACCEPTABLE (but prefer interface)
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};
```

**Rationale**: Interfaces are the TypeScript convention for object shapes and offer better structural typing.

### Array Type Syntax

Use simple array syntax `Type[]` for simple types; `Array<T>` only for complex generic types:

```typescript
// ✅ CORRECT
const ids: string[] = [];
const callbacks: Array<(value: T) => void> = [];

// ❌ AVOID
const ids: Array<string> = [];
```

## ESLint Rules

### Type Safety Rules

| Rule | Severity | Reason |
|------|----------|--------|
| `@typescript-eslint/no-explicit-any` | **Error** | `any` defeats type safety; use `unknown` with proper narrowing |
| `@typescript-eslint/no-unused-vars` | **Error** | Unused variables indicate dead code or bugs; prefix with `_` to intentionally ignore |
| `@typescript-eslint/require-await` | **Error** | `async` functions must actually use `await` |
| `@typescript-eslint/no-floating-promises` | **Error** | Unhandled promises are silent bugs; always `.catch()` or `await` |
| `@typescript-eslint/no-misused-promises` | **Error** | Prevents passing promises to non-async contexts |

#### Examples

```typescript
// ❌ NO: Using any
function process(data: any) { }

// ✅ YES: Unknown with type guard
function process(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // now safely narrowed
  }
}

// ❌ NO: Unused parameter
function handleClick(event) { }

// ✅ YES: Prefix unused with underscore
function handleClick(_event: MouseEvent) { }

// ❌ NO: Promise not awaited
const data = fetchUser(); // Promise forgotten

// ✅ YES: Actually await
const data = await fetchUser();

// ❌ NO: Unhandled promise
fetchUser(); // Silent fail

// ✅ YES: Handle the promise
fetchUser().catch((err) => console.error(err));
```

### Nullish Coalescing & Optional Chaining

Prefer nullish coalescing (`??`) over logical OR (`||`) and optional chaining (`?.`) to avoid bugs with falsy values:

```typescript
// ❌ AVOID: || treats 0 and "" as falsy
const count = userInput || 10; // "0" becomes 10

// ✅ CORRECT: ?? only treats null/undefined as falsy
const count = userInput ?? 10; // 0 stays 0

// ❌ AVOID: Long conditional chains
const value = obj && obj.nested && obj.nested.deep;

// ✅ CORRECT: Optional chaining
const value = obj?.nested?.deep;
```

### Loop & String Methods

Always prefer modern alternatives:

```typescript
// ❌ NO: Traditional for loops
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

// ✅ YES: for...of loop
for (const item of items) {
  console.log(item);
}

// ❌ NO: indexOf checks
if (array.indexOf(value) !== -1) { }

// ✅ YES: includes method
if (array.includes(value)) { }

// ❌ NO: substring/substr
const part = str.substring(0, 5);

// ✅ YES: slice or modern methods
const part = str.slice(0, 5);
const starts = str.startsWith('prefix');
const ends = str.endsWith('suffix');
```

### Console Output

Console usage is restricted to necessary logging:

```typescript
// ⚠️ WARNING: Enabled only
console.warn('Deprecated API used');
console.error('Critical error occurred');

// ❌ ERROR: Not allowed in production code
console.log('debug info');
console.info('informational');
```

**Use case**: `console.warn` and `console.error` are allowed for deprecation notices and error reporting.

### Debugger & Console Statements

```typescript
// ❌ ERROR: Never allowed
debugger; // Breaks execution in debug mode
```

## Prettier Configuration

### Formatting Rules

| Setting | Value | Purpose |
|---------|-------|---------|
| Print width | 100 characters | Balance readability and IDE visibility |
| Tab width | 2 spaces | Standard for JavaScript ecosystem |
| Semicolons | Always | Avoid ASI (Automatic Semicolon Insertion) bugs |
| Quotes | Single | Less escaping for apostrophes in English |
| Trailing commas | All | Cleaner diffs, easier to add/remove items |
| Arrow parens | Always | Consistency and clarity with single-param arrows |
| Bracket spacing | True | `{ obj }` not `{obj}` |
| Line endings | LF | Unix standard, consistent across OSes |

### Vue-Specific Formatting

Vue single-file components enforce one attribute per line for readability:

```vue
<!-- ✅ CORRECT -->
<Button
  variant="primary"
  size="lg"
  disabled
  @click="handleClick"
>
  Click me
</Button>

<!-- ❌ AVOID -->
<Button variant="primary" size="lg" disabled @click="handleClick">
  Click me
</Button>
```

## React-Specific Rules

### Component Exports

Only export components directly. Hooks must be named with `use` prefix:

```typescript
// ✅ CORRECT
export function Button() { }
export function useButtonState() { }

// ❌ AVOID: Exporting non-hook functions as hooks
export function buttonState() { }
```

### React Hooks Rules

ESLint enforces strict dependency arrays:

```typescript
// ✅ CORRECT: All dependencies listed
useEffect(() => {
  console.log(value);
}, [value]);

// ❌ ERROR: Missing dependency
useEffect(() => {
  console.log(value); // value is a dependency but not listed
}, []);

// ✅ CORRECT: React refresh only exports components
export function App() { }

const utils = () => { }; // Constants are ok
```

## Vue-Specific Rules

### Multi-word Component Names

Vue requires component names to be multi-word to avoid conflicts with HTML elements:

```vue
<!-- ✅ CORRECT -->
<UiButton />
<FormInput />

<!-- ❌ ERROR (disabled but good practice) -->
<Button />
<Input />
```

### Self-closing Tags

All tags should self-close when empty:

```vue
<!-- ✅ CORRECT -->
<img src="..." alt="..." />
<component :is="MyComponent" />
<slot />

<!-- ❌ AVOID -->
<img src="..." alt="..."></img>
<component :is="MyComponent"></component>
```

## Naming Conventions

### Files & Directories

- **Components**: PascalCase (`Button.vue`, `Input.tsx`)
- **Utilities**: camelCase (`useForm.ts`, `formatDate.ts`)
- **Types**: Suffix with `.types.ts` for shared type files
- **Tests**: Same name as source with `.spec.ts` suffix (`Button.spec.ts`)
- **Directories**: lowercase (`components/`, `utils/`, `hooks/`)

### Variables & Functions

```typescript
// ✅ CORRECT
const isLoading = true; // Boolean prefix with is/has/can
const userCount = 5; // Plural for arrays/counts
function handleClick() { } // Event handlers start with "handle"
function useForm() { } // Custom hooks start with "use"
const MAX_RETRIES = 3; // Constants in UPPER_SNAKE_CASE

// ❌ AVOID
const loading = true; // Not clear it's a boolean
const user = []; // Singular for arrays is confusing
const onClickHandler = () => { }; // Redundant naming
function form() { } // Doesn't indicate it's a hook
const maxRetries = 3; // Should be CONSTANT case
```

### CSS Classes & CSS Variables

```css
/* ✅ CORRECT: BEM-like naming, namespace */
.ui-button { }
.ui-button--primary { }
.ui-button__icon { }

/* ✅ CORRECT: CSS variables with prefix and scope */
:root {
  --ui-color-primary: #3b82f6;
  --ui-button-radius: 0.375rem;
  --ui-spacing-base: 1rem;
}

/* ❌ AVOID: Generic or unprefixed classes */
.button { }
.primary { }
--color-primary { } /* No namespace */
```

## Import Organization

Organize imports in the following order with blank lines between sections:

```typescript
// 1. Node/browser built-ins
import { readFile } from 'fs';
import { Component } from 'react';

// 2. External dependencies
import { defineComponent } from 'vue';
import axios from 'axios';

// 3. Internal absolute imports
import { Button } from '@/components';
import type { ButtonProps } from '@/types';

// 4. Internal relative imports
import { useForm } from '../hooks';
import type { FormState } from './form.types';

// 5. Side effects (last)
import './styles.css';
```

## Comments & Documentation

### JSDoc for Public APIs

Document all exported functions and types:

```typescript
/**
 * Renders a flexible button component with multiple variants and states.
 *
 * @param props - Button properties
 * @param props.variant - Visual style of the button (primary, secondary, etc.)
 * @param props.size - Button size (sm, md, lg)
 * @param props.disabled - Whether the button is disabled
 * @param props.loading - Whether the button shows a loading state
 * @returns Rendered button component
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Submit
 * </Button>
 * ```
 */
export function Button(props: ButtonProps) { }
```

### Inline Comments

Use sparingly—the code should be self-explanatory:

```typescript
// ✅ GOOD: Explains the "why"
// Generate deterministic IDs to avoid hydration mismatches in SSR
const id = useId();

// ❌ BAD: Repeats the code
// Set loading to true
setLoading(true);
```

## Complex Logic Documentation

Mark configuration files with a preamble:

```typescript
/**
 * @file eslint.config.ts
 * @description
 * ESLint Flat Configuration for the project.
 * This file defines **code quality and correctness rules only**.
 * All formatting and stylistic concerns must be handled exclusively by Prettier.
 * @see {@link https://eslint.org/docs/latest/use/configure/ | ESLint Flat Config}
 */
```

## Enforcement

All code is checked by:

```bash
# Run linting
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Type checking
pnpm typecheck

# Formatting (Prettier)
pnpm format
```

Code that violates these rules **will not pass CI/CD** and PRs will be blocked until resolved.

## Exceptions

Exceptions to these rules are rare and must be documented:

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function legacyAPI(data: any) {
  // TODO: Refactor to proper typing
}
```

Always include context and plan to fix.
