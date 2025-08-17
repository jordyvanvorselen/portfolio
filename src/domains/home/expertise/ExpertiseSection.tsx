import { Text } from '@/ui/Text'
import { Title } from '@/ui/Title'
import { ExpertiseLabel } from '@/domains/home/expertise/ExpertiseLabel'
import { TDDCard } from '@/domains/home/expertise/TDDCard'
import { SoftwareArchitectureCard } from '@/domains/home/expertise/SoftwareArchitectureCard'
import { AIAcceleratedDevelopmentCard } from '@/domains/home/expertise/AIAcceleratedDevelopmentCard'
import { ExpertiseCallToAction } from '@/domains/home/expertise/ExpertiseCallToAction'

export const ExpertiseSection = () => {
  return (
    <section
      id="expertise-section"
      aria-label="Core Expertise"
      className="content-section-min relative overflow-hidden py-4 md:py-6 lg:py-8 bg-gray-950 border-t border-gray-800"
    >
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-full flex items-center justify-center px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-2 md:mb-3 lg:mb-4">
            <ExpertiseLabel />
          </div>
          <Title size="3xl" weight="bold" color="gradient" align="left" as="h2">
            What I Excel At
          </Title>
          <Text
            size="base"
            weight="medium"
            color="secondary"
            alignment="center"
            lineHeight="relaxed"
          >
            Three fundamental pillars that drive my approach to software
            engineering and ensure delivery of exceptional results.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 lg:mt-12 max-w-7xl mx-auto">
            <TDDCard />
            <SoftwareArchitectureCard />
            <AIAcceleratedDevelopmentCard />
          </div>
          <ExpertiseCallToAction />
        </div>
      </div>
    </section>
  )
}
