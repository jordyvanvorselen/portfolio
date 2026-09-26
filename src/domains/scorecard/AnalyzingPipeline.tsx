'use client'

import { useTranslations } from 'next-intl'
import {
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleX,
  GitBranch,
  LoaderCircle,
} from 'lucide-react'

import {
  checksFor,
  HEALTHY_SCORE,
  type Answers,
  type CheckStatus,
  type ScorecardResult,
} from '@/domains/scorecard/scorecard.data'
import { toneForScore, toneStyles, type Tone } from '@/domains/scorecard/tones'
import { useTimeline } from '@/domains/scorecard/useTimeline'
import { AutoContinueButton } from '@/domains/scorecard/AutoContinueButton'

interface AnalyzingPipelineProps {
  result: ScorecardResult
  answers: Answers
  onDone: () => void
}

const START_MS = 450
const JOB_MS = 1000
const LINE_MS = 250
const AUTO_CONTINUE_MS = 5000

const checkStyle: Record<CheckStatus, { mark: string; text: string }> = {
  pass: { mark: '✓', text: 'text-teal-400' },
  warn: { mark: '!', text: 'text-amber-400' },
  fail: { mark: '✗', text: 'text-rose-400' },
}

const jobIcon: Record<Tone, typeof CircleCheck> = {
  rose: CircleX,
  amber: CircleAlert,
  blue: CircleCheck,
  teal: CircleCheck,
}

type LogLine =
  | { kind: 'group'; text: string }
  | { kind: 'check'; text: string; answer: string; status: CheckStatus }
  | { kind: 'result'; text: string; tone: Tone }
  | { kind: 'leak'; text: string }
  | { kind: 'healthy'; text: string }
  | { kind: 'summary'; text: string }

interface TimedLine {
  at: number
  line: LogLine
}

const jobStart = (index: number) => START_MS + index * JOB_MS

export const AnalyzingPipeline = ({
  result,
  answers,
  onDone,
}: AnalyzingPipelineProps) => {
  const t = useTranslations('scorecard')
  const { pillarScores, biggestLeak, hasLeak } = result
  const leakName = t(`pillars.${biggestLeak.pillar.id}.name`)
  const jobsEnd = jobStart(pillarScores.length)
  const leakAt = jobsEnd + 150
  const finishedAt = leakAt + 350
  const elapsed = useTimeline(finishedAt)

  const timed: TimedLine[] = pillarScores.flatMap(
    ({ pillar, score }, index) => {
      const start = jobStart(index)
      const checks = checksFor(pillar.id, answers)
      const tone = toneForScore(score)
      return [
        {
          at: start,
          line: {
            kind: 'group',
            text: t('analyzing.run', { name: t(`pillars.${pillar.id}.name`) }),
          },
        },
        ...checks.map((check, checkIndex) => ({
          at: start + (checkIndex + 1) * LINE_MS,
          line: {
            kind: 'check' as const,
            text: t(`questions.${check.questionId}.check`),
            answer: t(
              `questions.${check.questionId}.options.${check.answerIndex}`
            ),
            status: check.status,
          },
        })),
        {
          at: start + (checks.length + 1) * LINE_MS,
          line: { kind: 'result', text: t(`analyzing.status.${tone}`), tone },
        },
      ]
    }
  )
  timed.push(
    {
      at: leakAt,
      line: hasLeak
        ? { kind: 'leak', text: t('analyzing.biggestLeak', { name: leakName }) }
        : { kind: 'healthy', text: t('analyzing.noLeaks') },
    },
    {
      at: finishedAt,
      line: {
        kind: 'summary',
        text: t('analyzing.summary', { count: pillarScores.length }),
      },
    }
  )

  const visible = timed.filter(({ at }) => elapsed >= at)
  const isFinished = elapsed >= finishedAt
  const progress = Math.min(elapsed / finishedAt, 1)
  const runningIndex = pillarScores.findIndex(
    (_, index) =>
      elapsed >= jobStart(index) && elapsed < jobStart(index) + JOB_MS
  )
  const running = pillarScores[runningIndex]
  const needsWorkCount = pillarScores.filter(
    ({ score }) => score < HEALTHY_SCORE
  ).length

  return (
    <div className="max-w-4xl mx-auto px-4 min-h-[60vh] flex flex-col justify-center">
      <h2
        tabIndex={-1}
        data-autofocus
        className="text-2xl sm:text-3xl font-bold text-white outline-none"
      >
        {t('analyzing.title')}
      </h2>
      <p className="sr-only" role="status">
        {isFinished
          ? hasLeak
            ? t('analyzing.statusDoneLeak', { name: leakName })
            : t('analyzing.statusDoneHealthy')
          : running
            ? t('analyzing.statusChecking', {
                name: t(`pillars.${running.pillar.id}.name`),
              })
            : t('analyzing.statusStarting')}
      </p>

      <div
        className="mt-8 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-800 px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3 text-sm">
            <GitBranch className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate font-mono text-gray-300">
              ai-delivery-scorecard
            </span>
            <span className="hidden rounded-md bg-gray-800 px-2 py-0.5 font-mono text-xs text-gray-400 sm:inline">
              main
            </span>
          </div>
          {isFinished && !hasLeak ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-300 motion-safe:animate-pop">
              <CircleCheck className="h-3.5 w-3.5" />
              {t('analyzing.allHealthy')}
            </span>
          ) : isFinished ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-300 motion-safe:animate-pop">
              <CircleX className="h-3.5 w-3.5" />
              {t('analyzing.railsToFix', { count: needsWorkCount })}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <LoaderCircle className="h-3.5 w-3.5 motion-safe:animate-spin" />
              {t('analyzing.inProgress')}
            </span>
          )}
        </div>
        <div className="h-0.5 bg-gray-800">
          <div
            className={`h-full origin-left ${
              isFinished
                ? hasLeak
                  ? 'bg-rose-400'
                  : 'bg-teal-400'
                : 'bg-amber-400'
            }`}
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[15.5rem_1fr]">
          <ol className="flex justify-between gap-2 border-b border-gray-800 px-5 py-4 sm:block sm:space-y-1 sm:border-b-0 sm:border-r sm:px-3">
            {pillarScores.map(({ pillar, score }, index) => {
              const start = jobStart(index)
              const isDone = elapsed >= start + JOB_MS
              const isRunning = !isDone && elapsed >= start
              const tone = toneForScore(score)
              const isLeak =
                isFinished && hasLeak && pillar.id === biggestLeak.pillar.id
              const Icon = isDone
                ? jobIcon[tone]
                : isRunning
                  ? LoaderCircle
                  : CircleDashed
              const seconds = isDone
                ? JOB_MS / 1000
                : isRunning
                  ? (elapsed - start) / 1000
                  : 0
              return (
                <li
                  key={pillar.id}
                  className={`flex items-center gap-2.5 rounded-lg transition-colors duration-300 sm:px-2 sm:py-2 ${
                    isRunning ? 'sm:bg-gray-800/70' : ''
                  } ${isLeak ? 'sm:bg-rose-500/10 sm:ring-1 sm:ring-rose-500/40' : ''}`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 sm:h-4 sm:w-4 ${
                      isDone
                        ? `${toneStyles[tone].text} motion-safe:animate-pop`
                        : isRunning
                          ? 'text-amber-300 motion-safe:animate-spin'
                          : 'text-gray-600'
                    }`}
                  />
                  <span
                    className={`hidden flex-1 truncate text-sm sm:block ${
                      isDone || isRunning ? 'text-gray-200' : 'text-gray-500'
                    }`}
                  >
                    {t(`pillars.${pillar.id}.name`)}
                  </span>
                  <span className="hidden font-mono text-xs tabular-nums text-gray-500 sm:block">
                    {isDone || isRunning ? `${seconds.toFixed(1)}s` : ''}
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="flex h-80 flex-col justify-end overflow-hidden bg-black/30 px-5 py-4 font-mono text-[13px] leading-6 [mask-image:linear-gradient(to_bottom,transparent,black_4rem)]">
            {visible.map(({ line }, index) => (
              <LogRow key={index} number={index + 1} line={line} />
            ))}
            {!isFinished && (
              <div className="flex gap-4">
                <span className="w-6 shrink-0 text-right text-gray-700 select-none">
                  {visible.length + 1}
                </span>
                <span className="h-5 w-2 translate-y-0.5 bg-gray-400 motion-safe:animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-12 justify-end">
        {isFinished && (
          <AutoContinueButton durationMs={AUTO_CONTINUE_MS} onContinue={onDone}>
            {t('analyzing.seeReport')}
          </AutoContinueButton>
        )}
      </div>
    </div>
  )
}

const LogRow = ({ number, line }: { number: number; line: LogLine }) => (
  <div className="flex gap-4 motion-safe:animate-log-in">
    <span className="w-6 shrink-0 text-right text-gray-700 select-none">
      {number}
    </span>
    <span className="min-w-0 truncate">
      {line.kind === 'group' && (
        <span className="font-semibold text-white">▸ {line.text}</span>
      )}
      {line.kind === 'check' && (
        <>
          <span className={`pl-4 ${checkStyle[line.status].text}`}>
            {checkStyle[line.status].mark} {line.text}
          </span>
          <span className="text-gray-500"> · {line.answer}</span>
        </>
      )}
      {line.kind === 'result' && (
        <span className={`pl-4 ${toneStyles[line.tone].text}`}>
          → {line.text}
        </span>
      )}
      {line.kind === 'leak' && (
        <span className="font-semibold text-rose-400">━━ {line.text}</span>
      )}
      {line.kind === 'healthy' && (
        <span className="font-semibold text-teal-300">━━ {line.text}</span>
      )}
      {line.kind === 'summary' && (
        <span className="text-gray-400">{line.text}</span>
      )}
    </span>
  </div>
)
