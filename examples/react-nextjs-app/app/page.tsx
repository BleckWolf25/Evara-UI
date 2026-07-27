/**
 * @file page.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for page.tsx
 *
 * @description
 * Handles module responsibilities for page.tsx.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
'use client'

import { useState } from 'react'
import {
  Button,
  Input,
  Card,
  InputOTP,
  Dialog,
  Badge,
} from '@bleckwolf25/react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert('Please enter your email')
      return
    }
    if (code.length < 6) {
      alert('Please enter the full 6-digit authentication code')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsDialogOpen(true)
    }, 1500)
  }

  return (
    <div className="next-container">
      <header className="next-header">
        <div className="next-logo">Evara UI</div>
        <div className="next-tagline">
          Next.js App Router Showcase <span style={{ marginLeft: '0.5rem' }}><Badge color="success">SSR Compatible</Badge></span>
        </div>
      </header>

      <Card className="next-card">
        <form onSubmit={handleSubmit} className="next-card-content">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
            Two-Factor Authentication
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--ui-color-text-secondary)' }}>
            Enter your developer email credentials and the security key sent to your mobile device.
          </p>

          <div className="form-group">
            <label htmlFor="email-input" className="form-label">Developer Email</label>
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">One-Time Password (2FA)</label>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.25rem' }}>
              <InputOTP
                length={6}
                onChange={setCode}
                size="md"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            fullWidth
            style={{ marginTop: '0.5rem' }}
          >
            Authenticate Session
          </Button>
        </form>
      </Card>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Header>
          <h3 className="ui-dialog__title">Access Granted</h3>
        </Dialog.Header>
        <Dialog.Body>
          <p style={{ lineHeight: '1.6', color: 'var(--ui-color-text-secondary)' }}>
            Authentication successful! You have successfully established a secure session on the <strong>Next.js SSR server</strong>.
          </p>
          <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--ui-color-bg-primary)', borderRadius: '6px', fontSize: '0.85rem' }}>
            <strong>Session parameters:</strong>
            <ul style={{ marginTop: '0.5rem', listStyle: 'inside disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>User: {email}</li>
              <li>OTP: {code}</li>
              <li>Protocol: HTTPS (Mock)</li>
            </ul>
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="primary" onClick={() => { setIsDialogOpen(false) }}>
            Launch Dashboard
          </Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}
