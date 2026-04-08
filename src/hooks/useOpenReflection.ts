import { useReducer } from 'react'
import type { OpenReflectionStep, OpenReflectionInputMode } from '@/types'

interface OpenReflectionState {
  step: OpenReflectionStep
  selectedQuestionIndex: number | null // null = "reflect freely"
  inputMode: OpenReflectionInputMode
  transcript: string
  writtenText: string
  isEditingTranscript: boolean
}

type OpenReflectionAction =
  | { type: 'SELECT_QUESTION'; index: number }
  | { type: 'SELECT_FREE' }
  | { type: 'START_REFLECTING' }
  | { type: 'BEGIN_RECORDING' }
  | { type: 'END_RECORDING' }
  | { type: 'CONTINUE_RECORDING' }
  | { type: 'FINISH_RECORDING'; mockTranscript: string }
  | { type: 'RECORD_MORE' }
  | { type: 'SWITCH_TO_TEXT' }
  | { type: 'SWITCH_TO_VOICE' }
  | { type: 'UPDATE_WRITTEN_TEXT'; text: string }
  | { type: 'FINISH_WRITING' }
  | { type: 'SUBMIT' }
  | { type: 'EDIT_TRANSCRIPT' }
  | { type: 'SAVE_TRANSCRIPT_EDIT'; text: string }
  | { type: 'CANCEL_TRANSCRIPT_EDIT' }

const initialState: OpenReflectionState = {
  step: 'question_select',
  selectedQuestionIndex: 0,
  inputMode: 'voice',
  transcript: '',
  writtenText: '',
  isEditingTranscript: false,
}

function reducer(state: OpenReflectionState, action: OpenReflectionAction): OpenReflectionState {
  switch (action.type) {
    case 'SELECT_QUESTION':
      return { ...state, selectedQuestionIndex: action.index }

    case 'SELECT_FREE':
      return { ...state, selectedQuestionIndex: null }

    case 'START_REFLECTING':
      return {
        ...state,
        step: state.inputMode === 'voice' ? 'idle' : 'writing',
      }

    case 'BEGIN_RECORDING':
      return { ...state, step: 'recording' }

    case 'END_RECORDING':
      return { ...state, step: 'paused' }

    case 'CONTINUE_RECORDING':
      return { ...state, step: 'recording' }

    case 'FINISH_RECORDING':
      return {
        ...state,
        step: 'transcript',
        transcript: state.transcript
          ? state.transcript + '\n\n' + action.mockTranscript
          : action.mockTranscript,
      }

    case 'RECORD_MORE':
      return { ...state, step: 'recording', isEditingTranscript: false }

    case 'SWITCH_TO_TEXT':
      return {
        ...state,
        inputMode: 'text',
        step: 'writing',
      }

    case 'SWITCH_TO_VOICE':
      return {
        ...state,
        inputMode: 'voice',
        step: state.transcript ? 'transcript' : 'idle',
      }

    case 'UPDATE_WRITTEN_TEXT':
      return { ...state, writtenText: action.text }

    case 'FINISH_WRITING':
      // Stay on writing step but the page will show the submit CTA
      return state

    case 'SUBMIT':
      return { ...state, step: 'summary' }

    case 'EDIT_TRANSCRIPT':
      return { ...state, isEditingTranscript: true }

    case 'SAVE_TRANSCRIPT_EDIT':
      return { ...state, transcript: action.text, isEditingTranscript: false }

    case 'CANCEL_TRANSCRIPT_EDIT':
      return { ...state, isEditingTranscript: false }

    default:
      return state
  }
}

export function useOpenReflection() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
