import { ExternalLink, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Card } from '@/ui/Card'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Badge } from '@/ui/Badge'

interface ExperienceCardProps {
  position: string
  company: string
  companyUrl?: string
  logoUrl: string
  logoAlt: string
  duration: string
  location: string
  employmentType: 'Full-time' | 'Contract' | 'Internship'
  description: string
  achievements: string[]
  technologies: string[]
  isCurrentJob?: boolean
  alignment: 'left' | 'right'
  dotColor: string
}

export const ExperienceCard = ({
  position,
  company,
  companyUrl,
  logoUrl,
  logoAlt,
  duration,
  location,
  employmentType,
  description,
  achievements,
  technologies,
  isCurrentJob = false,
}: ExperienceCardProps) => {
  return (
    <div className="h-full">
      <Card className="transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
          {/* Header with logo and position */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-shrink-0 mt-0.5 sm:mt-1">
              <div className="absolute inset-0 bg-teal-500/20 rounded-lg sm:rounded-xl blur-sm sm:blur-lg" />
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={48}
                height={48}
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-all duration-300 shadow-lg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Title
                as="h3"
                size="lg"
                weight="bold"
                color="primary"
                hoverColor="white"
                className="mb-1 sm:mb-2 leading-tight transition-colors duration-300"
              >
                {position}
              </Title>

              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Text
                  size="base"
                  weight="semibold"
                  color="accent"
                  className="sm:text-lg truncate"
                >
                  {company}
                </Text>
                {companyUrl && (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200 flex-shrink-0"
                    aria-label={`Visit ${company} website`}
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                )}
              </div>

              {/* Meta information */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{duration}</span>
                  {isCurrentJob && (
                    <Badge
                      variant="soft"
                      color="primary"
                      size="sm"
                      className="ml-1 sm:ml-2"
                    >
                      Current
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{location}</span>
                </div>
              </div>

              <Badge variant="soft" color="success" size="sm" className="w-fit">
                {employmentType}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <Text
            size="sm"
            color="secondary"
            lineHeight="relaxed"
            className="mb-6 sm:mb-8 group-hover:text-gray-200 transition-colors duration-300"
          >
            {description}
          </Text>

          {/* Achievements */}
          <div className="mb-6 sm:mb-8 flex-grow">
            <Title
              as="h4"
              size="xs"
              weight="bold"
              color="muted"
              uppercase
              tracking="wide"
              className="mb-3 sm:mb-4"
            >
              Key Achievements
            </Title>
            <ul className="space-y-2 sm:space-y-3">
              {achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 group-hover:text-gray-200 transition-colors duration-300"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full flex-shrink-0" />
                  <Text size="xs" color="secondary" className="flex-1">
                    {achievement}
                  </Text>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mt-auto">
            <Title
              as="h4"
              size="xs"
              weight="bold"
              color="muted"
              uppercase
              tracking="wide"
              className="mb-3 sm:mb-4"
            >
              Technologies Used
            </Title>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  color="default"
                  size="sm"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
    </div>
  )
}
