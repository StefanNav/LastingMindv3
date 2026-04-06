export interface CoreValuesCategory {
  id: string
  cardLabel: string
  categoryName: string
  question: string
  mockAnswer: string
}

export interface CoreValuesAnswer {
  categoryId: string
  cardLabel: string
  categoryName: string
  question: string
  answer: string
}

export type CardDeckStep =
  | 'idle'
  | 'shuffling'
  | 'flipping'
  | 'revealed'
  | 'answering'
  | 'success'
  | 'complete'

export type CoreValuesInputMode = 'voice' | 'text'

export interface CoreValuesState {
  step: CardDeckStep
  inputMode: CoreValuesInputMode
  currentCardIndex: number
  answeredCount: number
  answers: CoreValuesAnswer[]
  currentCard: CoreValuesCategory | null
  hasEverTapped: boolean
}
