import { HeroSection } from '@/domains/home/hero/HeroSection'
import { SkillSection } from '@/domains/home/skills/SkillSection'
import { ExpertiseSection } from '@/domains/home/expertise/ExpertiseSection'
import { FaqSection } from '@/domains/home/faq/FaqSection'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <ExpertiseSection />
      <SkillSection />
      <FaqSection />
    </main>
  )
}
