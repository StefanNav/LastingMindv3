import type { LegacyCreator, Phase, HomePhase, CategoryDetail } from '@/types'

export const mockCreator: LegacyCreator = {
  id: 'creator-1',
  name: 'Robert Mitchell',
  dateOfBirth: '1955-03-15',
  currentPhase: 'foundation',
  completedModules: [],
  treeGrowthLevel: 0,
  stories: [],
  familyMembers: [
    {
      id: 'fm-1',
      name: 'Sarah Mitchell',
      relationship: 'Wife',
    },
    {
      id: 'fm-2',
      name: 'James Mitchell',
      relationship: 'Son',
    },
    {
      id: 'fm-3',
      name: 'Emily Chen',
      relationship: 'Daughter',
    },
    {
      id: 'fm-4',
      name: 'Lily Mitchell',
      relationship: 'Granddaughter',
    },
  ],
}

export const mockHomePhases: HomePhase[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    label: 'Phase 1',
    categories: [
      { id: 'cat-family', title: 'Family', image: '/images/Family 1.png', status: 'flourishing', totalModules: 3 },
      { id: 'cat-friends', title: 'Friends', image: '/images/Freinds 1.png', status: 'budding', totalModules: 3 },
      { id: 'cat-career', title: 'Career', image: '/images/Career 1.png', status: 'growing', totalModules: 3 },
      { id: 'cat-education', title: 'Education', image: '/images/Education 1.png', status: 'growing', currentModule: 1, totalModules: 3 },
      { id: 'cat-favourites', title: 'Favourites', image: '/images/Favourites 1.png', status: 'not_started', totalModules: 3 },
      { id: 'cat-core-values', title: 'Core Values', image: '/images/Core Values 1.png', status: 'not_started', totalModules: 3 },
    ],
  },
  {
    id: 'life-story',
    title: 'Life Story',
    label: 'Phase 2',
    categories: [
      { id: 'cat-life-chapters', title: 'Life Chapters', image: '/images/Life chapters 1.png', status: 'flourishing', totalModules: 3 },
      { id: 'cat-wisdom', title: 'Wisdom', image: '/images/Wisdom 1.png', status: 'budding', totalModules: 3 },
      { id: 'cat-greatest-memories', title: 'Greatest Memories', image: '/images/Greatest Memories 1.png', status: 'growing', totalModules: 3 },
    ],
  },
  {
    id: 'your-legacy',
    title: 'Your Legacy',
    label: 'Phase 3',
    categories: [
      { id: 'cat-letters', title: 'Letters to Loved Ones', image: '/images/Letters to loved ones 1.png', status: 'flourishing', totalModules: 3 },
      { id: 'cat-voice-messages', title: 'Voice Messages', image: '/images/Voice message 1.png', status: 'budding', totalModules: 3 },
      { id: 'cat-memoir', title: 'Memoir', image: '/images/Memoir 1.png', status: 'growing', totalModules: 3 },
    ],
  },
  {
    id: 'keep-growing',
    title: 'Keep Growing',
    label: 'Phase 4',
    categories: [
      { id: 'cat-open-journaling', title: 'Open Journaling', image: '/images/Open Journaling 1.png', status: 'flourishing', totalModules: 3 },
      { id: 'cat-questions-loved-ones', title: 'Questions from Loved Ones', image: '/images/Questions from Loved ones.png', status: 'budding', totalModules: 3 },
      { id: 'cat-reflective-questions', title: 'Reflective Questions', image: '/images/Reflective Questions.png', status: 'growing', totalModules: 3 },
    ],
  },
]

export const mockPhases: Phase[] = [
  {
    id: 'foundation',
    title: 'Build Your Foundation',
    description:
      'Capture the essential facts of your life: family, friends, career, education, values, and favorites.',
    modules: [
      {
        id: 'mod-family',
        phaseId: 'foundation',
        title: 'Family & Relationships',
        description: 'Tell us about the people who matter most to you.',
        completed: false,
        prompts: [
          {
            id: 'p-1',
            moduleId: 'mod-family',
            text: 'Who were the most important people in your childhood?',
            category: 'family',
            completed: false,
          },
          {
            id: 'p-2',
            moduleId: 'mod-family',
            text: 'How did you meet your spouse or partner?',
            category: 'family',
            completed: false,
          },
        ],
      },
      {
        id: 'mod-career',
        phaseId: 'foundation',
        title: 'Career & Education',
        description: 'Share your professional journey and what you learned along the way.',
        completed: false,
        prompts: [
          {
            id: 'p-3',
            moduleId: 'mod-career',
            text: 'What was your first real job, and what did it teach you?',
            category: 'career',
            completed: false,
          },
        ],
      },
      {
        id: 'mod-values',
        phaseId: 'foundation',
        title: 'Values & Beliefs',
        description: 'What principles have guided your life?',
        completed: false,
        prompts: [
          {
            id: 'p-4',
            moduleId: 'mod-values',
            text: 'What is the most important lesson life has taught you?',
            category: 'values',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'story',
    title: 'Tell Your Story',
    description:
      'Walk through the chapters of your life in depth — sharing stories, emotions, and memories.',
    modules: [
      {
        id: 'mod-childhood',
        phaseId: 'story',
        title: 'Childhood',
        description: 'The earliest memories that shaped who you became.',
        completed: false,
        prompts: [
          {
            id: 'p-5',
            moduleId: 'mod-childhood',
            text: 'Describe the house you grew up in. What did it smell like?',
            category: 'childhood',
            completed: false,
          },
        ],
      },
      {
        id: 'mod-adulthood',
        phaseId: 'story',
        title: 'Young Adulthood',
        description: 'The years that defined your path.',
        completed: false,
        prompts: [
          {
            id: 'p-6',
            moduleId: 'mod-adulthood',
            text: 'What was the biggest risk you ever took?',
            category: 'adulthood',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'legacy',
    title: 'Leave Your Legacy',
    description:
      'Letters to loved ones, voice messages, reflections, and wisdom you want to pass on.',
    modules: [
      {
        id: 'mod-letters',
        phaseId: 'legacy',
        title: 'Letters to Loved Ones',
        description: 'Write personal messages to the people who matter most.',
        completed: false,
        prompts: [
          {
            id: 'p-7',
            moduleId: 'mod-letters',
            text: 'What do you want your grandchildren to know about you?',
            category: 'legacy',
            completed: false,
          },
        ],
      },
      {
        id: 'mod-wisdom',
        phaseId: 'legacy',
        title: 'Wisdom & Reflections',
        description: 'The things you hope will outlast you.',
        completed: false,
        prompts: [
          {
            id: 'p-8',
            moduleId: 'mod-wisdom',
            text: 'If you could give one piece of advice to the next generation, what would it be?',
            category: 'wisdom',
            completed: false,
          },
        ],
      },
    ],
  },
]

export const mockCategoryDetails: Record<string, CategoryDetail> = {
  'cat-family': {
    categoryId: 'cat-family',
    heading: 'Tell us about your family',
    subtitle: 'You\'ve completed all modules — keep adding to your family story!',
    modules: [
      { id: 'mod-fam-1', title: 'Who\'s in your family', description: 'This module lays the foundation for future exercises.', duration: '5min', completed: true, locked: false },
      { id: 'mod-fam-2', title: 'Tell us about a family member', description: 'Share a story or a memory about someone in your family.', duration: '5min', completed: true, locked: false },
    ],
    familyMembers: [
      { id: 'fm-linda', initial: 'L', name: 'Linda', entryCount: 2 },
      { id: 'fm-mom', initial: 'M', name: 'Mom', entryCount: 1 },
      { id: 'fm-dad', initial: 'D', name: 'Dad', entryCount: 0 },
      { id: 'fm-sarah', initial: 'S', name: 'Sarah', entryCount: 0 },
      { id: 'fm-robert', initial: 'R', name: 'Robert', entryCount: 0 },
      { id: 'fm-james', initial: 'J', name: 'James', entryCount: 0 },
    ],
    recentEntries: [
      { id: 'entry-1', memberInitial: 'M', memberName: 'Mom', title: 'Moms Sunday dinners', snippet: 'Every Sunday, Mom would make her famous roast chicken...', date: 'Mar 15, 2026' },
    ],
    growthActions: [
      { id: 'ga-1', label: 'Add more family members' },
      { id: 'ga-2', label: 'Reflect on what family means to you' },
      { id: 'ga-3', label: 'Record a story about a family member' },
    ],
    entriesComplete: 3,
    entriesToNextStar: 2,
  },
  'cat-friends': {
    categoryId: 'cat-friends',
    heading: 'Tell us about your friends',
    subtitle: 'Complete one more module to earn your next star!',
    modules: [
      { id: 'mod-fri-1', title: 'Who are your closest friends', description: 'Share the people who have been there through it all.', duration: '5min', completed: true, locked: false },
      { id: 'mod-fri-2', title: 'A friendship that shaped you', description: 'Tell us about a friend who changed your life.', duration: '5min', completed: false, locked: false },
    ],
    familyMembers: [
      { id: 'fr-tom', initial: 'T', name: 'Tom', entryCount: 1 },
      { id: 'fr-bill', initial: 'B', name: 'Bill', entryCount: 0 },
      { id: 'fr-nancy', initial: 'N', name: 'Nancy', entryCount: 0 },
    ],
    recentEntries: [
      { id: 'entry-2', memberInitial: 'T', memberName: 'Tom', title: 'College roommate days', snippet: 'Tom and I met on the first day of college...', date: 'Mar 12, 2026' },
    ],
    growthActions: [
      { id: 'ga-4', label: 'Add more friends' },
      { id: 'ga-5', label: 'Share a favorite memory with a friend' },
      { id: 'ga-6', label: 'Record a story about a friendship' },
    ],
    entriesComplete: 2,
    entriesToNextStar: 3,
  },
  'cat-career': {
    categoryId: 'cat-career',
    heading: 'Tell us about your career',
    subtitle: 'Complete one more module to earn your next star!',
    modules: [
      { id: 'mod-car-1', title: 'Your career journey', description: 'Walk us through the jobs and roles that defined you.', duration: '5min', completed: true, locked: false },
      { id: 'mod-car-2', title: 'Lessons from work', description: 'What did your career teach you about life?', duration: '5min', completed: false, locked: false },
    ],
    growthActions: [
      { id: 'ga-7', label: 'Share a career milestone' },
      { id: 'ga-8', label: 'Reflect on your professional growth' },
      { id: 'ga-9', label: 'Record advice for someone starting out' },
    ],
    entriesComplete: 1,
    entriesToNextStar: 4,
  },
  'cat-education': {
    categoryId: 'cat-education',
    heading: 'Tell us about your education',
    subtitle: 'Complete one more module to earn your next star!',
    modules: [
      { id: 'mod-edu-1', title: 'Your school years', description: 'Share memories from your time in school.', duration: '5min', completed: true, locked: false },
      { id: 'mod-edu-2', title: 'What education meant to you', description: 'How did learning shape who you became?', duration: '5min', completed: false, locked: false },
    ],
    growthActions: [
      { id: 'ga-10', label: 'Share a favorite teacher story' },
      { id: 'ga-11', label: 'Reflect on a lesson that stuck with you' },
      { id: 'ga-12', label: 'Record advice about education' },
    ],
    entriesComplete: 1,
    entriesToNextStar: 4,
  },
  'cat-favourites': {
    categoryId: 'cat-favourites',
    heading: 'Tell us about your favourites',
    subtitle: 'Complete both modules to earn your first star',
    modules: [
      { id: 'mod-fav-1', title: 'Your favourite things', description: 'Foods, places, songs, movies — the things you love most.', duration: '5min', completed: false, locked: false },
      { id: 'mod-fav-2', title: 'Why they matter', description: 'What makes these favourites special to you?', duration: '5min', completed: false, locked: true },
    ],
    growthActions: [
      { id: 'ga-13', label: 'Share a favourite childhood memory' },
      { id: 'ga-14', label: 'Record your all-time favourite song' },
      { id: 'ga-15', label: 'Tell us about a favourite place' },
    ],
  },
  'cat-core-values': {
    categoryId: 'cat-core-values',
    heading: 'Tell us about your core values',
    subtitle: 'Complete both modules to earn your first star',
    modules: [
      { id: 'mod-val-1', title: 'What you stand for', description: 'The principles that have guided your life.', duration: '5min', completed: false, locked: false },
      { id: 'mod-val-2', title: 'Values in action', description: 'Share a time your values were tested.', duration: '5min', completed: false, locked: true },
    ],
    growthActions: [
      { id: 'ga-16', label: 'Reflect on how your values evolved' },
      { id: 'ga-17', label: 'Share a value you want to pass on' },
      { id: 'ga-18', label: 'Record a story about standing by your beliefs' },
    ],
  },
}
