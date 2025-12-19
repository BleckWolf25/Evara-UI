# Agents Guide

**Evara UI** is an open-source, highly scalable UI library and design system with modular, consistent, and testable components. This guide provides essential information for development and contribution.

## Prerequisites

- **Node.js**: >= 22.0.0
- **pnpm**: >= 10.0.0 (package manager)

## Build & Test Commands

- **Build**: `pnpm build` (builds all packages via Turbo)
- **Dev**: `pnpm dev --parallel` (runs dev servers in parallel)
- **Lint**: `pnpm lint` (runs ESLint across monorepo)
- **Lint Fix**: `pnpm lint:fix` (auto-fixes ESLint issues)
- **Test**: `pnpm test` (runs Vitest for entire workspace)
- **Test Single**: `pnpm vitest run path/to/file.test.ts` (single test file)
- **Typecheck**: `pnpm typecheck` (TypeScript validation)

## Release & Changelog Commands

- **Changeset Add**: `pnpm changeset:add` (create a changeset for changes)
- **Release**: `pnpm release` (publish packages and generate CHANGELOG)
- **Changeset CLI**: `pnpm changeset` (access full changeset CLI)

## Architecture

**Monorepo** structure (pnpm workspaces) with Turbo caching for efficient builds:

### Packages

- `packages/core/` - Base components, utilities, and shared hooks
- `packages/react/` - React component implementations and exports
- `packages/vue/` - Vue component implementations and exports
- `packages/nuxt/` - Nuxt-specific integrations and plugins
- `packages/styles/` - Shared CSS, design tokens, and styling utilities
- `packages/docs/` - Documentation site and component storybook

### Examples

- `examples/` - Example projects demonstrating library usage

### Key Configuration Files

- `turbo.json` - Turborepo build pipeline configuration
- `tsconfig.base.json` - Shared TypeScript configuration
- `eslint.config.ts` - Unified ESLint rules (v9 flat config)
- `prettier.config.js` - Code formatting rules
- `vitest.config.js` - Test framework configuration
- `vitest.workspace.js` - Multi-workspace test setup

## Code Style

### Language & Formatting

- **Language**: TypeScript (strict mode, ESNext target)
- **Formatting**: Prettier with 100px line width, 2 spaces, single quotes, trailing commas
- **Linting**: ESLint with strict type checking, no `any` types, prefer `type` imports
- **Target**: ES2020+ with CommonJS compatibility where needed, ESM prefered.

### Imports & Types

- Use `import type {}` for type-only imports
- Consistent interface definitions for all type contracts
- Avoid importing from barrel exports for internal dependencies

### Error Handling

- Strict promise checks (no floating promises)
- Explicit error handling in async operations
- Use typed error classes for custom errors

### Naming Conventions

- **Variables/Functions**: `camelCase`
- **Components/Types/Interfaces**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE` for true constants, `camelCase` for exported config
- **Files**: Match export name (e.g., `MyComponent.tsx`, `useCustomHook.ts`)

### Framework-Specific

#### Vue

- Self-closing tags always (`<Component />`)
- Single attribute per line for multi-attribute components
- Use `<script setup>` syntax
- Prefer composition API with TypeScript

#### React

- JSX runtime mode enabled (no React import needed)
- Hooks rules enforced via ESLint plugin
- Functional components only (no class components)
- Prefer custom hooks for logic reuse

## Development Workflow

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Run tests in watch mode
pnpm test --watch
```

### Before Committing

```bash
# Lint and fix issues
pnpm lint:fix

# Run type checking
pnpm typecheck

# Run tests
pnpm test
```

### Git Hooks

- Pre-commit hooks run `lint:fix` and type checking via Husky
- Commit messages should be clear and descriptive

## Testing

### Test Files

- Place test files alongside source files with `.test.ts` or `.test.tsx` suffix
- Use Vitest for unit and component tests
- Run `pnpm test` to execute all tests
- Run `pnpm vitest run path/to/file.test.ts` for single file tests

### Test Coverage

- Aim for >80% coverage on critical paths
- Test component props, events, and slot rendering
- Test hooks with `@testing-library/vue` or `@testing-library/react`

## Project Consistency

- **Do NOT** hallucinate implementations, follow existing patterns in `packages/core/`
- **Always** reference design documentation in `docs/`
- **Check** similar components before creating new ones
- **Update** type definitions when changing APIs
- **Keep** component APIs consistent across frameworks
- **Modern**, evara is modern, no HTML APIs should be used, unless necessary

## Security

### Practices

- **No inline HTML**: Always sanitize user input before rendering
- **Dependencies**: Keep all packages up-to-date; review security advisories
- **Secrets**: Never commit environment variables; use `.env.example` templates
- **Access Control**: Follow principle of least privilege for file permissions
- **Validation**: Validate all props and external inputs at component boundaries

### Code Review

- All PRs require review before merging
- Security considerations must be addressed in review
- Third-party dependency changes require explicit approval

## Publishing & Releases

- Version bumping follows Semantic Versioning
- Use `pnpm build` to create production builds
- All packages are published from the main branch
- Release notes should document breaking changes clearly

## Troubleshooting

### Build Issues

- Clear node_modules: `rm -rf node_modules && pnpm install`
- Clear Turbo cache: `pnpm turbo prune --scope=@evara-ui/*`
- Check TypeScript errors: `pnpm typecheck`

### Test Failures

- Run tests in isolation: `pnpm vitest run path/to/file.test.ts`
- Check Node version: `node --version` (must be >=22.0.0)
- Clear test cache: `rm -rf .vitest`

### Formatting Issues

- Auto-fix: `pnpm lint:fix`
- Verify prettier: `pnpm prettier --check .`

## Resources

- See `CONTRIBUTING.md` for detailed contribution guidelines
- See `CODE_OF_CONDUCT.md` for community standards
- See `SECURITY.md` for security reporting procedures
- Check `docs/` for design system documentation
