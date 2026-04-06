import type {
  DemoStateId,
  MemoryProfileData,
  ProfileFoundationCategory,
  ProfileLifeChapter,
  ProfileLegacyModule,
} from '@/types'

// ─── Foundation category image refs (matching demoStates.ts) ──────────────────
interface ImageRef { imageAsset: string; imageHeight: number; imageWidth: number }

const FOUNDATION_IMAGES: Record<string, ImageRef> = {
  family:     { imageAsset: '/images/Family 1.png',      imageHeight: 156, imageWidth: 147 },
  friends:    { imageAsset: '/images/Freinds 1.png',     imageHeight: 156, imageWidth: 270 },
  career:     { imageAsset: '/images/Career 1.png',      imageHeight: 145, imageWidth: 240 },
  education:  { imageAsset: '/images/Education 1.png',   imageHeight: 145, imageWidth: 240 },
  favorites:  { imageAsset: '/images/Favorites 1.png',  imageHeight: 156, imageWidth: 196 },
  coreValues: { imageAsset: '/images/Core Values 1.png', imageHeight: 145, imageWidth: 250 },
}

const LEGACY_IMAGES: Record<string, ImageRef> = {
  wisdom:        { imageAsset: '/images/Wisdom 1.png',                imageHeight: 156, imageWidth: 219 },
  letters:       { imageAsset: '/images/Letters to loved ones 1.png', imageHeight: 156, imageWidth: 303 },
  voiceMessages: { imageAsset: '/images/Voice message 1.png',         imageHeight: 156, imageWidth: 233 },
  memoir:        { imageAsset: '/images/Memoir 1.png',                imageHeight: 156, imageWidth: 268 },
}

// ─── Shared user identity ─────────────────────────────────────────────────────
const USER = {
  name: 'Alex Mitchell',
  avatarUrl: '/images/user image.png',
  age: 58,
  tagline: 'Storyteller. Engineer. Grandfather of three.',
}

// ─── Helper: build foundation categories ──────────────────────────────────────
type FoundationStatus = ProfileFoundationCategory['status']

function buildFoundation(statuses: Record<string, { status: FoundationStatus; deliverableName?: string }>): ProfileFoundationCategory[] {
  const categories = [
    { key: 'family',     id: 'cat-family',      name: 'Family',      images: FOUNDATION_IMAGES.family },
    { key: 'friends',    id: 'cat-friends',     name: 'Friends',     images: FOUNDATION_IMAGES.friends },
    { key: 'favorites',  id: 'cat-favorites',   name: 'Favorites',   images: FOUNDATION_IMAGES.favorites },
    { key: 'career',     id: 'cat-career',      name: 'Career',      images: FOUNDATION_IMAGES.career },
    { key: 'education',  id: 'cat-education',   name: 'Education',   images: FOUNDATION_IMAGES.education },
    { key: 'coreValues', id: 'cat-core-values', name: 'Core Values', images: FOUNDATION_IMAGES.coreValues },
  ]
  return categories.map((c) => ({
    categoryId: c.id,
    name: c.name,
    ...c.images,
    status: statuses[c.key]?.status ?? 'not_started',
    deliverableName: statuses[c.key]?.deliverableName,
  }))
}

// ─── Helper: build legacy modules ─────────────────────────────────────────────
function buildLegacy(overrides?: Partial<Record<string, { status: ProfileLegacyModule['status']; entryCount: number }>>): ProfileLegacyModule[] {
  const modules = [
    { key: 'wisdom',        id: 'mod-wisdom',        name: 'Wisdom & Advice',  images: LEGACY_IMAGES.wisdom },
    { key: 'letters',       id: 'mod-letters',       name: 'Letters',          images: LEGACY_IMAGES.letters },
    { key: 'voiceMessages', id: 'mod-voice',         name: 'Voice Messages',   images: LEGACY_IMAGES.voiceMessages },
    { key: 'memoir',        id: 'mod-memoir',         name: 'My Legacy',        images: LEGACY_IMAGES.memoir },
  ]
  return modules.map((m) => ({
    moduleId: m.id,
    name: m.name,
    ...m.images,
    status: overrides?.[m.key]?.status ?? 'not_started',
    entryCount: overrides?.[m.key]?.entryCount ?? 0,
  }))
}

// ═══════════════════════════════════════════════════════════════════════════════
// Profile data per demo state
// ═══════════════════════════════════════════════════════════════════════════════

const allNotStarted: Record<string, { status: FoundationStatus }> = {
  family: { status: 'not_started' },
  friends: { status: 'not_started' },
  favorites: { status: 'not_started' },
  career: { status: 'not_started' },
  education: { status: 'not_started' },
  coreValues: { status: 'not_started' },
}

const allInProgress: Record<string, { status: FoundationStatus }> = {
  family: { status: 'in_progress' },
  friends: { status: 'in_progress' },
  favorites: { status: 'in_progress' },
  career: { status: 'in_progress' },
  education: { status: 'in_progress' },
  coreValues: { status: 'in_progress' },
}

const allComplete: Record<string, { status: FoundationStatus; deliverableName: string }> = {
  family: { status: 'complete', deliverableName: 'Family tree' },
  friends: { status: 'complete', deliverableName: 'Friend map' },
  favorites: { status: 'complete', deliverableName: 'Personality card' },
  career: { status: 'complete', deliverableName: 'Career timeline' },
  education: { status: 'complete', deliverableName: 'Education story' },
  coreValues: { status: 'complete', deliverableName: 'Values compass' },
}

const LIFE_CHAPTERS: ProfileLifeChapter[] = [
  { chapterNumber: 1, dateRange: '1968 – 1986', title: 'A Charleston Childhood' },
  { chapterNumber: 2, dateRange: '1986 – 1994', title: 'College & First Steps' },
  { chapterNumber: 3, dateRange: '1994 – 2010', title: 'Building a Family' },
  { chapterNumber: 4, dateRange: '2010 – Present', title: 'The Quieter Years' },
]

const profileDataMap: Record<DemoStateId, MemoryProfileData> = {
  // Onboarding — same as fresh install
  onboarding: {
    user: USER,
    stats: { totalEntries: 0, starsEarned: 0, phasesComplete: 0 },
    foundationCategories: buildFoundation(allNotStarted),
    lifeChapters: [],
    legacyModules: buildLegacy(),
    phase1Complete: false,
    biographyReady: false,
  },

  // State 0 — Fresh install
  'state-0': {
    user: USER,
    stats: { totalEntries: 0, starsEarned: 0, phasesComplete: 0 },
    foundationCategories: buildFoundation(allNotStarted),
    lifeChapters: [],
    legacyModules: buildLegacy(),
    phase1Complete: false,
    biographyReady: false,
  },

  // State 1 — Foundation in progress (all Module 1s complete)
  'state-1': {
    user: USER,
    stats: { totalEntries: 6, starsEarned: 0, phasesComplete: 0 },
    foundationCategories: buildFoundation(allInProgress),
    lifeChapters: [],
    legacyModules: buildLegacy(),
    phase1Complete: false,
    biographyReady: false,
  },

  // State 2 — Almost there (5/6 stars, Core Values in progress)
  'state-2': {
    user: USER,
    stats: { totalEntries: 22, starsEarned: 5, phasesComplete: 0 },
    foundationCategories: buildFoundation({
      ...allComplete,
      coreValues: { status: 'in_progress' as FoundationStatus },
    }),
    lifeChapters: [],
    legacyModules: buildLegacy(),
    phase1Complete: false,
    biographyReady: false,
  },

  // State 3 — Foundation complete, Phase 2 just opened
  'state-3': {
    user: USER,
    stats: { totalEntries: 28, starsEarned: 6, phasesComplete: 1 },
    foundationCategories: buildFoundation(allComplete),
    lifeChapters: [],
    legacyModules: buildLegacy(),
    phase1Complete: true,
    biographyReady: false,
  },

  // State 4 — Deep progress (Phase 2 ~40%, Phase 3 ~15%)
  'state-4': {
    user: USER,
    stats: { totalEntries: 38, starsEarned: 6, phasesComplete: 1 },
    foundationCategories: buildFoundation(allComplete),
    lifeChapters: LIFE_CHAPTERS,
    legacyModules: buildLegacy({
      wisdom: { status: 'in_progress', entryCount: 5 },
      letters: { status: 'in_progress', entryCount: 3 },
      voiceMessages: { status: 'not_started', entryCount: 0 },
      memoir: { status: 'not_started', entryCount: 0 },
    }),
    phase1Complete: true,
    biographyReady: false,
  },
}

export function getProfileData(demoStateId: DemoStateId): MemoryProfileData {
  return profileDataMap[demoStateId]
}
