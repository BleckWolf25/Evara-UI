# Testing Guidelines

This document outlines testing standards, patterns, and expectations for the Evara UI monorepo. Testing is not optional, it's critical for maintaining code quality across a multi-framework library used by thousands of developers.

## Testing Philosophy

- **Test behavior, not implementation**: Focus on what the component does, not how it does it
- **Fast feedback**: Tests should run in milliseconds
- **Realistic scenarios**: Test as users would interact with code
- **SSR awareness**: Verify components work in both server and browser contexts
- **Accessibility first**: All components must be accessible by default

## Test Framework Stack

| Tool                      | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| **Vitest**                | Test runner (Vite-native, fast, ESM-first) |
| **Vue Test Utils**        | Vue component testing                      |
| **React Testing Library** | React component testing                    |
| **Vitest UI**             | Visual test dashboard (optional)           |

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in specific package
pnpm --filter=@evara/vue test

# Watch mode during development
pnpm test --watch

# Run with coverage report
pnpm test --coverage

# Run UI dashboard
pnpm test --ui
```

## Test File Organization

```zsh
packages/vue/src/
├── components/
│   ├── Button/
│   │   ├── Button.vue
│   │   ├── Button.types.ts
│   │   └── __tests__/
│   │       ├── Button.spec.ts          # Unit tests
│   │       ├── Button.accessibility.spec.ts # A11y tests
│   │       └── Button.integration.spec.ts   # Integration tests
│   └── Input/
│       ├── Input.vue
│       └── __tests__/
│           └── Input.spec.ts
```

**Rule**: Every `.vue` or `.tsx` file gets a corresponding `__tests__/` directory with `.spec.ts` files.

## Coverage Requirements

Minimum coverage thresholds (enforced in CI/CD):

| Metric         | Threshold | Rationale                       |
| -------------- | --------- | ------------------------------- |
| **Statements** | 80%       | Most code paths covered         |
| **Branches**   | 75%       | Complex logic well-tested       |
| **Functions**  | 80%       | All public functions tested     |
| **Lines**      | 80%       | Overall code execution coverage |

Components in core libraries (Button, Input, etc.) should aim for **90%+** coverage.

## Test Structure

Use the AAA (Arrange, Act, Assert) pattern:

```typescript
describe('Button', () => {
  it('emits click event when clicked', async () => {
    // ARRANGE: Set up the test
    const wrapper = mount(Button, {
      props: { variant: 'primary' },
    });

    // ACT: Perform the action
    await wrapper.find('button').trigger('click');

    // ASSERT: Verify the result
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
```

## Unit Testing Components

### Vue Components

```typescript
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Button from '../Button.vue';
import type { ButtonProps } from '../Button.types';

describe('Button', () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {
      variant: 'primary',
      size: 'md',
      disabled: false,
    };
  });

  describe('Rendering', () => {
    it('renders slot content', () => {
      const wrapper = mount(Button, {
        props,
        slots: { default: 'Click me' },
      });
      expect(wrapper.text()).toBe('Click me');
    });

    it('applies correct CSS classes for variant', () => {
      const wrapper = mount(Button, {
        props: { ...props, variant: 'danger' },
      });
      expect(wrapper.find('button').classes()).toContain('ui-button--danger');
    });

    it('applies size class', () => {
      const wrapper = mount(Button, {
        props: { ...props, size: 'lg' },
      });
      expect(wrapper.find('button').classes()).toContain('ui-button--lg');
    });
  });

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(Button, { props });
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('does not emit click when disabled', async () => {
      const wrapper = mount(Button, {
        props: { ...props, disabled: true },
      });
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('does not emit click when loading', async () => {
      const wrapper = mount(Button, {
        props: { ...props, loading: true },
      });
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });
  });

  describe('States', () => {
    it('displays loading spinner when loading', () => {
      const wrapper = mount(Button, {
        props: { ...props, loading: true },
      });
      expect(wrapper.find('.ui-button__spinner').exists()).toBe(true);
    });

    it('disables button element when disabled', () => {
      const wrapper = mount(Button, {
        props: { ...props, disabled: true },
      });
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });

    it('applies fullWidth class when fullWidth is true', () => {
      const wrapper = mount(Button, {
        props: { ...props, fullWidth: true },
      });
      expect(wrapper.find('button').classes()).toContain('ui-button--full-width');
    });
  });

  describe('ARIA Attributes', () => {
    it('sets aria-disabled when disabled', () => {
      const wrapper = mount(Button, {
        props: { ...props, disabled: true },
      });
      expect(wrapper.find('button').attributes('aria-disabled')).toBe('true');
    });

    it('sets aria-busy when loading', () => {
      const wrapper = mount(Button, {
        props: { ...props, loading: true },
      });
      expect(wrapper.find('button').attributes('aria-busy')).toBe('true');
    });

    it('sets proper role attribute', () => {
      const wrapper = mount(Button, { props });
      expect(wrapper.find('button').attributes('role')).toBe('button');
    });

    it('sets appropriate tabIndex', () => {
      const wrapper = mount(Button, {
        props: { ...props, disabled: true },
      });
      expect(wrapper.find('button').attributes('tabindex')).toBe('-1');
    });
  });
});
```

### React Components

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  let props: React.ComponentProps<typeof Button>;

  beforeEach(() => {
    props = {
      variant: 'primary',
      size: 'md',
      disabled: false,
    };
  });

  describe('Rendering', () => {
    it('renders button text', () => {
      render(<Button {...props}>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies variant class', () => {
      render(<Button {...props} variant="danger">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-button--danger');
    });

    it('applies size class', () => {
      render(<Button {...props} size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ui-button--lg');
    });
  });

  describe('Events', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button {...props} onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button {...props} disabled onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('ARIA Attributes', () => {
    it('sets aria-disabled when disabled', () => {
      render(<Button {...props} disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets aria-busy when loading', () => {
      render(<Button {...props} loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });
  });
});
```

## Accessibility Testing

Every component must include accessibility tests:

```typescript
describe('Button Accessibility', () => {
  it('is keyboard accessible', async () => {
    const wrapper = mount(Button, { props });
    const button = wrapper.find('button');

    // Button should be focusable
    expect(
      button.element === document.activeElement || button.attributes('tabindex') !== '-1',
    ).toBe(true);
  });

  it('supports keyboard interaction', async () => {
    const wrapper = mount(Button, { props });
    const button = wrapper.find('button');

    // Simulate spacebar press
    await button.trigger('keydown', { key: ' ', code: 'Space' });
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('announces disabled state to screen readers', () => {
    const wrapper = mount(Button, {
      props: { ...props, disabled: true },
    });
    expect(wrapper.find('button').attributes('aria-disabled')).toBe('true');
  });

  it('announces loading state to screen readers', () => {
    const wrapper = mount(Button, {
      props: { ...props, loading: true },
    });
    expect(wrapper.find('button').attributes('aria-busy')).toBe('true');
  });

  it('has descriptive text', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Submit Form' },
    });
    // Button text should be meaningful
    expect(wrapper.text()).not.toBe('Button');
    expect(wrapper.text()).not.toBe('Click');
  });
});
```

## SSR Testing (Critical for Nuxt/Next.js)

Test that components don't break during server-side rendering:

```typescript
/**
 * SSR Safety Tests
 * Verify that components don't access window/document during setup
 */
describe('Button SSR Safety', () => {
  it('does not access window during setup', () => {
    // In SSR environment, window is undefined
    const originalWindow = global.window;
    // @ts-expect-error - Intentionally undefined for test
    delete (global as any).window;

    // Should not throw
    expect(() => {
      mount(Button, { props });
    }).not.toThrow();

    // Restore window
    (global as any).window = originalWindow;
  });

  it('generates deterministic IDs', () => {
    const wrapper1 = mount(Button, { props });
    const wrapper2 = mount(Button, { props });

    const id1 = wrapper1.find('button').attributes('id');
    const id2 = wrapper2.find('button').attributes('id');

    // IDs should be deterministic (not random)
    // This prevents hydration mismatches
    expect(id1).toBe(id2);
  });

  it('does not use Math.random() for IDs', () => {
    const wrapper = mount(Button, { props });
    const id = wrapper.find('button').attributes('id');

    // ID should use a counter or static generation, not Math.random()
    expect(id).toMatch(/^button-\d+$/);
  });
});
```

## Integration Testing

Test component interactions across multiple components:

```typescript
describe('Button Integration', () => {
  it('works within a form submission flow', async () => {
    const onSubmit = vi.fn();
    const wrapper = mount({
      components: { Button },
      template: `
        <form @submit.prevent="onSubmit">
          <Button type="submit">Submit</Button>
        </form>
      `,
      methods: { onSubmit },
    });

    await wrapper.find('button').trigger('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('responds to prop changes', async () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' },
    });

    expect(wrapper.find('button').classes()).toContain('ui-button--primary');

    // Update variant
    await wrapper.setProps({ variant: 'danger' });
    expect(wrapper.find('button').classes()).toContain('ui-button--danger');
    expect(wrapper.find('button').classes()).not.toContain('ui-button--primary');
  });
});
```

## Snapshot Testing (Use Sparingly)

Snapshots are useful for markup but should not be the primary test:

```typescript
it('renders consistent markup', () => {
  const wrapper = mount(Button, {
    props: { variant: 'primary', size: 'md' },
    slots: { default: 'Click me' },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
```

**⚠️ Warning**: Only use snapshots for HTML markup. Never snapshot entire objects or deeply nested structures, as snapshot diffs become unreadable.

## Testing Best Practices

### ✅ DO

- Test user-facing behavior (clicks, typing, navigation)
- Write descriptive test names that explain what should happen
- Use `beforeEach` to reduce setup boilerplate
- Test edge cases (empty state, error state, loading state)
- Mock external dependencies (APIs, localStorage, etc.)
- Test accessibility alongside functionality

### ❌ DON'T

- Test implementation details (internal state, private methods)
- Write tests that depend on CSS classes (they change)
- Test third-party library behavior (trust it works)
- Skip accessibility testing
- Write tests that are slower than the code they test
- Test unrelated functionality in one test

### Example: Good vs Bad

```typescript
// ❌ BAD: Tests implementation
it('sets internal isHovered state to true on hover', () => {
  const wrapper = mount(Button);
  wrapper.vm.isHovered = true;
  expect(wrapper.vm.isHovered).toBe(true);
});

// ✅ GOOD: Tests behavior
it('applies hover styles when hovered', async () => {
  const wrapper = mount(Button);
  await wrapper.trigger('mouseenter');
  expect(wrapper.classes()).toContain('is-hovered');
});

// ❌ BAD: Tests CSS classes directly
it('has ui-button class', () => {
  const wrapper = mount(Button);
  expect(wrapper.find('button').classes('ui-button')).toBe(true);
});

// ✅ GOOD: Tests semantic role
it('is accessible as a button', () => {
  const wrapper = mount(Button);
  expect(wrapper.find('[role="button"]').exists()).toBe(true);
});
```

## Mocking

### API Calls

```typescript
import { vi } from 'vitest';

it('handles API errors gracefully', async () => {
  const mockFetch = vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

  const wrapper = mount(MyComponent);
  await wrapper.vm.$nextTick();

  expect(wrapper.text()).toContain('Error');
  mockFetch.mockRestore();
});
```

### Local Storage

```typescript
it('persists state to localStorage', () => {
  const store = new Map();
  vi.spyOn(window.localStorage, 'setItem').mockImplementation((key, value) => {
    store.set(key, value);
  });

  // Test code...

  expect(store.get('theme')).toBe('dark');
});
```

## Debugging Tests

```typescript
// Print component HTML
wrapper.html();

// Print component state
wrapper.vm;

// Print emitted events
wrapper.emitted();

// Get rendered text
wrapper.text();

// Check if element exists
wrapper.find('.selector').exists();
```

Use Vitest UI for visual debugging:

```bash
pnpm test --ui
```

## CI/CD Integration

Tests run automatically on:

1. **Pre-commit**: Husky runs `pnpm test` on staged files
2. **Pull Request**: Full test suite with coverage report
3. **Pre-release**: All tests must pass before publishing to NPM

## Common Test Patterns

### Testing Slots

```typescript
it('renders slot content', () => {
  const wrapper = mount(Card, {
    slots: {
      header: 'Card Header',
      default: 'Card Body',
      footer: 'Card Footer',
    },
  });

  expect(wrapper.text()).toContain('Card Header');
  expect(wrapper.text()).toContain('Card Body');
  expect(wrapper.text()).toContain('Card Footer');
});
```

### Testing Event Emissions

```typescript
it('emits custom events', async () => {
  const wrapper = mount(Form);
  wrapper.vm.$emit('submit', { field: 'value' });

  const emitted = wrapper.emitted('submit');
  expect(emitted).toHaveLength(1);
  expect(emitted?.[0]).toEqual([{ field: 'value' }]);
});
```

### Testing Watchers

```typescript
it('responds to prop changes via watchers', async () => {
  const wrapper = mount(Component, {
    props: { value: 'initial' },
  });

  await wrapper.setProps({ value: 'updated' });
  expect(wrapper.vm.processedValue).toBe('updated');
});
```

## Coverage Reports

View coverage after running tests:

```bash
pnpm test --coverage
```

This generates:

- Terminal summary
- HTML report in `coverage/index.html`
- LCOV data for CI/CD integration

Aim for **green coverage** (high percentage) but prioritize meaningful tests over coverage numbers.
