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

        {/* Encouragement text */}
        <p className="max-w-[300px] text-center text-[14px] leading-[1.4] tracking-[0.12px] text-[var(--lm-text-secondary)]">
          Every story you share brings your Lasting Mind closer to who you truly are and gives your loved ones more to hold on to. Keep going.
        </p>
      </motion.div>

      {/* Family Members */}
      {detail.familyMembers && detail.familyMembers.length > 0 && (
        <motion.div variants={itemVariants}>
          <FamilyMembersGrid members={detail.familyMembers} categoryTitle={category.title} />
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
