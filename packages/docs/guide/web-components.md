# HTML Custom Elements (Web Components)

Evara UI includes native, framework-agnostic HTML Custom Elements powered by Shadow DOM encapsulation and `@bleckwolf25/core` headless controllers.

## Registration

To use Evara Web Components in vanilla HTML, Angular, Svelte, or PHP/Ruby applications, register them once globally:

```ts
import { registerEvaraCustomElements } from '@bleckwolf25/core'
import '@bleckwolf25/styles/dist/index.css'

registerEvaraCustomElements()
```

---

## Available Custom Elements

### `<evara-button>`
- **Attributes**: `variant="primary|secondary|danger|outline|ghost"`, `size="sm|md|lg"`, `full-width`, `disabled`

```html
<evara-button variant="primary" size="md">Click Me</evara-button>
```

### `<evara-card>`
- **Attributes**: `variant="default|outlined"`, `elevation="sm|md|lg"`

```html
<evara-card variant="outlined" elevation="md">
  <h3>Encapsulated Card</h3>
  <p>Shadow DOM isolated styles.</p>
</evara-card>
```

### `<evara-badge>`
- **Attributes**: `color="primary|success|danger|warning|info"`, `size="sm|md"`

```html
<evara-badge color="success">Active</evara-badge>
```

### `<evara-alert>`
- **Attributes**: `variant="info|success|warning|error"`, `title="..."`

```html
<evara-alert variant="warning" title="Warning Header">
  This alert is rendered as a native Web Component.
</evara-alert>
```

### `<evara-progress-bar>`
- **Attributes**: `value="0..100"`

```html
<evara-progress-bar value="75"></evara-progress-bar>
```

### `<evara-spinner>`
- **Attributes**: `size="sm|md|lg"`

```html
<evara-spinner size="md"></evara-spinner>
```

### `<evara-avatar>`
- **Attributes**: `src="..."`, `initials="..."`, `status="online|offline|away"`

```html
<evara-avatar initials="JD" status="online"></evara-avatar>
```

### `<evara-input>`
- **Attributes**: `value="..."`, `placeholder="..."`, `disabled`, `type="text|email|password"`

```html
<evara-input placeholder="Enter text..."></evara-input>
```
