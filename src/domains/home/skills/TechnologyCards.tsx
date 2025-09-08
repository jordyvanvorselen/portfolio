import { DevIcon } from '@/ui/DevIcon'

export interface Technology {
  name: string
  icon: string
}

interface TechnologyCardsProps {
  technologies: Technology[]
}

export const TechnologyCards = ({ technologies }: TechnologyCardsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
      {technologies.map(tech => {
        return (
          <div key={tech.name} className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 transition-all duration-200 hover:rounded-xl hover:border hover:border-slate-600 hover:bg-slate-800/80 p-3 sm:p-6 w-24 h-24 sm:w-40 sm:h-40">
              <DevIcon
                name={tech.icon}
                className="text-4xl sm:text-7xl flex-shrink-0"
              />
              <span className="text-white font-medium text-sm sm:text-2xl leading-tight text-center">
                {tech.name}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
