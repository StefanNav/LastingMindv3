import { useReducer, useCallback, useEffect, useRef } from 'react'
import type { GuidedConversationConfig, GuidedMessage, GuidedSummaryEntry } from '@/types'

interface GuidedConversationState {
  messages: GuidedMessage[]
  currentQuestionIndex: number
  followUpCount: number
  inputMode: 'voice' | 'text'
  isThinking: boolean
  showChips: boolean
  isRecording: boolean
  isComplete: boolean
  hasCompletedAllQuestions: boolean
  showEndCTA: boolean
  showSummary: boolean
  summaryEntries: GuidedSummaryEntry[]
}

type GuidedAction =
  | { type: 'ADD_LM_MESSAGE'; payload: { content: string } }
  | { type: 'SEND_USER_MESSAGE'; payload: { content: string; inputType: 'voice' | 'text' } }
  | { type: 'SEND_CHIP'; payload: { content: string } }
  | { type: 'SET_THINKING'; payload: boolean }
  | { type: 'SHOW_CHIPS'; payload: boolean }
  | { type: 'START_RECORDING' }
  | { type: 'STOP_RECORDING' }
  | { type: 'SET_INPUT_MODE'; payload: 'voice' | 'text' }
  | { type: 'ADVANCE_QUESTION' }
  | { type: 'INCREMENT_FOLLOW_UP' }
  | { type: 'COMPLETE_CONVERSATION' }
  | { type: 'SHOW_END_CTA' }
  | { type: 'CONTINUE_CONVERSATION' }
  | { type: 'SHOW_SUMMARY' }
  | { type: 'SET_SUMMARY_ENTRIES'; payload: GuidedSummaryEntry[] }
  | { type: 'UPDATE_SUMMARY_ENTRY'; payload: GuidedSummaryEntry }

let msgCounter = 0
function createMessage(
  sender: 'user' | 'lastingmind',
  content: string,
  inputType: 'voice' | 'text' = 'text',
): GuidedMessage {
  msgCounter += 1
  return {
    id: `msg-${msgCounter}-${Math.random().toString(36).slice(2, 7)}`,
    sender,
    content,
    inputType,
    timestamp: Date.now(),
  }
}

function guidedReducer(
  state: GuidedConversationState,
  action: GuidedAction,
): GuidedConversationState {
  switch (action.type) {
    case 'ADD_LM_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, createMessage('lastingmind', action.payload.content)],
        isThinking: false,
      }

    case 'SEND_USER_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          createMessage('user', action.payload.content, action.payload.inputType),
        ],
        showChips: false,
        isRecording: false,
      }

    case 'SEND_CHIP':
      return {
        ...state,
        messages: [...state.messages, createMessage('user', action.payload.content, 'text')],
        showChips: false,
      }

    case 'SET_THINKING':
      return { ...state, isThinking: action.payload }

    case 'SHOW_CHIPS':
      return { ...state, showChips: action.payload }

    case 'START_RECORDING':
      return { ...state, isRecording: true }

    case 'STOP_RECORDING':
      return { ...state, isRecording: false }

    case 'SET_INPUT_MODE':
      return { ...state, inputMode: action.payload }

    case 'ADVANCE_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        followUpCount: 0,
        showChips: false,
        isThinking: true,
      }

    case 'INCREMENT_FOLLOW_UP':
      return { ...state, followUpCount: state.followUpCount + 1 }

    case 'COMPLETE_CONVERSATION':
      return { ...state, isComplete: true, hasCompletedAllQuestions: true, showChips: false }

    case 'SHOW_END_CTA':
      return { ...state, showEndCTA: true }

    case 'CONTINUE_CONVERSATION':
      return { ...state, showEndCTA: false, isComplete: false, showChips: true }

    case 'SHOW_SUMMARY':
      return { ...state, showSummary: true }

    case 'SET_SUMMARY_ENTRIES':
      return { ...state, summaryEntries: action.payload }

    case 'UPDATE_SUMMARY_ENTRY':
      return {
        ...state,
        summaryEntries: state.summaryEntries.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      }

    default:
      return state
  }
}

function createInitialState(): GuidedConversationState {
  return {
    messages: [],
    currentQuestionIndex: 0,
    followUpCount: 0,
    inputMode: 'voice',
    isThinking: false,
    showChips: false,
    isRecording: false,
    isComplete: false,
    hasCompletedAllQuestions: false,
    showEndCTA: false,
    showSummary: false,
    summaryEntries: [],
  }
}

export function useGuidedConversation(config: GuidedConversationConfig) {
  const [state, dispatch] = useReducer(guidedReducer, undefined, createInitialState)

  const totalQuestions = config.questions.length
  const currentQuestion = config.questions[Math.min(state.currentQuestionIndex, totalQuestions - 1)]
  const isLastQuestion = state.currentQuestionIndex >= totalQuestions - 1
  const progressLabel = `${Math.min(state.currentQuestionIndex + 1, totalQuestions)} of ${totalQuestions}`

  // Refs to track mutable values for use inside setTimeout callbacks
  const questionIndexRef = useRef(0)
  const followUpCountRef = useRef(0)
  const configRef = useRef(config)
  configRef.current = config
  const currentQuestionRef = useRef(currentQuestion)
  currentQuestionRef.current = currentQuestion

  // ── Helper: advance to next question or close conversation ──
  // Reads from refs so it's always current inside setTimeout callbacks
  const advanceToNext = useCallback(() => {
    const nextIdx = questionIndexRef.current + 1
    questionIndexRef.current = nextIdx
    followUpCountRef.current = 0
    dispatch({ type: 'ADVANCE_QUESTION' })

    const cfg = configRef.current

    if (nextIdx >= cfg.questions.length) {
      // Past last question → closing message + end CTA
      setTimeout(() => {
        dispatch({ type: 'ADD_LM_MESSAGE', payload: { content: cfg.closingMessage } })
        dispatch({ type: 'COMPLETE_CONVERSATION' })

        const entries: GuidedSummaryEntry[] = cfg.questions.map((q, i) => ({
          id: `entry-${i}`,
          label: getEntryLabel(cfg.categoryLabel, i),
          content: q.mockUserResponse,
          inputType: 'voice' as const,
          questionId: q.id,
        }))
        dispatch({ type: 'SET_SUMMARY_ENTRIES', payload: entries })

        setTimeout(() => dispatch({ type: 'SHOW_END_CTA' }), 800)
      }, 1200)
    } else {
      // Send the next question
      const nextQ = cfg.questions[nextIdx]
      setTimeout(() => {
        dispatch({ type: 'ADD_LM_MESSAGE', payload: { content: nextQ.questionText } })
        setTimeout(() => dispatch({ type: 'SHOW_CHIPS', payload: true }), 300)
      }, 1200)
    }
  }, [])

  // Auto-send first LM question on mount
  useEffect(() => {
    dispatch({ type: 'SET_THINKING', payload: true })
    const timer = setTimeout(() => {
      dispatch({
        type: 'ADD_LM_MESSAGE',
        payload: { content: config.questions[0].questionText },
      })
      setTimeout(() => dispatch({ type: 'SHOW_CHIPS', payload: true }), 300)
    }, 1200)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = useCallback(
    (content: string, inputType: 'voice' | 'text') => {
      dispatch({ type: 'SEND_USER_MESSAGE', payload: { content, inputType } })
      dispatch({ type: 'INCREMENT_FOLLOW_UP' })
      followUpCountRef.current += 1
      dispatch({ type: 'SET_THINKING', payload: true })

      const newCount = followUpCountRef.current
      const thinkingDelay = 1000 + Math.random() * 500

      setTimeout(() => {
        const q = currentQuestionRef.current
        dispatch({ type: 'ADD_LM_MESSAGE', payload: { content: q.mockAiResponse } })

        if (newCount >= 2) {
          // Auto-advance after 2 follow-ups on this question
          setTimeout(() => advanceToNext(), 800)
        } else {
          setTimeout(() => dispatch({ type: 'SHOW_CHIPS', payload: true }), 300)
        }
      }, thinkingDelay)
    },
    [advanceToNext],
  )

  const sendChip = useCallback(
    (chipText: string) => {
      dispatch({ type: 'SEND_CHIP', payload: { content: chipText } })

      if (chipText === 'Move on') {
        // Immediate skip to next question
        advanceToNext()
      } else {
        dispatch({ type: 'INCREMENT_FOLLOW_UP' })
        followUpCountRef.current += 1
        dispatch({ type: 'SET_THINKING', payload: true })

        const newCount = followUpCountRef.current
        const thinkingDelay = 1000 + Math.random() * 500

        setTimeout(() => {
          const q = currentQuestionRef.current
          dispatch({ type: 'ADD_LM_MESSAGE', payload: { content: q.mockAiResponse } })

          if (newCount >= 2) {
            // Auto-advance after 2 follow-ups on this question
            setTimeout(() => advanceToNext(), 800)
          } else {
            setTimeout(() => dispatch({ type: 'SHOW_CHIPS', payload: true }), 300)
          }
        }, thinkingDelay)
      }
    },
    [advanceToNext],
  )

  const startRecording = useCallback(() => {
    dispatch({ type: 'START_RECORDING' })
  }, [])

  const stopRecording = useCallback(() => {
    dispatch({ type: 'STOP_RECORDING' })
    const q = currentQuestionRef.current
    sendMessage(q.mockUserResponse, 'voice')
  }, [sendMessage])

  const setInputMode = useCallback((mode: 'voice' | 'text') => {
    dispatch({ type: 'SET_INPUT_MODE', payload: mode })
  }, [])

  const triggerSummary = useCallback(() => {
    dispatch({ type: 'SHOW_SUMMARY' })
  }, [])

  const continueConversation = useCallback(() => {
    dispatch({ type: 'CONTINUE_CONVERSATION' })
  }, [])

  const updateSummaryEntry = useCallback((entry: GuidedSummaryEntry) => {
    dispatch({ type: 'UPDATE_SUMMARY_ENTRY', payload: entry })
  }, [])

  // Build summary entries from config when conversation completes (fallback)
  const summaryEntries: GuidedSummaryEntry[] =
    state.summaryEntries.length > 0
      ? state.summaryEntries
      : state.isComplete
        ? config.questions.map((q, i) => ({
            id: `entry-${i}`,
            label: getEntryLabel(config.categoryLabel, i),
            content: q.mockUserResponse,
            inputType: 'voice' as const,
            questionId: q.id,
          }))
        : []

  return {
    ...state,
    summaryEntries,
    config,
    totalQuestions,
    currentQuestion,
    isLastQuestion,
    progressLabel,
    sendMessage,
    sendChip,
    startRecording,
    stopRecording,
    setInputMode,
    triggerSummary,
    continueConversation,
    updateSummaryEntry,
  }
}

function getEntryLabel(categoryLabel: string, index: number): string {
  const labels: Record<string, string[]> = {
    Family: ['Family members', 'Someone who shaped you', 'For the grandchildren'],
    Friends: ['Close friends', 'A friend who changed you', 'Others in your circle'],
    Career: ['First job', 'Main career', 'A turning point'],
    Education: ['School years', 'Higher education', 'A memorable mentor'],
  }
  return labels[categoryLabel]?.[index] ?? `Response ${index + 1}`
}

export type GuidedConversationReturn = ReturnType<typeof useGuidedConversation>
