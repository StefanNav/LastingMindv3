import { useReducer, useCallback } from 'react'
import type { ReflectionConfig, ReflectionStep, ReflectionMethod, ConversationInputMode } from '@/types'

interface ReflectionState {
  step: ReflectionStep
  activePromptIndex: number
  reflectionMethod: ReflectionMethod | null
  inputMode: ConversationInputMode
  hasAnswered: boolean
  mockResponseText: string
}

type ReflectionAction =
  | { type: 'SELECT_PROMPT'; payload: number }
  | { type: 'ANSWER_QUESTION' }
  | { type: 'REFLECT_OPENLY' }
  | { type: 'START_RECORDING' }
  | { type: 'STOP_RECORDING'; payload: string }
  | { type: 'SUBMIT_TEXT'; payload: string }
  | { type: 'CONFIRM_TRANSCRIPTION' }
  | { type: 'AI_THINKING_COMPLETE' }
  | { type: 'SAY_MORE' }
  | { type: 'SAVE_AND_FINISH' }
  | { type: 'GO_BACK' }
  | { type: 'TOGGLE_INPUT_MODE' }

function createInitialState(_config: ReflectionConfig): ReflectionState {
  return {
    step: 'prompt_select',
    activePromptIndex: 0,
    reflectionMethod: null,
    inputMode: 'voice',
    hasAnswered: false,
    mockResponseText: '',
  }
}

function reflectionReducer(
  state: ReflectionState,
  action: ReflectionAction,
): ReflectionState {
  switch (action.type) {
    case 'SELECT_PROMPT':
      return { ...state, activePromptIndex: action.payload }

    case 'ANSWER_QUESTION':
      return { ...state, step: 'reflect', reflectionMethod: 'guided' }

    case 'REFLECT_OPENLY':
      return { ...state, step: 'reflect', reflectionMethod: 'open' }

    case 'START_RECORDING':
      return { ...state, step: 'recording' }

    case 'STOP_RECORDING':
      return {
        ...state,
        step: 'transcription',
        hasAnswered: true,
        mockResponseText: action.payload,
      }

    case 'SUBMIT_TEXT':
      return {
        ...state,
        step: 'ai_thinking',
        hasAnswered: true,
        mockResponseText: action.payload,
      }

    case 'CONFIRM_TRANSCRIPTION':
      return { ...state, step: 'confirm_transcript' }

    case 'AI_THINKING_COMPLETE':
      return { ...state, step: 'summary' }

    case 'SAY_MORE':
      return { ...state, step: 'recording' }

    case 'SAVE_AND_FINISH':
      return { ...state, step: 'ai_thinking' }

    case 'GO_BACK': {
      switch (state.step) {
        case 'reflect':
          return { ...state, step: 'prompt_select', reflectionMethod: null }
        case 'recording':
          return { ...state, step: 'reflect' }
        case 'transcription':
          return { ...state, step: 'recording' }
        case 'confirm_transcript':
          return { ...state, step: 'reflect' }
        case 'summary':
          return { ...state, step: 'confirm_transcript' }
        default:
          return state
      }
    }

    case 'TOGGLE_INPUT_MODE':
      return {
        ...state,
        inputMode: state.inputMode === 'voice' ? 'text' : 'voice',
      }

    default:
      return state
  }
}

export function useReflectionFlow(config: ReflectionConfig) {
  const [state, dispatch] = useReducer(
    reflectionReducer,
    config,
    createInitialState,
  )

  const totalQuestions = config.questions.length
  const activeQuestion = config.questions[state.activePromptIndex]

  const selectPrompt = useCallback(
    (index: number) => dispatch({ type: 'SELECT_PROMPT', payload: index }),
    [],
  )
  const answerQuestion = useCallback(() => dispatch({ type: 'ANSWER_QUESTION' }), [])
  const reflectOpenly = useCallback(() => dispatch({ type: 'REFLECT_OPENLY' }), [])
  const startRecording = useCallback(() => dispatch({ type: 'START_RECORDING' }), [])
  const stopRecording = useCallback(
    () =>
      dispatch({
        type: 'STOP_RECORDING',
        payload: activeQuestion.mockUserResponse,
      }),
    [activeQuestion],
  )
  const submitText = useCallback(
    (text: string) => dispatch({ type: 'SUBMIT_TEXT', payload: text }),
    [],
  )
  const confirmTranscription = useCallback(() => dispatch({ type: 'CONFIRM_TRANSCRIPTION' }), [])
  const aiThinkingComplete = useCallback(() => dispatch({ type: 'AI_THINKING_COMPLETE' }), [])
  const sayMore = useCallback(() => dispatch({ type: 'SAY_MORE' }), [])
  const saveAndFinish = useCallback(() => dispatch({ type: 'SAVE_AND_FINISH' }), [])
  const goBack = useCallback(() => dispatch({ type: 'GO_BACK' }), [])
  const toggleInputMode = useCallback(() => dispatch({ type: 'TOGGLE_INPUT_MODE' }), [])

  return {
    ...state,
    config,
    totalQuestions,
    activeQuestion,
    selectPrompt,
    answerQuestion,
    reflectOpenly,
    startRecording,
    stopRecording,
    submitText,
    confirmTranscription,
    aiThinkingComplete,
    sayMore,
    saveAndFinish,
    goBack,
    toggleInputMode,
  }
}

export type ReflectionFlowReturn = ReturnType<typeof useReflectionFlow>
