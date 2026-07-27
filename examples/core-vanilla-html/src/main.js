/**
 * @file main.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for main.js
 *
 * @description
 * Handles module responsibilities for main.js.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import './style.css'
import { SliderController, DialogController } from '@bleckwolf25/core'

// ==========================================
// 1. Slider Setup
// ==========================================
const sliderElement = document.getElementById('my-slider')
const sliderThumb = document.getElementById('my-slider-thumb')
const sliderRangeFill = document.getElementById('my-slider-range')
const sliderValueDisplay = document.getElementById('slider-value-display')

let currentSliderValue = 50
const sliderMin = 0
const sliderMax = 100
const sliderStep = 5

// Instantiate the core headless controller
const sliderController = new SliderController({
  value: currentSliderValue,
  min: sliderMin,
  max: sliderMax,
  step: sliderStep,
})

// Set initial accessibility attributes and position
function updateSliderDOM() {
  const percentage = sliderController.getPercentage(currentSliderValue)

  // Style properties
  sliderThumb.style.left = `${percentage}%`
  sliderRangeFill.style.width = `${percentage}%`
  sliderValueDisplay.textContent = `${currentSliderValue}%`

  // ARIA attributes
  const ariaAttrs = sliderController.getAriaAttributes()
  sliderThumb.setAttribute('role', ariaAttrs.role)
  sliderThumb.setAttribute('aria-valuemin', ariaAttrs['aria-valuemin'].toString())
  sliderThumb.setAttribute('aria-valuemax', ariaAttrs['aria-valuemax'].toString())
  sliderThumb.setAttribute('aria-valuenow', currentSliderValue.toString())
  sliderThumb.setAttribute('aria-valuetext', `${currentSliderValue}%`)
}

// Initial draw
updateSliderDOM()

// Event handlers
let isDragging = false

function handleSliderMove(clientX) {
  const rect = sliderElement.getBoundingClientRect()
  const offset = clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (offset / rect.width) * 100))
  currentSliderValue = sliderController.getValueFromPercentage(percentage)
  updateSliderDOM()
}

sliderElement.addEventListener('mousedown', (e) => {
  isDragging = true
  handleSliderMove(e.clientX)
})

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    handleSliderMove(e.clientX)
  }
})

document.addEventListener('mouseup', () => {
  isDragging = false
})

// Touch support
sliderElement.addEventListener('touchstart', (e) => {
  isDragging = true
  handleSliderMove(e.touches[0].clientX)
})

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    handleSliderMove(e.touches[0].clientX)
  }
})

document.addEventListener('touchend', () => {
  isDragging = false
})

// Keyboard navigation
sliderThumb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    currentSliderValue = Math.min(sliderMax, currentSliderValue + sliderStep)
    updateSliderDOM()
    e.preventDefault()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    currentSliderValue = Math.max(sliderMin, currentSliderValue - sliderStep)
    updateSliderDOM()
    e.preventDefault()
  } else if (e.key === 'Home') {
    currentSliderValue = sliderMin
    updateSliderDOM()
    e.preventDefault()
  } else if (e.key === 'End') {
    currentSliderValue = sliderMax
    updateSliderDOM()
    e.preventDefault()
  }
})


// ==========================================
// 2. Dialog Setup
// ==========================================
const openBtn = document.getElementById('open-dialog-btn')
const overlay = document.getElementById('my-dialog-overlay')
const closeX = document.getElementById('close-dialog-x')
const cancelBtn = document.getElementById('cancel-dialog-btn')
const saveBtn = document.getElementById('save-dialog-btn')
const dialogBox = document.getElementById('my-dialog')

const dialogController = new DialogController({
  id: 'headless-dialog',
  ariaLabelledBy: 'dialog-title',
  ariaDescribedBy: 'dialog-description',
  closeOnEscape: true,
  closeOnOverlayClick: true,
  trapFocus: true,
})

let activeTrigger = null

function openDialog() {
  activeTrigger = document.activeElement
  overlay.classList.add('open')

  // Set accessibility attributes
  const ariaAttrs = dialogController.getAriaAttributes()
  dialogBox.setAttribute('role', ariaAttrs.role)
  dialogBox.setAttribute('aria-modal', ariaAttrs['aria-modal'].toString())
  dialogBox.setAttribute('id', ariaAttrs.id)

  // Focus the first focusable element inside the dialog
  const input = document.getElementById('dialog-input')
  if (input) {
    input.focus()
  }
}

function closeDialog() {
  overlay.classList.remove('open')
  if (activeTrigger) {
    activeTrigger.focus()
  }
}

// Add focus trapping
overlay.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('open')) return

  // Close on Escape
  if (e.key === 'Escape' && dialogController.shouldCloseOnEscape()) {
    closeDialog()
    e.preventDefault()
    return
  }

  // Trap Focus logic
  if (e.key === 'Tab') {
    const focusable = overlay.querySelectorAll('button, input, select, textarea')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === last) {
        first.focus()
        e.preventDefault()
      }
    }
  }
})

// Backdrop overlay click close
overlay.addEventListener('click', (e) => {
  if (e.target === overlay && dialogController.shouldCloseOnOverlayClick()) {
    closeDialog()
  }
})

// Button triggers
openBtn.addEventListener('click', openDialog)
closeX.addEventListener('click', closeDialog)
cancelBtn.addEventListener('click', closeDialog)
saveBtn.addEventListener('click', () => {
  const inputVal = document.getElementById('dialog-input').value
  alert(`Project "${inputVal || 'Untitled'}" saved successfully!`)
  closeDialog()
})
