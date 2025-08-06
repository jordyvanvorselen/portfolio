import { AvailabilityBadge } from './AvailabilityBadge'
import { HeroName } from './HeroName'
import { HeroTitle } from './HeroTitle'

export function HeroSection(): JSX.Element {
  return (
    <section className="flex-1 relative overflow-hidden">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-slate-900" />
      {/* Teal gradient overlay with opacity */}
      <div
        className="absolute inset-0 opacity-45"
        style={{
          background: `radial-gradient(ellipse 100% 90% at center 25%, #1e3a4a 0%, transparent 70%)`,
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
      <div className="relative z-10 h-full px-8">
        <div className="flex justify-center pt-16">
          <AvailabilityBadge />
        </div>
        <div className="flex justify-center mt-8">
          <HeroName />
        </div>
        <div className="flex justify-center mt-4">
          <HeroTitle />
        </div>
      </div>
    </section>
  )
}
