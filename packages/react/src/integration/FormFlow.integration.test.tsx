/**
 * @file FormFlow.integration.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for FormFlow.integration.
 *
 * @description
 * Executes test assertions validating behavior, accessibility attributes, and props.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import {
  Form,
  FieldGroup,
  Field,
  Input,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
} from '../components'

function RegistrationForm({ onSubmit }: { onSubmit: (data: Record<string, unknown>) => void }) {
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('user')
  const [tier, setTier] = useState('free')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    if (!agree) {
      setError('You must accept the terms')
      return
    }
    setError(null)
    onSubmit({ username, role, tier, agree })
  }

  return (
    <Form onSubmit={handleSubmit} aria-label="Registration Form">
      <FieldGroup disabled={false}>
        <Field label="Username" required error={error && !username ? error : undefined}>
          <Input
            placeholder="Choose username..."
            value={username}
            onValueChange={setUsername}
          />
        </Field>

        <Field label="Account Role">
          <Select
            value={role}
            onChange={(val) => { setRole(Array.isArray(val) ? val[0] : val); }}
            options={[
              { value: 'user', label: 'Standard User' },
              { value: 'admin', label: 'Administrator' },
            ]}
          />
        </Field>

        <Field label="Subscription Tier">
          <RadioGroup value={tier} onValueChange={setTier}>
            <Radio value="free" label="Free Tier" />
            <Radio value="pro" label="Pro Tier" />
          </RadioGroup>
        </Field>

        <Field label="Terms and Conditions">
          <Checkbox
            label="I accept terms and conditions"
            checked={agree}
            onCheckedChange={setAgree}
          />
        </Field>
      </FieldGroup>

      {error && <div role="alert" className="form-error">{error}</div>}

      <Button type="submit" variant="primary">Register</Button>
    </Form>
  )
}

describe('Form Flow Integration Test', () => {
  it('renders all form components accurately together', () => {
    const handleSubmit = vi.fn()
    render(<RegistrationForm onSubmit={handleSubmit} />)

    expect(screen.getByRole('form', { name: /registration form/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/choose username/i)).toBeInTheDocument()
    // Select displays selected option label inside trigger
    expect(screen.getByText('Standard User')).toBeInTheDocument()
    expect(screen.getByLabelText(/free tier/i)).toBeChecked()
    expect(screen.getByLabelText(/i accept terms and conditions/i)).not.toBeChecked()
  })

  it('validates form fields and displays accessible field errors on invalid submission', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<RegistrationForm onSubmit={handleSubmit} />)

    // Click submit without entering required username or checking terms
    await user.click(screen.getByRole('button', { name: /register/i }))

    expect(handleSubmit).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/username is required/i)
    // Field sets aria-invalid on the outer field container
    expect(screen.getByText('Username').closest('div')).toHaveAttribute('aria-invalid', 'true')
  })

  it('completes multi-input interaction and submits verified payload', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<RegistrationForm onSubmit={handleSubmit} />)

    // Type username using onValueChange integration
    const usernameInput = screen.getByPlaceholderText(/choose username/i)
    await user.type(usernameInput, 'johndoe')
    expect(usernameInput).toHaveValue('johndoe')

    // Change select role by opening custom dropdown and clicking option
    await user.click(screen.getByText('Standard User'))
    await user.click(screen.getByText('Administrator'))
    expect(screen.getByText('Administrator')).toBeInTheDocument()

    // Select Pro radio option
    const proRadio = screen.getByLabelText(/pro tier/i)
    await user.click(proRadio)
    expect(proRadio).toBeChecked()

    // Check agreement
    const termsCheckbox = screen.getByLabelText(/i accept terms and conditions/i)
    await user.click(termsCheckbox)
    expect(termsCheckbox).toBeChecked()

    // Submit form
    await user.click(screen.getByRole('button', { name: /register/i }))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'johndoe',
      role: 'admin',
      tier: 'pro',
      agree: true,
    })
  })
})
