import { ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'

import { Card } from '@/ui/Card'
import { Badge } from '@/ui/Badge'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Divider } from '@/ui/Divider'
import { IconContainer } from '@/ui/IconContainer'

interface ExpertiseCardProps {
  ariaLabel: string
  icon: ReactNode
  iconColor: string
  title: string
  description: string
  skills: string[]
  publicationCount: number
}

export const ExpertiseCard = ({
  ariaLabel,
  icon,
  iconColor,
  title,
  description,
  skills,
  publicationCount,
}: ExpertiseCardProps) => {
  return (
    <Card aria-label={ariaLabel}>
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 mt-1">
          <IconContainer color={iconColor} variant="expertise" size="md">
            {icon}
          </IconContainer>
        </div>
        <div className="flex-1">
          <Title variant="card-title">{title}</Title>
        </div>
      </div>
      <div className="flex-grow">
        <Text variant="card-description">{description}</Text>
      </div>
      <div className="mt-auto">
        <div className="space-y-4 mb-6">
          <Title variant="subsection-label">KEY SKILLS & TOOLS</Title>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="skill">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <Divider>
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-3">
              <Text variant="publication-number" style={{ color: iconColor }}>
                {publicationCount}
              </Text>
              <div className="flex flex-col text-left">
                <Text variant="publication-label">Publications</Text>
                <Text variant="publication-description">on this topic</Text>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400" />
          </div>
        </Divider>
      </div>
    </Card>
  )
}
