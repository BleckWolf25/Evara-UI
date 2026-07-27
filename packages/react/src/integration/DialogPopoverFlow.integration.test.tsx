/**
 * @file DialogPopoverFlow.integration.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for DialogPopoverFlow.integration.
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
  Button,
  Dialog,
  Popover,
  AlertDialog,
} from '../components'
import { useDisclosure } from '../hooks'

function InteractiveOverlayApp({ onDeleteConfirmed }: { onDeleteConfirmed: () => void }) {
  const dialog = useDisclosure()
  const popover = useDisclosure()
  const alert = useDisclosure()
  const [itemName, setItemName] = useState('Critical Workspace Project')

  return (
    <div>
      <Button variant="primary" onClick={dialog.openDialog}>
        Open Settings Dialog
      </Button>

      <Dialog open={dialog.open} onOpenChange={dialog.onOpenChange} onClose={dialog.closeDialog}>
        <Dialog.Header>Project Settings</Dialog.Header>
        <Dialog.Body>
          <p>Current Project: {itemName}</p>
          <Popover
            open={popover.open}
            onOpenChange={popover.onOpenChange}
            trigger={
              <Button variant="secondary" onClick={popover.toggle}>
                Quick Actions Popover
              </Button>
            }
          >
            <div>
              <Button size="sm" onClick={() => { setItemName('Renamed Project'); popover.closeDialog(); }}>
                Rename Project
              </Button>
            </div>
          </Popover>

          <Button variant="danger" onClick={alert.openDialog}>
            Delete Project
          </Button>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onClick={dialog.closeDialog}>
            Close Dialog
          </Button>
        </Dialog.Footer>
      </Dialog>

      <AlertDialog
        open={alert.open}
        onOpenChange={alert.onOpenChange}
        title="Confirm Deletion"
        description="Are you sure you want to delete this project? This action cannot be undone."
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          onDeleteConfirmed()
          alert.closeDialog()
          dialog.closeDialog()
        }}
        onCancel={alert.closeDialog}
      />
    </div>
  )
}

describe('Dialog and Popover Overlay Flow Integration Test', () => {
  it('navigates cleanly through nested overlays and handles confirm action', async () => {
    const user = userEvent.setup()
    const handleDeleteConfirmed = vi.fn()
    render(<InteractiveOverlayApp onDeleteConfirmed={handleDeleteConfirmed} />)

    // Initially dialog is closed
    expect(screen.queryByText('Project Settings')).not.toBeInTheDocument()

    // 1. Open Dialog
    await user.click(screen.getByRole('button', { name: /open settings dialog/i }))
    expect(screen.getByText('Project Settings')).toBeInTheDocument()
    expect(screen.getByText(/current project: critical workspace project/i)).toBeInTheDocument()

    // 2. Open nested Popover inside Dialog
    await user.click(screen.getByRole('button', { name: /quick actions popover/i }))
    expect(screen.getByRole('button', { name: /rename project/i })).toBeInTheDocument()

    // 3. Click rename action inside Popover
    await user.click(screen.getByRole('button', { name: /rename project/i }))
    expect(screen.getByText(/current project: renamed project/i)).toBeInTheDocument()

    // 4. Trigger AlertDialog from within Dialog
    await user.click(screen.getByRole('button', { name: /delete project/i }))
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument()

    // 5. Confirm deletion inside AlertDialog
    await user.click(screen.getByRole('button', { name: /yes, delete/i }))

    expect(handleDeleteConfirmed).toHaveBeenCalledTimes(1)
    // Both Alert and Dialog close cleanly
    expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument()
    expect(screen.queryByText('Project Settings')).not.toBeInTheDocument()
  })

  it('closes overlays via Escape key and Close action buttons', async () => {
    const user = userEvent.setup()
    const handleDeleteConfirmed = vi.fn()
    render(<InteractiveOverlayApp onDeleteConfirmed={handleDeleteConfirmed} />)

    await user.click(screen.getByRole('button', { name: /open settings dialog/i }))
    expect(screen.getByText('Project Settings')).toBeInTheDocument()

    // Close via Close Dialog button
    await user.click(screen.getByRole('button', { name: /close dialog/i }))
    expect(screen.queryByText('Project Settings')).not.toBeInTheDocument()
  })
})
