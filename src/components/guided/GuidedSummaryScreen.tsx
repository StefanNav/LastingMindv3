import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Check, X } from 'lucide-react'
import type { GuidedSummaryEntry } from '@/types'

interface GuidedSummaryScreenProps {
  categoryLabel: string
  entries: GuidedSummaryEntry[]
  confirmationCTALabel: string
  onUpdateEntry: (entry: GuidedSummaryEntry) => void
  onSave: () => void
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export function GuidedSummaryScreen({
  categoryLabel,
  entries,
  confirmationCTALabel,
  onUpdateEntry,
  onSave,
}: GuidedSummaryScreenProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const startEditing = (entry: GuidedSummaryEntry) => {
    setEditingId(entry.id)
    setEditText(entry.content)
  }

  const saveEdit = (entry: GuidedSummaryEntry) => {
    onUpdateEntry({ ...entry, content: editText })
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="flex h-full flex-col bg-[var(--lm-bg-primary)]">
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
            Your {categoryLabel}
          </h1>
          <p className="text-[14px] leading-[1.5] text-muted-foreground">
            Here's what your LastingMind learned from this conversation. Review and edit before saving.
          </p>
        </div>

        {/* Entry cards */}
        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="rounded-[10px] bg-lm-bg-card/40 p-4 shadow-card backdrop-blur-sm"
            >
              {/* Label */}
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {entry.label}
              </p>

              {editingId === entry.id ? (
                /* Editing state */
                <div className="flex flex-col gap-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-[14px] leading-[1.6] text-foreground focus:outline-none focus:ring-1 focus:ring-lm-green"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted"
                    >
                      <X className="size-3.5" />
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveEdit(entry)}
                      className="flex items-center gap-1 rounded-lg bg-lm-green px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-lm-green/90"
                    >
                      <Check className="size-3.5" />
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Display state */
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-[14px] leading-[1.6] text-foreground">
                    {entry.content}
                  </p>
                  <button
                    type="button"
                    onClick={() => startEditing(entry)}
                    className="mt-0.5 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="relative z-10 border-t border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-8 pt-4">
        <button
          type="button"
          onClick={onSave}
          className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
        >
          {confirmationCTALabel}
        </button>
      </div>
    </div>
  )
}
