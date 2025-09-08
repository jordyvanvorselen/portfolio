import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '@/ui/LanguageSwitcher'

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en'),
}))

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
})

describe('LanguageSwitcher', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockUseLocale = require('next-intl').useLocale as jest.Mock

  beforeEach(() => {
    document.cookie = ''
  })

  describe('English locale (en)', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('en')
    })

    it('renders button with Dutch flag when current locale is English', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Switch to Dutch')
      expect(button).toHaveAttribute('title', 'Switch to Dutch')

      const flag = screen.getByRole('img')
      expect(flag).toHaveAttribute('aria-label', 'Dutch flag')
      expect(flag).toHaveTextContent('🇳🇱')
    })

    it('switches to Dutch locale when clicked', () => {
      const implSymbol = Reflect.ownKeys(window.location).find(
        i => typeof i === 'symbol'
      )!

      const reload = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn((window.location as any)[implSymbol], 'reload')
        .mockImplementation(() => {})

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Should set cookie for Dutch locale
      expect(document.cookie).toContain('locale=nl')
      expect(document.cookie).toContain('path=/')
      expect(document.cookie).toContain('max-age=31536000') // 1 year in seconds

      // Should reload the page
      expect(reload).toHaveBeenCalledTimes(1)
    })
  })

  describe('Dutch locale (nl)', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('nl')
    })

    it('renders button with British flag when current locale is Dutch', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Switch to English')
      expect(button).toHaveAttribute('title', 'Switch to English')

      const flag = screen.getByRole('img')
      expect(flag).toHaveAttribute('aria-label', 'English flag')
      expect(flag).toHaveTextContent('🇬🇧')
    })

    it('switches to English locale when clicked', () => {
      const implSymbol = Reflect.ownKeys(window.location).find(
        i => typeof i === 'symbol'
      )!

      const reload = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn((window.location as any)[implSymbol], 'reload')
        .mockImplementation(() => {})

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Should set cookie for English locale
      expect(document.cookie).toContain('locale=en')

      // Should reload the page
      expect(reload).toHaveBeenCalledTimes(1)
    })
  })

  describe('className prop', () => {
    it('applies custom className', () => {
      mockUseLocale.mockReturnValue('en')

      render(<LanguageSwitcher className="custom-class" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('applies default empty className when not provided', () => {
      mockUseLocale.mockReturnValue('en')

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center'
      )
    })
  })

  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      mockUseLocale.mockReturnValue('en')

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('title')

      const flag = screen.getByRole('img')
      expect(flag).toHaveAttribute('aria-label')
    })

    it('has focus management classes', () => {
      mockUseLocale.mockReturnValue('en')

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-1'
      )
    })
  })
})
