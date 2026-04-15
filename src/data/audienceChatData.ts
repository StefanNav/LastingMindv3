// ── Audience Chat — mock data for chatting with a Legacy Creator's LastingMind ──

// ── Conversation starters shown before any messages ─────────────────────────

export const audienceConversationStarters: string[] = [
  'What was your favorite family memory?',
  'Tell me about your career.',
  'What advice would you give me?',
]

// ── Suggested question sets (rotated after each exchange) ───────────────────

export const audienceSuggestedQuestionSets: string[][] = [
  [
    'What was the happiest day of your life?',
    'Tell me something I don\'t know about you.',
    'What do you wish you\'d done differently?',
  ],
  [
    'Who influenced you the most?',
    'What\'s a story you always loved telling?',
    'What values did you try to live by?',
  ],
  [
    'What was your childhood like?',
    'What are you most proud of?',
    'Is there anything you never got to say?',
  ],
]

// ── Pre-scripted responses (Robert Mitchell persona) ────────────────────────

interface AudienceScriptedResponse {
  content: string
  sourceEntry?: string
  excerpts?: { source: string; text: string }[]
}

const familyResponses: AudienceScriptedResponse[] = [
  {
    content: 'My favorite family memory? That\'s easy — Sunday dinners at my mom\'s house. The whole family would pile in, kids running around, my dad telling the same stories we\'d heard a hundred times. It wasn\'t about the food. It was the one time we all just stopped and were together.',
    sourceEntry: 'From Robert\'s family stories',
    excerpts: [{ source: 'From Robert\'s family stories', text: 'Mom\'s Sunday dinners — it wasn\'t about the food. It was the one time we all just stopped and were together.' }],
  },
]

const careerResponses: AudienceScriptedResponse[] = [
  {
    content: 'I spent most of my career in aerospace engineering. Started as a junior engineer fresh out of school, not knowing much of anything. But I loved the work — the precision, the problem-solving, the feeling that what we built actually mattered. I ended up leading a team that worked on guidance systems. The proudest moment was seeing our work fly for the first time.',
    sourceEntry: 'From Robert\'s career stories',
    excerpts: [{ source: 'From Robert\'s career stories', text: 'I started as a junior engineer and worked my way up. The proudest moment was seeing our guidance system fly for the first time.' }],
  },
]

const adviceResponses: AudienceScriptedResponse[] = [
  {
    content: 'The best advice I can give? Don\'t wait for the perfect moment — it doesn\'t exist. I spent too many years thinking I\'d get around to things later. Write the letter, make the call, take the trip. The people you love need to hear it from you while you\'re here to say it.',
    sourceEntry: 'From Robert\'s wisdom & values',
    excerpts: [{ source: 'From Robert\'s values and wisdom', text: 'Don\'t wait for the perfect moment. Write the letter, make the call, take the trip.' }],
  },
]

const childhoodResponses: AudienceScriptedResponse[] = [
  {
    content: 'I grew up in a small town where everybody knew everybody. We didn\'t have much, but we didn\'t know that. Summer was catching fireflies, winter was building forts. My dad worked long hours at the plant, but he always made it home for dinner. That mattered more than I realized at the time.',
    sourceEntry: 'From Robert\'s life chapters',
  },
]

const generalResponses: AudienceScriptedResponse[] = [
  {
    content: 'That\'s something I haven\'t shared in detail yet, but I can tell you what I do know. My life has been full — full of people I love, work I believed in, and a few hard lessons I\'m grateful for. Ask me about anything specific and I\'ll do my best.',
  },
]

const gapResponse: AudienceScriptedResponse = {
  content: 'That\'s a part of my story I haven\'t had the chance to share yet. I wish I could tell you more — maybe one day that piece will be filled in.',
}

// ── Keyword matcher ─────────────────────────────────────────────────────────

const keywordMap: { keywords: string[]; responses: AudienceScriptedResponse[] }[] = [
  { keywords: ['family', 'mom', 'dad', 'sunday', 'dinner', 'parent', 'mother', 'father', 'sister', 'brother'], responses: familyResponses },
  { keywords: ['career', 'job', 'work', 'engineer', 'aerospace', 'profession'], responses: careerResponses },
  { keywords: ['advice', 'wisdom', 'lesson', 'recommend', 'suggest', 'should i', 'guide'], responses: adviceResponses },
  { keywords: ['childhood', 'grew up', 'kid', 'young', 'small town', 'upbringing'], responses: childhoodResponses },
  { keywords: ['happiest', 'proud', 'influence', 'value', 'story', 'love', 'favorite', 'favourite', 'memory'], responses: familyResponses },
  { keywords: ['know', 'tell me', 'what do you', 'anything', 'everything'], responses: generalResponses },
]

export function getAudienceScriptedResponse(userMessage: string): AudienceScriptedResponse {
  const lower = userMessage.toLowerCase()
  for (const entry of keywordMap) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        return entry.responses[Math.floor(Math.random() * entry.responses.length)]
      }
    }
  }
  return gapResponse
}
