/**
 * @file config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary VitePress documentation site configuration file.
 *
 * @description
 * Configures VitePress metadata, navigation menus, sidebar structures, social links,
 * and footer credentials for the Evara UI documentation portal.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineConfig } from 'vitepress'

// ---------- CONFIGURATION
export default defineConfig({
  // ---------- SITE METADATA
  title: 'Evara UI',
  description: 'Modular, accessible, high-performance design system & component library for React, Vue, Nuxt, Svelte, and Web Components.',

  // ---------- THEME CONFIGURATION
  themeConfig: {
    logo: '/logo.svg',
    // ---------- NAVIGATION BAR
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/button' },
      { text: 'Theming', link: '/guide/theming' },
    ],
    // ---------- SIDEBAR MENU STRUCTURE
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction & Setup', link: '/guide/getting-started' },
            { text: 'Svelte Integration', link: '/guide/svelte' },
            { text: 'Plug & Play Zero-Import', link: '/guide/zero-import' },
            { text: 'Theming & Customization', link: '/guide/theming' },
            { text: 'Web Components', link: '/guide/web-components' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Basic Elements',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Button Group', link: '/components/button-group' },
            { text: 'Input', link: '/components/input' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Radio', link: '/components/radio' },
          ],
        },
        {
          text: 'Form System',
          items: [
            { text: 'Form', link: '/components/form' },
            { text: 'Field', link: '/components/field' },
            { text: 'Field Group', link: '/components/field-group' },
            { text: 'Input Group', link: '/components/input-group' },
            { text: 'Input OTP', link: '/components/input-otp' },
          ],
        },
        {
          text: 'Layout & Presentation',
          items: [
            { text: 'Card', link: '/components/card' },
            { text: 'Separator', link: '/components/separator' },
            { text: 'Avatar', link: '/components/avatar' },
            { text: 'Badge', link: '/components/badge' },
          ],
        },
        {
          text: 'Feedback',
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Progress Bar', link: '/components/progress-bar' },
            { text: 'Skeleton', link: '/components/skeleton' },
            { text: 'Spinner', link: '/components/spinner' },
          ],
        },
        {
          text: 'Navigation',
          items: [
            { text: 'Breadcrumb', link: '/components/breadcrumb' },
            { text: 'Pagination', link: '/components/pagination' },
          ],
        },
        {
          text: 'Overlays',
          items: [
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Alert Dialog', link: '/components/alert-dialog' },
            { text: 'Popover', link: '/components/popover' },
          ],
        },
        {
          text: 'Complex Controls',
          items: [
            { text: 'Select', link: '/components/select' },
            { text: 'Date Picker', link: '/components/calendar' },
            { text: 'Calendar', link: '/components/calendar' },
            { text: 'Context Menu', link: '/components/context-menu' },
            { text: 'Carousel', link: '/components/carousel' },
            { text: 'Resizable', link: '/components/resizable' },
            { text: 'Slider', link: '/components/slider' },
          ],
        },
      ],
    },
    // ---------- SOCIAL LINKS
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BleckWolf25/EvaraUI' },
    ],
    // ---------- FOOTER METADATA
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Evara UI Team',
    },
  },
})
