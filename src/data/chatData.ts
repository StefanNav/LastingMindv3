// ── Chat with Your LastingMind — prototype data ─────────────────────────────

// ── Tutorial script (uses Foundation family data from demo state-3+) ─────────

export const TUTORIAL_FAMILY_MEMBER = 'Linda'
export const TUTORIAL_FAMILY_RELATIONSHIP = 'your wife'

export const tutorialMessages = {
  exchange1: {
    lmQuestion: `I've been learning about the people who matter most to you. Can I tell you what I remember about ${TUTORIAL_FAMILY_MEMBER}?`,
    suggestionChip: 'Yes, tell me',
    lmResponse: `${TUTORIAL_FAMILY_MEMBER} is ${TUTORIAL_FAMILY_RELATIONSHIP}. You said she's the one who holds everything together — the person your whole family orbits around. You called her your best decision.`,
    lmAnnotation: '✓ Recalled from what you shared in your Family stories.',
  },
  exchange2: {
    lmFollowUp: 'But here\'s something I wish I knew — how did the two of you actually meet? I\'d love to hear that story.',
    lmAnnotation: 'When I don\'t know something, I\'ll ask. Every answer you give makes me a little more complete.',
  },
  freeFormPlaceholder: `Tell me how you and Linda met…`,
}

// ── Suggested questions (rotated per session) ────────────────────────────────

export const suggestedQuestionSets: string[][] = [
  [
    'What do you know about my family?',
    'What values guide my life?',
    'What shaped my career?',
  ],
  [
    'Who are the friends I told you about?',
    'What are my favorite things?',
    'What do you know about my education?',
  ],
  [
    'What have I told you so far?',
    'What don\'t you know about me yet?',
    'Tell me something I shared about my childhood',
  ],
]

// ── Pre-scripted response map ────────────────────────────────────────────────

interface ScriptedResponse {
  content: string
  sourceEntry?: string
}

const familyResponses: ScriptedResponse[] = [
  {
    content: 'Linda is at the center of your world — your wife, your anchor. You also told me about your parents, your sister Sarah, and your brothers Robert and James. One thing that stayed with me: you said your Mom\'s Sunday dinners weren\'t about the food — they were the one time the whole family just stopped and was together.',
    sourceEntry: 'From your Family stories',
  },
  {
    content: 'You\'ve told me about six family members so far, but Linda comes up the most. You described her as the person who keeps everyone connected — birthdays, holidays, the phone calls nobody else would remember to make.',
    sourceEntry: 'From your Family stories',
  },
]

const friendsResponses: ScriptedResponse[] = [
  {
    content: 'You told me about three close friends — Tom, Bill, and Nancy. Tom goes all the way back to college. You said he\'s the kind of friend who shows up without being asked — the one you\'d call at 2 a.m. and he wouldn\'t even ask why.',
    sourceEntry: 'From your Friends stories',
  },
]

const careerResponses: ScriptedResponse[] = [
  {
    content: 'Your career started with a job you took just to pay the bills, but you said it ended up teaching you more than any classroom. The thread through it all was persistence — you told me that every setback just made you more stubborn about getting it right.',
    sourceEntry: 'From your Career stories',
  },
]

const educationResponses: ScriptedResponse[] = [
  {
    content: 'You told me about a teacher — Mrs. Hargrove, I think — who saw something in you that you didn\'t see in yourself yet. You said she was the first person to tell you that your voice mattered. That stuck with you.',
    sourceEntry: 'From your Education stories',
  },
]

const favoritesResponses: ScriptedResponse[] = [
  {
    content: 'The lake house. That\'s the place that keeps coming back in what you\'ve shared. You said it\'s where summers felt endless — the pine trees, the dock, your kids running around barefoot. You said you can still hear the screen door.',
    sourceEntry: 'From your Favorites',
  },
]

const coreValuesResponses: ScriptedResponse[] = [
  {
    content: 'Honesty, perseverance, and family — those are the values you named. But you also said something that stuck with me: that you learned them not from lectures, but from watching your parents hold things together during hard years without ever letting anyone see them worry.',
    sourceEntry: 'From your Core Values',
  },
]

const generalResponses: ScriptedResponse[] = [
  {
    content: 'So far, I know about the people you love, the work that shaped you, the places that feel like home, and the values you live by. There\'s a lot here — and a lot I still don\'t know. Ask me about anything specific, or tell me something new.',
  },
]

// ── Gap response ─────────────────────────────────────────────────────────────

export const GAP_RESPONSE: ScriptedResponse = {
  content: 'That\'s a part of your story I don\'t have yet. I\'d love to hear it — anything you share, I\'ll hold onto.',
}

// ── Keyword matcher ──────────────────────────────────────────────────────────

const keywordMap: { keywords: string[]; responses: ScriptedResponse[] }[] = [
  { keywords: ['family', 'wife', 'linda', 'mom', 'dad', 'sarah', 'robert', 'james', 'parent', 'mother', 'father', 'sister', 'brother', 'son', 'daughter', 'husband'], responses: familyResponses },
  { keywords: ['friend', 'tom', 'bill', 'nancy', 'friendship', 'buddy', 'pal'], responses: friendsResponses },
  { keywords: ['career', 'job', 'work', 'profession', 'boss', 'office', 'company', 'business'], responses: careerResponses },
  { keywords: ['education', 'school', 'college', 'university', 'teacher', 'learning', 'degree', 'student'], responses: educationResponses },
  { keywords: ['favorite', 'favourite', 'love', 'song', 'movie', 'food', 'place', 'book', 'music'], responses: favoritesResponses },
  { keywords: ['value', 'values', 'principle', 'belief', 'honesty', 'integrity', 'faith', 'moral'], responses: coreValuesResponses },
  { keywords: ['know', 'shared', 'learned', 'everything', 'tell me about', 'what do you'], responses: generalResponses },
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
