import { render, screen } from '@testing-library/react'

import { ProjectsCollaboration } from '@/domains/projects/ProjectsCollaboration'

describe('ProjectsCollaboration', () => {
  it('renders collaboration section with translated content', () => {
    render(<ProjectsCollaboration />)

    expect(screen.getByText('projects.collaboration.title')).toBeVisible()
    expect(screen.getByText('projects.collaboration.description')).toBeVisible()
  })

  it('renders action buttons with translated labels', () => {
    render(<ProjectsCollaboration />)

    expect(
      screen.getByText('projects.collaboration.actions.followGithub')
    ).toBeVisible()
    expect(
      screen.getByText('projects.collaboration.actions.getInTouch')
    ).toBeVisible()
  })
})
