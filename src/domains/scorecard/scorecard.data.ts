export type PillarId =
  | 'measurement'
  | 'tests'
  | 'specs'
  | 'pipeline'
  | 'review'
  | 'releases'

export interface Pillar {
  id: PillarId
  href: string
}

export interface ScoredQuestion {
  id: string
  kind: 'scored'
  pillar: PillarId
  points: number[]
}

export interface ContextQuestion {
  id: 'teamSize' | 'aiShare'
  kind: 'context'
  values: number[]
}

export type Question = ScoredQuestion | ContextQuestion

export type TierId = 'overdrive' | 'cruising' | 'leaking' | 'redlining'

export interface Tier {
  id: TierId
  min: number
  tone: 'rose' | 'amber' | 'blue' | 'teal'
}

export const pillars: Pillar[] = [
  {
    id: 'measurement',
    href: 'https://dora.dev/guides/dora-metrics/',
  },
  {
    id: 'tests',
    href: 'https://homes.cs.washington.edu/~rjust/publ/mutation_testing_practices_icse_2021.pdf',
  },
  {
    id: 'specs',
    href: 'https://dora.dev/research/2025/dora-report/',
  },
  {
    id: 'pipeline',
    href: 'https://dora.dev/research/2025/dora-report/',
  },
  {
    id: 'review',
    href: 'https://www.faros.ai/research/ai-acceleration-whiplash',
  },
  {
    id: 'releases',
    href: 'https://dora.dev/ai/capabilities-model/report/',
  },
]

export const questions: Question[] = [
  { id: 'teamSize', kind: 'context', values: [4, 10, 23, 40] },
  { id: 'aiShare', kind: 'context', values: [20, 45, 70, 92] },
  {
    id: 'leadTime',
    kind: 'scored',
    pillar: 'measurement',
    points: [0, 1, 2, 3],
  },
  {
    id: 'aiImpact',
    kind: 'scored',
    pillar: 'measurement',
    points: [0, 1, 2, 3],
  },
  { id: 'greenBuild', kind: 'scored', pillar: 'tests', points: [0, 1, 2, 3] },
  { id: 'testQuality', kind: 'scored', pillar: 'tests', points: [0, 1, 2, 3] },
  { id: 'correctness', kind: 'scored', pillar: 'specs', points: [0, 1, 2, 3] },
  { id: 'agentDone', kind: 'scored', pillar: 'specs', points: [0, 1, 2, 3] },
  {
    id: 'slopFilter',
    kind: 'scored',
    pillar: 'pipeline',
    points: [0, 1, 2, 3],
  },
  {
    id: 'pipelineSpeed',
    kind: 'scored',
    pillar: 'pipeline',
    points: [0, 1, 2, 3],
  },
  { id: 'reviewWait', kind: 'scored', pillar: 'review', points: [0, 1, 2, 3] },
  { id: 'reviewOwner', kind: 'scored', pillar: 'review', points: [0, 1, 2, 3] },
  {
    id: 'releaseSlip',
    kind: 'scored',
    pillar: 'releases',
    points: [0, 1, 2, 3],
  },
  { id: 'shipTwice', kind: 'scored', pillar: 'releases', points: [0, 1, 2, 3] },
]

export const tiers: Tier[] = [
  { id: 'overdrive', min: 80, tone: 'teal' },
  { id: 'cruising', min: 60, tone: 'blue' },
  { id: 'leaking', min: 40, tone: 'amber' },
  { id: 'redlining', min: 0, tone: 'rose' },
]

export type Answers = Record<string, number>

export interface PillarScore {
  pillar: Pillar
  score: number
}

export interface ScorecardResult {
  score: number
  tier: Tier
  pillarScores: PillarScore[]
  biggestLeak: PillarScore
  hasLeak: boolean
  aiShare: number
  teamSize: number
  leakedHoursPerWeek: number
  leakedEurosPerMonth: number
}

export const HEALTHY_SCORE = 80
const HOURS_LOST_PER_ENGINEER_AT_ZERO = 6
const HOURLY_COST_EUR = 75
const WEEKS_PER_MONTH = 4.33

const scoredQuestions = questions.filter(
  (question): question is ScoredQuestion => question.kind === 'scored'
)

export const scoreAnswers = (answers: Answers): ScorecardResult => {
  const pillarScores = pillars.map(pillar => {
    const pillarQuestions = scoredQuestions.filter(
      question => question.pillar === pillar.id
    )
    const earned = pillarQuestions.reduce(
      (sum, question) => sum + (answers[question.id] ?? 0),
      0
    )
    const max = pillarQuestions.length * 3
    return { pillar, score: Math.round((earned / max) * 100) }
  })

  const score = Math.round(
    pillarScores.reduce((sum, { score }) => sum + score, 0) /
      pillarScores.length
  )
  const tier = tiers.find(({ min }) => score >= min)!
  const biggestLeak = pillarScores.reduce((lowest, current) =>
    current.score < lowest.score ? current : lowest
  )
  const teamSize = answers['teamSize'] ?? 10
  const leakedHoursPerWeek = Math.round(
    teamSize * HOURS_LOST_PER_ENGINEER_AT_ZERO * ((100 - score) / 100)
  )

  return {
    score,
    tier,
    pillarScores,
    biggestLeak,
    hasLeak: biggestLeak.score < HEALTHY_SCORE,
    aiShare: answers['aiShare'] ?? 50,
    teamSize,
    leakedHoursPerWeek,
    leakedEurosPerMonth:
      Math.round(
        (leakedHoursPerWeek * HOURLY_COST_EUR * WEEKS_PER_MONTH) / 100
      ) * 100,
  }
}

export const sampleAnswers: Answers = {
  teamSize: 10,
  aiShare: 70,
  leadTime: 2,
  aiImpact: 1,
  greenBuild: 2,
  testQuality: 0,
  correctness: 1,
  agentDone: 1,
  slopFilter: 2,
  pipelineSpeed: 2,
  reviewWait: 1,
  reviewOwner: 0,
  releaseSlip: 1,
  shipTwice: 2,
}

export type CheckStatus = 'pass' | 'warn' | 'fail'

export interface PillarCheck {
  questionId: string
  answerIndex: number
  status: CheckStatus
}

const statusForPoints = (points: number): CheckStatus =>
  points >= 3 ? 'pass' : points === 2 ? 'warn' : 'fail'

export const checksFor = (
  pillarId: PillarId,
  answers: Answers
): PillarCheck[] =>
  scoredQuestions
    .filter(question => question.pillar === pillarId)
    .map(question => {
      const points = answers[question.id]!
      return {
        questionId: question.id,
        answerIndex: question.points.indexOf(points),
        status: statusForPoints(points),
      }
    })
