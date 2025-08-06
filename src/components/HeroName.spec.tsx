import { render, screen } from '@testing-library/react'

import { HeroName } from './HeroName'

describe('HeroName', () => {
  it('displays name as heading', () => {
    render(<HeroName />)
    
    expect(screen.getByRole('heading', { name: 'Jordy van Vorselen', level: 1 })).toBeVisible()
  })
})