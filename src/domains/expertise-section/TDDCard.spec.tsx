import { render, screen } from '@testing-library/react'

import { TDDCard } from '@/domains/expertise-section/TDDCard'

describe('TDDCard', () => {
  it('displays test tube icon', () => {
    render(<TDDCard />)

    const icon = screen.getByLabelText('test tube icon')
    expect(icon).toBeVisible()
  })

  it('displays title heading', () => {
    render(<TDDCard />)

    expect(
      screen.getByRole('heading', { name: 'Test-Driven Development' })
    ).toBeVisible()
  })

  it('displays description text', () => {
    render(<TDDCard />)

    expect(
      screen.getByText(
        'I write tests first, then code. This approach ensures robust, bug-free software with comprehensive test coverage. My TDD practice leads to better design decisions and maintainable codebases.'
      )
    ).toBeVisible()
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
})