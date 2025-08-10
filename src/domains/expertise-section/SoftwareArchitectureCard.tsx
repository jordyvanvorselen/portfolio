import { Layers, ExternalLink } from 'lucide-react'

import { Card } from '@/ui/Card'
import { Badge } from '@/ui/Badge'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Divider } from '@/ui/Divider'

export function SoftwareArchitectureCard(): JSX.Element {
  return (
    <Card aria-label="Software Architecture">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative flex-shrink-0 mt-1">
          <div className="inline-flex p-3 rounded-2xl bg-[#14b8a6]/10 border border-white/5 group-hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="text-[#14b8a6] drop-shadow-sm">
              <Layers className="w-7 h-7" aria-label="layers icon" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#14b8a6]/20 to-[#14b8a6]/20 blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
        </div>
        <div className="flex-1">
          <Title variant="card-title">Software Architecture</Title>
        </div>
      </div>
      <div className="flex-grow">
        <Text variant="card-description">
          I design scalable, maintainable systems using proven architectural
          patterns. From microservices to monoliths, I choose the right
          architecture based on the requirements of each unique project.
        </Text>
      </div>
      <div className="mt-auto">
        <div className="space-y-4 mb-6">
          <Title variant="subsection-label">KEY SKILLS & TOOLS</Title>
          <div className="flex flex-wrap gap-2">
            <Badge variant="skill">Microservices</Badge>
            <Badge variant="skill">Domain-Driven Design</Badge>
            <Badge variant="skill">Event Sourcing</Badge>
            <Badge variant="skill">CQRS</Badge>
            <Badge variant="skill">Clean Architecture</Badge>
            <Badge variant="skill">Hexagonal Architecture</Badge>
          </div>
        </div>
        <Divider>
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-3">
              <Text variant="publication-number" className="text-[#14b8a6]">
                8
              </Text>
              <div className="flex flex-col">
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
