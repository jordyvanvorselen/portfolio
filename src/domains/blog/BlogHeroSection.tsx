import { BookOpen } from 'lucide-react'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export const BlogHeroSection = () => {
  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Title variant="blog-hero-title">Engineering Insights</Title>

          <Text variant="blog-hero-subtitle">
            Thoughts, tutorials, and deep dives into software engineering,
            architecture, and modern development practices.
          </Text>

          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-lg">6 Articles</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-lg">Regularly Updated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </section>
  )
}
