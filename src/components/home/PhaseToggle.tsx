import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PhaseToggleProps {
  label: string
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function PhaseToggle({ label, onPrevious, onNext, hasPrevious, hasNext }: PhaseToggleProps) {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="flex w-[346px] items-center gap-2.5 rounded-[20px] border border-lm-border bg-lm-bg-card p-2 shadow-toggle">
        {/* Left arrow */}
        <motion.div
          whileTap={hasPrevious ? { scale: 0.85 } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <button
            type="button"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={cn(
              'flex w-[97px] items-center justify-center',
              !hasPrevious && 'opacity-30 cursor-default',
            )}
          >
            <ChevronLeft className="size-6 text-foreground" />
          </button>
        </motion.div>

        {/* Phase label */}
        <div className="flex flex-1 items-center justify-center border-l border-r border-foreground overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-[97px] text-center font-bold text-[16px] leading-[1.2] text-lm-gold"
            >
              {label}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <motion.div
          whileTap={hasNext ? { scale: 0.85 } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className={cn(
              'flex w-[97px] items-center justify-center',
              !hasNext && 'opacity-30 cursor-default',
            )}
          >
            <ChevronRight className="size-6 text-foreground" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
