# Evara UI

![CI/CD Build & Release](https://github.com/BleckWolf25/Evara-UI/actions/workflows/ci.yml/badge.svg)

> High-performance, framework-agnostic UI library and design system supporting React, Vue, Svelte, and Custom Elements.

Evara UI is a premium, open-source, highly scalable UI library. It provides modular, consistent, and testable components with built-in support for performance optimization, SEO, analytics, and backend-driven workflows.

- **Polymorphic Components** - Build rich, accessible interfaces with components that render as any native HTML element or custom component.
- **Framework Agnostic Core** - Driven by headless state controllers (`@evara-ui/core`) keeping business logic completely decoupled from view code.
- **Cross-Framework Support** - First-class wrappers and integrations for React, Vue, Svelte, and native Web Components.
- **Unified Design System** - Centralized vanilla CSS design tokens, custom themes, and utility declarations (`@evara-ui/styles`).
- **Flexible Form Primitives** - Highly robust, schema-agnostic form and field validation controller adapters.
- **Radix/Shadcn Compatibility** - Primitives that slide directly into existing Tailwind or CSS design templates.
- **Production Bundled** - Fully tree-shakable packages compiled with `tsup` containing optimized ESM, CJS, and DTS output.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22.0.0 or higher
- **PNPM** 10.0.0 or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BleckWolf25/Evara-UI.git
   cd Evara-UI
   ```

2. Install the monorepo dependencies:

   ```bash
   pnpm install
   ```

3. Build all workspace packages:

   ```bash
   pnpm build
   ```

## 📝 Available Commands

- `pnpm dev` - Start development servers for all package showcases and documentation
- `pnpm build` - Compile all packages and build demo sites for production
- `pnpm lint` - Run ESLint verification across packages and examples
- `pnpm lint:fix` - Run ESLint code formatter and automated fix resolver
- `pnpm typecheck` - Run TypeScript compiler checks on all project workspaces
- `pnpm test` - Run Vitest unit and integration tests across packages
- `pnpm test:e2e` - Run Playwright end-to-end integration tests
- `pnpm changeset` - Add a new version release changeset entry
- `pnpm release` - Version packages via changeset and publish to npm registry

## 🏗️ Project Structure

```zsh
EvaraUI/
├── packages/
│   ├── core/                  # Headless state controllers & native Custom Elements
│   ├── styles/                # Global design system theme CSS files and builders
│   ├── react/                 # React UI component library wrappers
│   ├── vue/                   # Vue UI component library wrappers
│   ├── svelte/                # Svelte UI component library wrappers
│   └── unplugin/              # Build tools integration plugins
├── examples/
│   ├── core-vanilla-html/     # Pure HTML, CSS, and native Custom Element showcase
│   ├── core-webcomponents/    # Web component custom element sandbox
│   ├── react-vite-showcase/   # React Single Page App showcase
│   ├── react-nextjs-app/      # Next.js Server-Side Rendered (SSR) app demo
│   ├── vue-vite-showcase/     # Vue Single Page App showcase
│   ├── nuxt-app/              # Nuxt.js Server-Side Rendered (SSR) app demo
│   └── svelte-vite-showcase/  # Svelte Single Page App showcase
├── docs/                      # VitePress design system documentation website
├── .github/workflows/         # CI/CD workflows (ci.yml, release.yml)
├── eslint.config.ts           # Unified ESLint configuration
├── pnpm-workspace.yaml        # PNPM workspace package declarations
└── package.json               # Monorepo root scripts and devDependencies
```

## 🧪 Testing

The project uses **Vitest** for unit and integration testing and **Playwright** for end-to-end tests.

### Run Unit Tests

```bash
pnpm test
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please review our [Security Policy](SECURITY.md).

## 📧 Contact

For questions or support, please open an issue on GitHub or contact [joao.coutinho08@icloud.com](mailto:joao.coutinho08@icloud.com).

---

Built with ❤️ using TypeScript, PNPM, and Turborepo
