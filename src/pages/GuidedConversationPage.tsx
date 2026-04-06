import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { useConversationFlow } from '@/hooks/useConversationFlow'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { AiBubble } from '@/components/conversation/AiBubble'
import { TranscriptionBubble } from '@/components/conversation/TranscriptionBubble'
import { VoiceInput } from '@/components/conversation/VoiceInput'
import { VoiceRecording } from '@/components/conversation/VoiceRecording'
import { TranscriptionReview } from '@/components/conversation/TranscriptionReview'
import { TextInput } from '@/components/conversation/TextInput'
import { AiThinking } from '@/components/conversation/AiThinking'
import { FinishFooter } from '@/components/conversation/FinishFooter'
import { SummaryList } from '@/components/conversation/SummaryList'
import { CareerSummaryList } from '@/components/conversation/CareerSummaryList'
import { EducationSummaryList } from '@/components/conversation/EducationSummaryList'
import { ExitConfirmationModal } from '@/components/conversation/ExitConfirmationModal'
import type { ConversationConfig } from '@/types'

interface GuidedConversationPageProps {
  config: ConversationConfig
  onComplete?: () => void
  onBack?: () => void
  onExit?: () => void
}

export function GuidedConversationPage({ config, onComplete, onBack, onExit }: GuidedConversationPageProps) {
  const flow = useConversationFlow(config)
  const [isEditingTranscription, setIsEditingTranscription] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

  const handleBack = useCallback(() => {
    if (!flow.hasAnswered && flow.step === 'question' && flow.currentQuestionIndex === 0) {
      onBack?.()
    } else if (flow.hasAnswered) {
      setShowExitModal(true)
    } else {
      flow.goBack()
    }
  }, [flow, onBack])

  // Auto-advance from ai_thinking after a mock delay
  useEffect(() => {
    if (flow.step !== 'ai_thinking') return
    const timer = setTimeout(() => {
      flow.aiThinkingComplete()
    }, 2000)
    return () => clearTimeout(timer)
  }, [flow.step, flow.aiThinkingComplete])

  const handleSaveAndFinish = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  // Summary screen — no background image
  if (flow.step === 'summary') {
    const isCareer = config.categoryId === 'cat-career'
    const isEducation = config.categoryId === 'cat-education'
    const SummaryComponent = isCareer ? CareerSummaryList : isEducation ? EducationSummaryList : SummaryList

    return (
      <PageTransition>
        <div className="relative flex h-full flex-col bg-[var(--lm-bg-primary)]">
          <ConversationHeader
            moduleTitle={config.moduleTitle}
            rightLabel={flow.headerRightLabel}
            progressPercent={100}
            onBack={flow.goBack}
            showProgress={false}
            variant="summary"
          />
          <SummaryComponent
            heading={config.summaryHeading}
            listLabel={config.summaryListLabel}
            addLabel={config.summaryAddLabel}
            items={flow.summaryItems}
            onEdit={flow.editSummaryItem}
            onDelete={flow.deleteSummaryItem}
            onAdd={flow.addSummaryItem}
            onSaveAndFinish={handleSaveAndFinish}
          />
        </div>
      </PageTransition>
    )
  }

  // All other steps — with background image
  return (
    <PageTransition>
      <div className="relative flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/hilltree 2.png"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        {/* Header */}
        <ConversationHeader
          moduleTitle={config.moduleTitle}
          rightLabel={flow.headerRightLabel}
          progressPercent={flow.progressPercent}
          onBack={handleBack}
          showOverlay
        />

        {/* Middle content area */}
        <div className="relative z-10 flex flex-1 flex-col justify-end pb-4">
          <AnimatePresence mode="wait">
            {flow.step === 'question' && (
              <AiBubble
                key={`question-${flow.currentQuestionIndex}`}
                messages={
                  flow.lastAiAcknowledgment && flow.currentQuestionIndex > 0
                    ? [flow.lastAiAcknowledgment, flow.currentQuestion.promptText]
                    : [flow.currentQuestion.promptText]
                }
              />
            )}

            {flow.step === 'recording' && (
              <TranscriptionBubble
                key={`recording-${flow.currentQuestionIndex}`}
                text={flow.currentQuestion.mockUserResponse}
                label="Transcribing your answer"
                liveTranscribe
              />
            )}

            {flow.step === 'transcription' && (
              <TranscriptionBubble
                key={`transcription-${flow.currentQuestionIndex}`}
                text={flow.currentQuestion.mockUserResponse}
                label="Your Response"
                showTapToEdit
                onTapToEdit={() => {}}
                onEditingChange={setIsEditingTranscription}
              />
            )}

            {flow.step === 'ai_thinking' && (
              <TranscriptionBubble
                key={`thinking-${flow.currentQuestionIndex}`}
                text={flow.currentQuestion.mockUserResponse}
                showDotsIndicator
              />
            )}

            {flow.step === 'finish' && (
              <AiBubble
                key="finish"
                messages={config.finishMessages}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom action area */}
        {!isEditingTranscription && <div className="relative z-10">
          <AnimatePresence mode="wait">
            {flow.step === 'question' && flow.inputMode === 'voice' && (
              <VoiceInput
                key="voice-input"
                onStartRecording={flow.startRecording}
                onToggleInputMode={flow.toggleInputMode}
              />
            )}

            {flow.step === 'question' && flow.inputMode === 'text' && (
              <TextInput
                key="text-input"
                onSubmit={() => flow.startRecording()}
                onToggleInputMode={flow.toggleInputMode}
              />
            )}

            {flow.step === 'recording' && (
              <VoiceRecording
                key="recording"
                onStop={flow.stopRecording}
              />
            )}

            {flow.step === 'transcription' && (
              <TranscriptionReview
                key="transcription"
                onSayMore={flow.startRecording}
                onContinue={flow.confirmTranscription}
              />
            )}

            {flow.step === 'ai_thinking' && (
              <AiThinking key="thinking" />
            )}

            {flow.step === 'finish' && (
              <FinishFooter
                key="finish-footer"
                onSaveAndFinish={flow.goToSummary}
              />
            )}
          </AnimatePresence>
        </div>}

        <ExitConfirmationModal
          isOpen={showExitModal}
          onStay={() => setShowExitModal(false)}
          onLeave={() => onExit?.()}
        />
      </div>
    </PageTransition>
  )
}
