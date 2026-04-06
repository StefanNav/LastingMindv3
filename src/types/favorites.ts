export interface FavoritesCategory {
  id: string
  emoji: string
  name: string
  question: string
  mockAnswer: string
}

export interface FavoritesAnswer {
  categoryId: string
  emoji: string
  categoryName: string
  question: string
  answer: string
}

export type SlotMachineStep =
  | 'idle'
  | 'spinning'
  | 'landed'
  | 'answering'
  | 'success'
  | 'complete'

export type FavoritesInputMode = 'voice' | 'text'

export interface SlotMachineState {
  step: SlotMachineStep
  inputMode: FavoritesInputMode
  currentCategoryIndex: number
  answeredCount: number
  answers: FavoritesAnswer[]
  categoryOrder: number[]
  currentCategory: FavoritesCategory | null
}
