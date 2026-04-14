import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageShell } from '@/components/shared/PageShell'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { ExitConfirmationModal } from '@/components/conversation/ExitConfirmationModal'
import { CardDeck } from '@/components/core-values/CardDeck'
import { CoreValuesAnswerModal } from '@/components/core-values/CoreValuesAnswerModal'
import { InlineSuccessMoment } from '@/components/favorites/InlineSuccessMoment'
import { useCoreValuesFlow } from '@/hooks/useCoreValuesFlow'

export function CoreValuesPage() {
  const navigate = useNavigate()
  const flow = useCoreValuesFlow()

  // Navigate to summary when all cards are answered
  useEffect(() => {
    if (flow.step === 'complete') {
      navigate('/core-values/summary', { state: { answers: flow.answers } })
    }
  }, [flow.step, flow.answers, navigate])

  const headerRightLabel =
    flow.step === 'complete'
      ? 'All Done!'
      : `${flow.answeredCount} / ${flow.totalCards} cards`

  const [showModal, setShowModal] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

  const handleBack = useCallback(() => {
    if (flow.answeredCount > 0) {
      setShowExitModal(true)
    } else {
      navigate('/home')
    }
  }, [flow.answeredCount, navigate])

  // Reset modal when step leaves 'revealed'
  useEffect(() => {
    if (flow.step !== 'revealed') {
      setShowModal(false)
    }
  }, [flow.step])

  return (
    <PageShell>
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <ConversationHeader
          moduleTitle="Core Values"
          rightLabel={headerRightLabel}
          progressPercent={flow.progressPercent}
          onBack={handleBack}
        />

        {/* Content area — card deck centered */}
        <div className="flex flex-1 flex-col px-4 pb-8 pt-[120px]">
          <div className="flex flex-1 flex-col items-center justify-center">
            <CardDeck
              remainingCards={flow.remainingCards}
              currentCard={flow.currentCard}
              isShuffling={flow.step === 'shuffling'}
              isFlipping={flow.step === 'flipping'}
              isRevealed={flow.step === 'revealed'}
              hasEverTapped={flow.hasEverTapped}
              onTap={flow.tapCard}
              onShuffleComplete={flow.shuffleComplete}
              onFlipComplete={flow.flipComplete}
            />
          </div>

          {/* CTA — appears after card flip settles */}
          <AnimatePresence>
            {flow.step === 'revealed' && !showModal && (
              <motion.div
                key="answer-cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="mt-auto flex flex-col items-center gap-2 pt-4"
              >
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex w-full max-w-[260px] items-center justify-center rounded-lg bg-primary px-10 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:bg-primary/90 active:scale-[0.98]"
                >
                  Answer this question
                </button>
                <button
                  type="button"
                  onClick={flow.skipQuestion}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Skip
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Answer modal + success moment overlays */}
        <AnimatePresence>
          {showModal && flow.currentCard && (
            <CoreValuesAnswerModal
              key={`modal-${flow.currentCard.id}`}
              category={flow.currentCard}
              onSubmit={flow.submitAnswer}
              onDismiss={flow.dismissModal}
            />
          )}
          {flow.step === 'success' && (
            <InlineSuccessMoment
              key="success-moment"
              answeredCount={flow.answeredCount}
              totalQuestions={flow.totalCards}
              onDone={flow.successDone}
            />
          )}
        </AnimatePresence>

        <ExitConfirmationModal
          isOpen={showExitModal}
          onStay={() => setShowExitModal(false)}
          onLeave={() => navigate('/home')}
        />
      </div>
    </PageShell>
  )
}
