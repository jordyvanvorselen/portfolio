import { render, screen } from '@testing-library/react'

import { ExpertiseCallToAction } from '@/domains/expertise-section/ExpertiseCallToAction'

describe('ExpertiseCallToAction', () => {
  it('displays the main question text', () => {
    render(<ExpertiseCallToAction />)

    expect(
      screen.getByText(
        'Ready to discuss how these skills can benefit your project?'
      )
    ).toBeVisible()
  })

  it('displays check icon', () => {
    render(<ExpertiseCallToAction />)

    const icon = screen.getByRole('img', { hidden: true })
    expect(icon).toBeVisible()
  })

  it('displays availability message', () => {
    render(<ExpertiseCallToAction />)

    expect(
      screen.getByText(
        'Available for remote consulting and full-time opportunities'
      )
    ).toBeVisible()
  })
})
