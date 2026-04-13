import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { Category, CategoryDetail } from '@/types'
import { CategorySheetHeader } from './CategorySheetHeader'
import { ModuleStepCard } from './ModuleStepCard'
import { FamilyMembersGrid } from './FamilyMembersGrid'
import { RecentEntryCard } from './RecentEntryCard'
import { MoreWaysToGrow } from './MoreWaysToGrow'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface StartedContentProps {
  category: Category
  detail: CategoryDetail
  onBeginModule?: (moduleId: string) => void
}

export function StartedContent({ category, detail, onBeginModule }: StartedContentProps) {
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
      {/* Header: image, stars, encouragement */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
        <CategorySheetHeader category={category} />

        <div className="flex flex-col items-center px-5 text-center">
          <p className="font-display text-[22px] font-normal leading-[1.2] text-foreground">
            {detail.subtitle || detail.heading}
          </p>
        </div>
      </motion.div>

      {/* Module steps */}
      <motion.div variants={itemVariants} className="flex flex-col gap-5 px-4">
        {detail.modules.map((mod, i) => (
          <ModuleStepCard
            key={mod.id}
            module={mod}
            stepLabel={`Step ${i + 1} of ${detail.modules.length}`}
            onBegin={() => onBeginModule?.(mod.id)}
          />
        ))}
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
