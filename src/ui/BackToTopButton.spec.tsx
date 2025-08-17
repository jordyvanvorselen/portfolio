import { render, screen, fireEvent } from '@testing-library/react'

import { BackToTopButton } from '@/ui/BackToTopButton'

describe('BackToTopButton', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    global.window.scrollTo = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe.each([
    { scenario: 'default behavior', onClick: undefined },
    { scenario: 'custom onClick', onClick: jest.fn() },
  ])('onClick prop: $scenario', ({ onClick }) => {
    it('renders back to top button', () => {
      render(<BackToTopButton {...(onClick ? { onClick } : {})} />)

      expect(screen.getByRole('button', { name: /Back to top/ })).toBeVisible()
    })
  })

  describe.each([
    {
      scenario: 'default behavior',
      onClick: undefined,
      expectedScrollToCalls: 1,
      expectedCustomCalls: 0,
    },
    {
      scenario: 'custom onClick',
      onClick: jest.fn(),
      expectedScrollToCalls: 0,
      expectedCustomCalls: 1,
    },
  ])(
    'click interaction: $scenario',
    ({ scenario, onClick, expectedScrollToCalls, expectedCustomCalls }) => {
      it(`handles ${scenario} correctly`, () => {
        render(<BackToTopButton {...(onClick ? { onClick } : {})} />)

        const button = screen.getByRole('button', { name: /Back to top/ })
        fireEvent.click(button)

        if (expectedScrollToCalls > 0) {
          expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
          })
          expect(window.scrollTo).toHaveBeenCalledTimes(expectedScrollToCalls)
        } else {
          expect(window.scrollTo).not.toHaveBeenCalled()
        }

        if (expectedCustomCalls > 0) {
          expect(onClick).toHaveBeenCalledTimes(expectedCustomCalls)
        }
      })
    }
  )
})
