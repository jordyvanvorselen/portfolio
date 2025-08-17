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
          <IconContainer
            color={iconColor}
            variant="rounded"
            effect="blur"
            interactive="scale"
            size="md"
          >
            {icon}
          </IconContainer>
        </div>
        <div className="flex-1">
          <Title size="lg" weight="bold" color="accent" align="left" as="h3">
            {title}
          </Title>
        </div>
      </div>
      <div className="flex-grow">
        <Text
          size="base"
          weight="normal"
          color="secondary"
          alignment="left"
          lineHeight="relaxed"
        >
          {description}
        </Text>
      </div>
      <div className="mt-auto">
        <div className="space-y-4 mb-6">
          <Title size="xs" weight="bold" color="muted" align="left" as="h4">
            KEY SKILLS & TOOLS
          </Title>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="soft" color="default" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <Divider>
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-3">
              <Text
                size="2xl"
                weight="bold"
                color="primary"
                style={{ color: iconColor }}
              >
                {publicationCount}
              </Text>
              <div className="flex flex-col text-left">
                <Text size="lg" weight="semibold" color="primary">
                  Publications
                </Text>
                <Text size="sm" weight="normal" color="muted">
                  on this topic
                </Text>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400" />
          </div>
        </Divider>
      </div>
    </Card>
  )
}
