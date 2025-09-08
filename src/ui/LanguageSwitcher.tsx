'use client'

import { useTranslations } from 'next-intl'
import { FlagIcon } from '@/ui/FlagIcon'
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch'

interface LanguageSwitcherProps {
  className?: string
  showText?: boolean
  onClick?: () => void
}

export const LanguageSwitcher = ({
  className = '',
  showText = false,
  onClick,
}: LanguageSwitcherProps) => {
  const { currentLocale, switchLanguage } = useLanguageSwitch()
  const t = useTranslations('ui.languageSwitcher')

  const getFlagCountry = () => {
    return currentLocale === 'en' ? 'nl' : 'gb'
  }

  const getLanguageText = () => {
    return currentLocale === 'en' ? t('dutch') : t('english')
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling to parent container
    switchLanguage()
    onClick?.() // Call optional callback if provided
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center ${showText ? 'gap-3 px-4 py-3' : 'w-10 h-10'} text-lg hover:bg-gray-800 transition-all duration-300 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
      aria-label={getLanguageText()}
      title={getLanguageText()}
    >
      <FlagIcon country={getFlagCountry()} className="w-4 h-4" />
      {showText && <span className="text-gray-300">{getLanguageText()}</span>}
    </button>
  )
}
