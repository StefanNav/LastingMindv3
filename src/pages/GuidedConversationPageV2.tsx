import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { useGuidedConversation } from '@/hooks/useGuidedConversation'
import { GuidedChatHeader } from '@/components/guided/GuidedChatHeader'
import { GuidedChatThread } from '@/components/guided/GuidedChatThread'
import { GuidedFollowUpChips } from '@/components/guided/GuidedFollowUpChips'
import { GuidedInputBar } from '@/components/guided/GuidedInputBar'
import { GuidedSummaryScreen } from '@/components/guided/GuidedSummaryScreen'
import { GuidedExitSheet } from '@/components/guided/GuidedExitSheet'
import type { GuidedConversationConfig } from '@/types'

interface GuidedConversationPageV2Props {
  config: GuidedConversationConfig
  onComplete?: () => void
  onBack?: () => void
  onExit?: () => void
}

export function GuidedConversationPageV2({
  config,
  onComplete,
  onBack,
  onExit,
}: GuidedConversationPageV2Props) {
  const flow = useGuidedConversation(config)
  const [showExitSheet, setShowExitSheet] = useState(false)

  const handleBack = useCallback(() => {
    if (flow.messages.length <= 1) {
      onBack?.()
    } else {
      setShowExitSheet(true)
    }
  }, [flow.messages.length, onBack])

  const handleSaveAndExit = useCallback(() => {
    setShowExitSheet(false)
    onExit?.()
  }, [onExit])

  const handleSave = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  // Summary screen
  if (flow.showSummary && flow.isComplete) {
    return (
      <PageTransition>
        <GuidedSummaryScreen
          categoryLabel={config.categoryLabel}
          entries={flow.summaryEntries}
          confirmationCTALabel={config.confirmationCTALabel}
          onUpdateEntry={flow.updateSummaryEntry}
          onSave={handleSave}
        />
      </PageTransition>
    )
  }

  // Main conversation screen
  return (
    <PageTransition>
      <div className="flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          {/* Header */}
          <GuidedChatHeader
            moduleTitle={config.categoryLabel}
            progressLabel={flow.progressLabel}
            onBack={handleBack}
          />

          {/* Chat thread */}
          <GuidedChatThread
            messages={flow.messages}
            isThinking={flow.isThinking}
          />

          {/* Follow-up chips */}
          {flow.showChips && !flow.isThinking && !flow.showEndCTA && (
            <GuidedFollowUpChips
              chips={
                flow.hasCompletedAllQuestions
                  ? flow.currentQuestion.followUpChips.filter((c) => c !== 'Move on')
                  : flow.currentQuestion.followUpChips
              }
              onSelect={flow.sendChip}
            />
          )}

          {/* End-of-conversation CTA */}
          {flow.showEndCTA && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-2.5 border-t border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-6 pt-4"
            >
              <button
                type="button"
                onClick={flow.triggerSummary}
                className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
              >
                View my summary
              </button>
              <button
                type="button"
                onClick={flow.continueConversation}
                className="flex w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
              >
                I have more to share
              </button>
            </motion.div>
          )}

          {/* Input bar */}
          {!flow.isComplete && !flow.showEndCTA && (
            <GuidedInputBar
              inputMode={flow.inputMode}
              isRecording={flow.isRecording}
              onSend={(text) => flow.sendMessage(text, 'text')}
              onStartRecording={flow.startRecording}
              onStopRecording={flow.stopRecording}
              onSetInputMode={flow.setInputMode}
              disabled={flow.isThinking}
            />
          )}
        </div>

        {/* Exit confirmation sheet */}
        <GuidedExitSheet
          isOpen={showExitSheet}
          onSaveAndExit={handleSaveAndExit}
          onKeepGoing={() => setShowExitSheet(false)}
        />
      </div>
    </PageTransition>
  )
}
