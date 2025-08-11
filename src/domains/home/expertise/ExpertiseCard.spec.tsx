import { render, screen } from '@testing-library/react'
import { TestTube } from 'lucide-react'

import { ExpertiseCard } from '@/domains/home/expertise/ExpertiseCard'

describe('ExpertiseCard', () => {
  const mockProps = {
    ariaLabel: 'Test Card',
    icon: <TestTube aria-label="test icon" />,
    iconColor: '#10b981',
    title: 'Test Title',
    description: 'Test description text',
    skills: ['Skill 1', 'Skill 2'],
    publicationCount: 5,
    publicationNumberClassName: '',
  }

  it('displays the icon', () => {
    render(<ExpertiseCard {...mockProps} />)

    const icon = screen.getByLabelText('test icon')
    expect(icon).toBeVisible()
  })

  it('displays the title', () => {
    render(<ExpertiseCard {...mockProps} />)

    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeVisible()
  })

  it('displays the description', () => {
    render(<ExpertiseCard {...mockProps} />)

    expect(screen.getByText('Test description text')).toBeVisible()
  })

  it('displays skill badges', () => {
    render(<ExpertiseCard {...mockProps} />)

    expect(screen.getByText('Skill 1')).toBeVisible()
    expect(screen.getByText('Skill 2')).toBeVisible()
  })

  it('displays publication count', () => {
    render(<ExpertiseCard {...mockProps} />)

    expect(screen.getByText('5')).toBeVisible()
    expect(screen.getByText('Publications')).toBeVisible()
    expect(screen.getByText('on this topic')).toBeVisible()
  })
})
