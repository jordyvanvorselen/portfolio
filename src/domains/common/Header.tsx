import { Github, Linkedin } from 'lucide-react'

import { Logo } from '@/ui/Logo'
import { NavigationLink } from '@/ui/NavigationLink'
import { SocialIcon } from '@/ui/SocialIcon'
import { CircleCheckBig } from 'lucide-react'

import { Text } from '@/ui/Text'

export const Header = () => {
  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between"
          style={{ height: 'var(--header-height)' }}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Navigation - Hidden on mobile, visible on larger screens */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationLink
              href="/"
              variant="default"
              size="md"
              color="primary"
            >
              Home
            </NavigationLink>
            <NavigationLink
              href="/blog"
              variant="default"
              size="md"
              color="primary"
            >
              Blog
            </NavigationLink>
            <NavigationLink
              href="/projects"
              variant="default"
              size="md"
              color="primary"
            >
              Projects
            </NavigationLink>
            <NavigationLink
              href="/experience"
              variant="default"
              size="md"
              color="primary"
            >
              Experience
            </NavigationLink>
            <NavigationLink
              href="/contact"
              variant="default"
              size="md"
              color="primary"
            >
              Contact
            </NavigationLink>
          </nav>

          {/* Actions - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <SocialIcon
                href="https://github.com/jordyvanvorselen"
                label="GitHub"
                icon={Github}
                variant="icon"
                size="md"
                color="muted"
                interactive="hover"
              />
              <SocialIcon
                href="https://linkedin.com/in/jordy-van-vorselen"
                label="LinkedIn"
                icon={Linkedin}
                variant="icon"
                size="md"
                color="muted"
                interactive="hover"
              />
            </div>

            <div className="w-px h-6 bg-gray-700"></div>

            <address className="flex items-center justify-center space-x-2 not-italic">
              <CircleCheckBig className="w-5 h-5 text-[#10b981]" role="img" />
              <Text size="base" weight="semibold" color="success">
                Available
              </Text>
            </address>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Open navigation menu"
              className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-3 text-xs text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
                <path d="M4 6h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
