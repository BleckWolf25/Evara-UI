/**
 * @file index.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary HTML Custom Elements implementation for framework-agnostic web components.
 *
 * @description
 * Implements native Web Component custom element classes powered by Evara headless controllers,
 * encapsulating shadow DOM styles and registration utilities for standalone HTML applications.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import {
  ButtonController,
  CardController,
  AlertController,
  BadgeController,
  ProgressBarController,
  SpinnerController,
  InputController,
  CheckboxController,
  SeparatorController,
  SkeletonController,
  type ButtonVariant,
  type CardVariant,
  type AlertVariant,
} from '../components'
import type { Color } from '../types'

// ---------- CUSTOM ELEMENT CLASSES

// ---------- CLASS: EVARA BUTTON ELEMENT
export class EvaraButtonElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['variant', 'size', 'full-width', 'disabled']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const variant = this.getAttribute('variant') ?? 'primary'
    const size = this.getAttribute('size') ?? 'md'
    const fullWidth = this.hasAttribute('full-width')
    const disabled = this.hasAttribute('disabled')

    // Initialize headless button controller instance
    const controller = new ButtonController({
      variant: variant as ButtonVariant,
      size: size as 'sm' | 'md' | 'lg',
      fullWidth,
      disabled,
    })

    const aria = controller.getAriaAttributes()

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        button {
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: ${size === 'sm' ? '0.25rem 0.5rem' : size === 'lg' ? '0.75rem 1.5rem' : '0.5rem 1rem'};
          width: ${fullWidth ? '100%' : 'auto'};
          background-color: ${variant === 'primary' ? '#10b981' : variant === 'secondary' ? '#6b7280' : variant === 'danger' ? '#ef4444' : 'transparent'};
          color: ${variant === 'ghost' || variant === 'outline' ? '#10b981' : '#ffffff'};
          border-color: ${variant === 'outline' ? '#10b981' : 'transparent'};
          opacity: ${disabled ? '0.6' : '1'};
          pointer-events: ${disabled ? 'none' : 'auto'};
        }
        button:hover {
          filter: brightness(0.92);
        }
      </style>
      <button role="${aria.role}" ${aria['aria-disabled'] ? 'aria-disabled="true"' : ''} ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `
  }
}

// ---------- CLASS: EVARA CARD ELEMENT
export class EvaraCardElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['variant', 'elevation']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const variant = this.getAttribute('variant') ?? 'default'
    const elevation = this.getAttribute('elevation') ?? 'md'

    // Initialize headless card controller instance
    const controller = new CardController({
      variant: variant as CardVariant,
      elevation: elevation as 'sm' | 'md' | 'lg',
    })

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card {
          background-color: var(--bg-card, #ffffff);
          border-radius: 12px;
          padding: 1.25rem;
          border: 1px solid ${variant === 'outlined' ? '#e5e7eb' : 'transparent'};
          box-shadow: ${elevation === 'sm' ? '0 1px 2px rgba(0,0,0,0.05)' : elevation === 'lg' ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 4px 6px -1px rgba(0,0,0,0.1)'};
          color: var(--text-color, #111827);
        }
      </style>
      <div class="card ${controller.getCardClasses()}">
        <slot></slot>
      </div>
    `
  }
}

// ---------- CLASS: EVARA BADGE ELEMENT
export class EvaraBadgeElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['color', 'size', 'variant']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const color = this.getAttribute('color') ?? 'default'
    const size = this.getAttribute('size') ?? 'md'

    // Initialize headless badge controller instance
    const controller = new BadgeController({
      color: color as Color,
      size: size as 'sm' | 'md' | 'lg',
    })

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    const colorHex =
      color === 'success'
        ? '#10b981'
        : color === 'danger'
          ? '#ef4444'
          : color === 'warning'
            ? '#f59e0b'
            : color === 'info'
              ? '#3b82f6'
              : '#6b7280'

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        .badge {
          display: inline-flex;
          align-items: center;
          font-weight: 600;
          border-radius: 999px;
          padding: ${size === 'sm' ? '0.125rem 0.375rem' : '0.25rem 0.625rem'};
          font-size: ${size === 'sm' ? '0.75rem' : '0.875rem'};
          background-color: ${colorHex}20;
          color: ${colorHex};
        }
      </style>
      <span class="badge" ${controller.getAriaAttributes().role ? `role="${controller.getAriaAttributes().role}"` : ''}>
        <slot></slot>
      </span>
    `
  }
}

// ---------- CLASS: EVARA ALERT ELEMENT
export class EvaraAlertElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['variant', 'title']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const variant = this.getAttribute('variant') ?? 'info'
    const title = this.getAttribute('title') ?? ''

    // Initialize headless alert controller instance
    const controller = new AlertController({
      variant: variant as AlertVariant,
    })

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    const colorHex =
      variant === 'success'
        ? '#10b981'
        : variant === 'warning'
          ? '#f59e0b'
          : variant === 'error'
            ? '#ef4444'
            : '#3b82f6'

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .alert {
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid ${colorHex};
          background-color: ${colorHex}15;
          color: #1f2937;
        }
        .title {
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
      </style>
      <div class="alert" ${controller.getAriaAttributes().role ? `role="${controller.getAriaAttributes().role}"` : ''}>
        ${title ? `<div class="title">${title}</div>` : ''}
        <slot></slot>
      </div>
    `
  }
}

// ---------- CLASS: EVARA PROGRESS BAR ELEMENT
export class EvaraProgressBarElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['value']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const value = Number(this.getAttribute('value')) || 0
    const controller = new ProgressBarController({ value })
    const style = controller.getFillStyle()

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }
        .track {
          width: 100%;
          height: 8px;
          background-color: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
        }
        .fill {
          height: 100%;
          width: ${style?.width ?? '0%'};
          background-color: #10b981;
          transition: width 0.2s ease;
        }
      </style>
      <div class="track" role="${controller.getAriaAttributes().role}" aria-valuenow="${controller.getAriaAttributes()['aria-valuenow'] ?? 0}" aria-valuemin="${controller.getAriaAttributes()['aria-valuemin'] ?? 0}" aria-valuemax="${controller.getAriaAttributes()['aria-valuemax'] ?? 100}">
        <div class="fill"></div>
      </div>
    `
  }
}

// ---------- CLASS: EVARA SPINNER ELEMENT
export class EvaraSpinnerElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['size']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const size = this.getAttribute('size') ?? 'md'
    const controller = new SpinnerController({ size: size as 'sm' | 'md' | 'lg' })

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    const dim = size === 'sm' ? '16px' : size === 'lg' ? '36px' : '24px'

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        .spinner {
          width: ${dim};
          height: ${dim};
          border: 3px solid #e5e7eb;
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner" role="status" aria-label="${controller.getAriaAttributes()['aria-label']}"></div>
    `
  }
}

// ---------- CLASS: EVARA AVATAR ELEMENT
export class EvaraAvatarElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['src', 'initials', 'status', 'size']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const src = this.getAttribute('src') ?? ''
    const initials = this.getAttribute('initials') ?? ''
    const status = this.getAttribute('status') ?? ''

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; position: relative; }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #10b981;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          overflow: hidden;
        }
        img { width: 100%; height: 100%; object-fit: cover; }
        .badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid white;
          background-color: ${status === 'online' ? '#10b981' : status === 'offline' ? '#9ca3af' : '#f59e0b'};
        }
      </style>
      <div class="avatar" role="img" aria-label="${initials || 'Avatar'}">
        ${src ? `<img src="${src}" alt="Avatar" />` : `<span>${initials || 'UI'}</span>`}
      </div>
      ${status ? `<div class="badge"></div>` : ''}
    `
  }
}

// ---------- CLASS: EVARA INPUT ELEMENT
export class EvaraInputElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['value', 'placeholder', 'disabled', 'type']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const value = this.getAttribute('value') ?? ''
    const placeholder = this.getAttribute('placeholder') ?? ''
    const disabled = this.hasAttribute('disabled')
    const type = this.getAttribute('type') ?? 'text'

    // Initialize headless input controller instance
    const controller = new InputController({
      value,
      placeholder,
      disabled,
    })

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }
        input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          outline: none;
          box-sizing: border-box;
        }
        input:focus { border-color: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.2); }
      </style>
      <input type="${type}" value="${value}" placeholder="${placeholder}" ${disabled ? 'disabled' : ''} ${controller.getAriaAttributes()['aria-invalid'] ? 'aria-invalid="true"' : ''} />
    `
  }
}

// ---------- CLASS: EVARA CHECKBOX ELEMENT
export class EvaraCheckboxElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['checked', 'disabled', 'label']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const checked = this.hasAttribute('checked')
    const disabled = this.hasAttribute('disabled')
    const label = this.getAttribute('label') ?? ''

    // Initialize headless checkbox controller instance
    const controller = new CheckboxController({ checked, disabled })

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; gap: 0.5rem; }
        input { cursor: pointer; }
        label { font-size: 0.875rem; cursor: pointer; }
      </style>
      <input type="checkbox" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${controller.getAriaAttributes()['aria-checked'] ? `aria-checked="${controller.getAriaAttributes()['aria-checked']}"` : ''} />
      ${label ? `<label>${label}</label>` : ''}
    `
  }
}

// ---------- CLASS: EVARA SEPARATOR ELEMENT
export class EvaraSeparatorElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['orientation']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const orientation = this.getAttribute('orientation') ?? 'horizontal'
    const controller = new SeparatorController({ orientation: orientation as 'horizontal' | 'vertical' })

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .separator {
          background-color: #e5e7eb;
          width: ${orientation === 'horizontal' ? '100%' : '1px'};
          height: ${orientation === 'horizontal' ? '1px' : '100%'};
        }
      </style>
      <div class="separator" role="${controller.getAriaAttributes().role}" aria-orientation="${controller.getAriaAttributes()['aria-orientation']}"></div>
    `
  }
}

// ---------- CLASS: EVARA SKELETON ELEMENT
export class EvaraSkeletonElement extends HTMLElement {
  // ---------- OBSERVED ATTRIBUTES LIST
  static get observedAttributes() {
    return ['width', 'height']
  }

  // ---------- DOM LIFECYCLE CONNECTED HANDLER
  connectedCallback() {
    this.render()
  }

  // ---------- ATTRIBUTE MUTATION HANDLER
  attributeChangedCallback() {
    this.render()
  }

  // ---------- SHADOW DOM RENDER ROUTINE
  render() {
    const width = this.getAttribute('width') ?? '100%'
    const height = this.getAttribute('height') ?? '20px'
    const controller = new SkeletonController({})

    // ---------- SHADOW DOM INITIALIZATION (Attach Open Root)
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    // ---------- SHADOW DOM HTML AND STYLES INJECTION
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .skeleton {
          width: ${width};
          height: ${height};
          background-color: #e5e7eb;
          border-radius: 6px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      </style>
      <div class="skeleton" role="${controller.getAriaAttributes().role}"></div>
    `
  }
}

// ---------- TYPES AND REGISTRATION OPTIONS
export interface RegisterCustomElementsOptions {
  /** Custom prefix for element names (default: 'evara') */
  prefix?: string
}

// ---------- FUNCTIONS

// ---------- GLOBAL CUSTOM ELEMENT REGISTRATION FUNCTION
export function registerEvaraCustomElements(options: RegisterCustomElementsOptions = {}) {
  const p = options.prefix ?? 'evara'

  const customElementMap: Record<string, CustomElementConstructor> = {
    [`${p}-button`]: EvaraButtonElement,
    [`${p}-card`]: EvaraCardElement,
    [`${p}-badge`]: EvaraBadgeElement,
    [`${p}-alert`]: EvaraAlertElement,
    [`${p}-progress-bar`]: EvaraProgressBarElement,
    [`${p}-spinner`]: EvaraSpinnerElement,
    [`${p}-avatar`]: EvaraAvatarElement,
    [`${p}-input`]: EvaraInputElement,
    [`${p}-checkbox`]: EvaraCheckboxElement,
    [`${p}-separator`]: EvaraSeparatorElement,
    [`${p}-skeleton`]: EvaraSkeletonElement,
  }

  // Define each element in customElements registry if not previously registered
  for (const [tagName, constructor] of Object.entries(customElementMap)) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, constructor)
    }
  }
}
