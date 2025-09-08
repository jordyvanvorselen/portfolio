import { render, screen } from '@testing-library/react'

import { ContinuousDeliveryCard } from '@/domains/home/expertise/ContinuousDeliveryCard'

describe('ContinuousDeliveryCard', () => {
  it('displays rocket icon', () => {
    render(<ContinuousDeliveryCard />)

    const icon = screen.getByLabelText('rocket icon')
    expect(icon).toBeVisible()
  })

  it('displays title heading', () => {
    render(<ContinuousDeliveryCard />)

    expect(
      screen.getByRole('heading', { name: 'expertise.delivery.title' })
    ).toBeVisible()
  })

  it('displays description text', () => {
    render(<ContinuousDeliveryCard />)

    expect(screen.getByText('expertise.delivery.description')).toBeVisible()
  })

  it('displays key skills and tools section', () => {
    render(<ContinuousDeliveryCard />)

    expect(screen.getByText('KEY SKILLS & TOOLS')).toBeVisible()
  })

  it('displays skill badges', () => {
    render(<ContinuousDeliveryCard />)

    expect(screen.getByText('GitHub Actions')).toBeVisible()
    expect(screen.getByText('Docker & Kubernetes')).toBeVisible()
    expect(screen.getByText('Infrastructure as Code')).toBeVisible()
    expect(screen.getByText('Progressive Deployment')).toBeVisible()
    expect(screen.getByText('Automated Rollbacks')).toBeVisible()
  })

  it('displays publications section', () => {
    render(<ContinuousDeliveryCard />)

    expect(screen.getByText('18')).toBeVisible()
    expect(screen.getByText('Publications')).toBeVisible()
    expect(screen.getByText('on this topic')).toBeVisible()
  })
})
