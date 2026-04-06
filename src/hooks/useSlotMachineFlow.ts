import { useReducer, useCallback, useMemo } from 'react'
import { favoritesCategories, TOTAL_QUESTIONS } from '@/data/favoritesData'
import type { SlotMachineState, FavoritesAnswer } from '@/types/favorites'

// Shuffle helper (Fisher-Yates)
function shuffleArray(arr: number[]): number[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createInitialState(): SlotMachineState {
  const order = shuffleArray(Array.from({ length: TOTAL_QUESTIONS }, (_, i) => i))
  return {
    step: 'idle',
    inputMode: 'voice',
    currentCategoryIndex: 0,
    answeredCount: 0,
    answers: [],
    categoryOrder: order,
    currentCategory: null,
  }
}

type SlotAction =
  | { type: 'PULL_HANDLE' }
  | { type: 'SPIN_COMPLETE' }
  | { type: 'SUBMIT_ANSWER'; payload: string }
  | { type: 'SUCCESS_DONE' }
  | { type: 'TOGGLE_INPUT_MODE' }
  | { type: 'EDIT_ANSWER'; payload: { categoryId: string; newAnswer: string } }

function slotReducer(state: SlotMachineState, action: SlotAction): SlotMachineState {
  switch (action.type) {
    case 'PULL_HANDLE':
      return { ...state, step: 'spinning' }

    case 'SPIN_COMPLETE': {
      const catIdx = state.categoryOrder[state.currentCategoryIndex]
      const cat = favoritesCategories[catIdx]
      return { ...state, step: 'landed', currentCategory: cat }
    }

    case 'SUBMIT_ANSWER': {
      const cat = state.currentCategory
      if (!cat) return state
      const answer: FavoritesAnswer = {
        categoryId: cat.id,
        emoji: cat.emoji,
        categoryName: cat.name,
        question: cat.question,
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
      const isComplete = state.answeredCount >= TOTAL_QUESTIONS
      if (isComplete) {
        return { ...state, step: 'complete' }
      }
      return {
        ...state,
        step: 'idle',
        currentCategoryIndex: state.currentCategoryIndex + 1,
        currentCategory: null,
      }
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

export function useSlotMachineFlow() {
  const [state, dispatch] = useReducer(slotReducer, undefined, createInitialState)

  const progressPercent = (state.answeredCount / TOTAL_QUESTIONS) * 100

  const reelCategories = useMemo(() => {
    return state.categoryOrder.map((idx) => favoritesCategories[idx])
  }, [state.categoryOrder])

  const targetReelIndex = state.currentCategoryIndex

  const pullHandle = useCallback(() => dispatch({ type: 'PULL_HANDLE' }), [])
  const spinComplete = useCallback(() => dispatch({ type: 'SPIN_COMPLETE' }), [])
  const submitAnswer = useCallback(
    (answer: string) => dispatch({ type: 'SUBMIT_ANSWER', payload: answer }),
    [],
  )
  const successDone = useCallback(() => dispatch({ type: 'SUCCESS_DONE' }), [])
  const toggleInputMode = useCallback(() => dispatch({ type: 'TOGGLE_INPUT_MODE' }), [])
  const editAnswer = useCallback(
    (categoryId: string, newAnswer: string) =>
      dispatch({ type: 'EDIT_ANSWER', payload: { categoryId, newAnswer } }),
    [],
  )

  return {
    ...state,
    progressPercent,
    reelCategories,
    targetReelIndex,
    totalQuestions: TOTAL_QUESTIONS,
    pullHandle,
    spinComplete,
    submitAnswer,
    successDone,
    toggleInputMode,
    editAnswer,
  }
}

export type SlotMachineFlowReturn = ReturnType<typeof useSlotMachineFlow>
