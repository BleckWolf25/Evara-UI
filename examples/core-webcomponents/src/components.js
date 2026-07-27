/**
 * @file components.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for components.js
 *
 * @description
 * Handles module responsibilities for components.js.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { SliderController, InputOTPController } from '@evara-ui/core'

// ==========================================
// 1. <evara-slider> Web Component
// ==========================================
class EvaraSlider extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'step', 'disabled']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._value = 50
    this._min = 0
    this._max = 100
    this._step = 1
    this._disabled = false
  }

  connectedCallback() {
    this._value = Number(this.getAttribute('value')) || this._value
    this._min = Number(this.getAttribute('min')) || this._min
    this._max = Number(this.getAttribute('max')) || this._max
    this._step = Number(this.getAttribute('step')) || this._step
    this._disabled = this.hasAttribute('disabled')

    this.render()
    this.initController()
    this.setupEvents()
    this.updateDOM()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    if (name === 'value') this._value = Number(newValue)
    if (name === 'min') this._min = Number(newValue)
    if (name === 'max') this._max = Number(newValue)
    if (name === 'step') this._step = Number(newValue)
    if (name === 'disabled') this._disabled = this.hasAttribute('disabled')

    if (this.controller) {
      this.initController()
      this.updateDOM()
    }
  }

  initController() {
    this.controller = new SliderController({
      value: this._value,
      min: this._min,
      max: this._max,
      step: this._step,
      disabled: this._disabled,
    })
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, sans-serif;
          width: 100%;
          max-width: 400px;
          user-select: none;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .header {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-color, #111827);
        }
        .track-container {
          position: relative;
          display: flex;
          align-items: center;
          height: 20px;
          cursor: pointer;
        }
        .track {
          width: 100%;
          height: 6px;
          background-color: var(--border-color, #e5e7eb);
          border-radius: 999px;
          position: relative;
        }
        .fill {
          position: absolute;
          height: 100%;
          background-color: var(--primary-color, #10b981);
          border-radius: 999px;
        }
        .thumb {
          width: 18px;
          height: 18px;
          background-color: white;
          border: 2px solid var(--primary-color, #10b981);
          border-radius: 50%;
          position: absolute;
          left: 0;
          transform: translateX(-50%);
          cursor: grab;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          outline: none;
          transition: transform 0.1s, box-shadow 0.15s;
        }
        .thumb:focus-visible {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
          transform: translateX(-50%) scale(1.1);
        }
        :host([disabled]) .track-container {
          cursor: not-allowed;
          opacity: 0.5;
        }
        :host([disabled]) .thumb {
          cursor: not-allowed;
        }
      </style>
      <div class="wrapper">
        <div class="header">
          <span>Web Component Slider</span>
          <span id="val-display">${this._value}</span>
        </div>
        <div class="track-container" id="track-click">
          <div class="track">
            <div class="fill" id="fill-line"></div>
          </div>
          <div class="thumb" id="thumb-btn" tabindex="0"></div>
        </div>
      </div>
    `
  }

  setupEvents() {
    const track = this.shadowRoot.getElementById('track-click')
    const thumb = this.shadowRoot.getElementById('thumb-btn')

    let isDragging = false

    const updateFromCoord = (clientX) => {
      if (this._disabled) return
      const rect = track.getBoundingClientRect()
      const offset = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (offset / rect.width) * 100))
      const newValue = this.controller.getValueFromPercentage(percentage)
      
      if (newValue !== this._value) {
        this._value = newValue
        this.updateDOM()
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._value } }))
      }
    }

    track.addEventListener('mousedown', (e) => {
      isDragging = true
      updateFromCoord(e.clientX)
    })

    window.addEventListener('mousemove', (e) => {
      if (isDragging) updateFromCoord(e.clientX)
    })

    window.addEventListener('mouseup', () => {
      isDragging = false
    })

    // Keyboard bindings
    thumb.addEventListener('keydown', (e) => {
      if (this._disabled) return
      const step = this._step
      let updated = false

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        this._value = Math.min(this._max, this._value + step)
        updated = true
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        this._value = Math.max(this._min, this._value - step)
        updated = true
      }

      if (updated) {
        this.updateDOM()
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._value } }))
        e.preventDefault()
      }
    })
  }

  updateDOM() {
    const percentage = this.controller.getPercentage(this._value)
    
    const fill = this.shadowRoot.getElementById('fill-line')
    const thumb = this.shadowRoot.getElementById('thumb-btn')
    const display = this.shadowRoot.getElementById('val-display')

    fill.style.width = `${percentage}%`
    thumb.style.left = `${percentage}%`
    display.textContent = this._value

    // ARIA
    const aria = this.controller.getAriaAttributes()
    thumb.setAttribute('role', aria.role)
    thumb.setAttribute('aria-valuemin', aria['aria-valuemin'])
    thumb.setAttribute('aria-valuemax', aria['aria-valuemax'])
    thumb.setAttribute('aria-valuenow', this._value)
    thumb.setAttribute('aria-disabled', this._disabled.toString())
  }
}

customElements.define('evara-slider', EvaraSlider)


// ==========================================
// 2. <evara-otp-input> Web Component
// ==========================================
class EvaraOtpInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._length = 6
    this._size = 'md'
    this._disabled = false
    this._value = []
  }

  connectedCallback() {
    this._length = Number(this.getAttribute('length')) || this._length
    this._size = this.getAttribute('size') || this._size
    this._disabled = this.hasAttribute('disabled')
    this._value = Array(this._length).fill('')

    this.render()
    this.initController()
    this.setupEvents()
  }

  initController() {
    this.controller = new InputOTPController({
      length: this._length,
      size: this._size,
      disabled: this._disabled,
    })
  }

  render() {
    const inputsHtml = Array(this._length).fill(0).map((_, i) => `
      <input 
        type="text" 
        maxlength="1" 
        class="otp-digit" 
        data-index="${i}" 
        inputmode="numeric"
        pattern="[0-9]*"
        ${this._disabled ? 'disabled' : ''}
      />
    `).join('')

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .container {
          display: inline-flex;
          gap: 0.5rem;
        }
        input {
          width: 40px;
          height: 48px;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 6px;
          background-color: var(--bg-secondary, #f9fafb);
          color: var(--text-color, #111827);
          outline: none;
          transition: all 0.15s;
        }
        input:focus {
          border-color: var(--primary-color, #10b981);
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
        input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      </style>
      <div class="container" id="otp-container">
        ${inputsHtml}
      </div>
    `
  }

  setupEvents() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll('.otp-digit'))

    const handleFocus = (index) => {
      this.controller.setCurrentIndex(index)
      inputs[index].focus()
      inputs[index].select()
    }

    inputs.forEach((input, index) => {
      // Keydown
      input.addEventListener('keydown', (e) => {
        const val = this._value.join('')
        this.controller.handleKeyDown(e, index, val)
        const nextIndex = this.controller.getCurrentIndex()
        
        if (e.key === 'Backspace') {
          this._value[index] = ''
          input.value = ''
          handleFocus(nextIndex)
          this.dispatchEvent(new CustomEvent('change', { detail: { value: this._value.join('') } }))
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          handleFocus(nextIndex)
          e.preventDefault()
        }
      })

      // Input
      input.addEventListener('input', (e) => {
        const digit = e.target.value.replace(/\D/g, '')
        e.target.value = digit
        this._value[index] = digit

        if (digit) {
          const nextIndex = Math.min(this._length - 1, index + 1)
          handleFocus(nextIndex)
        }

        const fullVal = this._value.join('')
        this.dispatchEvent(new CustomEvent('change', { detail: { value: fullVal } }))
      })

      // Focus Sync
      input.addEventListener('focus', () => {
        this.controller.setCurrentIndex(index)
      })

      // Paste
      input.addEventListener('paste', (e) => {
        const pastedDigits = this.controller.handlePaste(e, this._length)
        if (pastedDigits) {
          pastedDigits.split('').forEach((d, i) => {
            if (inputs[i]) {
              inputs[i].value = d
              this._value[i] = d
            }
          })
          handleFocus(Math.min(this._length - 1, pastedDigits.length))
          this.dispatchEvent(new CustomEvent('change', { detail: { value: this._value.join('') } }))
        }
        e.preventDefault()
      })
    })
  }
}

customElements.define('evara-otp-input', EvaraOtpInput)
