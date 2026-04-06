import type { FavoritesCategory } from '@/types/favorites'

export const favoritesCategories: FavoritesCategory[] = [
  {
    id: 'fav-food',
    emoji: '🍕',
    name: 'Food',
    question: "What's a meal that always feels like home to you?",
    mockAnswer: "Mom's Sunday roast chicken. Every time I smell rosemary and garlic together, I'm back at her kitchen table.",
  },
  {
    id: 'fav-music',
    emoji: '🎵',
    name: 'Music',
    question: "What's a song you could listen to on repeat and never get tired of?",
    mockAnswer: "\"What a Wonderful World\" by Louis Armstrong. It just makes everything feel okay, no matter what kind of day I've had.",
  },
  {
    id: 'fav-travel',
    emoji: '🌍',
    name: 'Travel',
    question: "What's a place you've been that you'd go back to in a heartbeat?",
    mockAnswer: "A little village on the Amalfi Coast. We stumbled on it by accident and ended up staying three extra days.",
  },
  {
    id: 'fav-movies',
    emoji: '🎬',
    name: 'Movies & TV',
    question: "What's a film or show you've seen more times than you can count?",
    mockAnswer: "The Shawshank Redemption. Every time it's on, I sit down and watch the whole thing. The ending gets me every time.",
  },
  {
    id: 'fav-books',
    emoji: '📖',
    name: 'Books',
    question: 'Is there a book that has stayed with you long after you finished it?',
    mockAnswer: "To Kill a Mockingbird. I first read it in school, but I've gone back to it every few years. It says something different to me each time.",
  },
  {
    id: 'fav-seasons',
    emoji: '🌿',
    name: 'Seasons',
    question: "What's your favorite season, and what do you love most about it?",
    mockAnswer: "Autumn. The smell of the air changes, the leaves turn, and there's this feeling like everything is settling down for a rest.",
  },
  {
    id: 'fav-tradition',
    emoji: '🎉',
    name: 'Tradition',
    question: 'Is there a tradition or ritual you look forward to every year?',
    mockAnswer: "Christmas Eve dinner with the whole family. Everyone brings a dish, and we go around the table saying one thing we're grateful for.",
  },
  {
    id: 'fav-laughter',
    emoji: '😂',
    name: 'Laughter',
    question: "What's something that always manages to make you laugh?",
    mockAnswer: "My grandson trying to tell jokes. He never gets the punchline right, but the way he laughs at himself is the funniest part.",
  },
  {
    id: 'fav-home',
    emoji: '🏡',
    name: 'Home',
    question: "What's your favorite thing about the place you call home?",
    mockAnswer: "The back porch. I can sit out there in the evening with a cup of tea and just listen to the birds. It's my favorite place in the world.",
  },
  {
    id: 'fav-pride',
    emoji: '🌟',
    name: 'Pride',
    question: "What's something you've done that you're quietly really proud of?",
    mockAnswer: "Putting myself through night school while working full-time and raising two kids. Nobody handed it to me, and I finished.",
  },
]

export const TOTAL_QUESTIONS = favoritesCategories.length
