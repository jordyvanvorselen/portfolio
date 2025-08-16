import {
  CodeIcon,
  GithubIcon,
  StarIcon,
  FolderIcon,
  GitForkIcon,
} from 'lucide-react'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { StatItem } from '@/ui/StatItem'
import { Divider } from '@/ui/Divider'

interface ProjectsHeroProps {
  totalProjects: number
  totalStars: number
  totalForks: number
}

export const ProjectsHero = ({
  totalProjects,
  totalStars,
  totalForks,
}: ProjectsHeroProps) => {
  return (
    <section
      className="header-offset relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      role="region"
      aria-label="hero"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Floating code symbols */}
        <div
          className="absolute top-20 left-20 text-teal-500/20 animate-pulse"
          style={{ animationDuration: '3s' }}
        >
          <CodeIcon className="w-8 h-8" />
        </div>
        <div
          className="absolute top-40 right-32 text-purple-500/20 animate-pulse"
          style={{ animationDuration: '4s' }}
        >
          <GithubIcon className="w-6 h-6" />
        </div>
        <div
          className="absolute bottom-32 left-32 text-teal-500/20 animate-pulse"
          style={{ animationDuration: '3.5s' }}
        >
          <StarIcon className="w-7 h-7" />
        </div>
        <div
          className="absolute bottom-20 right-20 text-purple-500/20 animate-pulse"
          style={{ animationDuration: '4.5s' }}
        >
          <CodeIcon className="w-5 h-5" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <Title variant="projects-hero-title">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Open Source
          </span>
          <br />
          <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Projects
          </span>
        </Title>

        {/* Description */}
        <Text variant="projects-hero-description">
          Crafting innovative solutions and contributing to the developer
          community through
          <span className="text-teal-400 font-semibold">
            {' '}
            open source software
          </span>
          . Each project is a playground for learning new tech, having fun with
          code, and satisfying my curiosity about how things work.
        </Text>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          <StatItem
            value={totalProjects}
            label="Projects"
            icon={<FolderIcon className="w-4 h-4" />}
            hoverColor="teal"
          />

          <Divider variant="vertical-gradient" />

          <StatItem
            value={totalStars}
            label="Stars"
            icon={<StarIcon className="w-4 h-4" />}
            hoverColor="yellow"
          />

          <Divider variant="vertical-gradient" />

          <StatItem
            value={totalForks}
            label="Forks"
            icon={<GitForkIcon className="w-4 h-4" />}
            hoverColor="purple"
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  )
}
