import { render, screen } from '@testing-library/react'

import { ExpertiseCallToAction } from '@/domains/home/expertise/ExpertiseCallToAction'

describe('ExpertiseCallToAction', () => {
  it('displays the main question text', () => {
    render(<ExpertiseCallToAction />)

    expect(screen.getByText('expertise.callToAction.description')).toBeVisible()
  })

  it('displays check icon', () => {
    render(<ExpertiseCallToAction />)

    const icon = screen.getByRole('img', { hidden: true })
    expect(icon).toBeVisible()
  })

  it('displays availability message', () => {
    render(<ExpertiseCallToAction />)

    expect(
      screen.getByText('expertise.callToAction.availability')
    ).toBeVisible()
  })
})
