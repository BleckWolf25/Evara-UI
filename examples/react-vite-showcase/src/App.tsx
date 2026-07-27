/**
 * @file App.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Source/config file for App.tsx
 *
 * @description
 * Handles module responsibilities for App.tsx.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { useState } from 'react'
import {
  ThemeProvider,
  useTheme,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useForm,
  Button,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Card,
  Badge,
  Alert,
  ProgressBar,
  Skeleton,
  Spinner,
  Breadcrumb,
  Pagination,
  Dialog,
  Popover,
  AlertDialog,
  ButtonGroup,
  Select,
  DatePicker,
  Calendar,
  ContextMenu,
  Carousel,
  Resizable,
  Slider,
} from '@bleckwolf25/react'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme() as { theme: string; toggleTheme: () => void }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <span>Current Mode: <strong>{theme}</strong></span>
      <Button onClick={toggleTheme} variant="outline" size="sm">
        Toggle Theme
      </Button>
    </div>
  )
}

function FormDemo() {
  const form = useForm({
    initialValues: { username: '', email: '' },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.username) errors['username'] = 'Username is required'
      if (!values.email) errors['email'] = 'Email is required'
      return errors
    },
    onSubmit: (values) => {
      alert(`Form Submitted Successfully: ${JSON.stringify(values)}`)
    },
  })

  return (
    <Card style={{ maxWidth: '400px' }}>
      <h3 style={{ marginBottom: '1rem' }}>Accessible Form System</h3>
      <Form form={form}>
        <FormField name="username">
          {({ value, onChange, onBlur }: { value: string; onChange: (v: string) => void; onBlur: () => void }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input value={value} onValueChange={onChange} onBlur={onBlur} placeholder="Enter username" />
              </FormControl>
              <FormDescription>Your public account handler.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        </FormField>

        <FormField name="email">
          {({ value, onChange, onBlur }: { value: string; onChange: (v: string) => void; onBlur: () => void }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" value={value} onValueChange={onChange} onBlur={onBlur} placeholder="john@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </FormField>

        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          Submit Form
        </Button>
      </Form>
    </Card>
  )
}

function MainShowcase() {
  const [inputValue, setInputValue] = useState('')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [calendarValue, setCalendarValue] = useState<Date | null>(null)
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [sliderRangeValue, setSliderRangeValue] = useState([30, 70])

  const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]

  const contextMenuItems = [
    // eslint-disable-next-line no-console
    { label: 'Copy', onClick: () => { console.log('Copy'); } },
    // eslint-disable-next-line no-console
    { label: 'Paste', onClick: () => { console.log('Paste'); } },
    // eslint-disable-next-line no-console
    { label: 'Delete', onClick: () => { console.log('Delete'); }, divider: true },
    // eslint-disable-next-line no-console
    { label: 'Settings', onClick: () => { console.log('Settings'); } },
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2.25rem' }}>Evara UI Showcase</h1>
      <ThemeToggle />

      {/* Form System Demo */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Form & Field Validation System</h2>
        <FormDemo />
      </section>

      {/* Buttons */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Buttons & Polymorphic 'as' Prop</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button as="a" href="#docs" variant="outline">
            Rendered as Link (a)
          </Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Button Group */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Button Group</h2>
        <ButtonGroup>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </section>

      {/* Input */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Input</h2>
        <Input
          value={inputValue}
          onValueChange={setInputValue}
          placeholder="Type something..."
        />
      </section>

      {/* Checkbox */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Checkbox</h2>
        <Checkbox
          checked={checkboxChecked}
          onCheckedChange={setCheckboxChecked}
          label="Check me"
        />
      </section>

      {/* Radio */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Radio Group</h2>
        <RadioGroup value={radioValue} onChange={setRadioValue}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      </section>

      {/* Card */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Card</h2>
        <Card>
          <h3>Card Title</h3>
          <p>This is a card component with design tokens and smooth shadows.</p>
        </Card>
      </section>

      {/* Badge */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Badge</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </section>

      {/* Alert */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Alert</h2>
        <Alert variant="info">This is an info alert</Alert>
        <Alert variant="success">This is a success alert</Alert>
        <Alert variant="warning">This is a warning alert</Alert>
        <Alert variant="danger">This is a danger alert</Alert>
      </section>

      {/* Progress Bar */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Progress Bar</h2>
        <ProgressBar value={75} />
      </section>

      {/* Skeleton */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Skeleton</h2>
        <Skeleton width="100%" height="40px" />
      </section>

      {/* Spinner */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Spinner</h2>
        <Spinner />
      </section>

      {/* Breadcrumb */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Breadcrumb</h2>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Button', href: '/components/button' },
          ]}
        />
      </section>

      {/* Pagination */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Pagination</h2>
        <Pagination
          currentPage={1}
          totalPages={10}
          // eslint-disable-next-line no-console
          onPageChange={(page) => { console.log('Page:', page); }}
        />
      </section>

      {/* Dialog (Compound Primitives Demo) */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Dialog (Radix Compound Primitives)</h2>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button onClick={() => { setDialogOpen(true); }}>Open Dialog</Button>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Radix-Style Compound Dialog</Dialog.Title>
              <Dialog.Description>Stateful data-state animation enabled.</Dialog.Description>
              <Dialog.Close />
            </Dialog.Header>
            <Dialog.Body>
              <p>This dialog uses compound composition primitives.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close>Cancel</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </section>

      {/* Popover */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Popover</h2>
        <Popover
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          trigger={<Button>Toggle Popover</Button>}
        >
          <div style={{ padding: '1rem' }}>
            <p>This is popover content</p>
          </div>
        </Popover>
      </section>

      {/* Alert Dialog */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Alert Dialog</h2>
        <Button onClick={() => { setAlertDialogOpen(true); }}>Open Alert Dialog</Button>
        <AlertDialog
          open={alertDialogOpen}
          onClose={() => { setAlertDialogOpen(false); }}
          title="Are you sure?"
          description="This action cannot be undone."
          confirmLabel="Yes, I'm sure"
          cancelLabel="Cancel"
          // eslint-disable-next-line no-console
          onConfirm={() => { console.log('Confirmed'); }}
        />
      </section>

      {/* Select */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Select</h2>
        <Select
          options={selectOptions}
          value={selectValue}
          onChange={setSelectValue}
          placeholder="Select an option"
          searchable
        />
      </section>

      {/* Date Picker */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Date Picker</h2>
        <DatePicker
          value={dateValue}
          onChange={setDateValue}
          placeholder="Select a date"
        />
      </section>

      {/* Calendar */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Calendar</h2>
        <Calendar
          value={calendarValue}
          onChange={setCalendarValue}
        />
      </section>

      {/* Context Menu */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Context Menu</h2>
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            setContextMenuOpen(true)
          }}
          style={{
            padding: '2rem',
            border: '2px dashed #ccc',
            textAlign: 'center',
          }}
        >
          Right-click here to open context menu
        </div>
        <ContextMenu
          open={contextMenuOpen}
          onOpenChange={setContextMenuOpen}
          items={contextMenuItems}
          x={100}
          y={100}
        />
      </section>

      {/* Carousel */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Carousel</h2>
        <Carousel autoplay infinite>
          <div style={{ height: '200px', background: '#ff6b6b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Slide 1
          </div>
          <div style={{ height: '200px', background: '#4ecdc4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Slide 2
          </div>
          <div style={{ height: '200px', background: '#45b7d1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Slide 3
          </div>
        </Carousel>
      </section>

      {/* Resizable */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Resizable</h2>
        <Resizable
          width={300}
          height={200}
          minWidth={200}
          minHeight={150}
          // eslint-disable-next-line no-console
          onResize={(size) => { console.log('Size:', size); }}
        >
          <div style={{ width: '100%', height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Resize me!
          </div>
        </Resizable>
      </section>

      {/* Slider */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Slider</h2>
        <div style={{ marginBottom: '1rem' }}>
          <h3>Single Thumb</h3>
          <Slider
            value={sliderValue}
            onChange={setSliderValue}
            min={0}
            max={100}
            step={1}
          />
          <p>Value: {sliderValue}</p>
        </div>
        <div>
          <h3>Range</h3>
          <Slider
            value={sliderRangeValue}
            onChange={setSliderRangeValue}
            min={0}
            max={100}
            step={1}
            range
          />
          <p>Range: {sliderRangeValue.join(' - ')}</p>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <MainShowcase />
    </ThemeProvider>
  )
}
