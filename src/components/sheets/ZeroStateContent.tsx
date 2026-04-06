import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { Category, CategoryDetail } from '@/types'
import { CategorySheetHeader } from './CategorySheetHeader'
import { ModuleStepCard } from './ModuleStepCard'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface ZeroStateContentProps {
  category: Category
  detail: CategoryDetail
  onBeginModule?: (moduleId: string) => void
}

export function ZeroStateContent({ category, detail, onBeginModule }: ZeroStateContentProps) {
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
      {/* Header: image, stars, status */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-[22px]">
        <CategorySheetHeader category={category} />

        <div className="flex flex-col items-center gap-3 px-5 text-center">
          <p className="font-display text-[22px] font-normal leading-[1.2] text-foreground">
            {detail.heading}
          </p>
          {detail.subtitle && (
            <p className="text-sm leading-snug text-[var(--lm-text-secondary)]">
              {detail.subtitle}
            </p>
          )}
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
    </motion.div>
  )
}
