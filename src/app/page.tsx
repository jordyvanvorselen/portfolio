import { HeroSection } from '@/domains/home/hero/HeroSection'
import { ExpertiseSection } from '@/domains/home/expertise/ExpertiseSection'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <ExpertiseSection />
    </main>
  )
}
