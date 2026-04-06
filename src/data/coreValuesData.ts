import type { CoreValuesCategory } from '@/types/coreValues'

export const coreValuesCategories: CoreValuesCategory[] = [
  {
    id: 'cv-values',
    cardLabel: 'Values',
    categoryName: 'What I Stand For',
    question: 'If you had to name three things you\u2019d never compromise on, what would they be?',
    mockAnswer: 'Honesty, loyalty, and treating people with respect. Those three things have guided every big decision I\u2019ve ever made.',
  },
  {
    id: 'cv-kindness',
    cardLabel: 'Kindness',
    categoryName: 'How I Treat People',
    question: 'How do you try to show up for the people in your life?',
    mockAnswer: 'I try to listen more than I talk. And when someone needs help, I show up \u2014 even if it\u2019s just sitting with them quietly.',
  },
  {
    id: 'cv-success',
    cardLabel: 'Success',
    categoryName: 'What Success Means',
    question: 'What does a life well-lived look like to you?',
    mockAnswer: 'A life where the people you love know they\u2019re loved. That\u2019s it. Everything else is extra.',
  },
  {
    id: 'cv-beliefs',
    cardLabel: 'Beliefs',
    categoryName: 'What I Believe',
    question: 'Is there a belief or principle that has guided most of your big decisions?',
    mockAnswer: 'Do the right thing, even when nobody\u2019s watching. My father taught me that, and I\u2019ve carried it my whole life.',
  },
  {
    id: 'cv-legacy',
    cardLabel: 'Legacy',
    categoryName: "What I'd Pass On",
    question: 'What\u2019s the most important thing you\u2019d want your family to carry forward?',
    mockAnswer: 'That kindness isn\u2019t weakness. And that family always comes first, no matter what life throws at you.',
  },
]

export const TOTAL_CARDS = coreValuesCategories.length
