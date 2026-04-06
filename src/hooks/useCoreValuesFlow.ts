import { useReducer, useCallback } from 'react'
import { coreValuesCategories, TOTAL_CARDS } from '@/data/coreValuesData'
import type { CoreValuesState, CoreValuesAnswer } from '@/types/coreValues'

function createInitialState(): CoreValuesState {
  return {
    step: 'idle',
    inputMode: 'voice',
    currentCardIndex: 0,
    answeredCount: 0,
    answers: [],
    currentCard: null,
    hasEverTapped: false,
  }
}

type CoreValuesAction =
  | { type: 'TAP_CARD' }
  | { type: 'SHUFFLE_COMPLETE' }
  | { type: 'FLIP_COMPLETE' }
  | { type: 'SUBMIT_ANSWER'; payload: string }
  | { type: 'SUCCESS_DONE' }
  | { type: 'DISMISS_MODAL' }
  | { type: 'TOGGLE_INPUT_MODE' }
  | { type: 'EDIT_ANSWER'; payload: { categoryId: string; newAnswer: string } }

function coreValuesReducer(state: CoreValuesState, action: CoreValuesAction): CoreValuesState {
  switch (action.type) {
    case 'TAP_CARD':
      return {
        ...state,
        step: 'shuffling',
        hasEverTapped: true,
        currentCard: coreValuesCategories[state.currentCardIndex],
      }

    case 'SHUFFLE_COMPLETE':
      return { ...state, step: 'flipping' }

    case 'FLIP_COMPLETE':
      return { ...state, step: 'revealed' }

    case 'SUBMIT_ANSWER': {
      const card = state.currentCard
      if (!card) return state
      const answer: CoreValuesAnswer = {
        categoryId: card.id,
        cardLabel: card.cardLabel,
        categoryName: card.categoryName,
        question: card.question,
        answer: action.payload,
      }
      return {
        ...state,
        step: 'success',
        answers: [...state.answers, answer],
        answeredCount: state.answeredCount + 1,
      }
    }

    case 'SUCCESS_DONE': {
      const isComplete = state.answeredCount >= TOTAL_CARDS
      if (isComplete) {
        return { ...state, step: 'complete' }
      }
      return {
        ...state,
        step: 'idle',
        currentCardIndex: state.currentCardIndex + 1,
        currentCard: null,
      }
    }

    case 'DISMISS_MODAL':
      return {
        ...state,
        step: 'idle',
        currentCard: null,
      }

    case 'TOGGLE_INPUT_MODE':
      return {
        ...state,
        inputMode: state.inputMode === 'voice' ? 'text' : 'voice',
      }

    case 'EDIT_ANSWER':
      return {
        ...state,
        answers: state.answers.map((a) =>
          a.categoryId === action.payload.categoryId
            ? { ...a, answer: action.payload.newAnswer }
            : a,
        ),
      }

    default:
      return state
  }
}

export function useCoreValuesFlow() {
  const [state, dispatch] = useReducer(coreValuesReducer, undefined, createInitialState)

  const progressPercent = (state.answeredCount / TOTAL_CARDS) * 100
  const remainingCards = TOTAL_CARDS - state.answeredCount

  const tapCard = useCallback(() => dispatch({ type: 'TAP_CARD' }), [])
  const shuffleComplete = useCallback(() => dispatch({ type: 'SHUFFLE_COMPLETE' }), [])
  const flipComplete = useCallback(() => dispatch({ type: 'FLIP_COMPLETE' }), [])
  const submitAnswer = useCallback(
    (answer: string) => dispatch({ type: 'SUBMIT_ANSWER', payload: answer }),
    [],
  )
  const successDone = useCallback(() => dispatch({ type: 'SUCCESS_DONE' }), [])
  const dismissModal = useCallback(() => dispatch({ type: 'DISMISS_MODAL' }), [])
  const toggleInputMode = useCallback(() => dispatch({ type: 'TOGGLE_INPUT_MODE' }), [])
  const editAnswer = useCallback(
    (categoryId: string, newAnswer: string) =>
      dispatch({ type: 'EDIT_ANSWER', payload: { categoryId, newAnswer } }),
    [],
  )

  return {
    ...state,
    progressPercent,
    remainingCards,
    totalCards: TOTAL_CARDS,
    tapCard,
    shuffleComplete,
    flipComplete,
    submitAnswer,
    successDone,
    dismissModal,
    toggleInputMode,
    editAnswer,
  }
}

export type CoreValuesFlowReturn = ReturnType<typeof useCoreValuesFlow>
