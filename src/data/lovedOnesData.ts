import type { LovedOneCreator } from '@/types'

export const mockLovedOnes: LovedOneCreator[] = [
  {
    id: 'creator-robert',
    name: 'Robert Mitchell',
    relationship: 'Father',
    avatarUrl: '/images/LC 1.png',
    bio: 'Retired aerospace engineer, storyteller, and jazz lover.',
    entryCount: 38,
    starCount: 22,
  },
  {
    id: 'creator-margaret',
    name: 'Margaret Chen',
    relationship: 'Aunt',
    avatarUrl: '/images/LC 2.png',
    bio: 'Lifelong teacher, avid gardener, and keeper of family recipes.',
    entryCount: 24,
    starCount: 15,
  },
  {
    id: 'creator-eleanor',
    name: 'Eleanor Davis',
    relationship: 'Grandmother',
    avatarUrl: null,
    bio: 'World traveler, watercolor painter, and the heart of every gathering.',
    entryCount: 61,
    starCount: 34,
  },
]
