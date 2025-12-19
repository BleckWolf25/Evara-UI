# Development Setup & Workflow

This guide covers setting up your development environment, running the monorepo, and day-to-day development tasks.

## Prerequisites

You must have these installed before starting:

### Required Versions

- **Node.js**: >= 22.0.0 (verify with `node --version`)
- **pnpm**: >= 10.0.0 (verify with `pnpm --version`)
- **Git**: Latest stable version

### Install Node.js

**macOS** (using Homebrew):

```bash
brew install node@22
```

**Linux** (using apt):

```bash
sudo apt-get install nodejs npm
# Then upgrade to pnpm
npm install -g pnpm@10
```

**Windows** (using Chocolatey):

```powershell
choco install nodejs
npm install -g pnpm@10
```

Or [download directly](https://nodejs.org).

### Verify Installation

```bash
node --version    # Should be >= 22.0.0
pnpm --version    # Should be >= 10.0.0
```

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BleckWolf25/Evara-UI.git
cd Evara-UI
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs dependencies for all packages in the monorepo using pnpm workspaces.

**What happens:**

- Downloads all npm packages
- Creates symlinks between local packages (e.g., `@evara/core` → `packages/core`)
- Generates a single `pnpm-lock.yaml` for reproducible installs

### 3. Verify Installation

```bash
pnpm build
```

Should complete without errors. If it fails:

- Check Node/pnpm versions
- Delete `node_modules` and retry: `rm -rf node_modules && pnpm install`

## Directory Structure

```zsh
Evara-UI/
├── packages/
│   ├── core/              # Framework-agnostic logic & types
│   ├── react/             # React components
│   ├── vue/               # Vue 3 components
│   ├── nuxt/              # Nuxt integration (extends Vue)
│   ├── styles/            # Global design tokens & CSS
│   └── docs/              # Documentation site (VitePress)
├── examples/
│   ├── react-demo/        # React demo application
│   ├── vue-demo/          # Vue demo application
│   ├── next-demo/         # Next.js demo application
│   └── nuxt-demo/         # Nuxt demo application
├── scripts/               # Build & utility scripts
├── turbo.json             # Turborepo configuration
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── package.json           # Root package configuration
└── [config files]         # ESLint, Prettier, Vitest, TypeScript

```

## Common Commands

### Development

```bash
# Start all dev servers in parallel
pnpm dev

# Start dev server for specific package
pnpm --filter=@evara/vue dev
pnpm --filter=vue-demo dev

# Example: Work on Vue components
pnpm --filter=@evara/vue dev &   # Terminal 1: Component development
pnpm --filter=vue-demo dev       # Terminal 2: Test with demo app
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter=@evara/vue build

# Clean build (remove dist and rebuild)
pnpm clean && pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests for specific package
pnpm --filter=@evara/vue test

# Run tests with coverage
pnpm test --coverage

# Run Vitest UI dashboard
pnpm test --ui
```

### Code Quality

```bash
# Lint entire monorepo (ESLint)
pnpm lint

# Fix linting errors automatically
pnpm lint:fix

# Type check TypeScript files
pnpm typecheck

# Format code (Prettier)
pnpm format

# Run all checks (lint + typecheck + format)
pnpm check
```

### Package Management

```bash
# Add dependency to root
pnpm add -w <package-name>

# Add dev dependency to specific package
pnpm --filter=@evara/vue add -D <package-name>

# Add peer dependency
pnpm --filter=@evara/vue add -P react

# Remove dependency
pnpm --filter=@evara/vue remove <package-name>

# Update dependencies
pnpm update
```

## Turborepo

We use [Turborepo](https://turbo.build) to manage tasks across the monorepo. It provides:

- **Parallel execution**: Runs independent tasks simultaneously
- **Caching**: Skips tasks with unchanged inputs
- **Dependency awareness**: Respects package interdependencies

### Understanding Turbo Configuration

See `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

**Key settings:**

- `dependsOn: ["^build"]` - Build dependencies first
- `cache: false` - Don't cache dev/watch tasks
- `persistent: true` - Keep dev server running
- `outputs` - Files that signal task completion

### Turbo Filtering

Run tasks for specific packages:

```bash
# Run lint for only Vue package
pnpm lint --filter=@evara/vue

# Run tests for all components in packages/
pnpm test --filter="packages/*"

# Run dev for package and its dependents
pnpm dev --filter=@evara/core...
```

## Workspace Packages

### Package Dependencies

Each package defines its dependencies in `package.json`. Local packages are referenced with npm aliases:

```json
{
  "dependencies": {
    "@evara/core": "workspace:*"
  }
}
```

**`workspace:*`** means "use the local version in this monorepo."

### Running Commands in Specific Packages

```bash
# Run dev in Vue package
pnpm --filter=@evara/vue dev

# Run build in React package
pnpm --filter=@evara/react build

# Run tests in Core package
pnpm --filter=@evara/core test
```

## IDE Setup

### VS Code (Recommended)

Install these extensions:

1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Prettier** - `esbenp.prettier-vscode`
3. **TypeScript Vue Plugin** - `Vue.vscode-typescript-vue-plugin`
4. **Vue** - `Vue.volar`
5. **Vitest** - `vitest.explorer`

### VSCode Settings

Create or update `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "vetur.validation.template": false,
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

### WebStorm/IntelliJ

1. Go to **Settings** → **Languages & Frameworks** → **TypeScript**
2. Set **TypeScript language service version** to project version
3. Enable ESLint: **Settings** → **Tools** → **ESLint**
4. Set Prettier as default formatter: **Settings** → **Languages & Frameworks** → **JavaScript** → **Prettier**

## Git Workflow

### Pre-commit Hooks

We use Husky to run checks before commits:

```bash
# Hooks automatically install on: pnpm install
# They run: lint, typecheck, and format
```

**What gets checked:**

- Staged files are linted (ESLint)
- Staged files are formatted (Prettier)
- If checks fail, commit is blocked

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```git
type(scope): description

[optional body]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting (caught by Prettier, rarely used)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Test additions/changes
- `chore`: Build, deps, tooling

**Examples:**

```bash
git commit -m "feat(vue/button): add loading state"
git commit -m "fix(react/input): prevent enter key submission"
git commit -m "docs: update testing guidelines"
git commit -m "test(core): improve button controller coverage"
```

### Feature Branch Workflow

```bash
# Create feature branch
git checkout -b feat/component-name

# Make changes, commit
git add .
git commit -m "feat(vue/button): add loading state"

# Push to your fork
git push origin feat/component-name

# Create pull request on GitHub
# Fill in PR template
# Wait for review and CI/CD checks
```

## Environment Variables

Create `.env.local` files for package-specific settings (not in git):

```bash
# .env.local (root)
# Leave empty unless needed for scripts

# examples/vue-demo/.env.local
VITE_API_URL=http://localhost:3000

# examples/next-demo/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Debugging

### Node Debugger

Run tests with debugger:

```bash
node --inspect-brk ./node_modules/vitest/vitest.mjs run path/to/test.spec.ts
```

Then open `chrome://inspect` in Chrome.

### VS Code Debugger

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Vitest",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["test", "--inspect-brk"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Console Logging

ESLint allows `console.warn()` and `console.error()`:

```typescript
// ✅ ALLOWED: For debugging during development
console.warn('This component requires a form parent');

// ❌ ERROR: Will fail linting
console.log('debug');
```

Before committing, remove debug logs or convert to warnings.

## Monorepo Gotchas

### 1. Dependency Version Conflicts

If you add a dependency to a package, make sure it matches the root version:

```bash
# Check root version
pnpm why react

# Match in individual package
pnpm --filter=@evara/react add react@latest
```

### 2. Building Before Publishing

Always build before testing:

```bash
pnpm build
pnpm test  # Uses dist/ not src/
```

### 3. Cached Test Failures

If tests mysteriously pass/fail inconsistently:

```bash
pnpm clean  # Removes all dist/ and .turbo/
pnpm test
```

### 4. Local Package Installation

Changes to local packages (e.g., `@evara/core`) are immediately available when using `workspace:*` dependencies. No reinstall needed.

## Performance Tips

### Speed Up Development

```bash
# Only run tasks for changed packages (monorepo intelligence)
pnpm build --only-changed

# Skip turbo cache
pnpm build --no-cache

# Parallel with concurrency limit
pnpm build --concurrency=4
```

### Watch Mode

When developing, keep separate terminals:

```bash
# Terminal 1: Build core/components library in watch
pnpm --filter=@evara/vue dev

# Terminal 2: Dev server for demo app
pnpm --filter=vue-demo dev

# Terminal 3: Run tests in watch
pnpm test --watch
```

### Cold Start

First `pnpm install` takes time. Subsequent runs are cached:

```bash
# First run (slow)
pnpm install

# Subsequent runs (fast)
pnpm install  # Only adds new deps if needed
```

## Troubleshooting

### "Module not found" errors after adding dependencies

```bash
# Reinstall all dependencies
pnpm install

# If still broken, clean cache
pnpm clean
pnpm install
```

### TypeScript errors in one package but not others

```bash
# Ensure tsconfig references are correct
pnpm typecheck --filter=package-name
```

### Tests fail locally but pass in CI

```bash
# Clear vitest cache
rm -rf node_modules/.vitest

# Rebuild from scratch
pnpm clean
pnpm install
pnpm test
```

### ESLint/Prettier conflicts

```bash
# Run both in order
pnpm lint:fix    # ESLint first
pnpm format      # Prettier second
```

### Node version mismatch

```bash
# Check required version
cat .nvmrc

# Switch using nvm
nvm use

# Or use Volta (automatic)
volta install node@22
```

## Useful Resources

- **Turborepo docs**: <https://turbo.build/repo/docs>
- **pnpm workspaces**: <https://pnpm.io/workspaces>
- **Vitest docs**: <https://vitest.dev>
- **TypeScript handbook**: <https://www.typescriptlang.org/docs>
- **Vue 3 guide**: <https://vuejs.org>
- **React docs**: <https://react.dev>

## Getting Help

1. **Check existing issues**: <https://github.com/BleckWolf25/Evara-UI/issues>
2. **Review docs**: This file, CODE_STYLE.md, TESTING.md, CONTRIBUTING.md
3. **Ask in discussions**: <https://github.com/BleckWolf25/Evara-UI/discussions>
4. **Check CI logs**: GitHub Actions runs on every PR
