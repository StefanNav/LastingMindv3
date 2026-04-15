import type { CircleCaptureConfig, CapturedPerson } from '@/types'

// ── Group definitions ────────────────────────────────────────────────────────

export const circleCaptureConfigs: Record<string, CircleCaptureConfig> = {
  'cat-family': {
    categoryId: 'cat-family',
    categoryLabel: 'Family',
    contextLine:
      'This helps your LastingMind tell your family\u2019s story and preserve memories about the people who matter most.',
    groupSelectionPrompt:
      'Which of these relationships do you have in your life? Select all that apply.',
    confirmationCTALabel: 'Save my family',
    groups: [
      {
        id: 'grp-spouse',
        label: 'Spouse or partner',
        defaultRelationship: 'Spouse',
        prompt:
          'What is your spouse or partner\u2019s name? First and last name is ideal.',
        followUpPrompts: [
          {
            template: 'And is [Name] your husband, wife, or partner?',
            field: 'relationship',
            options: ['Husband', 'Wife', 'Partner'],
            mockAnswer: 'Wife',
          },
        ],
      },
      {
        id: 'grp-children',
        label: 'Children',
        defaultRelationship: 'Child',
        prompt:
          'What are your children\u2019s names? First and last names are ideal \u2014 list them all at once.',
        followUpPrompts: [
          {
            template: 'Is [Name] your son or daughter?',
            field: 'relationship',
            options: ['Son', 'Daughter'],
            mockAnswer: 'Daughter',
          },
        ],
      },
      {
        id: 'grp-parents',
        label: 'Parents',
        defaultRelationship: 'Parent',
        prompt:
          'What are your parents\u2019 names? First and last names are ideal.',
        followUpPrompts: [
          {
            template: 'Is [Name] your mother or your father?',
            field: 'relationship',
            options: ['Mother', 'Father'],
            mockAnswer: 'Father',
          },
        ],
      },
      {
        id: 'grp-siblings',
        label: 'Siblings',
        defaultRelationship: 'Sibling',
        prompt:
          'What are your siblings\u2019 names? First and last names are ideal.',
        followUpPrompts: [
          {
            template: 'Is [Name] your brother or sister?',
            field: 'relationship',
            options: ['Brother', 'Sister'],
            mockAnswer: 'Brother',
          },
          {
            template: 'Is [Name] older or younger than you?',
            field: 'context',
            options: ['Older', 'Younger'],
            mockAnswer: 'Older',
          },
        ],
      },
      {
        id: 'grp-extended',
        label: 'Extended family (aunts, uncles, cousins, etc.)',
        defaultRelationship: '',
        prompt:
          'Who are some important people in your extended family? First and last names are ideal.',
        followUpPrompts: [
          {
            template:
              'What is your relationship to [Name] \u2014 aunt, uncle, cousin?',
            field: 'relationship',
            options: ['Aunt', 'Uncle', 'Cousin'],
            mockAnswer: 'Uncle',
          },
          {
            template:
              'Is [Name] on your mother\u2019s side or your father\u2019s side?',
            field: 'side',
            options: ["Mother's side", "Father's side"],
            mockAnswer: "Father's side",
          },
        ],
      },
    ],
  },

  'cat-friends': {
    categoryId: 'cat-friends',
    categoryLabel: 'Friends',
    contextLine:
      'This helps your LastingMind share your story and the friends who\u2019ve shaped your life.',
    groupSelectionPrompt:
      'Which of these apply to you? Select all that apply.',
    confirmationCTALabel: 'Save my circle',
    groups: [
      {
        id: 'grp-early',
        label: 'Friends from early life',
        defaultRelationship: 'Friend',
        prompt:
          'Who are some friends from earlier in your life \u2014 growing up, school, your younger years? First and last names are ideal.',
        followUpPrompts: [
          {
            template:
              'How did you know [Name] \u2014 school, neighbourhood, or somewhere else?',
            field: 'context',
            options: ['School', 'Neighbourhood', 'Somewhere else'],
            mockAnswer: 'School',
          },
        ],
      },
      {
        id: 'grp-later',
        label: 'Friends from later in life',
        defaultRelationship: 'Friend',
        prompt:
          'Who are some friends you\u2019ve made in your adult years? First and last names are ideal.',
        followUpPrompts: [
          {
            template: 'How did you and [Name] meet?',
            field: 'context',
            mockAnswer: 'Through a mutual friend',
          },
        ],
      },
      {
        id: 'grp-work',
        label: 'Friends from work',
        defaultRelationship: 'Colleague',
        prompt:
          'Who are some colleagues or work friends who have been important to you? First and last names are ideal.',
        followUpPrompts: [
          {
            template: 'Where did you and [Name] work together?',
            field: 'context',
            mockAnswer: 'At the same company for years',
          },
        ],
      },
      {
        id: 'grp-close',
        label: 'Close friends right now',
        defaultRelationship: 'Friend',
        prompt:
          'Who are your closest friends right now? First and last names are ideal.',
        followUpPrompts: [],
      },
    ],
  },
}

// ── Mock names per group (used when voice recording completes) ───────────────

export const mockNamesPerGroup: Record<string, CapturedPerson[]> = {
  // Family groups
  'grp-spouse': [
    { id: 'mock-linda', name: 'Linda Johnson', relationship: 'Wife', groupId: 'grp-spouse' },
  ],
  'grp-children': [
    { id: 'mock-sarah', name: 'Sarah', relationship: 'Daughter', groupId: 'grp-children' },
    { id: 'mock-michael', name: 'Michael Johnson', relationship: 'Son', groupId: 'grp-children' },
  ],
  'grp-parents': [
    { id: 'mock-robert', name: 'Robert', relationship: 'Father', groupId: 'grp-parents' },
    { id: 'mock-margaret', name: 'Margaret Wilson', relationship: 'Mother', groupId: 'grp-parents' },
  ],
  'grp-siblings': [
    { id: 'mock-james', name: 'James', relationship: 'Brother', groupId: 'grp-siblings' },
    { id: 'mock-emily', name: 'Emily Walker', relationship: 'Sister', groupId: 'grp-siblings' },
  ],
  'grp-extended': [
    { id: 'mock-uncle-bob', name: 'Bob Harris', relationship: 'Uncle', groupId: 'grp-extended' },
    { id: 'mock-aunt-carol', name: 'Carol', relationship: 'Aunt', groupId: 'grp-extended' },
  ],

  // Friends groups
  'grp-early': [
    { id: 'mock-tom', name: 'Tom Davis', relationship: 'Friend', groupId: 'grp-early' },
    { id: 'mock-danny', name: 'Danny', relationship: 'Friend', groupId: 'grp-early' },
  ],
  'grp-later': [
    { id: 'mock-nancy', name: 'Nancy', relationship: 'Friend', groupId: 'grp-later' },
    { id: 'mock-frank', name: 'Frank Miller', relationship: 'Friend', groupId: 'grp-later' },
  ],
  'grp-work': [
    { id: 'mock-bill', name: 'Bill Thompson', relationship: 'Colleague', groupId: 'grp-work' },
    { id: 'mock-karen', name: 'Karen', relationship: 'Colleague', groupId: 'grp-work' },
  ],
  'grp-close': [
    { id: 'mock-tom-close', name: 'Tom Davis', relationship: 'Friend', groupId: 'grp-close' },
    { id: 'mock-nancy-close', name: 'Nancy', relationship: 'Friend', groupId: 'grp-close' },
    { id: 'mock-bill-close', name: 'Bill Thompson', relationship: 'Friend', groupId: 'grp-close' },
  ],
}

// ── "None of the above" sentinel ─────────────────────────────────────────────

export const NONE_GROUP_ID = 'grp-none'
