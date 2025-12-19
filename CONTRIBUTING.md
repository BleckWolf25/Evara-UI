# Contributing to Evara UI

First off, thank you for considering contributing to **Evara UI**! It's people like you who make Evara UI such a powerful library for the community.

Evara UI is an enterprise-grade, highly scalable UI library and design system. Our goal is to provide modular, consistent, and testable components with built-in support for performance, SEO, and accessibility.

Please take a moment to review this document to ensure a smooth contribution process.

## Our Vision

We aim for excellence in:

- **Performance**: Lightweight and fast components.
- **Accessibility**: Compliance with WCAG standards.
- **Developer Experience**: Intuitive APIs and world-class documentation.
- **Consistency**: A unified design language across frameworks (React, Vue, Nuxt).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 22.0.0)
- [pnpm](https://pnpm.io/) (>= 10.0.0)

### Local Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:

   ```bash
   git clone https://github.com/your-username/Evara-UI.git
   ```

3. **Navigate to the directory**:

   ```bash
   cd Evara-UI
   ```

4. **Install dependencies**:

   ```bash
   pnpm install
   ```

---

## Project Structure

Evara UI is a monorepo managed with **Turborepo** and **pnpm workspaces**.

```zsh
.
├── packages
│   ├── core      # Shared logic and primitives
│   ├── react     # React-specific components
│   ├── vue       # Vue-specific components
│   ├── nuxt      # Nuxt.js integration modules
│   ├── styles    # Global design tokens and CSS logic
│   └── docs      # Documentation portal
├── examples      # Framework-specific demo applications
│   ├── react-demo
│   ├── vue-demo
│   ├── next-demo
│   └── nuxt-demo
└── scripts       # Build and maintenance scripts
```

---

## Development Workflow

### Task Execution

We use `turbo` to manage tasks across the monorepo.

- **Run all dev servers**: `pnpm dev`
- **Build all packages**: `pnpm build`
- **Run all tests**: `pnpm test`
- **Lint the entire repo**: `pnpm lint`
- **Typecheck the entire repo**: `pnpm typecheck`

To run tasks for a specific package:

```bash
pnpm --filter=@evara/react dev
```

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps us automate releases and maintain a clear project history.

**Format**: `type(scope): description`

**Types**:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

_Example: `feat(react/button): add loading state Support`_

---

## Component Contribution Checklist

When contributing a new component or modifying an existing one, please ensure:

1. **Framework Parity**: If it's a core component, aim to implement it for both React and Vue where applicable.
2. **Styles**: Use the centralized `@evara/styles` tokens.
3. **Tests**: Include unit tests (Vitest) and ensure they pass.
4. **Documentation**: Update the relevant `.mdx` files in `packages/docs`.
5. **Accessibility**: Test with screen readers and keyboard navigation.
6. **Performance**: Avoid unnecessary re-renders or heavy dependencies.

---

## Submitting a Pull Request

1. **Create a feature branch**: `git checkout -b feat/your-feature-name`.
2. **Commit your changes**: Follow the commit conventions.
3. **Push to your fork**: `git push origin feat/your-feature-name`.
4. **Open a PR**: Fill out the PR template (if available) with a clear description of your changes.
5. **Review**: Be prepared to address feedback during the code review process.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct (see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) if present, otherwise follow standard professional etiquette).

---

_Thank you for helping us build the future of UI!_
