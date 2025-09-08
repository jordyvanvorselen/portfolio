import { HeroActions } from '@/domains/home/hero/HeroActions'
import { HeroDescription } from '@/domains/home/hero/HeroDescription'
import { HeroName } from '@/domains/home/hero/HeroName'
import { HeroTitle } from '@/domains/home/hero/HeroTitle'
import { ScrollIndicator } from '@/domains/home/hero/ScrollIndicator'
import { SocialLinks } from '@/domains/home/hero/SocialLinks'
import Image from 'next/image'
import jordy from '@/assets/images/jordy.svg'

export const HeroSection = () => {
  return (
    <section
      className="content-section-min xl:h-[calc(100vh-4rem)] header-offset relative overflow-hidden"
      aria-label="Hero"
    >
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 min-h-full xl:h-full flex flex-col xl:flex-row">
        {/* Left side - all content */}
        <div className="flex-1 xl:w-5/7 flex flex-col 2xl:mt-24 xl:mt-12">
          <div className="flex-1 flex flex-col xl:justify-center items-center px-4 md:px-8 lg:px-12 py-8 xl:py-0">
            <div className="w-full max-w-4xl">
              {/* Mobile circular image - only visible on mobile */}
              <div className="flex justify-center mb-8 xl:hidden">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gray-900"></div>
                  <Image
                    height={128}
                    width={128}
                    src={jordy.src}
                    alt="Photo of Jordy"
                    className="w-32 h-32 rounded-full object-cover object-top relative z-10"
                  />
                </div>
              </div>
              <div className="flex justify-center mb-4 md:mb-3 lg:mb-4">
                <HeroName />
              </div>
              <div className="flex justify-center mb-6 md:mb-4 lg:mb-6">
                <HeroTitle />
              </div>
              <div className="flex justify-center mb-8 md:mb-6 lg:mb-8">
                <HeroDescription />
              </div>
              <div className="flex justify-center mb-8 md:mb-6 lg:mb-8">
                <HeroActions />
              </div>

              <div className="flex justify-center mb-8">
                <SocialLinks />
              </div>

              {/* Mobile scroll indicator - in content flow */}
              <div className="flex justify-center mt-16 xl:hidden">
                <ScrollIndicator />
              </div>
            </div>
          </div>

          {/* Desktop scroll indicator - pushed to bottom with margin-top auto */}
          <div className="hidden xl:flex justify-center pb-4 lg:pb-8 mt-auto">
            <ScrollIndicator />
          </div>
        </div>

        {/* Right side - image (25% width on desktop) - hidden on mobile */}
        <div className="hidden xl:flex xl:w-2/7 xl:h-full xl:items-end mr-12">
          <Image
            height={800}
            width={400}
            src={jordy.src}
            alt="Photo of Jordy"
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  )
}
