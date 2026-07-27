/**
 * @file app.vue
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for app.vue
 *
 * @description
 * Handles module responsibilities for app.vue.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
<script setup lang="ts">
// Components and composables like ThemeProvider, Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
// useForm, useTheme, useDisclosure are auto-imported via @bleckwolf25/nuxt module!

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
// @ts-expect-error -- Nuxt auto-imports not resolved in standalone tsconfig
const otpValue = ref('')
// @ts-expect-error -- Nuxt auto-imports not resolved in standalone tsconfig
const isModalOpen = ref(false)
// @ts-expect-error -- Nuxt auto-imports not resolved in standalone tsconfig
const disclosure = useDisclosure({ defaultOpen: false })

// @ts-expect-error -- Nuxt auto-imports not resolved in standalone tsconfig
const { form } = useForm({
  initialValues: { email: '' },
  validate: (values: Record<string, string>) => (!values.email ? { email: 'Email required for Nuxt SSR' } : {}),
  onSubmit: (values: Record<string, string>) => { alert(`Nuxt Form Submitted: ${JSON.stringify(values)}`); },
})
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
</script>

<template>
  <ThemeProvider default-theme="light">
    <div style="padding: 3rem; max-width: 800px; margin: 0 auto; font-family: system-ui, sans-serif;">
      <header style="margin-bottom: 2rem;">
        <h1 style="display: flex; align-items: center; gap: 0.75rem;">
          Nuxt 4 + Evara UI
          <Badge color="primary">
            SSR Powered
          </Badge>
        </h1>
        <p style="color: #6b7280;">
          Zero-config component auto-imports & SSR hydration with @bleckwolf25/nuxt.
        </p>
      </header>

      <Alert
        variant="success"
        show-icon
        style="margin-bottom: 1.5rem;"
      >
        Nuxt module auto-registered all Evara components, composables (useForm, useTheme, useDisclosure), and ThemeProvider!
      </Alert>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
        <!-- Nuxt Form Demo -->
        <Card variant="outline">
          <CardHeader>
            <h3 style="margin: 0;">
              SSR Auto-Imported Form
            </h3>
          </CardHeader>
          <CardBody>
            <Form :form="form">
              <FormField
                v-slot="{ value, onChange, onBlur }"
                name="email"
              >
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      :value="value"
                      placeholder="nuxt@evara.dev"
                      @input="e => onChange(e.target.value)"
                      @blur="onBlur"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <Button
                type="submit"
                variant="primary"
                style="margin-top: 1rem;"
              >
                Submit Nuxt Form
              </Button>
            </Form>
          </CardBody>
        </Card>

        <!-- OTP Security Demo -->
        <Card variant="outline">
          <CardHeader>
            <h3 style="margin: 0;">
              2FA Security Module
            </h3>
          </CardHeader>
          <CardBody style="display: flex; flex-direction: column; gap: 1.25rem;">
            <p style="margin: 0; color: #4b5563;">
              Enter 6-digit code:
            </p>
            <InputOTP
              v-model="otpValue"
              :length="6"
            />

            <div style="display: flex; gap: 0.75rem;">
              <Button
                variant="primary"
                @click="isModalOpen = true"
              >
                Verify OTP
              </Button>
              <Button
                variant="secondary"
                @click="disclosure.toggle()"
              >
                Info
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Dialog v-model:open="isModalOpen">
        <DialogHeader>
          <h3 style="margin: 0;">
            Verification Status
          </h3>
        </DialogHeader>
        <DialogBody>
          <p>Code entered: <strong>{{ otpValue || 'None' }}</strong></p>
        </DialogBody>
        <DialogFooter style="display: flex; justify-content: flex-end;">
          <Button
            variant="primary"
            @click="isModalOpen = false"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  </ThemeProvider>
</template>
