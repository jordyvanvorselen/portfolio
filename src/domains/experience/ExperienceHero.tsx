import { TrendingUp } from 'lucide-react'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

interface ExperienceHeroProps {
  positionCount: number
  companyCount: number
}

export const ExperienceHero = ({
  positionCount,
  companyCount,
}: ExperienceHeroProps) => {
  return (
    <section className="header-offset relative pt-16 pb-20 overflow-hidden mt-8">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

      {/* Decorative animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Title
            as="h1"
            size="4xl"
            color="gradient"
            align="center"
            className="mb-6"
          >
            Work Experience
          </Title>
          <Text
            size="2xl"
            color="secondary"
            lineHeight="relaxed"
            alignment="center"
            className="max-w-4xl mx-auto mb-8"
          >
            A journey through innovative companies and challenging projects that
            shaped my expertise in software engineering
          </Text>
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <TrendingUp
                data-testid="trending-up-icon"
                className="w-5 h-5"
                aria-hidden="true"
              />
              <span className="text-lg">8+ Years Experience</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div
                data-testid="animated-dot"
                className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              ></div>
              <span className="text-lg">
                {positionCount} Positions at {companyCount} Companies
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </section>
  )
}
