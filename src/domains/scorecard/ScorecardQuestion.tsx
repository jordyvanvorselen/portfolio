'use client'

import { useEffect, useId } from 'react'
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

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName))

export const ScorecardQuestion = ({
  question,
  index,
  total,
  selected,
  onSelect,
  onBack,
}: ScorecardQuestionProps) => {
  const headingId = useId()
  const options = optionValues(question)
  const pillar =
    question.kind === 'scored'
      ? pillars.find(({ id }) => id === question.pillar)
      : undefined
  const Icon = pillar ? pillarIcons[pillar.id] : Users

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (isTyping(event.target)) return
      const option = options[Number(event.key) - 1]
      if (option) onSelect(option.value)
      if (event.key === 'Backspace') onBack()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [options, onSelect, onBack])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-label="Scorecard progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
      >
        {Array.from({ length: total }, (_, step) => (
          <div
            key={step}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-800"
          >
            <div
              className={`h-full origin-left rounded-full bg-teal-400 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                step < index
                  ? 'scale-x-100'
                  : step === index
                    ? 'scale-x-50'
                    : 'scale-x-0'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-teal-400"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {index === 0 ? 'Intro' : 'Back'}
        </button>
        <span className="inline-flex items-center gap-2 text-gray-400">
          <Icon className="w-4 h-4 text-teal-400" aria-hidden="true" />
          {pillar ? pillar.name : 'About your team'}
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {index + 1} / {total}
          </span>
        </span>
      </div>

      <div key={question.id} className="mt-10 motion-safe:animate-rise">
        <h2
          id={headingId}
          tabIndex={-1}
          data-autofocus
          className="text-3xl sm:text-4xl font-bold leading-tight text-white text-balance outline-none"
        >
          {question.text}
        </h2>

        <p className="mt-4 text-lg text-gray-400">{question.why}</p>

        <div
          className="mt-10 grid gap-3"
          role="group"
          aria-labelledby={headingId}
        >
          {options.map((option, optionIndex) => {
            const isSelected = selected === option.value
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(option.value)}
                className={`group click-feedback-subtle flex items-center gap-4 rounded-xl border p-5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
                  isSelected
                    ? 'border-teal-400 bg-teal-500/10'
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-900'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
                    isSelected
                      ? 'border-teal-400 bg-teal-400 text-gray-950'
                      : 'border-gray-700 text-gray-400 group-hover:border-gray-500 group-hover:text-gray-200'
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

        <p className="mt-8 hidden sm:block text-center text-sm text-gray-400">
          Tip: press{' '}
          <kbd className="rounded border border-gray-700 px-1.5 py-0.5 text-gray-300">
            1
          </kbd>
          –
          <kbd className="rounded border border-gray-700 px-1.5 py-0.5 text-gray-300">
            4
          </kbd>{' '}
          to answer
        </p>
      </div>
    </div>
  )
}
