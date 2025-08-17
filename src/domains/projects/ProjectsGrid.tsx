import { ProjectCard } from '@/domains/projects/ProjectCard'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Project } from '@/types/project'

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Microservice Orchestrator',
    description:
      'A powerful orchestration platform for managing complex microservice architectures with automated deployment, monitoring, and scaling capabilities.',
    longDescription:
      'Built with Node.js and Kubernetes, this platform provides a comprehensive solution for microservice management. Features include service discovery, load balancing, health monitoring, and automated rollback mechanisms. Used by teams to deploy and manage over 200+ microservices in production.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: [
      'Node.js',
      'Kubernetes',
      'Docker',
      'TypeScript',
      'Redis',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/jordyvanvorselen/microservice-orchestrator',
    liveUrl: 'https://orchestrator.demo.com',
    stars: 2800,
    forks: 312,
  },
  {
    id: '2',
    title: 'Real-time Analytics Engine',
    description:
      'High-performance analytics engine processing millions of events per second with sub-millisecond latency and real-time dashboard visualization.',
    longDescription:
      'A distributed analytics platform built with Apache Kafka, ClickHouse, and React. Processes streaming data from multiple sources, performs complex aggregations, and provides real-time insights through interactive dashboards. Handles 10M+ events per second with 99.9% uptime.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: [
      'Apache Kafka',
      'ClickHouse',
      'React',
      'Python',
      'WebSocket',
      'D3.js',
    ],
    githubUrl: 'https://github.com/jordyvanvorselen/analytics-engine',
    liveUrl: 'https://analytics.demo.com',
    stars: 1900,
    forks: 187,
  },
  {
    id: '3',
    title: 'Distributed Cache System',
    description:
      'Enterprise-grade distributed caching solution with intelligent data partitioning, automatic failover, and multi-region replication.',
    longDescription:
      'A Redis-compatible distributed cache system written in Go. Features consistent hashing, automatic sharding, cross-datacenter replication, and built-in monitoring. Designed for high availability and horizontal scaling with zero-downtime deployments.',
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: ['Go', 'Redis', 'gRPC', 'Prometheus', 'Grafana', 'Docker'],
    githubUrl: 'https://github.com/jordyvanvorselen/distributed-cache',
    stars: 1500,
    forks: 203,
  },
  {
    id: '4',
    title: 'AI Code Reviewer',
    description:
      'Intelligent code review assistant powered by machine learning that provides automated code quality analysis and improvement suggestions.',
    longDescription:
      'An AI-powered tool that analyzes code commits and pull requests to identify potential issues, security vulnerabilities, and performance optimizations. Integrates with GitHub, GitLab, and Bitbucket. Trained on millions of code reviews to provide human-like feedback.',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: [
      'Python',
      'TensorFlow',
      'FastAPI',
      'PostgreSQL',
      'GitHub API',
      'Docker',
    ],
    githubUrl: 'https://github.com/jordyvanvorselen/ai-code-reviewer',
    liveUrl: 'https://code-reviewer.demo.com',
    stars: 3200,
    forks: 428,
  },
  {
    id: '5',
    title: 'Blockchain Explorer',
    description:
      'Advanced blockchain explorer with transaction analysis, smart contract interaction, and comprehensive network statistics visualization.',
    longDescription:
      'A full-featured blockchain explorer supporting multiple networks including Ethereum, Bitcoin, and Polygon. Features include transaction tracing, smart contract verification, DeFi protocol analysis, and real-time network monitoring with beautiful data visualizations.',
    image:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: [
      'React',
      'Node.js',
      'Web3.js',
      'MongoDB',
      'Chart.js',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/jordyvanvorselen/blockchain-explorer',
    liveUrl: 'https://explorer.demo.com',
    stars: 892,
    forks: 124,
  },
  {
    id: '6',
    title: 'DevOps Automation Suite',
    description:
      'Comprehensive DevOps toolkit for CI/CD pipeline automation, infrastructure provisioning, and deployment orchestration across cloud providers.',
    longDescription:
      'A complete DevOps automation platform that streamlines the entire software delivery lifecycle. Includes infrastructure as code templates, automated testing pipelines, security scanning, and multi-cloud deployment strategies. Reduces deployment time by 80% and improves reliability.',
    image:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: [
      'Terraform',
      'Ansible',
      'Jenkins',
      'AWS',
      'Azure',
      'Kubernetes',
    ],
    githubUrl: 'https://github.com/jordyvanvorselen/devops-suite',
    stars: 1700,
    forks: 289,
  },
]

export const ProjectsGrid = () => {
  return (
    <section
      role="region"
      aria-label="projects grid"
      className="relative py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <Title
            size="2xl"
            weight="bold"
            color="primary"
            align="center"
            as="h2"
            className="mb-4"
          >
            Featured Projects
          </Title>
          <Text
            size="xl"
            weight="normal"
            color="secondary"
            alignment="center"
            className="max-w-3xl mx-auto"
          >
            Each project represents hours of dedication, innovative
            problem-solving, and a commitment to building tools that make
            developers&apos; lives easier.
          </Text>
        </div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {mockProjects.map((project, index) => (
            <div key={project.id} className="relative">
              <ProjectCard
                project={project}
                reversed={index % 2 === 1}
                index={index}
              />

              {/* Elegant dot separator */}
              {index < mockProjects.length - 1 && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                    <div className="w-1 h-1 bg-teal-500/50 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 animate-pulse"
        style={{ animationDuration: '3s' }}
      />
    </section>
  )
}
