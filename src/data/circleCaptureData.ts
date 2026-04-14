import type { CircleCaptureConfig, CapturedPerson } from '@/types'

// ── Group definitions ────────────────────────────────────────────────────────

export const circleCaptureConfigs: Record<string, CircleCaptureConfig> = {
  'cat-family': {
    categoryId: 'cat-family',
    categoryLabel: 'Family',
    groupSelectionPrompt: 'Who would you like to tell us about?',
    confirmationCTALabel: 'Save my family',
    groups: [
      {
        id: 'grp-spouse',
        label: 'Spouse or partner',
        defaultRelationship: 'Spouse',
        prompt: 'Who is your spouse or partner? Just their name is fine.',
      },
      {
        id: 'grp-children',
        label: 'Children',
        defaultRelationship: 'Child',
        prompt: 'Tell us the names of your children. You can speak them or type them.',
      },
      {
        id: 'grp-parents',
        label: 'Parents',
        defaultRelationship: 'Parent',
        prompt: 'Tell us your parents\u2019 names. You can speak them or type them.',
      },
      {
        id: 'grp-siblings',
        label: 'Siblings',
        defaultRelationship: 'Sibling',
        prompt: 'Tell us the names of your siblings. You can speak them or type them.',
      },
      {
        id: 'grp-extended',
        label: 'Extended family (aunts, uncles, cousins, etc.)',
        defaultRelationship: '',
        prompt: 'Who else is in your extended family? Just names is great.',
      },
    ],
  },

  'cat-friends': {
    categoryId: 'cat-friends',
    categoryLabel: 'Friends',
    groupSelectionPrompt: 'Which groups of friends would you like to tell us about?',
    confirmationCTALabel: 'Save my circle',
    groups: [
      {
        id: 'grp-early',
        label: 'Friends from early life',
        defaultRelationship: 'Friend',
        prompt: 'Who are some friends from early in your life? Just names is great.',
      },
      {
        id: 'grp-later',
        label: 'Friends from later in life',
        defaultRelationship: 'Friend',
        prompt: 'Who are some friends from later in your life? Just names is great.',
      },
      {
        id: 'grp-work',
        label: 'Friends from work',
        defaultRelationship: 'Friend',
        prompt: 'Who are some friends you made through work? Just names is great.',
      },
      {
        id: 'grp-close',
        label: 'Close friends right now',
        defaultRelationship: 'Friend',
        prompt: 'Who are your close friends right now?',
      },
    ],
  },
}

// ── Mock names per group (used when voice recording completes) ───────────────

export const mockNamesPerGroup: Record<string, CapturedPerson[]> = {
  // Family groups
  'grp-spouse': [
    { id: 'mock-linda', name: 'Linda', relationship: 'Wife', groupId: 'grp-spouse' },
  ],
  'grp-children': [
    { id: 'mock-sarah', name: 'Sarah', relationship: 'Daughter', groupId: 'grp-children' },
    { id: 'mock-michael', name: 'Michael', relationship: 'Son', groupId: 'grp-children' },
  ],
  'grp-parents': [
    { id: 'mock-robert', name: 'Robert', relationship: 'Father', groupId: 'grp-parents' },
    { id: 'mock-margaret', name: 'Margaret', relationship: 'Mother', groupId: 'grp-parents' },
  ],
  'grp-siblings': [
    { id: 'mock-james', name: 'James', relationship: 'Brother', groupId: 'grp-siblings' },
    { id: 'mock-emily', name: 'Emily', relationship: 'Sister', groupId: 'grp-siblings' },
  ],
  'grp-extended': [
    { id: 'mock-uncle-bob', name: 'Uncle Bob', relationship: '', groupId: 'grp-extended' },
    { id: 'mock-aunt-carol', name: 'Aunt Carol', relationship: '', groupId: 'grp-extended' },
  ],

  // Friends groups
  'grp-early': [
    { id: 'mock-tom', name: 'Tom', relationship: 'Friend', groupId: 'grp-early' },
    { id: 'mock-danny', name: 'Danny', relationship: 'Friend', groupId: 'grp-early' },
  ],
  'grp-later': [
    { id: 'mock-nancy', name: 'Nancy', relationship: 'Friend', groupId: 'grp-later' },
    { id: 'mock-frank', name: 'Frank', relationship: 'Friend', groupId: 'grp-later' },
  ],
  'grp-work': [
    { id: 'mock-bill', name: 'Bill', relationship: 'Colleague', groupId: 'grp-work' },
    { id: 'mock-karen', name: 'Karen', relationship: 'Colleague', groupId: 'grp-work' },
  ],
  'grp-close': [
    { id: 'mock-tom-close', name: 'Tom', relationship: 'Friend', groupId: 'grp-close' },
    { id: 'mock-nancy-close', name: 'Nancy', relationship: 'Friend', groupId: 'grp-close' },
    { id: 'mock-bill-close', name: 'Bill', relationship: 'Friend', groupId: 'grp-close' },
  ],
}

// ── "None of the above" sentinel ─────────────────────────────────────────────

export const NONE_GROUP_ID = 'grp-none'
