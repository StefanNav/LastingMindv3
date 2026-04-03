import { motion } from 'framer-motion'
import { SlotAnswerInput } from './SlotAnswerInput'
import type { FavouritesCategory, FavouritesInputMode } from '@/types/favourites'

interface QuestionCardProps {
  category: FavouritesCategory
  inputMode: FavouritesInputMode
  onToggleMode: () => void
  onSubmit: (answer: string) => void
}

export function QuestionCard({ category, inputMode, onToggleMode, onSubmit }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ y: '120%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '120%', opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 28,
        mass: 1,
      }}
      className="absolute inset-x-4 bottom-6 z-20 flex flex-col gap-4 rounded-[28px] border border-white/60 px-6 py-7"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
      }}
    >
      {/* Category badge */}
      <div className="flex items-center gap-1.5">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.5px]"
          style={{
            background: 'rgba(50, 117, 30, 0.1)',
            color: 'var(--lm-green)',
          }}
        >
          {category.emoji} {category.name}
        </span>
      </div>

      {/* Question text */}
      <p className="font-display text-[22px] font-bold leading-[1.3] text-foreground">
        {category.question}
      </p>

      {/* Answer input (voice/text toggle preserved) */}
      <SlotAnswerInput
        inputMode={inputMode}
        onToggleMode={onToggleMode}
        onSubmit={onSubmit}
        mockAnswer={category.mockAnswer}
      />
    </motion.div>
  )
}
