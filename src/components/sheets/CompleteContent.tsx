import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { Category, CategoryDetail } from '@/types'
import { CategorySheetHeader } from './CategorySheetHeader'
import { FamilyMembersGrid } from './FamilyMembersGrid'
import { RecentEntryCard } from './RecentEntryCard'
import { MoreWaysToGrow } from './MoreWaysToGrow'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface CompleteContentProps {
  category: Category
  detail: CategoryDetail
}

export function CompleteContent({ category, detail }: CompleteContentProps) {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  }), [])

  return (
    <motion.div
      className="flex flex-col gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header: image, filled stars */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
        <CategorySheetHeader category={category} />

        {/* Progress indicator */}
        {detail.entriesComplete != null && detail.entriesToNextStar != null && (
          <div className="flex flex-col items-center gap-2 px-5">
            <p className="text-center text-[14px] leading-[1.2] tracking-[0.12px] text-[var(--lm-text-secondary)]">
              {detail.entriesComplete} entries complete, {detail.entriesToNextStar} more to next star
            </p>
            <div className="h-[3px] w-[290px] overflow-hidden rounded-full bg-[#e7ebd9]">
              <div
                className="h-full rounded-full bg-lm-green"
                style={{
                  width: `${(detail.entriesComplete / (detail.entriesComplete + detail.entriesToNextStar)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Family Members */}
      {detail.familyMembers && detail.familyMembers.length > 0 && (
        <motion.div variants={itemVariants}>
          <FamilyMembersGrid members={detail.familyMembers} />
        </motion.div>
      )}

      {/* Recent Entries */}
      {detail.recentEntries && detail.recentEntries.length > 0 && (
        <motion.div variants={itemVariants}>
          <RecentEntryCard entries={detail.recentEntries} />
        </motion.div>
      )}

      {/* More Ways to Grow */}
      {detail.growthActions && detail.growthActions.length > 0 && (
        <motion.div variants={itemVariants}>
          <MoreWaysToGrow actions={detail.growthActions} />
        </motion.div>
      )}
    </motion.div>
  )
}
