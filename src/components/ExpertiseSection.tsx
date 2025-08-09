import { Text } from '@/ui/Text'
import { ExpertiseLabel } from './ExpertiseLabel'

export function ExpertiseSection() {
  return (
    <section
      aria-label="Core Expertise"
      className="h-screen relative overflow-hidden"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a4c] to-[#0f172a]" />
      {/* First radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%)]" />
      {/* Second radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
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
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ExpertiseLabel />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What I Excel At
          </h2>
          <Text variant="description">
            Three fundamental pillars that drive my approach to software
            engineering and ensure delivery of exceptional results.
          </Text>
        </div>
      </div>
    </section>
  )
}
