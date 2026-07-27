# Input OTP Component

The Input OTP component handles One-Time Password / 2FA code entries with automatic focus advancement and paste handling.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `length` | `number` | `6` | Number of OTP digit fields |
| `value` | `string` | `''` | Current OTP string |
| `onChange` | `(value: string) => void` | `undefined` | Callback fired on input change |

## Code Example

```tsx
<InputOTP length={6} value={otp} onChange={setOtp} />
```
