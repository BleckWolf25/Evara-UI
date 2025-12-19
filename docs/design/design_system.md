# Design System & Theming

This document defines the visual design language, design tokens, and theming strategy for Evara UI.

## Design Philosophy

Evara UI follows a **modern, flexible design system** with:

- **Modern baseline**: Clean, minimal aesthetic as default
- **Flexible theming**: Users can choose from built-in themes (modern, minimal, enterprise)
- **Customizable**: CSS variables allow overrides without rebuilding
- **Dark mode**: First-class support with automatic detection
- **Accessible**: WCAG AA compliant by default

## Design Tokens

Design tokens are the single source of truth for all colors, spacing, typography, and other visual properties.

### Token Structure

Tokens are organized in **three layers**:

```graph
Global Tokens (Brand colors, spacing scale)
      ↓
Semantic Tokens (Semantic meaning: primary, danger, etc.)
      ↓
Component Tokens (Component-specific sizes and spacing)
```

### CSS Variables Organization

All tokens are CSS variables with a consistent naming pattern:

```css
/* 1. GLOBAL TOKENS (Brand foundation) */
--ui-color-neutral-50: #f9fafb;
--ui-color-neutral-100: #f3f4f6;
--ui-color-neutral-900: #111827;

--ui-color-blue-50: #eff6ff;
--ui-color-blue-500: #3b82f6;
--ui-color-blue-600: #2563eb;

--ui-space-1: 0.25rem;   /* 4px */
--ui-space-2: 0.5rem;    /* 8px */
--ui-space-3: 0.75rem;   /* 12px */
--ui-space-4: 1rem;      /* 16px */
--ui-space-5: 1.5rem;    /* 24px */
--ui-space-6: 2rem;      /* 32px */

--ui-font-size-xs: 0.75rem;
--ui-font-size-sm: 0.875rem;
--ui-font-size-base: 1rem;
--ui-font-size-lg: 1.125rem;

--ui-font-weight-normal: 400;
--ui-font-weight-medium: 500;
--ui-font-weight-semibold: 600;
--ui-font-weight-bold: 700;

--ui-radius-sm: 0.25rem;
--ui-radius-base: 0.375rem;
--ui-radius-md: 0.5rem;
--ui-radius-lg: 0.75rem;

--ui-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--ui-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--ui-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--ui-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

--ui-duration-fast: 150ms;
--ui-duration-base: 200ms;
--ui-duration-slow: 300ms;

--ui-easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--ui-easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--ui-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* 2. SEMANTIC TOKENS (Semantic meaning) */
--ui-color-primary: var(--ui-color-blue-500);
--ui-color-primary-hover: var(--ui-color-blue-600);
--ui-color-secondary: var(--ui-color-neutral-600);
--ui-color-secondary-hover: var(--ui-color-neutral-700);
--ui-color-danger: #ef4444;
--ui-color-danger-hover: #dc2626;
--ui-color-success: #10b981;
--ui-color-warning: #f59e0b;
--ui-color-info: #0ea5e9;

--ui-color-bg-primary: var(--ui-color-neutral-50);
--ui-color-bg-secondary: white;
--ui-color-text-primary: var(--ui-color-neutral-900);
--ui-color-text-secondary: var(--ui-color-neutral-600);
--ui-color-text-disabled: var(--ui-color-neutral-400);

--ui-color-border-primary: var(--ui-color-neutral-200);
--ui-color-border-secondary: var(--ui-color-neutral-300);

/* 3. COMPONENT TOKENS (Component-specific) */
--ui-button-padding-sm: var(--ui-space-2) var(--ui-space-3);
--ui-button-padding-md: var(--ui-space-3) var(--ui-space-4);
--ui-button-padding-lg: var(--ui-space-4) var(--ui-space-6);

--ui-button-radius: var(--ui-radius-base);
--ui-button-font-size: var(--ui-font-size-base);
--ui-button-font-weight: var(--ui-font-weight-medium);

--ui-input-padding: var(--ui-space-2) var(--ui-space-3);
--ui-input-radius: var(--ui-radius-base);
--ui-input-border-width: 1px;
--ui-input-border-color: var(--ui-color-border-primary);
--ui-input-bg: white;

--ui-modal-overlay-bg: rgba(0, 0, 0, 0.5);
--ui-modal-radius: var(--ui-radius-lg);
--ui-modal-shadow: var(--ui-shadow-lg);
```

### Design Token File Structure

```zsh
packages/styles/src/
├── tokens/
│   ├── colors.css        # Color palette (global + semantic)
│   ├── spacing.css       # Spacing scale
│   ├── typography.css    # Font sizes, weights, families
│   ├── shadows.css       # Shadow values
│   ├── radius.css        # Border radius values
│   ├── motion.css        # Duration & easing functions
│   └── index.css         # Import all tokens
├── components/
│   ├── button.css
│   ├── input.css
│   ├── modal.css
│   └── ...
├── themes/
│   ├── light.css         # Light theme (default)
│   ├── dark.css          # Dark theme
│   ├── modern.css        # Modern variant (default)
│   ├── minimal.css       # Minimal variant
│   └── enterprise.css    # Enterprise variant
└── index.css
```

## Color System

### Color Palette

The modern design uses a carefully curated palette with intentional hierarchy:

#### Neutrals (Grays)

Used for backgrounds, borders, and secondary text.

```css
--ui-color-neutral-50: #f9fafb;    /* Lightest background */
--ui-color-neutral-100: #f3f4f6;   /* Light background */
--ui-color-neutral-200: #e5e7eb;   /* Light border */
--ui-color-neutral-300: #d1d5db;   /* Border */
--ui-color-neutral-400: #9ca3af;   /* Tertiary text */
--ui-color-neutral-500: #6b7280;   /* Secondary placeholder */
--ui-color-neutral-600: #4b5563;   /* Secondary text */
--ui-color-neutral-700: #374151;   /* Primary text alternative */
--ui-color-neutral-800: #1f2937;   /* Dark text */
--ui-color-neutral-900: #111827;   /* Darkest text */
```

#### Primary Blue (Core Brand Color)

```css
--ui-color-blue-50: #eff6ff;
--ui-color-blue-100: #dbeafe;
--ui-color-blue-200: #bfdbfe;
--ui-color-blue-300: #93c5fd;
--ui-color-blue-400: #60a5fa;
--ui-color-blue-500: #3b82f6;    /* Primary action */
--ui-color-blue-600: #2563eb;    /* Primary hover */
--ui-color-blue-700: #1d4ed8;    /* Primary active */
```

#### Status Colors

```css
--ui-color-success: #10b981;      /* Positive/success actions */
--ui-color-warning: #f59e0b;      /* Caution/warning states */
--ui-color-danger: #ef4444;       /* Destructive/error actions */
--ui-color-info: #0ea5e9;         /* Informational messages */
```

### Color Usage Guidelines

```css
/* BACKGROUNDS */
--ui-color-bg-primary: var(--ui-color-neutral-50);    /* Page bg */
--ui-color-bg-secondary: white;                        /* Cards, modals */
--ui-color-bg-hover: var(--ui-color-neutral-100);     /* Hover states */

/* TEXT */
--ui-color-text-primary: var(--ui-color-neutral-900);     /* Main text */
--ui-color-text-secondary: var(--ui-color-neutral-600);   /* Secondary text */
--ui-color-text-muted: var(--ui-color-neutral-500);       /* Placeholders */
--ui-color-text-disabled: var(--ui-color-neutral-400);    /* Disabled text */

/* BORDERS */
--ui-color-border-primary: var(--ui-color-neutral-200);   /* Subtle borders */
--ui-color-border-secondary: var(--ui-color-neutral-300); /* Stronger borders */
--ui-color-border-focus: var(--ui-color-primary);         /* Focus rings */

/* INTERACTIVE */
--ui-color-action-primary: var(--ui-color-blue-500);
--ui-color-action-primary-hover: var(--ui-color-blue-600);
--ui-color-action-secondary: var(--ui-color-neutral-600);
--ui-color-action-secondary-hover: var(--ui-color-neutral-700);
```

## Spacing System

The spacing system uses a 4px base unit (rem-based for accessibility):

```css
/* Base unit = 0.25rem (4px) */
--ui-space-1: 0.25rem;   /* 4px  - Extra tight */
--ui-space-2: 0.5rem;    /* 8px  - Tight */
--ui-space-3: 0.75rem;   /* 12px - Compact */
--ui-space-4: 1rem;      /* 16px - Base/comfortable */
--ui-space-5: 1.5rem;    /* 24px - Loose */
--ui-space-6: 2rem;      /* 32px - Very loose */
--ui-space-8: 2.5rem;    /* 40px - Extra loose */
--ui-space-10: 3rem;     /* 48px - Very extra loose */
--ui-space-12: 4rem;     /* 64px - Massive */
```

### Component Spacing Examples

```css
/* Button padding (based on size) */
--ui-button-padding-sm: 0.5rem 0.75rem;    /* space-2 space-3 */
--ui-button-padding-md: 0.75rem 1rem;      /* space-3 space-4 */
--ui-button-padding-lg: 1rem 1.5rem;       /* space-4 space-5 */

/* Input padding */
--ui-input-padding: 0.5rem 0.75rem;        /* space-2 space-3 */

/* Card padding */
--ui-card-padding: 1.5rem;                 /* space-5 */

/* Modal content padding */
--ui-modal-padding: 2rem;                  /* space-6 */

/* Gap between elements */
--ui-gap-sm: 0.5rem;
--ui-gap-md: 1rem;
--ui-gap-lg: 1.5rem;
```

## Typography System

Modern, clear typography with intentional hierarchy:

```css
/* Font family */
--ui-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--ui-font-family-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;

/* Font sizes */
--ui-font-size-xs: 0.75rem;     /* 12px - Small labels */
--ui-font-size-sm: 0.875rem;    /* 14px - Secondary text */
--ui-font-size-base: 1rem;      /* 16px - Body text */
--ui-font-size-lg: 1.125rem;    /* 18px - Larger body */
--ui-font-size-xl: 1.25rem;     /* 20px - Section headers */
--ui-font-size-2xl: 1.5rem;     /* 24px - Page headers */
--ui-font-size-3xl: 1.875rem;   /* 30px - Major headers */

/* Font weights */
--ui-font-weight-normal: 400;
--ui-font-weight-medium: 500;
--ui-font-weight-semibold: 600;
--ui-font-weight-bold: 700;

/* Line heights */
--ui-line-height-tight: 1.25;
--ui-line-height-normal: 1.5;
--ui-line-height-relaxed: 1.75;
```

### Typography Usage

```css
/* Body text */
body {
  font-family: var(--ui-font-family);
  font-size: var(--ui-font-size-base);
  font-weight: var(--ui-font-weight-normal);
  line-height: var(--ui-line-height-normal);
  color: var(--ui-color-text-primary);
}

/* Headings */
h1 { font-size: var(--ui-font-size-3xl); font-weight: var(--ui-font-weight-bold); }
h2 { font-size: var(--ui-font-size-2xl); font-weight: var(--ui-font-weight-semibold); }
h3 { font-size: var(--ui-font-size-xl); font-weight: var(--ui-font-weight-semibold); }

/* Labels */
label {
  font-size: var(--ui-font-size-sm);
  font-weight: var(--ui-font-weight-medium);
}

/* Small text */
small {
  font-size: var(--ui-font-size-xs);
  color: var(--ui-color-text-secondary);
}
```

## Radius System

Consistent border radius with intentional hierarchy:

```css
--ui-radius-none: 0;
--ui-radius-sm: 0.25rem;      /* 4px  - Subtle */
--ui-radius-base: 0.375rem;   /* 6px  - Default */
--ui-radius-md: 0.5rem;       /* 8px  - Common */
--ui-radius-lg: 0.75rem;      /* 12px - Large elements */
--ui-radius-xl: 1rem;         /* 16px - Extra large */
--ui-radius-full: 9999px;     /* Pills, circles */
```

### Component Radius Mapping

```css
/* Buttons */
--ui-button-radius: var(--ui-radius-base);

/* Inputs */
--ui-input-radius: var(--ui-radius-base);

/* Cards */
--ui-card-radius: var(--ui-radius-md);

/* Modals */
--ui-modal-radius: var(--ui-radius-lg);

/* Pills/badges */
--ui-pill-radius: var(--ui-radius-full);
```

## Shadows System

Layered shadows for depth:

```css
--ui-shadow-none: none;
--ui-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--ui-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--ui-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--ui-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--ui-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

### Shadow Usage

```css
/* Cards and elevated elements */
.ui-card {
  box-shadow: var(--ui-shadow-md);
}

/* Hover effects */
.ui-button:hover {
  box-shadow: var(--ui-shadow-sm);
}

/* Modals (maximum elevation) */
.ui-modal {
  box-shadow: var(--ui-shadow-xl);
}
```

## Motion & Timing

Intentional motion for better UX:

```css
/* Durations */
--ui-duration-fast: 150ms;
--ui-duration-base: 200ms;
--ui-duration-slow: 300ms;

/* Easing functions */
--ui-easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--ui-easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--ui-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ui-easing-linear: linear;
```

### Component Transitions

```css
/* Quick state changes (hover, focus) */
.ui-button {
  transition: all var(--ui-duration-fast) var(--ui-easing-ease-in-out);
}

/* Slower state changes (open/close) */
.ui-modal {
  transition: all var(--ui-duration-slow) var(--ui-easing-ease-in-out);
}
```

## Theme Variants

Users can switch between three design aesthetics:

### 1. Modern (Default)

Clean, contemporary design with vibrant primary color and subtle shadows.

```css
/* Modern theme overrides */
:root.evara-theme-modern {
  --ui-color-primary: #3b82f6;
  --ui-radius-base: 0.375rem;
  --ui-shadow-base: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### 2. Minimal

Ultra-clean, stripped-down design. Fewer shadows, neutral colors, larger padding.

```css
:root.evara-theme-minimal {
  --ui-color-primary: #1f2937;
  --ui-radius-base: 0;            /* No rounding */
  --ui-shadow-base: 0 1px 0 rgba(0, 0, 0, 0.05);
  --ui-button-padding-md: 1rem 1.25rem;  /* More padding */
}
```

### 3. Enterprise

Professional, structured design. Stronger borders, muted colors, higher formality.

```css
:root.evara-theme-enterprise {
  --ui-color-primary: #1e40af;    /* Darker blue */
  --ui-color-border-primary: var(--ui-color-neutral-400);
  --ui-button-font-weight: var(--ui-font-weight-bold);
  --ui-input-border-width: 1px;
}
```

### Applying Themes

**Via CSS class:**

```html
<html class="evara-theme-minimal">
  <!-- All components use minimal theme -->
</html>
```

**Via CSS variable:**

```javascript
// Switch themes programmatically
document.documentElement.classList.add('evara-theme-enterprise');
```

**Via JavaScript:**

```typescript
function setTheme(name: 'modern' | 'minimal' | 'enterprise') {
  document.documentElement.className = `evara-theme-${name}`;
}
```

## Dark Mode

Dark mode is fully supported through CSS variables:

```css
/* Light mode (default) */
:root {
  --ui-color-bg-primary: #f9fafb;
  --ui-color-text-primary: #111827;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --ui-color-bg-primary: #111827;
    --ui-color-text-primary: #f9fafb;
  }
}

/* Manual dark mode class */
:root.evara-dark {
  --ui-color-bg-primary: #111827;
  --ui-color-text-primary: #f9fafb;
}
```

### Enabling Dark Mode

```html
<!-- Automatic (respects system preference) -->
<html>

<!-- Force dark mode -->
<html class="evara-dark">

<!-- Toggle -->
<button @click="document.documentElement.classList.toggle('evara-dark')">
  Toggle Dark Mode
</button>
```

## Customization

Users can customize any token by overriding CSS variables:

```typescript
// User's app.css
:root {
  /* Override primary color */
  --ui-color-primary: #ec4899;
  --ui-color-primary-hover: #db2777;

  /* Override spacing */
  --ui-button-padding-md: 1rem 2rem;

  /* Override radius */
  --ui-radius-base: 0.5rem;
}
```

**No rebuild required**—changes are applied at runtime.

## Accessibility

All tokens are designed with accessibility in mind:

### Color Contrast

- **Text on backgrounds**: Minimum WCAG AA (4.5:1 for normal text)
- **Text on buttons**: Minimum WCAG AA
- **Interactive elements**: Minimum WCAG AA borders/backgrounds

### Motion

- Respects `prefers-reduced-motion`
- No motion for users who request it

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### Focus States

All interactive elements have clear focus indicators:

```css
.ui-button:focus-visible {
  outline: 2px solid var(--ui-color-border-focus);
  outline-offset: 2px;
}
```

## Component Token Reference

Each component documents its token usage:

### Button Tokens

```css
/* Sizing */
--ui-button-padding-sm
--ui-button-padding-md
--ui-button-padding-lg

/* Styling */
--ui-button-radius
--ui-button-font-size
--ui-button-font-weight

/* Colors */
--ui-color-action-primary
--ui-color-action-primary-hover
--ui-color-text-primary (for ghost variant)

/* Animation */
--ui-duration-fast
--ui-easing-ease-in-out
```

### Input Tokens

```css
--ui-input-padding
--ui-input-radius
--ui-input-border-width
--ui-input-border-color
--ui-input-bg
--ui-color-text-primary
--ui-color-text-disabled
--ui-color-border-focus
```

See individual component documentation for full token lists.
