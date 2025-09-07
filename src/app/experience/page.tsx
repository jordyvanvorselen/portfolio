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

interface Technology {
  name: string
  iconKey: string
}

interface Experience {
  position: string
  company: string
  companyUrl: string
  logoUrl: string
  logoAlt: string
  duration: string
  location: string
  employmentType: 'Full-time' | 'Part-time' | 'Internship' | 'Graduation'
  description: string
  achievements: string[]
  technologies: Technology[]
  isCurrentJob: boolean
}

const experiences: Experience[] = [
  {
    position: 'Lead Developer',
    company: 'Hertek Safety',
    companyUrl: 'https://hertek.nl',
    logoUrl: hertekLogo.src,
    logoAlt: 'Hertek logo',
    duration: '1 year 8 months',
    location: 'Remote - Weert, NL',
    employmentType: 'Full-time',
    description:
      'Via Kabisa · Development of high-performance Java backend services with Spring Boot and reactive programming.',
    achievements: [
      'Developed multiple Java backend services with Spring Boot and Vertx',
      'Implemented AWS services: ECS, MemoryDB and SQS FiFo',
      'Backend processes thousands of messages with high performance',
      'Built: React SPA, SSR Thymeleaf, Cordova and Flutter apps',
      'Horizontal scalability for enterprise applications',
    ],
    technologies: [
      { name: 'Java', iconKey: 'java' },
      { name: 'Spring Boot', iconKey: 'spring' },
      { name: 'Vertx', iconKey: 'vertx' },
      { name: 'AWS', iconKey: 'amazonwebservices' },
      { name: 'React', iconKey: 'react' },
      { name: 'Flutter', iconKey: 'flutter' },
      { name: 'Dart', iconKey: 'dart' },
    ],
    isCurrentJob: true,
  },
  {
    position: 'Lead Developer',
    company: 'ASML',
    companyUrl: 'https://asml.com',
    logoUrl: asmlLogo.src,
    logoAlt: 'ASML logo',
    duration: '3 months',
    location: 'Remote - Veldhoven, NL',
    employmentType: 'Full-time',
    description:
      'Via Kabisa · Development of business-critical web tools used by tens of thousands of developers.',
    achievements: [
      'Developed business-critical web tools for 10,000+ developers',
      'Worked with Ruby on Rails, React, Flask & Django',
      'Kubernetes and Docker containerization',
      'Optimization of tool performance and scalability',
      'Agile development in large teams',
    ],
    technologies: [
      { name: 'Ruby on Rails', iconKey: 'rails' },
      { name: 'React', iconKey: 'react' },
      { name: 'Flask', iconKey: 'flask' },
      { name: 'Django', iconKey: 'django' },
      { name: 'Kubernetes', iconKey: 'kubernetes' },
      { name: 'Docker', iconKey: 'docker' },
    ],
    isCurrentJob: false,
  },
  {
    position: 'Lead Developer',
    company: 'Hertek Safety',
    companyUrl: 'https://hertek.nl',
    logoUrl: hertekLogo.src,
    logoAlt: 'Hertek logo',
    duration: '8 months',
    location: 'Remote - Weert, NL',
    employmentType: 'Full-time',
    description:
      'Via Kabisa · Development of Flutter app with strict certification standards for fire safety.',
    achievements: [
      'Built new Flutter (Dart) mobile app',
      'Java Spring Boot backend development',
      'Met strict certification standards',
      'Direct relationship with fire safety systems',
      'Implementation of security best practices',
    ],
    technologies: [
      { name: 'Flutter', iconKey: 'flutter' },
      { name: 'Dart', iconKey: 'dart' },
      { name: 'Java', iconKey: 'java' },
      { name: 'Spring Boot', iconKey: 'spring' },
    ],
    isCurrentJob: false,
  },
  {
    position: 'Full-Stack Software Engineer',
    company: 'ASML',
    companyUrl: 'https://asml.com',
    logoUrl: asmlLogo.src,
    logoAlt: 'ASML logo',
    duration: '3 years 9 months',
    location: 'Veldhoven, NL',
    employmentType: 'Full-time',
    description:
      'Via Kabisa · Long-term development of enterprise web tools for developers worldwide.',
    achievements: [
      'Developed business-critical web tools for 10,000+ developers',
      'Expertise in Ruby on Rails, React, Flask & Django',
      'Container orchestration with Kubernetes',
      'Performance optimization for large scale',
      'Cross-functional collaboration with international teams',
    ],
    technologies: [
      { name: 'Ruby on Rails', iconKey: 'rails' },
      { name: 'React', iconKey: 'react' },
      { name: 'Flask', iconKey: 'flask' },
      { name: 'Django', iconKey: 'django' },
      { name: 'Kubernetes', iconKey: 'kubernetes' },
      { name: 'Docker', iconKey: 'docker' },
    ],
    isCurrentJob: false,
  },
  {
    position: 'Full-Stack Software Engineer',
    company: 'Signify',
    companyUrl: 'https://signify.com',
    logoUrl: signifyLogo.src,
    logoAlt: 'Signify logo',
    duration: '5 months',
    location: 'Eindhoven, NL',
    employmentType: 'Full-time',
    description:
      'Via Kabisa · Development of the Hue Labs platform and Philips Hue mobile app.',
    achievements: [
      'Developed Hue Labs platform',
      'Contributed to Philips Hue mobile app',
      'React (JavaScript) frontend development',
      'Phoenix (Elixir) backend development',
      'IoT integration for smart lighting',
    ],
    technologies: [
      { name: 'React', iconKey: 'react' },
      { name: 'JavaScript', iconKey: 'javascript' },
      { name: 'Phoenix', iconKey: 'phoenix' },
      { name: 'Elixir', iconKey: 'elixir' },
    ],
    isCurrentJob: false,
  },
  {
    position: 'Back-End Tech Lead',
    company: 'Kabisa',
    companyUrl: 'https://kabisa.nl',
    logoUrl: kabisaLogo.src,
    logoAlt: 'Kabisa logo',
    duration: '3 years 9 months',
    location: 'Remote - Weert, NL',
    employmentType: 'Full-time',
    description:
      'Full-Stack Engineer at Kabisa, specialized in developing elegant (enterprise) software solutions.',
    achievements: [
      'Full-stack development across multiple technologies',
      'Architecture of enterprise software solutions',
      'Expertise in Java, Python, Ruby, Elixir and Front-end development',
      'Implementation of scalable microservices architecture',
      'Mentoring and coaching of development teams',
    ],
    technologies: [
      { name: 'Java', iconKey: 'java' },
      { name: 'Python', iconKey: 'python' },
      { name: 'Ruby', iconKey: 'ruby' },
      { name: 'Elixir', iconKey: 'elixir' },
      { name: 'Spring Boot', iconKey: 'spring' },
    ],
    isCurrentJob: false,
  },
  {
    position: 'Full-Stack Engineer',
    company: 'Kabisa',
    companyUrl: 'https://kabisa.nl',
    logoUrl: kabisaLogo.src,
    logoAlt: 'Kabisa logo',
    duration: '3 years 11 months',
    location: 'Remote - Weert, NL',
    employmentType: 'Full-time',
    description:
      'Backend Tech Lead at Kabisa, specialized in developing elegant (enterprise) software solutions.',
    achievements: [
      'Leading backend development teams',
      'Architecture of enterprise software solutions',
      'Expertise in Java, Python, Ruby, Elixir and Front-end development',
      'Implementation of scalable microservices architecture',
      'Mentoring and coaching of development teams',
    ],
    technologies: [
      { name: 'Java', iconKey: 'java' },
      { name: 'Python', iconKey: 'python' },
      { name: 'Ruby', iconKey: 'ruby' },
      { name: 'Elixir', iconKey: 'elixir' },
      { name: 'Spring Boot', iconKey: 'spring' },
    ],
    isCurrentJob: true,
  },
  {
    position: 'Blockchain Software Engineer',
    company: 'SynTouch',
    companyUrl: 'https://syntouch.nl',
    logoUrl: syntouchLogo.src,
    logoAlt: 'SynTouch logo',
    duration: '6 months',
    location: 'Eindhoven, NL',
    employmentType: 'Graduation',
    description:
      'Graduated Cum Laude · Development of ERC-20 token and blockchain applications.',
    achievements: [
      'Developed ERC-20 token SynCoin with Ethereum smart contracts',
      'Built escrow, order and crowdsale system in Solidity',
      'Research on upgradeable smart contracts',
      'Node.js backend with Swagger + Express',
      'Vue.js frontend for blockchain interaction',
    ],
    technologies: [
      { name: 'Solidity', iconKey: 'solidity' },
      { name: 'Node.js', iconKey: 'nodejs' },
      { name: 'Vue.js', iconKey: 'vuejs' },
      { name: 'Web3', iconKey: 'web3js' },
    ],
    isCurrentJob: false,
  },
  {
    position: 'Junior Software Engineer',
    company: 'Scorito.com',
    companyUrl: 'https://scorito.com',
    logoUrl: scoritoLogo.src,
    logoAlt: 'Scorito.com logo',
    duration: '1 year',
    location: 'Breda, NL',
    employmentType: 'Part-time',
    description: 'Web development with C# ASP.NET MVC in a Scrum team.',
    achievements: [
      'Web development with C# ASP.NET MVC',
      'Agile development in Scrum team',
      'Implementation of new features',
      'Unit testing and code reviews',
      'Database design with SQL Server',
    ],
    technologies: [
      { name: 'C#', iconKey: 'csharp' },
      { name: 'ASP.NET MVC', iconKey: 'dot-net' },
      { name: 'SQL Server', iconKey: 'microsoftsqlserver' },
      { name: 'JavaScript', iconKey: 'javascript' },
    ],
    isCurrentJob: false,
  },
  {
    position: 'Software Engineering Intern',
    company: 'Scorito.com',
    companyUrl: 'https://scorito.com',
    logoUrl: scoritoLogo.src,
    logoAlt: 'Scorito.com logo',
    duration: '6 months',
    location: 'Breda, NL',
    employmentType: 'Internship',
    description: 'Development of test framework for acceptance testing.',
    achievements: [
      'Developed test framework with Selenium and C#',
      'Simple setup of acceptance tests',
      'Test automation implementation',
      'Documentation and training for team',
      'Integration with CI/CD pipeline',
    ],
    technologies: [
      { name: 'C#', iconKey: 'csharp' },
      { name: 'Selenium', iconKey: 'selenium' },
      { name: 'ASP.NET', iconKey: 'dot-net' },
      { name: 'Test Automation', iconKey: 'selenium' },
    ],
    isCurrentJob: false,
  },
]

export default function ExperiencePage() {
  // Calculate unique positions and companies
  const uniquePositions = new Set(experiences.map(exp => exp.position)).size
  const uniqueCompanies = new Set(experiences.map(exp => exp.company)).size
  return (
    <main className="flex-1 flex flex-col bg-gray-950">
      <ExperienceHero
        positionCount={uniquePositions}
        companyCount={uniqueCompanies}
      />

      <div className="lg:w-7/10 mx-auto px-2 sm:px-4 lg:px-6 pb-20">
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
            {experiences.map((exp, index) => {
              const dotColors = [
                'purple',
                'blue',
                'emerald',
                'orange',
                'red',
                'cyan',
                'indigo',
                'teal',
                'amber',
                'pink',
              ] as const
              const hexColors = [
                '#8b5cf6',
                '#3b82f6',
                '#14b8a6',
                '#f59e0b',
                '#ec4899',
                '#14b8a6',
                '#8b5cf6',
                '#f59e0b',
                '#ec4899',
                '#14b8a6',
              ]
              const alignment: 'left' | 'right' =
                index % 2 === 0 ? 'left' : 'right'
              const spacing: 'normal' | 'close' =
                index === 0 ? 'normal' : 'close'
              const dotColor = dotColors[index % dotColors.length]!
              const hexColor = hexColors[index % hexColors.length]!

              return (
                <TimelineItem
                  key={`${exp.company}-${exp.position}-${index}`}
                  dotColor={dotColor}
                  alignment={alignment}
                  spacing={spacing}
                >
                  <ExperienceCard
                    {...exp}
                    alignment="left"
                    dotColor={hexColor}
                  />
                </TimelineItem>
              )
            })}
          </div>
        </TimelineLayout>
      </div>
    </main>
  )
}
