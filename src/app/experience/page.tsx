import { ExperienceHero } from '@/domains/experience/ExperienceHero'
import { ExperienceCard } from '@/domains/experience/ExperienceCard'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { TimelineLayout } from '@/ui/TimelineLayout'
import { TimelineItem } from '@/ui/TimelineItem'
import asmlLogo from '@/assets/images/asml.png'
import kabisaLogo from '@/assets/images/kabisa.png'
import scoritoLogo from '@/assets/images/scorito.png'
import signifyLogo from '@/assets/images/signify.webp'
import syntouchLogo from '@/assets/images/syntouch.svg'
import hertekLogo from '@/assets/images/hertek.png'

export default function ExperiencePage() {
  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <ExperienceHero />

      <div className="w-7/10 mx-auto px-2 sm:px-4 lg:px-6 pb-20">
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

        <TimelineLayout>
          <div className="relative">
            {/* Hertek GmbH - Lead Developer */}
            <TimelineItem dotColor="purple" alignment="left" spacing="normal">
              <ExperienceCard
                position="Lead Developer"
                company="Hertek GmbH"
                companyUrl="https://hertek.de"
                logoUrl={hertekLogo.src}
                logoAlt="Hertek GmbH logo"
                duration="1 year 8 months"
                location="Remote - Weert, NL"
                employmentType="Full-time"
                description="Via Kabisa · Development of high-performance Java backend services with Spring Boot and reactive programming."
                achievements={[
                  'Developed multiple Java backend services with Spring Boot and Vertx',
                  'Implemented AWS services: ECS, MemoryDB and SQS FiFo',
                  'Backend processes thousands of messages with high performance',
                  'Built: React SPA, SSR Thymeleaf, Cordova and Flutter apps',
                  'Horizontal scalability for enterprise applications',
                ]}
                technologies={[
                  'Java',
                  'Spring Boot',
                  'Vertx',
                  'AWS',
                  'React',
                  'Flutter',
                  'Dart',
                ]}
                isCurrentJob={true}
                alignment="left"
                dotColor="#8b5cf6"
              />
            </TimelineItem>

            {/* Kabisa - Backend Tech Lead */}
            <TimelineItem dotColor="blue" alignment="right" spacing="close">
              <ExperienceCard
                position="Back-End Tech Lead"
                company="Kabisa"
                companyUrl="https://kabisa.nl"
                logoUrl={kabisaLogo.src}
                logoAlt="Kabisa logo"
                duration="3 years 9 months"
                location="Remote - Weert, NL"
                employmentType="Full-time"
                description="Full-Stack Engineer at Kabisa, specialized in developing elegant (enterprise) software solutions."
                achievements={[
                  'Full-stack development across multiple technologies',
                  'Architecture of enterprise software solutions',
                  'Expertise in Java, Python, Ruby, Elixir and Front-end development',
                  'Implementation of scalable microservices architecture',
                  'Mentoring and coaching of development teams',
                ]}
                technologies={[
                  'Java',
                  'Python',
                  'Ruby',
                  'Elixir',
                  'Spring Boot',
                ]}
                isCurrentJob={false}
                alignment="left"
                dotColor="#3b82f6"
              />
            </TimelineItem>

            {/* Kabisa - Full-Stack Engineer */}
            <TimelineItem dotColor="emerald" alignment="left" spacing="close">
              <ExperienceCard
                position="Full-Stack Engineer"
                company="Kabisa"
                companyUrl="https://kabisa.nl"
                logoUrl={kabisaLogo.src}
                logoAlt="Kabisa logo"
                duration="3 years 11 months"
                location="Remote - Weert, NL"
                employmentType="Full-time"
                description="Backend Tech Lead at Kabisa, specialized in developing elegant (enterprise) software solutions."
                achievements={[
                  'Leading backend development teams',
                  'Architecture of enterprise software solutions',
                  'Expertise in Java, Python, Ruby, Elixir and Front-end development',
                  'Implementation of scalable microservices architecture',
                  'Mentoring and coaching of development teams',
                ]}
                technologies={[
                  'Java',
                  'Python',
                  'Ruby',
                  'Elixir',
                  'Spring Boot',
                ]}
                isCurrentJob={true}
                alignment="left"
                dotColor="#14b8a6"
              />
            </TimelineItem>

            {/* ASML - Full-Stack Software Engineer (Most Recent) */}
            <TimelineItem dotColor="orange" alignment="right" spacing="close">
              <ExperienceCard
                position="Lead Developer"
                company="ASML"
                companyUrl="https://asml.com"
                logoUrl={asmlLogo.src}
                logoAlt="ASML logo"
                duration="3 months"
                location="Remote - Veldhoven, NL"
                employmentType="Full-time"
                description="Via Kabisa · Development of business-critical web tools used by tens of thousands of developers."
                achievements={[
                  'Developed business-critical web tools for 10,000+ developers',
                  'Worked with Ruby on Rails, React, Flask & Django',
                  'Kubernetes and Docker containerization',
                  'Optimization of tool performance and scalability',
                  'Agile development in large teams',
                ]}
                technologies={[
                  'Ruby on Rails',
                  'React',
                  'Flask',
                  'Django',
                  'Kubernetes',
                  'Docker',
                ]}
                isCurrentJob={false}
                alignment="left"
                dotColor="#f59e0b"
              />
            </TimelineItem>

            {/* Flutter App Development */}
            <TimelineItem dotColor="red" alignment="left" spacing="close">
              <ExperienceCard
                position="Lead Developer"
                company="Hertek GmbH"
                companyUrl="https://hertek.de"
                logoUrl={hertekLogo.src}
                logoAlt="Hertek GmbH logo"
                duration="8 months"
                location="Remote - Weert, NL"
                employmentType="Full-time"
                description="Via Kabisa · Development of Flutter app with strict certification standards for fire safety."
                achievements={[
                  'Built new Flutter (Dart) mobile app',
                  'Java Spring Boot backend development',
                  'Met strict certification standards',
                  'Direct relationship with fire safety systems',
                  'Implementation of security best practices',
                ]}
                technologies={['Flutter', 'Dart', 'Java', 'Spring Boot']}
                isCurrentJob={false}
                alignment="left"
                dotColor="#ec4899"
              />
            </TimelineItem>

            {/* ASML - Longer Period */}
            <TimelineItem dotColor="cyan" alignment="right" spacing="close">
              <ExperienceCard
                position="Full-Stack Software Engineer"
                company="ASML"
                companyUrl="https://asml.com"
                logoUrl={asmlLogo.src}
                logoAlt="ASML logo"
                duration="3 years 9 months"
                location="Veldhoven, NL"
                employmentType="Full-time"
                description="Via Kabisa · Long-term development of enterprise web tools for developers worldwide."
                achievements={[
                  'Developed business-critical web tools for 10,000+ developers',
                  'Expertise in Ruby on Rails, React, Flask & Django',
                  'Container orchestration with Kubernetes',
                  'Performance optimization for large scale',
                  'Cross-functional collaboration with international teams',
                ]}
                technologies={[
                  'Ruby on Rails',
                  'React',
                  'Flask',
                  'Django',
                  'Kubernetes',
                  'Docker',
                ]}
                isCurrentJob={false}
                alignment="left"
                dotColor="#14b8a6"
              />
            </TimelineItem>

            {/* Signify - Philips Hue */}
            <TimelineItem dotColor="indigo" alignment="left" spacing="close">
              <ExperienceCard
                position="Full-Stack Software Engineer"
                company="Signify"
                companyUrl="https://signify.com"
                logoUrl={signifyLogo.src}
                logoAlt="Signify logo"
                duration="5 months"
                location="Eindhoven, NL"
                employmentType="Full-time"
                description="Via Kabisa · Development of the Hue Labs platform and Philips Hue mobile app."
                achievements={[
                  'Developed Hue Labs platform',
                  'Contributed to Philips Hue mobile app',
                  'React (JavaScript) frontend development',
                  'Phoenix (Elixir) backend development',
                  'IoT integration for smart lighting',
                ]}
                technologies={['React', 'JavaScript', 'Phoenix', 'Elixir']}
                isCurrentJob={false}
                alignment="left"
                dotColor="#8b5cf6"
              />
            </TimelineItem>

            {/* SynTouch - Blockchain */}
            <TimelineItem dotColor="teal" alignment="right" spacing="close">
              <ExperienceCard
                position="Blockchain Software Engineer"
                company="SynTouch"
                companyUrl="#"
                logoUrl={syntouchLogo.src}
                logoAlt="SynTouch logo"
                duration="6 months"
                location="Eindhoven, NL"
                employmentType="Graduation"
                description="Graduated Cum Laude · Development of ERC-20 token and blockchain applications."
                achievements={[
                  'Developed ERC-20 token SynCoin with Ethereum smart contracts',
                  'Built escrow, order and crowdsale system in Solidity',
                  'Research on upgradeable smart contracts',
                  'Node.js backend with Swagger + Express',
                  'Vue.js frontend for blockchain interaction',
                ]}
                technologies={[
                  'Solidity',
                  'Ethereum',
                  'Node.js',
                  'Vue.js',
                  'Web3',
                ]}
                isCurrentJob={false}
                alignment="left"
                dotColor="#f59e0b"
              />
            </TimelineItem>

            {/* Scorito.com */}
            <TimelineItem dotColor="amber" alignment="left" spacing="close">
              <ExperienceCard
                position="Junior Software Engineer"
                company="Scorito.com"
                companyUrl="https://scorito.com"
                logoUrl={scoritoLogo.src}
                logoAlt="Scorito.com logo"
                duration="1 year"
                location="Breda, NL"
                employmentType="Part-time"
                description="Web development with C# ASP.NET MVC in a Scrum team."
                achievements={[
                  'Web development with C# ASP.NET MVC',
                  'Agile development in Scrum team',
                  'Implementation of new features',
                  'Unit testing and code reviews',
                  'Database design with SQL Server',
                ]}
                technologies={['C#', 'ASP.NET MVC', 'SQL Server', 'JavaScript']}
                isCurrentJob={false}
                alignment="left"
                dotColor="#ec4899"
              />
            </TimelineItem>

            {/* Scorito.com - Internship */}
            <TimelineItem dotColor="pink" alignment="right" spacing="close">
              <ExperienceCard
                position="Software Engineering Intern"
                company="Scorito.com"
                companyUrl="https://scorito.com"
                logoUrl={scoritoLogo.src}
                logoAlt="Scorito.com logo"
                duration="6 months"
                location="Breda, NL"
                employmentType="Internship"
                description="Development of test framework for acceptance testing."
                achievements={[
                  'Developed test framework with Selenium and C#',
                  'Simple setup of acceptance tests',
                  'Test automation implementation',
                  'Documentation and training for team',
                  'Integration with CI/CD pipeline',
                ]}
                technologies={['C#', 'Selenium', 'ASP.NET', 'Test Automation']}
                isCurrentJob={false}
                alignment="left"
                dotColor="#14b8a6"
              />
            </TimelineItem>
          </div>
        </TimelineLayout>
      </div>
    </main>
  )
}
