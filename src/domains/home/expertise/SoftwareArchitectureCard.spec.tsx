import { render, screen } from '@testing-library/react'

import { SoftwareArchitectureCard } from '@/domains/home/expertise/SoftwareArchitectureCard'

describe('SoftwareArchitectureCard', () => {
  it('has correct aria-label', () => {
    render(<SoftwareArchitectureCard />)

    expect(
      screen.getByLabelText('expertise.architecture.ariaLabel')
    ).toBeVisible()
  })

  it('displays layers icon', () => {
    render(<SoftwareArchitectureCard />)

    const icon = screen.getByLabelText('layers icon')
    expect(icon).toBeVisible()
  })

  it('displays title heading', () => {
    render(<SoftwareArchitectureCard />)

    expect(
      screen.getByRole('heading', { name: 'expertise.architecture.title' })
    ).toBeVisible()
  })

  it('displays description text', () => {
    render(<SoftwareArchitectureCard />)

    expect(screen.getByText('expertise.architecture.description')).toBeVisible()
  })

  it('displays KEY SKILLS & TOOLS section heading', () => {
    render(<SoftwareArchitectureCard />)

    expect(screen.getByText('KEY SKILLS & TOOLS')).toBeVisible()
  })

  it('displays skill badges', () => {
    render(<SoftwareArchitectureCard />)

    expect(screen.getByText('Microservices')).toBeVisible()
    expect(screen.getByText('Domain-Driven Design')).toBeVisible()
    expect(screen.getByText('Event Sourcing')).toBeVisible()
    expect(screen.getByText('CQRS')).toBeVisible()
    expect(screen.getByText('Clean Architecture')).toBeVisible()
    expect(screen.getByText('Hexagonal Architecture')).toBeVisible()
  })

  it('displays publications section', () => {
    render(<SoftwareArchitectureCard />)

    expect(screen.getByText('8')).toBeVisible()
    expect(screen.getByText('Publications')).toBeVisible()
    expect(screen.getByText('on this topic')).toBeVisible()
  })
})
