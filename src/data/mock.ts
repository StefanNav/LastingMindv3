import type { LegacyCreator, Phase } from '@/types'

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
