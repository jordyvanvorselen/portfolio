'use client'

import { useLocale } from 'next-intl'

interface LanguageSwitcherProps {
  className?: string
}

export const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const currentLocale = useLocale()

  const handleLanguageSwitch = () => {
    const newLocale = currentLocale === 'en' ? 'nl' : 'en'

    // Set cookie for locale preference
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year

    // Refresh the page to apply new locale
    window.location.reload()
  }

  const getFlagEmoji = () => {
    return currentLocale === 'en' ? '🇳🇱' : '🇬🇧'
  }

  return (
    <button
      onClick={handleLanguageSwitch}
      className={`inline-flex items-center justify-center w-10 h-10 text-lg hover:bg-gray-800 transition-all duration-300 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
      aria-label={`Switch to ${currentLocale === 'en' ? 'Dutch' : 'English'}`}
      title={`Switch to ${currentLocale === 'en' ? 'Dutch' : 'English'}`}
    >
      <span
        role="img"
        aria-label={`${currentLocale === 'en' ? 'Dutch' : 'English'} flag`}
      >
        {getFlagEmoji()}
      </span>
    </button>
  )
}
