# @bleckwolf25/core

> Framework-agnostic headless state controllers and native HTML Custom Elements for Evara UI.

`@bleckwolf25/core` is the core foundation of Evara UI. It provides headless component state machines, accessibility ARIA builders, and native Web Component Custom Elements with zero framework dependencies.

## 📦 Installation

```bash
npm install @bleckwolf25/core
# or
pnpm add @bleckwolf25/core
```

## 🚀 Usage

### 1. Headless Controllers

Use headless controllers to power custom UI components with robust state and ARIA attributes:

```typescript
import { ButtonController } from '@bleckwolf25/core'

const button = new ButtonController({
  variant: 'primary',
  size: 'md',
  disabled: false
})

console.log(button.getClassNames()) // "ui-button ui-button--primary ui-button--md"
console.log(button.getAriaAttributes()) // { role: 'button', 'aria-disabled': false }
```

### 2. Native Web Components (Custom Elements)

Register native Web Components for standalone HTML applications:

```typescript
import '@bleckwolf25/core/custom-elements'
```

```html
<evara-button variant="primary" size="md">
  Click Me
</evara-button>

<evara-alert variant="warning">
  This is a web component alert!
</evara-alert>
```

## 📄 License

MIT License © BleckWolf25
