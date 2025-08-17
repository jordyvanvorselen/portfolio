import { ExternalLink, Github, Star, GitFork } from 'lucide-react'
import Image from 'next/image'

import { StatItem } from '@/ui/StatItem'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Badge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { StatusBadge } from '@/ui/StatusBadge'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  reversed?: boolean
  index?: number
}

export const ProjectCard = ({
  project,
  reversed = false,
  index = 0,
}: ProjectCardProps) => {
  const isFeatured = index < 4
  const animationDirection = reversed
    ? 'slide-in-from-right-10'
    : 'slide-in-from-left-10'

  return (
    <div
      role="article"
      className={`group relative overflow-hidden rounded-xl hover:bg-gray-900/20 transition-all duration-500 p-8 animate-in ${animationDirection}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div
        className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${reversed ? 'lg:flex-row-reverse' : ''}`}
      >
        {/* Image Section */}
        <div className="flex-1 relative">
          <div className="relative overflow-hidden rounded-xl shadow-2xl group-hover:shadow-teal-500/10 transition-all duration-500 border border-gray-800 group-hover:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10" />

            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />

            {/* Floating stats */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <StatItem
                value={project.stars}
                label="stars"
                icon={<Star className="w-3 h-3 text-yellow-400" />}
                layout="floating"
              />
              <StatItem
                value={project.forks}
                label="forks"
                icon={<GitFork className="w-3 h-3 text-gray-300" />}
                layout="floating"
              />
            </div>

            {/* Status badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <StatusBadge
                variant="soft"
                color={isFeatured ? 'success' : 'info'}
              >
                {isFeatured ? 'Active' : 'Maintained'}
              </StatusBadge>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Title
                size="2xl"
                weight="bold"
                color="accent"
                align="left"
                as="h2"
              >
                {project.title}
              </Title>
            </div>

            <Text
              size="lg"
              weight="normal"
              color="secondary"
              lineHeight="relaxed"
              className="group-hover:text-gray-200 transition-colors duration-300"
            >
              {project.description}
            </Text>

            <Text
              size="base"
              weight="normal"
              color="muted"
              lineHeight="relaxed"
              className="group-hover:text-gray-300 transition-colors duration-300"
            >
              {project.longDescription}
            </Text>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <Title
              size="sm"
              weight="semibold"
              color="muted"
              align="left"
              as="h3"
            >
              Technologies
            </Title>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <Badge
                  variant="soft"
                  color="default"
                  size="sm"
                  rounded
                  key={tech}
                  style={{
                    animationDelay: `${index * 200 + techIndex * 50}ms`,
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700/30">
            <Button
              variant="outline"
              color="accent"
              size="md"
              href={project.githubUrl}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow flex items-center gap-2 rounded-full"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              View Source
            </Button>

            {project.liveUrl && (
              <Button
                variant="ghost"
                color="neutral"
                size="md"
                href={project.liveUrl}
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex items-center gap-2 rounded-full"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
