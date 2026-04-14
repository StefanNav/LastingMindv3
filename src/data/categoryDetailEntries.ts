import type {
  DemoStateId,
  CategoryDetailEntry,
  CategoryDetailEntriesData,
  PersonEntry,
  CareerEducationEntry,
  FavoriteEntry,
  CoreValueEntry,
} from '@/types'

// ─── Supporting text per category ───────────────────────────────────────────

const SUPPORTING_TEXT: Record<string, string> = {
  'cat-family': "Everyone you've told us about and the stories you've shared.",
  'cat-friends': "The people in your circle and the stories you've shared.",
  'cat-favorites': 'Your answers from the Favorites module.',
  'cat-career': "Your career history and the stories you've shared.",
  'cat-education': "Your education history and the stories you've shared.",
  'cat-core-values': "The values you've shared and reflected on.",
}

// ─── Add More route per category ────────────────────────────────────────────

const ADD_MORE_ROUTES: Record<string, string> = {
  'cat-family': '/conversation/cat-family',
  'cat-friends': '/conversation/cat-friends',
  'cat-favorites': '/favorites',
  'cat-career': '/intro/cat-career',
  'cat-education': '/intro/cat-education',
  'cat-core-values': '/core-values',
}

// ─── Entry templates ────────────────────────────────────────────────────────

// Family
const FAMILY_ENTRIES: PersonEntry[] = [
  {
    kind: 'person', entryId: 'fe-linda', entryType: 'Family member', name: 'Linda', relationshipLabel: 'Wife',
    fullName: 'Linda Mitchell', dateLabel: 'Wife (1975–present)',
    firstPersonBio: 'My partner of 49 years. Linda was the first person to truly understand me. She has this way of knowing exactly what I need before I say a word. We built everything together — our home, our family, our life. I would choose her a thousand times over.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-sarah', entryType: 'Family member', name: 'Sarah', relationshipLabel: 'Daughter',
    fullName: 'Sarah Mitchell-Moore', dateLabel: 'Daughter',
    firstPersonBio: 'My eldest. She got her father\'s eyes and my stubbornness. Sarah moved to Portland after law school and built something remarkable there — a family, a career, a garden that puts mine to shame. She calls every Sunday without fail.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-michael', entryType: 'Family member', name: 'Michael', relationshipLabel: 'Son',
    fullName: 'Michael Mitchell', dateLabel: 'Son',
    firstPersonBio: 'Michael is the quiet one. Always has been. But when he speaks, everyone listens. He became an engineer like his grandfather and works on bridges — actual bridges. I like to think he got that from me, the desire to connect things.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-robert', entryType: 'Family member', name: 'Robert', relationshipLabel: 'Father',
    fullName: 'Robert Whitfield', dateLabel: 'Father (1930–2019)',
    firstPersonBio: 'My father was a quiet man with enormous hands and the warmest laugh you\'d ever hear. He proposed to my mother at the old pier in Beaufort with a ring he\'d saved for three years to buy. He taught me that actions speak louder than words, and he lived that every single day.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-margaret', entryType: 'Family member', name: 'Margaret', relationshipLabel: 'Mother',
    fullName: 'Margaret Whitfield', dateLabel: 'Mother (1932–2021)',
    firstPersonBio: 'Mom held our family together with Sunday dinners and sheer force of will. She could make anyone feel welcome in her kitchen. Even now, when I smell rosemary and lemon, I am right back at that big oak table with all of us together.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-james', entryType: 'Family member', name: 'James', relationshipLabel: 'Brother',
    fullName: 'James Whitfield', dateLabel: 'Brother',
    firstPersonBio: 'James and I fought like cats and dogs growing up, but he is the first person I call when things go sideways. He moved to Austin in the 90s and became a high school football coach. His players adore him, and I understand why — he never gives up on anyone.',
    content: '', inputType: 'text',
  },
]

const FAMILY_ENTRIES_FULL: PersonEntry[] = [
  ...FAMILY_ENTRIES,
  {
    kind: 'person', entryId: 'fe-emily', entryType: 'Family member', name: 'Emily', relationshipLabel: 'Sister',
    fullName: 'Emily Whitfield-Grant', dateLabel: 'Sister',
    firstPersonBio: 'Emily is four years younger than me and has always been the creative one. She paints these enormous canvases that fill entire walls. She lives in Savannah now and every time I visit, she has transformed her house into something new. She reminds me that life is meant to be lived boldly.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-dorothy', entryType: 'Family member', name: 'Dorothy', relationshipLabel: 'Grandmother',
    fullName: 'Dorothy Whitfield', dateLabel: 'Grandmother (1908–1998)',
    firstPersonBio: 'Grandma Dorothy survived the Depression and raised five children on a farm with no running water until 1952. She taught me to play cards and to never complain about hard work. She lived to ninety and was sharp as a tack until the very end.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-thomas', entryType: 'Family member', name: 'Thomas', relationshipLabel: 'Uncle',
    fullName: 'Thomas Whitfield', dateLabel: 'Uncle',
    firstPersonBio: 'Uncle Thomas was Dad\'s older brother and the family storyteller. He could hold a room for hours with tales about growing up on the farm. He served in Korea and never talked about it, but we knew it shaped everything about him.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-catherine', entryType: 'Family member', name: 'Catherine', relationshipLabel: 'Niece',
    fullName: 'Catherine Whitfield', dateLabel: 'Niece',
    firstPersonBio: 'Catherine is James\'s eldest. She is brilliant — got a scholarship to MIT and now works in renewable energy. She reminds me of my mother in the way she takes charge of any room she walks into.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-ava', entryType: 'Family member', name: 'Ava', relationshipLabel: 'Granddaughter',
    fullName: 'Ava Moore', dateLabel: 'Granddaughter',
    firstPersonBio: 'Ava is Sarah\'s little girl. She is eight years old and already knows what she wants to be — a marine biologist. She asks me a hundred questions every time she visits and I try to answer every single one.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-lily', entryType: 'Family member', name: 'Lily', relationshipLabel: 'Granddaughter',
    fullName: 'Lily Mitchell', dateLabel: 'Granddaughter',
    firstPersonBio: 'Lily is Michael\'s daughter. She is only three but she has her grandfather\'s stubbornness and her grandmother\'s smile. When she grabs my hand and says "come on, Grandpa," I will follow her anywhere.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fe-david', entryType: 'Family member', name: 'David', relationshipLabel: 'Son-in-law',
    fullName: 'David Moore', dateLabel: 'Son-in-law',
    firstPersonBio: 'David married Sarah in 2010. He is a carpenter who builds beautiful furniture by hand. The first time he came to dinner, he fixed our wobbly kitchen table without being asked. I knew right then he was family.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person',
    entryId: 'fe-story-mom',
    entryType: 'Family story',
    name: 'Mom',
    relationshipLabel: 'Mother',
    storyTitle: "Mom's Sunday Dinners",
    content: 'Every Sunday, Mom would make her famous roast chicken. The whole house smelled like rosemary and lemon by noon.',
    inputType: 'voice',
    transcript: 'Every Sunday, Mom would make her famous roast chicken. The whole house smelled like rosemary and lemon by noon. We would all gather around the big oak table — all seven of us — and for those few hours, nothing else mattered. It was her way of keeping us together.',
  },
]

// Friends
const FRIENDS_ENTRIES: PersonEntry[] = [
  {
    kind: 'person', entryId: 'fre-tom', entryType: 'Friend', name: 'Tom', relationshipLabel: 'College friend',
    fullName: 'Tom Kessler', dateLabel: 'Friends since 1986',
    firstPersonBio: 'Tom and I met freshman year in a dorm room that smelled like old carpet. We have been inseparable ever since. He went through a really tough time in his 40s — lost his job, went through a divorce — but came back stronger than ever. He taught me that it is never too late to reinvent yourself.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fre-nancy', entryType: 'Friend', name: 'Nancy', relationshipLabel: 'Work friend',
    fullName: 'Nancy Alderman', dateLabel: 'Friends since 1992',
    firstPersonBio: 'Nancy sat in the cubicle next to mine at Boeing for fifteen years. She is the funniest person I have ever met — she could make you laugh on your worst day. When I got the promotion, she was the first to celebrate. When I did not, she was the first to call.',
    content: '', inputType: 'text',
  },
  {
    kind: 'person', entryId: 'fre-bill', entryType: 'Friend', name: 'Bill', relationshipLabel: 'Neighbor',
    fullName: 'Bill Hargrove', dateLabel: 'Friends since 2003',
    firstPersonBio: 'Bill moved in next door twenty years ago and showed up at our front porch with a casserole and a handshake. We have been borrowing each other\'s tools and sharing beers on the patio ever since. He is the kind of neighbor that makes a house feel like a home.',
    content: '', inputType: 'text',
  },
]

const FRIENDS_ENTRIES_FULL: PersonEntry[] = [
  ...FRIENDS_ENTRIES,
  {
    kind: 'person',
    entryId: 'fre-story-tom',
    entryType: 'Friend story',
    name: 'Tom',
    relationshipLabel: 'College friend',
    storyTitle: "Tom's Comeback Story",
    content: 'Tom went through a really tough time in his 40s but came back stronger than ever.',
    inputType: 'voice',
    transcript: 'Tom went through a really tough time in his 40s. Lost his job, went through a divorce. But the way he pulled himself together — went back to school at 45, started a whole new career — it taught me that it is never too late to reinvent yourself.',
  },
]

// Career
const CAREER_ENTRIES_MOD1: CareerEducationEntry[] = [
  {
    kind: 'career-education', entryId: 'ce-boeing', entryType: 'Career position',
    roleName: 'Senior Director', organisation: 'Boeing', dateRange: '1990 – 2020',
    content: '30 years at Boeing, from junior engineer to senior director.',
    inputType: 'text',
  },
  {
    kind: 'career-education', entryId: 'ce-hw', entryType: 'Career position',
    roleName: 'Shop Assistant', organisation: 'Hardware Store', dateRange: '1984 – 1986',
    content: 'First job at 16. Learned the value of showing up on time.',
    inputType: 'text',
  },
]

const CAREER_ENTRIES_FULL: CareerEducationEntry[] = [
  ...CAREER_ENTRIES_MOD1,
  {
    kind: 'career-education', entryId: 'ce-story-promo', entryType: 'Career story',
    roleName: 'The Promotion', organisation: 'Boeing', dateRange: '1995',
    storyTitle: 'The Promotion That Changed Everything',
    content: 'Getting passed over at 35 pushed me to get my MBA.',
    inputType: 'voice',
    transcript: 'Getting passed over at 35 was devastating. But it pushed me to go back to school, get my MBA, and come back stronger. Within two years I had the role I always wanted — and I appreciated it so much more because of the setback.',
  },
]

// Education
const EDUCATION_ENTRIES_MOD1: CareerEducationEntry[] = [
  {
    kind: 'career-education', entryId: 'ee-lincoln', entryType: 'School',
    roleName: 'Lincoln High', organisation: 'High School', dateRange: '1982 – 1986',
    content: 'Where it all started.', inputType: 'text',
  },
  {
    kind: 'career-education', entryId: 'ee-state', entryType: 'School',
    roleName: 'State University', organisation: 'BA History', dateRange: '1986 – 1990',
    content: 'Fell in love with American history.', inputType: 'text',
  },
  {
    kind: 'career-education', entryId: 'ee-wharton', entryType: 'School',
    roleName: 'Wharton', organisation: 'MBA', dateRange: '1995 – 1997',
    content: 'The hardest two years of my life.', inputType: 'text',
  },
]

const EDUCATION_ENTRIES_FULL: CareerEducationEntry[] = [
  ...EDUCATION_ENTRIES_MOD1,
  {
    kind: 'career-education', entryId: 'ee-story-davis', entryType: 'Education story',
    roleName: 'Prof. Davis', organisation: 'State University', dateRange: '1988',
    storyTitle: 'Professor Davis Changed My Path',
    content: 'She taught American history and connected past to present.',
    inputType: 'voice',
    transcript: 'Professor Davis taught American history in a way that made you feel like you were there. She connected the past to the present and made me consider teaching as a career. I never did teach, but her influence shaped how I mentor people at work to this day.',
  },
]

// Favorites
const FAVORITES_ENTRIES_MOD1: FavoriteEntry[] = [
  { kind: 'favorite', entryId: 'fav-pasta', entryType: 'Favorite', categoryLabel: 'Food',   content: 'Pasta', inputType: 'text' },
  { kind: 'favorite', entryId: 'fav-jazz',  entryType: 'Favorite', categoryLabel: 'Music',  content: 'Jazz',  inputType: 'text' },
  { kind: 'favorite', entryId: 'fav-italy', entryType: 'Favorite', categoryLabel: 'Travel', content: 'Italy', inputType: 'text' },
  { kind: 'favorite', entryId: 'fav-godfa', entryType: 'Favorite', categoryLabel: 'Movie',  content: 'The Godfather', inputType: 'text' },
]

const FAVORITES_ENTRIES_FULL: FavoriteEntry[] = [
  {
    kind: 'favorite', entryId: 'fav-pasta-r', entryType: 'Favorite', categoryLabel: 'Food',
    content: 'Pasta',
    inputType: 'voice',
    transcript: "Pasta reminds me of Mom's kitchen. She would make fresh pasta every Sunday — the dough hanging over the backs of chairs to dry. The smell of flour and eggs is the smell of home to me.",
  },
  {
    kind: 'favorite', entryId: 'fav-jazz-r', entryType: 'Favorite', categoryLabel: 'Music',
    content: 'Jazz',
    inputType: 'voice',
    transcript: "Jazz was Dad's world. He had a record player in the den and would play Miles Davis and Coltrane every evening. I did not appreciate it then, but now when I hear a trumpet, I am right back in that room.",
  },
  { kind: 'favorite', entryId: 'fav-italy', entryType: 'Favorite', categoryLabel: 'Travel', content: 'Italy', inputType: 'text' },
  { kind: 'favorite', entryId: 'fav-godfa', entryType: 'Favorite', categoryLabel: 'Movie',  content: 'The Godfather', inputType: 'text' },
]

// Core Values
const CORE_VALUES_ENTRIES_MOD1: CoreValueEntry[] = [
  { kind: 'core-value', entryId: 'cv-honesty', entryType: 'Core value', valueLabel: 'What I Stand For',     content: 'Honesty & Integrity',       inputType: 'text' },
  { kind: 'core-value', entryId: 'cv-family',  entryType: 'Core value', valueLabel: 'What Matters Most',    content: 'Family & Togetherness',     inputType: 'text' },
  { kind: 'core-value', entryId: 'cv-work',    entryType: 'Core value', valueLabel: 'How I Approach Life',  content: 'Hard Work & Perseverance',  inputType: 'text' },
]

const CORE_VALUES_ENTRIES_FULL: CoreValueEntry[] = [
  ...CORE_VALUES_ENTRIES_MOD1,
  {
    kind: 'core-value', entryId: 'cv-story-honesty', entryType: 'Value reflection', valueLabel: 'What I Stand For',
    content: 'Standing By My Beliefs',
    inputType: 'voice',
    transcript: 'There was a time when honesty cost me a deal, but earned me respect. A client wanted me to fudge the numbers on a report. I refused. Lost the contract, but my team trusted me more after that. That is the kind of leader I wanted to be.',
  },
]

// ─── Empty data helper ──────────────────────────────────────────────────────

function emptyData(categoryId: string): CategoryDetailEntriesData {
  return {
    supportingText: SUPPORTING_TEXT[categoryId] ?? '',
    addMoreRoute: ADD_MORE_ROUTES[categoryId] ?? '/home',
    entries: [],
  }
}

function withEntries(categoryId: string, entries: CategoryDetailEntry[]): CategoryDetailEntriesData {
  return {
    supportingText: SUPPORTING_TEXT[categoryId] ?? '',
    addMoreRoute: ADD_MORE_ROUTES[categoryId] ?? '/home',
    entries,
  }
}

// ─── Per-demo-state data ────────────────────────────────────────────────────

type EntriesMap = Record<string, CategoryDetailEntriesData>

const STATE_0_ENTRIES: EntriesMap = {
  'cat-family':      emptyData('cat-family'),
  'cat-friends':     emptyData('cat-friends'),
  'cat-favorites':   emptyData('cat-favorites'),
  'cat-career':      emptyData('cat-career'),
  'cat-education':   emptyData('cat-education'),
  'cat-core-values': emptyData('cat-core-values'),
}

const STATE_1_ENTRIES: EntriesMap = {
  'cat-family':      withEntries('cat-family', FAMILY_ENTRIES),
  'cat-friends':     withEntries('cat-friends', FRIENDS_ENTRIES),
  'cat-favorites':   withEntries('cat-favorites', FAVORITES_ENTRIES_MOD1),
  'cat-career':      withEntries('cat-career', CAREER_ENTRIES_MOD1),
  'cat-education':   withEntries('cat-education', EDUCATION_ENTRIES_MOD1),
  'cat-core-values': withEntries('cat-core-values', CORE_VALUES_ENTRIES_MOD1),
}

const STATE_2_ENTRIES: EntriesMap = {
  'cat-family':      withEntries('cat-family', FAMILY_ENTRIES_FULL),
  'cat-friends':     withEntries('cat-friends', FRIENDS_ENTRIES_FULL),
  'cat-favorites':   withEntries('cat-favorites', FAVORITES_ENTRIES_FULL),
  'cat-career':      withEntries('cat-career', CAREER_ENTRIES_FULL),
  'cat-education':   withEntries('cat-education', EDUCATION_ENTRIES_FULL),
  'cat-core-values': withEntries('cat-core-values', CORE_VALUES_ENTRIES_MOD1),
}

const STATE_3_ENTRIES: EntriesMap = {
  ...STATE_2_ENTRIES,
  'cat-core-values': withEntries('cat-core-values', CORE_VALUES_ENTRIES_FULL),
}

const STATE_4_ENTRIES: EntriesMap = STATE_3_ENTRIES

const entriesByState: Record<DemoStateId, EntriesMap> = {
  onboarding: STATE_0_ENTRIES,
  'state-0': STATE_0_ENTRIES,
  'state-1': STATE_1_ENTRIES,
  'state-2': STATE_2_ENTRIES,
  'state-3': STATE_3_ENTRIES,
  'state-4': STATE_4_ENTRIES,
  audience: STATE_0_ENTRIES,
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function getCategoryEntries(
  demoStateId: DemoStateId,
  categoryId: string,
): CategoryDetailEntriesData {
  const stateMap = entriesByState[demoStateId] ?? STATE_0_ENTRIES
  return stateMap[categoryId] ?? emptyData(categoryId)
}
