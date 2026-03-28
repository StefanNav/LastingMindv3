import { useReducer, useCallback } from 'react'
import type { ConversationConfig, ConversationStep, ConversationInputMode, ConversationSummaryItem } from '@/types'

interface ConversationState {
  step: ConversationStep
  currentQuestionIndex: number
  inputMode: ConversationInputMode
  summaryItems: ConversationSummaryItem[]
  lastAiAcknowledgment: string | null
}

type ConversationAction =
  | { type: 'START_RECORDING' }
  | { type: 'STOP_RECORDING' }
  | { type: 'CONFIRM_TRANSCRIPTION' }
  | { type: 'AI_THINKING_COMPLETE'; payload: { totalQuestions: number; acknowledgment: string } }
  | { type: 'GO_TO_SUMMARY' }
  | { type: 'GO_BACK' }
  | { type: 'TOGGLE_INPUT_MODE' }
  | { type: 'EDIT_SUMMARY_ITEM'; payload: ConversationSummaryItem }
  | { type: 'DELETE_SUMMARY_ITEM'; payload: string }
  | { type: 'ADD_SUMMARY_ITEM'; payload: ConversationSummaryItem }

function createInitialState(config: ConversationConfig): ConversationState {
  return {
    step: 'question',
    currentQuestionIndex: 0,
    inputMode: 'voice',
    summaryItems: [...config.summaryItems],
    lastAiAcknowledgment: null,
  }
}

function conversationReducer(
  state: ConversationState,
  action: ConversationAction,
): ConversationState {
  switch (action.type) {
    case 'START_RECORDING':
      return { ...state, step: 'recording' }

    case 'STOP_RECORDING':
      return { ...state, step: 'transcription' }

    case 'CONFIRM_TRANSCRIPTION':
      return { ...state, step: 'ai_thinking' }

    case 'AI_THINKING_COMPLETE': {
      const nextIndex = state.currentQuestionIndex + 1
      const isLast = nextIndex >= action.payload.totalQuestions
      return {
        ...state,
        step: isLast ? 'finish' : 'question',
        currentQuestionIndex: isLast ? state.currentQuestionIndex : nextIndex,
        lastAiAcknowledgment: action.payload.acknowledgment,
      }
    }

    case 'GO_TO_SUMMARY':
      return { ...state, step: 'summary' }

    case 'GO_BACK': {
      if (state.step === 'summary') return { ...state, step: 'finish' }
      if (state.step === 'recording') return { ...state, step: 'question' }
      if (state.step === 'transcription') return { ...state, step: 'recording' }
      return state
    }

    case 'TOGGLE_INPUT_MODE':
      return {
        ...state,
        inputMode: state.inputMode === 'voice' ? 'text' : 'voice',
      }

    case 'EDIT_SUMMARY_ITEM':
      return {
        ...state,
        summaryItems: state.summaryItems.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      }

    case 'DELETE_SUMMARY_ITEM':
      return {
        ...state,
        summaryItems: state.summaryItems.filter((item) => item.id !== action.payload),
      }

    case 'ADD_SUMMARY_ITEM':
      return {
        ...state,
        summaryItems: [...state.summaryItems, action.payload],
      }

    default:
      return state
  }
}

export function useConversationFlow(config: ConversationConfig) {
  const [state, dispatch] = useReducer(
    conversationReducer,
    config,
    createInitialState,
  )

  const totalQuestions = config.questions.length
  const isLastQuestion = state.currentQuestionIndex >= totalQuestions - 1
  const currentQuestion = config.questions[Math.min(state.currentQuestionIndex, totalQuestions - 1)]
  const progressPercent =
    state.step === 'finish' || state.step === 'summary'
      ? 100
      : ((state.currentQuestionIndex) / totalQuestions) * 100

  const headerRightLabel = (() => {
    if (state.step === 'finish') return 'All Done!'
    if (state.step === 'summary') return 'Conversation Summary'
    return `${state.currentQuestionIndex + 1} of ${totalQuestions} Questions`
  })()

  const startRecording = useCallback(() => dispatch({ type: 'START_RECORDING' }), [])
  const stopRecording = useCallback(() => dispatch({ type: 'STOP_RECORDING' }), [])
  const confirmTranscription = useCallback(() => dispatch({ type: 'CONFIRM_TRANSCRIPTION' }), [])
  const aiThinkingComplete = useCallback(
    () =>
      dispatch({
        type: 'AI_THINKING_COMPLETE',
        payload: {
          totalQuestions,
          acknowledgment: currentQuestion.mockAiAcknowledgment,
        },
      }),
    [totalQuestions, currentQuestion],
  )
  const goToSummary = useCallback(() => dispatch({ type: 'GO_TO_SUMMARY' }), [])
  const goBack = useCallback(() => dispatch({ type: 'GO_BACK' }), [])
  const toggleInputMode = useCallback(() => dispatch({ type: 'TOGGLE_INPUT_MODE' }), [])

  const editSummaryItem = useCallback(
    (item: ConversationSummaryItem) => dispatch({ type: 'EDIT_SUMMARY_ITEM', payload: item }),
    [],
  )
  const deleteSummaryItem = useCallback(
    (id: string) => dispatch({ type: 'DELETE_SUMMARY_ITEM', payload: id }),
    [],
  )
  const addSummaryItem = useCallback(
    (item: ConversationSummaryItem) => dispatch({ type: 'ADD_SUMMARY_ITEM', payload: item }),
    [],
  )

  const lastAiAcknowledgment = state.lastAiAcknowledgment

  return {
    ...state,
    config,
    totalQuestions,
    isLastQuestion,
    currentQuestion,
    progressPercent,
    headerRightLabel,
    lastAiAcknowledgment,
    startRecording,
    stopRecording,
    confirmTranscription,
    aiThinkingComplete,
    goToSummary,
    goBack,
    toggleInputMode,
    editSummaryItem,
    deleteSummaryItem,
    addSummaryItem,
  }
}

export type ConversationFlowReturn = ReturnType<typeof useConversationFlow>
