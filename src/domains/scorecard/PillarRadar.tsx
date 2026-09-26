'use client'

import { useEffect, useState } from 'react'

import type { PillarScore } from '@/domains/scorecard/scorecard.data'

interface PillarRadarProps {
  scores: PillarScore[]
}

const CX = 160
const CY = 150
const RADIUS = 100
const RINGS = [25, 50, 75, 100]

const pointAt = (index: number, count: number, percent: number) => {
  const angle = ((-90 + (360 / count) * index) * Math.PI) / 180
  const distance = (RADIUS * percent) / 100
  return {
    x: CX + distance * Math.cos(angle),
    y: CY + distance * Math.sin(angle),
  }
}

const polygon = (count: number, percentAt: (index: number) => number) =>
  Array.from({ length: count }, (_, index) => {
    const { x, y } = pointAt(index, count, percentAt(index))
    return `${x},${y}`
  }).join(' ')

export const PillarRadar = ({ scores }: PillarRadarProps) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const count = scores.length

  useEffect(() => {
    const timeout = setTimeout(() => setIsRevealed(true), 400)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <svg
      viewBox="-24 0 368 300"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-label="Score per delivery rail"
    >
      <defs>
        <radialGradient id="radar-fill">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.45" />
        </radialGradient>
      </defs>

      {RINGS.map(ring => (
        <polygon
          key={ring}
          points={polygon(count, () => ring)}
          fill="none"
          stroke="#374151"
          strokeDasharray={ring === 100 ? undefined : '3 4'}
        />
      ))}

      {scores.map(({ pillar }, index) => {
        const edge = pointAt(index, count, 100)
        const label = pointAt(index, count, 124)
        return (
          <g key={pillar.id}>
            <line x1={CX} y1={CY} x2={edge.x} y2={edge.y} stroke="#1f2937" />
            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-400"
              fontSize="11"
              fontWeight="600"
            >
              {pillar.name}
            </text>
          </g>
        )
      })}

      <g
        style={{
          transform: `scale(${isRevealed ? 1 : 0})`,
          transformOrigin: `${CX}px ${CY}px`,
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <polygon
          points={polygon(count, index => Math.max(scores[index]!.score, 4))}
          fill="url(#radar-fill)"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {scores.map(({ pillar, score }, index) => {
          const { x, y } = pointAt(index, count, Math.max(score, 4))
          return (
            <circle
              key={pillar.id}
              cx={x}
              cy={y}
              r="4"
              fill="#030712"
              stroke="#2dd4bf"
              strokeWidth="2"
            />
          )
        })}
      </g>
    </svg>
  )
}
