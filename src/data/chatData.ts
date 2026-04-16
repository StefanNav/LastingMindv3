// ── Chat with Your LastingMind — prototype data ─────────────────────────────

// ── Tutorial script (uses Foundation family data from demo state-3+) ─────────

export const TUTORIAL_FAMILY_MEMBER = 'Linda'
export const TUTORIAL_FAMILY_RELATIONSHIP = 'your wife'

export const tutorialMessages = {
  exchange1: {
    lmQuestion: `I've been learning about the people who matter most to you. Can I tell you what I remember about ${TUTORIAL_FAMILY_MEMBER}?`,
    suggestionChip: 'Yes, tell me',
    lmResponse: `${TUTORIAL_FAMILY_MEMBER} is my wife. She's the one who holds everything together — the person my whole family orbits around. I called her my best decision.`,
    lmAnnotation: '✓ Recalled from what you shared in your Family stories.',
  },
  exchange2: {
    lmFollowUp: 'But here\'s something I wish I knew — how did the two of us actually meet? I\'d love to tell that story.',
    lmAnnotation: 'When I don\'t know something, I\'ll ask. Every answer you give makes me a little more complete.',
  },
  freeFormPlaceholder: `Tell me how you and Linda met…`,
}

// ── Suggested questions (rotated per session) ────────────────────────────────

export const suggestedQuestionSets: string[][] = [
  [
    'Tell me about your family.',
    'What values guide your life?',
    'What shaped your career?',
  ],
  [
    'Who are your closest friends?',
    'What are your favorite things?',
    'Tell me about your education.',
  ],
  [
    'What have you shared so far?',
    'What don\'t you know about yourself yet?',
    'Tell me something about your childhood.',
  ],
]

// ── Pre-scripted response map ────────────────────────────────────────────────

interface ScriptedResponse {
  content: string
  sourceEntry?: string
  excerpts?: { source: string; text: string }[]
  isGap?: boolean
}

const familyExcerpts = [
  { source: 'Family — Who\'s in your family', text: 'Linda is my wife. She\'s the one who holds everything together. I always say she\'s the best decision I ever made.' },
  { source: 'Family — Tell a story about someone', text: 'Mom\'s Sunday dinners — it wasn\'t about the food. It was the one time we all just stopped and were together.' },
]

const familyResponses: ScriptedResponse[] = [
  {
    content: 'Linda is at the center of my world — my wife, my anchor. I also have my parents, my sister Sarah, and my brothers Robert and James. One thing I always come back to: Mom\'s Sunday dinners weren\'t about the food — they were the one time the whole family just stopped and was together.',
    sourceEntry: 'Explain answer ›',
    excerpts: familyExcerpts,
  },
  {
    content: 'I\'ve got six family members I\'ve talked about so far, but Linda comes up the most. She\'s the person who keeps everyone connected — birthdays, holidays, the phone calls nobody else would remember to make.',
    sourceEntry: 'Explain answer ›',
    excerpts: familyExcerpts,
  },
]

const friendsResponses: ScriptedResponse[] = [
  {
    content: 'I\'ve got three close friends — Tom, Bill, and Nancy. Tom goes all the way back to college. He\'s the kind of friend who shows up without being asked — the one I\'d call at 2 a.m. and he wouldn\'t even ask why.',
    sourceEntry: 'Explain answer ›',
    excerpts: [{ source: 'Friends — Your circle', text: 'Tom goes way back to college. He\'s the kind of friend who just shows up. I could call him at 2 a.m. and he wouldn\'t ask why.' }],
  },
]

const careerResponses: ScriptedResponse[] = [
  {
    content: 'My career started with a job I took just to pay the bills, but it ended up teaching me more than any classroom. The thread through it all was persistence — every setback just made me more stubborn about getting it right.',
    sourceEntry: 'Explain answer ›',
    excerpts: [{ source: 'Career — Career journey', text: 'I took my first job just to pay the bills. Didn\'t expect it to teach me more than school ever did.' }],
  },
]

const educationResponses: ScriptedResponse[] = [
  {
    content: 'There was a teacher — Mrs. Hargrove — who saw something in me that I didn\'t see in myself yet. She was the first person to tell me that my voice mattered. That stuck with me.',
    sourceEntry: 'Explain answer ›',
    excerpts: [{ source: 'Education — Where you learned', text: 'Mrs. Hargrove saw something in me before I saw it myself. She told me my voice mattered. I never forgot that.' }],
  },
]

const favoritesResponses: ScriptedResponse[] = [
  {
    content: 'The lake house. That\'s the place that keeps coming back. It\'s where summers felt endless — the pine trees, the dock, my kids running around barefoot. I can still hear the screen door.',
    sourceEntry: 'Explain answer ›',
    excerpts: [{ source: 'Favorites — Expand on your favorites', text: 'The lake house is where summers felt endless. Pine trees, the dock, kids barefoot. I can still hear that screen door.' }],
  },
]

const coreValuesResponses: ScriptedResponse[] = [
  {
    content: 'Honesty, perseverance, and family — those are the values I live by. I learned them not from lectures, but from watching my parents hold things together during hard years without ever letting anyone see them worry.',
    sourceEntry: 'Explain answer ›',
    excerpts: [{ source: 'Core Values — Expand on your values', text: 'I learned my values watching my parents. They held everything together during hard years and never let anyone see them worry.' }],
  },
]

const generalResponses: ScriptedResponse[] = [
  {
    content: 'So far, I\'ve shared about the people I love, the work that shaped me, the places that feel like home, and the values I live by. There\'s a lot here — and a lot I still haven\'t told you. Ask me about anything specific, or tell me something new.',
  },
]

// ── Gap response ─────────────────────────────────────────────────────────────

export const GAP_RESPONSE: ScriptedResponse = {
  content: 'That\'s a part of my story I haven\'t shared yet. I\'d love to tell it — ask me again once I\'ve had a chance to fill that in.',
  isGap: true,
}

// ── Default conversation starters (Change 7) ────────────────────────────────

export const defaultConversationStarters: string[] = [
  'What excites and concerns you about the world today?',
  'What was the hardest decision you ever made?',
  'How did your upbringing shape who you are?',
]

// ── Keyword matcher ──────────────────────────────────────────────────────────

const keywordMap: { keywords: string[]; responses: ScriptedResponse[] }[] = [
  { keywords: ['family', 'wife', 'linda', 'mom', 'dad', 'sarah', 'robert', 'james', 'parent', 'mother', 'father', 'sister', 'brother', 'son', 'daughter', 'husband'], responses: familyResponses },
  { keywords: ['friend', 'tom', 'bill', 'nancy', 'friendship', 'buddy', 'pal'], responses: friendsResponses },
  { keywords: ['career', 'job', 'work', 'profession', 'boss', 'office', 'company', 'business'], responses: careerResponses },
  { keywords: ['education', 'school', 'college', 'university', 'teacher', 'learning', 'degree', 'student'], responses: educationResponses },
  { keywords: ['favorite', 'favourite', 'love', 'song', 'movie', 'food', 'place', 'book', 'music'], responses: favoritesResponses },
  { keywords: ['value', 'values', 'principle', 'belief', 'honesty', 'integrity', 'faith', 'moral'], responses: coreValuesResponses },
  { keywords: ['know', 'shared', 'learned', 'everything', 'tell me about', 'what do you'], responses: generalResponses },
  { keywords: ['excite', 'concern', 'world today', 'hardest decision', 'upbringing', 'shape who you are'], responses: coreValuesResponses },
]

export function getScriptedResponse(userMessage: string): ScriptedResponse {
  const lower = userMessage.toLowerCase()
  for (const entry of keywordMap) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        return entry.responses[Math.floor(Math.random() * entry.responses.length)]
      }
    }
  }
  return GAP_RESPONSE
}
