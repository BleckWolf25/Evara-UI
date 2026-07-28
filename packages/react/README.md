# @bleckwolf25/react

> High-performance React (18 & 19) component library for Evara UI design system.

`@bleckwolf25/react` provides flexible, accessible React UI components with polymorphic element support, built-in headless state controllers, and Radix/shadcn compatibility.

## 📦 Installation

```bash
npm install @bleckwolf25/react @bleckwolf25/styles
# or
pnpm add @bleckwolf25/react @bleckwolf25/styles
```

## 🚀 Getting Started

Import the design system CSS and start using components:

```tsx
import '@bleckwolf25/styles/dist/index.css'
import '@bleckwolf25/react/dist/index.css'
import { Button, Card, Alert, ThemeProvider } from '@bleckwolf25/react'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Card className="p-4">
        <Alert variant="info">Welcome to Evara UI!</Alert>
        <Button variant="primary" onClick={() => alert('Clicked!')}>
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  )
}
```

## 🧩 Components Included

- **Alert & Alert Dialog**
- **Avatar, Badge, Breadcrumb**
- **Button & Button Group**
- **Calendar & Date Picker**
- **Card, Carousel, Resizable**
- **Checkbox, Radio, Select, Slider**
- **Context Menu, Dialog, Popover**
- **Form System & Field Controls**
- **Input, Input Group, Input OTP**
- **Pagination, Progress Bar, Skeleton, Spinner**

## 📄 License

MIT License © BleckWolf25
