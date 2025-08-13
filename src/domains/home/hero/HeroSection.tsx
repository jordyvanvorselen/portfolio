import { AvailabilityBadge } from '@/domains/home/hero/AvailabilityBadge'
import { HeroActions } from '@/domains/home/hero/HeroActions'
import { HeroDescription } from '@/domains/home/hero/HeroDescription'
import { HeroName } from '@/domains/home/hero/HeroName'
import { HeroTitle } from '@/domains/home/hero/HeroTitle'
import { ScrollIndicator } from '@/domains/home/hero/ScrollIndicator'
import { SocialLinks } from '@/domains/home/hero/SocialLinks'

export const HeroSection = () => {
  return (
    <section className="h-[calc(100vh-6rem)] relative overflow-hidden py-4 md:py-6 lg:py-8 border-b border-gray-600">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-slate-900" />
      {/* Teal gradient overlay with opacity */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse 100% 90% at center 25%, #1e3c4a 0%, transparent 70%)`,
        }}
      />
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent 0 2px,
            rgba(255,255,255,0.08) 2px 4px
          )`,
        }}
      />
      <div className="relative z-10 min-h-full px-4 md:px-8 lg:px-12 flex flex-col">
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
    </section>
  )
}
