/**
 * @file layout.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for layout.tsx
 *
 * @description
 * Handles module responsibilities for layout.tsx.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import './globals.css'
import type { Metadata } from 'next'

// ---------- ROUTE METADATA
// eslint-disable-next-line react-refresh/only-export-components -- Next.js layout files intentionally export both metadata and a default component
export const metadata: Metadata = {
  title: 'Evara UI, Next.js SSR Demo',
  description: 'Server-side rendering demo using Evara UI component library.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
