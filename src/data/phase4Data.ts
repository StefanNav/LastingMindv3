import type { Phase4Category, LegacyItem } from '@/types'

// ─── Phase 4: Keep Growing — 6 always-available activity categories ──────────

export const phase4Categories: Phase4Category[] = [
  {
    id: 'p4-open-journalling',
    title: 'Open Journalling',
    subtitle: 'Write or record whatever\'s on your mind',
    icon: 'BookOpen',
    iconColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'p4-open-reflection',
    title: 'Open Reflection',
    subtitle: 'Look back on a moment, a period, or a feeling',
    icon: 'Eye',
    iconColor: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'p4-capture-conversation',
    title: 'Capture a Conversation',
    subtitle: 'Record a real conversation with someone you love',
    icon: 'Users',
    iconColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'p4-fill-gaps',
    title: 'Fill in the Gaps',
    subtitle: 'Answer questions your LastingMind doesn\'t know yet',
    icon: 'PuzzlePiece',
    iconColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'p4-question-of-day',
    title: 'Question of the Day',
    subtitle: 'A fresh prompt every day to keep your story growing',
    icon: 'Sparkles',
    iconColor: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'p4-questions-loved-ones',
    title: 'Questions from Loved Ones',
    subtitle: 'Answer what your family actually wants to know',
    icon: 'Heart',
    iconColor: 'bg-pink-100 text-pink-700',
  },
]

// ─── Phase 3: Leave Your Legacy — 7 addable legacy items ────────────────────

export const availableLegacyItems: LegacyItem[] = [
  {
    id: 'legacy-letters',
    name: 'Letters to Loved Ones',
    description: 'Write a personal letter to someone who matters to you',
    icon: 'Mail',
    iconColor: 'bg-sky-100 text-sky-700',
    image: '/images/Letters to loved ones 1.png',
  },
  {
    id: 'legacy-voice-messages',
    name: 'Voice Messages',
    description: 'Record a message in your own words and voice',
    icon: 'Mic',
    iconColor: 'bg-emerald-100 text-emerald-700',
    image: '/images/Voice message 1.png',
  },
  {
    id: 'legacy-video-messages',
    name: 'Video Messages',
    description: 'Capture yourself on camera for someone to watch one day',
    icon: 'Video',
    iconColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'legacy-milestone-messages',
    name: 'Milestone Messages',
    description: 'Leave a message to be opened at a specific life moment',
    icon: 'Flag',
    iconColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'legacy-ethical-will',
    name: 'Ethical Will',
    description: 'Share your values, hopes, and life lessons',
    icon: 'ScrollText',
    iconColor: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'legacy-stories',
    name: 'Stories to Remember Me By',
    description: 'Tell the stories you want your family to always have',
    icon: 'BookHeart',
    iconColor: 'bg-pink-100 text-pink-700',
  },
  {
    id: 'legacy-obituary',
    name: 'Build My Obituary',
    description: 'Write the story of your life in your own words',
    icon: 'FileText',
    iconColor: 'bg-stone-100 text-stone-700',
    image: '/images/Memoir 1.png',
  },
]
