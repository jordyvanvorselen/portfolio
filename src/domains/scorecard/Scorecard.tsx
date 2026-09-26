'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ScorecardAnalyzing } from '@/domains/scorecard/ScorecardAnalyzing'
import { ScorecardIntro } from '@/domains/scorecard/ScorecardIntro'
import { ScorecardQuestion } from '@/domains/scorecard/ScorecardQuestion'
import { ScorecardResults } from '@/domains/scorecard/ScorecardResults'
import {
  questions,
  sampleAnswers,
  scoreAnswers,
  type Answers,
} from '@/domains/scorecard/scorecard.data'
import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'

type Stage = 'intro' | 'quiz' | 'analyzing' | 'results'

const ADVANCE_DELAY_MS = 220

export const Scorecard = () => {
  const [stage, setStage] = useState<Stage>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const sectionRef = useRef<HTMLElement>(null)
  const advanceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const prefersReducedMotion = usePrefersReducedMotion()
  const question = questions[index]

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [stage, prefersReducedMotion])

  useEffect(() => {
    if (stage === 'intro') return
    sectionRef.current
      ?.querySelector<HTMLElement>('[data-autofocus]')
      ?.focus({ preventScroll: true })
  }, [stage, index])

  useEffect(() => () => clearTimeout(advanceRef.current), [])

  const onSelect = useCallback(
    (value: number) => {
      if (!question) return
      setAnswers(previous => ({ ...previous, [question.id]: value }))
      clearTimeout(advanceRef.current)
      advanceRef.current = setTimeout(() => {
        if (index === questions.length - 1) setStage('analyzing')
        else setIndex(index + 1)
      }, ADVANCE_DELAY_MS)
    },
    [question, index]
  )

  const onBack = useCallback(() => {
    clearTimeout(advanceRef.current)
    if (index === 0) setStage('intro')
    else setIndex(index - 1)
  }, [index])

  const onAnalyzed = useCallback(() => setStage('results'), [])

  const restart = () => {
    setAnswers({})
    setIndex(0)
    setStage('intro')
  }

  const preview = () => {
    setAnswers(sampleAnswers)
    setStage('analyzing')
  }

  return (
    <section
      ref={sectionRef}
      className="header-offset relative min-h-[calc(100vh-4rem)] overflow-hidden py-16 sm:py-24"
      aria-label="AI Delivery Scorecard"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl motion-safe:animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl motion-safe:animate-pulse delay-1000" />
      </div>

      <div className="relative">
        {stage === 'intro' && (
          <ScorecardIntro
            onStart={() => setStage('quiz')}
            onPreview={preview}
          />
        )}
        {stage === 'quiz' && question && (
          <ScorecardQuestion
            question={question}
            index={index}
            total={questions.length}
            selected={answers[question.id]}
            onSelect={onSelect}
            onBack={onBack}
          />
        )}
        {stage === 'analyzing' && <ScorecardAnalyzing onDone={onAnalyzed} />}
        {stage === 'results' && (
          <ScorecardResults
            result={scoreAnswers(answers)}
            onRestart={restart}
          />
        )}
      </div>
    </section>
  )
}
