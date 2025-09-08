import { useTranslations } from 'next-intl'
import { Code, Star, Github } from 'lucide-react'
import { StatItem } from '@/ui/StatItem'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export const ProjectsHero = () => {
  const t = useTranslations()
  return (
    <section
      className="header-offset relative pt-16 pb-20 overflow-hidden mt-8"
      role="region"
      aria-label="hero"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <Title
            size="4xl"
            weight="bold"
            color="primary"
            align="center"
            as="h1"
            className="mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {t('projects.hero.title')}
            </span>
          </Title>

          {/* Description */}
          <Text
            size="2xl"
            weight="normal"
            color="secondary"
            alignment="center"
            lineHeight="relaxed"
            className="mb-12 max-w-3xl mx-auto"
          >
            {t('projects.hero.description')}
          </Text>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <StatItem
              value={6}
              label={t('projects.hero.stats.projects')}
              icon={<Code className="w-4 h-4" />}
              color="primary"
              size="lg"
            />
            <div className="w-px h-6 bg-gray-600" />
            <StatItem
              value={12037}
              label={t('projects.hero.stats.stars')}
              icon={<Star className="w-4 h-4" />}
              color="accent"
              size="lg"
            />
            <div className="w-px h-6 bg-gray-600" />
            <StatItem
              value={1543}
              label={t('projects.hero.stats.forks')}
              icon={<Github className="w-4 h-4" />}
              color="secondary"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  )
}
