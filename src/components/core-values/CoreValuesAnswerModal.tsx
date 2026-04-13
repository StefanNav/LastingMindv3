import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { CoreValuesCategory } from '@/types/coreValues'
import { AnswerInput } from '@/components/shared/AnswerInput'

interface CoreValuesAnswerModalProps {
  category: CoreValuesCategory
  onSubmit: (answer: string) => void
  onDismiss: () => void
}

export function CoreValuesAnswerModal({
  category,
  onSubmit,
  onDismiss,
}: CoreValuesAnswerModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26,
          mass: 0.9,
        }}
        className="flex w-full max-w-[400px] flex-col gap-4 rounded-xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)] px-5 py-5"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      >
        {/* Header — category label + close button */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.5px] text-lm-green">
              {category.categoryName}
            </span>
            <p className="font-display text-[20px] font-normal leading-[1.3] text-foreground">
              {category.question}
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="ml-3 mt-1 flex shrink-0 items-center justify-center rounded-full bg-black/5 p-1.5"
          >
            <X className="size-4 text-[var(--lm-text-secondary)]" />
          </button>
        </div>

        {/* Shared answer input */}
        <AnswerInput
          mockAnswer={category.mockAnswer}
          onSubmit={onSubmit}
        />
      </motion.div>
    </motion.div>
  )
}
