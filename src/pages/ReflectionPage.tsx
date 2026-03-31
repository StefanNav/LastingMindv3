import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { useReflectionFlow } from '@/hooks/useReflectionFlow'
import { reflectionConfigs } from '@/data/mock'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { ReflectionQuestionBubble } from '@/components/conversation/ReflectionQuestionBubble'
import { AiBubble } from '@/components/conversation/AiBubble'
import { VoiceInput } from '@/components/conversation/VoiceInput'
import { VoiceRecording } from '@/components/conversation/VoiceRecording'
import { RecordingWaves } from '@/components/conversation/RecordingWaves'
import { InlineTextInput } from '@/components/conversation/InlineTextInput'
import { ReflectionThinking } from '@/components/conversation/ReflectionThinking'
import { ConfirmTranscript } from '@/components/conversation/ConfirmTranscript'
import { ExitConfirmationModal } from '@/components/conversation/ExitConfirmationModal'
import type { ReflectionMethod, ReflectionConfig } from '@/types'

interface LocationState {
  method: ReflectionMethod
  promptIndex: number
  selectedMember?: string
}

export function ReflectionPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState | null

  const config = categoryId ? reflectionConfigs[categoryId] : undefined

  // Fallback config so the hook is always called (hooks can't be conditional)
  const fallbackConfig: ReflectionConfig = {
    categoryId: '',
    moduleId: '',
    moduleTitle: '',
    subjectName: '',
    subjectRelation: '',
    questions: [{ id: '', categoryLabel: '', promptText: '', mockUserResponse: '' }],
    openReflectionMessage: '',
    summaryHeading: '',
  }
  const flow = useReflectionFlow(config ?? fallbackConfig)

  const [isEditingTranscription, setIsEditingTranscription] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [isRecordingPaused, setIsRecordingPaused] = useState(false)
  const [editedResponseText, setEditedResponseText] = useState('')
  const responseTextareaRef = useRef<HTMLTextAreaElement>(null)

  const autoResizeResponse = useCallback(() => {
    const ta = responseTextareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${ta.scrollHeight}px`
  }, [])

  // Sync editedResponseText when entering confirm_transcript
  useEffect(() => {
    if (flow.step === 'confirm_transcript') {
      setEditedResponseText(flow.mockResponseText)
    }
  }, [flow.step, flow.mockResponseText])

  // Focus + auto-resize when editing starts
  useEffect(() => {
    if (isEditingTranscription && responseTextareaRef.current) {
      responseTextareaRef.current.focus()
      responseTextareaRef.current.setSelectionRange(editedResponseText.length, editedResponseText.length)
      autoResizeResponse()
    }
  }, [isEditingTranscription, autoResizeResponse, editedResponseText.length])

  // Initialize from navigation state
  useEffect(() => {
    if (!locationState) return
    if (locationState.promptIndex !== undefined) {
      flow.selectPrompt(locationState.promptIndex)
    }
    if (locationState.method === 'guided') {
      flow.answerQuestion()
    } else if (locationState.method === 'open') {
      flow.reflectOpenly()
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-advance from transcription (transcribing loading screen)
  useEffect(() => {
    if (flow.step !== 'transcription') return
    const timer = setTimeout(() => {
      flow.confirmTranscription()
    }, 2000)
    return () => clearTimeout(timer)
  }, [flow.step, flow.confirmTranscription])

  // Auto-advance from ai_thinking
  useEffect(() => {
    if (flow.step !== 'ai_thinking') return
    const timer = setTimeout(() => {
      flow.aiThinkingComplete()
    }, 2000)
    return () => clearTimeout(timer)
  }, [flow.step, flow.aiThinkingComplete])

  const handleBack = useCallback(() => {
    if (flow.hasAnswered) {
      setShowExitModal(true)
    } else if (flow.step === 'reflect') {
      navigate(`/reflection/${categoryId}`)
    } else {
      flow.goBack()
    }
  }, [flow, navigate, categoryId])

  const handleSaveAndFinish = useCallback(() => {
    flow.saveAndFinish()
  }, [flow])

  if (!config || !categoryId) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">Reflection not found.</p>
        </div>
      </PageTransition>
    )
  }

  // Summary step — rendered by ReflectionSummaryPage via navigation
  if (flow.step === 'summary') {
    navigate(`/reflection/${categoryId}/summary`, {
      state: {
        promptIndex: flow.activePromptIndex,
        mockResponseText: flow.mockResponseText,
        reflectionMethod: flow.reflectionMethod,
        selectedMember: locationState?.selectedMember,
        inputMode: flow.inputMode,
      },
    })
    return null
  }

  const headerTitle = `About ${config.subjectName}`
  const headerRightLabel = flow.step === 'confirm_transcript' ? 'Review' : ''
  const isTextMode = flow.step === 'reflect' && flow.inputMode === 'text'

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
        {/* Header — background image is confined here */}
        <ConversationHeader
          moduleTitle={headerTitle}
          rightLabel={headerRightLabel}
          progressPercent={0}
          onBack={handleBack}
          showProgress={false}
          backgroundImage=""
        />

        {/* Text input mode — question at top, inline text area fills remaining space */}
        {isTextMode ? (
          <div className="relative z-10 flex flex-1 flex-col pt-[155px]">
            {flow.reflectionMethod === 'guided' && (
              <ReflectionQuestionBubble questionText={flow.activeQuestion.promptText} />
            )}
            {flow.reflectionMethod === 'open' && (
              <AiBubble messages={[config.openReflectionMessage]} />
            )}
            <InlineTextInput
              onSubmit={(text: string) => flow.submitText(text)}
              onToggleInputMode={flow.toggleInputMode}
            />
          </div>
        ) : flow.step === 'transcription' ? (
          /* Transcribing loading — question bubble at top + spinner */
          <div className="relative z-10 flex flex-1 flex-col pt-[155px]">
            {flow.reflectionMethod === 'guided' && (
              <ReflectionQuestionBubble questionText={flow.activeQuestion.promptText} />
            )}
            <ReflectionThinking />
          </div>
        ) : flow.step === 'ai_thinking' ? (
          /* AI thinking — full-screen spinner layout (no question) */
          <div className="relative z-10 flex flex-1 flex-col">
            <ReflectionThinking />
          </div>
        ) : (
          <>
            {/* Animated wave hills during recording */}
            {flow.step === 'recording' && (
              <RecordingWaves isPaused={isRecordingPaused} />
            )}

            {/* Middle content area */}
            <div className={`relative z-10 flex flex-1 flex-col pb-4 ${(flow.step === 'reflect' || flow.step === 'recording' || flow.step === 'confirm_transcript') ? 'pt-[155px]' : 'justify-end'}`}>
              <AnimatePresence mode="wait">
                {/* Reflect step — guided: show question bubble */}
                {flow.step === 'reflect' && flow.reflectionMethod === 'guided' && (
                  <ReflectionQuestionBubble
                    key="question-bubble"
                    questionText={flow.activeQuestion.promptText}
                  />
                )}

                {/* Reflect step — open: show encouragement message */}
                {flow.step === 'reflect' && flow.reflectionMethod === 'open' && (
                  <AiBubble
                    key="open-message"
                    messages={[config.openReflectionMessage]}
                  />
                )}

                {/* Recording — question bubble stays at top */}
                {flow.step === 'recording' && flow.reflectionMethod === 'guided' && (
                  <ReflectionQuestionBubble
                    key="recording-question"
                    questionText={flow.activeQuestion.promptText}
                  />
                )}

                {/* Confirm transcript — question + styled response card */}
                {flow.step === 'confirm_transcript' && (
                  <div key="confirm" className="flex flex-col gap-[40px]">
                    {flow.reflectionMethod === 'guided' && (
                      <ReflectionQuestionBubble
                        questionText={flow.activeQuestion.promptText}
                      />
                    )}
                    <div className="mx-4 flex flex-col gap-[10px] rounded-[10px] border border-[#e7ebd9] bg-[#fffcf4] px-4 py-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.15)]">
                      <p className="text-[14px] font-semibold leading-[1.2] text-[#7b7b7b]">
                        Your Response
                      </p>
                      {isEditingTranscription ? (
                        <textarea
                          ref={responseTextareaRef}
                          value={editedResponseText}
                          onChange={(e) => {
                            setEditedResponseText(e.target.value)
                            autoResizeResponse()
                          }}
                          className="w-full resize-none border-0 border-b border-[#3e2f26]/20 bg-transparent pb-4 text-[16px] font-normal leading-[1.5] text-[var(--lm-text-primary)] outline-none"
                        />
                      ) : (
                        <p className="text-[16px] font-normal leading-[1.5] text-[var(--lm-text-primary)]">
                          {editedResponseText || flow.mockResponseText}
                        </p>
                      )}
                      {!isEditingTranscription && (
                        <button
                          type="button"
                          onClick={() => setIsEditingTranscription(true)}
                          className="flex items-center gap-1"
                        >
                          <svg className="size-[18px] text-[#3e2f26]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 22h16" />
                            <path d="M18 2l4 4L8 20H4v-4L18 2z" />
                          </svg>
                          <span className="text-[14px] font-medium leading-[20px] text-[#3e2f26]">
                            Tap to edit
                          </span>
                        </button>
                      )}
                      {isEditingTranscription && (
                        <button
                          type="button"
                          onClick={() => setIsEditingTranscription(false)}
                          className="mt-1 flex items-center gap-1 self-end rounded-[6px] bg-lm-green px-3 py-1.5"
                        >
                          <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-[14px] font-medium leading-[20px] text-white">
                            Done
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom action area */}
            {!isEditingTranscription && (
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {flow.step === 'reflect' && flow.inputMode === 'voice' && (
                    <VoiceInput
                      key="voice-input"
                      onStartRecording={flow.startRecording}
                      onToggleInputMode={flow.toggleInputMode}
                    />
                  )}

                  {flow.step === 'recording' && (
                    <VoiceRecording
                      key="recording"
                      onStop={flow.stopRecording}
                      isPaused={isRecordingPaused}
                      onPauseChange={setIsRecordingPaused}
                    />
                  )}

                  {flow.step === 'confirm_transcript' && (
                    <ConfirmTranscript
                      key="confirm-footer"
                      onSayMore={flow.sayMore}
                      onSaveAndFinish={handleSaveAndFinish}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        <ExitConfirmationModal
          isOpen={showExitModal}
          onStay={() => setShowExitModal(false)}
          onLeave={() => navigate('/home')}
        />
      </div>
    </PageTransition>
  )
}
