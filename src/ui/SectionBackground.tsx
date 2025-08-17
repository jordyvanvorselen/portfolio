import { ReactNode } from 'react'

export interface SectionBackgroundProps {
  children: ReactNode
  variant?: 'plain' | 'gradient' | 'animated' | 'textured'
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
}

export const SectionBackground = ({
  children,
  variant = 'gradient',
  intensity = 'medium',
  className = '',
}: SectionBackgroundProps) => {
  const intensityConfig = {
    subtle: {
      gradient: 'from-gray-950 via-gray-950 to-gray-900',
      animatedOpacity: '5',
      animatedSize: 'w-60 h-60',
      animatedBlur: 'blur-2xl',
    },
    medium: {
      gradient: 'from-gray-900 via-gray-950 to-black',
      animatedOpacity: '10',
      animatedSize: 'w-80 h-80',
      animatedBlur: 'blur-3xl',
    },
    strong: {
      gradient: 'from-gray-800 via-gray-900 to-black',
      animatedOpacity: '20',
      animatedSize: 'w-96 h-96',
      animatedBlur: 'blur-3xl',
    },
  }

  const config = intensityConfig[intensity]

  const backgroundElements = {
    plain: null,
    gradient: (
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
      />
    ),
    animated: (
      <>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
        />
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-40 -right-40 ${config.animatedSize} bg-teal-500/${config.animatedOpacity} rounded-full ${config.animatedBlur} animate-pulse`}
          />
          <div
            className={`absolute -bottom-40 -left-40 ${config.animatedSize} bg-blue-500/${config.animatedOpacity} rounded-full ${config.animatedBlur} animate-pulse delay-1000`}
          />
        </div>
      </>
    ),
    textured: (
      <>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
        />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)`,
              backgroundSize: '400px 400px, 300px 300px, 500px 500px',
            }}
          />
        </div>
      </>
    ),
  }

  return (
    <div className={`relative ${className}`.trim()}>
      {backgroundElements[variant]}
      <div className="relative">{children}</div>
    </div>
  )
}
