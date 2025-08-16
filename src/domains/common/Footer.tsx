import { Github, Linkedin, Mail, Heart } from 'lucide-react'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { NavigationLink } from '@/ui/NavigationLink'
import { SocialIcon } from '@/ui/SocialIcon'
import { BackToTopButton } from '@/ui/BackToTopButton'
import { Button } from '@/ui/Button'

export const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="relative bg-gray-950 border-t border-gray-800/50"
    >
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Author Section - spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <Title variant="footer-author">Jordy van Vorselen</Title>
              <Text
                variant="footer-description"
                className="mb-6 max-w-md leading-relaxed"
              >
                Senior Software Engineer passionate about building scalable,
                maintainable software solutions. Always eager to tackle new
                challenges and collaborate with amazing teams.
              </Text>
              <div className="flex items-center text-[#cbd5e1] mb-4">
                <Text variant="footer-info">
                  📍 Noord-Brabant, the Netherlands 🇳🇱
                </Text>
              </div>
              <div className="flex items-center text-[#cbd5e1]">
                <Text variant="footer-info">✉️ jordyvanvorselen@gmail.com</Text>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <Title variant="footer-section">Quick Links</Title>
              <ul className="space-y-2">
                <li>
                  <NavigationLink href="/" variant="footer">
                    Home
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/blog" variant="footer">
                    Blog
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/projects" variant="footer">
                    Projects
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/experience" variant="footer">
                    Experience
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/contact" variant="footer">
                    Contact
                  </NavigationLink>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <Title variant="footer-section">Let&apos;s Connect</Title>
              <div className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <SocialIcon
                    href="https://github.com/jordyvanvorselen"
                    label="GitHub"
                    icon={Github}
                    variant="footer"
                  />
                  <SocialIcon
                    href="https://linkedin.com/in/jordy-van-vorselen"
                    label="LinkedIn"
                    icon={Linkedin}
                    variant="footer"
                  />
                  <SocialIcon
                    href="mailto:jordyvanvorselen@gmail.com"
                    label="Email"
                    icon={Mail}
                    variant="footer"
                  />
                </div>
                <Button
                  variant="footer-cta"
                  href="mailto:jordyvanvorselen@gmail.com"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Text variant="footer-copyright">
                © 2025 Jordy van Vorselen. Made with
              </Text>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <Text variant="footer-copyright">and lots of coffee.</Text>
            </div>
            <div className="flex items-center space-x-4">
              <Text variant="footer-availability">
                Available for remote opportunities
              </Text>
              <BackToTopButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
