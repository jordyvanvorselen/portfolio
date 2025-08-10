import { Mouse } from 'lucide-react'

export const ScrollIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Mouse Icon with bounce animation */}
      <figure
        className="mb-4 animate-bounce"
        style={{
          animationDuration: '2s',
        }}
      >
        <Mouse
          className="w-12 h-12 text-teal-400/60 drop-shadow-[0_0_12px_rgba(20,184,166,0.6)]"
          strokeWidth={1.4}
        />
      </figure>

      {/* SCROLL Text */}
      <span className="text-gray-400/70 text-sm font-medium tracking-[0.2em] uppercase text-center">
        SCROLL
      </span>
    </div>
  )
}
