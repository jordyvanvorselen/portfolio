import { render, screen } from '@testing-library/react'

import { ProjectsGrid } from '@/domains/projects/ProjectsGrid'

describe('ProjectsGrid', () => {
  it('renders projects grid section with translated content', () => {
    render(<ProjectsGrid />)

    expect(screen.getByRole('region', { name: 'projects grid' })).toBeVisible()
    expect(screen.getByText('projects.grid.title')).toBeVisible()
    expect(screen.getByText('projects.grid.description')).toBeVisible()
  })

  it('renders project cards from mock data', () => {
    render(<ProjectsGrid />)

    // Check that we have multiple project cards
    expect(screen.getAllByRole('article')).toHaveLength(6)

    // Check first project
    expect(
      screen.getByRole('heading', { name: 'Microservice Orchestrator' })
    ).toBeVisible()
    expect(screen.getByText(/A powerful orchestration platform/)).toBeVisible()

    // Check technologies are displayed (using getAllByText since they appear multiple times)
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Kubernetes').length).toBeGreaterThan(0)
  })
})
