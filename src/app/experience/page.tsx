import { ExperienceHero } from '@/domains/experience/ExperienceHero'
import { ExperienceCard } from '@/domains/experience/ExperienceCard'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export default function ExperiencePage() {
  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <ExperienceHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-16">
          <div className="text-center mb-16">
            <Title
              as="h2"
              size="2xl"
              color="gradient"
              align="center"
              className="mb-6"
            >
              Professional Journey
            </Title>
            <Text
              size="lg"
              color="secondary"
              lineHeight="relaxed"
              alignment="center"
              className="max-w-3xl mx-auto"
            >
              From early internships to senior engineering roles, here&apos;s
              how my journey in software development has evolved through
              continuous learning and impactful contributions.
            </Text>
          </div>
        </div>

        <div className="space-y-12">
          <ExperienceCard
            position="Senior Software Engineer"
            company="TechCorp Solutions"
            companyUrl="https://techcorp.com"
            logoUrl="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48&q=80"
            logoAlt="TechCorp Solutions logo"
            duration="3+ years"
            location="San Francisco, CA"
            employmentType="Full-time"
            description="Leading the development of scalable microservices architecture."
            achievements={['Reduced system latency by 40%']}
            technologies={['React', 'Node.js', 'TypeScript']}
            isCurrentJob={true}
            alignment="left"
            dotColor="#14b8a6"
          />
        </div>
      </div>
    </main>
  )
}
