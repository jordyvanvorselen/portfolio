import { render, screen } from '@testing-library/react'

import { Card } from '@/ui/Card'

describe('Card', () => {
  it('renders with correct accessibility role', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    )

    expect(screen.getByRole('article')).toBeInTheDocument()
  })
})
