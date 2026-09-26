'use client'

import { useEffect, useState } from 'react'
import { Check, LoaderCircle } from 'lucide-react'

interface ScorecardAnalyzingProps {
  onDone: () => void
}

const STEP_MS = 700

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
      const timeout = setTimeout(onDone, 500)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => setCompleted(completed + 1), STEP_MS)
    return () => clearTimeout(timeout)
  }, [completed, onDone])

  return (
    <div className="max-w-md mx-auto px-4 min-h-[50vh] flex flex-col justify-center">
      <h2
        tabIndex={-1}
        data-autofocus
        className="text-2xl font-bold text-white outline-none"
      >
        Building your scorecard
      </h2>

      <ul className="mt-8 space-y-4" role="status">
        {steps.map((step, index) => {
          const isDone = index < completed
          const isActive = index === completed
          return (
            <li
              key={step}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isDone || isActive ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  isDone ? 'bg-teal-400 text-gray-950' : 'text-teal-400'
                }`}
                aria-hidden="true"
              >
                {isDone ? (
                  <Check className="w-4 h-4 motion-safe:animate-pop" />
                ) : (
                  <LoaderCircle
                    className={`w-4 h-4 ${isActive ? 'motion-safe:animate-spin' : ''}`}
                  />
                )}
              </span>
              <span className={isDone ? 'text-gray-200' : 'text-gray-400'}>
                {step}
                {isDone && <span className="sr-only"> (done)</span>}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
