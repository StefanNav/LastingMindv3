import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Square } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { useOpenReflection } from '@/hooks/useOpenReflection'
import { reflectionConfigs } from '@/data/mock'
import { RecordingWaves } from '@/components/conversation/RecordingWaves'
import { ReflectionHeader } from '@/components/reflection/ReflectionHeader'
import { ReflectionTopicContext } from '@/components/reflection/ReflectionTopicContext'
import { VoiceIdleState } from '@/components/reflection/VoiceIdleState'
import { VoicePausedState } from '@/components/reflection/VoicePausedState'
import { TranscriptView } from '@/components/reflection/TranscriptView'
import { JournalCanvas } from '@/components/reflection/JournalCanvas'
import { PenLine } from 'lucide-react'
import { ReflectionExitSheet } from '@/components/reflection/ReflectionExitSheet'

function interpolateTopic(text: string, topic: string): string {
  return text.replace(/\{\{topic\}\}/g, topic)
}

interface LocationState {
  selectedQuestionIndex: number | null
  selectedMember?: string
  selectedRelationship?: string
  topicName?: string
}

export function ReflectionPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState | null

  const config = categoryId ? reflectionConfigs[categoryId] : undefined
  const { state, dispatch } = useOpenReflection()
  const [showExitSheet, setShowExitSheet] = useState(false)

  const topicName = locationState?.topicName || config?.topicName || config?.subjectName || ''
  const questions = config?.questions ?? []
  const selectedQuestion = state.selectedQuestionIndex !== null
    ? questions[state.selectedQuestionIndex]
    : null
  const questionText = selectedQuestion?.promptText
    ? interpolateTopic(selectedQuestion.promptText, topicName)
    : null

  // Initialize from navigation state
  useEffect(() => {
    if (!locationState) return
    if (locationState.selectedQuestionIndex !== null && locationState.selectedQuestionIndex !== undefined) {
      dispatch({ type: 'SELECT_QUESTION', index: locationState.selectedQuestionIndex })
    } else {
      dispatch({ type: 'SELECT_FREE' })
    }
    dispatch({ type: 'START_REFLECTING' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-navigate to summary when step changes
  useEffect(() => {
    if (state.step === 'summary' && config && categoryId) {
      navigate(`/reflection/${categoryId}/summary`, {
        state: {
          topicName,
          questionText,
          reflectionText: state.inputMode === 'voice' ? state.transcript : state.writtenText,
          inputMode: state.inputMode,
          selectedMember: locationState?.selectedMember,
        },
      })
    }
  }, [state.step, categoryId, config, navigate, topicName, questionText, state.transcript, state.writtenText, state.inputMode, locationState?.selectedMember])

  const handleBack = useCallback(() => {
    const hasContent = state.transcript.trim() || state.writtenText.trim()
    if (hasContent) {
      setShowExitSheet(true)
    } else {
      navigate(`/reflection/${categoryId}`)
    }
  }, [state.transcript, state.writtenText, navigate, categoryId])

  const handleFinishRecording = useCallback(() => {
    // Use mock transcript from config
    const mockText = selectedQuestion?.mockUserResponse
      ?? "I remember so many things about him. The way he'd always wake up before everyone else. The sound of the radio in the kitchen. Those Sunday drives where we'd just talk. He had a way of making everything feel like it mattered, even the small things."
    dispatch({ type: 'FINISH_RECORDING', mockTranscript: mockText })
  }, [dispatch, selectedQuestion])

  // Recording timer
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (state.step === 'recording') {
      timerRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000)
    } else if (state.step === 'paused') {
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setRecordingSeconds(0)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [state.step])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (!config || !categoryId) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">Reflection not found.</p>
        </div>
      </PageTransition>
    )
  }

  // Don't render if navigating to summary
  if (state.step === 'summary') return null

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        {/* Header */}
        <div className="relative z-10">
          <ReflectionHeader
            moduleTitle={config.moduleTitle}
            onBack={handleBack}
          />
        </div>

        {/* Top zone — topic context */}
        <div className="relative z-10 px-5 pb-3 pt-4">
          <ReflectionTopicContext
            topicName={topicName}
            questionText={questionText}
          />
        </div>

        {/* Middle zone — state-dependent content */}
        <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
          {/* Recording waves background */}
          {(state.step === 'recording' || state.step === 'paused') && (
            <RecordingWaves isPaused={state.step === 'paused'} />
          )}

          <AnimatePresence mode="wait">
            {/* Voice idle */}
            {state.step === 'idle' && state.inputMode === 'voice' && (
              <VoiceIdleState
                key="voice-idle"
                onBeginRecording={() => dispatch({ type: 'BEGIN_RECORDING' })}
              />
            )}

            {/* Voice recording */}
            {state.step === 'recording' && (
              <motion.div
                key="voice-recording"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col items-center justify-center gap-5 -mt-[114px]"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-[15px] font-medium text-foreground/70">
                    Listening…
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="size-2 animate-pulse rounded-full bg-[#d40016]" />
                    <span className="text-[14px] font-medium tabular-nums text-foreground/60">
                      {formatTime(recordingSeconds)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'END_RECORDING' })}
                  className="flex size-20 items-center justify-center rounded-full bg-[#d40016] shadow-lg transition-transform active:scale-95"
                >
                  <Square className="size-7 text-white" fill="white" />
                </button>
              </motion.div>
            )}

            {/* Voice paused */}
            {state.step === 'paused' && (
              <VoicePausedState
                key="voice-paused"
                onContinue={() => dispatch({ type: 'CONTINUE_RECORDING' })}
                onDone={handleFinishRecording}
              />
            )}

            {/* Transcript view */}
            {state.step === 'transcript' && (
              <TranscriptView
                key="transcript"
                transcript={state.transcript}
                isEditing={state.isEditingTranscript}
                onEdit={() => dispatch({ type: 'EDIT_TRANSCRIPT' })}
                onSaveEdit={(text) => dispatch({ type: 'SAVE_TRANSCRIPT_EDIT', text })}
                onCancelEdit={() => dispatch({ type: 'CANCEL_TRANSCRIPT_EDIT' })}
                onRecordMore={() => dispatch({ type: 'RECORD_MORE' })}
                onSubmit={() => dispatch({ type: 'SUBMIT' })}
              />
            )}

            {/* Text mode — journal canvas */}
            {state.step === 'writing' && (
              <JournalCanvas
                key="journal"
                questionText={questionText}
                writtenText={state.writtenText}
                onTextChange={(text) => dispatch({ type: 'UPDATE_WRITTEN_TEXT', text })}
                onFinishWriting={() => dispatch({ type: 'FINISH_WRITING' })}
                onSubmit={() => dispatch({ type: 'SUBMIT' })}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom zone — prefer to type */}
        {state.step === 'idle' && state.inputMode === 'voice' && (
          <div className="relative z-10 border-t border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-6 pt-3">
            <button
              type="button"
              onClick={() => dispatch({ type: 'SWITCH_TO_TEXT' })}
              className="flex w-full items-center justify-center gap-2 py-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <PenLine className="size-4" />
              Prefer to type? Switch to text
            </button>
          </div>
        )}

        {/* Exit sheet */}
        <ReflectionExitSheet
          isOpen={showExitSheet}
          onSaveAndExit={() => navigate('/home')}
          onKeepGoing={() => setShowExitSheet(false)}
        />
      </div>
    </PageTransition>
  )
}
