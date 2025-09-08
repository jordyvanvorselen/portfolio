import { BookOpen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export const BlogHeroSection = () => {
  const t = useTranslations()
  return (
    <section
      data-testid="blog-hero-section"
      className="header-offset relative pt-16 pb-20 overflow-hidden mt-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Title
            size="4xl"
            weight="bold"
            color="gradient"
            align="center"
            as="h1"
            className="mb-6"
          >
            {t('blog.hero.title')}
          </Title>

          <Text
            size="2xl"
            weight="normal"
            color="secondary"
            alignment="center"
            lineHeight="relaxed"
            className="max-w-4xl mx-auto mb-8"
          >
            {t('blog.hero.description')}
          </Text>

          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-lg">
                {t('blog.hero.stats.articlesCount', { count: 6 })}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-lg">
                {t('blog.hero.stats.regularlyUpdated')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </section>
  )
}
