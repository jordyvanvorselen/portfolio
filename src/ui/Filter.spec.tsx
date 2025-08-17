import { render, screen, fireEvent } from '@testing-library/react'

import { Filter } from '@/ui/Filter'

describe('Filter', () => {
  it('renders filter text', () => {
    render(<Filter>All</Filter>)

    expect(screen.getByText('All')).toBeVisible()
  })

  describe.each([['default'], ['active'], ['disabled']])(
    'variant: %s',
    variant => {
      it(`renders with ${variant} variant`, () => {
        render(
          <Filter variant={variant as 'default' | 'active' | 'disabled'}>
            Test Filter
          </Filter>
        )

        expect(screen.getByText('Test Filter')).toBeVisible()
      })
    }
  )

  describe.each([['xs'], ['sm'], ['md'], ['lg']])('size: %s', size => {
    it(`renders with ${size} size`, () => {
      render(
        <Filter size={size as 'xs' | 'sm' | 'md' | 'lg'}>Test Filter</Filter>
      )

      expect(screen.getByText('Test Filter')).toBeVisible()
    })
  })

  describe.each([['default'], ['primary'], ['secondary'], ['accent']])(
    'color: %s',
    color => {
      it(`renders with ${color} color`, () => {
        render(
          <Filter
            color={color as 'default' | 'primary' | 'secondary' | 'accent'}
          >
            Test Filter
          </Filter>
        )

        expect(screen.getByText('Test Filter')).toBeVisible()
      })
    }
  )

  describe('disabled variant behavior', () => {
    it('disables interaction when variant is disabled', () => {
      const handleClick = jest.fn()
      render(
        <Filter variant="disabled" onClick={handleClick}>
          Disabled Filter
        </Filter>
      )

      const filter = screen.getByText('Disabled Filter')
      expect(filter).toBeDisabled()

      fireEvent.click(filter)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('event handling', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn()
      render(<Filter onClick={handleClick}>Clickable</Filter>)

      fireEvent.click(screen.getByText('Clickable'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('prevents click events on disabled filters', () => {
      const handleClick = jest.fn()
      render(
        <Filter variant="disabled" onClick={handleClick}>
          Disabled Filter
        </Filter>
      )

      const filter = screen.getByText('Disabled Filter')
      fireEvent.click(filter)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('prop combinations', () => {
    it('accepts all props combined without errors', () => {
      render(
        <Filter
          variant="active"
          color="primary"
          size="lg"
          className="test-class"
          onClick={() => {}}
        >
          Combined Props Test
        </Filter>
      )

      expect(screen.getByText('Combined Props Test')).toBeVisible()
    })
  })
})
