import { render, screen } from '@testing-library/react'

import { ProjectsHero } from '@/domains/projects/ProjectsHero'

describe('ProjectsHero', () => {
  const mockProps = {
    totalProjects: 15,
    totalStars: 2500,
    totalForks: 425,
  }

  it('renders hero section with project statistics', () => {
    render(<ProjectsHero {...mockProps} />)

    expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
    expect(screen.getByText(/crafting innovative solutions/i)).toBeVisible()
  })

  it('displays correct project statistics', () => {
    render(<ProjectsHero {...mockProps} />)

    expect(screen.getByText('15')).toBeVisible()
    expect(screen.getByText('2,500')).toBeVisible()
    expect(screen.getByText('425')).toBeVisible()
    expect(screen.getAllByText('Projects')).toHaveLength(2) // Title and stats
    expect(screen.getByText('Stars')).toBeVisible()
    expect(screen.getByText('Forks')).toBeVisible()
  })

  it('formats large numbers with commas', () => {
    render(
      <ProjectsHero totalProjects={5} totalStars={10000} totalForks={1500} />
    )

    expect(screen.getByText('10,000')).toBeVisible()
    expect(screen.getByText('1,500')).toBeVisible()
  })
})
