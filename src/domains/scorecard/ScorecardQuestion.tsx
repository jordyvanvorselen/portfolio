'use client'

import { useEffect } from 'react'
import { ArrowLeft, Check, Users } from 'lucide-react'

import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import { pillars, type Question } from '@/domains/scorecard/scorecard.data'

interface ScorecardQuestionProps {
  question: Question
  index: number
  total: number
  selected: number | undefined
  onSelect: (value: number) => void
  onBack: () => void
}

const optionValues = (question: Question) =>
  question.kind === 'scored'
    ? question.options.map(({ label, points }) => ({ label, value: points }))
    : question.options

export const ScorecardQuestion = ({
  question,
  index,
  total,
  selected,
  onSelect,
  onBack,
}: ScorecardQuestionProps) => {
  const options = optionValues(question)
  const pillar =
    question.kind === 'scored'
      ? pillars.find(({ id }) => id === question.pillar)
      : undefined
  const Icon = pillar ? pillarIcons[pillar.id] : Users

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const option = options[Number(event.key) - 1]
      if (option) onSelect(option.value)
      if (event.key === 'Backspace' || event.key === 'ArrowLeft') onBack()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [options, onSelect, onBack])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, step) => (
          <div
            key={step}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-800"
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-500 ${
                step < index ? 'w-full' : step === index ? 'w-1/2' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          {index === 0 ? 'Intro' : 'Back'}
        </button>
        <span className="font-medium text-gray-500">
          {index + 1} / {total}
        </span>
      </div>

      <div key={question.id} className="mt-12">
        <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/60 px-3 py-1 text-sm font-medium text-gray-300">
          <Icon className="w-4 h-4 text-teal-400" />
          {pillar ? pillar.name : 'About your team'}
        </div>

        <h2
          className="animate-rise mt-6 text-3xl sm:text-4xl font-bold leading-tight text-white"
          style={{ animationDelay: '60ms' }}
        >
          {question.text}
        </h2>

        <p
          className="animate-rise mt-4 text-lg text-gray-500"
          style={{ animationDelay: '120ms' }}
        >
          {question.why}
        </p>

        <div className="mt-10 grid gap-3" role="radiogroup">
          {options.map((option, optionIndex) => {
            const isSelected = selected === option.value
            return (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(option.value)}
                className={`animate-rise group click-feedback-subtle flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/10'
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900'
                }`}
                style={{ animationDelay: `${180 + optionIndex * 60}ms` }}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
                    isSelected
                      ? 'border-teal-400 bg-teal-400 text-gray-950'
                      : 'border-gray-700 text-gray-500 group-hover:border-gray-500 group-hover:text-gray-300'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : optionIndex + 1}
                </span>
                <span
                  className={`text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}
                >
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-8 hidden sm:block text-center text-sm text-gray-600">
          Tip: press{' '}
          <kbd className="rounded border border-gray-700 px-1.5 py-0.5 text-gray-400">
            1
          </kbd>
          –
          <kbd className="rounded border border-gray-700 px-1.5 py-0.5 text-gray-400">
            4
          </kbd>{' '}
          to answer
        </p>
      </div>
    </div>
  )
}
