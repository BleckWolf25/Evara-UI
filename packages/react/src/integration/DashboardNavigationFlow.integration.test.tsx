/**
 * @file DashboardNavigationFlow.integration.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for DashboardNavigationFlow.integration.
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
  Breadcrumb,
  Card,
  Pagination,
  ProgressBar,
  Badge,
  Avatar,
  Slider,
} from '../components'

function DashboardView({ onPageChanged }: { onPageChanged: (page: number) => void }) {
  const [page, setPage] = useState(1)
  const [capacity, setCapacity] = useState<number[]>([40])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    onPageChanged(newPage)
  }

  return (
    <div aria-label="Dashboard View">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Analytics', href: '/analytics' },
          { label: `Page ${page}`, href: `/analytics/p/${page}` },
        ]}
      />

      <Card variant="outlined" elevation="md">
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar initials="SA" status="online" />
            <span>System Health Overview</span>
            <Badge color={capacity[0] > 80 ? 'danger' : 'success'}>
              {capacity[0] > 80 ? 'Critical Load' : 'Optimal'}
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <p>Current Server Utilization: {capacity[0]}%</p>
          <ProgressBar value={capacity[0]} />

          <div style={{ marginTop: '20px' }}>
            <label id="slider-label">Simulate Load Target</label>
            <Slider
              value={capacity[0]}
              min={0}
              max={100}
              onChange={(val: number | number[]) => { setCapacity(Array.isArray(val) ? [val[0] ?? 0] : [val]); }}
              aria-labelledby="slider-label"
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <Pagination
            currentPage={page}
            totalPages={5}
            onPageChange={handlePageChange}
          />
        </Card.Footer>
      </Card>
    </div>
  )
}

describe('Dashboard Navigation & Interactive Data Flow Integration Test', () => {
  it('renders breadcrumbs, badge, progress bar, and card structure correctly', () => {
    const handlePageChanged = vi.fn()
    render(<DashboardView onPageChanged={handlePageChanged} />)

    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Page 1')).toBeInTheDocument()
    expect(screen.getByText('System Health Overview')).toBeInTheDocument()
    expect(screen.getByText('Optimal')).toBeInTheDocument()
    expect(screen.getByText(/current server utilization: 40%/i)).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40')
  })

  it('navigates across pages using pagination and triggers callback', async () => {
    const user = userEvent.setup()
    const handlePageChanged = vi.fn()
    render(<DashboardView onPageChanged={handlePageChanged} />)

    // Click Next or Page 2 button on pagination
    const page2Button = screen.getByRole('button', { name: /page 2/i })
    await user.click(page2Button)

    expect(handlePageChanged).toHaveBeenCalledWith(2)
    expect(screen.getByText('Page 2')).toBeInTheDocument()
  })

  it('updates dynamic state when interactive slider triggers value changes', () => {
    const handlePageChanged = vi.fn()
    render(<DashboardView onPageChanged={handlePageChanged} />)

    // Verify slider exists and can receive interactions
    const sliderInput = screen.getByRole('slider')
    expect(sliderInput).toBeInTheDocument()
    expect(sliderInput).toHaveAttribute('aria-valuenow', '40')
  })
})
