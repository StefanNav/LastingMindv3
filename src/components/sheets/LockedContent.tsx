import { LockKeyhole } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { Category } from '@/types'
import { FoundationProgressCard } from './FoundationProgressCard'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface LockedContentProps {
  category: Category
  onContinueFoundation?: () => void
}

export function LockedContent({ category, onContinueFoundation }: LockedContentProps) {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  }), [])

  return (
    <motion.div
      className="flex flex-col gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Category image + lock badge */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-[22px] px-4">
        <div className="flex flex-col items-center gap-2.5 opacity-50">
          <div className="flex flex-col items-center">
            <div className="h-[100px] w-[162px] overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-center text-[18px] font-semibold leading-[1.2] text-lm-green-dark">
              {category.title}
            </p>
          </div>
          <div className="flex size-[52px] items-center justify-center rounded-full bg-[#e7ebd9]">
            <LockKeyhole className="size-[30px] text-lm-green-dark/60" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-[22px] font-normal leading-[1.2] text-foreground">
            Complete your foundation to unlock
          </p>
          <p className="text-sm leading-snug text-[var(--lm-text-secondary)]">
            You'll define the chapters of your life and tell your story in depth. We will use everything you've shared in Phase 1 to guide the conversation.
          </p>
        </div>
      </motion.div>

      {/* Foundation Progress Card */}
      <motion.div variants={itemVariants}>
        <FoundationProgressCard onContinue={onContinueFoundation} />
      </motion.div>
    </motion.div>
  )
}
