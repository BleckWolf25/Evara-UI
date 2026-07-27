# Alert Component

The Alert component displays brief, important messages to attract user attention without interrupting their workflow.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger' \| 'default'` | `'info'` | Alert visual style |
| `dismissible` | `boolean` | `false` | Shows a close button to dismiss the alert |
| `showIcon` | `boolean` | `false` | Displays a status icon next to the message |

## Code Example

::: code-group

```tsx [React]
import { Alert } from '@bleckwolf25/react'

export default function Demo() {
  return (
    <Alert variant="success" showIcon dismissible onDismiss={() => console.log('Dismissed')}>
      Operation completed successfully!
    </Alert>
  )
}
```

```vue [Vue 3]
<script setup>
import { Alert } from '@bleckwolf25/vue'
</script>

<template>
  <Alert variant="success" show-icon dismissible>
    Operation completed successfully!
  </Alert>
</template>
```

:::
