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

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex md:justify-end justify-center">
            <div className="w-4/5 md:w-3/4">
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
            achievements={[
              'Reduced system latency by 40% through optimization',
              'Led team of 8 engineers on critical projects',
              'Architected microservices handling 10M+ requests/day',
              'Implemented CI/CD pipeline reducing deployment time by 60%',
              'Mentored 5 junior developers to mid-level positions'
            ]}
            technologies={['React', 'Node.js', 'TypeScript']}
            isCurrentJob={true}
            alignment="left"
            dotColor="#14b8a6"
              />
            </div>
          </div>
          <div className="flex md:justify-start justify-center">
            <div className="w-4/5 md:w-3/4">
              <ExperienceCard
            position="Full Stack Developer"
            company="InnovateLabs"
            companyUrl="https://innovatelabs.com"
            logoUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48&q=80"
            logoAlt="InnovateLabs logo"
            duration="2 years"
            location="Austin, TX"
            employmentType="Full-time"
            description="Developed and maintained web applications for various clients using modern JavaScript frameworks."
            achievements={[
              'Built 5 production applications from scratch',
              'Mentored 3 junior developers on best practices',
              'Reduced client onboarding time by 30%',
              'Implemented automated testing increasing coverage to 95%'
            ]}
            technologies={['Vue.js', 'Python', 'PostgreSQL']}
            isCurrentJob={false}
            alignment="left"
            dotColor="#8b5cf6"
              />
            </div>
          </div>
          <div className="flex md:justify-end justify-center">
            <div className="w-4/5 md:w-3/4">
              <ExperienceCard
            position="Junior Developer"
            company="StartupHub"
            companyUrl="https://startuphub.com"
            logoUrl="https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48&q=80"
            logoAlt="StartupHub logo"
            duration="1.5 years"
            location="Seattle, WA"
            employmentType="Full-time"
            description="Contributed to the development of a SaaS platform for project management and collaboration."
            achievements={[
              'Implemented key features for v2.0 release',
              'Improved application performance by 25%',
              'Created reusable component library with 50+ components',
              'Collaborated with UX team on responsive design',
              'Participated in agile development with 2-week sprints'
            ]}
            technologies={['React', 'Express.js', 'MongoDB']}
            isCurrentJob={false}
            alignment="left"
            dotColor="#f59e0b"
              />
            </div>
          </div>
          <div className="flex md:justify-start justify-center">
            <div className="w-4/5 md:w-3/4">
              <ExperienceCard
            position="Software Engineering Intern"
            company="DataTech Inc"
            companyUrl="https://datatech.com"
            logoUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48&q=80"
            logoAlt="DataTech Inc logo"
            duration="6 months"
            location="Boston, MA"
            employmentType="Internship"
            description="Assisted in developing data visualization tools and ETL pipelines for business intelligence."
            achievements={[
              'Created automated reporting system saving 10 hours/week',
              'Developed 3 interactive dashboards for executives',
              'Optimized SQL queries reducing runtime by 50%',
              'Learned and applied data engineering best practices'
            ]}
            technologies={['Python', 'D3.js', 'SQL']}
            isCurrentJob={false}
            alignment="left"
            dotColor="#ec4899"
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}
