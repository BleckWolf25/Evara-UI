# Contributing to Evara UI

First off, thank you for taking the time to contribute! Contributions from the community help make the Evara UI library and design system more comprehensive, stable, and helpful for everyone.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Table of Contents

- [Contributing to Evara UI](#contributing-to-evara-ui)
  - [Table of Contents](#table-of-contents)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Documentation Improvements](#documentation-improvements)
    - [Pull Requests](#pull-requests)
  - [Development Setup](#development-setup)
    - [Prerequisites](#prerequisites)
    - [Setting Up Your Workspace](#setting-up-your-workspace)
    - [Development Commands](#development-commands)
  - [Style \& Code Guidelines](#style--code-guidelines)
    - [TypeScript Coding Style](#typescript-coding-style)
    - [Component Best Practices](#component-best-practices)
    - [Commit Messages](#commit-messages)
  - [Testing](#testing)
    - [Writing Unit Tests](#writing-unit-tests)
  - [Security Vulnerabilities](#security-vulnerabilities)

---

## How Can I Contribute?

### Reporting Bugs

We use structured GitHub Issue Forms to track bug reports. Before submitting a bug report, please:

1. Check the existing issues to ensure it hasn't been reported or resolved already.
2. Verify that it is reproducible on clean, un-customized workspace builds.
3. Open a GitHub Issue and fill out the form completely, including:
   - Project version
   - OS information (Windows, macOS, Linux)
   - Step-by-step instructions to reproduce the issue
   - Screenshots or error stack traces if applicable

### Suggesting Enhancements

If you have ideas for new components, utility functions, or style declarations:

1. Search the issues to verify your suggestion hasn't been discussed before.
2. Open a Feature Request describing the functionality, the problem it solves, and how it might be implemented.

### Documentation Improvements

If you find inaccurate information, typos, or outdated content in documentation:

Please open a Documentation Issue or submit a pull request with your improvements.

### Pull Requests

To submit code changes:

1. **Fork** the repository and create your branch from `main` (e.g., `feature/your-feature-name` or `bugfix/issue-description`).
2. Make your changes, keeping them focused. Avoid unrelated changes.
3. Write clean, readable code following our guidelines.
4. Ensure your changes compile, lint cleanly, and pass all tests locally.
5. Submit a Pull Request (PR) with a clear description of the changes and references to any related issues.

---

## Development Setup

This project is built with **TypeScript**, **PNPM**, and **Turborepo**.

### Prerequisites

- **Node.js** 22.0.0 or higher: Ensure you have Node.js installed.
- **PNPM** 10.0.0 or higher: We use PNPM for package workspace dependency management.
- **Git**: Installed and configured on your system.

### Setting Up Your Workspace

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BleckWolf25/Evara-UI.git
   cd Evara-UI
   ```

2. **Install monorepo dependencies:**

   ```bash
   pnpm install
   ```

### Development Commands

Use the following PNPM commands in your project root:

- **Start all showcases and documentation locally:**

  ```bash
  pnpm dev
  ```

- **Compile and package all workspaces:**

  ```bash
  pnpm build
  ```

- **Run all automated tests:**

  ```bash
  pnpm test
  ```

- **Run ESLint checks:**

  ```bash
  pnpm lint
  ```

---

## Style & Code Guidelines

### TypeScript Coding Style

To keep the codebase uniform and easy to read:

- **Indentation:** Use 2 spaces for indentation. Do not use tabs.
- **Naming Conventions:**
  - Classes, Interfaces, and Types: `PascalCase`
  - Methods and Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
- **Braces:** Use standard Egyptian brackets style:

  ```typescript
  export function exampleMethod() {
    if (condition) {
      // code
    } else {
      // code
    }
  }
  ```

- **Comments:** Add JSDoc-style comments to public component classes, helpers, and complex state machine handlers.

### Component Best Practices

- **Headless Controllers:** Keep state and accessibility logic inside `@evara-ui/core` headless controllers, completely detached from JSX views.
- **Strict Typing:** Avoid `any` types. Provide explicit parameter and return typings, leveraging exact index signatures or mapped type constraints.
- **Design Tokens:** Always utilize CSS variables from `@evara-ui/styles` inside stylesheets to ensure clean theme injection.

### Commit Messages

Use clear and descriptive commit messages. We recommend using prefix tags for commits, such as:

- `feat: ...` for a new feature
- `fix: ...` for a bug fix
- `docs: ...` for documentation changes
- `refactor: ...` for code style or internal design changes
- `style: ...` for formatting fixes
- `test: ...` for adding or updating tests
- `chore: ...` for maintenance tasks

Example:

```text
feat: add custom alert dialog polymorphic element support
```

---

## Testing

This project uses **Vitest** for unit and integration testing and **Playwright** for end-to-end browser testing.

### Writing Unit Tests

- Place test files alongside their respective components with a `.test.ts` or `.test.tsx` suffix.
- Test models, hook lifecycle events, and headless controller machines.
- Ensure any test setup isolates mock render contexts to guarantee test idempotency.

---

## Security Vulnerabilities

Please do not report security vulnerabilities in public issues. Refer to our [Security Policy](SECURITY.md) for instructions on how to report security issues privately.
