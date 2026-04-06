import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { Pencil, Check } from 'lucide-react'
import { module2IntroData } from '@/data/mock'
import { useApp } from '@/app/AppProvider'
import type { CoreValuesAnswer } from '@/types/coreValues'
import type { ModuleCompletionState, RewardCardData } from '@/types'

interface LocationState {
  answers: CoreValuesAnswer[]
}

export function CoreValuesSummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { markModule1Complete } = useApp()
  const locationState = location.state as LocationState | null
  const [answers, setAnswers] = useState<CoreValuesAnswer[]>(locationState?.answers ?? [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  if (!locationState || answers.length === 0) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">No answers found.</p>
        </div>
      </PageTransition>
    )
  }

  const handleStartEdit = (answer: CoreValuesAnswer) => {
    setEditingId(answer.categoryId)
    setEditText(answer.answer)
  }

  const handleSaveEdit = (categoryId: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.categoryId === categoryId ? { ...a, answer: editText } : a)),
    )
    setEditingId(null)
    setEditText('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const mod2 = module2IntroData['cat-core-values']

  const handleSaveValues = () => {
    const rewardCardData: RewardCardData = {
      categoryImage: '/images/Core Values 1.png',
      categoryLabel: 'Core Values',
      moduleTitle: 'What You Stand For',
      items: answers.map((a) => ({
        id: a.categoryId,
        initial: a.cardLabel.charAt(0),
        label: a.categoryName,
        sublabel: a.answer,
      })),
      itemCountLabel: `${answers.length} values recorded`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }

    const completionState: ModuleCompletionState = {
      categoryId: 'cat-core-values',
      moduleNumber: 1,
      moduleTitle: 'What You Stand For',
      categoryLabel: 'Core Values',
      starEarned: false,
      totalStars: 0,
      totalStarsNeeded: 6,
      rewardCardData,
      nextModule: mod2
        ? { title: mod2.moduleTitle, description: mod2.description, duration: '5min' }
        : undefined,
    }
    markModule1Complete('cat-core-values')
    navigate('/success', { state: completionState })
  }

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col bg-background">
        {/* Header */}
        <ConversationHeader
          moduleTitle="Core Values"
          rightLabel="Review answers"
          progressPercent={100}
          onBack={() => navigate('/home')}
          showProgress={false}
          variant="summary"
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-32 pt-[180px]">
          {/* Heading */}
          <div className="pb-[20px]">
            <p className="font-display text-[26px] font-normal leading-[1.5] text-[var(--lm-text-primary)]">
              Your Core Values
            </p>
            <p className="text-[15px] font-normal text-[var(--lm-text-secondary)]">
              Review your answers before we save your profile.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {answers.map((answer, i) => (
              <motion.div
                key={answer.categoryId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="overflow-hidden rounded-xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)]"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-[var(--lm-border-subtle)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold uppercase tracking-[0.5px] text-lm-green">
                      {answer.cardLabel}
                    </span>
                    <span className="text-[14px] font-bold text-foreground">
                      {answer.categoryName}
                    </span>
                  </div>
                  {editingId !== answer.categoryId && (
                    <button
                      type="button"
                      onClick={() => handleStartEdit(answer)}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-semibold text-[var(--lm-text-secondary)] transition-colors hover:bg-black/5"
                    >
                      <Pencil className="size-3" />
                      Edit
                    </button>
                  )}
                </div>

                {/* Card body */}
                <div className="px-4 py-3">
                  <p className="mb-1 text-[12px] font-medium text-[var(--lm-text-secondary)]">
                    {answer.question}
                  </p>

                  {editingId === answer.categoryId ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full resize-none rounded-lg border border-[var(--lm-border)] bg-background p-2 text-[14px] leading-[1.4] text-foreground outline-none focus:border-lm-green focus:ring-1 focus:ring-lm-green/30"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] px-5 py-4"
                        >
                          <span className="text-[16px] font-medium leading-[1.2] text-[#283227]">
                            Cancel
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(answer.categoryId)}
                          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-5 py-4"
                        >
                          <Check className="size-5 text-white" />
                          <span className="text-[16px] font-medium leading-[1.2] text-white">
                            Save
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[14px] leading-[1.4] text-foreground">{answer.answer}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="absolute inset-x-0 bottom-0 border-t border-[var(--lm-border-subtle)] bg-background/95 px-4 pb-[50px] pt-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={handleSaveValues}
            className="flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-4"
          >
            <span className="text-[16px] font-medium leading-[1.2] text-white">
              Save my values
            </span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
