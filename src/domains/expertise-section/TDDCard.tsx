import { TestTube } from 'lucide-react'

import { Card } from '@/ui/Card'
import { Badge } from '@/ui/Badge'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export function TDDCard(): JSX.Element {
  return (
    <Card aria-label="Test-Driven Development">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative flex-shrink-0 mt-1">
          <div className="inline-flex p-3 rounded-2xl bg-[#10b981]/10 border border-white/5 group-hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="text-[#10b981] drop-shadow-sm">
              <TestTube className="w-7 h-7" aria-label="test tube icon" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/20 blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
        </div>
        <div className="flex-1">
          <Title variant="card-title">Test-Driven Development</Title>
        </div>
      </div>
      <Text variant="card-description">
        I write tests first, then code. This approach ensures robust, bug-free
        software with comprehensive test coverage. My TDD practice leads to
        better design decisions and maintainable codebases.
      </Text>
      <div className="space-y-4 mb-8">
        <Title variant="subsection-label">KEY SKILLS & TOOLS</Title>
        <div className="flex flex-wrap gap-2">
          <Badge variant="skill">Jest</Badge>
          <Badge variant="skill">Cypress</Badge>
          <Badge variant="skill">Testing Library</Badge>
          <Badge variant="skill">Unit Testing</Badge>
          <Badge variant="skill">Integration Testing</Badge>
          <Badge variant="skill">E2E Testing</Badge>
        </div>
      </div>
    </Card>
  )
}
