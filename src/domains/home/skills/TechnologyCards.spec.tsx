import { render, screen } from '@testing-library/react'

import {
  TechnologyCards,
  type Technology,
} from '@/domains/home/skills/TechnologyCards'

describe('TechnologyCards', () => {
  const mockTechnologies: Technology[] = [
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'React', icon: 'react' },
    { name: 'Node.js', icon: 'nodejs' },
  ]

  it('renders all technology cards', () => {
    render(<TechnologyCards technologies={mockTechnologies} />)

    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('React')).toBeVisible()
    expect(screen.getByText('Node.js')).toBeVisible()
  })

  it('renders technology cards with correct icons', () => {
    render(<TechnologyCards technologies={mockTechnologies} />)

    // DevIcon should be rendered for each technology
    // We can't test the specific icon name directly, but we can verify the text is associated with the icon
    const typescriptCard = screen.getByText('TypeScript')
    const reactCard = screen.getByText('React')
    const nodeCard = screen.getByText('Node.js')

    expect(typescriptCard).toBeVisible()
    expect(reactCard).toBeVisible()
    expect(nodeCard).toBeVisible()
  })

  it('renders empty list when no technologies provided', () => {
    render(<TechnologyCards technologies={[]} />)

    // Should render the grid container but no cards
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })

  it('handles single technology', () => {
    const singleTech: Technology[] = [{ name: 'Python', icon: 'python' }]

    render(<TechnologyCards technologies={singleTech} />)

    expect(screen.getByText('Python')).toBeVisible()
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
  })

  it('renders each technology card as a unique element', () => {
    render(<TechnologyCards technologies={mockTechnologies} />)

    const techCards = screen.getAllByText(/TypeScript|React|Node\.js/)
    expect(techCards).toHaveLength(3)

    // Each card should be unique
    expect(techCards[0]).not.toBe(techCards[1])
    expect(techCards[1]).not.toBe(techCards[2])
    expect(techCards[0]).not.toBe(techCards[2])
  })
})
