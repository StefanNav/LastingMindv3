import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Pencil, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { reflectionConfigs, foundationIntroData, module2IntroData } from '@/data/mock'
import { useApp } from '@/app/AppProvider'
import type { ModuleCompletionState, RewardCardData } from '@/types'

interface SummaryLocationState {
  topicName: string
  questionText: string | null
  reflectionText: string
  inputMode: 'voice' | 'text'
  selectedMember?: string
}

export function ReflectionSummaryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as SummaryLocationState | null

  const { module2Runs, incrementModule2Run, foundationStars } = useApp()
  const config = categoryId ? reflectionConfigs[categoryId] : undefined
  const introData = categoryId ? module2IntroData[categoryId] : undefined
  const categoryIntroData = categoryId ? foundationIntroData[categoryId] : undefined

  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(locationState?.reflectionText ?? '')

  if (!config || !categoryId || !locationState) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">Summary not found.</p>
        </div>
      </PageTransition>
    )
  }

  const topicName = locationState.topicName ?? config.topicName ?? config.subjectName
  const ctaLabel = config.confirmationCTALabel ?? 'Save this reflection'

  const handleSave = () => {
    const runs = module2Runs[categoryId] ?? 0
    const isStarEarned = runs >= 1

    const dynamicStars = Object.values(module2Runs).reduce(
      (sum, r) => sum + Math.floor(r / 2), 0,
    )
    const computedTotalStars = foundationStars + dynamicStars + (isStarEarned ? 1 : 0)

    const rewardCardData: RewardCardData = {
      categoryImage: categoryIntroData?.image ?? '',
      categoryLabel: introData?.categoryLabel ?? categoryId,
      moduleTitle: config.moduleTitle,
      items: [{
        id: 'story-subject',
        initial: config.subjectName.charAt(0),
        label: `About ${config.subjectName}`,
        sublabel: `${config.subjectName} - ${config.subjectRelation}`,
      }],
      itemCountLabel: '1 entry',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }

    const completionState: ModuleCompletionState = {
      categoryId,
      moduleNumber: 2,
      moduleTitle: config.moduleTitle,
      categoryLabel: introData?.categoryLabel ?? categoryId,
      starEarned: isStarEarned,
      totalStars: computedTotalStars,
      totalStarsNeeded: 6,
      rewardCardData,
      nextModule: introData
        ? { title: introData.moduleTitle, description: introData.description, duration: '5min' }
        : undefined,
    }
    incrementModule2Run(categoryId)
    navigate('/success', { state: completionState })
  }

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col bg-[var(--lm-bg-primary)]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        {/* Scrollable content */}
        <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6 pt-14" style={{ scrollbarWidth: 'none' }}>
          {/* Title block */}
          <div className="flex flex-col gap-2 pb-6 pt-4">
            <h1 className="font-display text-[26px] font-semibold leading-tight text-foreground">
              Your Reflection
            </h1>
            <p className="text-[14px] leading-[1.5] text-muted-foreground">
              Here's what you shared. Review and edit before saving.
            </p>
          </div>

          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-[10px] bg-lm-bg-card/40 p-4 shadow-card backdrop-blur-sm"
          >
            {/* Topic label */}
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              About {topicName}
            </p>

            {/* Selected question */}
            {locationState.questionText && (
              <p className="mb-3 font-display text-[15px] leading-[1.5] text-foreground/70">
                {locationState.questionText}
              </p>
            )}

            {/* Reflection prose + edit */}
            {isEditing ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={6}
                  autoFocus
                  className="w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-[14px] leading-[1.6] text-foreground focus:outline-none focus:ring-1 focus:ring-lm-green"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditedText(locationState.reflectionText)
                      setIsEditing(false)
                    }}
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    <X className="size-3.5" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1 rounded-lg bg-lm-green px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-lm-green/90"
                  >
                    <Check className="size-3.5" />
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className="flex-1 text-[14px] leading-[1.6] text-foreground">
                  {editedText}
                </p>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="mt-0.5 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Pencil className="size-3.5" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Metadata row */}
          <div className="mt-4 flex items-center justify-between text-[13px] font-medium text-muted-foreground">
            <span>{locationState.inputMode === 'text' ? 'Written' : 'Voice recording'}</span>
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="relative z-10 border-t border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-8 pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
