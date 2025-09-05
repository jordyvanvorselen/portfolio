import { ExperienceHero } from '@/domains/experience/ExperienceHero'
import { ExperienceCard } from '@/domains/experience/ExperienceCard'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export default function ExperiencePage() {
  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <ExperienceHero />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-20">
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

        <div className="max-w-none mx-auto relative px-4">
          {/* Vertical Timeline Line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-teal-500/20 via-teal-500/40 to-teal-500/20" />

          {/* Mobile: Stack vertically */}
          <div className="md:hidden space-y-8">
            <div className="flex justify-center">
              <div className="w-4/5">
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
                    'Mentored 5 junior developers to mid-level positions',
                  ]}
                  technologies={['React', 'Node.js', 'TypeScript']}
                  isCurrentJob={true}
                  alignment="left"
                  dotColor="#14b8a6"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-4/5">
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
                    'Implemented automated testing increasing coverage to 95%',
                  ]}
                  technologies={['Vue.js', 'Python', 'PostgreSQL']}
                  isCurrentJob={false}
                  alignment="left"
                  dotColor="#8b5cf6"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-4/5">
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
                    'Participated in agile development with 2-week sprints',
                  ]}
                  technologies={['React', 'Express.js', 'MongoDB']}
                  isCurrentJob={false}
                  alignment="left"
                  dotColor="#f59e0b"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-4/5">
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
                    'Learned and applied data engineering best practices',
                  ]}
                  technologies={['Python', 'D3.js', 'SQL']}
                  isCurrentJob={false}
                  alignment="left"
                  dotColor="#ec4899"
                />
              </div>
            </div>
          </div>

          {/* Desktop: Timeline layout */}
          <div className="hidden md:block relative">
            {/* First Card - Left Side */}
            <div className="relative flex items-center mb-16">
              {/* Left Card Container */}
              <div className="w-4/5 pr-12">
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
                    'Mentored 5 junior developers to mid-level positions',
                  ]}
                  technologies={['React', 'Node.js', 'TypeScript']}
                  isCurrentJob={true}
                  alignment="left"
                  dotColor="#14b8a6"
                />
              </div>

              {/* Timeline Dot - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-teal-500 rounded-full ring-4 ring-gray-950 shadow-lg shadow-teal-500/50" />
              </div>

              {/* Right Side Empty */}
              <div className="w-4/5 pl-12"></div>
            </div>

            {/* Second Card - Right Side */}
            <div className="relative flex items-center mb-16 -mt-8">
              {/* Left Side Empty */}
              <div className="w-4/5 pr-12"></div>

              {/* Timeline Dot - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-purple-500 rounded-full ring-4 ring-gray-950 shadow-lg shadow-purple-500/50" />
              </div>

              {/* Right Card Container */}
              <div className="w-4/5 pl-12">
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
                    'Implemented automated testing increasing coverage to 95%',
                  ]}
                  technologies={['Vue.js', 'Python', 'PostgreSQL']}
                  isCurrentJob={false}
                  alignment="left"
                  dotColor="#8b5cf6"
                />
              </div>
            </div>

            {/* Third Card - Left Side, close to first card */}
            <div className="relative flex items-center mb-16 -mt-24">
              {/* Left Card Container */}
              <div className="w-4/5 pr-12">
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
                    'Participated in agile development with 2-week sprints',
                  ]}
                  technologies={['React', 'Express.js', 'MongoDB']}
                  isCurrentJob={false}
                  alignment="left"
                  dotColor="#f59e0b"
                />
              </div>

              {/* Timeline Dot - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-amber-500 rounded-full ring-4 ring-gray-950 shadow-lg shadow-amber-500/50" />
              </div>

              {/* Right Side Empty */}
              <div className="w-4/5 pl-12"></div>
            </div>

            {/* Fourth Card - Right Side, close to second card */}
            <div className="relative flex items-center mb-16 -mt-24">
              {/* Left Side Empty */}
              <div className="w-4/5 pr-12"></div>

              {/* Timeline Dot - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-pink-500 rounded-full ring-4 ring-gray-950 shadow-lg shadow-pink-500/50" />
              </div>

              {/* Right Card Container */}
              <div className="w-4/5 pl-12">
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
                    'Learned and applied data engineering best practices',
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
