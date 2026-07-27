# ESLint Rules & Code Quality Standards

This document defines the **code quality and correctness rules** enforced by ESLint. ESLint catches bugs, prevents mistakes, and ensures type safety, it does NOT handle formatting (that's Prettier's job).

## Philosophy

**ESLint's Role**: Enforce correctness, catch bugs, prevent anti-patterns.

**Design Principle**: Strict by default. Rules are errors, not warnings. Failed linting = failed CI/CD.

**Why strict?**:

- Catches real bugs before they reach production
- Enforces consistent patterns across the team
- TypeScript strict mode catches type errors early
- Prevents technical debt from accumulating

## Configuration

The official configuration lives in `eslint.config.ts` (ESLint Flat Config format):

```typescript
export default [
  // JavaScript base
  js.configs.recommended,

  // TypeScript strict type checking
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Vue support
  ...pluginVue.configs['flat/recommended'],

  // React support
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs.recommended,

  // Custom project rules
] as Config[];
```

## Core TypeScript Rules

### Type Safety

#### `@typescript-eslint/no-explicit-any`

**Error**: Never use `any` type.

```typescript
// ❌ ERROR
function process(data: any) {
  return data.name; // Unknown what properties exist
}

// ✅ CORRECT (Option 1: Known type)
interface User {
  name: string;
}
function process(data: User) {
  return data.name; // TypeScript knows User.name exists
}

// ✅ CORRECT (Option 2: Unknown type with narrowing)
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'name' in data) {
    return (data as Record<string, unknown>).name;
  }
  throw new Error('Invalid data');
}
```

**Why**: `any` defeats the entire point of TypeScript. It's a type safety escape hatch that should never be used.

**Exception**: Existing codebases or third-party untyped libraries (but try to avoid).

#### `@typescript-eslint/no-unused-vars`

**Error**: All declared variables must be used.

```typescript
// ❌ ERROR
function processUser(user, address) {
  // address not used
  return user.name;
}

// ✅ CORRECT (Option 1: Remove unused param)
function processUser(user: User) {
  return user.name;
}

// ✅ CORRECT (Option 2: Prefix with underscore if intentionally unused)
function processUser(user: User, _address: Address) {
  // _address intentionally ignored
  return user.name;
}

// ✅ CORRECT (destructuring with rest)
function processUser({ name, ...rest }: User) {
  // rest contains other properties but isn't used
  return name;
}
```

**Exception Rule**: Variables starting with `_` are ignored.

Use when you intentionally want to ignore parameters (for consistency, interface requirements, etc.).

```typescript
// Array filter callback has three params, but we only need the value
const names = users
  .map((_user, index, _array) => `${index}: item`)
  .filter((_item, index) => index % 2 === 0);
```

#### `@typescript-eslint/require-await`

**Error**: `async` functions must actually use `await` or return a promise.

```typescript
// ❌ ERROR
async function getUserName(id: string) {
  return `User ${id}`; // Not async, don't mark as async
}

// ✅ CORRECT (Option 1: Remove async if not needed)
function getUserName(id: string) {
  return `User ${id}`;
}

// ✅ CORRECT (Option 2: Actually await something)
async function getUserName(id: string) {
  const user = await fetchUser(id);
  return user.name;
}

// ✅ CORRECT (Option 3: Return a promise)
async function getUserName(id: string) {
  return Promise.resolve(`User ${id}`);
}
```

**Why**: Prevents confusing code. If a function is marked `async`, readers expect it to do async work.

#### `@typescript-eslint/no-floating-promises`

**Error**: Promises must be awaited, `.catch()`ed, or assigned.

```typescript
// ❌ ERROR (unhandled promise rejection)
function loadData() {
  fetchData(); // Promise created but not handled
  return 'Loading...';
}

// ✅ CORRECT (Option 1: await)
async function loadData() {
  await fetchData();
  return 'Data loaded';
}

// ✅ CORRECT (Option 2: .catch())
function loadData() {
  fetchData().catch((err) => console.error(err));
  return 'Loading...';
}

// ✅ CORRECT (Option 3: Fire-and-forget with void)
function loadData() {
  void fetchData(); // Intentional fire-and-forget
  return 'Loading...';
}

// ✅ CORRECT (Option 4: Store result)
async function loadData() {
  const dataPromise = fetchData();
  // ... do other work
  const data = await dataPromise;
  return data;
}
```

**Why**: Silent promise rejections are the hardest bugs to debug. Always handle them explicitly.

#### `@typescript-eslint/no-misused-promises`

**Error**: Don't pass promises where non-promise values are expected.

```typescript
// ❌ ERROR (if in setter)
if (fetchData()) {
  // Boolean expected, but Promise passed
}

// ✅ CORRECT
if (await fetchData()) {
  // Now properly awaited
}

// ❌ ERROR (setTimeout with async)
setTimeout(async () => {
  await doWork();
}, 1000); // No way to catch errors from doWork()

// ✅ CORRECT
setTimeout(async () => {
  try {
    await doWork();
  } catch (err) {
    console.error(err);
  }
}, 1000);

// Or better: use a wrapper function
async function delayedWork() {
  await doWork();
}
setTimeout(() => {
  delayedWork().catch(console.error);
}, 1000);
```

**Configuration**: `checksVoidReturn: false` (we allow async event handlers)

```typescript
// This is OK (even though void)
<button onClick={async () => { await doWork(); }} />
```

#### `@typescript-eslint/consistent-type-imports`

**Error**: Type imports must use the `type` keyword.

```typescript
// ❌ WRONG
import { ButtonProps, ReactNode } from '@evara/core';

// ✅ CORRECT
import type { ButtonProps } from '@evara/core';
import { ReactNode } from 'react';

// ✅ CORRECT (inline with values)
import React, { type ReactNode } from 'react';

// ✅ CORRECT (all types)
import type { ButtonProps, ButtonState } from '@evara/core';
```

**Configuration**: `prefer: 'type-imports'` and `fixStyle: 'inline-type-imports'`

**Why**:

- Prevents accidentally bundling types as runtime code
- Makes type vs value imports explicit
- Helps bundlers tree-shake better

#### `@typescript-eslint/consistent-type-definitions`

**Error**: Use `interface` for object types, not `type`.

```typescript
// ❌ WRONG
type ButtonProps = {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
};

// ✅ CORRECT
interface ButtonProps {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}

// ✅ CORRECT (type unions are OK)
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type Status = 'loading' | 'error' | 'success';
```

**Why**: Interfaces are the TypeScript convention for object shapes. They also offer better structural typing and tooling support.

#### `@typescript-eslint/array-type`

**Error**: Use simple `Type[]` syntax, not `Array<Type>`.

```typescript
// ❌ WRONG
const ids: Array<string> = [];
const callbacks: Array<() => void> = [];

// ✅ CORRECT
const ids: string[] = [];

// ✅ CORRECT (complex generics OK)
const callbacks: Array<(value: T) => Promise<void>> = [];

// Or split for readability
type Callback<T> = (value: T) => Promise<void>;
const callbacks: Callback<User>[] = [];
```

**Rule**: Use `Type[]` for simple types, `Array<T>` only for complex generic types.

### Correctness Rules

#### `@typescript-eslint/prefer-nullish-coalescing`

**Error**: Use `??` instead of `||` for null/undefined checks.

```typescript
// ❌ WRONG (0 is falsy, becomes 10)
const count = userInput || 10; // If userInput is 0, result is 10

// ✅ CORRECT (only null/undefined becomes 10)
const count = userInput ?? 10; // If userInput is 0, result is 0
```

**When it matters**:

```typescript
// Problem cases with ||
const port = process.env.PORT || 3000;
// If PORT="0", becomes 3000 (wrong!)

// Fixed with ??
const port = process.env.PORT ?? 3000;
// If PORT="0", stays 0 (correct)

// False values to watch out for
0 || 10; // = 10 (wrong!)
0 ?? 10; // = 0 (correct)

'' || 'default'; // = 'default' (wrong!)
'' ?? 'default'; // = '' (correct)

false || true; // = true (wrong!)
false ?? true; // = false (correct)
```

#### `@typescript-eslint/prefer-optional-chain`

**Error**: Use optional chaining `?.` instead of `&&` checks.

```typescript
// ❌ WRONG
if (obj && obj.nested && obj.nested.deep) {
  return obj.nested.deep.value;
}

// ✅ CORRECT
if (obj?.nested?.deep) {
  return obj.nested.deep.value;
}

// ✅ CORRECT (combining)
const value = obj?.nested?.deep?.value;

// ✅ CORRECT (optional method calls)
obj?.method?.();

// ✅ CORRECT (optional array access)
obj?.[key];
```

**Why**: Cleaner, more readable, handles all null/undefined cases.

#### `@typescript-eslint/prefer-for-of`

**Error**: Use `for...of` instead of traditional `for` loops.

```typescript
// ❌ WRONG
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

// ✅ CORRECT
for (const item of items) {
  console.log(item);
}

// ✅ CORRECT (if you need index)
for (const [i, item] of items.entries()) {
  console.log(i, item);
}

// ✅ CORRECT (map/forEach when appropriate)
items.forEach((item, i) => console.log(i, item));
```

**Why**:

- Simpler syntax
- No index errors
- Works with any iterable
- Modern JavaScript standard

#### `@typescript-eslint/prefer-includes`

**Error**: Use `.includes()` instead of `.indexOf()` checks.

```typescript
// ❌ WRONG
if (array.indexOf(value) !== -1) {
  // value is in array
}

// ✅ CORRECT
if (array.includes(value)) {
  // value is in array
}

// ❌ WRONG
if (array.indexOf(value) >= 0) {
  // Also wrong
}

// ✅ CORRECT
if (array.includes(value)) {
  // Clear intent
}
```

**Why**: Clearer intent, less error-prone, modern standard.

#### `@typescript-eslint/prefer-string-starts-ends-with`

**Error**: Use `.startsWith()` and `.endsWith()`, not `.substring()` or `.slice()`.

```typescript
// ❌ WRONG
if (str.substring(0, 5) === 'hello') {
  // String starts with 'hello'
}

// ✅ CORRECT
if (str.startsWith('hello')) {
  // Much clearer
}

// ❌ WRONG
if (str.substring(str.length - 5) === 'world') {
  // String ends with 'world'
}

// ✅ CORRECT
if (str.endsWith('world')) {
  // Much clearer
}
```

**Why**: Explicit intent, no index math errors, more readable.

## General JavaScript Rules

### Console Usage: `no-console`

**Warning**: `console.log` and `console.info` allowed only during development.

**Allowed**:

```typescript
// ✅ Allowed
console.warn('Deprecated API used');
console.error('Fatal error: connection lost');
```

**Not allowed**:

```typescript
// ❌ Error
console.log('debug info');
console.info('informational');
```

**Why**: `console.log` left in code = accidental debugging output in production.

**Allowed items**:

- `warn`: Deprecation notices, important non-fatal issues
- `error`: Critical failures, should be investigated

**In development**: Leave `.log` calls during development, but remove before committing.

```typescript
// During development
console.log('button clicked'); // OK while working

// Before commit
// Remove or convert to console.warn
```

### Debugger: `no-debugger`

**Error**: Never commit `debugger` statements.

```typescript
// ❌ ERROR (would pause execution in debug mode)
function handleClick() {
  debugger; // This breaks in DevTools
  doWork();
}

// ✅ CORRECT
function handleClick() {
  doWork();
}
```

**Why**: Prevents accidental debugger breakpoints in production. Breaks users' sessions.

**For debugging**: Use browser DevTools instead of `debugger`.

## React-Specific Rules

### React Hooks: `react-hooks/rules-of-hooks`

**Error**: Enforce rules of hooks.

```typescript
// ❌ ERROR (hook called conditionally)
function Component({ isAdmin }) {
  if (isAdmin) {
    const [state, setState] = useState(0);  // Conditional hook!
  }
  return <div />;
}

// ✅ CORRECT
function Component({ isAdmin }) {
  const [state, setState] = useState(0);
  if (isAdmin) {
    // Use state conditionally, not the hook itself
  }
  return <div />;
}

// ❌ ERROR (hook inside event handler)
function Component() {
  const handleClick = () => {
    const [state, setState] = useState(0);  // Wrong! Hooks in handler
  };
  return <button onClick={handleClick} />;
}

// ✅ CORRECT
function Component() {
  const [state, setState] = useState(0);
  const handleClick = () => {
    // Use state here
  };
  return <button onClick={handleClick} />;
}
```

**Rules**:

1. Only call hooks at top level
2. Only call hooks in React functions or custom hooks
3. All dependencies must be listed

### Dependency Arrays: `react-hooks/exhaustive-deps`

**Error**: useEffect, useMemo, useCallback dependency arrays must list all dependencies.

```typescript
// ❌ ERROR (missing 'value' in deps)
useEffect(() => {
  console.log(value); // value is a dependency!
}, []); // Missing dependency

// ✅ CORRECT
useEffect(() => {
  console.log(value);
}, [value]); // Properly listed

// ✅ CORRECT (intentional empty deps for mount-only)
useEffect(() => {
  // Intentional: Only run on mount
  setupListener();
}, []);

// ❌ WRONG (functions as deps without memoization)
useEffect(() => {
  eventEmitter.on('change', handleChange);
  return () => eventEmitter.off('change', handleChange);
}, [handleChange]); // handleChange recreated every render!

// ✅ CORRECT
const handleChange = useCallback(
  () => {
    // Handle change
  },
  [
    /* actual deps */
  ],
);

useEffect(() => {
  eventEmitter.on('change', handleChange);
  return () => eventEmitter.off('change', handleChange);
}, [handleChange]);
```

### React Refresh: `react-refresh/only-export-components`

**Warning**: Only export components from files (not utilities).

```typescript
// ❌ WARNING (exporting non-component)
export const utils = {
  /* ... */
};
export function MyComponent() {}

// ✅ CORRECT
// Separate files for utilities and components
// Or:
function MyComponent() {}
export default MyComponent;

export const utils = {
  /* ... */
}; // In different file
```

**Why**: React Fast Refresh works best when files export only components.

## Vue-Specific Rules

### Multi-word Component Names: `vue/multi-word-component-names`

**Off (disabled)**: Our convention allows single-word names like `<Button />`.

Vue's default rule prevents `<Button />` to avoid conflicts with HTML elements, but we explicitly allow it because:

1. We use the `ui-` CSS class namespace
2. Our components are clearly distinguished
3. Better ergonomics for common components

```vue
<!-- ✅ ALLOWED (would normally be error in Vue) -->
<Button variant="primary" />

<!-- This doesn't conflict with HTML because we style it as ui-button -->
```

### Self-closing Tags: `vue/html-self-closing`

**Error**: Empty tags must self-close.

```vue
<!-- ❌ WRONG -->
<img src="..." alt="..." ></img>
<component :is="MyComponent"></component>
<slot></slot>

<!-- ✅ CORRECT -->
<img src="..." alt="..." />
<component :is="MyComponent" />
<slot />
```

**Configuration**: All HTML, SVG, and math elements must self-close.

## Ignoring Rules

### Disabling Specific Rules

Use comments to disable rules for specific lines (sparingly):

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function legacyAPI(data: any) {
  // TODO: Refactor to proper typing
}
```

**Best practices**:

1. Use the most specific disable possible
2. Always add a comment explaining why
3. Add a TODO if it's temporary
4. Never disable entire blocks; do it line-by-line

### Ignoring Files

Add to `.eslintignore`:

```eslintignore
dist/
build/
.next/
.nuxt/
node_modules/
coverage/
generated/
```

## Running ESLint

### Check Entire Monorepo

```bash
pnpm lint
```

### Fix Auto-fixable Errors

```bash
pnpm lint:fix
```

Fixes:

- Removes unused variables
- Adds missing imports
- Fixes type import syntax
- Many formatting issues (though Prettier handles most)

### Check Specific Package

```bash
pnpm --filter=@evara/vue lint
pnpm --filter=@evara/react lint:fix
```

### Check Specific File

```bash
pnpm exec eslint src/components/Button/Button.tsx
pnpm exec eslint --fix src/components/Button/Button.tsx
```

## CI/CD Enforcement

ESLint is checked on:

1. **Pre-commit** (Husky): Staged files must pass linting
2. **Pull request**: Full monorepo linting required
3. **Pre-release**: All files must pass linting

Failed linting = failed PR = no merge.

## Common Errors & Fixes

### "Unexpected any"

```typescript
// ❌ Error: Unexpected any
function process(data: any) {}

// ✅ Fix
// Option 1: Use proper type
interface Data {
  name: string;
}
function process(data: Data) {}

// Option 2: Use unknown with type guard
function process(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // Safely use as object
  }
}
```

### "Missing dependencies in deps array"

```typescript
// ❌ Error
useEffect(() => {
  setValue(externalValue);
}, []);

// ✅ Fix
useEffect(() => {
  setValue(externalValue);
}, [externalValue]);
```

### "Unsafe use of &&"

```typescript
// ❌ Error: Use optional chaining
if (obj && obj.nested) {
  return obj.nested;
}

// ✅ Fix
return obj?.nested;
```

### "Console not allowed"

```typescript
// ❌ Error
console.log('debug');

// ✅ Fix (remove it)
// Or convert to warning:
console.warn('important message');
```

## Summary Table

| Rule                        | Type  | Purpose           | Fix                           |
| --------------------------- | ----- | ----------------- | ----------------------------- |
| `no-explicit-any`           | Error | Type safety       | Use proper types or `unknown` |
| `no-unused-vars`            | Error | Remove dead code  | Delete or prefix with `_`     |
| `require-await`             | Error | Async intent      | Remove `async` or add `await` |
| `no-floating-promises`      | Error | Handle rejections | Add `.catch()` or `await`     |
| `prefer-nullish-coalescing` | Error | Correct defaults  | Use `??` instead of `\|\|`    |
| `prefer-optional-chain`     | Error | Safer access      | Use `?.` instead of `&&`      |
| `no-console`                | Warn  | Production safety | Use `warn`/`error` or remove  |
| `no-debugger`               | Error | Don't break users | Remove `debugger` statements  |
| React hooks                 | Error | Hook safety       | Only call at top level        |
| Vue naming                  | Off   | Ergonomics        | Single-word names allowed     |

All errors block CI/CD. Fix them, don't ignore them.
