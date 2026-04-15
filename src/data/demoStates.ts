import type { DemoConfig, DemoStateId } from '@/types'

// ─── Tree stage images (mapped to foundation star progress) ──────────────────
const TREE_STAGE_1 = '/images/TreeStage1_V2.png'  // 0 stars — starting tree
const TREE_STAGE_2 = '/images/TreeStage2_V2.png'  // 1-5 stars — first growth
const TREE_STAGE_3 = '/images/TreeStage3_V2.png'  // 6 stars — fully grown

// ─── Foundation category image refs (reused across all states) ────────────────
const CAT_IMAGES = {
  family:      { image: '/images/Family 2.png',      imageHeight: 156, imageWidth: 147 },
  friends:     { image: '/images/Freinds 2.png',     imageHeight: 156, imageWidth: 270 },
  career:      { image: '/images/Career 2.png',      imageHeight: 145, imageWidth: 240 },
  education:   { image: '/images/Education 2.png',   imageHeight: 145, imageWidth: 240 },
  favorites:   { image: '/images/Favorites 2.png',  imageHeight: 156, imageWidth: 196 },
  coreValues:  { image: '/images/Core Values 2.png', imageHeight: 145, imageWidth: 250 },
  lifeChapters:     { image: '/images/Life chapters 2.png',         imageHeight: 156, imageWidth: 252 },
  wisdom:           { image: '/images/Wisdom 2.png',                imageHeight: 156, imageWidth: 219 },
  greatestMemories: { image: '/images/Greatest Memories 2.png',     imageHeight: 156, imageWidth: 270 },
  letters:          { image: '/images/Letters to loved ones 2.png', imageHeight: 156, imageWidth: 303 },
  voiceMessages:    { image: '/images/Voice message 2.png',         imageHeight: 156, imageWidth: 233 },
  memoir:           { image: '/images/Memoir 2.png',                imageHeight: 156, imageWidth: 268 },
  openJournaling:      { image: '/images/Open Journaling 2.png',        imageHeight: 156, imageWidth: 236 },
  questionsLovedOnes:  { image: '/images/Questions from Loved ones.png', imageHeight: 156, imageWidth: 238 },
  reflectiveQuestions: { image: '/images/Reflective Questions.png',      imageHeight: 156, imageWidth: 252 },
} as const

// ═══════════════════════════════════════════════════════════════════════════════
// STATE 0 — Fresh Install
// ═══════════════════════════════════════════════════════════════════════════════

const state0: DemoConfig = {
  id: 'state-0',
  label: 'State 0',
  foundationStars: 0,
  streak: 0,
  treeImage: TREE_STAGE_1,
  promptCards: [
    { categoryTag: 'Suggested first step', question: 'Start with the people closest to you — tell us about your family.', categoryId: 'cat-family', moduleId: 'mod-fam-1' },
    { categoryTag: 'Friends', question: 'Share the people who have been there through it all.', categoryId: 'cat-friends', moduleId: 'mod-fri-1' },
    { categoryTag: 'Favorites', question: 'Foods, places, songs, movies — the things you love most.', categoryId: 'cat-favorites', moduleId: 'mod-fav-1' },
    { categoryTag: 'Career', question: 'Walk us through the jobs and roles that defined you.', categoryId: 'cat-career', moduleId: 'mod-car-1' },
    { categoryTag: 'Education', question: 'Share memories from your time in school.', categoryId: 'cat-education', moduleId: 'mod-edu-1' },
    { categoryTag: 'Core Values', question: 'The principles that have guided your life.', categoryId: 'cat-core-values', moduleId: 'mod-val-1' },
  ],
  homePhases: [
    {
      id: 'foundation',
      title: 'Foundation',
      label: 'Phase 1',
      categories: [
        { id: 'cat-family',      title: 'Family',      ...CAT_IMAGES.family,      status: 'not_started', totalModules: 2 },
        { id: 'cat-friends',     title: 'Friends',     ...CAT_IMAGES.friends,     status: 'not_started', totalModules: 2 },
        { id: 'cat-favorites',  title: 'Favorites',  ...CAT_IMAGES.favorites,  status: 'not_started', totalModules: 2 },
        { id: 'cat-career',      title: 'Career',      ...CAT_IMAGES.career,      status: 'not_started', totalModules: 2 },
        { id: 'cat-education',   title: 'Education',   ...CAT_IMAGES.education,   status: 'not_started', totalModules: 2 },
        { id: 'cat-core-values', title: 'Core Values', ...CAT_IMAGES.coreValues,  status: 'not_started', totalModules: 2 },
      ],
    },
    {
      id: 'life-story',
      title: 'Life Story',
      label: 'Phase 2',
      categories: [
        { id: 'cat-life-chapters',     title: 'Life Chapters',     ...CAT_IMAGES.lifeChapters,     status: 'locked', totalModules: 3 },
        { id: 'cat-greatest-memories', title: 'Greatest Memories', ...CAT_IMAGES.greatestMemories, status: 'locked', totalModules: 3 },
      ],
    },
    {
      id: 'your-legacy',
      title: 'Leave Your Legacy',
      label: 'Phase 3',
      categories: [
        { id: 'cat-wisdom', title: 'Wisdom & Advice', ...CAT_IMAGES.wisdom, status: 'locked', totalModules: 3 },
      ],
    },
    {
      id: 'keep-growing',
      title: 'Keep Growing',
      label: 'My Study',
      categories: [],
    },
  ],
  categoryDetails: {
    'cat-family': {
      categoryId: 'cat-family',
      heading: 'Tell us about your family',
      subtitle: 'Complete both modules to earn your first star',
      modules: [
        { id: 'mod-fam-1', title: "Who's in your family", description: 'This module lays the foundation for future exercises.', duration: '5min', completed: false, locked: false },
        { id: 'mod-fam-2', title: 'Tell us about a family member', description: 'Share a story or a memory about someone in your family.', duration: '5min', completed: false, locked: true },
      ],
    },
    'cat-friends': {
      categoryId: 'cat-friends',
      heading: 'Tell us about your friends',
      subtitle: 'Complete both modules to earn your first star',
      modules: [
        { id: 'mod-fri-1', title: 'Who are your closest friends', description: 'Share the people who have been there through it all.', duration: '5min', completed: false, locked: false },
        { id: 'mod-fri-2', title: 'A friendship that shaped you', description: 'Tell us about a friend who changed your life.', duration: '5min', completed: false, locked: true },
      ],
    },
    'cat-career': {
      categoryId: 'cat-career',
      heading: 'Tell us about your career',
      subtitle: 'Complete both modules to earn your first star',
      modules: [
        { id: 'mod-car-1', title: 'Your career journey', description: 'Walk us through the jobs and roles that defined you.', duration: '5min', completed: false, locked: false },
        { id: 'mod-car-2', title: 'Lessons from work', description: 'What did your career teach you about life?', duration: '5min', completed: false, locked: true },
      ],
    },
    'cat-education': {
      categoryId: 'cat-education',
      heading: 'Tell us about your education',
      subtitle: 'Complete both modules to earn your first star',
      modules: [
        { id: 'mod-edu-1', title: 'Your school years', description: 'Share memories from your time in school.', duration: '5min', completed: false, locked: false },
        { id: 'mod-edu-2', title: 'What education meant to you', description: 'How did learning shape who you became?', duration: '5min', completed: false, locked: true },
      ],
    },
    'cat-favorites': {
      categoryId: 'cat-favorites',
      heading: 'Tell us about your favorites',
      subtitle: 'Complete both modules to earn your first star',
      modules: [
        { id: 'mod-fav-1', title: 'Your favorite things', description: 'Foods, places, songs, movies — the things you love most.', duration: '5min', completed: false, locked: false },
        { id: 'mod-fav-2', title: 'Why they matter', description: 'What makes these favorites special to you?', duration: '5min', completed: false, locked: true },
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
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATE 1 — Foundation In Progress (0 stars: all Module 1s complete, Module 2s at zero)
// ═══════════════════════════════════════════════════════════════════════════════

const state1: DemoConfig = {
  id: 'state-1',
  label: 'State 1',
  foundationStars: 0,
  streak: 1,
  treeImage: TREE_STAGE_1,
  promptCards: [
    { categoryTag: 'Family', question: 'Share a story or a memory about someone in your family.', categoryId: 'cat-family', moduleId: 'mod-fam-2' },
    { categoryTag: 'Friends', question: 'Tell us about a friend who changed your life.', categoryId: 'cat-friends', moduleId: 'mod-fri-2' },
    { categoryTag: 'Favorites', question: 'What makes these favorites special to you?', categoryId: 'cat-favorites', moduleId: 'mod-fav-2' },
    { categoryTag: 'Career', question: 'What did your career teach you about life?', categoryId: 'cat-career', moduleId: 'mod-car-2' },
    { categoryTag: 'Education', question: 'How did learning shape who you became?', categoryId: 'cat-education', moduleId: 'mod-edu-2' },
    { categoryTag: 'Core Values', question: 'Share a time your values were tested.', categoryId: 'cat-core-values', moduleId: 'mod-val-2' },
  ],
  homePhases: [
    {
      id: 'foundation',
      title: 'Foundation',
      label: 'Phase 1',
      categories: [
        { id: 'cat-family',      title: 'Family',      ...CAT_IMAGES.family,      status: 'started', totalModules: 2 },
        { id: 'cat-friends',     title: 'Friends',     ...CAT_IMAGES.friends,     status: 'started', totalModules: 2 },
        { id: 'cat-favorites',  title: 'Favorites',  ...CAT_IMAGES.favorites,  status: 'started', totalModules: 2 },
        { id: 'cat-career',      title: 'Career',      ...CAT_IMAGES.career,      status: 'started', totalModules: 2 },
        { id: 'cat-education',   title: 'Education',   ...CAT_IMAGES.education,   status: 'started', totalModules: 2 },
        { id: 'cat-core-values', title: 'Core Values', ...CAT_IMAGES.coreValues,  status: 'started', totalModules: 2 },
      ],
    },
    {
      id: 'life-story',
      title: 'Life Story',
      label: 'Phase 2',
      categories: [
        { id: 'cat-life-chapters',     title: 'Life Chapters',     ...CAT_IMAGES.lifeChapters,     status: 'locked', totalModules: 3 },
        { id: 'cat-greatest-memories', title: 'Greatest Memories', ...CAT_IMAGES.greatestMemories, status: 'locked', totalModules: 3 },
      ],
    },
    {
      id: 'your-legacy',
      title: 'Leave Your Legacy',
      label: 'Phase 3',
      categories: [
        { id: 'cat-wisdom', title: 'Wisdom & Advice', ...CAT_IMAGES.wisdom, status: 'locked', totalModules: 3 },
      ],
    },
    {
      id: 'keep-growing',
      title: 'Keep Growing',
      label: 'My Study',
      categories: [],
    },
  ],
  categoryDetails: {
    // Family — growing (Module 1 done, Module 2 at zero)
    'cat-family': {
      categoryId: 'cat-family',
      heading: 'Tell us about your family',
      subtitle: 'Complete one more module to earn your star!',
      modules: [
        { id: 'mod-fam-1', title: "Who's in your family", description: 'This module lays the foundation for future exercises.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fam-2', title: 'Tell us about a family member', description: 'Share a story or a memory about someone in your family.', duration: '5min', completed: false, locked: false },
      ],
      familyMembers: [
        { id: 'fm-linda', initial: 'L', name: 'Linda', entryCount: 0 },
        { id: 'fm-mom', initial: 'M', name: 'Mom', entryCount: 0 },
        { id: 'fm-dad', initial: 'D', name: 'Dad', entryCount: 0 },
        { id: 'fm-sarah', initial: 'S', name: 'Sarah', entryCount: 0 },
        { id: 'fm-robert', initial: 'R', name: 'Robert', entryCount: 0 },
        { id: 'fm-james', initial: 'J', name: 'James', entryCount: 0 },
      ],
    },
    // Friends — growing (Module 1 done, Module 2 at zero)
    'cat-friends': {
      categoryId: 'cat-friends',
      heading: 'Tell us about your friends',
      subtitle: 'Complete one more module to earn your star!',
      modules: [
        { id: 'mod-fri-1', title: 'Who are your closest friends', description: 'Share the people who have been there through it all.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fri-2', title: 'A friendship that shaped you', description: 'Tell us about a friend who changed your life.', duration: '5min', completed: false, locked: false },
      ],
      familyMembers: [
        { id: 'fr-tom', initial: 'T', name: 'Tom', entryCount: 0 },
        { id: 'fr-bill', initial: 'B', name: 'Bill', entryCount: 0 },
        { id: 'fr-nancy', initial: 'N', name: 'Nancy', entryCount: 0 },
      ],
    },
    // Career — growing (Module 1 done, Module 2 at zero)
    'cat-career': {
      categoryId: 'cat-career',
      heading: 'Tell us about your career',
      subtitle: 'Complete one more module to earn your star!',
      modules: [
        { id: 'mod-car-1', title: 'Your career journey', description: 'Walk us through the jobs and roles that defined you.', duration: '5min', completed: true, locked: false },
        { id: 'mod-car-2', title: 'Lessons from work', description: 'What did your career teach you about life?', duration: '5min', completed: false, locked: false },
      ],
    },
    // Education — growing (Module 1 done, Module 2 at zero)
    'cat-education': {
      categoryId: 'cat-education',
      heading: 'Tell us about your education',
      subtitle: 'Complete one more module to earn your star!',
      modules: [
        { id: 'mod-edu-1', title: 'Your school years', description: 'Share memories from your time in school.', duration: '5min', completed: true, locked: false },
        { id: 'mod-edu-2', title: 'What education meant to you', description: 'How did learning shape who you became?', duration: '5min', completed: false, locked: false },
      ],
    },
    // Favorites — growing (Module 1 done, Module 2 at zero)
    'cat-favorites': {
      categoryId: 'cat-favorites',
      heading: 'Tell us about your favorites',
      subtitle: 'Complete one more module to earn your star!',
      modules: [
        { id: 'mod-fav-1', title: 'Your favorite things', description: 'Foods, places, songs, movies — the things you love most.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fav-2', title: 'Why they matter', description: 'What makes these favorites special to you?', duration: '5min', completed: false, locked: false },
      ],
    },
    // Core Values — growing (Module 1 done, Module 2 at zero)
    'cat-core-values': {
      categoryId: 'cat-core-values',
      heading: 'Tell us about your core values',
      subtitle: 'Complete one more module to earn your star!',
      modules: [
        { id: 'mod-val-1', title: 'What you stand for', description: 'The principles that have guided your life.', duration: '5min', completed: true, locked: false },
        { id: 'mod-val-2', title: 'Values in action', description: 'Share a time your values were tested.', duration: '5min', completed: false, locked: false },
      ],
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATE 2 — Almost There (5 stars: Core Values Module 2 remaining, Phase 2 still locked)
// ═══════════════════════════════════════════════════════════════════════════════

const state2: DemoConfig = {
  id: 'state-2',
  label: 'State 2',
  foundationStars: 5,
  streak: 5,
  treeImage: TREE_STAGE_2,
  promptCards: [
    { categoryTag: 'Core Values', question: 'Share a time your values were tested — earn your final star.', categoryId: 'cat-core-values', moduleId: 'mod-val-2' },
  ],
  homePhases: [
    {
      id: 'foundation',
      title: 'Foundation',
      label: 'Phase 1',
      categories: [
        { id: 'cat-family',      title: 'Family',      ...CAT_IMAGES.family,      status: 'growing', totalModules: 2 },
        { id: 'cat-friends',     title: 'Friends',     ...CAT_IMAGES.friends,     status: 'growing', totalModules: 2 },
        { id: 'cat-favorites',  title: 'Favorites',  ...CAT_IMAGES.favorites,  status: 'growing', totalModules: 2 },
        { id: 'cat-career',      title: 'Career',      ...CAT_IMAGES.career,      status: 'growing', totalModules: 2 },
        { id: 'cat-education',   title: 'Education',   ...CAT_IMAGES.education,   status: 'growing', totalModules: 2 },
        { id: 'cat-core-values', title: 'Core Values', ...CAT_IMAGES.coreValues,  status: 'started', totalModules: 2 },
      ],
    },
    {
      id: 'life-story',
      title: 'Life Story',
      label: 'Phase 2',
      categories: [
        { id: 'cat-life-chapters',     title: 'Life Chapters',     ...CAT_IMAGES.lifeChapters,     status: 'locked', totalModules: 3 },
        { id: 'cat-greatest-memories', title: 'Greatest Memories', ...CAT_IMAGES.greatestMemories, status: 'locked', totalModules: 3 },
      ],
    },
    {
      id: 'your-legacy',
      title: 'Leave Your Legacy',
      label: 'Phase 3',
      categories: [
        { id: 'cat-wisdom', title: 'Wisdom & Advice', ...CAT_IMAGES.wisdom, status: 'locked', totalModules: 3 },
      ],
    },
    {
      id: 'keep-growing',
      title: 'Keep Growing',
      label: 'My Study',
      categories: [],
    },
  ],
  categoryDetails: {
    // Family — flourishing (both modules complete, star earned)
    'cat-family': {
      categoryId: 'cat-family',
      heading: 'Tell us about your family',
      subtitle: "You've completed all modules — keep adding to your family story!",
      modules: [
        { id: 'mod-fam-1', title: "Who's in your family", description: 'This module lays the foundation for future exercises.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fam-2', title: 'Tell us about a family member', description: 'Share a story or a memory about someone in your family.', duration: '5min', completed: true, locked: false },
      ],
      familyMembers: [
        { id: 'fm-linda', initial: 'L', name: 'Linda', entryCount: 2 },
        { id: 'fm-mom', initial: 'M', name: 'Mom', entryCount: 1 },
        { id: 'fm-dad', initial: 'D', name: 'Dad', entryCount: 1 },
        { id: 'fm-sarah', initial: 'S', name: 'Sarah', entryCount: 1 },
        { id: 'fm-robert', initial: 'R', name: 'Robert', entryCount: 0 },
        { id: 'fm-james', initial: 'J', name: 'James', entryCount: 0 },
      ],
      recentEntries: [
        { id: 'entry-1', memberInitial: 'M', memberName: 'Mom', title: 'Moms Sunday dinners', snippet: 'Every Sunday, Mom would make her famous roast chicken...', date: 'Mar 15, 2026' },
        { id: 'entry-f2', memberInitial: 'D', memberName: 'Dad', title: 'Dad in the workshop', snippet: 'Dad spent every Saturday morning in his workshop...', date: 'Mar 18, 2026' },
      ],
      growthActions: [
        { id: 'ga-1', label: 'Add more family members' },
        { id: 'ga-2', label: 'Reflect on what family means to you' },
        { id: 'ga-3', label: 'Record a story about a family member' },
      ],
      entriesComplete: 5,
      entriesToNextStar: 2,
    },
    // Friends — flourishing
    'cat-friends': {
      categoryId: 'cat-friends',
      heading: 'Tell us about your friends',
      subtitle: "You've completed all modules — keep adding to your friend stories!",
      modules: [
        { id: 'mod-fri-1', title: 'Who are your closest friends', description: 'Share the people who have been there through it all.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fri-2', title: 'A friendship that shaped you', description: 'Tell us about a friend who changed your life.', duration: '5min', completed: true, locked: false },
      ],
      familyMembers: [
        { id: 'fr-tom', initial: 'T', name: 'Tom', entryCount: 2 },
        { id: 'fr-bill', initial: 'B', name: 'Bill', entryCount: 1 },
        { id: 'fr-nancy', initial: 'N', name: 'Nancy', entryCount: 1 },
      ],
      recentEntries: [
        { id: 'entry-2', memberInitial: 'T', memberName: 'Tom', title: 'College roommate days', snippet: 'Tom and I met on the first day of college...', date: 'Mar 12, 2026' },
      ],
      growthActions: [
        { id: 'ga-4', label: 'Add more friends' },
        { id: 'ga-5', label: 'Share a favorite memory with a friend' },
        { id: 'ga-6', label: 'Record a story about a friendship' },
      ],
      entriesComplete: 4,
      entriesToNextStar: 1,
    },
    // Career — flourishing
    'cat-career': {
      categoryId: 'cat-career',
      heading: 'Tell us about your career',
      subtitle: "You've completed all modules — keep adding to your career story!",
      modules: [
        { id: 'mod-car-1', title: 'Your career journey', description: 'Walk us through the jobs and roles that defined you.', duration: '5min', completed: true, locked: false },
        { id: 'mod-car-2', title: 'Lessons from work', description: 'What did your career teach you about life?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-7', label: 'Share a career milestone' },
        { id: 'ga-8', label: 'Reflect on your professional growth' },
        { id: 'ga-9', label: 'Record advice for someone starting out' },
      ],
      entriesComplete: 4,
      entriesToNextStar: 1,
    },
    // Education — flourishing
    'cat-education': {
      categoryId: 'cat-education',
      heading: 'Tell us about your education',
      subtitle: "You've completed all modules — keep adding to your education story!",
      modules: [
        { id: 'mod-edu-1', title: 'Your school years', description: 'Share memories from your time in school.', duration: '5min', completed: true, locked: false },
        { id: 'mod-edu-2', title: 'What education meant to you', description: 'How did learning shape who you became?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-10', label: 'Share a favorite teacher story' },
        { id: 'ga-11', label: 'Reflect on a lesson that stuck with you' },
        { id: 'ga-12', label: 'Record advice about education' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    // Favorites — flourishing
    'cat-favorites': {
      categoryId: 'cat-favorites',
      heading: 'Tell us about your favorites',
      subtitle: "You've completed all modules — keep exploring your favorites!",
      modules: [
        { id: 'mod-fav-1', title: 'Your favorite things', description: 'Foods, places, songs, movies — the things you love most.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fav-2', title: 'Why they matter', description: 'What makes these favorites special to you?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-13', label: 'Share a favorite childhood memory' },
        { id: 'ga-14', label: 'Record your all-time favorite song' },
        { id: 'ga-15', label: 'Tell us about a favorite place' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    // Core Values — started (Module 1 done, Module 2 unlocked but not done — last star remaining)
    'cat-core-values': {
      categoryId: 'cat-core-values',
      heading: 'Tell us about your core values',
      subtitle: 'Complete one more module to earn your final star!',
      modules: [
        { id: 'mod-val-1', title: 'What you stand for', description: 'The principles that have guided your life.', duration: '5min', completed: true, locked: false },
        { id: 'mod-val-2', title: 'Values in action', description: 'Share a time your values were tested.', duration: '5min', completed: false, locked: false },
      ],
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATE 3 — Foundation Complete, Phase 2 Just Opened (6 of 6 stars)
// ═══════════════════════════════════════════════════════════════════════════════

const state3: DemoConfig = {
  id: 'state-3',
  label: 'State 3',
  foundationStars: 6,
  streak: 7,
  treeImage: TREE_STAGE_3,
  promptCards: [
    { categoryTag: 'Life Chapters', question: 'Define the major chapters of your life story.', categoryId: 'cat-life-chapters', moduleId: 'mod-lc-1' },
    { categoryTag: 'Wisdom & Advice', question: 'Rapid-fire wisdom prompts to capture your instincts.', categoryId: 'cat-wisdom', moduleId: 'mod-wis-1' },
  ],
  homePhases: [
    {
      id: 'foundation',
      title: 'Foundation',
      label: 'Phase 1',
      categories: [
        { id: 'cat-family',      title: 'Family',      ...CAT_IMAGES.family,      status: 'flourishing', totalModules: 2 },
        { id: 'cat-friends',     title: 'Friends',     ...CAT_IMAGES.friends,     status: 'flourishing', totalModules: 2 },
        { id: 'cat-favorites',  title: 'Favorites',  ...CAT_IMAGES.favorites,  status: 'flourishing', totalModules: 2 },
        { id: 'cat-career',      title: 'Career',      ...CAT_IMAGES.career,      status: 'flourishing', totalModules: 2 },
        { id: 'cat-education',   title: 'Education',   ...CAT_IMAGES.education,   status: 'flourishing', totalModules: 2 },
        { id: 'cat-core-values', title: 'Core Values', ...CAT_IMAGES.coreValues,  status: 'flourishing', totalModules: 2 },
      ],
    },
    {
      id: 'life-story',
      title: 'Life Story',
      label: 'Phase 2',
      categories: [],
    },
    {
      id: 'your-legacy',
      title: 'Leave Your Legacy',
      label: 'Phase 3',
      categories: [
        { id: 'cat-wisdom',           title: 'Wisdom & Advice',   ...CAT_IMAGES.wisdom,           status: 'not_started', totalModules: 3 },
        { id: 'cat-greatest-memories', title: 'Greatest Memories', ...CAT_IMAGES.greatestMemories, status: 'not_started', totalModules: 3 },
      ],
    },
    {
      id: 'keep-growing',
      title: 'Keep Growing',
      label: 'My Study',
      categories: [],
    },
  ],
  categoryDetails: {
    // All 6 Foundation — flourishing (CompleteContent)
    'cat-family': {
      categoryId: 'cat-family',
      heading: 'Tell us about your family',
      subtitle: "You've completed all modules — keep adding to your family story!",
      modules: [
        { id: 'mod-fam-1', title: "Who's in your family", description: 'This module lays the foundation for future exercises.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fam-2', title: 'Tell us about a family member', description: 'Share a story or a memory about someone in your family.', duration: '5min', completed: true, locked: false },
      ],
      familyMembers: [
        { id: 'fm-linda', initial: 'L', name: 'Linda', entryCount: 2 },
        { id: 'fm-mom', initial: 'M', name: 'Mom', entryCount: 1 },
        { id: 'fm-dad', initial: 'D', name: 'Dad', entryCount: 1 },
        { id: 'fm-sarah', initial: 'S', name: 'Sarah', entryCount: 1 },
        { id: 'fm-robert', initial: 'R', name: 'Robert', entryCount: 0 },
        { id: 'fm-james', initial: 'J', name: 'James', entryCount: 0 },
      ],
      recentEntries: [
        { id: 'entry-1', memberInitial: 'M', memberName: 'Mom', title: 'Moms Sunday dinners', snippet: 'Every Sunday, Mom would make her famous roast chicken...', date: 'Mar 15, 2026' },
        { id: 'entry-f2', memberInitial: 'D', memberName: 'Dad', title: 'Dad in the workshop', snippet: 'Dad spent every Saturday morning in his workshop...', date: 'Mar 18, 2026' },
      ],
      growthActions: [
        { id: 'ga-1', label: 'Add more family members' },
        { id: 'ga-2', label: 'Reflect on what family means to you' },
        { id: 'ga-3', label: 'Record a story about a family member' },
      ],
      entriesComplete: 5,
      entriesToNextStar: 2,
    },
    'cat-friends': {
      categoryId: 'cat-friends',
      heading: 'Tell us about your friends',
      subtitle: "You've completed all modules — keep adding to your friend stories!",
      modules: [
        { id: 'mod-fri-1', title: 'Who are your closest friends', description: 'Share the people who have been there through it all.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fri-2', title: 'A friendship that shaped you', description: 'Tell us about a friend who changed your life.', duration: '5min', completed: true, locked: false },
      ],
      familyMembers: [
        { id: 'fr-tom', initial: 'T', name: 'Tom', entryCount: 2 },
        { id: 'fr-bill', initial: 'B', name: 'Bill', entryCount: 1 },
        { id: 'fr-nancy', initial: 'N', name: 'Nancy', entryCount: 1 },
      ],
      recentEntries: [
        { id: 'entry-2', memberInitial: 'T', memberName: 'Tom', title: 'College roommate days', snippet: 'Tom and I met on the first day of college...', date: 'Mar 12, 2026' },
      ],
      growthActions: [
        { id: 'ga-4', label: 'Add more friends' },
        { id: 'ga-5', label: 'Share a favorite memory with a friend' },
        { id: 'ga-6', label: 'Record a story about a friendship' },
      ],
      entriesComplete: 4,
      entriesToNextStar: 1,
    },
    'cat-career': {
      categoryId: 'cat-career',
      heading: 'Tell us about your career',
      subtitle: "You've completed all modules — keep adding to your career story!",
      modules: [
        { id: 'mod-car-1', title: 'Your career journey', description: 'Walk us through the jobs and roles that defined you.', duration: '5min', completed: true, locked: false },
        { id: 'mod-car-2', title: 'Lessons from work', description: 'What did your career teach you about life?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-7', label: 'Share a career milestone' },
        { id: 'ga-8', label: 'Reflect on your professional growth' },
        { id: 'ga-9', label: 'Record advice for someone starting out' },
      ],
      entriesComplete: 4,
      entriesToNextStar: 1,
    },
    'cat-education': {
      categoryId: 'cat-education',
      heading: 'Tell us about your education',
      subtitle: "You've completed all modules — keep adding to your education story!",
      modules: [
        { id: 'mod-edu-1', title: 'Your school years', description: 'Share memories from your time in school.', duration: '5min', completed: true, locked: false },
        { id: 'mod-edu-2', title: 'What education meant to you', description: 'How did learning shape who you became?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-10', label: 'Share a favorite teacher story' },
        { id: 'ga-11', label: 'Reflect on a lesson that stuck with you' },
        { id: 'ga-12', label: 'Record advice about education' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    'cat-favorites': {
      categoryId: 'cat-favorites',
      heading: 'Tell us about your favorites',
      subtitle: "You've completed all modules — keep exploring your favorites!",
      modules: [
        { id: 'mod-fav-1', title: 'Your favorite things', description: 'Foods, places, songs, movies — the things you love most.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fav-2', title: 'Why they matter', description: 'What makes these favorites special to you?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-13', label: 'Share a favorite childhood memory' },
        { id: 'ga-14', label: 'Record your all-time favorite song' },
        { id: 'ga-15', label: 'Tell us about a favorite place' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    'cat-core-values': {
      categoryId: 'cat-core-values',
      heading: 'Tell us about your core values',
      subtitle: "You've completed all modules — keep reflecting on your values!",
      modules: [
        { id: 'mod-val-1', title: 'What you stand for', description: 'The principles that have guided your life.', duration: '5min', completed: true, locked: false },
        { id: 'mod-val-2', title: 'Values in action', description: 'Share a time your values were tested.', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-16', label: 'Reflect on how your values evolved' },
        { id: 'ga-17', label: 'Share a value you want to pass on' },
        { id: 'ga-18', label: 'Record a story about standing by your beliefs' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    // Phase 2 — chapters are driven by AppProvider lifeChapters state, no category detail needed
    'cat-wisdom': {
      categoryId: 'cat-wisdom',
      heading: 'Share Your Wisdom',
      subtitle: 'Pass on the lessons life has taught you',
      modules: [
        { id: 'mod-wis-1', title: 'Quick Wisdom Round', description: 'Rapid-fire wisdom prompts to capture your instincts.', duration: '5min', completed: false, locked: false },
        { id: 'mod-wis-2', title: 'Lessons Learned', description: 'The biggest lessons from your life experiences.', duration: '10min', completed: false, locked: true },
        { id: 'mod-wis-3', title: 'Keys to Life', description: 'Your personal philosophy distilled.', duration: '10min', completed: false, locked: true },
      ],
    },
    'cat-greatest-memories': {
      categoryId: 'cat-greatest-memories',
      heading: 'Your Greatest Memories',
      subtitle: 'The moments that defined your life',
      modules: [
        { id: 'mod-gm-1', title: 'Define Your Moments', description: 'Identify the memories that matter most.', duration: '10min', completed: false, locked: false },
        { id: 'mod-gm-2', title: 'Tell Each Story', description: 'Bring each memory to life with rich detail.', duration: '15min', completed: false, locked: true },
      ],
    },
    // Phase 3 — not_started (ZeroStateContent)
    'cat-letters': {
      categoryId: 'cat-letters',
      heading: 'Letters to Loved Ones',
      subtitle: 'Write personal messages to the people who matter most',
      modules: [
        { id: 'mod-let-1', title: 'Define recipients', description: 'Choose who you want to write to.', duration: '5min', completed: false, locked: false },
        { id: 'mod-let-2', title: 'Write your letters', description: 'Compose personal letters to each recipient.', duration: '15min', completed: false, locked: true },
      ],
    },
    'cat-voice-messages': {
      categoryId: 'cat-voice-messages',
      heading: 'Voice Messages',
      subtitle: 'Record messages in your own voice',
      modules: [
        { id: 'mod-vm-1', title: 'Record messages', description: 'Leave voice messages for your loved ones.', duration: '10min', completed: false, locked: false },
      ],
    },
    'cat-memoir': {
      categoryId: 'cat-memoir',
      heading: 'How I Hope to Be Remembered',
      subtitle: 'Reflect on the legacy you want to leave',
      modules: [
        { id: 'mod-mem-1', title: 'AI-guided conversation', description: 'A deep conversation about your legacy.', duration: '15min', completed: false, locked: false },
        { id: 'mod-mem-2', title: 'Edit & refine', description: 'Shape your memoir into its final form.', duration: '10min', completed: false, locked: true },
      ],
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATE 4 — Deep Progress (Chapters defined with progress, Phase 3 started)
// ═══════════════════════════════════════════════════════════════════════════════

const state4: DemoConfig = {
  id: 'state-4',
  label: 'State 4',
  foundationStars: 6,
  streak: 10,
  treeImage: TREE_STAGE_3,
  promptCards: [
    { categoryTag: 'Wisdom & Advice', question: 'Your personal philosophy distilled.', categoryId: 'cat-wisdom', moduleId: 'mod-wis-3' },
    { categoryTag: 'Greatest Memories', question: 'Identify the memories that matter most.', categoryId: 'cat-greatest-memories', moduleId: 'mod-gm-1' },
  ],
  mockLifeChapters: [
    { id: 'ch-early', title: 'Early Years', startYear: 1950, endYear: 1968, step1Status: 'complete', step2Status: 'not_started', starsEarned: 1 },
    { id: 'ch-coming', title: 'Coming of Age', startYear: 1968, endYear: 1974, step1Status: 'complete', step2Status: 'complete', starsEarned: 2 },
    { id: 'ch-young', title: 'Young Adult', startYear: 1974, endYear: 1982, step1Status: 'complete', step2Status: 'not_started', starsEarned: 1 },
    { id: 'ch-building', title: 'Building a Life', startYear: 1982, endYear: 1995, step1Status: 'not_started', step2Status: 'not_started', starsEarned: 0 },
    { id: 'ch-middle', title: 'Middle Years', startYear: 1995, endYear: 2010, step1Status: 'not_started', step2Status: 'not_started', starsEarned: 0 },
    { id: 'ch-recent', title: 'Recent Years', startYear: 2010, endYear: 'Present', step1Status: 'not_started', step2Status: 'not_started', starsEarned: 0 },
  ],
  homePhases: [
    {
      id: 'foundation',
      title: 'Foundation',
      label: 'Phase 1',
      categories: [
        { id: 'cat-family',      title: 'Family',      ...CAT_IMAGES.family,      status: 'flourishing', totalModules: 2 },
        { id: 'cat-friends',     title: 'Friends',     ...CAT_IMAGES.friends,     status: 'flourishing', totalModules: 2 },
        { id: 'cat-favorites',  title: 'Favorites',  ...CAT_IMAGES.favorites,  status: 'flourishing', totalModules: 2 },
        { id: 'cat-career',      title: 'Career',      ...CAT_IMAGES.career,      status: 'flourishing', totalModules: 2 },
        { id: 'cat-education',   title: 'Education',   ...CAT_IMAGES.education,   status: 'flourishing', totalModules: 2 },
        { id: 'cat-core-values', title: 'Core Values', ...CAT_IMAGES.coreValues,  status: 'flourishing', totalModules: 2 },
      ],
    },
    {
      id: 'life-story',
      title: 'Life Story',
      label: 'Phase 2',
      categories: [],
    },
    {
      id: 'your-legacy',
      title: 'Leave Your Legacy',
      label: 'Phase 3',
      categories: [
        { id: 'cat-wisdom',           title: 'Wisdom & Advice',   ...CAT_IMAGES.wisdom,           status: 'growing',     totalModules: 3 },
        { id: 'cat-greatest-memories', title: 'Greatest Memories', ...CAT_IMAGES.greatestMemories, status: 'not_started', totalModules: 3 },
      ],
    },
    {
      id: 'keep-growing',
      title: 'Keep Growing',
      label: 'My Study',
      categories: [],
    },
  ],
  categoryDetails: {
    // All 6 Foundation — flourishing (CompleteContent)
    'cat-family': {
      categoryId: 'cat-family',
      heading: 'Tell us about your family',
      subtitle: "You've completed all modules — keep adding to your family story!",
      modules: [
        { id: 'mod-fam-1', title: "Who's in your family", description: 'This module lays the foundation for future exercises.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fam-2', title: 'Tell us about a family member', description: 'Share a story or a memory about someone in your family.', duration: '5min', completed: true, locked: false },
      ],
      familyMembers: [
        { id: 'fm-linda', initial: 'L', name: 'Linda', entryCount: 2 },
        { id: 'fm-mom', initial: 'M', name: 'Mom', entryCount: 1 },
        { id: 'fm-dad', initial: 'D', name: 'Dad', entryCount: 1 },
        { id: 'fm-sarah', initial: 'S', name: 'Sarah', entryCount: 1 },
        { id: 'fm-robert', initial: 'R', name: 'Robert', entryCount: 0 },
        { id: 'fm-james', initial: 'J', name: 'James', entryCount: 0 },
      ],
      recentEntries: [
        { id: 'entry-1', memberInitial: 'M', memberName: 'Mom', title: 'Moms Sunday dinners', snippet: 'Every Sunday, Mom would make her famous roast chicken...', date: 'Mar 15, 2026' },
        { id: 'entry-f2', memberInitial: 'D', memberName: 'Dad', title: 'Dad in the workshop', snippet: 'Dad spent every Saturday morning in his workshop...', date: 'Mar 18, 2026' },
      ],
      growthActions: [
        { id: 'ga-1', label: 'Add more family members' },
        { id: 'ga-2', label: 'Reflect on what family means to you' },
        { id: 'ga-3', label: 'Record a story about a family member' },
      ],
      entriesComplete: 5,
      entriesToNextStar: 2,
    },
    'cat-friends': {
      categoryId: 'cat-friends',
      heading: 'Tell us about your friends',
      subtitle: "You've completed all modules — keep adding to your friend stories!",
      modules: [
        { id: 'mod-fri-1', title: 'Who are your closest friends', description: 'Share the people who have been there through it all.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fri-2', title: 'A friendship that shaped you', description: 'Tell us about a friend who changed your life.', duration: '5min', completed: true, locked: false },
      ],
      familyMembers: [
        { id: 'fr-tom', initial: 'T', name: 'Tom', entryCount: 2 },
        { id: 'fr-bill', initial: 'B', name: 'Bill', entryCount: 1 },
        { id: 'fr-nancy', initial: 'N', name: 'Nancy', entryCount: 1 },
      ],
      recentEntries: [
        { id: 'entry-2', memberInitial: 'T', memberName: 'Tom', title: 'College roommate days', snippet: 'Tom and I met on the first day of college...', date: 'Mar 12, 2026' },
      ],
      growthActions: [
        { id: 'ga-4', label: 'Add more friends' },
        { id: 'ga-5', label: 'Share a favorite memory with a friend' },
        { id: 'ga-6', label: 'Record a story about a friendship' },
      ],
      entriesComplete: 4,
      entriesToNextStar: 1,
    },
    'cat-career': {
      categoryId: 'cat-career',
      heading: 'Tell us about your career',
      subtitle: "You've completed all modules — keep adding to your career story!",
      modules: [
        { id: 'mod-car-1', title: 'Your career journey', description: 'Walk us through the jobs and roles that defined you.', duration: '5min', completed: true, locked: false },
        { id: 'mod-car-2', title: 'Lessons from work', description: 'What did your career teach you about life?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-7', label: 'Share a career milestone' },
        { id: 'ga-8', label: 'Reflect on your professional growth' },
        { id: 'ga-9', label: 'Record advice for someone starting out' },
      ],
      entriesComplete: 4,
      entriesToNextStar: 1,
    },
    'cat-education': {
      categoryId: 'cat-education',
      heading: 'Tell us about your education',
      subtitle: "You've completed all modules — keep adding to your education story!",
      modules: [
        { id: 'mod-edu-1', title: 'Your school years', description: 'Share memories from your time in school.', duration: '5min', completed: true, locked: false },
        { id: 'mod-edu-2', title: 'What education meant to you', description: 'How did learning shape who you became?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-10', label: 'Share a favorite teacher story' },
        { id: 'ga-11', label: 'Reflect on a lesson that stuck with you' },
        { id: 'ga-12', label: 'Record advice about education' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    'cat-favorites': {
      categoryId: 'cat-favorites',
      heading: 'Tell us about your favorites',
      subtitle: "You've completed all modules — keep exploring your favorites!",
      modules: [
        { id: 'mod-fav-1', title: 'Your favorite things', description: 'Foods, places, songs, movies — the things you love most.', duration: '5min', completed: true, locked: false },
        { id: 'mod-fav-2', title: 'Why they matter', description: 'What makes these favorites special to you?', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-13', label: 'Share a favorite childhood memory' },
        { id: 'ga-14', label: 'Record your all-time favorite song' },
        { id: 'ga-15', label: 'Tell us about a favorite place' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    'cat-core-values': {
      categoryId: 'cat-core-values',
      heading: 'Tell us about your core values',
      subtitle: "You've completed all modules — keep reflecting on your values!",
      modules: [
        { id: 'mod-val-1', title: 'What you stand for', description: 'The principles that have guided your life.', duration: '5min', completed: true, locked: false },
        { id: 'mod-val-2', title: 'Values in action', description: 'Share a time your values were tested.', duration: '5min', completed: true, locked: false },
      ],
      growthActions: [
        { id: 'ga-16', label: 'Reflect on how your values evolved' },
        { id: 'ga-17', label: 'Share a value you want to pass on' },
        { id: 'ga-18', label: 'Record a story about standing by your beliefs' },
      ],
      entriesComplete: 3,
      entriesToNextStar: 2,
    },
    // Phase 2 — chapters driven by mockLifeChapters, no category detail needed
    // Phase 3 — Wisdom & Advice: growing (StartedContent)
    'cat-wisdom': {
      categoryId: 'cat-wisdom',
      heading: 'Share Your Wisdom',
      subtitle: 'Quick Wisdom and Lessons done — Keys to Life awaits!',
      modules: [
        { id: 'mod-wis-1', title: 'Quick Wisdom Round', description: 'Rapid-fire wisdom prompts to capture your instincts.', duration: '5min', completed: true, locked: false },
        { id: 'mod-wis-2', title: 'Lessons Learned', description: 'The biggest lessons from your life experiences.', duration: '10min', completed: true, locked: false },
        { id: 'mod-wis-3', title: 'Keys to Life', description: 'Your personal philosophy distilled.', duration: '10min', completed: false, locked: false },
      ],
      recentEntries: [
        { id: 'entry-w1', memberInitial: 'W', memberName: 'Wisdom', title: 'On perseverance', snippet: 'The only thing that ever really mattered was not giving up...', date: 'Mar 19, 2026' },
      ],
      growthActions: [
        { id: 'ga-w1', label: 'Complete Keys to Life' },
        { id: 'ga-w2', label: 'Share another life lesson' },
      ],
      entriesComplete: 2,
      entriesToNextStar: 1,
    },
    // Phase 3 — Greatest Memories: not_started (ZeroStateContent)
    'cat-greatest-memories': {
      categoryId: 'cat-greatest-memories',
      heading: 'Your Greatest Memories',
      subtitle: 'The moments that defined your life',
      modules: [
        { id: 'mod-gm-1', title: 'Define Your Moments', description: 'Identify the memories that matter most.', duration: '10min', completed: false, locked: false },
        { id: 'mod-gm-2', title: 'Tell Each Story', description: 'Bring each memory to life with rich detail.', duration: '15min', completed: false, locked: true },
      ],
    },
    // Phase 3 — Letters: growing (StartedContent)
    'cat-letters': {
      categoryId: 'cat-letters',
      heading: 'Letters to Loved Ones',
      subtitle: '1 letter drafted — keep writing!',
      modules: [
        { id: 'mod-let-1', title: 'Define recipients', description: 'Choose who you want to write to.', duration: '5min', completed: true, locked: false },
        { id: 'mod-let-2', title: 'Write your letters', description: 'Compose personal letters to each recipient.', duration: '15min', completed: false, locked: false },
      ],
      recentEntries: [
        { id: 'entry-lt1', memberInitial: 'S', memberName: 'Sarah', title: 'Letter to Sarah', snippet: 'Dear Sarah, I want you to know how proud I am of the woman you\'ve become...', date: 'Mar 21, 2026' },
      ],
      growthActions: [
        { id: 'ga-lt1', label: 'Write another letter' },
        { id: 'ga-lt2', label: 'Record a voice message instead' },
      ],
      entriesComplete: 1,
      entriesToNextStar: 2,
    },
    // Phase 3 — Voice Messages: not_started (ZeroStateContent)
    'cat-voice-messages': {
      categoryId: 'cat-voice-messages',
      heading: 'Voice Messages',
      subtitle: 'Record messages in your own voice',
      modules: [
        { id: 'mod-vm-1', title: 'Record messages', description: 'Leave voice messages for your loved ones.', duration: '10min', completed: false, locked: false },
      ],
    },
    // Phase 3 — Memoir: not_started (ZeroStateContent)
    'cat-memoir': {
      categoryId: 'cat-memoir',
      heading: 'How I Hope to Be Remembered',
      subtitle: 'Reflect on the legacy you want to leave',
      modules: [
        { id: 'mod-mem-1', title: 'AI-guided conversation', description: 'A deep conversation about your legacy.', duration: '15min', completed: false, locked: false },
        { id: 'mod-mem-2', title: 'Edit & refine', description: 'Shape your memoir into its final form.', duration: '10min', completed: false, locked: true },
      ],
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// ONBOARDING — Restart the onboarding flow (navigates to /onboarding)
// ═══════════════════════════════════════════════════════════════════════════════

const onboarding: DemoConfig = {
  id: 'onboarding',
  label: 'Onboarding',
  foundationStars: 0,
  streak: 0,
  treeImage: TREE_STAGE_1,
  promptCards: state0.promptCards,
  homePhases: state0.homePhases,
  categoryDetails: state0.categoryDetails,
}

const audience: DemoConfig = {
  id: 'audience',
  label: 'Audience',
  foundationStars: 0,
  streak: 0,
  treeImage: TREE_STAGE_1,
  promptCards: [],
  homePhases: [],
  categoryDetails: {},
}

// ─── Export all demo states ───────────────────────────────────────────────────

export const demoStates: Record<DemoStateId, DemoConfig> = {
  'onboarding': onboarding,
  'state-0': state0,
  'state-1': state1,
  'state-2': state2,
  'state-3': state3,
  'state-4': state4,
  'audience': audience,
}

export const demoStateOrder: DemoStateId[] = ['onboarding', 'state-0', 'state-1', 'state-2', 'state-3', 'state-4', 'audience']
