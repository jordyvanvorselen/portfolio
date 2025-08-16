import { Code, Star, Github } from 'lucide-react'
import { StatItem } from '@/ui/StatItem'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export const ProjectsHero = () => {
  return (
    <section 
      className="relative pt-32 pb-20 overflow-hidden"
      role="region"
      aria-label="hero"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <Title variant="projects-hero-title">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Open Source Projects
            </span>
          </Title>

          {/* Description */}
          <Text variant="projects-hero-description">
            A collection of innovative software solutions born from curiosity,
            continuous learning, and the pure joy of building something
            meaningful. Each project represents a journey of discovery and fun
            in the world of code.
          </Text>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <StatItem
              value={6}
              label="Projects"
              icon={<Code className="w-4 h-4" />}
              hoverColor="teal"
            />
            <div className="w-px h-6 bg-gray-600" />
            <StatItem
              value={12037}
              label="Stars"
              icon={<Star className="w-4 h-4" />}
              hoverColor="yellow"
            />
            <div className="w-px h-6 bg-gray-600" />
            <StatItem
              value={1543}
              label="Forks"
              icon={<Github className="w-4 h-4" />}
              hoverColor="purple"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  )
}
