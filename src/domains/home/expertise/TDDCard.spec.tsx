import { render, screen } from '@testing-library/react'

import { TDDCard } from '@/domains/home/expertise/TDDCard'

describe('TDDCard', () => {
  it('has correct aria-label', () => {
    render(<TDDCard />)

    expect(screen.getByLabelText('expertise.tdd.ariaLabel')).toBeVisible()
  })

  it('displays test tube icon', () => {
    render(<TDDCard />)

    const icon = screen.getByLabelText('test tube icon')
    expect(icon).toBeVisible()
  })

  it('displays title heading', () => {
    render(<TDDCard />)

    expect(
      screen.getByRole('heading', { name: 'expertise.tdd.title' })
    ).toBeVisible()
  })

  it('displays description text', () => {
    render(<TDDCard />)

    expect(screen.getByText('expertise.tdd.description')).toBeVisible()
  })

  it('displays KEY SKILLS & TOOLS section heading', () => {
    render(<TDDCard />)

    expect(screen.getByText('KEY SKILLS & TOOLS')).toBeVisible()
  })

  it('displays skill badges', () => {
    render(<TDDCard />)

    expect(screen.getByText('Jest')).toBeVisible()
    expect(screen.getByText('Cypress')).toBeVisible()
    expect(screen.getByText('Testing Library')).toBeVisible()
    expect(screen.getByText('Unit Testing')).toBeVisible()
    expect(screen.getByText('Integration Testing')).toBeVisible()
    expect(screen.getByText('E2E Testing')).toBeVisible()
  })

  it('displays publications section', () => {
    render(<TDDCard />)

    expect(screen.getByText('12')).toBeVisible()
    expect(screen.getByText('Publications')).toBeVisible()
    expect(screen.getByText('on this topic')).toBeVisible()
  })
})
