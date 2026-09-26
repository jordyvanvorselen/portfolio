'use client'

import { useEffect, useState } from 'react'
import { Check, LoaderCircle } from 'lucide-react'

interface ScorecardAnalyzingProps {
  onDone: () => void
}

const STEP_MS = 650

const steps = [
  'Scoring your six delivery rails',
  'Comparing engine speed to road speed',
  'Finding your biggest leak',
  'Estimating what the leaks cost',
]

export const ScorecardAnalyzing = ({ onDone }: ScorecardAnalyzingProps) => {
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    if (completed === steps.length) {
      const timeout = setTimeout(onDone, 400)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => setCompleted(completed + 1), STEP_MS)
    return () => clearTimeout(timeout)
  }, [completed, onDone])

  return (
    <div className="max-w-md mx-auto px-4 text-center">
      <div className="relative mx-auto h-32 w-32">
        <div className="absolute inset-0 rounded-full border-2 border-gray-800" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-teal-400 border-r-blue-400" />
        <div className="absolute inset-4 animate-pulse rounded-full bg-teal-500/10 blur-md" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
          {Math.round((completed / steps.length) * 100)}%
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-white">
        Building your scorecard
      </h2>

      <ul className="mt-8 space-y-4 text-left">
        {steps.map((step, index) => {
          const isDone = index < completed
          const isActive = index === completed
          return (
            <li
              key={step}
              className={`flex items-center gap-3 transition-all duration-500 ${
                isDone || isActive ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  isDone ? 'bg-teal-500 text-gray-950' : 'text-teal-400'
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <LoaderCircle
                    className={`w-4 h-4 ${isActive ? 'animate-spin' : ''}`}
                  />
                )}
              </span>
              <span className={isDone ? 'text-gray-300' : 'text-gray-400'}>
                {step}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
