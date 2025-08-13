import {
  ExternalLinkIcon,
  GithubIcon,
  StarIcon,
  GitForkIcon,
} from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/ui/Button'
import { Badge } from '@/ui/Badge'
import { StatItem } from '@/ui/StatItem'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
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
  return (
    <article
      className={`group relative overflow-hidden transition-all duration-700 ${
        reversed
          ? 'animate-in slide-in-from-right-10'
          : 'animate-in slide-in-from-left-10'
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-16 ${
          reversed ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Image Section */}
        <div className="flex-1 relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-teal-500/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />

            {/* Floating stats */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <StatItem
                value={project.stars}
                label="stars"
                icon={<StarIcon className="w-3 h-3 text-yellow-400" />}
                variant="floating"
              />
              <StatItem
                value={project.forks}
                label="forks"
                icon={<GitForkIcon className="w-3 h-3 text-gray-300" />}
                variant="floating"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Title variant="project-card-title">{project.title}</Title>
            </div>

            <Text variant="project-card-description">
              {project.description}
            </Text>

            <Text variant="project-card-long-description">
              {project.longDescription}
            </Text>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <Title variant="project-section-label">Technologies</Title>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <Badge
                  key={tech}
                  variant="technology"
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
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="project-primary"
            >
              <GithubIcon className="w-4 h-4 mr-2" />
              View Source
            </Button>

            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="project-secondary"
              >
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
