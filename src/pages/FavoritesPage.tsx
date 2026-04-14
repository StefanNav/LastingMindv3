import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageShell } from '@/components/shared/PageShell'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { ExitConfirmationModal } from '@/components/conversation/ExitConfirmationModal'
import { SlotMachineBody } from '@/components/favorites/SlotMachineBody'
import { SlotReel } from '@/components/favorites/SlotReel'
import { SlotHandle } from '@/components/favorites/SlotHandle'
import type { SlotHandleRef } from '@/components/favorites/SlotHandle'
import { QuestionCard } from '@/components/favorites/QuestionCard'
import { InlineSuccessMoment } from '@/components/favorites/InlineSuccessMoment'
import { SparkParticles } from '@/components/favorites/SparkParticles'
import { useSlotMachineFlow } from '@/hooks/useSlotMachineFlow'

export function FavoritesPage() {
  const navigate = useNavigate()
  const flow = useSlotMachineFlow()
  const [sparkTrigger, setSparkTrigger] = useState(0)
  const handleRef = useRef<SlotHandleRef>(null)
  const [showExitModal, setShowExitModal] = useState(false)

  const handleBack = useCallback(() => {
    if (flow.answeredCount > 0) {
      setShowExitModal(true)
    } else {
      navigate('/home')
    }
  }, [flow.answeredCount, navigate])

  // Navigate to summary when all questions complete
  useEffect(() => {
    if (flow.step === 'complete') {
      navigate('/favorites/summary', { state: { answers: flow.answers } })
    }
  }, [flow.step, flow.answers, navigate])

  const handlePull = () => {
    flow.pullHandle()
    setSparkTrigger((n) => n + 1)
  }

  const isHandleDisabled =
    flow.step !== 'idle' || flow.answeredCount >= flow.totalQuestions

  const headerRightLabel =
    flow.step === 'complete'
      ? 'All Done!'
      : `${flow.answeredCount} / ${flow.totalQuestions} questions`

  return (
    <PageShell>
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <ConversationHeader
          moduleTitle="Favorites"
          rightLabel={headerRightLabel}
          progressPercent={flow.progressPercent}
          onBack={handleBack}
        />

        {/* Content area — machine + handle centered, button pinned to bottom */}
        <div className="flex flex-1 flex-col px-4 pb-8 pt-[80px]">
          {/* Machine + handle — centered, nudged down */}
          <div className="flex flex-1 flex-col items-center justify-center pt-24">
            <div className="relative w-full">
              <SparkParticles trigger={sparkTrigger} />
              <SlotMachineBody isSpinning={flow.step === 'spinning'}>
                <SlotReel
                  categories={flow.reelCategories}
                  targetIndex={flow.targetReelIndex}
                  isSpinning={flow.step === 'spinning'}
                  onSpinComplete={flow.spinComplete}
                />
              </SlotMachineBody>
            </div>

            {/* Handle — below the machine */}
            <div className="mt-4">
              <SlotHandle ref={handleRef} onPull={handlePull} disabled={isHandleDisabled} />
            </div>
          </div>


          {/* Pull button — pinned at bottom */}
          {flow.step === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto flex flex-col items-center gap-2 pt-4"
            >
              <button
                type="button"
                onClick={() => handleRef.current?.triggerPull()}
                disabled={isHandleDisabled}
                className="flex w-full max-w-[240px] items-center justify-center rounded-lg bg-primary px-10 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                Pull
              </button>
              {flow.answeredCount === 0 && (
                <p className="text-sm text-muted-foreground">
                  or drag the lever down
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Question card + success moment — shared overlay */}
        <AnimatePresence>
          {(flow.step === 'landed' || flow.step === 'answering') && flow.currentCategory && (
            <QuestionCard
              key={`card-${flow.currentCategory.id}`}
              category={flow.currentCategory}
              onSubmit={flow.submitAnswer}
              onSkip={flow.skipQuestion}
            />
          )}
          {flow.step === 'success' && (
            <InlineSuccessMoment
              key="success-moment"
              answeredCount={flow.answeredCount}
              totalQuestions={flow.totalQuestions}
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
