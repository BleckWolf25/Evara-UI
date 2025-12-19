# Prettier Style Guide

This document defines the **code formatting rules** for the Evara UI monorepo. Prettier handles all stylistic concerns exclusively—ESLint only handles code quality and correctness.

## Philosophy

**Prettier's Role**: Format code consistently without bikeshedding.

**Non-negotiable**: All Prettier rules are enforced in CI/CD and pre-commit hooks. No exceptions.

**Benefits**:

- Eliminates style debates (the formatter decides)
- Automatic formatting on save
- Consistent diffs (reviewers see logic changes, not spacing)
- Easy onboarding (new developers get correct style automatically)

## Configuration

The official configuration lives in `prettier.config.js`:

```javascript
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
```

## Rule-by-Rule Explanation

### Semicolons: `semi: true`

**Every statement ends with a semicolon.**

```typescript
// ✅ CORRECT
const name = 'Button';
function render() { }

// ❌ WRONG (Prettier will add semicolons)
const name = 'Button'
function render() { }
```

**Why**: Avoids Automatic Semicolon Insertion (ASI) bugs. Explicit is better than implicit.

**Common bugs ASI prevents:**

```javascript
// ❌ Without semicolons, this breaks:
const x = 1
[2, 3].forEach(n => console.log(n))  // Interprets as x[2]!

// ✅ With semicolons, clear intent:
const x = 1;
[2, 3].forEach(n => console.log(n));
```

### Quotes: `singleQuote: true`

**Use single quotes for strings.**

```typescript
// ✅ CORRECT
const message = 'Hello world';
const selector = '.button';

// ❌ WRONG (Prettier will convert)
const message = "Hello world";
const selector = ".button";
```

**Exception**: JSX attributes use double quotes (built-in, can't change):

```jsx
// JSX always uses double quotes (Prettier doesn't touch JSX attribute quotes)
<Button className="primary" title="Click me">
  Submit
</Button>
```

**Why**: Single quotes are standard in modern JavaScript. Fewer escapes needed for apostrophes.

```typescript
// Single quotes: less escaping
const text = 'It\'s working';

// Double quotes: more escaping
const text = "It's working";  // No escape needed, but inconsistent
```

### Trailing Commas: `trailingComma: 'all'`

**Always include trailing commas in multi-line structures.**

```typescript
// ✅ CORRECT
const options = {
  variant: 'primary',
  size: 'md',
  disabled: true,  // Trailing comma
};

// ❌ WRONG (Prettier will add comma)
const options = {
  variant: 'primary',
  size: 'md',
  disabled: true
};
```

**Arrays**:

```typescript
// ✅ CORRECT
const items = [
  'button',
  'input',
  'modal',
];

// ❌ WRONG
const items = [
  'button',
  'input',
  'modal'
];
```

**Function parameters**:

```typescript
// ✅ CORRECT
function render(
  variant: string,
  size: string,
  disabled: boolean,
) { }

// ❌ WRONG
function render(
  variant: string,
  size: string,
  disabled: boolean
) { }
```

**Why**:

- Cleaner diffs—adding an item only changes one line
- Reduces "forgot trailing comma" bugs
- Modern JavaScript supports trailing commas everywhere

**Diff comparison**:

```diff
Without trailing comma:
  const arr = [
    'a',
    'b',
-   'c'
+   'c',
+   'd'
  ]

With trailing comma:
  const arr = [
    'a',
    'b',
    'c',
+   'd',
  ]
```

### Print Width: `printWidth: 100`

**Lines are maximum 100 characters.**

```typescript
// ✅ CORRECT (80 chars)
const button = render({
  variant: 'primary',
  size: 'lg',
});

// ❌ WRONG (125 chars - Prettier will wrap)
const button = render({ variant: 'primary', size: 'lg', disabled: false, loading: false });
```

**When Prettier wraps:**

```typescript
// Single line (fits within 100 chars)
const props = { variant: 'primary', size: 'md' };

// Multi-line (exceeds 100 chars)
const props = {
  variant: 'primary',
  size: 'md',
  fullWidth: true,
  disabled: false,
};
```

**Why 100 vs 80?**

- 80: Common in enterprise (monitors from 2000s)
- 100: Modern sweet spot—balances readability with screen space
- Fits in most split-screen editors
- Mobile-friendly code review diffs

### Tab Width: `tabWidth: 2`

**Indent with 2 spaces per level.**

```typescript
// ✅ CORRECT
if (true) {
  const x = 1;
  if (x === 1) {
    console.log('nested');
  }
}

// ❌ WRONG (4 spaces shown, Prettier converts to 2)
if (true) {
    const x = 1;
    if (x === 1) {
        console.log('nested');
    }
}
```

**Why 2 spaces?**

- JavaScript/Node.js ecosystem standard
- Less horizontal scrolling
- Modern tooling optimized for 2 spaces
- Vue/React conventions use 2 spaces

### Tabs: `useTabs: false`

**Always use spaces, never tabs.**

```typescript
// ✅ CORRECT (spaces)
const x = 1;
··const y = 2;

// ❌ WRONG (tabs - Prettier converts)
const x = 1;
→const y = 2;
```

**Why spaces over tabs?**

- Consistent rendering across editors/platforms
- Tabs display as 4/8 chars depending on settings
- Spaces are always the same width
- Modern standard across all ecosystems

### Line Endings: `endOfLine: 'lf'`

**Always use Unix line endings (LF), never Windows (CRLF).**

```graph
✅ CORRECT (LF - \n)
line1\n
line2\n

❌ WRONG (CRLF - \r\n)
line1\r\n
line2\r\n
```

**Auto-detection**: Git respects `.gitattributes`. No need to worry locally—Prettier enforces on commit.

**Why LF?**

- Unix standard (macOS, Linux)
- GitHub uses LF
- Consistent across platforms
- Avoids noisy diffs from CRLF conversions

### Arrow Functions: `arrowParens: 'always'`

**Always wrap arrow function parameters in parentheses.**

```typescript
// ✅ CORRECT
const add = (a, b) => a + b;
const double = (x) => x * 2;
const noop = () => { };

// ❌ WRONG (Prettier adds parens)
const add = (a, b) => a + b;
const double = x => x * 2;
const noop = () => { };
```

**Why always parentheses?**

- Consistency (one rule, no exceptions)
- Single param easier to refactor (add second param without syntax change)
- Matches standard function syntax

```typescript
// Easy to extend
const double = (x) => x * 2;
const add = (x, y) => x + y;  // Only content changed, syntax stays same
```

### Bracket Spacing: `bracketSpacing: true`

**Add spaces inside object literals.**

```typescript
// ✅ CORRECT
const obj = { name: 'Button', variant: 'primary' };

// ❌ WRONG (Prettier adds spaces)
const obj = {name: 'Button', variant: 'primary'};
```

**Multi-line objects**:

```typescript
// ✅ CORRECT
const obj = {
  name: 'Button',
  variant: 'primary',
};

// ❌ WRONG
const obj = {
  name: 'Button',
  variant: 'primary',
};
```

**Why bracket spacing?**

- More readable (`{ x }` vs `{x}`)
- Modern standard
- Matches JSX conventions

## Vue-Specific Rules

### Single Attribute Per Line: `singleAttributePerLine: true`

**Vue templates enforce one attribute per line.**

```vue
<!-- ✅ CORRECT -->
<Button
  variant="primary"
  size="lg"
  disabled
  @click="handleClick"
/>

<!-- ❌ WRONG (Prettier will reformat) -->
<Button variant="primary" size="lg" disabled @click="handleClick" />
```

**Why for Vue specifically?**

- Vue attributes are verbose (`:prop=`, `@event=`)
- Better readability with one attribute per line
- Easier diffs and PRs
- Standard Vue style guide recommendation

**Exception**: Single-attribute components can stay inline:

```vue
<!-- OK (single attribute) -->
<img src="logo.png" />
<MyComponent v-if="condition" />
```

## Running Prettier

### Format All Files

```bash
# Format everything
pnpm format

# or manually
pnpm exec prettier --write .
```

### Format Specific Files

```bash
# Format one file
pnpm exec prettier --write src/components/Button/Button.tsx

# Format a directory
pnpm exec prettier --write src/components/

# Format by pattern
pnpm exec prettier --write "src/**/*.{ts,tsx,vue}"
```

### Check Without Formatting

```bash
# Check if files are formatted (CI/CD uses this)
pnpm exec prettier --check .

# Useful before committing
pnpm exec prettier --check src/
```

## IDE Integration

### VS Code

Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm / IntelliJ

1. Go to **Settings** → **Languages & Frameworks** → **JavaScript** → **Prettier**
2. Set **Prettier package** to project's node_modules
3. Enable **Run for files on save**
4. Set **Run on reformat code** to true

### Vim/Neovim

Using [vim-prettier](https://github.com/prettier/vim-prettier):

```vim
" In your init.vim or init.lua
" Auto-format on save
autocmd BufWritePost *.ts,*.tsx,*.vue,*.js silent execute '!pnpm exec prettier --write %'
```

Or use [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim) with Neovim.

## Common Issues

### "Prettier vs ESLint conflicts"

**Solution**: Prettier only handles formatting. ESLint only handles logic/quality.

If you see conflicts:

1. Run `pnpm lint:fix` first (ESLint)
2. Then `pnpm format` second (Prettier)

Order matters because ESLint can introduce formatting that Prettier cleans up.

### "Line too long but I can't break it"

**Options**:

1. Actually break the line (usually possible)
2. Use `// prettier-ignore` (last resort)

```typescript
// ✅ Break long lines
const message =
  'This is a very long message that ' +
  'exceeds the print width limit';

// ⚠️ Only if absolutely necessary
// prettier-ignore
const message = 'This is a very long message that exceeds the print width limit';
```

**Note**: Never use `prettier-ignore` without good reason. It's a code smell.

### "My IDE isn't formatting on save"

**Check**:

1. Prettier extension is installed
2. Project has `prettier.config.js`
3. File type is supported (`.ts`, `.tsx`, `.vue`, `.js`)
4. `editor.formatOnSave` is enabled in VS Code

```bash
# Verify Prettier sees your config
pnpm exec prettier --find-config-path .
```

### "Different formatting locally vs CI"

**Common cause**: Prettier version mismatch.

**Solution**:

```bash
# Use exact version from package.json
pnpm install

# Verify version
pnpm exec prettier --version

# Should match prettier.config.js comments
```

## Pre-commit Hooks

Husky runs Prettier automatically on staged files:

```bash
# Triggered on `git commit`
pnpm lint:fix    # ESLint fixes
pnpm format      # Prettier formats
# If changes exist, commit is blocked
# Stage the formatted changes and retry
```

You don't need to run these manually—they run automatically.

## Exceptions

**When can you disable Prettier?**

Rare cases:

- ASCII art or formatted tables (use `<!-- prettier-ignore-start -->`)
- Generated code (mark files as auto-generated)
- Third-party code (ignore in `.prettierignore`)

```typescript
// prettier-ignore
const ascii = `
  ╔═══════════╗
  ║  BUTTON   ║
  ╚═══════════╝
`;
```

```javascript
// prettier-ignore-start
const table = `
| Name   | Type   | Size |
|--------|--------|------|
| Button | react  | 3KB  |
| Input  | vue    | 2KB  |
`;
// prettier-ignore-end
```

Add to `.prettierignore` for files/folders to skip:

```prettierignore
# Don't format generated files
dist/
build/
.next/
.nuxt/

# Third-party code
vendor/
external/
```

## Summary

| Rule | Value | Reasoning |
|------|-------|-----------|
| `semi` | `true` | Prevent ASI bugs |
| `singleQuote` | `true` | Reduce escaping |
| `trailingComma` | `all` | Cleaner diffs |
| `printWidth` | `100` | Modern screen balance |
| `tabWidth` | `2` | JS ecosystem standard |
| `useTabs` | `false` | Consistent rendering |
| `endOfLine` | `lf` | Unix standard |
| `arrowParens` | `always` | Consistency & refactoring |
| `bracketSpacing` | `true` | Readability |
| Vue `singleAttributePerLine` | `true` | Vue readability |

No debate. These are enforced. Move on to writing great code.
