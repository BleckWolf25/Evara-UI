# Component File Patterns & Structure

This document defines the **exact file structure and naming convention** for all UI components in Evara UI. This standardization ensures consistency, predictability, and maintainability across the monorepo.

## Component File Structure

Every component follows this standardized file structure:

### File Organization

```zsh
packages/react/src/components/Button/
├── Button.types.ts         # TypeScript type definitions (required)
├── Button.tsx              # React component implementation (required)
├── Button.constants.ts     # Constants & configuration (required*)
├── Button.css              # Component-specific styles (optional)
├── Button.storybook.ts     # Storybook stories & examples (required)
└── Button.test.tsx         # Unit tests (required)
```

```zsh
packages/vue/src/components/Button/
├── Button.types.ts         # Shared TypeScript types (required)
├── Button.vue              # Vue component implementation (required)
├── Button.constants.ts     # Constants & configuration (required*)
├── Button.css              # Component-specific styles (optional)
├── Button.storybook.ts     # Storybook stories & examples (required)
└── Button.test.ts          # Unit tests (required)
```

**Required**: Must be present for every component
**Required\***: Required unless the component has no constants to define
**Optional**: Only if the component needs scoped styles

## File Specifications

### 1. `Component.types.ts` (Required)

**Purpose**: Single source of truth for all TypeScript type definitions.

Contains all interfaces, types, and enums used by the component.

#### React Button Example

```typescript
// packages/react/src/components/Button/Button.types.ts

/**
 * Props for the Button component.
 *
 * @interface ButtonProps
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Button size.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button shows a loading state.
   * Prevents clicks and shows spinner.
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the button should take full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Custom class name to append to the button.
   */
  className?: string;

  /**
   * Click event handler.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Internal state managed by ButtonController.
 */
export interface ButtonState {
  isPressed: boolean;
  isFocused: boolean;
  isHovered: boolean;
}
```

#### Vue Button Example

```typescript
// packages/vue/src/components/Button/Button.types.ts

/**
 * Props for the Button component.
 *
 * @interface ButtonProps
 */
export interface ButtonProps {
  /**
   * Visual style variant of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Button size.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button shows a loading state.
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the button should take full width.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Custom CSS class name.
   */
  class?: string;
}

/**
 * Internal state for button behavior.
 */
export interface ButtonState {
  isPressed: boolean;
  isFocused: boolean;
  isHovered: boolean;
}
```

#### Guidelines

- **Export all public types**: Users need these for proper typing
- **Document each prop**: Use JSDoc comments explaining purpose and defaults
- **Extend native types**: React components extend `HTMLButtonElement`, etc.
- **Keep types focused**: Only types used by this component
- **Shared types in core**: For multi-framework types, define in `@evara/core`

### 2. `Component.tsx` or `Component.vue` (Required)

**Purpose**: The actual component implementation.

#### React Button Implementation

````typescript
// packages/react/src/components/Button/Button.tsx

import { forwardRef } from 'react';
import { ButtonController } from '@evara/core';
import type { ButtonProps } from './Button.types';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants';
import './Button.css';

/**
 * A flexible, accessible button component with multiple variants and states.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button variant="danger" loading>
 *   Deleting...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    // Validate props
    if (!BUTTON_VARIANTS.includes(variant)) {
      throw new Error(`Invalid variant: ${variant}`);
    }
    if (!BUTTON_SIZES.includes(size)) {
      throw new Error(`Invalid size: ${size}`);
    }

    const controller = new ButtonController({
      variant,
      size,
      disabled,
      loading,
      fullWidth,
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={`${controller.getClassNames()} ${className || ''}`}
        disabled={disabled || loading}
        {...controller.getAriaAttributes()}
        onClick={handleClick}
        {...props}
      >
        {loading && <span className="ui-button__spinner" aria-hidden />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
````

#### Vue Button Implementation

```vue
<!-- packages/vue/src/components/Button/Button.vue -->

<script setup lang="ts">
import { computed } from 'vue';
import { ButtonController } from '@evara/core';
import type { ButtonProps } from './Button.types';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants';
import './Button.css';

/**
 * A flexible, accessible button component with multiple variants and states.
 */
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Validate props
if (!BUTTON_VARIANTS.includes(props.variant)) {
  throw new Error(`Invalid variant: ${props.variant}`);
}
if (!BUTTON_SIZES.includes(props.size)) {
  throw new Error(`Invalid size: ${props.size}`);
}

const controller = new ButtonController({
  variant: props.variant,
  size: props.size,
  disabled: props.disabled,
  loading: props.loading,
  fullWidth: props.fullWidth,
});

const buttonClasses = computed(() => controller.getClassNames());
const ariaAttributes = computed(() => controller.getAriaAttributes());

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};
</script>

<template>
  <button
    :class="[buttonClasses, $attrs.class]"
    :disabled="disabled || loading"
    v-bind="ariaAttributes"
    @click="handleClick"
  >
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
```

#### Implementation Guidelines

- **Use constants for validation**: Import from `.constants.ts`
- **Wrap core logic**: Use controllers from `@evara/core`
- **Forward refs (React)**: Always forward refs for native elements
- **Export with display name (React)**: Helps with debugging
- **JSDoc on component**: Explain what it does, include examples
- **Handle loading state**: Disable clicks, show spinner
- **Accessibility first**: Use controller's aria attributes
- **Import styles**: Always import CSS file
- **Compose, don't duplicate**: Use core controllers

### 3. `Component.constants.ts` (Required\*)

**Purpose**: Configuration, allowed values, and magic numbers.

Use when the component has enums, lists of allowed values, or configuration.

#### Button Constants Example

```typescript
// packages/react/src/components/Button/Button.constants.ts

/**
 * Valid button variants.
 * These must match design tokens in @evara/styles.
 */
export const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/**
 * Valid button sizes.
 */
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

export type ButtonSize = (typeof BUTTON_SIZES)[number];

/**
 * CSS class mappings for variants.
 * Used by ButtonController to generate correct class names.
 */
export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'ui-button--primary',
  secondary: 'ui-button--secondary',
  ghost: 'ui-button--ghost',
  danger: 'ui-button--danger',
};

/**
 * CSS class mappings for sizes.
 */
export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'ui-button--sm',
  md: 'ui-button--md',
  lg: 'ui-button--lg',
};

/**
 * Padding tokens for different sizes.
 */
export const BUTTON_PADDING: Record<ButtonSize, string> = {
  sm: 'var(--ui-button-padding-sm)',
  md: 'var(--ui-button-padding-md)',
  lg: 'var(--ui-button-padding-lg)',
};

/**
 * Focus styles and accessibility settings.
 */
export const BUTTON_A11Y = {
  FOCUS_OUTLINE_OFFSET: '2px',
  MIN_TAP_TARGET: '44px', // WCAG guideline
} as const;
```

#### When to Create `constants.ts`

✅ **Create if**:

- Component has enum values (variants, sizes, states)
- Component has configuration lists (allowed props)
- Component has magic numbers or strings
- Component has class mappings or style configurations

❌ **Skip if**:

- Component has no variants, sizes, or configurations
- All values are simple defaults

#### Example: Simple Component (No Constants)

```zsh
packages/react/src/components/Divider/
├── Divider.types.ts       # Just a simple interface
├── Divider.tsx            # Simple component
├── Divider.css            # Just styling
├── Divider.storybook.ts   # Stories
└── Divider.test.tsx       # Tests
# NO Divider.constants.ts needed
```

### 4. `Component.css` (Optional)

**Purpose**: Component-specific scoped styles.

Only create if the component has styles that aren't covered by design tokens.

#### Good Use of Component CSS

```css
/* packages/react/src/components/Button/Button.css */

/**
 * Button base styles.
 * All colors, spacing, and sizing are driven by CSS variables
 * defined in @evara/styles.
 */
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ui-space-2);
  padding: var(--ui-button-padding-md);
  border-radius: var(--ui-button-radius);
  border: 1px solid transparent;
  font-family: var(--ui-font-family);
  font-size: var(--ui-button-font-size);
  font-weight: var(--ui-button-font-weight);
  cursor: pointer;
  user-select: none;
  transition: all var(--ui-duration-fast) var(--ui-easing-ease-in-out);
}

/**
 * Primary variant - main call-to-action buttons.
 */
.ui-button--primary {
  background-color: var(--ui-color-primary);
  color: white;
  border-color: var(--ui-color-primary);
}

.ui-button--primary:hover:not(:disabled) {
  background-color: var(--ui-color-primary-hover);
  border-color: var(--ui-color-primary-hover);
}

/**
 * Size variants.
 */
.ui-button--sm {
  padding: var(--ui-button-padding-sm);
}

.ui-button--lg {
  padding: var(--ui-button-padding-lg);
}

/**
 * Loading spinner.
 */
.ui-button__spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/**
 * Disabled state.
 */
.ui-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/**
 * Focus state (accessibility).
 */
.ui-button:focus-visible {
  outline: 2px solid var(--ui-color-border-focus);
  outline-offset: 2px;
}
```

#### CSS Guidelines

- **Use CSS variables**: Never hardcode colors/spacing
- **BEM-like naming**: `.ui-button`, `.ui-button--primary`, `.ui-button__spinner`
- **No component-scoped CSS** (like CSS modules): This library is used in many apps
- **Import in component**: `import './Button.css'`
- **Keep styles focused**: Only styles for this component

#### When to Avoid Component CSS

If the component only uses design tokens and has no custom styling, skip the CSS file:

```typescript
// Simple component = no custom CSS needed
export const Badge = ({ children, variant }) => (
  <span className={`ui-badge ui-badge--${variant}`}>
    {children}
  </span>
);
```

Styles come from `@evara/styles/components/badge.css`.

### 5. `Component.storybook.ts` (Required)

**Purpose**: Interactive documentation, examples, and testing.

Every component must have Storybook stories.

#### Button Storybook Example

```typescript
// packages/react/src/components/Button/Button.storybook.ts

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

/**
 * A flexible, accessible button component.
 *
 * - Supports multiple variants (primary, secondary, ghost, danger)
 * - Multiple sizes (sm, md, lg)
 * - Loading and disabled states
 * - Full keyboard and screen reader support
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button shows a loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary variant for main call-to-action buttons.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Click me',
  },
};

/**
 * Secondary variant for less prominent actions.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

/**
 * Ghost variant for subtle actions.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

/**
 * Danger variant for destructive actions.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

/**
 * All size variants.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Loading state with spinner.
 */
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

/**
 * Full width button.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Keyboard navigation example.
 * Tab to focus, Space/Enter to click.
 */
export const KeyboardAccessible: Story = {
  args: {
    children: 'Try tabbing and pressing Space',
  },
};

/**
 * Real-world form submission example.
 */
export const FormSubmit: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      >
        <input type="text" placeholder="Your name" required />
        <Button type="submit" loading={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    );
  },
};
```

#### Storybook Guidelines

- **One story per variant/state**: `Primary`, `Secondary`, `Loading`, etc.
- **Render examples realistically**: Show how users would use it
- **Document interaction**: Keyboard support, form integration
- **Set up controls**: Let people interact with props in Storybook UI
- **Include accessibility**: Demonstrate keyboard support
- **Add descriptions**: Explain what each story demonstrates

### 6. `Component.test.tsx` or `Component.test.ts` (Required)

**Purpose**: Comprehensive unit and integration tests.

See [TESTING.md](./TESTING.md) for detailed test patterns.

#### Minimal Button Test Suite

```typescript
// packages/react/src/components/Button/Button.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders button text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies variant class', () => {
      render(<Button variant="danger">Delete</Button>);
      expect(screen.getByRole('button')).toHaveClass('ui-button--danger');
    });

    it('applies size class', () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('ui-button--lg');
    });
  });

  describe('Events', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Click
        </Button>,
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      // Tab to focus
      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();

      // Space to click
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
```

## Summary: File Checklist

Before submitting a component PR, verify:

- ✅ `Component.types.ts` - All props and internal types documented
- ✅ `Component.tsx/.vue` - Implementation using controllers, constants, types
- ✅ `Component.constants.ts` - All variants, sizes, and enums (if applicable)
- ✅ `Component.css` - Optional, only if custom styling needed
- ✅ `Component.storybook.ts` - Multiple stories covering all states and variants
- ✅ `Component.test.tsx/.ts` - Comprehensive test coverage (80%+ statements)

## File Import Paths

Follow this order when importing within a component file:

```typescript
// 1. React/Vue framework
import { forwardRef } from 'react';
import { computed } from 'vue';

// 2. Core logic
import { ButtonController } from '@evara/core';

// 3. Types (relative)
import type { ButtonProps } from './Button.types';

// 4. Constants (relative)
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants';

// 5. Styles (relative)
import './Button.css';
```

## Framework Differences

### React

```typescript
// File: Button.tsx
// Component must use forwardRef for native element access
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {});
Button.displayName = 'Button'; // For DevTools
```

### Vue

```vue
<!-- File: Button.vue -->
<!-- Use <script setup> for composition API -->
<script setup lang="ts">
// Types and implementation
</script>

<template>
  <!-- Template here -->
</template>
```

## Exceptions

**When can you deviate?**

- `Component.types.ts`: Never, types are required
- `Component.tsx/.vue`: Never, implementation is required
- `Component.constants.ts`: Skip if component has no variants/enums
- `Component.css`: Skip if component only uses design tokens
- `Component.storybook.ts`: Never, documentation is required
- `Component.test.tsx`: Never, tests are required

All deviations must be justified in code comments.
