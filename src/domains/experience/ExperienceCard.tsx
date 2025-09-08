'use client'

import { ExternalLink, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Card } from '@/ui/Card'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Badge } from '@/ui/Badge'
import { DevIcon } from '@/ui/DevIcon'

interface Technology {
  name: string
  iconKey: string
}

interface ExperienceCardProps {
  position: string
  company: string
  companyUrl?: string
  logoUrl: string
  logoAlt: string
  duration: string
  location: string
  employmentType: 'Full-time' | 'Part-time' | 'Internship' | 'Graduation'
  description: string
  achievements: string[]
  technologies: Technology[]
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
  const t = useTranslations()
  return (
    <div className="h-full">
      <Card className="transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
        {/* Header with logo and position */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-shrink-0">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-gray-800 bg-gray-900/50 p-3 flex items-center justify-center">
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={96}
                height={96}
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <Title
              as="h3"
              size="lg"
              weight="bold"
              color="primary"
              hoverColor="white"
              className="mb-2 sm:mb-3 leading-tight transition-colors duration-300"
            >
              {position}
            </Title>

            <div className="flex items-center gap-2 mb-2">
              <Text
                size="base"
                weight="semibold"
                color="accent"
                className="truncate"
              >
                {company}
              </Text>
              {companyUrl && (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-200 flex-shrink-0"
                  aria-label={t('experience.card.visitWebsite', { company })}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Meta information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-sm text-gray-400">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Calendar className="w-4 h-4" />
                <span className="whitespace-nowrap">{duration}</span>
              </div>

              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Type Badge */}
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="soft" color="success" size="sm" className="w-fit">
            {employmentType}
          </Badge>
          {isCurrentJob && (
            <Badge variant="soft" color="primary" size="sm" className="w-fit">
              {t('experience.card.current')}
            </Badge>
          )}
        </div>

        {/* Description */}
        <Text
          size="base"
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
            size="sm"
            weight="semibold"
            color="secondary"
            uppercase
            tracking="wide"
            className="mb-4 sm:mb-5"
          >
            {t('experience.card.keyAchievements')}
          </Title>
          <ul className="space-y-2 sm:space-y-2.5">
            {achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-3 group-hover:text-gray-200 transition-colors duration-300"
              >
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0 mt-1.5" />
                <Text
                  size="sm"
                  color="secondary"
                  lineHeight="normal"
                  className="flex-1"
                >
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
            size="sm"
            weight="semibold"
            color="secondary"
            uppercase
            tracking="wide"
            className="mb-4 sm:mb-5"
          >
            {t('experience.card.technologiesUsed')}
          </Title>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                color="default"
                size="md"
                icon={<DevIcon name={tech.iconKey} />}
                className="hover:scale-105 transition-transform duration-200"
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
