import { AvailabilityBadge } from '@/domains/hero-section/AvailabilityBadge'
import { HeroActions } from '@/domains/hero-section/HeroActions'
import { HeroDescription } from '@/domains/hero-section/HeroDescription'
import { HeroName } from '@/domains/hero-section/HeroName'
import { HeroTitle } from '@/domains/hero-section/HeroTitle'
import { ScrollIndicator } from '@/domains/hero-section/ScrollIndicator'
import { SocialLinks } from '@/domains/hero-section/SocialLinks'

export function HeroSection(): JSX.Element {
  return (
    <section className="h-[calc(100vh-6rem)] relative overflow-hidden">
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
      <div className="relative z-10 h-full px-4 md:px-8 lg:px-12 flex flex-col justify-start pt-8 md:pt-12 lg:pt-16">
        <div className="flex justify-center mt-12 mb-6 md:mb-8">
          <AvailabilityBadge />
        </div>
        <div className="flex justify-center mb-4 md:mb-6">
          <HeroName />
        </div>
        <div className="flex justify-center mb-6 md:mb-8 lg:mb-10">
          <HeroTitle />
        </div>
        <div className="flex justify-center mb-8 md:mb-12 lg:mb-16 max-w-4xl mx-auto px-4">
          <HeroDescription />
        </div>
        <div className="flex justify-center mb-8 md:mb-12">
          <HeroActions />
        </div>
        <SocialLinks />
        <div className="flex justify-center mt-12 md:mt-16 lg:mt-20">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  )
}
