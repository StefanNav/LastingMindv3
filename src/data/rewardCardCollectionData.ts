import type {
  DemoStateId,
  EarnedRewardCard,
  CategoryContentSummary,
} from '@/types'

// ─── Foundation images (matching profileData.ts) ────────────────────────────
const IMG = {
  family:     '/images/Family 2.png',
  friends:    '/images/Freinds 2.png',
  career:     '/images/Career 2.png',
  education:  '/images/Education 2.png',
  favorites:  '/images/Favorites 2.png',
  coreValues: '/images/Core Values 2.png',
  wisdom:     '/images/Wisdom 2.png',
  letters:    '/images/Letters to loved ones 2.png',
  voice:      '/images/Voice message 2.png',
  memoir:     '/images/Memoir 2.png',
}

// ─── Reward card templates ──────────────────────────────────────────────────

const FAMILY_MOD1_CARD: EarnedRewardCard = {
  id: 'rc-fam-1',
  moduleNumber: 1,
  categoryImage: IMG.family,
  categoryLabel: 'Family',
  moduleTitle: "Who's in Your Family",
  items: [
    { id: 'ri-linda',    initial: 'L', label: 'Linda',    sublabel: 'Wife' },
    { id: 'ri-sarah',    initial: 'S', label: 'Sarah',    sublabel: 'Daughter' },
    { id: 'ri-michael',  initial: 'M', label: 'Michael',  sublabel: 'Son' },
    { id: 'ri-robert',   initial: 'R', label: 'Robert',   sublabel: 'Father' },
    { id: 'ri-margaret', initial: 'M', label: 'Margaret', sublabel: 'Mother' },
    { id: 'ri-james',    initial: 'J', label: 'James',    sublabel: 'Brother' },
  ],
  itemCountLabel: '6 family members recorded',
  date: 'March 8, 2026',
}

const FAMILY_MOD2_CARD: EarnedRewardCard = {
  id: 'rc-fam-2',
  moduleNumber: 2,
  categoryImage: IMG.family,
  categoryLabel: 'Family',
  moduleTitle: "Mom's Sunday Dinners",
  items: [
    { id: 'ri-story-mom', initial: 'M', label: 'Mom', sublabel: 'A story about family dinners' },
  ],
  itemCountLabel: '1 story recorded',
  date: 'March 10, 2026',
}

const FRIENDS_MOD1_CARD: EarnedRewardCard = {
  id: 'rc-fri-1',
  moduleNumber: 1,
  categoryImage: IMG.friends,
  categoryLabel: 'Friends',
  moduleTitle: 'Your Circle',
  items: [
    { id: 'ri-tom',   initial: 'T', label: 'Tom',   sublabel: 'College friend' },
    { id: 'ri-nancy', initial: 'N', label: 'Nancy', sublabel: 'Work friend' },
    { id: 'ri-bill',  initial: 'B', label: 'Bill',  sublabel: 'Neighbor' },
  ],
  itemCountLabel: '3 friends recorded',
  date: 'March 11, 2026',
}

const FRIENDS_MOD2_CARD: EarnedRewardCard = {
  id: 'rc-fri-2',
  moduleNumber: 2,
  categoryImage: IMG.friends,
  categoryLabel: 'Friends',
  moduleTitle: "Tom's Comeback Story",
  items: [
    { id: 'ri-story-tom', initial: 'T', label: 'Tom', sublabel: 'A story about resilience' },
  ],
  itemCountLabel: '1 story recorded',
  date: 'March 13, 2026',
}

const CAREER_MOD1_CARD: EarnedRewardCard = {
  id: 'rc-car-1',
  moduleNumber: 1,
  categoryImage: IMG.career,
  categoryLabel: 'Career',
  moduleTitle: 'Career Journey',
  items: [
    { id: 'ri-boeing', initial: 'B', label: 'Boeing',         sublabel: 'Senior Director' },
    { id: 'ri-hw',     initial: 'H', label: 'Hardware Store',  sublabel: 'First job at 16' },
  ],
  itemCountLabel: '2 roles recorded',
  date: 'March 14, 2026',
}

const CAREER_MOD2_CARD: EarnedRewardCard = {
  id: 'rc-car-2',
  moduleNumber: 2,
  categoryImage: IMG.career,
  categoryLabel: 'Career',
  moduleTitle: 'The Promotion That Changed Everything',
  items: [
    { id: 'ri-story-promo', initial: 'P', label: 'Promotion', sublabel: 'Turned a setback into growth' },
  ],
  itemCountLabel: '1 story recorded',
  date: 'March 16, 2026',
}

const EDUCATION_MOD1_CARD: EarnedRewardCard = {
  id: 'rc-edu-1',
  moduleNumber: 1,
  categoryImage: IMG.education,
  categoryLabel: 'Education',
  moduleTitle: 'Where You Learned',
  items: [
    { id: 'ri-lincoln', initial: 'L', label: 'Lincoln High', sublabel: 'High school' },
    { id: 'ri-state',   initial: 'S', label: 'State Univ.',  sublabel: 'BA History' },
    { id: 'ri-wharton', initial: 'W', label: 'Wharton',      sublabel: 'MBA' },
  ],
  itemCountLabel: '3 schools recorded',
  date: 'March 17, 2026',
}

const EDUCATION_MOD2_CARD: EarnedRewardCard = {
  id: 'rc-edu-2',
  moduleNumber: 2,
  categoryImage: IMG.education,
  categoryLabel: 'Education',
  moduleTitle: 'Professor Davis Changed My Path',
  items: [
    { id: 'ri-story-davis', initial: 'D', label: 'Prof. Davis', sublabel: 'Made me consider teaching' },
  ],
  itemCountLabel: '1 story recorded',
  date: 'March 19, 2026',
}

const FAVORITES_MOD1_CARD: EarnedRewardCard = {
  id: 'rc-fav-1',
  moduleNumber: 1,
  categoryImage: IMG.favorites,
  categoryLabel: 'Favorites',
  moduleTitle: 'Your Favorite Things',
  items: [
    { id: 'ri-pasta', initial: 'P', label: 'Pasta',     sublabel: 'Favorite food' },
    { id: 'ri-jazz',  initial: 'J', label: 'Jazz',      sublabel: 'Favorite music' },
    { id: 'ri-italy', initial: 'I', label: 'Italy',     sublabel: 'Favorite place' },
    { id: 'ri-godfa', initial: 'G', label: 'Godfather', sublabel: 'Favorite movie' },
  ],
  itemCountLabel: '4 favorites recorded',
  date: 'March 20, 2026',
}

const FAVORITES_MOD2_CARD: EarnedRewardCard = {
  id: 'rc-fav-2',
  moduleNumber: 2,
  categoryImage: IMG.favorites,
  categoryLabel: 'Favorites',
  moduleTitle: 'Why They Matter',
  items: [
    { id: 'ri-story-pasta', initial: 'P', label: 'Pasta', sublabel: "Mom's recipe" },
    { id: 'ri-story-jazz',  initial: 'J', label: 'Jazz',  sublabel: "Dad's record player" },
  ],
  itemCountLabel: '2 reflections recorded',
  date: 'March 22, 2026',
}

const CORE_VALUES_MOD1_CARD: EarnedRewardCard = {
  id: 'rc-val-1',
  moduleNumber: 1,
  categoryImage: IMG.coreValues,
  categoryLabel: 'Core Values',
  moduleTitle: 'What You Stand For',
  items: [
    { id: 'ri-honesty', initial: 'H', label: 'Honesty',    sublabel: 'Core value' },
    { id: 'ri-family',  initial: 'F', label: 'Family',     sublabel: 'Core value' },
    { id: 'ri-work',    initial: 'W', label: 'Hard Work',  sublabel: 'Core value' },
  ],
  itemCountLabel: '3 values recorded',
  date: 'March 23, 2026',
}

const CORE_VALUES_MOD2_CARD: EarnedRewardCard = {
  id: 'rc-val-2',
  moduleNumber: 2,
  categoryImage: IMG.coreValues,
  categoryLabel: 'Core Values',
  moduleTitle: 'Standing By My Beliefs',
  items: [
    { id: 'ri-story-honesty', initial: 'H', label: 'Honesty', sublabel: 'When it was tested' },
  ],
  itemCountLabel: '1 story recorded',
  date: 'March 25, 2026',
}

// ─── Legacy reward cards ────────────────────────────────────────────────────

const WISDOM_CARD_1: EarnedRewardCard = {
  id: 'rc-wis-1',
  moduleNumber: 1,
  categoryImage: IMG.wisdom,
  categoryLabel: 'Wisdom & Advice',
  moduleTitle: 'Quick Wisdom Round',
  items: [
    { id: 'ri-wis-marriage',  initial: 'M', label: 'Marriage',  sublabel: 'Key to lasting love' },
    { id: 'ri-wis-parenting', initial: 'P', label: 'Parenting', sublabel: 'Let them fail sometimes' },
    { id: 'ri-wis-money',     initial: 'M', label: 'Money',     sublabel: 'Save before you spend' },
  ],
  itemCountLabel: '3 wisdoms shared',
  date: 'April 2, 2026',
}

const LETTERS_CARD_1: EarnedRewardCard = {
  id: 'rc-let-1',
  moduleNumber: 1,
  categoryImage: IMG.letters,
  categoryLabel: 'Letters',
  moduleTitle: 'Letter to Sarah',
  items: [
    { id: 'ri-let-sarah', initial: 'S', label: 'Sarah', sublabel: 'Daughter' },
  ],
  itemCountLabel: '1 letter written',
  date: 'April 4, 2026',
}

const LETTERS_CARD_2: EarnedRewardCard = {
  id: 'rc-let-2',
  moduleNumber: 2,
  categoryImage: IMG.letters,
  categoryLabel: 'Letters',
  moduleTitle: 'Letter to Michael',
  items: [
    { id: 'ri-let-michael', initial: 'M', label: 'Michael', sublabel: 'Son' },
  ],
  itemCountLabel: '1 letter written',
  date: 'April 5, 2026',
}

// ─── Content summaries ──────────────────────────────────────────────────────

const FAMILY_SUMMARY_FULL: CategoryContentSummary = {
  categoryId: 'cat-family',
  categoryLabel: 'Family',
  categoryImage: IMG.family,
  status: 'complete',
  modulesComplete: 2,
  modulesTotal: 2,
  people: [
    { name: 'Linda',    role: 'Wife' },
    { name: 'Sarah',    role: 'Daughter' },
    { name: 'Michael',  role: 'Son' },
    { name: 'Robert',   role: 'Father' },
    { name: 'Margaret', role: 'Mother' },
    { name: 'James',    role: 'Brother' },
    { name: 'Emily',    role: 'Sister' },
  ],
  entries: [
    { title: "Mom's Sunday Dinners", snippet: 'Every Sunday, Mom would make her famous roast chicken...', date: 'Mar 10, 2026' },
  ],
}

const FAMILY_SUMMARY_MOD1: CategoryContentSummary = {
  categoryId: 'cat-family',
  categoryLabel: 'Family',
  categoryImage: IMG.family,
  status: 'in_progress',
  modulesComplete: 1,
  modulesTotal: 2,
  people: [
    { name: 'Linda',    role: 'Wife' },
    { name: 'Sarah',    role: 'Daughter' },
    { name: 'Michael',  role: 'Son' },
    { name: 'Robert',   role: 'Father' },
    { name: 'Margaret', role: 'Mother' },
    { name: 'James',    role: 'Brother' },
  ],
}

const FRIENDS_SUMMARY_FULL: CategoryContentSummary = {
  categoryId: 'cat-friends',
  categoryLabel: 'Friends',
  categoryImage: IMG.friends,
  status: 'complete',
  modulesComplete: 2,
  modulesTotal: 2,
  people: [
    { name: 'Tom',   role: 'College friend' },
    { name: 'Nancy', role: 'Work friend' },
    { name: 'Bill',  role: 'Neighbor' },
  ],
  entries: [
    { title: "Tom's Comeback Story", snippet: 'Tom went through a really tough time in his 40s...', date: 'Mar 13, 2026' },
  ],
}

const FRIENDS_SUMMARY_MOD1: CategoryContentSummary = {
  categoryId: 'cat-friends',
  categoryLabel: 'Friends',
  categoryImage: IMG.friends,
  status: 'in_progress',
  modulesComplete: 1,
  modulesTotal: 2,
  people: [
    { name: 'Tom',   role: 'College friend' },
    { name: 'Nancy', role: 'Work friend' },
    { name: 'Bill',  role: 'Neighbor' },
  ],
}

const CAREER_SUMMARY_FULL: CategoryContentSummary = {
  categoryId: 'cat-career',
  categoryLabel: 'Career',
  categoryImage: IMG.career,
  status: 'complete',
  modulesComplete: 2,
  modulesTotal: 2,
  entries: [
    { title: 'Career Journey',                       snippet: '30 years at Boeing, from junior engineer to senior director...', date: 'Mar 14, 2026' },
    { title: 'The Promotion That Changed Everything', snippet: 'Getting passed over at 35 pushed me to get my MBA...', date: 'Mar 16, 2026' },
  ],
}

const CAREER_SUMMARY_MOD1: CategoryContentSummary = {
  categoryId: 'cat-career',
  categoryLabel: 'Career',
  categoryImage: IMG.career,
  status: 'in_progress',
  modulesComplete: 1,
  modulesTotal: 2,
  entries: [
    { title: 'Career Journey', snippet: '30 years at Boeing, from junior engineer to senior director...', date: 'Mar 14, 2026' },
  ],
}

const EDUCATION_SUMMARY_FULL: CategoryContentSummary = {
  categoryId: 'cat-education',
  categoryLabel: 'Education',
  categoryImage: IMG.education,
  status: 'complete',
  modulesComplete: 2,
  modulesTotal: 2,
  entries: [
    { title: 'Where You Learned',              snippet: 'Lincoln High, State University, and Wharton...', date: 'Mar 17, 2026' },
    { title: 'Professor Davis Changed My Path', snippet: 'She taught American history and connected past to present...', date: 'Mar 19, 2026' },
  ],
}

const EDUCATION_SUMMARY_MOD1: CategoryContentSummary = {
  categoryId: 'cat-education',
  categoryLabel: 'Education',
  categoryImage: IMG.education,
  status: 'in_progress',
  modulesComplete: 1,
  modulesTotal: 2,
  entries: [
    { title: 'Where You Learned', snippet: 'Lincoln High, State University, and Wharton...', date: 'Mar 17, 2026' },
  ],
}

const FAVORITES_SUMMARY_FULL: CategoryContentSummary = {
  categoryId: 'cat-favorites',
  categoryLabel: 'Favorites',
  categoryImage: IMG.favorites,
  status: 'complete',
  modulesComplete: 2,
  modulesTotal: 2,
  items: [
    { label: 'Food',  value: 'Pasta' },
    { label: 'Music', value: 'Jazz' },
    { label: 'Place', value: 'Italy' },
    { label: 'Movie', value: 'The Godfather' },
  ],
  entries: [
    { title: 'Why They Matter', snippet: "Pasta reminds me of Mom's kitchen, Jazz was Dad's world...", date: 'Mar 22, 2026' },
  ],
}

const FAVORITES_SUMMARY_MOD1: CategoryContentSummary = {
  categoryId: 'cat-favorites',
  categoryLabel: 'Favorites',
  categoryImage: IMG.favorites,
  status: 'in_progress',
  modulesComplete: 1,
  modulesTotal: 2,
  items: [
    { label: 'Food',  value: 'Pasta' },
    { label: 'Music', value: 'Jazz' },
    { label: 'Place', value: 'Italy' },
    { label: 'Movie', value: 'The Godfather' },
  ],
}

const CORE_VALUES_SUMMARY_FULL: CategoryContentSummary = {
  categoryId: 'cat-core-values',
  categoryLabel: 'Core Values',
  categoryImage: IMG.coreValues,
  status: 'complete',
  modulesComplete: 2,
  modulesTotal: 2,
  items: [
    { label: 'Value', value: 'Honesty & Integrity' },
    { label: 'Value', value: 'Family & Togetherness' },
    { label: 'Value', value: 'Hard Work & Perseverance' },
  ],
  entries: [
    { title: 'Standing By My Beliefs', snippet: 'There was a time when honesty cost me a deal, but earned me respect...', date: 'Mar 25, 2026' },
  ],
}

const CORE_VALUES_SUMMARY_MOD1: CategoryContentSummary = {
  categoryId: 'cat-core-values',
  categoryLabel: 'Core Values',
  categoryImage: IMG.coreValues,
  status: 'in_progress',
  modulesComplete: 1,
  modulesTotal: 2,
  items: [
    { label: 'Value', value: 'Honesty & Integrity' },
    { label: 'Value', value: 'Family & Togetherness' },
    { label: 'Value', value: 'Hard Work & Perseverance' },
  ],
}

// Legacy summaries
const WISDOM_SUMMARY: CategoryContentSummary = {
  categoryId: 'mod-wisdom',
  categoryLabel: 'Wisdom & Advice',
  categoryImage: IMG.wisdom,
  status: 'in_progress',
  modulesComplete: 1,
  modulesTotal: 3,
  entries: [
    { title: 'On Marriage',  snippet: 'The key to lasting love is choosing each other every day...', date: 'Apr 2, 2026' },
    { title: 'On Parenting', snippet: 'Let them fail sometimes — that is how they learn...', date: 'Apr 2, 2026' },
    { title: 'On Money',     snippet: 'Save before you spend. It sounds simple but it took me years...', date: 'Apr 2, 2026' },
  ],
}

const LETTERS_SUMMARY: CategoryContentSummary = {
  categoryId: 'mod-letters',
  categoryLabel: 'Letters',
  categoryImage: IMG.letters,
  status: 'in_progress',
  modulesComplete: 0,
  modulesTotal: 1,
  entries: [
    { title: 'Letter to Sarah',  snippet: 'Dear Sarah, from the moment you were born...', date: 'Apr 4, 2026' },
    { title: 'Letter to Michael', snippet: 'Dear Michael, I know we do not always see eye to eye...', date: 'Apr 5, 2026' },
  ],
}

const VOICE_SUMMARY_EMPTY: CategoryContentSummary = {
  categoryId: 'mod-voice',
  categoryLabel: 'Voice Messages',
  categoryImage: IMG.voice,
  status: 'not_started',
  modulesComplete: 0,
  modulesTotal: 1,
}

const MEMOIR_SUMMARY_EMPTY: CategoryContentSummary = {
  categoryId: 'mod-memoir',
  categoryLabel: 'My Legacy',
  categoryImage: IMG.memoir,
  status: 'not_started',
  modulesComplete: 0,
  modulesTotal: 1,
}

// ─── Zero-state summaries (used in state-0 / onboarding) ───────────────────

function zeroSummary(categoryId: string, label: string, image: string, total: number): CategoryContentSummary {
  return { categoryId, categoryLabel: label, categoryImage: image, status: 'not_started', modulesComplete: 0, modulesTotal: total }
}

const ZERO_SUMMARIES: Record<string, CategoryContentSummary> = {
  'cat-family':      zeroSummary('cat-family',      'Family',          IMG.family,     2),
  'cat-friends':     zeroSummary('cat-friends',      'Friends',         IMG.friends,    2),
  'cat-career':      zeroSummary('cat-career',       'Career',          IMG.career,     2),
  'cat-education':   zeroSummary('cat-education',    'Education',       IMG.education,  2),
  'cat-favorites':   zeroSummary('cat-favorites',    'Favorites',       IMG.favorites,  2),
  'cat-core-values': zeroSummary('cat-core-values',  'Core Values',     IMG.coreValues, 2),
  'mod-wisdom':      zeroSummary('mod-wisdom',       'Wisdom & Advice', IMG.wisdom,     3),
  'mod-letters':     zeroSummary('mod-letters',      'Letters',         IMG.letters,    1),
  'mod-voice':       zeroSummary('mod-voice',        'Voice Messages',  IMG.voice,      1),
  'mod-memoir':      zeroSummary('mod-memoir',       'My Legacy',       IMG.memoir,     1),
}

// ═══════════════════════════════════════════════════════════════════════════════
// Per-demo-state data
// ═══════════════════════════════════════════════════════════════════════════════

interface CategoryDetailData {
  cards: EarnedRewardCard[]
  summary: CategoryContentSummary
}

type CategoryDetailMap = Record<string, CategoryDetailData>

const emptyCards = (id: string): CategoryDetailData => ({
  cards: [],
  summary: ZERO_SUMMARIES[id] ?? zeroSummary(id, id, '', 2),
})

// state-0 / onboarding — everything empty
const STATE_0: CategoryDetailMap = {
  'cat-family':      emptyCards('cat-family'),
  'cat-friends':     emptyCards('cat-friends'),
  'cat-career':      emptyCards('cat-career'),
  'cat-education':   emptyCards('cat-education'),
  'cat-favorites':   emptyCards('cat-favorites'),
  'cat-core-values': emptyCards('cat-core-values'),
  'mod-wisdom':      emptyCards('mod-wisdom'),
  'mod-letters':     emptyCards('mod-letters'),
  'mod-voice':       emptyCards('mod-voice'),
  'mod-memoir':      emptyCards('mod-memoir'),
}

// state-1 — All Module 1s complete (in_progress)
const STATE_1: CategoryDetailMap = {
  'cat-family':      { cards: [FAMILY_MOD1_CARD],      summary: FAMILY_SUMMARY_MOD1 },
  'cat-friends':     { cards: [FRIENDS_MOD1_CARD],      summary: FRIENDS_SUMMARY_MOD1 },
  'cat-career':      { cards: [CAREER_MOD1_CARD],       summary: CAREER_SUMMARY_MOD1 },
  'cat-education':   { cards: [EDUCATION_MOD1_CARD],    summary: EDUCATION_SUMMARY_MOD1 },
  'cat-favorites':   { cards: [FAVORITES_MOD1_CARD],    summary: FAVORITES_SUMMARY_MOD1 },
  'cat-core-values': { cards: [CORE_VALUES_MOD1_CARD],  summary: CORE_VALUES_SUMMARY_MOD1 },
  'mod-wisdom':      emptyCards('mod-wisdom'),
  'mod-letters':     emptyCards('mod-letters'),
  'mod-voice':       emptyCards('mod-voice'),
  'mod-memoir':      emptyCards('mod-memoir'),
}

// state-2 — 5/6 complete (Core Values still in progress)
const STATE_2: CategoryDetailMap = {
  'cat-family':      { cards: [FAMILY_MOD1_CARD, FAMILY_MOD2_CARD],         summary: FAMILY_SUMMARY_FULL },
  'cat-friends':     { cards: [FRIENDS_MOD1_CARD, FRIENDS_MOD2_CARD],       summary: FRIENDS_SUMMARY_FULL },
  'cat-career':      { cards: [CAREER_MOD1_CARD, CAREER_MOD2_CARD],         summary: CAREER_SUMMARY_FULL },
  'cat-education':   { cards: [EDUCATION_MOD1_CARD, EDUCATION_MOD2_CARD],   summary: EDUCATION_SUMMARY_FULL },
  'cat-favorites':   { cards: [FAVORITES_MOD1_CARD, FAVORITES_MOD2_CARD],   summary: FAVORITES_SUMMARY_FULL },
  'cat-core-values': { cards: [CORE_VALUES_MOD1_CARD],                       summary: CORE_VALUES_SUMMARY_MOD1 },
  'mod-wisdom':      emptyCards('mod-wisdom'),
  'mod-letters':     emptyCards('mod-letters'),
  'mod-voice':       emptyCards('mod-voice'),
  'mod-memoir':      emptyCards('mod-memoir'),
}

// state-3 — Foundation complete, Phase 2 just opened
const STATE_3: CategoryDetailMap = {
  'cat-family':      { cards: [FAMILY_MOD1_CARD, FAMILY_MOD2_CARD],           summary: FAMILY_SUMMARY_FULL },
  'cat-friends':     { cards: [FRIENDS_MOD1_CARD, FRIENDS_MOD2_CARD],         summary: FRIENDS_SUMMARY_FULL },
  'cat-career':      { cards: [CAREER_MOD1_CARD, CAREER_MOD2_CARD],           summary: CAREER_SUMMARY_FULL },
  'cat-education':   { cards: [EDUCATION_MOD1_CARD, EDUCATION_MOD2_CARD],     summary: EDUCATION_SUMMARY_FULL },
  'cat-favorites':   { cards: [FAVORITES_MOD1_CARD, FAVORITES_MOD2_CARD],     summary: FAVORITES_SUMMARY_FULL },
  'cat-core-values': { cards: [CORE_VALUES_MOD1_CARD, CORE_VALUES_MOD2_CARD], summary: CORE_VALUES_SUMMARY_FULL },
  'mod-wisdom':      emptyCards('mod-wisdom'),
  'mod-letters':     emptyCards('mod-letters'),
  'mod-voice':       emptyCards('mod-voice'),
  'mod-memoir':      emptyCards('mod-memoir'),
}

// state-4 — Deep progress (legacy modules partially done)
const STATE_4: CategoryDetailMap = {
  ...STATE_3,
  'mod-wisdom':  { cards: [WISDOM_CARD_1],               summary: WISDOM_SUMMARY },
  'mod-letters': { cards: [LETTERS_CARD_1, LETTERS_CARD_2], summary: LETTERS_SUMMARY },
  'mod-voice':   { cards: [],                              summary: VOICE_SUMMARY_EMPTY },
  'mod-memoir':  { cards: [],                              summary: MEMOIR_SUMMARY_EMPTY },
}

const dataByState: Record<DemoStateId, CategoryDetailMap> = {
  onboarding: STATE_0,
  'state-0': STATE_0,
  'state-1': STATE_1,
  'state-2': STATE_2,
  'state-3': STATE_3,
  'state-4': STATE_4,
  audience: STATE_0,
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function getCategoryDetailData(
  demoStateId: DemoStateId,
  categoryId: string,
): CategoryDetailData {
  const stateMap = dataByState[demoStateId] ?? STATE_0
  return stateMap[categoryId] ?? { cards: [], summary: ZERO_SUMMARIES[categoryId] ?? zeroSummary(categoryId, categoryId, '', 2) }
}
