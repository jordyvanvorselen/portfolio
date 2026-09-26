'use client'

import { useCountUp } from '@/domains/scorecard/useCountUp'

interface GaugeProps {
  value: number
  label: string
  caption: string
  unit?: string
  variant: 'tachometer' | 'speedometer'
  delayMs?: number
  durationMs?: number
}

const CX = 120
const CY = 120
const RADIUS = 96
const START_ANGLE = 150
const SWEEP = 240

const pointAt = (angle: number, radius: number) => {
  const radians = (angle * Math.PI) / 180
  return {
    x: CX + radius * Math.cos(radians),
    y: CY + radius * Math.sin(radians),
  }
}

const arcPath = (fromPercent: number, toPercent: number, radius: number) => {
  const from = pointAt(START_ANGLE + (SWEEP * fromPercent) / 100, radius)
  const to = pointAt(START_ANGLE + (SWEEP * toPercent) / 100, radius)
  const largeArc = (SWEEP * (toPercent - fromPercent)) / 100 > 180 ? 1 : 0
  return `M ${from.x} ${from.y} A ${radius} ${radius} 0 ${largeArc} 1 ${to.x} ${to.y}`
}

const ticks = Array.from({ length: 21 }, (_, index) => index * 5)

export const Gauge = ({
  value,
  label,
  caption,
  unit = '',
  variant,
  delayMs = 0,
  durationMs = 1400,
}: GaugeProps) => {
  const current = useCountUp(value, durationMs, delayMs)
  const needleAngle = START_ANGLE + (SWEEP * current) / 100
  const isTachometer = variant === 'tachometer'

  return (
    <figure className="flex flex-col items-center">
      <svg
        viewBox="0 0 240 200"
        className="w-full max-w-[280px]"
        aria-hidden="true"
      >
        <path
          d={arcPath(0, 100, RADIUS)}
          fill="none"
          stroke="#1f2937"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {isTachometer && (
          <path
            d={arcPath(80, 100, RADIUS + 13)}
            fill="none"
            stroke="#fbbf24"
            strokeOpacity="0.7"
            strokeWidth="3"
          />
        )}
        {current > 0 && (
          <path
            d={arcPath(0, current, RADIUS)}
            fill="none"
            stroke={isTachometer ? '#d1d5db' : '#2dd4bf'}
            strokeWidth="14"
            strokeLinecap="round"
          />
        )}

        {ticks.map(tick => {
          const angle = START_ANGLE + (SWEEP * tick) / 100
          const isMajor = tick % 25 === 0
          const outer = pointAt(angle, RADIUS - 12)
          const inner = pointAt(angle, RADIUS - (isMajor ? 24 : 18))
          return (
            <line
              key={tick}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={isMajor ? '#9ca3af' : '#4b5563'}
              strokeWidth={isMajor ? 2 : 1}
            />
          )
        })}

        <g transform={`rotate(${needleAngle} ${CX} ${CY})`}>
          <line
            x1={CX - 10}
            y1={CY}
            x2={CX + RADIUS - 28}
            y2={CY}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <circle
          cx={CX}
          cy={CY}
          r="8"
          fill="#030712"
          stroke="white"
          strokeWidth="3"
        />

        <text
          x={CX}
          y={CY + 48}
          textAnchor="middle"
          className="fill-white font-bold"
          fontSize="34"
        >
          {current}
          {unit}
        </text>
      </svg>
      <figcaption className="-mt-4 text-center">
        <div className="text-sm font-semibold uppercase tracking-widest text-gray-300">
          {label}
        </div>
        <div className="mt-1 text-sm text-gray-400">{caption}</div>
        <div className="sr-only">
          {value}
          {unit}
        </div>
      </figcaption>
    </figure>
  )
}
