export interface FavouritesCategory {
  id: string
  emoji: string
  name: string
  question: string
  mockAnswer: string
}

export interface FavouritesAnswer {
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

export type FavouritesInputMode = 'voice' | 'text'

export interface SlotMachineState {
  step: SlotMachineStep
  inputMode: FavouritesInputMode
  currentCategoryIndex: number
  answeredCount: number
  answers: FavouritesAnswer[]
  categoryOrder: number[]
  currentCategory: FavouritesCategory | null
}
