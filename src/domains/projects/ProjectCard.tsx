import { ExternalLink, Github, Star, GitFork } from 'lucide-react'
import Image from 'next/image'

import { StatItem } from '@/ui/StatItem'
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
                variant="floating"
              />
              <StatItem
                value={project.forks}
                label="forks"
                icon={<GitFork className="w-3 h-3 text-gray-300" />}
                variant="floating"
              />
            </div>

            {/* Status badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <div
                className={`backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border ${
                  isFeatured
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}
              >
                {isFeatured ? 'Active' : 'Maintained'}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-white transition-all duration-500">
                {project.title}
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              {project.description}
            </p>

            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <div
                  key={tech}
                  className="bg-gray-800/50 text-gray-300 border border-gray-700/30 hover:bg-gray-700/60 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    animationDelay: `${index * 200 + techIndex * 50}ms`,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700/30">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 py-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 hover:text-teal-200 transition-all duration-300 rounded-full px-6 flex items-center gap-2"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              View Source
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 rounded-full px-6 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
