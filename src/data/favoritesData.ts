import type { FavoritesCategory } from '@/types/favorites'

export const favoritesCategories: FavoritesCategory[] = [
  {
    id: 'fav-food',
    emoji: '🍕',
    name: 'Food',
    question: 'What is your favorite meal?',
    mockAnswer: "Mom's Sunday roast chicken. Every time I smell rosemary and garlic together, I'm back at her kitchen table.",
  },
  {
    id: 'fav-music',
    emoji: '🎵',
    name: 'Music',
    question: 'What is your favorite song?',
    mockAnswer: "\"What a Wonderful World\" by Louis Armstrong. It just makes everything feel okay, no matter what kind of day I've had.",
  },
  {
    id: 'fav-travel',
    emoji: '🌍',
    name: 'Travel',
    question: "What is your favorite place you've visited?",
    mockAnswer: "A little village on the Amalfi Coast. We stumbled on it by accident and ended up staying three extra days.",
  },
  {
    id: 'fav-movies',
    emoji: '🎬',
    name: 'Movies & TV',
    question: 'What is your favorite movie or TV show?',
    mockAnswer: "The Shawshank Redemption. Every time it's on, I sit down and watch the whole thing. The ending gets me every time.",
  },
  {
    id: 'fav-books',
    emoji: '📖',
    name: 'Books',
    question: 'What is your favorite book?',
    mockAnswer: "To Kill a Mockingbird. I first read it in school, but I've gone back to it every few years. It says something different to me each time.",
  },
  {
    id: 'fav-seasons',
    emoji: '🌿',
    name: 'Seasons',
    question: 'What is your favorite season?',
    mockAnswer: "Autumn. The smell of the air changes, the leaves turn, and there's this feeling like everything is settling down for a rest.",
  },
  {
    id: 'fav-tradition',
    emoji: '🎉',
    name: 'Tradition',
    question: 'What is your favorite tradition?',
    mockAnswer: "Christmas Eve dinner with the whole family. Everyone brings a dish, and we go around the table saying one thing we're grateful for.",
  },
  {
    id: 'fav-laughter',
    emoji: '😂',
    name: 'Laughter',
    question: 'What is your favorite thing that makes you laugh?',
    mockAnswer: "My grandson trying to tell jokes. He never gets the punchline right, but the way he laughs at himself is the funniest part.",
  },
  {
    id: 'fav-home',
    emoji: '🏡',
    name: 'Home',
    question: 'What is your favorite thing about your home?',
    mockAnswer: "The back porch. I can sit out there in the evening with a cup of tea and just listen to the birds. It's my favorite place in the world.",
  },
  {
    id: 'fav-pride',
    emoji: '🌟',
    name: 'Pride',
    question: 'What is your proudest accomplishment?',
    mockAnswer: "Putting myself through night school while working full-time and raising two kids. Nobody handed it to me, and I finished.",
  },
]

export const TOTAL_QUESTIONS = favoritesCategories.length
