import { motion } from 'framer-motion'
import type { FavoritesCategory } from '@/types/favorites'
import { AnswerInput } from '@/components/shared/AnswerInput'

interface QuestionCardProps {
  category: FavoritesCategory
  onSubmit: (answer: string) => void
  onSkip: () => void
}

export function QuestionCard({ category, onSubmit, onSkip }: QuestionCardProps) {
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
        {/* Category badge with decorative lines */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-lm-gold/40" />
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px] text-lm-gold">
            {category.emoji} {category.name}
          </span>
          <div className="h-px flex-1 bg-lm-gold/40" />
        </div>

        {/* Question text */}
        <p className="font-display text-[24px] font-normal leading-[1.3] text-foreground">
          {category.question}
        </p>

        {/* Shared answer input */}
        <AnswerInput
          mockAnswer={category.mockAnswer}
          onSubmit={onSubmit}
          onSkip={onSkip}
        />
      </motion.div>
    </motion.div>
  )
}
