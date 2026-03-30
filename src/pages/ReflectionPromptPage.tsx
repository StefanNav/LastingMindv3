import { useState, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { reflectionConfigs } from '@/data/mock'

const SWIPE_THRESHOLD = 50

export function ReflectionPromptPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const selectedMember = (location.state as { selectedMember?: string })?.selectedMember

  const config = categoryId ? reflectionConfigs[categoryId] : undefined

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  if (!config || !categoryId) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">Reflection not found.</p>
        </div>
      </PageTransition>
    )
  }

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

  const handleAnswerQuestion = () => {
    navigate(`/reflect/${categoryId}`, {
      state: {
        method: 'guided',
        promptIndex: activeIndex,
        selectedMember,
      },
    })
  }

  const handleReflectOpenly = () => {
    navigate(`/reflect/${categoryId}`, {
      state: {
        method: 'open',
        promptIndex: activeIndex,
        selectedMember,
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
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/Background Image.png"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[var(--lm-bg-primary)]/52" />
        </div>

        {/* Back button */}
        <div className="relative z-10 px-4 pt-[62px]">
          <button
            type="button"
            onClick={() => navigate(`/intro2/${categoryId}`)}
            className="flex items-center gap-[6px] rounded-[4px] bg-lm-neutral-warm p-[6px]"
          >
            <ArrowLeft className="size-6 text-white" />
            <span className="text-[14px] font-semibold leading-[1.2] text-white">Back</span>
          </button>
        </div>

        {/* Prompt card area — centered */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
          <div className="flex w-full flex-col gap-4">
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
                {/* Card */}
                <div className="rounded-[10px] border border-[var(--lm-border-subtle)] bg-[var(--lm-bg-card)] p-2 shadow-reflection">
                  <div className="flex flex-col gap-4 rounded-[10px] border border-[var(--lm-border)] p-4">
                    {/* Category label */}
                    <p className="text-center text-[10px] font-black uppercase leading-none tracking-[1px] text-[var(--lm-gold-muted)]">
                      {activeQuestion.categoryLabel}
                    </p>

                    {/* Question text */}
                    <div className="py-6">
                      <p className="text-center font-display text-[18px] font-normal leading-[1.5] tracking-[0.5px] text-[var(--lm-text-primary)]">
                        {activeQuestion.promptText}
                      </p>
                    </div>

                    {/* Answer button */}
                    <button
                      type="button"
                      onClick={handleAnswerQuestion}
                      className="flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-[10px]"
                    >
                      <span className="text-[16px] font-medium leading-[1.2] text-white">
                        Answer Question...
                      </span>
                    </button>
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
        </div>

        {/* Bottom: Reflect Openly */}
        <div className="relative z-10 border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 py-[30px]">
          <button
            type="button"
            onClick={handleReflectOpenly}
            className="flex w-full items-center justify-center rounded-[10px] bg-[#e7ebd9] p-[10px]"
          >
            <span className="text-center text-[16px] font-semibold leading-[1.2] text-[#283227]">
              I Prefer to Reflect Openly
            </span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
