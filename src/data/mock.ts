import type { LegacyCreator, Phase, HomePhase, CategoryDetail, ModuleIntroData, Module2IntroData, ConversationConfig, ReflectionConfig } from '@/types'

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
      { id: 'cat-family', title: 'Family', image: '/images/Family 1.png', imageHeight: 156, imageWidth: 147, status: 'flourishing', totalModules: 3 },
      { id: 'cat-friends', title: 'Friends', image: '/images/Freinds 1.png', imageHeight: 156, imageWidth: 270, status: 'budding', totalModules: 3 },
      { id: 'cat-career', title: 'Career', image: '/images/Career 1.png', imageHeight: 145, imageWidth: 240, status: 'growing', totalModules: 3 },
      { id: 'cat-education', title: 'Education', image: '/images/Education 1.png', imageHeight: 145, imageWidth: 240, status: 'growing', currentModule: 1, totalModules: 3 },
      { id: 'cat-favourites', title: 'Favourites', image: '/images/Favourites 1.png', imageHeight: 156, imageWidth: 196, status: 'not_started', totalModules: 3 },
      { id: 'cat-core-values', title: 'Core Values', image: '/images/Core Values 1.png', imageHeight: 145, imageWidth: 250, status: 'not_started', totalModules: 3 },
    ],
  },
  {
    id: 'life-story',
    title: 'Life Story',
    label: 'Phase 2',
    categories: [
      { id: 'cat-life-chapters', title: 'Life Chapters', image: '/images/Life chapters 1.png', imageHeight: 156, imageWidth: 252, status: 'flourishing', totalModules: 3 },
      { id: 'cat-wisdom', title: 'Wisdom', image: '/images/Wisdom 1.png', imageHeight: 156, imageWidth: 219, status: 'budding', totalModules: 3 },
      { id: 'cat-greatest-memories', title: 'Greatest Memories', image: '/images/Greatest Memories 1.png', imageHeight: 156, imageWidth: 270, status: 'growing', totalModules: 3 },
    ],
  },
  {
    id: 'your-legacy',
    title: 'Your Legacy',
    label: 'Phase 3',
    categories: [
      { id: 'cat-letters', title: 'Letters to Loved Ones', image: '/images/Letters to loved ones 1.png', imageHeight: 156, imageWidth: 303, status: 'flourishing', totalModules: 3 },
      { id: 'cat-voice-messages', title: 'Voice Messages', image: '/images/Voice message 1.png', imageHeight: 156, imageWidth: 233, status: 'budding', totalModules: 3 },
      { id: 'cat-memoir', title: 'Memoir', image: '/images/Memoir 1.png', imageHeight: 156, imageWidth: 268, status: 'growing', totalModules: 3 },
    ],
  },
  {
    id: 'keep-growing',
    title: 'Keep Growing',
    label: 'Phase 4',
    categories: [
      { id: 'cat-open-journaling', title: 'Open Journaling', image: '/images/Open Journaling 1.png', imageHeight: 156, imageWidth: 236, status: 'flourishing', totalModules: 3 },
      { id: 'cat-questions-loved-ones', title: 'Questions from Loved Ones', image: '/images/Questions from Loved ones.png', imageHeight: 156, imageWidth: 238, status: 'budding', totalModules: 3 },
      { id: 'cat-reflective-questions', title: 'Reflective Questions', image: '/images/Reflective Questions.png', imageHeight: 156, imageWidth: 252, status: 'growing', totalModules: 3 },
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

export const foundationIntroData: Record<string, ModuleIntroData> = {
  'cat-family': {
    categoryId: 'cat-family',
    categoryLabel: 'Family',
    image: '/images/Family 1.png',
    imageHeight: 156,
    moduleTitle: "Who's in your family",
    description: "We'll have a quick conversation about the people closest to you. Just talk naturally, there are no wrong answers.",
  },
  'cat-friends': {
    categoryId: 'cat-friends',
    categoryLabel: 'Friends',
    image: '/images/Freinds 1.png',
    imageHeight: 156,
    moduleTitle: 'Your Friend Circle',
    description: "We'll have a quick conversation about the friends who've shaped your life. Just speak naturally. There are no wrong answers.",
  },
  'cat-career': {
    categoryId: 'cat-career',
    categoryLabel: 'Career',
    image: '/images/Career 1.png',
    imageHeight: 145,
    moduleTitle: 'Your Career Journey',
    description: "We'll have a quick conversation about the roles you've held and the path that brought you here. Just talk naturally, there are no wrong answers.",
  },
  'cat-education': {
    categoryId: 'cat-education',
    categoryLabel: 'Education',
    image: '/images/Education 1.png',
    imageHeight: 145,
    moduleTitle: 'Your School Years',
    description: "We'll have a quick conversation about the places you learned and the experiences that shaped your mind. Just talk naturally, there are no wrong answers.",
  },
  'cat-favourites': {
    categoryId: 'cat-favourites',
    categoryLabel: 'Favourites',
    image: '/images/Favourites 1.png',
    imageHeight: 156,
    moduleTitle: 'Your Favourite Things',
    description: "We'll have a quick conversation about the things you love most — foods, places, songs, and more. Just talk naturally, there are no wrong answers.",
  },
  'cat-core-values': {
    categoryId: 'cat-core-values',
    categoryLabel: 'Core Values',
    image: '/images/Core Values 1.png',
    imageHeight: 145,
    moduleTitle: 'What You Stand For',
    description: "We'll have a quick conversation about the principles and beliefs that have guided your life. Just talk naturally, there are no wrong answers.",
  },
}

export const module2IntroData: Record<string, Module2IntroData> = {
  'cat-family': {
    categoryId: 'cat-family',
    categoryLabel: 'Family',
    image: '/images/Family 1.png',
    imageWidth: 132,
    moduleTitle: 'Tell us about a family member',
    description: 'Pick someone from your family and share a memory.',
    selectionType: 'chips',
    disabledButtonText: 'Choose someone to begin',
    options: [
      { id: 'fm-linda', label: 'Linda' },
      { id: 'fm-mom', label: 'Mom' },
      { id: 'fm-dad', label: 'Dad' },
      { id: 'fm-sarah', label: 'Sarah' },
      { id: 'fm-robert', label: 'Robert' },
      { id: 'fm-james', label: 'James' },
      { id: 'fm-decide', label: "I'll decide as I go" },
    ],
  },
  'cat-friends': {
    categoryId: 'cat-friends',
    categoryLabel: 'Friends',
    image: '/images/Freinds 1.png',
    imageWidth: 242,
    moduleTitle: 'Tell us about a friend',
    description: 'Pick someone from your friend circle and share a memory.',
    selectionType: 'chips',
    disabledButtonText: 'Choose someone to begin',
    options: [
      { id: 'fr-linda', label: 'Linda C.' },
      { id: 'fr-sara', label: 'Sara C.' },
      { id: 'fr-michael', label: 'Michael T.' },
      { id: 'fr-sarah', label: 'Sarah C.' },
      { id: 'fr-robert', label: 'Robert C.' },
      { id: 'fr-james', label: 'James B.' },
      { id: 'fr-decide', label: "I'll decide as I go" },
    ],
  },
  'cat-career': {
    categoryId: 'cat-career',
    categoryLabel: 'Career',
    image: '/images/Career 1.png',
    imageWidth: 233,
    moduleTitle: 'Share a work story',
    description: 'Pick a role, then share a story or memory from that time. Just talk naturally.',
    selectionType: 'radio-cards',
    disabledButtonText: 'Select a role to begin',
    options: [
      { id: 'car-spm', label: 'Senior Product Manager', subtitle: 'Meridian Health Systems' },
      { id: 'car-pm', label: 'Product Manager', subtitle: 'Northgate Software' },
      { id: 'car-ba', label: 'Business Analyst', subtitle: 'Deloitte Consulting' },
      { id: 'car-mgr', label: 'Manager', subtitle: 'Meridian Health Systems' },
    ],
  },
  'cat-education': {
    categoryId: 'cat-education',
    categoryLabel: 'Education',
    image: '/images/Education 1.png',
    imageWidth: 242,
    moduleTitle: 'Share a school story',
    description: 'Pick a school or program, then share a story or memory from that time. Just talk naturally.',
    selectionType: 'radio-cards',
    disabledButtonText: 'Select a school to begin',
    options: [
      { id: 'edu-ba', label: 'BA History', subtitle: 'State University' },
      { id: 'edu-hs', label: 'High School Diploma', subtitle: 'Lincoln High School' },
      { id: 'edu-mba', label: 'MBA', subtitle: 'Wharton Business School' },
      { id: 'edu-aa', label: 'Associate Degree', subtitle: 'Greenfield Community College' },
    ],
  },
  'cat-favourites': {
    categoryId: 'cat-favourites',
    categoryLabel: 'Favourites',
    image: '/images/Favourites 1.png',
    imageWidth: 242,
    moduleTitle: 'Why they matter',
    description: 'Pick a category, then tell us what makes it special to you. Just talk naturally.',
    selectionType: 'radio-cards',
    disabledButtonText: 'Select a category to begin',
    options: [
      { id: 'fav-food', label: 'Food & Cooking', subtitle: 'Recipes, meals, and flavours you love' },
      { id: 'fav-music', label: 'Music & Songs', subtitle: 'The soundtrack to your life' },
      { id: 'fav-places', label: 'Places & Travel', subtitle: 'Destinations that stayed with you' },
      { id: 'fav-movies', label: 'Movies & Shows', subtitle: 'Stories that moved you' },
    ],
  },
  'cat-core-values': {
    categoryId: 'cat-core-values',
    categoryLabel: 'Core Values',
    image: '/images/Core Values 1.png',
    imageWidth: 242,
    moduleTitle: 'Values in action',
    description: 'Pick a value, then share a time it was tested or proved true. Just talk naturally.',
    selectionType: 'radio-cards',
    disabledButtonText: 'Select a value to begin',
    options: [
      { id: 'val-honesty', label: 'Honesty & Integrity', subtitle: 'Being truthful even when it was hard' },
      { id: 'val-family', label: 'Family & Togetherness', subtitle: 'Putting loved ones first' },
      { id: 'val-work', label: 'Hard Work & Perseverance', subtitle: 'Pushing through when it mattered' },
      { id: 'val-faith', label: 'Faith & Spirituality', subtitle: 'The beliefs that anchored you' },
    ],
  },
}

export const reflectionConfigs: Record<string, ReflectionConfig> = {
  'cat-family': {
    categoryId: 'cat-family',
    moduleId: 'mod-fam-2',
    moduleTitle: 'Tell us about a family member',
    subjectName: 'Dad',
    subjectRelation: 'Father',
    openReflectionMessage: "You can begin speaking about Dad openly. I'll make sure to record everything.",
    summaryHeading: "Here's a summary of what was recorded",
    questions: [
      {
        id: 'rq-fam-1',
        categoryLabel: 'About Dad',
        promptText: "What's something you and Dad did together that you've never quite been able to explain to anyone else, something that only makes sense if you were there?",
        mockUserResponse: "Every Sunday morning he'd wake me up at 5am to go to this little diner about 40 minutes away. Nobody else in the family understood why we drove that far for breakfast when there were places ten minutes from the house. But that was kind of the point. It was just ours.",
      },
      {
        id: 'rq-fam-2',
        categoryLabel: 'About Dad',
        promptText: "What's a small habit or phrase of Dad's that stuck with you long after you stopped living under the same roof?",
        mockUserResponse: "He always said 'don't let perfect get in the way of good enough.' I didn't understand it when I was young, but I catch myself saying it to my own kids now.",
      },
      {
        id: 'rq-fam-3',
        categoryLabel: 'About Dad',
        promptText: "Was there ever a moment where you saw Dad not as a parent, but just as a person? What happened?",
        mockUserResponse: "When Grandma passed, I saw him cry for the first time. He sat on the porch for an hour not saying anything. I realized he was someone's kid too.",
      },
      {
        id: 'rq-fam-4',
        categoryLabel: 'About Dad',
        promptText: "If you could relive one ordinary day with Dad — nothing special, just a regular day — what would it look like?",
        mockUserResponse: "A Saturday in fall. Raking leaves, him listening to the game on the radio. We'd bag them up, then he'd make chili. Nothing extraordinary. That's what made it perfect.",
      },
      {
        id: 'rq-fam-5',
        categoryLabel: 'About Dad',
        promptText: "What's something Dad taught you — not with words, but just by the way he lived?",
        mockUserResponse: "He never missed a day of work in 30 years. Never complained about it either. He just showed up. That taught me more about responsibility than any lecture ever could.",
      },
      {
        id: 'rq-fam-6',
        categoryLabel: 'About Dad',
        promptText: "Is there something you wish you had asked Dad while you still could — or something you wish you had said?",
        mockUserResponse: "I wish I'd asked him what he dreamed about when he was my age. I know about his life but I don't really know what he wanted it to be.",
      },
      {
        id: 'rq-fam-7',
        categoryLabel: 'About Dad',
        promptText: "What's a story about Dad that always gets a laugh when you tell it at family gatherings?",
        mockUserResponse: "He once tried to fix the kitchen sink himself and flooded the whole first floor. Mom was furious but he just stood there in the water laughing.",
      },
      {
        id: 'rq-fam-8',
        categoryLabel: 'About Dad',
        promptText: "How do you think Dad would describe you if someone asked him?",
        mockUserResponse: "He'd probably say I worry too much — just like my mother. Then he'd say something about being proud, but in his roundabout way where you had to read between the lines.",
      },
    ],
  },
}

export const conversationConfigs: Record<string, ConversationConfig> = {
  'cat-family': {
    categoryId: 'cat-family',
    moduleId: 'mod-fam-1',
    moduleTitle: "Who's in Your Family",
    questions: [
      {
        id: 'q-fam-1',
        promptText: "Lets start with the people closest to you. Do you have any children, what are their names?",
        mockUserResponse: "Well, my wife Linda, we've been married 44 years this June. She's my best friend. We have 2 kids, Sarah and Michael. Sarah's 38, Michael's 35.",
        mockAiAcknowledgment: "That's a wonderful family. 44 years with Linda — that's something special. Let me make sure I've captured everyone.",
      },
      {
        id: 'q-fam-2',
        promptText: "What about your parents? Are they still around?",
        mockUserResponse: "My dad Robert passed about ten years ago. My mom Margaret is still here — she's 89 and still sharp as a tack. Lives about 20 minutes from us.",
        mockAiAcknowledgment: "Robert and Margaret, I'm glad your mom is still here. She sounds like a strong woman.",
      },
    ],
    finishMessages: [
      "Robert and Margaret, I'm glad your mom is still here. She sounds like a strong woman.",
      "Great, I think I have a good picture of your family. These are the people who matter most to you.",
    ],
    summaryHeading: "Here's what I captured during the conversation.",
    summaryListLabel: 'Tap to edit family members',
    summaryAddLabel: 'Add a family member',
    summaryItems: [
      { id: 'si-1', name: 'Sarah Rogers', label: 'Daughter' },
      { id: 'si-2', name: 'Michael Thompson', label: 'Son' },
      { id: 'si-3', name: 'Jessica Li', label: 'Mother' },
      { id: 'si-4', name: 'David Kim', label: 'Father' },
      { id: 'si-5', name: 'Emily Johnson', label: 'Sister' },
    ],
  },
  'cat-friends': {
    categoryId: 'cat-friends',
    moduleId: 'mod-fri-1',
    moduleTitle: 'Your Friend Circle',
    questions: [
      {
        id: 'q-fri-1',
        promptText: "Let's talk about the friends who've been with you through it all. Who comes to mind first?",
        mockUserResponse: "My buddy Tom — we've been friends since college. He was my best man. And Nancy from work, she's been a close friend for about 20 years now.",
        mockAiAcknowledgment: "Tom and Nancy — sounds like you've had some real anchors in your life. College friendships that last are something special.",
      },
      {
        id: 'q-fri-2',
        promptText: "Anyone else you'd want to make sure we capture? Maybe a neighbor or someone from your community?",
        mockUserResponse: "Bill next door. We've been neighbors for 15 years. He's the kind of guy who just shows up when you need him.",
        mockAiAcknowledgment: "Bill sounds like a true friend. The ones who show up without being asked — those are keepers.",
      },
    ],
    finishMessages: [
      "Bill sounds like a true friend. The ones who show up without being asked — those are keepers.",
      "I think I've got a good picture of your closest friends. These are the people who've walked alongside you.",
    ],
    summaryHeading: "Here's what I captured during the conversation.",
    summaryListLabel: 'Tap to edit friends',
    summaryAddLabel: 'Add a friend I missed',
    summaryItems: [
      { id: 'si-1', name: 'Tom Henderson', label: 'College Friend' },
      { id: 'si-2', name: 'Nancy Park', label: 'Work Friend' },
      { id: 'si-3', name: 'Bill Martinez', label: 'Neighbor' },
    ],
  },
  'cat-career': {
    categoryId: 'cat-career',
    moduleId: 'mod-car-1',
    moduleTitle: 'Your Career Journey',
    questions: [
      {
        id: 'q-car-1',
        promptText: "Let's start at the beginning. What was your very first job, and how did you end up there?",
        mockUserResponse: "I started as a stock boy at the local hardware store when I was 16. My dad knew the owner. It taught me how to work hard and show up on time.",
        mockAiAcknowledgment: "A hardware store at 16 — that's a great way to learn the basics. Sounds like it set a strong foundation.",
      },
      {
        id: 'q-car-2',
        promptText: "What about the career you're most known for? Walk me through how that unfolded.",
        mockUserResponse: "I spent 30 years in engineering at Boeing. Started as a junior engineer, worked my way up to lead the 747 maintenance program. Retired as a senior director.",
        mockAiAcknowledgment: "30 years at Boeing, from junior engineer to senior director — that's an incredible arc. The 747 program is legendary.",
      },
    ],
    finishMessages: [
      "30 years at Boeing, from junior engineer to senior director — that's an incredible arc.",
      "I've got a clear picture of your career journey. These are the roles that defined your professional life.",
    ],
    summaryHeading: "Here's what I captured during the conversation.",
    summaryListLabel: 'Tap to edit career entries',
    summaryAddLabel: 'Add a role I missed',
    summaryItems: [
      { id: 'si-1', name: 'Hardware Store', label: 'Stock Boy' },
      { id: 'si-2', name: 'Boeing', label: 'Junior Engineer' },
      { id: 'si-3', name: 'Boeing', label: 'Senior Director' },
    ],
  },
}
