import { render, screen } from '@testing-library/react'

import { ProjectsHero } from '@/domains/projects/ProjectsHero'

describe('ProjectsHero', () => {
  it('renders hero section with project statistics', () => {
    render(<ProjectsHero />)

    expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
    expect(
      screen.getByText(/A collection of innovative software solutions/i)
    ).toBeVisible()
  })

  it('displays hardcoded project statistics', () => {
    render(<ProjectsHero />)

    expect(screen.getByText('6')).toBeVisible()
    expect(screen.getByText('12,037')).toBeVisible()
    expect(screen.getByText('1,543')).toBeVisible()
    expect(screen.getByText('Projects')).toBeVisible()
    expect(screen.getByText('Stars')).toBeVisible()
    expect(screen.getByText('Forks')).toBeVisible()
  })
})
