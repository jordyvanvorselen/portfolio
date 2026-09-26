export type PillarId =
  | 'measurement'
  | 'tests'
  | 'specs'
  | 'pipeline'
  | 'review'
  | 'releases'

export interface Pillar {
  id: PillarId
  name: string
  tagline: string
  leak: string
  fix: string
}

export interface AnswerOption {
  label: string
  points: number
}

export interface ScoredQuestion {
  id: string
  kind: 'scored'
  pillar: PillarId
  text: string
  why: string
  options: AnswerOption[]
}

export interface ContextQuestion {
  id: 'teamSize' | 'aiShare'
  kind: 'context'
  text: string
  why: string
  options: { label: string; value: number }[]
}

export type Question = ScoredQuestion | ContextQuestion

export interface Tier {
  name: string
  min: number
  headline: string
  summary: string
  tone: 'brand' | 'warning'
}

export const pillars: Pillar[] = [
  {
    id: 'measurement',
    name: 'Speedometer',
    tagline: 'You measure lead time and stability, not vibes.',
    leak: 'You can’t see whether AI helps or hurts, so every decision runs on gut feeling.',
    fix: 'Pull lead time, escaped defects and rework out of your Git and CI history. Set a baseline this week.',
  },
  {
    id: 'tests',
    name: 'Test signal',
    tagline: 'A green build means shippable.',
    leak: 'AI-written tests raise coverage but catch little. Nobody trusts a green build.',
    fix: 'Mutation-test your critical paths. Delete tautological tests. Gate merges on mutation score.',
  },
  {
    id: 'specs',
    name: 'Definition of correct',
    tagline: 'Agents know when a feature is done.',
    leak: 'Correct behaviour lives in people’s heads. Agents guess, reviewers argue.',
    fix: 'Write executable specs for your critical flows before the agent writes code.',
  },
  {
    id: 'pipeline',
    name: 'Pipeline gates',
    tagline: 'CI blocks slop before a human sees it.',
    leak: 'Humans are the only filter. Your seniors spend their day catching what a pipeline should.',
    fix: 'Gate every PR on tests, specs and architecture rules. Get the main pipeline under 10 minutes.',
  },
  {
    id: 'review',
    name: 'Review flow',
    tagline: 'PRs merge the same day.',
    leak: 'Reviewing a PR takes longer than generating it did. The queue is the new bottleneck.',
    fix: 'Let the pipeline check correctness so review can focus on intent. Pair on the risky parts.',
  },
  {
    id: 'releases',
    name: 'Release rhythm',
    tagline: 'Releases are boring and on time.',
    leak: 'Releases slip, then break on rollout. Features ship twice: once to demo, once to work.',
    fix: 'Ship smaller batches behind flags. Make every merge releasable and release on a fixed rhythm.',
  },
]

export const questions: Question[] = [
  {
    id: 'teamSize',
    kind: 'context',
    text: 'How many engineers ship code in your product team?',
    why: 'We use this to estimate what the leaks cost you.',
    options: [
      { label: '1–5 engineers', value: 4 },
      { label: '6–15 engineers', value: 10 },
      { label: '16–30 engineers', value: 23 },
      { label: 'More than 30', value: 40 },
    ],
  },
  {
    id: 'aiShare',
    kind: 'context',
    text: 'Roughly how much of your new code do AI agents write?',
    why: 'This is your engine speed. The scorecard compares it to your road speed.',
    options: [
      { label: 'Less than 25%', value: 20 },
      { label: '25–50%', value: 45 },
      { label: '50–75%', value: 70 },
      { label: 'More than 75%', value: 92 },
    ],
  },
  {
    id: 'leadTime',
    kind: 'scored',
    pillar: 'measurement',
    text: 'Could you tell me your median lead time from commit to production for last month, right now?',
    why: 'Lead time is the speedometer. Without it, "faster" is a feeling.',
    options: [
      { label: 'No idea', points: 0 },
      { label: 'I have a gut feeling', points: 1 },
      { label: 'We could dig it up from Git and CI', points: 2 },
      { label: 'Yes, it’s on a dashboard we check', points: 3 },
    ],
  },
  {
    id: 'aiImpact',
    kind: 'scored',
    pillar: 'measurement',
    text: 'How do you know whether AI is making your team faster?',
    why: 'More PRs is engine speed. Shipped, stable features is road speed.',
    options: [
      { label: 'We feel faster', points: 0 },
      { label: 'PR and commit counts went up', points: 1 },
      { label: 'We compare cycle time before and after', points: 2 },
      { label: 'We track speed and stability against a baseline', points: 3 },
    ],
  },
  {
    id: 'greenBuild',
    kind: 'scored',
    pillar: 'tests',
    text: 'When CI goes green, would you bet your weekend on the release?',
    why: 'A test suite is only worth the confidence it gives you.',
    options: [
      { label: 'No, green means little', points: 0 },
      { label: 'For some parts of the app', points: 1 },
      { label: 'Mostly, after a manual check', points: 2 },
      { label: 'Yes, green means shippable', points: 3 },
    ],
  },
  {
    id: 'testQuality',
    kind: 'scored',
    pillar: 'tests',
    text: 'Who checks that AI-written tests actually catch bugs?',
    why: 'Agents are great at writing tests that pass. That’s not the same as tests that protect.',
    options: [
      { label: 'Nobody, coverage looks fine', points: 0 },
      { label: 'Reviewers glance at them', points: 1 },
      { label: 'We sometimes break code to see tests fail', points: 2 },
      { label: 'Mutation testing runs on critical paths', points: 3 },
    ],
  },
  {
    id: 'correctness',
    kind: 'scored',
    pillar: 'specs',
    text: 'Where does "correct behaviour" for a feature live?',
    why: 'If correct isn’t written down in a form a machine can check, every review is an opinion.',
    options: [
      { label: 'In people’s heads', points: 0 },
      { label: 'In tickets and docs', points: 1 },
      { label: 'Partly in acceptance tests', points: 2 },
      { label: 'In executable specs that run on every PR', points: 3 },
    ],
  },
  {
    id: 'agentDone',
    kind: 'scored',
    pillar: 'specs',
    text: 'When an agent builds a feature, how does it know it’s done?',
    why: 'Agents stop when they think they’re done. Specs decide when they are.',
    options: [
      { label: 'When it says it’s done', points: 0 },
      { label: 'When the reviewer is happy', points: 1 },
      { label: 'When the unit tests pass', points: 2 },
      { label: 'When specs written up front pass', points: 3 },
    ],
  },
  {
    id: 'slopFilter',
    kind: 'scored',
    pillar: 'pipeline',
    text: 'What stops a sloppy AI-generated PR before a human sees it?',
    why: 'Every problem the pipeline catches is one your seniors don’t have to.',
    options: [
      { label: 'Nothing, humans are the filter', points: 0 },
      { label: 'Linting and formatting', points: 1 },
      { label: 'Linting, types and tests', points: 2 },
      {
        label: 'Tests, specs, mutation score and architecture rules',
        points: 3,
      },
    ],
  },
  {
    id: 'pipelineSpeed',
    kind: 'scored',
    pillar: 'pipeline',
    text: 'How long does your main pipeline take?',
    why: 'A slow pipeline turns every AI speed-up into waiting time.',
    options: [
      { label: 'Over 45 minutes, or flaky', points: 0 },
      { label: '20–45 minutes', points: 1 },
      { label: '10–20 minutes', points: 2 },
      { label: 'Under 10 minutes, reliably', points: 3 },
    ],
  },
  {
    id: 'reviewWait',
    kind: 'scored',
    pillar: 'review',
    text: 'How long does a typical PR wait for review?',
    why: 'Faros AI measured PR review time up 441% on teams with high AI adoption.',
    options: [
      { label: 'Days', points: 0 },
      { label: 'About a day', points: 1 },
      { label: 'A few hours', points: 2 },
      { label: 'Under an hour, or we pair', points: 3 },
    ],
  },
  {
    id: 'reviewOwner',
    kind: 'scored',
    pillar: 'review',
    text: 'Who actually reads the code that ships?',
    why: 'When one person reads everything, that person is your throughput.',
    options: [
      { label: 'Mostly me, I’m the bottleneck', points: 0 },
      { label: 'One or two seniors', points: 1 },
      { label: 'The whole team, unevenly', points: 2 },
      { label: 'Everyone, and reviews focus on intent', points: 3 },
    ],
  },
  {
    id: 'releaseSlip',
    kind: 'scored',
    pillar: 'releases',
    text: 'How often do planned releases slip?',
    why: 'Releases that slip are the clearest sign that speed is leaking somewhere.',
    options: [
      { label: 'Almost always', points: 0 },
      { label: 'Often', points: 1 },
      { label: 'Sometimes', points: 2 },
      { label: 'Rarely, releases are boring', points: 3 },
    ],
  },
  {
    id: 'shipTwice',
    kind: 'scored',
    pillar: 'releases',
    text: 'How often does a new feature need a fix in its first week?',
    why: 'A feature that ships twice cost you twice.',
    options: [
      { label: 'Almost every feature', points: 0 },
      { label: 'About half of them', points: 1 },
      { label: 'Now and then', points: 2 },
      { label: 'Rarely', points: 3 },
    ],
  },
]

export const tiers: Tier[] = [
  {
    name: 'Overdrive',
    min: 80,
    headline: 'You get the speed AI promised.',
    summary:
      'Your rails turn faster agents into faster, stable releases. Few teams get here. Guard it as the team grows.',
    tone: 'brand',
  },
  {
    name: 'Cruising',
    min: 60,
    headline: 'Fast, with speed left on the table.',
    summary:
      'Most of your AI speed reaches production. One or two weak rails still hold back the rest, every sprint.',
    tone: 'brand',
  },
  {
    name: 'Leaking',
    min: 40,
    headline: 'You’re faster. You could be much faster.',
    summary:
      'AI sped you up, but a big part of the gain leaks into review queues, rework and firefighting before it reaches users.',
    tone: 'warning',
  },
  {
    name: 'Redlining',
    min: 0,
    headline: 'You get a fraction of AI’s speed.',
    summary:
      'Your team produces more code than ever. Review queues, rework and slipped releases eat most of the gain before it reaches users.',
    tone: 'warning',
  },
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
  aiShare: number
  teamSize: number
  leakedHoursPerWeek: number
  leakedEurosPerMonth: number
}

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
  const tier = tiers.find(({ min }) => score >= min) ?? tiers[tiers.length - 1]!
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
