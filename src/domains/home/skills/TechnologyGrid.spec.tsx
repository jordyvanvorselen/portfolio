import { render, screen } from '@testing-library/react'

import { TechnologyGrid } from '@/domains/home/skills/TechnologyGrid'

describe('TechnologyGrid', () => {
  it('renders all 10 technology cards', () => {
    render(<TechnologyGrid />)

    // Verify all 10 technologies are displayed
    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('Java')).toBeVisible()
    expect(screen.getByText('Elixir')).toBeVisible()
    expect(screen.getByText('Python')).toBeVisible()
    expect(screen.getByText('Ruby')).toBeVisible()
    expect(screen.getByText('C#')).toBeVisible()
    expect(screen.getByText('AWS')).toBeVisible()
    expect(screen.getByText('Flutter')).toBeVisible()
    expect(screen.getByText('DevOps')).toBeVisible()
    expect(screen.getByText('Blockchain')).toBeVisible()
  })

  it('renders TechnologyCards component', () => {
    render(<TechnologyGrid />)

    // Verify that technology cards are rendered in a grid structure
    const typescriptCard = screen.getByText('TypeScript')
    const javaCard = screen.getByText('Java')

    expect(typescriptCard).toBeVisible()
    expect(javaCard).toBeVisible()
  })

  it('renders within proper container structure', () => {
    render(<TechnologyGrid />)

    // Verify the component renders with the expected structure
    const typescriptCard = screen.getByText('TypeScript')
    expect(typescriptCard.closest('div')).toBeInTheDocument()
  })
})
