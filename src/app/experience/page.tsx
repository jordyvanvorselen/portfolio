import { Metadata } from 'next'
import { getTranslations, getMessages } from 'next-intl/server'
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.experience')

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface Technology {
  name: string
  iconKey: string
}

type EmploymentType = 'Full-time' | 'Part-time' | 'Internship' | 'Graduation'

interface Messages {
  experience: {
    positions: {
      [key: string]: {
        achievements: string[]
      }
    }
  }
}

interface Experience {
  position: string
  company: string
  companyUrl: string
  logoUrl: string
  logoAlt: string
  duration: string
  location: string
  employmentType: EmploymentType
  description: string
  achievements: string[]
  technologies: Technology[]
  isCurrentJob: boolean
}

const createExperienceFromTranslations = (
  t: (key: string) => string,
  messages: Messages
): Experience[] => {
  const experiencePositions = [
    {
      key: 'hertek2024',
      companyUrl: 'https://hertek.nl',
      logoUrl: hertekLogo.src,
      logoAlt: 'Hertek logo',
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
      key: 'asml2024',
      companyUrl: 'https://asml.com',
      logoUrl: asmlLogo.src,
      logoAlt: 'ASML logo',
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
      key: 'hertek2023',
      companyUrl: 'https://hertek.nl',
      logoUrl: hertekLogo.src,
      logoAlt: 'Hertek logo',
      technologies: [
        { name: 'Flutter', iconKey: 'flutter' },
        { name: 'Dart', iconKey: 'dart' },
        { name: 'Java', iconKey: 'java' },
        { name: 'Spring Boot', iconKey: 'spring' },
      ],
      isCurrentJob: false,
    },
    {
      key: 'asml2021',
      companyUrl: 'https://asml.com',
      logoUrl: asmlLogo.src,
      logoAlt: 'ASML logo',
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
      key: 'signify',
      companyUrl: 'https://signify.com',
      logoUrl: signifyLogo.src,
      logoAlt: 'Signify logo',
      technologies: [
        { name: 'React', iconKey: 'react' },
        { name: 'JavaScript', iconKey: 'javascript' },
        { name: 'Phoenix', iconKey: 'phoenix' },
        { name: 'Elixir', iconKey: 'elixir' },
      ],
      isCurrentJob: false,
    },
    {
      key: 'kabisa2020',
      companyUrl: 'https://kabisa.nl',
      logoUrl: kabisaLogo.src,
      logoAlt: 'Kabisa logo',
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
      key: 'kabisa2016',
      companyUrl: 'https://kabisa.nl',
      logoUrl: kabisaLogo.src,
      logoAlt: 'Kabisa logo',
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
      key: 'syntouch',
      companyUrl: 'https://syntouch.nl',
      logoUrl: syntouchLogo.src,
      logoAlt: 'SynTouch logo',
      technologies: [
        { name: 'Solidity', iconKey: 'solidity' },
        { name: 'Node.js', iconKey: 'nodejs' },
        { name: 'Vue.js', iconKey: 'vuejs' },
        { name: 'Web3', iconKey: 'web3js' },
      ],
      isCurrentJob: false,
    },
    {
      key: 'scorito',
      companyUrl: 'https://scorito.com',
      logoUrl: scoritoLogo.src,
      logoAlt: 'Scorito.com logo',
      technologies: [
        { name: 'C#', iconKey: 'csharp' },
        { name: 'ASP.NET MVC', iconKey: 'dot-net' },
        { name: 'SQL Server', iconKey: 'microsoftsqlserver' },
        { name: 'JavaScript', iconKey: 'javascript' },
      ],
      isCurrentJob: false,
    },
    {
      key: 'scoritoIntern',
      companyUrl: 'https://scorito.com',
      logoUrl: scoritoLogo.src,
      logoAlt: 'Scorito.com logo',
      technologies: [
        { name: 'C#', iconKey: 'csharp' },
        { name: 'Selenium', iconKey: 'selenium' },
        { name: 'ASP.NET', iconKey: 'dot-net' },
        { name: 'Test Automation', iconKey: 'selenium' },
      ],
      isCurrentJob: false,
    },
  ]

  return experiencePositions.map(exp => ({
    position: t(`experience.positions.${exp.key}.position`),
    company: t(`experience.positions.${exp.key}.company`),
    companyUrl: exp.companyUrl,
    logoUrl: exp.logoUrl,
    logoAlt: exp.logoAlt,
    duration: t(`experience.positions.${exp.key}.duration`),
    location: t(`experience.positions.${exp.key}.location`),
    employmentType: t(
      `experience.positions.${exp.key}.employmentType`
    ) as EmploymentType,
    description: t(`experience.positions.${exp.key}.description`),
    achievements: messages.experience.positions[exp.key]?.achievements || [],
    technologies: exp.technologies,
    isCurrentJob: exp.isCurrentJob,
  }))
}

export default async function ExperiencePage() {
  const t = await getTranslations()
  const messages = (await getMessages()) as Messages
  const experiences = createExperienceFromTranslations(t, messages)
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
              {t('pages.experience.professionalJourney')}
            </Title>
            <Text
              size="lg"
              color="secondary"
              lineHeight="relaxed"
              alignment="center"
              className="max-w-3xl mx-auto"
            >
              {t('pages.experience.journeyDescription')}
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
