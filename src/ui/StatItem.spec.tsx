import { render, screen } from '@testing-library/react'

import { StatItem } from '@/ui/StatItem'

describe('StatItem', () => {
  it('renders stat with value and label', () => {
    render(<StatItem value={15} label="Projects" />)

    expect(screen.getByText('15')).toBeVisible()
    expect(screen.getByText('Projects')).toBeVisible()
  })

  it('formats large numbers with commas', () => {
    render(<StatItem value={2500} label="Stars" />)

    expect(screen.getByText('2,500')).toBeVisible()
  })

  it('accepts different hover colors', () => {
    render(<StatItem value={100} label="Test" hoverColor="teal" />)

    expect(screen.getByText('100')).toBeVisible()
    expect(screen.getByText('Test')).toBeVisible()
  })

  it('accepts custom className', () => {
    render(<StatItem value={50} label="Custom" className="custom-class" />)

    expect(screen.getByText('50')).toBeVisible()
    expect(screen.getByText('Custom')).toBeVisible()
  })

  it('renders with icon when provided', () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>
    render(<StatItem value={25} label="Test" icon={<TestIcon />} />)

    expect(screen.getByTestId('test-icon')).toBeVisible()
    expect(screen.getByText('25')).toBeVisible()
    expect(screen.getByText('Test')).toBeVisible()
  })

  it('renders without icon when not provided', () => {
    render(<StatItem value={30} label="No Icon" />)

    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
    expect(screen.getByText('30')).toBeVisible()
    expect(screen.getByText('No Icon')).toBeVisible()
  })

  it('renders floating variant for overlay stats', () => {
    render(<StatItem value={2800} label="stars" variant="floating" />)

    expect(screen.getByText('2,800')).toBeVisible()
    // Floating variant doesn't display the label, only the value
    expect(screen.queryByText('stars')).not.toBeInTheDocument()
  })
})
