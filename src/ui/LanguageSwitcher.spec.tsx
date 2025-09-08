import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '@/ui/LanguageSwitcher'

const mockUseTranslations = jest.fn(() => jest.fn((key: string) => key))
const mockSwitchLanguage = jest.fn()
const mockUseLanguageSwitch = jest.fn(() => ({
  currentLocale: 'en',
  targetLocale: 'nl',
  switchLanguage: mockSwitchLanguage,
  availableLocales: ['en', 'nl'],
}))

jest.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations(),
}))

// Override the global mock to use our local controllable mock
jest.mock('@/hooks/useLanguageSwitch', () => ({
  useLanguageSwitch: () => mockUseLanguageSwitch(),
}))

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('English locale (en)', () => {
    beforeEach(() => {
      mockUseLanguageSwitch.mockReturnValue({
        currentLocale: 'en',
        targetLocale: 'nl',
        switchLanguage: mockSwitchLanguage,
        availableLocales: ['en', 'nl'],
      })
    })

    it('renders button with Dutch flag when current locale is English', () => {
      const { container } = render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'dutch')
      expect(button).toHaveAttribute('title', 'dutch')

      const flagElement = container.querySelector('.fi-nl')
      expect(flagElement).toBeInTheDocument()
      expect(flagElement).toHaveClass('fi', 'fi-nl', 'w-4', 'h-4')
      expect(flagElement).toHaveAttribute('aria-hidden', 'true')
    })

    it('calls switchLanguage when clicked', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockSwitchLanguage).toHaveBeenCalledTimes(1)
    })
  })

  describe('Dutch locale (nl)', () => {
    beforeEach(() => {
      mockUseLanguageSwitch.mockReturnValue({
        currentLocale: 'nl',
        targetLocale: 'en',
        switchLanguage: mockSwitchLanguage,
        availableLocales: ['en', 'nl'],
      })
    })

    it('renders button with British flag when current locale is Dutch', () => {
      const { container } = render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'english')
      expect(button).toHaveAttribute('title', 'english')

      const flagElement = container.querySelector('.fi-gb')
      expect(flagElement).toBeInTheDocument()
      expect(flagElement).toHaveClass('fi', 'fi-gb', 'w-4', 'h-4')
      expect(flagElement).toHaveAttribute('aria-hidden', 'true')
    })

    it('calls switchLanguage when clicked', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockSwitchLanguage).toHaveBeenCalledTimes(1)
    })
  })

  describe('className prop', () => {
    beforeEach(() => {
      mockUseLanguageSwitch.mockReturnValue({
        currentLocale: 'en',
        targetLocale: 'nl',
        switchLanguage: mockSwitchLanguage,
        availableLocales: ['en', 'nl'],
      })
    })

    it('applies custom className', () => {
      render(<LanguageSwitcher className="custom-class" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('applies default empty className when not provided', () => {
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
    beforeEach(() => {
      mockUseLanguageSwitch.mockReturnValue({
        currentLocale: 'en',
        targetLocale: 'nl',
        switchLanguage: mockSwitchLanguage,
        availableLocales: ['en', 'nl'],
      })
    })

    it('has proper ARIA attributes', () => {
      const { container } = render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('title')

      const flagElement = container.querySelector('.fi-nl')
      expect(flagElement).toHaveAttribute('aria-hidden', 'true')
    })

    it('has focus management classes', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-1'
      )
    })
  })

  describe('showText prop', () => {
    beforeEach(() => {
      mockUseLanguageSwitch.mockReturnValue({
        currentLocale: 'en',
        targetLocale: 'nl',
        switchLanguage: mockSwitchLanguage,
        availableLocales: ['en', 'nl'],
      })
    })

    it('shows text when showText prop is true', () => {
      render(<LanguageSwitcher showText={true} />)

      expect(screen.getByText('dutch')).toBeVisible()
    })

    it('does not show text when showText prop is false or not provided', () => {
      render(<LanguageSwitcher showText={false} />)

      expect(screen.queryByText('dutch')).not.toBeInTheDocument()
    })

    it('applies different styling when showText is true', () => {
      render(<LanguageSwitcher showText={true} />)

      const button = screen.getByRole('button', { name: 'dutch' })
      expect(button).toHaveClass('gap-3', 'px-4', 'py-3')
      expect(button).not.toHaveClass('w-10', 'h-10')
    })

    it('applies compact styling when showText is false', () => {
      render(<LanguageSwitcher showText={false} />)

      const button = screen.getByRole('button', { name: 'dutch' })
      expect(button).toHaveClass('w-10', 'h-10')
      expect(button).not.toHaveClass('gap-3', 'px-4', 'py-3')
    })
  })

  describe('onClick callback', () => {
    beforeEach(() => {
      mockUseLanguageSwitch.mockReturnValue({
        currentLocale: 'en',
        targetLocale: 'nl',
        switchLanguage: mockSwitchLanguage,
        availableLocales: ['en', 'nl'],
      })
    })

    it('calls onClick callback when provided', () => {
      const mockOnClick = jest.fn()
      render(<LanguageSwitcher onClick={mockOnClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockSwitchLanguage).toHaveBeenCalledTimes(1)
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('does not error when onClick callback is not provided', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockSwitchLanguage).toHaveBeenCalledTimes(1)
      // No error should be thrown
    })
  })
})
