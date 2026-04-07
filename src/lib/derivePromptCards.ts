import type { HomePhase, CategoryDetail, DemoPromptCard } from '@/types'

/**
 * Suggested completion order for Foundation categories.
 * Used to determine which prompt shows first in the carousel.
 */
const FOUNDATION_ORDER = [
  'cat-family',
  'cat-friends',
  'cat-career',
  'cat-education',
  'cat-favorites',
  'cat-core-values',
]

/**
 * Map category IDs to human-readable tag labels for the prompt card.
 */
const CATEGORY_TAGS: Record<string, string> = {
  'cat-family': 'Family',
  'cat-friends': 'Friends',
  'cat-career': 'Career',
  'cat-education': 'Education',
  'cat-favorites': 'Favorites',
  'cat-core-values': 'Core Values',
  'cat-life-chapters': 'Life Chapters',
  'cat-greatest-memories': 'Greatest Memories',
  'cat-wisdom': 'Wisdom & Advice',
}

/**
 * Derives an array of prompt cards from the active phase's incomplete categories.
 * Each prompt corresponds to the next actionable module in a category.
 * Foundation categories follow the suggested completion order.
 */
export function derivePromptCards(
  homePhases: HomePhase[],
  categoryDetails: Record<string, CategoryDetail>,
): DemoPromptCard[] {
  const cards: DemoPromptCard[] = []

  // Use first phase as primary source; iterate all phases for completeness
  for (const phase of homePhases) {
    // Skip Phase 4 — no modules/completion
    if (phase.id === 'keep-growing') continue

    // Get categories that are actionable (not locked, not fully flourishing without next module)
    const orderedCategories = phase.id === 'foundation'
      ? [...phase.categories].sort(
          (a, b) => FOUNDATION_ORDER.indexOf(a.id) - FOUNDATION_ORDER.indexOf(b.id),
        )
      : phase.categories

    for (const category of orderedCategories) {
      // Skip locked categories
      if (category.status === 'locked') continue

      const detail = categoryDetails[category.id]
      if (!detail?.modules) continue

      // Find the first incomplete, unlocked module
      const nextModule = detail.modules.find((m) => !m.completed && !m.locked)
      if (!nextModule) continue

      const tag = CATEGORY_TAGS[category.id] ?? category.title

      cards.push({
        categoryTag: tag,
        question: nextModule.description,
        categoryId: category.id,
        moduleId: nextModule.id,
      })
    }
  }

  return cards
}
