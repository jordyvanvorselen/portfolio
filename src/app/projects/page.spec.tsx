import { render, screen } from '@testing-library/react'

import ProjectsPage, { metadata } from '@/app/projects/page'

describe('ProjectsPage', () => {
  it('renders projects hero section', () => {
    render(<ProjectsPage />)

    expect(
      screen.getByRole('heading', { name: 'Open Source Projects' })
    ).toBeVisible()
    expect(
      screen.getByText(/A collection of innovative software solutions/i)
    ).toBeVisible()
  })

  it('displays project statistics in hero', () => {
    render(<ProjectsPage />)

    expect(screen.getByText('6')).toBeVisible()
    expect(screen.getByText('12,037')).toBeVisible()
    expect(screen.getByText('1,543')).toBeVisible()
  })

  it('renders projects grid section', () => {
    render(<ProjectsPage />)

    expect(screen.getByRole('region', { name: 'projects grid' })).toBeVisible()
    expect(screen.getByText(/A powerful orchestration platform/)).toBeVisible()
  })

  it('renders collaboration section', () => {
    render(<ProjectsPage />)

    expect(screen.getByRole('region', { name: 'collaboration' })).toBeVisible()
    expect(
      screen.getByRole('heading', {
        name: /Let's Build Something Amazing Together/i,
      })
    ).toBeVisible()
    expect(
      screen.getByText(/Interested in collaborating on open source projects/i)
    ).toBeVisible()
  })

  it('has correct metadata', () => {
    expect(metadata.title).toBe('Projects - Jordy van Vorselen')
    expect(metadata.description).toBe(
      'Projects and open source contributions by Jordy van Vorselen'
    )
  })
})
