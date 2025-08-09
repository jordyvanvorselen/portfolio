import { HeroSection } from '@/components/HeroSection'
import { ExpertiseSection } from '@/components/ExpertiseSection'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <ExpertiseSection />
    </main>
  );
}
