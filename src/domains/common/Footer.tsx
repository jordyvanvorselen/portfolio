import {
  Github,
  Linkedin,
  Mail,
  Heart,
  MapPin,
  Building2,
  FileText,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { NavigationLink } from '@/ui/NavigationLink'
import { SocialIcon } from '@/ui/SocialIcon'
import { BackToTopButton } from '@/ui/BackToTopButton'
import { Button } from '@/ui/Button'

export const Footer = () => {
  const t = useTranslations()

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
              <Title
                size="lg"
                weight="bold"
                color="primary"
                align="left"
                as="h3"
                className="mb-4"
              >
                {t('footer.author.name')}
              </Title>
              <Text
                size="base"
                weight="normal"
                color="secondary"
                className="mb-6 max-w-md leading-relaxed"
              >
                {t('footer.author.description')}
              </Text>
              <div className="flex items-center text-[#cbd5e1] mb-4">
                <MapPin className="w-4 h-4 mr-2 text-gray-300" />
                <Text size="sm" weight="normal" color="secondary">
                  {t('footer.author.location')}
                </Text>
              </div>
              <div className="flex items-center text-[#cbd5e1] mb-4">
                <Mail className="w-4 h-4 mr-2 text-gray-300" />
                <Text size="sm" weight="normal" color="secondary">
                  {t('footer.author.email')}
                </Text>
              </div>
              <div className="flex items-center text-[#cbd5e1] mb-4">
                <Building2 className="w-4 h-4 mr-2 text-gray-300" />
                <Text size="sm" weight="normal" color="secondary">
                  {t('footer.author.company')}
                </Text>
              </div>
              <div className="flex items-center text-[#cbd5e1]">
                <FileText className="w-4 h-4 mr-2 text-gray-300" />
                <Text size="sm" weight="normal" color="secondary">
                  {t('footer.author.btwNumber')}
                </Text>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <Title
                size="md"
                weight="semibold"
                color="primary"
                align="left"
                as="h4"
                className="mb-4 !text-lg"
              >
                {t('footer.quickLinks')}
              </Title>
              <ul className="space-y-2">
                <li>
                  <NavigationLink
                    href="/"
                    variant="default"
                    size="md"
                    color="primary"
                    weight="normal"
                    className="block"
                  >
                    {t('navigation.home')}
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    href="/blog"
                    variant="default"
                    size="md"
                    color="primary"
                    weight="normal"
                    className="block"
                  >
                    {t('navigation.blog')}
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    href="/projects"
                    variant="default"
                    size="md"
                    color="primary"
                    weight="normal"
                    className="block"
                  >
                    {t('navigation.projects')}
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    href="/experience"
                    variant="default"
                    size="md"
                    color="primary"
                    weight="normal"
                    className="block"
                  >
                    {t('navigation.experience')}
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    href="/contact"
                    variant="default"
                    size="md"
                    color="primary"
                    weight="normal"
                    className="block"
                  >
                    {t('navigation.contact')}
                  </NavigationLink>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <Title
                size="md"
                weight="semibold"
                color="primary"
                align="left"
                as="h4"
                className="mb-4 !text-lg"
              >
                {t('footer.connect')}
              </Title>
              <div className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <SocialIcon
                    href="https://github.com/jordyvanvorselen"
                    label={t('social.github')}
                    icon={Github}
                    variant="text"
                    size="md"
                    color="secondary"
                    interactive="hover"
                  />
                  <SocialIcon
                    href="https://linkedin.com/in/jordy-van-vorselen"
                    label={t('social.linkedin')}
                    icon={Linkedin}
                    variant="text"
                    size="md"
                    color="secondary"
                    interactive="hover"
                  />
                  <SocialIcon
                    href="mailto:jordy@morethanbits.io"
                    label={t('social.email')}
                    icon={Mail}
                    variant="text"
                    size="md"
                    color="secondary"
                    interactive="hover"
                  />
                </div>
                <Button
                  variant="solid"
                  color="primary"
                  size="md"
                  href="mailto:jordy@morethanbits.io"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('footer.getInTouch')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Text size="sm" weight="normal" color="secondary">
                {t('footer.copyright')}
              </Text>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <Text size="sm" weight="normal" color="secondary">
                {t('footer.coffeeText')}
              </Text>
            </div>
            <div className="flex items-center space-x-4">
              <Text size="sm" weight="normal" color="success">
                {t('footer.availability')}
              </Text>
              <BackToTopButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
