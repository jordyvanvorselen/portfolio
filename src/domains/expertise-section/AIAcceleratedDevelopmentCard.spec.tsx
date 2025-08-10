import { render, screen } from '@testing-library/react'

import { AIAcceleratedDevelopmentCard } from '@/domains/expertise-section/AIAcceleratedDevelopmentCard'

describe('AIAcceleratedDevelopmentCard', () => {
  it('displays zap icon', () => {
    render(<AIAcceleratedDevelopmentCard />)

    const icon = screen.getByLabelText('zap icon')
    expect(icon).toBeVisible()
  })

  it('displays title heading', () => {
    render(<AIAcceleratedDevelopmentCard />)

    expect(
      screen.getByRole('heading', { name: 'AI-Accelerated Development' })
    ).toBeVisible()
  })

  it('displays description text', () => {
    render(<AIAcceleratedDevelopmentCard />)

    expect(
      screen.getByText(
        /I leverage AI tools to accelerate team velocity while maintaining code quality/
      )
    ).toBeVisible()
  })

  it('displays key skills and tools section', () => {
    render(<AIAcceleratedDevelopmentCard />)

    expect(screen.getByText('KEY SKILLS & TOOLS')).toBeVisible()
  })

  it('displays skill badges', () => {
    render(<AIAcceleratedDevelopmentCard />)

    expect(screen.getByText('Claude Code')).toBeVisible()
    expect(screen.getByText('Trunk-Based Development')).toBeVisible()
    expect(screen.getByText('Continuous Deployment')).toBeVisible()
    expect(screen.getByText('Pair Programming')).toBeVisible()
    expect(screen.getByText('Automated Testing')).toBeVisible()
  })

  it('displays publications section', () => {
    render(<AIAcceleratedDevelopmentCard />)

    expect(screen.getByText('15')).toBeVisible()
    expect(screen.getByText('Publications')).toBeVisible()
    expect(screen.getByText('on this topic')).toBeVisible()
  })
})
