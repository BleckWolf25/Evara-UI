/**
 * @file svelte.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit test suite for @evara-ui/svelte stores and prop builders.
 *
 * @description
 * Validates theme store transitions, form store validation, disclosure open/close states,
 * and component prop builder outputs for Svelte integration.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { describe, it, expect } from 'vitest'
import { createThemeStore, createFormStore, useDisclosure, createButtonProps, createCardProps, createDialogProps } from './index'

// ---------- TEST SUITES

// ---------- SVELTE STORES AND HELPERS TEST SUITE
describe('@evara-ui/svelte Stores & Helpers', () => {
  // ---------- THEME STORE TRANSITION TEST
  it('createThemeStore initializes with light theme and toggles to dark', () => {
    const theme = createThemeStore({ defaultTheme: 'light' })
    let current = ''
    theme.subscribe((val: string) => (current = val))

    expect(current).toBe('light')
    theme.toggleTheme()
    expect(current).toBe('dark')
  })

  // ---------- FORM STORE VALIDATION TEST
  it('createFormStore manages form values and validation', async () => {
    const form = createFormStore<{ name: string }>({
      initialValues: { name: '' },
      validate: (vals: { name: string }) => {
        const errors: { name?: string } = {}
        if (!vals.name) errors.name = 'Required'
        return errors
      },
    })

    let errs: { name?: string } = {}
    form.errors.subscribe((val: { name?: string }) => (errs = val))

    await form.validate()
    expect(errs.name).toBe('Required')

    form.setValue('name', 'John')
    await form.validate()
    expect(errs.name).toBeUndefined()
  })

  // ---------- DISCLOSURE TOGGLE TEST
  it('useDisclosure manages open/close state', () => {
    const disclosure = useDisclosure({ open: false })
    let isOpen = false
    disclosure.isOpen.subscribe((val: boolean) => (isOpen = val))

    expect(isOpen).toBe(false)
    disclosure.open()
    expect(isOpen).toBe(true)
    disclosure.close()
    expect(isOpen).toBe(false)
  })

  // ---------- BUTTON PROP BUILDER TEST
  it('createButtonProps returns correct button classes and aria attributes', () => {
    const props = createButtonProps({ variant: 'primary', size: 'lg' })
    expect(props.class).toContain('ui-button')
    expect(props.class).toContain('ui-button--primary')
    expect(props.role).toBe('button')
  })

  // ---------- CARD PROP BUILDER TEST
  it('createCardProps returns correct card classes', () => {
    const props = createCardProps({ variant: 'outlined', elevation: 'md' })
    expect(props.class).toContain('ui-card')
  })

  // ---------- DIALOG PROP BUILDER TEST
  it('createDialogProps returns overlay and dialog classes', () => {
    const props = createDialogProps({ open: true })
    expect(props.overlayClass).toContain('ui-dialog__overlay')
    expect(props.dialogClass).toContain('ui-dialog')
  })
})
