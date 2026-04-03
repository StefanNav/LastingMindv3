import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { SlotMachineBody } from '@/components/favourites/SlotMachineBody'
import { SlotReel } from '@/components/favourites/SlotReel'
import { SlotHandle } from '@/components/favourites/SlotHandle'
import { QuestionCard } from '@/components/favourites/QuestionCard'
import { InlineSuccessMoment } from '@/components/favourites/InlineSuccessMoment'
import { SparkParticles } from '@/components/favourites/SparkParticles'
import { useSlotMachineFlow } from '@/hooks/useSlotMachineFlow'

export function FavouritesPage() {
  const navigate = useNavigate()
  const flow = useSlotMachineFlow()
  const [sparkTrigger, setSparkTrigger] = useState(0)

  // Navigate to summary when all questions complete
  useEffect(() => {
    if (flow.step === 'complete') {
      navigate('/favourites/summary', { state: { answers: flow.answers } })
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
    <PageTransition>
      <div className="relative flex h-full flex-col bg-background">
        {/* Header */}
        <ConversationHeader
          moduleTitle="Favourites"
          rightLabel={headerRightLabel}
          progressPercent={flow.progressPercent}
          onBack={() => navigate('/home')}
          showProgress
        />

        {/* Scrollable content below header */}
        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-8 pt-[140px]">
          {/* Slot Machine — vertically centred when idle */}
          <div className="relative flex flex-1 flex-col items-center justify-center">
            <div className="flex w-full items-center gap-3">
              <div className="relative flex-1">
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

              {/* Handle — right of the machine */}
              <SlotHandle onPull={handlePull} disabled={isHandleDisabled} />
            </div>
          </div>

          {/* Inline success moment */}
          <AnimatePresence mode="wait">
            {flow.step === 'success' && (
              <motion.div
                key="success-moment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <InlineSuccessMoment
                  answeredCount={flow.answeredCount}
                  totalQuestions={flow.totalQuestions}
                  onDone={flow.successDone}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle prompt */}
          {flow.step === 'idle' && flow.answeredCount === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-[14px] text-[var(--lm-text-secondary)]"
            >
              Pull the lever down to spin
            </motion.p>
          )}
        </div>

        {/* Question card — slide-up overlay */}
        <AnimatePresence>
          {(flow.step === 'landed' || flow.step === 'answering') && flow.currentCategory && (
            <QuestionCard
              key={`card-${flow.currentCategory.id}`}
              category={flow.currentCategory}
              inputMode={flow.inputMode}
              onToggleMode={flow.toggleInputMode}
              onSubmit={flow.submitAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
