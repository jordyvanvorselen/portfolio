import { useState, useEffect } from 'react'
import { Github, Linkedin, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { NavigationLink } from '@/ui/NavigationLink'
import { SocialIcon } from '@/ui/SocialIcon'
import { LanguageSwitcher } from '@/ui/LanguageSwitcher'
import { MobileMenuOverlay } from '@/ui/MobileMenuOverlay'
import { MobileMenuButton } from '@/ui/MobileMenuButton'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations()
  const [clickingItem, setClickingItem] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const handleItemClick = (itemId: string, callback?: () => void) => {
    setClickingItem(itemId)

    // Add slight delay to show animation
    setTimeout(() => {
      callback?.()
      onClose()
      setClickingItem(null)
    }, 150)
  }

  return (
    <MobileMenuOverlay isVisible={isOpen} data-testid="mobile-menu">
      <div className="flex flex-col h-full min-h-0">
        {/* Header with close button */}
        <div className="flex justify-end p-4 flex-shrink-0">
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 w-10 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Menu content */}
        <div className="flex-1 flex flex-col justify-evenly px-6 py-4 min-h-0 max-h-full overflow-y-auto">
          {/* Navigation Links */}
          <nav aria-label="Main navigation" className="space-y-3">
            <MobileMenuButton
              onClick={() => handleItemClick('home')}
              isPressed={clickingItem === 'home'}
            >
              <NavigationLink
                href="/"
                variant="ghost"
                size="lg"
                color="primary"
                className="w-full justify-center py-2.5 text-lg sm:py-3 sm:text-xl"
              >
                {t('navigation.home')}
              </NavigationLink>
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleItemClick('blog')}
              isPressed={clickingItem === 'blog'}
            >
              <NavigationLink
                href="/blog"
                variant="ghost"
                size="lg"
                color="primary"
                className="w-full justify-center py-2.5 text-lg sm:py-3 sm:text-xl"
              >
                {t('navigation.blog')}
              </NavigationLink>
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleItemClick('projects')}
              isPressed={clickingItem === 'projects'}
            >
              <NavigationLink
                href="/projects"
                variant="ghost"
                size="lg"
                color="primary"
                className="w-full justify-center py-2.5 text-lg sm:py-3 sm:text-xl"
              >
                {t('navigation.projects')}
              </NavigationLink>
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleItemClick('experience')}
              isPressed={clickingItem === 'experience'}
            >
              <NavigationLink
                href="/experience"
                variant="ghost"
                size="lg"
                color="primary"
                className="w-full justify-center py-2.5 text-lg sm:py-3 sm:text-xl"
              >
                {t('navigation.experience')}
              </NavigationLink>
            </MobileMenuButton>
            <MobileMenuButton
              onClick={() => handleItemClick('contact')}
              isPressed={clickingItem === 'contact'}
            >
              <NavigationLink
                href="/contact"
                variant="ghost"
                size="lg"
                color="primary"
                className="w-full justify-center py-2.5 text-lg sm:py-3 sm:text-xl"
              >
                {t('navigation.contact')}
              </NavigationLink>
            </MobileMenuButton>
          </nav>

          {/* Social Links */}
          <section aria-labelledby="social-links-heading" className="space-y-3">
            <h2 id="social-links-heading" className="sr-only">
              Social Links
            </h2>
            <SocialIcon
              href="https://github.com/jordyvanvorselen"
              label={t('social.github')}
              icon={Github}
              variant="button"
              size="lg"
              color="secondary"
              interactive="hover"
              className={`w-full justify-center py-4 text-xl transition-all duration-150 ${clickingItem === 'github' ? 'scale-95 opacity-75' : 'hover:scale-105'}`}
              onClick={() => handleItemClick('github')}
            />
            <SocialIcon
              href="https://linkedin.com/in/jordy-van-vorselen"
              label={t('social.linkedin')}
              icon={Linkedin}
              variant="button"
              size="lg"
              color="secondary"
              interactive="hover"
              className={`w-full justify-center py-4 text-xl transition-all duration-150 ${clickingItem === 'linkedin' ? 'scale-95 opacity-75' : 'hover:scale-105'}`}
              onClick={() => handleItemClick('linkedin')}
            />
          </section>

          {/* Language Switcher */}
          <section aria-labelledby="language-heading">
            <h2 id="language-heading" className="sr-only">
              Language Settings
            </h2>
            <div
              className={`flex justify-center transition-all duration-150 ${clickingItem === 'language' ? 'scale-95 opacity-75' : 'hover:scale-105'}`}
            >
              <LanguageSwitcher
                showText={true}
                onClick={() => handleItemClick('language')}
              />
            </div>
          </section>
        </div>
      </div>
    </MobileMenuOverlay>
  )
}
