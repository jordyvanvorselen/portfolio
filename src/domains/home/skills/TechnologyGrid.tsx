import { TechnologyCards } from '@/domains/home/skills/TechnologyCards'

type Technology = {
  name: string
  icon: string
}

const technologies: Technology[] = [
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Java', icon: 'java' },
  { name: 'Elixir', icon: 'elixir' },
  { name: 'Python', icon: 'python' },
  { name: 'Ruby', icon: 'ruby' },
  { name: 'C#', icon: 'csharp' },
  { name: 'AWS', icon: 'amazonwebservices' },
  { name: 'Flutter', icon: 'flutter' },
  { name: 'DevOps', icon: 'docker' },
  { name: 'Blockchain', icon: 'solidity' },
]

export const TechnologyGrid = () => {
  return (
    <div className="w-full px-4 md:px-8 pt-5">
      <div className="max-w-7xl mx-auto">
        <TechnologyCards technologies={technologies} />
      </div>
    </div>
  )
}
