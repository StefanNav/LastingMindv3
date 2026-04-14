import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/shared/PageShell'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import { StickyFooter } from '@/components/shared/StickyFooter'
import { ConversationHeader } from '@/components/conversation/ConversationHeader'
import { Pencil, Check } from 'lucide-react'
import type { FavoritesAnswer } from '@/types/favorites'

interface LocationState {
  answers: FavoritesAnswer[]
}

export function FavoritesSummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as LocationState | null
  const [answers, setAnswers] = useState<FavoritesAnswer[]>(locationState?.answers ?? [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  if (!locationState || answers.length === 0) {
    return (
      <PageShell>
        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="text-base text-muted-foreground">No answers found.</p>
        </div>
      </PageShell>
    )
  }

  const handleStartEdit = (answer: FavoritesAnswer) => {
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
    <PageShell>
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <ConversationHeader
          moduleTitle="Favorites"
          rightLabel="Review answers"
          progressPercent={100}
          onBack={() => navigate('/home')}
          showProgress={false}
          variant="summary"
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pt-[180px] px-4 pb-32">
          {/* Heading */}
          <div className="pb-5">
            <p className="font-display text-2xl font-semibold text-foreground">
              Your Favorites
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Review your answers below. Tap edit to change anything.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {answers.map((answer, i) => (
              <motion.div
                key={answer.categoryId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="overflow-hidden rounded-[10px] bg-lm-bg-card/40 shadow-card backdrop-blur-sm"
              >
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{answer.emoji}</span>
                    <span className="text-sm font-bold text-foreground">
                      {answer.categoryName}
                    </span>
                  </div>
                  {editingId !== answer.categoryId && (
                    <button
                      type="button"
                      onClick={() => handleStartEdit(answer)}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted"
                    >
                      <Pencil className="size-3" />
                      Edit
                    </button>
                  )}
                </div>

                {/* Card body */}
                <div className="px-4 py-3">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    {answer.question}
                  </p>

                  {editingId === answer.categoryId ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full resize-none rounded-lg border border-border bg-background p-2 text-sm leading-snug text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="flex flex-1 items-center justify-center rounded-lg border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(answer.categoryId)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
                        >
                          <Check className="size-4" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-snug text-foreground">{answer.answer}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sticky CTA */}
        <StickyFooter className="absolute inset-x-0 bottom-0">
          <PrimaryCTA onClick={() => navigate('/favorites/milestone', { state: { answers } })}>
            Save my favorites
          </PrimaryCTA>
        </StickyFooter>
      </div>
    </PageShell>
  )
}
