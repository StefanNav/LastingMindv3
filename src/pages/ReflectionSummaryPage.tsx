import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { reflectionConfigs, foundationIntroData } from '@/data/mock'
import { useApp } from '@/app/AppProvider'
import type { ModuleCompletionState, RewardCardData, ReflectionMethod, ConversationInputMode } from '@/types'
import { module2IntroData } from '@/data/mock'

interface SummaryLocationState {
  promptIndex: number
  mockResponseText: string
  reflectionMethod: ReflectionMethod
  selectedMember?: string
  inputMode?: ConversationInputMode
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
  const [editedText, setEditedText] = useState(locationState?.mockResponseText ?? '')

  if (!config || !categoryId || !locationState) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">Summary not found.</p>
        </div>
      </PageTransition>
    )
  }

  const question = config.questions[locationState.promptIndex]
  const isGuided = locationState.reflectionMethod === 'guided'

  const handleSaveAndFinish = () => {
    const runs = module2Runs[categoryId] ?? 0
    const isStarEarned = runs >= 1

    // Compute real total stars: base from demo + dynamic from session + the one being earned now
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

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col bg-[var(--lm-bg-primary)]">
        {/* Header */}
        <ConversationHeader
          moduleTitle={`About ${config.subjectName}`}
          rightLabel="Conversation Summary"
          progressPercent={100}
          onBack={handleBack}
          showProgress={false}
          variant="summary"
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pt-[175px]">
          {/* Heading */}
          <div className="px-4 pb-[20px]">
            <p className="font-display text-[26px] font-normal leading-[1.5] text-[var(--lm-text-primary)]">
              {config.summaryHeading}
            </p>
          </div>

          <div className="flex flex-col gap-4 px-4">
            {/* Subject info */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-lm-green bg-[var(--lm-bg-card)]">
                <span className="font-display text-[20px] font-bold text-lm-green">
                  {config.subjectName.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-display text-[18px] font-medium leading-[1.2] text-[var(--lm-text-primary)]">
                  About {config.subjectName}
                </p>
                <p className="text-[14px] font-medium leading-[1.2] tracking-[0.5px] text-[#5d6056]">
                  {config.subjectRelation}
                </p>
              </div>
            </div>

            {/* Reflection question */}
            {isGuided && (
              <div className="rounded-[8px] border border-[#e7ebd9] bg-[#fffefa] px-4 py-2">
                <p className="mb-2 text-[14px] font-semibold leading-[1.2] text-[#5d6056]">
                  Reflection Question
                </p>
                <p className="text-[16px] font-normal leading-[1.5] text-[var(--lm-text-primary)]">
                  {question.promptText}
                </p>
              </div>
            )}

            {/* Your Words card */}
            <div className="rounded-[8px] border border-[#e7ebd9] bg-[#fffefa] px-4 py-2">
              <p className="mb-2 text-[14px] font-semibold leading-[1.2] text-[#5d6056]">
                Your Words
              </p>

              {isEditing ? (
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full resize-none border-0 border-b border-[#3e2f26]/20 bg-transparent pb-4 text-[16px] font-normal leading-[1.5] text-[var(--lm-text-primary)] outline-none"
                  rows={6}
                  autoFocus
                />
              ) : (
                <p className="text-[16px] font-normal leading-[1.5] text-[var(--lm-text-primary)]">
                  {editedText}
                </p>
              )}

              {isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="mt-3 flex items-center gap-1 rounded-[6px] bg-lm-green px-3 py-1.5"
                >
                  <span className="text-[14px] font-medium text-white">Done</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="mt-2 flex items-center gap-1"
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
            </div>

            {/* Metadata row */}
            <div className="flex items-center justify-between text-[14px] font-medium leading-[1.2] tracking-[0.5px] text-[#5d6056]">
              <span>{locationState.inputMode === 'text' ? 'Text entry' : 'Voice entry'}</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Spacer for fixed bottom */}
          <div className="h-[160px]" />
        </div>

        {/* Bottom: Save & Finish */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-[13px] border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4">
          <p className="text-center text-[14px] font-semibold leading-[1.2] text-[#313131]">
            You can always return to say more.
          </p>
          <button
            type="button"
            onClick={handleSaveAndFinish}
            className="flex w-full flex-col items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-10 py-4"
          >
            <ArrowRight className="size-6 text-white" />
            <span className="text-[16px] font-medium leading-[1.2] text-white">
              Save & Finish
            </span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
