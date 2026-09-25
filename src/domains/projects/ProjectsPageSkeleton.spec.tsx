import { render, screen } from '@testing-library/react'

import { ProjectsPageSkeleton } from '@/domains/projects/ProjectsPageSkeleton'

describe('ProjectsPageSkeleton', () => {
  it('tells screen reader users that the page is loading', () => {
    render(<ProjectsPageSkeleton />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'pages.projects.loading'
    )
  })

  it('shows placeholders for the hero and the first projects', () => {
    render(<ProjectsPageSkeleton />)

    expect(screen.getByTestId('page-hero-skeleton')).toBeVisible()
    expect(screen.getAllByTestId('project-skeleton')).toHaveLength(2)
  })
})
