import { Github, Linkedin, Mail, Heart } from 'lucide-react'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { NavigationLink } from '@/ui/NavigationLink'
import { SocialIcon } from '@/ui/SocialIcon'
import { BackToTopButton } from '@/ui/BackToTopButton'

export const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-[#0f172a] border-t border-[#334155]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Author Section - spans 2 columns equivalent */}
            <section className="lg:col-span-2 flex-1 lg:flex-[2]">
              <Title variant="footer-author">Jordy van Vorselen</Title>
              <Text variant="footer-description" className="mb-6 max-w-md">
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
            </section>

            {/* Quick Links Section - Hidden on mobile and tablet, visible on desktop */}
            <section className="hidden lg:block flex-1">
              <Title variant="footer-section">Quick Links</Title>
              <nav className="space-y-2 mt-4">
                <NavigationLink href="#" variant="footer">
                  About
                </NavigationLink>
                <NavigationLink href="#" variant="footer">
                  Expertise
                </NavigationLink>
                <NavigationLink href="#" variant="footer">
                  Projects
                </NavigationLink>
                <NavigationLink href="#" variant="footer">
                  Experience
                </NavigationLink>
                <NavigationLink href="#" variant="footer">
                  Contact
                </NavigationLink>
              </nav>
            </section>

            {/* Connect Section */}
            <section className="flex-1">
              <Title variant="footer-section">Let&apos;s Connect</Title>
              <div className="space-y-4 mt-4">
                {/* Mobile & Tablet: Horizontal circular buttons, Desktop: Vertical text + icon */}
                <div className="lg:hidden flex gap-4">
                  <SocialIcon
                    href="https://github.com/jordyvanvorselen"
                    label="GitHub"
                    icon={Github}
                    variant="button"
                  />
                  <SocialIcon
                    href="https://linkedin.com/in/jordy-van-vorselen"
                    label="LinkedIn"
                    icon={Linkedin}
                    variant="button"
                  />
                  <SocialIcon
                    href="mailto:jordyvanvorselen@gmail.com"
                    label="Email"
                    icon={Mail}
                    variant="button"
                  />
                </div>
                <div className="hidden lg:flex lg:flex-col lg:space-y-3">
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
                <a
                  href="mailto:jordyvanvorselen@gmail.com"
                  className="inline-flex items-center justify-center bg-[#14b8a6] hover:bg-[#0ea5e9] text-white shadow h-9 px-4 py-2 w-full rounded-md text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#334155] py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center text-[#cbd5e1] text-sm mb-4 md:mb-0">
              <span>© 2025 Jordy van Vorselen. Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>and lots of coffee.</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#10b981] text-sm">
                Available for remote opportunities
              </span>
              <BackToTopButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
