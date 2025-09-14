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
    expect(screen.getAllByRole('article')).toHaveLength(3)

    // Check first project
    expect(
      screen.getByRole('heading', { name: 'Go + Templ + HTMX @ Vercel' })
    ).toBeVisible()
    expect(
      screen.getByText(/A Vercel template for Go projects using Templ and HTMX/)
    ).toBeVisible()

    // Check technologies are displayed (using getAllByText since they appear multiple times)
    expect(screen.getAllByText('Go').length).toBeGreaterThan(0)
    expect(screen.getAllByText('HTMX').length).toBeGreaterThan(0)
  })
})
