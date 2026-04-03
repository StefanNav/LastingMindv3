import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { ArrowLeft, Pencil, Check } from 'lucide-react'
import type { FavouritesAnswer } from '@/types/favourites'

interface LocationState {
  answers: FavouritesAnswer[]
}

export function FavouritesSummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState | null
  const [answers, setAnswers] = useState<FavouritesAnswer[]>(locationState?.answers ?? [])
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

  const handleStartEdit = (answer: FavouritesAnswer) => {
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

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col bg-background">
        {/* Header */}
        <div className="flex flex-col gap-1 px-4 pb-4 pt-[62px]">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="mb-2 flex w-fit items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
          >
            <ArrowLeft className="size-6 text-white" />
            <span className="text-[14px] font-semibold leading-[1.2] text-white">Back</span>
          </button>

          <h1 className="font-display text-[28px] font-normal leading-[1.2] text-foreground">
            Your Favourites
          </h1>
          <p className="text-[14px] font-semibold text-[var(--lm-text-secondary)]">
            Review your answers below. Tap edit to change anything.
          </p>
        </div>

        {/* Scrollable card list */}
        <div className="flex-1 overflow-y-auto px-4 pb-32">
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
                    <span className="text-[20px]">{answer.emoji}</span>
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
                          className="flex-1 rounded-lg border border-[var(--lm-border)] px-3 py-2 text-[13px] font-semibold text-foreground"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(answer.categoryId)}
                          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-lm-green px-3 py-2 text-[13px] font-semibold text-white"
                        >
                          <Check className="size-3.5" />
                          Save
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
            onClick={() =>
              navigate('/favourites/milestone', { state: { answers } })
            }
            className="flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-4"
          >
            <span className="text-[16px] font-medium leading-[1.2] text-white">
              Save my favourites
            </span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
