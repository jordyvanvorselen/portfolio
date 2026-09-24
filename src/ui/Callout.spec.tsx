import { render, screen } from '@testing-library/react'

import { Callout } from '@/ui/Callout'

describe('Callout', () => {
  it('highlights its content as a note', () => {
    render(
      <Callout>
        <p>9 engineers share 30 rules</p>
      </Callout>
    )

    expect(screen.getByRole('note')).toHaveTextContent(
      '9 engineers share 30 rules'
    )
  })
})
