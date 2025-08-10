import { Text } from '@/ui/Text'
import { Title } from '@/ui/Title'
import { ExpertiseLabel } from '@/domains/expertise-section/ExpertiseLabel'
import { TDDCard } from '@/domains/expertise-section/TDDCard'
import { SoftwareArchitectureCard } from '@/domains/expertise-section/SoftwareArchitectureCard'

export const ExpertiseSection = () => {
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
          <Title variant="section-title" as="h2">
            What I Excel At
          </Title>
          <Text variant="description">
            Three fundamental pillars that drive my approach to software
            engineering and ensure delivery of exceptional results.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto">
            <TDDCard />
            <SoftwareArchitectureCard />
            <div>{/* Placeholder for third card */}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
