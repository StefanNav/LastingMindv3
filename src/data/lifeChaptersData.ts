import type { SuggestedChapter, LifeChapter } from '@/types'

export const SUGGESTED_CHAPTERS: SuggestedChapter[] = [
  {
    defaultTitle: 'Early Years',
    dateRangePrompt: 'e.g. 1950 – 1968',
    description: 'Childhood, family, where you grew up',
  },
  {
    defaultTitle: 'Coming of Age',
    dateRangePrompt: 'e.g. 1968 – 1974',
    description: 'School, identity, early independence',
  },
  {
    defaultTitle: 'Young Adult',
    dateRangePrompt: 'e.g. 1974 – 1982',
    description: 'Career beginnings, relationships, finding your path',
  },
  {
    defaultTitle: 'Building a Life',
    dateRangePrompt: 'e.g. 1982 – 1995',
    description: 'Family, home, career growth',
  },
  {
    defaultTitle: 'Middle Years',
    dateRangePrompt: 'e.g. 1995 – 2010',
    description: 'Deeper roots, milestones, changes',
  },
  {
    defaultTitle: 'Recent Years',
    dateRangePrompt: 'e.g. 2010 – Present',
    description: 'Where life has brought you',
  },
]

let chapterIdCounter = 0

export function createChapterFromSuggestion(suggestion: SuggestedChapter): LifeChapter {
  chapterIdCounter += 1
  return {
    id: `chapter-${chapterIdCounter}-${Date.now()}`,
    title: suggestion.defaultTitle,
    startYear: null,
    endYear: null,
    step1Status: 'not_started',
    step2Status: 'not_started',
    starsEarned: 0,
  }
}

export function createBlankChapter(): LifeChapter {
  chapterIdCounter += 1
  return {
    id: `chapter-${chapterIdCounter}-${Date.now()}`,
    title: '',
    startYear: null,
    endYear: null,
    step1Status: 'not_started',
    step2Status: 'not_started',
    starsEarned: 0,
  }
}

export function buildInitialChapters(): LifeChapter[] {
  return SUGGESTED_CHAPTERS.map(createChapterFromSuggestion)
}
