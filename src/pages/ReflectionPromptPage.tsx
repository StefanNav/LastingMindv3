import { useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { BackButton } from '@/components/shared/BackButton'
import { PageTransition } from '@/animations/PageTransition'
import { reflectionConfigs } from '@/data/mock'

const SWIPE_THRESHOLD = 50

function interpolateTopic(text: string, topic: string): string {
  return text.replace(/\{\{topic\}\}/g, topic)
}

export function ReflectionPromptPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { selectedMember?: string; selectedRelationship?: string } | null
  const selectedMember = locationState?.selectedMember
  const selectedRelationship = locationState?.selectedRelationship

  const config = categoryId ? reflectionConfigs[categoryId] : undefined

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  if (!config || !categoryId) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-base text-muted-foreground">Reflection not found.</p>
        </div>
      </PageTransition>
    )
  }

  const topicName = selectedMember || config.topicName || config.subjectName
  const questions = config.questions
  const activeQuestion = questions[activeIndex]

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= questions.length) return
      setDirection(newIndex > activeIndex ? 1 : -1)
      setActiveIndex(newIndex)
    },
    [activeIndex, questions.length],
  )

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD && activeIndex < questions.length - 1) {
        goToIndex(activeIndex + 1)
      } else if (info.offset.x > SWIPE_THRESHOLD && activeIndex > 0) {
        goToIndex(activeIndex - 1)
      }
    },
    [activeIndex, questions.length, goToIndex],
  )

  const handleStartReflecting = () => {
    navigate(`/reflect/${categoryId}`, {
      state: {
        selectedQuestionIndex: activeIndex,
        selectedMember,
        selectedRelationship,
        topicName,
      },
    })
  }

  const handleReflectFreely = () => {
    navigate(`/reflect/${categoryId}`, {
      state: {
        selectedQuestionIndex: null,
        selectedMember,
        selectedRelationship,
        topicName,
      },
    })
  }

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

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
        <div className="relative z-10 flex shrink-0 items-center justify-between px-4 pb-3 pt-[62px]">
          <BackButton onClick={() => navigate(`/intro2/${categoryId}`)} />
          <p className="font-display text-[18px] font-semibold leading-[1.2] text-foreground">
            {config.moduleTitle}
          </p>
          <div className="w-8" />
        </div>

        {/* Scrollable content */}
        <div className="relative z-10 flex flex-1 flex-col overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          {/* Topic context block */}
          <div className="flex flex-col items-center gap-1 px-5 pb-5 pt-4">
            <p className="font-display text-[24px] font-semibold leading-tight text-foreground">
              {topicName}
            </p>
          </div>

          {/* Swipeable question cards */}
          <div className="flex w-full flex-col gap-4 px-5">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="w-full"
              >
                <div className="rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm">
                  <div className="flex min-h-[200px] flex-col items-center justify-center gap-5">
                    {/* Category label */}
                    <p className="text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                      {interpolateTopic(activeQuestion.categoryLabel, topicName)}
                    </p>

                    {/* Question text */}
                    <p className="text-center font-display text-[20px] font-normal leading-[1.5] text-foreground">
                      {interpolateTopic(activeQuestion.promptText, topicName)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-[10px]">
              {questions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToIndex(i)}
                  className={`h-[6px] rounded-full transition-all duration-200 ${
                    i === activeIndex
                      ? 'w-5 bg-lm-green'
                      : 'w-[6px] bg-lm-neutral-warm opacity-35'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Reflect freely section */}
          <div className="flex flex-col items-center gap-3 px-5 pb-6 pt-8">
            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[13px] font-medium text-muted-foreground">Or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <p className="text-center text-[14px] leading-[1.5] text-foreground/80">
              Reflect freely about {topicName} in your own words, no prompt, no structure, just whatever comes to mind.
            </p>
            <button
              type="button"
              onClick={handleReflectFreely}
              className="flex items-center justify-center rounded-lg border border-border bg-transparent px-6 py-2.5 transition-colors hover:bg-muted/50 active:scale-[0.98]"
            >
              <span className="text-sm font-medium text-foreground">
                Reflect freely
              </span>
            </button>
          </div>
        </div>

        {/* Sticky primary CTA */}
        <div className="relative z-10 border-t border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-8 pt-4">
          <button
            type="button"
            onClick={handleStartReflecting}
            className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Start reflecting
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
