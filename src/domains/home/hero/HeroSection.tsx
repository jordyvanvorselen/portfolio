import { AvailabilityBadge } from '@/domains/home/hero/AvailabilityBadge'
import { HeroActions } from '@/domains/home/hero/HeroActions'
import { HeroDescription } from '@/domains/home/hero/HeroDescription'
import { HeroName } from '@/domains/home/hero/HeroName'
import { HeroTitle } from '@/domains/home/hero/HeroTitle'
import { ScrollIndicator } from '@/domains/home/hero/ScrollIndicator'
import { SocialLinks } from '@/domains/home/hero/SocialLinks'

export const HeroSection = () => {
  return (
    <section className="content-section header-offset relative overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 h-full px-4 md:px-8 lg:px-12 flex flex-col">
        {/* Main content - centered */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-center mb-6 md:mb-4 lg:mb-6">
            <AvailabilityBadge />
          </div>
          <div className="flex justify-center mb-4 md:mb-3 lg:mb-4">
            <HeroName />
          </div>
          <div className="flex justify-center mb-6 md:mb-4 lg:mb-6">
            <HeroTitle />
          </div>
          <div className="flex justify-center mb-8 md:mb-6 lg:mb-8 max-w-4xl mx-auto px-4">
            <HeroDescription />
          </div>
          <div className="flex justify-center mb-8 md:mb-6 lg:mb-8">
            <HeroActions />
          </div>
          <SocialLinks />
        </div>
        {/* Scroll indicator - pushed to bottom */}
        <div className="flex justify-center pt-8 pb-4 md:pt-10 md:pb-6 lg:pt-12 lg:pb-8">
          <ScrollIndicator />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  )
}
