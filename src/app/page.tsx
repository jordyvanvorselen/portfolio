import { HeroSection } from '@/domains/hero-section/HeroSection'
import { ExpertiseSection } from '@/domains/expertise-section/ExpertiseSection'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <ExpertiseSection />
    </main>
  )
}
